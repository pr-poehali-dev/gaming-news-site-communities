import { useState } from 'react';
import Icon from '@/components/ui/icon';

const forumCategories = [
  { id: 'general', name: 'Общее', icon: '💬', topics: 12400, color: 'var(--neon-green)' },
  { id: 'tournaments', name: 'Турниры', icon: '🏆', topics: 3200, color: 'var(--neon-pink)' },
  { id: 'guides', name: 'Гайды', icon: '📖', topics: 8900, color: 'var(--neon-cyan)' },
  { id: 'marketplace', name: 'Маркетплейс', icon: '💎', topics: 2100, color: '#ff9900' },
  { id: 'bugs', name: 'Баги & Поддержка', icon: '🐛', topics: 1800, color: 'var(--neon-purple)' },
  { id: 'offtopic', name: 'Оффтопик', icon: '🎲', topics: 5400, color: '#7a9db5' },
];

const hotTopics = [
  { id: 1, title: 'МЕГА-ГАЙД: Как выйти на PRO уровень в Cyber Protocol за 30 дней', category: 'Гайды', author: 'ProGamer_RU', time: '1 час назад', replies: 234, views: '45K', pinned: true, hot: true },
  { id: 2, title: 'Нашёл баг — телепорт через стену на карте "Нова-Сити", репро 100%', category: 'Баги & Поддержка', author: 'BugHunter404', time: '2 часа назад', replies: 89, views: '12K', pinned: false, hot: true },
  { id: 3, title: 'Продам аккаунт LEGEND ранг, 2000+ часов, все скины', category: 'Маркетплейс', author: 'SellerPro', time: '3 часа назад', replies: 15, views: '3.4K', pinned: false, hot: false },
  { id: 4, title: 'Ищу 5-ку для ранга, требования: Diamond+, микрофон, 18+', category: 'Общее', author: 'TeamFinder_X', time: '4 часа назад', replies: 67, views: '8.1K', pinned: false, hot: false },
  { id: 5, title: 'Обсуждение: новая мета после патча 3.7 — нерф Берсерка убил класс?', category: 'Общее', author: 'MetaAnalyst', time: '6 часов назад', replies: 412, views: '28K', pinned: false, hot: true },
  { id: 6, title: '[ОФИЦИАЛЬНО] Регламент NEXUS CUP 2026 — читай перед регистрацией', category: 'Турниры', author: 'NEXUS_ADMIN', time: '1 день назад', replies: 156, views: '67K', pinned: true, hot: false },
];

const categoryColors: Record<string, string> = {
  'Гайды': 'var(--neon-cyan)',
  'Баги & Поддержка': 'var(--neon-purple)',
  'Маркетплейс': '#ff9900',
  'Общее': 'var(--neon-green)',
  'Турниры': 'var(--neon-pink)',
  'Оффтопик': '#7a9db5',
};

export default function ForumPage() {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<'categories' | 'topics'>('topics');

  const filtered = hotTopics.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 md:px-16 pt-24 pb-16" style={{ background: 'var(--dark-bg)' }}>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8" style={{ background: 'var(--neon-green)' }}></div>
          <h1 className="font-display text-3xl font-black tracking-wider" style={{ color: '#fff' }}>ФОРУМ</h1>
        </div>
        <p className="font-body text-sm ml-4" style={{ color: '#5a7a8a' }}>890,000+ тем от геймеров по всей России</p>
      </div>

      {/* Search + New Topic */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neon-green)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по форуму..."
            className="cyber-input w-full pl-9 pr-4 py-2.5 text-sm"
          />
        </div>
        <button className="cyber-btn cyber-btn-primary flex items-center gap-2">
          <Icon name="Plus" size={14} />
          Новая тема
        </button>
      </div>

      {/* Section tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveSection('topics')}
          className="font-display text-xs font-bold tracking-widest pb-2 transition-all duration-200"
          style={{
            color: activeSection === 'topics' ? 'var(--neon-green)' : '#3a5a6a',
            borderBottom: activeSection === 'topics' ? '2px solid var(--neon-green)' : '2px solid transparent',
          }}
        >
          ГОРЯЧИЕ ТЕМЫ
        </button>
        <button
          onClick={() => setActiveSection('categories')}
          className="font-display text-xs font-bold tracking-widest pb-2 transition-all duration-200"
          style={{
            color: activeSection === 'categories' ? 'var(--neon-green)' : '#3a5a6a',
            borderBottom: activeSection === 'categories' ? '2px solid var(--neon-green)' : '2px solid transparent',
          }}
        >
          РАЗДЕЛЫ
        </button>
      </div>

      {activeSection === 'categories' && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {forumCategories.map((cat, i) => (
            <div
              key={cat.id}
              className="game-card p-5 cursor-pointer group"
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => setActiveSection('topics')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-2xl" style={{ border: `1px solid ${cat.color}`, background: `${cat.color}15` }}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-bold mb-1" style={{ color: '#e0f0ff' }}>{cat.name}</h3>
                  <p className="font-mono text-xs" style={{ color: '#3a5a6a', fontSize: '10px' }}>{cat.topics.toLocaleString()} тем</p>
                </div>
                <Icon name="ChevronRight" size={16} style={{ color: cat.color, opacity: 0.6 }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'topics' && (
        <div className="space-y-2">
          {filtered.map((topic, i) => (
            <div
              key={topic.id}
              className="game-card px-5 py-4 cursor-pointer group flex items-start gap-4"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {/* Left: icon */}
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mt-0.5" style={{ border: '1px solid var(--dark-border)', background: 'rgba(0,0,0,0.3)' }}>
                {topic.pinned
                  ? <Icon name="Pin" size={14} style={{ color: 'var(--neon-cyan)' }} />
                  : <Icon name="MessageSquare" size={14} style={{ color: '#3a5a6a' }} />
                }
              </div>

              {/* Center: content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {topic.pinned && (
                    <span className="font-mono text-xs px-1.5 py-0.5" style={{ color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)', fontSize: '8px', letterSpacing: '1px' }}>
                      ЗАКРЕП
                    </span>
                  )}
                  {topic.hot && <span className="text-xs">🔥</span>}
                  <span className="font-mono text-xs" style={{ color: categoryColors[topic.category] || '#5a7a8a', fontSize: '9px', letterSpacing: '1px' }}>
                    {topic.category.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-body font-semibold text-sm group-hover:text-white transition-colors truncate" style={{ color: '#c0d8e8' }}>
                  {topic.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-xs" style={{ color: 'var(--neon-green)', fontSize: '10px', opacity: 0.8 }}>{topic.author}</span>
                  <span className="font-mono text-xs" style={{ color: '#2a4a5a', fontSize: '10px' }}>{topic.time}</span>
                </div>
              </div>

              {/* Right: stats */}
              <div className="flex-shrink-0 text-right hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={11} style={{ color: '#3a5a6a' }} />
                    <span className="font-mono text-xs" style={{ color: '#5a7a8a', fontSize: '10px' }}>{topic.replies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={11} style={{ color: '#3a5a6a' }} />
                    <span className="font-mono text-xs" style={{ color: '#5a7a8a', fontSize: '10px' }}>{topic.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-display text-sm tracking-widest" style={{ color: '#3a5a6a' }}>НИЧЕГО НЕ НАЙДЕНО</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
