<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    items: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="partners">
        <h3 class="main__title">{{ title }}</h3>
        <div class="partners__wrapper">
            <main-slider
                :items="items"
                :showIndicators="false"
                :showNavigators="false"
                :numVisibleItems="5"
                :numScrollItems="1"
                :autoplayInterval="3000"
                :circular="true"
            >
                <template #item="slotProps">
                    <div class="partners__item">
                        <img :src="slotProps.data.logo" alt="Partner">
                    </div>
                </template>
            </main-slider>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.partners {
    padding: 70px 0;
    &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 200px;
        height: 100px;
        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
        }
    }
}
</style>
