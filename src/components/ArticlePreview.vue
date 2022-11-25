<template>
    <div>
        <img :src="props.imageUrl" alt="Article preview">
        <h2>{{ props.title }}</h2>
        <p>{{ props.summary }}</p>
        <p>Link: {{ props.url }}</p>
    </div>
</template>

<script setup lang="ts">
// * interface or type cannot be imported due to `https://github.com/vuejs/core/issues/4294`
interface INewProps {
    title: string;
    summary: string;
    imageUrl: string;
    url: string;
    newsSite: string;
}

const props = defineProps<INewProps>()
</script>

<style scoped>

</style>