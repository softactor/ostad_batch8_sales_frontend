

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">

                <h2>Product List</h2>

                <div v-if="products.length > 0">

                    <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">SKU</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock Quantity</th>
                            <th scope="col">Reorder Level</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="product.id">
                            <td scope="row">{{ ++index }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category_id }}</td>
                            <td>{{ product.sku }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.stock_quantity }}</td>
                            <td>{{ product.reorder_level }}</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-primary">Edit</button> &nbsp;
                                <button type="button" class="btn btn-sm btn-danger" @click="confirmDelete(product)" >Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                </div>

                

            </div>
        </div>
    </div>
</template>


<script setup>

import http from '@/http/http';
import { onMounted, ref } from 'vue';
import { toast } from "vue3-toastify";


const products = ref([])


const fetchProducts =  async () => {

    const productData = await http.get('/products') 

    products.value =  productData?.data?.data?.data ?? []
}


const confirmDelete = async  (product) => {

    if(confirm(`Delete ${product.name} ?`))
    {
        try{

            const response = await http.delete(`/products/${product.id}`)

            console.log(response)

            toast.success('Product Deleted')
            fetchProducts();


        }catch(error){
            toast.error(error);
        }

    }

}


onMounted(() => {
    fetchProducts()
})



</script>