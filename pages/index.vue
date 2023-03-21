<template>
  <div class="promo-page">
    <PromoBackground
      project="slizisatoshi"
    />
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
          project="slizisatoshi"
        />
      </template>

      <template #aside>
        <PromoImage
          project="slizisatoshi"
        />
      </template>

      <template #more>
        <PromoExample :examples="promoData?.examples"/>

        <PromoShowcase/>
      </template>
    </PromoContent>
  </div>
</template>

<script lang="ts">
export default defineComponent({
    setup() {
        const { data: promoData } = useAsyncData("pagePromoData", () => queryContent("/slezi-satoshi").findOne());

        useHead({
            title: "Слив Слезы Сатоши [фри]",
            meta: [
                {
                    property: "og:image",
                    content: "/promo/slezi-satoshi/images/slezisatoshi-promo-example.png",
                },
            ]
        });
        watch(promoData, (d) => console.log(d), { immediate: true });
        return {
            promoData
        };
    },
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

* {
  line-height: 150%;
  font-family: 'Comfortaa', cursive;
  color: rgba(255,255,255,0.8);
  font-size: 20px;
}

.promo-page {
  overflow-x: hidden;
}

body {
  --promo-example-nav-color: #fff;
}
</style>