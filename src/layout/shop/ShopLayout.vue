<script setup>
import { ref } from 'vue';
import ShopFooter from './ShopFooter.vue';
import ShopHeader from './ShopHeader.vue';

const navigation = ref([
  { label: 'Home', to: '/shop', icon: 'home' },
  { label: 'Catalog', to: '/shop/catalog', isLink: false, icon: 'shopping-cart' },
  { label: 'Shop', isLink: true, href: 'https://www.primefaces.org', target: '_self', disabled: true },
  { label: 'Shop', isLink: true, href: 'https://www.primefaces.org', target: '_self', disabled: true },
  { label: 'Shop', isLink: true, href: 'https://www.primefaces.org', target: '_self', disabled: true },
  { label: 'Shop', isLink: true, href: 'https://www.primefaces.org', target: '_self', disabled: true },
]);
</script>


<template>
  <div class="shop-layout">
    <shop-header :navigation="navigation" :visibleItemCount="3"/>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex-auto w-full">
      <div class="shop-main">
        <router-view/>
      </div>
    </div>
    <shop-footer/>
  </div>
</template>

<style lang="scss">

.shop-layout {
display: flex;
flex-direction: column;
height: 100vh;
}
.shop-main {
  flex: 1 1 auto;
  background-color: #eee;
}

</style>