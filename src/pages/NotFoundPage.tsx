
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cafe-background p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-cafe-text-muted mb-8 max-w-md mx-auto">
          The page you're looking for doesn't seem to exist. Please check the URL or return to the dashboard.
        </p>
        <Link to="/">
          <Button className="bg-cafe-accent hover:bg-cafe-accent-light button-glow">
            <Home size={16} className="mr-2" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
