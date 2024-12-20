import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["info", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Gets an enhanced PrismaClient for the current user
 */
export async function getUserDb() {
  const { userId, orgId, orgRole } = await auth();
  const user = userId
    ? {
        userId,
        currentOrgId: orgId,
        currentOrgRole: orgRole,
      }
    : undefined;
  return enhance(prisma, { user });
}
