<template>
  <div>
    <PromoButton :href="href">
      {{ text }} <LogosTelegram style="vertical-align: sub;" class="icon"/>
    </PromoButton>
  </div>
</template>

<script lang="ts">
import LogosTelegram from '~icons/logos/telegram'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    }
  },
  components: {
    LogosTelegram,
  }
})
</script>

<style scoped>
.icon {
  display: inline;
}
</style>
