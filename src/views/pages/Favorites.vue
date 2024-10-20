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
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <CardProduct
                    v-for="item in favorites"
                    :key="item.id"
                    :product="item"
                    variant="detailed"
                />
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
