<template>
    <div :class="isOpen ? 'hidden' : 'flex flex-col'">
        <div
            class="flex flex-col justify-center items-center w-full h-[600px] lg:h-[550px] bg-[url('/src/assets/ordinationScreen/background.jpeg')] bg-cover bg-bottom bg-opacity-75 px-6 md:px-24 lg:px-32"
        >
            <div
                class="flex flex-col items-start sm:items-center pt-24 lg:pt-32"
            >
                <div
                    class="text-5xl md:text-7xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-8 lg:pb-16 pt-6 md:pt-16 lg:pt-0"
                >
                    {{ name }}
                </div>
                <div
                    class="text-3xl md:text-4xl text-left italic text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-6"
                >
                    {{ doctor }}
                </div>
            </div>
            <div
                class="flex flex-row space-x-3 text-lg md:text-xl md:text-2xl text-left text-[#385B97] pt-6"
            >
                For more information contact us
                <a
                    :href="`tel:${contact}`"
                    class="text-lg md:text-xl md:text-2xl text-left text-teal-500 font-bold hover:underline ml-3"
                    >{{ contact }}</a
                >
                <img src="/src/assets/contact.png" class="h-6 -rotate-12" />
            </div>
            <button
                class="text-lg text-[#EFF4FC] tracking-wide font-bold cursor-pointer bg-[#385B97] hover:bg-[#244B8E] px-4 py-2 mt-12 rounded-full"
                @click="isOpen = true"
            >
                Price List
            </button>
            <img
                src="/src/assets/backarrow.svg"
                class="flex self-start w-8 cursor-pointer py-6"
                @click="goBack()"
            />
        </div>
        <Loading
            :active="isLoading"
            :is-full-page="fullPage"
            :loader="loader"
        />
        <div
            class="px-6 sm:px-12 md:px-24 lg:px-32"
            :class="[isOpen ? 'hidden' : '']"
        >
            <AboutOrdination
                v-for="service in services"
                :key="service.id"
                :serviceName="service.name"
                :desc="service.description"
                :usage="service.usage"
                :process="service.process"
                :prostheses="service.prostheses"
                :crowns="service.crowns"
                :bridges="service.bridges"
                :image="service.image"
            />
        </div>
    </div>

    <PriceList
        :name="name"
        :id="id"
        :open="isOpen"
        @close="isOpen = !isOpen"
        :class="isOpen ? '' : 'hidden'"
    />
</template>

<script>
import { db } from '../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { store } from '../store'
import AboutOrdination from '/src/components/AboutOrdination.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import PriceList from '/src/components/PriceList.vue'

export default {
    name: 'ordinationScreen',
    props: ['name', 'doctor', 'id', 'contact'],
    data() {
        return {
            services: [],
            store,
            isLoading: false,
            fullPage: true,
            loader: 'spinner',
            isOpen: false,
        }
    },
    components: {
        AboutOrdination,
        Loading,
        PriceList,
    },
    methods: {
        getServices() {
            store.state.ordinationIdSlider = this.id
            const q = query(
                collection(
                    db,
                    `ordinations/${store.state.ordinationIdSlider}/services`
                )
            )
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    this.services.push(change.doc.data())
                    console.log(this.services)
                    this.isLoading = false
                })
            })
            this.isLoading = true
        },
        goBack() {
            return this.$router.go(-1)
        },
    },
    beforeMount() {
        this.getServices()
        /*setTimeout(() => {
            this.getServices()
        }, 1000)*/
    },
}
</script>
