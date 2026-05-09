import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const token =
    cookies().get('admin_token')?.value
  if (!token) {
    redirect("/admin/login");
  }

  redirect("/admin/dashboard");
}