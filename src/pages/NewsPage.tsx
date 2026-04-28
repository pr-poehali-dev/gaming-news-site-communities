import { useState } from 'react';
import Icon from '@/components/ui/icon';

const categories = ['Все', 'Турниры', 'Обновления', 'Инди', 'Железо', 'Рейтинги', 'Киберспорт'];

const news = [
  { id: 1, title: 'The International 2025 по Dota 2 — призовой фонд превысил $40 000 000', category: 'Турниры', time: '2 ч. назад', views: '84.2K', comments: 1342 },
  { id: 2, title: 'CS2: патч от 15 апреля — возврат de_inferno, нерф AWP, фикс лагов на серверах', category: 'Обновления', time: '4 ч. назад', views: '31.7K', comments: 876 },
  { id: 3, title: 'NAVI vs Team Spirit: финал PGL Major Copenhagen — разбор по картам', category: 'Киберспорт', time: '8 ч. назад', views: '54.5K', comments: 2104 },
  { id: 4, title: 'NVIDIA RTX 5090: тест в Dota 2, CS2, Valorant и Cyberpunk 2077', category: 'Железо', time: '1 д. назад', views: '29.3K', comments: 541 },
  { id: 5, title: 'Hollow Knight: Silksong — дата выхода подтверждена, первый геймплей', category: 'Инди', time: '1 д. назад', views: '18.6K', comments: 934 },
  { id: 6, title: 'Valorant Champions 2025 — расписание, составы команд и прогнозы', category: 'Киберспорт', time: '2 д. назад', views: '22.1K', comments: 398 },
  { id: 7, title: 'Steam Sale 2025: скидки до 90% на GTA V, Elden Ring, Red Dead Redemption 2', category: 'Обновления', time: '2 д. назад', views: '76.4K', comments: 2891 },
  { id: 8, title: 'League of Legends Worlds 2025 — Group Stage: T1 и G2 лидируют в группах', category: 'Киберспорт', time: '3 д. назад', views: '41.3K', comments: 1203 },
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
            <div
              key={item.id}
              className={`g-card g-card-red p-5 cursor-pointer fade-up-${Math.min(i + 1, 5)}`}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
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