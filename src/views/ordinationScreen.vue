<template>
<div>
    <div class="flex flex-col justify-center items-center w-full h-[550px] bg-[url('/src/assets/ordinationScreen/background.jpeg')] bg-cover bg-bottom bg-opacity-75 px-6 md:px-24 lg:px-32">
        <div class="flex flex-col items-center pt-24">
            <div class="text-5xl md:text-7xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-16">{{ name }}</div>
            <div class="text-3xl md:text-4xl text-left italic text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-12">{{ doctor }}</div>
            <router-link :to="{ name: 'priceList', params: { name: name, id: id}, }"  class="text-lg text-[#EFF4FC] tracking-wide font-bold cursor-pointer bg-[#385B97] hover:bg-[#244B8E] py-2 px-4 rounded-full">Price list</router-link>
        </div>
        <div class="text-lg md:text-xl md:text-4xl text-left text-[#385B97] pt-12">For more information contact us 
            <a :href="`tel:${contact}`" class="text-lg md:text-xl md:text-4xl text-left text-[#385B97] pt-12 hover:underline">{{ contact }}</a>
        </div>
    </div>
    <div class="px-6 sm:px-12 md:px-24 lg:px-32">
        <AboutOrdination v-for="service in services" :key="service.id" :serviceName="service.name" :desc="service.description" :usage="service.usage" :process="service.process" :prostheses="service.prostheses" :crowns="service.crowns" :bridges="service.bridges" :image="service.image" />
    </div>
</div>
</template>

<script>
import { db } from '../firebase'
import {
    collection,
    query,
    onSnapshot
} from 'firebase/firestore'
import { store } from '../store'
import AboutOrdination from '/src/components/AboutOrdination.vue'

export default {
    name: 'OrdinationScreen',
    props: ["name", "doctor", "id", "contact"],
    data() {
        return {
            services: [],
            store
        }
    },
    components: {
        AboutOrdination
    },
    methods: {
        async getServices() {
            const q = query(collection(db, `ordinations/${this.id}/services`))
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    this.services.push(change.doc.data())
                    console.log(this.services)
                })
            })
        },
    },
    beforeMount() {
        this.getServices()
    }
}
</script>
