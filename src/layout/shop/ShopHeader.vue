<script setup>

</script>

<template>
    <header class="header bg-white">
        <div class="header__top bg-[#7AC751] text-white py-4">
            <div class="main__container">
                <slot name="header-top"/>
            </div>
        </div>
        <div class="header__middle py-5">
            <div class="main__container">
                <slot name="header-middle"/>
            </div>
        </div>
        <div class="header__bottom bg-[#F7F8FA]">
            <div class="main__container">
                <slot name="header-bottom"/>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  @apply border-indigo-500 text-indigo-600;
  &:hover {
    @apply border-indigo-500 text-indigo-600;
  }
}
</style>
