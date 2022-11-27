<template>
    <div class="article">
        <img class="article_img" :src="singleNew?.imageUrl" alt="Article preview">
        <div class="article_text">
            <h2 class="article_title">{{ singleNew?.title }}</h2>
            <p class="article_summary">{{ singleNew?.summary }}</p>
            <p class="article_publsihed">Published at: {{ publishingDate }}</p>
            <a class="article_url" target="_blank" :href="singleNew?.url">Source link</a>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleNew } from '@/services/news.service';

interface ISingleNew {
    id: number;
    publishedAt: string;
    title: string;
    summary: string;
    imageUrl: string;
    url: string;
    newsSite: string;
}

const singleNew = ref<ISingleNew>()
const publishingDate = computed((): string => {
    if (!singleNew.value) {
        return ''
    }

    const date = new Date(singleNew.value.publishedAt)
    const readable = new Intl.DateTimeFormat('en-GB').format(date);

    return readable
})

const route = useRoute()

onMounted(async () => {
    const id = route.params.id
    singleNew.value = await getSingleNew(id as string)


})  
</script>
  
<style scoped>
.article {
    display: flex;
    margin: 1rem;
    padding: 0.5rem;

    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 2px black;
}

.article_img {
    max-width: 50vw;
    height: auto;
}

@media (orientation: portrait) {
    .article {
        flex-direction: column;
    }

    .article_img {
        max-width: 100%;
    }
}

.article_text {
    display: grid;
    padding: 1rem;
}

.article_title {
    font-weight: bold;
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.1rem;
}

.article_summary {
    text-indent: 2rem;
    text-align: justify;
}

.article_url {
    align-self: end;
    line-height: 2rem;
    margin-left: 4rem;
    margin-right: 4rem;

    text-align: center;
    background-color: rgb(190, 190, 190);
    border-radius: 20px;
    border: 1px solid rgb(190, 190, 190);
}

.article_url:hover {
    box-shadow: 0 0 5px black;
}
</style>