// src/app/admin/page.tsx
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function AdminPage() {
  // ✅ Await the creation of the Supabase server client
  const supabase = await createServerSupabaseClient();

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session, redirect
  if (!session?.user) {
    redirect("/");
  }

  const ADMIN_EMAIL = "krish989pandey@gmail.com";

  // If user is not admin, redirect
  if (session.user.email !== ADMIN_EMAIL) {
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
