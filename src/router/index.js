import { createRouter, createWebHistory } from 'vue-router'
import indexScreen from '/src/views/indexScreen.vue'
import signUp from '/src/views/signUp.vue'
import logIn from '/src/views/logIn.vue'
import ordinationScreen from '/src/views/ordinationScreen.vue'
import chooseOrdination from '/src/views/chooseOrdination.vue'
import chooseService from '/src/views/chooseService.vue'
import chooseAppointment from '/src/views/chooseAppointment.vue'
import { store } from '../store'

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
        meta: { title: 'Sign up | SmileWithUs' }
    },
    {
        path: '/login',
        name: 'logIn',
        component: logIn,
        meta: { title: 'Login | SmileWithUs' }
    },
    {
        path: '/ordination/:name',
        name: 'ordinationScreen',
        component: ordinationScreen,
        props: true,
        meta: { title: 'Ordination | SmileWithUs' }
    },
    {
        path: '/chooseOrdination',
        name: 'chooseOrdination',
        component: chooseOrdination,
        meta: { title: 'ChooseOrdination | SmileWithUs' }
    },
    {
        path: '/chooseService',
        name: 'chooseService',
        component: chooseService,
        meta: { title: 'ChooseService | SmileWithUs' }
    },
    {
        path: '/chooseAppointment',
        name: 'chooseAppointment',
        component: chooseAppointment,
        meta: { title: 'ChooseAppointment | SmileWithUs' }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const defaultTitle = 'SmileWithUs'
router.afterEach((to) => {
    document.title = to.meta.title || defaultTitle
})
/*
router.beforeEach((to) => {
    if (
        !store.state.currentUserEmail &&
        to.path !== '/' &&
        to.path !== '/login' &&
        to.path !== '/signup' &&
        to.path !== '/ordination/:name'
    ) {
        return { path: '/' }
    }
}) */

export default router