<template>
  <div class="app-page">
    <PromoBackground
      project="slizisatoshi"
    />
    <NuxtPage/>
  </div>
  <!-- <div style="background-color: #fff; position relative; z-index: 1000">

    <DebugHead />
  </div> -->
  <SpeakerVideo v-if="viewport.isGreaterThan('mobileWide') && false"/>
</template>

<script setup lang="ts">
const viewport = useViewport()

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

body, html {
  height: 100%;
  padding: 0;
  margin: 0;
}
#__nuxt {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.app-page {
  overflow-x: hidden;
}

body {
  line-height: 150%;
  font-family: 'Comfortaa', cursive;
  color: rgba(255,255,255,0.8);
  font-size: 20px;
}
</style>