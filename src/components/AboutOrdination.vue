<template>
        <div class="flex flex-row mx-auto bg-[#EFF4FC] rounded-md my-12 md:my-16 p-6 px-6 md:px-12 lg:px-16 shadow-[0_25px_77px_-25px_rgba(0,0,0,0.44)]" 
        :class="open ? 'w-full' : 'w-full lg:w-1/2'">
        <div class="flex flex-col w-full">
            <button type="button" @click="toggle" class="flex flex-row cursor-pointer w-full">
                <div class="text-left text-xl sm:text-3xl lg:text-4xl text-[#385B97] font-bold mx-4 md:mx-24 lg:mx-0 w-full">{{ serviceName }}</div>
                <img src="/src/assets/ordinationScreen/plus.png" class="h-8 md:h-10" :class="open ? 'hidden' : 'block'">
                <img src="/src/assets/ordinationScreen/minus.png" class="h-8 md:h-10" :class="open ? 'block' : 'hidden'">
            </button>
            <div class="transition-all duration-800 ease-in-out pt-4 md:pt-8" :class="open ? 'block' : 'hidden'">
                <div class="text-left text-lg md:text-2xl text-slate-600 font-medium mx-0 md:mx-24 lg:mx-0 pt-3 md:pt-5">{{ desc }}</div>
                <div class="text-left text-lg md:text-2xl text-slate-600 font-medium mx-0 md:mx-24 lg:mx-0 pt-3 md:pt-5">{{ usage }}</div>
                <div class="text-left text-lg md:text-2xl text-slate-600 font-medium mx-0 md:mx-24 lg:mx-0 pt-3 md:pt-5">{{ process }}</div>
                <div class="text-left text-lg md:text-2xl text-slate-600 font-medium mx-0 md:mx-24 lg:mx-0 pt-3 md:pt-5">{{ prostheses }}</div>
                <div class="text-left text-lg md:text-2xl text-slate-600 font-medium mx-0 md:mx-24 lg:mx-0 pt-3 md:pt-5">{{ crowns }}</div>
                <div class="text-left text-lg md:text-2xl text-slate-600 font-medium mx-0 md:mx-24 lg:mx-0 pt-3 md:pt-5">{{ bridges }}</div>
                <div class="flex justify-end"><img :src="`${image}`" class="w-24"></div>
            </div>

        </div>

    </div>
</template>

<script>

export default {
    name: 'AboutOrdination',
    props: ["serviceName", "desc", "usage", "process", "prostheses", "crowns", "bridges", "image"],
    data() {
        return {
            open: false
        }
    },
    methods: {
        toggle() {
            this.open = !this.open
        },

    }
}
</script>
