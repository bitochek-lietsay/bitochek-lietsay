<template>
  <PromoContent>
    <template #main>
      <PromoLogo
        project="slizisatoshi"
      />

      <PromoDescription
        project="slizisatoshi"
        :description="promoData?.description"
      />
  
      <PromoAction
        href="https://t.me/slezisatoshifree"
        text="Перейти в канал"
      />
    </template>

    <template #aside>
      <PromoImage
        src="/promo/slezi-satoshi/images/slezisatoshi-promo.png"
      />
    </template>

    <template #more>
      <PromoExample :examples="promoData?.examples"/>

      <PromoShowcase
        :isActive="false"
        description="Скоро мы запустим сливы других популярных закрытых каналов. Подписывайся на наш бесплатный слив канала 'Слезы Сатоши' что бы ничего не пропустить"
      />
    </template>
  </PromoContent>
</template>

<script lang="ts">

export default defineComponent({
  setup() {
    const route = useRoute()
    const queryBuilder = computed(() => markRaw(queryContent(`${route.params.page}`))) 
    const { data: promoData } = useAsyncData("pagePromoData", () => queryBuilder.value.findOne());

    useHead({
      title: computed(() => promoData.value?.meta.title ?? 'Сервис по предоставлению информации из закрытых источников популярных криптосообществ'),
      meta: [
        {
          property: "og:image",
          content: "/promo/slezi-satoshi/images/slezisatoshi-promo-example.png",
        },
      ]
    });

    watch(promoData, (d) => {
      console.log(d)
    }, { immediate: true });

    watch(() => route.params.page, (page) => {
      if (page !== 'slezi-satoshi') {
        navigateTo('slezi-satoshi')
      }
    }, { immediate: true });

    return {
      promoData
    };
  },
})
</script>

<style scoped>
body {
  --promo-example-nav-color: #fff;
}
</style>