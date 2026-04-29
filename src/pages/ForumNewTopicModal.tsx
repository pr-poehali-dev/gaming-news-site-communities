import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Topic, NewTopicForm, forumCategories } from './forum.types';

export default function ForumNewTopicModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (t: Topic) => void }) {
  const [form, setForm] = useState<NewTopicForm>({ title: '', category: 'Общее', body: '', author: '' });

  const handleSubmit = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    onSubmit({
      id: Date.now(),
      title: form.title,
      category: form.category,
      author: form.author.trim() || 'Гость',
      time: 'только что',
      replies: 0,
      views: '0',
      pinned: false,
      body: form.body,
      comments: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.75)' }}>
      <div className="w-full max-w-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <span className="font-display font-black" style={{ fontSize: '12px', color: 'var(--text-primary)', letterSpacing: '2px' }}>НОВАЯ ТЕМА</span>
          <button onClick={onClose} className="hover:opacity-70 transition-opacity">
            <Icon name="X" size={16} style={{ color: 'var(--text-dim)' }} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '8px' }}>РАЗДЕЛ</div>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="g-input w-full px-3 py-2 text-sm"
              style={{ color: 'var(--text-primary)', background: 'var(--bg)', cursor: 'pointer' }}>
              {forumCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '8px' }}>ЗАГОЛОВОК</div>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Тема вашего поста..." className="g-input w-full px-3 py-2 text-sm" />
          </div>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '8px' }}>ТЕКСТ</div>
            <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
              placeholder="Напишите содержание темы..." rows={5}
              className="g-input w-full px-3 py-2 text-sm resize-none" style={{ fontSize: '15px' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '8px' }}>ВАШ НИКНЕЙМ</div>
            <input type="text" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
              placeholder="Необязательно" className="g-input w-full px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn-ghost flex-1" onClick={onClose}>Отмена</button>
            <button className="btn-red flex-1" onClick={handleSubmit}
              style={{ opacity: form.title.trim() && form.body.trim() ? 1 : 0.4 }}
              disabled={!form.title.trim() || !form.body.trim()}>
              Опубликовать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
