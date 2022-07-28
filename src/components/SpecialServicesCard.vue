<template>
    <div class="flex flex-col items-center w-[320px] sm:w-[400px] md:w-[550px] lg:h-[650px] lg:w-[450px] bg-[#EFF4FC] rounded-lg p-8 transition-all duration-500 ease-out hover:scale-[1.05] shadow-[0_25px_77px_-25px_rgba(0,0,0,0.44)] cursor-default">
            <div class="flex text-3xl text-slate-700 font-bold mb-2 mx-0 md:mx-8 lg:mx-0 pb-12">{{ name }}</div>
                <div class="text-xl text-slate-600 text-left font-medium mb-2 mx-0 md:mx-8 lg:mx-0 pb-6">{{ desc }}</div>  
                <img :src="`${image}`" class="h-[200px] md:h-[350px] mix-blend-multiply">
    </div>
</template>

<script>
export default {
    name: 'SpecialServicesCard',
    props: ["name", "desc", "image"],
}
</script>