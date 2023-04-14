<template>
  <div @click="togglePlay()">
    <video
      v-once
      :poster="posterUrl"
      ref="video"
      loop
      playsinline
      class="video"
      key="vidos"
      preload="auto"
      tabindex="-1"
      controlsList="nodownload nofullscreen noremoteplayback"
    ></video>
  </div>
</template>

<script lang="ts">
import { useActive } from '../useActive'
import { resolveVideoPath } from '~~/utils/video/resolveVideoPath'

export default defineComponent({
    props: {
      index: {
        type: Number,
        required: true,
      },
      src: {
        type: [String, Object] as PropType<string>,
        required: true,
      }
    },
    setup(props) {
      const isOpen = ref(false)
      const {currentSlide} = useActive()
      const $img = useImage()
      const posterUrl = computed(() => $img(`${props.src}/cover.jpg` , { width: 400, quality: 30, format: 'jpeg', }))
      const videoSrc = computed(() => resolveVideoPath(props.src))

      const video = templateRef<HTMLVideoElement>('video')
      const { playing, currentTime, muted } = useMediaControls(video, { 
        src: videoSrc,
      })

      const togglePlay = (value: boolean = !isOpen.value) => {
        if (value && currentSlide.value !== props.index) {
          return false
        }

        isOpen.value = value
        currentTime.value = 0
        muted.value = !value
        playing.value = value
      }

      watch(currentSlide, (currentSlideVal) => {
        if (currentSlideVal !== props.index && isOpen.value) {
          togglePlay(false)
          currentTime.value = 0
        }
      })

      return {
        isOpen,
        togglePlay,
        posterUrl,
      }
    },
})

</script>

<style>
.video {
  width: 100%;
  cursor: pointer;
  border-radius: 24px 24px 0 0;
}
</style>