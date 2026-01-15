import { auth } from "@/lib/auth"; // Your NextAuth wrapper
import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import ArticlesTable from "@/components/ArticlesTable";

export default async function AdminPage() {
  const session = await auth();

  if (!session || !session.user?.isAdmin) {
    redirect("/"); // Not admin
  }

  let articles = [];
  let supabaseError = null;

  try {
    const supabaseServer = await createServerSupabaseClient();
    const { data } = await supabaseServer
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    articles = data || [];
  } catch (error) {
    supabaseError = error instanceof Error ? error.message : String(error);
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/articles/new" className="px-4 py-2 bg-blue-600 text-white rounded">
          New Article
        </Link>
      </div>

      {supabaseError ? (
        <div className="p-8 border rounded bg-red-100 text-center">
          <p className="text-red-600">Error: {supabaseError}</p>
          <p>Please set up your Supabase environment variables to manage articles.</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="p-8 border rounded bg-gray-100 text-center">
          No articles yet
        </div>
      ) : (
        <ArticlesTable articles={articles} />
      )}
    </div>
  );
}
