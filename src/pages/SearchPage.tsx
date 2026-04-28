import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Tab = 'news' | 'games' | 'users';

const allNews = [
  { title: 'The International 2025 по Dota 2 — призовой фонд $40 000 000', category: 'Турниры', time: '2 ч. назад' },
  { title: 'CS2: патч от 15 апреля — возврат de_inferno, нерф AWP', category: 'Обновления', time: '4 ч. назад' },
  { title: 'NAVI vs Team Spirit: финал PGL Major Copenhagen', category: 'Киберспорт', time: '8 ч. назад' },
  { title: 'Valorant Champions 2025 — расписание и составы', category: 'Киберспорт', time: '1 д. назад' },
];

const allGames = [
  { name: 'DOTA 2', genre: 'MOBA', players: '8.2M', rating: 9.4 },
  { name: 'COUNTER-STRIKE 2', genre: 'Шутер', players: '6.4M', rating: 9.1 },
  { name: 'VALORANT', genre: 'Шутер', players: '4.1M', rating: 8.7 },
  { name: 'LEAGUE OF LEGENDS', genre: 'MOBA', players: '3.8M', rating: 8.5 },
  { name: 'PUBG', genre: 'Battle Royale', players: '2.1M', rating: 7.9 },
  { name: 'MINECRAFT', genre: 'Сандбокс', players: '5.3M', rating: 9.6 },
];

const allUsers = [
  { name: 's1mple_fan_RU', rank: 'FACEIT 10', game: 'Counter-Strike 2', online: true },
  { name: 'Dota2_Divine', rank: 'Divine 5', game: 'Dota 2', online: true },
  { name: 'ValorantRadiant', rank: 'Radiant', game: 'Valorant', online: false },
  { name: 'LoL_Challenger', rank: 'Challenger', game: 'League of Legends', online: true },
];

export default function SearchPage({ query }: { query?: string }) {
  const [search, setSearch] = useState(query || '');
  const [tab, setTab] = useState<Tab>('news');

  const filteredNews = allNews.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));
  const filteredGames = allGames.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.genre.toLowerCase().includes(search.toLowerCase()));
  const filteredUsers = allUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  const tabs = [
    { id: 'news' as Tab, label: 'Новости', count: filteredNews.length },
    { id: 'games' as Tab, label: 'Игры', count: filteredGames.length },
    { id: 'users' as Tab, label: 'Пользователи', count: filteredUsers.length },
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
      <div className="px-6 md:px-16 py-10" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-label mb-4">
          <h1 className="font-display text-2xl font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>ПОИСК</h1>
        </div>
        <div className="relative max-w-xl ml-4">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по новостям, играм и пользователям..."
            className="g-input w-full pl-10 pr-4 py-3 text-base"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }}>
              <Icon name="X" size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="px-6 md:px-16 py-6">
        {/* Tabs */}
        <div className="flex gap-6 mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-2"
              style={{
                fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                color: tab === t.id ? 'var(--text-primary)' : 'var(--text-dim)',
                borderBottom: tab === t.id ? '2px solid var(--red)' : '2px solid transparent',
                paddingBottom: '10px', marginBottom: '-1px', transition: 'all 0.2s',
              }}
            >
              {t.label}
              <span style={{ background: tab === t.id ? 'var(--red)' : 'var(--border-color)', color: tab === t.id ? '#fff' : 'var(--text-dim)', fontSize: '7px', padding: '1px 5px', fontFamily: 'Orbitron' }}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* News results */}
        {tab === 'news' && (
          <div style={{ border: '1px solid var(--border-color)' }}>
            {filteredNews.map((n, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors"
                style={{ borderBottom: i < filteredNews.length - 1 ? '1px solid var(--border-color)' : 'none', background: 'var(--bg-card)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}
              >
                <Icon name="Newspaper" size={14} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                <div className="flex-1">
                  <p className="font-body font-semibold" style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{n.title}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="tag-red">{n.category.toUpperCase()}</span>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{n.time}</span>
                  </div>
                </div>
                <Icon name="ChevronRight" size={13} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
              </div>
            ))}
            {filteredNews.length === 0 && <Empty />}
          </div>
        )}

        {/* Games results */}
        {tab === 'games' && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredGames.map((g, i) => (
              <div key={i} className="g-card p-5 cursor-pointer">
                <h3 className="font-display font-black mb-1" style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{g.name}</h3>
                <p style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', marginBottom: '10px' }}>{g.genre.toUpperCase()} · {g.players} ИГРОКОВ</p>
                <div className="flex items-center gap-1.5">
                  <Icon name="Star" size={10} style={{ color: 'var(--red)' }} />
                  <span style={{ fontFamily: 'Orbitron', fontSize: '9px', color: 'var(--text-secondary)' }}>{g.rating}</span>
                </div>
              </div>
            ))}
            {filteredGames.length === 0 && <Empty />}
          </div>
        )}

        {/* Users results */}
        {tab === 'users' && (
          <div style={{ border: '1px solid var(--border-color)' }}>
            {filteredUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors"
                style={{ borderBottom: i < filteredUsers.length - 1 ? '1px solid var(--border-color)' : 'none', background: 'var(--bg-card)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}
              >
                <div className="w-9 h-9 flex items-center justify-center font-display font-black" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '13px' }}>
                  {u.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-black" style={{ fontSize: '11px', color: 'var(--text-primary)' }}>{u.name}</p>
                    {u.online && <div className="dot-green" style={{ width: '5px', height: '5px' }}></div>}
                  </div>
                  <p style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', marginTop: '2px' }}>{u.rank} · {u.game.toUpperCase()}</p>
                </div>
                <button className="btn-ghost" style={{ padding: '5px 14px', fontSize: '8px' }}>Профиль</button>
              </div>
            ))}
            {filteredUsers.length === 0 && <Empty />}
          </div>
        )}
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className="text-center py-14" style={{ background: 'var(--bg-card)' }}>
      <Icon name="Search" size={28} style={{ color: 'var(--text-dim)', margin: '0 auto 10px' }} />
      <p style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)' }}>НИЧЕГО НЕ НАЙДЕНО</p>
    </div>
  );
}