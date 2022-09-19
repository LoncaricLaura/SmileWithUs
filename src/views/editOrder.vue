<template>
    <div
        class="mx-auto flex flex-col mt-32 mb-12 sm:mt-32 w-[300px] h-[600px] sm:w-[450px] sm:h-[650px] md:w-[750px] md:h-[650px] rounded-md shadow-2xl"
    >
        <div class="mx-auto max-w-md w-full space-y-8 px-4 sm:px-6">
            <h2
                class="text-left text-xl md:text-3xl font-bold text-[#385B97] pb-4"
            >
                Edit and confirm order
            </h2>
            <div class="mt-12">
                <div class="grid justify-items-center">
                    <div
                        class="flex flex-row items-center space-x-4 text-lg md:text-2xl text-left font-normal text-black-900 border-b w-full pb-4"
                    >
                        <p>{{ title }}</p>
                        <p class="text-xl">{{ identification }}</p>
                    </div>
                </div>
                <div class="flex mt-8">
                    <div
                        class="text-sm md:text-md text-left text-black-900 border-b w-full pb-4"
                    >
                        SERVICE: <b>{{ service }}</b>
                    </div>
                </div>
                <div class="flex mt-8">
                    <div
                        class="text-sm md:text-md text-left text-black-900 border-b w-full pb-4"
                    >
                        MESSAGE: <b>{{ message }}</b>
                    </div>
                </div>
                <div class="flex mt-8">
                    <div
                        class="text-sm md:text-md text-left text-black-900 border-b w-full pb-4"
                    >
                        EMAIL: <b>{{ email }}</b>
                    </div>
                </div>
                <div class="flex flex-row gap-5 w-full">
                    <div class="grid justify-items-start my-8 w-1/2">
                        <div
                            class="text-sm md:text-md text-black-900 text-left border-b w-full"
                        >
                            <p class="pb-[5px]">DATE:</p>
                            <Datepicker
                                v-model="date"
                                :format="'yyyy-dd-M'"
                                :minDate="new Date()"
                                :maxDate="this.maxDate"
                                :disabledWeekDays="[7, 0]"
                                :enableTimePicker="false"
                                :placeholder="`${start}`"
                                class="cursor-pointer w-full tex-black-900"
                            />
                        </div>
                    </div>
                    <form>
                        <div class="grid justify-items-start my-8">
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
                <div class="mt-0 mb-4 md:mt-8 md:mb-4">
                    <button
                        class="bg-teal-500 hover:bg-teal-600 text-white p-3 w-32 rounded-full tracking-wide font-semibold font-display hover:bg-[#244B8E]"
                        type="button"
                        @click="editOrder(goBack())"
                        :disabled="date && time == ''"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
        <div class="flex justify-end order-first m-4 cursor-pointer">
            <button type="button" @click="goBack()">
                <img src="/src/assets/close.png" class="h-[15px] md:h-[25px]" />
            </button>
        </div>
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { getMonth, getYear, addMonths } from 'date-fns'
import { db } from '../firebase'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { store } from '../store'
import emailjs from '@emailjs/browser'

export default {
    name: 'editOrder',
    props: [
        'title',
        'service',
        'start',
        'email',
        'message',
        'identification',
        'id',
        'ordination',
    ],
    data() {
        return {
            date: this.start,
            time: '',
            store,
            maxDate: addMonths(
                new Date(getYear(new Date()), getMonth(new Date())),
                3
            ),
        }
    },
    components: {
        Datepicker,
    },
    methods: {
        goBack() {
            return this.$router.go(-1)
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
                    message: this.message,
                    identification: this.identification,
                    ordination: this.ordination,
                    userid: this.id,
                }
            )
            await setDoc(
                doc(
                    db,
                    `users/${this.id}/orders/${store.state.adminOrdiantionId}`
                ),
                {
                    title: this.title,
                    service: this.service,
                    start: this.getSelectedDate(this.date) + ' ' + this.time,
                    time: this.time,
                    email: this.email,
                    message: this.message,
                    identification: this.identification,
                    ordination: this.ordination,
                }
            )
            alert('Appointment details successfully set')
            const templateParams = {
                currentAdminName: store.state.currentAdminName,
                title: this.title,
                service: this.service,
                start: this.start,
                time: this.time,
                email: this.email,
            }
            await emailjs
                .send(
                    'service_wqgif9z',
                    'template_myfiyd7',
                    templateParams,
                    'bHpqVlWLvmbQh6PAl'
                )
                .then(
                    (res) => {
                        console.log(
                            'The appointment is successfully scheduled!',
                            res.status,
                            res.text
                        )
                    },
                    (e) => {
                        alert('Failed! E-mail confirm not sent!')
                    }
                )
        },
    },
}
</script>
