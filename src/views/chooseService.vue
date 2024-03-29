<template>
    <div class="flex flex-col">
        <div
            class="flex flex-col justify-center items-center w-full h-[350px] bg-[#EFF4FC] bg-opacity-75 pt-0 md:pt-8 px-6 md:px-24 lg:px-32"
        >
            <div
                class="text-5xl md:text-6xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold py-12"
            >
                Select the service you need
            </div>
            <div
                class="text-2xl md:text-4xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold"
            >
                in <i>{{ store.state.selectedOrdination }}</i>
            </div>
            <img
                src="/src/assets/backarrow.svg"
                class="flex self-start w-8 cursor-pointer"
                @click="goBack()"
            />
        </div>
        <div
            class="flex flex-col items-center w-full px-12 md:px-24 lg:px-32 py-12"
        >
            <div class="w-full">
                <RadioGroup v-model="selected">
                    <RadioGroupLabel class="hidden" v-if="selected">{{
                        selected.name
                    }}</RadioGroupLabel>
                    <div
                        class="grid md:grid-cols-2 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-8"
                    >
                        <RadioGroupOption
                            v-for="service in services"
                            :key="service.name"
                            :value="service"
                            v-slot="{ active, checked }"
                        >
                            <div
                                :class="[
                                    active
                                        ? 'ring-2 ring-green-500 ring-offset-2'
                                        : '',
                                    checked
                                        ? 'bg-[#385B97] text-white'
                                        : 'bg-[#EFF4FC] ',
                                ]"
                                class="flex cursor-pointer rounded-lg p-6 shadow-[0_15px_67px_-25px_rgba(0,0,0,0.44)] h-[200px]"
                            >
                                <div
                                    class="flex w-full items-center justify-between"
                                >
                                    <div class="text-2xl text-left">
                                        <RadioGroupLabel
                                            :class="
                                                checked
                                                    ? 'text-white'
                                                    : 'text-slate-700'
                                            "
                                            class="font-medium"
                                        >
                                            {{ service.name }}
                                        </RadioGroupLabel>
                                        <RadioGroupDescription
                                            :class="
                                                checked
                                                    ? 'text-sky-100'
                                                    : 'text-slate-600 italic'
                                            "
                                            class="text-xl text-left pt-4"
                                        >
                                            {{}}
                                        </RadioGroupDescription>
                                    </div>
                                    <div v-show="checked" class="text-white">
                                        <svg
                                            class="h-8 w-8"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="12"
                                                fill="rgb(34, 197, 94)"
                                            />
                                            <path
                                                d="M7 13l3 3 7-7"
                                                stroke="#fff"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </RadioGroupOption>
                    </div>
                </RadioGroup>
            </div>
            <router-link to="/chooseAppointment">
                <button
                    @click="selectService()"
                    :disabled="selected == ''"
                    class="bg-[#46669e] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full mt-16 cursor-pointer"
                >
                    Next
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase'
import { ref } from 'vue'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { store } from '../store'
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
} from '@headlessui/vue'
export default {
    name: 'chooseService',
    data() {
        return {
            services: [],
            store,
        }
    },
    components: {
        RadioGroup,
        RadioGroupLabel,
        RadioGroupDescription,
        RadioGroupOption,
    },
    setup() {
        const selected = ref([])
        const active = ref(false)
        return {
            selected,
            active,
        }
    },
    methods: {
        async getServices() {
            const q = query(
                collection(
                    db,
                    `ordinations/${store.state.selectedOrdinationId}/services`
                )
            )
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    this.services.push(change.doc.data())
                    // console.log(this.services)
                })
            })
        },
        async selectService() {
            store.state.selectedService = this.selected.name
            // console.log(store.selectedService)
        },
        goBack() {
            return this.$router.go(-1)
        },
    },
    beforeMount() {
        this.selectService()
        this.getServices()
    },
}
</script>
