export interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
  likes: number;
}

export interface Topic {
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

export type Tab = 'topics' | 'categories';

export interface NewTopicForm {
  title: string;
  category: string;
  body: string;
  author: string;
}

export const categoryIcons: Record<string, string> = {
  'Общее': 'MessageSquare',
  'Турниры': 'Trophy',
  'Гайды': 'BookOpen',
  'Маркетплейс': 'ShoppingBag',
  'Баги и поддержка': 'Bug',
  'Оффтопик': 'Coffee',
  'Мобильные игры': 'Smartphone',
  'RPG': 'Sword',
};

export const forumCategories = [
  { id: 'general', name: 'Общее', icon: 'MessageSquare', topics: 12400, desc: 'Всё о геймерской жизни', last: '1 мин назад' },
  { id: 'tournaments', name: 'Турниры', icon: 'Trophy', topics: 3200, desc: 'Обсуждение турниров и результатов', last: '5 мин назад' },
  { id: 'guides', name: 'Гайды', icon: 'BookOpen', topics: 8900, desc: 'Гайды, тактики, билды', last: '12 мин назад' },
  { id: 'mobile', name: 'Мобильные игры', icon: 'Smartphone', topics: 7600, desc: 'Brawl Stars, Clash Royale, PUBG Mobile и другие', last: '3 мин назад' },
  { id: 'rpg', name: 'RPG', icon: 'Sword', topics: 4300, desc: 'Genshin Impact, Elden Ring, ролевые игры', last: '18 мин назад' },
  { id: 'marketplace', name: 'Маркетплейс', icon: 'ShoppingBag', topics: 2100, desc: 'Купля-продажа аккаунтов и скинов', last: '30 мин назад' },
  { id: 'bugs', name: 'Баги и поддержка', icon: 'Bug', topics: 1800, desc: 'Технические проблемы и помощь', last: '2 ч назад' },
  { id: 'offtopic', name: 'Оффтопик', icon: 'Coffee', topics: 5400, desc: 'Разговоры не по теме', last: '8 мин назад' },
];

export const allTopics: Topic[] = [
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
  // === МОБИЛЬНЫЕ ИГРЫ ===
  {
    id: 8,
    title: 'ГАЙД: Лучшие бравлеры для пуша в Brawl Stars 2025 — топ-10 по каждому режиму',
    category: 'Мобильные игры',
    author: 'BrawlMaster_RU',
    time: '2 ч. назад',
    replies: 318,
    views: '44K',
    pinned: true,
    body: `Привет всем бравлерам! Разбираю лучших персонажей для каждого режима в текущем сезоне.\n\n**Gem Grab (Кристальный бой):**\n• Poco — лучший поддержкой, держит команду живой\n• Tara — ульта собирает всех в кучу, легко брать кристаллы\n• Gene — притягивает вражеского держателя кристаллов\n\n**Brawl Ball (Бравл-мяч):**\n• El Primo — прыжок через стену, ульта забивает гол\n• Rosa — щит держит урон пока несёшь мяч\n• Frank — ульта откидывает всех, открывает путь\n\n**Showdown (Схватка) Соло:**\n• Colt — дальняя дистанция, ломает кусты\n• Piper — снайпер, держится на краях карты\n• Leon — ульта-невидимость для финального сближения\n\n**Heist (Ограбление):**\n• Bull — наносит огромный урон сейфу в упор\n• Dynamike — взрывы через стены по сейфу\n• Brock — ракетами бьёт сейф с безопасной дистанции\n\n**Настройки управления:**\nВключи Always Show Joystick, Auto-aim OFF для точных выстрелов. Чувствительность — стандарт или -10%.`,
    comments: [
      { id: 1, author: 'BrawlPro', text: 'Poco в Gem Grab — это топ, полностью согласен. Сколько матчей им вытащил!', time: '1 ч назад', likes: 187 },
      { id: 2, author: 'StarPlayer_RU', text: 'А что скажешь про Sandy в Gem Grab? Ульта перекрывает обзор и сбивает с толку', time: '45 мин назад', likes: 94 },
      { id: 3, author: 'BrawlMaster_RU', text: '@StarPlayer_RU Sandy отличный вариант, забыл его вписать — в следующем обновлении добавлю', time: '30 мин назад', likes: 56 },
    ],
  },
  {
    id: 9,
    title: 'Настройки графики и управления PUBG Mobile для слабых телефонов — фпс гайд',
    category: 'Мобильные игры',
    author: 'PUBGmobile_tips',
    time: '4 ч. назад',
    replies: 142,
    views: '28K',
    pinned: false,
    body: `Как выжать максимальный FPS в PUBG Mobile на среднем устройстве.\n\n**Настройки графики:**\n• Графика: Плавная (Smooth)\n• Частота кадров: Экстремальная (60 FPS) — если телефон тянет\n• Стиль: Классический\n• Тени: ВЫКЛ — большой прирост FPS\n• Авто-коррекция яркости: ВЫКЛ\n\n**Настройки управления (4-пальцевая схема):**\n• Левый большой — движение\n• Правый большой — прицел/поворот\n• Левый указательный — стрельба\n• Правый указательный — прицеливание (ADS)\n\n**Дополнительно:**\n• Закрой все фоновые приложения перед игрой\n• Режим энергосбережения — ВЫКЛ во время игры\n• Включи режим игры в настройках телефона\n• Температура: если греется — снизь графику до Сбалансированного\n\n**Чувствительность (среднее устройство):**\n• Общий: 100%\n• 3-е лицо: 58%\n• Прицел: 40%\n• 4x: 20%, 6x: 14%, 8x: 10%`,
    comments: [
      { id: 1, author: 'MobileGamer_MSK', text: 'Отключение теней реально даёт +10-15 FPS на Snapdragon 665', time: '3 ч назад', likes: 213 },
      { id: 2, author: 'IphonePlayer', text: 'На iPhone 12 всё на максимуме и стабильные 60, завидую айфоновладельцам', time: '2 ч назад', likes: 78 },
    ],
  },
  {
    id: 10,
    title: 'Clash Royale: лучшие колоды для Арены 15+ — мета апрель 2025',
    category: 'Мобильные игры',
    author: 'CR_Ladder_Pro',
    time: '6 ч. назад',
    replies: 89,
    views: '16K',
    pinned: false,
    body: `Актуальные рабочие колоды для ладдера в Clash Royale.\n\n**Колода 1 — Hog Rider Cycle (7.1 ср. элексир):**\n• Hog Rider, Musketeer, Ice Golem, Log, Skeletons, Fireball, Cannon, Ice Spirit\nБыстрый цикл, постоянное давление на башни.\n\n**Колода 2 — Giant Double Prince (4.0 ср. элексир):**\n• Giant, Prince, Dark Prince, Minions, Zap, Archers, Goblin Barrel, Goblin Gang\nАгрессивный пуш с двумя принцами за гигантом.\n\n**Колода 3 — Xbow Siege (3.0 ср. элексир):**\n• X-Bow, Ice Golem, Log, Archers, Ice Spirit, Tesla, Fireball, Skeletons\nДля терпеливых игроков — защита и давление арбалетом.\n\n**Советы по игре:**\n• Первые 60 секунд — разведка колоды врага, не тратишь элексир впустую\n• Двойной элексир — время для главного пуша\n• Всегда держи контрспелл для Goblin Barrel и Balloon`,
    comments: [
      { id: 1, author: 'CR_Veteran', text: 'Xbow колода требует много практики, но на ладдере люди не знают как её контрить', time: '5 ч назад', likes: 134 },
    ],
  },
  {
    id: 11,
    title: 'Mobile Legends: гайд на самых сильных героев в текущем патче — ранговая игра',
    category: 'Мобильные игры',
    author: 'MLBB_Coach',
    time: '8 ч. назад',
    replies: 67,
    views: '12K',
    pinned: false,
    body: `Разбор сильнейших героев Mobile Legends по ролям.\n\n**Маркс (стрелок):**\n• Beatrix — универсальное оружие под любую ситуацию, высокий урон\n• Wanwan — мобильность + безопасный ultimate\n\n**Маг (midlane):**\n• Kagura — один из лучших мидеров, высокий burst\n• Lunox — две формы, сложно убить в правильных руках\n\n**Танк:**\n• Atlas — ульта собирает всю команду врага, легко рефери\n• Tigreal — базовый но надёжный инициатор\n\n**Ассасин (jungler):**\n• Ling — мобильность через стены, сложно поймать\n• Fanny — высокая механика, почти непобедима в топ-руках\n\n**Настройки управления:**\nВключи Smart Targeting в настройках, это сильно упрощает прицеливание на скиллах. FPS: 60 Hz если телефон позволяет.`,
    comments: [
      { id: 1, author: 'MLBBplayer', text: 'Fanny слишком сложная для большинства, Atlas попроще и такой же эффективный', time: '7 ч назад', likes: 98 },
      { id: 2, author: 'MLBB_Coach', text: 'Согласен, Atlas для начинающих топовый выбор — прощает много ошибок', time: '6 ч назад', likes: 45 },
    ],
  },
  // === RPG ===
  {
    id: 12,
    title: 'Genshin Impact: полный гайд по командам для Абиссального коридора этажи 9–12',
    category: 'RPG',
    author: 'GenshinTheory',
    time: '3 ч. назад',
    replies: 445,
    views: '67K',
    pinned: true,
    body: `Разбираю команды для прохождения Спирали Бездны на 36 звёзд.\n\n**Команда 1 — Национальная (этаж 9–10, первая половина):**\n• Xiangling (основной дамагер), Xingqiu (гидро триггер), Bennett (баф + хил), Kazuha (группировка + рез. пен.)\nМаксимально простая и эффективная, не требует редких персонажей.\n\n**Команда 2 — Нейтронная звезда (Hypercarry Hu Tao):**\n• Hu Tao, Yelan, Zhongli (щит), Albedo (офффилд урон)\nЛучший вариант для второй половины — огромный burst damage.\n\n**Команда 3 — Freeze (заморозка):**\n• Ayaka или Ganyu, Mona или Kokomi, Shenhe, Kazuha\nУничтожает мобильных врагов через постоянную заморозку.\n\n**Артефакты и статы:**\n• ER (восстановление энергии) — приоритет №1 для саппортов (160–180%)\n• CR/CD (крит) — 1:2 соотношение для керри\n• HP% для Hu Tao, ATK% для Xiangling\n\n**Стихийные реакции:**\nVaporize (+1.5x или +2x) и Melt (+1.5x или +2x) — главные реакции для максимального урона.`,
    comments: [
      { id: 1, author: 'TravelerC6', text: 'Национальная команда — топ, прошёл с ней полную спираль без единого арконтенса', time: '2 ч назад', likes: 567 },
      { id: 2, author: 'HuTaoMain', text: 'Hu Tao без C1 немного сложнее — нужно привыкнуть к зарядной атаке через дэш', time: '1 ч назад', likes: 234 },
      { id: 3, author: 'GenshinTheory', text: 'Верно, C1 сильно упрощает механику, но даже C0 Hu Tao — один из лучших дамагеров', time: '45 мин назад', likes: 189 },
    ],
  },
  {
    id: 13,
    title: 'Elden Ring: гайд для новичков — как не умереть 100 раз и пройти первый данж',
    category: 'RPG',
    author: 'Tarnished_RU',
    time: '5 ч. назад',
    replies: 312,
    views: '53K',
    pinned: false,
    body: `Elden Ring кажется жестокой игрой — но есть приёмы, которые сильно упрощают начало.\n\n**Стартовый класс:**\n• Vagabond — лучший для новичков, высокая выносливость и сила\n• Confessor — хороший баланс между ближним боем и магией\n\n**Первые шаги:**\n1. Пройди обучение в Church of Elleh — подними Tarnished's Wizened Finger\n2. Зачисти Stormfoot Catacombs перед замком — получишь +1 к флаконам\n3. Не ходи сразу в Stormveil Castle — исследуй Limgrave\n\n**Правило перекатов:**\n• Roll не в сторону атаки, а ПОД атаку (к врагу)\n• Heavy attack (R2) — ломает стойку боссов, особенно в серии\n• Щит + Guard Counter (после блока R2) — ключ к выживанию\n\n**Обязательные точки:**\n• Merchant Kale — купи Crafting Kit и Telescope сразу\n• Roundtable Hold — появится автоматически, не пропусти NPC\n\n**Не бойся умирать.** В Elden Ring смерть — это часть обучения. Каждый раз ты запоминаешь паттерн врага.`,
    comments: [
      { id: 1, author: 'SoulsBorn_vet', text: 'Про Guard Counter — золотые слова. Многие новички вообще не знают об этой механике', time: '4 ч назад', likes: 423 },
      { id: 2, author: 'FirstTimer_RU', text: 'Спасибо! Умер 47 раз на Margit, потом прочитал про Guard Counter и убил с первой попытки', time: '3 ч назад', likes: 891 },
      { id: 3, author: 'Tarnished_RU', text: 'Margit — классический фильтр. Кто его победил — тот точно пройдёт игру до конца', time: '2 ч назад', likes: 312 },
    ],
  },
  {
    id: 14,
    title: 'Brawl Stars: как набрать 50 000 кубков — путь от новичка до топа',
    category: 'Мобильные игры',
    author: 'CupGrinder',
    time: '9 ч. назад',
    replies: 201,
    views: '31K',
    pinned: false,
    body: `Реальный путь с 0 до 50K кубков без доната — только время и стратегия.\n\n**0–5000 кубков:**\nИграй на любых бравлерах, прокачивай тех кто нравится. Не трать самоцветы — они нужны позже.\n\n**5000–15000 кубков:**\nПереключись на одного бравлера за раз. Пуш до максимума на одном, потом следующий. Зефир+Poco — надёжная пара для этого диапазона.\n\n**15000–30000 кубков:**\nИзучи 2–3 режима, которые у тебя хорошо идут. Не играй усталым — потеряешь кубки. Лучший тайминг: утро и днём (меньше про-игроков).\n\n**30000–50000 кубков:**\nНужны прокачанные бравлеры (желательно 9–11 уровень). Играй в режимы с ротацией. Gem Grab и Brawl Ball на этом этапе надёжнее всего.\n\n**Советы для всех уровней:**\n• Выполняй квесты каждый день — бесплатные монеты и самоцветы\n• Трофейная дорога — не торопись, бери только что нужно\n• Клуб — вступи в активный, +500 монет в неделю`,
    comments: [
      { id: 1, author: 'BrawlVet_RU', text: 'Про утренний тайминг — правда. Вечером одни смурфы и профики', time: '8 ч назад', likes: 267 },
    ],
  },
  {
    id: 15,
    title: 'Genshin: какие персонажи стоит тянуть в 2025 году — рейтинг баннеров',
    category: 'RPG',
    author: 'WishAdvisor',
    time: '12 ч. назад',
    replies: 534,
    views: '89K',
    pinned: false,
    body: `Гайд по приоритетам молитв для новых и опытных игроков.\n\n**S-тир (тянуть обязательно):**\n• Neuvillette — лучший дамагер за всю историю игры, работает в любой команде\n• Furina — топ-саппорт с огромным DPS бустом для команды\n• Kazuha — незаменим в 90% команд, усиливает стихийный урон\n\n**A-тир (очень сильные):**\n• Raiden Shogun — хаб энергии для команды + хороший дамагер\n• Zhongli — лучший щитовик, никогда не устареет\n• Yelan — гидро саппорт с офффилд уроном\n\n**Стоит ли тянуть лимитных:**\nЛимитные персонажи сильнее постоянных в 95% случаев. Если нравится персонаж — тяни. Если нужен максимальный DPS — смотри Tier List выше.\n\n**Для новичков:**\nПриоритет: Zhongli → Kazuha → Neuvillette. Этот трио + Furina покроет 90% контента.\n\n**Экономия примогемов:**\nДелай только ежедневные задания + исследуй карту = ~180 праймов в неделю.`,
    comments: [
      { id: 1, author: 'F2P_Player', text: 'Kazuha изменил мою игру, выбил его случайно и с тех пор не вылезаю из 36 звёзд', time: '10 ч назад', likes: 678 },
      { id: 2, author: 'WhaleAccount', text: 'Neuvillette C2R1 — это просто читерство, стирает боссов за секунды', time: '8 ч назад', likes: 234 },
    ],
  },
];