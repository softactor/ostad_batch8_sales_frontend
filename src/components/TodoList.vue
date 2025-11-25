<template>

    <h1>Todo List</h1>


    <form @submit.prevent="add">

        <input v-model="newTask">
        <button>Add</button>

    </form>

    <!-- show all tasks -->
    <ul v-if="vueTasks.length > 0">
        <TodoItem 
             v-for="vueTask in vueTasks"
            :key="vueTask.id"
            :task="vueTask"
            @doneEvent = "done"
            @removeEvent = "remove"
        />
    </ul>

</template>

<script setup>

import Tasks from '@/data/task';
import { ref } from 'vue';
import TodoItem from './TodoItem.vue';

const vueTasks = ref(Tasks)
const newTask = ref('')

function add()
{
    const taskName = newTask.value && newTask.value.trim() 
    
    vueTasks.value.push({
        id: Date.now(),
        text: taskName,
        done: false
    })

    newTask.value = ''

}

function done(task)
{
    task.done = !task.done
}

function remove(task)
{
    vueTasks.value = vueTasks.value.filter(t => t.id !== task.id)
}

</script>

<style></style>