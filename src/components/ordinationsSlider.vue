<template>
    <Splide :options="splide" class="splide">
        <SplideSlide
            class="splide__track flex justify-center"
            v-for="(ordination, i) in ordinations"
            :key="i"
        >
            <ul
                class="splide__list flex flex-row flex-wrap w-screen md:w-[650px] bg-[#385B97] rounded-md"
            >
                <li
                    class="splide__slide flex flex-col items-center justify-between pt-8 md:pt-12 pb-16 md:pb-12 w-full"
                >
                    <div
                        class="flex flex-wrap text-2xl sm:text-3xl text-slate-100 font-medium mx-6 sm:mx-8 md:mx-24 lg:mx-16"
                    >
                        {{ ordination.name }}
                    </div>
                    <div
                        class="text-xl sm:text-2xl text-slate-100 font-medium mx-6 sm:mx-16 md:mx-24 lg:mx-16 italic"
                    >
                        {{ ordination.doctor }}
                    </div>
                    <router-link
                        :to="{
                            name: 'ordinationScreen',
                            params: {
                                name: ordination.name,
                                doctor: ordination.doctor,
                                id: ordination.id,
                                contact: ordination.contact,
                            },
                        }"
                        class="flex justify-center bg-slate-100 text-[#385B97] text-lg font-bold p-2 rounded-full w-[150px]"
                        >SEE MORE</router-link
                    >
                </li>
            </ul>
        </SplideSlide>
    </Splide>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import { store } from '../store'

export default {
    name: 'OrdinationsSlider',
    props: {
        ordinations: {
            type: Array,
        },
    },
    data() {
        return {
            store,
            splide: {
                type: 'loop',
                width: '50%',
                height: '350px',
                perPage: 1,
                arrows: true,
                pagination: false,
                rewind: true,
                gap: -90,
                rewindspeed: 5000,
                breakpoints: {
                    1250: {
                        perPage: 1,
                        width: '100%',
                    },
                    768: {
                        rewind: false,
                        focus: 'center',
                        pagination: 'slider',
                        perMove: 1,
                        arrows: false,
                        width: '100%',
                    },
                },
            },
        }
    },
    components: {
        Splide,
        SplideSlide,
    },
}
</script>

<style scoped>
@media (max-width: 768px) {
    .splide-list {
        width: 100%;
    }
}
</style>
