<script setup>
const props = defineProps({
    tabs: {
        type: Array,
        required: true
    },
    activeTabIndex: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue']);

const updateTab = (index) => {
    console.log('updateTab', index);
    emit('update:modelValue', index);
}
</script>

<template>
    <div class="tranding">
        <h2 class="main__title">{{ title }}</h2>
        <div class="tabs flex items-center justify-center gap-[70px]">
            <div
                v-for="(tab, index) in tabs"
                :key="index"
                class="tab"
                :class="{ 'active': activeTabIndex === index }"
                @click="updateTab(index)"
            >
                {{ tab }}
            </div>
        </div>
        <slot :activeTabIndex="activeTabIndex"></slot>
    </div>
</template>

<style lang="scss" scoped>
.tranding {
    margin-bottom: 70px;
}
.tabs {
    margin-bottom: 70px;
}
.tab {
    cursor: pointer;
    color: #C2C2C2;
    font-size: 24px;
    font-weight: 600;
    line-height: 30px;
    transition: all 0.3s ease;
    &.active {
        color: #7AC751;
    }
}
</style>
