<template>
    <div class="promo-description">
      Слив легендарного приватного канала Слезы Сатоши! Получи бесплатный доступ к обзорам рынка, таблице разлоков и к портфелю Рафаэля
      <FluentEmojiMoneyMouthFace style="vertical-align: text-top;"/>
    </div>
</template>

<script lang="ts">
import FluentEmojiMoneyMouthFace from '~icons/fluent-emoji/money-mouth-face'

export default defineComponent({
  components: {
    FluentEmojiMoneyMouthFace,
  }
})
</script>

<style scoped>
.promo-description {
  max-width: 650px;
  line-height: 150%;
  font-family: 'Comfortaa', cursive;
  color: rgba(255,255,255,0.8);
  font-size: 20px;
  padding-bottom: 48px;
}
</style>