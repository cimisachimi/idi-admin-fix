'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home' },
  { href: '/dashboard/testimonials', label: 'Testimonials' },
  { href: '/dashboard/gallery', label: 'Gallery' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleLogout = async () => {
    window.location.href = '/logout';
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 p-4 flex flex-col gap-4">
        <h2 className="text-xl font-bold px-4">Menu</h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        {children} {/* 👈 ONLY children here */}
      </main>
    </div>
  );
}
