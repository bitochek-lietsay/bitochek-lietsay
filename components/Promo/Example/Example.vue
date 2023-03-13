<template>
  <div v-if="examples">
    <div style="padding-bottom: 32px;" v-html="textHtml"></div>
    <!-- <button type="button" @click="prev">Prev</button>
    <button type="button" @click="next">Next</button> -->

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
  

      <!-- <Slide :index="examples.messages.length + Number(itemsToShow >= 2)" key="last-empty" v-if="itemsToShow >= 2"/> -->
    </Carousel>
  </div>
</template>

<script lang="ts">
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import {useActive} from './useActive'
import {marked} from 'marked'

export default {
  name: 'App',
  components: {
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

    const next = () => {
      currentSlide.value = Math.min(4 + Number(itemsToShow.value >= 2), currentSlide.value + 1)
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
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: opacity 0.3s, transform 0.5s;
}

.carousel__slide {
  opacity: 0;
  transform: rotateY(-90deg) scale(0.7);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(90deg) scale(0.7);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.8) !important;
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.8) !important;
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}

.carousel__item {
  display: flex;
    justify-content: center;
    align-items: center;
}
</style>
