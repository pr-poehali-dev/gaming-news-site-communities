import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'news', label: 'Новости', icon: 'Newspaper' },
  { id: 'tournaments', label: 'Турниры', icon: 'Trophy' },
  { id: 'communities', label: 'Сообщества', icon: 'Users' },
  { id: 'forum', label: 'Форум', icon: 'MessageSquare' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(20,20,20,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="flex items-center justify-between px-6 md:px-10 h-14">

        {/* Logo */}
        <button onClick={() => onPageChange('home')} className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center" style={{ background: 'var(--red)' }}>
            <Icon name="Gamepad2" size={13} style={{ color: '#fff' }} />
          </div>
          <span className="font-display text-sm font-black" style={{ color: 'var(--text-primary)', letterSpacing: '4px' }}>
            NEXUS
          </span>
        </button>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск..."
              className="g-input pl-8 pr-3 py-1.5 text-sm w-36 focus:w-48 transition-all duration-300"
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="dot-red"></div>
            <span style={{ color: 'var(--text-dim)', fontSize: '10px', fontFamily: 'Orbitron', letterSpacing: '1px' }}>47 892</span>
          </div>

          <button
            onClick={() => onPageChange('profile')}
            className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
          >
            <Icon name="User" size={14} style={{ color: 'var(--text-secondary)' }} />
          </button>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--text-secondary)' }}>
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onPageChange(item.id); setMobileOpen(false); }}
              className="flex items-center gap-3 w-full py-3"
              style={{
                color: currentPage === item.id ? 'var(--red)' : 'var(--text-secondary)',
                borderBottom: '1px solid var(--border-color)',
                fontFamily: 'Orbitron', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase'
              }}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
          <input type="text" placeholder="Поиск..." className="g-input w-full px-3 py-2 mt-3 text-sm" />
        </div>
      )}
    </nav>
  );
}