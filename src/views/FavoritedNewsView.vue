<template>
    <section>
        <div class="favArticles_empty_msg" v-if="favStore.getAmount === 0">No favorited articles</div>
        <article v-else class="favArticle" v-for="value in favArticles.entries()">
            <span class="favArticle_title">{{ value[1] }}</span>
            <span @click="handleUnfavArticle(value[0])" role="button" class="favArticle_btn">🗑</span>
        </article>
    </section>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useFavStore } from '@/stores/fav.store'

const favStore = useFavStore()

const favArticles = ref<Map<string, string>>(new Map<string, string>())

favArticles.value = favStore.getArticles

const handleUnfavArticle = (id: string) => {
    favStore.deleteById(id)
    favArticles.value.delete(id)
}
</script>
  
<style scoped>
.favArticles_empty_msg {
    margin: 2rem auto;
    width: 20rem;

    text-align: center;
    font-size: 1.3rem;
}

.favArticle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin: 0.5rem auto;
    width: 30rem;
}

.favArticle_title {
    font-size: 1.1rem;
}

.favArticle_btn {
    font-size: 2rem;
    color: red;
}

.favArticle_btn:hover {
    cursor: pointer;
    font-weight: bold;
}
</style>