<template>
    <div class="pt-24 pb-16 mx-6 sm:px-16 md:px-32" :class="[isOpen ? 'blur-lg' : '']">
      <button @click="isOpen = true" class="flex mb-4 ml-auto justify-center bg-gray-700 text-white px-3 py-2 w-24 font-display hover:bg-gray-900 rounded-md">Add</button>
        <FullCalendar 
            v-bind:options="calendarOptions"
        />
    </div>
    <div class="absolute w-full h-full"  @close="isOpen = !IsOpen" :class="isOpen ? 'flex' : 'hidden'">
            <div class="flex flex-col justify-content-center mx-auto mt-44 w-[350px] h-[400px] sm:w-[400px] sm:h-[600px] lg:w-[700px] lg:h-[550px] rounded-xl shadow-2xl bg-white">
                <form class="space-y-10 w-full p-12">
                    <div class="flex flex-col items-start">
                        <div
                            class="text-lg font-bold text-[#244B8E] pb-2"
                        >
                            Full name
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border border-[#CCCCCC] rounded-md"
                            type="text"
                            v-model="title"
                            placeholder="Name Surname"
                            required
                        />
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="flex justify-between items-center">
                            <div
                                class="text-lg font-bold text-[#244B8E] pb-2"
                            >
                                Service
                            </div>
                        </div>
                        <input
                            class="w-full text-black text-md py-2 pl-2 border border-[#CCCCCC] rounded-md"
                            type="text"
                            v-model="service"
                            placeholder="Teeth repair"
                            required
                        />
                    </div>
                <div class="grid justify-items-start my-8 ">
                    <div class="text-md text-black-900 text-left border-b w-full">
                       <p class="pb-[5px]">DATE:</p> 
                      <Datepicker v-model="date" :format="'yyyy-dd-M HH:mm'" :minDate="new Date()" :maxDate="this.maxDate" :disabledWeekDays="[7, 0]" :enableTimePicker="true" placeholder="Select Date" class="cursor-pointer w-full lg:w-1/2 xl:w-full"  />

                    </div>
                </div>
                    <div class="mt-10">
                        <button
                            type="button"
                            @click="addNewOrder(isOpen = false)"
                            :disabled="
                                title && service && start === ''
                            "
                            class="bg-[#385B97] text-white p-4 w-1/3  font-semibold font-display hover:bg-[#244B8E] rounded-full"
                        >
                            Add
                        </button>
                    </div>
                </form>
                <div class="flex justify-end order-first m-4 cursor-pointer">
                  <button type="button" @click="isOpen = false">
                      <img src="/src/assets/close.png" class="h-[25px]" />
                  </button>
            </div>
</div>
    </div>
            
</template>

<script>
import { ref } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getMonth, getYear, subMonths, addMonths } from 'date-fns';
import { onSnapshot, collection, query, where, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { store } from '../store'

const id = ref(10)
export default {
    name: 'appointmentsList',
    components: {
        //VueCal
        FullCalendar,
        Datepicker
    },
    data: () => ({
    events: [],
    store,
    title: '',
    service: '',
    date: new Date().setHours(0, 0, 0),
    maxDate: addMonths(new Date(getYear(new Date()), getMonth(new Date())), 3),
    isOpen: false,
    calendarOptions: {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev today next',
        center: '',
        right: 'dayGridMonth, dayGridWeek, listDay'
      },
      editable: true,
      selectable: true,
      weekends: true,
      events: [],
    },

  }),
    methods: {
      async getOrders() {
        const q = query(collection(db, `ordinations/${store.state.adminOrdiantionId}/orders`),where("time","!=",""));
        onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            this.calendarOptions.events.push(change.doc.data());
        });
        console.log(this.calendarOptions.events);
        
          });
      },
      getSelectedTime(time) {
        time = this.date.toString().split(' ')
        return time[4]
      },
      getSelectedDate(date) {
        date = this.date.toString().split(' ')
        date[1] = ("0" + (this.date.getMonth() + 1)).slice(-2)
        return date[3] + '-' + date[1] + '-' + date[2]
      },
      async addNewOrder() {
        await setDoc(
          doc(
            db,
            `ordinations/${store.state.adminOrdiantionId}/orders/${this.title}`
            ),
            {
              title: this.title,
              service: this.service,
              start: this.getSelectedDate(this.date) + ' ' + this.getSelectedTime(this.date),
              time: this.getSelectedTime(this.date)
            }
          )
      },
      goBack() {
        return this.$router.go(-1)
      },
  },
  beforeMount() {
    this.getOrders()
  }
}
</script>

<style>
.fc .fc-col-header-cell-cushion {
  display: inline-block;
  color: #385B97;
}
.fc {
height: 800px;
}
:root {
  --fc-border-color: #bac9e3;
  --fc-daygrid-event-dot-width: 5px;
}
</style>
