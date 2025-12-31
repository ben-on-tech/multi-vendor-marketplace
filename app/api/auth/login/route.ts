import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  return Response.json({ token });
}
