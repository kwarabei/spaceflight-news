<template>
    <div @click="openArticle(props.id)" class="preview_wrapper">
        <img class="preview_img" :src="props.imageUrl" alt="Article preview">
        <div class="preview_text">
            <h2 class="preview_title">{{ props.title }}</h2>
            <p class="preview_summary">{{ props.summary }}</p>
            <a target="_blank" :href="props.url" class="preview_url">Source link</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'

// * interface or type cannot be imported due to `https://github.com/vuejs/core/issues/4294`
interface INewProps {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
    url: string;
    newsSite: string;
}

const props = defineProps<INewProps>()

const openArticle = (id: number) => {
    router.push({ path: '/' + id.toString() })
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

.preview_url {
    align-self: end;
    line-height: 2rem;
    margin-left: 4rem;
    margin-right: 4rem;
    margin-bottom: 1rem;

    text-align: center;
    background-color: rgb(190, 190, 190);
    border-radius: 20px;
    border: 1px solid rgb(190, 190, 190);
}

.preview_url:hover {
    box-shadow: 0 0 5px black;
}
</style>