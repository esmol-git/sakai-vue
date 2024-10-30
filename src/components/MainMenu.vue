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
    },
});

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
    <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 relative h-full">
        <component
            v-for="item in visibleItems"
            :key="item.label"
            :is="item.isLink === true ? 'a' : 'router-link'"
            :to="item.isLink === true ? undefined : { name: item.to }"
            :href="item.isLink === true ? item.href : undefined"
            :target="item.isLink === true ? item.target || '_blank' : undefined"
            :disabled="item.disabled"
            class="inline-flex gap-1 items-center border-b-2 border-transparent px-1 pt-1 text-lg font-medium text-gray-500 cursor-pointer uppercase "
        >
            <i :class="`pi pi-${item.icon}`" style="font-size: 1.125rem"></i>
        {{ item.label }}
        </component>
        <Menu ref="menu" :model="remainingItems" :popup="true" />
        <div v-if="remainingItems.length > 0" @click.prevent="toggleMenu" class="inline-flex items-center">
            <i class="pi pi-ellipsis-h cursor-pointer" style="font-size: 1.125rem"></i>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.router-link-exact-active {
    @apply border-[#7AC751] text-[#7AC751];
    &:hover {
        @apply border-[#7AC751] text-[#7AC751];
    }
}
</style>
