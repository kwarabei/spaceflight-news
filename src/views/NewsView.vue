<template>
  <div class="articles">
    <div class="previewlist_wrapper">
      <ArticlePreview v-for="singleNew in news" :key="singleNew.id" :id="singleNew.id" :title="singleNew.title"
        :summary="singleNew.summary" :image-url="singleNew.imageUrl" :url="singleNew.url"
        :news-site="singleNew.newsSite">
      </ArticlePreview>

    </div>
    <button @click="fetchMoreArticles" class="more_btn">More articles...</button>
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

const fetchMoreArticles = async () => {
  start += 20
  const articles = await getNews(limit, start)

  news.value.push(...articles)
}

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

.more_btn {
  display: block;
  margin: 1em auto;
  width: 10em;
  height: 2em;

  text-align: center;
  font-size: 1.1em;

  background-color: rgb(190, 190, 190);
  border-radius: 5px;
}

.more_btn:hover {
  cursor: pointer;
  box-shadow: 2px 2px 4px black;
}
</style>