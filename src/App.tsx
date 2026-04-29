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

const WEB_NODES = [
  { x: 8,  y: 12 }, { x: 22, y: 5  }, { x: 38, y: 18 }, { x: 55, y: 8  }, { x: 70, y: 22 },
  { x: 85, y: 10 }, { x: 95, y: 30 }, { x: 78, y: 42 }, { x: 62, y: 35 }, { x: 48, y: 48 },
  { x: 30, y: 38 }, { x: 14, y: 45 }, { x: 5,  y: 60 }, { x: 20, y: 68 }, { x: 36, y: 58 },
  { x: 52, y: 70 }, { x: 68, y: 55 }, { x: 82, y: 65 }, { x: 92, y: 50 }, { x: 75, y: 78 },
  { x: 58, y: 85 }, { x: 42, y: 80 }, { x: 25, y: 88 }, { x: 10, y: 78 }, { x: 3,  y: 92 },
  { x: 88, y: 88 }, { x: 45, y: 30 }, { x: 15, y: 25 }, { x: 65, y: 72 }, { x: 33, y: 62 },
];

const WEB_EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],
  [10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],
  [18,7],[19,20],[20,21],[21,22],[22,23],[23,24],[15,19],[8,15],
  [2,26],[26,9],[26,14],[27,0],[27,10],[28,19],[28,16],[29,13],
  [29,21],[4,8],[1,27],[6,18],[24,23],[5,17],[3,26],[11,29],
  [20,28],[7,19],[9,29],[16,28],[25,17],[25,19],[0,12],[2,8],
];

function AppBg() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />

      {/* Web / network of lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e02020" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e02020" stopOpacity="0" />
          </radialGradient>
          <filter id="blur2">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Edges — thin dim lines */}
        {WEB_EDGES.map(([a, b], i) => {
          const na = WEB_NODES[a], nb = WEB_NODES[b];
          const isRed = i % 7 === 0;
          return (
            <line key={i}
              x1={`${na.x}%`} y1={`${na.y}%`}
              x2={`${nb.x}%`} y2={`${nb.y}%`}
              stroke={isRed ? '#e02020' : '#2a2a2a'}
              strokeWidth={isRed ? '0.7' : '0.5'}
              strokeOpacity={isRed ? 0.35 : 0.7}
            />
          );
        })}

        {/* Nodes */}
        {WEB_NODES.map((n, i) => {
          const isAccent = i % 5 === 0;
          return (
            <g key={i}>
              {isAccent && (
                <circle cx={`${n.x}%`} cy={`${n.y}%`} r="6" fill="url(#nodeGlow)" filter="url(#blur2)" opacity="0.5" />
              )}
              <circle cx={`${n.x}%`} cy={`${n.y}%`} r={isAccent ? '2' : '1.2'}
                fill={isAccent ? '#e02020' : '#2e2e2e'}
                opacity={isAccent ? 0.7 : 0.9}
              />
            </g>
          );
        })}

        {/* Thin diagonal structural lines */}
        <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="#1e1e1e" strokeWidth="0.4" strokeOpacity="0.6" />
        <line x1="100%" y1="0%" x2="0%" y2="100%" stroke="#1e1e1e" strokeWidth="0.4" strokeOpacity="0.6" />
        <line x1="50%" y1="0%" x2="0%" y2="100%" stroke="#e02020" strokeWidth="0.3" strokeOpacity="0.08" />
        <line x1="50%" y1="0%" x2="100%" y2="100%" stroke="#e02020" strokeWidth="0.3" strokeOpacity="0.08" />
      </svg>

      {/* Subtle grid overlay */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.03 }}>
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
        width: '600px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.09) 0%, transparent 65%)',
      }} />
      {/* Bottom-right glow */}
      <div className="absolute" style={{
        bottom: '-100px', right: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.07) 0%, transparent 65%)',
      }} />
      {/* Center glow */}
      <div className="absolute" style={{
        top: '40%', left: '45%',
        width: '400px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.04) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)',
      }} />

      {/* Horizontal accent line */}
      <div className="absolute" style={{
        top: '50%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(224,32,32,0.12) 30%, rgba(224,32,32,0.12) 70%, transparent 100%)',
      }} />

      {/* Scan line */}
      <div className="absolute left-0 right-0" style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(224,32,32,0.25), transparent)',
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