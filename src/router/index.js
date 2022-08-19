import { createRouter, createWebHistory } from 'vue-router'
import indexScreen from '/src/views/indexScreen.vue'
import signUp from '/src/views/signUp.vue'
import logIn from '/src/views/logIn.vue'
import ordinationScreen from '/src/views/ordinationScreen.vue'
import chooseOrdination from '/src/views/chooseOrdination.vue'
import chooseService from '/src/views/chooseService.vue'
import chooseAppointment from '/src/views/chooseAppointment.vue'
import sucessOrder from '/src/views/sucessOrder.vue'
import priceList from '/src/views/priceList.vue'
import adminScreen from '/src/views/adminScreen.vue'
import appointmentsList from '/src/views/appointmentsList.vue'

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
        path: '/chooseordination',
        name: 'chooseOrdination',
        component: chooseOrdination,
        meta: { title: 'ChooseOrdination | SmileWithUs' }
    },
    {
        path: '/chooseservice',
        name: 'chooseService',
        component: chooseService,
        meta: { title: 'ChooseService | SmileWithUs' }
    },
    {
        path: '/chooseappointment',
        name: 'chooseAppointment',
        component: chooseAppointment,
        meta: { title: 'ChooseAppointment | SmileWithUs' }
    },
    {
        path: '/sucessorder',
        name: 'sucessOrder',
        component: sucessOrder,
        meta: { title: 'SuccessOrder | SmileWithUs' }
    },
    {
        path: '/ordination/:name/priceList',
        name: 'priceList',
        component: priceList,
        props: true,
        meta: { title: 'PriceList | SmileWithUs' }
    },
    {
        path: '/adminscreen',
        name: 'adminScreen',
        component: adminScreen,
        props: true,
        meta: { title: 'Admin | SmileWithUs' }
    },
    {
        path: '/appointmentslist',
        name: 'appointmentsList',
        component: appointmentsList,
        props: true,
        meta: { title: 'List of appointments | SmileWithUs' }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const defaultTitle = 'SmileWithUs'
router.afterEach((to) => {
    document.title = to.meta.title || defaultTitle
})

router.beforeEach((to) => {
    if (
        !store.state.currentUserEmail &&
        to.path !== '/' &&
        to.path !== '/login' &&
        to.path !== '/signup' &&
        to.name !== 'ordinationScreen' &&
        to.name !== 'priceList'
    ) {
        return { path: '/' }
    }

}) 

export default router