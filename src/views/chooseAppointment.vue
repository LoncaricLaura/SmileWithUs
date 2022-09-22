<template>
    <div class="flex flex-col">
        <div
            class="flex flex-col justify-center items-center w-full h-[480px] lg:h-[380px] bg-[#EFF4FC] bg-opacity-75 pt-0 md:pt-8 px-6 md:px-24 lg:px-32"
        >
            <div
                class="text-5xl md:text-6xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold py-12 mt-8"
            >
                Select an appointment
            </div>
            <div class="text-md md:text-xl text-left text-rose-700 pb-2">
                You will receive an order confirmation by email with accurate
                information about the scheduled appointment.
            </div>
            <div class="text-md md:text-lg text-left text-rose-700">
                If your appointment is not available, the dental office will
                give you the first available appointment
            </div>
            <img
                src="/src/assets/backarrow.svg"
                class="flex self-start w-8 cursor-pointer my-4"
                @click="goBack()"
            />
        </div>
        <div class="flex justify-center w-full px-6 md:px-32 py-6 md:py-12">
            <Datepicker
                v-model="date"
                :format="'yyyy-dd-M'"
                :minDate="new Date()"
                :maxDate="this.maxDate"
                :disabledWeekDays="[7, 0]"
                :enableTimePicker="false"
                placeholder="Select Date"
                class="cursor-pointer w-full lg:w-1/2 xl:w-1/3"
            />
        </div>
        <div class="flex flex-col items-center space-y-2 px-6 md:px-32">
            <div class="">Additional message (optional)</div>
            <input
                v-model="message"
                type="text"
                class="border border-slate-300 rounded-md w-1/3 p-2"
                placeholder="Message..."
                maxlength="150"
            />
        </div>
        <router-link
            to="/sucessOrder"
            @click="setOrder()"
            :disabled="date == ''"
            class="mx-auto bg-[#46669e] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full my-16 cursor-pointer"
        >
            Place an order
        </router-link>
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { getMonth, getYear, addMonths } from 'date-fns'
import { setDoc, doc, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { store } from '../store'

export default {
    name: 'chooseAppointment',
    components: {
        Datepicker,
    },
    data() {
        return {
            date: new Date(),
            maxDate: addMonths(
                new Date(getYear(new Date()), getMonth(new Date())),
                3
            ),
            store,
            message: '',
        }
    },
    methods: {
        getSelectedDate(date) {
            let _date = date.toString().split(' ')
            let getMonthNumber = date.getMonth() + 1
            if (getMonthNumber < 10) getMonthNumber = '0' + getMonthNumber
            return _date[3] + '-' + getMonthNumber + '-' + _date[2]
        },
        async setOrder() {
            store.state.selectedDate = this.getSelectedDate(this.date)
            // console.log(store.state.selectedDate)
            await setDoc(
                doc(
                    db,
                    `ordinations/${store.state.selectedOrdinationId}/orders/${store.state.currentName}`
                ),
                {
                    title: store.state.currentName,
                    service: store.state.selectedService,
                    start: this.getSelectedDate(this.date),
                    time: '',
                    email: store.state.currentUserEmail,
                    identification: store.state.identification,
                    message: this.message,
                    userid: store.state.currentUid,
                    ordination: store.state.selectedOrdination,
                }
            )
            await setDoc(
                doc(
                    db,
                    `users/${store.state.currentUid}/orders/${store.state.selectedOrdinationId}`
                ),
                {
                    title: store.state.currentName,
                    service: store.state.selectedService,
                    start: this.getSelectedDate(this.date),
                    time: '',
                    email: store.state.currentUserEmail,
                    identification: store.state.identification,
                    message: this.message,
                    ordination: store.state.selectedOrdination,
                }
            )
        },
        goBack() {
            return this.$router.go(-1)
        },
    },
    computed: {
        isoDate() {
            return new Date(this.s.expierDate).toISOString().substr(0, 10)
        },
    },
}
</script>

<style scoped>
.dp__theme_light {
    --dp-border-color-hover: #244b8e;
    --dp-text-color: rgb(71 85 105);
    --dp-icon-color: rgb(71 85 105);
    --dp-primary-color: #244b8e;
}
</style>
