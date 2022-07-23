import { createApp } from 'vue'
import App from './App.vue'
import "../src/index.css"
import router from "./router/index"
import { store } from './store'

createApp(App).use(router, store).mount('#app')


