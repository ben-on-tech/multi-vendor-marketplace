import {prisma} from "@/lib/prisma";

export async function GET(_:Request,{params}:{params:{id:string}}){
    const user = await prisma.users.findUnique({
        where:{id:Number(params.id)},
    });
    return user ? Response.json(user) : new Response("Not found",{status:404});
}