import { useState } from 'react';
import Icon from '@/components/ui/icon';

const categories = ['Все', 'Турниры', 'Обновления', 'Инди', 'Железо', 'Рейтинги', 'Киберспорт'];

const news = [
  { id: 1, title: 'NEXUS CUP 2026 — регистрация открыта, призовой фонд $1,000,000', category: 'Турниры', time: '2 часа назад', views: '12.4K', comments: 234, hot: true, image: '🏆' },
  { id: 2, title: 'Cyber Protocol 3.7: новые карты, режим «Хаос» и переработанный баланс', category: 'Обновления', time: '5 часов назад', views: '8.1K', comments: 87, hot: false, image: '🎮' },
  { id: 3, title: 'Рейтинг лучших геймеров России — апрель 2026, топ-100', category: 'Рейтинги', time: '1 день назад', views: '34.5K', comments: 512, hot: true, image: '📊' },
  { id: 4, title: 'NVIDIA RTX 5090 тест в 10 играх: реальные цифры производительности', category: 'Железо', time: '1 день назад', views: '19.2K', comments: 341, hot: false, image: '💻' },
  { id: 5, title: 'Инди-хит года: «Звёздный Вор» собрал 500K игроков за неделю', category: 'Инди', time: '2 дня назад', views: '7.3K', comments: 156, hot: true, image: '⭐' },
  { id: 6, title: 'ESL Pro League Season 22 — расписание матчей и составы команд', category: 'Киберспорт', time: '2 дня назад', views: '22.1K', comments: 98, hot: false, image: '🎯' },
  { id: 7, title: 'Steam Summer Sale 2026: список игр со скидками до 90%', category: 'Обновления', time: '3 дня назад', views: '56.7K', comments: 1024, hot: true, image: '🎁' },
  { id: 8, title: 'Team Spirit выиграли Major с результатом 3:0 в финале', category: 'Киберспорт', time: '3 дня назад', views: '41.3K', comments: 783, hot: true, image: '🌟' },
];

const categoryColors: Record<string, string> = {
  'Турниры': 'var(--neon-pink)',
  'Обновления': 'var(--neon-cyan)',
  'Инди': 'var(--neon-green)',
  'Железо': '#ff9900',
  'Рейтинги': 'var(--neon-purple)',
  'Киберспорт': 'var(--neon-green)',
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = news.filter(n => {
    const matchCat = activeCategory === 'Все' || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen px-6 md:px-16 pt-24 pb-16" style={{ background: 'var(--dark-bg)' }}>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8" style={{ background: 'var(--neon-cyan)' }}></div>
          <h1 className="font-display text-3xl font-black tracking-wider" style={{ color: '#fff' }}>НОВОСТИ</h1>
        </div>
        <p className="font-body text-sm ml-4" style={{ color: '#5a7a8a' }}>Актуальные события игровой индустрии и платформы</p>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-lg">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neon-cyan)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Поиск по новостям..."
            className="cyber-input w-full pl-9 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 font-mono text-xs" style={{ color: '#3a5a6a' }}>
          <Icon name="Filter" size={13} />
          <span>{filtered.length} новостей</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="font-mono text-xs px-4 py-1.5 tracking-wider transition-all duration-200"
            style={{
              background: activeCategory === cat ? 'var(--neon-cyan)' : 'transparent',
              color: activeCategory === cat ? 'var(--dark-bg)' : '#5a7a8a',
              border: `1px solid ${activeCategory === cat ? 'var(--neon-cyan)' : 'var(--dark-border)'}`,
              fontWeight: activeCategory === cat ? 700 : 400,
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* News grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="game-card p-5 cursor-pointer group"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Category + emoji */}
            <div className="flex items-start justify-between mb-4">
              <span className="font-mono text-xs px-2 py-0.5 tracking-widest" style={{
                color: categoryColors[item.category] || 'var(--neon-green)',
                border: `1px solid ${categoryColors[item.category] || 'var(--neon-green)'}`,
                fontSize: '9px',
              }}>
                {item.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                {item.hot && <span className="text-sm">🔥</span>}
                <span className="text-2xl">{item.image}</span>
              </div>
            </div>

            <h3 className="font-body font-semibold text-sm leading-snug mb-4 group-hover:text-white transition-colors" style={{ color: '#c0d8e8', lineHeight: '1.5' }}>
              {item.title}
            </h3>

            {/* Meta */}
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="font-mono text-xs" style={{ color: '#2a4a5a', fontSize: '10px' }}>{item.time}</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={11} style={{ color: '#3a5a6a' }} />
                  <span className="font-mono text-xs" style={{ color: '#3a5a6a', fontSize: '10px' }}>{item.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MessageCircle" size={11} style={{ color: '#3a5a6a' }} />
                  <span className="font-mono text-xs" style={{ color: '#3a5a6a', fontSize: '10px' }}>{item.comments}</span>
                </div>
              </div>
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
