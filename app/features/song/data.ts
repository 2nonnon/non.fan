export interface Track {
  id: string
  name: string
  artist: string
  lyricist: string | null
  composer: string
  lyric?: boolean
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
      cover: ['renarrate-1', 'renarrate-2'],
      trackList: [
        {
          id: 'film-no-hikari',
          name: 'フィルムの光',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'renarrate',
          name: 'Renarrate',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
          lyric: true,
        },
        {
          id: 'yume-no-aji',
          name: '夢の味',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
          lyric: true,
        },
        {
          id: 'cry-me',
          name: 'クライミー',
          artist: 'のん',
          lyricist: '樋口愛',
          composer: 'ひぐちけい',
          lyric: true,
        },
        {
          id: 'meiwaku-na-rinjin',
          name: '迷惑な隣人',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'mizu-wo',
          name: '水を',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'kirei-na-kutsu-haite',
          name: 'きれいな靴はいて',
          artist: 'のん',
          lyricist: 'ひぐちけい',
          composer: 'ひぐちけい',
          lyric: true,
        },
        {
          id: 'haru-yo-ukete-tatsu',
          name: '春よ受けて立つ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
          lyric: true,
        },
        {
          id: 'byoushin',
          name: '秒針',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'nigai-kajitsu',
          name: '苦い果実',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'orokamono-no-boku-to-kimi',
          name: '愚か者の僕と君',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'kousagi',
          name: '子うさぎ (Bonus track)',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
          lyric: true,
        },
      ],
    },
    {
      id: 'pursue',
      date: '2023',
      name: 'PURSUE',
      cover: ['pursue-1', 'pursue-2'],
      trackList: [
        {
          id: 'beautiful-stars',
          name: 'Beautiful Stars',
          artist: 'のん',
          lyricist: '後藤正文',
          composer: '後藤正文',
          lyric: true,
        },
        {
          id: 'namaiki-ni-skirt',
          name: 'ナマイキにスカート',
          artist: 'のん',
          lyricist: 'ノマアキコ',
          composer: 'ユウ',
          lyric: true,
        },
        {
          id: 'watashi-wa-heiyaju',
          name: 'わたしは部屋充',
          artist: 'のん',
          lyricist: '柴田隆浩',
          composer: '柴田隆浩',
          lyric: true,
        },
        {
          id: 'usupperai-na',
          name: '薄っぺらいな',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'aliens',
          name: 'エイリアンズ (Cover)',
          artist: 'のん',
          lyricist: '堀込泰行',
          composer: '堀込泰行',
          lyric: true,
        },
        {
          id: 'yume-ga-itamu-kara',
          name: '夢が傷むから Inspired by 東京百景',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
          lyric: true,
        },
        {
          id: 'kocchi-wo-miteru',
          name: 'こっちを見てる',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'boku-wa-kimi-no-taiyo',
          name: '僕は君の太阳',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'ひぐちけい',
          lyric: true,
        },
        {
          id: 'oh-oh-oh',
          name: 'Oh! Oh! Oh!',
          artist: 'のん',
          lyricist: '堀込泰行',
          composer: '堀込泰行',
          lyric: true,
        },
        {
          id: 'mushakusha',
          name: 'むしゃくしゃ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'kono-hibi-yo-uta-ni-nare',
          name: 'この日々よ歌になれ',
          artist: 'のん',
          lyricist: '柴田隆浩',
          composer: '柴田隆浩',
          lyric: true,
        },
        {
          id: 'kouya-ni-tatsu',
          name: '荒野に立つ',
          artist: 'のん',
          lyricist: 'ヒグチアイ',
          composer: 'ヒグチアイ',
          lyric: true,
        },
      ],
    },
    {
      id: 'show-ga-hajimaru-yo',
      date: '2020',
      name: 'ショーがはじまるョ！',
      cover: ['show-ga-hajimaru-yo'],
      trackList: [
        {
          id: 'show-ga-hajimaru',
          name: 'ショーがはじまる！',
          artist: 'のんとも。M',
          lyricist: 'Sachiko M',
          composer: '大友良英',
          lyric: true,
        },
        {
          id: 'sherry',
          name: 'Sherry (Cover)',
          artist: 'のんとも。M',
          lyricist: 'Bob Gaudio',
          composer: 'Bob Gaudio',
          lyric: true,
        },
        {
          id: 'nemurenai',
          name: '眠れない',
          artist: 'のんとも。M',
          lyricist: '大友良英',
          composer: '大友良英',
          lyric: true,
        },
        {
          id: 'tokimeki',
          name: 'トキメキ',
          artist: 'のんとも。M',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'hassuru-hoi',
          name: 'ハッスルホイ (Cover)',
          artist: 'のんとも。M',
          lyricist: '青島幸男',
          composer: '萩原哲晶',
          lyric: true,
        },
        {
          id: 'hinageshi-no-hana',
          name: 'ひなげしの花 (Cover)',
          artist: 'のんとも。M',
          lyricist: '山上路夫',
          composer: '森田公一',
          lyric: true,
        },
        {
          id: 'snow-dance',
          name: 'snow dance',
          artist: 'のんとも。M',
          lyricist: 'Sachiko M',
          composer: 'Sachiko M',
          lyric: true,
        },
        {
          id: 'lalala-nichiyoubi',
          name: 'lalala にちようび',
          artist: 'のんとも。M',
          lyricist: 'Sachiko M',
          composer: 'Sachiko M',
          lyric: true,
        },
        {
          id: 'itsu-demo-kimi-wa',
          name: 'いつでも君は',
          artist: 'のんとも。M',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'ashita-ga-aru-sa',
          name: '明日があるさ (Cover) [feat. 小泉今日子, 尾美としのり, 渡辺えり, 片桐はいり & 尾身美詞]',
          artist: 'のんとも。M',
          lyricist: '青島幸男',
          composer: '中村八大',
          lyric: true,
        },
        {
          id: 'sanae-chan',
          name: 'さなえちゃん (Cover)',
          artist: 'のんとも。M',
          lyricist: '仲井戸麗市',
          composer: '仲井戸麗市',
          lyric: true,
        },
      ],
    },
    {
      id: 'baby-face',
      date: '2019',
      name: 'ベビーフェイス',
      cover: ['baby-face'],
      trackList: [
        {
          id: 'yamanai-girl',
          name: 'やまないガール',
          artist: 'のん',
          lyricist: 'ノマアキコ',
          composer: 'ユウ',
          lyric: true,
        },
        {
          id: 'moyamoya',
          name: 'モヤモヤ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'akogarete',
          name: '憧れて',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'aoi-shakunetsu',
          name: '苍い灼熱',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'namida-no-aji-nigai-aji',
          name: '涙の味、苦い味',
          artist: 'のん',
          lyricist: 'ノマアキコ',
          composer: 'ユウ',
          lyric: true,
        },
      ],
    },
    {
      id: 'super-heroes',
      date: '2018',
      name: 'スーパーヒーローズ',
      cover: ['super-heroes-1', 'super-heroes-2', 'super-heroes-3'],
      trackList: [
        {
          id: 'hen-nano',
          name: 'へーんなのっ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'saa-ikou',
          name: 'さあいこう',
          artist: 'のん',
          lyricist: '真島昌利',
          composer: '真島昌利',
          lyric: true,
        },
        {
          id: 'shojiki-mono-wa-yuku',
          name: '正直者はゆく',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'aru-koto-nai-koto',
          name: 'あることないこと',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'run',
          name: 'RUN!!!',
          artist: 'のん',
          lyricist: 'Sachiko M',
          composer: 'Sachiko M',
          lyric: true,
        },
        {
          id: 'sketchbook',
          name: 'スケッチブック',
          artist: 'のん',
          lyricist: '尾崎亜美',
          composer: '尾崎亜美',
          lyric: true,
        },
        {
          id: 'my-day',
          name: 'My Day',
          artist: 'のん',
          lyricist: '佐藤美恵子',
          composer: '高橋幸宏',
          lyric: true,
        },
        {
          id: 'sutoreto-kaido',
          name: 'ストレート街道',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'watashi-no-daisuki-na-uta',
          name: '私の大好きな歌',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'watashi-wa-baby',
          name: 'わたしはベイベー',
          artist: 'のん',
          lyricist: '矢野顕子',
          composer: '矢野顕子',
          lyric: true,
        },
        {
          id: 'superhero-ni-naritai',
          name: 'スーパーヒーローになりたい',
          artist: 'のん',
          lyricist: '高野寛',
          composer: '高野寛',
          lyric: true,
        },
        {
          id: 'oyasumi',
          name: 'おやすみ',
          artist: 'のん',
          lyricist: '大友良英 & Sachiko M',
          composer: '大友良英 & Sachiko M',
          lyric: true,
        },
      ],
    },
    {
      id: 'run',
      date: '2018',
      name: 'RUN!!!',
      cover: ['run'],
      trackList: [
        {
          id: 'run',
          name: 'RUN!!!',
          artist: 'のん',
          lyricist: 'Sachiko M',
          composer: 'Sachiko M',
          lyric: true,
        },
        {
          id: 'sutoreto-kaido',
          name: 'ストレート街道',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
      ],
    },
    {
      id: 'superhero-ni-naritai',
      date: '2017',
      name: 'スーパーヒーローになりたい',
      cover: ['superhero-ni-naritai'],
      trackList: [
        {
          id: 'superhero-ni-naritai',
          name: 'スーパーヒーローになりたい',
          artist: 'のん',
          lyricist: '高野寛',
          composer: '高野寛',
          lyric: true,
        },
        {
          id: 'hen-nano',
          name: 'へーんなのっ',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
        {
          id: 'i-like-you',
          name: 'I LIKE YOU',
          artist: 'のん',
          lyricist: '忌野清志郎',
          composer: '忌野清志郎',
          lyric: true,
        },
        {
          id: 'taimumashin-ni-onegai',
          name: 'タイムマシンにお願い (WORLD HAPPINESS 2017 MIX)',
          artist: 'のん',
          lyricist: '松山猛',
          composer: '加藤和彦',
          lyric: true,
        },
      ],
    },
    {
      id: 'ohirome-pakku',
      date: '2017',
      name: 'オヒロメ・パック',
      cover: ['ohirome-pakku-1', 'ohirome-pakku-2'],
      trackList: [
        {
          id: 'taimumashin-ni-onegai',
          name: 'タイムマシンにお願い',
          artist: 'のん',
          lyricist: '松山猛',
          composer: '加藤和彦',
          lyric: true,
        },
        {
          id: 'i-like-you',
          name: 'I LIKE YOU',
          artist: 'のん',
          lyricist: '忌野清志郎',
          composer: '忌野清志郎',
          lyric: true,
        },
      ],
    },
  ],
  single: [
    {
      id: 'gwgw',
      date: '2025',
      name: 'GwGw',
      cover: ['gwgw'],
      trackList: [
        {
          id: 'gwgw',
          name: 'GwGw',
          artist: 'のん',
          lyricist: '谷口鮪, POKEMON MUSIC COLLECTIVE',
          composer: '谷口鮪',
          lyric: true,
        },
      ],
    },
    {
      id: 'christmas-song',
      date: '2019',
      name: 'クリスマスソング',
      cover: ['christmas-song'],
      trackList: [
        {
          id: 'christmas-song',
          name: 'クリスマスソング',
          artist: 'のん',
          lyricist: 'のん',
          composer: 'のん',
          lyric: true,
        },
      ],
    },
  ],
  appearsOn: [
    {
      id: 'ghibli-wo-utau-sono',
      date: '2026',
      name: 'スタジオジブリトリビュートアルバム「ジブリをうたう その2」',
      cover: ['ghibli-wo-utau-sono'],
      trackList: [
        {
          id: 'country-road',
          name: 'カントリー・ロード',
          artist: 'のん / SOIL & "PIMP" SESSIONS',
          lyricist: 'John Denver / Taffy Nivert / Bill Danoff / 鈴木麻実子 /（宮崎駿）',
          composer: 'John Denver / Taffy Nivert / Bill Danoff',
          lyric: true,
        },
      ],
    },
    {
      id: 'no-worries',
      date: '2025',
      name: 'no worries',
      cover: ['no-worries'],
      trackList: [
        {
          id: 'no-worries',
          name: 'no worries (feat. のん)',
          artist: 'ROCKETMAN / のん',
          lyricist: 'ふかわりょう',
          composer: 'ふかわりょう',
          lyric: true,
        },
      ],
    },
    {
      id: 'parallel-ribbons',
      date: '2022',
      name: 'Parallel Ribbons',
      cover: ['parallel-ribbons'],
      trackList: [
        {
          id: 'ribbon-kumikyoku',
          name: 'Ribbon組曲 (feat. のん)',
          artist: 'ひぐちけい',
          lyricist: null,
          composer: 'ひぐちけい',
          lyric: false,
        },
        {
          id: 'ribbon',
          name: 'ribbon (feat. のん)',
          artist: 'ひぐちけい',
          lyricist: 'のん',
          composer: 'ひぐちけい',
          lyric: true,
        },
        {
          id: 'azayaka-na-hibi',
          name: '鮮やかな日々 (feat. のん)',
          artist: 'ひぐちけい',
          lyricist: 'のん',
          composer: 'ひぐちけい',
          lyric: true,
        },
      ],
    },
    {
      id: 'maruyamacho-romantic-dori',
      date: '2018',
      name: '円山町ロマンチック通り',
      cover: ['maruyamacho-romantic-dori'],
      trackList: [
        {
          id: 'cinderella',
          name: 'シンデレラ (feat. のん,奇妙礼太郎)',
          artist: 'ライトガールズ(やついいちろう×Sundayカミデ)',
          lyricist: 'Sundayカミデ',
          composer: 'Sundayカミデ',
          lyric: true,
        },
      ],
    },
  ],
  OST: [
    {
      id: 'hoshikuzu-no-machi-original-soundtrack',
      date: '2020',
      name: '映画「星屑の町」オリジナル・サウンドトラック',
      cover: ['hoshikuzu-no-machi-original-soundtrack'],
      trackList: [
        {
          id: 'shabon-dama',
          name: 'シャボン玉',
          artist: 'のん / ハローナイツ',
          lyricist: '松浦有希',
          composer: '宮原慶太',
          lyric: true,
        },
        {
          id: 'miss-you',
          name: 'MISS YOU',
          artist: '山田修とハローナイツ / のん',
          lyricist: '苦楽健人',
          composer: '景家淳',
          lyric: true,
        },
      ],
    },
    {
      id: 'amachan-uta-no-arubamu',
      date: '2013',
      name: 'あまちゃん 歌のアルバム',
      cover: ['amachan-uta-no-arubamu'],
      trackList: [
        {
          id: 'shiosai-no-memori',
          name: '潮騒のメモリー (お座敷列車バージョン)',
          artist: '橋本愛 / 能年玲奈',
          lyricist: '宮藤官九郎',
          composer: '大友良英、Sachiko M',
          lyric: true,
        },
      ],
    },
  ],
}

export interface TrackInfo extends Track {
  album: Album['name']
  date: Album['date']
  cover: Album['cover']
  category: keyof SongData
}

export function getTrackInfoById(id: string): TrackInfo | null {
  for (const [category, albums] of Object.entries(data) as Array<[keyof SongData, Album[]]>) {
    for (const album of albums) {
      const track = album.trackList.find(track => track.id === id)

      if (track) {
        return {
          ...track,
          album: album.name,
          date: album.date,
          cover: album.cover,
          category,
        }
      }
    }
  }

  return null
}
