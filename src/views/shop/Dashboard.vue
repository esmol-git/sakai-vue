<script setup>
import { getCollections, getFeatures, getIntro, getOffers, getProducts } from '@/api/ProductService';
import Features from '@/components/Features.vue';
import Offers from '@/components/Offers.vue';
import Tranding from '@/components/Tranding.vue';
import { onMounted, ref } from 'vue';
const slider = ref([]);
const collections = ref([])
const features = ref([])
const offers = ref([])
const products = ref([])
const tabs = ref(['Top Products', 'New Arrivals', 'Best Sellers', ]);
const activeTabIndex = ref(0);

const updateTab = (index) => {
    console.log('updateTab', index);
    activeTabIndex.value = index
    if (index === 0) {
        fetchProducts('top')
    } else if (index === 1) {
        fetchProducts('new')
    } else if (index === 2) {
        fetchProducts('best')
    }
}
const fetchIntro = () => {
    getIntro().then((data) => {
        slider.value = data.data[0].carousel
    })
}
const fetchCollections = () => {
    getCollections().then((data) => {
        collections.value = data.data
    })
}
const fetchFeatures = () => {
    getFeatures().then((data) => {
        features.value = data.data
    })
}
const fetchOffers = () => {
    getOffers().then((data) => {
        offers.value = data.data
    })
}
const fetchProducts = (status) => {
    getProducts({name: '', status: status}).then((data) => {
        products.value = data.data
    })
}
onMounted(() => {
    fetchIntro();
    fetchCollections();
    fetchFeatures();
    fetchOffers();
    fetchProducts('top');
});

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
            <div v-if="slider" class="bg-[#eee] h-full">
                <main-slider
                    v-if="slider"
                    :items="slider"
                    :showNavigators="false"
                >
                </main-slider>
            </div>
        </div>
    </div>
    <div>
        <features :items="features"/>
        <offers :items="offers"/>
        <tranding :tabs="tabs" v-model:activeTabIndex="activeTabIndex" @update:modelValue="updateTab">
            <template #default="{ activeTabIndex  }">
                <div v-if="activeTabIndex === 0">
                    <div class="grid grid-cols-4 gap-4">
                        <CardProduct
                            v-for="item in products"
                            :key="item.id"
                            :product="item"
                            variant="detailed"
                            hoverPanel
                        />
                    </div>
                    <!-- <div v-if="loading" class="skeleton-card" v-for="n in 4" :key="n"></div> -->
                </div>
                <div v-if="activeTabIndex === 1">
                    <div class="grid grid-cols-4 gap-4">
                        <CardProduct
                            v-for="item in products"
                            :key="item.id"
                            :product="item"
                            variant="detailed"
                            hoverPanel
                        />
                    </div>
                </div>
                <div v-if="activeTabIndex === 2">
                    <div class="grid grid-cols-4 gap-4">
                        <CardProduct
                            v-for="item in products"
                            :key="item.id"
                            :product="item"
                            variant="detailed"
                            hoverPanel
                        />
                    </div>
                </div>
            </template>
        </tranding>
    </div>
</template>

<style lang="scss">
.skeleton-card {
    width: 100%;
    height: 200px; /* Фиксированная высота для скелетонов */
    background-color: #e0e0e0; /* Цвет скелетона */
    margin-bottom: 16px; /* Отступ между скелетонами */
    border-radius: 4px; /* Закругленные углы */
    animation: pulse 1.5s infinite; /* Пульсация */
}

@keyframes pulse {
    0% {
        background-color: #e0e0e0;
    }
    50% {
        background-color: #c0c0c0;
    }
    100% {
        background-color: #e0e0e0;
    }
}
</style>
