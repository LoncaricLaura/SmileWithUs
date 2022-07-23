<template>
<div class="">
    <div class="flex w-full h-[550px] bg-[url('/src/assets/home/homeScreen.png')] bg-cover bg-blend-multiply bg-white top-0">
      <div class="flex flex-col my-auto px-12 md:px-24 lg:px-32 w-full sm:w-3/4 lg:w-2/4 pt-24 lg:pt-24">
          <p class="text-5xl md:text-7xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-16">Solutions in one place for all dental problems</p>
          <router-link to="/login" v-if="!store.state.currentUserEmail"
            class="bg-[#385B97] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full"
            >
            Book an appoitment
          </router-link>
          <router-link to="/chooseOrdination" v-if="store.state.currentUserEmail"
            class="bg-[#385B97] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full"
            >
            Book an appoitment
          </router-link>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row items-center md:items-end py-16 md:py-32 space-x-24 lg:space-x-32 space-y-24 lg:space-y-0 px-12 md:px-24 lg:px-32">
      <div class="flex flex-col items-start text-left w-full lg:w-1/2">
        <div class="text-3xl sm:text-4xl text-slate-600 font-bold pb-2 border-b-2  border-[#244B8E] w-32">About</div>
        <div class="text-xl sm:text-2xl text-slate-600 pt-8 leading-9">We offer dental practices with top teams of experts with many years of experience. Our offices provide superior services using the highest quality materials. Choose your dental practice and place an order. Achieve a healthy and radiant smile with the best care.</div>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-12 md:space-x-24 lg:space-x-24 xl:space-x-32 space-y-6 sm:space-y-0 text-slate-600 w-full lg:w-1/2">
        <div class="flex flex-col space-y-3">  
          <img src="/src/assets/home/ordination.svg" class="w-16 md:w-24 bg-gradient-to-r from-[#83A8E8] to-[#CBDFFF] rounded-full p-4">
          <p class="text-3xl font-bold text-left">10</p>
          <p class="text-md md:text-xl">ORDINATIONS</p>
        </div>
        <div class="flex flex-col space-y-3">
          <img src="/src/assets/home/location.svg" class="w-16 md:w-24 bg-gradient-to-r from-[#83A8E8] to-[#CBDFFF] rounded-full p-4">
          <p class="text-3xl font-bold text-left">15+</p>
          <p class="text-md md:text-xl">PROFFESSIONALS</p>
        </div>
        <div class="flex flex-col space-y-3">
          <img src="/src/assets/home/patient.svg" class="w-16 md:w-24 pb-3 bg-gradient-to-r from-[#83A8E8] to-[#CBDFFF] rounded-full p-4">
          <p class="text-3xl font-bold text-left">200+</p>
          <p class="text-md md:text-xl">HAPPY PATIENTS</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center px-0 lg:px-32 pb-16 bg-[#EFF4FC]">
      <div class="flex justify-center text-4xl text-slate-600 font-bold pt-16 pb-2 border-b-2 border-white">Dental offices</div>
        <div class="grid md:grid-cols-2 md:grid-rows-5 lg:grid-cols-5 lg:grid-rows-2 mt-12 gap-4">
        <OrdinationCard v-for="ordination in ordinations" :key="ordination.id" :name="ordination.name" :doctor="ordination.doctor" :id="ordination.id" />
      </div>
    </div> 
    <div class="flex flex-row place-content-center items-center px-0 lg:px-32 py-32 gap-32">
        <div class="flex flex-row gap-10">
        <SpecialServicesCard v-for="service in specialServices" :key="service.id" :name="service.name" :desc="service.description" />
      </div>
    </div>
  </div>
</template>

<script>
//import OrdinationsSlider from '/src/components/OrdinationsSlider.vue'
import OrdinationCard from '/src/components/OrdinationCard.vue'
import SpecialServicesCard from '/src/components/SpecialServicesCard.vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { store } from '../store'

export default {
  name: 'homeScreen',
  data() {
    return {
      ordinations: [],
      store,
      specialServices: []
    }
  },
  components: {
    OrdinationCard,
    SpecialServicesCard
  },
  methods: {
    async getOrdiantions() {
      const querySnapshot = await getDocs(collection(db, `ordinations`))
      querySnapshot.forEach((doc) => {
        this.ordinations.push(doc.data())
        console.log(doc.data())
      })
    },
    async getSpecialServices() {
      const querySnapshot = await getDocs(collection(db, `specialServices`))
      querySnapshot.forEach((doc) => {
        this.specialServices.push(doc.data())
        console.log(doc.data())
      })
    },
  },
  beforeMount() {
    this.getOrdiantions()
    this.getSpecialServices()
  } 
}
</script>
