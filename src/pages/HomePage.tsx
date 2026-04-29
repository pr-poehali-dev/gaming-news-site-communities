import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/f1898adf-e8ce-426f-9d76-5d40fb291118/files/4ed6b39b-7a11-41d3-91f0-9907ad31a349.jpg';
const COMMUNITY_IMAGE = 'https://cdn.poehali.dev/projects/f1898adf-e8ce-426f-9d76-5d40fb291118/files/8424f76e-cd0a-497c-b732-9a833c009838.jpg';

const topGames = [
  { rank: 1, name: 'DOTA 2', genre: 'MOBA', players: '8.2M', change: '+5%', up: true },
  { rank: 2, name: 'CS2', genre: 'Шутер', players: '6.4M', change: '+3%', up: true },
  { rank: 3, name: 'VALORANT', genre: 'Шутер', players: '4.1M', change: '−2%', up: false },
  { rank: 4, name: 'LEAGUE OF LEGENDS', genre: 'MOBA', players: '3.8M', change: '+1%', up: true },
  { rank: 5, name: 'PUBG', genre: 'Battle Royale', players: '2.1M', change: '+8%', up: true },
];

const latestNews = [
  { id: 1, title: 'The International 2025 по Dota 2 — призовой фонд превысил $40 000 000', category: 'ТУРНИРЫ', time: '2 ч. назад', views: '84.2K' },
  { id: 2, title: 'CS2 патч: переработан de_dust2, новая система рейтинга Premier', category: 'ОБНОВЛЕНИЯ', time: '5 ч. назад', views: '31.7K' },
  { id: 3, title: 'NAVI и Team Spirit вышли в финал PGL Major Copenhagen 2025', category: 'КИБЕРСПОРТ', time: '1 д. назад', views: '54.5K' },
];

const platformStats = [
  { label: 'Онлайн', value: '47 892', icon: 'Wifi' },
  { label: 'Сообществ', value: '12 400', icon: 'Users' },
  { label: 'Тем форума', value: '890K', icon: 'MessageSquare' },
  { label: 'Турниров', value: '2 300', icon: 'Trophy' },
];

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Ticker */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginTop: '56px', overflow: 'hidden' }}>
        <div className="py-1.5 flex" style={{ animation: 'ticker 36s linear infinite', whiteSpace: 'nowrap' }}>
          {[1, 2].map(i => (
            <span key={i} className="px-8" style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)' }}>
              THE INTERNATIONAL 2025 — DOTA 2 &nbsp;·&nbsp; PGL MAJOR CS2 — NAVI VS TEAM SPIRIT &nbsp;·&nbsp; VALORANT MASTERS TOKYO 2025 &nbsp;·&nbsp; LoL WORLDS 2025 — РЕГИСТРАЦИЯ &nbsp;·&nbsp; 47 892 ОНЛАЙН &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Hero-specific center glow on top of global bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '700px', height: '700px',
            background: 'radial-gradient(ellipse, rgba(224,32,32,0.16) 0%, rgba(224,32,32,0.06) 40%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite',
          }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '180px', background: 'linear-gradient(to bottom, transparent, rgba(20,20,20,0.7))' }} />
        </div>

        {/* Center content */}
        <div className="relative z-10 px-6 w-full flex flex-col items-center text-center">
          {/* Label */}
          <div className={`flex items-center gap-3 mb-6 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="dot-red"></div>
            <span style={{ fontFamily: 'Orbitron', fontSize: '10px', letterSpacing: '4px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Система онлайн</span>
            <div className="dot-red"></div>
          </div>

          {/* Title */}
          <h1
            className={`font-display font-black leading-none mb-6 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: 'clamp(48px, 9vw, 110px)', color: 'var(--text-primary)', letterSpacing: '-2px', lineHeight: 0.9 }}
          >
            NEXUS
          </h1>
          <p
            className={`font-display font-bold mb-3 transition-all duration-600 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ fontSize: 'clamp(14px, 2.5vw, 22px)', color: 'var(--red)', letterSpacing: '6px', textTransform: 'uppercase' }}
          >
            Игровая платформа
          </p>

          <p
            className={`mb-10 transition-all duration-600 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: '1.7', maxWidth: '520px' }}
          >
            Новости, турниры, сообщества и форум для геймеров России — всё в одном месте.
          </p>

          <div className={`flex gap-4 transition-all duration-600 delay-150 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <button className="btn-red" onClick={() => onPageChange('communities')}>Вступить</button>
            <button className="btn-ghost" onClick={() => onPageChange('tournaments')}>Турниры</button>
            <button className="btn-ghost" onClick={() => onPageChange('news')}>Новости</button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-px mt-16 w-full max-w-2xl transition-all duration-600 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ border: '1px solid var(--border-color)' }}>
            {platformStats.map((stat, i) => (
              <div key={stat.label} className="px-5 py-5" style={{ background: 'rgba(28,28,28,0.85)', borderRight: i < 3 ? '1px solid var(--border-color)' : 'none', backdropFilter: 'blur(8px)' }}>
                <div className="font-display font-black mb-1" style={{ fontSize: '22px', color: 'var(--text-primary)' }}>{stat.value}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, letterSpacing: '1px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top games — right side */}
        <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 w-64">
          <div className="g-card" style={{ backdropFilter: 'blur(10px)', background: 'rgba(28,28,28,0.9)' }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)' }}>ТОП ИГР</span>
              <div className="flex items-center gap-1.5">
                <div className="dot-red"></div>
                <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>LIVE</span>
              </div>
            </div>
            {topGames.map((game, i) => (
              <div key={game.rank} className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: i < 4 ? '1px solid var(--border-color)' : 'none' }}>
                <span style={{ fontFamily: 'Orbitron', fontSize: '10px', color: 'var(--text-dim)', width: '16px' }}>{game.rank}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold truncate" style={{ fontSize: '11px', color: 'var(--text-primary)' }}>{game.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '1px' }}>{game.genre}</div>
                </div>
                <div className="text-right">
                  <div style={{ fontFamily: 'Orbitron', fontSize: '10px', color: 'var(--text-secondary)' }}>{game.players}</div>
                  <div style={{ fontFamily: 'Orbitron', fontSize: '8px', color: game.up ? '#3a9a3a' : 'var(--red)', marginTop: '1px' }}>{game.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="px-6 md:px-16 py-16" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="flex items-center justify-between mb-8">
          <div className="section-label">
            <h2 className="font-display text-lg font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>ПОСЛЕДНИЕ НОВОСТИ</h2>
          </div>
          <button onClick={() => onPageChange('news')} className="flex items-center gap-2" style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            Все <Icon name="ChevronRight" size={12} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {latestNews.map((item, i) => (
            <div
              key={item.id}
              className={`g-card g-card-red p-5 cursor-pointer fade-up-${i + 1}`}
              onClick={() => onPageChange('news')}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <span className="tag-red mb-3 inline-block">{item.category}</span>
              <h3 className="font-semibold leading-snug mb-4" style={{ color: 'var(--text-primary)', fontSize: '16px', lineHeight: '1.5' }}>{item.title}</h3>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{item.time}</span>
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={11} style={{ color: 'var(--text-dim)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="px-6 md:px-16 pb-16">
        <div className="relative overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
          <img src={COMMUNITY_IMAGE} alt="" className="w-full h-52 object-cover" style={{ opacity: 0.08 }} />
          <div className="absolute inset-0 flex items-center justify-between px-10" style={{ background: 'rgba(20,20,20,0.6)' }}>
            <div>
              <h2 className="font-display font-black text-xl mb-1" style={{ color: 'var(--text-primary)' }}>НАЙДИ СВОЁ СООБЩЕСТВО</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>12 400+ активных групп по всем жанрам</p>
            </div>
            <button className="btn-red" onClick={() => onPageChange('communities')}>Перейти</button>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: 'var(--red)' }}></div>
        </div>
      </section>
    </div>
  );
}