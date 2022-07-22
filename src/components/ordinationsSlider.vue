<template>
    <Splide :options="splide" class="splide">
        <SplideSlide class="splide__track flex justify-center" >
                <ul class="splide__list flex flex-row w-[650px] bg-slate-100 rounded-md">
                    <li class="splide__slide flex flex-col items-center justify-between pt-8 md:pt-12 pb-12 md:pb-6 w-full">
                        <div class="text-3xl text-black font-medium mx-16 md:mx-24 lg:mx-0"></div>
                    </li>
                </ul>
        </SplideSlide>
    </Splide> 

</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

export default {
    name: 'OrdinationsSlider',
    data() {
        return {
            splide: {
                type: 'loop',
                width: '50%',
                height: '300px',
                perPage: 1,
                arrows: true,
                pagination: false,
                rewind: true,
                gap: -90,
                rewindspeed:5000,
                breakpoints: {
                    1024: {
                        perPage: 1,
                        width: '75%'
                    },
                    768: {
                        rewind: false,
                        focus: 'center',
                        pagination: 'slider',
                        perMove: 1,
                        arrows: false,
                        width: '100%',
                        height: '250px'
                    }
                } 
            }
        }
    },
    components: {
        Splide,
        SplideSlide,
    },

}
</script>