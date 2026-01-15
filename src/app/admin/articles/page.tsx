import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export default async function AdminArticlesPage() {
  const supabase = await createServerSupabaseClient();


  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="p-8 text-red-500">Failed to load articles</p>;
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Articles</h1>

      {articles.length === 0 && (
        <p className="text-gray-500">No articles yet</p>
      )}

      <div className="space-y-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{article.title}</CardTitle>
                <Badge variant={article.published ? "default" : "secondary"}>
                  {article.published ? "Published" : "Draft"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{article.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
