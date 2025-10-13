import pt, { useState as M, useRef as Pe, useCallback as P, useEffect as K, useMemo as Ge } from "react";
var Xe = { exports: {} }, _e = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ot;
function kt() {
  if (ot) return _e;
  ot = 1;
  var l = pt, f = Symbol.for("react.element"), v = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, _ = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, L = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(D, y, I) {
    var N, O = {}, W = null, A = null;
    I !== void 0 && (W = "" + I), y.key !== void 0 && (W = "" + y.key), y.ref !== void 0 && (A = y.ref);
    for (N in y) m.call(y, N) && !L.hasOwnProperty(N) && (O[N] = y[N]);
    if (D && D.defaultProps) for (N in y = D.defaultProps, y) O[N] === void 0 && (O[N] = y[N]);
    return { $$typeof: f, type: D, key: W, ref: A, props: O, _owner: _.current };
  }
  return _e.Fragment = v, _e.jsx = x, _e.jsxs = x, _e;
}
var xe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var it;
function Pt() {
  return it || (it = 1, process.env.NODE_ENV !== "production" && function() {
    var l = pt, f = Symbol.for("react.element"), v = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), L = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), D = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), Re = Symbol.iterator, je = "@@iterator";
    function G(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Re && e[Re] || e[je];
      return typeof r == "function" ? r : null;
    }
    var z = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(e) {
      {
        for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), d = 1; d < r; d++)
          o[d - 1] = arguments[d];
        Me("error", e, o);
      }
    }
    function Me(e, r, o) {
      {
        var d = z.ReactDebugCurrentFrame, b = d.getStackAddendum();
        b !== "" && (r += "%s", o = o.concat([b]));
        var E = o.map(function(g) {
          return String(g);
        });
        E.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, E);
      }
    }
    var te = !1, $e = !1, De = !1, pe = !1, B = !1, re;
    re = Symbol.for("react.module.reference");
    function he(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === L || B || e === _ || e === I || e === N || pe || e === A || te || $e || De || typeof e == "object" && e !== null && (e.$$typeof === W || e.$$typeof === O || e.$$typeof === x || e.$$typeof === D || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === re || e.getModuleId !== void 0));
    }
    function ne(e, r, o) {
      var d = e.displayName;
      if (d)
        return d;
      var b = r.displayName || r.name || "";
      return b !== "" ? o + "(" + b + ")" : o;
    }
    function H(e) {
      return e.displayName || "Context";
    }
    function C(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case v:
          return "Portal";
        case L:
          return "Profiler";
        case _:
          return "StrictMode";
        case I:
          return "Suspense";
        case N:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case D:
            var r = e;
            return H(r) + ".Consumer";
          case x:
            var o = e;
            return H(o._context) + ".Provider";
          case y:
            return ne(e, e.render, "ForwardRef");
          case O:
            var d = e.displayName || null;
            return d !== null ? d : C(e.type) || "Memo";
          case W: {
            var b = e, E = b._payload, g = b._init;
            try {
              return C(g(E));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var J = Object.assign, X = 0, ve, ge, Q, be, $, Z, ae;
    function ye() {
    }
    ye.__reactDisabledLog = !0;
    function se() {
      {
        if (X === 0) {
          ve = console.log, ge = console.info, Q = console.warn, be = console.error, $ = console.group, Z = console.groupCollapsed, ae = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ye,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        X++;
      }
    }
    function oe() {
      {
        if (X--, X === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: J({}, e, {
              value: ve
            }),
            info: J({}, e, {
              value: ge
            }),
            warn: J({}, e, {
              value: Q
            }),
            error: J({}, e, {
              value: be
            }),
            group: J({}, e, {
              value: $
            }),
            groupCollapsed: J({}, e, {
              value: Z
            }),
            groupEnd: J({}, e, {
              value: ae
            })
          });
        }
        X < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = z.ReactCurrentDispatcher, Ee;
    function le(e, r, o) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch (b) {
            var d = b.stack.trim().match(/\n( *(at )?)/);
            Ee = d && d[1] || "";
          }
        return `
` + Ee + e;
      }
    }
    var we = !1, ce;
    {
      var Ie = typeof WeakMap == "function" ? WeakMap : Map;
      ce = new Ie();
    }
    function Ne(e, r) {
      if (!e || we)
        return "";
      {
        var o = ce.get(e);
        if (o !== void 0)
          return o;
      }
      var d;
      we = !0;
      var b = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var E;
      E = ie.current, ie.current = null, se();
      try {
        if (r) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (F) {
              d = F;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (F) {
              d = F;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            d = F;
          }
          e();
        }
      } catch (F) {
        if (F && d && typeof F.stack == "string") {
          for (var h = F.stack.split(`
`), k = d.stack.split(`
`), T = h.length - 1, j = k.length - 1; T >= 1 && j >= 0 && h[T] !== k[j]; )
            j--;
          for (; T >= 1 && j >= 0; T--, j--)
            if (h[T] !== k[j]) {
              if (T !== 1 || j !== 1)
                do
                  if (T--, j--, j < 0 || h[T] !== k[j]) {
                    var V = `
` + h[T].replace(" at new ", " at ");
                    return e.displayName && V.includes("<anonymous>") && (V = V.replace("<anonymous>", e.displayName)), typeof e == "function" && ce.set(e, V), V;
                  }
                while (T >= 1 && j >= 0);
              break;
            }
        }
      } finally {
        we = !1, ie.current = E, oe(), Error.prepareStackTrace = b;
      }
      var de = e ? e.displayName || e.name : "", ee = de ? le(de) : "";
      return typeof e == "function" && ce.set(e, ee), ee;
    }
    function Ye(e, r, o) {
      return Ne(e, !1);
    }
    function Ue(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ue(e, r, o) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ne(e, Ue(e));
      if (typeof e == "string")
        return le(e);
      switch (e) {
        case I:
          return le("Suspense");
        case N:
          return le("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return Ye(e.render);
          case O:
            return ue(e.type, r, o);
          case W: {
            var d = e, b = d._payload, E = d._init;
            try {
              return ue(E(b), r, o);
            } catch {
            }
          }
        }
      return "";
    }
    var q = Object.prototype.hasOwnProperty, Ce = {}, Le = z.ReactDebugCurrentFrame;
    function t(e) {
      if (e) {
        var r = e._owner, o = ue(e.type, e._source, r ? r.type : null);
        Le.setExtraStackFrame(o);
      } else
        Le.setExtraStackFrame(null);
    }
    function a(e, r, o, d, b) {
      {
        var E = Function.call.bind(q);
        for (var g in e)
          if (E(e, g)) {
            var h = void 0;
            try {
              if (typeof e[g] != "function") {
                var k = Error((d || "React class") + ": " + o + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw k.name = "Invariant Violation", k;
              }
              h = e[g](r, g, d, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              h = T;
            }
            h && !(h instanceof Error) && (t(b), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", o, g, typeof h), t(null)), h instanceof Error && !(h.message in Ce) && (Ce[h.message] = !0, t(b), R("Failed %s type: %s", o, h.message), t(null));
          }
      }
    }
    var n = Array.isArray;
    function c(e) {
      return n(e);
    }
    function i(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, o = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return o;
      }
    }
    function s(e) {
      try {
        return p(e), !1;
      } catch {
        return !0;
      }
    }
    function p(e) {
      return "" + e;
    }
    function w(e) {
      if (s(e))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", i(e)), p(e);
    }
    var S = z.ReactCurrentOwner, Y = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, U, Oe;
    function ke(e) {
      if (q.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function gt(e) {
      if (q.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function bt(e, r) {
      typeof e.ref == "string" && S.current;
    }
    function yt(e, r) {
      {
        var o = function() {
          U || (U = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
    }
    function Et(e, r) {
      {
        var o = function() {
          Oe || (Oe = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: o,
          configurable: !0
        });
      }
    }
    var wt = function(e, r, o, d, b, E, g) {
      var h = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: o,
        props: g,
        // Record the component responsible for creating this element.
        _owner: E
      };
      return h._store = {}, Object.defineProperty(h._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(h, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.defineProperty(h, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.freeze && (Object.freeze(h.props), Object.freeze(h)), h;
    };
    function _t(e, r, o, d, b) {
      {
        var E, g = {}, h = null, k = null;
        o !== void 0 && (w(o), h = "" + o), gt(r) && (w(r.key), h = "" + r.key), ke(r) && (k = r.ref, bt(r, b));
        for (E in r)
          q.call(r, E) && !Y.hasOwnProperty(E) && (g[E] = r[E]);
        if (e && e.defaultProps) {
          var T = e.defaultProps;
          for (E in T)
            g[E] === void 0 && (g[E] = T[E]);
        }
        if (h || k) {
          var j = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          h && yt(g, j), k && Et(g, j);
        }
        return wt(e, h, k, b, d, S.current, g);
      }
    }
    var Ve = z.ReactCurrentOwner, Ze = z.ReactDebugCurrentFrame;
    function fe(e) {
      if (e) {
        var r = e._owner, o = ue(e.type, e._source, r ? r.type : null);
        Ze.setExtraStackFrame(o);
      } else
        Ze.setExtraStackFrame(null);
    }
    var We;
    We = !1;
    function Be(e) {
      return typeof e == "object" && e !== null && e.$$typeof === f;
    }
    function et() {
      {
        if (Ve.current) {
          var e = C(Ve.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function xt(e) {
      return "";
    }
    var tt = {};
    function St(e) {
      {
        var r = et();
        if (!r) {
          var o = typeof e == "string" ? e : e.displayName || e.name;
          o && (r = `

Check the top-level render call using <` + o + ">.");
        }
        return r;
      }
    }
    function rt(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var o = St(r);
        if (tt[o])
          return;
        tt[o] = !0;
        var d = "";
        e && e._owner && e._owner !== Ve.current && (d = " It was passed a child from " + C(e._owner.type) + "."), fe(e), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', o, d), fe(null);
      }
    }
    function nt(e, r) {
      {
        if (typeof e != "object")
          return;
        if (c(e))
          for (var o = 0; o < e.length; o++) {
            var d = e[o];
            Be(d) && rt(d, r);
          }
        else if (Be(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var b = G(e);
          if (typeof b == "function" && b !== e.entries)
            for (var E = b.call(e), g; !(g = E.next()).done; )
              Be(g.value) && rt(g.value, r);
        }
      }
    }
    function Tt(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var o;
        if (typeof r == "function")
          o = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === O))
          o = r.propTypes;
        else
          return;
        if (o) {
          var d = C(r);
          a(o, e.props, "prop", d, e);
        } else if (r.PropTypes !== void 0 && !We) {
          We = !0;
          var b = C(r);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", b || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rt(e) {
      {
        for (var r = Object.keys(e.props), o = 0; o < r.length; o++) {
          var d = r[o];
          if (d !== "children" && d !== "key") {
            fe(e), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), fe(null);
            break;
          }
        }
        e.ref !== null && (fe(e), R("Invalid attribute `ref` supplied to `React.Fragment`."), fe(null));
      }
    }
    var at = {};
    function st(e, r, o, d, b, E) {
      {
        var g = he(e);
        if (!g) {
          var h = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var k = xt();
          k ? h += k : h += et();
          var T;
          e === null ? T = "null" : c(e) ? T = "array" : e !== void 0 && e.$$typeof === f ? (T = "<" + (C(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : T = typeof e, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", T, h);
        }
        var j = _t(e, r, o, b, E);
        if (j == null)
          return j;
        if (g) {
          var V = r.children;
          if (V !== void 0)
            if (d)
              if (c(V)) {
                for (var de = 0; de < V.length; de++)
                  nt(V[de], e);
                Object.freeze && Object.freeze(V);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              nt(V, e);
        }
        if (q.call(r, "key")) {
          var ee = C(e), F = Object.keys(r).filter(function(Ot) {
            return Ot !== "key";
          }), Je = F.length > 0 ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!at[ee + Je]) {
            var Lt = F.length > 0 ? "{" + F.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Je, ee, Lt, ee), at[ee + Je] = !0;
          }
        }
        return e === m ? Rt(j) : Tt(j), j;
      }
    }
    function jt(e, r, o) {
      return st(e, r, o, !0);
    }
    function Dt(e, r, o) {
      return st(e, r, o, !1);
    }
    var Nt = Dt, Ct = jt;
    xe.Fragment = m, xe.jsx = Nt, xe.jsxs = Ct;
  }()), xe;
}
process.env.NODE_ENV === "production" ? Xe.exports = kt() : Xe.exports = Pt();
var u = Xe.exports;
const qe = {}, ht = "/api/imu/latest", At = "/api/imu/history", Fe = 12, Ft = 1e3, Qe = "dodec-labels", vt = ["dodeca-labels"], lt = "dodec-activity-log", Mt = "Side", $t = 24 * 60 * 60 * 1e3, ze = "DODEC_LABEL_UPDATE", ct = "DODEC_LABELS_REQUEST", ut = (() => {
  const l = qe == null ? void 0 : qe.VITE_DEVICE_LABELS_URL;
  if (l && l.length > 0)
    return l;
  try {
    const f = new URL(ht, "https://placeholder.local");
    return `${f.origin === "https://placeholder.local" ? "" : `${f.protocol}//${f.host}`}/api/labels`;
  } catch {
    return "/api/labels";
  }
})(), It = Array.from({ length: Fe }, (l, f) => f + 1), He = () => {
  const l = {};
  for (const f of It)
    l[f] = "";
  return l;
}, Yt = () => {
  if (typeof window > "u")
    return He();
  const l = (v) => {
    try {
      const m = window.localStorage.getItem(v);
      if (!m)
        return null;
      const _ = JSON.parse(m), L = He();
      for (const [x, D] of Object.entries(_)) {
        const y = Number(x);
        Number.isFinite(y) && y >= 1 && y <= Fe && (L[y] = String(D ?? ""));
      }
      return L;
    } catch (m) {
      return console.warn("Unable to read stored labels", m), null;
    }
  }, f = l(Qe);
  if (f)
    return f;
  for (const v of vt) {
    const m = l(v);
    if (m) {
      try {
        window.localStorage.setItem(Qe, JSON.stringify(m));
      } catch {
      }
      return m;
    }
  }
  return He();
}, ft = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), Ke = (l, f) => {
  var m;
  const v = (m = l[f]) == null ? void 0 : m.trim();
  return v && v.length > 0 ? v : `${Mt} ${f}`;
}, Ut = (l) => {
  const f = [l.received_at, l.imu_timestamp_iso];
  for (const v of f)
    if (v) {
      const m = Date.parse(v);
      if (!Number.isNaN(m))
        return m;
    }
  if (l.imu_timestamp_text) {
    const v = l.imu_timestamp_text.replace(" ", "T"), m = Date.parse(v);
    if (!Number.isNaN(m))
      return m;
  }
  return Date.now();
}, Vt = (l) => {
  if (!l)
    return null;
  const f = Date.parse(l);
  return Number.isNaN(f) ? null : f;
}, me = (l) => {
  const f = new Date(l), v = f.getFullYear(), m = String(f.getMonth() + 1).padStart(2, "0"), _ = String(f.getDate()).padStart(2, "0");
  return `${v}-${m}-${_}`;
}, Te = (l) => {
  const [f, v, m] = l.split("-").map(Number);
  return new Date(f, v - 1, m);
}, Ae = (l) => {
  const f = Te(l), v = new Date(f.getFullYear(), f.getMonth(), f.getDate()).getTime(), m = v + $t;
  return { start: v, end: m };
}, dt = (l) => {
  const f = Te(l);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(f);
}, Wt = (l) => l ? l.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", Se = (l) => {
  if (!Number.isFinite(l) || l <= 0)
    return "00:00";
  const f = Math.floor(l / 1e3), v = Math.floor(f / 3600), m = Math.floor(f % 3600 / 60), _ = f % 60;
  return v > 0 ? `${String(v).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(_).padStart(2, "0")}` : `${String(m).padStart(2, "0")}:${String(_).padStart(2, "0")}`;
}, Bt = (l) => Se(l), Jt = (l) => {
  const f = l.trim();
  if (!f)
    return NaN;
  const v = f.split(":");
  if (v.length > 1) {
    if (v.length > 3)
      return NaN;
    const _ = v.map((y) => Number(y));
    if (_.some((y) => Number.isNaN(y) || y < 0))
      return NaN;
    let L = 0, x = 0, D = 0;
    return _.length === 3 ? [L, x, D] = _ : [x, D] = _, Math.max(0, L * 3600 + x * 60 + D) * 1e3;
  }
  const m = Number(f);
  return Number.isNaN(m) || m < 0 ? NaN : m * 60 * 1e3;
}, mt = (l) => l.includes('"') || l.includes(",") || l.includes(`
`) ? `"${l.replace(/"/g, '""')}"` : l;
function qt() {
  const [l, f] = M(null), [v, m] = M(null), [_, L] = M(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(lt);
      return t ? JSON.parse(t) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), [x, D] = M(null), [y, I] = M(""), [N, O] = M(""), [W, A] = M(null), [Re, je] = M(() => [me(Date.now())]), [G, z] = M("week"), [R, Me] = M(me(Date.now())), [te, $e] = M(me(Date.now())), [De, pe] = M(null), [B, re] = M(() => Yt()), he = Pe(B), ne = Pe(!1), H = Pe({}), C = Pe(ft()), [J, X] = M(!1), ve = P((t, a, n) => {
    n <= a || L((c) => {
      const i = { ...c };
      let s = a;
      for (; s < n; ) {
        const p = me(s), { end: w } = Ae(p), S = Math.min(n, w), Y = Math.max(0, S - s);
        if (Y > 0) {
          const U = { ...i[p] ?? {} };
          U[t] = (U[t] ?? 0) + Y, i[p] = U;
        }
        s = S;
      }
      return i;
    });
  }, []), ge = P(() => {
    C.current = ft(), L(() => ({}));
  }, []), Q = P(
    (t) => {
      const a = typeof t.side == "number" ? t.side : null;
      if (!a)
        return;
      const n = Ke(he.current, a), c = Ut(t), i = t.segment_started_at ? Vt(t.segment_started_at) : null, s = C.current;
      if (s.currentLabel === null || s.startTime === null) {
        s.currentLabel = n, s.startTime = i ?? c, s.lastTimestamp = c, s.lastSide = a;
        return;
      }
      if (n === s.currentLabel) {
        i !== null && (s.startTime === null || i < s.startTime) && (s.startTime = i), s.lastTimestamp = c, s.lastSide = a;
        return;
      }
      const p = s.startTime, w = c;
      w > p && ve(s.currentLabel, p, w), s.currentLabel = n, s.startTime = i ?? c, s.lastTimestamp = c, s.lastSide = a;
    },
    [ve]
  );
  K(() => {
    if (he.current = B, typeof window < "u") {
      const a = JSON.stringify(B);
      window.localStorage.setItem(Qe, a);
      for (const n of vt)
        window.localStorage.setItem(n, a);
      !ne.current && window.parent && window.parent !== window && window.parent.postMessage({ type: ze, labels: B }, "*");
    }
    ne.current = !1;
    const t = C.current;
    t.lastSide !== null && (t.currentLabel = Ke(B, t.lastSide));
  }, [B]), K(() => {
    typeof window < "u" && window.localStorage.setItem(lt, JSON.stringify(_));
  }, [_]), K(() => () => {
    if (!(typeof window > "u"))
      for (const t of Object.keys(H.current)) {
        const a = H.current[Number(t)];
        typeof a == "number" && window.clearTimeout(a);
      }
  }, []), K(() => {
    let t = !1;
    return (async () => {
      try {
        const n = await fetch(ut, { cache: "no-store" });
        if (!n.ok)
          throw new Error(`Failed to load labels (status ${n.status})`);
        const c = await n.json();
        if (t || !c || typeof c.labels != "object" || c.labels === null)
          return;
        ne.current = !0, re((i) => {
          const s = { ...i };
          let p = !1;
          for (const [w, S] of Object.entries(c.labels)) {
            const Y = Number(w);
            if (!Number.isFinite(Y) || Y < 1 || Y > Fe)
              continue;
            const U = typeof S == "string" ? S : "";
            s[Y] !== U && (s[Y] = U, p = !0);
          }
          return p ? s : i;
        });
      } catch (n) {
        console.error("[timesheet-app] failed to load labels from server", n);
      }
    })(), () => {
      t = !0;
    };
  }, []), K(() => {
    if (typeof window > "u")
      return;
    const t = (a) => {
      const n = a == null ? void 0 : a.data;
      if (!(!n || typeof n != "object"))
        if (n.type === ze && n.labels && typeof n.labels == "object") {
          ne.current = !0;
          const c = n.labels;
          re((i) => {
            const s = { ...i };
            for (const [p, w] of Object.entries(c)) {
              const S = Number(p);
              !Number.isFinite(S) || S < 1 || S > Fe || (s[S] = typeof w == "string" ? w : "");
            }
            return { ...s };
          });
        } else n.type === ct && window.parent && window.parent !== window && window.parent.postMessage({ type: ze, labels: he.current }, a.origin || "*");
    };
    return window.addEventListener("message", t), window.parent && window.parent !== window && window.parent.postMessage({ type: ct }, "*"), () => {
      window.removeEventListener("message", t);
    };
  }, []), K(() => {
    let t = !1;
    return (async () => {
      try {
        const n = await fetch(`${At}?limit=5000`, { cache: "no-store" });
        if (!n.ok)
          throw new Error(`History request failed with status ${n.status}`);
        const c = await n.json();
        if (t)
          return;
        ge();
        let i = null;
        for (const s of c) {
          if (t)
            break;
          Q(s), i = s;
        }
        i && f({
          side: typeof i.side == "number" ? i.side : null,
          imu_timestamp_text: i.imu_timestamp_text ?? null,
          imu_timestamp_iso: i.imu_timestamp_iso ?? null,
          received_at: i.received_at ?? null,
          confidence: i.confidence ?? null
        }), m(null);
      } catch (n) {
        t || m(n instanceof Error ? n.message : "Unknown error while loading history");
      } finally {
        t || X(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [Q, ge]), K(() => {
    if (!J)
      return;
    let t = !0;
    const a = async () => {
      try {
        const c = await fetch(ht, { cache: "no-store" });
        if (!c.ok)
          throw new Error(`Request failed with status ${c.status}`);
        const i = await c.json();
        if (!t)
          return;
        Q(i), f({
          side: typeof i.side == "number" ? i.side : null,
          imu_timestamp_text: i.imu_timestamp_text ?? null,
          imu_timestamp_iso: i.imu_timestamp_iso ?? null,
          received_at: i.received_at ?? null,
          confidence: i.confidence ?? null
        }), m(null);
      } catch (c) {
        t && m(c instanceof Error ? c.message : "Unknown error");
      }
    };
    a();
    const n = window.setInterval(a, Ft);
    return () => {
      t = !1, window.clearInterval(n);
    };
  }, [Q, J]);
  const be = C.current, $ = be.lastTimestamp ? me(be.lastTimestamp) : me(Date.now());
  K(() => {
    je((t) => t.includes($) ? t : [...t, $]);
  }, [$]), P(
    (t) => (a) => {
      const n = a.target.value;
      re((c) => ({ ...c, [t]: n })), ye(t, n);
    },
    [ye]
  );
  const Z = (t, a) => {
    const n = C.current;
    if (!n.currentLabel || n.currentLabel !== a || n.startTime === null || n.lastTimestamp === null)
      return 0;
    const { start: c, end: i } = Ae(t), s = Math.max(c, n.startTime), p = Math.min(i, n.lastTimestamp);
    return p > s ? p - s : 0;
  }, ae = P(async (t, a) => {
    try {
      const n = await fetch(`${ut.replace(/\/$/, "")}/${t}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: a })
      });
      if (!n.ok)
        throw new Error(`Failed to persist label (status ${n.status})`);
    } catch (n) {
      console.error(`[timesheet-app] failed to persist label for side ${t}`, n);
    }
  }, []), ye = P((t, a) => {
    const n = a.trim();
    if (typeof window > "u") {
      ae(t, n);
      return;
    }
    const c = H.current[t];
    typeof c == "number" && window.clearTimeout(c), H.current[t] = window.setTimeout(() => {
      H.current[t] = null, ae(t, n);
    }, 400);
  }, [ae]), se = P(
    (t) => {
      const a = _[t] ?? {}, n = Object.entries(a).map(([i, s]) => ({ label: i, totalMs: s })), c = C.current;
      if (c.currentLabel && c.startTime !== null && c.lastTimestamp !== null) {
        const i = Z(t, c.currentLabel);
        if (i > 0) {
          const s = n.find((p) => p.label === c.currentLabel);
          s ? s.totalMs += i : n.push({ label: c.currentLabel, totalMs: i });
        }
      }
      return n.sort((i, s) => s.totalMs - i.totalMs);
    },
    [_, l]
  ), oe = Ge(() => {
    const t = new Set(Object.keys(_));
    return t.add($), Array.from(t).sort((a, n) => a === n ? 0 : a > n ? -1 : 1);
  }, [_, $]), ie = Ge(() => oe.map((t) => {
    const a = se(t);
    if (a.length === 0)
      return null;
    const n = a.reduce((c, i) => c + i.totalMs, 0);
    return { dateKey: t, rows: a, totalMs: n };
  }).filter(Boolean), [oe, se]), Ee = P((t, a, n) => {
    if (C.current.currentLabel === a && t === $) {
      A("Stop the current activity before editing it.");
      return;
    }
    D({ dateKey: t, originalLabel: a }), I(Bt(n)), O(a), A(null);
  }, [$]), le = P((t) => {
    I(t.target.value);
  }, []), we = P((t) => {
    O(t.target.value);
  }, []), ce = P(() => {
    D(null), I(""), O(""), A(null);
  }, []), Ie = P(() => {
    if (!x)
      return;
    const { dateKey: t, originalLabel: a } = x, n = Jt(y);
    if (!Number.isFinite(n)) {
      A("Please enter duration as mm:ss, hh:mm:ss, or minutes.");
      return;
    }
    const c = N.trim();
    if (c.length === 0) {
      A("Activity name cannot be empty.");
      return;
    }
    const i = Z(t, a);
    if (n < i) {
      A(`Duration cannot be less than the active segment (${Se(i)}).`);
      return;
    }
    const s = Math.max(0, n - i);
    L((p) => {
      const w = { ...p }, S = { ...w[t] ?? {} };
      return a in S && delete S[a], s > 0 && (S[c] = (S[c] ?? 0) + s), Object.keys(S).length === 0 ? delete w[t] : w[t] = S, w;
    }), D(null), I(""), O(""), A(null);
  }, [x, y, N, Z]), Ne = P(
    (t, a) => {
      if (Z(t, a) > 0) {
        A("Stop the current activity before deleting it.");
        return;
      }
      L((c) => {
        const i = c[t];
        if (!i || !(a in i))
          return c;
        const s = { ...c }, p = { ...i };
        return delete p[a], Object.keys(p).length === 0 ? delete s[t] : s[t] = p, s;
      }), x && x.dateKey === t && x.originalLabel === a && (D(null), I(""), O("")), A(null);
    },
    [x]
  ), Ye = P((t) => {
    je((a) => a.includes(t) ? a.filter((n) => n !== t) : [...a, t]);
  }, []), Ue = () => {
    if (G === "week") {
      const { start: i, end: s } = Ae($), p = new Date(i);
      return p.setDate(p.getDate() - 6), { start: new Date(p.getFullYear(), p.getMonth(), p.getDate()).getTime(), end: s };
    }
    if (G === "month") {
      const i = Te($), s = new Date(i.getFullYear(), i.getMonth(), 1).getTime(), p = new Date(i.getFullYear(), i.getMonth() + 1, 1).getTime();
      return { start: s, end: p };
    }
    const t = Te(R), a = Te(te);
    if (Number.isNaN(t.getTime()) || Number.isNaN(a.getTime()) || t > a)
      return null;
    const n = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), c = new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1).getTime();
    return { start: n, end: c };
  }, ue = P(() => {
    const t = Ue();
    if (!t) {
      pe("Please provide a valid date range before downloading.");
      return;
    }
    const a = [];
    for (const w of oe) {
      const { start: S, end: Y } = Ae(w);
      if (Y <= t.start || S >= t.end)
        continue;
      const U = se(w);
      if (U.length === 0)
        continue;
      const Oe = dt(w);
      for (const ke of U)
        a.push(`${mt(Oe)},${mt(ke.label)},${Se(ke.totalMs)}`);
    }
    if (a.length === 0) {
      pe("No activity recorded in the selected range.");
      return;
    }
    const n = ["Date,Activity,Duration", ...a].join(`
`), c = new Blob([n], { type: "text/csv;charset=utf-8;" }), i = URL.createObjectURL(c), s = document.createElement("a");
    s.href = i;
    const p = G === "custom" ? "custom" : G;
    s.download = `activity-log-${p}.csv`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(i), pe(null);
  }, [se, G, oe, R, te]), q = (l == null ? void 0 : l.side) ?? null, Ce = Ge(() => q === null ? null : Ke(B, q), [q, B]), Le = (l == null ? void 0 : l.imu_timestamp_text) ?? (l == null ? void 0 : l.imu_timestamp_iso) ?? (l == null ? void 0 : l.received_at) ?? null;
  return /* @__PURE__ */ u.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ u.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Wt(Le) })
      ] }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Ce ?? "Waiting for data?" })
      ] }),
      v ? /* @__PURE__ */ u.jsxs("p", { className: "error-text", children: [
        "Error: ",
        v
      ] }) : null
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "activity-summary", "aria-live": "polite", children: [
      /* @__PURE__ */ u.jsx("h2", { children: "Activity Log" }),
      /* @__PURE__ */ u.jsxs("div", { className: "range-controls", children: [
        /* @__PURE__ */ u.jsxs("label", { className: "range-option", children: [
          "Range",
          /* @__PURE__ */ u.jsxs(
            "select",
            {
              className: "range-select",
              value: G,
              onChange: (t) => z(t.target.value),
              children: [
                /* @__PURE__ */ u.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ u.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ u.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        G === "custom" ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsxs("label", { className: "range-option", children: [
            "From",
            /* @__PURE__ */ u.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: R,
                max: te,
                onChange: (t) => Me(t.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ u.jsxs("label", { className: "range-option", children: [
            "To",
            /* @__PURE__ */ u.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: te,
                min: R,
                onChange: (t) => $e(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "download-button", onClick: ue, children: "Download CSV" })
      ] }),
      De ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: De }) : null,
      ie.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : ie.map(({ dateKey: t, rows: a, totalMs: n }) => {
        const c = Re.includes(t), i = C.current;
        return /* @__PURE__ */ u.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ u.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${c ? " date-header--expanded" : ""}`,
              onClick: () => Ye(t),
              children: [
                /* @__PURE__ */ u.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ u.jsx("span", { className: "date-label", children: dt(t) }),
                  /* @__PURE__ */ u.jsxs("span", { className: "date-summary", children: [
                    a.length,
                    " activit",
                    a.length === 1 ? "y" : "ies",
                    " - ",
                    Se(n)
                  ] })
                ] }),
                /* @__PURE__ */ u.jsx("span", { className: "date-header__icon", children: c ? "−" : "+" })
              ]
            }
          ),
          c ? /* @__PURE__ */ u.jsxs("table", { className: "activity-table", children: [
            /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
              /* @__PURE__ */ u.jsx("th", { scope: "col", children: "Activity" }),
              /* @__PURE__ */ u.jsx("th", { scope: "col", children: "Total Duration" }),
              /* @__PURE__ */ u.jsx("th", { scope: "col", className: "actions-heading", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ u.jsx("tbody", { children: a.map((s) => {
              const p = (x == null ? void 0 : x.dateKey) === t && x.originalLabel === s.label, w = i.currentLabel === s.label && t === $;
              return /* @__PURE__ */ u.jsxs("tr", { children: [
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: N,
                    onChange: we,
                    placeholder: "Activity name"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: s.label }) }),
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: y,
                    onChange: le,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: Se(s.totalMs) }) }),
                /* @__PURE__ */ u.jsx("td", { className: "actions-cell", children: /* @__PURE__ */ u.jsx("div", { className: "action-buttons", children: p ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--primary",
                      onClick: Ie,
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button", onClick: ce, children: "Cancel" })
                ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: w,
                      onClick: () => Ee(t, s.label, s.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: w,
                      onClick: () => Ne(t, s.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${s.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      W ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: W }) : null
    ] })
  ] });
}
export {
  qt as TimesheetDevice
};
