import axios from "axios";


const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout:10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});


http.interceptors.request.use(
    (config) => {

        //get token from localstorage
        const token = localStorage.getItem('access_token')
        if(token)
        {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }
)


http.interceptors.response.use(
    (response) => {
        return response
    },

    (error) => {

        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')

            window.location.href = '/login'
        }
    }
)

export default http