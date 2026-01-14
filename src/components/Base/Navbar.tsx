'use client';
import * as React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/* ---------------- Logo ---------------- */
const Logo = (props: React.SVGAttributes<SVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 324 323" fill="currentColor" {...props}>
    <rect x="88" y="145" width="152" height="37" rx="18" transform="rotate(-38.6 88 145)" />
    <rect x="85" y="245" width="152" height="37" rx="18" transform="rotate(-38.6 85 245)" />
  </svg>
);

/* ---------------- Hamburger ---------------- */
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 12L20 12" />
    <path d="M4 12H20" />
    <path d="M4 12H20" />
  </svg>
);

/* ---------------- Navbar ---------------- */
export default function Navbar() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.isAdmin;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/news', label: 'News' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Logo className="text-primary" />
            <span>NewsPortal</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {status === 'loading' ? null : session ? (
            <>
              {isAdmin && (
                <Button asChild variant="secondary" size="sm">
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => signIn('google')}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export { Logo, HamburgerIcon };