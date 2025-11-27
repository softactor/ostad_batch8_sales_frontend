import { defineStore } from "pinia";
import http from "@/http/http";
import { toast } from "vue3-toastify";



export const useAuthStore = defineStore('auth', {

    state: () => ({
        email:'',
        access_token: localStorage.getItem('access_token') || null,
        sending: false,
        message: '',
        user: localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')) : null
    }),

    getters: {
        isAuthenticated: (state) => state.access_token ? true : false
    },


    actions: {

        async login(creadentials){

            this.sending = true

            try{

                const response = await http.post('/auth/login', creadentials)
                const status = response?.data?.status ?? null 
                
                if(status === 'success'){
                    toast.success(response.data.message)
                }else{
                    toast.error('Credentials was invalid')
                }

            }catch(error){
                console.log(error)
                const message = error.message
                toast.error(message)

            }finally{
                this.sending = false
            }

        }

    }

})