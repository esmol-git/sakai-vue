<script setup>
import { getArticles, getCollections, getFeatures, getIntro, getOffers, getPartners, getProducts, getReviews } from '@/api/ProductService';
import { onMounted, ref } from 'vue';
const slider = ref([]);
const collections = ref([])
const features = ref([])
const offers = ref([])
const offersSpecial = ref([])
const products = ref([])
const products2 = ref([])
const reviews = ref([])
const articles = ref([])
const partners = ref([])
const tabs = ref(['Top Products', 'New Arrivals', 'Best Sellers']);
const tabs2 = ref(['All Products', 'Best Sellers', 'New Arrivals', 'Todays Details']);
const activeTabIndex = ref(0);
const activeTabIndex2 = ref(0);

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
const fetchProducts2 = (status) => {
    getProducts({name: '', status: status}).then((data) => {
        products2.value = data.data
    })
}
const fetchReviews = () => {
    getReviews().then((data) => {
        reviews.value = data.data
    })
}
const fetchArticles = () => {
    getArticles().then((data) => {
        articles.value = data.data
    })
}
const fetchPartners = () => {
    getPartners().then((data) => {
        partners.value = data.data
    })
}

const handleTabChange = (index) => {
    let tabValue;
    if (index === 0) {
        tabValue = 'top';
    } else if (index === 1) {
        tabValue = 'sale';
    } else if (index === 2) {
        tabValue = 'new';
    }
    activeTabIndex.value = index;
    fetchProducts(tabValue);
}
const handleTabChange2 = (index) => {
    let tabValue;
    if (index === 0) {
        tabValue = null;
    } else if (index === 1) {
        tabValue = 'sale';
    } else if (index === 2) {
        tabValue = 'new';
    } else if (index === 3) {
        tabValue = 'top';
    }
    activeTabIndex2.value = index;
    fetchProducts2(tabValue);
}
onMounted(() => {
    fetchIntro();
    fetchCollections();
    fetchFeatures();
    fetchOffers();
    fetchProducts('top');
    fetchProducts2();
    fetchReviews();
    fetchArticles();
    fetchPartners();
})

</script>

<template>
    <div class="dashboard">
        <intro-section v-if="slider.length > 0" :menu="collections" :sliderItems="slider"></intro-section>
        <features-section :items="features"/>
        <offers-section :items="offers"/>
        <partners-section title="Partners" :items="partners"></partners-section>
        <products-section
            :tabs="tabs"
            title="Our Products"
            :products="products"
            v-model:activeTabIndex="activeTabIndex"
            @update:modelValue="handleTabChange"
        />
        <special-offer-section title="Special Offer" :items="offersSpecial" />
        <products-section
            :tabs="tabs2"
            title="Our Products"
            :products="products2"
            v-model:activeTabIndex="activeTabIndex2"
            @update:modelValue="handleTabChange2"
        />
        <review-section title="What Our Customer Says" :items="reviews" />
        <articles-section title="Our Latest Articles" :items="articles" />
    </div>
</template>

<style lang="scss">

</style>
