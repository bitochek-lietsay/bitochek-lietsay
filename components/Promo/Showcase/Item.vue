<template>
  <div class="item">
    <div class="soon">Скоро</div>
    <div class="label">{{ name }}</div>
    <nuxt-img
      :src="imgUrl"
      fit="cover"
      class="cover"
      width="600"
      height="450"
      quality="80"
      loading="lazy"
      format="webp"
    />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const imgUrl = computed(() => `/promo/${props.id}/showcase.png`)

    return {
      imgUrl,
    }
  }
})
</script>

<style scoped>
.item {
  aspect-ratio: 4/3;
  max-width: 300px;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  margin: auto;
}

.cover {
  width: 100%;
  height: 100%;
  display: block;
}

.soon {
  position: absolute;
  left: 16px;
  top: 12px;
}

.label {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 12px 16px;
  text-align: center;
  width: 100%;
  background: rgba(0,0,0,0.6);
  box-sizing: border-box;
}
</style>