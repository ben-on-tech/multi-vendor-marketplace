import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const review = await prisma.reviews.findUnique({
    where: { id: Number(params.id) },
    include: {
      users: true,
      products: true,
    },
  });

  if (!review) {
    return new Response("Review not found", { status: 404 });
  }

  return Response.json(review);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { rating, comment } = await req.json();

  const updatedReview = await prisma.reviews.update({
    where: { id: Number(params.id) },
    data: {
      rating,
      comment,
    },
  });

  return Response.json(updatedReview);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.reviews.delete({
    where: { id: Number(params.id) },
  });

  return new Response(null, { status: 204 });
}
