<script setup>
import { delFavorite, getFavorites, updateProduct } from '@/api/ProductService';
import { onMounted, ref } from 'vue';

const favorites = ref([]);

const fetchFavorites = () => {
    getFavorites().then((data) => {
        favorites.value = data.data;
    });
};

const deleteFavoriteProduct = (product) => {
    const payload = {
        ...product,
        favorite: false
    };
    delFavorite(product.id).then(() => {
        updateProduct(product.favorite_id, payload).then(() => {
            fetchFavorites();
        });
    });
};

onMounted(() => {
    fetchFavorites();
});
</script>

<template>
    <div class="favorites bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div class="flex align-items-center justify-between">
                <h2 class="text-4xl font-bold tracking-tight text-gray-900 mb-5">Favorites</h2>
                <RouterLink to="/landing" class="text-2xl text-gray-500">назад</RouterLink>
            </div>
            <Divider />
            <div v-if="favorites && favorites.length > 0" class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <a href="#" class="group border border-surface-200 rounded-lg relative" v-for="item in favorites">
                    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img :src="'https://primefaces.org/cdn/primevue/images/product/' + item.image" :alt="item.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
                        <Button class="absolute top-0 right-0" text icon="pi pi-heart-fill" severity="primary" outlined @click="deleteFavoriteProduct(item)" />
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">{{ item.name }}</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">${{ item.price }}</p>
                    id:{{ item.id }} - favorite_id:{{ item.favorite_id }}
                </a>
            </div>
            <div v-else class="text-center">No favorites yet</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div @click="showDetails" class="max-w-sm min-h-[350px] rounded overflow-hidden shadow-lg bg-white flex flex-col relative cursor-pointer transition-transform transform hover:scale-105">
      <!-- Тег "Новинка" -->
      <div class="absolute z-10 top-0 left-0 m-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        Новинка
      </div>
      
      <div class="relative h-48 bg-gray-200 flex items-center justify-center">
        <img class="w-full h-full object-cover" src="https://via.placeholder.com/400x300" alt="Product Image" />
        <div class="absolute top-0 right-0 m-2">
          <i
            :class="isFavorite ? 'pi pi-heart-fill text-red-500' : 'pi pi-heart text-gray-500'"
            class="text-xl cursor-pointer heart-animation"
            @click.stop="toggleFavorite"
          ></i>
        </div>
      </div>
      
      <div class="px-6 py-4 flex-grow">
        <h3 class="text-lg font-bold text-gray-800">Название товара</h3>
        <p class="text-sm text-gray-600">Подзаголовок</p>
        <div class="flex items-center mt-2">
          <span class="text-xl font-bold text-gray-800">$50.00</span>
          <span class="ml-2 text-sm line-through text-gray-500">$70.00</span>
        </div>
        <div class="flex items-center mt-2">
          <i class="pi pi-star text-yellow-400"></i>
          <i class="pi pi-star text-yellow-400"></i>
          <i class="pi pi-star text-yellow-400"></i>
          <i class="pi pi-star text-yellow-400"></i>
          <i class="pi pi-star-half text-yellow-400"></i>
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
.heart-animation {
  transition: transform 0.3s ease;
}

.heart-animation:hover {
  transform: scale(1.2);
}
</style>
