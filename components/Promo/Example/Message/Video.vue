<template>
    <div @click="togglePlay()">
        <video class="video" ref="video" loop key="vidos" v-once :controls="false"></video>
    </div>
</template>

<script lang="ts">
import type { UseMediaSource } from '@vueuse/core'
import { useActive } from '../useActive'

export default defineComponent({
    props: {
        index: {
            type: Number,
            required: true,
        },
        src: {
            type: [String, Object] as PropType<string | UseMediaSource | UseMediaSource[]>,
            required: true,
        }
    },
    setup(props) {
        const isOpen = ref(false)
        const {currentSlide} = useActive()

        const video = templateRef<HTMLVideoElement>('video')
        const { playing, currentTime, muted } = useMediaControls(video, { 
            src: toRef(props, 'src'),
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
            togglePlay
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