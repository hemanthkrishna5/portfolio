import Tt, { useState as k, useRef as Ee, useCallback as A, useEffect as V, useMemo as at } from "react";
var ut = { exports: {} }, Pe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vt;
function Pt() {
  if (vt) return Pe;
  vt = 1;
  var l = Tt, d = Symbol.for("react.element"), h = Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, w = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, D = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(x, y, P) {
    var N, M = {}, K = null, Y = null;
    P !== void 0 && (K = "" + P), y.key !== void 0 && (K = "" + y.key), y.ref !== void 0 && (Y = y.ref);
    for (N in y) f.call(y, N) && !D.hasOwnProperty(N) && (M[N] = y[N]);
    if (x && x.defaultProps) for (N in y = x.defaultProps, y) M[N] === void 0 && (M[N] = y[N]);
    return { $$typeof: d, type: x, key: K, ref: Y, props: M, _owner: w.current };
  }
  return Pe.Fragment = h, Pe.jsx = b, Pe.jsxs = b, Pe;
}
var Me = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gt;
function Mt() {
  return gt || (gt = 1, process.env.NODE_ENV !== "production" && function() {
    var l = Tt, d = Symbol.for("react.element"), h = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), x = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), M = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), Te = Symbol.iterator, $e = "@@iterator";
    function X(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = Te && e[Te] || e[$e];
      return typeof n == "function" ? n : null;
    }
    var ae = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(e) {
      {
        for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), m = 1; m < n; m++)
          i[m - 1] = arguments[m];
        qe("error", e, i);
      }
    }
    function qe(e, n, i) {
      {
        var m = ae.ReactDebugCurrentFrame, E = m.getStackAddendum();
        E !== "" && (n += "%s", i = i.concat([E]));
        var S = i.map(function(g) {
          return String(g);
        });
        S.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, S);
      }
    }
    var ce = !1, Ke = !1, Ye = !1, xe = !1, ue = !1, Re;
    Re = Symbol.for("react.module.reference");
    function je(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === f || e === D || ue || e === w || e === P || e === N || xe || e === Y || ce || Ke || Ye || typeof e == "object" && e !== null && (e.$$typeof === K || e.$$typeof === M || e.$$typeof === b || e.$$typeof === x || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Re || e.getModuleId !== void 0));
    }
    function oe(e, n, i) {
      var m = e.displayName;
      if (m)
        return m;
      var E = n.displayName || n.name || "";
      return E !== "" ? i + "(" + E + ")" : i;
    }
    function B(e) {
      return e.displayName || "Context";
    }
    function W(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case f:
          return "Fragment";
        case h:
          return "Portal";
        case D:
          return "Profiler";
        case w:
          return "StrictMode";
        case P:
          return "Suspense";
        case N:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case x:
            var n = e;
            return B(n) + ".Consumer";
          case b:
            var i = e;
            return B(i._context) + ".Provider";
          case y:
            return oe(e, e.render, "ForwardRef");
          case M:
            var m = e.displayName || null;
            return m !== null ? m : W(e.type) || "Memo";
          case K: {
            var E = e, S = E._payload, g = E._init;
            try {
              return W(g(S));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var G = Object.assign, Q = 0, se, Z, H, Ne, Ue, z, Le;
    function ie() {
    }
    ie.__reactDisabledLog = !0;
    function De() {
      {
        if (Q === 0) {
          se = console.log, Z = console.info, H = console.warn, Ne = console.error, Ue = console.group, z = console.groupCollapsed, Le = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ie,
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
        Q++;
      }
    }
    function Ce() {
      {
        if (Q--, Q === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: G({}, e, {
              value: se
            }),
            info: G({}, e, {
              value: Z
            }),
            warn: G({}, e, {
              value: H
            }),
            error: G({}, e, {
              value: Ne
            }),
            group: G({}, e, {
              value: Ue
            }),
            groupCollapsed: G({}, e, {
              value: z
            }),
            groupEnd: G({}, e, {
              value: Le
            })
          });
        }
        Q < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var de = ae.ReactCurrentDispatcher, fe;
    function te(e, n, i) {
      {
        if (fe === void 0)
          try {
            throw Error();
          } catch (E) {
            var m = E.stack.trim().match(/\n( *(at )?)/);
            fe = m && m[1] || "";
          }
        return `
` + fe + e;
      }
    }
    var me = !1, I;
    {
      var Oe = typeof WeakMap == "function" ? WeakMap : Map;
      I = new Oe();
    }
    function ke(e, n) {
      if (!e || me)
        return "";
      {
        var i = I.get(e);
        if (i !== void 0)
          return i;
      }
      var m;
      me = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var S;
      S = de.current, de.current = null, De();
      try {
        if (n) {
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
            } catch (U) {
              m = U;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (U) {
              m = U;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (U) {
            m = U;
          }
          e();
        }
      } catch (U) {
        if (U && m && typeof U.stack == "string") {
          for (var v = U.stack.split(`
`), $ = m.stack.split(`
`), L = v.length - 1, O = $.length - 1; L >= 1 && O >= 0 && v[L] !== $[O]; )
            O--;
          for (; L >= 1 && O >= 0; L--, O--)
            if (v[L] !== $[O]) {
              if (L !== 1 || O !== 1)
                do
                  if (L--, O--, O < 0 || v[L] !== $[O]) {
                    var J = `
` + v[L].replace(" at new ", " at ");
                    return e.displayName && J.includes("<anonymous>") && (J = J.replace("<anonymous>", e.displayName)), typeof e == "function" && I.set(e, J), J;
                  }
                while (L >= 1 && O >= 0);
              break;
            }
        }
      } finally {
        me = !1, de.current = S, Ce(), Error.prepareStackTrace = E;
      }
      var we = e ? e.displayName || e.name : "", le = we ? te(we) : "";
      return typeof e == "function" && I.set(e, le), le;
    }
    function pe(e, n, i) {
      return ke(e, !1);
    }
    function he(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function ne(e, n, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ke(e, he(e));
      if (typeof e == "string")
        return te(e);
      switch (e) {
        case P:
          return te("Suspense");
        case N:
          return te("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return pe(e.render);
          case M:
            return ne(e.type, n, i);
          case K: {
            var m = e, E = m._payload, S = m._init;
            try {
              return ne(S(E), n, i);
            } catch {
            }
          }
        }
      return "";
    }
    var re = Object.prototype.hasOwnProperty, Ve = {}, Be = ae.ReactDebugCurrentFrame;
    function ve(e) {
      if (e) {
        var n = e._owner, i = ne(e.type, e._source, n ? n.type : null);
        Be.setExtraStackFrame(i);
      } else
        Be.setExtraStackFrame(null);
    }
    function Xe(e, n, i, m, E) {
      {
        var S = Function.call.bind(re);
        for (var g in e)
          if (S(e, g)) {
            var v = void 0;
            try {
              if (typeof e[g] != "function") {
                var $ = Error((m || "React class") + ": " + i + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $.name = "Invariant Violation", $;
              }
              v = e[g](n, g, m, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (L) {
              v = L;
            }
            v && !(v instanceof Error) && (ve(E), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", i, g, typeof v), ve(null)), v instanceof Error && !(v.message in Ve) && (Ve[v.message] = !0, ve(E), C("Failed %s type: %s", i, v.message), ve(null));
          }
      }
    }
    var Qe = Array.isArray;
    function Ae(e) {
      return Qe(e);
    }
    function Ze(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, i = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function et(e) {
      try {
        return We(e), !1;
      } catch {
        return !0;
      }
    }
    function We(e) {
      return "" + e;
    }
    function ge(e) {
      if (et(e))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ze(e)), We(e);
    }
    var Je = ae.ReactCurrentOwner, tt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, q, Ge;
    function be(e) {
      if (re.call(e, "ref")) {
        var n = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function t(e) {
      if (re.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function r(e, n) {
      typeof e.ref == "string" && Je.current;
    }
    function a(e, n) {
      {
        var i = function() {
          q || (q = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: i,
          configurable: !0
        });
      }
    }
    function o(e, n) {
      {
        var i = function() {
          Ge || (Ge = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: i,
          configurable: !0
        });
      }
    }
    var c = function(e, n, i, m, E, S, g) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: n,
        ref: i,
        props: g,
        // Record the component responsible for creating this element.
        _owner: S
      };
      return v._store = {}, Object.defineProperty(v._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(v, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(v, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: E
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    };
    function s(e, n, i, m, E) {
      {
        var S, g = {}, v = null, $ = null;
        i !== void 0 && (ge(i), v = "" + i), t(n) && (ge(n.key), v = "" + n.key), be(n) && ($ = n.ref, r(n, E));
        for (S in n)
          re.call(n, S) && !tt.hasOwnProperty(S) && (g[S] = n[S]);
        if (e && e.defaultProps) {
          var L = e.defaultProps;
          for (S in L)
            g[S] === void 0 && (g[S] = L[S]);
        }
        if (v || $) {
          var O = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && a(g, O), $ && o(g, O);
        }
        return c(e, v, $, E, m, Je.current, g);
      }
    }
    var p = ae.ReactCurrentOwner, _ = ae.ReactDebugCurrentFrame;
    function T(e) {
      if (e) {
        var n = e._owner, i = ne(e.type, e._source, n ? n.type : null);
        _.setExtraStackFrame(i);
      } else
        _.setExtraStackFrame(null);
    }
    var R;
    R = !1;
    function j(e) {
      return typeof e == "object" && e !== null && e.$$typeof === d;
    }
    function ee() {
      {
        if (p.current) {
          var e = W(p.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function F(e) {
      return "";
    }
    var ye = {};
    function nt(e) {
      {
        var n = ee();
        if (!n) {
          var i = typeof e == "string" ? e : e.displayName || e.name;
          i && (n = `

Check the top-level render call using <` + i + ">.");
        }
        return n;
      }
    }
    function ft(e, n) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var i = nt(n);
        if (ye[i])
          return;
        ye[i] = !0;
        var m = "";
        e && e._owner && e._owner !== p.current && (m = " It was passed a child from " + W(e._owner.type) + "."), T(e), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, m), T(null);
      }
    }
    function mt(e, n) {
      {
        if (typeof e != "object")
          return;
        if (Ae(e))
          for (var i = 0; i < e.length; i++) {
            var m = e[i];
            j(m) && ft(m, n);
          }
        else if (j(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var E = X(e);
          if (typeof E == "function" && E !== e.entries)
            for (var S = E.call(e), g; !(g = S.next()).done; )
              j(g.value) && ft(g.value, n);
        }
      }
    }
    function jt(e) {
      {
        var n = e.type;
        if (n == null || typeof n == "string")
          return;
        var i;
        if (typeof n == "function")
          i = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === M))
          i = n.propTypes;
        else
          return;
        if (i) {
          var m = W(n);
          Xe(i, e.props, "prop", m, e);
        } else if (n.PropTypes !== void 0 && !R) {
          R = !0;
          var E = W(n);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Nt(e) {
      {
        for (var n = Object.keys(e.props), i = 0; i < n.length; i++) {
          var m = n[i];
          if (m !== "children" && m !== "key") {
            T(e), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), T(null);
            break;
          }
        }
        e.ref !== null && (T(e), C("Invalid attribute `ref` supplied to `React.Fragment`."), T(null));
      }
    }
    var pt = {};
    function ht(e, n, i, m, E, S) {
      {
        var g = je(e);
        if (!g) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $ = F();
          $ ? v += $ : v += ee();
          var L;
          e === null ? L = "null" : Ae(e) ? L = "array" : e !== void 0 && e.$$typeof === d ? (L = "<" + (W(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : L = typeof e, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", L, v);
        }
        var O = s(e, n, i, E, S);
        if (O == null)
          return O;
        if (g) {
          var J = n.children;
          if (J !== void 0)
            if (m)
              if (Ae(J)) {
                for (var we = 0; we < J.length; we++)
                  mt(J[we], e);
                Object.freeze && Object.freeze(J);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              mt(J, e);
        }
        if (re.call(n, "key")) {
          var le = W(e), U = Object.keys(n).filter(function(At) {
            return At !== "key";
          }), rt = U.length > 0 ? "{key: someKey, " + U.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!pt[le + rt]) {
            var kt = U.length > 0 ? "{" + U.join(": ..., ") + ": ...}" : "{}";
            C(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, rt, le, kt, le), pt[le + rt] = !0;
          }
        }
        return e === f ? Nt(O) : jt(O), O;
      }
    }
    function Lt(e, n, i) {
      return ht(e, n, i, !0);
    }
    function Dt(e, n, i) {
      return ht(e, n, i, !1);
    }
    var Ct = Dt, Ot = Lt;
    Me.Fragment = f, Me.jsx = Ct, Me.jsxs = Ot;
  }()), Me;
}
process.env.NODE_ENV === "production" ? ut.exports = Pt() : ut.exports = Mt();
var u = ut.exports;
const Se = {}, xt = "/api/imu/latest", It = "/api/imu/history", ze = 12, Ft = 1e3, dt = "dodec-labels", Rt = ["dodeca-labels"], bt = "dodec-activity-log", $t = "Side", Yt = 24 * 60 * 60 * 1e3, st = "DODEC_LABEL_UPDATE", yt = "DODEC_LABELS_REQUEST", wt = (() => {
  const l = Se == null ? void 0 : Se.VITE_DEVICE_LABELS_URL;
  if (l && l.length > 0)
    return l;
  try {
    const d = new URL(xt, "https://placeholder.local");
    return `${d.origin === "https://placeholder.local" ? "" : `${d.protocol}//${d.host}`}/api/labels`;
  } catch {
    return "/api/labels";
  }
})(), ot = (Se == null ? void 0 : Se.VITE_DEVICE_ACTIVITY_LOG_URL) ?? "/api/activity-log", Ut = 5 * 60 * 1e3, Et = (l) => {
  const d = {};
  if (!l || typeof l != "object")
    return d;
  for (const [h, f] of Object.entries(l)) {
    if (typeof h != "string" || h.length === 0 || !f || typeof f != "object")
      continue;
    const w = {};
    for (const [D, b] of Object.entries(f)) {
      if (typeof D != "string" || D.length === 0)
        continue;
      let x = 0, y = null;
      if (typeof b == "number")
        x = Number.isFinite(b) && b > 0 ? Math.floor(b) : 0;
      else if (b && typeof b == "object") {
        const P = b.totalMs, N = b.side;
        typeof P == "number" && Number.isFinite(P) && P > 0 && (x = Math.floor(P)), typeof N == "number" && Number.isFinite(N) && (y = Math.floor(N));
      }
      (x > 0 || y !== null) && (w[D] = { totalMs: x, side: y });
    }
    Object.keys(w).length > 0 && (d[h] = w);
  }
  return d;
}, Vt = Array.from({ length: ze }, (l, d) => d + 1), it = () => {
  const l = {};
  for (const d of Vt)
    l[d] = "";
  return l;
}, Bt = () => {
  if (typeof window > "u")
    return it();
  const l = (h) => {
    try {
      const f = window.localStorage.getItem(h);
      if (!f)
        return null;
      const w = JSON.parse(f), D = it();
      for (const [b, x] of Object.entries(w)) {
        const y = Number(b);
        Number.isFinite(y) && y >= 1 && y <= ze && (D[y] = String(x ?? ""));
      }
      return D;
    } catch (f) {
      return console.warn("Unable to read stored labels", f), null;
    }
  }, d = l(dt);
  if (d)
    return d;
  for (const h of Rt) {
    const f = l(h);
    if (f) {
      try {
        window.localStorage.setItem(dt, JSON.stringify(f));
      } catch {
      }
      return f;
    }
  }
  return it();
}, _t = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), lt = (l, d) => {
  var f;
  const h = (f = l[d]) == null ? void 0 : f.trim();
  return h && h.length > 0 ? h : `${$t} ${d}`;
}, Wt = (l) => {
  const d = [l.received_at, l.imu_timestamp_iso];
  for (const h of d)
    if (h) {
      const f = Date.parse(h);
      if (!Number.isNaN(f))
        return f;
    }
  if (l.imu_timestamp_text) {
    const h = l.imu_timestamp_text.replace(" ", "T"), f = Date.parse(h);
    if (!Number.isNaN(f))
      return f;
  }
  return Date.now();
}, Jt = (l) => {
  if (!l)
    return null;
  const d = Date.parse(l);
  return Number.isNaN(d) ? null : d;
}, _e = (l) => {
  const d = new Date(l), h = d.getFullYear(), f = String(d.getMonth() + 1).padStart(2, "0"), w = String(d.getDate()).padStart(2, "0");
  return `${h}-${f}-${w}`;
}, Fe = (l) => {
  const [d, h, f] = l.split("-").map(Number);
  return new Date(d, h - 1, f);
}, He = (l) => {
  const d = Fe(l), h = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), f = h + Yt;
  return { start: h, end: f };
}, St = (l) => {
  const d = Fe(l);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(d);
}, Gt = (l) => l ? l.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", Ie = (l) => {
  if (!Number.isFinite(l) || l <= 0)
    return "00:00";
  const d = Math.floor(l / 1e3), h = Math.floor(d / 3600), f = Math.floor(d % 3600 / 60), w = d % 60;
  return h > 0 ? `${String(h).padStart(2, "0")}:${String(f).padStart(2, "0")}:${String(w).padStart(2, "0")}` : `${String(f).padStart(2, "0")}:${String(w).padStart(2, "0")}`;
}, Ht = (l) => Ie(l), zt = (l) => {
  const d = l.trim();
  if (!d)
    return NaN;
  const h = d.split(":");
  if (h.length > 1) {
    if (h.length > 3)
      return NaN;
    const w = h.map((y) => Number(y));
    if (w.some((y) => Number.isNaN(y) || y < 0))
      return NaN;
    let D = 0, b = 0, x = 0;
    return w.length === 3 ? [D, b, x] = w : [b, x] = w, Math.max(0, D * 3600 + b * 60 + x) * 1e3;
  }
  const f = Number(d);
  return Number.isNaN(f) || f < 0 ? NaN : f * 60 * 1e3;
}, ct = (l) => l.includes('"') || l.includes(",") || l.includes(`
`) ? `"${l.replace(/"/g, '""')}"` : l;
function Kt() {
  const [l, d] = k(null), [h, f] = k(null), [w, D] = k(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(bt);
      return t ? Et(JSON.parse(t)) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), [b, x] = k(null), [y, P] = k(""), [N, M] = k(""), [K, Y] = k(null), [Te, $e] = k(() => [_e(Date.now())]), [X, ae] = k("week"), [C, qe] = k(_e(Date.now())), [ce, Ke] = k(_e(Date.now())), [Ye, xe] = k(null), [ue, Re] = k(!1), [je, oe] = k(null), [B, W] = k(() => Bt()), G = Ee(B), Q = Ee(!1), se = Ee({}), Z = Ee(null), H = Ee(_t()), [Ne, Ue] = k(!1), [z, Le] = k(!1), [ie, De] = k(!1), Ce = Ee(!1), de = A((t, r, a, o) => {
    o <= a || D((c) => {
      const s = { ...c };
      let p = a;
      for (; p < o; ) {
        const _ = _e(p), { end: T } = He(_), R = Math.min(o, T), j = Math.max(0, R - p);
        if (j > 0) {
          const ee = { ...s[_] ?? {} }, F = ee[t], ye = ((F == null ? void 0 : F.totalMs) ?? 0) + j, nt = r ?? (F == null ? void 0 : F.side) ?? null;
          ee[t] = { totalMs: ye, side: nt }, s[_] = ee;
        }
        p = R;
      }
      return s;
    });
  }, []), fe = A(() => {
    H.current = _t(), D(() => ({}));
  }, []), te = A(
    (t) => {
      const r = typeof t.side == "number" ? t.side : null;
      if (!r)
        return;
      const a = lt(G.current, r), o = Wt(t), c = t.segment_started_at ? Jt(t.segment_started_at) : null, s = H.current;
      if (s.currentLabel === null || s.startTime === null) {
        s.currentLabel = a, s.startTime = c ?? o, s.lastTimestamp = o, s.lastSide = r;
        return;
      }
      if (a === s.currentLabel) {
        c !== null && (s.startTime === null || c < s.startTime) && (s.startTime = c), s.lastTimestamp = o, s.lastSide = r;
        return;
      }
      const p = s.startTime, _ = o;
      _ > p && de(s.currentLabel, s.lastSide, p, _), s.currentLabel = a, s.startTime = c ?? o, s.lastTimestamp = o, s.lastSide = r;
    },
    [de]
  );
  V(() => {
    if (G.current = B, typeof window < "u") {
      const r = JSON.stringify(B);
      window.localStorage.setItem(dt, r);
      for (const a of Rt)
        window.localStorage.setItem(a, r);
      !Q.current && window.parent && window.parent !== window && window.parent.postMessage({ type: st, labels: B }, "*");
    }
    Q.current = !1;
    const t = H.current;
    t.lastSide !== null && (t.currentLabel = lt(B, t.lastSide));
  }, [B]), V(() => {
    typeof window < "u" && window.localStorage.setItem(bt, JSON.stringify(w));
  }, [w]), V(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(ot, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`Activity log request failed with status ${a.status}`);
        const o = await a.json();
        if (t)
          return;
        o && typeof o == "object" && o.entries && (Ce.current = !0, D(Et(o.entries))), Le(!0), De(!1);
      } catch (a) {
        t || (console.warn("[activity-log] failed to load activity log from server", a), Le(!0));
      }
    })(), () => {
      t = !0;
    };
  }, []), V(() => () => {
    if (!(typeof window > "u")) {
      for (const t of Object.keys(se.current)) {
        const r = se.current[Number(t)];
        typeof r == "number" && window.clearTimeout(r);
      }
      Z.current !== null && window.clearTimeout(Z.current);
    }
  }, []), V(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(wt, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`Failed to load labels (status ${a.status})`);
        const o = await a.json();
        if (t || !o || typeof o.labels != "object" || o.labels === null)
          return;
        Q.current = !0, W((c) => {
          const s = { ...c };
          let p = !1;
          for (const [_, T] of Object.entries(o.labels)) {
            const R = Number(_);
            if (!Number.isFinite(R) || R < 1 || R > ze)
              continue;
            const j = typeof T == "string" ? T : "";
            s[R] !== j && (s[R] = j, p = !0);
          }
          return p ? s : c;
        });
      } catch (a) {
        console.error("[timesheet-app] failed to load labels from server", a);
      }
    })(), () => {
      t = !0;
    };
  }, []), V(() => {
    if (typeof window > "u")
      return;
    const t = (r) => {
      const a = r == null ? void 0 : r.data;
      if (!(!a || typeof a != "object"))
        if (a.type === st && a.labels && typeof a.labels == "object") {
          Q.current = !0;
          const o = a.labels;
          W((c) => {
            const s = { ...c };
            for (const [p, _] of Object.entries(o)) {
              const T = Number(p);
              !Number.isFinite(T) || T < 1 || T > ze || (s[T] = typeof _ == "string" ? _ : "");
            }
            return { ...s };
          });
        } else a.type === yt && window.parent && window.parent !== window && window.parent.postMessage({ type: st, labels: G.current }, r.origin || "*");
    };
    return window.addEventListener("message", t), window.parent && window.parent !== window && window.parent.postMessage({ type: yt }, "*"), () => {
      window.removeEventListener("message", t);
    };
  }, []), V(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(`${It}?limit=5000`, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`History request failed with status ${a.status}`);
        const o = await a.json();
        if (t)
          return;
        fe();
        let c = null;
        for (const s of o) {
          if (t)
            break;
          te(s), c = s;
        }
        c && d({
          side: typeof c.side == "number" ? c.side : null,
          imu_timestamp_text: c.imu_timestamp_text ?? null,
          imu_timestamp_iso: c.imu_timestamp_iso ?? null,
          received_at: c.received_at ?? null,
          confidence: c.confidence ?? null
        }), f(null);
      } catch (a) {
        t || f(a instanceof Error ? a.message : "Unknown error while loading history");
      } finally {
        t || Ue(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [te, fe]), V(() => {
    if (!Ne)
      return;
    let t = !0;
    const r = async () => {
      try {
        const o = await fetch(xt, { cache: "no-store" });
        if (!o.ok)
          throw new Error(`Request failed with status ${o.status}`);
        const c = await o.json();
        if (!t)
          return;
        te(c), d({
          side: typeof c.side == "number" ? c.side : null,
          imu_timestamp_text: c.imu_timestamp_text ?? null,
          imu_timestamp_iso: c.imu_timestamp_iso ?? null,
          received_at: c.received_at ?? null,
          confidence: c.confidence ?? null
        }), f(null);
      } catch (o) {
        t && f(o instanceof Error ? o.message : "Unknown error");
      }
    };
    r();
    const a = window.setInterval(r, Ft);
    return () => {
      t = !1, window.clearInterval(a);
    };
  }, [te, Ne]);
  const me = H.current, I = me.lastTimestamp ? _e(me.lastTimestamp) : _e(Date.now());
  V(() => {
    $e((t) => t.includes(I) ? t : [...t, I]);
  }, [I]);
  const Oe = A(async (t, r) => {
    try {
      const a = await fetch(`${wt.replace(/\/$/, "")}/${t}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: r })
      });
      if (!a.ok)
        throw new Error(`Failed to persist label (status ${a.status})`);
    } catch (a) {
      console.error(`[timesheet-app] failed to persist label for side ${t}`, a);
    }
  }, []), ke = A((t, r) => {
    const a = r.trim();
    if (typeof window > "u") {
      Oe(t, a);
      return;
    }
    const o = se.current[t];
    typeof o == "number" && window.clearTimeout(o), se.current[t] = window.setTimeout(() => {
      se.current[t] = null, Oe(t, a);
    }, 400);
  }, [Oe]);
  A(
    (t) => (r) => {
      const a = r.target.value;
      W((o) => ({ ...o, [t]: a })), ke(t, a);
    },
    [ke]
  );
  const pe = (t, r) => {
    const a = H.current;
    if (!a.currentLabel || a.currentLabel !== r || a.startTime === null || a.lastTimestamp === null)
      return 0;
    const { start: o, end: c } = He(t), s = Math.max(o, a.startTime), p = Math.min(c, a.lastTimestamp);
    return p > s ? p - s : 0;
  }, he = A(
    (t) => {
      const r = w[t] ?? {}, a = Object.entries(r).map(([c, s]) => ({
        label: c,
        totalMs: s.totalMs,
        side: s.side ?? null
      })), o = H.current;
      if (o.currentLabel && o.startTime !== null && o.lastTimestamp !== null) {
        const c = pe(t, o.currentLabel);
        if (c > 0) {
          const s = a.find((_) => _.label === o.currentLabel), p = o.lastSide;
          s ? (s.totalMs += c, s.side === null && (s.side = p)) : a.push({ label: o.currentLabel, totalMs: c, side: p ?? null });
        }
      }
      return a.sort((c, s) => s.totalMs - c.totalMs);
    },
    [w, l]
  ), ne = at(() => {
    const t = new Set(Object.keys(w));
    return t.add(I), Array.from(t).sort((r, a) => r === a ? 0 : r > a ? -1 : 1);
  }, [w, I]), re = at(() => ne.map((t) => {
    const r = he(t);
    if (r.length === 0)
      return null;
    const a = r.reduce((o, c) => o + c.totalMs, 0);
    return { dateKey: t, rows: r, totalMs: a };
  }).filter(Boolean), [ne, he]), Ve = A((t, r, a) => {
    if (H.current.currentLabel === r && t === I) {
      Y("Stop the current activity before editing it.");
      return;
    }
    x({ dateKey: t, originalLabel: r }), P(Ht(a)), M(r), Y(null);
  }, [I]), Be = A((t) => {
    P(t.target.value);
  }, []), ve = A((t) => {
    M(t.target.value);
  }, []), Xe = A(() => {
    x(null), P(""), M(""), Y(null);
  }, []), Qe = A(() => {
    if (!b)
      return;
    const { dateKey: t, originalLabel: r } = b, a = zt(y);
    if (!Number.isFinite(a)) {
      Y("Please enter duration as mm:ss, hh:mm:ss, or minutes.");
      return;
    }
    const o = N.trim();
    if (o.length === 0) {
      Y("Activity name cannot be empty.");
      return;
    }
    const c = pe(t, r);
    if (a < c) {
      Y(`Duration cannot be less than the active segment (${Ie(c)}).`);
      return;
    }
    const s = Math.max(0, a - c);
    D((p) => {
      const _ = { ...p }, T = { ..._[t] ?? {} }, R = T[r];
      if (R && delete T[r], s > 0) {
        const j = T[o], ee = ((j == null ? void 0 : j.totalMs) ?? 0) + s, F = o === r ? (R == null ? void 0 : R.side) ?? (j == null ? void 0 : j.side) ?? null : (j == null ? void 0 : j.side) ?? (R == null ? void 0 : R.side) ?? null;
        T[o] = { totalMs: ee, side: F };
      }
      return Object.keys(T).length === 0 ? delete _[t] : _[t] = T, _;
    }), x(null), P(""), M(""), Y(null);
  }, [b, y, N, pe]), Ae = A(
    (t, r) => {
      if (pe(t, r) > 0) {
        Y("Stop the current activity before deleting it.");
        return;
      }
      D((o) => {
        const c = o[t];
        if (!c || !(r in c))
          return o;
        const s = { ...o }, p = { ...c };
        return delete p[r], Object.keys(p).length === 0 ? delete s[t] : s[t] = p, s;
      }), b && b.dateKey === t && b.originalLabel === r && (x(null), P(""), M("")), Y(null);
    },
    [b]
  ), Ze = A((t) => {
    $e((r) => r.includes(t) ? r.filter((a) => a !== t) : [...r, t]);
  }, []), et = () => {
    if (X === "week") {
      const { start: c, end: s } = He(I), p = new Date(c);
      return p.setDate(p.getDate() - 6), { start: new Date(p.getFullYear(), p.getMonth(), p.getDate()).getTime(), end: s };
    }
    if (X === "month") {
      const c = Fe(I), s = new Date(c.getFullYear(), c.getMonth(), 1).getTime(), p = new Date(c.getFullYear(), c.getMonth() + 1, 1).getTime();
      return { start: s, end: p };
    }
    const t = Fe(C), r = Fe(ce);
    if (Number.isNaN(t.getTime()) || Number.isNaN(r.getTime()) || t > r)
      return null;
    const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), o = new Date(r.getFullYear(), r.getMonth(), r.getDate() + 1).getTime();
    return { start: a, end: o };
  }, We = A(() => {
    const t = et();
    if (!t) {
      xe("Please provide a valid date range before downloading.");
      return;
    }
    const r = [];
    for (const _ of ne) {
      const { start: T, end: R } = He(_);
      if (R <= t.start || T >= t.end)
        continue;
      const j = he(_);
      if (j.length === 0)
        continue;
      const ee = St(_);
      for (const F of j) {
        const ye = F.side !== null ? `Side ${F.side}` : "";
        r.push(`${ct(ee)},${ct(F.label)},${ct(ye)},${Ie(F.totalMs)}`);
      }
    }
    if (r.length === 0) {
      xe("No activity recorded in the selected range.");
      return;
    }
    const a = ["Date,Activity,Side,Duration", ...r].join(`
`), o = new Blob([a], { type: "text/csv;charset=utf-8;" }), c = URL.createObjectURL(o), s = document.createElement("a");
    s.href = c;
    const p = X === "custom" ? "custom" : X;
    s.download = `activity-log-${p}.csv`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(c), xe(null);
  }, [he, X, ne, C, ce]), ge = (l == null ? void 0 : l.side) ?? null, Je = at(() => ge === null ? null : lt(B, ge), [ge, B]), tt = (l == null ? void 0 : l.imu_timestamp_text) ?? (l == null ? void 0 : l.imu_timestamp_iso) ?? (l == null ? void 0 : l.received_at) ?? null, q = A(async (t = !1) => {
    if (!z || !ie && !t)
      return !1;
    try {
      const r = await fetch(ot, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: w })
      });
      if (!r.ok)
        throw new Error(`Activity log sync failed with status ${r.status}`);
      return De(!1), !0;
    } catch (r) {
      return console.warn("[activity-log] failed to sync activity log", r), !1;
    }
  }, [w, z, ie]), Ge = A(async () => {
    if (ue)
      return;
    if (!z) {
      oe({ type: "error", message: "Activity log is still loading. Please try again shortly." });
      return;
    }
    Re(!0), oe(null), typeof window < "u" && Z.current !== null && (window.clearTimeout(Z.current), Z.current = null), await q(!0) ? (oe({ type: "success", message: "Activity log saved." }), typeof window < "u" && (Z.current = window.setTimeout(() => {
      oe(null), Z.current = null;
    }, 4e3))) : oe({ type: "error", message: "Unable to save activity log. Please try again." }), Re(!1);
  }, [z, ue, q]);
  V(() => {
    if (z) {
      if (Ce.current) {
        Ce.current = !1;
        return;
      }
      De(!0), q(!0);
    }
  }, [w, z, q]), V(() => {
    if (!z || typeof window > "u")
      return;
    const t = window.setInterval(() => {
      q();
    }, Ut);
    return () => window.clearInterval(t);
  }, [z, q]), V(() => {
    if (typeof window > "u")
      return;
    const t = () => {
      if (ie) {
        if (navigator.sendBeacon)
          try {
            const r = new Blob([JSON.stringify({ entries: w })], { type: "application/json" });
            navigator.sendBeacon(ot, r);
            return;
          } catch (r) {
            console.warn("[activity-log] sendBeacon flush failed", r);
          }
        q(!0);
      }
    };
    return window.addEventListener("pagehide", t), window.addEventListener("beforeunload", t), () => {
      window.removeEventListener("pagehide", t), window.removeEventListener("beforeunload", t);
    };
  }, [w, ie, q]);
  const be = A(() => {
    var o, c, s;
    if (typeof window > "u" || window.parent === window)
      return;
    const t = window.document, r = ((o = t.documentElement) == null ? void 0 : o.scrollHeight) || ((c = t.body) == null ? void 0 : c.scrollHeight) || window.innerHeight, a = Math.max(320, Math.min(Math.ceil(r), 4e3));
    (s = window.parent) == null || s.postMessage({ type: "EMBED_HEIGHT", height: a }, "*");
  }, []);
  return V(() => {
    be();
  }, [be, re.length, Te, B, b, X]), V(() => {
    if (typeof window > "u")
      return;
    const t = () => be();
    window.addEventListener("load", t), window.addEventListener("resize", t);
    let r = null;
    return typeof ResizeObserver < "u" && (r = new ResizeObserver(t), r.observe(window.document.documentElement)), () => {
      window.removeEventListener("load", t), window.removeEventListener("resize", t), r == null || r.disconnect();
    };
  }, [be]), /* @__PURE__ */ u.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ u.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Gt(tt) })
      ] }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Je ?? "Waiting for data?" })
      ] }),
      h ? /* @__PURE__ */ u.jsxs("p", { className: "error-text", children: [
        "Error: ",
        h
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
              value: X,
              onChange: (t) => ae(t.target.value),
              children: [
                /* @__PURE__ */ u.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ u.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ u.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        X === "custom" ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsxs("label", { className: "range-option", children: [
            "From",
            /* @__PURE__ */ u.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: C,
                max: ce,
                onChange: (t) => qe(t.target.value)
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
                value: ce,
                min: C,
                onChange: (t) => Ke(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "download-button push-right", onClick: We, children: "Download CSV" }),
        /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "download-button save-button",
            onClick: Ge,
            disabled: ue,
            children: ue ? "Saving..." : "Save Changes"
          }
        )
      ] }),
      Ye ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: Ye }) : null,
      je ? /* @__PURE__ */ u.jsx("p", { className: je.type === "error" ? "error-text" : "success-text", children: je.message }) : null,
      re.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : re.map(({ dateKey: t, rows: r, totalMs: a }) => {
        const o = Te.includes(t), c = H.current;
        return /* @__PURE__ */ u.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ u.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${o ? " date-header--expanded" : ""}`,
              onClick: () => Ze(t),
              children: [
                /* @__PURE__ */ u.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ u.jsx("span", { className: "date-label", children: St(t) }),
                  /* @__PURE__ */ u.jsxs("span", { className: "date-summary", children: [
                    r.length,
                    " activit",
                    r.length === 1 ? "y" : "ies",
                    " - ",
                    Ie(a)
                  ] })
                ] }),
                /* @__PURE__ */ u.jsx("span", { className: "date-header__icon", children: o ? "−" : "+" })
              ]
            }
          ),
          o ? /* @__PURE__ */ u.jsxs("table", { className: "activity-table", children: [
            /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
              /* @__PURE__ */ u.jsx("th", { scope: "col", children: "Activity" }),
              /* @__PURE__ */ u.jsx("th", { scope: "col", className: "side-heading", children: "Side" }),
              /* @__PURE__ */ u.jsx("th", { scope: "col", children: "Total Duration" }),
              /* @__PURE__ */ u.jsx("th", { scope: "col", className: "actions-heading", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ u.jsx("tbody", { children: r.map((s) => {
              const p = (b == null ? void 0 : b.dateKey) === t && b.originalLabel === s.label, _ = c.currentLabel === s.label && t === I;
              return /* @__PURE__ */ u.jsxs("tr", { children: [
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: N,
                    onChange: ve,
                    placeholder: "Activity name"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: s.label }) }),
                /* @__PURE__ */ u.jsx("td", { className: "side-cell", children: /* @__PURE__ */ u.jsx("span", { children: s.side !== null ? `Side ${s.side}` : "—" }) }),
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: y,
                    onChange: Be,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: Ie(s.totalMs) }) }),
                /* @__PURE__ */ u.jsx("td", { className: "actions-cell", children: /* @__PURE__ */ u.jsx("div", { className: "action-buttons", children: p ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--primary",
                      onClick: Qe,
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button", onClick: Xe, children: "Cancel" })
                ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: _,
                      onClick: () => Ve(t, s.label, s.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: _,
                      onClick: () => Ae(t, s.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${s.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      K ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: K }) : null
    ] })
  ] });
}
export {
  Kt as TimesheetDevice
};
