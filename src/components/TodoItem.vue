<template>

    <li>
        <input type="checkbox" :checked="task.done"> {{ task.text }}

        <button type="button" @click="$emit('doneEvent', task)">Done</button>
        <button type="button" @click="$emit('removeEvent', task)">Remove</button>
    </li>

</template>

<script setup>

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})

</script>

