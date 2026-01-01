export function requireRole(
  user: { role: string },
  role: "vendor" | "buyer" | "admin"
) {
  if (user.role !== role) {
    throw new Error("Forbidden: insufficient permissions");
  }
}
