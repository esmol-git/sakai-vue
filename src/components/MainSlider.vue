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
    circular: {
        type: Boolean,
        default: false
    }
})
const backgroundStyle = (color) => `background: linear-gradient(to bottom, ${color}, rgb(241, 250, 255))`
const backgroundImageStyle = (image) => `background-image: url(${image})`
</script>

<template>
    <Carousel
        :value="items"
        :numVisible="numVisibleItems"
        :numScroll="numScrollItems"
        :showNavigators="showNavigators"
        :circular="circular"
        class="carousel"
    >
        <template #item="slotProps">
            <slot/>
        </template>
    </Carousel>
</template>

<style lang="scss" scoped>
    .carousel {
        position: relative;
        &-item {
            position: relative;
            max-width: 100% !important;
            &__main {
                min-height: 500px !important;
                background-size: 350px;
                background-position: right;
                background-repeat: no-repeat;
                height: 100%;
            }
            &__mini {
                background: linear-gradient(to bottom, #FFFFFF99, #FFFFFF8F);
                box-shadow: inset 2px 2px 2px 2px #FFFFFF8F;
            }
        }
        ::v-deep .p-button {
            background-color: #7AC751;
            border-color: #7AC751;
        }
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
