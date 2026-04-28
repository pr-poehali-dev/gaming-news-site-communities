import { useState } from 'react';
import Icon from '@/components/ui/icon';

type SearchTab = 'news' | 'games' | 'users';

const allNews = [
  { title: 'NEXUS CUP 2026 — регистрация открыта', category: 'Турниры', time: '2 часа назад' },
  { title: 'Cyber Protocol 3.7: новые карты и режим «Хаос»', category: 'Обновления', time: '5 часов назад' },
  { title: 'Рейтинг лучших геймеров России — апрель 2026', category: 'Рейтинги', time: '1 день назад' },
];

const allGames = [
  { name: 'Cyber Protocol', genre: 'Battle Royale', players: '2.4M', rating: 9.2, icon: '🎮' },
  { name: 'Void Runners', genre: 'MOBA', players: '1.8M', rating: 8.7, icon: '⚔️' },
  { name: 'Iron Citadel', genre: 'RTS', players: '980K', rating: 8.1, icon: '🏰' },
  { name: 'Neon Drift', genre: 'Racing', players: '740K', rating: 7.9, icon: '🚗' },
  { name: 'Shadow Realm', genre: 'RPG', players: '620K', rating: 8.5, icon: '🧙' },
];

const allUsers = [
  { name: 'ProGamer_RU', rank: 'DIAMOND III', game: 'Cyber Protocol', online: true },
  { name: 'NightWolf_K', rank: 'LEGEND', game: 'Void Runners', online: true },
  { name: 'StrikerPRO', rank: 'PLATINUM I', game: 'Neon Drift', online: false },
  { name: 'ShadowFox_M', rank: 'GOLD II', game: 'Shadow Realm', online: true },
];

export default function SearchPage({ query }: { query?: string }) {
  const [search, setSearch] = useState(query || '');
  const [tab, setTab] = useState<SearchTab>('news');

  const filteredNews = allNews.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));
  const filteredGames = allGames.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.genre.toLowerCase().includes(search.toLowerCase()));
  const filteredUsers = allUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  const tabs: { id: SearchTab; label: string; count: number }[] = [
    { id: 'news', label: 'Новости', count: filteredNews.length },
    { id: 'games', label: 'Игры', count: filteredGames.length },
    { id: 'users', label: 'Пользователи', count: filteredUsers.length },
  ];

  return (
    <div className="min-h-screen px-6 md:px-16 pt-24 pb-16" style={{ background: 'var(--dark-bg)' }}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8" style={{ background: 'var(--neon-cyan)' }}></div>
          <h1 className="font-display text-3xl font-black tracking-wider" style={{ color: '#fff' }}>ПОИСК</h1>
        </div>

        {/* Search input */}
        <div className="relative max-w-2xl">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--neon-cyan)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по новостям, играм и пользователям..."
            className="cyber-input w-full pl-12 pr-4 py-3 text-base"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#3a5a6a' }}>
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8" style={{ borderBottom: '1px solid var(--dark-border)' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="font-display text-xs font-bold tracking-widest pb-3 flex items-center gap-2 transition-all duration-200"
            style={{
              color: tab === t.id ? 'var(--neon-cyan)' : '#3a5a6a',
              borderBottom: tab === t.id ? '2px solid var(--neon-cyan)' : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {t.label.toUpperCase()}
            <span className="font-mono text-xs px-1.5 py-0.5 rounded-sm" style={{ background: tab === t.id ? 'var(--neon-cyan)' : 'var(--dark-border)', color: tab === t.id ? '#000' : '#5a7a8a', fontSize: '9px' }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {tab === 'news' && (
        <div className="space-y-3">
          {filteredNews.map((n, i) => (
            <div key={i} className="game-card px-5 py-4 cursor-pointer group flex items-center gap-4">
              <Icon name="Newspaper" size={18} style={{ color: 'var(--neon-cyan)' }} />
              <div className="flex-1">
                <h3 className="font-body font-semibold text-sm group-hover:text-white transition-colors" style={{ color: '#c0d8e8' }}>{n.title}</h3>
                <div className="flex gap-3 mt-1">
                  <span className="font-mono text-xs" style={{ color: 'var(--neon-cyan)', fontSize: '10px' }}>{n.category}</span>
                  <span className="font-mono text-xs" style={{ color: '#2a4a5a', fontSize: '10px' }}>{n.time}</span>
                </div>
              </div>
              <Icon name="ChevronRight" size={14} style={{ color: '#3a5a6a' }} />
            </div>
          ))}
          {filteredNews.length === 0 && <Empty />}
        </div>
      )}

      {tab === 'games' && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredGames.map((g, i) => (
            <div key={i} className="game-card p-5 cursor-pointer group flex items-center gap-4">
              <div className="text-4xl">{g.icon}</div>
              <div className="flex-1">
                <h3 className="font-display text-sm font-bold group-hover:text-white transition-colors" style={{ color: '#e0f0ff', fontSize: '12px' }}>{g.name}</h3>
                <p className="font-mono text-xs mt-0.5" style={{ color: '#5a7a8a', fontSize: '10px' }}>{g.genre} • {g.players} игроков</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="Star" size={10} style={{ color: '#ff9900' }} />
                  <span className="font-mono text-xs" style={{ color: '#ff9900', fontSize: '10px' }}>{g.rating}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredGames.length === 0 && <Empty />}
        </div>
      )}

      {tab === 'users' && (
        <div className="space-y-3">
          {filteredUsers.map((u, i) => (
            <div key={i} className="game-card px-5 py-4 cursor-pointer group flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center font-display font-bold" style={{ border: '1px solid var(--neon-green)', background: 'rgba(0, 255, 136, 0.05)', color: 'var(--neon-green)' }}>
                {u.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-sm font-bold group-hover:text-white transition-colors" style={{ color: '#e0f0ff', fontSize: '12px' }}>{u.name}</h3>
                  {u.online && <div className="online-dot" style={{ width: '6px', height: '6px' }}></div>}
                </div>
                <p className="font-mono text-xs mt-0.5" style={{ color: '#5a7a8a', fontSize: '10px' }}>{u.rank} • {u.game}</p>
              </div>
              <button className="font-mono text-xs px-3 py-1" style={{ border: '1px solid var(--dark-border)', color: '#5a7a8a' }}>
                ПРОФИЛЬ
              </button>
            </div>
          ))}
          {filteredUsers.length === 0 && <Empty />}
        </div>
      )}
    </div>
  );
}

function Empty() {
  return (
    <div className="text-center py-16">
      <div className="text-4xl mb-4">🔍</div>
      <p className="font-display text-sm tracking-widest" style={{ color: '#3a5a6a' }}>НИЧЕГО НЕ НАЙДЕНО</p>
    </div>
  );
}
