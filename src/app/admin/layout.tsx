// src/app/admin/layout.tsx
import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, Users, Settings, Home } from "lucide-react";
import { ReactNode } from "react";

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
    { label: "Dashboard", href: "/admin", icon: Home },
    { label: "Articles", href: "/admin/articles", icon: FileText },
    { label: "Authors", href: "/admin/authors", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="mt-6 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Log out
          </button>
        </form>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-auto">{children}</main>
    </div>
  );
}
