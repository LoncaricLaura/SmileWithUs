<template>
    <div>
        <div class="flex flex-col lg:flex-row justify-center items-center mx-4 sm:mx-24 lg:mx-32 xl:mx-72 mt-40 sm:mt-32 md:mt-36 lg:mt-44 h-[860px] sm:h-[930px] lg:h-[700px] shadow-[0_35px_77px_-15px_rgba(0,0,0,0.44)] rounded-2xl">
        <loading
            :active="isLoading"
            :is-full-page="fullPage"
            :loader="loader"
        />
            <div class="flex flex-col w-full lg:w-1/2  h-full bg-[#385B97] py-12 lg:pt-32 px-6 xl:px-24 lg:order-none rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
                <p class="text-white text-3xl md:text-5xl">Sign up</p>
                <p class="text-white text-lg md:text-2xl mt-4 md:mt-8">to use all features of the application</p>
                <div class="mt-6 md:mt-12 text-sm font-display text-slate-100 text-center">Already have an account?
                    <router-link to="/login"
                    ><a class="cursor-pointer text-slate-100 hover:text-bold font-bold"
                        >Log in</a
                    ></router-link>
                    </div>
                <img src="/src/assets/teeth.png" class="hidden lg:flex mx-0 lg:mx-16 xl:px-24">
            </div>
            <div class="flex w-full lg:w-1/2 px-4 sm:px-12 lg:px-16 xl:px-24 py-6 lg:py-0">
                <form class="space-y-5 md:space-y-6 w-full">
                    <div class="flex flex-col items-start">
                        <div
                            class="text-lg font-bold text-[#244B8E] pb-2"
                        >
                            Full name
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border border-[#CCCCCC] rounded-full"
                            type="email"
                            v-model="fullName"
                            placeholder="Name Surname"
                            required
                        />
                    </div>
                    <div class="flex flex-col items-start">
                        <div
                            class="text-lg font-bold text-[#244B8E] pb-2"
                        >
                            Identification number
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border border-[#CCCCCC] rounded-full"
                            type="text"
                            v-model="identification"
                            placeholder="030345761795"
                            required
                            autocomplete="email"
                            maxlength="11"
                        />
                        <label
                            for="passwordWarning"
                            v-if="identification.length !== 11"
                            class="text-[#3D619E] text-sm font-display font-semibold mt-1"
                            >Identification number must contain 11 character</label
                        >
                    </div>
                    <div class="flex flex-col items-start">
                        <div
                            class="text-lg font-bold text-[#244B8E] pb-2"
                        >
                            Email Address
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border border-[#CCCCCC] rounded-full"
                            type="email"
                            v-model="username"
                            placeholder="name@gmail.com"
                            required
                            autocomplete="email"
                        />
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="flex justify-between items-center">
                            <div
                                class="text-lg font-bold text-[#244B8E] pb-2"
                            >
                                Password
                            </div>
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border border-[#CCCCCC] rounded-full"
                            type="password"
                            v-model="password"
                            placeholder="Enter your password"
                            required
                            autocomplete="new-password"
                        />
                        <label
                            for="passwordWarning"
                            v-if="password.length < 8"
                            class="text-[#3D619E] text-sm font-display font-semibold mt-1"
                            >Password must contain at least 8 character</label
                        >
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="flex justify-between items-center">
                            <div
                                class="text-lg font-bold text-[#244B8E] pb-2"
                            >
                                Retype password
                            </div>
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border border-[#CCCCCC] rounded-full"
                            type="password"
                            v-model="passwordRepeat"
                            placeholder="Enter your password"
                            required
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
                            :disabled="
                                password !== passwordRepeat && password.length < 8
                            "
                            class="bg-[#385B97] text-white p-4 w-full  font-semibold font-display hover:bg-[#244B8E] rounded-full mt-4"
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
            loader: 'dots',
        }
    },
    components: {
        Loading
    },
    methods: {
        signup() {
            const auth = getAuth()
            createUserWithEmailAndPassword(auth, this.username, this.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    const uid = user.uid
                    store.state.currentName = this.fullName
                    console.log(user)

                    // Check if user meets role criteria.
                   /* if (
                        user.email &&
                        user.email.endsWith('@admin.com')
                    ) {
                        setDoc(doc(db, 'admins', uid), {
                            fullName: this.fullName,
                            identification: this.identification,
                            email: user.email,
                            admin: true
                        })
                    }
                    else {
                        setDoc(doc(db, 'users', uid), {
                            fullName: this.fullName,
                            identification: this.identification,
                            email: user.email,
                            admin: false
                        })
                        }
                    this.isLoading = false
                    console.log('Reg Success! Email: ' + user.email)
                })
                .then(() => {
                    // for updating profile on signup
                    updateProfile(autho.currentUser, {
                        displayName: this.fullName,
                    })
                    if (autho.currentUser && autho.currentUser.email.endsWith('@admin.com')) {
                        this.$router.replace({ path: '/adminScreen' })
                    }
                    else {
                        this.$router.replace({ path: '/' })
                    }
                })
                .catch((e) => {
                    console.error(e.message)
                    alert(e.message)
                    store.currentName = null
                })
                this.isLoading = true */
                    // add new user in document with uid from auth
                    setDoc(doc(db, 'users', uid), {
                        fullName: this.fullName,
                        identification: this.identification,
                        email: user.email,
                        isAdmin: "user",
                    })
                    this.isLoading = false
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
                }) 
                this.isLoading = true
                
        }
    }
}
</script>

