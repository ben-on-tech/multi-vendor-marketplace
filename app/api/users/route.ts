import {prisma}  from "@/lib/prisma";

export async function GET(){
    return Response.json(await prisma.users.findMany());
}

export async function POST(req:Request){
    const data = await req.json();
    return Response.json(await prisma.users.create({data}),{status:201});
}