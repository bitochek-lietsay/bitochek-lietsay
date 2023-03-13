<template>
    <div class="promo-example-message" v-if="message">
        <PromoExampleMessageAudio
            v-if="message.media?.type === 'audio'"
            :src="message.media.src"
            :index="index"
        />
        <PromoExampleMessageVideo
            v-else-if="message.media?.type === 'video'"
            :src="message.media.src"
            :index="index"
        />

        <nuxt-picture
            v-else-if="message.media?.type === 'image'"
            :src="message.media.src"
            :imgAttrs="{style:'display:block; width:100%'}"
        />
        <div class="text">
            <span class="content" v-if="message.md" v-html="textHtml"></span>
            <span class="time">99K, {{ message.date }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import {marked} from 'marked'

export default defineComponent({
    props: {
        index: {
            type: Number,
            required: true,
        },
        message: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const textHtml = computed(() => marked.parse((props.message.md ?? '')))

        return {textHtml}
    }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
.promo-example-message {
    user-select: none;
    max-width: 350px;
    overflow: hidden;
    background-color: #21303f;
    border-radius: 24px;
    font-family: 'Inter', sans-serif;
    line-height: 110%;
}

.promo-example-message > .text {
    text-align: left;
    font-size: 14px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 8px;
    color: #fff;
}

.promo-example-message > .text > .time {
    float: right;
    font-style: italic;
    font-size: 12px;
    opacity: 0.8;
    margin-left: 20px;
}

.promo-example-message > .text > .content a {
    color: rgb(98 113 255);
    text-decoration: none;
}

.promo-example-message > .text > .content р {
    padding: 0;
    margin: 0;
}
</style>