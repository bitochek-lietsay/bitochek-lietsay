import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        rootId: '__slezi-satoshi__',
    },
    nitro: {
        plugins: [path.resolve('./nitro/plugins/yandexMetrikaPlugin.ts')]
    },
    telemetry: false,
    modules: [
        ['unplugin-icons/nuxt', {
            
        }],
        '@nuxt/image-edge',
        '@vueuse/nuxt',
        'nuxt-purgecss',
        'nuxt-viewport',
        '@nuxt/content',
        'nuxt-unhead',
    ],
    viewport: {
      /* Viewport options */
    },
    image: {
        dir: 'public/',
        staticFilename: '[publicPath]/images/[name]-[hash][ext]',
        // provider: 'static',
        // providers: {
        //     static: {
        //         dir: 'static/images',
        //     }
        // },
    },
    purgecss: {
        enabled: true, // Always enable purgecss
        safelist: ['my-class', /^carousel__.*/], // Add my-class token to the safelist (e.g. .my-class)
    },
})
