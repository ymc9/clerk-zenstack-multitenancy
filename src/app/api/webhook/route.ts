import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "~/server/db";

// API route for handling Clerk webhooks
export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  console.log(
    `Received webhook with ID ${evt.data.id} and event type of ${evt.type}`,
  );
  console.log("Webhook payload:", body);

  switch (evt.type) {
    case "user.created": {
      await prisma.user.create({
        data: {
          id: evt.data.id,
          email: evt.data.email_addresses?.[0]?.email_address,
          name: evt.data.first_name,
        },
      });
      break;
    }

    case "organization.created":
      await prisma.organization.create({
        data: {
          id: evt.data.id,
          name: evt.data.name,
          ownerId: evt.data.created_by,
        },
      });
      break;

    case "organizationMembership.created":
      await prisma.organizationMembership.create({
        data: {
          id: evt.data.id,
          userId: evt.data.public_user_data.user_id,
          orgId: evt.data.organization.id,
          role: evt.data.role === "org:admin" ? "ADMIN" : "MEMBER",
        },
      });
      break;

    case "organizationMembership.updated":
      await prisma.organizationMembership.update({
        where: {
          id: evt.data.id,
        },
        data: {
          role: evt.data.role === "org:admin" ? "ADMIN" : "MEMBER",
        },
      });
      break;

    case "organizationMembership.deleted":
      await prisma.organizationMembership.delete({
        where: {
          id: evt.data.id,
        },
      });
      break;
  }

  return new Response("Webhook received", { status: 200 });
}
