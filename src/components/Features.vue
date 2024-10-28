<script setup>

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})
const backgroundImageStyle = (image) => `background-image: url(${image}); background-size: contain; background-repeat: no-repeat; background-position: left; max-width: 280px;`
</script>

<template>
    <div class="features mt-16">
        <div :style="backgroundImageStyle(item.icon)" class="feature pl-[75px]" v-for="item in items">
            <p class="feature__title">{{ item.title }}</p>
            <span class="feature__descr">{{ item.descr }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.features {
    display: flex;
    grid-gap: 20px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
</style>
