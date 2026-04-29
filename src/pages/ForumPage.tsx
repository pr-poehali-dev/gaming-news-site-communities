import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
  likes: number;
}

interface Topic {
  id: number;
  title: string;
  category: string;
  author: string;
  time: string;
  replies: number;
  views: string;
  pinned: boolean;
  body: string;
  comments: Comment[];
}

const allTopics: Topic[] = [
  {
    id: 1,
    title: 'ГАЙД: Как выйти на Divine в Dota 2 за 1 сезон — детальный разбор',
    category: 'Гайды',
    author: 's1mple_fan_RU',
    time: '1 ч. назад',
    replies: 412,
    views: '78K',
    pinned: true,
    body: `Привет всем! За этот сезон я вышел с Ancient 2 на Divine 4. Делюсь всем, что реально работает.\n\n**1. Пул героев — не больше 3**\nЯ играл только Invoker, Ember Spirit и Lina. Когда у тебя 5 героев — ты ни в одном не хорош. Учись читать игру на 1–2 позициях.\n\n**2. Карта, не герой**\nВыход на Divine — это не механика, это карта. Смотри миникарту каждые 5 секунд. Знай, где враги. Делай правильные TP.\n\n**3. Нейтральные лагеря**\nFarming efficiency — ключ. На мидере: убил волну → farm лагерь → вернись → убил волну. Не стой на лайне без дела.\n\n**4. Коммуникация**\nДаже в соло-кью пиши в чат: «gank mid», «rune taken», «smoke». Командная игра поднимает WR на 12–15%.\n\n**5. Анализ реплеев**\nПосле каждого поражения смотри 5 минут реплея. Найди один момент, где ты ошибся. Только один.\n\nЕсли следовать этому — 1000 MMR за 3 месяца реальны. Удачи!`,
    comments: [
      { id: 1, author: 'Dota_Divine', text: 'Реально работает, пул героев — самое важное. Я тоже так делал', time: '45 мин назад', likes: 234 },
      { id: 2, author: 'MMR_Grinder', text: 'А что скажешь про роль 5? Там та же механика?', time: '30 мин назад', likes: 67 },
      { id: 3, author: 's1mple_fan_RU', text: '@MMR_Grinder на 5 всё то же самое, плюс варды и дымы — обязательны каждый матч', time: '15 мин назад', likes: 112 },
    ],
  },
  {
    id: 2,
    title: 'CS2: топ-10 настроек мыши и crosshair от профи игроков (NaVi, Vitality)',
    category: 'Гайды',
    author: 'cs_pro_tips',
    time: '2 ч. назад',
    replies: 234,
    views: '45K',
    pinned: false,
    body: `Собрал настройки от топ-профи CS2. Всё актуально на апрель 2025.\n\n**Мышь и сенсивити:**\n• s1mple (NAVI): 400 DPI, sensitivity 3.09, raw input ON\n• ZywOo (Vitality): 400 DPI, sensitivity 2.0, raw input ON\n• NiKo (G2): 400 DPI, sensitivity 1.35\n• sh1ro (Cloud9): 800 DPI, sensitivity 1.55\n\n**Crosshair s1mple:**\ncl_crosshairsize 2; cl_crosshairgap -1; cl_crosshairthickness 0; cl_crosshair_drawoutline 1; cl_crosshaircolor 4\n\n**Crosshair ZywOo:**\ncl_crosshairsize 1.5; cl_crosshairgap -2; cl_crosshairthickness 0.5; cl_crosshair_drawoutline 0; cl_crosshaircolor 1\n\n**Общие советы:**\n- Используй 400–800 DPI, не выше\n- eDPI (DPI × sens) у профи: 700–1200\n- raw input ВСЕГДА включён\n- mouse acceleration ВСЕГДА выключен\n\nКопируй и тестируй в дезматче!`,
    comments: [
      { id: 1, author: 'AWPer_God', text: 'У меня 400 DPI и 2.5 sensy, думал нормально — теперь понял что надо снижать', time: '1 ч назад', likes: 189 },
      { id: 2, author: 'cs_pro_tips', text: 'Главное — не меняй резко. Снижай на 10% каждую неделю', time: '45 мин назад', likes: 145 },
    ],
  },
  {
    id: 3,
    title: 'Нашёл читера на Faceit — как правильно репортить и не получить бан самому',
    category: 'Баги и поддержка',
    author: 'BugHunter404',
    time: '3 ч. назад',
    replies: 89,
    views: '14K',
    pinned: false,
    body: `Ситуация: играешь на Faceit, очевидный хак (wallhack/aim). Как действовать правильно?\n\n**Шаг 1: Не флеймить в чате**\nFaceit может забанить за токсичность даже если ты репортишь читера. Молчи в чате.\n\n**Шаг 2: Сохрани матч ID**\nПосле матча скопируй ссылку на матч. Она нужна для репорта.\n\n**Шаг 3: Репорт через сайт**\nFaceit.com → профиль игрока → Report → выбери тип нарушения → прикрепи временные метки из демки.\n\n**Шаг 4: FACEIT Support**\nЕсли репорт не помог — support.faceit.com, тикет с демкой и временными метками.\n\n**Важно:** не кричи «читер» в общем чате матча — это считается обвинением без доказательств и может дать предупреждение тебе.\n\nVACnet + FACEIT AC обычно реагируют в течение 1–7 дней.`,
    comments: [
      { id: 1, author: 'FaceitL8', text: 'Два месяца назад отправил репорт — игрока забанили через 3 дня. Система работает', time: '2 ч назад', likes: 234 },
      { id: 2, author: 'BugHunter404', text: 'Главное именно не флеймить — это важнее всего остального', time: '1 ч назад', likes: 98 },
    ],
  },
  {
    id: 4,
    title: 'Продам аккаунт Valorant: Radiant ранг, 1800+ часов, редкие скины',
    category: 'Маркетплейс',
    author: 'SellerPro',
    time: '4 ч. назад',
    replies: 21,
    views: '5.1K',
    pinned: false,
    body: `Продаю основной аккаунт Valorant.\n\n**Характеристики:**\n• Ранг: Radiant (пик — топ-200 Европы)\n• Часов: 1847\n• Регион: EU\n• Скины: Elderflame Vandal, Prime Phantom, Champions 2023 Vandal, Reaver Karambit\n• Battlepass: полный прогресс за 3 последних сезона\n\n**Цена: 25 000 руб.**\nТорг уместен. Принимаю: USDT, Тинькофф, СБП.\n\nГарантия: передача аккаунта через гарант сервис (Plati.ru или ваш вариант).\n\nПишите в ЛС или в Discord: SellerPro#4421`,
    comments: [
      { id: 1, author: 'Buyer777', text: 'Цена адекватная для Радианта с такими скинами, писал в дс', time: '3 ч назад', likes: 12 },
    ],
  },
  {
    id: 5,
    title: 'Ищу стак для FACEIT Level 8+ в CS2 — микрофон обязателен, 18+',
    category: 'Общее',
    author: 'TeamFinder_X',
    time: '5 ч. назад',
    replies: 67,
    views: '9.3K',
    pinned: false,
    body: `Привет! Ищу постоянный стак для игры на FACEIT.\n\n**Требования:**\n• Уровень 8+ на FACEIT\n• Микрофон (обязательно, без него не рассматриваю)\n• Возраст 18+\n• Адекватность — без флейма и токсика\n• Тайм-зона: MSK ±2 ч\n• Активность: 4–6 дней в неделю, вечером 19:00–23:00 МСК\n\n**О себе:**\nFACEIT Level 9, 2 800+ ELO, основная роль — entry fragger / rifler.\nИграю в CS с 2015, не флеймлю, умею слушать.\n\n**Контакт:**\nDiscord: TeamFinder_X#0001\nSteam: steamcommunity.com/id/teamfinderx`,
    comments: [
      { id: 1, author: 'CS2_L9', text: 'Я Level 9, пишу в дискорд', time: '4 ч назад', likes: 8 },
      { id: 2, author: 'RiflerMSK', text: 'L8, рифлер, писал в стим', time: '3 ч назад', likes: 5 },
    ],
  },
  {
    id: 6,
    title: 'Мета Dota 2 патч 7.37: какие герои имба, кого пикать в пабе',
    category: 'Общее',
    author: 'MetaAnalyst',
    time: '7 ч. назад',
    replies: 534,
    views: '62K',
    pinned: false,
    body: `Разбор актуальной меты после выхода патча 7.37.\n\n**S-тир (пикай всегда):**\n• Медуза — carry с огромным потенциалом в лейте, сложно убить\n• Лина — мид/кэрри, высокий урон, хорошее масштабирование\n• Пак — мид, быстрые ротации, высокий kill pressure\n\n**A-тир (сильные пики):**\n• Ember Spirit — мобильный мид, хорошая duel-механика\n• Тёмный Гнев — jungle/lane, быстрый фарм\n• Disruptor — поддержка, сильный контроль\n\n**Что занерфили:**\n• Брудмазер — -10% скорости паутины\n• Снайпер — урон скилла снижен на 20\n• Visage — cooldown Q увеличен\n\n**Что забафали:**\n• Wraith King — +5 дамага базового атаки\n• Invoker — EMP манавзаимодействие усилено\n\nПатч в целом более balanced, меньше одношотов.`,
    comments: [
      { id: 1, author: 'DotaVet', text: 'Медуза имба это правда, сложно контрить без silence+magic damage', time: '6 ч назад', likes: 341 },
      { id: 2, author: 'MidOnlyBrain', text: 'Пак на мид — это топ, согласен. Ротации просто бесконечные', time: '5 ч назад', likes: 178 },
      { id: 3, author: 'MetaAnalyst', text: 'Брудмазер туда же — после нерфа всё стало намного интереснее', time: '4 ч назад', likes: 89 },
    ],
  },
  {
    id: 7,
    title: '[ОФИЦИАЛЬНО] The International 2025 — правила, расписание, как смотреть',
    category: 'Турниры',
    author: 'NEXUS_ADMIN',
    time: '1 д. назад',
    replies: 891,
    views: '134K',
    pinned: true,
    body: `Официальный тред о The International 2025.\n\n**Даты:** 10–24 августа 2025, Копенгаген, Royal Arena\n\n**Формат:**\n• Group Stage (10–14 авг): 4 группы по 5 команд, round robin\n• Wildcard (15 авг): команды 3–5 места борются за плей-офф\n• Main Event (17–24 авг): 12 команд, double-elimination\n• Grand Final: BO5\n\n**Где смотреть:**\n• Twitch: twitch.tv/dota2ti_ru (русский)\n• YouTube: DotA 2 Official Channel\n• Steam TV: бесплатно в клиенте\n\n**Призовой фонд:** $40 300 000\n• 1 место: ~$15 000 000\n• 2 место: ~$6 500 000\n• Топ-8: от $1 000 000\n\n**Составы от СНГ:**\n• Team Spirit: Yatoro, Mira, Collapse, Larl, Miposhka\n• BetBoom Team: уточняется\n\nОбновляем тред по ходу турнира!`,
    comments: [
      { id: 1, author: 'TI_Watcher', text: 'Spirit снова фаворит! Collapse просто лучший оффлейнер в мире', time: '20 ч назад', likes: 2341 },
      { id: 2, author: 'EUDotaFan', text: 'Gaimin Gladiators выглядят очень сильно в этом году', time: '18 ч назад', likes: 876 },
      { id: 3, author: 'NEXUS_ADMIN', text: 'Расписание матчей обновим ближе к старту турнира', time: '12 ч назад', likes: 445 },
    ],
  },
];

const categoryIcons: Record<string, string> = {
  'Общее': 'MessageSquare',
  'Турниры': 'Trophy',
  'Гайды': 'BookOpen',
  'Маркетплейс': 'ShoppingBag',
  'Баги и поддержка': 'Bug',
  'Оффтопик': 'Coffee',
};

const forumCategories = [
  { id: 'general', name: 'Общее', icon: 'MessageSquare', topics: 12400, desc: 'Всё о геймерской жизни', last: '1 мин назад' },
  { id: 'tournaments', name: 'Турниры', icon: 'Trophy', topics: 3200, desc: 'Обсуждение турниров и результатов', last: '5 мин назад' },
  { id: 'guides', name: 'Гайды', icon: 'BookOpen', topics: 8900, desc: 'Гайды, тактики, билды', last: '12 мин назад' },
  { id: 'marketplace', name: 'Маркетплейс', icon: 'ShoppingBag', topics: 2100, desc: 'Купля-продажа аккаунтов и скинов', last: '30 мин назад' },
  { id: 'bugs', name: 'Баги и поддержка', icon: 'Bug', topics: 1800, desc: 'Технические проблемы и помощь', last: '2 ч назад' },
  { id: 'offtopic', name: 'Оффтопик', icon: 'Coffee', topics: 5400, desc: 'Разговоры не по теме', last: '8 мин назад' },
];

type Tab = 'topics' | 'categories';

interface NewTopicForm {
  title: string;
  category: string;
  body: string;
  author: string;
}

function TopicPage({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const [comments, setComments] = useState<Comment[]>(topic.comments);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(),
      author: authorName.trim() || 'Гость',
      text: commentText.trim(),
      time: 'только что',
      likes: 0,
    }]);
    setCommentText('');
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
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
            <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '12px' }}>НАПИСАТЬ ОТВЕТ</div>
            <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)}
              placeholder="Ваш никнейм" className="g-input w-full px-3 py-2 text-sm mb-3" />
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
            {comments.map((c, i) => (
              <div key={c.id} className="p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center font-display font-black text-xs flex-shrink-0"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {c.author[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-display font-bold" style={{ fontSize: '10px', color: 'var(--red)' }}>{c.author}</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', marginLeft: '10px' }}>{c.time}</span>
                    </div>
                  </div>
                  <button onClick={() => setLiked(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                    style={{ fontFamily: 'Orbitron', fontSize: '8px', color: liked[c.id] ? 'var(--red)' : 'var(--text-dim)' }}>
                    <Icon name="ThumbsUp" size={11} />
                    {c.likes + (liked[c.id] ? 1 : 0)}
                  </button>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', paddingLeft: '40px' }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewTopicModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (t: Topic) => void }) {
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

export default function ForumPage() {
  const [topics, setTopics] = useState<Topic[]>(allTopics);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<Tab>('topics');
  const [openTopic, setOpenTopic] = useState<Topic | null>(null);
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = topics.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCategory || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  if (openTopic) {
    return <TopicPage topic={openTopic} onBack={() => setOpenTopic(null)} />;
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
      {showNewTopic && (
        <NewTopicModal
          onClose={() => setShowNewTopic(false)}
          onSubmit={t => setTopics(prev => [t, ...prev])}
        />
      )}

      <div className="px-6 md:px-16 py-10" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-label mb-1">
          <h1 className="font-display text-2xl font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>ФОРУМ</h1>
        </div>
        <p className="ml-4" style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>890 000+ тем от геймеров России</p>
      </div>

      <div className="px-6 md:px-16 py-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative max-w-md flex-1">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по форуму..." className="g-input w-full pl-9 pr-4 py-2.5 text-sm" />
          </div>
          <button className="btn-red flex items-center gap-2 self-start" onClick={() => setShowNewTopic(true)}>
            <Icon name="Plus" size={13} />
            Новая тема
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          {(['topics', 'categories'] as Tab[]).map(t => {
            const labels = { topics: 'Горячие темы', categories: 'Разделы' };
            return (
              <button key={t} onClick={() => { setTab(t); if (t === 'topics') setActiveCategory(null); }}
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

        {/* Categories */}
        {tab === 'categories' && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {forumCategories.map((cat, i) => (
              <div key={cat.id} className={`g-card p-5 cursor-pointer fade-up-${Math.min(i + 1, 5)}`}
                onClick={() => { setActiveCategory(cat.name); setTab('topics'); }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                    style={{ background: 'rgba(224,32,32,0.08)', border: '1px solid rgba(224,32,32,0.2)' }}>
                    <Icon name={cat.icon} size={18} style={{ color: 'var(--red)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold mb-1" style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{cat.name}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '6px' }}>{cat.desc}</p>
                    <div className="flex items-center gap-3">
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{cat.topics.toLocaleString('ru')} тем</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>· {cat.last}</span>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={14} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Topics */}
        {tab === 'topics' && (
          <>
            {/* Active category filter */}
            {activeCategory && (
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontFamily: 'Orbitron', fontSize: '9px', color: 'var(--text-dim)' }}>Раздел:</span>
                <span className="tag-red">{activeCategory.toUpperCase()}</span>
                <button onClick={() => setActiveCategory(null)} className="hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>
                  <Icon name="X" size={11} />
                </button>
              </div>
            )}

            <div style={{ border: '1px solid var(--border-color)' }}>
              {filtered.map((topic, i) => (
                <div key={topic.id}
                  className="flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors"
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border-color)' : 'none',
                    background: topic.pinned ? 'rgba(224,32,32,0.03)' : 'var(--bg-card)',
                    borderLeft: topic.pinned ? '2px solid var(--red)' : '2px solid transparent',
                  }}
                  onClick={() => setOpenTopic(topic)}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = topic.pinned ? 'rgba(224,32,32,0.03)' : 'var(--bg-card)')}>
                  <div className="flex-shrink-0 mt-0.5">
                    {topic.pinned
                      ? <Icon name="Pin" size={13} style={{ color: 'var(--red)' }} />
                      : <Icon name={categoryIcons[topic.category] || 'MessageSquare'} size={13} style={{ color: 'var(--text-dim)' }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {topic.pinned && <span className="tag-red">Закреп</span>}
                      <span className="tag-dim">{topic.category.toUpperCase()}</span>
                    </div>
                    <p className="font-semibold truncate" style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{topic.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--red)', opacity: 0.8 }}>{topic.author}</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{topic.time}</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                    <div className="text-center">
                      <div style={{ fontFamily: 'Orbitron', fontSize: '11px', color: 'var(--text-secondary)' }}>{topic.replies}</div>
                      <div style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>ответов</div>
                    </div>
                    <div className="text-center">
                      <div style={{ fontFamily: 'Orbitron', fontSize: '11px', color: 'var(--text-secondary)' }}>{topic.views}</div>
                      <div style={{ fontFamily: 'Orbitron', fontSize: '7px', color: 'var(--text-dim)' }}>просмотров</div>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-16" style={{ background: 'var(--bg-card)' }}>
                  <p style={{ fontFamily: 'Orbitron', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-dim)' }}>ТЕМЫ НЕ НАЙДЕНЫ</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
