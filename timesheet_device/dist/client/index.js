import _t, { useState as I, useRef as Ce, useCallback as M, useEffect as V, useMemo as et } from "react";
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
  function b(T, y, k) {
    var R, F = {}, G = null, Y = null;
    k !== void 0 && (G = "" + k), y.key !== void 0 && (G = "" + y.key), y.ref !== void 0 && (Y = y.ref);
    for (R in y) f.call(y, R) && !j.hasOwnProperty(R) && (F[R] = y[R]);
    if (T && T.defaultProps) for (R in y = T.defaultProps, y) F[R] === void 0 && (F[R] = y[R]);
    return { $$typeof: d, type: T, key: G, ref: Y, props: F, _owner: w.current };
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
    var c = _t, d = Symbol.for("react.element"), h = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), T = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), G = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), Se = Symbol.iterator, Ie = "@@iterator";
    function H(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Se && e[Se] || e[Ie];
      return typeof r == "function" ? r : null;
    }
    var Z = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function N(e) {
      {
        for (var r = arguments.length, l = new Array(r > 1 ? r - 1 : 0), m = 1; m < r; m++)
          l[m - 1] = arguments[m];
        Je("error", e, l);
      }
    }
    function Je(e, r, l) {
      {
        var m = Z.ReactDebugCurrentFrame, E = m.getStackAddendum();
        E !== "" && (r += "%s", l = l.concat([E]));
        var S = l.map(function(g) {
          return String(g);
        });
        S.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, S);
      }
    }
    var de = !1, Ge = !1, Fe = !1, Te = !1, J = !1, fe;
    fe = Symbol.for("react.module.reference");
    function Re(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === f || e === j || J || e === w || e === k || e === R || Te || e === Y || de || Ge || Fe || typeof e == "object" && e !== null && (e.$$typeof === G || e.$$typeof === F || e.$$typeof === b || e.$$typeof === T || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === fe || e.getModuleId !== void 0));
    }
    function me(e, r, l) {
      var m = e.displayName;
      if (m)
        return m;
      var E = r.displayName || r.name || "";
      return E !== "" ? l + "(" + E + ")" : l;
    }
    function ee(e) {
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
          case T:
            var r = e;
            return ee(r) + ".Consumer";
          case b:
            var l = e;
            return ee(l._context) + ".Provider";
          case y:
            return me(e, e.render, "ForwardRef");
          case F:
            var m = e.displayName || null;
            return m !== null ? m : A(e.type) || "Memo";
          case G: {
            var E = e, S = E._payload, g = E._init;
            try {
              return A(g(S));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, ae = 0, q, xe, oe, pe, he, je, Ne;
    function se() {
    }
    se.__reactDisabledLog = !0;
    function $e() {
      {
        if (ae === 0) {
          q = console.log, xe = console.info, oe = console.warn, pe = console.error, he = console.group, je = console.groupCollapsed, Ne = console.groupEnd;
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
        ae++;
      }
    }
    function B() {
      {
        if (ae--, ae === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, e, {
              value: q
            }),
            info: z({}, e, {
              value: xe
            }),
            warn: z({}, e, {
              value: oe
            }),
            error: z({}, e, {
              value: pe
            }),
            group: z({}, e, {
              value: he
            }),
            groupCollapsed: z({}, e, {
              value: je
            }),
            groupEnd: z({}, e, {
              value: Ne
            })
          });
        }
        ae < 0 && N("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = Z.ReactCurrentDispatcher, ve;
    function K(e, r, l) {
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
    var te = !1, X;
    {
      var Le = typeof WeakMap == "function" ? WeakMap : Map;
      X = new Le();
    }
    function Ye(e, r) {
      if (!e || te)
        return "";
      {
        var l = X.get(e);
        if (l !== void 0)
          return l;
      }
      var m;
      te = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var S;
      S = ie.current, ie.current = null, $e();
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
`), x = v.length - 1, C = $.length - 1; x >= 1 && C >= 0 && v[x] !== $[C]; )
            C--;
          for (; x >= 1 && C >= 0; x--, C--)
            if (v[x] !== $[C]) {
              if (x !== 1 || C !== 1)
                do
                  if (x--, C--, C < 0 || v[x] !== $[C]) {
                    var W = `
` + v[x].replace(" at new ", " at ");
                    return e.displayName && W.includes("<anonymous>") && (W = W.replace("<anonymous>", e.displayName)), typeof e == "function" && X.set(e, W), W;
                  }
                while (x >= 1 && C >= 0);
              break;
            }
        }
      } finally {
        te = !1, ie.current = S, B(), Error.prepareStackTrace = E;
      }
      var we = e ? e.displayName || e.name : "", ue = we ? K(we) : "";
      return typeof e == "function" && X.set(e, ue), ue;
    }
    function He(e, r, l) {
      return Ye(e, !1);
    }
    function ze(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ge(e, r, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ye(e, ze(e));
      if (typeof e == "string")
        return K(e);
      switch (e) {
        case k:
          return K("Suspense");
        case R:
          return K("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return He(e.render);
          case F:
            return ge(e.type, r, l);
          case G: {
            var m = e, E = m._payload, S = m._init;
            try {
              return ge(S(E), r, l);
            } catch {
            }
          }
        }
      return "";
    }
    var le = Object.prototype.hasOwnProperty, Ue = {}, Ve = Z.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var r = e._owner, l = ge(e.type, e._source, r ? r.type : null);
        Ve.setExtraStackFrame(l);
      } else
        Ve.setExtraStackFrame(null);
    }
    function qe(e, r, l, m, E) {
      {
        var S = Function.call.bind(le);
        for (var g in e)
          if (S(e, g)) {
            var v = void 0;
            try {
              if (typeof e[g] != "function") {
                var $ = Error((m || "React class") + ": " + l + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $.name = "Invariant Violation", $;
              }
              v = e[g](r, g, m, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              v = x;
            }
            v && !(v instanceof Error) && (be(E), N("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", l, g, typeof v), be(null)), v instanceof Error && !(v.message in Ue) && (Ue[v.message] = !0, be(E), N("Failed %s type: %s", l, v.message), be(null));
          }
      }
    }
    var De = Array.isArray;
    function Oe(e) {
      return De(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, l = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
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
    var n = Z.ReactCurrentOwner, a = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, s, i;
    function o(e) {
      if (le.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function p(e) {
      if (le.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function _(e, r) {
      typeof e.ref == "string" && n.current;
    }
    function L(e, r) {
      {
        var l = function() {
          s || (s = !0, N("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: l,
          configurable: !0
        });
      }
    }
    function D(e, r) {
      {
        var l = function() {
          i || (i = !0, N("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: l,
          configurable: !0
        });
      }
    }
    var O = function(e, r, l, m, E, S, g) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: l,
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
    function Q(e, r, l, m, E) {
      {
        var S, g = {}, v = null, $ = null;
        l !== void 0 && (t(l), v = "" + l), p(r) && (t(r.key), v = "" + r.key), o(r) && ($ = r.ref, _(r, E));
        for (S in r)
          le.call(r, S) && !a.hasOwnProperty(S) && (g[S] = r[S]);
        if (e && e.defaultProps) {
          var x = e.defaultProps;
          for (S in x)
            g[S] === void 0 && (g[S] = x[S]);
        }
        if (v || $) {
          var C = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && L(g, C), $ && D(g, C);
        }
        return O(e, v, $, E, m, n.current, g);
      }
    }
    var P = Z.ReactCurrentOwner, ye = Z.ReactDebugCurrentFrame;
    function ne(e) {
      if (e) {
        var r = e._owner, l = ge(e.type, e._source, r ? r.type : null);
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
        var r = lt();
        if (!r) {
          var l = typeof e == "string" ? e : e.displayName || e.name;
          l && (r = `

Check the top-level render call using <` + l + ">.");
        }
        return r;
      }
    }
    function ut(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var l = xt(r);
        if (ct[l])
          return;
        ct[l] = !0;
        var m = "";
        e && e._owner && e._owner !== P.current && (m = " It was passed a child from " + A(e._owner.type) + "."), ne(e), N('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, m), ne(null);
      }
    }
    function dt(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Oe(e))
          for (var l = 0; l < e.length; l++) {
            var m = e[l];
            Qe(m) && ut(m, r);
          }
        else if (Qe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var E = H(e);
          if (typeof E == "function" && E !== e.entries)
            for (var S = E.call(e), g; !(g = S.next()).done; )
              Qe(g.value) && ut(g.value, r);
        }
      }
    }
    function jt(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var l;
        if (typeof r == "function")
          l = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === F))
          l = r.propTypes;
        else
          return;
        if (l) {
          var m = A(r);
          qe(l, e.props, "prop", m, e);
        } else if (r.PropTypes !== void 0 && !Xe) {
          Xe = !0;
          var E = A(r);
          N("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && N("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Nt(e) {
      {
        for (var r = Object.keys(e.props), l = 0; l < r.length; l++) {
          var m = r[l];
          if (m !== "children" && m !== "key") {
            ne(e), N("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), ne(null);
            break;
          }
        }
        e.ref !== null && (ne(e), N("Invalid attribute `ref` supplied to `React.Fragment`."), ne(null));
      }
    }
    var ft = {};
    function mt(e, r, l, m, E, S) {
      {
        var g = Re(e);
        if (!g) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $ = Rt();
          $ ? v += $ : v += lt();
          var x;
          e === null ? x = "null" : Oe(e) ? x = "array" : e !== void 0 && e.$$typeof === d ? (x = "<" + (A(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : x = typeof e, N("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", x, v);
        }
        var C = Q(e, r, l, E, S);
        if (C == null)
          return C;
        if (g) {
          var W = r.children;
          if (W !== void 0)
            if (m)
              if (Oe(W)) {
                for (var we = 0; we < W.length; we++)
                  dt(W[we], e);
                Object.freeze && Object.freeze(W);
              } else
                N("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              dt(W, e);
        }
        if (le.call(r, "key")) {
          var ue = A(e), U = Object.keys(r).filter(function(At) {
            return At !== "key";
          }), Ze = U.length > 0 ? "{key: someKey, " + U.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ft[ue + Ze]) {
            var kt = U.length > 0 ? "{" + U.join(": ..., ") + ": ...}" : "{}";
            N(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ze, ue, kt, ue), ft[ue + Ze] = !0;
          }
        }
        return e === f ? Nt(C) : jt(C), C;
      }
    }
    function Lt(e, r, l) {
      return mt(e, r, l, !0);
    }
    function Dt(e, r, l) {
      return mt(e, r, l, !1);
    }
    var Ot = Dt, Ct = Lt;
    Ae.Fragment = f, Ae.jsx = Ot, Ae.jsxs = Ct;
  }()), Ae;
}
process.env.NODE_ENV === "production" ? st.exports = Pt() : st.exports = Mt();
var u = st.exports;
const _e = {}, St = "/api/imu/latest", It = "/api/imu/history", We = 12, Ft = 1e3, it = "dodec-labels", Tt = ["dodeca-labels"], vt = "dodec-activity-log", $t = "Side", Yt = 24 * 60 * 60 * 1e3, tt = "DODEC_LABEL_UPDATE", gt = "DODEC_LABELS_REQUEST", bt = (() => {
  const c = _e == null ? void 0 : _e.VITE_DEVICE_LABELS_URL;
  if (c && c.length > 0)
    return c;
  try {
    const d = new URL(St, "https://placeholder.local");
    return `${d.origin === "https://placeholder.local" ? "" : `${d.protocol}//${d.host}`}/api/labels`;
  } catch {
    return "/api/labels";
  }
})(), rt = (_e == null ? void 0 : _e.VITE_DEVICE_ACTIVITY_LOG_URL) ?? "/api/activity-log", Ut = 5 * 60 * 1e3, yt = (c) => {
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
      let T = 0, y = null;
      if (typeof b == "number")
        T = Number.isFinite(b) && b > 0 ? Math.floor(b) : 0;
      else if (b && typeof b == "object") {
        const k = b.totalMs, R = b.side;
        typeof k == "number" && Number.isFinite(k) && k > 0 && (T = Math.floor(k)), typeof R == "number" && Number.isFinite(R) && (y = Math.floor(R));
      }
      (T > 0 || y !== null) && (w[j] = { totalMs: T, side: y });
    }
    Object.keys(w).length > 0 && (d[h] = w);
  }
  return d;
}, Vt = Array.from({ length: We }, (c, d) => d + 1), nt = () => {
  const c = {};
  for (const d of Vt)
    c[d] = "";
  return c;
}, Bt = () => {
  if (typeof window > "u")
    return nt();
  const c = (h) => {
    try {
      const f = window.localStorage.getItem(h);
      if (!f)
        return null;
      const w = JSON.parse(f), j = nt();
      for (const [b, T] of Object.entries(w)) {
        const y = Number(b);
        Number.isFinite(y) && y >= 1 && y <= We && (j[y] = String(T ?? ""));
      }
      return j;
    } catch (f) {
      return console.warn("Unable to read stored labels", f), null;
    }
  }, d = c(it);
  if (d)
    return d;
  for (const h of Tt) {
    const f = c(h);
    if (f) {
      try {
        window.localStorage.setItem(it, JSON.stringify(f));
      } catch {
      }
      return f;
    }
  }
  return nt();
}, wt = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), at = (c, d) => {
  var f;
  const h = (f = c[d]) == null ? void 0 : f.trim();
  return h && h.length > 0 ? h : `${$t} ${d}`;
}, Wt = (c) => {
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
}, Jt = (c) => {
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
}, Gt = (c) => c ? c.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", Pe = (c) => {
  if (!Number.isFinite(c) || c <= 0)
    return "00:00";
  const d = Math.floor(c / 1e3), h = Math.floor(d / 3600), f = Math.floor(d % 3600 / 60), w = d % 60;
  return h > 0 ? `${String(h).padStart(2, "0")}:${String(f).padStart(2, "0")}:${String(w).padStart(2, "0")}` : `${String(f).padStart(2, "0")}:${String(w).padStart(2, "0")}`;
}, Ht = (c) => Pe(c), zt = (c) => {
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
    let j = 0, b = 0, T = 0;
    return w.length === 3 ? [j, b, T] = w : [b, T] = w, Math.max(0, j * 3600 + b * 60 + T) * 1e3;
  }
  const f = Number(d);
  return Number.isNaN(f) || f < 0 ? NaN : f * 60 * 1e3;
}, ot = (c) => c.includes('"') || c.includes(",") || c.includes(`
`) ? `"${c.replace(/"/g, '""')}"` : c;
function Kt() {
  const [c, d] = I(null), [h, f] = I(null), [w, j] = I(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(vt);
      return t ? yt(JSON.parse(t)) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), [b, T] = I(null), [y, k] = I(""), [R, F] = I(""), [G, Y] = I(null), [Se, Ie] = I(() => [Ee(Date.now())]), [H, Z] = I("week"), [N, Je] = I(Ee(Date.now())), [de, Ge] = I(Ee(Date.now())), [Fe, Te] = I(null), [J, fe] = I(() => Bt()), Re = Ce(J), me = Ce(!1), ee = Ce({}), A = Ce(wt()), [z, ae] = I(!1), [q, xe] = I(!1), [oe, pe] = I(!1), he = Ce(!1), je = M((t, n, a, s) => {
    s <= a || j((i) => {
      const o = { ...i };
      let p = a;
      for (; p < s; ) {
        const _ = Ee(p), { end: L } = Be(_), D = Math.min(s, L), O = Math.max(0, D - p);
        if (O > 0) {
          const Q = { ...o[_] ?? {} }, P = Q[t], ye = ((P == null ? void 0 : P.totalMs) ?? 0) + O, ne = n ?? (P == null ? void 0 : P.side) ?? null;
          Q[t] = { totalMs: ye, side: ne }, o[_] = Q;
        }
        p = D;
      }
      return o;
    });
  }, []), Ne = M(() => {
    A.current = wt(), j(() => ({}));
  }, []), se = M(
    (t) => {
      const n = typeof t.side == "number" ? t.side : null;
      if (!n)
        return;
      const a = at(Re.current, n), s = Wt(t), i = t.segment_started_at ? Jt(t.segment_started_at) : null, o = A.current;
      if (o.currentLabel === null || o.startTime === null) {
        o.currentLabel = a, o.startTime = i ?? s, o.lastTimestamp = s, o.lastSide = n;
        return;
      }
      if (a === o.currentLabel) {
        i !== null && (o.startTime === null || i < o.startTime) && (o.startTime = i), o.lastTimestamp = s, o.lastSide = n;
        return;
      }
      const p = o.startTime, _ = s;
      _ > p && je(o.currentLabel, o.lastSide, p, _), o.currentLabel = a, o.startTime = i ?? s, o.lastTimestamp = s, o.lastSide = n;
    },
    [je]
  );
  V(() => {
    if (Re.current = J, typeof window < "u") {
      const n = JSON.stringify(J);
      window.localStorage.setItem(it, n);
      for (const a of Tt)
        window.localStorage.setItem(a, n);
      !me.current && window.parent && window.parent !== window && window.parent.postMessage({ type: tt, labels: J }, "*");
    }
    me.current = !1;
    const t = A.current;
    t.lastSide !== null && (t.currentLabel = at(J, t.lastSide));
  }, [J]), V(() => {
    typeof window < "u" && window.localStorage.setItem(vt, JSON.stringify(w));
  }, [w]), V(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(rt, { cache: "no-store" });
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
  }, []), V(() => () => {
    if (!(typeof window > "u"))
      for (const t of Object.keys(ee.current)) {
        const n = ee.current[Number(t)];
        typeof n == "number" && window.clearTimeout(n);
      }
  }, []), V(() => {
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
            const O = typeof L == "string" ? L : "";
            o[D] !== O && (o[D] = O, p = !0);
          }
          return p ? o : i;
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
    const t = (n) => {
      const a = n == null ? void 0 : n.data;
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
        } else a.type === gt && window.parent && window.parent !== window && window.parent.postMessage({ type: tt, labels: Re.current }, n.origin || "*");
    };
    return window.addEventListener("message", t), window.parent && window.parent !== window && window.parent.postMessage({ type: gt }, "*"), () => {
      window.removeEventListener("message", t);
    };
  }, []), V(() => {
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
        t || ae(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [se, Ne]), V(() => {
    if (!z)
      return;
    let t = !0;
    const n = async () => {
      try {
        const s = await fetch(St, { cache: "no-store" });
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
    n();
    const a = window.setInterval(n, Ft);
    return () => {
      t = !1, window.clearInterval(a);
    };
  }, [se, z]);
  const $e = A.current, B = $e.lastTimestamp ? Ee($e.lastTimestamp) : Ee(Date.now());
  V(() => {
    Ie((t) => t.includes(B) ? t : [...t, B]);
  }, [B]);
  const ie = M(async (t, n) => {
    try {
      const a = await fetch(`${bt.replace(/\/$/, "")}/${t}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: n })
      });
      if (!a.ok)
        throw new Error(`Failed to persist label (status ${a.status})`);
    } catch (a) {
      console.error(`[timesheet-app] failed to persist label for side ${t}`, a);
    }
  }, []), ve = M((t, n) => {
    const a = n.trim();
    if (typeof window > "u") {
      ie(t, a);
      return;
    }
    const s = ee.current[t];
    typeof s == "number" && window.clearTimeout(s), ee.current[t] = window.setTimeout(() => {
      ee.current[t] = null, ie(t, a);
    }, 400);
  }, [ie]);
  M(
    (t) => (n) => {
      const a = n.target.value;
      fe((s) => ({ ...s, [t]: a })), ve(t, a);
    },
    [ve]
  );
  const K = (t, n) => {
    const a = A.current;
    if (!a.currentLabel || a.currentLabel !== n || a.startTime === null || a.lastTimestamp === null)
      return 0;
    const { start: s, end: i } = Be(t), o = Math.max(s, a.startTime), p = Math.min(i, a.lastTimestamp);
    return p > o ? p - o : 0;
  }, te = M(
    (t) => {
      const n = w[t] ?? {}, a = Object.entries(n).map(([i, o]) => ({
        label: i,
        totalMs: o.totalMs,
        side: o.side ?? null
      })), s = A.current;
      if (s.currentLabel && s.startTime !== null && s.lastTimestamp !== null) {
        const i = K(t, s.currentLabel);
        if (i > 0) {
          const o = a.find((_) => _.label === s.currentLabel), p = s.lastSide;
          o ? (o.totalMs += i, o.side === null && (o.side = p)) : a.push({ label: s.currentLabel, totalMs: i, side: p ?? null });
        }
      }
      return a.sort((i, o) => o.totalMs - i.totalMs);
    },
    [w, c]
  ), X = et(() => {
    const t = new Set(Object.keys(w));
    return t.add(B), Array.from(t).sort((n, a) => n === a ? 0 : n > a ? -1 : 1);
  }, [w, B]), Le = et(() => X.map((t) => {
    const n = te(t);
    if (n.length === 0)
      return null;
    const a = n.reduce((s, i) => s + i.totalMs, 0);
    return { dateKey: t, rows: n, totalMs: a };
  }).filter(Boolean), [X, te]), Ye = M((t, n, a) => {
    if (A.current.currentLabel === n && t === B) {
      Y("Stop the current activity before editing it.");
      return;
    }
    T({ dateKey: t, originalLabel: n }), k(Ht(a)), F(n), Y(null);
  }, [B]), He = M((t) => {
    k(t.target.value);
  }, []), ze = M((t) => {
    F(t.target.value);
  }, []), ge = M(() => {
    T(null), k(""), F(""), Y(null);
  }, []), le = M(() => {
    if (!b)
      return;
    const { dateKey: t, originalLabel: n } = b, a = zt(y);
    if (!Number.isFinite(a)) {
      Y("Please enter duration as mm:ss, hh:mm:ss, or minutes.");
      return;
    }
    const s = R.trim();
    if (s.length === 0) {
      Y("Activity name cannot be empty.");
      return;
    }
    const i = K(t, n);
    if (a < i) {
      Y(`Duration cannot be less than the active segment (${Pe(i)}).`);
      return;
    }
    const o = Math.max(0, a - i);
    j((p) => {
      const _ = { ...p }, L = { ..._[t] ?? {} }, D = L[n];
      if (D && delete L[n], o > 0) {
        const O = L[s], Q = ((O == null ? void 0 : O.totalMs) ?? 0) + o, P = s === n ? (D == null ? void 0 : D.side) ?? (O == null ? void 0 : O.side) ?? null : (O == null ? void 0 : O.side) ?? (D == null ? void 0 : D.side) ?? null;
        L[s] = { totalMs: Q, side: P };
      }
      return Object.keys(L).length === 0 ? delete _[t] : _[t] = L, _;
    }), T(null), k(""), F(""), Y(null);
  }, [b, y, R, K]), Ue = M(
    (t, n) => {
      if (K(t, n) > 0) {
        Y("Stop the current activity before deleting it.");
        return;
      }
      j((s) => {
        const i = s[t];
        if (!i || !(n in i))
          return s;
        const o = { ...s }, p = { ...i };
        return delete p[n], Object.keys(p).length === 0 ? delete o[t] : o[t] = p, o;
      }), b && b.dateKey === t && b.originalLabel === n && (T(null), k(""), F("")), Y(null);
    },
    [b]
  ), Ve = M((t) => {
    Ie((n) => n.includes(t) ? n.filter((a) => a !== t) : [...n, t]);
  }, []), be = () => {
    if (H === "week") {
      const { start: i, end: o } = Be(B), p = new Date(i);
      return p.setDate(p.getDate() - 6), { start: new Date(p.getFullYear(), p.getMonth(), p.getDate()).getTime(), end: o };
    }
    if (H === "month") {
      const i = Me(B), o = new Date(i.getFullYear(), i.getMonth(), 1).getTime(), p = new Date(i.getFullYear(), i.getMonth() + 1, 1).getTime();
      return { start: o, end: p };
    }
    const t = Me(N), n = Me(de);
    if (Number.isNaN(t.getTime()) || Number.isNaN(n.getTime()) || t > n)
      return null;
    const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), s = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1).getTime();
    return { start: a, end: s };
  }, qe = M(() => {
    const t = be();
    if (!t) {
      Te("Please provide a valid date range before downloading.");
      return;
    }
    const n = [];
    for (const _ of X) {
      const { start: L, end: D } = Be(_);
      if (D <= t.start || L >= t.end)
        continue;
      const O = te(_);
      if (O.length === 0)
        continue;
      const Q = Et(_);
      for (const P of O) {
        const ye = P.side !== null ? `Side ${P.side}` : "";
        n.push(`${ot(Q)},${ot(P.label)},${ot(ye)},${Pe(P.totalMs)}`);
      }
    }
    if (n.length === 0) {
      Te("No activity recorded in the selected range.");
      return;
    }
    const a = ["Date,Activity,Side,Duration", ...n].join(`
`), s = new Blob([a], { type: "text/csv;charset=utf-8;" }), i = URL.createObjectURL(s), o = document.createElement("a");
    o.href = i;
    const p = H === "custom" ? "custom" : H;
    o.download = `activity-log-${p}.csv`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i), Te(null);
  }, [te, H, X, N, de]), De = (c == null ? void 0 : c.side) ?? null, Oe = et(() => De === null ? null : at(J, De), [De, J]), Ke = (c == null ? void 0 : c.imu_timestamp_text) ?? (c == null ? void 0 : c.imu_timestamp_iso) ?? (c == null ? void 0 : c.received_at) ?? null, re = M(async (t = !1) => {
    if (!(!q || !oe && !t))
      try {
        const n = await fetch(rt, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries: w })
        });
        if (!n.ok)
          throw new Error(`Activity log sync failed with status ${n.status}`);
        pe(!1);
      } catch (n) {
        console.warn("[activity-log] failed to sync activity log", n);
      }
  }, [w, q, oe]);
  V(() => {
    if (q) {
      if (he.current) {
        he.current = !1;
        return;
      }
      pe(!0), re(!0);
    }
  }, [w, q, re]), V(() => {
    if (!q || typeof window > "u")
      return;
    const t = window.setInterval(() => {
      re();
    }, Ut);
    return () => window.clearInterval(t);
  }, [q, re]), V(() => {
    if (typeof window > "u")
      return;
    const t = () => {
      if (oe) {
        if (navigator.sendBeacon)
          try {
            const n = new Blob([JSON.stringify({ entries: w })], { type: "application/json" });
            navigator.sendBeacon(rt, n);
            return;
          } catch (n) {
            console.warn("[activity-log] sendBeacon flush failed", n);
          }
        re(!0);
      }
    };
    return window.addEventListener("pagehide", t), window.addEventListener("beforeunload", t), () => {
      window.removeEventListener("pagehide", t), window.removeEventListener("beforeunload", t);
    };
  }, [w, oe, re]);
  const ce = M(() => {
    var s, i, o;
    if (typeof window > "u" || window.parent === window)
      return;
    const t = window.document, n = ((s = t.documentElement) == null ? void 0 : s.scrollHeight) || ((i = t.body) == null ? void 0 : i.scrollHeight) || window.innerHeight, a = Math.max(320, Math.min(Math.ceil(n), 4e3));
    (o = window.parent) == null || o.postMessage({ type: "EMBED_HEIGHT", height: a }, "*");
  }, []);
  return V(() => {
    ce();
  }, [ce, Le.length, Se, J, b, H]), V(() => {
    if (typeof window > "u")
      return;
    const t = () => ce();
    window.addEventListener("load", t), window.addEventListener("resize", t);
    let n = null;
    return typeof ResizeObserver < "u" && (n = new ResizeObserver(t), n.observe(window.document.documentElement)), () => {
      window.removeEventListener("load", t), window.removeEventListener("resize", t), n == null || n.disconnect();
    };
  }, [ce]), /* @__PURE__ */ u.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ u.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Gt(Ke) })
      ] }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Oe ?? "Waiting for data?" })
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
              value: H,
              onChange: (t) => Z(t.target.value),
              children: [
                /* @__PURE__ */ u.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ u.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ u.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        H === "custom" ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
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
      Le.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : Le.map(({ dateKey: t, rows: n, totalMs: a }) => {
        const s = Se.includes(t), i = A.current;
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
                    n.length,
                    " activit",
                    n.length === 1 ? "y" : "ies",
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
            /* @__PURE__ */ u.jsx("tbody", { children: n.map((o) => {
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
      G ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: G }) : null
    ] })
  ] });
}
export {
  Kt as TimesheetDevice
};
