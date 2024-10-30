<script setup>

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    reverse: {
        type: Boolean,
        default: false
    }
})

const backgroundImageStyle = (image) => `background-image: url(${image}); background-size: cover; background-repeat: no-repeat; background-position: right`
</script>

<template>
    <div
        class="offers h-[511px] flex"
        :class="{ 'offers--primary': items.length === 4, 'offers--reverse': reverse }"
    >
        <div
            v-for="(item, index) in items"
            :key="index"
            :style="backgroundImageStyle(item.image)"
            class="offer"
        >
            <h3 class="offer__title">{{ item.title }}</h3>
            <p class="offer__subtitle">{{ item.subtitle }}</p>
            <router-link
                :to="item.to"
                class="offer__link"
            >
                Read more
                <i class="pi pi-arrow-right"></i>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.offers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 17px;
    padding-top: 70px;
    margin-bottom: 60px;
    .offer {
        padding: 50px 25px;
        &__title {
            font-weight: 700;
            font-size: 22px;
            line-height: 26px;
            margin-bottom: 10px;
            color: #555555;
        }
        &__subtitle {
            font-size: 20px;
            line-height: 26px;
            color: #7AC751;
        }
        &__link {
            display: flex;
            align-items: center;
            gap: 3px;
            font-size: 16px;
            line-height: 26px;
            color: #757575;
            i {
                margin-top: 2px;
            }
        }
    }
    .offer:nth-child(1) {
        grid-row: span 2 / span 2;
    }
    .offer:nth-child(3) {
        grid-column-start: 2;
        grid-row-start: 2;
    }
}
.offers--reverse {
    .offer:nth-child(1) {
        grid-row: span 2 / span 2;
    }
    .offer:nth-child(2) {
        grid-row-start: 1;
        grid-column-start: 1;
    }
    .offer:nth-child(3) {
        grid-row-start: 2;
        grid-column-start: 1;
    }
}

</style>
