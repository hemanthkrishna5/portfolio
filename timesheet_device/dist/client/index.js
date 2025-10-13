import ht, { useState as F, useRef as Pe, useCallback as C, useEffect as G, useMemo as Ge } from "react";
var Qe = { exports: {} }, Te = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var it;
function kt() {
  if (it) return Te;
  it = 1;
  var l = ht, d = Symbol.for("react.element"), v = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, x = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, O = { key: !0, ref: !0, __self: !0, __source: !0 };
  function _(D, y, Y) {
    var N, k = {}, B = null, A = null;
    Y !== void 0 && (B = "" + Y), y.key !== void 0 && (B = "" + y.key), y.ref !== void 0 && (A = y.ref);
    for (N in y) m.call(y, N) && !O.hasOwnProperty(N) && (k[N] = y[N]);
    if (D && D.defaultProps) for (N in y = D.defaultProps, y) k[N] === void 0 && (k[N] = y[N]);
    return { $$typeof: d, type: D, key: B, ref: A, props: k, _owner: x.current };
  }
  return Te.Fragment = v, Te.jsx = _, Te.jsxs = _, Te;
}
var Se = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lt;
function Pt() {
  return lt || (lt = 1, process.env.NODE_ENV !== "production" && function() {
    var l = ht, d = Symbol.for("react.element"), v = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), _ = Symbol.for("react.provider"), D = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), Y = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), he = Symbol.iterator, De = "@@iterator";
    function H(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = he && e[he] || e[De];
      return typeof r == "function" ? r : null;
    }
    var K = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(e) {
      {
        for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), f = 1; f < r; f++)
          i[f - 1] = arguments[f];
        Fe("error", e, i);
      }
    }
    function Fe(e, r, i) {
      {
        var f = K.ReactDebugCurrentFrame, b = f.getStackAddendum();
        b !== "" && (r += "%s", i = i.concat([b]));
        var w = i.map(function(g) {
          return String(g);
        });
        w.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, w);
      }
    }
    var ne = !1, $e = !1, Ne = !1, ve = !1, W = !1, ae;
    ae = Symbol.for("react.module.reference");
    function ge(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === O || W || e === x || e === Y || e === N || ve || e === A || ne || $e || Ne || typeof e == "object" && e !== null && (e.$$typeof === B || e.$$typeof === k || e.$$typeof === _ || e.$$typeof === D || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ae || e.getModuleId !== void 0));
    }
    function se(e, r, i) {
      var f = e.displayName;
      if (f)
        return f;
      var b = r.displayName || r.name || "";
      return b !== "" ? i + "(" + b + ")" : i;
    }
    function X(e) {
      return e.displayName || "Context";
    }
    function L(e) {
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
        case O:
          return "Profiler";
        case x:
          return "StrictMode";
        case Y:
          return "Suspense";
        case N:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case D:
            var r = e;
            return X(r) + ".Consumer";
          case _:
            var i = e;
            return X(i._context) + ".Provider";
          case y:
            return se(e, e.render, "ForwardRef");
          case k:
            var f = e.displayName || null;
            return f !== null ? f : L(e.type) || "Memo";
          case B: {
            var b = e, w = b._payload, g = b._init;
            try {
              return L(g(w));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var J = Object.assign, Q = 0, be, ye, Z, we, $, oe, Ee;
    function ee() {
    }
    ee.__reactDisabledLog = !0;
    function ie() {
      {
        if (Q === 0) {
          be = console.log, ye = console.info, Z = console.warn, we = console.error, $ = console.group, oe = console.groupCollapsed, Ee = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ee,
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
    function le() {
      {
        if (Q--, Q === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: J({}, e, {
              value: be
            }),
            info: J({}, e, {
              value: ye
            }),
            warn: J({}, e, {
              value: Z
            }),
            error: J({}, e, {
              value: we
            }),
            group: J({}, e, {
              value: $
            }),
            groupCollapsed: J({}, e, {
              value: oe
            }),
            groupEnd: J({}, e, {
              value: Ee
            })
          });
        }
        Q < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var te = K.ReactCurrentDispatcher, _e;
    function ce(e, r, i) {
      {
        if (_e === void 0)
          try {
            throw Error();
          } catch (b) {
            var f = b.stack.trim().match(/\n( *(at )?)/);
            _e = f && f[1] || "";
          }
        return `
` + _e + e;
      }
    }
    var xe = !1, ue;
    {
      var Ie = typeof WeakMap == "function" ? WeakMap : Map;
      ue = new Ie();
    }
    function Le(e, r) {
      if (!e || xe)
        return "";
      {
        var i = ue.get(e);
        if (i !== void 0)
          return i;
      }
      var f;
      xe = !0;
      var b = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var w;
      w = te.current, te.current = null, ie();
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
            } catch (M) {
              f = M;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (M) {
              f = M;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (M) {
            f = M;
          }
          e();
        }
      } catch (M) {
        if (M && f && typeof M.stack == "string") {
          for (var h = M.stack.split(`
`), P = f.stack.split(`
`), S = h.length - 1, j = P.length - 1; S >= 1 && j >= 0 && h[S] !== P[j]; )
            j--;
          for (; S >= 1 && j >= 0; S--, j--)
            if (h[S] !== P[j]) {
              if (S !== 1 || j !== 1)
                do
                  if (S--, j--, j < 0 || h[S] !== P[j]) {
                    var V = `
` + h[S].replace(" at new ", " at ");
                    return e.displayName && V.includes("<anonymous>") && (V = V.replace("<anonymous>", e.displayName)), typeof e == "function" && ue.set(e, V), V;
                  }
                while (S >= 1 && j >= 0);
              break;
            }
        }
      } finally {
        xe = !1, te.current = w, le(), Error.prepareStackTrace = b;
      }
      var me = e ? e.displayName || e.name : "", re = me ? ce(me) : "";
      return typeof e == "function" && ue.set(e, re), re;
    }
    function Ye(e, r, i) {
      return Le(e, !1);
    }
    function Ue(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function de(e, r, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Le(e, Ue(e));
      if (typeof e == "string")
        return ce(e);
      switch (e) {
        case Y:
          return ce("Suspense");
        case N:
          return ce("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return Ye(e.render);
          case k:
            return de(e.type, r, i);
          case B: {
            var f = e, b = f._payload, w = f._init;
            try {
              return de(w(b), r, i);
            } catch {
            }
          }
        }
      return "";
    }
    var z = Object.prototype.hasOwnProperty, Ce = {}, Oe = K.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var r = e._owner, i = de(e.type, e._source, r ? r.type : null);
        Oe.setExtraStackFrame(i);
      } else
        Oe.setExtraStackFrame(null);
    }
    function t(e, r, i, f, b) {
      {
        var w = Function.call.bind(z);
        for (var g in e)
          if (w(e, g)) {
            var h = void 0;
            try {
              if (typeof e[g] != "function") {
                var P = Error((f || "React class") + ": " + i + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw P.name = "Invariant Violation", P;
              }
              h = e[g](r, g, f, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (S) {
              h = S;
            }
            h && !(h instanceof Error) && (q(b), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", f || "React class", i, g, typeof h), q(null)), h instanceof Error && !(h.message in Ce) && (Ce[h.message] = !0, q(b), R("Failed %s type: %s", i, h.message), q(null));
          }
      }
    }
    var n = Array.isArray;
    function a(e) {
      return n(e);
    }
    function c(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, i = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function o(e) {
      try {
        return s(e), !1;
      } catch {
        return !0;
      }
    }
    function s(e) {
      return "" + e;
    }
    function p(e) {
      if (o(e))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", c(e)), s(e);
    }
    var E = K.ReactCurrentOwner, T = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, I, U;
    function Ve(e) {
      if (z.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ke(e) {
      if (z.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function bt(e, r) {
      typeof e.ref == "string" && E.current;
    }
    function yt(e, r) {
      {
        var i = function() {
          I || (I = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: i,
          configurable: !0
        });
      }
    }
    function wt(e, r) {
      {
        var i = function() {
          U || (U = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: i,
          configurable: !0
        });
      }
    }
    var Et = function(e, r, i, f, b, w, g) {
      var h = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: i,
        props: g,
        // Record the component responsible for creating this element.
        _owner: w
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
        value: f
      }), Object.defineProperty(h, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.freeze && (Object.freeze(h.props), Object.freeze(h)), h;
    };
    function _t(e, r, i, f, b) {
      {
        var w, g = {}, h = null, P = null;
        i !== void 0 && (p(i), h = "" + i), ke(r) && (p(r.key), h = "" + r.key), Ve(r) && (P = r.ref, bt(r, b));
        for (w in r)
          z.call(r, w) && !T.hasOwnProperty(w) && (g[w] = r[w]);
        if (e && e.defaultProps) {
          var S = e.defaultProps;
          for (w in S)
            g[w] === void 0 && (g[w] = S[w]);
        }
        if (h || P) {
          var j = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          h && yt(g, j), P && wt(g, j);
        }
        return Et(e, h, P, b, f, E.current, g);
      }
    }
    var We = K.ReactCurrentOwner, et = K.ReactDebugCurrentFrame;
    function fe(e) {
      if (e) {
        var r = e._owner, i = de(e.type, e._source, r ? r.type : null);
        et.setExtraStackFrame(i);
      } else
        et.setExtraStackFrame(null);
    }
    var Be;
    Be = !1;
    function He(e) {
      return typeof e == "object" && e !== null && e.$$typeof === d;
    }
    function tt() {
      {
        if (We.current) {
          var e = L(We.current.type);
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
    var rt = {};
    function Tt(e) {
      {
        var r = tt();
        if (!r) {
          var i = typeof e == "string" ? e : e.displayName || e.name;
          i && (r = `

Check the top-level render call using <` + i + ">.");
        }
        return r;
      }
    }
    function nt(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var i = Tt(r);
        if (rt[i])
          return;
        rt[i] = !0;
        var f = "";
        e && e._owner && e._owner !== We.current && (f = " It was passed a child from " + L(e._owner.type) + "."), fe(e), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, f), fe(null);
      }
    }
    function at(e, r) {
      {
        if (typeof e != "object")
          return;
        if (a(e))
          for (var i = 0; i < e.length; i++) {
            var f = e[i];
            He(f) && nt(f, r);
          }
        else if (He(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var b = H(e);
          if (typeof b == "function" && b !== e.entries)
            for (var w = b.call(e), g; !(g = w.next()).done; )
              He(g.value) && nt(g.value, r);
        }
      }
    }
    function St(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var i;
        if (typeof r == "function")
          i = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === k))
          i = r.propTypes;
        else
          return;
        if (i) {
          var f = L(r);
          t(i, e.props, "prop", f, e);
        } else if (r.PropTypes !== void 0 && !Be) {
          Be = !0;
          var b = L(r);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", b || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rt(e) {
      {
        for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
          var f = r[i];
          if (f !== "children" && f !== "key") {
            fe(e), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", f), fe(null);
            break;
          }
        }
        e.ref !== null && (fe(e), R("Invalid attribute `ref` supplied to `React.Fragment`."), fe(null));
      }
    }
    var st = {};
    function ot(e, r, i, f, b, w) {
      {
        var g = ge(e);
        if (!g) {
          var h = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var P = xt();
          P ? h += P : h += tt();
          var S;
          e === null ? S = "null" : a(e) ? S = "array" : e !== void 0 && e.$$typeof === d ? (S = "<" + (L(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : S = typeof e, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", S, h);
        }
        var j = _t(e, r, i, b, w);
        if (j == null)
          return j;
        if (g) {
          var V = r.children;
          if (V !== void 0)
            if (f)
              if (a(V)) {
                for (var me = 0; me < V.length; me++)
                  at(V[me], e);
                Object.freeze && Object.freeze(V);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              at(V, e);
        }
        if (z.call(r, "key")) {
          var re = L(e), M = Object.keys(r).filter(function(Ot) {
            return Ot !== "key";
          }), Je = M.length > 0 ? "{key: someKey, " + M.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!st[re + Je]) {
            var Ct = M.length > 0 ? "{" + M.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Je, re, Ct, re), st[re + Je] = !0;
          }
        }
        return e === m ? Rt(j) : St(j), j;
      }
    }
    function jt(e, r, i) {
      return ot(e, r, i, !0);
    }
    function Dt(e, r, i) {
      return ot(e, r, i, !1);
    }
    var Nt = Dt, Lt = jt;
    Se.Fragment = m, Se.jsx = Nt, Se.jsxs = Lt;
  }()), Se;
}
process.env.NODE_ENV === "production" ? Qe.exports = kt() : Qe.exports = Pt();
var u = Qe.exports;
const ze = {}, vt = "/api/imu/latest", At = "/api/imu/history", Me = 12, Mt = 1e3, Ze = "dodec-labels", gt = ["dodeca-labels"], ct = "dodec-activity-log", Ft = "Side", $t = 24 * 60 * 60 * 1e3, qe = "DODEC_LABEL_UPDATE", ut = "DODEC_LABELS_REQUEST", dt = (() => {
  const l = ze == null ? void 0 : ze.VITE_DEVICE_LABELS_URL;
  if (l && l.length > 0)
    return l;
  try {
    const d = new URL(vt, "https://placeholder.local");
    return `${d.origin === "https://placeholder.local" ? "" : `${d.protocol}//${d.host}`}/api/labels`;
  } catch {
    return "/api/labels";
  }
})(), It = Array.from({ length: Me }, (l, d) => d + 1), Ke = () => {
  const l = {};
  for (const d of It)
    l[d] = "";
  return l;
}, Yt = () => {
  if (typeof window > "u")
    return Ke();
  const l = (v) => {
    try {
      const m = window.localStorage.getItem(v);
      if (!m)
        return null;
      const x = JSON.parse(m), O = Ke();
      for (const [_, D] of Object.entries(x)) {
        const y = Number(_);
        Number.isFinite(y) && y >= 1 && y <= Me && (O[y] = String(D ?? ""));
      }
      return O;
    } catch (m) {
      return console.warn("Unable to read stored labels", m), null;
    }
  }, d = l(Ze);
  if (d)
    return d;
  for (const v of gt) {
    const m = l(v);
    if (m) {
      try {
        window.localStorage.setItem(Ze, JSON.stringify(m));
      } catch {
      }
      return m;
    }
  }
  return Ke();
}, ft = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), Xe = (l, d) => {
  var m;
  const v = (m = l[d]) == null ? void 0 : m.trim();
  return v && v.length > 0 ? v : `${Ft} ${d}`;
}, Ut = (l) => {
  const d = [l.received_at, l.imu_timestamp_iso];
  for (const v of d)
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
  const d = Date.parse(l);
  return Number.isNaN(d) ? null : d;
}, pe = (l) => {
  const d = new Date(l), v = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), x = String(d.getDate()).padStart(2, "0");
  return `${v}-${m}-${x}`;
}, je = (l) => {
  const [d, v, m] = l.split("-").map(Number);
  return new Date(d, v - 1, m);
}, Ae = (l) => {
  const d = je(l), v = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), m = v + $t;
  return { start: v, end: m };
}, mt = (l) => {
  const d = je(l);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(d);
}, Wt = (l) => l ? l.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", Re = (l) => {
  if (!Number.isFinite(l) || l <= 0)
    return "00:00";
  const d = Math.floor(l / 1e3), v = Math.floor(d / 3600), m = Math.floor(d % 3600 / 60), x = d % 60;
  return v > 0 ? `${String(v).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(x).padStart(2, "0")}` : `${String(m).padStart(2, "0")}:${String(x).padStart(2, "0")}`;
}, Bt = (l) => Re(l), Ht = (l) => {
  const d = l.trim();
  if (!d)
    return NaN;
  const v = d.split(":");
  if (v.length > 1) {
    if (v.length > 3)
      return NaN;
    const x = v.map((y) => Number(y));
    if (x.some((y) => Number.isNaN(y) || y < 0))
      return NaN;
    let O = 0, _ = 0, D = 0;
    return x.length === 3 ? [O, _, D] = x : [_, D] = x, Math.max(0, O * 3600 + _ * 60 + D) * 1e3;
  }
  const m = Number(d);
  return Number.isNaN(m) || m < 0 ? NaN : m * 60 * 1e3;
}, pt = (l) => l.includes('"') || l.includes(",") || l.includes(`
`) ? `"${l.replace(/"/g, '""')}"` : l;
function Gt() {
  const [l, d] = F(null), [v, m] = F(null), [x, O] = F(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(ct);
      return t ? JSON.parse(t) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), [_, D] = F(null), [y, Y] = F(""), [N, k] = F(""), [B, A] = F(null), [he, De] = F(() => [pe(Date.now())]), [H, K] = F("week"), [R, Fe] = F(pe(Date.now())), [ne, $e] = F(pe(Date.now())), [Ne, ve] = F(null), [W, ae] = F(() => Yt()), ge = Pe(W), se = Pe(!1), X = Pe({}), L = Pe(ft()), [J, Q] = F(!1), be = C((t, n, a) => {
    a <= n || O((c) => {
      const o = { ...c };
      let s = n;
      for (; s < a; ) {
        const p = pe(s), { end: E } = Ae(p), T = Math.min(a, E), I = Math.max(0, T - s);
        if (I > 0) {
          const U = { ...o[p] ?? {} };
          U[t] = (U[t] ?? 0) + I, o[p] = U;
        }
        s = T;
      }
      return o;
    });
  }, []), ye = C(() => {
    L.current = ft(), O(() => ({}));
  }, []), Z = C(
    (t) => {
      const n = typeof t.side == "number" ? t.side : null;
      if (!n)
        return;
      const a = Xe(ge.current, n), c = Ut(t), o = t.segment_started_at ? Vt(t.segment_started_at) : null, s = L.current;
      if (s.currentLabel === null || s.startTime === null) {
        s.currentLabel = a, s.startTime = o ?? c, s.lastTimestamp = c, s.lastSide = n;
        return;
      }
      if (a === s.currentLabel) {
        o !== null && (s.startTime === null || o < s.startTime) && (s.startTime = o), s.lastTimestamp = c, s.lastSide = n;
        return;
      }
      const p = s.startTime, E = c;
      E > p && be(s.currentLabel, p, E), s.currentLabel = a, s.startTime = o ?? c, s.lastTimestamp = c, s.lastSide = n;
    },
    [be]
  );
  G(() => {
    if (ge.current = W, typeof window < "u") {
      const n = JSON.stringify(W);
      window.localStorage.setItem(Ze, n);
      for (const a of gt)
        window.localStorage.setItem(a, n);
      !se.current && window.parent && window.parent !== window && window.parent.postMessage({ type: qe, labels: W }, "*");
    }
    se.current = !1;
    const t = L.current;
    t.lastSide !== null && (t.currentLabel = Xe(W, t.lastSide));
  }, [W]), G(() => {
    typeof window < "u" && window.localStorage.setItem(ct, JSON.stringify(x));
  }, [x]), G(() => () => {
    if (!(typeof window > "u"))
      for (const t of Object.keys(X.current)) {
        const n = X.current[Number(t)];
        typeof n == "number" && window.clearTimeout(n);
      }
  }, []), G(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(dt, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`Failed to load labels (status ${a.status})`);
        const c = await a.json();
        if (t || !c || typeof c.labels != "object" || c.labels === null)
          return;
        se.current = !0, ae((o) => {
          const s = { ...o };
          let p = !1;
          for (const [E, T] of Object.entries(c.labels)) {
            const I = Number(E);
            if (!Number.isFinite(I) || I < 1 || I > Me)
              continue;
            const U = typeof T == "string" ? T : "";
            s[I] !== U && (s[I] = U, p = !0);
          }
          return p ? s : o;
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
    const t = (n) => {
      const a = n == null ? void 0 : n.data;
      if (!(!a || typeof a != "object"))
        if (a.type === qe && a.labels && typeof a.labels == "object") {
          se.current = !0;
          const c = a.labels;
          ae((o) => {
            const s = { ...o };
            for (const [p, E] of Object.entries(c)) {
              const T = Number(p);
              !Number.isFinite(T) || T < 1 || T > Me || (s[T] = typeof E == "string" ? E : "");
            }
            return { ...s };
          });
        } else a.type === ut && window.parent && window.parent !== window && window.parent.postMessage({ type: qe, labels: ge.current }, n.origin || "*");
    };
    return window.addEventListener("message", t), window.parent && window.parent !== window && window.parent.postMessage({ type: ut }, "*"), () => {
      window.removeEventListener("message", t);
    };
  }, []), G(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(`${At}?limit=5000`, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`History request failed with status ${a.status}`);
        const c = await a.json();
        if (t)
          return;
        ye();
        let o = null;
        for (const s of c) {
          if (t)
            break;
          Z(s), o = s;
        }
        o && d({
          side: typeof o.side == "number" ? o.side : null,
          imu_timestamp_text: o.imu_timestamp_text ?? null,
          imu_timestamp_iso: o.imu_timestamp_iso ?? null,
          received_at: o.received_at ?? null,
          confidence: o.confidence ?? null
        }), m(null);
      } catch (a) {
        t || m(a instanceof Error ? a.message : "Unknown error while loading history");
      } finally {
        t || Q(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [Z, ye]), G(() => {
    if (!J)
      return;
    let t = !0;
    const n = async () => {
      try {
        const c = await fetch(vt, { cache: "no-store" });
        if (!c.ok)
          throw new Error(`Request failed with status ${c.status}`);
        const o = await c.json();
        if (!t)
          return;
        Z(o), d({
          side: typeof o.side == "number" ? o.side : null,
          imu_timestamp_text: o.imu_timestamp_text ?? null,
          imu_timestamp_iso: o.imu_timestamp_iso ?? null,
          received_at: o.received_at ?? null,
          confidence: o.confidence ?? null
        }), m(null);
      } catch (c) {
        t && m(c instanceof Error ? c.message : "Unknown error");
      }
    };
    n();
    const a = window.setInterval(n, Mt);
    return () => {
      t = !1, window.clearInterval(a);
    };
  }, [Z, J]);
  const we = L.current, $ = we.lastTimestamp ? pe(we.lastTimestamp) : pe(Date.now());
  G(() => {
    De((t) => t.includes($) ? t : [...t, $]);
  }, [$]);
  const oe = C(async (t, n) => {
    try {
      const a = await fetch(`${dt.replace(/\/$/, "")}/${t}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: n })
      });
      if (!a.ok)
        throw new Error(`Failed to persist label (status ${a.status})`);
    } catch (a) {
      console.error(`[timesheet-app] failed to persist label for side ${t}`, a);
    }
  }, []), Ee = C((t, n) => {
    const a = n.trim();
    if (typeof window > "u") {
      oe(t, a);
      return;
    }
    const c = X.current[t];
    typeof c == "number" && window.clearTimeout(c), X.current[t] = window.setTimeout(() => {
      X.current[t] = null, oe(t, a);
    }, 400);
  }, [oe]);
  C(
    (t) => (n) => {
      const a = n.target.value;
      ae((c) => ({ ...c, [t]: a })), Ee(t, a);
    },
    [Ee]
  );
  const ee = (t, n) => {
    const a = L.current;
    if (!a.currentLabel || a.currentLabel !== n || a.startTime === null || a.lastTimestamp === null)
      return 0;
    const { start: c, end: o } = Ae(t), s = Math.max(c, a.startTime), p = Math.min(o, a.lastTimestamp);
    return p > s ? p - s : 0;
  }, ie = C(
    (t) => {
      const n = x[t] ?? {}, a = Object.entries(n).map(([o, s]) => ({ label: o, totalMs: s })), c = L.current;
      if (c.currentLabel && c.startTime !== null && c.lastTimestamp !== null) {
        const o = ee(t, c.currentLabel);
        if (o > 0) {
          const s = a.find((p) => p.label === c.currentLabel);
          s ? s.totalMs += o : a.push({ label: c.currentLabel, totalMs: o });
        }
      }
      return a.sort((o, s) => s.totalMs - o.totalMs);
    },
    [x, l]
  ), le = Ge(() => {
    const t = new Set(Object.keys(x));
    return t.add($), Array.from(t).sort((n, a) => n === a ? 0 : n > a ? -1 : 1);
  }, [x, $]), te = Ge(() => le.map((t) => {
    const n = ie(t);
    if (n.length === 0)
      return null;
    const a = n.reduce((c, o) => c + o.totalMs, 0);
    return { dateKey: t, rows: n, totalMs: a };
  }).filter(Boolean), [le, ie]), _e = C((t, n, a) => {
    if (L.current.currentLabel === n && t === $) {
      A("Stop the current activity before editing it.");
      return;
    }
    D({ dateKey: t, originalLabel: n }), Y(Bt(a)), k(n), A(null);
  }, [$]), ce = C((t) => {
    Y(t.target.value);
  }, []), xe = C((t) => {
    k(t.target.value);
  }, []), ue = C(() => {
    D(null), Y(""), k(""), A(null);
  }, []), Ie = C(() => {
    if (!_)
      return;
    const { dateKey: t, originalLabel: n } = _, a = Ht(y);
    if (!Number.isFinite(a)) {
      A("Please enter duration as mm:ss, hh:mm:ss, or minutes.");
      return;
    }
    const c = N.trim();
    if (c.length === 0) {
      A("Activity name cannot be empty.");
      return;
    }
    const o = ee(t, n);
    if (a < o) {
      A(`Duration cannot be less than the active segment (${Re(o)}).`);
      return;
    }
    const s = Math.max(0, a - o);
    O((p) => {
      const E = { ...p }, T = { ...E[t] ?? {} };
      return n in T && delete T[n], s > 0 && (T[c] = (T[c] ?? 0) + s), Object.keys(T).length === 0 ? delete E[t] : E[t] = T, E;
    }), D(null), Y(""), k(""), A(null);
  }, [_, y, N, ee]), Le = C(
    (t, n) => {
      if (ee(t, n) > 0) {
        A("Stop the current activity before deleting it.");
        return;
      }
      O((c) => {
        const o = c[t];
        if (!o || !(n in o))
          return c;
        const s = { ...c }, p = { ...o };
        return delete p[n], Object.keys(p).length === 0 ? delete s[t] : s[t] = p, s;
      }), _ && _.dateKey === t && _.originalLabel === n && (D(null), Y(""), k("")), A(null);
    },
    [_]
  ), Ye = C((t) => {
    De((n) => n.includes(t) ? n.filter((a) => a !== t) : [...n, t]);
  }, []), Ue = () => {
    if (H === "week") {
      const { start: o, end: s } = Ae($), p = new Date(o);
      return p.setDate(p.getDate() - 6), { start: new Date(p.getFullYear(), p.getMonth(), p.getDate()).getTime(), end: s };
    }
    if (H === "month") {
      const o = je($), s = new Date(o.getFullYear(), o.getMonth(), 1).getTime(), p = new Date(o.getFullYear(), o.getMonth() + 1, 1).getTime();
      return { start: s, end: p };
    }
    const t = je(R), n = je(ne);
    if (Number.isNaN(t.getTime()) || Number.isNaN(n.getTime()) || t > n)
      return null;
    const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), c = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1).getTime();
    return { start: a, end: c };
  }, de = C(() => {
    const t = Ue();
    if (!t) {
      ve("Please provide a valid date range before downloading.");
      return;
    }
    const n = [];
    for (const E of le) {
      const { start: T, end: I } = Ae(E);
      if (I <= t.start || T >= t.end)
        continue;
      const U = ie(E);
      if (U.length === 0)
        continue;
      const Ve = mt(E);
      for (const ke of U)
        n.push(`${pt(Ve)},${pt(ke.label)},${Re(ke.totalMs)}`);
    }
    if (n.length === 0) {
      ve("No activity recorded in the selected range.");
      return;
    }
    const a = ["Date,Activity,Duration", ...n].join(`
`), c = new Blob([a], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(c), s = document.createElement("a");
    s.href = o;
    const p = H === "custom" ? "custom" : H;
    s.download = `activity-log-${p}.csv`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(o), ve(null);
  }, [ie, H, le, R, ne]), z = (l == null ? void 0 : l.side) ?? null, Ce = Ge(() => z === null ? null : Xe(W, z), [z, W]), Oe = (l == null ? void 0 : l.imu_timestamp_text) ?? (l == null ? void 0 : l.imu_timestamp_iso) ?? (l == null ? void 0 : l.received_at) ?? null, q = C(() => {
    var c, o, s;
    if (typeof window > "u" || window.parent === window)
      return;
    const t = window.document, n = ((c = t.documentElement) == null ? void 0 : c.scrollHeight) || ((o = t.body) == null ? void 0 : o.scrollHeight) || window.innerHeight, a = Math.max(320, Math.min(Math.ceil(n), 4e3));
    (s = window.parent) == null || s.postMessage({ type: "EMBED_HEIGHT", height: a }, "*");
  }, []);
  return G(() => {
    q();
  }, [q, te.length, he, W, _, H]), G(() => {
    if (typeof window > "u")
      return;
    const t = () => q();
    window.addEventListener("load", t), window.addEventListener("resize", t);
    let n = null;
    return typeof ResizeObserver < "u" && (n = new ResizeObserver(t), n.observe(window.document.documentElement)), () => {
      window.removeEventListener("load", t), window.removeEventListener("resize", t), n == null || n.disconnect();
    };
  }, [q]), /* @__PURE__ */ u.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ u.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Wt(Oe) })
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
              value: H,
              onChange: (t) => K(t.target.value),
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
                value: R,
                max: ne,
                onChange: (t) => Fe(t.target.value)
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
                value: ne,
                min: R,
                onChange: (t) => $e(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "download-button", onClick: de, children: "Download CSV" })
      ] }),
      Ne ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: Ne }) : null,
      te.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : te.map(({ dateKey: t, rows: n, totalMs: a }) => {
        const c = he.includes(t), o = L.current;
        return /* @__PURE__ */ u.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ u.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${c ? " date-header--expanded" : ""}`,
              onClick: () => Ye(t),
              children: [
                /* @__PURE__ */ u.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ u.jsx("span", { className: "date-label", children: mt(t) }),
                  /* @__PURE__ */ u.jsxs("span", { className: "date-summary", children: [
                    n.length,
                    " activit",
                    n.length === 1 ? "y" : "ies",
                    " - ",
                    Re(a)
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
            /* @__PURE__ */ u.jsx("tbody", { children: n.map((s) => {
              const p = (_ == null ? void 0 : _.dateKey) === t && _.originalLabel === s.label, E = o.currentLabel === s.label && t === $;
              return /* @__PURE__ */ u.jsxs("tr", { children: [
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: N,
                    onChange: xe,
                    placeholder: "Activity name"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: s.label }) }),
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: y,
                    onChange: ce,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: Re(s.totalMs) }) }),
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
                  /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button", onClick: ue, children: "Cancel" })
                ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: E,
                      onClick: () => _e(t, s.label, s.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: E,
                      onClick: () => Le(t, s.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${s.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      B ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: B }) : null
    ] })
  ] });
}
export {
  Gt as TimesheetDevice
};
