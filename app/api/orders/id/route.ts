import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const order = await prisma.orders.findUnique({
    where: { id: Number(params.id) },
    include: {
      users: true,
      order_items: {
        include: {
          products: true,
          vendors: true,
        },
      },
    },
  });

  if (!order) {
    return new Response("Order not found", { status: 404 });
  }

  return Response.json(order);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  const updatedOrder = await prisma.orders.update({
    where: { id: Number(params.id) },
    data,
  });

  return Response.json(updatedOrder);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.orders.delete({
    where: { id: Number(params.id) },
  });

  return new Response(null, { status: 204 });
}
