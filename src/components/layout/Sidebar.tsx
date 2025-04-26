
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ to, icon: Icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <Link to={to} onClick={onClick}>
      <Button 
        variant="ghost" 
        className={cn(
          'w-full justify-start gap-3 mb-1 text-cafe-text-muted hover:text-white',
          active && 'bg-cafe-accent/10 text-cafe-accent'
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile menu button - positioned with more space */}
      <Button 
        variant="outline" 
        size="icon" 
        className="lg:hidden fixed top-4 left-4 z-50 bg-cafe-card border-cafe-border"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </Button>
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-cafe-card border-r border-cafe-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col h-full",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full max-h-screen overflow-y-auto">
          <div className="p-6 pt-8">
            <h1 className="text-2xl font-bold text-gradient">Cafe Vista</h1>
          </div>
          
          <div className="px-4 flex-1 overflow-y-auto">
            <SidebarItem 
              to="/" 
              icon={Home} 
              label="Dashboard" 
              active={location.pathname === '/'} 
              onClick={closeSidebar}
            />
            <SidebarItem 
              to="/purchases" 
              icon={DollarSign} 
              label="Purchases" 
              active={location.pathname === '/purchases'}
              onClick={closeSidebar} 
            />
            <SidebarItem 
              to="/sales" 
              icon={TrendingUp} 
              label="Sales" 
              active={location.pathname === '/sales'} 
              onClick={closeSidebar}
            />
            <SidebarItem 
              to="/settings" 
              icon={Settings} 
              label="Settings" 
              active={location.pathname === '/settings'} 
              onClick={closeSidebar}
            />
          </div>
          
          <div className="p-4 border-t border-cafe-border mt-auto">
            <Button variant="ghost" className="w-full justify-start gap-3 text-cafe-text-muted hover:text-white">
              <LogOut size={20} />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
