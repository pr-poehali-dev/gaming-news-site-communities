import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/f1898adf-e8ce-426f-9d76-5d40fb291118/files/4ed6b39b-7a11-41d3-91f0-9907ad31a349.jpg';
const COMMUNITY_IMAGE = 'https://cdn.poehali.dev/projects/f1898adf-e8ce-426f-9d76-5d40fb291118/files/8424f76e-cd0a-497c-b732-9a833c009838.jpg';

const topGames = [
  { rank: 1, name: 'CYBER PROTOCOL', genre: 'Battle Royale', players: '2.4M', change: '+12%', hot: true },
  { rank: 2, name: 'VOID RUNNERS', genre: 'MOBA', players: '1.8M', change: '+8%', hot: true },
  { rank: 3, name: 'IRON CITADEL', genre: 'RTS', players: '980K', change: '-3%', hot: false },
  { rank: 4, name: 'NEON DRIFT', genre: 'Racing', players: '740K', change: '+22%', hot: true },
  { rank: 5, name: 'SHADOW REALM', genre: 'RPG', players: '620K', change: '+5%', hot: false },
];

const latestNews = [
  { id: 1, title: 'Киберспортивный турнир NEXUS CUP 2026 — призовой фонд $1,000,000', category: 'ТУРНИРЫ', time: '2 часа назад', views: '12.4K', hot: true },
  { id: 2, title: 'Обновление 3.7: новые игровые режимы и карты в Cyber Protocol', category: 'ОБНОВЛЕНИЯ', time: '5 часов назад', views: '8.1K', hot: false },
  { id: 3, title: 'Рейтинг лучших геймеров России — апрель 2026', category: 'РЕЙТИНГИ', time: '1 день назад', views: '34.5K', hot: false },
];

const stats = [
  { label: 'Игроков онлайн', value: '47,892', icon: 'Gamepad2', color: 'var(--neon-green)' },
  { label: 'Сообществ', value: '12,400+', icon: 'Users', color: 'var(--neon-cyan)' },
  { label: 'Тем на форуме', value: '890K', icon: 'MessageSquare', color: 'var(--neon-purple)' },
  { label: 'Турниров в месяц', value: '2,300', icon: 'Trophy', color: 'var(--neon-pink)' },
];

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const [titleVisible, setTitleVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [ticker] = useState('▶ NEXUS CUP 2026 — РЕГИСТРАЦИЯ ОТКРЫТА ◀ НОВОЕ ОБНОВЛЕНИЕ 3.7 — ДОСТУПНО СЕЙЧАС ◀ ТОП-100 ИГРОКОВ ОБНОВЛЁН ◀ RIOT GAMES ПАРТНЁР ПЛАТФОРМЫ ◀');

  useEffect(() => {
    setTimeout(() => setTitleVisible(true), 100);
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark-bg)' }}>
      {/* Ticker */}
      <div className="overflow-hidden py-1 px-0" style={{ background: 'rgba(0, 255, 136, 0.08)', borderBottom: '1px solid var(--dark-border)', marginTop: '57px' }}>
        <div className="flex" style={{ animation: 'ticker 40s linear infinite', whiteSpace: 'nowrap' }}>
          <span className="font-mono text-xs tracking-widest px-8" style={{ color: 'var(--neon-green)' }}>{ticker} &nbsp;&nbsp;&nbsp; {ticker}</span>
        </div>
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '85vh' }}>
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,10,14,0.95) 0%, rgba(5,10,14,0.6) 50%, rgba(5,10,14,0.9) 100%)' }}></div>
          <div className="absolute inset-0 grid-bg opacity-40"></div>
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-green), var(--neon-cyan), transparent)' }}></div>

        <div className="relative z-10 flex items-center min-h-screen px-6 md:px-16 pt-8">
          <div className="max-w-3xl">
            {/* Status */}
            <div className="flex items-center gap-3 mb-6">
              <div className="online-dot"></div>
              <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--neon-green)' }}>СИСТЕМА ОНЛАЙН</span>
              <div className="h-px flex-1 max-w-24" style={{ background: 'var(--neon-green)', opacity: 0.4 }}></div>
            </div>

            {/* Main title */}
            <h1
              className={`font-display text-5xl md:text-7xl font-black leading-none mb-4 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ color: '#fff', letterSpacing: '-1px' }}
            >
              ДОБРО
              <br />
              <span
                className={`${glitchActive ? 'glitch-text' : 'neon-green'} block`}
              >
                ПОЖАЛОВАТЬ
              </span>
              В{' '}
              <span style={{ color: 'var(--neon-cyan)' }}>NEXUS</span>
            </h1>

            <p
              className={`font-body text-lg md:text-xl mb-8 transition-all duration-700 delay-200 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ color: '#7a9db5', maxWidth: '500px', lineHeight: '1.6' }}
            >
              Главная платформа для геймеров России. Новости, турниры, сообщества и форумы — всё в одном месте.
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className="cyber-btn cyber-btn-primary" onClick={() => onPageChange('communities')}>
                Войти в игру
              </button>
              <button className="cyber-btn" onClick={() => onPageChange('news')}>
                Читать новости
              </button>
            </div>

            {/* Stats row */}
            <div className={`flex flex-wrap gap-6 mt-12 transition-all duration-700 delay-500 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}>
              {stats.map(stat => (
                <div key={stat.label} className="flex items-center gap-2">
                  <Icon name={stat.icon} size={16} style={{ color: stat.color }} />
                  <span className="font-display text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="font-body text-xs" style={{ color: '#5a7a8a' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Top games widget */}
          <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-72">
            <div className="game-card p-4 hud-corner" style={{ border: '1px solid var(--dark-border)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-xs font-bold tracking-widest" style={{ color: 'var(--neon-cyan)' }}>ТОП ИГР</span>
                <span className="font-mono text-xs" style={{ color: 'var(--neon-green)' }}>LIVE</span>
              </div>
              {topGames.map((game, i) => (
                <div key={game.rank} className="flex items-center gap-3 py-2" style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none', animationDelay: `${i * 0.1}s` }}>
                  <span className="font-display text-xs w-4" style={{ color: 'var(--neon-green)', opacity: 0.6 }}>#{game.rank}</span>
                  <div className="flex-1">
                    <div className="font-display text-xs font-bold" style={{ color: '#fff', fontSize: '11px' }}>
                      {game.name}
                      {game.hot && <span className="ml-1 text-xs" style={{ color: 'var(--neon-pink)' }}>🔥</span>}
                    </div>
                    <div className="font-mono text-xs" style={{ color: '#5a7a8a', fontSize: '10px' }}>{game.genre}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs" style={{ color: '#8ab0c4', fontSize: '11px' }}>{game.players}</div>
                    <div className="font-mono text-xs" style={{ color: game.change.startsWith('+') ? 'var(--neon-green)' : '#ff4466', fontSize: '10px' }}>{game.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="px-6 md:px-16 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6" style={{ background: 'var(--neon-green)' }}></div>
              <h2 className="font-display text-xl font-bold tracking-wider" style={{ color: '#fff' }}>ПОСЛЕДНИЕ НОВОСТИ</h2>
            </div>
            <p className="font-body text-sm ml-4" style={{ color: '#5a7a8a' }}>Актуальные события игровой индустрии</p>
          </div>
          <button onClick={() => onPageChange('news')} className="font-mono text-xs tracking-wider flex items-center gap-2" style={{ color: 'var(--neon-green)' }}>
            ВСЕ НОВОСТИ <Icon name="ChevronRight" size={14} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {latestNews.map((news, i) => (
            <div key={news.id} className="game-card p-5 cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs px-2 py-0.5" style={{
                  color: news.hot ? 'var(--neon-pink)' : 'var(--neon-cyan)',
                  border: `1px solid ${news.hot ? 'var(--neon-pink)' : 'var(--neon-cyan)'}`,
                  fontSize: '9px',
                  letterSpacing: '1px'
                }}>
                  {news.category}
                </span>
                {news.hot && <span style={{ fontSize: '14px' }}>🔥</span>}
              </div>
              <h3 className="font-body font-semibold text-sm mb-3 leading-snug" style={{ color: '#e0f0ff' }}>{news.title}</h3>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs" style={{ color: '#3a5a6a' }}>{news.time}</span>
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={11} style={{ color: '#3a5a6a' }} />
                  <span className="font-mono text-xs" style={{ color: '#3a5a6a' }}>{news.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="px-6 md:px-16 py-12 relative overflow-hidden">
        <div className="relative rounded-none overflow-hidden" style={{ border: '1px solid var(--dark-border)' }}>
          <img src={COMMUNITY_IMAGE} alt="Community" className="w-full h-64 object-cover opacity-20" />
          <div className="absolute inset-0 flex items-center justify-between px-10" style={{ background: 'rgba(5,10,14,0.8)' }}>
            <div>
              <h2 className="font-display text-2xl font-black mb-2" style={{ color: '#fff' }}>
                НАЙДИ СВОЁ <span style={{ color: 'var(--neon-cyan)' }}>СООБЩЕСТВО</span>
              </h2>
              <p className="font-body text-sm" style={{ color: '#5a7a8a' }}>12,400+ активных групп по всем жанрам и играм</p>
            </div>
            <button className="cyber-btn" onClick={() => onPageChange('communities')}>
              Перейти
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }}></div>
        </div>
      </section>
    </div>
  );
}
