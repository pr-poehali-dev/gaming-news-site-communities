import { useState } from 'react';
import Icon from '@/components/ui/icon';

const forumCategories = [
  { id: 'general', name: 'Общее', topics: 12400, last: '1 мин назад' },
  { id: 'tournaments', name: 'Турниры', topics: 3200, last: '5 мин назад' },
  { id: 'guides', name: 'Гайды', topics: 8900, last: '12 мин назад' },
  { id: 'marketplace', name: 'Маркетплейс', topics: 2100, last: '30 мин назад' },
  { id: 'bugs', name: 'Баги и поддержка', topics: 1800, last: '2 ч назад' },
  { id: 'offtopic', name: 'Оффтопик', topics: 5400, last: '8 мин назад' },
];

const topics = [
  { id: 1, title: 'ГАЙД: Как выйти на Divine в Dota 2 за 1 сезон — детальный разбор', category: 'Гайды', author: 's1mple_fan_RU', time: '1 ч. назад', replies: 412, views: '78K', pinned: true },
  { id: 2, title: 'CS2: топ-10 настроек мыши и crosshair от профи игроков (NaVi, Vitality)', category: 'Гайды', author: 'cs_pro_tips', time: '2 ч. назад', replies: 234, views: '45K', pinned: false },
  { id: 3, title: 'Нашёл читера на Faceit — как правильно репортить и не получить бан самому', category: 'Баги', author: 'BugHunter404', time: '3 ч. назад', replies: 89, views: '14K', pinned: false },
  { id: 4, title: 'Продам аккаунт Valorant: Radiant ранг, 1800+ часов, редкие скины', category: 'Маркет', author: 'SellerPro', time: '4 ч. назад', replies: 21, views: '5.1K', pinned: false },
  { id: 5, title: 'Ищу стак для FACEIT Level 8+ в CS2 — микрофон обязателен, 18+', category: 'Общее', author: 'TeamFinder_X', time: '5 ч. назад', replies: 67, views: '9.3K', pinned: false },
  { id: 6, title: 'Мета Dota 2 патч 7.37: какие герои имба, кого пикать в пабе', category: 'Общее', author: 'MetaAnalyst', time: '7 ч. назад', replies: 534, views: '62K', pinned: false },
  { id: 7, title: '[ОФИЦИАЛЬНО] The International 2025 — правила, расписание, как смотреть', category: 'Турниры', author: 'NEXUS_ADMIN', time: '1 д. назад', replies: 891, views: '134K', pinned: true },
];

type Tab = 'topics' | 'categories';

export default function ForumPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<Tab>('topics');
  const [openTopic, setOpenTopic] = useState<number | null>(null);

  const filtered = topics.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
      <div className="px-6 md:px-16 py-10" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-label mb-1">
          <h1 className="font-display text-2xl font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>ФОРУМ</h1>
        </div>
        <p className="ml-4" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>890 000+ тем от геймеров России</p>
      </div>

      <div className="px-6 md:px-16 py-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative max-w-md flex-1">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по форуму..."
              className="g-input w-full pl-9 pr-4 py-2.5 text-sm"
            />
          </div>
          <button
            className="btn-red flex items-center gap-2 self-start"
            onClick={() => alert('Создание темы будет доступно после регистрации')}
          >
            <Icon name="Plus" size={13} />
            Новая тема
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          {(['topics', 'categories'] as Tab[]).map(t => {
            const labels = { topics: 'Горячие темы', categories: 'Разделы' };
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                  color: tab === t ? 'var(--text-primary)' : 'var(--text-dim)',
                  borderBottom: tab === t ? '2px solid var(--red)' : '2px solid transparent',
                  paddingBottom: '10px', marginBottom: '-1px',
                  transition: 'all 0.2s',
                }}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>

        {/* Categories */}
        {tab === 'categories' && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {forumCategories.map((cat, i) => (
              <div key={cat.id} className={`g-card p-5 cursor-pointer fade-up-${Math.min(i + 1, 5)}`} onClick={() => setTab('topics')}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold mb-1" style={{ fontSize: '11px', color: 'var(--text-primary)' }}>{cat.name.toUpperCase()}</h3>
                    <p style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{cat.topics.toLocaleString('ru')} тем</p>
                  </div>
                  <div className="text-right">
                    <Icon name="ChevronRight" size={14} style={{ color: 'var(--text-dim)' }} />
                    <p style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)', marginTop: '4px' }}>{cat.last}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Topics */}
        {tab === 'topics' && (
          <div style={{ border: '1px solid var(--border-color)' }}>
            {filtered.map((topic, i) => (
              <div
                key={topic.id}
                className="flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors"
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--border-color)' : 'none',
                  background: openTopic === topic.id ? 'rgba(224,32,32,0.06)' : topic.pinned ? 'rgba(224,32,32,0.03)' : 'var(--bg-card)',
                  borderLeft: openTopic === topic.id ? '2px solid var(--red)' : '2px solid transparent',
                }}
                onClick={() => setOpenTopic(openTopic === topic.id ? null : topic.id)}
                onMouseEnter={e => { if (openTopic !== topic.id) e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                onMouseLeave={e => { if (openTopic !== topic.id) e.currentTarget.style.background = topic.pinned ? 'rgba(224,32,32,0.03)' : 'var(--bg-card)'; }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {topic.pinned
                    ? <Icon name="Pin" size={13} style={{ color: 'var(--red)' }} />
                    : <Icon name="MessageSquare" size={13} style={{ color: 'var(--text-dim)' }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {topic.pinned && <span className="tag-red">Закреп</span>}
                    <span className="tag-dim">{topic.category.toUpperCase()}</span>
                  </div>
                  <p className="font-body font-semibold truncate" style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{topic.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--red)', opacity: 0.8 }}>{topic.author}</span>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{topic.time}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                  <div className="text-center">
                    <div style={{ fontFamily: 'Orbitron', fontSize: '11px', color: 'var(--text-secondary)' }}>{topic.replies}</div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>ответов</div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontFamily: 'Orbitron', fontSize: '11px', color: 'var(--text-secondary)' }}>{topic.views}</div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>просмотров</div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16" style={{ background: 'var(--bg-card)' }}>
                <p style={{ fontFamily: 'Orbitron', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-dim)' }}>НИЧЕГО НЕ НАЙДЕНО</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}