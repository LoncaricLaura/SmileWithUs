<template>
    <div class="flex flex-col md:flex-row justify-between bg-[#385B97] w-full py-8 px-12 md:px-32" v-if="this.$route.path !== '/login' && this.$route.path !== '/signup' && this.$route.path !== '/appointmentslist'">
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
            class="flex items-top lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 pb-4 lg:pb-0 text-slate-200 text-xl text-left mt-3"
        >
            <div class="flex flex-col space-y-4 items-end"  v-if="store.state.currentUserEmail && this.$route.path !== '/adminscreen' && this.$route.path !== '/appointmentslist' && this.$route.path !== '/neworders' && this.$route.name !== 'editorder'">
                <div class="flex flex-row space-x-4">
                    <p class="font-bold text-slate-100">Email:</p>
                    <a href="mailto:smilewithus@gmail.com" class="hover:underline">smilewithus@gmail.com</a>
                </div>
                <div class="flex flex-row space-x-4 text-slate-200 text-xl text-left"  v-if="store.state.currentUserEmail && this.$route.path !== '/adminscreen' && this.$route.path !== '/appointmentslist' && this.$route.path !== '/neworders' && this.$route.name !== 'editorder'">
                    <div class="font-bold text-slate-100">Working hours:</div>
                    <div>Mon - Sat: 08:00 - 16:00</div>
                    <div>Sun: closed</div>
                </div> 
            </div>
   
            <router-link to="/appointmentslist" v-if="store.state.currentUserEmail && this.$route.path === '/adminscreen' || this.$route.path === '/appointmentslist' || this.$route.path === '/neworders' || this.$route.name === 'editorder'"
            >Appointments</router-link
        >
            <router-link to="/neworders" v-if="store.state.currentUserEmail && this.$route.path === '/adminscreen' || this.$route.path === '/appointmentslist' || this.$route.path === '/neworders' || this.$route.name === 'editorder'"
            >New orders
            </router-link
            >
        </div>
    </div>
</template>

<script>
import { store } from '../store'

export default {
    name: 'AppFooter',
    data() {
        return {
            store
        }
    }

}
</script>
