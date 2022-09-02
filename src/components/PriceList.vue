<template>
    <div v-show="open">
        <div class="flex justify-center w-full h-[460px] sm:h-[350px] bg-[url('/src/assets/ordinationScreen/background.jpeg')] bg-cover bg-bottom bg-opacity-75 px-6 md:px-24 lg:px-32">
            <div class="flex flex-col pt-24 w-full">
                <div class="flex self-start sm:self-center text-5xl md:text-7xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-8 pt-6 md:pt-0">Price list</div>
                <div class="flex self-center text-3xl md:text-4xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-4">The first examination is free for every service</div>
                <div class="flex self-center text-lg md:text-xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97]">All prices are determined in agreement with the patient after the examination</div>
                <img src="/src/assets/backarrow.svg" class="flex self-start w-8 cursor-pointer py-4" @click="$emit('close')" />
            </div>
        </div>
        <Loading
            :active="isLoading"
            :is-full-page="fullPage"
            :loader="loader"
        />
        <div class="flex justify-center py-12 px-6 md:px-0 lg:px-32">
            <table class="flex flex-col w-full md:w-2/3 xl:w-1/2">
                <thead class="flex bg-[#385B97] text-xl text-slate-100 px-4 py-2 mb-2 rounded-t-2xl">
                    <th class="w-1/2 text-start">Service</th>
                    <th class="w-1/2 text-start">Price</th>
                </thead>
                <div v-for="price in prices" :key="price.id" :name="price.name" :price="price.price" class="flex flex-row justify-between pb-2 space-x-4">
                <tbody class="flex bg-[#EFF4FC] text-md md:text-lg px-4 py-3 w-full transition-all duration-500 ease-out hover:scale-[1.05]">
                    <td class="w-1/2 cursor-default text-left">
                        <tr>{{ price.name }}</tr>
                    </td>
                    <td class="cursor-default">
                        <tr>{{ price.price }}</tr>
                    </td>
                    </tbody>
                </div>
            </table>
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    name: 'PriceList',
    props: {
        open: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            prices: [],
            store,
            isLoading: false,
            fullPage: true,
            loader: 'spinner',
        }
    },
    components: {
        Loading
    },
    methods: {
        async getPriceList() {
            const q = query(collection(db, `ordinations/${store.state.ordinationIdSlider}/priceList`))
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    this.prices.push(change.doc.data())
                    //console.log(this.prices)
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
        this.getPriceList()
    }

}
</script>
