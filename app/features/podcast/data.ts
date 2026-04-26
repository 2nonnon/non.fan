export interface Podcast {
  id: string
  title: string
  description: string
  date: string
  cover: string
}

export const podcasts: Podcast[] = [
  {
    id: '65e986c6-c177-4fb0-974e-b43100900132',
    title: '【のん】番組リスナーと交流！',
    description: '俳優/アーティスト のん が、『J-WAVE TOPPAN INNOVATION WORLD ERA』のリスナーから届いた番組宛メッセージを読み上げます。',
    date: 'Apr 19, 2026, 8:54 PM',
    cover: 'https://www.omnycontent.com/d/clips/c4540246-e16d-4c70-b990-ab7d0124d4de/28ee5013-e17d-4251-9149-ab8e00278e6f/c3d84cb0-0200-4cc0-b067-b43100900132/image.jpg?t=1776737515&in_playlist=5f2b8eee-9424-4849-a2bb-ab990060e665&size=small',
  },
]

export function getPodcastInfoById(id: string): Podcast | null {
  return podcasts.find(podcast => podcast.id === id) ?? null
}
