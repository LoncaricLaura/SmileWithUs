<template>
    <div class="flex flex-col items-center w-[280px] md:w-[350px] md:h-[250px] lg:h-[450px] lg:w-[400px] bg-gradient-to-r from-sky-100 to-[#CBDFFF] rounded-lg p-8 transition-all duration-500 ease-out hover:scale-[1.05] shadow-[0_25px_77px_-25px_rgba(0,0,0,0.44)]">
            <div class="text-3xl text-slate-700 font-bold mb-2 mx-0 md:mx-8 lg:mx-0 pb-12">{{ name }}</div>
            <div class="text-2xl text-slate-600 text-left font-medium mb-2 mx-0 md:mx-8 lg:mx-0">{{ desc }}</div>            
    </div>
</template>

<script>
export default {
    name: 'SpecialServicesCard',
    props: ["name", "desc"],
}
</script>