import { createRouter, createWebHistory } from 'vue-router'
import indexScreen from '/src/views/indexScreen.vue'
import signUp from '/src/views/signUp.vue'
const routes = [
    {
        path: '/',
        name: 'indexScreen',
        component: indexScreen,
    },
    {
        path: '/signup',
        name: 'signUp',
        component: signUp,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router