import { useState, useCallback } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shirt, 
  ClipboardPlus, 
  Activity, 
  CreditCard,
  Menu,
  X,
  Scissors
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PullToRefresh } from '@/components/PullToRefresh';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingActionButton from '@/components/FloatingActionButton';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/workers', icon: Users, label: 'Workers' },
  { to: '/uniform-items', icon: Shirt, label: 'Uniform Items' },
  { to: '/new-order', icon: ClipboardPlus, label: 'New Order' },
  { to: '/production', icon: Activity, label: 'Production' },
  { to: '/payments', icon: CreditCard, label: 'Payments' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleRefresh = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setRefreshKey(prev => prev + 1);
  }, []);

  const currentPage = navItems.find(item => item.to === location.pathname);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 h-16 px-5 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Scissors className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-sidebar-accent-foreground truncate tracking-tight">
              UniformFlow
            </h1>
            <p className="text-[10px] text-sidebar-muted truncate">Production Manager</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted px-3 mb-2">
            Menu
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/25"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-[10px] text-sidebar-muted text-center">
            © 2024 UniformFlow
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-4 lg:px-6 gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1 flex items-center gap-3">
            {currentPage && (
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <currentPage.icon className="h-4 w-4 text-primary" />
              </div>
            )}
            <div>
              <h2 className="text-base font-semibold text-foreground leading-tight">
                {currentPage?.label || 'Dashboard'}
              </h2>
            </div>
          </div>
        </header>

        {/* Page Content */}
        {isMobile ? (
          <PullToRefresh onRefresh={handleRefresh} className="flex-1">
            <main className="p-4 md:p-6 lg:p-8" key={refreshKey}>
              <Outlet />
            </main>
          </PullToRefresh>
        ) : (
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        )}
        <FloatingActionButton />
      </div>
    </div>
  );
}
