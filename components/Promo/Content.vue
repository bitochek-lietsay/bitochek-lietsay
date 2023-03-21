<template>
    <div
        class="promo-content"
        :class="classList"
    >
        <PromoTop/>
        <div class="content">
            <div class="main">
                <slot name="main"/>
            </div>

            <div class="aside" v-if="$viewport.isGreaterThan('tablet')">
                <slot name="aside"/>
            </div>
        </div>

        <div class="mode">
            <slot name="more"/>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    setup() {
        const { $viewport } = useNuxtApp()

        const classList = computed(() => {
            return {
                '-aside': $viewport.isGreaterThan('tablet')
            }
        })

        return {
            classList,
        }
    }
})
</script>

<style scoped>
.promo-content {
    padding-top: 32px;
    padding-bottom: 128px;
    padding-left: 8px;
    padding-right: 8px;

    position: relative;
    z-index: 1;
    max-width: 1300px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    color: #fff;

    flex-grow: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.promo-content > .content {
    flex-grow: 1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: center;
    min-height: 100vh;
}

.promo-content.-aside > .content {
    grid-template-columns: 1fr 1fr;
}

.promo-content > .content .main {
  justify-self: center;
  text-align: center;
  max-width: 600px;
}

.promo-content.-aside > .content .main {
  justify-self: start;
  text-align: left;
  max-width: 600px;
}

.promo-content > .content .aside {
  max-width: 600px;
}

@media only screen and (max-width: 1023px) {
  .promo-content > .content .aside {
    display: none;
  }
}
</style>