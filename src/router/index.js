import { createRouter, createWebHistory } from 'vue-router'
import indexScreen from '/src/views/indexScreen.vue'
import signUp from '/src/views/signUp.vue'
import logIn from '/src/views/logIn.vue'
import ordinationScreen from '/src/views/ordinationScreen.vue'
import chooseOrdination from '/src/views/chooseOrdination.vue'
import chooseService from '/src/views/chooseService.vue'
import chooseAppointment from '/src/views/chooseAppointment.vue'
import sucessOrder from '/src/views/sucessOrder.vue'
import adminScreen from '/src/views/adminScreen.vue'
import appointmentsList from '/src/views/appointmentsList.vue'
import newOrders from '/src/views/newOrders.vue'
import editOrder from '/src/views/editOrder.vue'
import patientList from '/src/views/patientList.vue'
import patientDetails from '/src/views/patientDetails.vue'
import myOrders from '/src/views/myOrders.vue'
import forgotPassword from '/src/views/forgotPassword.vue'

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
        meta: { title: 'Sign up | SmileWithUs' },
    },
    {
        path: '/login',
        name: 'logIn',
        component: logIn,
        meta: { title: 'Login | SmileWithUs' },
    },
    {
        path: '/ordination/:name',
        name: 'ordinationScreen',
        component: ordinationScreen,
        props: true,
        meta: { title: 'Ordination | SmileWithUs' },
    },
    {
        path: '/chooseordination',
        name: 'chooseOrdination',
        component: chooseOrdination,
        meta: { title: 'ChooseOrdination | SmileWithUs' },
    },
    {
        path: '/chooseservice',
        name: 'chooseService',
        component: chooseService,
        meta: { title: 'ChooseService | SmileWithUs' },
    },
    {
        path: '/chooseappointment',
        name: 'chooseAppointment',
        component: chooseAppointment,
        meta: { title: 'ChooseAppointment | SmileWithUs' },
    },
    {
        path: '/sucessorder',
        name: 'sucessOrder',
        component: sucessOrder,
        meta: { title: 'SuccessOrder | SmileWithUs' },
    },
    {
        path: '/adminscreen',
        name: 'adminScreen',
        component: adminScreen,
        props: true,
        meta: { title: 'Admin | SmileWithUs' },
    },
    {
        path: '/appointmentslist',
        name: 'appointmentsList',
        component: appointmentsList,
        props: true,
        meta: { title: 'List of appointments | SmileWithUs' },
    },
    {
        path: '/neworders',
        name: 'neworders',
        component: newOrders,
        props: true,
        meta: { title: 'New orders | SmileWithUs' },
    },
    {
        path: '/editorder/:title',
        name: 'editorder',
        component: editOrder,
        props: true,
        meta: { title: 'Edit order | SmileWithUs' },
    },
    {
        path: '/patientlist',
        name: 'patientList',
        component: patientList,
        props: true,
        meta: { title: 'Patient list | SmileWithUs' },
    },
    {
        path: '/patientdetails/:identification',
        name: 'patientDetails',
        component: patientDetails,
        props: true,
        meta: { title: 'Patient list | SmileWithUs' },
    },
    {
        path: '/myorders',
        name: 'myOrders',
        component: myOrders,
        props: true,
        meta: { title: 'My orders | SmileWithUs' },
    },
    {
        path: '/forgotpassword',
        name: 'forgotPassword',
        component: forgotPassword,
        props: true,
        meta: { title: 'Forgot password | SmileWithUs' },
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
        to.name !== 'priceList' &&
        to.path !== '/forgotpassword'
    ) {
        return { path: '/' }
    }
})

export default router
