<script setup>
const types = {
    one: 'one',
    two: 'two'
}
const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    cardScale: {
        type: Boolean,
        default: false
    },
});

const buttons = [
    {
        label: 'Купить',
        icon: 'pi pi-shopping-cart',
        command: () => {
            console.log('Купить');
        }
    },
    {
        label: 'Изменить',
        icon: 'pi pi-pencil',
        command: () => {
            console.log('Изменить');
        }
    },
    {
        label: 'Удалить',
        icon: 'pi pi-times',
        command: () => {
            console.log('Удалить');
        }
    }
]

</script>

<template>
    <div @click="showDetails" class="card max-w-sm min-h-[350px] overflow-hidden shadow-lg bg-white flex flex-col relative cursor-pointer transition-transform transform rounded-lg" :class="cardScale ? 'hover:scale-105' : ''">
        <div  class="absolute z-10 top-0 left-0 m-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Новинка
        </div>

        <div class="relative h-48 bg-gray-200 flex items-center justify-center">
            <img v-if="product.image" :src="'https://primefaces.org/cdn/primevue/images/product/' + product.image" :alt="product.name">
            <img v-else class="w-full h-full object-cover" src="https://via.placeholder.com/400x300" alt="Product Image" />

            <div class="absolute top-0 right-0 m-2">
                <i
                    :class="product.favorite ? 'pi pi-heart-fill text-red-500' : 'pi pi-heart text-gray-500'"
                    class="text-xl cursor-pointer heart-animation"
                    @click.stop="toggleFavorite"
                ></i>
            </div>
        </div>

        <!-- Icons that appear on hover -->
        <div class="hover-icons absolute z-50 right-0 top-0 bottom-0 flex flex-col justify-center items-center space-y-2 p-2 transform translate-x-full  transition-all duration-300">
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
            <Button icon="pi pi-shopping-cart" severity="secondary" raised rounded aria-label="Favorite" />
            <Button icon="pi pi-refresh" severity="secondary" raised rounded aria-label="Favorite" />
            <Button icon="pi pi-eye" severity="secondary" raised rounded aria-label="Favorite" />
        </div>

        <div class="px-6 py-4 flex-grow">
            <h3 class="text-lg font-bold text-gray-800">{{ product.name }}</h3>
            <p class="text-sm text-gray-600">Подзаголовок</p>
            <div class="flex items-center mt-2">
                <span class="text-xl font-bold text-gray-800">$50.00</span>
                <span class="ml-2 text-sm line-through text-gray-500">$70.00</span>
            </div>
            <div class="flex items-center mt-2">
                <span v-for="i in 5" :key="i">
                    <i v-if="i <= product.rating" class="pi pi-star-fill text-yellow-400"></i>
                    <i v-else class="pi pi-star text-yellow-400"></i>
                </span>
                <span class="ml-2 text-sm text-gray-600">(124 отзыва)</span>
            </div>
        </div>

        <div class="px-6 py-4 flex items-center">
            <button class="flex justify-center items-center border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded h-10">
                <i class="pi pi-shopping-cart"></i>
            </button>
            <button class="flex-grow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 h-10">
                Купить сейчас
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    padding: 0;
    // overflow: hidden;
}

.card:hover .hover-icons {
    transform: translateX(0);
    opacity: 1 !important;
}
</style>
