import ft, { useState as A, useRef as Ue, useCallback as M, useEffect as ie, useMemo as Ve } from "react";
var Ge = { exports: {} }, Ee = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function Ct() {
  if (at) return Ee;
  at = 1;
  var l = ft, m = Symbol.for("react.element"), g = Symbol.for("react.fragment"), d = Object.prototype.hasOwnProperty, _ = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, C = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(j, y, I) {
    var N, O = {}, V = null, k = null;
    I !== void 0 && (V = "" + I), y.key !== void 0 && (V = "" + y.key), y.ref !== void 0 && (k = y.ref);
    for (N in y) d.call(y, N) && !C.hasOwnProperty(N) && (O[N] = y[N]);
    if (j && j.defaultProps) for (N in y = j.defaultProps, y) O[N] === void 0 && (O[N] = y[N]);
    return { $$typeof: m, type: j, key: V, ref: k, props: O, _owner: _.current };
  }
  return Ee.Fragment = g, Ee.jsx = w, Ee.jsxs = w, Ee;
}
var _e = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var st;
function Ot() {
  return st || (st = 1, process.env.NODE_ENV !== "production" && function() {
    var l = ft, m = Symbol.for("react.element"), g = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), j = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), V = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), Se = Symbol.iterator, Re = "@@iterator";
    function B(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Se && e[Se] || e[Re];
      return typeof r == "function" ? r : null;
    }
    var q = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(e) {
      {
        for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), f = 1; f < r; f++)
          a[f - 1] = arguments[f];
        Oe("error", e, a);
      }
    }
    function Oe(e, r, a) {
      {
        var f = q.ReactDebugCurrentFrame, b = f.getStackAddendum();
        b !== "" && (r += "%s", a = a.concat([b]));
        var E = a.map(function(h) {
          return String(h);
        });
        E.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, E);
      }
    }
    var te = !1, Le = !1, Te = !1, ce = !1, W = !1, ue;
    ue = Symbol.for("react.module.reference");
    function fe(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === d || e === C || W || e === _ || e === I || e === N || ce || e === k || te || Le || Te || typeof e == "object" && e !== null && (e.$$typeof === V || e.$$typeof === O || e.$$typeof === w || e.$$typeof === j || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ue || e.getModuleId !== void 0));
    }
    function de(e, r, a) {
      var f = e.displayName;
      if (f)
        return f;
      var b = r.displayName || r.name || "";
      return b !== "" ? a + "(" + b + ")" : a;
    }
    function Y(e) {
      return e.displayName || "Context";
    }
    function U(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case d:
          return "Fragment";
        case g:
          return "Portal";
        case C:
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
          case j:
            var r = e;
            return Y(r) + ".Consumer";
          case w:
            var a = e;
            return Y(a._context) + ".Provider";
          case y:
            return de(e, e.render, "ForwardRef");
          case O:
            var f = e.displayName || null;
            return f !== null ? f : U(e.type) || "Memo";
          case V: {
            var b = e, E = b._payload, h = b._init;
            try {
              return U(h(E));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var J = Object.assign, z = 0, me, H, pe, F, K, X, Q;
    function ve() {
    }
    ve.__reactDisabledLog = !0;
    function ke() {
      {
        if (z === 0) {
          me = console.log, H = console.info, pe = console.warn, F = console.error, K = console.group, X = console.groupCollapsed, Q = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ve,
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
        z++;
      }
    }
    function Pe() {
      {
        if (z--, z === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: J({}, e, {
              value: me
            }),
            info: J({}, e, {
              value: H
            }),
            warn: J({}, e, {
              value: pe
            }),
            error: J({}, e, {
              value: F
            }),
            group: J({}, e, {
              value: K
            }),
            groupCollapsed: J({}, e, {
              value: X
            }),
            groupEnd: J({}, e, {
              value: Q
            })
          });
        }
        z < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var he = q.ReactCurrentDispatcher, ge;
    function re(e, r, a) {
      {
        if (ge === void 0)
          try {
            throw Error();
          } catch (b) {
            var f = b.stack.trim().match(/\n( *(at )?)/);
            ge = f && f[1] || "";
          }
        return `
` + ge + e;
      }
    }
    var be = !1, ne;
    {
      var Ae = typeof WeakMap == "function" ? WeakMap : Map;
      ne = new Ae();
    }
    function je(e, r) {
      if (!e || be)
        return "";
      {
        var a = ne.get(e);
        if (a !== void 0)
          return a;
      }
      var f;
      be = !0;
      var b = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var E;
      E = he.current, he.current = null, ke();
      try {
        if (r) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (P) {
              f = P;
            }
            Reflect.construct(e, [], h);
          } else {
            try {
              h.call();
            } catch (P) {
              f = P;
            }
            e.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (P) {
            f = P;
          }
          e();
        }
      } catch (P) {
        if (P && f && typeof P.stack == "string") {
          for (var v = P.stack.split(`
`), L = f.stack.split(`
`), x = v.length - 1, R = L.length - 1; x >= 1 && R >= 0 && v[x] !== L[R]; )
            R--;
          for (; x >= 1 && R >= 0; x--, R--)
            if (v[x] !== L[R]) {
              if (x !== 1 || R !== 1)
                do
                  if (x--, R--, R < 0 || v[x] !== L[R]) {
                    var $ = `
` + v[x].replace(" at new ", " at ");
                    return e.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", e.displayName)), typeof e == "function" && ne.set(e, $), $;
                  }
                while (x >= 1 && R >= 0);
              break;
            }
        }
      } finally {
        be = !1, he.current = E, Pe(), Error.prepareStackTrace = b;
      }
      var oe = e ? e.displayName || e.name : "", ee = oe ? re(oe) : "";
      return typeof e == "function" && ne.set(e, ee), ee;
    }
    function ye(e, r, a) {
      return je(e, !1);
    }
    function Fe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ae(e, r, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return je(e, Fe(e));
      if (typeof e == "string")
        return re(e);
      switch (e) {
        case I:
          return re("Suspense");
        case N:
          return re("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return ye(e.render);
          case O:
            return ae(e.type, r, a);
          case V: {
            var f = e, b = f._payload, E = f._init;
            try {
              return ae(E(b), r, a);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, s = {}, o = q.ReactDebugCurrentFrame;
    function c(e) {
      if (e) {
        var r = e._owner, a = ae(e.type, e._source, r ? r.type : null);
        o.setExtraStackFrame(a);
      } else
        o.setExtraStackFrame(null);
    }
    function n(e, r, a, f, b) {
      {
        var E = Function.call.bind(t);
        for (var h in e)
          if (E(e, h)) {
            var v = void 0;
            try {
              if (typeof e[h] != "function") {
                var L = Error((f || "React class") + ": " + a + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw L.name = "Invariant Violation", L;
              }
              v = e[h](r, h, f, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              v = x;
            }
            v && !(v instanceof Error) && (c(b), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", f || "React class", a, h, typeof v), c(null)), v instanceof Error && !(v.message in s) && (s[v.message] = !0, c(b), S("Failed %s type: %s", a, v.message), c(null));
          }
      }
    }
    var u = Array.isArray;
    function p(e) {
      return u(e);
    }
    function T(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, a = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function D(e) {
      try {
        return Z(e), !1;
      } catch {
        return !0;
      }
    }
    function Z(e) {
      return "" + e;
    }
    function G(e) {
      if (D(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", T(e)), Z(e);
    }
    var De = q.ReactCurrentOwner, Ne = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, He, Ke;
    function mt(e) {
      if (t.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function pt(e) {
      if (t.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function vt(e, r) {
      typeof e.ref == "string" && De.current;
    }
    function ht(e, r) {
      {
        var a = function() {
          He || (He = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function gt(e, r) {
      {
        var a = function() {
          Ke || (Ke = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var bt = function(e, r, a, f, b, E, h) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: m,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: a,
        props: h,
        // Record the component responsible for creating this element.
        _owner: E
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
        value: f
      }), Object.defineProperty(v, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    };
    function yt(e, r, a, f, b) {
      {
        var E, h = {}, v = null, L = null;
        a !== void 0 && (G(a), v = "" + a), pt(r) && (G(r.key), v = "" + r.key), mt(r) && (L = r.ref, vt(r, b));
        for (E in r)
          t.call(r, E) && !Ne.hasOwnProperty(E) && (h[E] = r[E]);
        if (e && e.defaultProps) {
          var x = e.defaultProps;
          for (E in x)
            h[E] === void 0 && (h[E] = x[E]);
        }
        if (v || L) {
          var R = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && ht(h, R), L && gt(h, R);
        }
        return bt(e, v, L, b, f, De.current, h);
      }
    }
    var Me = q.ReactCurrentOwner, Xe = q.ReactDebugCurrentFrame;
    function se(e) {
      if (e) {
        var r = e._owner, a = ae(e.type, e._source, r ? r.type : null);
        Xe.setExtraStackFrame(a);
      } else
        Xe.setExtraStackFrame(null);
    }
    var Ie;
    Ie = !1;
    function $e(e) {
      return typeof e == "object" && e !== null && e.$$typeof === m;
    }
    function Qe() {
      {
        if (Me.current) {
          var e = U(Me.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function Et(e) {
      return "";
    }
    var Ze = {};
    function _t(e) {
      {
        var r = Qe();
        if (!r) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (r = `

Check the top-level render call using <` + a + ">.");
        }
        return r;
      }
    }
    function et(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = _t(r);
        if (Ze[a])
          return;
        Ze[a] = !0;
        var f = "";
        e && e._owner && e._owner !== Me.current && (f = " It was passed a child from " + U(e._owner.type) + "."), se(e), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, f), se(null);
      }
    }
    function tt(e, r) {
      {
        if (typeof e != "object")
          return;
        if (p(e))
          for (var a = 0; a < e.length; a++) {
            var f = e[a];
            $e(f) && et(f, r);
          }
        else if ($e(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var b = B(e);
          if (typeof b == "function" && b !== e.entries)
            for (var E = b.call(e), h; !(h = E.next()).done; )
              $e(h.value) && et(h.value, r);
        }
      }
    }
    function wt(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var a;
        if (typeof r == "function")
          a = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === O))
          a = r.propTypes;
        else
          return;
        if (a) {
          var f = U(r);
          n(a, e.props, "prop", f, e);
        } else if (r.PropTypes !== void 0 && !Ie) {
          Ie = !0;
          var b = U(r);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", b || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xt(e) {
      {
        for (var r = Object.keys(e.props), a = 0; a < r.length; a++) {
          var f = r[a];
          if (f !== "children" && f !== "key") {
            se(e), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", f), se(null);
            break;
          }
        }
        e.ref !== null && (se(e), S("Invalid attribute `ref` supplied to `React.Fragment`."), se(null));
      }
    }
    var rt = {};
    function nt(e, r, a, f, b, E) {
      {
        var h = fe(e);
        if (!h) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var L = Et();
          L ? v += L : v += Qe();
          var x;
          e === null ? x = "null" : p(e) ? x = "array" : e !== void 0 && e.$$typeof === m ? (x = "<" + (U(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : x = typeof e, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", x, v);
        }
        var R = yt(e, r, a, b, E);
        if (R == null)
          return R;
        if (h) {
          var $ = r.children;
          if ($ !== void 0)
            if (f)
              if (p($)) {
                for (var oe = 0; oe < $.length; oe++)
                  tt($[oe], e);
                Object.freeze && Object.freeze($);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              tt($, e);
        }
        if (t.call(r, "key")) {
          var ee = U(e), P = Object.keys(r).filter(function(Nt) {
            return Nt !== "key";
          }), Ye = P.length > 0 ? "{key: someKey, " + P.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!rt[ee + Ye]) {
            var Dt = P.length > 0 ? "{" + P.join(": ..., ") + ": ...}" : "{}";
            S(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ye, ee, Dt, ee), rt[ee + Ye] = !0;
          }
        }
        return e === d ? xt(R) : wt(R), R;
      }
    }
    function St(e, r, a) {
      return nt(e, r, a, !0);
    }
    function Rt(e, r, a) {
      return nt(e, r, a, !1);
    }
    var Tt = Rt, jt = St;
    _e.Fragment = d, _e.jsx = Tt, _e.jsxs = jt;
  }()), _e;
}
process.env.NODE_ENV === "production" ? Ge.exports = Ct() : Ge.exports = Ot();
var i = Ge.exports;
const Lt = "/api/imu/latest", kt = "/api/imu/history", ze = 12, Pt = 1e3, qe = "dodec-labels", dt = ["dodeca-labels"], ot = "dodec-activity-log", At = "Side", Ft = 24 * 60 * 60 * 1e3, We = "DODEC_LABEL_UPDATE", it = "DODEC_LABELS_REQUEST", Mt = Array.from({ length: ze }, (l, m) => m + 1), Be = () => {
  const l = {};
  for (const m of Mt)
    l[m] = "";
  return l;
}, It = () => {
  if (typeof window > "u")
    return Be();
  const l = (g) => {
    try {
      const d = window.localStorage.getItem(g);
      if (!d)
        return null;
      const _ = JSON.parse(d), C = Be();
      for (const [w, j] of Object.entries(_)) {
        const y = Number(w);
        Number.isFinite(y) && y >= 1 && y <= ze && (C[y] = String(j ?? ""));
      }
      return C;
    } catch (d) {
      return console.warn("Unable to read stored labels", d), null;
    }
  }, m = l(qe);
  if (m)
    return m;
  for (const g of dt) {
    const d = l(g);
    if (d) {
      try {
        window.localStorage.setItem(qe, JSON.stringify(d));
      } catch {
      }
      return d;
    }
  }
  return Be();
}, lt = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), Je = (l, m) => {
  var d;
  const g = (d = l[m]) == null ? void 0 : d.trim();
  return g && g.length > 0 ? g : `${At} ${m}`;
}, $t = (l) => {
  const m = [l.received_at, l.imu_timestamp_iso];
  for (const g of m)
    if (g) {
      const d = Date.parse(g);
      if (!Number.isNaN(d))
        return d;
    }
  if (l.imu_timestamp_text) {
    const g = l.imu_timestamp_text.replace(" ", "T"), d = Date.parse(g);
    if (!Number.isNaN(d))
      return d;
  }
  return Date.now();
}, le = (l) => {
  const m = new Date(l), g = m.getFullYear(), d = String(m.getMonth() + 1).padStart(2, "0"), _ = String(m.getDate()).padStart(2, "0");
  return `${g}-${d}-${_}`;
}, xe = (l) => {
  const [m, g, d] = l.split("-").map(Number);
  return new Date(m, g - 1, d);
}, Ce = (l) => {
  const m = xe(l), g = new Date(m.getFullYear(), m.getMonth(), m.getDate()).getTime(), d = g + Ft;
  return { start: g, end: d };
}, ct = (l) => {
  const m = xe(l);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(m);
}, Yt = (l) => l ? l.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", we = (l) => {
  if (!Number.isFinite(l) || l <= 0)
    return "00:00";
  const m = Math.floor(l / 1e3), g = Math.floor(m / 3600), d = Math.floor(m % 3600 / 60), _ = m % 60;
  return g > 0 ? `${String(g).padStart(2, "0")}:${String(d).padStart(2, "0")}:${String(_).padStart(2, "0")}` : `${String(d).padStart(2, "0")}:${String(_).padStart(2, "0")}`;
}, Ut = (l) => we(l), Vt = (l) => {
  const m = l.trim();
  if (!m)
    return NaN;
  const g = m.split(":");
  if (g.length > 1) {
    if (g.length > 3)
      return NaN;
    const _ = g.map((y) => Number(y));
    if (_.some((y) => Number.isNaN(y) || y < 0))
      return NaN;
    let C = 0, w = 0, j = 0;
    return _.length === 3 ? [C, w, j] = _ : [w, j] = _, Math.max(0, C * 3600 + w * 60 + j) * 1e3;
  }
  const d = Number(m);
  return Number.isNaN(d) || d < 0 ? NaN : d * 60 * 1e3;
}, ut = (l) => l.includes('"') || l.includes(",") || l.includes(`
`) ? `"${l.replace(/"/g, '""')}"` : l;
function Bt() {
  const [l, m] = A(null), [g, d] = A(null), [_, C] = A(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(ot);
      return t ? JSON.parse(t) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), [w, j] = A(null), [y, I] = A(""), [N, O] = A(""), [V, k] = A(null), [Se, Re] = A(() => [le(Date.now())]), [B, q] = A("week"), [S, Oe] = A(le(Date.now())), [te, Le] = A(le(Date.now())), [Te, ce] = A(null), [W, ue] = A(() => It()), fe = Ue(W), de = Ue(!1), Y = Ue(lt()), [U, J] = A(!1), z = M((t, s, o) => {
    o <= s || C((c) => {
      const n = { ...c };
      let u = s;
      for (; u < o; ) {
        const p = le(u), { end: T } = Ce(p), D = Math.min(o, T), Z = Math.max(0, D - u);
        if (Z > 0) {
          const G = { ...n[p] ?? {} };
          G[t] = (G[t] ?? 0) + Z, n[p] = G;
        }
        u = D;
      }
      return n;
    });
  }, []), me = M(() => {
    Y.current = lt(), C(() => ({}));
  }, []), H = M(
    (t) => {
      const s = typeof t.side == "number" ? t.side : null;
      if (!s)
        return;
      const o = Je(fe.current, s), c = $t(t), n = Y.current;
      if (n.currentLabel === null || n.startTime === null) {
        n.currentLabel = o, n.startTime = c, n.lastTimestamp = c, n.lastSide = s;
        return;
      }
      if (o === n.currentLabel) {
        n.lastTimestamp = c, n.lastSide = s;
        return;
      }
      const u = n.startTime, p = c;
      p > u && z(n.currentLabel, u, p), n.currentLabel = o, n.startTime = c, n.lastTimestamp = c, n.lastSide = s;
    },
    [z]
  );
  ie(() => {
    if (fe.current = W, typeof window < "u") {
      const s = JSON.stringify(W);
      window.localStorage.setItem(qe, s);
      for (const o of dt)
        window.localStorage.setItem(o, s);
      !de.current && window.parent && window.parent !== window && window.parent.postMessage({ type: We, labels: W }, "*");
    }
    de.current = !1;
    const t = Y.current;
    t.lastSide !== null && (t.currentLabel = Je(W, t.lastSide));
  }, [W]), ie(() => {
    typeof window < "u" && window.localStorage.setItem(ot, JSON.stringify(_));
  }, [_]), ie(() => {
    if (typeof window > "u")
      return;
    const t = (s) => {
      const o = s == null ? void 0 : s.data;
      if (!(!o || typeof o != "object"))
        if (o.type === We && o.labels && typeof o.labels == "object") {
          de.current = !0;
          const c = o.labels;
          ue((n) => {
            const u = { ...n };
            for (const [p, T] of Object.entries(c)) {
              const D = Number(p);
              !Number.isFinite(D) || D < 1 || D > ze || (u[D] = typeof T == "string" ? T : "");
            }
            return { ...u };
          });
        } else o.type === it && window.parent && window.parent !== window && window.parent.postMessage({ type: We, labels: fe.current }, s.origin || "*");
    };
    return window.addEventListener("message", t), window.parent && window.parent !== window && window.parent.postMessage({ type: it }, "*"), () => {
      window.removeEventListener("message", t);
    };
  }, []), ie(() => {
    let t = !1;
    return (async () => {
      try {
        const o = await fetch(`${kt}?limit=5000`, { cache: "no-store" });
        if (!o.ok)
          throw new Error(`History request failed with status ${o.status}`);
        const c = await o.json();
        if (t)
          return;
        me();
        let n = null;
        for (const u of c) {
          if (t)
            break;
          H(u), n = u;
        }
        n && m({
          side: typeof n.side == "number" ? n.side : null,
          imu_timestamp_text: n.imu_timestamp_text ?? null,
          imu_timestamp_iso: n.imu_timestamp_iso ?? null,
          received_at: n.received_at ?? null,
          confidence: n.confidence ?? null
        }), d(null);
      } catch (o) {
        t || d(o instanceof Error ? o.message : "Unknown error while loading history");
      } finally {
        t || J(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [H, me]), ie(() => {
    if (!U)
      return;
    let t = !0;
    const s = async () => {
      try {
        const c = await fetch(Lt, { cache: "no-store" });
        if (!c.ok)
          throw new Error(`Request failed with status ${c.status}`);
        const n = await c.json();
        if (!t)
          return;
        H(n), m({
          side: typeof n.side == "number" ? n.side : null,
          imu_timestamp_text: n.imu_timestamp_text ?? null,
          imu_timestamp_iso: n.imu_timestamp_iso ?? null,
          received_at: n.received_at ?? null,
          confidence: n.confidence ?? null
        }), d(null);
      } catch (c) {
        t && d(c instanceof Error ? c.message : "Unknown error");
      }
    };
    s();
    const o = window.setInterval(s, Pt);
    return () => {
      t = !1, window.clearInterval(o);
    };
  }, [H, U]);
  const pe = Y.current, F = pe.lastTimestamp ? le(pe.lastTimestamp) : le(Date.now());
  ie(() => {
    Re((t) => t.includes(F) ? t : [...t, F]);
  }, [F]), M(
    (t) => (s) => {
      const o = s.target.value;
      ue((c) => ({ ...c, [t]: o }));
    },
    []
  );
  const K = (t, s) => {
    const o = Y.current;
    if (!o.currentLabel || o.currentLabel !== s || o.startTime === null || o.lastTimestamp === null)
      return 0;
    const { start: c, end: n } = Ce(t), u = Math.max(c, o.startTime), p = Math.min(n, o.lastTimestamp);
    return p > u ? p - u : 0;
  }, X = M(
    (t) => {
      const s = _[t] ?? {}, o = Object.entries(s).map(([n, u]) => ({ label: n, totalMs: u })), c = Y.current;
      if (c.currentLabel && c.startTime !== null && c.lastTimestamp !== null) {
        const n = K(t, c.currentLabel);
        if (n > 0) {
          const u = o.find((p) => p.label === c.currentLabel);
          u ? u.totalMs += n : o.push({ label: c.currentLabel, totalMs: n });
        }
      }
      return o.sort((n, u) => u.totalMs - n.totalMs);
    },
    [_, l]
  ), Q = Ve(() => {
    const t = new Set(Object.keys(_));
    return t.add(F), Array.from(t).sort((s, o) => s === o ? 0 : s > o ? -1 : 1);
  }, [_, F]), ve = Ve(() => Q.map((t) => {
    const s = X(t);
    if (s.length === 0)
      return null;
    const o = s.reduce((c, n) => c + n.totalMs, 0);
    return { dateKey: t, rows: s, totalMs: o };
  }).filter(Boolean), [Q, X]), ke = M((t, s, o) => {
    if (Y.current.currentLabel === s && t === F) {
      k("Stop the current activity before editing it.");
      return;
    }
    j({ dateKey: t, originalLabel: s }), I(Ut(o)), O(s), k(null);
  }, [F]), Pe = M((t) => {
    I(t.target.value);
  }, []), he = M((t) => {
    O(t.target.value);
  }, []), ge = M(() => {
    j(null), I(""), O(""), k(null);
  }, []), re = M(() => {
    if (!w)
      return;
    const { dateKey: t, originalLabel: s } = w, o = Vt(y);
    if (!Number.isFinite(o)) {
      k("Please enter duration as mm:ss, hh:mm:ss, or minutes.");
      return;
    }
    const c = N.trim();
    if (c.length === 0) {
      k("Activity name cannot be empty.");
      return;
    }
    const n = K(t, s);
    if (o < n) {
      k(`Duration cannot be less than the active segment (${we(n)}).`);
      return;
    }
    const u = Math.max(0, o - n);
    C((p) => {
      const T = { ...p }, D = { ...T[t] ?? {} };
      return s in D && delete D[s], u > 0 && (D[c] = (D[c] ?? 0) + u), Object.keys(D).length === 0 ? delete T[t] : T[t] = D, T;
    }), j(null), I(""), O(""), k(null);
  }, [w, y, N, K]), be = M(
    (t, s) => {
      if (K(t, s) > 0) {
        k("Stop the current activity before deleting it.");
        return;
      }
      C((c) => {
        const n = c[t];
        if (!n || !(s in n))
          return c;
        const u = { ...c }, p = { ...n };
        return delete p[s], Object.keys(p).length === 0 ? delete u[t] : u[t] = p, u;
      }), w && w.dateKey === t && w.originalLabel === s && (j(null), I(""), O("")), k(null);
    },
    [w]
  ), ne = M((t) => {
    Re((s) => s.includes(t) ? s.filter((o) => o !== t) : [...s, t]);
  }, []), Ae = () => {
    if (B === "week") {
      const { start: n, end: u } = Ce(F), p = new Date(n);
      return p.setDate(p.getDate() - 6), { start: new Date(p.getFullYear(), p.getMonth(), p.getDate()).getTime(), end: u };
    }
    if (B === "month") {
      const n = xe(F), u = new Date(n.getFullYear(), n.getMonth(), 1).getTime(), p = new Date(n.getFullYear(), n.getMonth() + 1, 1).getTime();
      return { start: u, end: p };
    }
    const t = xe(S), s = xe(te);
    if (Number.isNaN(t.getTime()) || Number.isNaN(s.getTime()) || t > s)
      return null;
    const o = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), c = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1).getTime();
    return { start: o, end: c };
  }, je = M(() => {
    const t = Ae();
    if (!t) {
      ce("Please provide a valid date range before downloading.");
      return;
    }
    const s = [];
    for (const T of Q) {
      const { start: D, end: Z } = Ce(T);
      if (Z <= t.start || D >= t.end)
        continue;
      const G = X(T);
      if (G.length === 0)
        continue;
      const De = ct(T);
      for (const Ne of G)
        s.push(`${ut(De)},${ut(Ne.label)},${we(Ne.totalMs)}`);
    }
    if (s.length === 0) {
      ce("No activity recorded in the selected range.");
      return;
    }
    const o = ["Date,Activity,Duration", ...s].join(`
`), c = new Blob([o], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(c), u = document.createElement("a");
    u.href = n;
    const p = B === "custom" ? "custom" : B;
    u.download = `activity-log-${p}.csv`, document.body.appendChild(u), u.click(), document.body.removeChild(u), URL.revokeObjectURL(n), ce(null);
  }, [X, B, Q, S, te]), ye = (l == null ? void 0 : l.side) ?? null, Fe = Ve(() => ye === null ? null : Je(W, ye), [ye, W]), ae = (l == null ? void 0 : l.imu_timestamp_text) ?? (l == null ? void 0 : l.imu_timestamp_iso) ?? (l == null ? void 0 : l.received_at) ?? null;
  return /* @__PURE__ */ i.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ i.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ i.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ i.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ i.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ i.jsx("span", { className: "status-value", children: Yt(ae) })
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ i.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ i.jsx("span", { className: "status-value", children: Fe ?? "Waiting for data?" })
      ] }),
      g ? /* @__PURE__ */ i.jsxs("p", { className: "error-text", children: [
        "Error: ",
        g
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "activity-summary", "aria-live": "polite", children: [
      /* @__PURE__ */ i.jsx("h2", { children: "Activity Log" }),
      /* @__PURE__ */ i.jsxs("div", { className: "range-controls", children: [
        /* @__PURE__ */ i.jsxs("label", { className: "range-option", children: [
          "Range",
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: "range-select",
              value: B,
              onChange: (t) => q(t.target.value),
              children: [
                /* @__PURE__ */ i.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ i.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ i.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        B === "custom" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
          /* @__PURE__ */ i.jsxs("label", { className: "range-option", children: [
            "From",
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: S,
                max: te,
                onChange: (t) => Oe(t.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ i.jsxs("label", { className: "range-option", children: [
            "To",
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: te,
                min: S,
                onChange: (t) => Le(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "download-button", onClick: je, children: "Download CSV" })
      ] }),
      Te ? /* @__PURE__ */ i.jsx("p", { className: "error-text", children: Te }) : null,
      ve.length === 0 ? /* @__PURE__ */ i.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : ve.map(({ dateKey: t, rows: s, totalMs: o }) => {
        const c = Se.includes(t), n = Y.current;
        return /* @__PURE__ */ i.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${c ? " date-header--expanded" : ""}`,
              onClick: () => ne(t),
              children: [
                /* @__PURE__ */ i.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ i.jsx("span", { className: "date-label", children: ct(t) }),
                  /* @__PURE__ */ i.jsxs("span", { className: "date-summary", children: [
                    s.length,
                    " activit",
                    s.length === 1 ? "y" : "ies",
                    " - ",
                    we(o)
                  ] })
                ] }),
                /* @__PURE__ */ i.jsx("span", { className: "date-header__icon", children: c ? "−" : "+" })
              ]
            }
          ),
          c ? /* @__PURE__ */ i.jsxs("table", { className: "activity-table", children: [
            /* @__PURE__ */ i.jsx("thead", { children: /* @__PURE__ */ i.jsxs("tr", { children: [
              /* @__PURE__ */ i.jsx("th", { scope: "col", children: "Activity" }),
              /* @__PURE__ */ i.jsx("th", { scope: "col", children: "Total Duration" }),
              /* @__PURE__ */ i.jsx("th", { scope: "col", className: "actions-heading", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ i.jsx("tbody", { children: s.map((u) => {
              const p = (w == null ? void 0 : w.dateKey) === t && w.originalLabel === u.label, T = n.currentLabel === u.label && t === F;
              return /* @__PURE__ */ i.jsxs("tr", { children: [
                /* @__PURE__ */ i.jsx("td", { children: p ? /* @__PURE__ */ i.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: N,
                    onChange: he,
                    placeholder: "Activity name"
                  }
                ) : /* @__PURE__ */ i.jsx("span", { children: u.label }) }),
                /* @__PURE__ */ i.jsx("td", { children: p ? /* @__PURE__ */ i.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: y,
                    onChange: Pe,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ i.jsx("span", { children: we(u.totalMs) }) }),
                /* @__PURE__ */ i.jsx("td", { className: "actions-cell", children: /* @__PURE__ */ i.jsx("div", { className: "action-buttons", children: p ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                  /* @__PURE__ */ i.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--primary",
                      onClick: re,
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ i.jsx("button", { type: "button", className: "icon-button", onClick: ge, children: "Cancel" })
                ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                  /* @__PURE__ */ i.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: T,
                      onClick: () => ke(t, u.label, u.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ i.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: T,
                      onClick: () => be(t, u.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${u.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      V ? /* @__PURE__ */ i.jsx("p", { className: "error-text", children: V }) : null
    ] })
  ] });
}
export {
  Bt as TimesheetDevice
};
