export interface Track {
  id: string
  title: string
  artist: string
  lyricist: string | null
  composer: string
}

export interface Album {
  id: string
  date: `${number}`
  name: string
  cover: string[]
  trackList: Track[]
}

export interface SongData {
  album: Album[]
  single: Album[]
  appearsOn: Album[]
  OST: Album[]
}

export const data: SongData = {
  album: [
    {
      id: 'renarrate',
      date: '2025',
      name: 'Renarrate',
      cover: ['renarrate-1.webp', 'renarrate-2.webp'],
      trackList: [
        {
          id: 'film-no-hikari',
          title: 'フィルムの光',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'renarrate',
          title: 'Renarrate',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
        },
        {
          id: 'yume-no-aji',
          title: '夢の味',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
        },
        {
          id: 'climie',
          title: 'クライミー',
          artist: 'のん',
          lyricist: '樋口愛',
          composer: 'ひぐちけい',
        },
        {
          id: 'meiwaku-na-rinjin',
          title: '迷惑な隣人',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'mizu-wo',
          title: '水を',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'kirei-na-kutsu-haite',
          title: 'きれいな靴はいて',
          artist: 'のん',
          lyricist: 'ひぐちけい',
          composer: 'ひぐちけい',
        },
        {
          id: 'haru-yo-ukete-tatsu',
          title: '春よ受けて立つ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
        },
        {
          id: 'byoushin',
          title: '秒針',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'nigai-kajitsu',
          title: '苦い果実',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'orokamono-no-boku-to-kimi',
          title: '愚か者の僕と君',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'kousagi-bonus-track',
          title: '子うさぎ (Bonus track)',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
        },
      ],
    },
    {
      id: 'pursue',
      date: '2023',
      name: 'PURSUE',
      cover: ['pursue-1.webp', 'pursue-2.webp'],
      trackList: [
        {
          id: 'beautiful-stars',
          title: 'Beautiful Stars',
          artist: 'のん',
          lyricist: '後藤正文',
          composer: '後藤正文',
        },
        {
          id: 'namaiki-ni-skirt',
          title: 'ナマイキにスカート',
          artist: 'のん',
          lyricist: 'ノマアキコ',
          composer: 'ユウ',
        },
        {
          id: 'watashi-wa-heiyaju',
          title: 'わたしは部屋充',
          artist: 'のん',
          lyricist: '柴田隆浩',
          composer: '柴田隆浩',
        },
        {
          id: 'usupperai-na',
          title: '薄っぺらいな',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'aliens-cover',
          title: 'エイリアンズ (Cover)',
          artist: 'のん',
          lyricist: '堀込泰行',
          composer: '堀込泰行',
        },
        {
          id: 'yume-ga-itamu-kara-inspired-by-tokyo-hyakkei',
          title: '夢が傷むから Inspired by 東京百景',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
        },
        {
          id: 'kocchi-wo-miteru',
          title: 'こっちを見てる',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'boku-wa-kimi-no-taiyo',
          title: '僕は君の太阳',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
        },
        {
          id: 'oh-oh-oh',
          title: 'Oh! Oh! Oh!',
          artist: 'のん',
          lyricist: '堀込泰行',
          composer: '堀込泰行',
        },
        {
          id: 'mushakusha',
          title: 'むしゃくしゃ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'kono-hibi-yo-uta-ni-nare',
          title: 'この日々よ歌になれ',
          artist: 'のん',
          lyricist: '柴田隆浩',
          composer: '柴田隆浩',
        },
        {
          id: 'kouya-ni-tatsu',
          title: '荒野に立つ',
          artist: 'のん',
          lyricist: 'ヒグチアイ',
          composer: 'ヒグチアイ',
        },
      ],
    },
    {
      id: 'show-ga-hajimaru-yo',
      date: '2020',
      name: 'ショーがはじまるョ！',
      cover: ['show-ga-hajimaru-yo.webp'],
      trackList: [
        {
          id: 'show-ga-hajimaru',
          title: 'ショーがはじまる！',
          artist: 'のんとも。M',
          lyricist: 'Sachiko M',
          composer: '大友良英',
        },
        {
          id: 'sherry',
          title: 'Sherry (Cover)',
          artist: 'のんとも。M',
          lyricist: 'Bob Gaudio',
          composer: 'Bob Gaudio',
        },
        {
          id: 'nemurenai',
          title: '眠れない',
          artist: 'のんとも。M',
          lyricist: '大友良英',
          composer: '大友良英',
        },
        {
          id: 'tokimeki',
          title: 'トキメキ',
          artist: 'のんとも。M',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'hassuru-hoi',
          title: 'ハッスルホイ (Cover)',
          artist: 'のんとも。M',
          lyricist: '青島幸男',
          composer: '萩原哲晶',
        },
        {
          id: 'hinageshi-no-hana',
          title: 'ひなげしの花 (Cover)',
          artist: 'のんとも。M',
          lyricist: '山上路夫',
          composer: '森田公一',
        },
        {
          id: 'snow-dance',
          title: 'snow dance',
          artist: 'のんとも。M',
          lyricist: 'Sachiko M',
          composer: 'Sachiko M',
        },
        {
          id: 'lalala-nichiyoubi',
          title: 'lalala にちようび',
          artist: 'のんとも。M',
          lyricist: 'Sachiko M',
          composer: 'Sachiko M',
        },
        {
          id: 'itsu-demo-kimi-wa',
          title: 'いつでも君は',
          artist: 'のんとも。M',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'ashita-ga-aru-sa',
          title: '明日があるさ (Cover) [feat. 小泉今日子, 尾美としのり, 渡辺えり, 片桐はいり & 尾身美詞]',
          artist: 'のんとも。M',
          lyricist: '青島幸男',
          composer: '中村八大',
        },
        {
          id: 'sanae-chan',
          title: 'さなえちゃん (Cover)',
          artist: 'のんとも。M',
          lyricist: '仲井戸麗市',
          composer: '仲井戸麗市',
        },
      ],
    },
    {
      id: 'baby-face',
      date: '2019',
      name: 'ベビーフェイス',
      cover: ['baby-face.webp'],
      trackList: [
        {
          id: 'yamanai-girl',
          title: 'やまないガール',
          artist: 'のん',
          lyricist: 'ノマアキコ',
          composer: 'ユウ',
        },
        {
          id: 'moyamoya',
          title: 'モヤモヤ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'akogarete',
          title: '憧れて',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'aoi-shakunetsu',
          title: '苍い灼熱',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'namida-no-aji-nigai-aji',
          title: '涙の味、苦い味',
          artist: 'のん',
          lyricist: 'ノマアキコ',
          composer: 'ユウ',
        },
      ],
    },
    {
      id: 'super-heroes',
      date: '2018',
      name: 'スーパーヒーローズ',
      cover: ['super-heroes-1.webp', 'super-heroes-2.webp', 'super-heroes-3.webp'],
      trackList: [
        {
          id: 'hen-nano',
          title: 'へーんなのっ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'saa-ikou',
          title: 'さあいこう',
          artist: 'のん',
          lyricist: '真島昌利',
          composer: '真島昌利',
        },
        {
          id: 'shojiki-mono-wa-yuku',
          title: '正直者はゆく',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'aru-koto-nai-koto',
          title: 'あることないこと',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'run',
          title: 'RUN!!!',
          artist: 'のん',
          lyricist: 'Sachiko M',
          composer: 'Sachiko M',
        },
        {
          id: 'sketchbook',
          title: 'スケッチブック',
          artist: 'のん',
          lyricist: '尾崎亜美',
          composer: '尾崎亜美',
        },
        {
          id: 'my-day',
          title: 'My Day',
          artist: 'のん',
          lyricist: '佐藤美恵子',
          composer: '高橋幸宏',
        },
        {
          id: 'sutoreto-kaido',
          title: 'ストレート街道',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'watashi-no-daisuki-na-uta',
          title: '私の大好きな歌',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'watashi-wa-baby',
          title: 'わたしはベイベー',
          artist: 'のん',
          lyricist: '矢野顕子',
          composer: '矢野顕子',
        },
        {
          id: 'superhero-ni-naritai',
          title: 'スーパーヒーローになりたい',
          artist: 'のん',
          lyricist: '高野寛',
          composer: '高野寛',
        },
        {
          id: 'oyasumi',
          title: 'おやすみ',
          artist: 'のん',
          lyricist: '大友良英 & Sachiko M',
          composer: '大友良英 & Sachiko M',
        },
      ],
    },
    {
      id: 'run',
      date: '2018',
      name: 'RUN!!!',
      cover: ['run.webp'],
      trackList: [
        {
          id: 'run',
          title: 'RUN!!!',
          artist: 'のん',
          lyricist: 'Sachiko M',
          composer: 'Sachiko M',
        },
        {
          id: 'sutoreto-kaido',
          title: 'ストレート街道',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
      ],
    },
    {
      id: 'superhero-ni-naritai',
      date: '2017',
      name: 'スーパーヒーローになりたい',
      cover: ['superhero-ni-naritai.webp'],
      trackList: [
        {
          id: 'superhero-ni-naritai',
          title: 'スーパーヒーローになりたい',
          artist: 'のん',
          lyricist: '高野寛',
          composer: '高野寛',
        },
        {
          id: 'hen-nano',
          title: 'へーんなのっ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
        {
          id: 'i-like-you',
          title: 'I LIKE YOU',
          artist: 'のん',
          lyricist: '忌野清志郎',
          composer: '忌野清志郎',
        },
        {
          id: 'taimumashin-ni-onegai-world-happiness-2017-mix',
          title: 'タイムマシンにお願い （WORLD HAPPINESS 2017 MIX）',
          artist: 'のん',
          lyricist: '松山猛',
          composer: '加藤和彦',
        },
      ],
    },
    {
      id: 'ohirome-pakku',
      date: '2017',
      name: 'オヒロメ・パック',
      cover: ['ohirome-pakku.webp'],
      trackList: [
        {
          id: 'taimumashin-ni-onegai',
          title: 'タイムマシンにお願い',
          artist: 'のん',
          lyricist: '松山猛',
          composer: '加藤和彦',
        },
        {
          id: 'i-like-you',
          title: 'I LIKE YOU',
          artist: 'のん',
          lyricist: '忌野清志郎',
          composer: '忌野清志郎',
        },
      ],
    },
  ],
  single: [
    {
      id: 'gwgw',
      date: '2025',
      name: 'GwGw',
      cover: ['gwgw.webp'],
      trackList: [
        {
          id: 'gwgw',
          title: 'GwGw',
          artist: 'のん',
          lyricist: '谷口鮪, POKEMON MUSIC COLLECTIVE',
          composer: '谷口鮪',
        },
      ],
    },
    {
      id: 'christmas-song',
      date: '2019',
      name: 'クリスマスソング',
      cover: ['christmas-song.webp'],
      trackList: [
        {
          id: 'christmas-song',
          title: 'クリスマスソング',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
        },
      ],
    },
  ],
  appearsOn: [
    {
      id: 'ghibli-wo-utau-sono',
      date: '2026',
      name: 'スタジオジブリトリビュートアルバム「ジブリをうたう その2」',
      cover: ['ghibli-wo-utau-sono.webp'],
      trackList: [
        {
          id: 'country-road',
          title: 'カントリー・ロード',
          artist: 'のん / SOIL & "PIMP" SESSIONS',
          lyricist: 'John Denver / Taffy Nivert / Bill Danoff / 鈴木麻実子 /（宮崎駿）',
          composer: 'John Denver / Taffy Nivert / Bill Danoff',
        },
      ],
    },
    {
      id: 'no-worries',
      date: '2025',
      name: 'no worries',
      cover: ['no-worries.webp'],
      trackList: [
        {
          id: 'no-worries',
          title: 'no worries (feat. のん)',
          artist: 'ROCKETMAN / のん',
          lyricist: 'ふかわりょう',
          composer: 'ふかわりょう',
        },
      ],
    },
    {
      id: 'parallel-ribbons',
      date: '2022',
      name: 'Parallel Ribbons',
      cover: ['parallel-ribbons.webp'],
      trackList: [
        {
          id: 'ribbon-kumikyoku',
          title: 'Ribbon組曲 (feat. のん)',
          artist: 'ひぐちけい',
          lyricist: null,
          composer: 'ひぐちけい',
        },
        {
          id: 'ribbon',
          title: 'ribbon (feat. のん)',
          artist: 'ひぐちけい',
          lyricist: 'のん',
          composer: 'ひぐちけい',
        },
        {
          id: 'azayaka-na-hibi',
          title: '鮮やかな日々 (feat. のん)',
          artist: 'ひぐちけい',
          lyricist: 'のん',
          composer: 'ひぐちけい',
        },
      ],
    },
    {
      id: 'maruyamacho-romantic-dori',
      date: '2018',
      name: '円山町ロマンチック通り',
      cover: ['maruyamacho-romantic-dori.webp'],
      trackList: [
        {
          id: 'cinderella',
          title: 'シンデレラ (feat. のん,奇妙礼太郎)',
          artist: 'ライトガールズ(やついいちろう×Sundayカミデ)',
          lyricist: 'Sundayカミデ',
          composer: 'Sundayカミデ',
        },
      ],
    },
  ],
  OST: [
    {
      id: 'hoshikuzu-no-machi-original-soundtrack',
      date: '2020',
      name: '映画「星屑の町」オリジナル・サウンドトラック',
      cover: ['hoshikuzu-no-machi-original-soundtrack.webp'],
      trackList: [
        {
          id: 'shabon-dama',
          title: 'シャボン玉',
          artist: 'のん / ハローナイツ',
          lyricist: '松浦有希',
          composer: '宮原慶太',
        },
        {
          id: 'miss-you',
          title: 'MISS YOU',
          artist: '山田修とハローナイツ / のん',
          lyricist: '苦楽健人',
          composer: '景家淳',
        },
      ],
    },
    {
      id: 'amachan-uta-no-arubamu',
      date: '2013',
      name: 'あまちゃん 歌のアルバム',
      cover: ['amachan-uta-no-arubamu.webp'],
      trackList: [
        {
          id: 'shiosai-no-memori-ozashiki-ressha-bashon',
          title: '潮騒のメモリー (お座敷列車バージョン)',
          artist: '橋本愛 / 能年玲奈',
          lyricist: '宮藤官九郎',
          composer: '大友良英、Sachiko M',
        },
      ],
    },
  ],
}
