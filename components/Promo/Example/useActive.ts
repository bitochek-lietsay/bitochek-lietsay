export const useActive = createSharedComposable(() => {
    const currentSlide = ref(0)

    return {
        currentSlide
    }
})