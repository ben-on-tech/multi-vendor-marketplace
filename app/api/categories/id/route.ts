import {prisma} from "@/lib/prisma";

export async function PUT(req:Request,{params}:{params:{id:string}}){
    const data = await req.json();
    return Response.json(
        await prisma.categories.update({
            where:{id:Number(params.id)},
            data,
        })
    )
}

export async function DELETE(_:Request,{params}:{params:{id:string}}){
    await prisma.categories.delete({ where:{id:Number(params.id)}});
    return new Response(null,{status:204});

}