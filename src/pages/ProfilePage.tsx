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

type Tab = 'overview' | 'achievements' | 'activity' | 'rating' | 'settings';

const RATING_SYSTEMS = [
  {
    game: 'Dota 2',
    icon: '🔮',
    system: 'MMR',
    description: 'Matchmaking Rating — очки рейтинга Dota 2',
    color: '#a855f7',
    tiers: [
      { name: 'Herald', range: '0 – 769 MMR', color: '#8b7355', min: 0, max: 769 },
      { name: 'Guardian', range: '770 – 1539 MMR', color: '#6b7c8a', min: 770, max: 1539 },
      { name: 'Crusader', range: '1540 – 2309 MMR', color: '#4a90d9', min: 1540, max: 2309 },
      { name: 'Archon', range: '2310 – 3079 MMR', color: '#52c41a', min: 2310, max: 3079 },
      { name: 'Legend', range: '3080 – 3849 MMR', color: '#1890ff', min: 3080, max: 3849 },
      { name: 'Ancient', range: '3850 – 4619 MMR', color: '#9c27b0', min: 3850, max: 4619 },
      { name: 'Divine', range: '4620 – 5419 MMR', color: '#ffd700', min: 4620, max: 5419 },
      { name: 'Immortal', range: '5420+ MMR', color: '#ff4444', min: 5420, max: 9999 },
    ],
    myRating: 4820,
    myTier: 'Divine 2',
    rank_suffix: 'MMR',
  },
  {
    game: 'Counter-Strike 2',
    icon: '🔫',
    system: 'Premier ELO',
    description: 'Рейтинг Premier — основной рейтинговый режим CS2',
    color: '#f97316',
    tiers: [
      { name: 'Grey', range: '0 – 4 999', color: '#888', min: 0, max: 4999 },
      { name: 'Light Blue', range: '5 000 – 9 999', color: '#87ceeb', min: 5000, max: 9999 },
      { name: 'Blue', range: '10 000 – 14 999', color: '#4a90d9', min: 10000, max: 14999 },
      { name: 'Purple', range: '15 000 – 19 999', color: '#9c27b0', min: 15000, max: 19999 },
      { name: 'Pink', range: '20 000 – 24 999', color: '#e91e8c', min: 20000, max: 24999 },
      { name: 'Red', range: '25 000 – 29 999', color: '#e02020', min: 25000, max: 29999 },
      { name: 'Gold', range: '30 000+', color: '#ffd700', min: 30000, max: 99999 },
    ],
    myRating: 16840,
    myTier: 'Purple — 16 840',
    rank_suffix: 'ELO',
  },
  {
    game: 'Valorant',
    icon: '⚡',
    system: 'Rank Rating (RR)',
    description: 'Система рангов Valorant: от Iron до Radiant',
    color: '#ef4444',
    tiers: [
      { name: 'Iron', range: 'Iron 1–3', color: '#8B7355', min: 0, max: 299 },
      { name: 'Bronze', range: 'Bronze 1–3', color: '#CD7F32', min: 300, max: 599 },
      { name: 'Silver', range: 'Silver 1–3', color: '#C0C0C0', min: 600, max: 899 },
      { name: 'Gold', range: 'Gold 1–3', color: '#FFD700', min: 900, max: 1199 },
      { name: 'Platinum', range: 'Platinum 1–3', color: '#00CED1', min: 1200, max: 1499 },
      { name: 'Diamond', range: 'Diamond 1–3', color: '#B9F2FF', min: 1500, max: 1799 },
      { name: 'Ascendant', range: 'Ascendant 1–3', color: '#00FF87', min: 1800, max: 2099 },
      { name: 'Immortal', range: 'Immortal 1–3', color: '#FF4444', min: 2100, max: 2399 },
      { name: 'Radiant', range: 'Radiant', color: '#FFE875', min: 2400, max: 9999 },
    ],
    myRating: 1320,
    myTier: 'Platinum 1',
    rank_suffix: 'RR',
  },
  {
    game: 'League of Legends',
    icon: '⚔️',
    system: 'LP (Лига очков)',
    description: 'Система лиг LoL: Iron → Challenger',
    color: '#3b82f6',
    tiers: [
      { name: 'Iron', range: 'Iron IV – I', color: '#8B7355', min: 0, max: 399 },
      { name: 'Bronze', range: 'Bronze IV – I', color: '#CD7F32', min: 400, max: 799 },
      { name: 'Silver', range: 'Silver IV – I', color: '#C0C0C0', min: 800, max: 1199 },
      { name: 'Gold', range: 'Gold IV – I', color: '#FFD700', min: 1200, max: 1599 },
      { name: 'Platinum', range: 'Platinum IV – I', color: '#00CED1', min: 1600, max: 1999 },
      { name: 'Emerald', range: 'Emerald IV – I', color: '#50C878', min: 2000, max: 2399 },
      { name: 'Diamond', range: 'Diamond IV – I', color: '#B9F2FF', min: 2400, max: 2799 },
      { name: 'Master+', range: 'Master / GM / Challenger', color: '#FFD700', min: 2800, max: 9999 },
    ],
    myRating: 1450,
    myTier: 'Platinum IV — 50 LP',
    rank_suffix: 'LP',
  },
  {
    game: 'Brawl Stars',
    icon: '⭐',
    system: 'Кубки (Trophies)',
    description: 'Трофейный рейтинг Brawl Stars',
    color: '#f59e0b',
    tiers: [
      { name: 'Дерево', range: '0 – 499', color: '#8B7355', min: 0, max: 499 },
      { name: 'Серебро', range: '500 – 999', color: '#C0C0C0', min: 500, max: 999 },
      { name: 'Золото', range: '1 000 – 2 999', color: '#FFD700', min: 1000, max: 2999 },
      { name: 'Алмаз', range: '3 000 – 4 999', color: '#B9F2FF', min: 3000, max: 4999 },
      { name: 'Изумруд', range: '5 000 – 9 999', color: '#50C878', min: 5000, max: 9999 },
      { name: 'Мастер', range: '10 000 – 29 999', color: '#9c27b0', min: 10000, max: 29999 },
      { name: 'Про', range: '30 000 – 49 999', color: '#ff4444', min: 30000, max: 49999 },
      { name: 'Легенда', range: '50 000+', color: '#FFE875', min: 50000, max: 999999 },
    ],
    myRating: 34200,
    myTier: 'Про — 34 200 кубков',
    rank_suffix: '🏆',
  },
  {
    game: 'PUBG Mobile',
    icon: '🪖',
    system: 'Очки рейтинга (RP)',
    description: 'Ранговая система PUBG Mobile',
    color: '#84cc16',
    tiers: [
      { name: 'Bronze', range: '0 – 1 499 RP', color: '#CD7F32', min: 0, max: 1499 },
      { name: 'Silver', range: '1 500 – 2 999 RP', color: '#C0C0C0', min: 1500, max: 2999 },
      { name: 'Gold', range: '3 000 – 4 999 RP', color: '#FFD700', min: 3000, max: 4999 },
      { name: 'Platinum', range: '5 000 – 6 999 RP', color: '#00CED1', min: 5000, max: 6999 },
      { name: 'Diamond', range: '7 000 – 8 999 RP', color: '#B9F2FF', min: 7000, max: 8999 },
      { name: 'Crown', range: '9 000 – 10 999 RP', color: '#9c27b0', min: 9000, max: 10999 },
      { name: 'Ace', range: '11 000 – 12 999 RP', color: '#ff4444', min: 11000, max: 12999 },
      { name: 'Conqueror', range: '13 000+ RP', color: '#FFD700', min: 13000, max: 99999 },
    ],
    myRating: 9240,
    myTier: 'Crown — 9 240 RP',
    rank_suffix: 'RP',
  },
];

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
        <div className="flex gap-6 mb-6 overflow-x-auto" style={{ borderBottom: '1px solid var(--border-color)' }}>
          {(['overview', 'achievements', 'activity', 'rating', 'settings'] as Tab[]).map(t => {
            const labels = { overview: 'Обзор', achievements: 'Достижения', activity: 'Активность', rating: 'Рейтинг', settings: 'Настройки' };
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

        {/* Rating */}
        {tab === 'rating' && (
          <div className="space-y-4">
            <div className="mb-6 p-4" style={{ background: 'rgba(224,32,32,0.06)', border: '1px solid rgba(224,32,32,0.2)' }}>
              <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--red)', marginBottom: '6px' }}>ЧТО ТАКОЕ РЕЙТИНГ</div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Здесь отображаются официальные рейтинговые системы игр. Каждая игра использует свою шкалу — MMR, ELO, RP или кубки. Ниже показан твой текущий ранг и вся лестница рангов для каждой игры.
              </p>
            </div>
            {RATING_SYSTEMS.map((rs) => {
              const myTierObj = rs.tiers.find(t => rs.myRating >= t.min && rs.myRating <= t.max);
              const progressInTier = myTierObj
                ? Math.round(((rs.myRating - myTierObj.min) / (myTierObj.max - myTierObj.min)) * 100)
                : 0;
              return (
                <div key={rs.game} className="g-card overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg)' }}>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: '20px' }}>{rs.icon}</span>
                      <div>
                        <div className="font-display font-black" style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{rs.game}</div>
                        <div style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', letterSpacing: '1.5px' }}>{rs.system}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-black" style={{ fontSize: '15px', color: myTierObj?.color || rs.color }}>{rs.myTier}</div>
                      <div style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>МОЙ РАНГ</div>
                    </div>
                  </div>
                  {/* Progress */}
                  <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>ПРОГРЕСС В РАНГЕ</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: myTierObj?.color || rs.color }}>{progressInTier}%</span>
                    </div>
                    <div className="w-full h-1.5" style={{ background: 'var(--border-color)', borderRadius: '2px' }}>
                      <div className="h-full" style={{ width: `${progressInTier}%`, background: myTierObj?.color || rs.color, borderRadius: '2px', transition: 'width 1s ease' }} />
                    </div>
                  </div>
                  {/* Tiers ladder */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: 'var(--border-color)' }}>
                    {rs.tiers.map((tier) => {
                      const isMy = rs.myRating >= tier.min && rs.myRating <= tier.max;
                      return (
                        <div key={tier.name} className="px-3 py-2.5" style={{
                          background: isMy ? `${tier.color}15` : 'var(--bg-card)',
                          border: isMy ? `1px solid ${tier.color}50` : 'none',
                          position: 'relative',
                        }}>
                          {isMy && (
                            <div style={{ position: 'absolute', top: '4px', right: '6px', fontFamily: 'Orbitron', fontSize: '7px', color: tier.color }}>●</div>
                          )}
                          <div className="font-display font-bold" style={{ fontSize: '11px', color: isMy ? tier.color : 'var(--text-secondary)', marginBottom: '2px' }}>{tier.name}</div>
                          <div style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)', letterSpacing: '0.5px' }}>{tier.range}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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