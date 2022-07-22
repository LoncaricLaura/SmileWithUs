<template>
    <div class="flex flex-col justify-between items-center w-[280px] md:w-[350px] md:h-[250px] lg:h-[200px] bg-[#385B97] rounded-lg p-8 transition-all duration-500 ease-out hover:scale-[1.05] shadow-[0_25px_77px_-25px_rgba(0,0,0,0.44)]">
            <div class="text-2xl text-slate-100 font-medium mb-2 mx-0 md:mx-8 lg:mx-0">{{ name }}</div>
            <router-link :to="{ name: 'ordinationScreen', params: { name: name, doctor: doctor, id: id}, }" class="flex justify-center bg-slate-100 text-slate-700 font-bold p-2 rounded-full w-[150px]">SEE MORE</router-link>

    </div>
</template>

<script>
export default {
    name: 'OrdinationCard',
    props: ["name", "doctor", "id"],
}
</script>
