<script setup>
const props = defineProps({
  menu: {
    type: Array,
  }
})
</script>

<template>
  <div class="intro">
    <div class="intro-collections w-[260px]">
        <ul class="list-none p-0 m-0 flex flex-col bg-[#F7F8FA] w-[260px] text-[#555555] text-sm divide-y divide-surface">
            <li class="py-4 px-7 cursor-pointer" v-for="item in menu">
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
                <template #item="slotProps">
                    {{ slotProps }}
                    <!-- <div
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
                    </div> -->
                </template>
                </main-slider>
            </div>
        </div>
  </div>
</template>

<style lang="scss" scoped>

</style>