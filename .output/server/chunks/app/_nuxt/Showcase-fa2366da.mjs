import { defineComponent, computed, ref, h, useSSRContext, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, mergeProps, toRef, onUnmounted, watch, openBlock, createElementBlock, createElementVNode, resolveDynamicComponent, renderSlot, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderVNode, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { g as useImage, h as getFileExtension, p as parseSize, _ as _export_sfc, i as createSharedComposable, d as useNuxtApp, j as useMediaControls, r as resolveVideoPath, t as templateRef } from '../server.mjs';
import { u as useHead } from './composables-6110c19f.mjs';
import { marked } from 'marked';
import { RouterLink } from 'vue-router';
import { u as useAsyncData, q as queryContent } from './query-b51acd0b.mjs';

const baseImageProps = {
  src: { type: String, required: true },
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  preload: { type: Boolean, default: void 0 },
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: { type: String, default: void 0 },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding
    };
  });
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const pictureProps = {
  ...baseImageProps,
  legacyFormat: { type: String, default: null },
  imgAttrs: { type: Object, default: null }
};
const __nuxt_component_0$1$1 = /* @__PURE__ */ defineComponent({
  name: "NuxtPicture",
  props: pictureProps,
  emits: ["load"],
  setup: (props, ctx) => {
    var _a, _b, _c;
    const $img = useImage();
    const _base = useBaseImage(props);
    const isTransparent = computed(() => ["png", "webp", "gif"].includes(originalFormat.value));
    const originalFormat = computed(() => getFileExtension(props.src));
    const format = computed(() => props.format || originalFormat.value === "svg" ? "svg" : "webp");
    const legacyFormat = computed(() => {
      if (props.legacyFormat) {
        return props.legacyFormat;
      }
      const formats = {
        webp: isTransparent.value ? "png" : "jpeg",
        svg: "png"
      };
      return formats[format.value] || originalFormat.value;
    });
    const sources = computed(() => {
      if (format.value === "svg") {
        return [{ srcset: props.src }];
      }
      const formats = legacyFormat.value !== format.value ? [legacyFormat.value, format.value] : [format.value];
      return formats.map((format2) => {
        const { srcset, sizes, src } = $img.getSizes(props.src, {
          ..._base.options.value,
          sizes: props.sizes || $img.options.screens,
          modifiers: { ..._base.modifiers.value, format: format2 }
        });
        return { src, type: `image/${format2}`, sizes, srcset };
      });
    });
    if (props.preload) {
      const srcKey = ((_a = sources.value) == null ? void 0 : _a[1]) ? 1 : 0;
      const link = { rel: "preload", as: "image", imagesrcset: sources.value[srcKey].srcset };
      if ((_c = (_b = sources.value) == null ? void 0 : _b[srcKey]) == null ? void 0 : _c.sizes) {
        link.imagesizes = sources.value[srcKey].sizes;
      }
      useHead({ link: [link] });
    }
    const imgAttrs = { ...props.imgAttrs, "data-nuxt-pic": "" };
    for (const key in ctx.attrs) {
      if (key in baseImageProps && !(key in imgAttrs)) {
        imgAttrs[key] = ctx.attrs[key];
      }
    }
    const imgEl = ref();
    return () => {
      var _a2;
      return h("picture", { key: sources.value[0].src }, [
        ...((_a2 = sources.value) == null ? void 0 : _a2[1]) ? [h("source", {
          type: sources.value[1].type,
          sizes: sources.value[1].sizes,
          srcset: sources.value[1].srcset
        })] : [],
        h("img", {
          ref: imgEl,
          ..._base.attrs.value,
          ...imgAttrs,
          src: sources.value[0].src,
          sizes: sources.value[0].sizes,
          srcset: sources.value[0].srcset
        })
      ]);
    };
  }
});
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
};
const __nuxt_component_0$5 = /* @__PURE__ */ defineComponent({
  name: "NuxtImg",
  props: imgProps,
  emits: ["load"],
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (props.sizes) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          }
        }]
      });
    }
    const imgEl = ref();
    return () => h("img", {
      ref: imgEl,
      key: src.value,
      src: src.value,
      ...attrs.value,
      ...ctx.attrs
    });
  }
});

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  props: {
    tag: {
      type: String,
      default: "a"
    }
  }
});
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.tag), mergeProps({ class: "button" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }), _parent);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Button/Button.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a]]);
const _hoisted_1$2 = {
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = ["id"];
const _hoisted_3$2 = /* @__PURE__ */ createElementVNode("stop", {
  offset: "0%",
  "stop-color": "#2AABEE"
}, null, -1);
const _hoisted_4$1 = /* @__PURE__ */ createElementVNode("stop", {
  offset: "100%",
  "stop-color": "#229ED9"
}, null, -1);
const _hoisted_5 = [
  _hoisted_3$2,
  _hoisted_4$1
];
const _hoisted_6 = ["fill"];
const _hoisted_7 = /* @__PURE__ */ createElementVNode("path", {
  fill: "#FFF",
  d: "M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z"
}, null, -1);
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [
    createElementVNode("defs", null, [
      createElementVNode("linearGradient", {
        id: _ctx.idMap["logosTelegram0"],
        x1: "50%",
        x2: "50%",
        y1: "0%",
        y2: "100%"
      }, _hoisted_5, 8, _hoisted_2$2)
    ]),
    createElementVNode("path", {
      fill: "url(#" + _ctx.idMap["logosTelegram0"] + ")",
      d: "M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"
    }, null, 8, _hoisted_6),
    _hoisted_7
  ]);
}
const LogosTelegram = { name: "logos-telegram", render: render$2, data() {
  const __randId = () => Math.random().toString(36).substr(2, 10);
  const idMap = { "logosTelegram0": "uicons-" + __randId() };
  return { idMap };
} };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  props: {
    text: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  },
  components: {
    LogosTelegram
  }
});
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_PromoButton = __nuxt_component_0$4;
  const _component_LogosTelegram = resolveComponent("LogosTelegram");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-857631fd>`);
  _push(ssrRenderComponent(_component_PromoButton, { href: _ctx.href }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.text)} `);
        _push2(ssrRenderComponent(_component_LogosTelegram, {
          style: { "vertical-align": "sub" },
          class: "icon"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.text) + " ", 1),
          createVNode(_component_LogosTelegram, {
            style: { "vertical-align": "sub" },
            class: "icon"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Action.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9], ["__scopeId", "data-v-857631fd"]]);
const _sfc_main$8 = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "promo-top" }, _attrs))}> \u0421\u0435\u0440\u0432\u0438\u0441 \u043F\u043E \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0438\u0437 \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0445 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u043A\u0440\u0438\u043F\u0442\u043E\u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432. </div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Top.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  setup() {
    const { $viewport } = useNuxtApp();
    const classList = computed(() => {
      return {
        "-aside": $viewport.isGreaterThan("tablet")
      };
    });
    return {
      classList
    };
  }
});
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_PromoTop = __nuxt_component_0$3;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["promo-content", _ctx.classList]
  }, _attrs))} data-v-b2373126>`);
  _push(ssrRenderComponent(_component_PromoTop, null, null, _parent));
  _push(`<div class="content" data-v-b2373126><div class="main" data-v-b2373126>`);
  ssrRenderSlot(_ctx.$slots, "main", {}, null, _push, _parent);
  _push(`</div>`);
  if (_ctx.$viewport.isGreaterThan("tablet")) {
    _push(`<div class="aside" data-v-b2373126>`);
    ssrRenderSlot(_ctx.$slots, "aside", {}, null, _push, _parent);
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="mode" data-v-b2373126>`);
  ssrRenderSlot(_ctx.$slots, "more", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Content.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-b2373126"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  props: {
    description: {
      type: String,
      required: true
    }
  }
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "promo-description" }, _attrs))} data-v-cda0f55e>${_ctx.description}</div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Description.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-cda0f55e"]]);
const _hoisted_1$1 = {
  viewBox: "0 0 512 512",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode("path", {
  d: "M199.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$1 = /* @__PURE__ */ createElementVNode("path", {
  d: "M375.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4 = [
  _hoisted_2$1,
  _hoisted_3$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_4);
}
const IonIosPause = { name: "ion-ios-pause", render: render$1 };
const _hoisted_1 = {
  viewBox: "0 0 512 512",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  d: "M128 104.3v303.4c0 6.4 6.5 10.4 11.7 7.2l240.5-151.7c5.1-3.2 5.1-11.1 0-14.3L139.7 97.2c-5.2-3.3-11.7.7-11.7 7.1z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const IonIosPlay = { name: "ion-ios-play", render };
const useActive = createSharedComposable(() => {
  const currentSlide = ref(0);
  return {
    currentSlide
  };
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  props: {
    index: {
      type: Number,
      required: true
    },
    src: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    const { currentSlide } = useActive();
    const audio = ref();
    const { playing, currentTime, duration, muted, volume } = useMediaControls(audio, {
      src: toRef(props, "src")
    });
    onUnmounted(() => {
      if (audio.value) {
        document.body.removeChild(audio.value);
      }
    });
    const togglePlay = (value) => {
      if (value && currentSlide.value !== props.index) {
        return false;
      }
      playing.value = value;
      muted.value = !value;
    };
    watch(currentSlide, (currentSlideVal) => {
      if (currentSlideVal !== props.index) {
        togglePlay(false);
        currentTime.value = 0;
      }
    });
    const durationStr = computed(() => {
      const { value: currentTimeVal } = currentTime;
      const time = currentTimeVal === 0 ? duration.value : currentTimeVal;
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time - minutes * 60);
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    });
    const progressStr = computed(() => {
      const { value: currentTimeVal } = currentTime;
      const { value: durationVal } = duration;
      return `${Math.floor(currentTimeVal / durationVal * 100)}%`;
    });
    return {
      togglePlay,
      durationStr,
      progressStr,
      playing,
      duration,
      currentTime
    };
  },
  components: {
    IonIosPause,
    IonIosPlay
  }
});
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_IonIosPause = resolveComponent("IonIosPause");
  const _component_IonIosPlay = resolveComponent("IonIosPlay");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "audio",
    style: { "--promo-message-audio-progress": _ctx.progressStr }
  }, _attrs))}><button class="play">`);
  if (_ctx.playing) {
    _push(ssrRenderComponent(_component_IonIosPause, { class: "icon" }, null, _parent));
  } else {
    _push(ssrRenderComponent(_component_IonIosPlay, { class: "icon" }, null, _parent));
  }
  _push(`</button><div><div class="wave"><input class="range" type="range" min="0"${ssrRenderAttr("step", 1)}${ssrRenderAttr("max", _ctx.duration)}${ssrRenderAttr("value", _ctx.currentTime)}${ssrIncludeBooleanAttr(!_ctx.playing) ? " disabled" : ""}><svg class="svg" viewBox="0 0 226 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_64_1158)"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.89543 0 2V21H4V2C4 0.895431 3.10457 0 2 0ZM8 5C6.89543 5 6 5.89543 6 7V26H10V7C10 5.89543 9.10457 5 8 5ZM12 5C12 3.89543 12.8954 3 14 3C15.1046 3 16 3.89543 16 5V24H12V5ZM20 1C18.8954 1 18 1.89543 18 3V22H22V3C22 1.89543 21.1046 1 20 1ZM24 2C24 0.89543 24.8954 0 26 0C27.1046 0 28 0.895431 28 2V21H24V2ZM32 1C30.8954 1 30 1.89543 30 3V22H34V3C34 1.89543 33.1046 1 32 1ZM36 3C36 1.89543 36.8954 1 38 1C39.1046 1 40 1.89543 40 3V22H36V3ZM44 0C42.8954 0 42 0.89543 42 2V21H46V2C46 0.895431 45.1046 0 44 0ZM48 2C48 0.89543 48.8954 0 50 0C51.1046 0 52 0.895431 52 2V21H48V2ZM56 4C54.8954 4 54 4.89543 54 6V25H58V6C58 4.89543 57.1046 4 56 4ZM60 10C60 8.89543 60.8954 8 62 8C63.1046 8 64 8.89543 64 10V29H60V10ZM68 0C66.8954 0 66 0.89543 66 2V21H70V2C70 0.895431 69.1046 0 68 0ZM72 2C72 0.89543 72.8954 0 74 0C75.1046 0 76 0.895431 76 2V21H72V2ZM80 1C78.8954 1 78 1.89543 78 3V22H82V3C82 1.89543 81.1046 1 80 1ZM84 5C84 3.89543 84.8954 3 86 3C87.1046 3 88 3.89543 88 5V24H84V5ZM92 1C90.8954 1 90 1.89543 90 3V22H94V3C94 1.89543 93.1046 1 92 1ZM96 4C96 2.89543 96.8954 2 98 2C99.1046 2 100 2.89543 100 4V23H96V4ZM104 5C102.895 5 102 5.89543 102 7V26H106V7C106 5.89543 105.105 5 104 5ZM108 5C108 3.89543 108.895 3 110 3C111.105 3 112 3.89543 112 5V24H108V5ZM116 3C114.895 3 114 3.89543 114 5V24H118V5C118 3.89543 117.105 3 116 3ZM120 2C120 0.89543 120.895 0 122 0C123.105 0 124 0.895431 124 2V21H120V2ZM128 4C126.895 4 126 4.89543 126 6V25H130V6C130 4.89543 129.105 4 128 4ZM132 2C132 0.89543 132.895 0 134 0C135.105 0 136 0.895431 136 2V21H132V2ZM140 4C138.895 4 138 4.89543 138 6V25H142V6C142 4.89543 141.105 4 140 4ZM144 2C144 0.89543 144.895 0 146 0C147.105 0 148 0.895431 148 2V21H144V2ZM152 1C150.895 1 150 1.89543 150 3V22H154V3C154 1.89543 153.105 1 152 1ZM156 6C156 4.89543 156.895 4 158 4C159.105 4 160 4.89543 160 6V25H156V6ZM164 0C162.895 0 162 0.89543 162 2V21H166V2C166 0.895431 165.105 0 164 0ZM168 2C168 0.89543 168.895 0 170 0C171.105 0 172 0.895431 172 2V21H168V2ZM176 0C174.895 0 174 0.89543 174 2V21H178V2C178 0.895431 177.105 0 176 0ZM180 2C180 0.89543 180.895 0 182 0C183.105 0 184 0.895431 184 2V21H180V2ZM188 1C186.895 1 186 1.89543 186 3V22H190V3C190 1.89543 189.105 1 188 1ZM192 5C192 3.89543 192.895 3 194 3C195.105 3 196 3.89543 196 5V24H192V5ZM200 1C198.895 1 198 1.89543 198 3V22H202V3C202 1.89543 201.105 1 200 1ZM204 4C204 2.89543 204.895 2 206 2C207.105 2 208 2.89543 208 4V23H204V4ZM212 4C210.895 4 210 4.89543 210 6V25H214V6C214 4.89543 213.105 4 212 4ZM216 8C216 6.89543 216.895 6 218 6C219.105 6 220 6.89543 220 8V27H216V8ZM224 14C222.895 14 222 14.8954 222 16V35H226V16C226 14.8954 225.105 14 224 14Z" fill="#fff"></path></g><defs><clipPath id="clip0_64_1158"><rect width="226" height="21" fill="white"></rect></clipPath></defs></svg></div> ${ssrInterpolate(_ctx.durationStr)}</div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Example/Message/Audio.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  props: {
    index: {
      type: Number,
      required: true
    },
    src: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    const isOpen = ref(false);
    const { currentSlide } = useActive();
    const $img = useImage();
    const posterUrl = computed(() => $img(`${props.src}/cover.jpg`, { width: 400, quality: 30, format: "jpeg" }));
    const videoSrc = computed(() => resolveVideoPath(props.src));
    const video = templateRef("video");
    const { playing, currentTime, muted } = useMediaControls(video, {
      src: videoSrc
    });
    const togglePlay = (value = !isOpen.value) => {
      if (value && currentSlide.value !== props.index) {
        return false;
      }
      isOpen.value = value;
      currentTime.value = 0;
      muted.value = !value;
      playing.value = value;
    };
    watch(currentSlide, (currentSlideVal) => {
      if (currentSlideVal !== props.index && isOpen.value) {
        togglePlay(false);
        currentTime.value = 0;
      }
    });
    return {
      isOpen,
      togglePlay,
      posterUrl
    };
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><video${ssrRenderAttr("poster", _ctx.posterUrl)} loop playsinline class="video" preload="auto" tabindex="-1" controlsList="nodownload nofullscreen noremoteplayback"></video></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Example/Message/Video.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  props: {
    index: {
      type: Number,
      required: true
    },
    message: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const textHtml = computed(() => {
      var _a;
      return marked.parse((_a = props.message.md) != null ? _a : "");
    });
    return { textHtml };
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b, _c;
  const _component_PromoExampleMessageAudio = __nuxt_component_0$1;
  const _component_PromoExampleMessageVideo = __nuxt_component_1;
  const _component_nuxt_picture = __nuxt_component_0$1$1;
  if (_ctx.message) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "promo-example-message" }, _attrs))}>`);
    if (((_a = _ctx.message.media) == null ? void 0 : _a.type) === "audio") {
      _push(ssrRenderComponent(_component_PromoExampleMessageAudio, {
        src: _ctx.message.media.src,
        index: _ctx.index
      }, null, _parent));
    } else if (((_b = _ctx.message.media) == null ? void 0 : _b.type) === "video") {
      _push(ssrRenderComponent(_component_PromoExampleMessageVideo, {
        src: _ctx.message.media.src,
        index: _ctx.index
      }, null, _parent));
    } else if (((_c = _ctx.message.media) == null ? void 0 : _c.type) === "image") {
      _push(ssrRenderComponent(_component_nuxt_picture, {
        src: _ctx.message.media.src,
        imgAttrs: { style: "display:block; width:100%" }
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="text">`);
    if (_ctx.message.md) {
      _push(`<span class="content">${_ctx.textHtml}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<span class="time">99K, ${ssrInterpolate(_ctx.message.date)}</span></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Example/Message/Message.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    src: {
      type: String,
      required: true
    }
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_picture = __nuxt_component_0$1$1;
  _push(ssrRenderComponent(_component_nuxt_picture, mergeProps({
    src: _ctx.src,
    imgAttrs: { class: "image", style: "display:block" }
  }, _attrs), null, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Image.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const imgUrl = computed(() => `/promo/${props.id}/showcase.png`);
    const componentName = computed(() => props.isActive ? "RouterLink" : "div");
    const componentProps = computed(() => {
      if (props.isActive) {
        return {
          to: "/slezi-satoshi",
          class: { "-is-active": true }
        };
      }
    });
    return {
      componentProps,
      componentName,
      imgUrl
    };
  },
  components: {
    RouterLink
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_img = __nuxt_component_0$5;
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.componentName), mergeProps({ class: "item" }, _ctx.componentProps, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (!_ctx.isActive) {
          _push2(`<div class="soon" data-v-ccdc2be5${_scopeId}>\u0421\u043A\u043E\u0440\u043E</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="label" data-v-ccdc2be5${_scopeId}>${ssrInterpolate(_ctx.name)}</div>`);
        _push2(ssrRenderComponent(_component_nuxt_img, {
          src: _ctx.imgUrl,
          fit: "cover",
          class: "cover",
          width: "600",
          height: "450",
          quality: "80",
          loading: "lazy",
          format: "webp"
        }, null, _parent2, _scopeId));
      } else {
        return [
          !_ctx.isActive ? (openBlock(), createBlock("div", {
            key: 0,
            class: "soon"
          }, "\u0421\u043A\u043E\u0440\u043E")) : createCommentVNode("", true),
          createVNode("div", { class: "label" }, toDisplayString(_ctx.name), 1),
          createVNode(_component_nuxt_img, {
            src: _ctx.imgUrl,
            fit: "cover",
            class: "cover",
            width: "600",
            height: "450",
            quality: "80",
            loading: "lazy",
            format: "webp"
          }, null, 8, ["src"])
        ];
      }
    }),
    _: 1
  }), _parent);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Showcase/Item.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-ccdc2be5"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { data: items } = useAsyncData(`allPromoData-${props.isActive}`, () => queryContent().where({ isActive: props.isActive }).find());
    return {
      items
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_PromoShowcaseItem = __nuxt_component_0;
  _push(`<!--[--><div class="description" data-v-7f7b957e>${ssrInterpolate(_ctx.description)}</div><div class="list" data-v-7f7b957e><!--[-->`);
  ssrRenderList(_ctx.items, (promo) => {
    _push(ssrRenderComponent(_component_PromoShowcaseItem, {
      id: promo.path,
      name: promo.showcase.name,
      isActive: _ctx.isActive
    }, null, _parent));
  });
  _push(`<!--]--></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promo/Showcase/Showcase.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7f7b957e"]]);

export { __nuxt_component_0$2 as _, __nuxt_component_1$1 as a, __nuxt_component_2 as b, __nuxt_component_3 as c, __nuxt_component_5 as d, __nuxt_component_4 as e, useActive as u };
//# sourceMappingURL=Showcase-fa2366da.mjs.map
