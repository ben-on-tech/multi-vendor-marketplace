import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roleGuard";

export async function POST(req: Request) {
  const user = JSON.parse(req.headers.get("user")!);

  // only buyers can become vendors
  requireRole(user, "buyer");

  const body = await req.json();

  const vendor = await prisma.vendors.create({
    data: {
      user_id: user.id,
      shop_name: body.shop_name,
      description: body.description,
    },
  });

  // upgrade role
  await prisma.users.update({
    where: { id: user.id },
    data: { role: "vendor" },
  });

  return Response.json(vendor);
}
