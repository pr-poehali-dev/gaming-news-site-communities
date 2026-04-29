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
import TournamentsPage from '@/pages/TournamentsPage';
import { UserProvider } from '@/context/UserContext';

type Page = 'home' | 'news' | 'tournaments' | 'communities' | 'forum' | 'profile' | 'search';

function AppBg() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.055 }}>
        <defs>
          <pattern id="appgrid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#e02020" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#appgrid)" />
      </svg>
      {/* Top-left glow */}
      <div className="absolute" style={{
        top: '-120px', left: '-120px',
        width: '520px', height: '520px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.1) 0%, transparent 65%)',
      }} />
      {/* Bottom-right glow */}
      <div className="absolute" style={{
        bottom: '-100px', right: '-100px',
        width: '440px', height: '440px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.07) 0%, transparent 65%)',
      }} />
      {/* Center horizontal line */}
      <div className="absolute" style={{
        top: '50%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(224,32,32,0.18) 30%, rgba(224,32,32,0.18) 70%, transparent 100%)',
      }} />
      {/* Diagonal accent */}
      <svg className="absolute top-0 right-0" width="300" height="300" style={{ opacity: 0.15 }}>
        <line x1="300" y1="0" x2="0" y2="300" stroke="#e02020" strokeWidth="0.8" />
        <line x1="300" y1="40" x2="40" y2="300" stroke="#333" strokeWidth="0.5" />
        <line x1="300" y1="80" x2="80" y2="300" stroke="#333" strokeWidth="0.3" />
      </svg>
      <svg className="absolute bottom-0 left-0" width="300" height="300" style={{ opacity: 0.15 }}>
        <line x1="0" y1="300" x2="300" y2="0" stroke="#e02020" strokeWidth="0.8" />
        <line x1="0" y1="260" x2="260" y2="0" stroke="#333" strokeWidth="0.5" />
        <line x1="0" y1="220" x2="220" y2="0" stroke="#333" strokeWidth="0.3" />
      </svg>
      {/* Scan line animation */}
      <div className="absolute left-0 right-0" style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(224,32,32,0.3), transparent)',
        animation: 'scanline 12s linear infinite',
      }} />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onPageChange={(p) => setCurrentPage(p as Page)} />;
      case 'news': return <NewsPage />;
      case 'tournaments': return <TournamentsPage />;
      case 'communities': return <CommunitiesPage />;
      case 'forum': return <ForumPage />;
      case 'profile': return <ProfilePage />;
      case 'search': return <SearchPage />;
      default: return <HomePage onPageChange={(p) => setCurrentPage(p as Page)} />;
    }
  };

  return (
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="relative" style={{ minHeight: '100vh' }}>
          <AppBg />
          <div className="relative" style={{ zIndex: 1 }}>
            <Navbar currentPage={currentPage} onPageChange={(page) => setCurrentPage(page as Page)} />
            <main>
              {renderPage()}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </UserProvider>
  );
}
