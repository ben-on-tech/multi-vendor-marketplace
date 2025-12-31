import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const cart = await prisma.carts.findUnique({
    where: { id: Number(params.id) },
    include: {
      cart_items: {
        include: {
          products: true,
        },
      },
      users: true,
    },
  });

  if (!cart) {
    return new Response("Cart not found", { status: 404 });
  }

  return Response.json(cart);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.carts.delete({
    where: { id: Number(params.id) },
  });

  return new Response(null, { status: 204 });
}
