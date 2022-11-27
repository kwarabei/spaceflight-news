<template>
  <div class="previewlist_wrapper">
    <ArticlePreview v-for="singleNew in news" :key="singleNew.id" :id="singleNew.id" :title="singleNew.title"
      :summary="singleNew.summary" :image-url="singleNew.imageUrl" :url="singleNew.url" :news-site="singleNew.newsSite">
    </ArticlePreview>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArticlePreview } from '@/components'
import { getNews } from '@/services/news.service';
import type { INew } from '@/types';

let limit = 20
let start = 0

const news = ref<INew[]>([])

onMounted(async () => {
  news.value = await getNews(limit, start)
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