import { useState } from 'react';
import Icon from '@/components/ui/icon';

type StatusType = 'LIVE' | 'СКОРО' | 'ЗАВЕРШЁН';

const tournaments = [
  {
    id: 1,
    name: 'The International 2025',
    game: 'Dota 2',
    organizer: 'Valve',
    prize: '$40 000 000',
    prizeRaw: 40000000,
    status: 'LIVE' as StatusType,
    date: '10–24 авг 2025',
    location: 'Копенгаген, Дания',
    teams: 20,
    icon: '🏆',
    format: 'Двойное выбывание + Плей-офф',
    top: [
      { place: 1, team: 'Team Spirit', country: '🇷🇺', prize: '$15 000 000' },
      { place: 2, team: 'Gaimin Gladiators', country: '🇪🇺', prize: '$5 500 000' },
      { place: 3, team: 'BetBoom Team', country: '🇷🇺', prize: '$3 000 000' },
    ],
  },
  {
    id: 2,
    name: 'PGL Major Copenhagen 2025',
    game: 'Counter-Strike 2',
    organizer: 'PGL',
    prize: '$1 250 000',
    prizeRaw: 1250000,
    status: 'СКОРО' as StatusType,
    date: '17–31 мар 2025',
    location: 'Копенгаген, Дания',
    teams: 24,
    icon: '🎯',
    format: 'Групповой этап + Плей-офф',
    top: [
      { place: 1, team: 'NAVI', country: '🇺🇦', prize: '$500 000' },
      { place: 2, team: 'Team Spirit', country: '🇷🇺', prize: '$250 000' },
      { place: 3, team: 'Vitality', country: '🇫🇷', prize: '$125 000' },
    ],
  },
  {
    id: 3,
    name: 'Valorant Champions 2025',
    game: 'Valorant',
    organizer: 'Riot Games',
    prize: '$2 250 000',
    prizeRaw: 2250000,
    status: 'СКОРО' as StatusType,
    date: '2–24 авг 2025',
    location: 'Лос-Анджелес, США',
    teams: 16,
    icon: '⚡',
    format: 'Swiss Stage + Плей-офф',
    top: [
      { place: 1, team: 'Team Liquid', country: '🇪🇺', prize: '$1 000 000' },
      { place: 2, team: 'NAVI', country: '🇺🇦', prize: '$450 000' },
      { place: 3, team: 'EDward Gaming', country: '🇨🇳', prize: '$225 000' },
    ],
  },
  {
    id: 4,
    name: 'LoL Worlds 2025',
    game: 'League of Legends',
    organizer: 'Riot Games',
    prize: '$2 500 000',
    prizeRaw: 2500000,
    status: 'СКОРО' as StatusType,
    date: '1–26 окт 2025',
    location: 'Сеул, Южная Корея',
    teams: 22,
    icon: '👑',
    format: 'Play-In + Группы + Плей-офф',
    top: [
      { place: 1, team: 'T1', country: '🇰🇷', prize: '$1 000 000' },
      { place: 2, team: 'Gen.G', country: '🇰🇷', prize: '$500 000' },
      { place: 3, team: 'G2 Esports', country: '🇪🇺', prize: '$250 000' },
    ],
  },
  {
    id: 5,
    name: 'ESL Pro League Season 21',
    game: 'Counter-Strike 2',
    organizer: 'ESL',
    prize: '$850 000',
    prizeRaw: 850000,
    status: 'ЗАВЕРШЁН' as StatusType,
    date: '3 фев – 9 мар 2025',
    location: 'Онлайн / Мальта',
    teams: 32,
    icon: '🎮',
    format: 'Групповой этап + Плей-офф',
    top: [
      { place: 1, team: 'FaZe Clan', country: '🌍', prize: '$250 000' },
      { place: 2, team: 'Team Spirit', country: '🇷🇺', prize: '$125 000' },
      { place: 3, team: 'MOUZ', country: '🇩🇪', prize: '$70 000' },
    ],
  },
  {
    id: 6,
    name: 'Bali Major 2025',
    game: 'Dota 2',
    organizer: 'PGL',
    prize: '$500 000',
    prizeRaw: 500000,
    status: 'ЗАВЕРШЁН' as StatusType,
    date: '29 мая – 9 июн 2025',
    location: 'Бали, Индонезия',
    teams: 16,
    icon: '🌊',
    format: 'Группы + Двойное выбывание',
    top: [
      { place: 1, team: 'BetBoom Team', country: '🇷🇺', prize: '$200 000' },
      { place: 2, team: 'Tundra Esports', country: '🇬🇧', prize: '$80 000' },
      { place: 3, team: 'Gaimin Gladiators', country: '🇪🇺', prize: '$50 000' },
    ],
  },
];

const games = ['Все', 'Dota 2', 'Counter-Strike 2', 'Valorant', 'League of Legends'];
const statuses: StatusType[] = ['LIVE', 'СКОРО', 'ЗАВЕРШЁН'];

const statusStyle: Record<StatusType, { color: string; bg: string; border: string }> = {
  'LIVE':     { color: 'var(--red)', bg: 'rgba(224,32,32,0.1)', border: 'var(--red)' },
  'СКОРО':    { color: '#d4a017', bg: 'rgba(212,160,23,0.1)', border: '#7a5c00' },
  'ЗАВЕРШЁН': { color: 'var(--text-dim)', bg: 'transparent', border: 'var(--border-color)' },
};

export default function TournamentsPage() {
  const [activeGame, setActiveGame] = useState('Все');
  const [activeStatus, setActiveStatus] = useState<StatusType | 'Все'>('Все');
  const [expanded, setExpanded] = useState<number | null>(1);

  const filtered = tournaments.filter(t => {
    const matchGame = activeGame === 'Все' || t.game === activeGame;
    const matchStatus = activeStatus === 'Все' || t.status === activeStatus;
    return matchGame && matchStatus;
  });

  const live = tournaments.filter(t => t.status === 'LIVE');
  const upcoming = tournaments.filter(t => t.status === 'СКОРО');
  const totalPrize = tournaments.reduce((s, t) => s + t.prizeRaw, 0);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>

      {/* Header */}
      <div className="px-6 md:px-16 py-10" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-label mb-1">
          <h1 className="font-display text-2xl font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>ТУРНИРЫ</h1>
        </div>
        <p className="ml-4" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Крупнейшие киберспортивные соревнования 2025 года</p>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-px mt-6 ml-4" style={{ border: '1px solid var(--border-color)', maxWidth: '540px' }}>
          {[
            { label: 'LIVE сейчас', value: live.length, color: 'var(--red)' },
            { label: 'Предстоит', value: upcoming.length, color: '#d4a017' },
            { label: 'Призовых', value: `$${(totalPrize / 1000000).toFixed(0)}M+`, color: 'var(--text-primary)' },
          ].map((s, i) => (
            <div key={i} className="px-6 py-3 flex-1" style={{ background: 'var(--bg-card)', borderRight: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
              <div className="font-display font-black" style={{ fontSize: '20px', color: s.color }}>{s.value}</div>
              <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '1.5px', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-16 py-6">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {games.map(g => (
              <button key={g} onClick={() => setActiveGame(g)} className={`cat-pill ${activeGame === g ? 'active' : ''}`}>{g}</button>
            ))}
          </div>
          <div className="flex gap-2 sm:ml-auto">
            {(['Все', ...statuses] as (StatusType | 'Все')[]).map(s => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className="cat-pill"
                style={{
                  borderColor: activeStatus === s ? (s === 'Все' ? 'var(--red)' : statusStyle[s as StatusType]?.border || 'var(--red)') : 'var(--border-color)',
                  color: activeStatus === s ? (s === 'Все' ? 'var(--red)' : statusStyle[s as StatusType]?.color || 'var(--red)') : 'var(--text-dim)',
                  background: activeStatus === s && s !== 'Все' ? statusStyle[s as StatusType]?.bg : 'transparent',
                }}
              >
                {s === 'LIVE' && <span className="mr-1" style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--red)', verticalAlign: 'middle', marginBottom: '1px' }}></span>}
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Tournament list */}
        <div style={{ border: '1px solid var(--border-color)' }}>
          {filtered.map((t, i) => {
            const isOpen = expanded === t.id;
            const st = statusStyle[t.status];
            return (
              <div key={t.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border-color)' : 'none' }}>

                {/* Row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors"
                  style={{ background: isOpen ? 'var(--bg-card-hover)' : 'var(--bg-card)' }}
                  onClick={() => setExpanded(isOpen ? null : t.id)}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'var(--bg-card)'; }}
                >
                  {/* Left accent */}
                  <div style={{ width: '2px', height: '36px', background: isOpen ? 'var(--red)' : 'transparent', flexShrink: 0, transition: 'background 0.2s' }}></div>

                  {/* Icon */}
                  <div className="text-2xl flex-shrink-0 w-8 text-center">{t.icon}</div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-0.5">
                      <h3 className="font-display font-black" style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{t.name}</h3>
                      <span style={{
                        fontFamily: 'Orbitron', fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px',
                        color: st.color, border: `1px solid ${st.border}`, background: st.bg,
                        padding: '2px 6px',
                      }}>
                        {t.status === 'LIVE' && '● '}{t.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{t.game}</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>·</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{t.date}</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>·</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{t.location}</span>
                    </div>
                  </div>

                  {/* Prize */}
                  <div className="hidden sm:block text-right flex-shrink-0">
                    <div className="font-display font-black" style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{t.prize}</div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)', marginTop: '2px' }}>ПРИЗОВОЙ ФОНД</div>
                  </div>

                  {/* Teams */}
                  <div className="hidden md:block text-right flex-shrink-0 ml-6">
                    <div className="font-display font-black" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{t.teams}</div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)', marginTop: '2px' }}>КОМАНД</div>
                  </div>

                  {/* Expand arrow */}
                  <Icon
                    name="ChevronDown"
                    size={16}
                    style={{ color: 'var(--text-dim)', flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-0" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
                    <div className="grid md:grid-cols-2 gap-4 pt-4">

                      {/* Info */}
                      <div>
                        <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '10px' }}>ИНФОРМАЦИЯ</div>
                        <div className="space-y-2">
                          {[
                            { label: 'Организатор', value: t.organizer },
                            { label: 'Формат', value: t.format },
                            { label: 'Дисциплина', value: t.game },
                            { label: 'Участников', value: `${t.teams} команд` },
                          ].map(row => (
                            <div key={row.label} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid var(--border-color)' }}>
                              <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{row.label.toUpperCase()}</span>
                              <span className="font-body font-semibold" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top 3 */}
                      <div>
                        <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '10px' }}>ПРИЗОВЫЕ МЕСТА</div>
                        <div className="space-y-2">
                          {t.top.map(row => (
                            <div key={row.place} className="flex items-center gap-3 py-1.5" style={{ borderBottom: '1px solid var(--border-color)' }}>
                              <span className="font-display font-black w-5 text-center" style={{
                                fontSize: '12px',
                                color: row.place === 1 ? '#d4a017' : row.place === 2 ? '#888' : '#a05020',
                              }}>
                                {row.place === 1 ? '🥇' : row.place === 2 ? '🥈' : '🥉'}
                              </span>
                              <span className="font-body font-semibold flex-1" style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                                {row.country} {row.team}
                              </span>
                              <span className="font-display font-black" style={{ fontSize: '12px', color: row.place === 1 ? '#d4a017' : 'var(--text-secondary)' }}>
                                {row.prize}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button className="btn-red w-full mt-4" style={{ fontSize: '9px', padding: '9px' }}>
                          Смотреть трансляцию
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ background: 'var(--bg-card)' }}>
              <Icon name="Trophy" size={28} style={{ color: 'var(--text-dim)', margin: '0 auto 10px' }} />
              <p style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)' }}>ТУРНИРОВ НЕ НАЙДЕНО</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
