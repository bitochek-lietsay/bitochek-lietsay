<template>
  <div class="promo-background">

  </div>
</template>

<style scoped>
@keyframes gradient {
    0% {
        background-position: 50% 0%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.promo-background {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  background: 
  radial-gradient(59.64% 159.72% at 84.55% 19.18%, rgba(61, 216, 252, 0.126) 0%, rgba(61, 216, 252, 0) 100%),
  radial-gradient(58.33% 128.2% at 6.6% 94.43%, rgba(247, 82, 224, 0.2) 0%, rgba(247, 82, 224, 0) 100%),
  black;
  background-size: 150%;
  animation: gradient 15s ease infinite;
  animation-direction: alternate;
}
</style>