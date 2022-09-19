<template>
    <div>
        <div
            class="flex flex-col justify-center items-start md:items-center w-full h-[280px] lg:h-[350px] bg-[#EFF4FC] bg-opacity-75 pt-0 md:pt-8 px-6 md:px-24 lg:px-32"
        >
            <div
                class="text-5xl md:text-6xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold py-12 mt-8"
            >
                Patient list
            </div>
        </div>
        <div class="py-12">
            <div
                class="flex flex-col justify-start items-center space-y-6 px-6 md:px-0 lg:px-32"
            >
                <div
                    class="flex flex row justify-between space-x-4 w-full md:w-1/2 px-4 text-md font-bold"
                >
                    <div class="text-left w-1/3">Full name</div>
                    <div class="text-left">Identification</div>
                    <div class="text-lef w-1/3"></div>
                </div>
                <div
                    class="flex flex-row justify-between pb-2 space-x-4 w-full md:w-1/2"
                    v-for="patient in patients"
                    :key="patient.id"
                >
                    <div
                        class="flex bg-[#EFF4FC] text-md md:text-lg px-4 py-3 w-full transition-all duration-500 ease-out hover:scale-[1.05]"
                    >
                        <div class="w-1/3 cursor-pointer text-left">
                            <div>
                                {{ patient.title }}
                            </div>
                        </div>
                        <div class="w-1/3 cursor-pointer">
                            <div>
                                {{ patient.identification }}
                            </div>
                        </div>
                        <div class="w-1/3 cursor-pointer flex justify-end">
                            <div class="flex flex-row space-x-2">
                                <router-link
                                    :to="{
                                        name: 'patientDetails',
                                        params: {
                                            title: patient.title,
                                            identification:
                                                patient.identification,
                                            email: patient.email,
                                            service: patient.service,
                                            message: patient.message,
                                            userid: patient.userid,
                                            ordination: patient.ordination,
                                        },
                                    }"
                                    class="flex flex-row mx-auto rounded-md px-2 text-slate-700 hover:text-[#244B8E] hover:font-bold"
                                >
                                    Details
                                </router-link>
                            </div>
                        </div>
                    </div>
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
    name: 'patientList',
    data() {
        return {
            patients: [],
            isOpen: false,
            open: false,
            service: '',
            services: [],
            time: Timestamp,
            email: '',
            message: '',
            identification: '',
        }
    },
    components: {
        // Datepicker,
    },
    methods: {
        async getPatients() {
            const q = query(
                collection(
                    db,
                    `ordinations/${store.state.adminOrdiantionId}/orders`
                ),
                where('time', '!=', '')
            )
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    this.patients.push(change.doc.data())
                })
            })
            console.log(this.patients)
        },
        async deletePatient(title) {
            await deleteDoc(
                doc(
                    db,
                    `ordinations/${store.state.adminOrdiantionId}/orders/${title}`
                )
            )
        },
        getSelectedDate(date) {
            let _date = date.toString().split(' ')
            let getMonthNumber = date.getMonth() + 1
            if (getMonthNumber < 10) getMonthNumber = '0' + getMonthNumber
            return _date[3] + '-' + getMonthNumber + '-' + _date[2]
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
                console.log('USLUGE', this.services)
            })
        },
        toggle() {
            this.isOpen = !this.isOpen
        },
    },
    beforeMount() {
        this.getPatients()
        this.getServices()
    },
}
</script>
