<template>
    <div class="flex flex-col md:flex-row justify-between bg-[#385B97] w-full py-8 px-12 md:px-32" v-if="this.$route.path !== '/login' && this.$route.path !== '/signup' && this.$route.path !== '/adminSignup'">
        <div class="flex flex-col space-y-4 text-left mb-3 md:mb-0">
            <router-link to="/">
                <p
                    class="text-3xl md:text-4xl font-extrabold text-slate-100 italic"
                >
                    SmileWithUs
                </p>
            </router-link>
            <div class="text-slate-300 text-2xl md:text-3xl">20 years of experience</div>
        </div>    
                <div
                    class="flex flex-col items-top lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 pb-4 lg:pb-0 text-slate-100 text-xl text-left mt-3"
                >
                    <router-link to="/"  
                        >Dental offices
                    </router-link>

                    <router-link to="/"  
                        >Special services</router-link
                    >
                </div>
    </div>
</template>

<script>
export default {
    name: 'AppFooter',

}
</script>
