<template>
    <div>
        <div
            class="flex flex-col justify-center items-start md:items-center w-full h-[350px] lg:h-[380px] bg-[#EFF4FC] bg-opacity-75 pt-0 md:pt-8 px-6 md:px-24 lg:px-32"
        >
            <div
                class="text-5xl md:text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold py-12 mt-8"
            >
                Patient
                <p class="text-2xl pt-4 pb-0 md:py-4">{{ title }}</p>
            </div>
            <img
                src="/src/assets/backarrow.svg"
                class="flex self-start w-8 cursor-pointer my-4"
                @click="goBack()"
            />
        </div>
        <div
            class="flex flex-col lg:flex-row justify-between mx-auto my-12 w-full px-6 sm:px-12 md:px-24 lg:px-32 py-6 md:py-12"
            v-for="info in patient"
            :key="info.id"
        >
            <div
                class="flex flex-col justify-between space-y-4 pt-4 px-0 lg:px-12 w-full lg:w-1/4 border-r-none lg:border-r border-slate-300"
            >
                <div class="space-y-4">
                    <div class="text-left text-xl font-normal text-[#244B8E]">
                        {{ info.title }}
                    </div>
                    <div class="text-left text-xl font-normal text-[#244B8E]">
                        Identification: {{ info.identification }}
                    </div>
                    <div class="space-y-4 flex flex-col items-start">
                        <div class="text-xl font-normal text-[#244B8E] pb-2">
                            Service: {{ info.service }}
                        </div>
                        <div class="text-xl font-normal text-[#244B8E] pb-2">
                            Date & time: {{ info.start }}
                        </div>
                        <div
                            class="text-left text-xl font-normal text-[#244B8E] pb-2"
                        >
                            Message: {{ info.message }}
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        @click="deletePatient()"
                        class="flex justify-center items-end bg-[#385B97] text-white p-3 w-full md:w-1/3 font-semibold font-display hover:bg-[#244B8E] rounded-full"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div
                class="flex flex-col justify-between space-y-4 w-full px-0 lg:px-12 md:w-3/4 bg-white h-full"
            >
                <div class="flex flex-col mt-12">
                    <div
                        class="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 items-center"
                    >
                        <div
                            class="flex flex-row items-center space-x-4 text-lg md:text-lg text-left font-normal text-black-900 border-b w-full pb-2"
                        >
                            <p>{{ title }}</p>
                            <p class="text-lg">{{ identification }}</p>
                        </div>
                        <div
                            class="flex justify-start text-sm md:text-md text-left text-black-900 border-b w-full pb-4"
                        >
                            EMAIL:

                            {{ email }}
                        </div>
                    </div>
                    <div class="flex flex-row space-x-4 mt-8">
                        <div
                            class="flex flex-row items-center text-sm md:text-md text-left text-black-900 border-b w-full pb-4"
                        >
                            SERVICE:
                            <select class="w-full p-2" v-model="service">
                                <option value="" disabled selected>
                                    {{ info.service }}
                                </option>
                                <option
                                    :value="service.name"
                                    class="border-slate-300"
                                    v-for="service in services"
                                    :key="service.id"
                                >
                                    {{ service.name }}
                                </option>
                            </select>
                        </div>
                        <div
                            class="flex items-center text-sm md:text-md text-left text-black-900 border-b w-full pb-4"
                        >
                            MESSAGE:

                            {{ message }}
                        </div>
                    </div>

                    <div class="flex flex-row gap-5 pt-6">
                        <div
                            class="text-sm md:text-md text-black-900 text-left w-1/2"
                        >
                            <p class="pb-[5px]">DATE:</p>
                            <Datepicker
                                v-model="date"
                                :format="'yyyy-dd-M'"
                                :minDate="new Date()"
                                :maxDate="this.maxDate"
                                :disabledWeekDays="[7, 0]"
                                :enableTimePicker="false"
                                class="cursor-pointer w-full tex-black-900"
                            />
                        </div>
                        <form class="w-1/2">
                            <div class="grid justify-items-start w-full">
                                <div
                                    class="text-sm md:text-md text-black-900 tracking-wide pb-[5px]"
                                >
                                    TIME
                                </div>
                                <input
                                    v-model="time"
                                    class="w-full text-lg py-2 border-b bg-[#FCFCFF]"
                                    type="time"
                                    min="08:00"
                                    max="16:00"
                                    placeholder="WAUZZZ4BZWN049194"
                                    required
                                    maxlength="17"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div class="flex pt-4">
                    <button
                        class="bg-[#385B97] text-white p-4 w-32 rounded-full tracking-wide font-semibold font-display hover:bg-[#244B8E]"
                        type="button"
                        @click="editOrder()"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    onSnapshot,
    collection,
    query,
    where,
    setDoc,
    getDoc,
    doc,
    deleteDoc,
    Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { store } from '../store'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { getMonth, getYear, addMonths } from 'date-fns'
export default {
    name: 'patientDetails',
    data() {
        return {
            patient: [],
            services: [],
            service: '',
            time: '',
            date: new Date(),
            maxDate: addMonths(
                new Date(getYear(new Date()), getMonth(new Date())),
                3
            ),
            store,
        }
    },
    props: [
        'title',
        'identification',
        'message',
        'email',
        'userid',
        'ordination',
    ],
    components: {
        Datepicker,
    },
    methods: {
        async getPatient() {
            const docRef = doc(
                db,
                `/ordinations/${store.state.adminOrdiantionId}/orders/${this.title}`
            )
            const docSnap = await getDoc(docRef)
            this.patient.push(docSnap.data())

            console.log(this.patient)
        },
        async deletePatient() {
            await deleteDoc(
                doc(
                    db,
                    `ordinations/${store.state.adminOrdiantionId}/orders/${this.title}`
                )
            )
            await deleteDoc(
                doc(
                    db,
                    `users/${this.userid}/orders/${store.state.adminOrdiantionId}`
                )
            )
            alert('Order deleted successful!')
            this.$router.push({ name: 'patientList' })
        },
        async getServices() {
            const q = query(
                collection(
                    db,
                    `ordinations/${store.state.adminOrdiantionId}/services`
                )
            )
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    this.services.push(change.doc.data())
                })
                // console.log('USLUGE', this.services)
            })
        },
        getSelectedDate(date) {
            let _date = date.toString().split(' ')
            let getMonthNumber = date.getMonth() + 1
            if (getMonthNumber < 10) getMonthNumber = '0' + getMonthNumber
            return _date[3] + '-' + getMonthNumber + '-' + _date[2]
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
                    start: this.getSelectedDate(this.date) + ' ' + this.time,
                    time: this.time,
                    email: this.email,
                    identification: this.identification,
                    message: this.message,
                    ordination: this.ordination,
                    userid: this.userid,
                }
            )
            await setDoc(
                doc(
                    db,
                    `users/${this.userid}/orders/${store.state.adminOrdiantionId}`
                ),
                {
                    title: this.title,
                    service: this.service,
                    start: this.getSelectedDate(this.date) + ' ' + this.time,
                    time: this.time,
                    email: this.email,
                    identification: this.identification,
                    message: this.message,
                    ordination: this.ordination,
                }
            )
            alert('Order edit successful!')
            this.$router.push({ name: 'patientList' })
        },
        goBack() {
            return this.$router.go(-1)
        },
    },
    beforeMount() {
        this.getPatient()
        this.getServices()
    },
}
</script>

<style>
::-webkit-input-placeholder {
    color: black;
}
</style>
