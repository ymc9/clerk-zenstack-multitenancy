import { auth } from "@clerk/nextjs/server";
import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";
import { prisma } from "~/server/db";

async function getPrisma() {
  const authObj = await auth();
  const user = authObj.userId
    ? { userId: authObj.userId, orgId: authObj.orgId }
    : undefined;
  console.log("Enhancing prisma with user", user);
  return enhance(prisma, { user }, { logPrismaQuery: true });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
