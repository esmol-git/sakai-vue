<script setup>
import { getCollections, getFeatures, getIntro, getOffers, getProducts } from '@/api/ProductService';
import Features from '@/components/Features.vue';
import Offers from '@/components/Offers.vue';
import IntroSection from '@/components/sections/IntroSection.vue';
import ProductsSection from '@/components/sections/ProductsSection.vue';
import ReviewSection from '@/components/sections/ReviewSection.vue';
import SpecialOfferSection from '@/components/sections/SpecialOfferSection.vue';
import { onMounted, ref } from 'vue';
const slider = ref([]);
const collections = ref([])
const features = ref([])
const offers = ref([])
const offersSpecial = ref([])
const products = ref([])
const tabs = ref(['Top Products', 'New Arrivals', 'Best Sellers', ]);
const tabs2 = ref(['All Products', 'Best Sellers', 'New Arrivals',
 'Todays Details', ]);
const activeTabIndex = ref(0);
const activeTabIndex2 = ref(0);

const updateTab2 = (index) => {
    activeTabIndex2.value = index
}

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
        offers.value = data.data ? data.data[0].offers : []
        offersSpecial.value = data.data ? data.data[0].special : []
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
    fetchProducts();
});

</script>

<template>
    <div class="intro flex">
        <intro-section :menu="collections"></intro-section>
    </div>
    <div>
        <features :items="features"/>
        <offers :items="offers"/>
        <products-section 
            title="Trendings" 
            :tabs="tabs" 
            v-model:activeTabIndex="activeTabIndex" 
            @update:modelValue="updateTab"
        >
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
        </products-section>
        <SpecialOfferSection title="Special Offer" :items="offersSpecial" />
        <products-section 
            :tabs="tabs2" 
            title="Our Products"
            v-model:activeTabIndex="activeTabIndex2" 
            @update:modelValue="updateTab2"
        >
            <div class="grid grid-cols-4 gap-4">
                <CardProduct
                    v-for="item in products"
                    :key="item.id"
                    :product="item"
                    variant="detailed"
                    hoverPanel
                />
            </div>
        </products-section>
        <review-section title="What Our Customer Says" />
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
