import { S as E, P as $ } from "./vendor.9c14883d.js";
const M = function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const a of e)
      if (a.type === "childList")
        for (const n of a.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && r(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
    const a = {};
    return (
      e.integrity && (a.integrity = e.integrity),
      e.referrerpolicy && (a.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (a.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (a.credentials = "omit")
        : (a.credentials = "same-origin"),
      a
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const a = o(e);
    fetch(e.href, a);
  }
};
// M();
function S({ swiper: t, extendParams: s, on: o }) {
  s({ panoramaEffect: { depth: 200, rotate: 30 } }),
    o("beforeInit", () => {
      if (t.params.effect !== "panorama") return;
      t.classNames.push(`${t.params.containerModifierClass}panorama`),
        t.classNames.push(`${t.params.containerModifierClass}3d`);
      const r = { watchSlidesProgress: !0 };
      Object.assign(t.params, r), Object.assign(t.originalParams, r);
    }),
    o("progress", () => {
      if (t.params.effect !== "panorama") return;
      const r = t.slidesSizesGrid,
        { depth: e = 200, rotate: a = 30 } = t.params.panoramaEffect,
        g = (a * Math.PI) / 180 / 2,
        h = 1 / (180 / a);
      for (let i = 0; i < t.slides.length; i += 1) {
        const c = t.slides[i],
          P = c.progress,
          d = r[i],
          y = t.params.centeredSlides ? 0 : (t.params.slidesPerView - 1) * 0.5,
          l = P + y,
          f = 1 - Math.cos(l * h * Math.PI),
          m = `${l * (d / 3) * f}px`,
          p = l * a,
          u = `${((d * 0.5) / Math.sin(g)) * f - e}px`;
        c.style.transform =
          t.params.direction === "horizontal"
            ? `translateX(${m}) translateZ(${u}) rotateY(${p}deg)`
            : `translateY(${m}) translateZ(${u}) rotateX(${-p}deg)`;
      }
    }),
    o("setTransition", (r, e) => {
      t.params.effect === "panorama" &&
        t.slides.forEach((a) => {
          a.style.transition = `${e}ms`;
        });
    });
}

// new E(".panorama-slider .swiper", {
//   modules: [$, S],
//   effect: "panorama",
//   slidesPerView: 1.5,
//   loop: !0,
//   loopedSlides: 10,
//   centeredSlides: !0,
//   grabCursor: !0,
//   pagination: {
//     el: ".swiper-pagination",
//     dynamicBullets: !0,
//     dynamicMainBullets: 3,
//   },
//   panoramaEffect: { depth: 150, rotate: 45 },
//   breakpoints: {
//     480: { slidesPerView: 2, panoramaEffect: { rotate: 35, depth: 150 } },
//     640: { slidesPerView: 3, panoramaEffect: { rotate: 30, depth: 150 } },
//     1024: { slidesPerView: 4, panoramaEffect: { rotate: 30, depth: 200 } },
//     1200: { slidesPerView: 5, panoramaEffect: { rotate: 25, depth: 250 } },
//   },
// });

export { E, $, S, M };
