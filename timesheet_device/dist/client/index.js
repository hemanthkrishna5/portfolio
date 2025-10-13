import Dt, { useState as L, useRef as Q, useCallback as j, useEffect as G, useMemo as gt } from "react";
var St = { exports: {} }, $e = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _t;
function At() {
  if (_t) return $e;
  _t = 1;
  var c = Dt, f = Symbol.for("react.element"), h = Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, S = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, A = { key: !0, ref: !0, __self: !0, __source: !0 };
  function _(w, y, I) {
    var R, W = {}, Y = null, ce = null;
    I !== void 0 && (Y = "" + I), y.key !== void 0 && (Y = "" + y.key), y.ref !== void 0 && (ce = y.ref);
    for (R in y) p.call(y, R) && !A.hasOwnProperty(R) && (W[R] = y[R]);
    if (w && w.defaultProps) for (R in y = w.defaultProps, y) W[R] === void 0 && (W[R] = y[R]);
    return { $$typeof: f, type: w, key: Y, ref: ce, props: W, _owner: S.current };
  }
  return $e.Fragment = h, $e.jsx = _, $e.jsxs = _, $e;
}
var Ue = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rt;
function It() {
  return Rt || (Rt = 1, process.env.NODE_ENV !== "production" && function() {
    var c = Dt, f = Symbol.for("react.element"), h = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), _ = Symbol.for("react.provider"), w = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), ce = Symbol.for("react.offscreen"), H = Symbol.iterator, We = "@@iterator";
    function Le(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = H && e[H] || e[We];
      return typeof n == "function" ? n : null;
    }
    var M = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function O(e) {
      {
        for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), m = 1; m < n; m++)
          o[m - 1] = arguments[m];
        ve("error", e, o);
      }
    }
    function ve(e, n, o) {
      {
        var m = M.ReactDebugCurrentFrame, b = m.getStackAddendum();
        b !== "" && (n += "%s", o = o.concat([b]));
        var T = o.map(function(v) {
          return String(v);
        });
        T.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, T);
      }
    }
    var st = !1, be = !1, ot = !1, He = !1, Oe = !1, re;
    re = Symbol.for("react.module.reference");
    function ke(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === p || e === A || Oe || e === S || e === I || e === R || He || e === ce || st || be || ot || typeof e == "object" && e !== null && (e.$$typeof === Y || e.$$typeof === W || e.$$typeof === _ || e.$$typeof === w || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === re || e.getModuleId !== void 0));
    }
    function te(e, n, o) {
      var m = e.displayName;
      if (m)
        return m;
      var b = n.displayName || n.name || "";
      return b !== "" ? o + "(" + b + ")" : o;
    }
    function Pe(e) {
      return e.displayName || "Context";
    }
    function z(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && O("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case p:
          return "Fragment";
        case h:
          return "Portal";
        case A:
          return "Profiler";
        case S:
          return "StrictMode";
        case I:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case w:
            var n = e;
            return Pe(n) + ".Consumer";
          case _:
            var o = e;
            return Pe(o._context) + ".Provider";
          case y:
            return te(e, e.render, "ForwardRef");
          case W:
            var m = e.displayName || null;
            return m !== null ? m : z(e.type) || "Memo";
          case Y: {
            var b = e, T = b._payload, v = b._init;
            try {
              return z(v(T));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var k = Object.assign, F = 0, we, Ee, ue, ne, $, q, Ae;
    function Je() {
    }
    Je.__reactDisabledLog = !0;
    function Ge() {
      {
        if (F === 0) {
          we = console.log, Ee = console.info, ue = console.warn, ne = console.error, $ = console.group, q = console.groupCollapsed, Ae = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Je,
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
        F++;
      }
    }
    function Se() {
      {
        if (F--, F === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: k({}, e, {
              value: we
            }),
            info: k({}, e, {
              value: Ee
            }),
            warn: k({}, e, {
              value: ue
            }),
            error: k({}, e, {
              value: ne
            }),
            group: k({}, e, {
              value: $
            }),
            groupCollapsed: k({}, e, {
              value: q
            }),
            groupEnd: k({}, e, {
              value: Ae
            })
          });
        }
        F < 0 && O("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ze = M.ReactCurrentDispatcher, Te;
    function J(e, n, o) {
      {
        if (Te === void 0)
          try {
            throw Error();
          } catch (b) {
            var m = b.stack.trim().match(/\n( *(at )?)/);
            Te = m && m[1] || "";
          }
        return `
` + Te + e;
      }
    }
    var Z = !1, ae;
    {
      var it = typeof WeakMap == "function" ? WeakMap : Map;
      ae = new it();
    }
    function fe(e, n) {
      if (!e || Z)
        return "";
      {
        var o = ae.get(e);
        if (o !== void 0)
          return o;
      }
      var m;
      Z = !0;
      var b = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var T;
      T = ze.current, ze.current = null, Ge();
      try {
        if (n) {
          var v = function() {
            throw Error();
          };
          if (Object.defineProperty(v.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(v, []);
            } catch (B) {
              m = B;
            }
            Reflect.construct(e, [], v);
          } else {
            try {
              v.call();
            } catch (B) {
              m = B;
            }
            e.call(v.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (B) {
            m = B;
          }
          e();
        }
      } catch (B) {
        if (B && m && typeof B.stack == "string") {
          for (var g = B.stack.split(`
`), U = m.stack.split(`
`), x = g.length - 1, D = U.length - 1; x >= 1 && D >= 0 && g[x] !== U[D]; )
            D--;
          for (; x >= 1 && D >= 0; x--, D--)
            if (g[x] !== U[D]) {
              if (x !== 1 || D !== 1)
                do
                  if (x--, D--, D < 0 || g[x] !== U[D]) {
                    var X = `
` + g[x].replace(" at new ", " at ");
                    return e.displayName && X.includes("<anonymous>") && (X = X.replace("<anonymous>", e.displayName)), typeof e == "function" && ae.set(e, X), X;
                  }
                while (x >= 1 && D >= 0);
              break;
            }
        }
      } finally {
        Z = !1, ze.current = T, Se(), Error.prepareStackTrace = b;
      }
      var Ne = e ? e.displayName || e.name : "", ge = Ne ? J(Ne) : "";
      return typeof e == "function" && ae.set(e, ge), ge;
    }
    function qe(e, n, o) {
      return fe(e, !1);
    }
    function de(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function V(e, n, o) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return fe(e, de(e));
      if (typeof e == "string")
        return J(e);
      switch (e) {
        case I:
          return J("Suspense");
        case R:
          return J("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return qe(e.render);
          case W:
            return V(e.type, n, o);
          case Y: {
            var m = e, b = m._payload, T = m._init;
            try {
              return V(T(b), n, o);
            } catch {
            }
          }
        }
      return "";
    }
    var se = Object.prototype.hasOwnProperty, ee = {}, P = M.ReactDebugCurrentFrame;
    function me(e) {
      if (e) {
        var n = e._owner, o = V(e.type, e._source, n ? n.type : null);
        P.setExtraStackFrame(o);
      } else
        P.setExtraStackFrame(null);
    }
    function Ke(e, n, o, m, b) {
      {
        var T = Function.call.bind(se);
        for (var v in e)
          if (T(e, v)) {
            var g = void 0;
            try {
              if (typeof e[v] != "function") {
                var U = Error((m || "React class") + ": " + o + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw U.name = "Invariant Violation", U;
              }
              g = e[v](n, v, m, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              g = x;
            }
            g && !(g instanceof Error) && (me(b), O("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", o, v, typeof g), me(null)), g instanceof Error && !(g.message in ee) && (ee[g.message] = !0, me(b), O("Failed %s type: %s", o, g.message), me(null));
          }
      }
    }
    var Xe = Array.isArray;
    function oe(e) {
      return Xe(e);
    }
    function Qe(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, o = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return o;
      }
    }
    function K(e) {
      try {
        return _e(e), !1;
      } catch {
        return !0;
      }
    }
    function _e(e) {
      return "" + e;
    }
    function Ie(e) {
      if (K(e))
        return O("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), _e(e);
    }
    var ie = M.ReactCurrentOwner, Re = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, pe, je;
    function lt(e) {
      if (se.call(e, "ref")) {
        var n = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ct(e) {
      if (se.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ut(e, n) {
      typeof e.ref == "string" && ie.current;
    }
    function ft(e, n) {
      {
        var o = function() {
          pe || (pe = !0, O("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
    }
    function xe(e, n) {
      {
        var o = function() {
          je || (je = !0, O("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: o,
          configurable: !0
        });
      }
    }
    var dt = function(e, n, o, m, b, T, v) {
      var g = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: e,
        key: n,
        ref: o,
        props: v,
        // Record the component responsible for creating this element.
        _owner: T
      };
      return g._store = {}, Object.defineProperty(g._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(g, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(g, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.freeze && (Object.freeze(g.props), Object.freeze(g)), g;
    };
    function mt(e, n, o, m, b) {
      {
        var T, v = {}, g = null, U = null;
        o !== void 0 && (Ie(o), g = "" + o), ct(n) && (Ie(n.key), g = "" + n.key), lt(n) && (U = n.ref, ut(n, b));
        for (T in n)
          se.call(n, T) && !Re.hasOwnProperty(T) && (v[T] = n[T]);
        if (e && e.defaultProps) {
          var x = e.defaultProps;
          for (T in x)
            v[T] === void 0 && (v[T] = x[T]);
        }
        if (g || U) {
          var D = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          g && ft(v, D), U && xe(v, D);
        }
        return dt(e, g, U, b, m, ie.current, v);
      }
    }
    var Me = M.ReactCurrentOwner, Ze = M.ReactDebugCurrentFrame;
    function le(e) {
      if (e) {
        var n = e._owner, o = V(e.type, e._source, n ? n.type : null);
        Ze.setExtraStackFrame(o);
      } else
        Ze.setExtraStackFrame(null);
    }
    var he;
    he = !1;
    function Fe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === f;
    }
    function et() {
      {
        if (Me.current) {
          var e = z(Me.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function pt(e) {
      return "";
    }
    var tt = {};
    function Ce(e) {
      {
        var n = et();
        if (!n) {
          var o = typeof e == "string" ? e : e.displayName || e.name;
          o && (n = `

Check the top-level render call using <` + o + ">.");
        }
        return n;
      }
    }
    function t(e, n) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var o = Ce(n);
        if (tt[o])
          return;
        tt[o] = !0;
        var m = "";
        e && e._owner && e._owner !== Me.current && (m = " It was passed a child from " + z(e._owner.type) + "."), le(e), O('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', o, m), le(null);
      }
    }
    function r(e, n) {
      {
        if (typeof e != "object")
          return;
        if (oe(e))
          for (var o = 0; o < e.length; o++) {
            var m = e[o];
            Fe(m) && t(m, n);
          }
        else if (Fe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var b = Le(e);
          if (typeof b == "function" && b !== e.entries)
            for (var T = b.call(e), v; !(v = T.next()).done; )
              Fe(v.value) && t(v.value, n);
        }
      }
    }
    function a(e) {
      {
        var n = e.type;
        if (n == null || typeof n == "string")
          return;
        var o;
        if (typeof n == "function")
          o = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === W))
          o = n.propTypes;
        else
          return;
        if (o) {
          var m = z(n);
          Ke(o, e.props, "prop", m, e);
        } else if (n.PropTypes !== void 0 && !he) {
          he = !0;
          var b = z(n);
          O("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", b || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && O("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function s(e) {
      {
        for (var n = Object.keys(e.props), o = 0; o < n.length; o++) {
          var m = n[o];
          if (m !== "children" && m !== "key") {
            le(e), O("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), le(null);
            break;
          }
        }
        e.ref !== null && (le(e), O("Invalid attribute `ref` supplied to `React.Fragment`."), le(null));
      }
    }
    var l = {};
    function i(e, n, o, m, b, T) {
      {
        var v = ke(e);
        if (!v) {
          var g = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (g += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var U = pt();
          U ? g += U : g += et();
          var x;
          e === null ? x = "null" : oe(e) ? x = "array" : e !== void 0 && e.$$typeof === f ? (x = "<" + (z(e.type) || "Unknown") + " />", g = " Did you accidentally export a JSX literal instead of a component?") : x = typeof e, O("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", x, g);
        }
        var D = mt(e, n, o, b, T);
        if (D == null)
          return D;
        if (v) {
          var X = n.children;
          if (X !== void 0)
            if (m)
              if (oe(X)) {
                for (var Ne = 0; Ne < X.length; Ne++)
                  r(X[Ne], e);
                Object.freeze && Object.freeze(X);
              } else
                O("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              r(X, e);
        }
        if (se.call(n, "key")) {
          var ge = z(e), B = Object.keys(n).filter(function(Pt) {
            return Pt !== "key";
          }), ht = B.length > 0 ? "{key: someKey, " + B.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!l[ge + ht]) {
            var kt = B.length > 0 ? "{" + B.join(": ..., ") + ": ...}" : "{}";
            O(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ht, ge, kt, ge), l[ge + ht] = !0;
          }
        }
        return e === p ? s(D) : a(D), D;
      }
    }
    function d(e, n, o) {
      return i(e, n, o, !0);
    }
    function E(e, n, o) {
      return i(e, n, o, !1);
    }
    var C = E, N = d;
    Ue.Fragment = p, Ue.jsx = C, Ue.jsxs = N;
  }()), Ue;
}
process.env.NODE_ENV === "production" ? St.exports = At() : St.exports = It();
var u = St.exports;
const De = {}, Lt = "/api/imu/latest", Mt = "/api/imu/history", at = 12, Ft = 1e3, Tt = "dodec-labels", Ot = ["dodeca-labels"], jt = "dodec-activity-log", $t = "Side", Ut = 24 * 60 * 60 * 1e3, yt = "DODEC_LABEL_UPDATE", xt = "DODEC_LABELS_REQUEST", Ct = (() => {
  const c = De == null ? void 0 : De.VITE_DEVICE_LABELS_URL;
  if (c && c.length > 0)
    return c;
  try {
    const f = new URL(Lt, "https://placeholder.local");
    return `${f.origin === "https://placeholder.local" ? "" : `${f.protocol}//${f.host}`}/api/labels`;
  } catch {
    return "/api/labels";
  }
})(), Ye = (De == null ? void 0 : De.VITE_DEVICE_ACTIVITY_LOG_URL) ?? "/api/activity-log", rt = (c) => {
  const f = {};
  if (!c || typeof c != "object")
    return f;
  for (const [h, p] of Object.entries(c)) {
    if (typeof h != "string" || h.length === 0 || !p || typeof p != "object")
      continue;
    const S = {};
    for (const [A, _] of Object.entries(p)) {
      if (typeof A != "string" || A.length === 0)
        continue;
      let w = 0, y = null;
      if (typeof _ == "number")
        w = Number.isFinite(_) && _ > 0 ? Math.floor(_) : 0;
      else if (_ && typeof _ == "object") {
        const I = _.totalMs, R = _.side;
        typeof I == "number" && Number.isFinite(I) && I > 0 && (w = Math.floor(I)), typeof R == "number" && Number.isFinite(R) && (y = Math.floor(R));
      }
      (w > 0 || y !== null) && (S[A] = { totalMs: w, side: y });
    }
    Object.keys(S).length > 0 && (f[h] = S);
  }
  return f;
}, Yt = Array.from({ length: at }, (c, f) => f + 1), vt = () => {
  const c = {};
  for (const f of Yt)
    c[f] = "";
  return c;
}, Vt = () => {
  if (typeof window > "u")
    return vt();
  const c = (h) => {
    try {
      const p = window.localStorage.getItem(h);
      if (!p)
        return null;
      const S = JSON.parse(p), A = vt();
      for (const [_, w] of Object.entries(S)) {
        const y = Number(_);
        Number.isFinite(y) && y >= 1 && y <= at && (A[y] = String(w ?? ""));
      }
      return A;
    } catch (p) {
      return console.warn("Unable to read stored labels", p), null;
    }
  }, f = c(Tt);
  if (f)
    return f;
  for (const h of Ot) {
    const p = c(h);
    if (p) {
      try {
        window.localStorage.setItem(Tt, JSON.stringify(p));
      } catch {
      }
      return p;
    }
  }
  return vt();
}, bt = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), wt = (c, f) => {
  var p;
  const h = (p = c[f]) == null ? void 0 : p.trim();
  return h && h.length > 0 ? h : `${$t} ${f}`;
}, Bt = (c) => {
  const f = [c.received_at, c.imu_timestamp_iso];
  for (const h of f)
    if (h) {
      const p = Date.parse(h);
      if (!Number.isNaN(p))
        return p;
    }
  if (c.imu_timestamp_text) {
    const h = c.imu_timestamp_text.replace(" ", "T"), p = Date.parse(h);
    if (!Number.isNaN(p))
      return p;
  }
  return Date.now();
}, Wt = (c) => {
  if (!c)
    return null;
  const f = Date.parse(c);
  return Number.isNaN(f) ? null : f;
}, ye = (c) => {
  const f = new Date(c), h = f.getFullYear(), p = String(f.getMonth() + 1).padStart(2, "0"), S = String(f.getDate()).padStart(2, "0");
  return `${h}-${p}-${S}`;
}, Be = (c) => {
  const [f, h, p] = c.split("-").map(Number);
  return new Date(f, h - 1, p);
}, nt = (c) => {
  const f = Be(c), h = new Date(f.getFullYear(), f.getMonth(), f.getDate()).getTime(), p = h + Ut;
  return { start: h, end: p };
}, Nt = (c) => {
  const f = Be(c);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(f);
}, Ht = (c) => c ? c.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", Ve = (c) => {
  if (!Number.isFinite(c) || c <= 0)
    return "00:00";
  const f = Math.floor(c / 1e3), h = Math.floor(f / 3600), p = Math.floor(f % 3600 / 60), S = f % 60;
  return h > 0 ? `${String(h).padStart(2, "0")}:${String(p).padStart(2, "0")}:${String(S).padStart(2, "0")}` : `${String(p).padStart(2, "0")}:${String(S).padStart(2, "0")}`;
}, Jt = (c) => Ve(c), Gt = (c) => {
  const f = c.trim();
  if (!f)
    return NaN;
  const h = f.split(":");
  if (h.length > 1) {
    if (h.length > 3)
      return NaN;
    const S = h.map((y) => Number(y));
    if (S.some((y) => Number.isNaN(y) || y < 0))
      return NaN;
    let A = 0, _ = 0, w = 0;
    return S.length === 3 ? [A, _, w] = S : [_, w] = S, Math.max(0, A * 3600 + _ * 60 + w) * 1e3;
  }
  const p = Number(f);
  return Number.isNaN(p) || p < 0 ? NaN : p * 60 * 1e3;
}, Et = (c) => c.includes('"') || c.includes(",") || c.includes(`
`) ? `"${c.replace(/"/g, '""')}"` : c;
function qt() {
  const [c, f] = L(null), [h, p] = L(null), [S, A] = L(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(jt);
      return t ? rt(JSON.parse(t)) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), _ = Q(S), [w, y] = L(null), [I, R] = L(""), [W, Y] = L(""), [ce, H] = L(null), [We, Le] = L(() => [ye(Date.now())]), [M, O] = L("week"), [ve, st] = L(ye(Date.now())), [be, ot] = L(ye(Date.now())), [He, Oe] = L(null), [re, ke] = L(!1), [te, Pe] = L(!1), [z, k] = L(null), [F, we] = L(() => Vt()), Ee = Q(F), ue = Q(!1), ne = Q({}), $ = Q(null), q = Q(bt()), [Ae, Je] = L(!1), [Ge, Se] = L(!1), [ze, Te] = L(!1), J = Q(!1), Z = Q(!1), ae = Q(0), it = Q(!1), fe = Q(null), [qe, de] = L(!1), V = Q(!1), se = j(() => {
    J.current || (J.current = !0, Te(!0));
  }, []), ee = j(() => {
    J.current && (J.current = !1, Te(!1));
  }, []), P = j(
    (t, r) => {
      A((a) => {
        const s = t(a);
        return _.current = s, ((r == null ? void 0 : r.markDirty) ?? !0) && !V.current && s !== a && (Ge || (Z.current = !0), se()), s;
      });
    },
    [Ge, se]
  ), me = j(
    async (t) => {
      const r = (t == null ? void 0 : t.allowSkip) ?? !0, a = ae.current + 1;
      ae.current = a;
      const s = await fetch(Ye, { cache: "no-store" });
      if (!s.ok)
        throw new Error(`Activity log request failed with status ${s.status}`);
      const l = await s.json(), i = typeof (l == null ? void 0 : l.historyCutoffIso) == "string" && l.historyCutoffIso.length > 0 ? l.historyCutoffIso : null;
      if (fe.current = i, a !== ae.current)
        return !1;
      if (l && typeof l == "object" && l.entries) {
        if (r && Z.current)
          return console.warn("[activity-log] skipped applying remote log because local edits occurred first"), Z.current = !1, Se(!0), J.current || ee(), !1;
        it.current = !0, P(() => rt(l.entries), { markDirty: !1 });
      }
      return Z.current = !1, Se(!0), J.current || ee(), !0;
    },
    [P, ee]
  );
  G(() => {
    _.current = S;
  }, [S]);
  const Ke = j((t, r, a, s) => {
    s <= a || V.current || P((l) => {
      const i = { ...l };
      let d = a;
      for (; d < s; ) {
        const E = ye(d), { end: C } = nt(E), N = Math.min(s, C), e = Math.max(0, N - d);
        if (e > 0) {
          const n = { ...i[E] ?? {} }, o = n[t], m = ((o == null ? void 0 : o.totalMs) ?? 0) + e, b = r ?? (o == null ? void 0 : o.side) ?? null;
          n[t] = { totalMs: m, side: b }, i[E] = n;
        }
        d = N;
      }
      return i;
    });
  }, [P, V]), Xe = j(() => {
    q.current = bt(), !V.current && P(() => ({}));
  }, [P, V]), oe = j(
    (t) => {
      const r = typeof t.side == "number" ? t.side : null;
      if (!r)
        return;
      const a = wt(Ee.current, r), s = Bt(t), l = t.segment_started_at ? Wt(t.segment_started_at) : null, i = q.current;
      if (i.currentLabel === null || i.startTime === null) {
        i.currentLabel = a, i.startTime = l ?? s, i.lastTimestamp = s, i.lastSide = r;
        return;
      }
      if (a === i.currentLabel) {
        l !== null && (i.startTime === null || l < i.startTime) && (i.startTime = l), i.lastTimestamp = s, i.lastSide = r;
        return;
      }
      const d = i.startTime, E = s;
      E > d && Ke(i.currentLabel, i.lastSide, d, E), i.currentLabel = a, i.startTime = l ?? s, i.lastTimestamp = s, i.lastSide = r;
    },
    [Ke]
  );
  G(() => {
    if (Ee.current = F, typeof window < "u") {
      const r = JSON.stringify(F);
      window.localStorage.setItem(Tt, r);
      for (const a of Ot)
        window.localStorage.setItem(a, r);
      !ue.current && window.parent && window.parent !== window && window.parent.postMessage({ type: yt, labels: F }, "*");
    }
    ue.current = !1;
    const t = q.current;
    t.lastSide !== null && (t.currentLabel = wt(F, t.lastSide));
  }, [F]), G(() => {
    typeof window < "u" && window.localStorage.setItem(jt, JSON.stringify(S));
  }, [S]), G(() => {
    let t = !1;
    return (async () => {
      try {
        await me({ allowSkip: !0 });
      } catch (a) {
        t || (console.warn("[activity-log] failed to load activity log from server", a), Z.current = !1, Se(!0));
      } finally {
        t || de(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [me]), G(() => () => {
    if (!(typeof window > "u")) {
      for (const t of Object.keys(ne.current)) {
        const r = ne.current[Number(t)];
        typeof r == "number" && window.clearTimeout(r);
      }
      $.current !== null && window.clearTimeout($.current);
    }
  }, []), G(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(Ct, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`Failed to load labels (status ${a.status})`);
        const s = await a.json();
        if (t || !s || typeof s.labels != "object" || s.labels === null)
          return;
        ue.current = !0, we((l) => {
          const i = { ...l };
          let d = !1;
          for (const [E, C] of Object.entries(s.labels)) {
            const N = Number(E);
            if (!Number.isFinite(N) || N < 1 || N > at)
              continue;
            const e = typeof C == "string" ? C : "";
            i[N] !== e && (i[N] = e, d = !0);
          }
          return d ? i : l;
        });
      } catch (a) {
        console.error("[timesheet-app] failed to load labels from server", a);
      }
    })(), () => {
      t = !0;
    };
  }, []), G(() => {
    if (typeof window > "u")
      return;
    const t = (r) => {
      const a = r == null ? void 0 : r.data;
      if (!(!a || typeof a != "object"))
        if (a.type === yt && a.labels && typeof a.labels == "object") {
          ue.current = !0;
          const s = a.labels;
          we((l) => {
            const i = { ...l };
            for (const [d, E] of Object.entries(s)) {
              const C = Number(d);
              !Number.isFinite(C) || C < 1 || C > at || (i[C] = typeof E == "string" ? E : "");
            }
            return { ...i };
          });
        } else a.type === xt && window.parent && window.parent !== window && window.parent.postMessage({ type: yt, labels: Ee.current }, r.origin || "*");
    };
    return window.addEventListener("message", t), window.parent && window.parent !== window && window.parent.postMessage({ type: xt }, "*"), () => {
      window.removeEventListener("message", t);
    };
  }, []), G(() => {
    if (!qe)
      return;
    let t = !1;
    return (async () => {
      V.current = !0;
      try {
        const a = new URLSearchParams({ limit: "5000" }), s = fe.current;
        s && a.set("since", s);
        const l = await fetch(`${Mt}?${a.toString()}`, { cache: "no-store" });
        if (!l.ok)
          throw new Error(`History request failed with status ${l.status}`);
        const i = await l.json();
        if (t)
          return;
        Xe();
        let d = null;
        for (const E of i) {
          if (t)
            break;
          oe(E), d = E;
        }
        d && f({
          side: typeof d.side == "number" ? d.side : null,
          imu_timestamp_text: d.imu_timestamp_text ?? null,
          imu_timestamp_iso: d.imu_timestamp_iso ?? null,
          received_at: d.received_at ?? null,
          confidence: d.confidence ?? null
        }), p(null);
      } catch (a) {
        t || p(a instanceof Error ? a.message : "Unknown error while loading history");
      } finally {
        V.current = !1, t || Je(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [oe, qe, Xe]), G(() => {
    if (!Ae)
      return;
    let t = !0;
    const r = async () => {
      try {
        const s = await fetch(Lt, { cache: "no-store" });
        if (!s.ok)
          throw new Error(`Request failed with status ${s.status}`);
        const l = await s.json();
        if (!t)
          return;
        oe(l), f({
          side: typeof l.side == "number" ? l.side : null,
          imu_timestamp_text: l.imu_timestamp_text ?? null,
          imu_timestamp_iso: l.imu_timestamp_iso ?? null,
          received_at: l.received_at ?? null,
          confidence: l.confidence ?? null
        }), p(null);
      } catch (s) {
        t && p(s instanceof Error ? s.message : "Unknown error");
      }
    };
    r();
    const a = window.setInterval(r, Ft);
    return () => {
      t = !1, window.clearInterval(a);
    };
  }, [oe, Ae]);
  const Qe = q.current, K = Qe.lastTimestamp ? ye(Qe.lastTimestamp) : ye(Date.now());
  G(() => {
    Le((t) => t.includes(K) ? t : [...t, K]);
  }, [K]);
  const _e = j(async (t, r) => {
    try {
      const a = await fetch(`${Ct.replace(/\/$/, "")}/${t}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: r })
      });
      if (!a.ok)
        throw new Error(`Failed to persist label (status ${a.status})`);
    } catch (a) {
      console.error(`[timesheet-app] failed to persist label for side ${t}`, a);
    }
  }, []), Ie = j((t, r) => {
    const a = r.trim();
    if (typeof window > "u") {
      _e(t, a);
      return;
    }
    const s = ne.current[t];
    typeof s == "number" && window.clearTimeout(s), ne.current[t] = window.setTimeout(() => {
      ne.current[t] = null, _e(t, a);
    }, 400);
  }, [_e]);
  j(
    (t) => (r) => {
      const a = r.target.value;
      we((s) => ({ ...s, [t]: a })), Ie(t, a);
    },
    [Ie]
  );
  const ie = (t, r) => {
    const a = q.current;
    if (!a.currentLabel || a.currentLabel !== r || a.startTime === null || a.lastTimestamp === null)
      return 0;
    const { start: s, end: l } = nt(t), i = Math.max(s, a.startTime), d = Math.min(l, a.lastTimestamp);
    return d > i ? d - i : 0;
  }, Re = j(
    (t) => {
      const r = S[t] ?? {}, a = Object.entries(r).map(([l, i]) => ({
        label: l,
        totalMs: i.totalMs,
        side: i.side ?? null
      })), s = q.current;
      if (s.currentLabel && s.startTime !== null && s.lastTimestamp !== null) {
        const l = ie(t, s.currentLabel);
        if (l > 0) {
          const i = a.find((E) => E.label === s.currentLabel), d = s.lastSide;
          i ? (i.totalMs += l, i.side === null && (i.side = d)) : a.push({ label: s.currentLabel, totalMs: l, side: d ?? null });
        }
      }
      return a.sort((l, i) => i.totalMs - l.totalMs);
    },
    [S, c]
  ), pe = gt(() => {
    const t = new Set(Object.keys(S));
    return t.add(K), Array.from(t).sort((r, a) => r === a ? 0 : r > a ? -1 : 1);
  }, [S, K]), je = gt(() => pe.map((t) => {
    const r = Re(t);
    if (r.length === 0)
      return null;
    const a = r.reduce((s, l) => s + l.totalMs, 0);
    return { dateKey: t, rows: r, totalMs: a };
  }).filter(Boolean), [pe, Re]), lt = j((t, r, a) => {
    if (q.current.currentLabel === r && t === K) {
      H("Stop the current activity before editing it.");
      return;
    }
    y({ dateKey: t, originalLabel: r }), R(Jt(a)), Y(r), H(null);
  }, [K]), ct = j((t) => {
    R(t.target.value);
  }, []), ut = j((t) => {
    Y(t.target.value);
  }, []), ft = j(() => {
    y(null), R(""), Y(""), H(null);
  }, []), xe = j(() => {
    if (!w)
      return !0;
    const { dateKey: t, originalLabel: r } = w, a = Gt(I);
    if (!Number.isFinite(a))
      return H("Please enter duration as mm:ss, hh:mm:ss, or minutes."), !1;
    const s = W.trim();
    if (s.length === 0)
      return H("Activity name cannot be empty."), !1;
    const l = ie(t, r);
    if (a < l)
      return H(`Duration cannot be less than the active segment (${Ve(l)}).`), !1;
    const i = Math.max(0, a - l);
    return P((d) => {
      const E = { ...d }, C = { ...E[t] ?? {} }, N = C[r];
      if (N && delete C[r], i > 0) {
        const e = C[s], n = ((e == null ? void 0 : e.totalMs) ?? 0) + i, o = s === r ? (N == null ? void 0 : N.side) ?? (e == null ? void 0 : e.side) ?? null : (e == null ? void 0 : e.side) ?? (N == null ? void 0 : N.side) ?? null;
        C[s] = { totalMs: n, side: o };
      }
      return Object.keys(C).length === 0 ? delete E[t] : E[t] = C, E;
    }), y(null), R(""), Y(""), H(null), !0;
  }, [P, w, I, W, ie]), dt = j(() => {
    xe();
  }, [xe]), mt = j(
    (t, r) => {
      if (ie(t, r) > 0) {
        H("Stop the current activity before deleting it.");
        return;
      }
      P((s) => {
        const l = s[t];
        if (!l || !(r in l))
          return s;
        const i = { ...s }, d = { ...l };
        return delete d[r], Object.keys(d).length === 0 ? delete i[t] : i[t] = d, i;
      }), w && w.dateKey === t && w.originalLabel === r && (y(null), R(""), Y("")), H(null);
    },
    [P, w, ie]
  ), Me = j((t) => {
    Le((r) => r.includes(t) ? r.filter((a) => a !== t) : [...r, t]);
  }, []), Ze = () => {
    if (M === "week") {
      const { start: l, end: i } = nt(K), d = new Date(l);
      return d.setDate(d.getDate() - 6), { start: new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), end: i };
    }
    if (M === "month") {
      const l = Be(K), i = new Date(l.getFullYear(), l.getMonth(), 1).getTime(), d = new Date(l.getFullYear(), l.getMonth() + 1, 1).getTime();
      return { start: i, end: d };
    }
    const t = Be(ve), r = Be(be);
    if (Number.isNaN(t.getTime()) || Number.isNaN(r.getTime()) || t > r)
      return null;
    const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), s = new Date(r.getFullYear(), r.getMonth(), r.getDate() + 1).getTime();
    return { start: a, end: s };
  }, le = j(() => {
    const t = Ze();
    if (!t) {
      Oe("Please provide a valid date range before downloading.");
      return;
    }
    const r = [];
    for (const E of pe) {
      const { start: C, end: N } = nt(E);
      if (N <= t.start || C >= t.end)
        continue;
      const e = Re(E);
      if (e.length === 0)
        continue;
      const n = Nt(E);
      for (const o of e) {
        const m = o.side !== null ? `Side ${o.side}` : "";
        r.push(`${Et(n)},${Et(o.label)},${Et(m)},${Ve(o.totalMs)}`);
      }
    }
    if (r.length === 0) {
      Oe("No activity recorded in the selected range.");
      return;
    }
    const a = ["Date,Activity,Side,Duration", ...r].join(`
`), s = new Blob([a], { type: "text/csv;charset=utf-8;" }), l = URL.createObjectURL(s), i = document.createElement("a");
    i.href = l;
    const d = M === "custom" ? "custom" : M;
    i.download = `activity-log-${d}.csv`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(l), Oe(null);
  }, [Re, M, pe, ve, be]), he = (c == null ? void 0 : c.side) ?? null, Fe = gt(() => he === null ? null : wt(F, he), [he, F]), et = (c == null ? void 0 : c.imu_timestamp_text) ?? (c == null ? void 0 : c.imu_timestamp_iso) ?? (c == null ? void 0 : c.received_at) ?? null, pt = j(async () => {
    if (re || te)
      return;
    if (ke(!0), k(null), typeof window < "u" && $.current !== null && (window.clearTimeout($.current), $.current = null), !xe()) {
      k({ type: "error", message: "Please finish editing or fix validation errors before saving." }), ke(!1);
      return;
    }
    const r = _.current;
    try {
      const a = await fetch(Ye, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: r })
      });
      if (!a.ok)
        throw new Error(`Activity log sync failed with status ${a.status}`);
      try {
        const s = await a.json();
        if (s && typeof s == "object") {
          s.entries && P(() => rt(s.entries), { markDirty: !1 });
          const l = typeof s.historyCutoffIso == "string" && s.historyCutoffIso.length > 0 ? s.historyCutoffIso : null;
          fe.current = l, de(!0);
        }
      } catch {
      }
      ee(), k({ type: "success", message: "Activity log saved." }), typeof window < "u" && ($.current = window.setTimeout(() => {
        k(null), $.current = null;
      }, 4e3));
    } catch (a) {
      console.warn("[activity-log] failed to save activity log", a), k({ type: "error", message: "Unable to save activity log. Please try again." });
    } finally {
      ke(!1);
    }
  }, [P, xe, ee, te, re, de]), tt = j(async () => {
    if (!te && !(typeof window < "u" && !window.confirm("This will delete all activity log entries. Continue?"))) {
      typeof window < "u" && $.current !== null && (window.clearTimeout($.current), $.current = null), k(null), Pe(!0);
      try {
        const t = await fetch(Ye, { method: "DELETE" });
        if (!t.ok)
          throw new Error(`Activity log clear failed with status ${t.status}`);
        let r = null;
        try {
          r = await t.json();
        } catch {
          r = null;
        }
        V.current = !0, q.current = bt(), P(() => r && r.entries && typeof r.entries == "object" ? rt(r.entries) : {}, { markDirty: !1 });
        const a = r && typeof r.historyCutoffIso == "string" && r.historyCutoffIso.length > 0 ? r.historyCutoffIso : (/* @__PURE__ */ new Date()).toISOString();
        fe.current = a, de(!0), Le([ye(Date.now())]), y(null), R(""), Y(""), H(null), ee(), Z.current = !1, J.current = !1, Se(!0), k({ type: "success", message: "Activity log cleared." }), typeof window < "u" && ($.current = window.setTimeout(() => {
          k(null), $.current = null;
        }, 4e3));
      } catch (t) {
        console.warn("[activity-log] failed to clear activity log", t), k({ type: "error", message: "Unable to clear activity log. Please try again." });
      } finally {
        V.current = !1, Pe(!1);
      }
    }
  }, [P, ee, te, de]);
  G(() => {
    if (typeof window > "u")
      return;
    const t = () => {
      if (J.current) {
        if (navigator.sendBeacon)
          try {
            const r = new Blob([JSON.stringify({ entries: _.current })], { type: "application/json" });
            navigator.sendBeacon(Ye, r);
            return;
          } catch (r) {
            console.warn("[activity-log] sendBeacon flush failed", r);
          }
        fetch(Ye, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries: _.current }),
          keepalive: !0
        });
      }
    };
    return window.addEventListener("pagehide", t), window.addEventListener("beforeunload", t), () => {
      window.removeEventListener("pagehide", t), window.removeEventListener("beforeunload", t);
    };
  }, []);
  const Ce = j(() => {
    var s, l, i;
    if (typeof window > "u" || window.parent === window)
      return;
    const t = window.document, r = ((s = t.documentElement) == null ? void 0 : s.scrollHeight) || ((l = t.body) == null ? void 0 : l.scrollHeight) || window.innerHeight, a = Math.max(320, Math.min(Math.ceil(r), 4e3));
    (i = window.parent) == null || i.postMessage({ type: "EMBED_HEIGHT", height: a }, "*");
  }, []);
  return G(() => {
    Ce();
  }, [Ce, je.length, We, F, w, M]), G(() => {
    if (typeof window > "u")
      return;
    const t = () => Ce();
    window.addEventListener("load", t), window.addEventListener("resize", t);
    let r = null;
    return typeof ResizeObserver < "u" && (r = new ResizeObserver(t), r.observe(window.document.documentElement)), () => {
      window.removeEventListener("load", t), window.removeEventListener("resize", t), r == null || r.disconnect();
    };
  }, [Ce]), /* @__PURE__ */ u.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ u.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Ht(et) })
      ] }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Fe ?? "Waiting for data?" })
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
              value: M,
              onChange: (t) => O(t.target.value),
              children: [
                /* @__PURE__ */ u.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ u.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ u.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        M === "custom" ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsxs("label", { className: "range-option", children: [
            "From",
            /* @__PURE__ */ u.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: ve,
                max: be,
                onChange: (t) => st(t.target.value)
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
                value: be,
                min: ve,
                onChange: (t) => ot(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "download-button push-right", onClick: le, children: "Download CSV" }),
        /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "download-button danger-button",
            onClick: tt,
            disabled: te || re,
            children: te ? "Clearing..." : "Clear All"
          }
        ),
        /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "download-button save-button",
            onClick: pt,
            disabled: re || te,
            children: re ? "Saving..." : "Save Changes"
          }
        )
      ] }),
      He ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: He }) : null,
      z ? /* @__PURE__ */ u.jsx("p", { className: z.type === "error" ? "error-text" : "success-text", children: z.message }) : null,
      je.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : je.map(({ dateKey: t, rows: r, totalMs: a }) => {
        const s = We.includes(t), l = q.current;
        return /* @__PURE__ */ u.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ u.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${s ? " date-header--expanded" : ""}`,
              onClick: () => Me(t),
              children: [
                /* @__PURE__ */ u.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ u.jsx("span", { className: "date-label", children: Nt(t) }),
                  /* @__PURE__ */ u.jsxs("span", { className: "date-summary", children: [
                    r.length,
                    " activit",
                    r.length === 1 ? "y" : "ies",
                    " - ",
                    Ve(a)
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
            /* @__PURE__ */ u.jsx("tbody", { children: r.map((i) => {
              const d = (w == null ? void 0 : w.dateKey) === t && w.originalLabel === i.label, E = l.currentLabel === i.label && t === K;
              return /* @__PURE__ */ u.jsxs("tr", { children: [
                /* @__PURE__ */ u.jsx("td", { children: d ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: W,
                    onChange: ut,
                    placeholder: "Activity name"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: i.label }) }),
                /* @__PURE__ */ u.jsx("td", { className: "side-cell", children: /* @__PURE__ */ u.jsx("span", { children: i.side !== null ? `Side ${i.side}` : "—" }) }),
                /* @__PURE__ */ u.jsx("td", { children: d ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: I,
                    onChange: ct,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: Ve(i.totalMs) }) }),
                /* @__PURE__ */ u.jsx("td", { className: "actions-cell", children: /* @__PURE__ */ u.jsx("div", { className: "action-buttons", children: d ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--primary",
                      onClick: dt,
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button", onClick: ft, children: "Cancel" })
                ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: E,
                      onClick: () => lt(t, i.label, i.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: E,
                      onClick: () => mt(t, i.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${i.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      ce ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: ce }) : null
    ] })
  ] });
}
export {
  qt as TimesheetDevice
};
