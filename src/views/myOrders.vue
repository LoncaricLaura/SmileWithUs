<template>
    <div class="flex flex-col">
        <div
            class="flex flex-col justify-center items-center w-full h-[400px] lg:h-[350px] bg-[url('/src/assets/ordinationScreen/background.jpeg')] bg-cover bg-bottom bg-opacity-75 px-6 md:px-24 lg:px-32"
        >
            <div
                class="flex flex-col items-start md:items-center text-4xl md:text-6xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold py-12 md:pt-24 md:pb-0"
            >
                My orders
                <p class="font-normal text-2xl pt-4">
                    See your orders in dental offices
                </p>
            </div>
            <img
                src="/src/assets/backarrow.svg"
                class="flex self-start w-8 cursor-pointer"
                @click="goBack()"
            />
        </div>
    </div>
    <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-6 sm:px-12 md:px-16 lg:px-32 py-12 md:py-24 lg:py-32 w-full"
    >
        <div
            class="flex flex-col justify-center items-start py-8 space-y-6 w-full h-[450px] md:h-[500px] lg:h-[400px] bg-[#EFF4FC] transition-all duration-500 ease-out hover:scale-[1.05]"
            v-for="info in orders"
            :key="info.id"
        >
            <div
                class="flex justify-center text-2xl sm:text-2xl text-[#244B8E] font-bold mx-6 sm:mx-8 lg:mx-24 lg:mx-16"
            >
                {{ info.ordination }}
            </div>
            <div
                class="flex justify-center text-2xl sm:text-2xl text-[#244B8E] font-medium mx-6 sm:mx-8 lg:mx-24 lg:mx-16"
            >
                {{ info.title }}
            </div>
            <div
                class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 justify-center text-xl sm:text-xl text-[#244B8E] font-medium mx-6 sm:mx-8 lg:mx-24 lg:mx-16"
            >
                <div class="flex">Identification:</div>
                <div class="font-bold">{{ info.identification }}</div>
            </div>
            <div
                class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 justify-center text-xl sm:text-xl text-[#244B8E] font-medium mx-6 sm:mx-8 lg:mx-24 lg:mx-16"
            >
                <div class="flex">Service:</div>
                <div class="font-bold">{{ info.service }}</div>
            </div>
            <div
                class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 justify-center text-xl sm:text-xl text-[#244B8E] font-medium mx-6 sm:mx-8 lg:mx-24 lg:mx-16"
            >
                <div class="flex">Message:</div>
                <div class="font-bold">{{ info.message }}</div>
            </div>
            <div
                class="flex flex-col lg:flex-row space-x-0 lg:space-x-6 justify-center text-xl sm:text-xl text-[#244B8E] font-medium mx-6 sm:mx-8 lg:mx-24 lg:mx-16"
            >
                <div class="flex">Date & time:</div>
                <div class="font-bold">{{ info.start }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store'
import {
    onSnapshot,
    collection,
    query,
    where,
    setDoc,
    getDocs,
    doc,
} from 'firebase/firestore'
import { db } from '../firebase'
export default {
    name: 'myOrders',
    data() {
        return {
            ordinations: [],
            orders: [],
        }
    },
    methods: {
        async getOrders() {
            const querySnapshot = await getDocs(
                collection(db, `users/${store.state.currentUid}/orders`)
            )
            querySnapshot.forEach((doc) => {
                this.orders.push(doc.data())
                console.log('Orders', doc.data())
            })
        },
        goBack() {
            return this.$router.go(-1)
        },
    },
    beforeMount() {
        this.getOrders()
    },
}
</script>
