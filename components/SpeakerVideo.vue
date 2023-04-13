<template>
  <div ref="root" class="speaker-video" :class="classList" :style="styleList" @click="() => toggleOpen()">
    <video
      v-show="isShowVideo"
      ref="video"
      autoplay
      :muted="!isOpen"
      class="video"
      preload="auto"
      tabindex="-1"
      playsinline
      controlsList="nodownload nofullscreen noremoteplayback"
    />

    <RouterLink to="/referral" class="small-label" :disabled="!isOpen">
      {{ labelText }}
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { resolveVideoPath } from '~~/utils/video/resolveVideoPath'

export default defineComponent({
  setup() {
    const $img = useImage()
    const styleList = computed(() => {
      const imgUrl = $img('/referral/speaker-video/static-cover.png' , { width: 240, quality: 30, format: 'jpeg', })
      return { backgroundImage: `url('${imgUrl}')` }
    })
    const isShowVideo = refAutoReset(true, 200)

    const [isOpen, toggleOpen] = useToggle(false)
    const video = templateRef<HTMLVideoElement>('video')
    const root = templateRef<HTMLVideoElement>('root')
    const videoSrc = computed(() => resolveVideoPath(
      isOpen.value ? '/referral/speaker-video/large-video' : '/referral/speaker-video/small-video-cover'
    ))
    const { playing, waiting, muted, ended, currentTime } = useMediaControls(video, { 
      src: videoSrc,
    })

    onMounted(() => playing.value = true)

    watch(ended, endedValue => {
      if (endedValue) {
        muted.value = isOpen.value
        playing.value = true

        if (isOpen.value) {
          currentTime.value = 90.55
        }
      }
    })

    syncRef(muted, isOpen, { direction: 'rtl' })

    watch(isOpen, (isOpenValue) => {
      isShowVideo.value = false
      muted.value = isOpenValue
      playing.value = true
    })

    onClickOutside(root, () => {
      isOpen.value = false
    })

    const labelText = computed(() => isOpen.value ? '👉 Перейти 👈' : 'Рефералка')

    const classList = computed(() => ({
      '-is-open': isOpen.value,
    }))

    return {
      playing,
      waiting,
      toggleOpen,
      classList,
      isOpen,
      styleList,
      isShowVideo,
      labelText,
    }
  }
})
</script>

<style>
.speaker-video {
  --transition-delay: 0s;
  --width: 100px;
  --height: 100px;
  --border-radius: 30px 30px 0 30px;
  --label-border-radius: 20px 20px 0 20px;
  --scale: 0.8;
  width: var(--width);
  height: var(--height);
  position: fixed;
  z-index: 100;
  right: 20px;
  bottom: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 0 20px #000;
  background-size: cover;
  background-position-y: -20px;

  background-color: #332441;

  transition: transform 0.2s, width 0.2s, height 0.2s, border-radius 0.2s;
  transition-delay: var(--transition-delay);
  transform: scale(var(--scale));
  transform-origin: right bottom;
  overflow: hidden;
  contain: strict;
  cursor: pointer;
}

.speaker-video:hover {
  --scale: 1;
}

.speaker-video.-is-open {
  --width: 180px;
  --height: 320px;
  --scale: 1;
  --border-radius: 20px 20px 20px 20px;
  background-position-y: 0;
}

.speaker-video > .video {
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  transition: border-radius 0.2s, opacity 0.3s ease-out;
  transition-delay: var(--transition-delay);
  pointer-events: none;
}

.speaker-video > .video::-webkit-media-controls {
  display: none;
}

/* Could Use thise as well for Individual Controls */
.speaker-video > .video::-webkit-media-controls-current-time-display,
.speaker-video > .video::-webkit-media-controls-timeline,
.speaker-video > .video::-webkit-media-controls-mute-button,
.speaker-video > .video::-webkit-media-controls-volume-slider,
.speaker-video > .video::-webkit-media-controls-play-button {display: none;}

.speaker-video > .small-label {
  border-radius: var(--label-border-radius);
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #230d3fbf;;
  font-size: 12px;
  line-height: 1;
  padding: 8px;
  text-align: center;
  transition: width 0.2s, border-radius 0.2s, transform 0.2s, background-color 0.2s;
  transition-delay: var(--transition-delay);
  width: 90px;
  box-sizing: border-box;
  backdrop-filter: blur(2px);
  transform: scale(1);
  transform-origin: center bottom;
  text-decoration: none;
  color: #fff;
  pointer-events: none;
  contain: content;
}

.speaker-video.-is-open > .small-label {
  border-radius: 0;
  width: var(--width);
  transform: scale(1.3);
  cursor: pointer;
  pointer-events: all;
}

.speaker-video.-is-open > .small-label:hover {
  background-color: #cd2eadd3;
}
</style>