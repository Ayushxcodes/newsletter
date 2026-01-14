import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/app/api/admin/articles/route";
import ArticlesTable from "@/components/ArticlesTable";

export default async function AdminArticlesPage() {
  const session = await auth();

  if (!session || !session.user?.isAdmin) {
    redirect("/");
  }

  // Articles are directly accessed from the shared store
  const articlesData = articles;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Button asChild>
          <Link href="/admin/articles/new">New Article</Link>
        </Button>
      </div>

      {/* Empty State */}
      {articlesData.length === 0 ? (
        <div className="rounded-xl border bg-muted/40 p-12 text-center">
          <p className="text-lg font-medium">No articles yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first article to get started.
          </p>
        </div>
      ) : (
        <ArticlesTable articles={articlesData} />
      )}
    </div>
  );
}
