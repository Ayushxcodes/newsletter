// src/app/admin/layout.tsx
import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, Users, Settings, Home } from "lucide-react";
import { ReactNode } from "react";
import AdminLayoutClient from "@/components/AdminLayoutClient";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // Server Component to fetch session
  const sessionPromise = auth();

  return (
    <AdminLayoutContent sessionPromise={sessionPromise}>
      {children}
    </AdminLayoutContent>
  );
}

// Separate async component inside layout to handle await
async function AdminLayoutContent({
  sessionPromise,
  children,
}: {
  sessionPromise: Promise<any>;
  children: ReactNode;
}) {
  const session = await sessionPromise;

  if (!session || !session.user?.isAdmin) {
    redirect("/");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", iconName: "Home" },
    { label: "Articles", href: "/admin/articles", iconName: "FileText" },
    { label: "Authors", href: "/admin/authors", iconName: "Users" },
    { label: "Settings", href: "/admin/settings", iconName: "Settings" },
  ];

  const signOutAction = async () => {
    "use server";
    await signOut();
  };

  return (
    <AdminLayoutClient navItems={navItems} session={session} signOutAction={signOutAction}>
      {children}
    </AdminLayoutClient>
  );
}
