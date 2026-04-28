import { useState } from 'react';
import Icon from '@/components/ui/icon';

const communities = [
  { id: 1, name: 'CYBER PROTOCOL OFFICIAL', game: 'Cyber Protocol', members: '84K', online: 2341, category: 'Battle Royale' },
  { id: 2, name: 'VOID RUNNERS SQUAD', game: 'Void Runners', members: '52K', online: 1820, category: 'MOBA' },
  { id: 3, name: 'RU GAMERS COMMUNITY', game: 'Мультиигровое', members: '210K', online: 5420, category: 'Общее' },
  { id: 4, name: 'IRON CITADEL GUILD', game: 'Iron Citadel', members: '31K', online: 876, category: 'RTS' },
  { id: 5, name: 'NEON DRIFT RACERS', game: 'Neon Drift', members: '18K', online: 640, category: 'Racing' },
  { id: 6, name: 'SHADOW REALM GUILD', game: 'Shadow Realm', members: '43K', online: 1100, category: 'RPG' },
];

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

                <button className="btn-ghost w-full" style={{ padding: '8px', fontSize: '9px' }}>
                  Вступить
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
