<template>
    <div>
        <div
            class="flex flex-col lg:flex-row justify-center items-center mx-4 sm:mx-24 xl:mx-80 mt-32 sm:mt-44 md:mt-44 lg:mt-44 h-[650px] sm:h-[700px] shadow-[0_35px_77px_-15px_rgba(0,0,0,0.44)] rounded-md"
        >
            <div
                class="flex flex-col justify-center w-full lg:w-1/2 h-full md:h-full py-8 px-4 sm:px-24 lg:px-24"
            >
                <div class="flex flex-col items-start text-[#244B8E] pt-12">
                    <p class="text-2xl md:text-4xl">Forgot password</p>
                    <p class="text-md md:text-lg text-left mt-4 md:mt-4">
                        Please enter your email adress below
                    </p>
                    <p class="text-xs text-left mt-2 text-red-500">
                        If you do not see the email in a few minutes, check your
                        “junk mail” folder or “spam” folder.
                    </p>
                </div>
                <form class="space-y-6 w-full pt-12">
                    <div class="flex flex-col items-start">
                        <div class="text-lg font-bold text-[#244B8E] pb-2">
                            Email Address
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border-b border-[#CCCCCC]"
                            type="email"
                            v-model="email"
                            placeholder="name@gmail.com"
                            required
                            autocomplete="email"
                        />
                    </div>

                    <div class="mt-10">
                        <button
                            type="button"
                            @click="sendEmail()"
                            :disabled="email === ''"
                            class="bg-[#385B97] text-white p-2 md:p-4 w-1/2 md:w-full font-semibold font-display hover:bg-[#244B8E] rounded-full"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
            <div
                class="flex flex-col w-full lg:w-1/2 lg:h-full md:h-1/2 h-1/2 bg-[#385B97] lg:py-8 order-last lg:order-none rounded-b-md lg:rounded-r-md lg:rounded-tl-none p-12 sm:px-16 sm:pt-0 lg:p-0"
            >
                <img src="/src/assets/forgotPassword.svg" class="" />
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
export default {
    name: 'forgotPassword',
    data() {
        return {
            email: '',
            error: null,
        }
    },
    methods: {
        sendEmail() {
            const auth = getAuth()
            sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    alert('Email sent!')
                    this.$router.push({ path: '/login' })
                })
                .catch((error) => {
                    this.error = error.message
                    alert('Please type in a valid email address.')
                })
        },
    },
}
</script>
