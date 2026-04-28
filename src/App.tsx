import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import NewsPage from '@/pages/NewsPage';
import CommunitiesPage from '@/pages/CommunitiesPage';
import ForumPage from '@/pages/ForumPage';
import ProfilePage from '@/pages/ProfilePage';
import SearchPage from '@/pages/SearchPage';

type Page = 'home' | 'news' | 'communities' | 'forum' | 'profile' | 'search';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onPageChange={(p) => setCurrentPage(p as Page)} />;
      case 'news': return <NewsPage />;
      case 'communities': return <CommunitiesPage />;
      case 'forum': return <ForumPage />;
      case 'profile': return <ProfilePage />;
      case 'search': return <SearchPage />;
      default: return <HomePage onPageChange={(p) => setCurrentPage(p as Page)} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="scanlines" style={{ minHeight: '100vh', background: 'var(--dark-bg)' }}>
        <Navbar currentPage={currentPage} onPageChange={(page) => setCurrentPage(page as Page)} />
        <main>
          {renderPage()}
        </main>
      </div>
    </TooltipProvider>
  );
}
