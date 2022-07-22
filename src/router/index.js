import { createRouter, createWebHistory } from 'vue-router'
import indexScreen from '/src/views/indexScreen.vue'
import signUp from '/src/views/signUp.vue'
import logIn from '/src/views/logIn.vue'
import ordinationScreen from '/src/views/ordinationScreen.vue'

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
        meta: { title: 'Sign up | WorlOfSmiles' }
    },
    {
        path: '/login',
        name: 'logIn',
        component: logIn,
        meta: { title: 'Login | WorlOfSmiles' }
    },
    {
        path: '/ordination/:name',
        name: 'ordinationScreen',
        component: ordinationScreen,
        props: true,
        meta: { title: 'Ordination | WorlOfSmiles' }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const defaultTitle = 'WorlOfSmiles'
router.afterEach((to) => {
    document.title = to.meta.title || defaultTitle
})

router.beforeEach((to) => {
    if (
        !localStorage.getItem('checkLogedUser') &&
        to.path !== '/' &&
        to.path !== '/login' &&
        to.path !== '/signup' 
    ) {
        return { path: '/' }
    }
})

export default router