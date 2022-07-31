function Z(t) {
  return (
    t !== null &&
    typeof t == "object" &&
    "constructor" in t &&
    t.constructor === Object
  );
}
function _(t = {}, e = {}) {
  Object.keys(e).forEach((i) => {
    typeof t[i] == "undefined"
      ? (t[i] = e[i])
      : Z(e[i]) && Z(t[i]) && Object.keys(e[i]).length > 0 && _(t[i], e[i]);
  });
}
const ee = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function L() {
  const t = typeof document != "undefined" ? document : {};
  return _(t, ee), t;
}
const me = {
  document: ee,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(t) {
    return typeof setTimeout == "undefined" ? (t(), null) : setTimeout(t, 0);
  },
  cancelAnimationFrame(t) {
    typeof setTimeout != "undefined" && clearTimeout(t);
  },
};
function $() {
  const t = typeof window != "undefined" ? window : {};
  return _(t, me), t;
}
function ge(t) {
  const e = t.__proto__;
  Object.defineProperty(t, "__proto__", {
    get() {
      return e;
    },
    set(i) {
      e.__proto__ = i;
    },
  });
}
class A extends Array {
  constructor(e) {
    if (typeof e == "number") super(e);
    else {
      super(...(e || []));
      ge(this);
    }
  }
}
function B(t = []) {
  const e = [];
  return (
    t.forEach((i) => {
      Array.isArray(i) ? e.push(...B(i)) : e.push(i);
    }),
    e
  );
}
function te(t, e) {
  return Array.prototype.filter.call(t, e);
}
function ve(t) {
  const e = [];
  for (let i = 0; i < t.length; i += 1) e.indexOf(t[i]) === -1 && e.push(t[i]);
  return e;
}
function we(t, e) {
  if (typeof t != "string") return [t];
  const i = [],
    s = e.querySelectorAll(t);
  for (let r = 0; r < s.length; r += 1) i.push(s[r]);
  return i;
}
function g(t, e) {
  const i = $(),
    s = L();
  let r = [];
  if (!e && t instanceof A) return t;
  if (!t) return new A(r);
  if (typeof t == "string") {
    const n = t.trim();
    if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
      let a = "div";
      n.indexOf("<li") === 0 && (a = "ul"),
        n.indexOf("<tr") === 0 && (a = "tbody"),
        (n.indexOf("<td") === 0 || n.indexOf("<th") === 0) && (a = "tr"),
        n.indexOf("<tbody") === 0 && (a = "table"),
        n.indexOf("<option") === 0 && (a = "select");
      const o = s.createElement(a);
      o.innerHTML = n;
      for (let l = 0; l < o.childNodes.length; l += 1) r.push(o.childNodes[l]);
    } else r = we(t.trim(), e || s);
  } else if (t.nodeType || t === i || t === s) r.push(t);
  else if (Array.isArray(t)) {
    if (t instanceof A) return t;
    r = t;
  }
  return new A(ve(r));
}
g.fn = A.prototype;
function Se(...t) {
  const e = B(t.map((i) => i.split(" ")));
  return (
    this.forEach((i) => {
      i.classList.add(...e);
    }),
    this
  );
}
function Te(...t) {
  const e = B(t.map((i) => i.split(" ")));
  return (
    this.forEach((i) => {
      i.classList.remove(...e);
    }),
    this
  );
}
function be(...t) {
  const e = B(t.map((i) => i.split(" ")));
  this.forEach((i) => {
    e.forEach((s) => {
      i.classList.toggle(s);
    });
  });
}
function Ce(...t) {
  const e = B(t.map((i) => i.split(" ")));
  return (
    te(this, (i) => e.filter((s) => i.classList.contains(s)).length > 0)
      .length > 0
  );
}
function ye(t, e) {
  if (arguments.length === 1 && typeof t == "string")
    return this[0] ? this[0].getAttribute(t) : void 0;
  for (let i = 0; i < this.length; i += 1)
    if (arguments.length === 2) this[i].setAttribute(t, e);
    else for (const s in t) (this[i][s] = t[s]), this[i].setAttribute(s, t[s]);
  return this;
}
function xe(t) {
  for (let e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
  return this;
}
function Ee(t) {
  for (let e = 0; e < this.length; e += 1) this[e].style.transform = t;
  return this;
}
function Me(t) {
  for (let e = 0; e < this.length; e += 1)
    this[e].style.transitionDuration = typeof t != "string" ? `${t}ms` : t;
  return this;
}
function Pe(...t) {
  let [e, i, s, r] = t;
  typeof t[1] == "function" && (([e, s, r] = t), (i = void 0)), r || (r = !1);
  function n(d) {
    const c = d.target;
    if (!c) return;
    const f = d.target.dom7EventData || [];
    if ((f.indexOf(d) < 0 && f.unshift(d), g(c).is(i))) s.apply(c, f);
    else {
      const p = g(c).parents();
      for (let v = 0; v < p.length; v += 1) g(p[v]).is(i) && s.apply(p[v], f);
    }
  }
  function a(d) {
    const c = d && d.target ? d.target.dom7EventData || [] : [];
    c.indexOf(d) < 0 && c.unshift(d), s.apply(this, c);
  }
  const o = e.split(" ");
  let l;
  for (let d = 0; d < this.length; d += 1) {
    const c = this[d];
    if (i)
      for (l = 0; l < o.length; l += 1) {
        const f = o[l];
        c.dom7LiveListeners || (c.dom7LiveListeners = {}),
          c.dom7LiveListeners[f] || (c.dom7LiveListeners[f] = []),
          c.dom7LiveListeners[f].push({ listener: s, proxyListener: n }),
          c.addEventListener(f, n, r);
      }
    else
      for (l = 0; l < o.length; l += 1) {
        const f = o[l];
        c.dom7Listeners || (c.dom7Listeners = {}),
          c.dom7Listeners[f] || (c.dom7Listeners[f] = []),
          c.dom7Listeners[f].push({ listener: s, proxyListener: a }),
          c.addEventListener(f, a, r);
      }
  }
  return this;
}
function $e(...t) {
  let [e, i, s, r] = t;
  typeof t[1] == "function" && (([e, s, r] = t), (i = void 0)), r || (r = !1);
  const n = e.split(" ");
  for (let a = 0; a < n.length; a += 1) {
    const o = n[a];
    for (let l = 0; l < this.length; l += 1) {
      const d = this[l];
      let c;
      if (
        (!i && d.dom7Listeners
          ? (c = d.dom7Listeners[o])
          : i && d.dom7LiveListeners && (c = d.dom7LiveListeners[o]),
        c && c.length)
      )
        for (let f = c.length - 1; f >= 0; f -= 1) {
          const p = c[f];
          (s && p.listener === s) ||
          (s &&
            p.listener &&
            p.listener.dom7proxy &&
            p.listener.dom7proxy === s)
            ? (d.removeEventListener(o, p.proxyListener, r), c.splice(f, 1))
            : s ||
              (d.removeEventListener(o, p.proxyListener, r), c.splice(f, 1));
        }
    }
  }
  return this;
}
function Le(...t) {
  const e = $(),
    i = t[0].split(" "),
    s = t[1];
  for (let r = 0; r < i.length; r += 1) {
    const n = i[r];
    for (let a = 0; a < this.length; a += 1) {
      const o = this[a];
      if (e.CustomEvent) {
        const l = new e.CustomEvent(n, {
          detail: s,
          bubbles: !0,
          cancelable: !0,
        });
        (o.dom7EventData = t.filter((d, c) => c > 0)),
          o.dispatchEvent(l),
          (o.dom7EventData = []),
          delete o.dom7EventData;
      }
    }
  }
  return this;
}
function Oe(t) {
  const e = this;
  function i(s) {
    s.target === this && (t.call(this, s), e.off("transitionend", i));
  }
  return t && e.on("transitionend", i), this;
}
function ke(t) {
  if (this.length > 0) {
    if (t) {
      const e = this.styles();
      return (
        this[0].offsetWidth +
        parseFloat(e.getPropertyValue("margin-right")) +
        parseFloat(e.getPropertyValue("margin-left"))
      );
    }
    return this[0].offsetWidth;
  }
  return null;
}
function Ie(t) {
  if (this.length > 0) {
    if (t) {
      const e = this.styles();
      return (
        this[0].offsetHeight +
        parseFloat(e.getPropertyValue("margin-top")) +
        parseFloat(e.getPropertyValue("margin-bottom"))
      );
    }
    return this[0].offsetHeight;
  }
  return null;
}
function ze() {
  if (this.length > 0) {
    const t = $(),
      e = L(),
      i = this[0],
      s = i.getBoundingClientRect(),
      r = e.body,
      n = i.clientTop || r.clientTop || 0,
      a = i.clientLeft || r.clientLeft || 0,
      o = i === t ? t.scrollY : i.scrollTop,
      l = i === t ? t.scrollX : i.scrollLeft;
    return { top: s.top + o - n, left: s.left + l - a };
  }
  return null;
}
function Ae() {
  const t = $();
  return this[0] ? t.getComputedStyle(this[0], null) : {};
}
function De(t, e) {
  const i = $();
  let s;
  if (arguments.length === 1)
    if (typeof t == "string") {
      if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(t);
    } else {
      for (s = 0; s < this.length; s += 1)
        for (const r in t) this[s].style[r] = t[r];
      return this;
    }
  if (arguments.length === 2 && typeof t == "string") {
    for (s = 0; s < this.length; s += 1) this[s].style[t] = e;
    return this;
  }
  return this;
}
function Ge(t) {
  return t
    ? (this.forEach((e, i) => {
        t.apply(e, [e, i]);
      }),
      this)
    : this;
}
function Be(t) {
  const e = te(this, t);
  return g(e);
}
function Ne(t) {
  if (typeof t == "undefined") return this[0] ? this[0].innerHTML : null;
  for (let e = 0; e < this.length; e += 1) this[e].innerHTML = t;
  return this;
}
function He(t) {
  if (typeof t == "undefined")
    return this[0] ? this[0].textContent.trim() : null;
  for (let e = 0; e < this.length; e += 1) this[e].textContent = t;
  return this;
}
function Ve(t) {
  const e = $(),
    i = L(),
    s = this[0];
  let r, n;
  if (!s || typeof t == "undefined") return !1;
  if (typeof t == "string") {
    if (s.matches) return s.matches(t);
    if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);
    if (s.msMatchesSelector) return s.msMatchesSelector(t);
    for (r = g(t), n = 0; n < r.length; n += 1) if (r[n] === s) return !0;
    return !1;
  }
  if (t === i) return s === i;
  if (t === e) return s === e;
  if (t.nodeType || t instanceof A) {
    for (r = t.nodeType ? [t] : t, n = 0; n < r.length; n += 1)
      if (r[n] === s) return !0;
    return !1;
  }
  return !1;
}
function Fe() {
  let t = this[0],
    e;
  if (t) {
    for (e = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (e += 1);
    return e;
  }
}
function _e(t) {
  if (typeof t == "undefined") return this;
  const e = this.length;
  if (t > e - 1) return g([]);
  if (t < 0) {
    const i = e + t;
    return i < 0 ? g([]) : g([this[i]]);
  }
  return g([this[t]]);
}
function Re(...t) {
  let e;
  const i = L();
  for (let s = 0; s < t.length; s += 1) {
    e = t[s];
    for (let r = 0; r < this.length; r += 1)
      if (typeof e == "string") {
        const n = i.createElement("div");
        for (n.innerHTML = e; n.firstChild; ) this[r].appendChild(n.firstChild);
      } else if (e instanceof A)
        for (let n = 0; n < e.length; n += 1) this[r].appendChild(e[n]);
      else this[r].appendChild(e);
  }
  return this;
}
function We(t) {
  const e = L();
  let i, s;
  for (i = 0; i < this.length; i += 1)
    if (typeof t == "string") {
      const r = e.createElement("div");
      for (r.innerHTML = t, s = r.childNodes.length - 1; s >= 0; s -= 1)
        this[i].insertBefore(r.childNodes[s], this[i].childNodes[0]);
    } else if (t instanceof A)
      for (s = 0; s < t.length; s += 1)
        this[i].insertBefore(t[s], this[i].childNodes[0]);
    else this[i].insertBefore(t, this[i].childNodes[0]);
  return this;
}
function je(t) {
  return this.length > 0
    ? t
      ? this[0].nextElementSibling && g(this[0].nextElementSibling).is(t)
        ? g([this[0].nextElementSibling])
        : g([])
      : this[0].nextElementSibling
      ? g([this[0].nextElementSibling])
      : g([])
    : g([]);
}
function qe(t) {
  const e = [];
  let i = this[0];
  if (!i) return g([]);
  for (; i.nextElementSibling; ) {
    const s = i.nextElementSibling;
    t ? g(s).is(t) && e.push(s) : e.push(s), (i = s);
  }
  return g(e);
}
function Xe(t) {
  if (this.length > 0) {
    const e = this[0];
    return t
      ? e.previousElementSibling && g(e.previousElementSibling).is(t)
        ? g([e.previousElementSibling])
        : g([])
      : e.previousElementSibling
      ? g([e.previousElementSibling])
      : g([]);
  }
  return g([]);
}
function Ye(t) {
  const e = [];
  let i = this[0];
  if (!i) return g([]);
  for (; i.previousElementSibling; ) {
    const s = i.previousElementSibling;
    t ? g(s).is(t) && e.push(s) : e.push(s), (i = s);
  }
  return g(e);
}
function Ke(t) {
  const e = [];
  for (let i = 0; i < this.length; i += 1)
    this[i].parentNode !== null &&
      (t
        ? g(this[i].parentNode).is(t) && e.push(this[i].parentNode)
        : e.push(this[i].parentNode));
  return g(e);
}
function Ue(t) {
  const e = [];
  for (let i = 0; i < this.length; i += 1) {
    let s = this[i].parentNode;
    for (; s; ) t ? g(s).is(t) && e.push(s) : e.push(s), (s = s.parentNode);
  }
  return g(e);
}
function Je(t) {
  let e = this;
  return typeof t == "undefined"
    ? g([])
    : (e.is(t) || (e = e.parents(t).eq(0)), e);
}
function Qe(t) {
  const e = [];
  for (let i = 0; i < this.length; i += 1) {
    const s = this[i].querySelectorAll(t);
    for (let r = 0; r < s.length; r += 1) e.push(s[r]);
  }
  return g(e);
}
function Ze(t) {
  const e = [];
  for (let i = 0; i < this.length; i += 1) {
    const s = this[i].children;
    for (let r = 0; r < s.length; r += 1) (!t || g(s[r]).is(t)) && e.push(s[r]);
  }
  return g(e);
}
function et() {
  for (let t = 0; t < this.length; t += 1)
    this[t].parentNode && this[t].parentNode.removeChild(this[t]);
  return this;
}
const ie = {
  addClass: Se,
  removeClass: Te,
  hasClass: Ce,
  toggleClass: be,
  attr: ye,
  removeAttr: xe,
  transform: Ee,
  transition: Me,
  on: Pe,
  off: $e,
  trigger: Le,
  transitionEnd: Oe,
  outerWidth: ke,
  outerHeight: Ie,
  styles: Ae,
  offset: ze,
  css: De,
  each: Ge,
  html: Ne,
  text: He,
  is: Ve,
  index: Fe,
  eq: _e,
  append: Re,
  prepend: We,
  next: je,
  nextAll: qe,
  prev: Xe,
  prevAll: Ye,
  parent: Ke,
  parents: Ue,
  closest: Je,
  find: Qe,
  children: Ze,
  filter: Be,
  remove: et,
};
Object.keys(ie).forEach((t) => {
  Object.defineProperty(g.fn, t, { value: ie[t], writable: !0 });
});
function tt(t) {
  const e = t;
  Object.keys(e).forEach((i) => {
    try {
      e[i] = null;
    } catch {}
    try {
      delete e[i];
    } catch {}
  });
}
function R(t, e) {
  return e === void 0 && (e = 0), setTimeout(t, e);
}
function N() {
  return Date.now();
}
function it(t) {
  const e = $();
  let i;
  return (
    e.getComputedStyle && (i = e.getComputedStyle(t, null)),
    !i && t.currentStyle && (i = t.currentStyle),
    i || (i = t.style),
    i
  );
}
function st(t, e) {
  e === void 0 && (e = "x");
  const i = $();
  let s, r, n;
  const a = it(t);
  return (
    i.WebKitCSSMatrix
      ? ((r = a.transform || a.webkitTransform),
        r.split(",").length > 6 &&
          (r = r
            .split(", ")
            .map((o) => o.replace(",", "."))
            .join(", ")),
        (n = new i.WebKitCSSMatrix(r === "none" ? "" : r)))
      : ((n =
          a.MozTransform ||
          a.OTransform ||
          a.MsTransform ||
          a.msTransform ||
          a.transform ||
          a
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (s = n.toString().split(","))),
    e === "x" &&
      (i.WebKitCSSMatrix
        ? (r = n.m41)
        : s.length === 16
        ? (r = parseFloat(s[12]))
        : (r = parseFloat(s[4]))),
    e === "y" &&
      (i.WebKitCSSMatrix
        ? (r = n.m42)
        : s.length === 16
        ? (r = parseFloat(s[13]))
        : (r = parseFloat(s[5]))),
    r || 0
  );
}
function H(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    t.constructor &&
    Object.prototype.toString.call(t).slice(8, -1) === "Object"
  );
}
function nt(t) {
  return typeof window != "undefined" &&
    typeof window.HTMLElement != "undefined"
    ? t instanceof HTMLElement
    : t && (t.nodeType === 1 || t.nodeType === 11);
}
function O() {
  const t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < arguments.length; i += 1) {
    const s = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (s != null && !nt(s)) {
      const r = Object.keys(Object(s)).filter((n) => e.indexOf(n) < 0);
      for (let n = 0, a = r.length; n < a; n += 1) {
        const o = r[n],
          l = Object.getOwnPropertyDescriptor(s, o);
        l !== void 0 &&
          l.enumerable &&
          (H(t[o]) && H(s[o])
            ? s[o].__swiper__
              ? (t[o] = s[o])
              : O(t[o], s[o])
            : !H(t[o]) && H(s[o])
            ? ((t[o] = {}), s[o].__swiper__ ? (t[o] = s[o]) : O(t[o], s[o]))
            : (t[o] = s[o]));
      }
    }
  }
  return t;
}
function V(t, e, i) {
  t.style.setProperty(e, i);
}
function se(t) {
  let { swiper: e, targetPosition: i, side: s } = t;
  const r = $(),
    n = -e.translate;
  let a = null,
    o;
  const l = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = "none"),
    r.cancelAnimationFrame(e.cssModeFrameID);
  const d = i > n ? "next" : "prev",
    c = (p, v) => (d === "next" && p >= v) || (d === "prev" && p <= v),
    f = () => {
      (o = new Date().getTime()), a === null && (a = o);
      const p = Math.max(Math.min((o - a) / l, 1), 0),
        v = 0.5 - Math.cos(p * Math.PI) / 2;
      let u = n + v * (i - n);
      if ((c(u, i) && (u = i), e.wrapperEl.scrollTo({ [s]: u }), c(u, i))) {
        (e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [s]: u });
          }),
          r.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = r.requestAnimationFrame(f);
    };
  f();
}
let W;
function rt() {
  const t = $(),
    e = L();
  return {
    smoothScroll:
      e.documentElement && "scrollBehavior" in e.documentElement.style,
    touch: !!(
      "ontouchstart" in t ||
      (t.DocumentTouch && e instanceof t.DocumentTouch)
    ),
    passiveListener: (function () {
      let s = !1;
      try {
        const r = Object.defineProperty({}, "passive", {
          get() {
            s = !0;
          },
        });
        t.addEventListener("testPassiveListener", null, r);
      } catch {}
      return s;
    })(),
    gestures: (function () {
      return "ongesturestart" in t;
    })(),
  };
}
function ne() {
  return W || (W = rt()), W;
}
let j;
function at(t) {
  let { userAgent: e } = t === void 0 ? {} : t;
  const i = ne(),
    s = $(),
    r = s.navigator.platform,
    n = e || s.navigator.userAgent,
    a = { ios: !1, android: !1 },
    o = s.screen.width,
    l = s.screen.height,
    d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = n.match(/(iPad).*OS\s([\d_]+)/);
  const f = n.match(/(iPod)(.*OS\s([\d_]+))?/),
    p = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    v = r === "Win32";
  let u = r === "MacIntel";
  const h = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !c &&
      u &&
      i.touch &&
      h.indexOf(`${o}x${l}`) >= 0 &&
      ((c = n.match(/(Version)\/([\d.]+)/)),
      c || (c = [0, 1, "13_0_0"]),
      (u = !1)),
    d && !v && ((a.os = "android"), (a.android = !0)),
    (c || p || f) && ((a.os = "ios"), (a.ios = !0)),
    a
  );
}
function lt(t) {
  return t === void 0 && (t = {}), j || (j = at(t)), j;
}
let q;
function ot() {
  const t = $();
  function e() {
    const i = t.navigator.userAgent.toLowerCase();
    return (
      i.indexOf("safari") >= 0 &&
      i.indexOf("chrome") < 0 &&
      i.indexOf("android") < 0
    );
  }
  return {
    isSafari: e(),
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      t.navigator.userAgent
    ),
  };
}
function dt() {
  return q || (q = ot()), q;
}
function ct(t) {
  let { swiper: e, on: i, emit: s } = t;
  const r = $();
  let n = null,
    a = null;
  const o = () => {
      !e || e.destroyed || !e.initialized || (s("beforeResize"), s("resize"));
    },
    l = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((n = new ResizeObserver((f) => {
          a = r.requestAnimationFrame(() => {
            const { width: p, height: v } = e;
            let u = p,
              h = v;
            f.forEach((S) => {
              let { contentBoxSize: w, contentRect: m, target: C } = S;
              (C && C !== e.el) ||
                ((u = m ? m.width : (w[0] || w).inlineSize),
                (h = m ? m.height : (w[0] || w).blockSize));
            }),
              (u !== p || h !== v) && o();
          });
        })),
        n.observe(e.el));
    },
    d = () => {
      a && r.cancelAnimationFrame(a),
        n && n.unobserve && e.el && (n.unobserve(e.el), (n = null));
    },
    c = () => {
      !e || e.destroyed || !e.initialized || s("orientationchange");
    };
  i("init", () => {
    if (e.params.resizeObserver && typeof r.ResizeObserver != "undefined") {
      l();
      return;
    }
    r.addEventListener("resize", o), r.addEventListener("orientationchange", c);
  }),
    i("destroy", () => {
      d(),
        r.removeEventListener("resize", o),
        r.removeEventListener("orientationchange", c);
    });
}
function ft(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  const n = [],
    a = $(),
    o = function (c, f) {
      f === void 0 && (f = {});
      const p = a.MutationObserver || a.WebkitMutationObserver,
        v = new p((u) => {
          if (u.length === 1) {
            r("observerUpdate", u[0]);
            return;
          }
          const h = function () {
            r("observerUpdate", u[0]);
          };
          a.requestAnimationFrame
            ? a.requestAnimationFrame(h)
            : a.setTimeout(h, 0);
        });
      v.observe(c, {
        attributes: typeof f.attributes == "undefined" ? !0 : f.attributes,
        childList: typeof f.childList == "undefined" ? !0 : f.childList,
        characterData:
          typeof f.characterData == "undefined" ? !0 : f.characterData,
      }),
        n.push(v);
    },
    l = () => {
      if (!!e.params.observer) {
        if (e.params.observeParents) {
          const c = e.$el.parents();
          for (let f = 0; f < c.length; f += 1) o(c[f]);
        }
        o(e.$el[0], { childList: e.params.observeSlideChildren }),
          o(e.$wrapperEl[0], { attributes: !1 });
      }
    },
    d = () => {
      n.forEach((c) => {
        c.disconnect();
      }),
        n.splice(0, n.length);
    };
  i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    s("init", l),
    s("destroy", d);
}
var ut = {
  on(t, e, i) {
    const s = this;
    if (typeof e != "function") return s;
    const r = i ? "unshift" : "push";
    return (
      t.split(" ").forEach((n) => {
        s.eventsListeners[n] || (s.eventsListeners[n] = []),
          s.eventsListeners[n][r](e);
      }),
      s
    );
  },
  once(t, e, i) {
    const s = this;
    if (typeof e != "function") return s;
    function r() {
      s.off(t, r), r.__emitterProxy && delete r.__emitterProxy;
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      e.apply(s, a);
    }
    return (r.__emitterProxy = e), s.on(t, r, i);
  },
  onAny(t, e) {
    const i = this;
    if (typeof t != "function") return i;
    const s = e ? "unshift" : "push";
    return i.eventsAnyListeners.indexOf(t) < 0 && i.eventsAnyListeners[s](t), i;
  },
  offAny(t) {
    const e = this;
    if (!e.eventsAnyListeners) return e;
    const i = e.eventsAnyListeners.indexOf(t);
    return i >= 0 && e.eventsAnyListeners.splice(i, 1), e;
  },
  off(t, e) {
    const i = this;
    return (
      i.eventsListeners &&
        t.split(" ").forEach((s) => {
          typeof e == "undefined"
            ? (i.eventsListeners[s] = [])
            : i.eventsListeners[s] &&
              i.eventsListeners[s].forEach((r, n) => {
                (r === e || (r.__emitterProxy && r.__emitterProxy === e)) &&
                  i.eventsListeners[s].splice(n, 1);
              });
        }),
      i
    );
  },
  emit() {
    const t = this;
    if (!t.eventsListeners) return t;
    let e, i, s;
    for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
      n[a] = arguments[a];
    return (
      typeof n[0] == "string" || Array.isArray(n[0])
        ? ((e = n[0]), (i = n.slice(1, n.length)), (s = t))
        : ((e = n[0].events), (i = n[0].data), (s = n[0].context || t)),
      i.unshift(s),
      (Array.isArray(e) ? e : e.split(" ")).forEach((l) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((d) => {
            d.apply(s, [l, ...i]);
          }),
          t.eventsListeners &&
            t.eventsListeners[l] &&
            t.eventsListeners[l].forEach((d) => {
              d.apply(s, i);
            });
      }),
      t
    );
  },
};
function pt() {
  const t = this;
  let e, i;
  const s = t.$el;
  typeof t.params.width != "undefined" && t.params.width !== null
    ? (e = t.params.width)
    : (e = s[0].clientWidth),
    typeof t.params.height != "undefined" && t.params.height !== null
      ? (i = t.params.height)
      : (i = s[0].clientHeight),
    !((e === 0 && t.isHorizontal()) || (i === 0 && t.isVertical())) &&
      ((e =
        e -
        parseInt(s.css("padding-left") || 0, 10) -
        parseInt(s.css("padding-right") || 0, 10)),
      (i =
        i -
        parseInt(s.css("padding-top") || 0, 10) -
        parseInt(s.css("padding-bottom") || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(i) && (i = 0),
      Object.assign(t, {
        width: e,
        height: i,
        size: t.isHorizontal() ? e : i,
      }));
}
function ht() {
  const t = this;
  function e(b) {
    return t.isHorizontal()
      ? b
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[b];
  }
  function i(b, y) {
    return parseFloat(b.getPropertyValue(e(y)) || 0);
  }
  const s = t.params,
    { $wrapperEl: r, size: n, rtlTranslate: a, wrongRTL: o } = t,
    l = t.virtual && s.virtual.enabled,
    d = l ? t.virtual.slides.length : t.slides.length,
    c = r.children(`.${t.params.slideClass}`),
    f = l ? t.virtual.slides.length : c.length;
  let p = [];
  const v = [],
    u = [];
  let h = s.slidesOffsetBefore;
  typeof h == "function" && (h = s.slidesOffsetBefore.call(t));
  let S = s.slidesOffsetAfter;
  typeof S == "function" && (S = s.slidesOffsetAfter.call(t));
  const w = t.snapGrid.length,
    m = t.slidesGrid.length;
  let C = s.spaceBetween,
    T = -h,
    M = 0,
    P = 0;
  if (typeof n == "undefined") return;
  typeof C == "string" &&
    C.indexOf("%") >= 0 &&
    (C = (parseFloat(C.replace("%", "")) / 100) * n),
    (t.virtualSize = -C),
    a
      ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
      : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
    s.centeredSlides &&
      s.cssMode &&
      (V(t.wrapperEl, "--swiper-centered-offset-before", ""),
      V(t.wrapperEl, "--swiper-centered-offset-after", ""));
  const z = s.grid && s.grid.rows > 1 && t.grid;
  z && t.grid.initSlides(f);
  let E;
  const k =
    s.slidesPerView === "auto" &&
    s.breakpoints &&
    Object.keys(s.breakpoints).filter(
      (b) => typeof s.breakpoints[b].slidesPerView != "undefined"
    ).length > 0;
  for (let b = 0; b < f; b += 1) {
    E = 0;
    const y = c.eq(b);
    if ((z && t.grid.updateSlide(b, y, f, e), y.css("display") !== "none")) {
      if (s.slidesPerView === "auto") {
        k && (c[b].style[e("width")] = "");
        const x = getComputedStyle(y[0]),
          D = y[0].style.transform,
          F = y[0].style.webkitTransform;
        if (
          (D && (y[0].style.transform = "none"),
          F && (y[0].style.webkitTransform = "none"),
          s.roundLengths)
        )
          E = t.isHorizontal() ? y.outerWidth(!0) : y.outerHeight(!0);
        else {
          const K = i(x, "width"),
            fe = i(x, "padding-left"),
            ue = i(x, "padding-right"),
            U = i(x, "margin-left"),
            J = i(x, "margin-right"),
            Q = x.getPropertyValue("box-sizing");
          if (Q && Q === "border-box") E = K + U + J;
          else {
            const { clientWidth: pe, offsetWidth: he } = y[0];
            E = K + fe + ue + U + J + (he - pe);
          }
        }
        D && (y[0].style.transform = D),
          F && (y[0].style.webkitTransform = F),
          s.roundLengths && (E = Math.floor(E));
      } else
        (E = (n - (s.slidesPerView - 1) * C) / s.slidesPerView),
          s.roundLengths && (E = Math.floor(E)),
          c[b] && (c[b].style[e("width")] = `${E}px`);
      c[b] && (c[b].swiperSlideSize = E),
        u.push(E),
        s.centeredSlides
          ? ((T = T + E / 2 + M / 2 + C),
            M === 0 && b !== 0 && (T = T - n / 2 - C),
            b === 0 && (T = T - n / 2 - C),
            Math.abs(T) < 1 / 1e3 && (T = 0),
            s.roundLengths && (T = Math.floor(T)),
            P % s.slidesPerGroup == 0 && p.push(T),
            v.push(T))
          : (s.roundLengths && (T = Math.floor(T)),
            (P - Math.min(t.params.slidesPerGroupSkip, P)) %
              t.params.slidesPerGroup ==
              0 && p.push(T),
            v.push(T),
            (T = T + E + C)),
        (t.virtualSize += E + C),
        (M = E),
        (P += 1);
    }
  }
  if (
    ((t.virtualSize = Math.max(t.virtualSize, n) + S),
    a &&
      o &&
      (s.effect === "slide" || s.effect === "coverflow") &&
      r.css({ width: `${t.virtualSize + s.spaceBetween}px` }),
    s.setWrapperSize &&
      r.css({ [e("width")]: `${t.virtualSize + s.spaceBetween}px` }),
    z && t.grid.updateWrapperSize(E, p, e),
    !s.centeredSlides)
  ) {
    const b = [];
    for (let y = 0; y < p.length; y += 1) {
      let x = p[y];
      s.roundLengths && (x = Math.floor(x)),
        p[y] <= t.virtualSize - n && b.push(x);
    }
    (p = b),
      Math.floor(t.virtualSize - n) - Math.floor(p[p.length - 1]) > 1 &&
        p.push(t.virtualSize - n);
  }
  if ((p.length === 0 && (p = [0]), s.spaceBetween !== 0)) {
    const b = t.isHorizontal() && a ? "marginLeft" : e("marginRight");
    c.filter((y, x) => (s.cssMode ? x !== c.length - 1 : !0)).css({
      [b]: `${C}px`,
    });
  }
  if (s.centeredSlides && s.centeredSlidesBounds) {
    let b = 0;
    u.forEach((x) => {
      b += x + (s.spaceBetween ? s.spaceBetween : 0);
    }),
      (b -= s.spaceBetween);
    const y = b - n;
    p = p.map((x) => (x < 0 ? -h : x > y ? y + S : x));
  }
  if (s.centerInsufficientSlides) {
    let b = 0;
    if (
      (u.forEach((y) => {
        b += y + (s.spaceBetween ? s.spaceBetween : 0);
      }),
      (b -= s.spaceBetween),
      b < n)
    ) {
      const y = (n - b) / 2;
      p.forEach((x, D) => {
        p[D] = x - y;
      }),
        v.forEach((x, D) => {
          v[D] = x + y;
        });
    }
  }
  if (
    (Object.assign(t, {
      slides: c,
      snapGrid: p,
      slidesGrid: v,
      slidesSizesGrid: u,
    }),
    s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
  ) {
    V(t.wrapperEl, "--swiper-centered-offset-before", `${-p[0]}px`),
      V(
        t.wrapperEl,
        "--swiper-centered-offset-after",
        `${t.size / 2 - u[u.length - 1] / 2}px`
      );
    const b = -t.snapGrid[0],
      y = -t.slidesGrid[0];
    (t.snapGrid = t.snapGrid.map((x) => x + b)),
      (t.slidesGrid = t.slidesGrid.map((x) => x + y));
  }
  if (
    (f !== d && t.emit("slidesLengthChange"),
    p.length !== w &&
      (t.params.watchOverflow && t.checkOverflow(),
      t.emit("snapGridLengthChange")),
    v.length !== m && t.emit("slidesGridLengthChange"),
    s.watchSlidesProgress && t.updateSlidesOffset(),
    !l && !s.cssMode && (s.effect === "slide" || s.effect === "fade"))
  ) {
    const b = `${s.containerModifierClass}backface-hidden`,
      y = t.$el.hasClass(b);
    f <= s.maxBackfaceHiddenSlides
      ? y || t.$el.addClass(b)
      : y && t.$el.removeClass(b);
  }
}
function mt(t) {
  const e = this,
    i = [],
    s = e.virtual && e.params.virtual.enabled;
  let r = 0,
    n;
  typeof t == "number"
    ? e.setTransition(t)
    : t === !0 && e.setTransition(e.params.speed);
  const a = (o) =>
    s
      ? e.slides.filter(
          (l) => parseInt(l.getAttribute("data-swiper-slide-index"), 10) === o
        )[0]
      : e.slides.eq(o)[0];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      e.visibleSlides.each((o) => {
        i.push(o);
      });
    else
      for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
        const o = e.activeIndex + n;
        if (o > e.slides.length && !s) break;
        i.push(a(o));
      }
  else i.push(a(e.activeIndex));
  for (n = 0; n < i.length; n += 1)
    if (typeof i[n] != "undefined") {
      const o = i[n].offsetHeight;
      r = o > r ? o : r;
    }
  (r || r === 0) && e.$wrapperEl.css("height", `${r}px`);
}
function gt() {
  const t = this,
    e = t.slides;
  for (let i = 0; i < e.length; i += 1)
    e[i].swiperSlideOffset = t.isHorizontal()
      ? e[i].offsetLeft
      : e[i].offsetTop;
}
function vt(t) {
  t === void 0 && (t = (this && this.translate) || 0);
  const e = this,
    i = e.params,
    { slides: s, rtlTranslate: r, snapGrid: n } = e;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset == "undefined" && e.updateSlidesOffset();
  let a = -t;
  r && (a = t),
    s.removeClass(i.slideVisibleClass),
    (e.visibleSlidesIndexes = []),
    (e.visibleSlides = []);
  for (let o = 0; o < s.length; o += 1) {
    const l = s[o];
    let d = l.swiperSlideOffset;
    i.cssMode && i.centeredSlides && (d -= s[0].swiperSlideOffset);
    const c =
        (a + (i.centeredSlides ? e.minTranslate() : 0) - d) /
        (l.swiperSlideSize + i.spaceBetween),
      f =
        (a - n[0] + (i.centeredSlides ? e.minTranslate() : 0) - d) /
        (l.swiperSlideSize + i.spaceBetween),
      p = -(a - d),
      v = p + e.slidesSizesGrid[o];
    ((p >= 0 && p < e.size - 1) ||
      (v > 1 && v <= e.size) ||
      (p <= 0 && v >= e.size)) &&
      (e.visibleSlides.push(l),
      e.visibleSlidesIndexes.push(o),
      s.eq(o).addClass(i.slideVisibleClass)),
      (l.progress = r ? -c : c),
      (l.originalProgress = r ? -f : f);
  }
  e.visibleSlides = g(e.visibleSlides);
}
function wt(t) {
  const e = this;
  if (typeof t == "undefined") {
    const d = e.rtlTranslate ? -1 : 1;
    t = (e && e.translate && e.translate * d) || 0;
  }
  const i = e.params,
    s = e.maxTranslate() - e.minTranslate();
  let { progress: r, isBeginning: n, isEnd: a } = e;
  const o = n,
    l = a;
  s === 0
    ? ((r = 0), (n = !0), (a = !0))
    : ((r = (t - e.minTranslate()) / s), (n = r <= 0), (a = r >= 1)),
    Object.assign(e, { progress: r, isBeginning: n, isEnd: a }),
    (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
      e.updateSlidesProgress(t),
    n && !o && e.emit("reachBeginning toEdge"),
    a && !l && e.emit("reachEnd toEdge"),
    ((o && !n) || (l && !a)) && e.emit("fromEdge"),
    e.emit("progress", r);
}
function St() {
  const t = this,
    { slides: e, params: i, $wrapperEl: s, activeIndex: r, realIndex: n } = t,
    a = t.virtual && i.virtual.enabled;
  e.removeClass(
    `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
  );
  let o;
  a
    ? (o = t.$wrapperEl.find(
        `.${i.slideClass}[data-swiper-slide-index="${r}"]`
      ))
    : (o = e.eq(r)),
    o.addClass(i.slideActiveClass),
    i.loop &&
      (o.hasClass(i.slideDuplicateClass)
        ? s
            .children(
              `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${n}"]`
            )
            .addClass(i.slideDuplicateActiveClass)
        : s
            .children(
              `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${n}"]`
            )
            .addClass(i.slideDuplicateActiveClass));
  let l = o.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
  i.loop && l.length === 0 && ((l = e.eq(0)), l.addClass(i.slideNextClass));
  let d = o.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
  i.loop && d.length === 0 && ((d = e.eq(-1)), d.addClass(i.slidePrevClass)),
    i.loop &&
      (l.hasClass(i.slideDuplicateClass)
        ? s
            .children(
              `.${i.slideClass}:not(.${
                i.slideDuplicateClass
              })[data-swiper-slide-index="${l.attr(
                "data-swiper-slide-index"
              )}"]`
            )
            .addClass(i.slideDuplicateNextClass)
        : s
            .children(
              `.${i.slideClass}.${
                i.slideDuplicateClass
              }[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`
            )
            .addClass(i.slideDuplicateNextClass),
      d.hasClass(i.slideDuplicateClass)
        ? s
            .children(
              `.${i.slideClass}:not(.${
                i.slideDuplicateClass
              })[data-swiper-slide-index="${d.attr(
                "data-swiper-slide-index"
              )}"]`
            )
            .addClass(i.slideDuplicatePrevClass)
        : s
            .children(
              `.${i.slideClass}.${
                i.slideDuplicateClass
              }[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`
            )
            .addClass(i.slideDuplicatePrevClass)),
    t.emitSlidesClasses();
}
function Tt(t) {
  const e = this,
    i = e.rtlTranslate ? e.translate : -e.translate,
    {
      slidesGrid: s,
      snapGrid: r,
      params: n,
      activeIndex: a,
      realIndex: o,
      snapIndex: l,
    } = e;
  let d = t,
    c;
  if (typeof d == "undefined") {
    for (let p = 0; p < s.length; p += 1)
      typeof s[p + 1] != "undefined"
        ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2
          ? (d = p)
          : i >= s[p] && i < s[p + 1] && (d = p + 1)
        : i >= s[p] && (d = p);
    n.normalizeSlideIndex && (d < 0 || typeof d == "undefined") && (d = 0);
  }
  if (r.indexOf(i) >= 0) c = r.indexOf(i);
  else {
    const p = Math.min(n.slidesPerGroupSkip, d);
    c = p + Math.floor((d - p) / n.slidesPerGroup);
  }
  if ((c >= r.length && (c = r.length - 1), d === a)) {
    c !== l && ((e.snapIndex = c), e.emit("snapIndexChange"));
    return;
  }
  const f = parseInt(e.slides.eq(d).attr("data-swiper-slide-index") || d, 10);
  Object.assign(e, {
    snapIndex: c,
    realIndex: f,
    previousIndex: a,
    activeIndex: d,
  }),
    e.emit("activeIndexChange"),
    e.emit("snapIndexChange"),
    o !== f && e.emit("realIndexChange"),
    (e.initialized || e.params.runCallbacksOnInit) && e.emit("slideChange");
}
function bt(t) {
  const e = this,
    i = e.params,
    s = g(t).closest(`.${i.slideClass}`)[0];
  let r = !1,
    n;
  if (s) {
    for (let a = 0; a < e.slides.length; a += 1)
      if (e.slides[a] === s) {
        (r = !0), (n = a);
        break;
      }
  }
  if (s && r)
    (e.clickedSlide = s),
      e.virtual && e.params.virtual.enabled
        ? (e.clickedIndex = parseInt(g(s).attr("data-swiper-slide-index"), 10))
        : (e.clickedIndex = n);
  else {
    (e.clickedSlide = void 0), (e.clickedIndex = void 0);
    return;
  }
  i.slideToClickedSlide &&
    e.clickedIndex !== void 0 &&
    e.clickedIndex !== e.activeIndex &&
    e.slideToClickedSlide();
}
var Ct = {
  updateSize: pt,
  updateSlides: ht,
  updateAutoHeight: mt,
  updateSlidesOffset: gt,
  updateSlidesProgress: vt,
  updateProgress: wt,
  updateSlidesClasses: St,
  updateActiveIndex: Tt,
  updateClickedSlide: bt,
};
function yt(t) {
  t === void 0 && (t = this.isHorizontal() ? "x" : "y");
  const e = this,
    { params: i, rtlTranslate: s, translate: r, $wrapperEl: n } = e;
  if (i.virtualTranslate) return s ? -r : r;
  if (i.cssMode) return r;
  let a = st(n[0], t);
  return s && (a = -a), a || 0;
}
function xt(t, e) {
  const i = this,
    {
      rtlTranslate: s,
      params: r,
      $wrapperEl: n,
      wrapperEl: a,
      progress: o,
    } = i;
  let l = 0,
    d = 0;
  const c = 0;
  i.isHorizontal() ? (l = s ? -t : t) : (d = t),
    r.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
    r.cssMode
      ? (a[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal()
          ? -l
          : -d)
      : r.virtualTranslate ||
        n.transform(`translate3d(${l}px, ${d}px, ${c}px)`),
    (i.previousTranslate = i.translate),
    (i.translate = i.isHorizontal() ? l : d);
  let f;
  const p = i.maxTranslate() - i.minTranslate();
  p === 0 ? (f = 0) : (f = (t - i.minTranslate()) / p),
    f !== o && i.updateProgress(t),
    i.emit("setTranslate", i.translate, e);
}
function Et() {
  return -this.snapGrid[0];
}
function Mt() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Pt(t, e, i, s, r) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    i === void 0 && (i = !0),
    s === void 0 && (s = !0);
  const n = this,
    { params: a, wrapperEl: o } = n;
  if (n.animating && a.preventInteractionOnTransition) return !1;
  const l = n.minTranslate(),
    d = n.maxTranslate();
  let c;
  if (
    (s && t > l ? (c = l) : s && t < d ? (c = d) : (c = t),
    n.updateProgress(c),
    a.cssMode)
  ) {
    const f = n.isHorizontal();
    if (e === 0) o[f ? "scrollLeft" : "scrollTop"] = -c;
    else {
      if (!n.support.smoothScroll)
        return (
          se({ swiper: n, targetPosition: -c, side: f ? "left" : "top" }), !0
        );
      o.scrollTo({ [f ? "left" : "top"]: -c, behavior: "smooth" });
    }
    return !0;
  }
  return (
    e === 0
      ? (n.setTransition(0),
        n.setTranslate(c),
        i && (n.emit("beforeTransitionStart", e, r), n.emit("transitionEnd")))
      : (n.setTransition(e),
        n.setTranslate(c),
        i && (n.emit("beforeTransitionStart", e, r), n.emit("transitionStart")),
        n.animating ||
          ((n.animating = !0),
          n.onTranslateToWrapperTransitionEnd ||
            (n.onTranslateToWrapperTransitionEnd = function (p) {
              !n ||
                n.destroyed ||
                (p.target === this &&
                  (n.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    n.onTranslateToWrapperTransitionEnd
                  ),
                  n.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    n.onTranslateToWrapperTransitionEnd
                  ),
                  (n.onTranslateToWrapperTransitionEnd = null),
                  delete n.onTranslateToWrapperTransitionEnd,
                  i && n.emit("transitionEnd")));
            }),
          n.$wrapperEl[0].addEventListener(
            "transitionend",
            n.onTranslateToWrapperTransitionEnd
          ),
          n.$wrapperEl[0].addEventListener(
            "webkitTransitionEnd",
            n.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var $t = {
  getTranslate: yt,
  setTranslate: xt,
  minTranslate: Et,
  maxTranslate: Mt,
  translateTo: Pt,
};
function Lt(t, e) {
  const i = this;
  i.params.cssMode || i.$wrapperEl.transition(t), i.emit("setTransition", t, e);
}
function re(t) {
  let { swiper: e, runCallbacks: i, direction: s, step: r } = t;
  const { activeIndex: n, previousIndex: a } = e;
  let o = s;
  if (
    (o || (n > a ? (o = "next") : n < a ? (o = "prev") : (o = "reset")),
    e.emit(`transition${r}`),
    i && n !== a)
  ) {
    if (o === "reset") {
      e.emit(`slideResetTransition${r}`);
      return;
    }
    e.emit(`slideChangeTransition${r}`),
      o === "next"
        ? e.emit(`slideNextTransition${r}`)
        : e.emit(`slidePrevTransition${r}`);
  }
}
function Ot(t, e) {
  t === void 0 && (t = !0);
  const i = this,
    { params: s } = i;
  s.cssMode ||
    (s.autoHeight && i.updateAutoHeight(),
    re({ swiper: i, runCallbacks: t, direction: e, step: "Start" }));
}
function kt(t, e) {
  t === void 0 && (t = !0);
  const i = this,
    { params: s } = i;
  (i.animating = !1),
    !s.cssMode &&
      (i.setTransition(0),
      re({ swiper: i, runCallbacks: t, direction: e, step: "End" }));
}
var It = { setTransition: Lt, transitionStart: Ot, transitionEnd: kt };
function zt(t, e, i, s, r) {
  if (
    (t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    i === void 0 && (i = !0),
    typeof t != "number" && typeof t != "string")
  )
    throw new Error(
      `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof t}] given.`
    );
  if (typeof t == "string") {
    const C = parseInt(t, 10);
    if (!isFinite(C))
      throw new Error(
        `The passed-in 'index' (string) couldn't be converted to 'number'. [${t}] given.`
      );
    t = C;
  }
  const n = this;
  let a = t;
  a < 0 && (a = 0);
  const {
    params: o,
    snapGrid: l,
    slidesGrid: d,
    previousIndex: c,
    activeIndex: f,
    rtlTranslate: p,
    wrapperEl: v,
    enabled: u,
  } = n;
  if ((n.animating && o.preventInteractionOnTransition) || (!u && !s && !r))
    return !1;
  const h = Math.min(n.params.slidesPerGroupSkip, a);
  let S = h + Math.floor((a - h) / n.params.slidesPerGroup);
  S >= l.length && (S = l.length - 1),
    (f || o.initialSlide || 0) === (c || 0) &&
      i &&
      n.emit("beforeSlideChangeStart");
  const w = -l[S];
  if ((n.updateProgress(w), o.normalizeSlideIndex))
    for (let C = 0; C < d.length; C += 1) {
      const T = -Math.floor(w * 100),
        M = Math.floor(d[C] * 100),
        P = Math.floor(d[C + 1] * 100);
      typeof d[C + 1] != "undefined"
        ? T >= M && T < P - (P - M) / 2
          ? (a = C)
          : T >= M && T < P && (a = C + 1)
        : T >= M && (a = C);
    }
  if (
    n.initialized &&
    a !== f &&
    ((!n.allowSlideNext && w < n.translate && w < n.minTranslate()) ||
      (!n.allowSlidePrev &&
        w > n.translate &&
        w > n.maxTranslate() &&
        (f || 0) !== a))
  )
    return !1;
  let m;
  if (
    (a > f ? (m = "next") : a < f ? (m = "prev") : (m = "reset"),
    (p && -w === n.translate) || (!p && w === n.translate))
  )
    return (
      n.updateActiveIndex(a),
      o.autoHeight && n.updateAutoHeight(),
      n.updateSlidesClasses(),
      o.effect !== "slide" && n.setTranslate(w),
      m !== "reset" && (n.transitionStart(i, m), n.transitionEnd(i, m)),
      !1
    );
  if (o.cssMode) {
    const C = n.isHorizontal(),
      T = p ? w : -w;
    if (e === 0) {
      const M = n.virtual && n.params.virtual.enabled;
      M &&
        ((n.wrapperEl.style.scrollSnapType = "none"),
        (n._immediateVirtual = !0)),
        (v[C ? "scrollLeft" : "scrollTop"] = T),
        M &&
          requestAnimationFrame(() => {
            (n.wrapperEl.style.scrollSnapType = ""),
              (n._swiperImmediateVirtual = !1);
          });
    } else {
      if (!n.support.smoothScroll)
        return (
          se({ swiper: n, targetPosition: T, side: C ? "left" : "top" }), !0
        );
      v.scrollTo({ [C ? "left" : "top"]: T, behavior: "smooth" });
    }
    return !0;
  }
  return (
    n.setTransition(e),
    n.setTranslate(w),
    n.updateActiveIndex(a),
    n.updateSlidesClasses(),
    n.emit("beforeTransitionStart", e, s),
    n.transitionStart(i, m),
    e === 0
      ? n.transitionEnd(i, m)
      : n.animating ||
        ((n.animating = !0),
        n.onSlideToWrapperTransitionEnd ||
          (n.onSlideToWrapperTransitionEnd = function (T) {
            !n ||
              n.destroyed ||
              (T.target === this &&
                (n.$wrapperEl[0].removeEventListener(
                  "transitionend",
                  n.onSlideToWrapperTransitionEnd
                ),
                n.$wrapperEl[0].removeEventListener(
                  "webkitTransitionEnd",
                  n.onSlideToWrapperTransitionEnd
                ),
                (n.onSlideToWrapperTransitionEnd = null),
                delete n.onSlideToWrapperTransitionEnd,
                n.transitionEnd(i, m)));
          }),
        n.$wrapperEl[0].addEventListener(
          "transitionend",
          n.onSlideToWrapperTransitionEnd
        ),
        n.$wrapperEl[0].addEventListener(
          "webkitTransitionEnd",
          n.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function At(t, e, i, s) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    i === void 0 && (i = !0);
  const r = this;
  let n = t;
  return r.params.loop && (n += r.loopedSlides), r.slideTo(n, e, i, s);
}
function Dt(t, e, i) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const s = this,
    { animating: r, enabled: n, params: a } = s;
  if (!n) return s;
  let o = a.slidesPerGroup;
  a.slidesPerView === "auto" &&
    a.slidesPerGroup === 1 &&
    a.slidesPerGroupAuto &&
    (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const l = s.activeIndex < a.slidesPerGroupSkip ? 1 : o;
  if (a.loop) {
    if (r && a.loopPreventsSlide) return !1;
    s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
  }
  return a.rewind && s.isEnd
    ? s.slideTo(0, t, e, i)
    : s.slideTo(s.activeIndex + l, t, e, i);
}
function Gt(t, e, i) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const s = this,
    {
      params: r,
      animating: n,
      snapGrid: a,
      slidesGrid: o,
      rtlTranslate: l,
      enabled: d,
    } = s;
  if (!d) return s;
  if (r.loop) {
    if (n && r.loopPreventsSlide) return !1;
    s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
  }
  const c = l ? s.translate : -s.translate;
  function f(S) {
    return S < 0 ? -Math.floor(Math.abs(S)) : Math.floor(S);
  }
  const p = f(c),
    v = a.map((S) => f(S));
  let u = a[v.indexOf(p) - 1];
  if (typeof u == "undefined" && r.cssMode) {
    let S;
    a.forEach((w, m) => {
      p >= w && (S = m);
    }),
      typeof S != "undefined" && (u = a[S > 0 ? S - 1 : S]);
  }
  let h = 0;
  if (
    (typeof u != "undefined" &&
      ((h = o.indexOf(u)),
      h < 0 && (h = s.activeIndex - 1),
      r.slidesPerView === "auto" &&
        r.slidesPerGroup === 1 &&
        r.slidesPerGroupAuto &&
        ((h = h - s.slidesPerViewDynamic("previous", !0) + 1),
        (h = Math.max(h, 0)))),
    r.rewind && s.isBeginning)
  ) {
    const S =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1;
    return s.slideTo(S, t, e, i);
  }
  return s.slideTo(h, t, e, i);
}
function Bt(t, e, i) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const s = this;
  return s.slideTo(s.activeIndex, t, e, i);
}
function Nt(t, e, i, s) {
  t === void 0 && (t = this.params.speed),
    e === void 0 && (e = !0),
    s === void 0 && (s = 0.5);
  const r = this;
  let n = r.activeIndex;
  const a = Math.min(r.params.slidesPerGroupSkip, n),
    o = a + Math.floor((n - a) / r.params.slidesPerGroup),
    l = r.rtlTranslate ? r.translate : -r.translate;
  if (l >= r.snapGrid[o]) {
    const d = r.snapGrid[o],
      c = r.snapGrid[o + 1];
    l - d > (c - d) * s && (n += r.params.slidesPerGroup);
  } else {
    const d = r.snapGrid[o - 1],
      c = r.snapGrid[o];
    l - d <= (c - d) * s && (n -= r.params.slidesPerGroup);
  }
  return (
    (n = Math.max(n, 0)),
    (n = Math.min(n, r.slidesGrid.length - 1)),
    r.slideTo(n, t, e, i)
  );
}
function Ht() {
  const t = this,
    { params: e, $wrapperEl: i } = t,
    s = e.slidesPerView === "auto" ? t.slidesPerViewDynamic() : e.slidesPerView;
  let r = t.clickedIndex,
    n;
  if (e.loop) {
    if (t.animating) return;
    (n = parseInt(g(t.clickedSlide).attr("data-swiper-slide-index"), 10)),
      e.centeredSlides
        ? r < t.loopedSlides - s / 2 ||
          r > t.slides.length - t.loopedSlides + s / 2
          ? (t.loopFix(),
            (r = i
              .children(
                `.${e.slideClass}[data-swiper-slide-index="${n}"]:not(.${e.slideDuplicateClass})`
              )
              .eq(0)
              .index()),
            R(() => {
              t.slideTo(r);
            }))
          : t.slideTo(r)
        : r > t.slides.length - s
        ? (t.loopFix(),
          (r = i
            .children(
              `.${e.slideClass}[data-swiper-slide-index="${n}"]:not(.${e.slideDuplicateClass})`
            )
            .eq(0)
            .index()),
          R(() => {
            t.slideTo(r);
          }))
        : t.slideTo(r);
  } else t.slideTo(r);
}
var Vt = {
  slideTo: zt,
  slideToLoop: At,
  slideNext: Dt,
  slidePrev: Gt,
  slideReset: Bt,
  slideToClosest: Nt,
  slideToClickedSlide: Ht,
};
function Ft() {
  const t = this,
    e = L(),
    { params: i, $wrapperEl: s } = t,
    r = s.children().length > 0 ? g(s.children()[0].parentNode) : s;
  r.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
  let n = r.children(`.${i.slideClass}`);
  if (i.loopFillGroupWithBlank) {
    const l = i.slidesPerGroup - (n.length % i.slidesPerGroup);
    if (l !== i.slidesPerGroup) {
      for (let d = 0; d < l; d += 1) {
        const c = g(e.createElement("div")).addClass(
          `${i.slideClass} ${i.slideBlankClass}`
        );
        r.append(c);
      }
      n = r.children(`.${i.slideClass}`);
    }
  }
  i.slidesPerView === "auto" && !i.loopedSlides && (i.loopedSlides = n.length),
    (t.loopedSlides = Math.ceil(
      parseFloat(i.loopedSlides || i.slidesPerView, 10)
    )),
    (t.loopedSlides += i.loopAdditionalSlides),
    t.loopedSlides > n.length && (t.loopedSlides = n.length);
  const a = [],
    o = [];
  n.each((l, d) => {
    const c = g(l);
    d < t.loopedSlides && o.push(l),
      d < n.length && d >= n.length - t.loopedSlides && a.push(l),
      c.attr("data-swiper-slide-index", d);
  });
  for (let l = 0; l < o.length; l += 1)
    r.append(g(o[l].cloneNode(!0)).addClass(i.slideDuplicateClass));
  for (let l = a.length - 1; l >= 0; l -= 1)
    r.prepend(g(a[l].cloneNode(!0)).addClass(i.slideDuplicateClass));
}
function _t() {
  const t = this;
  t.emit("beforeLoopFix");
  const {
    activeIndex: e,
    slides: i,
    loopedSlides: s,
    allowSlidePrev: r,
    allowSlideNext: n,
    snapGrid: a,
    rtlTranslate: o,
  } = t;
  let l;
  (t.allowSlidePrev = !0), (t.allowSlideNext = !0);
  const c = -a[e] - t.getTranslate();
  e < s
    ? ((l = i.length - s * 3 + e),
      (l += s),
      t.slideTo(l, 0, !1, !0) &&
        c !== 0 &&
        t.setTranslate((o ? -t.translate : t.translate) - c))
    : e >= i.length - s &&
      ((l = -i.length + e + s),
      (l += s),
      t.slideTo(l, 0, !1, !0) &&
        c !== 0 &&
        t.setTranslate((o ? -t.translate : t.translate) - c)),
    (t.allowSlidePrev = r),
    (t.allowSlideNext = n),
    t.emit("loopFix");
}
function Rt() {
  const t = this,
    { $wrapperEl: e, params: i, slides: s } = t;
  e
    .children(
      `.${i.slideClass}.${i.slideDuplicateClass},.${i.slideClass}.${i.slideBlankClass}`
    )
    .remove(),
    s.removeAttr("data-swiper-slide-index");
}
var Wt = { loopCreate: Ft, loopFix: _t, loopDestroy: Rt };
function jt(t) {
  const e = this;
  if (
    e.support.touch ||
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const i = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  (i.style.cursor = "move"),
    (i.style.cursor = t ? "-webkit-grabbing" : "-webkit-grab"),
    (i.style.cursor = t ? "-moz-grabbin" : "-moz-grab"),
    (i.style.cursor = t ? "grabbing" : "grab");
}
function qt() {
  const t = this;
  t.support.touch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode ||
    (t[
      t.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = "");
}
var Xt = { setGrabCursor: jt, unsetGrabCursor: qt };
function Yt(t, e) {
  e === void 0 && (e = this);
  function i(s) {
    return !s || s === L() || s === $()
      ? null
      : (s.assignedSlot && (s = s.assignedSlot),
        s.closest(t) || i(s.getRootNode().host));
  }
  return i(e);
}
function Kt(t) {
  const e = this,
    i = L(),
    s = $(),
    r = e.touchEventsData,
    { params: n, touches: a, enabled: o } = e;
  if (!o || (e.animating && n.preventInteractionOnTransition)) return;
  !e.animating && n.cssMode && n.loop && e.loopFix();
  let l = t;
  l.originalEvent && (l = l.originalEvent);
  let d = g(l.target);
  if (
    (n.touchEventsTarget === "wrapper" && !d.closest(e.wrapperEl).length) ||
    ((r.isTouchEvent = l.type === "touchstart"),
    !r.isTouchEvent && "which" in l && l.which === 3) ||
    (!r.isTouchEvent && "button" in l && l.button > 0) ||
    (r.isTouched && r.isMoved)
  )
    return;
  !!n.noSwipingClass &&
    n.noSwipingClass !== "" &&
    l.target &&
    l.target.shadowRoot &&
    t.path &&
    t.path[0] &&
    (d = g(t.path[0]));
  const f = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    p = !!(l.target && l.target.shadowRoot);
  if (n.noSwiping && (p ? Yt(f, l.target) : d.closest(f)[0])) {
    e.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !d.closest(n.swipeHandler)[0]) return;
  (a.currentX = l.type === "touchstart" ? l.targetTouches[0].pageX : l.pageX),
    (a.currentY = l.type === "touchstart" ? l.targetTouches[0].pageY : l.pageY);
  const v = a.currentX,
    u = a.currentY,
    h = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
    S = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
  if (h && (v <= S || v >= s.innerWidth - S))
    if (h === "prevent") t.preventDefault();
    else return;
  if (
    (Object.assign(r, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
    (a.startX = v),
    (a.startY = u),
    (r.touchStartTime = N()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    n.threshold > 0 && (r.allowThresholdMove = !1),
    l.type !== "touchstart")
  ) {
    let w = !0;
    d.is(r.focusableElements) &&
      ((w = !1), d[0].nodeName === "SELECT" && (r.isTouched = !1)),
      i.activeElement &&
        g(i.activeElement).is(r.focusableElements) &&
        i.activeElement !== d[0] &&
        i.activeElement.blur();
    const m = w && e.allowTouchMove && n.touchStartPreventDefault;
    (n.touchStartForcePreventDefault || m) &&
      !d[0].isContentEditable &&
      l.preventDefault();
  }
  e.params.freeMode &&
    e.params.freeMode.enabled &&
    e.freeMode &&
    e.animating &&
    !n.cssMode &&
    e.freeMode.onTouchStart(),
    e.emit("touchStart", l);
}
function Ut(t) {
  const e = L(),
    i = this,
    s = i.touchEventsData,
    { params: r, touches: n, rtlTranslate: a, enabled: o } = i;
  if (!o) return;
  let l = t;
  if ((l.originalEvent && (l = l.originalEvent), !s.isTouched)) {
    s.startMoving && s.isScrolling && i.emit("touchMoveOpposite", l);
    return;
  }
  if (s.isTouchEvent && l.type !== "touchmove") return;
  const d =
      l.type === "touchmove" &&
      l.targetTouches &&
      (l.targetTouches[0] || l.changedTouches[0]),
    c = l.type === "touchmove" ? d.pageX : l.pageX,
    f = l.type === "touchmove" ? d.pageY : l.pageY;
  if (l.preventedByNestedSwiper) {
    (n.startX = c), (n.startY = f);
    return;
  }
  if (!i.allowTouchMove) {
    g(l.target).is(s.focusableElements) || (i.allowClick = !1),
      s.isTouched &&
        (Object.assign(n, { startX: c, startY: f, currentX: c, currentY: f }),
        (s.touchStartTime = N()));
    return;
  }
  if (s.isTouchEvent && r.touchReleaseOnEdges && !r.loop) {
    if (i.isVertical()) {
      if (
        (f < n.startY && i.translate <= i.maxTranslate()) ||
        (f > n.startY && i.translate >= i.minTranslate())
      ) {
        (s.isTouched = !1), (s.isMoved = !1);
        return;
      }
    } else if (
      (c < n.startX && i.translate <= i.maxTranslate()) ||
      (c > n.startX && i.translate >= i.minTranslate())
    )
      return;
  }
  if (
    s.isTouchEvent &&
    e.activeElement &&
    l.target === e.activeElement &&
    g(l.target).is(s.focusableElements)
  ) {
    (s.isMoved = !0), (i.allowClick = !1);
    return;
  }
  if (
    (s.allowTouchCallbacks && i.emit("touchMove", l),
    l.targetTouches && l.targetTouches.length > 1)
  )
    return;
  (n.currentX = c), (n.currentY = f);
  const p = n.currentX - n.startX,
    v = n.currentY - n.startY;
  if (i.params.threshold && Math.sqrt(p ** 2 + v ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling == "undefined") {
    let w;
    (i.isHorizontal() && n.currentY === n.startY) ||
    (i.isVertical() && n.currentX === n.startX)
      ? (s.isScrolling = !1)
      : p * p + v * v >= 25 &&
        ((w = (Math.atan2(Math.abs(v), Math.abs(p)) * 180) / Math.PI),
        (s.isScrolling = i.isHorizontal()
          ? w > r.touchAngle
          : 90 - w > r.touchAngle));
  }
  if (
    (s.isScrolling && i.emit("touchMoveOpposite", l),
    typeof s.startMoving == "undefined" &&
      (n.currentX !== n.startX || n.currentY !== n.startY) &&
      (s.startMoving = !0),
    s.isScrolling)
  ) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving) return;
  (i.allowClick = !1),
    !r.cssMode && l.cancelable && l.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && l.stopPropagation(),
    s.isMoved ||
      (r.loop && !r.cssMode && i.loopFix(),
      (s.startTranslate = i.getTranslate()),
      i.setTransition(0),
      i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
      (s.allowMomentumBounce = !1),
      r.grabCursor &&
        (i.allowSlideNext === !0 || i.allowSlidePrev === !0) &&
        i.setGrabCursor(!0),
      i.emit("sliderFirstMove", l)),
    i.emit("sliderMove", l),
    (s.isMoved = !0);
  let u = i.isHorizontal() ? p : v;
  (n.diff = u),
    (u *= r.touchRatio),
    a && (u = -u),
    (i.swipeDirection = u > 0 ? "prev" : "next"),
    (s.currentTranslate = u + s.startTranslate);
  let h = !0,
    S = r.resistanceRatio;
  if (
    (r.touchReleaseOnEdges && (S = 0),
    u > 0 && s.currentTranslate > i.minTranslate()
      ? ((h = !1),
        r.resistance &&
          (s.currentTranslate =
            i.minTranslate() -
            1 +
            (-i.minTranslate() + s.startTranslate + u) ** S))
      : u < 0 &&
        s.currentTranslate < i.maxTranslate() &&
        ((h = !1),
        r.resistance &&
          (s.currentTranslate =
            i.maxTranslate() +
            1 -
            (i.maxTranslate() - s.startTranslate - u) ** S)),
    h && (l.preventedByNestedSwiper = !0),
    !i.allowSlideNext &&
      i.swipeDirection === "next" &&
      s.currentTranslate < s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !i.allowSlidePrev &&
      i.swipeDirection === "prev" &&
      s.currentTranslate > s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !i.allowSlidePrev &&
      !i.allowSlideNext &&
      (s.currentTranslate = s.startTranslate),
    r.threshold > 0)
  )
    if (Math.abs(u) > r.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        (s.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (s.currentTranslate = s.startTranslate),
          (n.diff = i.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY);
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !r.followFinger ||
    r.cssMode ||
    (((r.freeMode && r.freeMode.enabled && i.freeMode) ||
      r.watchSlidesProgress) &&
      (i.updateActiveIndex(), i.updateSlidesClasses()),
    i.params.freeMode &&
      r.freeMode.enabled &&
      i.freeMode &&
      i.freeMode.onTouchMove(),
    i.updateProgress(s.currentTranslate),
    i.setTranslate(s.currentTranslate));
}
function Jt(t) {
  const e = this,
    i = e.touchEventsData,
    { params: s, touches: r, rtlTranslate: n, slidesGrid: a, enabled: o } = e;
  if (!o) return;
  let l = t;
  if (
    (l.originalEvent && (l = l.originalEvent),
    i.allowTouchCallbacks && e.emit("touchEnd", l),
    (i.allowTouchCallbacks = !1),
    !i.isTouched)
  ) {
    i.isMoved && s.grabCursor && e.setGrabCursor(!1),
      (i.isMoved = !1),
      (i.startMoving = !1);
    return;
  }
  s.grabCursor &&
    i.isMoved &&
    i.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const d = N(),
    c = d - i.touchStartTime;
  if (e.allowClick) {
    const m = l.path || (l.composedPath && l.composedPath());
    e.updateClickedSlide((m && m[0]) || l.target),
      e.emit("tap click", l),
      c < 300 &&
        d - i.lastClickTime < 300 &&
        e.emit("doubleTap doubleClick", l);
  }
  if (
    ((i.lastClickTime = N()),
    R(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !i.isTouched ||
      !i.isMoved ||
      !e.swipeDirection ||
      r.diff === 0 ||
      i.currentTranslate === i.startTranslate)
  ) {
    (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
    return;
  }
  (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
  let f;
  if (
    (s.followFinger
      ? (f = n ? e.translate : -e.translate)
      : (f = -i.currentTranslate),
    s.cssMode)
  )
    return;
  if (e.params.freeMode && s.freeMode.enabled) {
    console.log(e);
    e.freeMode.onTouchEnd({ currentPos: f });
    return;
  }
  let p = 0,
    v = e.slidesSizesGrid[0];
  for (
    let m = 0;
    m < a.length;
    m += m < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
  ) {
    const C = m < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
    typeof a[m + C] != "undefined"
      ? f >= a[m] && f < a[m + C] && ((p = m), (v = a[m + C] - a[m]))
      : f >= a[m] && ((p = m), (v = a[a.length - 1] - a[a.length - 2]));
  }
  let u = null,
    h = null;
  s.rewind &&
    (e.isBeginning
      ? (h =
          e.params.virtual && e.params.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (u = 0));
  const S = (f - a[p]) / v,
    w = p < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
  if (c > s.longSwipesMs) {
    if (!s.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" &&
      (S >= s.longSwipesRatio
        ? e.slideTo(s.rewind && e.isEnd ? u : p + w)
        : e.slideTo(p)),
      e.swipeDirection === "prev" &&
        (S > 1 - s.longSwipesRatio
          ? e.slideTo(p + w)
          : h !== null && S < 0 && Math.abs(S) > s.longSwipesRatio
          ? e.slideTo(h)
          : e.slideTo(p));
  } else {
    if (!s.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (l.target === e.navigation.nextEl || l.target === e.navigation.prevEl)
      ? l.target === e.navigation.nextEl
        ? e.slideTo(p + w)
        : e.slideTo(p)
      : (e.swipeDirection === "next" && e.slideTo(u !== null ? u : p + w),
        e.swipeDirection === "prev" && e.slideTo(h !== null ? h : p));
  }
}
function ae() {
  const t = this,
    { params: e, el: i } = t;
  if (i && i.offsetWidth === 0) return;
  e.breakpoints && t.setBreakpoint();
  const { allowSlideNext: s, allowSlidePrev: r, snapGrid: n } = t;
  (t.allowSlideNext = !0),
    (t.allowSlidePrev = !0),
    t.updateSize(),
    t.updateSlides(),
    t.updateSlidesClasses(),
    (e.slidesPerView === "auto" || e.slidesPerView > 1) &&
    t.isEnd &&
    !t.isBeginning &&
    !t.params.centeredSlides
      ? t.slideTo(t.slides.length - 1, 0, !1, !0)
      : t.slideTo(t.activeIndex, 0, !1, !0),
    t.autoplay && t.autoplay.running && t.autoplay.paused && t.autoplay.run(),
    (t.allowSlidePrev = r),
    (t.allowSlideNext = s),
    t.params.watchOverflow && n !== t.snapGrid && t.checkOverflow();
}
function Qt(t) {
  const e = this;
  !e.enabled ||
    e.allowClick ||
    (e.params.preventClicks && t.preventDefault(),
    e.params.preventClicksPropagation &&
      e.animating &&
      (t.stopPropagation(), t.stopImmediatePropagation()));
}
function Zt() {
  const t = this,
    { wrapperEl: e, rtlTranslate: i, enabled: s } = t;
  if (!s) return;
  (t.previousTranslate = t.translate),
    t.isHorizontal()
      ? (t.translate = -e.scrollLeft)
      : (t.translate = -e.scrollTop),
    t.translate === -0 && (t.translate = 0),
    t.updateActiveIndex(),
    t.updateSlidesClasses();
  let r;
  const n = t.maxTranslate() - t.minTranslate();
  n === 0 ? (r = 0) : (r = (t.translate - t.minTranslate()) / n),
    r !== t.progress && t.updateProgress(i ? -t.translate : t.translate),
    t.emit("setTranslate", t.translate, !1);
}
let le = !1;
function ei() {}
const oe = (t, e) => {
  const i = L(),
    {
      params: s,
      touchEvents: r,
      el: n,
      wrapperEl: a,
      device: o,
      support: l,
    } = t,
    d = !!s.nested,
    c = e === "on" ? "addEventListener" : "removeEventListener",
    f = e;
  if (!l.touch)
    n[c](r.start, t.onTouchStart, !1),
      i[c](r.move, t.onTouchMove, d),
      i[c](r.end, t.onTouchEnd, !1);
  else {
    const p =
      r.start === "touchstart" && l.passiveListener && s.passiveListeners
        ? { passive: !0, capture: !1 }
        : !1;
    n[c](r.start, t.onTouchStart, p),
      n[c](
        r.move,
        t.onTouchMove,
        l.passiveListener ? { passive: !1, capture: d } : d
      ),
      n[c](r.end, t.onTouchEnd, p),
      r.cancel && n[c](r.cancel, t.onTouchEnd, p);
  }
  (s.preventClicks || s.preventClicksPropagation) &&
    n[c]("click", t.onClick, !0),
    s.cssMode && a[c]("scroll", t.onScroll),
    s.updateOnWindowResize
      ? t[f](
          o.ios || o.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          ae,
          !0
        )
      : t[f]("observerUpdate", ae, !0);
};
function ti() {
  const t = this,
    e = L(),
    { params: i, support: s } = t;
  (t.onTouchStart = Kt.bind(t)),
    (t.onTouchMove = Ut.bind(t)),
    (t.onTouchEnd = Jt.bind(t)),
    i.cssMode && (t.onScroll = Zt.bind(t)),
    (t.onClick = Qt.bind(t)),
    s.touch && !le && (e.addEventListener("touchstart", ei), (le = !0)),
    oe(t, "on");
}
function ii() {
  oe(this, "off");
}
var si = { attachEvents: ti, detachEvents: ii };
const de = (t, e) => t.grid && e.grid && e.grid.rows > 1;
function ni() {
  const t = this,
    {
      activeIndex: e,
      initialized: i,
      loopedSlides: s = 0,
      params: r,
      $el: n,
    } = t,
    a = r.breakpoints;
  if (!a || (a && Object.keys(a).length === 0)) return;
  const o = t.getBreakpoint(a, t.params.breakpointsBase, t.el);
  if (!o || t.currentBreakpoint === o) return;
  const d = (o in a ? a[o] : void 0) || t.originalParams,
    c = de(t, r),
    f = de(t, d),
    p = r.enabled;
  c && !f
    ? (n.removeClass(
        `${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`
      ),
      t.emitContainerClasses())
    : !c &&
      f &&
      (n.addClass(`${r.containerModifierClass}grid`),
      ((d.grid.fill && d.grid.fill === "column") ||
        (!d.grid.fill && r.grid.fill === "column")) &&
        n.addClass(`${r.containerModifierClass}grid-column`),
      t.emitContainerClasses());
  const v = d.direction && d.direction !== r.direction,
    u = r.loop && (d.slidesPerView !== r.slidesPerView || v);
  v && i && t.changeDirection(), O(t.params, d);
  const h = t.params.enabled;
  Object.assign(t, {
    allowTouchMove: t.params.allowTouchMove,
    allowSlideNext: t.params.allowSlideNext,
    allowSlidePrev: t.params.allowSlidePrev,
  }),
    p && !h ? t.disable() : !p && h && t.enable(),
    (t.currentBreakpoint = o),
    t.emit("_beforeBreakpoint", d),
    u &&
      i &&
      (t.loopDestroy(),
      t.loopCreate(),
      t.updateSlides(),
      t.slideTo(e - s + t.loopedSlides, 0, !1)),
    t.emit("breakpoint", d);
}
function ri(t, e, i) {
  if ((e === void 0 && (e = "window"), !t || (e === "container" && !i))) return;
  let s = !1;
  const r = $(),
    n = e === "window" ? r.innerHeight : i.clientHeight,
    a = Object.keys(t).map((o) => {
      if (typeof o == "string" && o.indexOf("@") === 0) {
        const l = parseFloat(o.substr(1));
        return { value: n * l, point: o };
      }
      return { value: o, point: o };
    });
  a.sort((o, l) => parseInt(o.value, 10) - parseInt(l.value, 10));
  for (let o = 0; o < a.length; o += 1) {
    const { point: l, value: d } = a[o];
    e === "window"
      ? r.matchMedia(`(min-width: ${d}px)`).matches && (s = l)
      : d <= i.clientWidth && (s = l);
  }
  return s || "max";
}
var ai = { setBreakpoint: ni, getBreakpoint: ri };
function li(t, e) {
  const i = [];
  return (
    t.forEach((s) => {
      typeof s == "object"
        ? Object.keys(s).forEach((r) => {
            s[r] && i.push(e + r);
          })
        : typeof s == "string" && i.push(e + s);
    }),
    i
  );
}
function oi() {
  const t = this,
    { classNames: e, params: i, rtl: s, $el: r, device: n, support: a } = t,
    o = li(
      [
        "initialized",
        i.direction,
        { "pointer-events": !a.touch },
        { "free-mode": t.params.freeMode && i.freeMode.enabled },
        { autoheight: i.autoHeight },
        { rtl: s },
        { grid: i.grid && i.grid.rows > 1 },
        {
          "grid-column": i.grid && i.grid.rows > 1 && i.grid.fill === "column",
        },
        { android: n.android },
        { ios: n.ios },
        { "css-mode": i.cssMode },
        { centered: i.cssMode && i.centeredSlides },
      ],
      i.containerModifierClass
    );
  e.push(...o), r.addClass([...e].join(" ")), t.emitContainerClasses();
}
function di() {
  const t = this,
    { $el: e, classNames: i } = t;
  e.removeClass(i.join(" ")), t.emitContainerClasses();
}
var ci = { addClasses: oi, removeClasses: di };
function fi(t, e, i, s, r, n) {
  const a = $();
  let o;
  function l() {
    n && n();
  }
  !g(t).parent("picture")[0] && (!t.complete || !r) && e
    ? ((o = new a.Image()),
      (o.onload = l),
      (o.onerror = l),
      s && (o.sizes = s),
      i && (o.srcset = i),
      e && (o.src = e))
    : l();
}
function ui() {
  const t = this;
  t.imagesToLoad = t.$el.find("img");
  function e() {
    typeof t == "undefined" ||
      t === null ||
      !t ||
      t.destroyed ||
      (t.imagesLoaded !== void 0 && (t.imagesLoaded += 1),
      t.imagesLoaded === t.imagesToLoad.length &&
        (t.params.updateOnImagesReady && t.update(), t.emit("imagesReady")));
  }
  for (let i = 0; i < t.imagesToLoad.length; i += 1) {
    const s = t.imagesToLoad[i];
    t.loadImage(
      s,
      s.currentSrc || s.getAttribute("src"),
      s.srcset || s.getAttribute("srcset"),
      s.sizes || s.getAttribute("sizes"),
      !0,
      e
    );
  }
}
var pi = { loadImage: fi, preloadImages: ui };
function hi() {
  const t = this,
    { isLocked: e, params: i } = t,
    { slidesOffsetBefore: s } = i;
  if (s) {
    const r = t.slides.length - 1,
      n = t.slidesGrid[r] + t.slidesSizesGrid[r] + s * 2;
    t.isLocked = t.size > n;
  } else t.isLocked = t.snapGrid.length === 1;
  i.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked),
    i.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked),
    e && e !== t.isLocked && (t.isEnd = !1),
    e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
}
var mi = { checkOverflow: hi },
  ce = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function gi(t, e) {
  return function (s) {
    s === void 0 && (s = {});
    const r = Object.keys(s)[0],
      n = s[r];
    if (typeof n != "object" || n === null) {
      O(e, s);
      return;
    }
    if (
      (["navigation", "pagination", "scrollbar"].indexOf(r) >= 0 &&
        t[r] === !0 &&
        (t[r] = { auto: !0 }),
      !(r in t && "enabled" in n))
    ) {
      O(e, s);
      return;
    }
    t[r] === !0 && (t[r] = { enabled: !0 }),
      typeof t[r] == "object" && !("enabled" in t[r]) && (t[r].enabled = !0),
      t[r] || (t[r] = { enabled: !1 }),
      O(e, s);
  };
}
const X = {
    eventsEmitter: ut,
    update: Ct,
    translate: $t,
    transition: It,
    slide: Vt,
    loop: Wt,
    grabCursor: Xt,
    events: si,
    breakpoints: ai,
    checkOverflow: mi,
    classes: ci,
    images: pi,
  },
  Y = {};
class I {
  constructor() {
    let e, i;
    for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
      r[n] = arguments[n];
    if (
      (r.length === 1 &&
      r[0].constructor &&
      Object.prototype.toString.call(r[0]).slice(8, -1) === "Object"
        ? (i = r[0])
        : ([e, i] = r),
      i || (i = {}),
      (i = O({}, i)),
      e && !i.el && (i.el = e),
      i.el && g(i.el).length > 1)
    ) {
      const d = [];
      return (
        g(i.el).each((c) => {
          const f = O({}, i, { el: c });
          d.push(new I(f));
        }),
        d
      );
    }
    const a = this;
    (a.__swiper__ = !0),
      (a.support = ne()),
      (a.device = lt({ userAgent: i.userAgent })),
      (a.browser = dt()),
      (a.eventsListeners = {}),
      (a.eventsAnyListeners = []),
      (a.modules = [...a.__modules__]),
      i.modules && Array.isArray(i.modules) && a.modules.push(...i.modules);
    const o = {};
    a.modules.forEach((d) => {
      d({
        swiper: a,
        extendParams: gi(i, o),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a),
      });
    });
    const l = O({}, ce, o);
    return (
      (a.params = O({}, l, Y, i)),
      (a.originalParams = O({}, a.params)),
      (a.passedParams = O({}, i)),
      a.params &&
        a.params.on &&
        Object.keys(a.params.on).forEach((d) => {
          a.on(d, a.params.on[d]);
        }),
      a.params && a.params.onAny && a.onAny(a.params.onAny),
      (a.$ = g),
      Object.assign(a, {
        enabled: a.params.enabled,
        el: e,
        classNames: [],
        slides: g(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return a.params.direction === "horizontal";
        },
        isVertical() {
          return a.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: a.params.allowSlideNext,
        allowSlidePrev: a.params.allowSlidePrev,
        touchEvents: (function () {
          const c = ["touchstart", "touchmove", "touchend", "touchcancel"],
            f = ["pointerdown", "pointermove", "pointerup"];
          return (
            (a.touchEventsTouch = {
              start: c[0],
              move: c[1],
              end: c[2],
              cancel: c[3],
            }),
            (a.touchEventsDesktop = { start: f[0], move: f[1], end: f[2] }),
            a.support.touch || !a.params.simulateTouch
              ? a.touchEventsTouch
              : a.touchEventsDesktop
          );
        })(),
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: a.params.focusableElements,
          lastClickTime: N(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          isTouchEvent: void 0,
          startMoving: void 0,
        },
        allowClick: !0,
        allowTouchMove: a.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      a.emit("_swiper"),
      a.params.init && a.init(),
      a
    );
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    !e.enabled ||
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, i) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const r = s.minTranslate(),
      a = (s.maxTranslate() - r) * e + r;
    s.translateTo(a, typeof i == "undefined" ? 0 : i),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const i = e.el.className
      .split(" ")
      .filter(
        (s) =>
          s.indexOf("swiper") === 0 ||
          s.indexOf(e.params.containerModifierClass) === 0
      );
    e.emit("_containerClasses", i.join(" "));
  }
  getSlideClasses(e) {
    const i = this;
    return e.className
      .split(" ")
      .filter(
        (s) =>
          s.indexOf("swiper-slide") === 0 ||
          s.indexOf(i.params.slideClass) === 0
      )
      .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const i = [];
    e.slides.each((s) => {
      const r = e.getSlideClasses(s);
      i.push({ slideEl: s, classNames: r }), e.emit("_slideClass", s, r);
    }),
      e.emit("_slideClasses", i);
  }
  slidesPerViewDynamic(e, i) {
    e === void 0 && (e = "current"), i === void 0 && (i = !1);
    const s = this,
      {
        params: r,
        slides: n,
        slidesGrid: a,
        slidesSizesGrid: o,
        size: l,
        activeIndex: d,
      } = s;
    let c = 1;
    if (r.centeredSlides) {
      let f = n[d].swiperSlideSize,
        p;
      for (let v = d + 1; v < n.length; v += 1)
        n[v] &&
          !p &&
          ((f += n[v].swiperSlideSize), (c += 1), f > l && (p = !0));
      for (let v = d - 1; v >= 0; v -= 1)
        n[v] &&
          !p &&
          ((f += n[v].swiperSlideSize), (c += 1), f > l && (p = !0));
    } else if (e === "current")
      for (let f = d + 1; f < n.length; f += 1)
        (i ? a[f] + o[f] - a[d] < l : a[f] - a[d] < l) && (c += 1);
    else for (let f = d - 1; f >= 0; f -= 1) a[d] - a[f] < l && (c += 1);
    return c;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: i, params: s } = e;
    s.breakpoints && e.setBreakpoint(),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function r() {
      const a = e.rtlTranslate ? e.translate * -1 : e.translate,
        o = Math.min(Math.max(a, e.maxTranslate()), e.minTranslate());
      e.setTranslate(o), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let n;
    e.params.freeMode && e.params.freeMode.enabled
      ? (r(), e.params.autoHeight && e.updateAutoHeight())
      : ((e.params.slidesPerView === "auto" || e.params.slidesPerView > 1) &&
        e.isEnd &&
        !e.params.centeredSlides
          ? (n = e.slideTo(e.slides.length - 1, 0, !1, !0))
          : (n = e.slideTo(e.activeIndex, 0, !1, !0)),
        n || r()),
      s.watchOverflow && i !== e.snapGrid && e.checkOverflow(),
      e.emit("update");
  }
  changeDirection(e, i) {
    i === void 0 && (i = !0);
    const s = this,
      r = s.params.direction;
    return (
      e || (e = r === "horizontal" ? "vertical" : "horizontal"),
      e === r ||
        (e !== "horizontal" && e !== "vertical") ||
        (s.$el
          .removeClass(`${s.params.containerModifierClass}${r}`)
          .addClass(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.each((n) => {
          e === "vertical" ? (n.style.width = "") : (n.style.height = "");
        }),
        s.emit("changeDirection"),
        i && s.update()),
      s
    );
  }
  mount(e) {
    const i = this;
    if (i.mounted) return !0;
    const s = g(e || i.params.el);
    if (((e = s[0]), !e)) return !1;
    e.swiper = i;
    const r = () =>
      `.${(i.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let a = (() => {
      if (e && e.shadowRoot && e.shadowRoot.querySelector) {
        const o = g(e.shadowRoot.querySelector(r()));
        return (o.children = (l) => s.children(l)), o;
      }
      return s.children(r());
    })();
    if (a.length === 0 && i.params.createElements) {
      const l = L().createElement("div");
      (a = g(l)),
        (l.className = i.params.wrapperClass),
        s.append(l),
        s.children(`.${i.params.slideClass}`).each((d) => {
          a.append(d);
        });
    }
    return (
      Object.assign(i, {
        $el: s,
        el: e,
        $wrapperEl: a,
        wrapperEl: a[0],
        mounted: !0,
        rtl: e.dir.toLowerCase() === "rtl" || s.css("direction") === "rtl",
        rtlTranslate:
          i.params.direction === "horizontal" &&
          (e.dir.toLowerCase() === "rtl" || s.css("direction") === "rtl"),
        wrongRTL: a.css("display") === "-webkit-box",
      }),
      !0
    );
  }
  init(e) {
    const i = this;
    return (
      i.initialized ||
        i.mount(e) === !1 ||
        (i.emit("beforeInit"),
        i.params.breakpoints && i.setBreakpoint(),
        i.addClasses(),
        i.params.loop && i.loopCreate(),
        i.updateSize(),
        i.updateSlides(),
        i.params.watchOverflow && i.checkOverflow(),
        i.params.grabCursor && i.enabled && i.setGrabCursor(),
        i.params.preloadImages && i.preloadImages(),
        i.params.loop
          ? i.slideTo(
              i.params.initialSlide + i.loopedSlides,
              0,
              i.params.runCallbacksOnInit,
              !1,
              !0
            )
          : i.slideTo(
              i.params.initialSlide,
              0,
              i.params.runCallbacksOnInit,
              !1,
              !0
            ),
        i.attachEvents(),
        (i.initialized = !0),
        i.emit("init"),
        i.emit("afterInit")),
      i
    );
  }
  destroy(e, i) {
    e === void 0 && (e = !0), i === void 0 && (i = !0);
    const s = this,
      { params: r, $el: n, $wrapperEl: a, slides: o } = s;
    return (
      typeof s.params == "undefined" ||
        s.destroyed ||
        (s.emit("beforeDestroy"),
        (s.initialized = !1),
        s.detachEvents(),
        r.loop && s.loopDestroy(),
        i &&
          (s.removeClasses(),
          n.removeAttr("style"),
          a.removeAttr("style"),
          o &&
            o.length &&
            o
              .removeClass(
                [
                  r.slideVisibleClass,
                  r.slideActiveClass,
                  r.slideNextClass,
                  r.slidePrevClass,
                ].join(" ")
              )
              .removeAttr("style")
              .removeAttr("data-swiper-slide-index")),
        s.emit("destroy"),
        Object.keys(s.eventsListeners).forEach((l) => {
          s.off(l);
        }),
        e !== !1 && ((s.$el[0].swiper = null), tt(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    O(Y, e);
  }
  static get extendedDefaults() {
    return Y;
  }
  static get defaults() {
    return ce;
  }
  static installModule(e) {
    I.prototype.__modules__ || (I.prototype.__modules__ = []);
    const i = I.prototype.__modules__;
    typeof e == "function" && i.indexOf(e) < 0 && i.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((i) => I.installModule(i)), I)
      : (I.installModule(e), I);
  }
}
Object.keys(X).forEach((t) => {
  Object.keys(X[t]).forEach((e) => {
    I.prototype[e] = X[t][e];
  });
});
I.use([ct, ft]);
function vi(t, e, i, s) {
  const r = L();
  return (
    t.params.createElements &&
      Object.keys(s).forEach((n) => {
        if (!i[n] && i.auto === !0) {
          let a = t.$el.children(`.${s[n]}`)[0];
          a ||
            ((a = r.createElement("div")),
            (a.className = s[n]),
            t.$el.append(a)),
            (i[n] = a),
            (e[n] = a);
        }
      }),
    i
  );
}
function G(t) {
  return (
    t === void 0 && (t = ""),
    `.${t
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`
  );
}
function wi(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  const n = "swiper-pagination";
  i({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (u) => u,
      formatFractionTotal: (u) => u,
      bulletClass: `${n}-bullet`,
      bulletActiveClass: `${n}-bullet-active`,
      modifierClass: `${n}-`,
      currentClass: `${n}-current`,
      totalClass: `${n}-total`,
      hiddenClass: `${n}-hidden`,
      progressbarFillClass: `${n}-progressbar-fill`,
      progressbarOppositeClass: `${n}-progressbar-opposite`,
      clickableClass: `${n}-clickable`,
      lockClass: `${n}-lock`,
      horizontalClass: `${n}-horizontal`,
      verticalClass: `${n}-vertical`,
    },
  }),
    (e.pagination = { el: null, $el: null, bullets: [] });
  let a,
    o = 0;
  function l() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      !e.pagination.$el ||
      e.pagination.$el.length === 0
    );
  }
  function d(u, h) {
    const { bulletActiveClass: S } = e.params.pagination;
    u[h]().addClass(`${S}-${h}`)[h]().addClass(`${S}-${h}-${h}`);
  }
  function c() {
    const u = e.rtl,
      h = e.params.pagination;
    if (l()) return;
    const S =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      w = e.pagination.$el;
    let m;
    const C = e.params.loop
      ? Math.ceil((S - e.loopedSlides * 2) / e.params.slidesPerGroup)
      : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((m = Math.ceil(
            (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
          )),
          m > S - 1 - e.loopedSlides * 2 && (m -= S - e.loopedSlides * 2),
          m > C - 1 && (m -= C),
          m < 0 && e.params.paginationType !== "bullets" && (m = C + m))
        : typeof e.snapIndex != "undefined"
        ? (m = e.snapIndex)
        : (m = e.activeIndex || 0),
      h.type === "bullets" &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const T = e.pagination.bullets;
      let M, P, z;
      if (
        (h.dynamicBullets &&
          ((a = T.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
          w.css(
            e.isHorizontal() ? "width" : "height",
            `${a * (h.dynamicMainBullets + 4)}px`
          ),
          h.dynamicMainBullets > 1 &&
            e.previousIndex !== void 0 &&
            ((o += m - (e.previousIndex - e.loopedSlides || 0)),
            o > h.dynamicMainBullets - 1
              ? (o = h.dynamicMainBullets - 1)
              : o < 0 && (o = 0)),
          (M = Math.max(m - o, 0)),
          (P = M + (Math.min(T.length, h.dynamicMainBullets) - 1)),
          (z = (P + M) / 2)),
        T.removeClass(
          ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
            .map((E) => `${h.bulletActiveClass}${E}`)
            .join(" ")
        ),
        w.length > 1)
      )
        T.each((E) => {
          const k = g(E),
            b = k.index();
          b === m && k.addClass(h.bulletActiveClass),
            h.dynamicBullets &&
              (b >= M && b <= P && k.addClass(`${h.bulletActiveClass}-main`),
              b === M && d(k, "prev"),
              b === P && d(k, "next"));
        });
      else {
        const E = T.eq(m),
          k = E.index();
        if ((E.addClass(h.bulletActiveClass), h.dynamicBullets)) {
          const b = T.eq(M),
            y = T.eq(P);
          for (let x = M; x <= P; x += 1)
            T.eq(x).addClass(`${h.bulletActiveClass}-main`);
          if (e.params.loop)
            if (k >= T.length) {
              for (let x = h.dynamicMainBullets; x >= 0; x -= 1)
                T.eq(T.length - x).addClass(`${h.bulletActiveClass}-main`);
              T.eq(T.length - h.dynamicMainBullets - 1).addClass(
                `${h.bulletActiveClass}-prev`
              );
            } else d(b, "prev"), d(y, "next");
          else d(b, "prev"), d(y, "next");
        }
      }
      if (h.dynamicBullets) {
        const E = Math.min(T.length, h.dynamicMainBullets + 4),
          k = (a * E - a) / 2 - z * a,
          b = u ? "right" : "left";
        T.css(e.isHorizontal() ? b : "top", `${k}px`);
      }
    }
    if (
      (h.type === "fraction" &&
        (w.find(G(h.currentClass)).text(h.formatFractionCurrent(m + 1)),
        w.find(G(h.totalClass)).text(h.formatFractionTotal(C))),
      h.type === "progressbar")
    ) {
      let T;
      h.progressbarOpposite
        ? (T = e.isHorizontal() ? "vertical" : "horizontal")
        : (T = e.isHorizontal() ? "horizontal" : "vertical");
      const M = (m + 1) / C;
      let P = 1,
        z = 1;
      T === "horizontal" ? (P = M) : (z = M),
        w
          .find(G(h.progressbarFillClass))
          .transform(`translate3d(0,0,0) scaleX(${P}) scaleY(${z})`)
          .transition(e.params.speed);
    }
    h.type === "custom" && h.renderCustom
      ? (w.html(h.renderCustom(e, m + 1, C)), r("paginationRender", w[0]))
      : r("paginationUpdate", w[0]),
      e.params.watchOverflow &&
        e.enabled &&
        w[e.isLocked ? "addClass" : "removeClass"](h.lockClass);
  }
  function f() {
    const u = e.params.pagination;
    if (l()) return;
    const h =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      S = e.pagination.$el;
    let w = "";
    if (u.type === "bullets") {
      let m = e.params.loop
        ? Math.ceil((h - e.loopedSlides * 2) / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode &&
        e.params.freeMode.enabled &&
        !e.params.loop &&
        m > h &&
        (m = h);
      for (let C = 0; C < m; C += 1)
        u.renderBullet
          ? (w += u.renderBullet.call(e, C, u.bulletClass))
          : (w += `<${u.bulletElement} class="${u.bulletClass}"></${u.bulletElement}>`);
      S.html(w), (e.pagination.bullets = S.find(G(u.bulletClass)));
    }
    u.type === "fraction" &&
      (u.renderFraction
        ? (w = u.renderFraction.call(e, u.currentClass, u.totalClass))
        : (w = `<span class="${u.currentClass}"></span> / <span class="${u.totalClass}"></span>`),
      S.html(w)),
      u.type === "progressbar" &&
        (u.renderProgressbar
          ? (w = u.renderProgressbar.call(e, u.progressbarFillClass))
          : (w = `<span class="${u.progressbarFillClass}"></span>`),
        S.html(w)),
      u.type !== "custom" && r("paginationRender", e.pagination.$el[0]);
  }
  function p() {
    e.params.pagination = vi(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      { el: "swiper-pagination" }
    );
    const u = e.params.pagination;
    if (!u.el) return;
    let h = g(u.el);
    h.length !== 0 &&
      (e.params.uniqueNavElements &&
        typeof u.el == "string" &&
        h.length > 1 &&
        ((h = e.$el.find(u.el)),
        h.length > 1 &&
          (h = h.filter((S) => g(S).parents(".swiper")[0] === e.el))),
      u.type === "bullets" && u.clickable && h.addClass(u.clickableClass),
      h.addClass(u.modifierClass + u.type),
      h.addClass(u.modifierClass + e.params.direction),
      u.type === "bullets" &&
        u.dynamicBullets &&
        (h.addClass(`${u.modifierClass}${u.type}-dynamic`),
        (o = 0),
        u.dynamicMainBullets < 1 && (u.dynamicMainBullets = 1)),
      u.type === "progressbar" &&
        u.progressbarOpposite &&
        h.addClass(u.progressbarOppositeClass),
      u.clickable &&
        h.on("click", G(u.bulletClass), function (w) {
          w.preventDefault();
          let m = g(this).index() * e.params.slidesPerGroup;
          e.params.loop && (m += e.loopedSlides), e.slideTo(m);
        }),
      Object.assign(e.pagination, { $el: h, el: h[0] }),
      e.enabled || h.addClass(u.lockClass));
  }
  function v() {
    const u = e.params.pagination;
    if (l()) return;
    const h = e.pagination.$el;
    h.removeClass(u.hiddenClass),
      h.removeClass(u.modifierClass + u.type),
      h.removeClass(u.modifierClass + e.params.direction),
      e.pagination.bullets &&
        e.pagination.bullets.removeClass &&
        e.pagination.bullets.removeClass(u.bulletActiveClass),
      u.clickable && h.off("click", G(u.bulletClass));
  }
  s("init", () => {
    p(), f(), c();
  }),
    s("activeIndexChange", () => {
      (e.params.loop || typeof e.snapIndex == "undefined") && c();
    }),
    s("snapIndexChange", () => {
      e.params.loop || c();
    }),
    s("slidesLengthChange", () => {
      e.params.loop && (f(), c());
    }),
    s("snapGridLengthChange", () => {
      e.params.loop || (f(), c());
    }),
    s("destroy", () => {
      v();
    }),
    s("enable disable", () => {
      const { $el: u } = e.pagination;
      u &&
        u[e.enabled ? "removeClass" : "addClass"](
          e.params.pagination.lockClass
        );
    }),
    s("lock unlock", () => {
      c();
    }),
    s("click", (u, h) => {
      const S = h.target,
        { $el: w } = e.pagination;
      if (
        e.params.pagination.el &&
        e.params.pagination.hideOnClick &&
        w.length > 0 &&
        !g(S).hasClass(e.params.pagination.bulletClass)
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && S === e.navigation.nextEl) ||
            (e.navigation.prevEl && S === e.navigation.prevEl))
        )
          return;
        const m = w.hasClass(e.params.pagination.hiddenClass);
        r(m === !0 ? "paginationShow" : "paginationHide"),
          w.toggleClass(e.params.pagination.hiddenClass);
      }
    }),
    Object.assign(e.pagination, { render: f, update: c, init: p, destroy: v });
}
export { wi as P, I as S };
