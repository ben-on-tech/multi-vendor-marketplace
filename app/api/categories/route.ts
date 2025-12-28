import { prisma } from "@/lib/prisma";

export async function GET(){
    return Response.json(await prisma.categories.findMany());
}

export async function POST(req:Request){
    const data = await req.json();
    return Response.json(await prisma.categories.create({data
    }),{status:201});
    
}