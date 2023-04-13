<template>
  <component :is="componentName" class="item" v-bind="componentProps">
    <div class="soon" v-if="!isActive">Скоро</div>
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
  </component>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'

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
    isActive: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const imgUrl = computed(() => `/promo/${props.id}/showcase.png`)
    const componentName = computed(() => props.isActive ? 'RouterLink' : 'div')
    const componentProps = computed(() => {
      if (props.isActive) {
        return {
          to: '/slezi-satoshi',
          class: {'-is-active': true},
        }
      }
    })

    return {
      componentProps,
      componentName,
      imgUrl,
    }
  },
  components: {
    RouterLink
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
  contain: paint;
}

.item.-is-active:hover > .cover {
  transform: scale(1.2) rotate(3deg);
}

.cover {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.2s;
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
  z-index: 3;
  color: #fff;
}
</style>