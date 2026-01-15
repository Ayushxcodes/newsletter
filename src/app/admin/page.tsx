// src/app/admin/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  // Get the current session using NextAuth
  const session = await auth();

  // If no session, redirect
  if (!session?.user) {
    redirect("/");
  }

  // If user is not admin, redirect
  if (!session.user.isAdmin) {
    redirect("/");
  }

  // ✅ User is admin
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  );
}
