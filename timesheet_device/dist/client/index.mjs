import Lt, { useState as k, useRef as ae, useCallback as x, useEffect as Y, useMemo as ft } from "react";
var yt = { exports: {} }, Ie = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Et;
function Pt() {
  if (Et) return Ie;
  Et = 1;
  var c = Lt, d = Symbol.for("react.element"), h = Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, b = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, P = { key: !0, ref: !0, __self: !0, __source: !0 };
  function T(w, g, M) {
    var R, V = {}, B = null, me = null;
    M !== void 0 && (B = "" + M), g.key !== void 0 && (B = "" + g.key), g.ref !== void 0 && (me = g.ref);
    for (R in g) f.call(g, R) && !P.hasOwnProperty(R) && (V[R] = g[R]);
    if (w && w.defaultProps) for (R in g = w.defaultProps, g) V[R] === void 0 && (V[R] = g[R]);
    return { $$typeof: d, type: w, key: B, ref: me, props: V, _owner: b.current };
  }
  return Ie.Fragment = h, Ie.jsx = T, Ie.jsxs = T, Ie;
}
var Fe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var St;
function Mt() {
  return St || (St = 1, process.env.NODE_ENV !== "production" && function() {
    var c = Lt, d = Symbol.for("react.element"), h = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), P = Symbol.for("react.profiler"), T = Symbol.for("react.provider"), w = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), me = Symbol.for("react.offscreen"), H = Symbol.iterator, Ue = "@@iterator";
    function Ve(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = H && e[H] || e[Ue];
      return typeof n == "function" ? n : null;
    }
    var I = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function A(e) {
      {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), m = 1; m < n; m++)
          l[m - 1] = arguments[m];
        Se("error", e, l);
      }
    }
    function Se(e, n, l) {
      {
        var m = I.ReactDebugCurrentFrame, E = m.getStackAddendum();
        E !== "" && (n += "%s", l = l.concat([E]));
        var _ = l.map(function(y) {
          return String(y);
        });
        _.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, _);
      }
    }
    var tt = !1, _e = !1, rt = !1, Be = !1, Le = !1, pe;
    pe = Symbol.for("react.module.reference");
    function De(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === f || e === P || Le || e === b || e === M || e === R || Be || e === me || tt || _e || rt || typeof e == "object" && e !== null && (e.$$typeof === B || e.$$typeof === V || e.$$typeof === T || e.$$typeof === w || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === pe || e.getModuleId !== void 0));
    }
    function Ce(e, n, l) {
      var m = e.displayName;
      if (m)
        return m;
      var E = n.displayName || n.name || "";
      return E !== "" ? l + "(" + E + ")" : l;
    }
    function se(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && A("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case f:
          return "Fragment";
        case h:
          return "Portal";
        case P:
          return "Profiler";
        case b:
          return "StrictMode";
        case M:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case w:
            var n = e;
            return se(n) + ".Consumer";
          case T:
            var l = e;
            return se(l._context) + ".Provider";
          case g:
            return Ce(e, e.render, "ForwardRef");
          case V:
            var m = e.displayName || null;
            return m !== null ? m : O(e.type) || "Memo";
          case B: {
            var E = e, _ = E._payload, y = E._init;
            try {
              return O(y(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var K = Object.assign, oe = 0, he, le, ee, X, Oe, We, Q;
    function Te() {
    }
    Te.__reactDisabledLog = !0;
    function wt() {
      {
        if (oe === 0) {
          he = console.log, le = console.info, ee = console.warn, X = console.error, Oe = console.group, We = console.groupCollapsed, Q = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Te,
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
    function Je() {
      {
        if (oe--, oe === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: K({}, e, {
              value: he
            }),
            info: K({}, e, {
              value: le
            }),
            warn: K({}, e, {
              value: ee
            }),
            error: K({}, e, {
              value: X
            }),
            group: K({}, e, {
              value: Oe
            }),
            groupCollapsed: K({}, e, {
              value: We
            }),
            groupEnd: K({}, e, {
              value: Q
            })
          });
        }
        oe < 0 && A("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var W = I.ReactCurrentDispatcher, te;
    function ce(e, n, l) {
      {
        if (te === void 0)
          try {
            throw Error();
          } catch (E) {
            var m = E.stack.trim().match(/\n( *(at )?)/);
            te = m && m[1] || "";
          }
        return `
` + te + e;
      }
    }
    var ve = !1, ie;
    {
      var ge = typeof WeakMap == "function" ? WeakMap : Map;
      ie = new ge();
    }
    function J(e, n) {
      if (!e || ve)
        return "";
      {
        var l = ie.get(e);
        if (l !== void 0)
          return l;
      }
      var m;
      ve = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = W.current, W.current = null, wt();
      try {
        if (n) {
          var y = function() {
            throw Error();
          };
          if (Object.defineProperty(y.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(y, []);
            } catch (U) {
              m = U;
            }
            Reflect.construct(e, [], y);
          } else {
            try {
              y.call();
            } catch (U) {
              m = U;
            }
            e.call(y.prototype);
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
`), N = v.length - 1, C = $.length - 1; N >= 1 && C >= 0 && v[N] !== $[C]; )
            C--;
          for (; N >= 1 && C >= 0; N--, C--)
            if (v[N] !== $[C]) {
              if (N !== 1 || C !== 1)
                do
                  if (N--, C--, C < 0 || v[N] !== $[C]) {
                    var q = `
` + v[N].replace(" at new ", " at ");
                    return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), typeof e == "function" && ie.set(e, q), q;
                  }
                while (N >= 1 && C >= 0);
              break;
            }
        }
      } finally {
        ve = !1, W.current = _, Je(), Error.prepareStackTrace = E;
      }
      var xe = e ? e.displayName || e.name : "", Ee = xe ? ce(xe) : "";
      return typeof e == "function" && ie.set(e, Ee), Ee;
    }
    function ue(e, n, l) {
      return J(e, !1);
    }
    function Ge(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function ye(e, n, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return J(e, Ge(e));
      if (typeof e == "string")
        return ce(e);
      switch (e) {
        case M:
          return ce("Suspense");
        case R:
          return ce("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return ue(e.render);
          case V:
            return ye(e.type, n, l);
          case B: {
            var m = e, E = m._payload, _ = m._init;
            try {
              return ye(_(E), n, l);
            } catch {
            }
          }
        }
      return "";
    }
    var re = Object.prototype.hasOwnProperty, ke = {}, G = I.ReactDebugCurrentFrame;
    function de(e) {
      if (e) {
        var n = e._owner, l = ye(e.type, e._source, n ? n.type : null);
        G.setExtraStackFrame(l);
      } else
        G.setExtraStackFrame(null);
    }
    function He(e, n, l, m, E) {
      {
        var _ = Function.call.bind(re);
        for (var y in e)
          if (_(e, y)) {
            var v = void 0;
            try {
              if (typeof e[y] != "function") {
                var $ = Error((m || "React class") + ": " + l + " type `" + y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[y] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $.name = "Invariant Violation", $;
              }
              v = e[y](n, y, m, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (N) {
              v = N;
            }
            v && !(v instanceof Error) && (de(E), A("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", l, y, typeof v), de(null)), v instanceof Error && !(v.message in ke) && (ke[v.message] = !0, de(E), A("Failed %s type: %s", l, v.message), de(null));
          }
      }
    }
    var be = Array.isArray;
    function fe(e) {
      return be(e);
    }
    function Re(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, l = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function Ae(e) {
      try {
        return ze(e), !1;
      } catch {
        return !0;
      }
    }
    function ze(e) {
      return "" + e;
    }
    function qe(e) {
      if (Ae(e))
        return A("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Re(e)), ze(e);
    }
    var Ke = I.ReactCurrentOwner, nt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, we, Xe;
    function at(e) {
      if (re.call(e, "ref")) {
        var n = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function st(e) {
      if (re.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ot(e, n) {
      typeof e.ref == "string" && Ke.current;
    }
    function it(e, n) {
      {
        var l = function() {
          we || (we = !0, A("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: l,
          configurable: !0
        });
      }
    }
    function Pe(e, n) {
      {
        var l = function() {
          Xe || (Xe = !0, A("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: l,
          configurable: !0
        });
      }
    }
    var lt = function(e, n, l, m, E, _, y) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: n,
        ref: l,
        props: y,
        // Record the component responsible for creating this element.
        _owner: _
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
    function ct(e, n, l, m, E) {
      {
        var _, y = {}, v = null, $ = null;
        l !== void 0 && (qe(l), v = "" + l), st(n) && (qe(n.key), v = "" + n.key), at(n) && ($ = n.ref, ot(n, E));
        for (_ in n)
          re.call(n, _) && !nt.hasOwnProperty(_) && (y[_] = n[_]);
        if (e && e.defaultProps) {
          var N = e.defaultProps;
          for (_ in N)
            y[_] === void 0 && (y[_] = N[_]);
        }
        if (v || $) {
          var C = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && it(y, C), $ && Pe(y, C);
        }
        return lt(e, v, $, E, m, Ke.current, y);
      }
    }
    var z = I.ReactCurrentOwner, Qe = I.ReactDebugCurrentFrame;
    function Z(e) {
      if (e) {
        var n = e._owner, l = ye(e.type, e._source, n ? n.type : null);
        Qe.setExtraStackFrame(l);
      } else
        Qe.setExtraStackFrame(null);
    }
    var t;
    t = !1;
    function r(e) {
      return typeof e == "object" && e !== null && e.$$typeof === d;
    }
    function a() {
      {
        if (z.current) {
          var e = O(z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function o(e) {
      return "";
    }
    var i = {};
    function s(e) {
      {
        var n = a();
        if (!n) {
          var l = typeof e == "string" ? e : e.displayName || e.name;
          l && (n = `

Check the top-level render call using <` + l + ">.");
        }
        return n;
      }
    }
    function p(e, n) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var l = s(n);
        if (i[l])
          return;
        i[l] = !0;
        var m = "";
        e && e._owner && e._owner !== z.current && (m = " It was passed a child from " + O(e._owner.type) + "."), Z(e), A('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, m), Z(null);
      }
    }
    function S(e, n) {
      {
        if (typeof e != "object")
          return;
        if (fe(e))
          for (var l = 0; l < e.length; l++) {
            var m = e[l];
            r(m) && p(m, n);
          }
        else if (r(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var E = Ve(e);
          if (typeof E == "function" && E !== e.entries)
            for (var _ = E.call(e), y; !(y = _.next()).done; )
              r(y.value) && p(y.value, n);
        }
      }
    }
    function L(e) {
      {
        var n = e.type;
        if (n == null || typeof n == "string")
          return;
        var l;
        if (typeof n == "function")
          l = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === V))
          l = n.propTypes;
        else
          return;
        if (l) {
          var m = O(n);
          He(l, e.props, "prop", m, e);
        } else if (n.PropTypes !== void 0 && !t) {
          t = !0;
          var E = O(n);
          A("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && A("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function D(e) {
      {
        for (var n = Object.keys(e.props), l = 0; l < n.length; l++) {
          var m = n[l];
          if (m !== "children" && m !== "key") {
            Z(e), A("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), Z(null);
            break;
          }
        }
        e.ref !== null && (Z(e), A("Invalid attribute `ref` supplied to `React.Fragment`."), Z(null));
      }
    }
    var j = {};
    function ne(e, n, l, m, E, _) {
      {
        var y = De(e);
        if (!y) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $ = o();
          $ ? v += $ : v += a();
          var N;
          e === null ? N = "null" : fe(e) ? N = "array" : e !== void 0 && e.$$typeof === d ? (N = "<" + (O(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : N = typeof e, A("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", N, v);
        }
        var C = ct(e, n, l, E, _);
        if (C == null)
          return C;
        if (y) {
          var q = n.children;
          if (q !== void 0)
            if (m)
              if (fe(q)) {
                for (var xe = 0; xe < q.length; xe++)
                  S(q[xe], e);
                Object.freeze && Object.freeze(q);
              } else
                A("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              S(q, e);
        }
        if (re.call(n, "key")) {
          var Ee = O(e), U = Object.keys(n).filter(function(At) {
            return At !== "key";
          }), dt = U.length > 0 ? "{key: someKey, " + U.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!j[Ee + dt]) {
            var kt = U.length > 0 ? "{" + U.join(": ..., ") + ": ...}" : "{}";
            A(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, dt, Ee, kt, Ee), j[Ee + dt] = !0;
          }
        }
        return e === f ? D(C) : L(C), C;
      }
    }
    function F(e, n, l) {
      return ne(e, n, l, !0);
    }
    function Me(e, n, l) {
      return ne(e, n, l, !1);
    }
    var ut = Me, Ot = F;
    Fe.Fragment = f, Fe.jsx = ut, Fe.jsxs = Ot;
  }()), Fe;
}
process.env.NODE_ENV === "production" ? yt.exports = Pt() : yt.exports = Mt();
var u = yt.exports;
const Ne = {}, Dt = "/api/imu/latest", It = "/api/imu/history", et = 12, Ft = 1e3, bt = "dodec-labels", Ct = ["dodeca-labels"], _t = "dodec-activity-log", $t = "Side", Yt = 24 * 60 * 60 * 1e3, mt = "DODEC_LABEL_UPDATE", Tt = "DODEC_LABELS_REQUEST", Rt = (() => {
  const c = Ne == null ? void 0 : Ne.VITE_DEVICE_LABELS_URL;
  if (c && c.length > 0)
    return c;
  try {
    const d = new URL(Dt, "https://placeholder.local");
    return `${d.origin === "https://placeholder.local" ? "" : `${d.protocol}//${d.host}`}/api/labels`;
  } catch {
    return "/api/labels";
  }
})(), pt = (Ne == null ? void 0 : Ne.VITE_DEVICE_ACTIVITY_LOG_URL) ?? "/api/activity-log", Ut = 5 * 60 * 1e3, xt = (c) => {
  const d = {};
  if (!c || typeof c != "object")
    return d;
  for (const [h, f] of Object.entries(c)) {
    if (typeof h != "string" || h.length === 0 || !f || typeof f != "object")
      continue;
    const b = {};
    for (const [P, T] of Object.entries(f)) {
      if (typeof P != "string" || P.length === 0)
        continue;
      let w = 0, g = null;
      if (typeof T == "number")
        w = Number.isFinite(T) && T > 0 ? Math.floor(T) : 0;
      else if (T && typeof T == "object") {
        const M = T.totalMs, R = T.side;
        typeof M == "number" && Number.isFinite(M) && M > 0 && (w = Math.floor(M)), typeof R == "number" && Number.isFinite(R) && (g = Math.floor(R));
      }
      (w > 0 || g !== null) && (b[P] = { totalMs: w, side: g });
    }
    Object.keys(b).length > 0 && (d[h] = b);
  }
  return d;
}, Vt = Array.from({ length: et }, (c, d) => d + 1), ht = () => {
  const c = {};
  for (const d of Vt)
    c[d] = "";
  return c;
}, Bt = () => {
  if (typeof window > "u")
    return ht();
  const c = (h) => {
    try {
      const f = window.localStorage.getItem(h);
      if (!f)
        return null;
      const b = JSON.parse(f), P = ht();
      for (const [T, w] of Object.entries(b)) {
        const g = Number(T);
        Number.isFinite(g) && g >= 1 && g <= et && (P[g] = String(w ?? ""));
      }
      return P;
    } catch (f) {
      return console.warn("Unable to read stored labels", f), null;
    }
  }, d = c(bt);
  if (d)
    return d;
  for (const h of Ct) {
    const f = c(h);
    if (f) {
      try {
        window.localStorage.setItem(bt, JSON.stringify(f));
      } catch {
      }
      return f;
    }
  }
  return ht();
}, jt = () => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null
}), vt = (c, d) => {
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
}, je = (c) => {
  const d = new Date(c), h = d.getFullYear(), f = String(d.getMonth() + 1).padStart(2, "0"), b = String(d.getDate()).padStart(2, "0");
  return `${h}-${f}-${b}`;
}, Ye = (c) => {
  const [d, h, f] = c.split("-").map(Number);
  return new Date(d, h - 1, f);
}, Ze = (c) => {
  const d = Ye(c), h = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), f = h + Yt;
  return { start: h, end: f };
}, Nt = (c) => {
  const d = Ye(c);
  return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(d);
}, Gt = (c) => c ? c.replace("T", " ").replace(/\+.*$/, "") : "Waiting for data?", $e = (c) => {
  if (!Number.isFinite(c) || c <= 0)
    return "00:00";
  const d = Math.floor(c / 1e3), h = Math.floor(d / 3600), f = Math.floor(d % 3600 / 60), b = d % 60;
  return h > 0 ? `${String(h).padStart(2, "0")}:${String(f).padStart(2, "0")}:${String(b).padStart(2, "0")}` : `${String(f).padStart(2, "0")}:${String(b).padStart(2, "0")}`;
}, Ht = (c) => $e(c), zt = (c) => {
  const d = c.trim();
  if (!d)
    return NaN;
  const h = d.split(":");
  if (h.length > 1) {
    if (h.length > 3)
      return NaN;
    const b = h.map((g) => Number(g));
    if (b.some((g) => Number.isNaN(g) || g < 0))
      return NaN;
    let P = 0, T = 0, w = 0;
    return b.length === 3 ? [P, T, w] = b : [T, w] = b, Math.max(0, P * 3600 + T * 60 + w) * 1e3;
  }
  const f = Number(d);
  return Number.isNaN(f) || f < 0 ? NaN : f * 60 * 1e3;
}, gt = (c) => c.includes('"') || c.includes(",") || c.includes(`
`) ? `"${c.replace(/"/g, '""')}"` : c;
function Kt() {
  const [c, d] = k(null), [h, f] = k(null), [b, P] = k(() => {
    if (typeof window > "u")
      return {};
    try {
      const t = window.localStorage.getItem(_t);
      return t ? xt(JSON.parse(t)) : {};
    } catch (t) {
      return console.warn("Unable to read stored activity log", t), {};
    }
  }), T = ae(b), [w, g] = k(null), [M, R] = k(""), [V, B] = k(""), [me, H] = k(null), [Ue, Ve] = k(() => [je(Date.now())]), [I, A] = k("week"), [Se, tt] = k(je(Date.now())), [_e, rt] = k(je(Date.now())), [Be, Le] = k(null), [pe, De] = k(!1), [Ce, se] = k(null), [O, K] = k(() => Bt()), oe = ae(O), he = ae(!1), le = ae({}), ee = ae(null), X = ae(jt()), [Oe, We] = k(!1), [Q, Te] = k(!1), [wt, Je] = k(!1), W = ae(!1), te = ae(!1), ce = ae(0), ve = ae(!1), ie = x(() => {
    W.current || (W.current = !0, Je(!0));
  }, []), ge = x(() => {
    W.current && (W.current = !1, Je(!1));
  }, []), J = x(
    (t, r) => {
      P((a) => {
        const o = t(a);
        return T.current = o, ((r == null ? void 0 : r.markDirty) ?? !0) && o !== a && (Q || (te.current = !0), ie()), o;
      });
    },
    [Q, ie]
  ), ue = x(
    async (t) => {
      const r = (t == null ? void 0 : t.allowSkip) ?? !0, a = ce.current + 1;
      ce.current = a;
      const o = await fetch(pt, { cache: "no-store" });
      if (!o.ok)
        throw new Error(`Activity log request failed with status ${o.status}`);
      const i = await o.json();
      if (a !== ce.current)
        return !1;
      if (i && typeof i == "object" && i.entries) {
        if (r && te.current)
          return console.warn("[activity-log] skipped applying remote log because local edits occurred first"), te.current = !1, Te(!0), W.current || ge(), !1;
        ve.current = !0, J(() => xt(i.entries), { markDirty: !1 });
      }
      return te.current = !1, Te(!0), W.current || ge(), !0;
    },
    [J, ge]
  );
  Y(() => {
    T.current = b;
  }, [b]);
  const Ge = x((t, r, a, o) => {
    o <= a || J((i) => {
      const s = { ...i };
      let p = a;
      for (; p < o; ) {
        const S = je(p), { end: L } = Ze(S), D = Math.min(o, L), j = Math.max(0, D - p);
        if (j > 0) {
          const ne = { ...s[S] ?? {} }, F = ne[t], Me = ((F == null ? void 0 : F.totalMs) ?? 0) + j, ut = r ?? (F == null ? void 0 : F.side) ?? null;
          ne[t] = { totalMs: Me, side: ut }, s[S] = ne;
        }
        p = D;
      }
      return s;
    });
  }, [J]), ye = x(() => {
    X.current = jt(), J(() => ({}));
  }, [J]), re = x(
    (t) => {
      const r = typeof t.side == "number" ? t.side : null;
      if (!r)
        return;
      const a = vt(oe.current, r), o = Wt(t), i = t.segment_started_at ? Jt(t.segment_started_at) : null, s = X.current;
      if (s.currentLabel === null || s.startTime === null) {
        s.currentLabel = a, s.startTime = i ?? o, s.lastTimestamp = o, s.lastSide = r;
        return;
      }
      if (a === s.currentLabel) {
        i !== null && (s.startTime === null || i < s.startTime) && (s.startTime = i), s.lastTimestamp = o, s.lastSide = r;
        return;
      }
      const p = s.startTime, S = o;
      S > p && Ge(s.currentLabel, s.lastSide, p, S), s.currentLabel = a, s.startTime = i ?? o, s.lastTimestamp = o, s.lastSide = r;
    },
    [Ge]
  );
  Y(() => {
    if (oe.current = O, typeof window < "u") {
      const r = JSON.stringify(O);
      window.localStorage.setItem(bt, r);
      for (const a of Ct)
        window.localStorage.setItem(a, r);
      !he.current && window.parent && window.parent !== window && window.parent.postMessage({ type: mt, labels: O }, "*");
    }
    he.current = !1;
    const t = X.current;
    t.lastSide !== null && (t.currentLabel = vt(O, t.lastSide));
  }, [O]), Y(() => {
    typeof window < "u" && window.localStorage.setItem(_t, JSON.stringify(b));
  }, [b]), Y(() => {
    let t = !1;
    return (async () => {
      try {
        await ue({ allowSkip: !0 });
      } catch (a) {
        t || (console.warn("[activity-log] failed to load activity log from server", a), te.current = !1, Te(!0));
      }
    })(), () => {
      t = !0;
    };
  }, [ue]), Y(() => () => {
    if (!(typeof window > "u")) {
      for (const t of Object.keys(le.current)) {
        const r = le.current[Number(t)];
        typeof r == "number" && window.clearTimeout(r);
      }
      ee.current !== null && window.clearTimeout(ee.current);
    }
  }, []), Y(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(Rt, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`Failed to load labels (status ${a.status})`);
        const o = await a.json();
        if (t || !o || typeof o.labels != "object" || o.labels === null)
          return;
        he.current = !0, K((i) => {
          const s = { ...i };
          let p = !1;
          for (const [S, L] of Object.entries(o.labels)) {
            const D = Number(S);
            if (!Number.isFinite(D) || D < 1 || D > et)
              continue;
            const j = typeof L == "string" ? L : "";
            s[D] !== j && (s[D] = j, p = !0);
          }
          return p ? s : i;
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
        if (a.type === mt && a.labels && typeof a.labels == "object") {
          he.current = !0;
          const o = a.labels;
          K((i) => {
            const s = { ...i };
            for (const [p, S] of Object.entries(o)) {
              const L = Number(p);
              !Number.isFinite(L) || L < 1 || L > et || (s[L] = typeof S == "string" ? S : "");
            }
            return { ...s };
          });
        } else a.type === Tt && window.parent && window.parent !== window && window.parent.postMessage({ type: mt, labels: oe.current }, r.origin || "*");
    };
    return window.addEventListener("message", t), window.parent && window.parent !== window && window.parent.postMessage({ type: Tt }, "*"), () => {
      window.removeEventListener("message", t);
    };
  }, []), Y(() => {
    let t = !1;
    return (async () => {
      try {
        const a = await fetch(`${It}?limit=5000`, { cache: "no-store" });
        if (!a.ok)
          throw new Error(`History request failed with status ${a.status}`);
        const o = await a.json();
        if (t)
          return;
        ye();
        let i = null;
        for (const s of o) {
          if (t)
            break;
          re(s), i = s;
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
        t || We(!0);
      }
    })(), () => {
      t = !0;
    };
  }, [re, ye]), Y(() => {
    if (!Oe)
      return;
    let t = !0;
    const r = async () => {
      try {
        const o = await fetch(Dt, { cache: "no-store" });
        if (!o.ok)
          throw new Error(`Request failed with status ${o.status}`);
        const i = await o.json();
        if (!t)
          return;
        re(i), d({
          side: typeof i.side == "number" ? i.side : null,
          imu_timestamp_text: i.imu_timestamp_text ?? null,
          imu_timestamp_iso: i.imu_timestamp_iso ?? null,
          received_at: i.received_at ?? null,
          confidence: i.confidence ?? null
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
  }, [re, Oe]);
  const ke = X.current, G = ke.lastTimestamp ? je(ke.lastTimestamp) : je(Date.now());
  Y(() => {
    Ve((t) => t.includes(G) ? t : [...t, G]);
  }, [G]);
  const de = x(async (t, r) => {
    try {
      const a = await fetch(`${Rt.replace(/\/$/, "")}/${t}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: r })
      });
      if (!a.ok)
        throw new Error(`Failed to persist label (status ${a.status})`);
    } catch (a) {
      console.error(`[timesheet-app] failed to persist label for side ${t}`, a);
    }
  }, []), He = x((t, r) => {
    const a = r.trim();
    if (typeof window > "u") {
      de(t, a);
      return;
    }
    const o = le.current[t];
    typeof o == "number" && window.clearTimeout(o), le.current[t] = window.setTimeout(() => {
      le.current[t] = null, de(t, a);
    }, 400);
  }, [de]);
  x(
    (t) => (r) => {
      const a = r.target.value;
      K((o) => ({ ...o, [t]: a })), He(t, a);
    },
    [He]
  );
  const be = (t, r) => {
    const a = X.current;
    if (!a.currentLabel || a.currentLabel !== r || a.startTime === null || a.lastTimestamp === null)
      return 0;
    const { start: o, end: i } = Ze(t), s = Math.max(o, a.startTime), p = Math.min(i, a.lastTimestamp);
    return p > s ? p - s : 0;
  }, fe = x(
    (t) => {
      const r = b[t] ?? {}, a = Object.entries(r).map(([i, s]) => ({
        label: i,
        totalMs: s.totalMs,
        side: s.side ?? null
      })), o = X.current;
      if (o.currentLabel && o.startTime !== null && o.lastTimestamp !== null) {
        const i = be(t, o.currentLabel);
        if (i > 0) {
          const s = a.find((S) => S.label === o.currentLabel), p = o.lastSide;
          s ? (s.totalMs += i, s.side === null && (s.side = p)) : a.push({ label: o.currentLabel, totalMs: i, side: p ?? null });
        }
      }
      return a.sort((i, s) => s.totalMs - i.totalMs);
    },
    [b, c]
  ), Re = ft(() => {
    const t = new Set(Object.keys(b));
    return t.add(G), Array.from(t).sort((r, a) => r === a ? 0 : r > a ? -1 : 1);
  }, [b, G]), Ae = ft(() => Re.map((t) => {
    const r = fe(t);
    if (r.length === 0)
      return null;
    const a = r.reduce((o, i) => o + i.totalMs, 0);
    return { dateKey: t, rows: r, totalMs: a };
  }).filter(Boolean), [Re, fe]), ze = x((t, r, a) => {
    if (X.current.currentLabel === r && t === G) {
      H("Stop the current activity before editing it.");
      return;
    }
    g({ dateKey: t, originalLabel: r }), R(Ht(a)), B(r), H(null);
  }, [G]), qe = x((t) => {
    R(t.target.value);
  }, []), Ke = x((t) => {
    B(t.target.value);
  }, []), nt = x(() => {
    g(null), R(""), B(""), H(null);
  }, []), we = x(() => {
    if (!w)
      return !0;
    const { dateKey: t, originalLabel: r } = w, a = zt(M);
    if (!Number.isFinite(a))
      return H("Please enter duration as mm:ss, hh:mm:ss, or minutes."), !1;
    const o = V.trim();
    if (o.length === 0)
      return H("Activity name cannot be empty."), !1;
    const i = be(t, r);
    if (a < i)
      return H(`Duration cannot be less than the active segment (${$e(i)}).`), !1;
    const s = Math.max(0, a - i);
    return J((p) => {
      const S = { ...p }, L = { ...S[t] ?? {} }, D = L[r];
      if (D && delete L[r], s > 0) {
        const j = L[o], ne = ((j == null ? void 0 : j.totalMs) ?? 0) + s, F = o === r ? (D == null ? void 0 : D.side) ?? (j == null ? void 0 : j.side) ?? null : (j == null ? void 0 : j.side) ?? (D == null ? void 0 : D.side) ?? null;
        L[o] = { totalMs: ne, side: F };
      }
      return Object.keys(L).length === 0 ? delete S[t] : S[t] = L, S;
    }), g(null), R(""), B(""), H(null), !0;
  }, [J, w, M, V, be]), Xe = x(() => {
    we();
  }, [we]), at = x(
    (t, r) => {
      if (be(t, r) > 0) {
        H("Stop the current activity before deleting it.");
        return;
      }
      J((o) => {
        const i = o[t];
        if (!i || !(r in i))
          return o;
        const s = { ...o }, p = { ...i };
        return delete p[r], Object.keys(p).length === 0 ? delete s[t] : s[t] = p, s;
      }), w && w.dateKey === t && w.originalLabel === r && (g(null), R(""), B("")), H(null);
    },
    [J, w, be]
  ), st = x((t) => {
    Ve((r) => r.includes(t) ? r.filter((a) => a !== t) : [...r, t]);
  }, []), ot = () => {
    if (I === "week") {
      const { start: i, end: s } = Ze(G), p = new Date(i);
      return p.setDate(p.getDate() - 6), { start: new Date(p.getFullYear(), p.getMonth(), p.getDate()).getTime(), end: s };
    }
    if (I === "month") {
      const i = Ye(G), s = new Date(i.getFullYear(), i.getMonth(), 1).getTime(), p = new Date(i.getFullYear(), i.getMonth() + 1, 1).getTime();
      return { start: s, end: p };
    }
    const t = Ye(Se), r = Ye(_e);
    if (Number.isNaN(t.getTime()) || Number.isNaN(r.getTime()) || t > r)
      return null;
    const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), o = new Date(r.getFullYear(), r.getMonth(), r.getDate() + 1).getTime();
    return { start: a, end: o };
  }, it = x(() => {
    const t = ot();
    if (!t) {
      Le("Please provide a valid date range before downloading.");
      return;
    }
    const r = [];
    for (const S of Re) {
      const { start: L, end: D } = Ze(S);
      if (D <= t.start || L >= t.end)
        continue;
      const j = fe(S);
      if (j.length === 0)
        continue;
      const ne = Nt(S);
      for (const F of j) {
        const Me = F.side !== null ? `Side ${F.side}` : "";
        r.push(`${gt(ne)},${gt(F.label)},${gt(Me)},${$e(F.totalMs)}`);
      }
    }
    if (r.length === 0) {
      Le("No activity recorded in the selected range.");
      return;
    }
    const a = ["Date,Activity,Side,Duration", ...r].join(`
`), o = new Blob([a], { type: "text/csv;charset=utf-8;" }), i = URL.createObjectURL(o), s = document.createElement("a");
    s.href = i;
    const p = I === "custom" ? "custom" : I;
    s.download = `activity-log-${p}.csv`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(i), Le(null);
  }, [fe, I, Re, Se, _e]), Pe = (c == null ? void 0 : c.side) ?? null, lt = ft(() => Pe === null ? null : vt(O, Pe), [Pe, O]), ct = (c == null ? void 0 : c.imu_timestamp_text) ?? (c == null ? void 0 : c.imu_timestamp_iso) ?? (c == null ? void 0 : c.received_at) ?? null, z = x(async (t = !1) => {
    if (!t && (!Q || !W.current))
      return !1;
    const r = T.current;
    try {
      const a = await fetch(pt, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: r })
      });
      if (!a.ok)
        throw new Error(`Activity log sync failed with status ${a.status}`);
      return ge(), !0;
    } catch (a) {
      return console.warn("[activity-log] failed to sync activity log", a), !1;
    }
  }, [ge, Q]), Qe = x(async () => {
    if (pe)
      return;
    if (De(!0), se(null), typeof window < "u" && ee.current !== null && (window.clearTimeout(ee.current), ee.current = null), !we()) {
      se({ type: "error", message: "Please finish editing or fix validation errors before saving." }), De(!1);
      return;
    }
    if (Q || (te.current = !0), ie(), await z(!0))
      try {
        await ue({ allowSkip: !1 }), se({ type: "success", message: "Activity log saved." }), typeof window < "u" && (ee.current = window.setTimeout(() => {
          se(null), ee.current = null;
        }, 4e3));
      } catch (a) {
        console.warn("[activity-log] failed to refresh activity log after manual save", a), se({ type: "error", message: "Saved, but failed to refresh from server. Please reload to verify." });
      }
    else
      se({ type: "error", message: "Unable to save activity log. Please try again." });
    De(!1);
  }, [we, ue, Q, pe, ie, z]);
  Y(() => {
    if (ve.current) {
      ve.current = !1;
      return;
    }
    W.current && (async () => {
      if (await z(!0))
        try {
          await ue({ allowSkip: !1 });
        } catch (r) {
          console.warn("[activity-log] failed to refresh activity log after background sync", r);
        }
    })();
  }, [b, ue, z]), Y(() => {
    if (!Q || typeof window > "u")
      return;
    const t = window.setInterval(() => {
      z();
    }, Ut);
    return () => window.clearInterval(t);
  }, [Q, z]), Y(() => {
    if (typeof window > "u")
      return;
    const t = () => {
      if (W.current) {
        if (navigator.sendBeacon)
          try {
            const r = new Blob([JSON.stringify({ entries: T.current })], { type: "application/json" });
            navigator.sendBeacon(pt, r);
            return;
          } catch (r) {
            console.warn("[activity-log] sendBeacon flush failed", r);
          }
        z(!0);
      }
    };
    return window.addEventListener("pagehide", t), window.addEventListener("beforeunload", t), () => {
      window.removeEventListener("pagehide", t), window.removeEventListener("beforeunload", t);
    };
  }, [z]);
  const Z = x(() => {
    var o, i, s;
    if (typeof window > "u" || window.parent === window)
      return;
    const t = window.document, r = ((o = t.documentElement) == null ? void 0 : o.scrollHeight) || ((i = t.body) == null ? void 0 : i.scrollHeight) || window.innerHeight, a = Math.max(320, Math.min(Math.ceil(r), 4e3));
    (s = window.parent) == null || s.postMessage({ type: "EMBED_HEIGHT", height: a }, "*");
  }, []);
  return Y(() => {
    Z();
  }, [Z, Ae.length, Ue, O, w, I]), Y(() => {
    if (typeof window > "u")
      return;
    const t = () => Z();
    window.addEventListener("load", t), window.addEventListener("resize", t);
    let r = null;
    return typeof ResizeObserver < "u" && (r = new ResizeObserver(t), r.observe(window.document.documentElement)), () => {
      window.removeEventListener("load", t), window.removeEventListener("resize", t), r == null || r.disconnect();
    };
  }, [Z]), /* @__PURE__ */ u.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ u.jsx("h1", { children: "Do-Decahedron Orientation" }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Latest IMU update:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: Gt(ct) })
      ] }),
      /* @__PURE__ */ u.jsxs("p", { className: "status-line", children: [
        /* @__PURE__ */ u.jsx("span", { className: "status-label", children: "Current activity:" }),
        /* @__PURE__ */ u.jsx("span", { className: "status-value", children: lt ?? "Waiting for data?" })
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
              value: I,
              onChange: (t) => A(t.target.value),
              children: [
                /* @__PURE__ */ u.jsx("option", { value: "week", children: "This week" }),
                /* @__PURE__ */ u.jsx("option", { value: "month", children: "This month" }),
                /* @__PURE__ */ u.jsx("option", { value: "custom", children: "Custom" })
              ]
            }
          )
        ] }),
        I === "custom" ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsxs("label", { className: "range-option", children: [
            "From",
            /* @__PURE__ */ u.jsx(
              "input",
              {
                type: "date",
                className: "date-input",
                value: Se,
                max: _e,
                onChange: (t) => tt(t.target.value)
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
                value: _e,
                min: Se,
                onChange: (t) => rt(t.target.value)
              }
            )
          ] })
        ] }) : null,
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "download-button push-right", onClick: it, children: "Download CSV" }),
        /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "download-button save-button",
            onClick: Qe,
            disabled: pe,
            children: pe ? "Saving..." : "Save Changes"
          }
        )
      ] }),
      Be ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: Be }) : null,
      Ce ? /* @__PURE__ */ u.jsx("p", { className: Ce.type === "error" ? "error-text" : "success-text", children: Ce.message }) : null,
      Ae.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "placeholder-text", children: "No activity recorded yet." }) : Ae.map(({ dateKey: t, rows: r, totalMs: a }) => {
        const o = Ue.includes(t), i = X.current;
        return /* @__PURE__ */ u.jsxs("div", { className: "date-group", children: [
          /* @__PURE__ */ u.jsxs(
            "button",
            {
              type: "button",
              className: `date-header${o ? " date-header--expanded" : ""}`,
              onClick: () => st(t),
              children: [
                /* @__PURE__ */ u.jsxs("div", { className: "date-header__title", children: [
                  /* @__PURE__ */ u.jsx("span", { className: "date-label", children: Nt(t) }),
                  /* @__PURE__ */ u.jsxs("span", { className: "date-summary", children: [
                    r.length,
                    " activit",
                    r.length === 1 ? "y" : "ies",
                    " - ",
                    $e(a)
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
              const p = (w == null ? void 0 : w.dateKey) === t && w.originalLabel === s.label, S = i.currentLabel === s.label && t === G;
              return /* @__PURE__ */ u.jsxs("tr", { children: [
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: V,
                    onChange: Ke,
                    placeholder: "Activity name"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: s.label }) }),
                /* @__PURE__ */ u.jsx("td", { className: "side-cell", children: /* @__PURE__ */ u.jsx("span", { children: s.side !== null ? `Side ${s.side}` : "—" }) }),
                /* @__PURE__ */ u.jsx("td", { children: p ? /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: "duration-input",
                    value: M,
                    onChange: qe,
                    placeholder: "mm:ss or hh:mm:ss"
                  }
                ) : /* @__PURE__ */ u.jsx("span", { children: $e(s.totalMs) }) }),
                /* @__PURE__ */ u.jsx("td", { className: "actions-cell", children: /* @__PURE__ */ u.jsx("div", { className: "action-buttons", children: p ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--primary",
                      onClick: Xe,
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button", onClick: nt, children: "Cancel" })
                ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button",
                      disabled: S,
                      onClick: () => ze(t, s.label, s.totalMs),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ u.jsx(
                    "button",
                    {
                      type: "button",
                      className: "icon-button icon-button--danger",
                      disabled: S,
                      onClick: () => at(t, s.label),
                      children: "Delete"
                    }
                  )
                ] }) }) })
              ] }, `${t}-${s.label}`);
            }) })
          ] }) : null
        ] }, t);
      }),
      me ? /* @__PURE__ */ u.jsx("p", { className: "error-text", children: me }) : null
    ] })
  ] });
}
export {
  Kt as TimesheetDevice
};
