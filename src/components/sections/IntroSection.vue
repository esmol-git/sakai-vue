<script setup>
// Определяем пропсы для компонента
const props = defineProps({
    menu: {
        type: Array,
        required: true,
    },
    sliderItems: {
        type: Array,
    },
});
const backgroundStyle = (color) => `background: linear-gradient(to bottom, ${color}, rgb(241, 250, 255))`
const backgroundImageStyle = (image) => `background-image: url(${image})`
</script>

<template>
    <div class="intro flex">
        <div class="intro-collections w-[260px]">
            <ul class="list-none p-0 m-0 flex flex-col bg-[#F7F8FA] w-[260px] text-[#555555] text-sm divide-y divide-surface">
                <li
                    class="py-4 px-7 cursor-pointer"
                    v-for="(item, index) in menu"
                    :key="index"
                >
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div class="pl-3 pt-3 flex-auto р-х-[500px]">
            <div class="bg-[#eee] h-full">
                <main-slider
                    :items="sliderItems"
                    :showNavigators="false"
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
                </main-slider>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.intro {
  display: flex;
  height: 500px;
}

.intro-collections {
  width: 260px;
}

.slider-item {
  text-align: center; /* Центрируем содержимое слайдера */
  padding: 16px; /* Добавляем отступы */
}

.slider-item img {
  border-radius: 8px; /* Закругляем углы изображений */
}
</style>

