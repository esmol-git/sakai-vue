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
        &-item {
            position: relative;
            max-width: 100% !important;
            width: 500px;
            background-color: #501212;
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
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            background-color: transparent;
            border-color: transparent;
            svg {
                width: 30px;
                height: 30px;
            }
            &.p-carousel-prev-button {
                left: 100px;
            }
            &.p-carousel-next-button {
                right: 100px;
            }
        }

        ::v-deep .p-button-text:not(:disabled):hover {
            background-color: transparent;
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
