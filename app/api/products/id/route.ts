import {prisma} from "@/lib/prisma";

export async function GET(_:Request,{ params }:{ params:{id:string} }){
    const product = await prisma.products.findUnique({
        where:{id: Number(params.id)},
    });
    if(!product) return new Response("Not found", {status:404});
    return Response.json(product);
}

export async function PUT(req:Request,{ params }:{params:{id:string}}){
    const data = await req.json();
    const updated = await prisma.products.update(
        {
            where:{id:Number(params.id)},
            data,
        }
    );
    return Response.json(updated);
}

export async function DELETE(_:Request,{params}:{params:{id:string}}){
   await prisma.products.delete({
    where:{id:Number(params.id)}
   });
   return new Response(null,{status:204});
}