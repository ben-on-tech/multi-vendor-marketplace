export function requireRole(user: any, role: string) {
  if (user.role !== role) {
    throw new Error("Forbidden");
  }
}
