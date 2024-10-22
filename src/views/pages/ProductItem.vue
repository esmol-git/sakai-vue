<script setup>
import { updateProduct } from '@/api/ProductService';
import { PhotoService } from '@/service/PhotoService';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const images = ref();
const product = ref(null);

const fetchProduct = async () => {
  const id = route.params.id;
  try {
    const response = await updateProduct(id);
    product.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
    PhotoService.getImages().then((data) => (images.value = data));
    fetchProduct();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <p @click="router.go(-1)" class="cursor-pointer text-blue-500 mb-4">Назад</p>
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px">
        <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
        </template>
        <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
        </template>
    </Galleria>
    <div v-if="product" class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img class="w-full h-full object-cover" v-if="product.image && product.image !== 'null'" :src="'https://primefaces.org/cdn/primevue/images/product/' + product.image" :alt="product.name"/>
        <img v-else class="w-full h-full object-cover" src="https://via.placeholder.com/400x300" alt="Product Image" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ product.name }}</div>
        <p class="text-gray-700 text-base">
          {{ product.description }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${{ product.price }}
        </span>
        <Button label="Добавить в корзину" icon="pi pi-shopping-cart" class="p-button-success"></Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Здесь можно добавить кастомные стили, если необходимо
</style
