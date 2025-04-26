
import React from 'react';
import { Sidebar } from './Sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-cafe-background flex overflow-x-hidden w-full">
      <Sidebar />
      <div className="flex-1 lg:pl-64 min-h-screen w-full">
        <main className="p-4 md:p-6 lg:p-8 pt-20 lg:pt-8 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
