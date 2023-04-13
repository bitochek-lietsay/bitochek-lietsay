<template>
  <nuxt-picture
    :src="src"
    :imgAttrs="{class: 'image', style:'display:block'}"
  />
</template>

<script lang="ts">
export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    }
  }
})
</script>

<style>
.image {
  max-width: 100%;
  transform: scale(1.3);
  transform-origin: 0 50%;
}
</style>