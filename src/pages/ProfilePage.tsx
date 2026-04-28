import { useState } from 'react';
import Icon from '@/components/ui/icon';

const achievements = [
  { id: 1, name: 'Легенда Сезона', icon: '👑', rare: 'LEGENDARY', earned: true },
  { id: 2, name: 'Снайпер', icon: '🎯', rare: 'EPIC', earned: true },
  { id: 3, name: 'Тысячник', icon: '💬', rare: 'RARE', earned: true },
  { id: 4, name: 'Первая кровь', icon: '⚔️', rare: 'COMMON', earned: true },
  { id: 5, name: 'Мастер тактики', icon: '🧠', rare: 'EPIC', earned: false },
  { id: 6, name: 'Победитель турнира', icon: '🏆', rare: 'LEGENDARY', earned: false },
];

const recentActivity = [
  { action: 'Написал пост в форуме', detail: 'Новая мета после патча 3.7', time: '1 час назад', icon: 'MessageSquare', color: 'var(--neon-green)' },
  { action: 'Вступил в сообщество', detail: 'RU GAMERS COMMUNITY', time: '3 часа назад', icon: 'Users', color: 'var(--neon-purple)' },
  { action: 'Прокомментировал новость', detail: 'NEXUS CUP 2026', time: '5 часов назад', icon: 'Newspaper', color: 'var(--neon-cyan)' },
  { action: 'Достижение разблокировано', detail: 'Легенда Сезона', time: '1 день назад', icon: 'Trophy', color: 'var(--neon-pink)' },
];

const rareColors: Record<string, string> = {
  'LEGENDARY': 'var(--neon-pink)',
  'EPIC': 'var(--neon-purple)',
  'RARE': 'var(--neon-cyan)',
  'COMMON': '#5a7a8a',
};

const stats = [
  { label: 'Ранг', value: 'DIAMOND III', color: 'var(--neon-cyan)' },
  { label: 'Побед', value: '1,247', color: 'var(--neon-green)' },
  { label: 'K/D', value: '3.42', color: '#ff9900' },
  { label: 'Часов', value: '2,180', color: 'var(--neon-purple)' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'activity'>('overview');

  return (
    <div className="min-h-screen px-6 md:px-16 pt-24 pb-16" style={{ background: 'var(--dark-bg)' }}>
      {/* Profile header */}
      <div className="game-card mb-8 overflow-hidden">
        {/* Banner */}
        <div className="h-32 relative" style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(157,0,255,0.15) 50%, rgba(0,245,255,0.1) 100%)', borderBottom: '1px solid var(--dark-border)' }}>
          <div className="absolute inset-0 grid-bg opacity-30"></div>
          <div className="absolute top-3 right-4">
            <button className="font-mono text-xs px-3 py-1.5 flex items-center gap-2 transition-all hover:opacity-100 opacity-70" style={{ border: '1px solid var(--dark-border)', color: '#5a7a8a' }}>
              <Icon name="Edit2" size={11} />
              Редактировать
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + Name */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-8 mb-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 flex items-center justify-center text-3xl" style={{ border: '2px solid var(--neon-green)', background: 'var(--dark-bg)', boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>
                🧑‍💻
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center" style={{ background: 'var(--neon-green)', fontSize: '10px', color: '#000', fontWeight: 'bold' }}>
                5
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-display text-2xl font-black" style={{ color: '#fff' }}>ProGamer_RU</h1>
                <span className="font-mono text-xs px-2 py-0.5 font-bold" style={{ color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)', fontSize: '9px', letterSpacing: '2px' }}>
                  DIAMOND
                </span>
                <div className="flex items-center gap-1">
                  <div className="online-dot"></div>
                  <span className="font-mono text-xs" style={{ color: 'var(--neon-green)', fontSize: '10px' }}>Онлайн</span>
                </div>
              </div>
              <p className="font-body text-sm mt-1" style={{ color: '#5a7a8a' }}>Киберспортсмен • Москва • Участник с 2024</p>
            </div>

            {/* XP bar */}
            <div className="sm:ml-auto sm:text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display text-xs font-bold" style={{ color: 'var(--neon-green)' }}>УРОВЕНЬ 47</span>
                <span className="font-mono text-xs" style={{ color: '#3a5a6a', fontSize: '10px' }}>8,450 / 10,000 XP</span>
              </div>
              <div className="w-48 h-1.5 rounded-none" style={{ background: 'var(--dark-border)' }}>
                <div className="h-full xp-bar" style={{ width: '84.5%' }}></div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(stat => (
              <div key={stat.label} className="text-center py-3" style={{ border: '1px solid var(--dark-border)', background: 'rgba(0,0,0,0.3)' }}>
                <div className="font-display text-lg font-black mb-0.5" style={{ color: stat.color }}>{stat.value}</div>
                <div className="font-mono text-xs tracking-widest" style={{ color: '#3a5a6a', fontSize: '9px' }}>{stat.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6" style={{ borderBottom: '1px solid var(--dark-border)' }}>
        {(['overview', 'achievements', 'activity'] as const).map(tab => {
          const labels = { overview: 'Обзор', achievements: 'Достижения', activity: 'Активность' };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-display text-xs font-bold tracking-widest pb-3 transition-all duration-200"
              style={{
                color: activeTab === tab ? 'var(--neon-green)' : '#3a5a6a',
                borderBottom: activeTab === tab ? '2px solid var(--neon-green)' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {labels[tab].toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="game-card p-5">
            <h3 className="font-display text-sm font-bold mb-4" style={{ color: 'var(--neon-green)' }}>МОИ ИГРЫ</h3>
            {[
              { game: 'Cyber Protocol', hours: '1,240ч', rank: 'DIAMOND III', icon: '🎮' },
              { game: 'Void Runners', hours: '520ч', rank: 'PLATINUM II', icon: '⚔️' },
              { game: 'Shadow Realm', hours: '420ч', rank: 'GOLD I', icon: '🧙' },
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-3 py-3" style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span className="text-xl">{g.icon}</span>
                <div className="flex-1">
                  <div className="font-display text-xs font-bold" style={{ color: '#e0f0ff', fontSize: '11px' }}>{g.game}</div>
                  <div className="font-mono text-xs" style={{ color: '#3a5a6a', fontSize: '10px' }}>{g.hours} сыграно</div>
                </div>
                <span className="font-mono text-xs" style={{ color: 'var(--neon-cyan)', fontSize: '10px' }}>{g.rank}</span>
              </div>
            ))}
          </div>

          <div className="game-card p-5">
            <h3 className="font-display text-sm font-bold mb-4" style={{ color: 'var(--neon-purple)' }}>ДРУЗЬЯ ОНЛАЙН</h3>
            {[
              { name: 'NightWolf_K', game: 'Cyber Protocol', status: 'В игре' },
              { name: 'StrikerPRO', game: 'Void Runners', status: 'В меню' },
              { name: 'ShadowFox_M', game: '—', status: 'AFK' },
            ].map((friend, i) => (
              <div key={i} className="flex items-center gap-3 py-3" style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div className="w-8 h-8 flex items-center justify-center text-sm" style={{ border: '1px solid var(--dark-border)', background: 'rgba(0,0,0,0.5)' }}>
                  {friend.name[0]}
                </div>
                <div className="flex-1">
                  <div className="font-display text-xs font-bold" style={{ color: '#e0f0ff', fontSize: '11px' }}>{friend.name}</div>
                  <div className="font-mono text-xs" style={{ color: '#3a5a6a', fontSize: '10px' }}>{friend.game}</div>
                </div>
                <span className="font-mono text-xs px-2 py-0.5" style={{
                  color: friend.status === 'В игре' ? 'var(--neon-green)' : friend.status === 'AFK' ? '#ff9900' : 'var(--neon-cyan)',
                  border: `1px solid ${friend.status === 'В игре' ? 'var(--neon-green)' : friend.status === 'AFK' ? '#ff9900' : 'var(--neon-cyan)'}`,
                  fontSize: '9px',
                }}>
                  {friend.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Achievements */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {achievements.map((ach, i) => (
            <div
              key={ach.id}
              className="game-card p-4 text-center cursor-pointer transition-all duration-200"
              style={{
                opacity: ach.earned ? 1 : 0.35,
                filter: ach.earned ? 'none' : 'grayscale(100%)',
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <div className="text-4xl mb-2">{ach.icon}</div>
              <div className="font-mono text-xs mb-1 font-bold" style={{ color: rareColors[ach.rare], fontSize: '8px', letterSpacing: '1px' }}>
                {ach.rare}
              </div>
              <div className="font-display text-xs" style={{ color: '#c0d8e8', fontSize: '9px', lineHeight: '1.3' }}>{ach.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Activity */}
      {activeTab === 'activity' && (
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="game-card px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${item.color}`, background: `${item.color}15` }}>
                <Icon name={item.icon} size={16} style={{ color: item.color }} />
              </div>
              <div className="flex-1">
                <div className="font-body font-semibold text-sm" style={{ color: '#c0d8e8' }}>{item.action}</div>
                <div className="font-mono text-xs" style={{ color: item.color, opacity: 0.8, fontSize: '11px' }}>{item.detail}</div>
              </div>
              <span className="font-mono text-xs flex-shrink-0" style={{ color: '#2a4a5a', fontSize: '10px' }}>{item.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
