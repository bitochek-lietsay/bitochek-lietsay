<template>
    <div class="promo-description" v-html="description"></div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    description: {
      type: String,
      required: true,
    }
  },
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