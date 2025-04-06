
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Code, DollarSign, PlayCircle, LayoutDashboard, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Features', href: '/features', icon: Code },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
    { name: 'Demo', href: '/demo', icon: PlayCircle },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">AI Blog Writer</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild className="btn-gradient">
              <Link to="/demo">Try for free</Link>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-30 bg-background/95 backdrop-blur-sm transition-all duration-300 md:hidden pt-16",
        mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <nav className="container py-8 flex flex-col gap-4">
          {navigationItems.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className="text-lg font-medium py-2 flex items-center gap-3 border-b border-border/40"
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          <Button asChild className="mt-4">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
          </Button>
        </nav>
      </div>
      
      {/* Main content */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-bold text-lg">AI Blog Writer</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Blog Writer. All rights reserved.
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
