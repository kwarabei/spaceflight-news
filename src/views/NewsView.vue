<template>
  <div class="previewlist_wrapper">
    <ArticlePreview v-for="singleNew in news" :key="singleNew.id" :id="singleNew.id" :title="singleNew.title"
      :summary="singleNew.summary" :image-url="singleNew.imageUrl" :url="singleNew.url" :news-site="singleNew.newsSite">
    </ArticlePreview>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArticlePreview } from '@/components'
import type { INew } from '@/types';

const url = "https://api.spaceflightnewsapi.net/v3/articles?_limit=20&_start=0"

const news = ref<INew[]>([])

fetch(url).then(response => response.json()).then(newsRecords => {
  const typedNews = newsRecords as INew[]
  typedNews.forEach(singleNew => news.value.push(singleNew))

  console.log(news)
})
</script>

<style scoped>
.previewlist_wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>