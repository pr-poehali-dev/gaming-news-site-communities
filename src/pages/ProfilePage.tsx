import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useUser } from '@/context/UserContext';

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

type Tab = 'overview' | 'achievements' | 'activity' | 'settings';

export default function ProfilePage() {
  const { profile, updateProfile } = useUser();
  const [tab, setTab] = useState<Tab>('overview');

  // Settings state
  const [editNick, setEditNick] = useState(profile.nick);
  const [editBio, setEditBio] = useState(profile.bio);
  const [nickSaved, setNickSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateProfile({ nick: editNick.trim() || profile.nick, bio: editBio.trim() });
    setNickSaved(true);
    setTimeout(() => setNickSaved(false), 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      updateProfile({ avatar: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>

      {/* Profile header card */}
      <div style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
        <div className="px-6 md:px-16 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-20 h-20 flex items-center justify-center overflow-hidden"
                style={{ border: '2px solid var(--border-color)', background: 'var(--bg)' }}>
                {profile.avatar
                  ? <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-4xl">🧑‍💻</span>
                }
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(0,0,0,0.6)' }}>
                <Icon name="Camera" size={20} style={{ color: '#fff' }} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center"
                style={{ background: 'var(--red)', fontFamily: 'Orbitron', fontSize: '9px', color: '#fff', fontWeight: 700 }}>5</div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="font-display font-black" style={{ fontSize: '22px', color: 'var(--text-primary)' }}>{profile.nick}</h1>
                <span className="tag-red">DIAMOND</span>
                <div className="flex items-center gap-1.5">
                  <div className="dot-green"></div>
                  <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>ОНЛАЙН</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{profile.bio} · Участник с 2024</p>
            </div>

            {/* Edit button */}
            <button className="btn-ghost flex items-center gap-2 self-start sm:self-auto"
              onClick={() => setTab('settings')}
              style={{ fontSize: '12px', padding: '8px 16px' }}>
              <Icon name="Settings" size={13} />
              Редактировать
            </button>

            {/* XP */}
            <div>
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
              <div key={s.label} className="px-5 py-4"
                style={{ background: 'var(--bg)', borderRight: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
                <div className="font-display font-black mb-0.5" style={{ fontSize: '18px', color: 'var(--text-primary)' }}>{s.value}</div>
                <div style={{ fontFamily: 'Orbitron', fontSize: '7px', letterSpacing: '1.5px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 py-6">
        {/* Tabs */}
        <div className="flex gap-6 mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          {(['overview', 'achievements', 'activity', 'settings'] as Tab[]).map(t => {
            const labels = { overview: 'Обзор', achievements: 'Достижения', activity: 'Активность', settings: 'Настройки' };
            return (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                  color: tab === t ? 'var(--text-primary)' : 'var(--text-dim)',
                  borderBottom: tab === t ? '2px solid var(--red)' : '2px solid transparent',
                  paddingBottom: '10px', marginBottom: '-1px', transition: 'all 0.2s',
                }}>
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
                <div key={i} className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                  <div>
                    <div className="font-display font-bold" style={{ fontSize: '11px', color: 'var(--text-primary)' }}>{g.game.toUpperCase()}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '2px' }}>{g.hours}</div>
                  </div>
                  <span className="tag-dim">{g.rank}</span>
                </div>
              ))}
            </div>

            <div className="g-card p-5">
              <div style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '14px' }}>ДРУЗЬЯ ОНЛАЙН</div>
              {[
                { name: 'NightWolf_K', game: 'Counter-Strike 2', status: 'В ИГРЕ', online: true },
                { name: 'StrikerPRO', game: 'Dota 2', status: 'В МЕНЮ', online: true },
                { name: 'ShadowFox_M', game: '—', status: 'AFK', online: false },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 py-3"
                  style={{ borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                  <div className="w-8 h-8 flex items-center justify-center font-display font-bold text-xs"
                    style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    {f.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold" style={{ fontSize: '11px', color: 'var(--text-primary)' }}>{f.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '1px' }}>{f.game}</div>
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
              <div key={a.id} className={`g-card p-4 text-center fade-up-${Math.min(i + 1, 5)}`}
                style={{ opacity: a.earned ? 1 : 0.3, filter: a.earned ? 'none' : 'grayscale(1)' }}>
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
              <div key={i} className="flex items-center gap-4 px-5 py-4"
                style={{ borderBottom: i < activity.length - 1 ? '1px solid var(--border-color)' : 'none', background: 'var(--bg-card)' }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                  style={{ border: '1px solid var(--border-color)' }}>
                  <Icon name={item.icon} size={13} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{item.action}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{item.detail}</p>
                </div>
                <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{item.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Settings */}
        {tab === 'settings' && (
          <div className="max-w-lg space-y-6">
            {/* Avatar upload */}
            <div className="g-card p-6">
              <div style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '16px' }}>ФОТО ПРОФИЛЯ</div>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ border: '2px solid var(--border-color)', background: 'var(--bg)' }}>
                  {profile.avatar
                    ? <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                    : <span className="text-4xl">🧑‍💻</span>
                  }
                </div>
                <div className="space-y-2">
                  <button className="btn-red flex items-center gap-2"
                    style={{ fontSize: '12px', padding: '8px 16px' }}
                    onClick={() => fileInputRef.current?.click()}>
                    <Icon name="Upload" size={13} />
                    Загрузить фото
                  </button>
                  {profile.avatar && (
                    <button className="btn-ghost flex items-center gap-2"
                      style={{ fontSize: '12px', padding: '8px 16px' }}
                      onClick={() => updateProfile({ avatar: null })}>
                      <Icon name="Trash2" size={13} />
                      Удалить
                    </button>
                  )}
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>JPG, PNG до 5 МБ</p>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            {/* Nick & bio */}
            <div className="g-card p-6">
              <div style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '16px' }}>ДАННЫЕ ПРОФИЛЯ</div>
              <div className="space-y-4">
                <div>
                  <label style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', display: 'block', marginBottom: '8px' }}>
                    НИКНЕЙМ
                  </label>
                  <input type="text" value={editNick}
                    onChange={e => setEditNick(e.target.value)}
                    maxLength={24}
                    className="g-input w-full px-3 py-2.5"
                    style={{ fontSize: '15px' }}
                    placeholder="Ваш никнейм..." />
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '4px' }}>{editNick.length}/24</p>
                </div>
                <div>
                  <label style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', display: 'block', marginBottom: '8px' }}>
                    О СЕБЕ
                  </label>
                  <input type="text" value={editBio}
                    onChange={e => setEditBio(e.target.value)}
                    maxLength={60}
                    className="g-input w-full px-3 py-2.5"
                    style={{ fontSize: '15px' }}
                    placeholder="Город, роль, игры..." />
                </div>
                <button className="btn-red flex items-center gap-2" onClick={handleSave}
                  style={{ fontSize: '13px' }}>
                  <Icon name={nickSaved ? 'Check' : 'Save'} size={14} />
                  {nickSaved ? 'Сохранено!' : 'Сохранить изменения'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
