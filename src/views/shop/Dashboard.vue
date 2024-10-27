<script setup>
import { ref } from 'vue';

const value = ref(0);
const products = ref([
    {
        id: 1,
        image: 'http://septik-burlak.ru/wp-content/uploads/2024/10/furniture_1.png',
        subtitle: 'top collections 2025',
        color: 'rgba(200, 220, 240, 0.88)'
    },
    {
        id: 2,
        image: 'http://septik-burlak.ru/wp-content/uploads/2024/10/pngimg.com-sofa_PNG6920-2-1.png',
        color: 'rgba(127, 255, 212, 0.88)'
    },
    {
        id: 3,
        image: 'http://septik-burlak.ru/wp-content/uploads/2024/10/pngimg.com-table_PNG6970-2.png',
        color: 'rgba(180, 210, 230, 0.88)'
    }
]);
const collections = ref([
    {
        name: 'All',
    },
    {
        name: 'New Arrivals',
    },
    {
        name: 'Furniture',
    },
    {
        name: 'Amrature',
    },
    {
        name: 'Tabble',
    },
    {
        name: 'Chair',
    },
    {
        name: 'Sofa',
    },
    {
        name: 'Mirrors',
    },
    {
        name: 'Stools',
    },
    {
        name: 'Benches',
    },
    {
        name: 'Hot Sale',
    },
]);
</script>

<template>
    <div class="intro flex">
        <div class="intro-collections w-[260px]">
            <ul class="list-none p-0 m-0 flex flex-col bg-[#F7F8FA] w-[260px] text-[#555555] text-sm divide-y divide-surface">
                <li class="py-4 px-7 cursor-pointer" v-for="item in collections">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div class="pl-3 pt-3 flex-auto">
            <div class="bg-[#eee] h-full">
                <main-slider
                    :items="products"
                    :showNavigators="false"
                >
                </main-slider>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style>
