<template>

    <h3>Posts from API</h3>

    <article v-for="post in posts" :key="post.id">

        <h4>{{ post.title }}</h4>
        <p>
        {{ post.body }}
        </p>


    </article>

</template>

<script setup>

import { ref, onMounted } from 'vue';

const posts = ref([])


onMounted( async () =>{

  const apiData = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=2')

  posts.value = await apiData.json() 
})

</script>

<style scoped>

</style>