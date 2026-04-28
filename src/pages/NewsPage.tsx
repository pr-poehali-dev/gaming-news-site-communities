import { useState } from 'react';
import Icon from '@/components/ui/icon';

const categories = ['Все', 'Турниры', 'Обновления', 'Инди', 'Железо', 'Рейтинги', 'Киберспорт'];

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
  likes: number;
}

interface NewsItem {
  id: number;
  title: string;
  category: string;
  time: string;
  views: string;
  comments: number;
  body: string;
  commentsList: Comment[];
}

const news: NewsItem[] = [
  {
    id: 1,
    title: 'The International 2025 по Dota 2 — призовой фонд превысил $40 000 000',
    category: 'Турниры',
    time: '2 ч. назад',
    views: '84.2K',
    comments: 1342,
    body: `Valve официально объявила итоговый призовой фонд The International 2025 — он составил $40,3 миллиона, побив рекорд TI10.\n\nТурнир пройдёт в Копенгагене с 10 по 24 августа 2025 года. В групповом этапе примут участие 20 команд из всех регионов мира. Российские представители — Team Spirit и BetBoom Team — уже подтвердили участие.\n\nGrand Final состоится на арене Royal Arena вместимостью 12 500 зрителей. Трансляция будет вестись на Twitch, YouTube и Steam с русскоязычным стримом от студии WePlay.\n\nКоманды-фавориты по версии букмекеров: Team Spirit (3.2), Gaimin Gladiators (4.5), Tundra Esports (5.0). Team Spirit идёт в статусе действующего чемпиона после победы на TI11.`,
    commentsList: [
      { id: 1, author: 'Dota2_Divine', text: 'Spirit снова возьмут! YATORO и Mira в ударе в этом сезоне 🔥', time: '1 ч. назад', likes: 234 },
      { id: 2, author: 'EUfan_123', text: 'Gaimin Gladiators тоже выглядят очень сильно, не списывайте их', time: '1 ч. назад', likes: 87 },
      { id: 3, author: 'ChinaNo1', text: 'PSG.LGD в этом году готовились серьёзно, ждём сюрпризов от CN региона', time: '2 ч. назад', likes: 45 },
    ],
  },
  {
    id: 2,
    title: 'CS2: патч от 15 апреля — возврат de_inferno, нерф AWP, фикс лагов на серверах',
    category: 'Обновления',
    time: '4 ч. назад',
    views: '31.7K',
    comments: 876,
    body: `Valve выпустила крупный патч для Counter-Strike 2, который затронул несколько ключевых аспектов игры.\n\nГлавные изменения:\n• de_inferno возвращается в Active Duty пул вместо de_vertigo\n• AWP: урон по ногам снижен с 85 до 72, цена увеличена до $5000\n• Исправлены критические баги с телепортацией на de_mirage\n• Улучшена серверная инфраструктура в СНГ-регионе (пинг снижен на 10–15 мс)\n• Обновлён интерфейс инвентаря, добавлена сортировка по редкости\n\nПро-игроки уже активно обсуждают патч: s1mple написал в Twitter, что нерф AWP «наконец-то справедлив». NiKo из G2 считает изменение «слишком агрессивным».`,
    commentsList: [
      { id: 1, author: 'cs_pro_tips', text: 'Нерф AWP давно напрашивался, оружие было сломано на близких дистанциях', time: '3 ч. назад', likes: 412 },
      { id: 2, author: 'AWPer_God', text: 'Теперь AWP не нужен вообще, спасибо Valve 😤', time: '3 ч. назад', likes: 198 },
      { id: 3, author: 'Inferno_lover', text: 'INFERNO ВЕРНУЛАСЬ!!! Лучший патч за последние два года!', time: '4 ч. назад', likes: 891 },
    ],
  },
  {
    id: 3,
    title: 'NAVI vs Team Spirit: финал PGL Major Copenhagen — разбор по картам',
    category: 'Киберспорт',
    time: '8 ч. назад',
    views: '54.5K',
    comments: 2104,
    body: `Исторический финал PGL Major Copenhagen завершился победой NAVI со счётом 2:1 над Team Spirit. Это первый Major-титул NAVI с момента выхода CS2.\n\nРазбор по картам:\n\nКарта 1 — de_mirage (NAVI выиграли 16:11)\ns1mple набрал рейтинг 1.43, сделал 4 эйса. Spirit не справились с пистолетными раундами на Т-стороне.\n\nКарта 2 — de_inferno (Spirit выиграли 13:16)\nsh1ro играл фантастически (рейтинг 1.61), команда полностью контролировала средний коридор.\n\nКарта 3 — de_ancient (NAVI выиграли 16:14)\nНапряжённый матч с несколькими overtimes. Решающий раунд — клатч electronic 1 на 3 на пистолете.`,
    commentsList: [
      { id: 1, author: 'NAVIfan_UA', text: 'ЛЕГЕНДАРНЫЙ финал! s1mple — GOAT навсегда! 🏆', time: '7 ч. назад', likes: 1204 },
      { id: 2, author: 'Spirit_supporter', text: 'Spirit играли хорошо, но s1mple в такие дни не остановить. Зато TI впереди!', time: '7 ч. назад', likes: 567 },
      { id: 3, author: 'AnalystPro', text: 'Тактика NAVI на de_ancient была безупречной, особенно ротации через banana', time: '8 ч. назад', likes: 234 },
    ],
  },
  {
    id: 4,
    title: 'NVIDIA RTX 5090: тест в Dota 2, CS2, Valorant и Cyberpunk 2077',
    category: 'Железо',
    time: '1 д. назад',
    views: '29.3K',
    comments: 541,
    body: `Мы протестировали RTX 5090 в четырёх популярных играх на разрешении 1440p и 4K. Карта показала прирост от 35 до 80% по сравнению с RTX 4090.\n\nРезультаты (4K, Ultra settings):\n• Dota 2: 380 FPS (против 210 у 4090)\n• CS2: 520 FPS (против 310 у 4090)\n• Valorant: 640 FPS (против 400 у 4090)\n• Cyberpunk 2077 с Path Tracing: 94 FPS (против 52 у 4090)\n\nЦена RTX 5090 в России — от 180 000 рублей. Для киберспортивных игр покупка оправдана только при мониторе с частотой 360+ Гц. Для Cyberpunk — абсолютный must-have для максимальных настроек.`,
    commentsList: [
      { id: 1, author: 'PC_Master', text: '180к рублей... ну и за такие деньги можно взять весь ПК 5 раз', time: '23 ч. назад', likes: 678 },
      { id: 2, author: 'TechReview_RU', text: 'В CS2 и Valorant 4080 вполне хватает, переплата не оправдана для шутеров', time: '22 ч. назад', likes: 312 },
    ],
  },
  {
    id: 5,
    title: 'Hollow Knight: Silksong — дата выхода подтверждена, первый геймплей',
    category: 'Инди',
    time: '1 д. назад',
    views: '18.6K',
    comments: 934,
    body: `Team Cherry официально объявила дату выхода Hollow Knight: Silksong — 12 сентября 2025 года. Игра выйдет одновременно на PC (Steam), Nintendo Switch и Xbox Game Pass.\n\nНа Nintendo Direct показали 8 минут геймплея с новым биомом «Хрустальные пики» и тремя новыми боссами. Хорти получила расширенный арсенал: 40+ игл, захваты, воздушные акробатические приёмы.\n\nСтоимость: $15 на Steam. Владельцы оригинального Hollow Knight получат скидку 20%. Игра уже входит в Xbox Game Pass Ultimate с первого дня.`,
    commentsList: [
      { id: 1, author: 'HKfan2019', text: 'Я ждал этого 6 лет. ШЕСТЬ ЛЕТ. Плачу от счастья 😭', time: '20 ч. назад', likes: 2341 },
      { id: 2, author: 'IndieGamer', text: 'Геймплей выглядит потрясающе, Team Cherry не подведут', time: '21 ч. назад', likes: 876 },
      { id: 3, author: 'Sceptic99', text: 'Посмотрим — оригинал был шедевром, высокая планка', time: '22 ч. назад', likes: 234 },
    ],
  },
  {
    id: 6,
    title: 'Valorant Champions 2025 — расписание, составы команд и прогнозы',
    category: 'Киберспорт',
    time: '2 д. назад',
    views: '22.1K',
    comments: 398,
    body: `Valorant Champions 2025 пройдёт в Лос-Анджелесе с 2 по 24 августа. В турнире участвуют 16 команд из всех международных лиг.\n\nФавориты турнира:\n• Team Liquid (Европа) — чемпионы Masters Tokyo\n• NAVI (Европа) — стабильная игра весь сезон\n• EDward Gaming (Китай) — сильнейшая команда азиатского региона\n• Sentinels (Северная Америка) — возвращение TenZ в пиковой форме\n\nФормат: Swiss Stage (8 команд → плей-офф) + Single Elimination Bracket. Grand Final — 24 августа, Kia Forum, вместимость 20 000 зрителей.`,
    commentsList: [
      { id: 1, author: 'ValorantPro', text: 'TenZ снова в форме — Sentinels реальные претенденты!', time: '1 д. назад', likes: 445 },
      { id: 2, author: 'EU_esports', text: 'Liquid или NAVI — кто-то из европейцев точно возьмёт чемпионство', time: '2 д. назад', likes: 312 },
    ],
  },
  {
    id: 7,
    title: 'Steam Sale 2025: скидки до 90% на GTA V, Elden Ring, Red Dead Redemption 2',
    category: 'Обновления',
    time: '2 д. назад',
    views: '76.4K',
    comments: 2891,
    body: `Летняя распродажа Steam 2025 стартовала и продлится до 10 июля. Тысячи игр со скидками до 90%.\n\nТоп скидок:\n• GTA V — 109 руб. (−90%)\n• Elden Ring — 899 руб. (−50%)\n• Red Dead Redemption 2 — 649 руб. (−75%)\n• Cyberpunk 2077 — 549 руб. (−70%)\n• The Witcher 3: GOTY — 149 руб. (−85%)\n• Hollow Knight — 79 руб. (−60%)\n• Stardew Valley — 119 руб. (−40%)\n\nТакже Valve запустила ивент с карточками — за покупки начисляются очки для летних наклеек. Распродажа заканчивается 10 июля в 20:00 МСК.`,
    commentsList: [
      { id: 1, author: 'Steamsale_hunter', text: 'GTA V за 109 рублей — я уже купил 3 копии для подарков 😂', time: '2 д. назад', likes: 3421 },
      { id: 2, author: 'Gamer_RU', text: 'Elden Ring за 900 — берите не раздумывая, шедевр', time: '2 д. назад', likes: 1876 },
      { id: 3, author: 'Wallet_empty', text: 'Кошелёк плачет, но библиотека счастлива', time: '2 д. назад', likes: 2104 },
    ],
  },
  {
    id: 8,
    title: 'League of Legends Worlds 2025 — Group Stage: T1 и G2 лидируют в группах',
    category: 'Киберспорт',
    time: '3 д. назад',
    views: '41.3K',
    comments: 1203,
    body: `Групповой этап LoL Worlds 2025 в Сеуле подходит к концу. T1 с Faker'ом демонстрируют безупречную игру — 6 побед из 6 в группе A.\n\nТекущие результаты Группы A:\n1. T1 — 6-0 (чистые победы)\n2. G2 Esports — 4-2\n3. Cloud9 — 2-4\n4. DRX — 0-6\n\nFaker в этом году играет на уровне 2016-го, показывая рейтинг 8.7 в среднем за матч. Аналитики уже называют его форму «лучшей за последние 5 лет».\n\nПлей-офф начинается 18 октября. Квалифицировались T1, G2, BLG и Gen.G.`,
    commentsList: [
      { id: 1, author: 'T1_forever', text: 'FAKER НЕ СТАРЕЕТ. Это просто невозможно осознать 🐐', time: '2 д. назад', likes: 4512 },
      { id: 2, author: 'G2_fan', text: 'G2 тоже показывают топ игру, финал T1 vs G2 был бы мечтой', time: '3 д. назад', likes: 1234 },
      { id: 3, author: 'LoL_analyst', text: 'Посмотрим на плей-оффе — в групповом этапе иногда прячут тактики', time: '3 д. назад', likes: 567 },
    ],
  },
];

function ArticlePage({ item, onBack }: { item: NewsItem; onBack: () => void }) {
  const [comments, setComments] = useState<Comment[]>(item.commentsList);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      author: authorName.trim() || 'Гость',
      text: commentText.trim(),
      time: 'только что',
      likes: 0,
    };
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  const toggleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
      {/* Back + breadcrumb */}
      <div className="px-6 md:px-16 py-4" style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}
        >
          <Icon name="ChevronLeft" size={14} />
          Назад к новостям
        </button>
      </div>

      <div className="px-6 md:px-16 py-10 max-w-4xl">
        {/* Category + meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="tag-red">{item.category.toUpperCase()}</span>
          <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{item.time}</span>
          <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>·</span>
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={10} style={{ color: 'var(--text-dim)' }} />
            <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{item.views}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display font-black mb-8 leading-tight" style={{ fontSize: 'clamp(20px, 3vw, 32px)', color: 'var(--text-primary)' }}>
          {item.title}
        </h1>

        {/* Body */}
        <div className="mb-10 p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--red)' }}>
          {item.body.split('\n').map((line, i) => (
            line.trim() === ''
              ? <br key={i} />
              : <p key={i} className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.75', marginBottom: '4px' }}>{line}</p>
          ))}
        </div>

        {/* Comments section */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
          <div className="section-label mb-6">
            <h2 className="font-display font-black" style={{ fontSize: '14px', color: 'var(--text-primary)', letterSpacing: '2px' }}>
              КОММЕНТАРИИ <span style={{ color: 'var(--red)' }}>{comments.length}</span>
            </h2>
          </div>

          {/* Write comment */}
          <div className="mb-8 p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '12px' }}>НАПИСАТЬ КОММЕНТАРИЙ</div>
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Ваш никнейм (необязательно)"
              className="g-input w-full px-3 py-2 text-sm mb-3"
            />
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Напишите ваш комментарий..."
              rows={3}
              className="g-input w-full px-3 py-2 text-sm mb-3 resize-none"
              style={{ fontFamily: 'Rajdhani', fontSize: '14px' }}
            />
            <div className="flex justify-end">
              <button
                className="btn-red"
                style={{ fontSize: '10px', padding: '8px 20px', opacity: commentText.trim() ? 1 : 0.4 }}
                onClick={handleSubmit}
                disabled={!commentText.trim()}
              >
                Отправить
              </button>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-3">
            {comments.map((c, i) => (
              <div key={c.id} className="p-4 fade-up-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', animationDelay: `${i * 0.04}s` }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center font-display font-black text-xs flex-shrink-0" style={{ background: 'var(--bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {c.author[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-display font-bold" style={{ fontSize: '10px', color: 'var(--red)' }}>{c.author}</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)', marginLeft: '10px' }}>{c.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleLike(c.id)}
                    className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                    style={{ fontFamily: 'Orbitron', fontSize: '8px', color: likes[c.id] ? 'var(--red)' : 'var(--text-dim)' }}
                  >
                    <Icon name="ThumbsUp" size={11} />
                    {c.likes + (likes[c.id] ? 1 : 0)}
                  </button>
                </div>
                <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', paddingLeft: '40px' }}>
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [openArticle, setOpenArticle] = useState<NewsItem | null>(null);

  const filtered = news.filter(n => {
    const matchCat = activeCategory === 'Все' || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (openArticle) {
    return <ArticlePage item={openArticle} onBack={() => setOpenArticle(null)} />;
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '56px' }}>
      {/* Header */}
      <div className="px-6 md:px-16 py-10" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-label mb-1">
          <h1 className="font-display text-2xl font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>НОВОСТИ</h1>
        </div>
        <p className="ml-4" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Актуальные события игровой индустрии</p>
      </div>

      <div className="px-6 md:px-16 py-6">
        {/* Search + count */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative max-w-md flex-1">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по новостям..."
              className="g-input w-full pl-9 pr-4 py-2.5 text-sm"
            />
          </div>
          <div className="flex items-center gap-2" style={{ color: 'var(--text-dim)', fontFamily: 'Orbitron', fontSize: '9px', letterSpacing: '1px' }}>
            <Icon name="Filter" size={11} />
            {filtered.length} материалов
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`g-card g-card-red p-5 cursor-pointer fade-up-${Math.min(i + 1, 5)}`}
              onClick={() => setOpenArticle(item)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <span className="tag-red mb-3 inline-block">{item.category.toUpperCase()}</span>
              <h3 className="font-body font-semibold mb-4 leading-snug" style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.55' }}>
                {item.title}
              </h3>
              <div className="flex items-center justify-between" style={{ paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{item.time}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={10} style={{ color: 'var(--text-dim)' }} />
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={10} style={{ color: 'var(--text-dim)' }} />
                    <span style={{ fontFamily: 'Orbitron', fontSize: '8px', color: 'var(--text-dim)' }}>{item.comments}</span>
                  </div>
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
