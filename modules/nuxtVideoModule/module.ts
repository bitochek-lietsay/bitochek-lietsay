import { defineNuxtModule, addTemplate, addImports, createResolver, addComponent, addPlugin } from '@nuxt/kit'
import { prepareVideo } from './prepareVideo'

type ModuleOptions = {}

export default defineNuxtModule<ModuleOptions>({
  hooks: {
    'build:done': prepareVideo
  }
})
