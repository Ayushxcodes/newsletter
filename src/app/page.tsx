import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();

  const supabase = await createServerSupabaseClient();
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">My News Platform</h1>

      {error && <p className="text-red-500">Failed to load articles</p>}

      <div className="space-y-4">
        {articles?.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{article.title}</CardTitle>
                <Badge>Published</Badge>
              </div>
            </CardHeader>
            <CardFooter>
              <Link href={`/articles/${article.id}`}>
                <Button>Read</Button>
              </Link>
            </CardFooter>
          </Card>
        )) || <p>No articles available</p>}
      </div>

      {session ? (
        <>
          <p className="mt-6">Signed in as {session.user?.email}</p>
        </>
      ) : (
        <>
          <p className="mt-6">You are not signed in.</p>
          <a href="/api/auth/signin" className="text-blue-600 underline">Sign in</a>
        </>
      )}
    </main>
  );
}
