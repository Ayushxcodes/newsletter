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
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/articles/new" className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded text-center">
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
