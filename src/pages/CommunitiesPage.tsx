import { useState } from 'react';
import Icon from '@/components/ui/icon';

const communities = [
  { id: 1, name: 'CYBER PROTOCOL OFFICIAL', game: 'Cyber Protocol', members: '84K', online: 2341, category: 'Battle Royale', level: 'ELITE', color: 'var(--neon-green)' },
  { id: 2, name: 'VOID RUNNERS SQUAD', game: 'Void Runners', members: '52K', online: 1820, category: 'MOBA', level: 'PRO', color: 'var(--neon-cyan)' },
  { id: 3, name: 'RU GAMERS COMMUNITY', game: 'Мультиигровое', members: '210K', online: 5420, category: 'Общее', level: 'LEGEND', color: 'var(--neon-purple)' },
  { id: 4, name: 'IRON CITADEL GUILD', game: 'Iron Citadel', members: '31K', online: 876, category: 'RTS', level: 'PRO', color: '#ff9900' },
  { id: 5, name: 'NEON DRIFT RACERS', game: 'Neon Drift', members: '18K', online: 640, category: 'Racing', level: 'ROOKIE', color: 'var(--neon-pink)' },
  { id: 6, name: 'SHADOW REALM GUILD', game: 'Shadow Realm', members: '43K', online: 1100, category: 'RPG', level: 'ELITE', color: 'var(--neon-purple)' },
];

const levelColors: Record<string, string> = {
  'LEGEND': 'var(--neon-pink)',
  'ELITE': 'var(--neon-cyan)',
  'PRO': 'var(--neon-green)',
  'ROOKIE': '#ff9900',
};

const categories = ['Все', 'Battle Royale', 'MOBA', 'RPG', 'RTS', 'Racing', 'Общее'];

export default function CommunitiesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');

  const filtered = communities.filter(c => {
    const matchCat = activeCategory === 'Все' || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.game.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen px-6 md:px-16 pt-24 pb-16" style={{ background: 'var(--dark-bg)' }}>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8" style={{ background: 'var(--neon-purple)' }}></div>
          <h1 className="font-display text-3xl font-black tracking-wider" style={{ color: '#fff' }}>СООБЩЕСТВА</h1>
        </div>
        <p className="font-body text-sm ml-4" style={{ color: '#5a7a8a' }}>12,400+ активных сообществ по всем играм и жанрам</p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-lg">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neon-purple)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск сообществ, игр..."
            className="cyber-input w-full pl-9 pr-4 py-2.5 text-sm"
          />
        </div>
        <button className="cyber-btn flex items-center gap-2">
          <Icon name="Plus" size={14} />
          Создать
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="font-mono text-xs px-4 py-1.5 tracking-wider transition-all duration-200"
            style={{
              background: activeCategory === cat ? 'var(--neon-purple)' : 'transparent',
              color: activeCategory === cat ? '#fff' : '#5a7a8a',
              border: `1px solid ${activeCategory === cat ? 'var(--neon-purple)' : 'var(--dark-border)'}`,
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Communities grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((community, i) => (
          <div key={community.id} className="game-card hud-corner cursor-pointer group" style={{ animationDelay: `${i * 0.08}s` }}>
            {/* Top accent */}
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${community.color}, transparent)` }}></div>
            
            <div className="p-5">
              {/* Level badge */}
              <div className="flex items-start justify-between mb-4">
                <span className="font-display text-xs font-bold px-2 py-0.5" style={{
                  color: levelColors[community.level],
                  border: `1px solid ${levelColors[community.level]}`,
                  fontSize: '9px',
                  letterSpacing: '2px',
                }}>
                  {community.level}
                </span>
                <div className="flex items-center gap-1">
                  <div className="online-dot" style={{ background: community.color, boxShadow: `0 0 6px ${community.color}` }}></div>
                  <span className="font-mono text-xs" style={{ color: community.color, fontSize: '10px' }}>{community.online.toLocaleString()}</span>
                </div>
              </div>

              {/* Name */}
              <h3 className="font-display text-sm font-black mb-1 group-hover:text-white transition-colors" style={{ color: '#e0f0ff', letterSpacing: '0.5px' }}>
                {community.name}
              </h3>
              <p className="font-body text-xs mb-4" style={{ color: community.color, opacity: 0.8 }}>{community.game}</p>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Icon name="Users" size={12} style={{ color: '#3a5a6a' }} />
                  <span className="font-mono text-xs" style={{ color: '#7a9db5', fontSize: '11px' }}>{community.members} участников</span>
                </div>
                <span className="font-mono text-xs px-2 py-0.5" style={{ color: '#5a7a8a', border: '1px solid var(--dark-border)', fontSize: '9px' }}>
                  {community.category.toUpperCase()}
                </span>
              </div>

              {/* Join button */}
              <button
                className="w-full py-2 font-display text-xs font-bold tracking-widest transition-all duration-200 group-hover:opacity-100 opacity-70"
                style={{ border: `1px solid ${community.color}`, color: community.color, background: `rgba(0,0,0,0.3)` }}
              >
                ВСТУПИТЬ
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-display text-sm tracking-widest" style={{ color: '#3a5a6a' }}>НИЧЕГО НЕ НАЙДЕНО</p>
        </div>
      )}
    </div>
  );
}
