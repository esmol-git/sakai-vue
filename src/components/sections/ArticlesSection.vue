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
const backgroundImageStyle = (image) => `background-image: url(${image}); background-size: cover; background-repeat: no-repeat; background-position: center`
</script>

<template>
    <div  class="articles">
        <h3 class="main__title">{{ title }}</h3>
        <div v-if="items" class="articles__items">
            <div class="articles__item" v-for="item in items" :style="backgroundImageStyle(item.image)">
                <div class="articles__item-top">
                    <div class="articles__item-badge">
                        <i class="pi pi-tag"></i>
                        {{ item.theme }}
                    </div>
                    <div class="articles__item-date">{{ item.date }}</div>
                </div>
                <h3 class="articles__item-title">{{ item.title }}</h3>
                <p class="articles__item-descr">{{ item.descr }}</p>
                <router-link :to="item.to" class="articles__item-link">Read more</router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.articles {
    padding: 70px 0;
    &__items {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
    }
    &__item {
        display: flex;
        flex-direction: column;
        justify-content: end;
        min-height: 455px;
        padding: 30px 40px;
        height: 100%;
        border-radius: 8px;
        color: #fff;
        &-top {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 18px;
        }
        &-badge {
            display: flex;
            align-items: center;
            gap: 5px;
            color: #7AC751;
            background-color: #F8FAFB;
            padding: 5px 8px;
            border-radius: 4px;
            font-size: 12px;
            line-height: 18px;
            text-transform: uppercase;
        }
        &-date {
            font-size: 14px;
            line-height: 130%;
        }
        &-title {
            font-weight: 700;
            font-size: 39px;
            line-height: 120%;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
            color: #fff;
        }
        &-link {
            font-weight: 600;
            font-size: 14px;
            line-height: 130%;
        }
    }
}
</style>
