import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useUser } from '@/context/UserContext';

type JoinState = Record<number, boolean>;

interface ChatMessage {
  id: string;
  author: string;
  avatar: string | null;
  text: string;
  time: string;
  edited?: boolean;
}

const communities = [
  { id: 1, name: 'DOTA 2 RUSSIA', game: 'Dota 2', members: '214K', online: 8420, category: 'MOBA' },
  { id: 2, name: 'CS2 PRO SCENE RU', game: 'Counter-Strike 2', members: '178K', online: 6310, category: 'Шутер' },
  { id: 3, name: 'VALORANT CIS', game: 'Valorant', members: '95K', online: 3140, category: 'Шутер' },
  { id: 4, name: 'LoL РУССКОЕ СООБЩЕСТВО', game: 'League of Legends', members: '132K', online: 4280, category: 'MOBA' },
  { id: 5, name: 'PUBG CLAN RU', game: 'PUBG', members: '61K', online: 1870, category: 'Battle Royale' },
  { id: 6, name: 'MINECRAFT BUILDERS RU', game: 'Minecraft', members: '88K', online: 2950, category: 'Сандбокс' },
];

const categories = ['Все', 'MOBA', 'Шутер', 'Battle Royale', 'RPG', 'Сандбокс', 'Общее'];

const SEED_MESSAGES: Record<number, ChatMessage[]> = {
  1: [
    { id: 's1', author: 'DotaLegend', avatar: null, text: 'Кто смотрел TI25? Нереально сильный финал!', time: '15 мин назад' },
    { id: 's2', author: 'Carry_God', avatar: null, text: 'Spirit имба, я так и говорил 🔥', time: '10 мин назад' },
  ],
  2: [
    { id: 's1', author: 'CS2_Player', avatar: null, text: 'Патч завтра — inferno возвращается!', time: '20 мин назад' },
    { id: 's2', author: 'AWPmaster', avatar: null, text: 'Наконец-то, ждал этого целый год', time: '12 мин назад' },
  ],
  3: [
    { id: 's1', author: 'Radiant_EU', avatar: null, text: 'Кто хочет сыграть в рейтинговые?', time: '5 мин назад' },
  ],
};

function formatTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function ChatPanel({ communityId, communityName }: { communityId: number; communityName: string }) {
  const { profile } = useUser();
  const storageKey = `nexus_chat_${communityId}`;

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : (SEED_MESSAGES[communityId] || []);
    } catch {
      return SEED_MESSAGES[communityId] || [];
    }
  });

  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [menuId, setMenuId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      author: profile.nick,
      avatar: profile.avatar,
      text: input.trim(),
      time: formatTime(),
    };
    setMessages(prev => [...prev, msg]);
    setInput('');
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    setMenuId(null);
  };

  const startEdit = (msg: ChatMessage) => {
    setEditingId(msg.id);
    setEditText(msg.text);
    setMenuId(null);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) return;
    setMessages(prev => prev.map(m => m.id === id ? { ...m, text: editText.trim(), edited: true } : m));
    setEditingId(null);
  };

  const isOwn = (msg: ChatMessage) => msg.author === profile.nick;

  return (
    <div className="flex flex-col" style={{ height: '480px', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg)' }}>
        <Icon name="MessageSquare" size={14} style={{ color: 'var(--red)' }} />
        <span style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-secondary)' }}>ЧАТ — {communityName}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="dot-green" style={{ width: '5px', height: '5px' }}></div>
          <span style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>ОНЛАЙН</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" onClick={() => setMenuId(null)}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-2.5 ${isOwn(msg) ? 'flex-row-reverse' : ''} group`}>
            {/* Avatar */}
            <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center overflow-hidden"
              style={{ border: '1px solid var(--border-color)', background: 'var(--bg)', fontSize: '12px' }}>
              {msg.avatar
                ? <img src={msg.avatar} alt="" className="w-full h-full object-cover" />
                : msg.author[0].toUpperCase()
              }
            </div>

            <div className={`max-w-xs ${isOwn(msg) ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className={`flex items-center gap-2 mb-0.5 ${isOwn(msg) ? 'flex-row-reverse' : ''}`}>
                <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: isOwn(msg) ? 'var(--red)' : 'var(--text-secondary)' }}>{msg.author}</span>
                <span style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>{msg.time}</span>
                {msg.edited && <span style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>(ред.)</span>}
              </div>

              {editingId === msg.id ? (
                <div className="flex gap-2 w-full">
                  <input value={editText} onChange={e => setEditText(e.target.value)}
                    className="g-input flex-1 px-2 py-1 text-sm"
                    onKeyDown={e => { if (e.key === 'Enter') saveEdit(msg.id); if (e.key === 'Escape') setEditingId(null); }}
                    autoFocus />
                  <button onClick={() => saveEdit(msg.id)} style={{ color: 'var(--red)' }}>
                    <Icon name="Check" size={14} />
                  </button>
                  <button onClick={() => setEditingId(null)} style={{ color: 'var(--text-dim)' }}>
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="px-3 py-2" style={{
                    background: isOwn(msg) ? 'rgba(224,32,32,0.15)' : 'var(--bg)',
                    border: `1px solid ${isOwn(msg) ? 'rgba(224,32,32,0.3)' : 'var(--border-color)'}`,
                    fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5',
                    wordBreak: 'break-word',
                  }}>
                    {msg.text}
                  </div>
                  {/* Action menu trigger */}
                  {isOwn(msg) && (
                    <button
                      className="absolute -top-1 -left-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={e => { e.stopPropagation(); setMenuId(menuId === msg.id ? null : msg.id); }}
                      style={{ color: 'var(--text-dim)' }}>
                      <Icon name="MoreVertical" size={13} />
                    </button>
                  )}
                  {menuId === msg.id && (
                    <div className="absolute left-0 top-5 z-20 w-32" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                      onClick={e => e.stopPropagation()}>
                      <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:opacity-70 transition-opacity"
                        style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                        onClick={() => startEdit(msg)}>
                        <Icon name="Pencil" size={12} /> Изменить
                      </button>
                      <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:opacity-70 transition-opacity"
                        style={{ fontSize: '13px', color: 'var(--red)' }}
                        onClick={() => deleteMessage(msg.id)}>
                        <Icon name="Trash2" size={12} /> Удалить
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid var(--border-color)' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          placeholder="Написать сообщение..."
          className="g-input flex-1 px-3 py-2"
          style={{ fontSize: '14px' }}
        />
        <button className="btn-red flex items-center gap-1.5"
          style={{ padding: '8px 14px', fontSize: '12px', opacity: input.trim() ? 1 : 0.4 }}
          onClick={sendMessage} disabled={!input.trim()}>
          <Icon name="Send" size={13} />
        </button>
      </div>
    </div>
  );
}

export default function CommunitiesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [joined, setJoined] = useState<JoinState>({});
  const [openChat, setOpenChat] = useState<{ id: number; name: string } | null>(null);

  const filtered = communities.filter(c => {
    const matchCat = activeCategory === 'Все' || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.game.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
      <div className="px-6 md:px-16 py-10" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-label mb-1">
          <h1 className="font-display text-2xl font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>СООБЩЕСТВА</h1>
        </div>
        <p className="ml-4" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>12 400+ активных сообществ по всем играм</p>
      </div>

      <div className="px-6 md:px-16 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative max-w-md flex-1">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Поиск сообществ..." className="g-input w-full pl-9 pr-4 py-2.5 text-sm" />
          </div>
          <button className="btn-red flex items-center gap-2 self-start">
            <Icon name="Plus" size={13} />
            Создать
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Chat panel */}
        {openChat && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)' }}>ОТКРЫТЫЙ ЧАТ</span>
              <button onClick={() => setOpenChat(null)} className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>
                <Icon name="X" size={12} /> Закрыть
              </button>
            </div>
            <ChatPanel communityId={openChat.id} communityName={openChat.name} />
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <div key={c.id} className={`g-card g-card-red fade-up-${Math.min(i + 1, 5)}`}>
              <div style={{ height: '2px', background: 'var(--red)', opacity: 0.4 }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="tag-dim">{c.category.toUpperCase()}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="dot-green"></div>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{c.online.toLocaleString('ru')}</span>
                  </div>
                </div>

                <h3 className="font-display font-black mb-0.5" style={{ fontSize: '12px', color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
                  {c.name}
                </h3>
                <p style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', letterSpacing: '1px', marginBottom: '14px' }}>{c.game.toUpperCase()}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Users" size={11} style={{ color: 'var(--text-dim)' }} />
                    <span style={{ fontFamily: 'Orbitron', fontSize: '9px', color: 'var(--text-secondary)' }}>{c.members} участников</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className={joined[c.id] ? 'btn-red flex-1' : 'btn-ghost flex-1'}
                    style={{ padding: '8px', fontSize: '11px' }}
                    onClick={() => setJoined(prev => ({ ...prev, [c.id]: !prev[c.id] }))}>
                    {joined[c.id] ? '✓ Вступили' : 'Вступить'}
                  </button>
                  <button
                    className="btn-ghost flex items-center gap-1.5"
                    style={{ padding: '8px 12px', fontSize: '11px' }}
                    onClick={() => setOpenChat(openChat?.id === c.id ? null : { id: c.id, name: c.name })}>
                    <Icon name="MessageSquare" size={12} />
                    Чат
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <Icon name="Search" size={32} style={{ color: 'var(--text-dim)', margin: '0 auto 12px' }} />
            <p style={{ fontFamily: 'Orbitron', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-dim)' }}>НИЧЕГО НЕ НАЙДЕНО</p>
          </div>
        )}
      </div>
    </div>
  );
}
