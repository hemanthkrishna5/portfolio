import _t, { useState as I, useRef as Oe, useCallback as M, useEffect as Y, useMemo as et } from "react";
var st = { exports: {} }, ke = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pt;
function Pt() {
  if (pt) return ke;
  pt = 1;
  var c = _t, d = Symbol.for("react.element"), h = Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, w = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, j = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(S, y, k) {
    var R, F = {}, H = null, U = null;
    k !== void 0 && (H = "" + k), y.key !== void 0 && (H = "" + y.key), y.ref !== void 0 && (U = y.ref);
    for (R in y) f.call(y, R) && !j.hasOwnProperty(R) && (F[R] = y[R]);
    if (S && S.defaultProps) for (R in y = S.defaultProps, y) F[R] === void 0 && (F[R] = y[R]);
    return { $$typeof: d, type: S, key: H, ref: U, props: F, _owner: w.current };
  }
  return ke.Fragment = h, ke.jsx = b, ke.jsxs = b, ke;
}
var Ae = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ht;
function Mt() {
  return ht || (ht = 1, process.env.NODE_ENV !== "production" && function() {
    var c = _t, d = Symbol.for("react.element"), h = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), S = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), U = Symbol.for("react.offscreen"), Te = Symbol.iterator, Ie = "@@iterator";
    function z(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = Te && e[Te] || e[Ie];
      return typeof n == "function" ? n : null;
    }
    var ee = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function N(e) {
      {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), m = 1; m < n; m++)
          l[m - 1] = arguments[m];
        Je("error", e, l);
      }
    }
    function Je(e, n, l) {
      {
        var m = ee.ReactDebugCurrentFrame, E = m.getStackAddendum();
        E !== "" && (n += "%s", l = l.concat([E]));
        var T = l.map(function(g) {
          return String(g);
        });
        T.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, T);
      }
    }
    var de = !1, Ge = !1, Fe = !1, Se = !1, J = !1, fe;
    fe = Symbol.for("react.module.reference");
    function Re(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === f || e === j || J || e === w || e === k || e === R || Se || e === U || de || Ge || Fe || typeof e == "object" && e !== null && (e.$$typeof === H || e.$$typeof === F || e.$$typeof === b || e.$$typeof === S || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === fe || e.getModuleId !== void 0));
    }
    function me(e, n, l) {
      var m = e.displayName;
      if (m)
        return m;
      var E = n.displayName || n.name || "";
      return E !== "" ? l + "(" + E + ")" : l;
    }
    function te(e) {
      return e.displayName || "Context";
    }
    function A(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && N("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case f:
          return "Fragment";
        case h:
          return "Portal";
        case j:
          return "Profiler";
        case w:
          return "StrictMode";
        case k:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case S:
            var n = e;
            return te(n) + ".Consumer";
          case b:
            var l = e;
            return te(l._context) + ".Provider";
          case y:
            return me(e, e.render, "ForwardRef");
          case F:
            var m = e.displayName || null;
            return m !== null ? m : A(e.type) || "Memo";
          case H: {
            var E = e, T = E._payload, g = E._init;
            try {
              return A(g(T));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var q = Object.assign, oe = 0, G, xe, K, pe, he, je, Ne;
    function se() {
    }
    se.__reactDisabledLog = !0;
    function $e() {
      {
        if (oe === 0) {
          G = console.log, xe = console.info, K = console.warn, pe = console.error, he = console.group, je = console.groupCollapsed, Ne = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: se,
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
        oe++;
      }
    }
    function B() {
      {
        if (oe--, oe === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: q({}, e, {
              value: G
            }),
            info: q({}, e, {
              value: xe
            }),
            warn: q({}, e, {
              value: K
            }),
            error: q({}, e, {
              value: pe
            }),
            group: q({}, e, {
              value: he
            }),
            groupCollapsed: q({}, e, {
              value: je
            }),
            groupEnd: q({}, e, {
              value: Ne
            })
          });
        }
        oe < 0 && N("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = ee.ReactCurrentDispatcher, ve;
    function X(e, n, l) {
      {
        if (ve === void 0)
          try {
            throw Error();
          } catch (E) {
            var m = E.stack.trim().match(/\n( *(at )?)/);
            ve = m && m[1] || "";
          }
        return `
` + ve + e;
      }
    }
    var ne = !1, Q;
    {
      var Le = typeof WeakMap == "function" ? WeakMap : Map;
      Q = new Le();
    }
    function Ye(e, n) {
      if (!e || ne)
        return "";
      {
        var l = Q.get(e);
        if (l !== void 0)
          return l;
      }
      var m;
      ne = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var T;
      T = ie.current, ie.current = null, $e();
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
            } catch (V) {
              m = V;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (V) {
              m = V;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (V) {
            m = V;
          }
          e();
        }
      } catch (V) {
        if (V && m && typeof V.stack == "string") {
          for (var v = V.stack.split(`
`), $ = m.stack.split(`
`), x = v.length - 1, O = $.length - 1; x >= 1 && O >= 0 && v[x] !== $[O]; )
            O--;
          for (; x >= 1 && O >= 0; x--, O--)
            if (v[x] !== $[O]) {
              if (x !== 1 || O !== 1)
                do
                  if (x--, O--, O < 0 || v[x] !== $[O]) {
                    var W = `
` + v[x].replace(" at new ", " at ");
                    return e.displayName && W.includes("<anonymous>") && (W = W.replace("<anonymous>", e.displayName)), typeof e == "function" && Q.set(e, W), W;
                  }
                while (x >= 1 && O >= 0);
              break;
            }
        }
      } finally {
        ne = !1, ie.current = T, B(), Error.prepareStackTrace = E;
      }
      var we = e ? e.displayName || e.name : "", ue = we ? X(we) : "";
      return typeof e == "function" && Q.set(e, ue), ue;
    }
    function He(e, n, l) {
      return Ye(e, !1);
    }
    function ze(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function ge(e, n, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ye(e, ze(e));
      if (typeof e == "string")
        return X(e);
      switch (e) {
        case k:
          return X("Suspense");
        case R:
          return X("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return He(e.render);
          case F:
            return ge(e.type, n, l);
          case H: {
            var m = e, E = m._payload, T = m._init;
            try {
              return ge(T(E), n, l);
            } catch {
            }
          }
        }
      return "";
    }
    var le = Object.prototype.hasOwnProperty, Ue = {}, Ve = ee.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var n = e._owner, l = ge(e.type, e._source, n ? n.type : null);
        Ve.setExtraStackFrame(l);
      } else
        Ve.setExtraStackFrame(null);
    }
    function qe(e, n, l, m, E) {
      {
        var T = Function.call.bind(le);
        for (var g in e)
          if (T(e, g)) {
            var v = void 0;
            try {
              if (typeof e[g] != "function") {
                var $ = Error((m || "React class") + ": " + l + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $.name = "Invariant Violation", $;
              }
              v = e[g](n, g, m, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              v = x;
            }
            v && !(v instanceof Error) && (be(E), N("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", l, g, typeof v), be(null)), v instanceof Error && !(v.message in Ue) && (Ue[v.message] = !0, be(E), N("Failed %s type: %s", l, v.message), be(null));
          }
      }
    }
    var De = Array.isArray;
    function Ce(e) {
      return De(e);
    }
    function Ke(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, l = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function re(e) {
      try {
        return ce(e), !1;
      } catch {
        return !0;
      }
    }
    function ce(e) {
      return "" + e;
    }
    function t(e) {
      if (re(e))
        return N("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), ce(e);
    }
    var r = ee.ReactCurrentOwner, a = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, s, i;
    function o(e) {
      if (le.call(e, "ref")) {
        var n = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function p(e) {
      if (le.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function _(e, n) {
      typeof e.ref == "string" && r.current;
    }
    function L(e, n) {
      {
        var l = function() {
          s || (s = !0, N("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: l,
          configurable: !0
        });
      }
    }
    function D(e, n) {
      {
        var l = function() {
          i || (i = !0, N("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: l,
          configurable: !0
        });
      }
    }
    var C = function(e, n, l, m, E, T, g) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: n,
        ref: l,
        props: g,
        // Record the component responsible for creating this element.
        _owner: T
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
    function Z(e, n, l, m, E) {
      {
        var T, g = {}, v = null, $ = null;
        l !== void 0 && (t(l), v = "" + l), p(n) && (t(n.key), v = "" + n.key), o(n) && ($ = n.ref, _(n, E));
        for (T in n)
          le.call(n, T) && !a.hasOwnProperty(T) && (g[T] = n[T]);
        if (e && e.defaultProps) {
          var x = e.defaultProps;
          for (T in x)
            g[T] === void 0 && (g[T] = x[T]);
        }
        if (v || $) {
          var O = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && L(g, O), $ && D(g, O);
        }
        return C(e, v, $, E, m, r.current, g);
      }
    }
    var P = ee.ReactCurrentOwner, ye = ee.ReactDebugCurrentFrame;
    function ae(e) {
      if (e) {
        var n = e._owner, l = ge(e.type, e._source, n ? n.type : null);
        ye.setExtraStackFrame(l);
      } else
        ye.setExtraStackFrame(null);
    }
    var Xe;
    Xe = !1;
    function Qe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === d;
    }
    function lt() {
      {
        if (P.current) {
          var e = A(P.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function Rt(e) {
      return "";
    }
    var ct = {};
    function xt(e) {
      {
        var n = lt();
        if (!n) {
          var l = typeof e == "string" ? e : e.displayName || e.name;
          l && (n = `

Check the top-level render call using <` + l + ">.");
        }
        return n;
      }
    }
    function ut(e, n) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var l = xt(n);
        if (ct[l])
          return;
        ct[l] = !0;
        var m = "";
        e && e._owner && e._owner !== P.current && (m = " It was passed a child from " + A(e._owner.type) + "."), ae(e), N('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, m), ae(null);
      }
    }
    function dt(e, n) {
      {
        if (typeof e != "object")
          return;
        if (Ce(e))
          for (var l = 0; l < e.length; l++) {
            var m = e[l];
            Qe(m) && ut(m, n);
          }
        else if (Qe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var E = z(e);
          if (typeof E == "function" && E !== e.entries)
            for (var T = E.call(e), g; !(g = T.next()).done; )
              Qe(g.value) && ut(g.value, n);
        }
      }
    }
    function jt(e) {
      {
        var n = e.type;
        if (n == null || typeof n == "string")
          return;
        var l;
        if (typeof n == "function")
          l = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === F))
          l = n.propTypes;
        else
          return;
        if (l) {
          var m = A(n);
          qe(l, e.props, "prop", m, e);
        } else if (n.PropTypes !== void 0 && !Xe) {
          Xe = !0;
          var E = A(n);
          N("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && N("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Nt(e) {
      {
        for (var n = Object.keys(e.props), l = 0; l < n.length; l++) {
          var m = n[l];
          if (m !== "children" && m !== "key") {
            ae(e), N("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), ae(null);
            break;
          }
        }
        e.ref !== null && (ae(e), N("Invalid attribute `ref` supplied to `React.Fragment`."), ae(null));
      }
    }
    var ft = {};
    function mt(e, n, l, m, E, T) {
      {
        var g = Re(e);
        if (!g) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $ = Rt();
          $ ? v += $ : v += lt();
          var x;
          e === null ? x = "null" : Ce(e) ? x = "array" : e !== void 0 && e.$$typeof === d ? (x = "<" + (A(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : x = typeof e, N("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", x, v);
        }
        var O = Z(e, n, l, E, T);
        if (O == null)
          return O;
        if (g) {
          var W = n.children;
          if (W !== void 0)
            if (m)
              if (Ce(W)) {
                for (var we = 0; we < W.length; we++)
                  dt(W[we], e);
                Object.freeze && Object.freeze(W);
              } else
                N("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              dt(W, e);
        }
        if (le.call(n, "key")) {
          var ue = A(e), V = Object.keys(n).filter(function(At) {
            return At !== "key";
          }), Ze = V.length > 0 ? "{key: someKey, " + V.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ft[ue + Ze]) {
            var kt = V.length > 0 ? "{" + V.join(": ..., ") + ": ...}" : "{}";
            N(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ze, ue, kt, ue), ft[ue + Ze] = !0;
          }
        }
        return e === f ? Nt(O) : jt(O), O;
      }
    }
    function Lt(e, n, l) {
      return mt(e, n, l, !0);
    }
    function Dt(e, n, l) {
      return mt(e, n, l, !1);
    }
    var Ct = Dt, Ot = Lt;
    Ae.Fragment = f, Ae.jsx = Ct, Ae.jsxs = Ot;
  }()), Ae;
}
process.env.NODE_ENV === "production" ? st.exports = Pt() : st.exports = Mt();
var u = st.exports;
const _e = {}, Tt = "/api/imu/latest", It = "/api/imu/history", We = 12, Ft = 1e3, it = "dodec-labels", St = ["dodeca-labels"], vt = "dodec-activity-log", $t = "Side", Yt = 24 * 60 * 60 * 1e3, tt = "DODEC_LABEL_UPDATE", gt = "DODEC_LABELS_REQUEST", bt = (() => {
  const c = _e == null ? void 0 : _e.VITE_DEVICE_LABELS_URL;
  if (c && c.length > 0)
    return c;
  try {
    const d = new URL(Tt, "https://placeholder.local");
    return `${d.origin === "https://placeholder.local" ? "" : `${d.protocol}//${d.host}`}/api/labels`;
  } catch {
    return "/api/labels";
  }
})(), nt = (_e == null ? void 0 : _e.VITE_DEVICE_ACTIVITY_LOG_URL) ?? "/api/activity-log", Ut = 5 * 60 * 1e3, Vt = 30 * 1e3, yt = (c) => {
  const d = {};
  if (!c || typeof c != "object")
    return d;
  for (const [h, f] of Object.entries(c)) {
    if (typeof h != "string" || h.length === 0 || !f || typeof f != "object")
      continue;
    const w = {};
    for (const [j, b] of Object.entries(f)) {
      if (typeof j != "string" || j.length === 0)
        continue;
      let S = 0, y = null;
      if (typeof b == "number")
        S = Number.isFinite(b) && b > 0 ? Math.floor(b) : 0;
      else if (b && typeof b == "object") {
        const k = b.totalMs, R = b.side;
        typeof k == "number" && Number.isFinite(k) && k > 0 && (S = Math.floor(k)), typeof R == "number" && Number.isFinite(R) && (y = Math.floor(R));
      }
      (S > 0 || y !== null) && (w[j] = { totalMs: S, side: y });
    }
    Object.keys(w).length > 0 && (d[h] = w);
  }
  return d;
}, Bt = Array.from({ length: We }, (c, d) => d + 1), rt = () => {
  const c = {};
  for (const d of Bt)
    c[d] = "";
  return c;
}, Wt = () => {
  if (typeof window > "u")
    return rt();
  const c = (h) => {
    try {
      const f = window.localStorage.getItem(h);
      if (!f)
        return null;
      const w = JSON.parse(f), j = rt();
      for (const [b, S] of Object.entries(w)) {
        const y = Number(b);
        Number.isFinite(y) && y >= 1 && y <= We && (j[y] = String(S ?? ""));
      }
      return j;
    } catch (f) {
      return console.warn("Unable to read stored labels", f), null;
    }
  }, d = c(it);
  if (d)
    return d;
  for (const h of St) {
    const f = c(h);
    if (f) {
      try {
        window.localStorage.setItem(it, JSON.stringify(f));
      } catch {
      }
      return f;
    }
  }
  return rt();
}, wt = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), at = (c, d) => {
  var f;
  const h = (f = c[d]) == null ? void 0 : f.trim();
  return h && h.length > 0 ? h : `${$t} ${d}`;
}, Jt = (c) => {
  const d = [c.received_at, c.imu_timestamp_iso];
  for (const h of d)
    if (h) {
      const f = Date.parse(h);
      if (!Number.isNaN(f))
        return f;
    }
  if (c.imu_timestamp_text) {
    const h = c.imu_timestamp_text.replace(" ", "T"), f = Date.parse(h);
    if (!Number.isNaN(f))
      return f;
  }
  return Date.now();
}, Gt = (c) => {
  if (!c)
    return null;
  const d = Date.parse(c);
  return Number.isNaN(d) ? null : d;
}, Ee = (c) => {
  const d = new Date(c), h = d.getFullYear(), f = String(d.getMonth() + 1).padStart(2, "0"), w = String(d.getDate()).padStart(2, "0");
  return `${h}-${f}-${w}`;
}, Me = (c) => {
  const [d, h, f] = c.split("-").map(Number);
  return new Date(d, h - 1, f);
}, Be = (c) => {
  const d = Me(c), h = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), f = h + Yt;
  return { start: h, end: f };
}, Et = (c) => {
  const d = Me(c);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(d);
}, Ht = (c) => c ? c.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", Pe = (c) => {
  if (!Number.isFinite(c) || c <= 0)
    return "00:00";
  const d = Math.floor(c / 1e3), h = Math.floor(d / 3600), f = Math.floor(d % 3600 / 60), w = d % 60;
  return h > 0 ? `${String(h).padStart(2, "0")}:${String(f).padStart(2, "0")}:${String(w).padStart(2, "0")}` : `${String(f).padStart(2, "0")}:${String(w).padStart(2, "0")}`;
}, zt = (c) => Pe(c), qt = (c) => {
  const d = c.trim();
  if (!d)
    return NaN;
  const h = d.split(":");
  if (h.length > 1) {
    if (h.length > 3)
      return NaN;
    const w = h.map((y) => Number(y));
    if (w.some((y) => Number.isNaN(y) || y < 0))
      return NaN;
    let j = 0, b = 0, S = 0;
    return w.length === 3 ? [j, b, S] = w : [b, S] = w, Math.max(0, j * 3600 + b * 60 + S) * 1e3;
  }
  const f = Number(d);
  return Number.isNaN(f) || f < 0 ? NaN : f * 60 * 1e3;
}, ot = (c) => c.includes('"') || c.includes(",") || c.includes(`
`) ? `"${c.replace(/"/g, '""')}"` : c;
function Xt() {
  const [c, d] = I(null), [h, f] = I(null), [w, j] = I(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(vt);
      return t ? yt(JSON.parse(t)) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), [b, S] = I(null), [y, k] = I(""), [R, F] = I(""), [H, U] = I(null), [Te, Ie] = I(() => [Ee(Date.now())]), [z, ee] = I("week"), [N, Je] = I(Ee(Date.now())), [de, Ge] = I(Ee(Date.now())), [Fe, Se] = I(null), [J, fe] = I(() => Wt()), Re = Oe(J), me = Oe(!1), te = Oe({}), A = Oe(wt()), [q, oe] = I(!1), [G, xe] = I(!1), [K, pe] = I(!1), he = Oe(!1), je = M((t, r, a, s) => {
    s <= a || j((i) => {
      const o = { ...i };
      let p = a;
      for (; p < s; ) {
        const _ = Ee(p), { end: L } = Be(_), D = Math.min(s, L), C = Math.max(0, D - p);
        if (C > 0) {
          const Z = { ...o[_] ?? {} }, P = Z[t], ye = ((P == null ? void 0 : P.totalMs) ?? 0) + C, ae = r ?? (P == null ? void 0 : P.side) ?? null;
          Z[t] = { totalMs: ye, side: ae }, o[_] = Z;
        }
        p = D;
      }
      return o;
    });
  }, []);
  Y(() => {
    if (G) {
      if (he.current) {
        he.current = !1;
        return;
      }
      pe(!0);
    }
  }, [w, G]);
  const Ne = M(() => {
    A.current = wt(), j(() => ({}));
  }, []), se = M(
    (t) => {
      const r = typeof t.side == "number" ? t.side : null;
      if (!r)
        return;
      const a = at(Re.current, r), s = Jt(t), i = t.segment_started_at ? Gt(t.segment_started_at) : null, o = A.current;
      if (o.currentLabel === null || o.startTime === null) {
        o.currentLabel = a, o.startTime = i ?? s, o.lastTimestamp = s, o.lastSide = r;
        return;
      }
      if (a === o.currentLabel) {
        i !== null && (o.startTime === null || i < o.startTime) && (o.startTime = i), o.lastTimestamp = s, o.lastSide = r;
        return;
      }
      const p = o.startTime, _ = s;
      _ > p && je(o.currentLabel, o.lastSide, p, _), o.currentLabel = a, o.startTime = i ?? s, o.lastTimestamp = s, o.lastSide = r;
    },
    [je]
  );
  Y(() => {
    if (Re.current = J, typeof window < "u") {
      const r = JSON.stringify(J);
      window.localStorage.setItem(it, r);
      for (const a of St)
        window.localStorage.setItem(a, r);
      !me.current && window.parent && window.parent !== window && window.parent.postMessage({ type: tt, labels: J }, "*");
    }
    me.current = !1;
    const t = A.current;
    t.lastSide !== null && (t.currentLabel = at(J, t.lastSide));
  }, [J]), Y(() => {
    typeof window < "u" && window.localStorage.setItem(vt, JSON.stringify(w));
  }, [w]), Y(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(nt, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`Activity log request failed with status ${a.status}`);
        const s = await a.json();
        if (t)
          return;
        s && typeof s == "object" && s.entries && (he.current = !0, j(yt(s.entries))), xe(!0), pe(!1);
      } catch (a) {
        t || (console.warn("[activity-log] failed to load activity log from server", a), xe(!0));
      }
    })(), () => {
      t = !0;
    };
  }, []), Y(() => () => {
    if (!(typeof window > "u"))
      for (const t of Object.keys(te.current)) {
        const r = te.current[Number(t)];
        typeof r == "number" && window.clearTimeout(r);
      }
  }, []), Y(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(bt, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`Failed to load labels (status ${a.status})`);
        const s = await a.json();
        if (t || !s || typeof s.labels != "object" || s.labels === null)
          return;
        me.current = !0, fe((i) => {
          const o = { ...i };
          let p = !1;
          for (const [_, L] of Object.entries(s.labels)) {
            const D = Number(_);
            if (!Number.isFinite(D) || D < 1 || D > We)
              continue;
            const C = typeof L == "string" ? L : "";
            o[D] !== C && (o[D] = C, p = !0);
          }
          return p ? o : i;
        });
      } catch (a) {
        console.error("[timesheet-app] failed to load labels from server", a);
      }
    })(), () => {
      t = !0;
    };
  }, []), Y(() => {
    if (typeof window > "u")
      return;
    const t = (r) => {
      const a = r == null ? void 0 : r.data;
      if (!(!a || typeof a != "object"))
        if (a.type === tt && a.labels && typeof a.labels == "object") {
          me.current = !0;
          const s = a.labels;
          fe((i) => {
            const o = { ...i };
            for (const [p, _] of Object.entries(s)) {
              const L = Number(p);
              !Number.isFinite(L) || L < 1 || L > We || (o[L] = typeof _ == "string" ? _ : "");
            }
            return { ...o };
          });
        } else a.type === gt && window.parent && window.parent !== window && window.parent.postMessage({ type: tt, labels: Re.current }, r.origin || "*");
    };
    return window.addEventListener("message", t), window.parent && window.parent !== window && window.parent.postMessage({ type: gt }, "*"), () => {
      window.removeEventListener("message", t);
    };
  }, []), Y(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(`${It}?limit=5000`, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`History request failed with status ${a.status}`);
        const s = await a.json();
        if (t)
          return;
        Ne();
        let i = null;
        for (const o of s) {
          if (t)
            break;
          se(o), i = o;
        }
        i && d({
          side: typeof i.side == "number" ? i.side : null,
          imu_timestamp_text: i.imu_timestamp_text ?? null,
          imu_timestamp_iso: i.imu_timestamp_iso ?? null,
          received_at: i.received_at ?? null,
          confidence: i.confidence ?? null
        }), f(null);
      } catch (a) {
        t || f(a instanceof Error ? a.message : "Unknown error while loading history");
      } finally {
        t || oe(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [se, Ne]), Y(() => {
    if (!q)
      return;
    let t = !0;
    const r = async () => {
      try {
        const s = await fetch(Tt, { cache: "no-store" });
        if (!s.ok)
          throw new Error(`Request failed with status ${s.status}`);
        const i = await s.json();
        if (!t)
          return;
        se(i), d({
          side: typeof i.side == "number" ? i.side : null,
          imu_timestamp_text: i.imu_timestamp_text ?? null,
          imu_timestamp_iso: i.imu_timestamp_iso ?? null,
          received_at: i.received_at ?? null,
          confidence: i.confidence ?? null
        }), f(null);
      } catch (s) {
        t && f(s instanceof Error ? s.message : "Unknown error");
      }
    };
    r();
    const a = window.setInterval(r, Ft);
    return () => {
      t = !1, window.clearInterval(a);
    };
  }, [se, q]);
  const $e = A.current, B = $e.lastTimestamp ? Ee($e.lastTimestamp) : Ee(Date.now());
  Y(() => {
    Ie((t) => t.includes(B) ? t : [...t, B]);
  }, [B]);
  const ie = M(async (t, r) => {
    try {
      const a = await fetch(`${bt.replace(/\/$/, "")}/${t}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: r })
      });
      if (!a.ok)
        throw new Error(`Failed to persist label (status ${a.status})`);
    } catch (a) {
      console.error(`[timesheet-app] failed to persist label for side ${t}`, a);
    }
  }, []), ve = M((t, r) => {
    const a = r.trim();
    if (typeof window > "u") {
      ie(t, a);
      return;
    }
    const s = te.current[t];
    typeof s == "number" && window.clearTimeout(s), te.current[t] = window.setTimeout(() => {
      te.current[t] = null, ie(t, a);
    }, 400);
  }, [ie]);
  M(
    (t) => (r) => {
      const a = r.target.value;
      fe((s) => ({ ...s, [t]: a })), ve(t, a);
    },
    [ve]
  );
  const X = (t, r) => {
    const a = A.current;
    if (!a.currentLabel || a.currentLabel !== r || a.startTime === null || a.lastTimestamp === null)
      return 0;
    const { start: s, end: i } = Be(t), o = Math.max(s, a.startTime), p = Math.min(i, a.lastTimestamp);
    return p > o ? p - o : 0;
  }, ne = M(
    (t) => {
      const r = w[t] ?? {}, a = Object.entries(r).map(([i, o]) => ({
        label: i,
        totalMs: o.totalMs,
        side: o.side ?? null
      })), s = A.current;
      if (s.currentLabel && s.startTime !== null && s.lastTimestamp !== null) {
        const i = X(t, s.currentLabel);
        if (i > 0) {
          const o = a.find((_) => _.label === s.currentLabel), p = s.lastSide;
          o ? (o.totalMs += i, o.side === null && (o.side = p)) : a.push({ label: s.currentLabel, totalMs: i, side: p ?? null });
        }
      }
      return a.sort((i, o) => o.totalMs - i.totalMs);
    },
    [w, c]
  ), Q = et(() => {
    const t = new Set(Object.keys(w));
    return t.add(B), Array.from(t).sort((r, a) => r === a ? 0 : r > a ? -1 : 1);
  }, [w, B]), Le = et(() => Q.map((t) => {
    const r = ne(t);
    if (r.length === 0)
      return null;
    const a = r.reduce((s, i) => s + i.totalMs, 0);
    return { dateKey: t, rows: r, totalMs: a };
  }).filter(Boolean), [Q, ne]), Ye = M((t, r, a) => {
    if (A.current.currentLabel === r && t === B) {
      U("Stop the current activity before editing it.");
      return;
    }
    S({ dateKey: t, originalLabel: r }), k(zt(a)), F(r), U(null);
  }, [B]), He = M((t) => {
    k(t.target.value);
  }, []), ze = M((t) => {
    F(t.target.value);
  }, []), ge = M(() => {
    S(null), k(""), F(""), U(null);
  }, []), le = M(() => {
    if (!b)
      return;
    const { dateKey: t, originalLabel: r } = b, a = qt(y);
    if (!Number.isFinite(a)) {
      U("Please enter duration as mm:ss, hh:mm:ss, or minutes.");
      return;
    }
    const s = R.trim();
    if (s.length === 0) {
      U("Activity name cannot be empty.");
      return;
    }
    const i = X(t, r);
    if (a < i) {
      U(`Duration cannot be less than the active segment (${Pe(i)}).`);
      return;
    }
    const o = Math.max(0, a - i);
    j((p) => {
      const _ = { ...p }, L = { ..._[t] ?? {} }, D = L[r];
      if (D && delete L[r], o > 0) {
        const C = L[s], Z = ((C == null ? void 0 : C.totalMs) ?? 0) + o, P = s === r ? (D == null ? void 0 : D.side) ?? (C == null ? void 0 : C.side) ?? null : (C == null ? void 0 : C.side) ?? (D == null ? void 0 : D.side) ?? null;
        L[s] = { totalMs: Z, side: P };
      }
      return Object.keys(L).length === 0 ? delete _[t] : _[t] = L, _;
    }), S(null), k(""), F(""), U(null);
  }, [b, y, R, X]), Ue = M(
    (t, r) => {
      if (X(t, r) > 0) {
        U("Stop the current activity before deleting it.");
        return;
      }
      j((s) => {
        const i = s[t];
        if (!i || !(r in i))
          return s;
        const o = { ...s }, p = { ...i };
        return delete p[r], Object.keys(p).length === 0 ? delete o[t] : o[t] = p, o;
      }), b && b.dateKey === t && b.originalLabel === r && (S(null), k(""), F("")), U(null);
    },
    [b]
  ), Ve = M((t) => {
    Ie((r) => r.includes(t) ? r.filter((a) => a !== t) : [...r, t]);
  }, []), be = () => {
    if (z === "week") {
      const { start: i, end: o } = Be(B), p = new Date(i);
      return p.setDate(p.getDate() - 6), { start: new Date(p.getFullYear(), p.getMonth(), p.getDate()).getTime(), end: o };
    }
    if (z === "month") {
      const i = Me(B), o = new Date(i.getFullYear(), i.getMonth(), 1).getTime(), p = new Date(i.getFullYear(), i.getMonth() + 1, 1).getTime();
      return { start: o, end: p };
    }
    const t = Me(N), r = Me(de);
    if (Number.isNaN(t.getTime()) || Number.isNaN(r.getTime()) || t > r)
      return null;
    const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), s = new Date(r.getFullYear(), r.getMonth(), r.getDate() + 1).getTime();
    return { start: a, end: s };
  }, qe = M(() => {
    const t = be();
    if (!t) {
      Se("Please provide a valid date range before downloading.");
      return;
    }
    const r = [];
    for (const _ of Q) {
      const { start: L, end: D } = Be(_);
      if (D <= t.start || L >= t.end)
        continue;
      const C = ne(_);
      if (C.length === 0)
        continue;
      const Z = Et(_);
      for (const P of C) {
        const ye = P.side !== null ? `Side ${P.side}` : "";
        r.push(`${ot(Z)},${ot(P.label)},${ot(ye)},${Pe(P.totalMs)}`);
      }
    }
    if (r.length === 0) {
      Se("No activity recorded in the selected range.");
      return;
    }
    const a = ["Date,Activity,Side,Duration", ...r].join(`
`), s = new Blob([a], { type: "text/csv;charset=utf-8;" }), i = URL.createObjectURL(s), o = document.createElement("a");
    o.href = i;
    const p = z === "custom" ? "custom" : z;
    o.download = `activity-log-${p}.csv`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i), Se(null);
  }, [ne, z, Q, N, de]), De = (c == null ? void 0 : c.side) ?? null, Ce = et(() => De === null ? null : at(J, De), [De, J]), Ke = (c == null ? void 0 : c.imu_timestamp_text) ?? (c == null ? void 0 : c.imu_timestamp_iso) ?? (c == null ? void 0 : c.received_at) ?? null, re = M(async () => {
    if (!(!G || !K))
      try {
        const t = await fetch(nt, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries: w })
        });
        if (!t.ok)
          throw new Error(`Activity log sync failed with status ${t.status}`);
        pe(!1);
      } catch (t) {
        console.warn("[activity-log] failed to sync activity log", t);
      }
  }, [w, G, K]);
  Y(() => {
    if (!G || !K || typeof window > "u")
      return;
    const t = window.setTimeout(() => {
      re();
    }, Vt);
    return () => window.clearTimeout(t);
  }, [G, K, re]), Y(() => {
    if (!G || typeof window > "u")
      return;
    const t = window.setInterval(() => {
      re();
    }, Ut);
    return () => window.clearInterval(t);
  }, [G, re]), Y(() => {
    if (typeof window > "u")
      return;
    const t = () => {
      if (K) {
        if (navigator.sendBeacon)
          try {
            const r = new Blob([JSON.stringify({ entries: w })], { type: "application/json" });
            navigator.sendBeacon(nt, r);
            return;
          } catch (r) {
            console.warn("[activity-log] sendBeacon flush failed", r);
          }
        re();
      }
    };
    return window.addEventListener("pagehide", t), window.addEventListener("beforeunload", t), () => {
      window.removeEventListener("pagehide", t), window.removeEventListener("beforeunload", t);
    };
  }, [w, K, re]);
  const ce = M(() => {
    var s, i, o;
    if (typeof window > "u" || window.parent === window)
      return;
    const t = window.document, r = ((s = t.documentElement) == null ? void 0 : s.scrollHeight) || ((i = t.body) == null ? void 0 : i.scrollHeight) || window.innerHeight, a = Math.max(320, Math.min(Math.ceil(r), 4e3));
    (o = window.parent) == null || o.postMessage({ type: "EMBED_HEIGHT", height: a }, "*");
  }, []);
  return Y(() => {
    ce();
  }, [ce, Le.length, Te, J, b, z]), Y(() => {
    if (typeof window > "u")
      return;
    const t = () => ce();
    window.addEventListener("load", t), window.addEventListener("resize", t);
    let r = null;
    return typeof ResizeObserver < "u" && (r = new ResizeObserver(t), r.observe(window.document.documentElement)), () => {
      window.removeEventListener("load", t), window.removeEventListener("resize", t), r == null || r.disconnect();
    };
  }, [ce]), /* @__PURE__ */ u.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ u.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Ht(Ke) })
      ] }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Ce ?? "Waiting for data?" })
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
              value: z,
              onChange: (t) => ee(t.target.value),
              children: [
                /* @__PURE__ */ u.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ u.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ u.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        z === "custom" ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsxs("label", { className: "range-option", children: [
            "From",
            /* @__PURE__ */ u.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: N,
                max: de,
                onChange: (t) => Je(t.target.value)
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
                value: de,
                min: N,
                onChange: (t) => Ge(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "download-button", onClick: qe, children: "Download CSV" })
      ] }),
      Fe ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: Fe }) : null,
      Le.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : Le.map(({ dateKey: t, rows: r, totalMs: a }) => {
        const s = Te.includes(t), i = A.current;
        return /* @__PURE__ */ u.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ u.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${s ? " date-header--expanded" : ""}`,
              onClick: () => Ve(t),
              children: [
                /* @__PURE__ */ u.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ u.jsx("span", { className: "date-label", children: Et(t) }),
                  /* @__PURE__ */ u.jsxs("span", { className: "date-summary", children: [
                    r.length,
                    " activit",
                    r.length === 1 ? "y" : "ies",
                    " - ",
                    Pe(a)
                  ] })
                ] }),
                /* @__PURE__ */ u.jsx("span", { className: "date-header__icon", children: s ? "−" : "+" })
              ]
            }
          ),
          s ? /* @__PURE__ */ u.jsxs("table", { className: "activity-table", children: [
            /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
              /* @__PURE__ */ u.jsx("th", { scope: "col", children: "Activity" }),
              /* @__PURE__ */ u.jsx("th", { scope: "col", className: "side-heading", children: "Side" }),
              /* @__PURE__ */ u.jsx("th", { scope: "col", children: "Total Duration" }),
              /* @__PURE__ */ u.jsx("th", { scope: "col", className: "actions-heading", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ u.jsx("tbody", { children: r.map((o) => {
              const p = (b == null ? void 0 : b.dateKey) === t && b.originalLabel === o.label, _ = i.currentLabel === o.label && t === B;
              return /* @__PURE__ */ u.jsxs("tr", { children: [
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: R,
                    onChange: ze,
                    placeholder: "Activity name"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: o.label }) }),
                /* @__PURE__ */ u.jsx("td", { className: "side-cell", children: /* @__PURE__ */ u.jsx("span", { children: o.side !== null ? `Side ${o.side}` : "—" }) }),
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: y,
                    onChange: He,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: Pe(o.totalMs) }) }),
                /* @__PURE__ */ u.jsx("td", { className: "actions-cell", children: /* @__PURE__ */ u.jsx("div", { className: "action-buttons", children: p ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--primary",
                      onClick: le,
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button", onClick: ge, children: "Cancel" })
                ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: _,
                      onClick: () => Ye(t, o.label, o.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: _,
                      onClick: () => Ue(t, o.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${o.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      H ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: H }) : null
    ] })
  ] });
}
export {
  Xt as TimesheetDevice
};
