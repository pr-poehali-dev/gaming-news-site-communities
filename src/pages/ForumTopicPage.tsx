import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Comment, Topic } from './forum.types';
import { useUser } from '@/context/UserContext';

export default function ForumTopicPage({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const { profile } = useUser();
  const storageKey = `nexus_forum_comments_${topic.id}`;

  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : topic.comments;
    } catch {
      return topic.comments;
    }
  });

  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [menuId, setMenuId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(),
      author: profile.nick,
      text: commentText.trim(),
      time: 'только что',
      likes: 0,
    }]);
    setCommentText('');
  };

  const deleteComment = (id: number) => {
    setComments(prev => prev.filter(c => c.id !== id));
    setMenuId(null);
  };

  const startEdit = (c: Comment) => {
    setEditingId(c.id);
    setEditText(c.text);
    setMenuId(null);
  };

  const saveEdit = (id: number) => {
    if (!editText.trim()) return;
    setComments(prev => prev.map(c => c.id === id ? { ...c, text: editText.trim(), time: c.time + ' (ред.)' } : c));
    setEditingId(null);
  };

  const isOwn = (c: Comment) => c.author === profile.nick;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }} onClick={() => setMenuId(null)}>
      {/* Back */}
      <div className="px-6 md:px-16 py-3" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
        <button onClick={onBack} className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          <Icon name="ChevronLeft" size={14} /> Назад на форум
        </button>
      </div>

      <div className="px-6 md:px-16 py-10 max-w-4xl">
        {/* Tags */}
        <div className="flex items-center gap-3 mb-4">
          {topic.pinned && <span className="tag-red">Закреп</span>}
          <span className="tag-dim">{topic.category.toUpperCase()}</span>
          <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{topic.time}</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-black mb-2 leading-tight" style={{ fontSize: 'clamp(18px, 3vw, 28px)', color: 'var(--text-primary)' }}>
          {topic.title}
        </h1>
        <div className="flex items-center gap-4 mb-8">
          <span style={{ fontFamily: 'Orbitron', fontSize: '9px', color: 'var(--red)', opacity: 0.9 }}>{topic.author}</span>
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={10} style={{ color: 'var(--text-dim)' }} />
            <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{topic.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="MessageSquare" size={10} style={{ color: 'var(--text-dim)' }} />
            <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{comments.length}</span>
          </div>
        </div>

        {/* Body */}
        <div className="mb-10 p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--red)' }}>
          {topic.body.split('\n').map((line, i) =>
            line.trim() === '' ? <br key={i} /> :
            line.startsWith('**') ? (
              <p key={i} className="font-semibold mb-2" style={{ color: 'var(--text-primary)', fontSize: '16px' }}>
                {line.replace(/\*\*/g, '')}
              </p>
            ) : (
              <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.75', marginBottom: '4px' }}>{line}</p>
            )
          )}
        </div>

        {/* Comments */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '28px' }}>
          <div className="section-label mb-5">
            <h2 className="font-display font-black" style={{ fontSize: '13px', color: 'var(--text-primary)', letterSpacing: '2px' }}>
              ОТВЕТЫ <span style={{ color: 'var(--red)' }}>{comments.length}</span>
            </h2>
          </div>

          {/* Reply form */}
          <div className="mb-6 p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)' }}>НАПИСАТЬ ОТВЕТ КАК</div>
              <span style={{ fontFamily: 'Orbitron', fontSize: '9px', color: 'var(--red)' }}>{profile.nick}</span>
            </div>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)}
              placeholder="Ваш ответ..." rows={3}
              className="g-input w-full px-3 py-2 text-sm mb-3 resize-none"
              style={{ fontSize: '15px' }} />
            <div className="flex justify-end">
              <button className="btn-red" style={{ fontSize: '12px', padding: '9px 22px', opacity: commentText.trim() ? 1 : 0.4 }}
                onClick={handleSubmit} disabled={!commentText.trim()}>
                Отправить
              </button>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="p-4 group relative" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center font-display font-black text-xs flex-shrink-0"
                      style={{ background: 'var(--bg)', border: `1px solid ${isOwn(c) ? 'rgba(224,32,32,0.4)' : 'var(--border-color)'}`, color: 'var(--text-secondary)' }}>
                      {c.author[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-display font-bold" style={{ fontSize: '10px', color: isOwn(c) ? 'var(--red)' : 'var(--text-secondary)' }}>{c.author}</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', marginLeft: '10px' }}>{c.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setLiked(prev => ({ ...prev, [c.id]: !prev[c.id] })); }}
                      className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                      style={{ fontFamily: 'Orbitron', fontSize: '8px', color: liked[c.id] ? 'var(--red)' : 'var(--text-dim)' }}>
                      <Icon name="ThumbsUp" size={11} />
                      {c.likes + (liked[c.id] ? 1 : 0)}
                    </button>
                    {/* Own comment menu */}
                    {isOwn(c) && (
                      <div className="relative">
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-70"
                          style={{ color: 'var(--text-dim)' }}
                          onClick={e => { e.stopPropagation(); setMenuId(menuId === c.id ? null : c.id); }}>
                          <Icon name="MoreVertical" size={14} />
                        </button>
                        {menuId === c.id && (
                          <div className="absolute right-0 top-5 z-20 w-36" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                            onClick={e => e.stopPropagation()}>
                            <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:opacity-70 transition-opacity"
                              style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                              onClick={() => startEdit(c)}>
                              <Icon name="Pencil" size={12} /> Изменить
                            </button>
                            <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:opacity-70 transition-opacity"
                              style={{ fontSize: '13px', color: 'var(--red)' }}
                              onClick={() => deleteComment(c.id)}>
                              <Icon name="Trash2" size={12} /> Удалить
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {editingId === c.id ? (
                  <div className="flex gap-2 pl-10">
                    <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={2}
                      className="g-input flex-1 px-2 py-1 text-sm resize-none"
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEdit(c.id); } if (e.key === 'Escape') setEditingId(null); }}
                      autoFocus />
                    <div className="flex flex-col gap-1">
                      <button onClick={() => saveEdit(c.id)} style={{ color: 'var(--red)' }}>
                        <Icon name="Check" size={16} />
                      </button>
                      <button onClick={() => setEditingId(null)} style={{ color: 'var(--text-dim)' }}>
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', paddingLeft: '40px' }}>{c.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
