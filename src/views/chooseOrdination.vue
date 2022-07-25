<template>
    <div class="flex flex-col">
        <div class="flex justify-center items-center w-full h-[400px] bg-[#EFF4FC] bg-opacity-75 pt-0 md:pt-8 px-6 md:px-24 lg:px-32">
            <div class="text-5xl md:text-6xl text-left text-transparent bg-clip-text bg-gradient-to-r from-[#244B8E] to-[#385B97] font-bold py-16">Choose your dream dental office!</div>
        </div>
        <div class="w-full px-12 md:px-24 lg:px-32 py-16">
            <div class=" mx-auto w-full">
                <RadioGroup v-model="selected">
                    <RadioGroupLabel class="hidden" v-if="selected">{{ selected.name }}</RadioGroupLabel>
                    <div class="grid md:grid-cols-2 md:grid-rows-5 xl:grid-cols-5 xl:grid-rows-2 gap-4 lg:gap-8">
                        <RadioGroupOption
                            v-for="ordination in ordinations"
                            :key="ordination.name"
                            :name="ordination.name" :id="ordination.id"
                            :value="ordination"
                            v-slot="{ active, checked }"
                        >
                            <div
                            :class="[
                                active
                                ? 'ring-2 ring-green-500 ring-offset-2'
                                : '',
                                checked ? 'bg-[#385B97] text-white' : 'bg-[#EFF4FC] ',
                            ]"
                            class="flex cursor-pointer rounded-lg p-6 shadow-[0_15px_67px_-25px_rgba(0,0,0,0.44)] h-[200px]"
                            >
                                <div class="flex w-full items-center justify-between">
                                    <div class="text-2xl text-left">
                                        <RadioGroupLabel
                                        :class="checked ? 'text-white' : 'text-slate-700'"
                                        class="font-medium"
                                        >
                                        {{ ordination.name }}
                                        </RadioGroupLabel>
                                        <RadioGroupDescription
                                        :class="checked ? 'text-sky-100' : 'text-slate-600 italic'"
                                        class="text-xl text-left pt-4"
                                        >
                                        {{ ordination.doctor }}
                                        </RadioGroupDescription>
                                    </div>
                                    <div v-show="checked" class="text-white">
                                        <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
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
            <router-link to="/chooseService">
                <button @click="selectOrdination()" :disabled="selected == ''" class="bg-[#385B97] text-white text-md sm:text-xl text-center p-3 w-64 font-semibold font-display hover:bg-[#244B8E] rounded-full mt-16 cursor-pointer">
                    Next
                </button>
            </router-link>
        </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { store } from '../store'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'

export default {
  name: 'chooseOrdination',
  data() {
    return {
      ordinations: [],
      store,
    }
  },
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption
  },
  setup() {
    const selected = ref([])
    const active = ref(false)
    return {
        selected,
        active 
    }
  },
  methods: {
    async getOrdiantions() {
      const querySnapshot = await getDocs(collection(db, `ordinations`))
      querySnapshot.forEach((doc) => {
        this.ordinations.push(doc.data())
        console.log(doc.data())
      })
    },
    async selectOrdination() {
        store.state.selectedOrdination = this.selected.name
        store.state.selectedOrdinationId = this.selected.id
        //localStorage.setItem('selectedOrdination', this.selected.name)
        console.log(store.state.selectedOrdination, store.state.selectedOrdinationId)
    }
  },
  beforeMount() {
    this.selectOrdination()
    this.getOrdiantions()
  } 
}
</script>