import { useState } from 'react';
import Icon from '@/components/ui/icon';

const categories = ['Все', 'Турниры', 'Обновления', 'Инди', 'Железо', 'Рейтинги', 'Киберспорт'];

const news = [
  { id: 1, title: 'NEXUS CUP 2026 — регистрация открыта, призовой фонд $1 000 000', category: 'Турниры', time: '2 ч. назад', views: '12.4K', comments: 234 },
  { id: 2, title: 'Cyber Protocol 3.7: новые карты, режим «Хаос» и переработанный баланс', category: 'Обновления', time: '5 ч. назад', views: '8.1K', comments: 87 },
  { id: 3, title: 'Рейтинг лучших геймеров России — апрель 2026, топ-100', category: 'Рейтинги', time: '1 д. назад', views: '34.5K', comments: 512 },
  { id: 4, title: 'NVIDIA RTX 5090 тест в 10 играх: реальные цифры производительности', category: 'Железо', time: '1 д. назад', views: '19.2K', comments: 341 },
  { id: 5, title: 'Инди-хит года: «Звёздный Вор» собрал 500K игроков за неделю', category: 'Инди', time: '2 д. назад', views: '7.3K', comments: 156 },
  { id: 6, title: 'ESL Pro League Season 22 — расписание матчей и составы команд', category: 'Киберспорт', time: '2 д. назад', views: '22.1K', comments: 98 },
  { id: 7, title: 'Steam Summer Sale 2026: игры со скидками до 90%', category: 'Обновления', time: '3 д. назад', views: '56.7K', comments: 1024 },
  { id: 8, title: 'Team Spirit выиграли Major с результатом 3:0 в финале', category: 'Киберспорт', time: '3 д. назад', views: '41.3K', comments: 783 },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');

  const filtered = news.filter(n => {
    const matchCat = activeCategory === 'Все' || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
      {/* Header */}
      <div className="px-6 md:px-16 py-10" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-label mb-1">
          <h1 className="font-display text-2xl font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>НОВОСТИ</h1>
        </div>
        <p className="ml-4" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Актуальные события игровой индустрии</p>
      </div>

      <div className="px-6 md:px-16 py-6">
        {/* Search + count */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative max-w-md flex-1">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по новостям..."
              className="g-input w-full pl-9 pr-4 py-2.5 text-sm"
            />
          </div>
          <div className="flex items-center gap-2" style={{ color: 'var(--text-dim)', fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '1px' }}>
            <Icon name="Filter" size={11} />
            {filtered.length} материалов
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div key={item.id} className={`g-card g-card-red p-5 cursor-pointer fade-up-${Math.min(i + 1, 5)}`}>
              <span className="tag-red mb-3 inline-block">{item.category.toUpperCase()}</span>
              <h3 className="font-body font-semibold mb-4 leading-snug" style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.55' }}>
                {item.title}
              </h3>
              <div className="flex items-center justify-between" style={{ paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{item.time}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={10} style={{ color: 'var(--text-dim)' }} />
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={10} style={{ color: 'var(--text-dim)' }} />
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{item.comments}</span>
                  </div>
                </div>
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
