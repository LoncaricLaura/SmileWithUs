<template>
    <div>
        <div class="flex w-full h-[550px] bg-[url('/src/assets/home/homeScreen.png')] bg-cover bg-blend-multiply bg-white top-0">
            <div class="flex flex-col my-auto px-12 md:px-24 lg:px-32 w-full xl:w-3/4 pt-24 lg:pt-24">
                <div class="text-5xl md:text-7xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-16">
                    <div class="text-4xl md:text-6xl pb-2">Welcome to</div>
                    <div>{{ store.state.currentName }}</div>
                </div>
                <router-link to="/appointmentslist"
                class="bg-[#385B97] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full"
                >
                appointmentsList
            </router-link>
            </div>
        </div>
        <div class="flex flex-col xl:flex-row items-center md:items-end py-16 md:py-32 space-x-24 lg:space-x-32 space-y-24 lg:space-y-0 px-12 md:px-24 lg:px-32" v-if="store.state.userRole !== true">
            <div class="flex flex-col items-start text-left w-full xl:w-1/2">
                <div class="text-3xl sm:text-4xl text-slate-600 font-bold pb-2 border-b-2 border-[#244B8E] w-32">Info</div>
                <div class="text-xl sm:text-2xl text-slate-600 pt-8 leading-9">{{}}</div>
                <div class="text-xl sm:text-2xl text-slate-600 pt-8 leading-9">See the schedule of scheduled appointments</div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase'
import { doc, onSnapshot, getDocs, collection, where, query } from 'firebase/firestore'
import { store } from '../store'
export default {
    name: 'adminScreen',
    data() {
        return {
            store,
            ordinations: []
        }
    },
    methods: {
        async getOrdination() {
            const q = query(collection(db, "ordinations"), where("name", "==", `${store.state.currentName}`));
            onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.ordinations.push(doc.data().name);
                store.state.currentAdminName = this.ordinations
            });
            console.log(store.state.currentAdminName);
            });
            }
    },
    beforeMount() {
        this.getOrdination()
    }
}
</script>
