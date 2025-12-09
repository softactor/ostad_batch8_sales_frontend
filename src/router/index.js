import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Post from "@/views/Post.vue";
import DraftComponent from "@/components/DraftComponent.vue";
import { createRouter, createWebHistory  } from "vue-router";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";

import { useAuthStore } from "@/stores/auth";
import Dashboard from "@/views/admin/Dashboard.vue";
import Product from "@/views/admin/Product.vue";




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
    {
        path: '/registration',
        name: 'Registration',
        component: Register
    },   
    {
        path: '/login',
        name: 'Login',
        component: Login
    },   
    {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requireAuth: true
        }
    },   
    {
        path: '/admin/product',
        name: 'Product',
        component: Product,
        meta: {
            requireAuth: true
        }
    },   

]

const router = createRouter({
        history: createWebHistory(),
        routes
    })


    router.beforeEach((to, from, next) => {

        const authStore = useAuthStore()

        if(to.meta.requireAuth && !authStore.isAuthenticated){
            next('/login')
        }else{
            next()
        }

    })


export default router
