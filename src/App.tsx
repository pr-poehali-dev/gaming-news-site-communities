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
  { x: 50, y: 50 }, { x: 72, y: 15 }, { x: 18, y: 55 }, { x: 90, y: 70 }, { x: 40, y: 95 },
  { x: 6,  y: 35 }, { x: 80, y: 95 }, { x: 55, y: 40 }, { x: 28, y: 15 }, { x: 96, y: 15 },
];

const WEB_EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],
  [10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],
  [18,7],[19,20],[20,21],[21,22],[22,23],[23,24],[15,19],[8,15],
  [2,26],[26,9],[26,14],[27,0],[27,10],[28,19],[28,16],[29,13],
  [29,21],[4,8],[1,27],[6,18],[24,23],[5,17],[3,26],[11,29],
  [20,28],[7,19],[9,29],[16,28],[25,17],[25,19],[0,12],[2,8],
  [30,8],[30,9],[30,14],[30,15],[30,16],[31,5],[31,4],[31,38],
  [32,11],[32,12],[32,35],[33,17],[33,18],[33,25],[34,21],[34,22],
  [35,0],[35,27],[36,20],[36,25],[37,8],[37,26],[38,1],[38,39],
  [39,5],[39,6],[30,37],[32,29],[36,28],[33,19],[34,23],
];

function AppBg() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />

      {/* Abstract web SVG */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ngRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e02020" stopOpacity="1" />
            <stop offset="100%" stopColor="#e02020" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ngDim" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#444" stopOpacity="1" />
            <stop offset="100%" stopColor="#444" stopOpacity="0" />
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="softBlur"><feGaussianBlur stdDeviation="1.5"/></filter>

          {/* Animated dash pattern */}
          <style>{`
            @keyframes dashMove { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
            @keyframes fadeInOut { 0%,100%{opacity:0.15} 50%{opacity:0.6} }
            @keyframes rotateSlow { from{transform-origin:50% 50%;transform:rotate(0deg)} to{transform-origin:50% 50%;transform:rotate(360deg)} }
            .web-edge-anim { animation: dashMove 8s linear infinite; }
            .pulse-ring { animation: fadeInOut 4s ease-in-out infinite; }
            .pulse-ring-2 { animation: fadeInOut 4s ease-in-out 2s infinite; }
          `}</style>
        </defs>

        {/* Structural diagonal lines — bolder */}
        <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="#252525" strokeWidth="0.8" strokeOpacity="0.9" />
        <line x1="100%" y1="0%" x2="0%" y2="100%" stroke="#252525" strokeWidth="0.8" strokeOpacity="0.9" />
        <line x1="50%" y1="0%" x2="0%" y2="100%" stroke="#e02020" strokeWidth="0.6" strokeOpacity="0.15" />
        <line x1="50%" y1="0%" x2="100%" y2="100%" stroke="#e02020" strokeWidth="0.6" strokeOpacity="0.15" />
        <line x1="0%" y1="50%" x2="100%" y2="0%" stroke="#2a2a2a" strokeWidth="0.5" strokeOpacity="0.7" />
        <line x1="0%" y1="50%" x2="100%" y2="100%" stroke="#2a2a2a" strokeWidth="0.5" strokeOpacity="0.7" />
        <line x1="25%" y1="0%" x2="75%" y2="100%" stroke="#222" strokeWidth="0.4" strokeOpacity="0.6" />
        <line x1="75%" y1="0%" x2="25%" y2="100%" stroke="#222" strokeWidth="0.4" strokeOpacity="0.6" />

        {/* Concentric circles — center abstract decoration */}
        <circle cx="50%" cy="48%" r="180" fill="none" stroke="#e02020" strokeWidth="0.5" strokeOpacity="0.12" className="pulse-ring" />
        <circle cx="50%" cy="48%" r="280" fill="none" stroke="#e02020" strokeWidth="0.4" strokeOpacity="0.08" className="pulse-ring-2" />
        <circle cx="50%" cy="48%" r="380" fill="none" stroke="#e02020" strokeWidth="0.3" strokeOpacity="0.05" className="pulse-ring" />
        <circle cx="50%" cy="48%" r="90" fill="none" stroke="#333" strokeWidth="0.8" strokeOpacity="0.5" />
        <circle cx="50%" cy="48%" r="480" fill="none" stroke="#252525" strokeWidth="0.5" strokeOpacity="0.5" />
        <circle cx="50%" cy="48%" r="600" fill="none" stroke="#252525" strokeWidth="0.4" strokeOpacity="0.4" />

        {/* Corner arc decorations */}
        <path d="M 0 0 Q 150 0 150 150" fill="none" stroke="#e02020" strokeWidth="0.7" strokeOpacity="0.2" />
        <path d="M 0 0 Q 250 0 250 250" fill="none" stroke="#333" strokeWidth="0.5" strokeOpacity="0.4" />
        <path d="M 100% 0 Q calc(100% - 150px) 0 calc(100% - 150px) 150px" fill="none" stroke="#e02020" strokeWidth="0.7" strokeOpacity="0.2" />
        <path d="M 0 100% Q 0 calc(100% - 150px) 150px calc(100% - 150px)" fill="none" stroke="#e02020" strokeWidth="0.7" strokeOpacity="0.15" />

        {/* Animated web edges */}
        {WEB_EDGES.map(([a, b], i) => {
          const na = WEB_NODES[a], nb = WEB_NODES[b];
          const isRed = i % 6 === 0;
          const isAnim = i % 11 === 0;
          return (
            <line key={i}
              x1={`${na.x}%`} y1={`${na.y}%`}
              x2={`${nb.x}%`} y2={`${nb.y}%`}
              stroke={isRed ? '#e02020' : '#303030'}
              strokeWidth={isRed ? '0.9' : '0.6'}
              strokeOpacity={isRed ? 0.5 : 0.8}
              strokeDasharray={isAnim ? '6 10' : undefined}
              className={isAnim ? 'web-edge-anim' : undefined}
            />
          );
        })}

        {/* Nodes */}
        {WEB_NODES.map((n, i) => {
          const isBig = i % 5 === 0;
          const isMed = i % 3 === 0 && !isBig;
          return (
            <g key={i}>
              {isBig && <>
                <circle cx={`${n.x}%`} cy={`${n.y}%`} r="14" fill="url(#ngRed)" filter="url(#softBlur)" opacity="0.45" />
                <circle cx={`${n.x}%`} cy={`${n.y}%`} r="3" fill="#e02020" opacity="0.9" filter="url(#glow)" />
              </>}
              {isMed && !isBig && <>
                <circle cx={`${n.x}%`} cy={`${n.y}%`} r="8" fill="url(#ngDim)" filter="url(#softBlur)" opacity="0.35" />
                <circle cx={`${n.x}%`} cy={`${n.y}%`} r="1.8" fill="#444" opacity="0.9" />
              </>}
              {!isBig && !isMed && (
                <circle cx={`${n.x}%`} cy={`${n.y}%`} r="1.2" fill="#303030" opacity="0.8" />
              )}
            </g>
          );
        })}

        {/* Horizontal accent lines */}
        <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="#e02020" strokeWidth="0.3" strokeOpacity="0.07" />
        <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="#e02020" strokeWidth="0.3" strokeOpacity="0.07" />
        <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#e02020" strokeWidth="0.4" strokeOpacity="0.1" />
        <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="#252525" strokeWidth="0.4" strokeOpacity="0.6" />
        <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="#252525" strokeWidth="0.4" strokeOpacity="0.6" />
      </svg>

      {/* Grid overlay — more visible */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.055 }}>
        <defs>
          <pattern id="appgrid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#e02020" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#appgrid)" />
      </svg>

      {/* Glows */}
      <div className="absolute" style={{
        top: '-60px', left: '-60px', width: '700px', height: '700px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.13) 0%, transparent 60%)',
      }} />
      <div className="absolute" style={{
        bottom: '-60px', right: '-60px', width: '600px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.1) 0%, transparent 60%)',
      }} />
      <div className="absolute" style={{
        top: '35%', left: '40%', width: '600px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.07) 0%, transparent 65%)',
        transform: 'translate(-50%,-50%)',
      }} />
      <div className="absolute" style={{
        top: '10%', right: '10%', width: '300px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.06) 0%, transparent 70%)',
      }} />
      <div className="absolute" style={{
        bottom: '20%', left: '5%', width: '280px', height: '280px',
        background: 'radial-gradient(ellipse, rgba(224,32,32,0.05) 0%, transparent 70%)',
      }} />

      {/* Scan line */}
      <div className="absolute left-0 right-0" style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(224,32,32,0.35), transparent)',
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