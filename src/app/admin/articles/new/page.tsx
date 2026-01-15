"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("articles").insert({
      title,
      content,
      published: false,
    });

    if (error) {
      console.error(error);
      alert("Failed to save article");
      return;
    }

    router.push("/admin/articles");
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4 max-w-3xl">
      <h1 className="text-3xl font-bold">New Article</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 rounded h-64"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Article
      </button>
    </form>
  );
}
