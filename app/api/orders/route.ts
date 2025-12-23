import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(){
    const orders = await prisma.orders.findMany();
    return NextResponse.json(orders);
}