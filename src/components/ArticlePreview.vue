<template>
    <div @click="openArticle(props.id)" class="preview_wrapper">
        <img class="preview_img" :src="props.imageUrl" alt="Article preview">
        <div class="preview_text">
            <h2 class="preview_title">{{ props.title }}</h2>
            <p class="preview_summary">{{ props.summary }}</p>
            <div class="preview_links">
                <a @click.stop target="_blank" :href="props.url" class="preview_url">Source link</a>
                <button v-if="!isFav" @click.stop="toggleFav(props.id)" class="preview_fav">☆</button>
                <button v-else @click.stop="toggleFav(props.id)" class="preview_fav">★</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//  ★ ☆
import { ref } from 'vue'
import router from '@/router'
import { useFavStore } from '@/stores/fav.store'

const favStore = useFavStore()

// * interface or type cannot be imported due to `https://github.com/vuejs/core/issues/4294`
interface INewProps {
    id: string;
    title: string;
    summary: string;
    imageUrl: string;
    url: string;
    newsSite: string;
}

const props = defineProps<INewProps>()

const isFav = ref<boolean>(false)
isFav.value = favStore.isFav(props.id)

const toggleFav = (id: string) => {
    if (id) {
        favStore.toggleId(id)
        isFav.value = !isFav.value
    }
}

const openArticle = (id: string) => {
    router.push({ path: '/' + id })
}
</script>

<style scoped>
.preview_wrapper {
    margin-bottom: 3vh;
    padding: 0.4em;
    max-width: 365px;
    height: auto;

    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 2px black;
}

.preview_wrapper:hover {
    background-color: rgb(190, 190, 190);
    cursor: pointer;
}

.preview_wrapper:hover .preview_url {
    border: 1px solid black;
    background-color: white;
}

.preview_img {
    width: 100%;
    height: 45%;

    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.preview_text {
    display: grid;
    height: 55%;
}

.preview_title {
    font-weight: bold;
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.1rem;
}

.preview_summary {
    text-indent: 2rem;
    text-align: justify;
}

.preview_links {
    align-self: end;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    margin-bottom: 0.5rem;
}

.preview_fav {
    font-size: 2rem;
}

.preview_fav:hover {
    font-weight: bold;
}

.preview_url {
    line-height: 1.8rem;
    padding-left: 1rem;
    padding-right: 1rem;

    text-align: center;
    background-color: rgb(190, 190, 190);
    border-radius: 20px;
    border: 1px solid rgb(190, 190, 190);
}

.preview_url:hover {
    box-shadow: 0 0 5px black;
}
</style>