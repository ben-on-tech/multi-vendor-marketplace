import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(){
    const carts = await prisma.carts.findMany();
    return NextResponse.json(carts);
}