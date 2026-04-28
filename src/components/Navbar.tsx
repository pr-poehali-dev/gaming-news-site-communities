import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'news', label: 'Новости', icon: 'Newspaper' },
  { id: 'communities', label: 'Сообщества', icon: 'Users' },
  { id: 'forum', label: 'Форум', icon: 'MessageSquare' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(5, 10, 14, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a3a4a' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-8 h-8 flex items-center justify-center" style={{ border: '1px solid var(--neon-green)', clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)' }}>
            <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--neon-green)', boxShadow: '0 0 10px var(--neon-green)' }}></div>
          </div>
          <span className="font-display text-xl font-black tracking-widest" style={{ color: 'var(--neon-green)', textShadow: '0 0 15px var(--neon-green)' }}>
            NEXUS
          </span>
          <span className="font-mono text-xs hidden sm:block" style={{ color: 'var(--neon-cyan)', opacity: 0.7 }}>v2.0.7</span>
        </button>

        {/* Center nav - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex items-center gap-2 px-4 py-2 font-body font-semibold text-sm tracking-wider uppercase transition-all duration-200 ${
                currentPage === item.id
                  ? 'nav-active'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{
                borderBottom: currentPage === item.id ? '2px solid var(--neon-green)' : '2px solid transparent',
                color: currentPage === item.id ? 'var(--neon-green)' : undefined,
              }}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Search + User */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className={`relative transition-all duration-300 ${searchFocused ? 'w-64' : 'w-40'} hidden sm:block`}>
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 z-10" style={{ color: 'var(--neon-green)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Поиск..."
              className="cyber-input w-full pl-9 pr-4 py-2 text-sm rounded-none"
              style={{ fontSize: '13px' }}
            />
          </div>

          {/* Online status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1" style={{ border: '1px solid var(--dark-border)' }}>
            <div className="online-dot"></div>
            <span className="font-mono text-xs" style={{ color: 'var(--neon-green)' }}>47,892 онлайн</span>
          </div>

          {/* Profile avatar */}
          <button
            onClick={() => onPageChange('profile')}
            className="relative w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{ border: '1px solid var(--neon-purple)', background: 'rgba(157, 0, 255, 0.1)' }}
          >
            <Icon name="User" size={16} style={{ color: 'var(--neon-purple)' }} />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--neon-green)', fontSize: '7px', color: '#000', fontWeight: 'bold' }}>5</div>
          </button>

          {/* Mobile menu */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--neon-green)' }}>
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4" style={{ borderTop: '1px solid var(--dark-border)' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onPageChange(item.id); setMobileOpen(false); }}
              className="flex items-center gap-3 w-full py-3 font-body font-semibold text-sm tracking-wider uppercase"
              style={{ color: currentPage === item.id ? 'var(--neon-green)' : '#aaa', borderBottom: '1px solid var(--dark-border)' }}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
          <div className="mt-3">
            <input
              type="text"
              placeholder="Поиск по новостям, играм, пользователям..."
              className="cyber-input w-full px-4 py-2 text-sm rounded-none"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
