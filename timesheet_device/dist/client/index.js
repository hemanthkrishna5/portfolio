import it, { useState as P, useRef as Qe, useCallback as $, useEffect as de, useMemo as Me } from "react";
var Ye = { exports: {} }, me = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var et;
function jt() {
  if (et) return me;
  et = 1;
  var c = it, d = Symbol.for("react.element"), b = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, E = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, L = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(D, _, F) {
    var N, j = {}, V = null, G = null;
    F !== void 0 && (V = "" + F), _.key !== void 0 && (V = "" + _.key), _.ref !== void 0 && (G = _.ref);
    for (N in _) h.call(_, N) && !L.hasOwnProperty(N) && (j[N] = _[N]);
    if (D && D.defaultProps) for (N in _ = D.defaultProps, _) j[N] === void 0 && (j[N] = _[N]);
    return { $$typeof: d, type: D, key: V, ref: G, props: j, _owner: E.current };
  }
  return me.Fragment = b, me.jsx = x, me.jsxs = x, me;
}
var pe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tt;
function Dt() {
  return tt || (tt = 1, process.env.NODE_ENV !== "production" && function() {
    var c = it, d = Symbol.for("react.element"), b = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), L = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), D = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), V = Symbol.for("react.lazy"), G = Symbol.for("react.offscreen"), U = Symbol.iterator, we = "@@iterator";
    function Z(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = U && e[U] || e[we];
      return typeof r == "function" ? r : null;
    }
    var J = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function T(e) {
      {
        for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), f = 1; f < r; f++)
          a[f - 1] = arguments[f];
        Se("error", e, a);
      }
    }
    function Se(e, r, a) {
      {
        var f = J.ReactDebugCurrentFrame, g = f.getStackAddendum();
        g !== "" && (r += "%s", a = a.concat([g]));
        var y = a.map(function(v) {
          return String(v);
        });
        y.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var ge = !1, ie = !1, B = !1, je = !1, be = !1, I;
    I = Symbol.for("react.module.reference");
    function ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === L || be || e === E || e === F || e === N || je || e === G || ge || ie || B || typeof e == "object" && e !== null && (e.$$typeof === V || e.$$typeof === j || e.$$typeof === x || e.$$typeof === D || e.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === I || e.getModuleId !== void 0));
    }
    function De(e, r, a) {
      var f = e.displayName;
      if (f)
        return f;
      var g = r.displayName || r.name || "";
      return g !== "" ? a + "(" + g + ")" : a;
    }
    function le(e) {
      return e.displayName || "Context";
    }
    function Y(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && T("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case b:
          return "Portal";
        case L:
          return "Profiler";
        case E:
          return "StrictMode";
        case F:
          return "Suspense";
        case N:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case D:
            var r = e;
            return le(r) + ".Consumer";
          case x:
            var a = e;
            return le(a._context) + ".Provider";
          case _:
            return De(e, e.render, "ForwardRef");
          case j:
            var f = e.displayName || null;
            return f !== null ? f : Y(e.type) || "Memo";
          case V: {
            var g = e, y = g._payload, v = g._init;
            try {
              return Y(v(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, q = 0, k, Q, H, z, ce, _e, Ee;
    function xe() {
    }
    xe.__reactDisabledLog = !0;
    function Ne() {
      {
        if (q === 0) {
          k = console.log, Q = console.info, H = console.warn, z = console.error, ce = console.group, _e = console.groupCollapsed, Ee = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: xe,
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
        q++;
      }
    }
    function Ce() {
      {
        if (q--, q === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, e, {
              value: k
            }),
            info: A({}, e, {
              value: Q
            }),
            warn: A({}, e, {
              value: H
            }),
            error: A({}, e, {
              value: z
            }),
            group: A({}, e, {
              value: ce
            }),
            groupCollapsed: A({}, e, {
              value: _e
            }),
            groupEnd: A({}, e, {
              value: Ee
            })
          });
        }
        q < 0 && T("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ue = J.ReactCurrentDispatcher, fe;
    function ee(e, r, a) {
      {
        if (fe === void 0)
          try {
            throw Error();
          } catch (g) {
            var f = g.stack.trim().match(/\n( *(at )?)/);
            fe = f && f[1] || "";
          }
        return `
` + fe + e;
      }
    }
    var X = !1, te;
    {
      var Oe = typeof WeakMap == "function" ? WeakMap : Map;
      te = new Oe();
    }
    function t(e, r) {
      if (!e || X)
        return "";
      {
        var a = te.get(e);
        if (a !== void 0)
          return a;
      }
      var f;
      X = !0;
      var g = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = ue.current, ue.current = null, Ne();
      try {
        if (r) {
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
            } catch (O) {
              f = O;
            }
            Reflect.construct(e, [], v);
          } else {
            try {
              v.call();
            } catch (O) {
              f = O;
            }
            e.call(v.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (O) {
            f = O;
          }
          e();
        }
      } catch (O) {
        if (O && f && typeof O.stack == "string") {
          for (var p = O.stack.split(`
`), C = f.stack.split(`
`), R = p.length - 1, w = C.length - 1; R >= 1 && w >= 0 && p[R] !== C[w]; )
            w--;
          for (; R >= 1 && w >= 0; R--, w--)
            if (p[R] !== C[w]) {
              if (R !== 1 || w !== 1)
                do
                  if (R--, w--, w < 0 || p[R] !== C[w]) {
                    var M = `
` + p[R].replace(" at new ", " at ");
                    return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)), typeof e == "function" && te.set(e, M), M;
                  }
                while (R >= 1 && w >= 0);
              break;
            }
        }
      } finally {
        X = !1, ue.current = y, Ce(), Error.prepareStackTrace = g;
      }
      var se = e ? e.displayName || e.name : "", K = se ? ee(se) : "";
      return typeof e == "function" && te.set(e, K), K;
    }
    function s(e, r, a) {
      return t(e, !1);
    }
    function i(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function l(e, r, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return t(e, i(e));
      if (typeof e == "string")
        return ee(e);
      switch (e) {
        case F:
          return ee("Suspense");
        case N:
          return ee("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _:
            return s(e.render);
          case j:
            return l(e.type, r, a);
          case V: {
            var f = e, g = f._payload, y = f._init;
            try {
              return l(y(g), r, a);
            } catch {
            }
          }
        }
      return "";
    }
    var n = Object.prototype.hasOwnProperty, u = {}, m = J.ReactDebugCurrentFrame;
    function S(e) {
      if (e) {
        var r = e._owner, a = l(e.type, e._source, r ? r.type : null);
        m.setExtraStackFrame(a);
      } else
        m.setExtraStackFrame(null);
    }
    function re(e, r, a, f, g) {
      {
        var y = Function.call.bind(n);
        for (var v in e)
          if (y(e, v)) {
            var p = void 0;
            try {
              if (typeof e[v] != "function") {
                var C = Error((f || "React class") + ": " + a + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              p = e[v](r, v, f, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (R) {
              p = R;
            }
            p && !(p instanceof Error) && (S(g), T("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", f || "React class", a, v, typeof p), S(null)), p instanceof Error && !(p.message in u) && (u[p.message] = !0, S(g), T("Failed %s type: %s", a, p.message), S(null));
          }
      }
    }
    var ne = Array.isArray;
    function W(e) {
      return ne(e);
    }
    function ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, a = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Re(e) {
      try {
        return Ue(e), !1;
      } catch {
        return !0;
      }
    }
    function Ue(e) {
      return "" + e;
    }
    function We(e) {
      if (Re(e))
        return T("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ke(e)), Ue(e);
    }
    var Ve = J.ReactCurrentOwner, ct = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Be, Je;
    function ut(e) {
      if (n.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ft(e) {
      if (n.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function dt(e, r) {
      typeof e.ref == "string" && Ve.current;
    }
    function mt(e, r) {
      {
        var a = function() {
          Be || (Be = !0, T("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function pt(e, r) {
      {
        var a = function() {
          Je || (Je = !0, T("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var vt = function(e, r, a, f, g, y, v) {
      var p = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: a,
        props: v,
        // Record the component responsible for creating this element.
        _owner: y
      };
      return p._store = {}, Object.defineProperty(p._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(p, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: f
      }), Object.defineProperty(p, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: g
      }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
    };
    function ht(e, r, a, f, g) {
      {
        var y, v = {}, p = null, C = null;
        a !== void 0 && (We(a), p = "" + a), ft(r) && (We(r.key), p = "" + r.key), ut(r) && (C = r.ref, dt(r, g));
        for (y in r)
          n.call(r, y) && !ct.hasOwnProperty(y) && (v[y] = r[y]);
        if (e && e.defaultProps) {
          var R = e.defaultProps;
          for (y in R)
            v[y] === void 0 && (v[y] = R[y]);
        }
        if (p || C) {
          var w = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          p && mt(v, w), C && pt(v, w);
        }
        return vt(e, p, C, g, f, Ve.current, v);
      }
    }
    var Pe = J.ReactCurrentOwner, qe = J.ReactDebugCurrentFrame;
    function ae(e) {
      if (e) {
        var r = e._owner, a = l(e.type, e._source, r ? r.type : null);
        qe.setExtraStackFrame(a);
      } else
        qe.setExtraStackFrame(null);
    }
    var Le;
    Le = !1;
    function Fe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === d;
    }
    function Ge() {
      {
        if (Pe.current) {
          var e = Y(Pe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function gt(e) {
      return "";
    }
    var He = {};
    function bt(e) {
      {
        var r = Ge();
        if (!r) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (r = `

Check the top-level render call using <` + a + ">.");
        }
        return r;
      }
    }
    function ze(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = bt(r);
        if (He[a])
          return;
        He[a] = !0;
        var f = "";
        e && e._owner && e._owner !== Pe.current && (f = " It was passed a child from " + Y(e._owner.type) + "."), ae(e), T('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, f), ae(null);
      }
    }
    function Xe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (W(e))
          for (var a = 0; a < e.length; a++) {
            var f = e[a];
            Fe(f) && ze(f, r);
          }
        else if (Fe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var g = Z(e);
          if (typeof g == "function" && g !== e.entries)
            for (var y = g.call(e), v; !(v = y.next()).done; )
              Fe(v.value) && ze(v.value, r);
        }
      }
    }
    function yt(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var a;
        if (typeof r == "function")
          a = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === _ || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === j))
          a = r.propTypes;
        else
          return;
        if (a) {
          var f = Y(r);
          re(a, e.props, "prop", f, e);
        } else if (r.PropTypes !== void 0 && !Le) {
          Le = !0;
          var g = Y(r);
          T("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", g || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && T("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function _t(e) {
      {
        for (var r = Object.keys(e.props), a = 0; a < r.length; a++) {
          var f = r[a];
          if (f !== "children" && f !== "key") {
            ae(e), T("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", f), ae(null);
            break;
          }
        }
        e.ref !== null && (ae(e), T("Invalid attribute `ref` supplied to `React.Fragment`."), ae(null));
      }
    }
    var Ke = {};
    function Ze(e, r, a, f, g, y) {
      {
        var v = ye(e);
        if (!v) {
          var p = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var C = gt();
          C ? p += C : p += Ge();
          var R;
          e === null ? R = "null" : W(e) ? R = "array" : e !== void 0 && e.$$typeof === d ? (R = "<" + (Y(e.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : R = typeof e, T("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", R, p);
        }
        var w = ht(e, r, a, g, y);
        if (w == null)
          return w;
        if (v) {
          var M = r.children;
          if (M !== void 0)
            if (f)
              if (W(M)) {
                for (var se = 0; se < M.length; se++)
                  Xe(M[se], e);
                Object.freeze && Object.freeze(M);
              } else
                T("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Xe(M, e);
        }
        if (n.call(r, "key")) {
          var K = Y(e), O = Object.keys(r).filter(function(St) {
            return St !== "key";
          }), Ae = O.length > 0 ? "{key: someKey, " + O.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ke[K + Ae]) {
            var wt = O.length > 0 ? "{" + O.join(": ..., ") + ": ...}" : "{}";
            T(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ae, K, wt, K), Ke[K + Ae] = !0;
          }
        }
        return e === h ? _t(w) : yt(w), w;
      }
    }
    function Et(e, r, a) {
      return Ze(e, r, a, !0);
    }
    function xt(e, r, a) {
      return Ze(e, r, a, !1);
    }
    var Rt = xt, Tt = Et;
    pe.Fragment = h, pe.jsx = Rt, pe.jsxs = Tt;
  }()), pe;
}
process.env.NODE_ENV === "production" ? Ye.exports = jt() : Ye.exports = Dt();
var o = Ye.exports;
const Nt = "/api/imu/latest", Ct = "/api/imu/history", lt = 12, Ot = 1e3, rt = "dodec-labels", nt = "dodec-activity-log", kt = "Side", Pt = 24 * 60 * 60 * 1e3, Lt = Array.from({ length: lt }, (c, d) => d + 1), $e = () => {
  const c = {};
  for (const d of Lt)
    c[d] = "";
  return c;
}, at = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), Ie = (c, d) => {
  var h;
  const b = (h = c[d]) == null ? void 0 : h.trim();
  return b && b.length > 0 ? b : `${kt} ${d}`;
}, Ft = (c) => {
  const d = [c.received_at, c.imu_timestamp_iso];
  for (const b of d)
    if (b) {
      const h = Date.parse(b);
      if (!Number.isNaN(h))
        return h;
    }
  if (c.imu_timestamp_text) {
    const b = c.imu_timestamp_text.replace(" ", "T"), h = Date.parse(b);
    if (!Number.isNaN(h))
      return h;
  }
  return Date.now();
}, oe = (c) => {
  const d = new Date(c), b = d.getFullYear(), h = String(d.getMonth() + 1).padStart(2, "0"), E = String(d.getDate()).padStart(2, "0");
  return `${b}-${h}-${E}`;
}, he = (c) => {
  const [d, b, h] = c.split("-").map(Number);
  return new Date(d, b - 1, h);
}, Te = (c) => {
  const d = he(c), b = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), h = b + Pt;
  return { start: b, end: h };
}, st = (c) => {
  const d = he(c);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(d);
}, At = (c) => c ? c.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", ve = (c) => {
  if (!Number.isFinite(c) || c <= 0)
    return "00:00";
  const d = Math.floor(c / 1e3), b = Math.floor(d / 3600), h = Math.floor(d % 3600 / 60), E = d % 60;
  return b > 0 ? `${String(b).padStart(2, "0")}:${String(h).padStart(2, "0")}:${String(E).padStart(2, "0")}` : `${String(h).padStart(2, "0")}:${String(E).padStart(2, "0")}`;
}, Mt = (c) => ve(c), $t = (c) => {
  const d = c.trim();
  if (!d)
    return NaN;
  const b = d.split(":");
  if (b.length > 1) {
    if (b.length > 3)
      return NaN;
    const E = b.map((_) => Number(_));
    if (E.some((_) => Number.isNaN(_) || _ < 0))
      return NaN;
    let L = 0, x = 0, D = 0;
    return E.length === 3 ? [L, x, D] = E : [x, D] = E, Math.max(0, L * 3600 + x * 60 + D) * 1e3;
  }
  const h = Number(d);
  return Number.isNaN(h) || h < 0 ? NaN : h * 60 * 1e3;
}, ot = (c) => c.includes('"') || c.includes(",") || c.includes(`
`) ? `"${c.replace(/"/g, '""')}"` : c;
function Yt() {
  const [c, d] = P(null), [b, h] = P(null), [E, L] = P(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(nt);
      return t ? JSON.parse(t) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), [x, D] = P(null), [_, F] = P(""), [N, j] = P(null), [V, G] = P(() => [oe(Date.now())]), [U, we] = P("week"), [Z, J] = P(oe(Date.now())), [T, Se] = P(oe(Date.now())), [ge, ie] = P(null), [B, je] = P(() => {
    if (typeof window > "u")
      return $e();
    try {
      const t = window.localStorage.getItem(rt);
      if (t) {
        const s = JSON.parse(t), i = $e();
        for (const [l, n] of Object.entries(s)) {
          const u = Number(l);
          Number.isFinite(u) && u >= 1 && u <= lt && (i[u] = String(n));
        }
        return i;
      }
    } catch (t) {
      console.warn("Unable to read stored labels", t);
    }
    return $e();
  }), be = Qe(B), I = Qe(at()), [ye, De] = P(!1), le = $((t, s, i) => {
    i <= s || L((l) => {
      const n = { ...l };
      let u = s;
      for (; u < i; ) {
        const m = oe(u), { end: S } = Te(m), re = Math.min(i, S), ne = Math.max(0, re - u);
        if (ne > 0) {
          const W = { ...n[m] ?? {} };
          W[t] = (W[t] ?? 0) + ne, n[m] = W;
        }
        u = re;
      }
      return n;
    });
  }, []), Y = $(() => {
    I.current = at(), L(() => ({}));
  }, []), A = $(
    (t) => {
      const s = typeof t.side == "number" ? t.side : null;
      if (!s)
        return;
      const i = Ie(be.current, s), l = Ft(t), n = I.current;
      if (n.currentLabel === null || n.startTime === null) {
        n.currentLabel = i, n.startTime = l, n.lastTimestamp = l, n.lastSide = s;
        return;
      }
      if (i === n.currentLabel) {
        n.lastTimestamp = l, n.lastSide = s;
        return;
      }
      const u = n.startTime, m = l;
      m > u && le(n.currentLabel, u, m), n.currentLabel = i, n.startTime = l, n.lastTimestamp = l, n.lastSide = s;
    },
    [le]
  );
  de(() => {
    be.current = B, typeof window < "u" && window.localStorage.setItem(rt, JSON.stringify(B));
    const t = I.current;
    t.lastSide !== null && (t.currentLabel = Ie(B, t.lastSide));
  }, [B]), de(() => {
    typeof window < "u" && window.localStorage.setItem(nt, JSON.stringify(E));
  }, [E]), de(() => {
    let t = !1;
    return (async () => {
      try {
        const i = await fetch(`${Ct}?limit=5000`, { cache: "no-store" });
        if (!i.ok)
          throw new Error(`History request failed with status ${i.status}`);
        const l = await i.json();
        if (t)
          return;
        Y();
        let n = null;
        for (const u of l) {
          if (t)
            break;
          A(u), n = u;
        }
        n && d({
          side: typeof n.side == "number" ? n.side : null,
          imu_timestamp_text: n.imu_timestamp_text ?? null,
          imu_timestamp_iso: n.imu_timestamp_iso ?? null,
          received_at: n.received_at ?? null,
          confidence: n.confidence ?? null
        }), h(null);
      } catch (i) {
        t || h(i instanceof Error ? i.message : "Unknown error while loading history");
      } finally {
        t || De(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [A, Y]), de(() => {
    if (!ye)
      return;
    let t = !0;
    const s = async () => {
      try {
        const l = await fetch(Nt, { cache: "no-store" });
        if (!l.ok)
          throw new Error(`Request failed with status ${l.status}`);
        const n = await l.json();
        if (!t)
          return;
        A(n), d({
          side: typeof n.side == "number" ? n.side : null,
          imu_timestamp_text: n.imu_timestamp_text ?? null,
          imu_timestamp_iso: n.imu_timestamp_iso ?? null,
          received_at: n.received_at ?? null,
          confidence: n.confidence ?? null
        }), h(null);
      } catch (l) {
        t && h(l instanceof Error ? l.message : "Unknown error");
      }
    };
    s();
    const i = window.setInterval(s, Ot);
    return () => {
      t = !1, window.clearInterval(i);
    };
  }, [A, ye]);
  const q = I.current, k = q.lastTimestamp ? oe(q.lastTimestamp) : oe(Date.now());
  de(() => {
    G((t) => t.includes(k) ? t : [...t, k]);
  }, [k]), $(
    (t) => (s) => {
      const i = s.target.value;
      je((l) => ({ ...l, [t]: i }));
    },
    []
  );
  const Q = (t, s) => {
    const i = I.current;
    if (!i.currentLabel || i.currentLabel !== s || i.startTime === null || i.lastTimestamp === null)
      return 0;
    const { start: l, end: n } = Te(t), u = Math.max(l, i.startTime), m = Math.min(n, i.lastTimestamp);
    return m > u ? m - u : 0;
  }, H = $(
    (t) => {
      const s = E[t] ?? {}, i = Object.entries(s).map(([n, u]) => ({ label: n, totalMs: u })), l = I.current;
      if (l.currentLabel && l.startTime !== null && l.lastTimestamp !== null) {
        const n = Q(t, l.currentLabel);
        if (n > 0) {
          const u = i.find((m) => m.label === l.currentLabel);
          u ? u.totalMs += n : i.push({ label: l.currentLabel, totalMs: n });
        }
      }
      return i.sort((n, u) => u.totalMs - n.totalMs);
    },
    [E, c]
  ), z = Me(() => {
    const t = new Set(Object.keys(E));
    return t.add(k), Array.from(t).sort((s, i) => s === i ? 0 : s > i ? -1 : 1);
  }, [E, k]), ce = Me(() => z.map((t) => {
    const s = H(t);
    if (s.length === 0)
      return null;
    const i = s.reduce((l, n) => l + n.totalMs, 0);
    return { dateKey: t, rows: s, totalMs: i };
  }).filter(Boolean), [z, H]), _e = $((t, s, i) => {
    if (I.current.currentLabel === s && t === k) {
      j("Stop the current activity before editing it.");
      return;
    }
    D({ dateKey: t, label: s }), F(Mt(i)), j(null);
  }, [k]), Ee = $((t) => {
    F(t.target.value);
  }, []), xe = $(() => {
    D(null), F(""), j(null);
  }, []), Ne = $(() => {
    if (!x)
      return;
    const { dateKey: t, label: s } = x, i = $t(_);
    if (!Number.isFinite(i)) {
      j("Please enter duration as mm:ss, hh:mm:ss, or minutes.");
      return;
    }
    const l = Q(t, s);
    if (i < l) {
      j(`Duration cannot be less than the active segment (${ve(l)}).`);
      return;
    }
    const n = Math.max(0, i - l);
    L((u) => {
      const m = { ...u }, S = { ...m[t] ?? {} };
      return n <= 0 ? delete S[s] : S[s] = n, Object.keys(S).length === 0 ? delete m[t] : m[t] = S, m;
    }), D(null), F(""), j(null);
  }, [x, _]), Ce = $(
    (t, s) => {
      if (Q(t, s) > 0) {
        j("Stop the current activity before deleting it.");
        return;
      }
      L((l) => {
        const n = l[t];
        if (!n || !(s in n))
          return l;
        const u = { ...l }, m = { ...n };
        return delete m[s], Object.keys(m).length === 0 ? delete u[t] : u[t] = m, u;
      }), x && x.dateKey === t && x.label === s && (D(null), F("")), j(null);
    },
    [x]
  ), ue = $((t) => {
    G((s) => s.includes(t) ? s.filter((i) => i !== t) : [...s, t]);
  }, []), fe = () => {
    if (U === "week") {
      const { start: n, end: u } = Te(k), m = new Date(n);
      return m.setDate(m.getDate() - 6), { start: new Date(m.getFullYear(), m.getMonth(), m.getDate()).getTime(), end: u };
    }
    if (U === "month") {
      const n = he(k), u = new Date(n.getFullYear(), n.getMonth(), 1).getTime(), m = new Date(n.getFullYear(), n.getMonth() + 1, 1).getTime();
      return { start: u, end: m };
    }
    const t = he(Z), s = he(T);
    if (Number.isNaN(t.getTime()) || Number.isNaN(s.getTime()) || t > s)
      return null;
    const i = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), l = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1).getTime();
    return { start: i, end: l };
  }, ee = $(() => {
    const t = fe();
    if (!t) {
      ie("Please provide a valid date range before downloading.");
      return;
    }
    const s = [];
    for (const S of z) {
      const { start: re, end: ne } = Te(S);
      if (ne <= t.start || re >= t.end)
        continue;
      const W = H(S);
      if (W.length === 0)
        continue;
      const ke = st(S);
      for (const Re of W)
        s.push(`${ot(ke)},${ot(Re.label)},${ve(Re.totalMs)}`);
    }
    if (s.length === 0) {
      ie("No activity recorded in the selected range.");
      return;
    }
    const i = ["Date,Activity,Duration", ...s].join(`
`), l = new Blob([i], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(l), u = document.createElement("a");
    u.href = n;
    const m = U === "custom" ? "custom" : U;
    u.download = `activity-log-${m}.csv`, document.body.appendChild(u), u.click(), document.body.removeChild(u), URL.revokeObjectURL(n), ie(null);
  }, [H, U, z, Z, T]), X = (c == null ? void 0 : c.side) ?? null, te = Me(() => X === null ? null : Ie(B, X), [X, B]), Oe = (c == null ? void 0 : c.imu_timestamp_text) ?? (c == null ? void 0 : c.imu_timestamp_iso) ?? (c == null ? void 0 : c.received_at) ?? null;
  return /* @__PURE__ */ o.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ o.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ o.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ o.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ o.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ o.jsx("span", { className: "status-value", children: At(Oe) })
      ] }),
      /* @__PURE__ */ o.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ o.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ o.jsx("span", { className: "status-value", children: te ?? "Waiting for data?" })
      ] }),
      b ? /* @__PURE__ */ o.jsxs("p", { className: "error-text", children: [
        "Error: ",
        b
      ] }) : null
    ] }),
    /* @__PURE__ */ o.jsxs("section", { className: "activity-summary", "aria-live": "polite", children: [
      /* @__PURE__ */ o.jsx("h2", { children: "Activity Log" }),
      /* @__PURE__ */ o.jsxs("div", { className: "range-controls", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "range-option", children: [
          "Range",
          /* @__PURE__ */ o.jsxs(
            "select",
            {
              className: "range-select",
              value: U,
              onChange: (t) => we(t.target.value),
              children: [
                /* @__PURE__ */ o.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ o.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ o.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        U === "custom" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsxs("label", { className: "range-option", children: [
            "From",
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: Z,
                max: T,
                onChange: (t) => J(t.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("label", { className: "range-option", children: [
            "To",
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: T,
                min: Z,
                onChange: (t) => Se(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ o.jsx("button", { type: "button", className: "download-button", onClick: ee, children: "Download CSV" })
      ] }),
      ge ? /* @__PURE__ */ o.jsx("p", { className: "error-text", children: ge }) : null,
      ce.length === 0 ? /* @__PURE__ */ o.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : ce.map(({ dateKey: t, rows: s, totalMs: i }) => {
        const l = V.includes(t), n = I.current;
        return /* @__PURE__ */ o.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${l ? " date-header--expanded" : ""}`,
              onClick: () => ue(t),
              children: [
                /* @__PURE__ */ o.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ o.jsx("span", { className: "date-label", children: st(t) }),
                  /* @__PURE__ */ o.jsxs("span", { className: "date-summary", children: [
                    s.length,
                    " activit",
                    s.length === 1 ? "y" : "ies",
                    " - ",
                    ve(i)
                  ] })
                ] }),
                /* @__PURE__ */ o.jsx("span", { className: "date-header__icon", children: l ? "−" : "+" })
              ]
            }
          ),
          l ? /* @__PURE__ */ o.jsxs("table", { className: "activity-table", children: [
            /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
              /* @__PURE__ */ o.jsx("th", { scope: "col", children: "Activity" }),
              /* @__PURE__ */ o.jsx("th", { scope: "col", children: "Total Duration" }),
              /* @__PURE__ */ o.jsx("th", { scope: "col", className: "actions-heading", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ o.jsx("tbody", { children: s.map((u) => {
              const m = (x == null ? void 0 : x.dateKey) === t && x.label === u.label, S = n.currentLabel === u.label && t === k;
              return /* @__PURE__ */ o.jsxs("tr", { children: [
                /* @__PURE__ */ o.jsx("td", { children: u.label }),
                /* @__PURE__ */ o.jsx("td", { children: m ? /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: _,
                    onChange: Ee,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ o.jsx("span", { children: ve(u.totalMs) }) }),
                /* @__PURE__ */ o.jsx("td", { className: "actions-cell", children: /* @__PURE__ */ o.jsx("div", { className: "action-buttons", children: m ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--primary",
                      onClick: Ne,
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ o.jsx("button", { type: "button", className: "icon-button", onClick: xe, children: "Cancel" })
                ] }) : /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: S,
                      onClick: () => _e(t, u.label, u.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: S,
                      onClick: () => Ce(t, u.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${u.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      N ? /* @__PURE__ */ o.jsx("p", { className: "error-text", children: N }) : null
    ] })
  ] });
}
export {
  Yt as TimesheetDevice
};
