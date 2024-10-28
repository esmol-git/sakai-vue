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
            <div
                class="flex items-center justify-between pr-12"
                :style="backgroundStyle(slotProps.data.color)"
            >
                <div
                    class="carousel-item__main pl-12 flex-1 flex items-center"
                    :style="backgroundImageStyle(slotProps.data.image)"
                >
                    <div class="flex flex-col !h-full">
                        <p class="carousel-item__subtitle inline-block text-[#7AC751] text-2xl uppercase">
                            {{ slotProps.data.subtitle || 'TOP COLLECTIONS 2024' }}
                        </p>
                        <h2 class="carousel-item__title text-[#2F2F2F] text-[40px] font-bold leading-tight mb-7 max-w-[318px] capitalize">
                            {{ slotProps.data.title || 'We Serve Your Dream Furniture' }}
                        </h2>
                        <p class="carousel-item__descr inline-block text-2xl text-[#515151B5]">
                            {{ slotProps.data.description || 'Get 50% off all products' }}
                        </p>
                        <Button label="Shop Now" class="!text-xl mt-8 !px-4"></Button>
                    </div>
                </div>
                <div class="flex flex-col gap-6">
                    <div v-for="item in slotProps.data.children" :key="i" class="carousel-item__mini flex flex-col items-center justify-center py-2 px-4 rounded-lg min-w-24">
                        <img :src="item.image" :alt="item.image" class="w-14 h-14">
                        <span class="text-[#7AC751] leading-[14px] text-[7px] font-medium">${{ item.price }}</span>
                        <p class="text-[#555555] text-[10px] font-medium">{{ item.title }}</p>
                    </div>
                </div>
            </div>
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
