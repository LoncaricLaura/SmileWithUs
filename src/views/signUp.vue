<template>
    <div>
        <div
            class="flex flex-col lg:flex-row justify-center items-center mx-4 sm:mx-24 lg:mx-32 xl:mx-72 mt-32 sm:mt-32 md:mt-36 lg:mt-44 h-[860px] sm:h-[930px] lg:h-[700px] shadow-[0_35px_77px_-15px_rgba(0,0,0,0.44)] rounded-md"
        >
            <loading
                :active="isLoading"
                :is-full-page="fullPage"
                :loader="loader"
            />
            <div
                class="flex flex-col w-full lg:w-1/2 h-full bg-[#385B97] py-12 lg:pt-32 px-6 xl:px-24 lg:order-none rounded-t-md lg:rounded-l-md lg:rounded-tr-none"
            >
                <p class="text-white text-3xl md:text-5xl">Sign up</p>
                <p class="text-white text-lg md:text-2xl mt-4 md:mt-8">
                    to use all features of the application
                </p>
                <div
                    class="mt-6 md:mt-12 text-sm font-display text-slate-100 text-center"
                >
                    Already have an account?
                    <router-link to="/login"
                        ><a
                            class="cursor-pointer text-slate-100 hover:text-bold font-bold"
                            >Log in</a
                        ></router-link
                    >
                </div>
                <img
                    src="/src/assets/teeth.png"
                    class="hidden lg:flex mx-0 lg:mx-16 xl:px-24"
                />
            </div>
            <div
                class="flex w-full lg:w-1/2 px-4 sm:px-12 lg:px-16 xl:px-24 py-6 lg:py-0"
            >
                <form class="space-y-5 md:space-y-6 w-full">
                    <div class="flex flex-col items-start">
                        <div class="text-lg font-bold text-[#244B8E] pb-2">
                            Full name
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border-b border-[#CCCCCC]"
                            type="name"
                            v-model="fullName"
                            placeholder="Name Surname"
                            required
                            autocomplete="name"
                        />
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="text-lg font-bold text-[#244B8E] pb-2">
                            Identification number
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border-b border-[#CCCCCC]"
                            type="text"
                            v-model="identification"
                            placeholder="030345761795"
                            required
                            autocomplete="off"
                            maxlength="11"
                            minlength="11"
                        />
                        <label
                            for="passwordWarning"
                            v-if="identification.length !== 11"
                            class="text-[#3D619E] text-left text-sm font-display font-semibold mt-1"
                            >Identification number must contain 11
                            character</label
                        >
                    </div>
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
                        <div class="flex justify-between items-center">
                            <div class="text-lg font-bold text-[#244B8E] pb-2">
                                Password
                            </div>
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border-b border-[#CCCCCC]"
                            type="password"
                            v-model="password"
                            placeholder="Enter your password"
                            required
                            autocomplete="new-password"
                        />
                        <label
                            for="passwordWarning"
                            v-if="password.length < 6"
                            class="text-[#3D619E] text-sm font-display font-semibold mt-1"
                            >Password must contain at least 6 character</label
                        >
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="flex justify-between items-center">
                            <div class="text-lg font-bold text-[#244B8E] pb-2">
                                Retype password
                            </div>
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border-b border-[#CCCCCC]"
                            type="password"
                            v-model="passwordRepeat"
                            placeholder="Enter your password"
                            required
                            autocomplete="off"
                        />
                        <span
                            v-if="password && passwordRepeat !== password"
                            class="text-[#3D619E] text-sm font-display font-semibold"
                            >Password doesn't match</span
                        >
                    </div>
                    <div class="mt-10">
                        <button
                            type="button"
                            @click="signup()"
                            :disabled="password && passwordRepeat !== password"
                            class="bg-[#385B97] text-white p-4 w-full font-semibold font-display hover:bg-[#244B8E] rounded-full mt-4"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { store } from '../store'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    name: 'signUp',
    data() {
        return {
            fullName: '',
            identification: '',
            username: '',
            password: '',
            passwordRepeat: '',
            isLoading: false,
            fullPage: true,
            loader: 'spinner',
        }
    },
    components: {
        Loading,
    },
    methods: {
        signup() {
            if (this.identification.length !== 11) {
                return 0
            }
            const auth = getAuth()
            createUserWithEmailAndPassword(auth, this.username, this.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    const uid = user.uid
                    store.state.currentName = this.fullName
                    console.log(user)

                    // add new user in document with uid from auth
                    setDoc(doc(db, 'users', uid), {
                        fullName: this.fullName,
                        identification: this.identification,
                        email: user.email,
                        isAdmin: 'user',
                    })
                    console.log('Reg Success! Email: ' + user.email)
                })
                .then(() => {
                    // for updating profile on signup
                    updateProfile(auth.currentUser, {
                        displayName: this.fullName,
                    })
                    this.$router.replace({ path: '/' })
                })
                .catch((e) => {
                    console.error(e.message)
                    alert(e.message)
                    store.currentName = null
                    this.password = ''
                    this.passwordRepeat = ''
                })
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 3000)
        },
    },
}
</script>
