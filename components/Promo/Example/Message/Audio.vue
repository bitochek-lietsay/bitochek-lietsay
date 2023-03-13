<template>
    <div
        class="audio"
        :style="{'--promo-message-audio-progress': progressStr}"
    >
        <button class="play" @click="togglePlay(!playing)">
            <IonIosPause class="icon" v-if="playing"/>
            <IonIosPlay class="icon" v-else/>
        </button>
        <div>
            <div class="wave" ref="wave" @touchmove.prevent="">
                <input class="range" type="range" min="0" :step="1" :max="duration" v-model="currentTime" :disabled="!playing">
                <svg class="svg" viewBox="0 0 226 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_64_1158)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.89543 0 2V21H4V2C4 0.895431 3.10457 0 2 0ZM8 5C6.89543 5 6 5.89543 6 7V26H10V7C10 5.89543 9.10457 5 8 5ZM12 5C12 3.89543 12.8954 3 14 3C15.1046 3 16 3.89543 16 5V24H12V5ZM20 1C18.8954 1 18 1.89543 18 3V22H22V3C22 1.89543 21.1046 1 20 1ZM24 2C24 0.89543 24.8954 0 26 0C27.1046 0 28 0.895431 28 2V21H24V2ZM32 1C30.8954 1 30 1.89543 30 3V22H34V3C34 1.89543 33.1046 1 32 1ZM36 3C36 1.89543 36.8954 1 38 1C39.1046 1 40 1.89543 40 3V22H36V3ZM44 0C42.8954 0 42 0.89543 42 2V21H46V2C46 0.895431 45.1046 0 44 0ZM48 2C48 0.89543 48.8954 0 50 0C51.1046 0 52 0.895431 52 2V21H48V2ZM56 4C54.8954 4 54 4.89543 54 6V25H58V6C58 4.89543 57.1046 4 56 4ZM60 10C60 8.89543 60.8954 8 62 8C63.1046 8 64 8.89543 64 10V29H60V10ZM68 0C66.8954 0 66 0.89543 66 2V21H70V2C70 0.895431 69.1046 0 68 0ZM72 2C72 0.89543 72.8954 0 74 0C75.1046 0 76 0.895431 76 2V21H72V2ZM80 1C78.8954 1 78 1.89543 78 3V22H82V3C82 1.89543 81.1046 1 80 1ZM84 5C84 3.89543 84.8954 3 86 3C87.1046 3 88 3.89543 88 5V24H84V5ZM92 1C90.8954 1 90 1.89543 90 3V22H94V3C94 1.89543 93.1046 1 92 1ZM96 4C96 2.89543 96.8954 2 98 2C99.1046 2 100 2.89543 100 4V23H96V4ZM104 5C102.895 5 102 5.89543 102 7V26H106V7C106 5.89543 105.105 5 104 5ZM108 5C108 3.89543 108.895 3 110 3C111.105 3 112 3.89543 112 5V24H108V5ZM116 3C114.895 3 114 3.89543 114 5V24H118V5C118 3.89543 117.105 3 116 3ZM120 2C120 0.89543 120.895 0 122 0C123.105 0 124 0.895431 124 2V21H120V2ZM128 4C126.895 4 126 4.89543 126 6V25H130V6C130 4.89543 129.105 4 128 4ZM132 2C132 0.89543 132.895 0 134 0C135.105 0 136 0.895431 136 2V21H132V2ZM140 4C138.895 4 138 4.89543 138 6V25H142V6C142 4.89543 141.105 4 140 4ZM144 2C144 0.89543 144.895 0 146 0C147.105 0 148 0.895431 148 2V21H144V2ZM152 1C150.895 1 150 1.89543 150 3V22H154V3C154 1.89543 153.105 1 152 1ZM156 6C156 4.89543 156.895 4 158 4C159.105 4 160 4.89543 160 6V25H156V6ZM164 0C162.895 0 162 0.89543 162 2V21H166V2C166 0.895431 165.105 0 164 0ZM168 2C168 0.89543 168.895 0 170 0C171.105 0 172 0.895431 172 2V21H168V2ZM176 0C174.895 0 174 0.89543 174 2V21H178V2C178 0.895431 177.105 0 176 0ZM180 2C180 0.89543 180.895 0 182 0C183.105 0 184 0.895431 184 2V21H180V2ZM188 1C186.895 1 186 1.89543 186 3V22H190V3C190 1.89543 189.105 1 188 1ZM192 5C192 3.89543 192.895 3 194 3C195.105 3 196 3.89543 196 5V24H192V5ZM200 1C198.895 1 198 1.89543 198 3V22H202V3C202 1.89543 201.105 1 200 1ZM204 4C204 2.89543 204.895 2 206 2C207.105 2 208 2.89543 208 4V23H204V4ZM212 4C210.895 4 210 4.89543 210 6V25H214V6C214 4.89543 213.105 4 212 4ZM216 8C216 6.89543 216.895 6 218 6C219.105 6 220 6.89543 220 8V27H216V8ZM224 14C222.895 14 222 14.8954 222 16V35H226V16C226 14.8954 225.105 14 224 14Z" fill="#fff"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_64_1158">
                            <rect width="226" height="21" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>

            {{ durationStr }}
        </div>
    </div>
</template>

<script lang="ts">
import type { UseMediaSource } from '@vueuse/core'
import IonIosPause from '~icons/ion/ios-pause'
import IonIosPlay from '~icons/ion/ios-play'
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
        const {currentSlide} = useActive()
        const audio = ref<HTMLAudioElement>()
        const { playing, currentTime, duration, muted, volume} = useMediaControls(audio, {
            src: toRef(props, 'src'),
        })

        onMounted(() => {
            volume.value = 1
            audio.value = document.createElement('audio')
            document.body.appendChild(audio.value)
        })

        const togglePlay = (value: boolean) => {
            if (value && currentSlide.value !== props.index) {
                return false
            }
            
            playing.value = value
            muted.value = !value
        }

        watch(currentSlide, (currentSlideVal) => {
            if (currentSlideVal !== props.index) {
                togglePlay(false)
                currentTime.value = 0
            }
        })        

        const durationStr = computed(() => {
            const {value: currentTimeVal} = currentTime

            const time = currentTimeVal === 0 ? duration.value : currentTimeVal

            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time - minutes * 60);

            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        })

        const progressStr = computed(() => {
            const {value: currentTimeVal} = currentTime
            const {value: durationVal} = duration

            return `${Math.floor((currentTimeVal / durationVal) * 100)}%`
        })

        return {
            togglePlay,
            durationStr,
            progressStr,
            playing,
            duration,
            currentTime,
        }
    },
    components: {
        IonIosPause,
        IonIosPlay,
    }
})
</script>

<style>
.audio {
    text-align: left;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    font-size: 14px;
    line-height: 1;
}
.audio > .play {
    cursor: pointer;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background: #b3c5d8;
    border:none;
    outline: none;
    margin-right: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.audio > .play > .icon {
    font-size: 24px;
    color: #21303f;
}

@media only screen and (max-width: 600px) {
    .audio > .play {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        background: #b3c5d8;
        border:none;
        outline: none;
        margin-right: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
    }

    .audio > .play > .icon {
        font-size: 24px;
        color: #21303f;
    }
}

.wave {
  display: block;
  margin-bottom: 4px;
  position: relative;
  overflow: hidden;
}

.wave > .svg {
  width: 100%;
}

.wave::after {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: #21303fad;
    left: 0;
    top: 0;
    transform: translateX(var(--promo-message-audio-progress));
}


.wave > .range {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;
    padding: 0;
    margin: 0;
}
</style>