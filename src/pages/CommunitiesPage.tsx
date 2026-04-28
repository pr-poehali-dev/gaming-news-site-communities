import { useState } from 'react';
import Icon from '@/components/ui/icon';

type JoinState = Record<number, boolean>;

const communities = [
  { id: 1, name: 'DOTA 2 RUSSIA', game: 'Dota 2', members: '214K', online: 8420, category: 'MOBA' },
  { id: 2, name: 'CS2 PRO SCENE RU', game: 'Counter-Strike 2', members: '178K', online: 6310, category: 'Шутер' },
  { id: 3, name: 'VALORANT CIS', game: 'Valorant', members: '95K', online: 3140, category: 'Шутер' },
  { id: 4, name: 'LoL РУССКОЕ СООБЩЕСТВО', game: 'League of Legends', members: '132K', online: 4280, category: 'MOBA' },
  { id: 5, name: 'PUBG CLAN RU', game: 'PUBG', members: '61K', online: 1870, category: 'Battle Royale' },
  { id: 6, name: 'MINECRAFT BUILDERS RU', game: 'Minecraft', members: '88K', online: 2950, category: 'Сандбокс' },
];

const categories = ['Все', 'MOBA', 'Шутер', 'Battle Royale', 'RPG', 'Сандбокс', 'Общее'];

export default function CommunitiesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [joined, setJoined] = useState<JoinState>({});

  const filtered = communities.filter(c => {
    const matchCat = activeCategory === 'Все' || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.game.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
      <div className="px-6 md:px-16 py-10" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-label mb-1">
          <h1 className="font-display text-2xl font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>СООБЩЕСТВА</h1>
        </div>
        <p className="ml-4" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>12 400+ активных сообществ по всем играм</p>
      </div>

      <div className="px-6 md:px-16 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative max-w-md flex-1">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск сообществ..."
              className="g-input w-full pl-9 pr-4 py-2.5 text-sm"
            />
          </div>
          <button className="btn-red flex items-center gap-2 self-start">
            <Icon name="Plus" size={13} />
            Создать
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <div key={c.id} className={`g-card g-card-red cursor-pointer fade-up-${Math.min(i + 1, 5)}`}>
              {/* Red top line */}
              <div style={{ height: '2px', background: 'var(--red)', opacity: 0.4 }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="tag-dim">{c.category.toUpperCase()}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="dot-green"></div>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{c.online.toLocaleString('ru')}</span>
                  </div>
                </div>

                <h3 className="font-display font-black mb-0.5" style={{ fontSize: '12px', color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
                  {c.name}
                </h3>
                <p style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', letterSpacing: '1px', marginBottom: '14px' }}>{c.game.toUpperCase()}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Users" size={11} style={{ color: 'var(--text-dim)' }} />
                    <span style={{ fontFamily: 'Orbitron', fontSize: '9px', color: 'var(--text-secondary)' }}>{c.members} участников</span>
                  </div>
                </div>

                <button
                  className={joined[c.id] ? 'btn-red w-full' : 'btn-ghost w-full'}
                  style={{ padding: '8px', fontSize: '9px' }}
                  onClick={() => setJoined(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                >
                  {joined[c.id] ? '✓ Вы вступили' : 'Вступить'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <Icon name="Search" size={32} style={{ color: 'var(--text-dim)', margin: '0 auto 12px' }} />
            <p style={{ fontFamily: 'Orbitron', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-dim)' }}>НИЧЕГО НЕ НАЙДЕНО</p>
          </div>
        )}
      </div>
    </div>
  );
}