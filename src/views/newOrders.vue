<template>
    <div class="px-6 sm:px-12 md:px-32 pt-32 lg:pt-36">
        <div
            class="flex justify-start text-3xl text-slate-700 font-medium mb-2 mx-0 md:mx-8 lg:mx-0"
        >
            New orders
        </div>
        <div
            class="flex justify-start text-xl text-slate-700 mb-2 mx-0 md:mx-8 lg:mx-0"
        >
            Confirm scheduled orders
        </div>
        <div class="flex flex-col sm:flex-row gap-6 py-8 sm:py-16">
            <div
                class="flex flex-col justify-between items-start w-[280px] md:w-[400px] md:h-[250px] lg:h-[250px] bg-[#EFF4FC] rounded-md pt-8 pb-2 px-8 transition-all duration-500 ease-out hover:scale-[1.05] shadow-[0_25px_77px_-25px_rgba(0,0,0,0.44)] cursor-default"
                v-for="order in orders"
                :key="order.id"
                :title="order.title"
                :service="order.service"
                :start="order.start"
                :email="order.email"
                :message="order.message"
                :identification="order.identification"
                :id="order.userid"
                :ordination="order.ordination"
            >
                <div
                    class="text-xl text-left text-black font-medium mb-2 mx-0 md:mx-8 lg:mx-0 w-full pb-2"
                >
                    {{ order.title }}: {{ order.identification }}
                </div>
                <div
                    class="text-xl text-left text-black font-medium mb-2 mx-0 md:mx-8 lg:mx-0 w-full pb-2"
                >
                    {{ order.service }}
                </div>
                <div
                    class="text-lg text-left text-black font-medium mb-2 mx-0 md:mx-8 lg:mx-0 w-full pb-2"
                >
                    {{ order.start }}
                </div>
                <router-link
                    :to="{
                        name: 'editorder',
                        params: {
                            title: order.title,
                            service: order.service,
                            start: order.start,
                            email: order.email,
                            message: order.message,
                            identification: order.identification,
                            id: order.userid,
                            ordination: order.ordination,
                        },
                    }"
                    class="flex self-end gap-2 text-lg text-[#244B8E] hover:font-bold font-medium mb-2 mx-0 md:mx-8 lg:mx-0 cursor-pointer px-4"
                >
                    <p>Edit</p>
                    <img src="/src/assets/edit.svg" class="h-6 my-auto" />
                </router-link>
            </div>
        </div>
        <div v-if="error" class="italic">{{ error }}</div>
    </div>
</template>

<script>
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { store } from '../store'

export default {
    name: 'newOrders',
    data: () => ({
        orders: [],
        store,
        error: null,
    }),
    methods: {
        async getOrders() {
            const q = query(
                collection(
                    db,
                    `ordinations/${store.state.adminOrdiantionId}/orders`
                ),
                where('time', '==', '')
            )
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.orders.push(doc.data())
                    //store.state.currentAdminName = this.ordinations
                })
                if (this.orders.length === 0) {
                    this.error = 'No new orders'
                }
            })
        },
    },
    beforeMount() {
        this.getOrders()
    },
}
</script>
