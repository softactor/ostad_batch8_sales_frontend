<template>
    <div class="mt-4">

        <div class="container">

            <div class="row">

                <div class="col-md-6">

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Regstration</h5>
                            <form @submit.prevent="handleSubmission">

                                <div class="mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input v-model="name" class="form-control">
                                    <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" v-model="email" class="form-control">
                                    <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
                                </div>

                                <div class="mb-3">
                                    <label for="contactNumber" class="form-label">Contact Number</label>
                                    <input v-model="contactNumber" class="form-control">
                                    <small class="text-danger" v-if="errors.contactNumber">{{ errors.contactNumber }}</small>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" v-model="password" class="form-control">
                                    <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                                    <input type="password" v-model="confirmPassword" class="form-control">
                                    <small class="text-danger" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</small>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="image" class="form-label">Image</label>
                                    <input type="file" class="form-control" @change="fileUpload">
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>




                </div>

            </div>

        </div>



    </div>
</template>

<script setup>

import { ref, reactive } from 'vue';


const name = ref('')
const email = ref('')
const contactNumber = ref('')
const password = ref('')
const confirmPassword = ref('')
const userImage = ref('')

const errors = reactive({})


function handleSubmission()
{

    if(!validate()){
        alert('error')
    }
    
    //next line will be executed


}


function validate(){

    Object.keys(errors).forEach( key => delete errors[key])

    if(!name.value.trim()) errors.name = "Name is required"
    if(!email.value.trim()) errors.email = "Email is required"
    if(!contactNumber.value.trim()) errors.contactNumber = "Contact is required"
    if(!password.value) errors.password = "Password is required"
    if(!confirmPassword.value) errors.confirmPassword = "Confirm Password is required"
    
    if(password.value !== confirmPassword.value) errors.password = "Password did not match"


    return Object.keys(errors).length === 0
}


</script>