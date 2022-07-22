<template>
    <div class="flex flex-col lg:flex-row justify-center items-center mx-4 sm:mx-24 xl:mx-80 mt-36 sm:mt-44 lg:mt-44 h-[500px] sm:h-[700px] shadow-[0_35px_77px_-15px_rgba(0,0,0,0.44)] rounded-2xl">
        <div class="flex items-center w-full lg:w-1/2 h-3/4 md:h-full py-8 px-4 sm:p-24 lg:px-24">
            <form class="space-y-6 w-full ">
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
                        autocomplete="current-password"
                    />
                    <span class="text-[#E55050] pt-1" v-if="password == ''">{{
                        error
                    }}</span>
                </div>

                <div class="mt-10">
                    <button
                        type="button"
                        @click="login()"
                        :disabled="
                            username && password === ''
                        "
                        class="bg-[#385B97] text-white p-4 w-full  font-semibold font-display hover:bg-[#244B8E] rounded-full"
                    >
                        Log in
                    </button>
                </div>
            </form>
        </div>
            <div class="flex flex-col w-full lg:w-1/2 h-1/4 md:h-full bg-[#385B97] py-8 md:py-24 lg:pt-44 px-4 sm:px-12 lg:px-16 order-first lg:order-none rounded-r-2xl">
                <p class="text-white text-2xl md:text-5xl">Welcome back!</p>
                <p class="text-white text-lg md:text-2xl mt-2 md:mt-8">Log in to your account</p>
                <img src="/src/assets/teeth.png" class="hidden lg:flex mx-0 xl:mx-32">
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { store } from '../store'

export default {
    name: 'logIn',
    data() {
        return {
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login() {
            const auth = getAuth()
            signInWithEmailAndPassword(auth, this.username, this.password)
                .then(() => {
                    this.$router.replace({ path: '/'})
                    console.log(`Hello ${store.currentName}`)
                })
                .catch((e) => {
                    console.log('Error:', e.message)
                    this.password = ''
                    this.error = 'Error: Wrong password or email!'
                })
        }
    }
}
</script>

