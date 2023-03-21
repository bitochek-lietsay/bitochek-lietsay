<template>
  <div
    v-if="examples"
    class="promo-examples"
  >
    <div style="padding-bottom: 32px;" v-html="textHtml"></div>

    <template
      v-if="!$viewport.isLessThan('tablet')"
    >
      <button
        type="button"
        class="promo-examples-nav -prev"
        @click="prev"
      >
        <MdiChevronLeft/>
      </button>
      
      <button
        type="button"
        class="promo-examples-nav -next"
        @click="next"
      >
        <MdiChevronRight/>
      </button>
    </template>

    <Carousel v-model="currentSlide" :itemsToShow="itemsToShow" :transition="500" snapAlign="center">
      <template #slides>
        <Slide
          v-for="(message, index) in messages"
          @click.capture="currentSlide = index"
          :key="index"
          :index="index"
        >
          <div class="carousel__item">
            <PromoExampleMessage
              :index="index"
              :message="message"
            />
          </div>
        </Slide>
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts">
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import {useActive} from './useActive'
import {marked} from 'marked'
import MdiChevronRight from '~icons/mdi/chevron-right'
import MdiChevronLeft from '~icons/mdi/chevron-left'

export default {
  name: 'App',
  components: {
    MdiChevronRight,
    MdiChevronLeft,
    Carousel,
    Slide,
  },
  props: {
    examples: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const { $viewport } = useNuxtApp()
    const {currentSlide} = useActive()
    const textHtml = computed(() => marked.parse((props.examples.description ?? '')))

    const itemsToShow = computed(() => {
        if ($viewport.isLessThan('tablet')) {
            return 1.5
        }
        if ($viewport.isLessThan('desktop')) {
            return 2
        }

        return 3
    })

    const messages = computed(() => {
      if (itemsToShow.value >= 2) {
        return [null, ...props.examples.messages, null]
      }
      
      return props.examples.messages
    })

    watch(itemsToShow, (itemsToShowVal) => {
      currentSlide.value = Number(itemsToShowVal >= 2)
    }, {immediate: true})

    const next = () => {
      currentSlide.value = Math.min(props.examples.messages.length - Number(itemsToShow.value < 2), currentSlide.value + 1)
    }

    const prev = () => {
      currentSlide.value = Math.max(0 + Number(itemsToShow.value >= 2), currentSlide.value - 1)
    }

    return {
        itemsToShow,
        currentSlide,
        messages,
        textHtml,
        next,
        prev,
    }
  }
}
</script>


<style>
.promo-examples {
  position: relative;
}
.promo-examples .carousel__slide {
  padding: 5px;
}

.promo-examples .carousel__viewport {
  perspective: 2000px;
  overflow: visible;
}

.promo-examples .carousel__track {
  transform-style: preserve-3d;
}

.promo-examples .carousel__slide--sliding {
  transition: opacity 0.3s, transform 0.5s;
}

.promo-examples .carousel__slide {
  opacity: 0;
  transform: rotateY(-90deg) scale(0.7);
}

.promo-examples .carousel__slide--active ~ .carousel__slide {
  transform: rotateY(90deg) scale(0.7);
}

.promo-examples .carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.8) !important;
}

.promo-examples .carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.8) !important;
}

.promo-examples .carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}

.promo-examples .carousel__item {
  display: flex;
    justify-content: center;
    align-items: center;
}

.promo-examples .promo-examples-nav {
  background: transparent;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  display: block;
  color: var(--promo-example-nav-color);
  position: absolute;
  font-size: 48px;
  top: 50%;
  z-index: 1;
}

.promo-examples .promo-examples-nav.-prev {
  left: 0;
}

.promo-examples .promo-examples-nav.-next {
  right: 0;
}
</style>
