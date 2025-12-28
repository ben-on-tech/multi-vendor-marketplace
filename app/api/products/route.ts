import {prisma} from "@/lib/prisma";

export async function GET(){
  const products = await prisma.products.findMany({
    include: {
      categories:true,
      vendors:true,
      product_images:true,
      reviews:true,

    },
  });
  return Response.json(products);
}

export async function POST(req:Request){
  const data = await req.json();
  const product = await prisma.products.create({data});
  return Response.json(product,{status:201});

}