import { Link, useRouterState } from '@tanstack/react-router';
import AuthButton from './AuthButton';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

export default function TopNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/help', label: 'Help' },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`${
            currentPath === link.path
              ? 'text-primary font-semibold'
              : 'text-foreground hover:text-primary'
          } transition-colors ${mobile ? 'block py-2 text-lg' : ''}`}
          onClick={() => mobile && setMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/assets/generated/nav-logo.dim_48x48.png" 
              alt="Dawateiqra Organization" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-foreground">
              Dawateiqra
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <AuthButton />
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <img 
                    src="/assets/generated/nav-logo.dim_48x48.png" 
                    alt="Dawateiqra Organization" 
                    className="h-10 w-10 object-contain"
                  />
                  <span className="text-lg font-bold text-foreground">
                    Dawateiqra
                  </span>
                </div>
                <NavLinks mobile />
                <div className="pt-4 border-t border-border">
                  <AuthButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
