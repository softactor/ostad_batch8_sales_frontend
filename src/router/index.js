import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Post from "@/views/Post.vue";
import DraftComponent from "@/components/DraftComponent.vue";
import { createRouter, createWebHistory  } from "vue-router";




const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },   
    {
        path: '/post',
        name: 'Post',
        component: Post
    },   
    {
        path: '/lifecycle',
        name: 'Lifecycle',
        component: DraftComponent
    },   

]

const router = createRouter({
        history: createWebHistory(),
        routes
    })


export default router
