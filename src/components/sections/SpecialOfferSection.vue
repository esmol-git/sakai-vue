<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})
const backgroundImageStyle = (image) => {
  return `background-image: url(${image}); background-size: cover; background-repeat: no-repeat; background-position: right`
}
const newPrice = (price, discount) => {
  return price - (price * discount / 100)
}
</script>

<template>
  <div class="special-offer">
    <h2 class="main__title">{{ title }}</h2>
    <div class="special-offer__items">
      <div v-for="item in items" class="special-offer__item" :style="backgroundImageStyle(item.image)">
        <h3 class="special-offer__title">{{ item.title }}</h3>
        <p class="special-offer__descr">{{ item.descr }}</p>
        <div class="special-offer__prices">
          <span class="special-offer__price">${{ newPrice(item.price, item.discount) }}</span>
          <span class="special-offer__price special-offer__price--old">${{ item.price }}</span>
          <Button label="shop now" class="special-offer__btn"></Button>
        </div>
        <div class="special-offer__timer">
          <div class="special-offer__timer-item">
            <span class="special-offer__timer-value">10</span>
            <span class="special-offer__timer-label">days</span>
          </div>
          <div class="special-offer__timer-item">
            <span class="special-offer__timer-value">12</span>
            <span class="special-offer__timer-label">hrs</span>
          </div>
          <div class="special-offer__timer-item">
            <span class="special-offer__timer-value">00</span>
            <span class="special-offer__timer-label">min</span>
          </div>
          <div class="special-offer__timer-item">
            <span class="special-offer__timer-value">00</span>
            <span class="special-offer__timer-label">sec</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .special-offer {
    margin-bottom: 70px;
    &__items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    &__item {
      min-height: 250px;
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 30px 25px;
    }
    &__title {
      color: rgb(85, 85, 85);
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
    }
    &__descr {
      color: rgb(117, 117, 117);
      font-size: 12px;
      line-height: 18px;
    }
    &__prices {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
    }
    &__price {
      color: #7AC751;
      font-size: 18px;
      font-weight: 700;
      line-height: 120%;
      letter-spacing: 0.5%;
    }
    &__price--old {
      color: #CCCCCC;
      text-decoration-line: line-through;
    }
    .p-button {
      background-color: #7AC751;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 700;
      line-height: 120%;
    }
    &__timer {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
    }
    &__timer-item {
      display: flex;
      flex-direction: column;
      gap: 3px;
      width: 40px;
      height: 40px;
      background-color: #7AC751;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    &__timer-value {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      line-height: 120%;
    }
    &__timer-label {
      color: #fff;
      font-size: 6px;
      line-height: 120%;
    }
  }
</style>