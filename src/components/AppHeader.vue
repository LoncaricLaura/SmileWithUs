<template>
    <div
        class="absolute justify-between flex w-full lg:h-auto px-8 sm:px-12 md:px-24 lg:px-32 pt-4 top-0 lg:top-0 pt-2 md:pt-8"
        :class="
            open
                ? 'flex flex-wrap bg-[#385B97] lg:bg-inherit transform origin-top-right transition duration-300 fade-in-out h-full pb-[700px]'
                : ''
        "
    >
        <loading
            :active="isLoading"
            :is-full-page="fullPage"
            :loader="loader"
        />
        <div class="flex items-top lg:items-center pt-6 lg:pt-0">
            <router-link
                to="/"
                v-if="
                    this.$route.path !== '/adminscreen' &&
                    this.$route.path !== '/appointmentslist' &&
                    this.$route.path !== '/neworders' &&
                    this.$route.name !== 'editorder' &&
                    this.$route.path !== '/patientlist' &&
                    this.$route.name !== 'deletePatient' &&
                    this.$route.name !== 'patientDetails'
                "
            >
                <p
                    class="text-3xl md:text-4xl font-extrabold text-[#244B8E] italic"
                    :class="[open ? 'text-[white]' : '']"
                >
                    SmileWithUs
                </p>
            </router-link>
            <router-link
                to="/adminscreen"
                v-if="
                    this.$route.path === '/adminscreen' ||
                    this.$route.path === '/appointmentslist' ||
                    this.$route.path === '/neworders' ||
                    this.$route.name === 'editorder' ||
                    this.$route.path === '/patientlist' ||
                    this.$route.name === 'deletePatient' ||
                    this.$route.name === 'patientDetails'
                "
            >
                <p
                    class="text-3xl md:text-4xl font-extrabold text-[#244B8E] italic"
                    :class="[open ? 'text-[white]' : '']"
                >
                    SmileWithUs
                </p>
            </router-link>
        </div>

        <div class="lg:hidden flex right-6 sm:right-12 md:right-24 top-16">
            <button
                class="flex items-center px-6 pt-4 rounded font-extrabold text-[0300A6] order-last"
                @click="toggle"
            >
                <svg
                    class="open absolute fill-current h-5 w-5 transform transition duration-1000 ease-in-out"
                    :class="open ? 'hidden' : 'open'"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>

                <svg
                    class="close absolute flex transform transition duration-1000 ease-in-out"
                    :class="open ? 'close' : 'hidden'"
                    height="18px"
                    version="1.1"
                    viewBox="0 0 14 14"
                    width="18px"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <title />
                    <desc />
                    <defs />
                    <g
                        fill="none"
                        fill-rule="evenodd"
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                    >
                        <g
                            fill="white"
                            id="Core"
                            transform="translate(-341.000000, -89.000000)"
                        >
                            <g
                                id="close"
                                transform="translate(341.000000, 89.000000)"
                            >
                                <path
                                    d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
                                    id="Shape"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
        <div
            class="flex flex-col lg:flex-row w-full lg:justify-end lg:space-x-12 pt-16 lg:pt-0 lg:flex text-xl font-bold text-white lg:text-[#244B8E] text-end items-end lg:items-center"
            :class="open ? 'block ' : 'hidden'"
        >
            <div
                class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 pb-6 lg:pb-0"
            >
                <!--<router-link to="/" @click="closeMenu" v-if="store.state.currentUserEmail && this.$route.path !== '/adminscreen' && this.$route.path !== '/appointmentslist' && this.$route.path !== '/neworders' && this.$route.name !== 'editorder'" 
                    >Dental offices 
                </router-link>-->

                <router-link
                    to="/myOrders"
                    class="hover:font-bold"
                    @click="closeMenu"
                    v-if="
                        store.state.currentUserEmail &&
                        this.$route.path !== '/adminscreen' &&
                        this.$route.path !== '/appointmentslist' &&
                        this.$route.path !== '/neworders' &&
                        this.$route.name !== 'editorder' &&
                        this.$route.name !== 'patientList' &&
                        this.$route.name !== 'deletePatient' &&
                        this.$route.name !== 'patientDetails'
                    "
                    >My orders</router-link
                >
                <router-link
                    to="/"
                    class="hover:font-bold"
                    @click.prevent="dentalOffices"
                    @click="closeMenu"
                    v-if="
                        this.$route.path !== '/login' &&
                        this.$route.path !== '/signup' &&
                        this.$route.path !== '/adminscreen' &&
                        this.$route.path !== '/appointmentslist' &&
                        this.$route.path !== '/neworders' &&
                        this.$route.name !== 'editorder' &&
                        this.$route.name !== 'patientList' &&
                        this.$route.name !== 'deletePatient' &&
                        this.$route.name !== 'patientDetails'
                    "
                    >Dental offices</router-link
                >
                <router-link
                    to="/"
                    class="hover:font-bold"
                    @click.prevent="specialServices"
                    @click="closeMenu"
                    v-if="
                        this.$route.path !== '/login' &&
                        this.$route.path !== '/signup' &&
                        this.$route.path !== '/adminscreen' &&
                        this.$route.path !== '/appointmentslist' &&
                        this.$route.path !== '/neworders' &&
                        this.$route.name !== 'editorder' &&
                        this.$route.name !== 'patientList' &&
                        this.$route.name !== 'deletePatient' &&
                        this.$route.name !== 'patientDetails'
                    "
                    >Special services</router-link
                >
                <router-link
                    to="/chooseordination"
                    class="hover:font-bold"
                    @click="closeMenu"
                    v-if="
                        open &&
                        store.state.currentUserEmail &&
                        this.$route.path !== '/adminscreen' &&
                        this.$route.path !== '/appointmentslist' &&
                        this.$route.path !== '/neworders' &&
                        this.$route.name !== 'editorder' &&
                        this.$route.name !== 'patientList' &&
                        this.$route.name !== 'deletePatient' &&
                        this.$route.name !== 'patientDetails'
                    "
                    >Book an appoitment</router-link
                >
                <router-link
                    to="/appointmentslist"
                    class="hover:font-bold"
                    @click="closeMenu"
                    v-if="
                        (store.state.currentUserEmail &&
                            this.$route.path === '/adminscreen') ||
                        this.$route.path === '/appointmentslist' ||
                        this.$route.path === '/neworders' ||
                        this.$route.name === 'editorder' ||
                        this.$route.name === 'patientList' ||
                        this.$route.name === 'deletePatient' ||
                        this.$route.name === 'patientDetails'
                    "
                    >Appointments</router-link
                >
                <router-link
                    to="/patientlist"
                    class="hover:font-bold"
                    @click="closeMenu"
                    v-if="
                        (store.state.currentUserEmail &&
                            this.$route.path === '/adminscreen') ||
                        this.$route.path === '/appointmentslist' ||
                        this.$route.path === '/neworders' ||
                        this.$route.name === 'editorder' ||
                        this.$route.name === 'patientList' ||
                        this.$route.name === 'deletePatient' ||
                        this.$route.name === 'patientDetails'
                    "
                    >Patient list</router-link
                >
                <router-link
                    to="/neworders"
                    class="hover:font-bold"
                    @click="closeMenu"
                    v-if="
                        (store.state.currentUserEmail &&
                            this.$route.path === '/adminscreen') ||
                        this.$route.path === '/appointmentslist' ||
                        this.$route.path === '/neworders' ||
                        this.$route.name === 'editorder' ||
                        this.$route.name === 'patientList' ||
                        this.$route.name === 'deletePatient' ||
                        this.$route.name === 'patientDetails'
                    "
                    >New orders
                    <img
                        src="/src/assets/notification.png"
                        class="absolute flex right-72 top-8 h-4 animate-pulse"
                        :class="[
                            store.state.numberOfNewOrders > 0 && !open
                                ? 'flex'
                                : 'hidden',
                        ]"
                    />
                </router-link>
            </div>
            <div v-if="store.state.currentUserEmail"></div>
            <div
                class="flex flex-col lg:flex-row items-end lg:items-center space-y-6 lg:space-y-0 lg:space-x-8"
            >
                <router-link
                    to="/signup"
                    @click="closeMenu"
                    v-if="!store.state.currentUserEmail"
                    class="hover:font-bold text-[#1B3B73] lg:text-white bg-white lg:bg-[#1B3B73] py-2 px-4 rounded-full"
                    >Sign up</router-link
                >
                <router-link
                    to="/login"
                    @click="closeMenu"
                    class="hover:font-bold"
                    :class="[open ? 'mr-3' : 'mr-0']"
                    v-if="!store.state.currentUserEmail"
                    >Login
                </router-link>
                <div
                    v-if="store.state.currentUserEmail"
                    class="pl-2 cursor-pointer"
                    :class="[open ? 'text-white' : 'text-[#1B3B73]']"
                    @click="signout()"
                >
                    Log out
                </div>
                <div
                    v-if="
                        store.state.currentUserEmail &&
                        this.$route.path !== '/adminscreen' &&
                        this.$route.path !== '/appointmentslist' &&
                        this.$route.path !== '/neworders' &&
                        this.$route.name !== 'editorder' &&
                        this.$route.name !== 'patientList' &&
                        this.$route.name !== 'deletePatient' &&
                        this.$route.name !== 'patientDetails'
                    "
                    class="flex flex-col cursor-default"
                >
                    <img src="/src/assets/profile.png" class="ml-auto w-12" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase'
import { store } from '../store'
import { signOut, getAuth } from 'firebase/auth'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

const auth = getAuth()

export default {
    name: 'AppHeader',
    data() {
        return {
            open: false,
            store,
            users: [],
            visible: false,
            isLoading: false,
            fullPage: true,
            loader: 'spinner',
        }
    },
    components: {
        Loading,
    },
    firestore: {
        users: db.collection('users'),
    },
    methods: {
        closeMenu() {
            this.open = false
        },
        toggle() {
            this.open = !this.open
        },
        dentalOffices() {
            const dentalOffices = document.getElementById('dental-offices')
            return dentalOffices.scrollIntoView()
        },
        specialServices() {
            const specialServices = document.getElementById('special-services')
            return specialServices.scrollIntoView()
        },
        signout() {
            signOut(auth)
                .then(() => {
                    store.state.userRole = null
                    this.$router.replace({ path: '/' })
                    localStorage.clear()
                    this.isLoading = false
                })
                .catch((error) => {
                    console.log(error)
                })
            this.isLoading = true
        },
    },
}
</script>

<style>
.router-link-exact-active {
    font-weight: bold;
}
</style>
