import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { articles } from "../route";

/* ---------------- DELETE: DELETE ARTICLE ---------------- */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const index = articles.findIndex((article) => article.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Article not found" },
      { status: 404 }
    );
  }

  articles.splice(index, 1);

  return NextResponse.json({ success: true });
}

/* ---------------- GET: GET SINGLE ARTICLE ---------------- */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const article = articles.find((article) => article.id === id);

  if (!article) {
    return NextResponse.json(
      { error: "Article not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(article);
}

/* ---------------- PUT: UPDATE ARTICLE ---------------- */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const index = articles.findIndex((article) => article.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Article not found" },
      { status: 404 }
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

  articles[index] = {
    ...articles[index],
    title,
    content,
    published: Boolean(published),
  };

  return NextResponse.json(articles[index]);
}