<template>
  <div class="description">
    Скоро мы запустим сливы других популярных закрытых каналов. Подписывайся на наш бесплатный слив канала "Слезы Сатоши" что бы ничего не пропустить
  </div>
  <div class="list">
    <PromoShowcaseItem
      v-for="promo in items"
      :id="promo.path"
      :name="promo.showcase.name"
    />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const { data: items } = useAsyncData("allPromoData", () => queryContent().where({isActive: false}).find());

    return {
      items
    }
  }
})
</script>

<style scoped>
.description {
  padding-top: 256px;
  padding-bottom: 48px;
}
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

@media only screen and (max-width: 1200px) {
  .list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (max-width: 800px) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 550px) {
  .list {
    grid-template-columns: repeat(1, 1fr);
  }
}


</style>