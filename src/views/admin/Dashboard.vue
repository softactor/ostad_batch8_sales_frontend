<template>
    <div class="container-fluid">
        <div class="row">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">My Store</a>
                    <button class="navbar-toggler" type="button">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active">Dashboard</a>
                            </li>
                            <li class="nav-item">
                                <router-link 
                                to="/admin/product"
                                class="nav-link">Products
                                </router-link>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <span> {{ user.name }} </span>
                            <button type="button" @click="handleLogout" class="btn btn-outline-danger">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Welcome to Dashboard</h5>
                    </div>
                    <div class="card-body">
                        <p>This is your dashboard. You can manage products from here.</p>
                        <a href="#" class="btn btn-primary">Go to Products</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { useAuthStore } from '@/stores/auth';
    import router from '@/router';

    const authStore = useAuthStore()
    const user = authStore.user

    const handleLogout = () => {

        authStore.logout()

    }

    
</script>