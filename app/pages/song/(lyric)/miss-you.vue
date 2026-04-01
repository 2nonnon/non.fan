<script setup lang="ts">
import { getTrackInfoById } from '@/features/song/data'

const track = getTrackInfoById('miss-you')

if (!track)
  throw createError({ statusCode: 404 })

useSeoMeta({
  title: `${track.name} - ${track.artist}`,
  description: `${track.name} 是能年玲奈的一首歌曲，由${track.lyricist}作词，${track.composer}作曲。`,
})
</script>

<template>
  <main class="relative px-6">
    <div class="w-full max-w-3xl mx-auto py-8 md:py-12">
      <h1 class="text-2xl font-bold mb-1">
        {{ track.name }} - {{ track.artist }}
      </h1>
      <p class="text-sm opacity-90 mb-6">
        <span v-if="track.lyricist">
          词: {{ track.lyricist }}
        </span>
        <span>
          曲: {{ track.composer }}
        </span>
      </p>

      <div class="[&>p]:odd:mb-1 [&>p]:even:mb-4 [&>p]:even:opacity-80 [&>p]:even:text-sm">
        <p><ruby>雨<rp>(</rp><rt>あめ</rt><rp>)</rp></ruby>の<ruby>街<rp>(</rp><rt>まち</rt><rp>)</rp></ruby>に&emsp;<ruby>滲<rp>(</rp><rt>にじ</rt><rp>)</rp></ruby>んで<ruby>行<rp>(</rp><rt>ゆ</rt><rp>)</rp></ruby>く</p>
        <p>雨中的街道，一切渐渐变得模糊</p>

        <p>テールランプ<ruby>眺<rp>(</rp><rt>なが</rt><rp>)</rp></ruby>めて&emsp;<ruby>溜息<rp>(</rp><rt>ためいき</rt><rp>)</rp></ruby>ついた</p>
        <p>我望着汽车尾灯，深深地叹了口气</p>

        <p><ruby>窓<rp>(</rp><rt>まど</rt><rp>)</rp></ruby>ガラスを&emsp;<ruby>曇<rp>(</rp><rt>くも</rt><rp>)</rp></ruby>らすほど</p>
        <p>曾经我们堆叠起的爱意</p>

        <p><ruby>愛<rp>(</rp><rt>あい</rt><rp>)</rp></ruby>を<ruby>重<rp>(</rp><rt>かさ</rt><rp>)</rp></ruby>ねたばかり</p>
        <p>浓烈到可以让窗户都蒙上雾气</p>

        <p>それなのに&emsp;<ruby>心<rp>(</rp><rt>こころ</rt><rp>)</rp></ruby>が<ruby>動<rp>(</rp><rt>うご</rt><rp>)</rp></ruby>かない</p>
        <p>可现在我的心却再难跃动</p>

        <p><ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>い<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>に&emsp;あなたが<ruby>居<rp>(</rp><rt>い</rt><rp>)</rp></ruby>るから</p>
        <p>因为你已只存在于我的回忆中</p>

        <p><ruby>独<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>りでくらしてから</p>
        <p>独自生活以来</p>

        <p><ruby>二<rp>(</rp><rt>ふた</rt><rp>)</rp></ruby>つの<ruby>季節<rp>(</rp><rt>きせつ</rt><rp>)</rp></ruby>が&emsp;<ruby>過<rp>(</rp><rt>す</rt><rp>)</rp></ruby>ぎた</p>
        <p>已经走过了两个季节</p>

        <p><ruby>片付<rp>(</rp><rt>かたづ</rt><rp>)</rp></ruby>ける<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>のないテーブルが</p>
        <p>那个无人收拾的餐桌</p>

        <p>この<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>にやけに<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きい&emsp;I MISS YOU</p>
        <p>在房间里显得格外惹眼，我想你</p>

        <p><ruby>夜更<rp>(</rp><rt>よふ</rt><rp>)</rp></ruby>けのベル&emsp;<ruby>遠<rp>(</rp><rt>とお</rt><rp>)</rp></ruby>い<ruby>記憶<rp>(</rp><rt>きおく</rt><rp>)</rp></ruby></p>
        <p>深夜响起的铃声，唤醒了遥远的记忆</p>

        <p>ベッドから<ruby>跳<rp>(</rp><rt>は</rt><rp>)</rp></ruby>ね<ruby>起<rp>(</rp><rt>お</rt><rp>)</rp></ruby>きて&emsp;<ruby>受話器<rp>(</rp><rt>じゅわき</rt><rp>)</rp></ruby>をとった</p>
        <p>我从床上惊起，抓起电话听筒</p>

        <p><ruby>語呂<rp>(</rp><rt>ごろ</rt><rp>)</rp></ruby><ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>わせて&emsp;はしゃいでいた</p>
        <p>曾经用谐音嬉闹着定下的</p>

        <p>お<ruby>気<rp>(</rp><rt>き</rt><rp>)</rp></ruby>に<ruby>入<rp>(</rp><rt>い</rt><rp>)</rp></ruby>りの<ruby>番号<rp>(</rp><rt>ばんごう</rt><rp>)</rp></ruby>を</p>
        <p>那个我们最喜欢的号码</p>

        <p><ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>えたのは&emsp;<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>の<ruby>勝手<rp>(</rp><rt>かって</rt><rp>)</rp></ruby>なのに</p>
        <p>明明我已经擅自换掉了</p>

        <p>あなたの<ruby>電話<rp>(</rp><rt>でんわ</rt><rp>)</rp></ruby>を&emsp;まだ<ruby>期待<rp>(</rp><rt>きたい</rt><rp>)</rp></ruby>してる</p>
        <p>却还在期待着你的电话</p>

        <p><ruby>最初<rp>(</rp><rt>さいしょ</rt><rp>)</rp></ruby>の<ruby>誕生日<rp>(</rp><rt>たんじょうび</rt><rp>)</rp></ruby>に</p>
        <p>在我为你庆祝的第一个生日</p>

        <p>あわてて&emsp;<ruby>花瓶<rp>(</rp><rt>かびん</rt><rp>)</rp></ruby>の<ruby>薔薇<rp>(</rp><rt>ばら</rt><rp>)</rp></ruby>に</p>
        <p>我慌忙地给花瓶里的玫瑰</p>

        <p>ブランドのリボンをつけ&emsp;「おめでとう」</p>
        <p>系上了名牌丝带，说“祝你生日快乐”</p>

        <p><ruby>照<rp>(</rp><rt>て</rt><rp>)</rp></ruby>れながら&emsp;<ruby>笑<rp>(</rp><rt>わら</rt><rp>)</rp></ruby>ったあなた&emsp;I MISS YOU</p>
        <p>那时害羞地笑着的你，我想你</p>

        <p>もしも&emsp;<ruby>一<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>つの<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>い<ruby>叶<rp>(</rp><rt>かな</rt><rp>)</rp></ruby>うならば</p>
        <p>如果能实现一个愿望的话</p>

        <p>それが<ruby>一生<rp>(</rp><rt>いっしょう</rt><rp>)</rp></ruby>に&emsp;<ruby>一度<rp>(</rp><rt>いちど</rt><rp>)</rp></ruby>でも</p>
        <p>哪怕一生中只有一次</p>

        <p><ruby>何<rp>(</rp><rt>なに</rt><rp>)</rp></ruby>をためらう&emsp;ことなく&emsp;<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>すぐに</p>
        <p>我也不会有任何犹豫，就在现在</p>

        <p><ruby>会<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>いたい&emsp;<ruby>抱<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>いたい&emsp;もう<ruby>離<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>さない</p>
        <p>我想见你，想拥抱你，再也不想和你分开</p>

        <p>あなたのいない<ruby>夜<rp>(</rp><rt>よる</rt><rp>)</rp></ruby>が</p>
        <p>没有你的夜晚</p>

        <p>こんなに<ruby>辛<rp>(</rp><rt>つら</rt><rp>)</rp></ruby>い&emsp;なんて</p>
        <p>竟是如此地痛苦煎熬</p>

        <p><ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>い<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>は<ruby>幸<rp>(</rp><rt>しあわ</rt><rp>)</rp></ruby>せの&emsp;<ruby>抜<rp>(</rp><rt>ぬ</rt><rp>)</rp></ruby>け<ruby>殻<rp>(</rp><rt>がら</rt><rp>)</rp></ruby>さ</p>
        <p>回忆不过是幸福褪下的空壳</p>

        <p><ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>ならば&emsp;<ruby>本気<rp>(</rp><rt>ほんき</rt><rp>)</rp></ruby>で&emsp;<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>える</p>
        <p>直到现在，我才能真心实意地说出口</p>

        <p>あなたのいない<ruby>夜<rp>(</rp><rt>よる</rt><rp>)</rp></ruby>が</p>
        <p>没有你的夜晚</p>

        <p>こんなに<ruby>辛<rp>(</rp><rt>つら</rt><rp>)</rp></ruby>い&emsp;なんて</p>
        <p>竟是如此地痛苦煎熬</p>

        <p><ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>い<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>は<ruby>幸<rp>(</rp><rt>しあわ</rt><rp>)</rp></ruby>せの&emsp;<ruby>抜<rp>(</rp><rt>ぬ</rt><rp>)</rp></ruby>け<ruby>殻<rp>(</rp><rt>がら</rt><rp>)</rp></ruby>さ</p>
        <p>回忆不过是幸福褪下的空壳</p>

        <p>もう<ruby>一度<rp>(</rp><rt>いちど</rt><rp>)</rp></ruby>&emsp;やり<ruby>直<rp>(</rp><rt>なお</rt><rp>)</rp></ruby>したい&emsp;WHERE ARE YOU</p>
        <p>我想和你重新开始，你在哪里</p>
      </div>
    </div>
  </main>
</template>
