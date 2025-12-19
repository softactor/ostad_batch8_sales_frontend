

<template>

    <div class="container">
        <div class="row">
            <div class="col-md-12">

                <h2>Product List</h2>
                
                <button type="btn btn-sm" @click="showProductForm">Add Product</button>

                <div v-if="products.length > 0">

                    <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">SKU</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Stock Quantity</th>
                            <th scope="col">Reorder Level</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="product.id">
                            <td scope="row">{{ ++index }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category_name }}</td>
                            <td>{{ product.sku }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <img 
                                v-if="product.image_path" 
                                :src="`http://salesInventory.test/storage/${product.image_path}`" 
                                :alt="product.name" height="75">
                            </td>
                            <td>{{ product.stock_quantity }}</td>
                            <td>{{ product.reorder_level }}</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-primary" @click="editProduct(product)">Edit</button> &nbsp;
                                <button type="button" class="btn btn-sm btn-danger" @click="confirmDelete(product)" >Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                </div>

                

            </div>
        </div>
    </div>


    <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="manageProduct">
                    <div class="modal-header">
                        <h5 class="modal-title">Product Add</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeProductForm"></button>
                    </div>
                    <div class="modal-body">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input class="form-control" v-model="form.name">
                            </div>
                            <div class="mb-3">
                                <label for="category" class="form-label">Category</label>
                                <select v-model="form.category_id" class="form-control">
                                    <option value="">Select</option>
                                    <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <input class="form-control" v-model="form.description">
                            </div>
                            <div class="mb-3">
                                <label for="sku" class="form-label">SKU</label>
                                <input class="form-control" v-model="form.sku">
                            </div>
                            <div class="mb-3">
                                <label for="cost" class="form-label">Cost</label>
                                <input class="form-control" v-model="form.cost">
                            </div>
                            <div class="mb-3">
                                <label for="price" class="form-label">Price</label>
                                <input class="form-control" v-model="form.price">
                            </div>
                            <div class="mb-3">
                                <label for="stock_quantity" class="form-label">Stock Quantity</label>
                                <input class="form-control" v-model="form.stock_quantity">
                            </div>
                            <div class="mb-3">
                                <label for="reorder_level" class="form-label">Reorder Level</label>
                                <input class="form-control" v-model="form.reorder_level">
                            </div>
                            <div class="mb-3">
                                <label for="image" class="form-label">Image</label>
                                <input class="form-control" type="file" @change="handleImage">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeProductForm">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>



</template>


<script setup>

import http from '@/http/http';
import { onMounted, ref, reactive } from 'vue';
import { toast } from "vue3-toastify";


const editId = ref('')
const products = ref([])
const categories = ref([])
const showModal = ref(false)
const form = reactive({
    name:'',
    category_id:'',
    description:'',
    sku:'',
    cost:'',
    price:'',
    stock_quantity:'',
    reorder_level:'',
    image:null
})


const fetchProducts =  async () => {

    const productData = await http.get('/products') 

    products.value =  productData?.data?.data?.data ?? []
}

const fetchCategories =  async () => {

    const categoryData = await http.get('/categories') 

    categories.value =  categoryData?.data?.data ?? []
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

function emptyProductForm(){    
    editId.value = ''
    form.name = ''
    form.category_id = ''
    form.description = ''
    form.sku = ''
    form.cost = ''
    form.price = ''
    form.stock_quantity = ''
    form.reorder_level = ''
    form.image = ''
}


const editProduct = (product) => {

    editId.value = product.id

    form.name = product.name
    form.category_id = product.category_id
    form.description = product.description
    form.sku = product.name
    form.cost = product.cost
    form.price = product.price
    form.stock_quantity = product.stock_quantity
    form.reorder_level = product.reorder_level

    showModal.value = true;

}


const handleImage = (event) => {
    form.image = event.target.files[0]
}




const manageProduct = async () =>{

        if(editId.value){

            const response = await http.put(`/products/${editId.value}`, form)
            toast.success('Product has been successfully Update')

        }else{

            const response = await http.post('/products', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Product has been successfully created')

        }
        
        

        emptyProductForm()
        fetchProducts()
        showModal.value = false

}




function showProductForm()
{
    showModal.value = true
    emptyProductForm()
}

function closeProductForm()
{
    showModal.value = false
    emptyProductForm()
}


onMounted(() => {
    fetchProducts()
    fetchCategories()
})



</script>