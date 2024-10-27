<script setup>
import { getInfo } from '@/api/ProductService';
import { computed, onMounted, ref } from 'vue';
import ShopFooter from './ShopFooter.vue';
import ShopHeader from './ShopHeader.vue';

const bagValue = ref(9);
const messageValue = ref(4);
const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const info = ref(null);
const navigation = computed(() => {
    return info.value ? info.value.menu : '';
});
const logo = computed(() => {
    return info.value ? info.value.logo : '';
})
onMounted(() => {
    getInfo().then((data) => {
        info.value = data.data[0];
    });
});
</script>

<template>
    <div class="shop-wrapper">
        <div v-if="!info" class="shop-overlay">
            <ProgressSpinner style="width: 30px; height: 30px" strokeWidth="4" />
        </div>
        <div v-else class="shop-layout">
            <shop-header
                v-if="info"
                :navigation="navigation"
                :visibleItemCount="3"
            >
                <template #header-top>
                    <div class="flex items-center justify-between w-full">
                        <p class="text-base">Welcome to our online shop</p>
                        <div>Login or Sign up</div>
                    </div>
                </template>
                <template #header-middle>
                    <div class="flex items-center justify-between w-full">
                        <div v-if="logo" class="flex flex-shrink-0 items-center">
                            <img class="block h-8 w-auto" :src="logo" alt="Furniking" />
                        </div>
                        <div class="flex rounded-lg border-2 border-[#7AC751]">
                            <InputText placeholder="Search here" style="width: 250px;" id="username" v-model="value" aria-describedby="username-help" />
                            <Select style="width: 120px;" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Categories" class="w-full md:w-56">
                                <template #dropdownicon>
                                    <i style="font-size: 0.8rem" class="pi pi-angle-down" />
                                </template>
                            </Select>
                            <Button class="!bg-[#7AC751] !border-0 !rounded-none" icon="pi pi-search" />
                        </div>
                        <div class="flex gap-5">
                            <OverlayBadge v-if="bagValue > 0" :value="bagValue" size="small">
                                <i class="pi pi-shopping-bag" style="font-size: 1.5rem" />
                            </OverlayBadge>
                            <i v-else class="pi pi-shopping-bag" style="font-size: 1.5rem" />
                            <OverlayBadgen v-if="messageValue > 0" :value="messageValue" size="small">
                                <i class="pi pi-bell" style="font-size: 1.5rem" />
                            </OverlayBadgen>
                            <i v-else class="pi pi-bell" style="font-size: 1.5rem" />
                            <i class="pi pi-user" style="font-size: 1.5rem" />
                        </div>
                    </div>
                </template>
                <template #header-bottom>
                    <div class="flex items-center relative h-16">
                        <div class="w-[260px]"></div>
                        <div class="absolute top-0 bottom-0 left-0 w-[260px] !bg-[#7AC751] flex justify-center items-center gap-3 text-white">
                            <i class="pi pi-align-left" style="font-size: 1.2rem" />
                            <p class="text-base font-medium">ALL COLLECTIONS</p>
                        </div>
                        <main-menu :navigation="navigation" />
                    </div>
                </template>
            </shop-header>
            <div class="main__container">
                <div class="shop-main w-full">
                    <router-view/>
                </div>
            </div>
            <shop-footer/>
        </div>
    </div>
</template>

<style lang="scss">
.shop-wrapper {
    position: relative;
}
.shop-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background-color: #fff;
}
.shop-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.shop-main {
    flex: 1 1 auto;
}
.header__middle .p-select, .p-inputtext {
    border: none !important;
}
.p-select-dropdown {
    width: 20px !important;
}
</style>
