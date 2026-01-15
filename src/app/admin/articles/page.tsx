import { createServerSupabaseClient } from "@/lib/supabase-server";


export default async function AdminArticlesPage() {
  const supabase = await createServerSupabaseClient();


  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="p-8 text-red-500">Failed to load articles</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>

      {articles.length === 0 && (
        <p className="text-gray-500">No articles yet</p>
      )}

      <ul className="space-y-4">
        {articles.map((article) => (
          <li
            key={article.id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">
                {article.published ? "Published" : "Draft"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
