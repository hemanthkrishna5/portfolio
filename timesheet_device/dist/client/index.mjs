import at, { useState as F, useRef as Ke, useCallback as M, useEffect as je, useMemo as Fe } from "react";
var $e = { exports: {} }, ue = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ze;
function wt() {
  if (Ze) return ue;
  Ze = 1;
  var i = at, m = Symbol.for("react.element"), b = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, _ = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, A = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(D, E, P) {
    var C, w = {}, U = null, z = null;
    P !== void 0 && (U = "" + P), E.key !== void 0 && (U = "" + E.key), E.ref !== void 0 && (z = E.ref);
    for (C in E) h.call(E, C) && !A.hasOwnProperty(C) && (w[C] = E[C]);
    if (D && D.defaultProps) for (C in E = D.defaultProps, E) w[C] === void 0 && (w[C] = E[C]);
    return { $$typeof: m, type: D, key: U, ref: z, props: w, _owner: _.current };
  }
  return ue.Fragment = b, ue.jsx = x, ue.jsxs = x, ue;
}
var de = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qe;
function Nt() {
  return Qe || (Qe = 1, process.env.NODE_ENV !== "production" && function() {
    var i = at, m = Symbol.for("react.element"), b = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), D = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), z = Symbol.for("react.offscreen"), $ = Symbol.iterator, Te = "@@iterator";
    function Q(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = $ && e[$] || e[Te];
      return typeof r == "function" ? r : null;
    }
    var J = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), d = 1; d < r; d++)
          n[d - 1] = arguments[d];
        Se("error", e, n);
      }
    }
    function Se(e, r, n) {
      {
        var d = J.ReactDebugCurrentFrame, g = d.getStackAddendum();
        g !== "" && (r += "%s", n = n.concat([g]));
        var y = n.map(function(v) {
          return String(v);
        });
        y.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var pe = !1, se = !1, I = !1, we = !1, ve = !1, Y;
    Y = Symbol.for("react.module.reference");
    function he(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === A || ve || e === _ || e === P || e === C || we || e === z || pe || se || I || typeof e == "object" && e !== null && (e.$$typeof === U || e.$$typeof === w || e.$$typeof === x || e.$$typeof === D || e.$$typeof === E || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Y || e.getModuleId !== void 0));
    }
    function ge(e, r, n) {
      var d = e.displayName;
      if (d)
        return d;
      var g = r.displayName || r.name || "";
      return g !== "" ? n + "(" + g + ")" : n;
    }
    function oe(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case b:
          return "Portal";
        case A:
          return "Profiler";
        case _:
          return "StrictMode";
        case P:
          return "Suspense";
        case C:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case D:
            var r = e;
            return oe(r) + ".Consumer";
          case x:
            var n = e;
            return oe(n._context) + ".Provider";
          case E:
            return ge(e, e.render, "ForwardRef");
          case w:
            var d = e.displayName || null;
            return d !== null ? d : S(e.type) || "Memo";
          case U: {
            var g = e, y = g._payload, v = g._init;
            try {
              return S(v(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var W = Object.assign, V = 0, X, H, ie, be, ye, Ee, _e;
    function xe() {
    }
    xe.__reactDisabledLog = !0;
    function Ne() {
      {
        if (V === 0) {
          X = console.log, H = console.info, ie = console.warn, be = console.error, ye = console.group, Ee = console.groupCollapsed, _e = console.groupEnd;
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
        V++;
      }
    }
    function De() {
      {
        if (V--, V === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: W({}, e, {
              value: X
            }),
            info: W({}, e, {
              value: H
            }),
            warn: W({}, e, {
              value: ie
            }),
            error: W({}, e, {
              value: be
            }),
            group: W({}, e, {
              value: ye
            }),
            groupCollapsed: W({}, e, {
              value: Ee
            }),
            groupEnd: W({}, e, {
              value: _e
            })
          });
        }
        V < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var le = J.ReactCurrentDispatcher, G;
    function ee(e, r, n) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (g) {
            var d = g.stack.trim().match(/\n( *(at )?)/);
            G = d && d[1] || "";
          }
        return `
` + G + e;
      }
    }
    var ce = !1, t;
    {
      var o = typeof WeakMap == "function" ? WeakMap : Map;
      t = new o();
    }
    function u(e, r) {
      if (!e || ce)
        return "";
      {
        var n = t.get(e);
        if (n !== void 0)
          return n;
      }
      var d;
      ce = !0;
      var g = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = le.current, le.current = null, Ne();
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
            } catch (k) {
              d = k;
            }
            Reflect.construct(e, [], v);
          } else {
            try {
              v.call();
            } catch (k) {
              d = k;
            }
            e.call(v.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (k) {
            d = k;
          }
          e();
        }
      } catch (k) {
        if (k && d && typeof k.stack == "string") {
          for (var p = k.stack.split(`
`), O = d.stack.split(`
`), j = p.length - 1, T = O.length - 1; j >= 1 && T >= 0 && p[j] !== O[T]; )
            T--;
          for (; j >= 1 && T >= 0; j--, T--)
            if (p[j] !== O[T]) {
              if (j !== 1 || T !== 1)
                do
                  if (j--, T--, T < 0 || p[j] !== O[T]) {
                    var L = `
` + p[j].replace(" at new ", " at ");
                    return e.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", e.displayName)), typeof e == "function" && t.set(e, L), L;
                  }
                while (j >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        ce = !1, le.current = y, De(), Error.prepareStackTrace = g;
      }
      var ne = e ? e.displayName || e.name : "", Z = ne ? ee(ne) : "";
      return typeof e == "function" && t.set(e, Z), Z;
    }
    function c(e, r, n) {
      return u(e, !1);
    }
    function a(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function l(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return u(e, a(e));
      if (typeof e == "string")
        return ee(e);
      switch (e) {
        case P:
          return ee("Suspense");
        case C:
          return ee("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case E:
            return c(e.render);
          case w:
            return l(e.type, r, n);
          case U: {
            var d = e, g = d._payload, y = d._init;
            try {
              return l(y(g), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var f = Object.prototype.hasOwnProperty, N = {}, K = J.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, n = l(e.type, e._source, r ? r.type : null);
        K.setExtraStackFrame(n);
      } else
        K.setExtraStackFrame(null);
    }
    function q(e, r, n, d, g) {
      {
        var y = Function.call.bind(f);
        for (var v in e)
          if (y(e, v)) {
            var p = void 0;
            try {
              if (typeof e[v] != "function") {
                var O = Error((d || "React class") + ": " + n + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              p = e[v](r, v, d, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (j) {
              p = j;
            }
            p && !(p instanceof Error) && (B(g), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", n, v, typeof p), B(null)), p instanceof Error && !(p.message in N) && (N[p.message] = !0, B(g), R("Failed %s type: %s", n, p.message), B(null));
          }
      }
    }
    var Ce = Array.isArray;
    function te(e) {
      return Ce(e);
    }
    function it(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function lt(e) {
      try {
        return Ie(e), !1;
      } catch {
        return !0;
      }
    }
    function Ie(e) {
      return "" + e;
    }
    function Ye(e) {
      if (lt(e))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", it(e)), Ie(e);
    }
    var Ue = J.ReactCurrentOwner, ct = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, We, Ve;
    function ut(e) {
      if (f.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function dt(e) {
      if (f.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ft(e, r) {
      typeof e.ref == "string" && Ue.current;
    }
    function mt(e, r) {
      {
        var n = function() {
          We || (We = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function pt(e, r) {
      {
        var n = function() {
          Ve || (Ve = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var vt = function(e, r, n, d, g, y, v) {
      var p = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: m,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
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
        value: d
      }), Object.defineProperty(p, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: g
      }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
    };
    function ht(e, r, n, d, g) {
      {
        var y, v = {}, p = null, O = null;
        n !== void 0 && (Ye(n), p = "" + n), dt(r) && (Ye(r.key), p = "" + r.key), ut(r) && (O = r.ref, ft(r, g));
        for (y in r)
          f.call(r, y) && !ct.hasOwnProperty(y) && (v[y] = r[y]);
        if (e && e.defaultProps) {
          var j = e.defaultProps;
          for (y in j)
            v[y] === void 0 && (v[y] = j[y]);
        }
        if (p || O) {
          var T = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          p && mt(v, T), O && pt(v, T);
        }
        return vt(e, p, O, g, d, Ue.current, v);
      }
    }
    var Oe = J.ReactCurrentOwner, Be = J.ReactDebugCurrentFrame;
    function re(e) {
      if (e) {
        var r = e._owner, n = l(e.type, e._source, r ? r.type : null);
        Be.setExtraStackFrame(n);
      } else
        Be.setExtraStackFrame(null);
    }
    var ke;
    ke = !1;
    function Pe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === m;
    }
    function Je() {
      {
        if (Oe.current) {
          var e = S(Oe.current.type);
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
    var Ge = {};
    function bt(e) {
      {
        var r = Je();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function qe(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = bt(r);
        if (Ge[n])
          return;
        Ge[n] = !0;
        var d = "";
        e && e._owner && e._owner !== Oe.current && (d = " It was passed a child from " + S(e._owner.type) + "."), re(e), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, d), re(null);
      }
    }
    function ze(e, r) {
      {
        if (typeof e != "object")
          return;
        if (te(e))
          for (var n = 0; n < e.length; n++) {
            var d = e[n];
            Pe(d) && qe(d, r);
          }
        else if (Pe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var g = Q(e);
          if (typeof g == "function" && g !== e.entries)
            for (var y = g.call(e), v; !(v = y.next()).done; )
              Pe(v.value) && qe(v.value, r);
        }
      }
    }
    function yt(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === E || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === w))
          n = r.propTypes;
        else
          return;
        if (n) {
          var d = S(r);
          q(n, e.props, "prop", d, e);
        } else if (r.PropTypes !== void 0 && !ke) {
          ke = !0;
          var g = S(r);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", g || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Et(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var d = r[n];
          if (d !== "children" && d !== "key") {
            re(e), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), re(null);
            break;
          }
        }
        e.ref !== null && (re(e), R("Invalid attribute `ref` supplied to `React.Fragment`."), re(null));
      }
    }
    var Xe = {};
    function He(e, r, n, d, g, y) {
      {
        var v = he(e);
        if (!v) {
          var p = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = gt();
          O ? p += O : p += Je();
          var j;
          e === null ? j = "null" : te(e) ? j = "array" : e !== void 0 && e.$$typeof === m ? (j = "<" + (S(e.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : j = typeof e, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", j, p);
        }
        var T = ht(e, r, n, g, y);
        if (T == null)
          return T;
        if (v) {
          var L = r.children;
          if (L !== void 0)
            if (d)
              if (te(L)) {
                for (var ne = 0; ne < L.length; ne++)
                  ze(L[ne], e);
                Object.freeze && Object.freeze(L);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ze(L, e);
        }
        if (f.call(r, "key")) {
          var Z = S(e), k = Object.keys(r).filter(function(St) {
            return St !== "key";
          }), Le = k.length > 0 ? "{key: someKey, " + k.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Xe[Z + Le]) {
            var Tt = k.length > 0 ? "{" + k.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Le, Z, Tt, Z), Xe[Z + Le] = !0;
          }
        }
        return e === h ? Et(T) : yt(T), T;
      }
    }
    function _t(e, r, n) {
      return He(e, r, n, !0);
    }
    function xt(e, r, n) {
      return He(e, r, n, !1);
    }
    var jt = xt, Rt = _t;
    de.Fragment = h, de.jsx = jt, de.jsxs = Rt;
  }()), de;
}
process.env.NODE_ENV === "production" ? $e.exports = wt() : $e.exports = Nt();
var s = $e.exports;
const Dt = "/api/imu/latest", st = 12, Ct = 1e3, et = "dodec-labels", tt = "dodec-activity-log", Ot = "Side", kt = 24 * 60 * 60 * 1e3, ot = Array.from({ length: st }, (i, m) => m + 1), Ae = () => {
  const i = {};
  for (const m of ot)
    i[m] = "";
  return i;
}, Me = (i, m) => {
  var h;
  const b = (h = i[m]) == null ? void 0 : h.trim();
  return b && b.length > 0 ? b : `${Ot} ${m}`;
}, Pt = (i) => {
  const m = [i.received_at, i.imu_timestamp_iso];
  for (const b of m)
    if (b) {
      const h = Date.parse(b);
      if (!Number.isNaN(h))
        return h;
    }
  if (i.imu_timestamp_text) {
    const b = i.imu_timestamp_text.replace(" ", "T"), h = Date.parse(b);
    if (!Number.isNaN(h))
      return h;
  }
  return Date.now();
}, ae = (i) => {
  const m = new Date(i), b = m.getFullYear(), h = String(m.getMonth() + 1).padStart(2, "0"), _ = String(m.getDate()).padStart(2, "0");
  return `${b}-${h}-${_}`;
}, me = (i) => {
  const [m, b, h] = i.split("-").map(Number);
  return new Date(m, b - 1, h);
}, Re = (i) => {
  const m = me(i), b = new Date(m.getFullYear(), m.getMonth(), m.getDate()).getTime(), h = b + kt;
  return { start: b, end: h };
}, rt = (i) => {
  const m = me(i);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(m);
}, Lt = (i) => i ? i.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", fe = (i) => {
  if (!Number.isFinite(i) || i <= 0)
    return "00:00";
  const m = Math.floor(i / 1e3), b = Math.floor(m / 3600), h = Math.floor(m % 3600 / 60), _ = m % 60;
  return b > 0 ? `${String(b).padStart(2, "0")}:${String(h).padStart(2, "0")}:${String(_).padStart(2, "0")}` : `${String(h).padStart(2, "0")}:${String(_).padStart(2, "0")}`;
}, Ft = (i) => fe(i), At = (i) => {
  const m = i.trim();
  if (!m)
    return NaN;
  const b = m.split(":");
  if (b.length > 1) {
    if (b.length > 3)
      return NaN;
    const _ = b.map((E) => Number(E));
    if (_.some((E) => Number.isNaN(E) || E < 0))
      return NaN;
    let A = 0, x = 0, D = 0;
    return _.length === 3 ? [A, x, D] = _ : [x, D] = _, Math.max(0, A * 3600 + x * 60 + D) * 1e3;
  }
  const h = Number(m);
  return Number.isNaN(h) || h < 0 ? NaN : h * 60 * 1e3;
}, nt = (i) => i.includes('"') || i.includes(",") || i.includes(`
`) ? `"${i.replace(/"/g, '""')}"` : i;
function $t() {
  const [i, m] = F(null), [b, h] = F(null), [_, A] = F(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(tt);
      return t ? JSON.parse(t) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), [x, D] = F(null), [E, P] = F(""), [C, w] = F(null), [U, z] = F(() => [ae(Date.now())]), [$, Te] = F("week"), [Q, J] = F(ae(Date.now())), [R, Se] = F(ae(Date.now())), [pe, se] = F(null), [I, we] = F(() => {
    if (typeof window > "u")
      return Ae();
    try {
      const t = window.localStorage.getItem(et);
      if (t) {
        const o = JSON.parse(t), u = Ae();
        for (const [c, a] of Object.entries(o)) {
          const l = Number(c);
          Number.isFinite(l) && l >= 1 && l <= st && (u[l] = String(a));
        }
        return u;
      }
    } catch (t) {
      console.warn("Unable to read stored labels", t);
    }
    return Ae();
  }), ve = Ke(I), Y = Ke({
    currentLabel: null,
    startTime: null,
    lastTimestamp: null,
    lastSide: null
  }), he = M((t, o, u) => {
    u <= o || A((c) => {
      const a = { ...c };
      let l = o;
      for (; l < u; ) {
        const f = ae(l), { end: N } = Re(f), K = Math.min(u, N), B = Math.max(0, K - l);
        if (B > 0) {
          const q = { ...a[f] ?? {} };
          q[t] = (q[t] ?? 0) + B, a[f] = q;
        }
        l = K;
      }
      return a;
    });
  }, []), ge = M(
    (t) => {
      const o = typeof t.side == "number" ? t.side : null;
      if (!o)
        return;
      const u = Me(ve.current, o), c = Pt(t), a = Y.current;
      if (a.currentLabel === null || a.startTime === null) {
        a.currentLabel = u, a.startTime = c, a.lastTimestamp = c, a.lastSide = o;
        return;
      }
      if (u === a.currentLabel) {
        a.lastTimestamp = c, a.lastSide = o;
        return;
      }
      const l = a.startTime, f = c;
      f > l && he(a.currentLabel, l, f), a.currentLabel = u, a.startTime = c, a.lastTimestamp = c, a.lastSide = o;
    },
    [he]
  );
  je(() => {
    ve.current = I, typeof window < "u" && window.localStorage.setItem(et, JSON.stringify(I));
    const t = Y.current;
    t.lastSide !== null && (t.currentLabel = Me(I, t.lastSide));
  }, [I]), je(() => {
    typeof window < "u" && window.localStorage.setItem(tt, JSON.stringify(_));
  }, [_]), je(() => {
    let t = !0;
    const o = async () => {
      try {
        const c = await fetch(Dt, { cache: "no-store" });
        if (!c.ok)
          throw new Error(`Request failed with status ${c.status}`);
        const a = await c.json();
        if (!t)
          return;
        ge(a), m({
          side: typeof a.side == "number" ? a.side : null,
          imu_timestamp_text: a.imu_timestamp_text ?? null,
          imu_timestamp_iso: a.imu_timestamp_iso ?? null,
          received_at: a.received_at ?? null,
          confidence: a.confidence ?? null
        }), h(null);
      } catch (c) {
        t && h(c instanceof Error ? c.message : "Unknown error");
      }
    };
    o();
    const u = window.setInterval(o, Ct);
    return () => {
      t = !1, window.clearInterval(u);
    };
  }, [ge]);
  const oe = Y.current, S = oe.lastTimestamp ? ae(oe.lastTimestamp) : ae(Date.now());
  je(() => {
    z((t) => t.includes(S) ? t : [...t, S]);
  }, [S]);
  const W = M(
    (t) => (o) => {
      const u = o.target.value;
      we((c) => ({ ...c, [t]: u }));
    },
    []
  ), V = (t, o) => {
    const u = Y.current;
    if (!u.currentLabel || u.currentLabel !== o || u.startTime === null || u.lastTimestamp === null)
      return 0;
    const { start: c, end: a } = Re(t), l = Math.max(c, u.startTime), f = Math.min(a, u.lastTimestamp);
    return f > l ? f - l : 0;
  }, X = M(
    (t) => {
      const o = _[t] ?? {}, u = Object.entries(o).map(([a, l]) => ({ label: a, totalMs: l })), c = Y.current;
      if (c.currentLabel && c.startTime !== null && c.lastTimestamp !== null) {
        const a = V(t, c.currentLabel);
        if (a > 0) {
          const l = u.find((f) => f.label === c.currentLabel);
          l ? l.totalMs += a : u.push({ label: c.currentLabel, totalMs: a });
        }
      }
      return u.sort((a, l) => l.totalMs - a.totalMs);
    },
    [_, i]
  ), H = Fe(() => {
    const t = new Set(Object.keys(_));
    return t.add(S), Array.from(t).sort((o, u) => o === u ? 0 : o > u ? -1 : 1);
  }, [_, S]), ie = Fe(() => H.map((t) => {
    const o = X(t);
    if (o.length === 0)
      return null;
    const u = o.reduce((c, a) => c + a.totalMs, 0);
    return { dateKey: t, rows: o, totalMs: u };
  }).filter(Boolean), [H, X]), be = M((t, o, u) => {
    if (Y.current.currentLabel === o && t === S) {
      w("Stop the current activity before editing it.");
      return;
    }
    D({ dateKey: t, label: o }), P(Ft(u)), w(null);
  }, [S]), ye = M((t) => {
    P(t.target.value);
  }, []), Ee = M(() => {
    D(null), P(""), w(null);
  }, []), _e = M(() => {
    if (!x)
      return;
    const { dateKey: t, label: o } = x, u = At(E);
    if (!Number.isFinite(u)) {
      w("Please enter duration as mm:ss, hh:mm:ss, or minutes.");
      return;
    }
    const c = V(t, o);
    if (u < c) {
      w(`Duration cannot be less than the active segment (${fe(c)}).`);
      return;
    }
    const a = Math.max(0, u - c);
    A((l) => {
      const f = { ...l }, N = { ...f[t] ?? {} };
      return a <= 0 ? delete N[o] : N[o] = a, Object.keys(N).length === 0 ? delete f[t] : f[t] = N, f;
    }), D(null), P(""), w(null);
  }, [x, E]), xe = M(
    (t, o) => {
      if (V(t, o) > 0) {
        w("Stop the current activity before deleting it.");
        return;
      }
      A((c) => {
        const a = c[t];
        if (!a || !(o in a))
          return c;
        const l = { ...c }, f = { ...a };
        return delete f[o], Object.keys(f).length === 0 ? delete l[t] : l[t] = f, l;
      }), x && x.dateKey === t && x.label === o && (D(null), P("")), w(null);
    },
    [x]
  ), Ne = M((t) => {
    z((o) => o.includes(t) ? o.filter((u) => u !== t) : [...o, t]);
  }, []), De = () => {
    if ($ === "week") {
      const { start: a, end: l } = Re(S), f = new Date(a);
      return f.setDate(f.getDate() - 6), { start: new Date(f.getFullYear(), f.getMonth(), f.getDate()).getTime(), end: l };
    }
    if ($ === "month") {
      const a = me(S), l = new Date(a.getFullYear(), a.getMonth(), 1).getTime(), f = new Date(a.getFullYear(), a.getMonth() + 1, 1).getTime();
      return { start: l, end: f };
    }
    const t = me(Q), o = me(R);
    if (Number.isNaN(t.getTime()) || Number.isNaN(o.getTime()) || t > o)
      return null;
    const u = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), c = new Date(o.getFullYear(), o.getMonth(), o.getDate() + 1).getTime();
    return { start: u, end: c };
  }, le = M(() => {
    const t = De();
    if (!t) {
      se("Please provide a valid date range before downloading.");
      return;
    }
    const o = [];
    for (const N of H) {
      const { start: K, end: B } = Re(N);
      if (B <= t.start || K >= t.end)
        continue;
      const q = X(N);
      if (q.length === 0)
        continue;
      const Ce = rt(N);
      for (const te of q)
        o.push(`${nt(Ce)},${nt(te.label)},${fe(te.totalMs)}`);
    }
    if (o.length === 0) {
      se("No activity recorded in the selected range.");
      return;
    }
    const u = ["Date,Activity,Duration", ...o].join(`
`), c = new Blob([u], { type: "text/csv;charset=utf-8;" }), a = URL.createObjectURL(c), l = document.createElement("a");
    l.href = a;
    const f = $ === "custom" ? "custom" : $;
    l.download = `activity-log-${f}.csv`, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(a), se(null);
  }, [X, $, H, Q, R]), G = (i == null ? void 0 : i.side) ?? null, ee = Fe(() => G === null ? null : Me(I, G), [G, I]), ce = (i == null ? void 0 : i.imu_timestamp_text) ?? (i == null ? void 0 : i.imu_timestamp_iso) ?? (i == null ? void 0 : i.received_at) ?? null;
  return /* @__PURE__ */ s.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ s.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ s.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ s.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ s.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ s.jsx("span", { className: "status-value", children: Lt(ce) })
      ] }),
      /* @__PURE__ */ s.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ s.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ s.jsx("span", { className: "status-value", children: ee ?? "Waiting for data?" })
      ] }),
      b ? /* @__PURE__ */ s.jsxs("p", { className: "error-text", children: [
        "Error: ",
        b
      ] }) : null
    ] }),
    /* @__PURE__ */ s.jsx("section", { className: "side-list", "aria-label": "Side configuration", children: ot.map((t) => {
      const o = t === G;
      return /* @__PURE__ */ s.jsxs("div", { className: "side-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: `side-card${o ? " side-card--active" : ""}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "side-number", children: t }),
          /* @__PURE__ */ s.jsx("span", { className: "side-label", children: "Side" })
        ] }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            type: "text",
            className: "activity-input",
            value: I[t] ?? "",
            placeholder: `Label for side ${t}`,
            onChange: W(t)
          }
        )
      ] }, t);
    }) }),
    /* @__PURE__ */ s.jsxs("section", { className: "activity-summary", "aria-live": "polite", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "Activity Log" }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-controls", children: [
        /* @__PURE__ */ s.jsxs("label", { className: "range-option", children: [
          "Range",
          /* @__PURE__ */ s.jsxs(
            "select",
            {
              className: "range-select",
              value: $,
              onChange: (t) => Te(t.target.value),
              children: [
                /* @__PURE__ */ s.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ s.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ s.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        $ === "custom" ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsxs("label", { className: "range-option", children: [
            "From",
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: Q,
                max: R,
                onChange: (t) => J(t.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: "range-option", children: [
            "To",
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: R,
                min: Q,
                onChange: (t) => Se(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "download-button", onClick: le, children: "Download CSV" })
      ] }),
      pe ? /* @__PURE__ */ s.jsx("p", { className: "error-text", children: pe }) : null,
      ie.length === 0 ? /* @__PURE__ */ s.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : ie.map(({ dateKey: t, rows: o, totalMs: u }) => {
        const c = U.includes(t), a = Y.current;
        return /* @__PURE__ */ s.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${c ? " date-header--expanded" : ""}`,
              onClick: () => Ne(t),
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "date-label", children: rt(t) }),
                  /* @__PURE__ */ s.jsxs("span", { className: "date-summary", children: [
                    o.length,
                    " activit",
                    o.length === 1 ? "y" : "ies",
                    " - ",
                    fe(u)
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx("span", { className: "date-header__icon", children: c ? "−" : "+" })
              ]
            }
          ),
          c ? /* @__PURE__ */ s.jsxs("table", { className: "activity-table", children: [
            /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
              /* @__PURE__ */ s.jsx("th", { scope: "col", children: "Activity" }),
              /* @__PURE__ */ s.jsx("th", { scope: "col", children: "Total Duration" }),
              /* @__PURE__ */ s.jsx("th", { scope: "col", className: "actions-heading", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ s.jsx("tbody", { children: o.map((l) => {
              const f = (x == null ? void 0 : x.dateKey) === t && x.label === l.label, N = a.currentLabel === l.label && t === S;
              return /* @__PURE__ */ s.jsxs("tr", { children: [
                /* @__PURE__ */ s.jsx("td", { children: l.label }),
                /* @__PURE__ */ s.jsx("td", { children: f ? /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: E,
                    onChange: ye,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ s.jsx("span", { children: fe(l.totalMs) }) }),
                /* @__PURE__ */ s.jsx("td", { className: "actions-cell", children: /* @__PURE__ */ s.jsx("div", { className: "action-buttons", children: f ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--primary",
                      onClick: _e,
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "icon-button", onClick: Ee, children: "Cancel" })
                ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: N,
                      onClick: () => be(t, l.label, l.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: N,
                      onClick: () => xe(t, l.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${l.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      C ? /* @__PURE__ */ s.jsx("p", { className: "error-text", children: C }) : null
    ] })
  ] });
}
export {
  $t as TimesheetDevice
};
