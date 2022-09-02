<template>
    <div
        class="mx-auto flex flex-col mt-36 w-[350px] h-[450px] sm:w-[400px] sm:h-[650px] lg:w-[750px] lg:h-[600px] rounded-3xl shadow-2xl " 
    >
        <div class="mx-auto max-w-md w-full space-y-8 px-4 sm:px-0">
            <h2 class="text-left text-3xl font-bold text-[#385B97] pb-4">
                Confirm order
            </h2>
            <div class="mt-12">
                <div class="grid justify-items-center">
                    <div
                        class="text-2xl text-left font-bold text-black-900 border-b w-full pb-4"
                    >
                        {{ title }}
                    </div>
                </div>
                <div class="flex mt-8">
                    <div class="text-md text-left text-black-900 border-b w-full pb-4">
                        SERVICE: <b>{{ service }}</b>
                    </div>
                </div>
                <div class="flex mt-8">
                    <div class="text-md text-left text-black-900 border-b w-full pb-4">
                        EMAIL: <b>{{ email }}</b>
                    </div>
                </div>
                <div class="flex flex-row gap-5 w-full">
                <div class="grid justify-items-start my-8 w-1/2">
                    <div class="text-md text-black-900 text-left border-b w-full">
                       <p class="pb-[5px]">DATE:</p> 
                       <p class="font-bold py-2">{{ start }}</p>
                    </div>
                </div>
                <form>
                    <div class="grid justify-items-start my-8">
                        <div
                            class="text-md text-black-900 tracking-wide pb-[5px]"
                        >
                            TIME
                        </div>
                        <input
                            v-model="time"
                            class="w-full text-lg py-2 border-b bg-[#FCFCFF]"
                            type="time"
                            min="08:00" max="16:00"
                            placeholder="WAUZZZ4BZWN049194"
                            required
                            maxlength="17"
                        />

                </div>
                </form>
                </div>   
                <div class="mt-8">
                    <button
                        class="bg-[#385B97] text-white p-4 w-32 rounded-full tracking-wide font-semibold font-display hover:bg-[#244B8E]"
                        type="button"
                        @click="editOrder(goBack())"
                    >
                        Confirm 
                    </button>
                </div>
            </div>
        </div>
        <div class="flex justify-end order-first m-4 cursor-pointer">
            <button type="button" @click="goBack()">
                <img src="/src/assets/close.png" class="h-[25px]" />
            </button>
        </div>
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase'
import { doc, setDoc, Timestamp } from "firebase/firestore"; 
import { store } from '../store'
import emailjs from '@emailjs/browser'

export default {
    name: "editOrder",
    props: ["title", "service", "start", "email"],
    data() {
        return {
            time: Timestamp,
            store
        }
    },
    methods: {
        goBack() {
            return this.$router.go(-1)
        },
        async editOrder() {
            await setDoc(
                doc(
                    db,
                    `ordinations/${store.state.adminOrdiantionId}/orders/${this.title}`
                ),
                {
                    title: this.title,
                    service: this.service,
                    start: this.start + ' ' + this.time,
                    time: this.time,
                    email: this.email
                }
            )
            const templateParams = {
                currentAdminName: store.state.currentAdminName,
                title: this.title,
                service: this.service,
                start: this.start,
                time: this.time,
                email: this.email
            }
            await emailjs
                .send(
                    'service_wqgif9z', 'template_myfiyd7', templateParams, 'bHpqVlWLvmbQh6PAl'
                )
                .then(
                    (res) => {
                        console.log('The appointment is successfully scheduled!', res.status, res.text)
                    },
                    (e) => {
                        alert('Failed! E-mail confirm not sent!')
                    }
                )
        }
    }
}
</script>
