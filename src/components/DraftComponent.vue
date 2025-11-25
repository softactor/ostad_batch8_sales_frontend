<template>
    
    <section class="demo">

        <h2>Draft Editor (Lifecycle Hooks)</h2>

        <div v-if="loading">Loading template</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>

            <label for="title">
                Title
                <input v-model="title" placeholder="type your title">
            </label>
            
            <label for="content">
                Content
                <textarea v-model="content" placeholder="type your content"></textarea>
            </label>

        </div>

        <div class="meta">
            <small>
                Last saved: {{ lastSaved ? new Date(lastSaved).toLocaleTimeString() : 'Never'  }}
            </small>
        </div>

        <button @click="manualDraft"> Manual Draft </button>
        <button @click="clearDraft"> Clear Draft </button>

    </section>

</template>

<script setup>

import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

const loading = ref('')
const error = ref('')
const title = ref('')
const content = ref('')
const lastSaved = ref('')
let autoSaved = ''


function draft(){

    const blog = {
        title:title.value,
        content:content.value,
        timestamp: Date.now()
    }

    // set data to local storage
    localStorage.setItem('blog.draft', JSON.stringify(blog))
    lastSaved.value = blog.timestamp

    // title.value = ''
    // content.value = ''

}

function manualDraft()
{
    draft()
}


function clearDraft()
{

    localStorage.removeItem('blog.draft')
    lastSaved.value = ''  
    title.value = ''
    content.value = '' 

}


onMounted( () => {

    // // get data to local storage
    const rowData = localStorage.getItem('blog.draft')

    if(rowData){
        const parsedData  = JSON.parse(rowData)

        title.value = parsedData.title
        content.value = parsedData.content
        lastSaved.value = parsedData.timestamp



    }


    autoSaved = setInterval(() => {
        draft()
    }, 5000 )



    console.log('[onMounted] - hook is calling ....')
})


onBeforeMount( () => {
    console.log('[onBeforeMount] - hook is calling ....')
})


onBeforeUnmount( () => {
    console.log('[onBeforeUnmount] - hook is calling ....')

    if(autoSaved !== null){
        clearInterval(autoSaved)
        autoSaved = null
    }

})

onUnmounted(() => {
    console.log('[onUnmounted] - hook is calling ....')
})





    
</script>