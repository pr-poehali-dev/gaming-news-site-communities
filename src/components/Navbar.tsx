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
      <div className="flex items-center justify-between px-5 md:px-8 h-12">

        {/* Logo */}
        <button onClick={() => onPageChange('home')} className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center" style={{ background: 'var(--red)' }}>
            <Icon name="Gamepad2" size={11} style={{ color: '#fff' }} />
          </div>
          <span className="font-display text-xs font-black" style={{ color: 'var(--text-primary)', letterSpacing: '4px' }}>
            NEXUS
          </span>
        </button>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-5">
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
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Icon name="Search" size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск..."
              className="g-input pl-7 pr-3 py-1 text-xs w-32 focus:w-44 transition-all duration-300"
            />
          </div>

          <button
            onClick={() => onPageChange('profile')}
            className="w-7 h-7 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
          >
            <Icon name="User" size={13} style={{ color: 'var(--text-secondary)' }} />
          </button>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--text-secondary)' }}>
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={18} />
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