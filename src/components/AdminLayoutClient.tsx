"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Users, Settings, Home } from "lucide-react";
import { ReactNode } from "react";

interface AdminLayoutClientProps {
  navItems: { label: string; href: string; iconName: string }[];
  session: any;
  children: ReactNode;
  signOutAction: () => Promise<void>;
}

export default function AdminLayoutClient({
  navItems,
  session,
  children,
  signOutAction,
}: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const iconMap = {
    Home,
    FileText,
    Users,
    Settings,
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-10 h-full w-64 bg-white shadow-md p-6 flex flex-col transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const IconComponent = iconMap[item.iconName as keyof typeof iconMap];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
              >
                <IconComponent className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form
          action={signOutAction}
        >
          <button className="mt-6 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Log out
          </button>
        </form>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-4 md:p-8 overflow-auto md:ml-0">
        {/* Hamburger button for mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white shadow-md rounded"
        >
          ☰
        </button>
        <div className="md:hidden h-16"></div> {/* Spacer for button */}
        {children}
      </main>
    </div>
  );
}