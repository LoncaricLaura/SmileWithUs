<template>
    <div>
        <div
            class="flex flex-col lg:flex-row justify-center items-center mx-4 sm:mx-24 xl:mx-80 mt-32 sm:mt-44 md:mt-56 lg:mt-44 h-[600px] sm:h-[700px] shadow-[0_35px_77px_-15px_rgba(0,0,0,0.44)] rounded-md"
        >
            <loading
                :active="isLoading"
                :is-full-page="fullPage"
                :loader="loader"
            />
            <div
                class="flex items-center w-full lg:w-1/2 h-3/4 md:h-full py-8 px-4 sm:p-24 lg:px-24"
            >
                <form class="space-y-6 w-full">
                    <div class="flex flex-col items-start">
                        <div class="text-lg font-bold text-[#244B8E] pb-2">
                            Email Address
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border-b border-[#CCCCCC]"
                            type="email"
                            v-model="username"
                            placeholder="name@gmail.com"
                            required
                            autocomplete="email"
                        />
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="flex justify-between items-center w-full">
                            <div class="text-lg font-bold text-[#244B8E] pb-2">
                                Password
                            </div>
                            <router-link
                                to="/forgotpassword"
                                v-if="!store.state.currentUserEmail"
                                class="text-xs font-display font-semibold text-[#244B8E] hover:text-[#1D3C73] cursor-pointer"
                                >Forgot Password?</router-link
                            >
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border-b border-[#CCCCCC]"
                            type="password"
                            v-model="password"
                            placeholder="Enter your password"
                            required
                            autocomplete="current-password"
                        />
                        <span
                            class="text-[#3D619E] pt-1"
                            v-if="password == ''"
                            >{{ error }}</span
                        >
                    </div>

                    <div class="mt-10">
                        <button
                            type="button"
                            @click="login()"
                            :disabled="username && password === ''"
                            class="bg-[#385B97] text-white p-4 w-full font-semibold font-display hover:bg-[#244B8E] rounded-full"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
            <div
                class="flex flex-col w-full lg:w-1/2 md:h-full bg-[#385B97] py-8 md:py-24 lg:pt-32 px-4 sm:px-12 lg:px-16 order-first lg:order-none rounded-t-md lg:rounded-r-md lg:rounded-tl-none"
            >
                <p class="text-white text-3xl md:text-5xl">Welcome back!</p>
                <p class="text-white text-lg md:text-2xl mt-4 md:mt-8">
                    Log in to your account
                </p>
                <div
                    class="mt-6 md:mt-12 text-sm font-display text-slate-100 text-center"
                >
                    Don't have an account?
                    <router-link to="/signup"
                        ><a
                            class="cursor-pointer text-slate-100 hover:text-bold font-bold"
                            >Sign up</a
                        ></router-link
                    >
                </div>
                <img
                    src="/src/assets/teeth.png"
                    class="hidden lg:flex mx-0 xl:mx-32"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { store } from '../store'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { onSnapshot, doc, getDocs, collection } from '@firebase/firestore'
import { db } from '../firebase'

export default {
    name: 'logIn',
    data() {
        return {
            username: '',
            password: '',
            error: '',
            isLoading: false,
            fullPage: true,
            loader: 'spinner',
            store,
            userDetails: [],
        }
    },
    components: {
        Loading,
    },
    methods: {
        async login() {
            const auth = getAuth()
            signInWithEmailAndPassword(auth, this.username, this.password)
                .then(() => {
                    const docRef = doc(db, 'users', `${store.state.currentUid}`)
                    onSnapshot(docRef, (doc) => {
                        this.userDetails = doc.data()
                        localStorage.setItem(
                            'isAdmin',
                            this.userDetails.isAdmin
                        )
                        localStorage.setItem(
                            'ordinationId',
                            this.userDetails.ordination_id
                        )
                        localStorage.setItem(
                            'identification',
                            this.userDetails.identification
                        )

                        store.state.adminOrdiantionId =
                            this.userDetails.ordination_id
                        store.state.userRole = this.userDetails.isAdmin
                        store.state.identification =
                            this.userDetails.identification

                        if (store.state.userRole === 'admin') {
                            this.$router.push({ path: '/adminscreen' })
                            console.log(
                                `Hello ADMIN role  ${store.state.userRole}`
                            )
                        } else {
                            this.$router.push({ path: '/' })
                        }
                    })
                })
                .then(() => {
                    this.isLoading = false
                })
                .catch((e) => {
                    console.log('Error:', e.message)
                    this.password = ''
                    this.error = 'Error: Wrong password or email!'
                    this.isLoading = false
                })
            this.isLoading = true
        },
    },
}
</script>
