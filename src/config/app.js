export const appConfig = {

    apiUrl: import.meta.env.VITE_API_URL,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,

    getImageUrl: (imagePath) => {

        if(!imagePath) return ''

        return `${appConfig.apiBaseUrl}/storage/${imagePath}`
    
    }

}

export default appConfig

