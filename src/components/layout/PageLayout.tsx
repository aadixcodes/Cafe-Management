
import React from 'react';
import { Sidebar } from './Sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-cafe-background flex">
      <Sidebar />
      <div className="flex-1 lg:pl-64 min-h-screen">
        <main className="p-4 md:p-6 lg:p-8 pt-16 md:pt-6 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
