<script setup>
const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    numVisibleItems: {
        type: Number,
        default: 1
    },
    numScrollItems: {
        type: Number,
        default: 1
    },
    showNavigators: {
        type: Boolean,
        default: true
    },
    showIndicators: {
        type: Boolean,
        default: true
    },
    autoplayInterval: {
        type: Number,
        default: 0
    },
    circular: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <Carousel
        :value="items"
        :numVisible="numVisibleItems"
        :numScroll="numScrollItems"
        :showNavigators="showNavigators"
        :showIndicators="showIndicators"
        :autoplayInterval="autoplayInterval"
        :circular="circular"
        class="carousel"
    >
        <template #item="data">
            <slot name="item" :data="data.data"></slot>
        </template>
    </Carousel>
</template>

<style lang="scss" scoped>
    .carousel {
        position: relative;
        ::v-deep .p-carousel-indicator-list {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
        }
        ::v-deep .p-carousel-indicator .p-carousel-indicator-button {
            width: 12px;
            height: 12px;
            background-color: rgba(122, 199, 81, 0.29);
        }
        ::v-deep .p-carousel-indicator.p-carousel-indicator-active .p-carousel-indicator-button {
            background-color: rgb(122, 199, 81);
            width: 24px;
        }
    }
</style>
