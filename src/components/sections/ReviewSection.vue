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
    <div class="review">
        <h3 class="main__title">{{ title }}</h3>
        <main-slider
            :items="items"
            :showIndicators="false"
            class="review-slider"
        >
            <template #item="slotProps">
                <div class="review-item">
                    <div class="review-item__wrapper">
                        <div class="review-item__avatar">
                            <img :src="slotProps.data.avatar" alt="Avatar">
                        </div>
                        <p class="review-item__text">{{ slotProps.data.comment }}</p>
                        <p class="review-item__name">{{ slotProps.data.name }}</p>
                        <p class="review-item__occupation">{{ slotProps.data.occupation }}</p>
                    </div>
                </div>
            </template>
        </main-slider>
    </div>
</template>

<style lang="scss" scoped>
    .review {
        padding: 70px 0;
        &-item {
            position: relative;
            max-width: 816px;
            margin: 0 auto;
            background-color: #F8FAFB;
            padding: 50px 125px;
            margin-top: 50px;
            text-align: center;
            border-radius: 8px;
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
            &__avatar {
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                margin: -100px auto 0;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            &__text {
                margin: 16px 0 32px;
                line-height: 150%;
                color: #515151;
            }
            &__name {
                font-weight: 600;
                font-size: 24px;
                line-height: 120%;
                letter-spacing: 0.5px;
                color: #555555;
            }
            &__occupation {
                margin-top: 5px;
                line-height: 125%;
                color: #515151;
            }
        }
        &-slider {
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
        }
    }
</style>
