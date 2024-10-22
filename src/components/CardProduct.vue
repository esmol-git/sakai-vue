<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    cardScale: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String,
        default: 'default',
        validator: value => ['default', 'compact', 'detailed'].includes(value)
    },
    hoverPanel: {
        type: Boolean,
        default: false
    }
});

const emmit = defineEmits(['addToCart', 'addToWishlist', 'updateProduct', 'showDetails']);

const addToCart = () => {
    emmit('addToCart', props.product);
}
const addToWishlist = () => {
    emmit('addToWishlist', props.product);
}
const updateProduct = () => {
    emmit('updateProduct', props.product);
}
const showDetails = () => {
    emmit('showDetails', props.product);
}
const favoriteIcon = computed(() => {
    return props.product.favorite ? 'pi pi-heart-fill text-red-500' : 'pi pi-heart';
});
const buttons = ref([
    {
        label: 'Избранное',
        icon: favoriteIcon,
        command: () => {
            addToWishlist();
        }
    },
    {
        label: 'Купить',
        icon: 'pi pi-shopping-cart',
        command: () => {
            addToCart();
        }
    },
    {
        label: 'Смотреть',
        icon: 'pi pi-eye',
        command: () => {
            showDetails();
        }
    },
    {
        label: 'Обновить',
        icon: 'pi pi-sync',
        command: () => {
            updateProduct();
        }
    }
])

const getStatusLabel = (status) => {
    switch (status) {
    case 'new':
        return 'success';
    case 'sale':
        return 'warn';
    case 'out-of-stock':
        return 'danger';
    default:
        return '';
    }
}
const formatWithSuffix = (value, suffix = '') => {
    return `${value}${suffix}`;
};
const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountAmount;
};

</script>

<template>
    <div
        class="card-main min-h-[350px] overflow-hidden shadow-lg bg-white flex flex-col relative cursor-pointer transition-transform transform rounded-lg"
        :class="cardScale ? 'hover:scale-105' : ''"
    >
        <div class="flex justify-between align-items-center flex-grow gap-2 z-40 absolute left-0 right-0 top-0 m-2">
            <div class="flex gap-2 align-items-center">
                <Tag
                    :severity="getStatusLabel(product.status)"
                    :value="product.status === 'new' ? 'Новинка' : product.status === 'sale' ? 'Скидка' : 'Нет в наличии'">
                </Tag>
                <Tag
                    v-if="product.discountAmount"
                    severity="danger"
                    :value="formatWithSuffix(product.discountAmount, '%')">
                </Tag>
            </div>
            <i
                v-if="!hoverPanel"
                :class="product.favorite ? 'pi pi-heart-fill text-red-500' : 'pi pi-heart text-gray-500' "
                class="cursor-pointer transition duration-300 hover:scale-125"
                style="font-size: 1.5rem"
                @click.stop="toggleFavorite"
            ></i>
        </div>
        <div class="relative h-60 bg-gray-200 flex items-center justify-center">
            <img class="w-full h-full object-cover" v-if="product.image && product.image !== 'null'" :src="'https://primefaces.org/cdn/primevue/images/product/' + product.image" :alt="product.name"/>
            <img v-else class="w-full h-full object-cover" src="https://via.placeholder.com/400x300" alt="Product Image" />

            <div class="absolute top-0 right-0 m-2">

            </div>
        </div>
        <div v-if="hoverPanel" class="hover-icons absolute z-50 right-0 top-0 bottom-0 flex flex-col justify-center items-center space-y-2 p-2 transform translate-x-full  transition-all duration-300">
            <Button
                v-for="button in buttons"
                :icon="`pi ${button.icon}`"
                @click="button.command"
                severity="secondary"
                raised
                rounded
                :aria-label="button.label"
                style="background-color: white; color: black;"
            />
        </div>

        <div class="px-6 py-4 flex-grow">
            <h3 class="text-lg font-bold text-gray-800">{{ product.name }}</h3>
            <p class="text-sm text-gray-600">{{ product.description }}</p>
            <p>{{ product.category }}</p>
            <div class="flex items-center mt-2">
                <span v-if="product.price" class="text-xl font-bold text-gray-800">{{calculateDiscountedPrice(product.price, product.discountAmount) || product.price}}</span>
                <span v-if="product.discountAmount" class="ml-2 text-sm line-through text-gray-500">${{ product.price }}</span>
            </div>
            <div class="flex items-center mt-2">
                <Rating v-model="product.rating" />
                <span class="ml-2 text-sm text-gray-600">(124 отзыва)</span>
            </div>
        </div>

        <div v-if="!hoverPanel" class="px-6 py-4 flex items-center">
            <Button @click="addToCart" :disabled="product.product_id" class="flex justify-center rounded h-12" icon="pi pi-shopping-cart" outlined/>
            <Button class="flex-grow py-2 px-4 rounded ml-2 h-12" label="Купить сейчас"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.card-main:hover .hover-icons {
    transform: translateX(0);
    opacity: 1 !important;
}
.card-main {
    position: relative;
}
.card-main::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 1;
}
.card-main:hover::before {
    opacity: 1;
}
</style>
