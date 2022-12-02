<template>
  <div class="articles">
    <input class="articles_search" @input="debounceSearch" type="text" placeholder="Search articles...">
    <div v-show="news.length === 0" class="articles_loader">Loading...</div>
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
const searchQuery = ref<string | null>(null)
let debounceId: number | null = null

const fetchMoreArticles = async () => {
  start += 20
  let articles: INew[] = []

  try {
    articles = await getNews(limit, start, searchQuery.value)
  } catch (error) {
    console.error(error)
  }


  news.value.push(...articles)
}

const debounceSearch = (event: any) => {
  searchQuery.value = ''

  if (debounceId) {
    clearTimeout(debounceId)
  }

  debounceId = setTimeout(async () => {
    searchQuery.value = event.target.value

    try {
      news.value = await getNews(limit, start, searchQuery.value)
    } catch (error) {
      console.error(error)
    }

  }, 600)
}

onMounted(async () => {
  try {
    news.value = await getNews(limit, start, null)
  } catch (error) {
    console.error(error)
  }

})
</script>

<style scoped>
.previewlist_wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.articles_search {
  display: block;
  margin: 1rem auto;

  border: 1px solid black;
  height: 2rem;
  width: 15rem;
  padding-left: 1rem;
}

.articles_loader {
  width: 20rem;
  margin: 1rem auto;

  text-align: center;
  font-size: 2rem;
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