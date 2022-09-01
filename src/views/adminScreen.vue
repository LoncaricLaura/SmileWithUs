<template>
    <div>
        <div class="flex w-full h-[550px] bg-[url('/src/assets/home/homeScreen.png')] bg-cover bg-blend-multiply bg-white top-0">
            <div class="flex flex-col my-auto px-12 md:px-24 lg:px-32 w-full xl:w-3/4 pt-24 lg:pt-24">
                <div class="text-5xl md:text-7xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] pb-16">
                    <div class="text-4xl md:text-6xl pb-2">Welcome to</div>
                    <div class="font-bold">{{ store.state.currentName }}</div>
                </div>
                <router-link to="/appointmentslist"
                class="bg-[#385B97] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full"
                >
                Appointments list
            </router-link>
            </div>
        </div>
        <div class="flex flex-col xl:flex-row items-center md:items-end py-16 md:py-32 space-x-24 lg:space-x-32 space-y-24 lg:space-y-0 px-12 md:px-24 lg:px-32" v-for="info in data" :key="info.id">
            <div class="flex flex-col items-start text-left w-full xl:w-1/2">
                <div class="text-3xl sm:text-4xl text-slate-600 font-bold pb-2 border-b-2 border-[#244B8E] w-32">Info</div>
                <div class="text-xl sm:text-2xl text-slate-600 pt-8 leading-9 italic font-bold">{{ info.doctor }}</div>
                <div class="text-xl sm:text-2xl text-slate-600 pt-8 leading-9">Look at the schedule of agreed appointments</div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store'
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'

export default {
    name: 'adminScreen',
    data() {
        return {
            store,
            orders: [],
            data: []
        }
    },
    methods: {
    async getOrders() {
      const q = query(collection(db, `ordinations/${store.state.adminOrdiantionId}/orders`),where("time", "==", ""));
      onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.orders.push(doc.data());
          //store.state.currentAdminName = this.ordinations
      });
      store.state.numberOfNewOrders = this.orders.length
      });
    },
    async getOrdinationInfo() {
      const q = query(collection(db, `ordinations`), where('id', '==', store.state.adminOrdiantionId));
      onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.data.push(doc.data());
          console.log(this.data)
      });
      });
      }
    },
    beforeMount() {
    this.getOrders()
    this.getOrdinationInfo()
  }
}
</script>
