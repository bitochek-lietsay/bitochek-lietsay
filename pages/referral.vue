
<template>
  <PromoContent>
    <template #main>
      <PromoDescription
        project="slizisatoshi"
        :description="'Рекомендуя наш канал, каждый может зарабатывать дополнительно по 20% от каждой продажи и всех последующих продаж'"
      />
  
      <PromoAction
        href="http://t.me/Slezisatoshi_access_bot"
        text="Получить реферальную ссылку"
      />
    </template>

    <template #aside>
      <PromoImage
        src="/referral/hero-image.png"
      />
    </template>

    <template #more>
      <div class="mb-20 text-lg">Как это работает</div>

      <div class="hiw">
        <div class="item">
          <div class="description">
            1️⃣ Получите свою реферальную ссылку в telegram-боте
          </div>

          <PromoExampleMessage
            :message="{
              md: 'Ваша реферальная ссылка: \n`http://t.me/...`',
              date: 'now',
            }"
          />
        </div>

        <div class="item">
          <div class="description">
            2️⃣ Делитесь ссылкой с друзьями в социальный сетях
          </div>

          <PromoExampleMessage
            :message="{
              md: 'У вас новый реферал!',
              date: 'now',
            }"
          />
        </div>

        <div class="item">
          <div class="description">
            3️⃣ Получай стабильный доход каждый месяц
          </div>
          <PromoExampleMessage
            :message="{
              md: 'Выплата по реферальной программе отправлена на ваш кошелек!',
              date: 'now',
            }"
          />
        </div>
      </div>

      <div class="text-center">
        <p>Доступ к реферальной программе открыт для каждого пользователя даже не имеющего подписки на наш канал. Переходите в бот, главное меню, реферальная программа, далее берите реф ссылку и начинайте зарабатывать!</p>
        <PromoAction
          class="mt-8"
          href="http://t.me/Slezisatoshi_access_bot"
          text="Получить реферальную ссылку"
        />
      </div>

      <PromoShowcase
        description="Подписывайся на наш бесплатный слив канала 'Слезы Сатоши' что бы ничего не пропустить"
        :isActive="true"
      />
      <PromoShowcase
        description="Скоро мы запустим сливы других популярных закрытых каналов"
        :isActive="false"
      />
    </template>
  </PromoContent>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    useHead({
      title: 'Реферальная программа | Сливы крипто-каналов',
      meta: [
        {
          property: "og:image",
          content: "/promo/slezi-satoshi/images/slezisatoshi-promo-example.png",
        },
      ]
    });
  }
})
</script>

<style scoped>
.hiw {
  display: flex;
  flex-direction: column;
}

.hiw > .item {
  margin-bottom: 96px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.hiw > .item > .description {
  margin-bottom: 24px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 20px;
}

.hiw > .item:nth-child(2n) {
  align-self: end;
  align-items: end;
  text-align: right;
}
</style>
