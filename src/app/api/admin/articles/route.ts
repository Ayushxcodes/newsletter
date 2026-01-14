import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/* ---------------- TYPES ---------------- */
type Article = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
};

/* ---------------- GLOBAL STORE (DEV ONLY) ---------------- */
// This prevents data loss between requests in Next.js dev mode
const globalForArticles = globalThis as unknown as {
  articles?: Article[];
};

export const articles: Article[] = globalForArticles.articles ?? [
  {
    id: "sample-1",
    title: "Sample Article 1",
    content: "This is a sample article for testing.",
    published: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "sample-2",
    title: "Sample Article 2",
    content: "Another sample article.",
    published: false,
    createdAt: new Date("2024-01-02"),
  },
];
globalForArticles.articles = articles;

/* ---------------- GET: LIST ARTICLES ---------------- */
export async function GET() {
  const session = await auth();

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json(articles);
}

/* ---------------- POST: CREATE ARTICLE ---------------- */
export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { title, content, published } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const newArticle: Article = {
    id: crypto.randomUUID(),
    title,
    content,
    published: Boolean(published),
    createdAt: new Date(),
  };

  // Add newest first
  articles.unshift(newArticle);

  return NextResponse.json(newArticle, { status: 201 });
}
