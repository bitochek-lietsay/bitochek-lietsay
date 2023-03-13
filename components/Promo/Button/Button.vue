<template>
    <component :is="tag" class="button">
        <slot/>
    </component>
</template>

<script lang="ts">
export default defineComponent({
    props: {
        tag: {
            type: String,
            default: 'a',
        }
    },
})
</script>

<style>
.button, .button:hover, .button:focus {
    display: inline-block;
    outline: none;
    background-color: black;
    background-image: 
    radial-gradient(100% 267.82% at 100% 0%, rgba(61, 216, 252, 0.9) 0%, rgba(61, 216, 252, 0) 100%),
    radial-gradient(100% 267.82% at 0% 100%, rgba(247, 82, 224, 0.9) 0%, rgba(247, 82, 224, 0) 100%);
    border-radius: 8px;
    box-shadow: 0 15px 15px -10px rgba(247, 82, 224, 0.4);
    color: #fff;
    padding: 16px 48px;
    transition: background-position 0.3s, box-shadow 0.3s;
    background-size: 150% 150%;
    text-decoration: none;
}

.button:hover, .button:focus {
    background-position: 0% 100%;
    box-shadow: 0 15px 20px -10px rgba(247, 82, 224, 0.4);
}
</style>