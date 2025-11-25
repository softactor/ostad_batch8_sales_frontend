import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify';

import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right'
})
app.use(router)
app.mount('#app')
