<template>
    <div class="article">
        <img class="article_img" :src="singleNew?.imageUrl" alt="Article preview">
        <div class="article_text">
            <h2 class="article_title">{{ singleNew?.title }}</h2>
            <p class="article_summary">{{ singleNew?.summary }}</p>
            <p class="article_publsihed">Published at: {{ publishingDate }}</p>
            <div class="article_links">
                <a @click.stop target="_blank" :href="singleNew?.url" class="article_url">Source link</a>
                <button v-if="!isFav" @click.stop="toggleFav(singleNew?.id)" class="article_fav">☆</button>
                <button v-else @click.stop="toggleFav(singleNew?.id)" class="article_fav">★</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleNew } from '@/services/news.service';
import { useFavStore } from '@/stores/fav.store'

const favStore = useFavStore()

interface ISingleNew {
    id: string;
    publishedAt: string;
    title: string;
    summary: string;
    imageUrl: string;
    url: string;
    newsSite: string;
}

const isFav = ref<boolean>(false)



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

const toggleFav = (id: string | undefined) => {
    if (id) {
        favStore.toggleId(id)
        isFav.value = !isFav.value
    }
}

onMounted(async () => {
    const id = route.params.id
    singleNew.value = await getSingleNew(id as string)

    isFav.value = favStore.isFav(singleNew.value.id)
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
    padding: 1rem 1rem 0 1rem;
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

.article_links {
    align-self: end;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.article_fav {
    font-size: 3rem;
}

.article_fav:hover {
    font-weight: bold;
}

.article_url {
    line-height: 1.8rem;
    padding-left: 1rem;
    padding-right: 1rem;


    text-align: center;
    background-color: rgb(190, 190, 190);
    border-radius: 20px;
    border: 1px solid rgb(190, 190, 190);
}

.article_url:hover {
    box-shadow: 0 0 5px black;
}
</style>