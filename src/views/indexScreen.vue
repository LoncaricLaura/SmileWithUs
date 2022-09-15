<template>
    <div class="">
        <div
            class="flex w-full h-[500px] sm:h-[550px] bg-[url('/src/assets/home/homeScreen.png')] bg-cover bg-blend-multiply bg-white top-0"
        >
            <div
                class="flex flex-col my-auto px-12 md:px-24 lg:px-32 w-full xl:w-2/4 pt-12 lg:pt-24"
            >
                <div
                    class="hidden md:flex flex-row items-center text-2xl md:text-3xl text-slate-700 font-bold pb-6 space-x-3 pt-8 lg:pt-0"
                    v-if="store.state.currentName"
                >
                    <div>Hi,</div>
                    <div class="italic">{{ store.state.currentName }}</div>
                </div>
                <p
                    class="text-5xl md:text-7xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-16"
                >
                    Solutions in one place for all dental problems
                </p>
                <router-link
                    to="/login"
                    v-if="!store.state.currentUserEmail"
                    class="bg-[#385B97] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full"
                >
                    Book an appoitment
                </router-link>
                <router-link
                    to="/chooseordination"
                    v-if="store.state.currentUserEmail"
                    class="bg-[#385B97] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full"
                >
                    Book an appoitment
                </router-link>
            </div>
        </div>
        <div
            class="flex flex-col xl:flex-row items-center md:items-end py-16 md:py-32 space-x-24 lg:space-x-32 space-y-0 lg:space-y-0 px-12 md:px-24 lg:px-32"
        >
            <div class="flex flex-col items-start text-left w-full xl:w-1/2">
                <div
                    class="text-3xl sm:text-4xl text-slate-600 font-bold pb-2 border-b-2 border-[#244B8E] w-32"
                >
                    About
                </div>
                <div class="text-xl sm:text-2xl text-slate-600 pt-8 leading-9">
                    We offer dental practices with top teams of experts with
                    many years of experience. Our offices provide superior
                    services using the highest quality materials. Choose your
                    dental practice and place an order. Achieve a healthy and
                    radiant smile with the best care.
                </div>
            </div>
            <div
                class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-12 md:space-x-24 lg:space-x-24 xl:space-x-32 space-y-6 sm:space-y-0 xl:space-y-0 pt-12 xl:pt-0 text-slate-600 w-full xl:w-1/2"
            >
                <div class="flex flex-col space-y-3">
                    <img
                        src="/src/assets/home/ordination.svg"
                        class="w-16 md:w-24 bg-gradient-to-r from-[#83A8E8] to-[#CBDFFF] rounded-full p-4"
                    />
                    <p class="text-3xl font-bold text-left">10</p>
                    <p class="text-md md:text-xl">ORDINATIONS</p>
                </div>
                <div class="flex flex-col space-y-3">
                    <img
                        src="/src/assets/home/location.svg"
                        class="w-16 md:w-24 bg-gradient-to-r from-[#83A8E8] to-[#CBDFFF] rounded-full p-4"
                    />
                    <p class="text-3xl font-bold text-left">15+</p>
                    <p class="text-md md:text-xl">PROFFESSIONALS</p>
                </div>
                <div class="flex flex-col space-y-3">
                    <img
                        src="/src/assets/home/patient.svg"
                        class="w-16 md:w-24 pb-3 bg-gradient-to-r from-[#83A8E8] to-[#CBDFFF] rounded-full p-4"
                    />
                    <p class="text-3xl font-bold text-left">200+</p>
                    <p class="text-md md:text-xl">HAPPY PATIENTS</p>
                </div>
            </div>
        </div>
        <div
            id="dental-offices"
            class="flex flex-col items-end px-0 md:px-32 xl:pl-48 xl:pr-12 py-16 xl:bg-[url('/src/assets/home/background.jpg')] xl:bg-contain xl:bg-no-repeat bg-left bg-blend-darken bg-[#EFF4FC]"
        >
            <div
                class="flex justify-center text-3xl sm:text-4xl text-slate-600 font-bold py-2 w-full xl:w-1/2"
            >
                Dental offices
            </div>
            <div
                class="flex lg:justify-center xl:justify-end py-8 sm:py-16 mt-8 w-full"
            >
                <OrdinationsSlider :ordinations="ordinations" />
            </div>
        </div>
        <div
            id="special-services"
            class="flex flex-col items-center px-6 md:px-16 lg:px-32 py-24 lg:pt-24 lg:pb-32 gap-16 md:gap-24"
        >
            <div
                class="flex justify-start text-3xl sm:text-4xl text-slate-600 font-bold pb-2"
            >
                Special services we offer
            </div>
            <div class="flex flex-col xl:flex-row gap-6">
                <SpecialServicesCard
                    v-for="service in specialServices"
                    :key="service.id"
                    :name="service.name"
                    :desc="service.description"
                    :image="service.image"
                />
            </div>
        </div>
    </div>
</template>

<script>
import OrdinationsSlider from '/src/components/OrdinationsSlider.vue'
//import OrdinationCard from '/src/components/OrdinationCard.vue'
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
            specialServices: [],
        }
    },
    components: {
        SpecialServicesCard,
        OrdinationsSlider,
    },
    methods: {
        async getOrdiantions() {
            const querySnapshot = await getDocs(collection(db, `ordinations`))
            querySnapshot.forEach((doc) => {
                this.ordinations.push(doc.data())
                // console.log(doc.data())
            })
        },
        async getSpecialServices() {
            const querySnapshot = await getDocs(
                collection(db, `specialServices`)
            )
            querySnapshot.forEach((doc) => {
                this.specialServices.push(doc.data())
                // console.log(doc.data())
            })
        },
    },
    beforeMount() {
        this.getOrdiantions()
        this.getSpecialServices()
    },
}
</script>
