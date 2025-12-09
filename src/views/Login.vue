<template>
    
    <div class="d-flex justify-content-center align-items-center">

        <div style="width: 650px;">
            <h2>Login</h2>

            <div class="card">

                <div class="card-body">

                    <form @submit.prevent="handleLogin">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input 
                            type="email" 
                            class="form-control" 
                            v-model="email">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>

                            <input 
                            type="password" 
                            class="form-control" 
                            v-model="password">


                        </div>

                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>

            </div>


        </div>

    </div>
    
    

</template>

<script setup>

import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const auth = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
    const loginData = {
        email:email.value,
        password: password.value
    }

    await auth.login(loginData)
}


    
</script>