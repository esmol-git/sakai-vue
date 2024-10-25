<script setup>
import { computed, ref } from 'vue';

// Ссылка на меню для управления его состоянием
const menu = ref(null);

// Определение свойств компонента
const props = defineProps({
  navigation: {
    type: Array,
    default: () => []
  },
  visibleItemCount: {
    type: Number,
    default: 5  // Значение по умолчанию для количества видимых пунктов
  }
});

// Вычисляемое свойство для подсчета видимых элементов
const countVisibleItems = computed(() => props.navigation.length - props.visibleItemCount);

// Вычисляемое свойство для получения первых N элементов навигации
const visibleItems = computed(() => props.navigation.slice(0, props.visibleItemCount));

// Вычисляемое свойство для получения оставшихся элементов навигации
const remainingItems = computed(() => props.navigation.slice(props.visibleItemCount));

// Функция для переключения меню
function toggleMenu(event) {
  if (menu.value) {
    menu.value.toggle(event);
  }
}
</script>

<template>
  <div class="border-b border-gray-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            <img class="hidden h-8 w-auto lg:block" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 relative">
            <component 
              v-for="item in visibleItems"
              :key="item.label"
              :is="item.isLink === true ? 'a' : 'router-link'"
              :to="item.isLink === true ? undefined : item.to"
              :href="item.isLink === true ? item.href : undefined"
              :target="item.isLink === true ? item.target || '_blank' : undefined"
              :disabled="item.disabled"
              class="inline-flex gap-1 items-center border-b-2 border-transparent px-1 pt-1 text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <i :class="`pi pi-${item.icon}`" style="font-size: 1.125rem"></i>
              {{ item.label }}
            </component>

            <!-- Компонент меню для оставшихся элементов -->
            <Menu ref="menu" :model="remainingItems" :popup="true" />
            <div @click.prevent="toggleMenu" class="inline-flex items-center">
              <i class="pi pi-ellipsis-h cursor-pointer" style="font-size: 1.125rem"></i>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  @apply border-indigo-500 text-indigo-600
}
</style>
