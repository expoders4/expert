import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = cookies().get("admin_token")?.value;

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return Response.json({ message: "Authorized", user: decoded });
  } catch {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }
}