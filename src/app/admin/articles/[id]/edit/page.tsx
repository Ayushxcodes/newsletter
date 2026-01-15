"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditArticlePage({ params }: Props) {
  const router = useRouter();
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      const res = await fetch(`/api/admin/articles/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setContent(data.content);
      setPublished(data.published);
    }
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/admin/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, published }),
    });

    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold">Edit Article</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded h-64"
        required
      />
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        <span>Publish?</span>
      </label>
      <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded">
        Update Article
      </button>
    </form>
  );
}
