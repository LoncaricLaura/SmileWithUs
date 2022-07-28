<template>
    <div>
        <div class="flex justify-center items-center w-full h-[350px] bg-[url('/src/assets/ordinationScreen/background.jpeg')] bg-cover bg-bottom bg-opacity-75 px-6 md:px-24 lg:px-32">
            <div class="flex flex-col items-center pt-24">
                <div class="text-5xl md:text-7xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-8">Price list</div>
                <div class="text-3xl md:text-4xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold pb-4">Free first review for every service</div>
                <div class="text-lg md:text-xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97]">All prices are determined in agreement with the patient after the examination</div>
            </div>
        </div>
        <div class="flex justify-center py-12 px-32">
            <table class="flex flex-col w-1/2">
                <thead class="flex bg-[#385B97] text-xl text-slate-100 px-4 py-2 mb-2 rounded-t-2xl">
                    <th class="w-1/2 text-start">Service</th>
                    <th class="w-1/2 text-start">Price</th>
                </thead>
                <div v-for="price in prices" :key="price.id" :name="price.name" :price="price.price" class="flex flex-row justify-between pb-2 space-x-4">
                <tbody class="flex bg-[#EFF4FC] text-lg px-4 py-3 w-full">
                    <td class="w-1/2">
                        <tr>{{ price.name }}</tr>
                    </td>
                    <td>
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

export default {
    name: 'priceList',
    props: ["id"],
    data() {
        return {
            prices: [],
            store
        }
    },
    methods: {
        async getPriceList() {
            const q = query(collection(db, `ordinations/${this.id}/priceList`))
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    this.prices.push(change.doc.data())
                    console.log(this.prices)
                })
            })
        }

    },
    beforeMount() {
        this.getPriceList()
    }

}
</script>
