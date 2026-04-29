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
};

export const forumCategories = [
  { id: 'general', name: 'Общее', icon: 'MessageSquare', topics: 12400, desc: 'Всё о геймерской жизни', last: '1 мин назад' },
  { id: 'tournaments', name: 'Турниры', icon: 'Trophy', topics: 3200, desc: 'Обсуждение турниров и результатов', last: '5 мин назад' },
  { id: 'guides', name: 'Гайды', icon: 'BookOpen', topics: 8900, desc: 'Гайды, тактики, билды', last: '12 мин назад' },
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
];
