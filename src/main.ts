import { createApp } from 'vue'
import './assets/css/tailwindStyles.css'
import router from './router'
import App from './App.vue'


createApp(App).use(router).mount('#app')
