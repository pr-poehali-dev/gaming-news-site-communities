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

const activity = [
  { action: 'Написал пост в форуме', detail: 'Мета Dota 2 патч 7.37 — кого пикать', time: '1 ч. назад', icon: 'MessageSquare' },
  { action: 'Вступил в сообщество', detail: 'CS2 PRO SCENE RU', time: '3 ч. назад', icon: 'Users' },
  { action: 'Прокомментировал новость', detail: 'NAVI vs Team Spirit — финал Major', time: '5 ч. назад', icon: 'Newspaper' },
  { action: 'Достижение разблокировано', detail: 'Faceit Level 10', time: '1 д. назад', icon: 'Trophy' },
];

const profileStats = [
  { label: 'Ранг', value: 'FACEIT 8' },
  { label: 'Побед', value: '1 247' },
  { label: 'K/D', value: '1.38' },
  { label: 'Часов', value: '2 180' },
];

type Tab = 'overview' | 'achievements' | 'activity';

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>

      {/* Profile header card */}
      <div style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
        <div className="px-6 md:px-16 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 flex items-center justify-center text-3xl" style={{ border: '1px solid var(--border-color)', background: 'var(--bg)' }}>
                🧑‍💻
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center" style={{ background: 'var(--red)', fontFamily: 'Orbitron', fontSize: '8px', color: '#fff', fontWeight: 700 }}>5</div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="font-display font-black" style={{ fontSize: '20px', color: 'var(--text-primary)' }}>ProGamer_RU</h1>
                <span className="tag-red">DIAMOND</span>
                <div className="flex items-center gap-1.5">
                  <div className="dot-green"></div>
                  <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>ОНЛАЙН</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Киберспортсмен · Москва · Участник с 2024</p>
            </div>

            {/* XP */}
            <div className="sm:ml-auto">
              <div className="flex items-center justify-between mb-1.5">
                <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>УРОВЕНЬ 47</span>
                <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>8 450 / 10 000 XP</span>
              </div>
              <div className="w-48 h-1" style={{ background: 'var(--border-color)' }}>
                <div className="h-full xp-bar" style={{ width: '84.5%' }}></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ border: '1px solid var(--border-color)' }}>
            {profileStats.map((s, i) => (
              <div key={s.label} className="px-5 py-4" style={{ background: 'var(--bg)', borderRight: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
                <div className="font-display font-black mb-0.5" style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{s.value}</div>
                <div style={{ fontFamily: 'Orbitron', fontSize: '7px', letterSpacing: '1.5px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 py-6">
        {/* Tabs */}
        <div className="flex gap-6 mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          {(['overview', 'achievements', 'activity'] as Tab[]).map(t => {
            const labels = { overview: 'Обзор', achievements: 'Достижения', activity: 'Активность' };
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                  color: tab === t ? 'var(--text-primary)' : 'var(--text-dim)',
                  borderBottom: tab === t ? '2px solid var(--red)' : '2px solid transparent',
                  paddingBottom: '10px', marginBottom: '-1px', transition: 'all 0.2s',
                }}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="g-card p-5">
              <div style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '14px' }}>МОИ ИГРЫ</div>
              {[
                { game: 'Counter-Strike 2', hours: '1 240ч', rank: 'FACEIT 8' },
                { game: 'Dota 2', hours: '520ч', rank: 'Divine 2' },
                { game: 'Valorant', hours: '280ч', rank: 'Platinum 1' },
              ].map((g, i) => (
                <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                  <div>
                    <div className="font-display font-bold" style={{ fontSize: '10px', color: 'var(--text-primary)' }}>{g.game.toUpperCase()}</div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', marginTop: '2px' }}>{g.hours}</div>
                  </div>
                  <span className="tag-dim">{g.rank}</span>
                </div>
              ))}
            </div>

            <div className="g-card p-5">
              <div style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '14px' }}>ДРУЗЬЯ ОНЛАЙН</div>
              {[
                { name: 'NightWolf_K', game: 'Cyber Protocol', status: 'В ИГРЕ', online: true },
                { name: 'StrikerPRO', game: 'Void Runners', status: 'В МЕНЮ', online: true },
                { name: 'ShadowFox_M', game: '—', status: 'AFK', online: false },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 py-3" style={{ borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                  <div className="w-7 h-7 flex items-center justify-center font-display font-bold text-xs" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    {f.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold" style={{ fontSize: '10px', color: 'var(--text-primary)' }}>{f.name}</div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', marginTop: '1px' }}>{f.game}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={f.online ? 'dot-green' : 'dot-red'} style={{ width: '5px', height: '5px' }}></div>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>{f.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {tab === 'achievements' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {achievements.map((a, i) => (
              <div
                key={a.id}
                className={`g-card p-4 text-center fade-up-${Math.min(i + 1, 5)}`}
                style={{ opacity: a.earned ? 1 : 0.3, filter: a.earned ? 'none' : 'grayscale(1)' }}
              >
                <div className="text-3xl mb-2">{a.icon}</div>
                <div style={{ fontFamily: 'Orbitron', fontSize: '7px', color: a.rare === 'LEGENDARY' || a.rare === 'EPIC' ? 'var(--red)' : 'var(--text-dim)', letterSpacing: '1px', marginBottom: '4px' }}>{a.rare}</div>
                <div style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-secondary)', lineHeight: '1.3' }}>{a.name.toUpperCase()}</div>
              </div>
            ))}
          </div>
        )}

        {/* Activity */}
        {tab === 'activity' && (
          <div style={{ border: '1px solid var(--border-color)' }}>
            {activity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: i < activity.length - 1 ? '1px solid var(--border-color)' : 'none', background: 'var(--bg-card)' }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ border: '1px solid var(--border-color)' }}>
                  <Icon name={item.icon} size={13} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <div className="flex-1">
                  <p className="font-body font-semibold" style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{item.action}</p>
                  <p style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--red)', opacity: 0.8, marginTop: '2px' }}>{item.detail}</p>
                </div>
                <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', flexShrink: 0 }}>{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}