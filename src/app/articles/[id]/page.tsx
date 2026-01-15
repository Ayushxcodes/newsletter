import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  if (!supabase) {
    return <p>Database not configured</p>;
  }

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{article.title}</h1>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </main>
  );
}