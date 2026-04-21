var Vp = Object.defineProperty;
var $p = (i, l, u) => l in i ? Vp(i, l, { enumerable: !0, configurable: !0, writable: !0, value: u }) : i[l] = u;
var M = (i, l, u) => $p(i, typeof l != "symbol" ? l + "" : l, u);
var bc = { exports: {} }, Pi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tm;
function Zp() {
  if (Tm) return Pi;
  Tm = 1;
  var i = Symbol.for("react.transitional.element"), l = Symbol.for("react.fragment");
  function u(r, o, d) {
    var y = null;
    if (d !== void 0 && (y = "" + d), o.key !== void 0 && (y = "" + o.key), "key" in o) {
      d = {};
      for (var p in o)
        p !== "key" && (d[p] = o[p]);
    } else d = o;
    return o = d.ref, {
      $$typeof: i,
      type: r,
      key: y,
      ref: o !== void 0 ? o : null,
      props: d
    };
  }
  return Pi.Fragment = l, Pi.jsx = u, Pi.jsxs = u, Pi;
}
var Am;
function Kp() {
  return Am || (Am = 1, bc.exports = Zp()), bc.exports;
}
var il = Kp(), Ec = { exports: {} }, tl = {}, Tc = { exports: {} }, Ac = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rm;
function Jp() {
  return Rm || (Rm = 1, (function(i) {
    function l(U, Q) {
      var k = U.length;
      U.push(Q);
      t: for (; 0 < k; ) {
        var pt = k - 1 >>> 1, Et = U[pt];
        if (0 < o(Et, Q))
          U[pt] = Q, U[k] = Et, k = pt;
        else break t;
      }
    }
    function u(U) {
      return U.length === 0 ? null : U[0];
    }
    function r(U) {
      if (U.length === 0) return null;
      var Q = U[0], k = U.pop();
      if (k !== Q) {
        U[0] = k;
        t: for (var pt = 0, Et = U.length, T = Et >>> 1; pt < T; ) {
          var L = 2 * (pt + 1) - 1, G = U[L], X = L + 1, W = U[X];
          if (0 > o(G, k))
            X < Et && 0 > o(W, G) ? (U[pt] = W, U[X] = k, pt = X) : (U[pt] = G, U[L] = k, pt = L);
          else if (X < Et && 0 > o(W, k))
            U[pt] = W, U[X] = k, pt = X;
          else break t;
        }
      }
      return Q;
    }
    function o(U, Q) {
      var k = U.sortIndex - Q.sortIndex;
      return k !== 0 ? k : U.id - Q.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      i.unstable_now = function() {
        return d.now();
      };
    } else {
      var y = Date, p = y.now();
      i.unstable_now = function() {
        return y.now() - p;
      };
    }
    var g = [], h = [], b = 1, S = null, A = 3, _ = !1, z = !1, N = !1, j = !1, q = typeof setTimeout == "function" ? setTimeout : null, $ = typeof clearTimeout == "function" ? clearTimeout : null, Z = typeof setImmediate < "u" ? setImmediate : null;
    function lt(U) {
      for (var Q = u(h); Q !== null; ) {
        if (Q.callback === null) r(h);
        else if (Q.startTime <= U)
          r(h), Q.sortIndex = Q.expirationTime, l(g, Q);
        else break;
        Q = u(h);
      }
    }
    function ot(U) {
      if (N = !1, lt(U), !z)
        if (u(g) !== null)
          z = !0, ct || (ct = !0, kt());
        else {
          var Q = u(h);
          Q !== null && Ce(ot, Q.startTime - U);
        }
    }
    var ct = !1, I = -1, qt = 5, Bt = -1;
    function ma() {
      return j ? !0 : !(i.unstable_now() - Bt < qt);
    }
    function Ne() {
      if (j = !1, ct) {
        var U = i.unstable_now();
        Bt = U;
        var Q = !0;
        try {
          t: {
            z = !1, N && (N = !1, $(I), I = -1), _ = !0;
            var k = A;
            try {
              e: {
                for (lt(U), S = u(g); S !== null && !(S.expirationTime > U && ma()); ) {
                  var pt = S.callback;
                  if (typeof pt == "function") {
                    S.callback = null, A = S.priorityLevel;
                    var Et = pt(
                      S.expirationTime <= U
                    );
                    if (U = i.unstable_now(), typeof Et == "function") {
                      S.callback = Et, lt(U), Q = !0;
                      break e;
                    }
                    S === u(g) && r(g), lt(U);
                  } else r(g);
                  S = u(g);
                }
                if (S !== null) Q = !0;
                else {
                  var T = u(h);
                  T !== null && Ce(
                    ot,
                    T.startTime - U
                  ), Q = !1;
                }
              }
              break t;
            } finally {
              S = null, A = k, _ = !1;
            }
            Q = void 0;
          }
        } finally {
          Q ? kt() : ct = !1;
        }
      }
    }
    var kt;
    if (typeof Z == "function")
      kt = function() {
        Z(Ne);
      };
    else if (typeof MessageChannel < "u") {
      var Qn = new MessageChannel(), Qe = Qn.port2;
      Qn.port1.onmessage = Ne, kt = function() {
        Qe.postMessage(null);
      };
    } else
      kt = function() {
        q(Ne, 0);
      };
    function Ce(U, Q) {
      I = q(function() {
        U(i.unstable_now());
      }, Q);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, i.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : qt = 0 < U ? Math.floor(1e3 / U) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, i.unstable_next = function(U) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = A;
      }
      var k = A;
      A = Q;
      try {
        return U();
      } finally {
        A = k;
      }
    }, i.unstable_requestPaint = function() {
      j = !0;
    }, i.unstable_runWithPriority = function(U, Q) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var k = A;
      A = U;
      try {
        return Q();
      } finally {
        A = k;
      }
    }, i.unstable_scheduleCallback = function(U, Q, k) {
      var pt = i.unstable_now();
      switch (typeof k == "object" && k !== null ? (k = k.delay, k = typeof k == "number" && 0 < k ? pt + k : pt) : k = pt, U) {
        case 1:
          var Et = -1;
          break;
        case 2:
          Et = 250;
          break;
        case 5:
          Et = 1073741823;
          break;
        case 4:
          Et = 1e4;
          break;
        default:
          Et = 5e3;
      }
      return Et = k + Et, U = {
        id: b++,
        callback: Q,
        priorityLevel: U,
        startTime: k,
        expirationTime: Et,
        sortIndex: -1
      }, k > pt ? (U.sortIndex = k, l(h, U), u(g) === null && U === u(h) && (N ? ($(I), I = -1) : N = !0, Ce(ot, k - pt))) : (U.sortIndex = Et, l(g, U), z || _ || (z = !0, ct || (ct = !0, kt()))), U;
    }, i.unstable_shouldYield = ma, i.unstable_wrapCallback = function(U) {
      var Q = A;
      return function() {
        var k = A;
        A = Q;
        try {
          return U.apply(this, arguments);
        } finally {
          A = k;
        }
      };
    };
  })(Ac)), Ac;
}
var _m;
function kp() {
  return _m || (_m = 1, Tc.exports = Jp()), Tc.exports;
}
var Rc = { exports: {} }, F = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wm;
function Ip() {
  if (wm) return F;
  wm = 1;
  var i = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), y = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), S = Symbol.for("react.activity"), A = Symbol.iterator;
  function _(T) {
    return T === null || typeof T != "object" ? null : (T = A && T[A] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var z = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, N = Object.assign, j = {};
  function q(T, L, G) {
    this.props = T, this.context = L, this.refs = j, this.updater = G || z;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(T, L) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, L, "setState");
  }, q.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function $() {
  }
  $.prototype = q.prototype;
  function Z(T, L, G) {
    this.props = T, this.context = L, this.refs = j, this.updater = G || z;
  }
  var lt = Z.prototype = new $();
  lt.constructor = Z, N(lt, q.prototype), lt.isPureReactComponent = !0;
  var ot = Array.isArray;
  function ct() {
  }
  var I = { H: null, A: null, T: null, S: null }, qt = Object.prototype.hasOwnProperty;
  function Bt(T, L, G) {
    var X = G.ref;
    return {
      $$typeof: i,
      type: T,
      key: L,
      ref: X !== void 0 ? X : null,
      props: G
    };
  }
  function ma(T, L) {
    return Bt(T.type, L, T.props);
  }
  function Ne(T) {
    return typeof T == "object" && T !== null && T.$$typeof === i;
  }
  function kt(T) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(G) {
      return L[G];
    });
  }
  var Qn = /\/+/g;
  function Qe(T, L) {
    return typeof T == "object" && T !== null && T.key != null ? kt("" + T.key) : L.toString(36);
  }
  function Ce(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(ct, ct) : (T.status = "pending", T.then(
          function(L) {
            T.status === "pending" && (T.status = "fulfilled", T.value = L);
          },
          function(L) {
            T.status === "pending" && (T.status = "rejected", T.reason = L);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function U(T, L, G, X, W) {
    var nt = typeof T;
    (nt === "undefined" || nt === "boolean") && (T = null);
    var mt = !1;
    if (T === null) mt = !0;
    else
      switch (nt) {
        case "bigint":
        case "string":
        case "number":
          mt = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case i:
            case l:
              mt = !0;
              break;
            case b:
              return mt = T._init, U(
                mt(T._payload),
                L,
                G,
                X,
                W
              );
          }
      }
    if (mt)
      return W = W(T), mt = X === "" ? "." + Qe(T, 0) : X, ot(W) ? (G = "", mt != null && (G = mt.replace(Qn, "$&/") + "/"), U(W, L, G, "", function(si) {
        return si;
      })) : W != null && (Ne(W) && (W = ma(
        W,
        G + (W.key == null || T && T.key === W.key ? "" : ("" + W.key).replace(
          Qn,
          "$&/"
        ) + "/") + mt
      )), L.push(W)), 1;
    mt = 0;
    var Kt = X === "" ? "." : X + ":";
    if (ot(T))
      for (var Mt = 0; Mt < T.length; Mt++)
        X = T[Mt], nt = Kt + Qe(X, Mt), mt += U(
          X,
          L,
          G,
          nt,
          W
        );
    else if (Mt = _(T), typeof Mt == "function")
      for (T = Mt.call(T), Mt = 0; !(X = T.next()).done; )
        X = X.value, nt = Kt + Qe(X, Mt++), mt += U(
          X,
          L,
          G,
          nt,
          W
        );
    else if (nt === "object") {
      if (typeof T.then == "function")
        return U(
          Ce(T),
          L,
          G,
          X,
          W
        );
      throw L = String(T), Error(
        "Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return mt;
  }
  function Q(T, L, G) {
    if (T == null) return T;
    var X = [], W = 0;
    return U(T, X, "", "", function(nt) {
      return L.call(G, nt, W++);
    }), X;
  }
  function k(T) {
    if (T._status === -1) {
      var L = T._result;
      L = L(), L.then(
        function(G) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = G);
        },
        function(G) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = G);
        }
      ), T._status === -1 && (T._status = 0, T._result = L);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var pt = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var L = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(L)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  }, Et = {
    map: Q,
    forEach: function(T, L, G) {
      Q(
        T,
        function() {
          L.apply(this, arguments);
        },
        G
      );
    },
    count: function(T) {
      var L = 0;
      return Q(T, function() {
        L++;
      }), L;
    },
    toArray: function(T) {
      return Q(T, function(L) {
        return L;
      }) || [];
    },
    only: function(T) {
      if (!Ne(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return F.Activity = S, F.Children = Et, F.Component = q, F.Fragment = u, F.Profiler = o, F.PureComponent = Z, F.StrictMode = r, F.Suspense = g, F.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I, F.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return I.H.useMemoCache(T);
    }
  }, F.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, F.cacheSignal = function() {
    return null;
  }, F.cloneElement = function(T, L, G) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var X = N({}, T.props), W = T.key;
    if (L != null)
      for (nt in L.key !== void 0 && (W = "" + L.key), L)
        !qt.call(L, nt) || nt === "key" || nt === "__self" || nt === "__source" || nt === "ref" && L.ref === void 0 || (X[nt] = L[nt]);
    var nt = arguments.length - 2;
    if (nt === 1) X.children = G;
    else if (1 < nt) {
      for (var mt = Array(nt), Kt = 0; Kt < nt; Kt++)
        mt[Kt] = arguments[Kt + 2];
      X.children = mt;
    }
    return Bt(T.type, W, X);
  }, F.createContext = function(T) {
    return T = {
      $$typeof: y,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: d,
      _context: T
    }, T;
  }, F.createElement = function(T, L, G) {
    var X, W = {}, nt = null;
    if (L != null)
      for (X in L.key !== void 0 && (nt = "" + L.key), L)
        qt.call(L, X) && X !== "key" && X !== "__self" && X !== "__source" && (W[X] = L[X]);
    var mt = arguments.length - 2;
    if (mt === 1) W.children = G;
    else if (1 < mt) {
      for (var Kt = Array(mt), Mt = 0; Mt < mt; Mt++)
        Kt[Mt] = arguments[Mt + 2];
      W.children = Kt;
    }
    if (T && T.defaultProps)
      for (X in mt = T.defaultProps, mt)
        W[X] === void 0 && (W[X] = mt[X]);
    return Bt(T, nt, W);
  }, F.createRef = function() {
    return { current: null };
  }, F.forwardRef = function(T) {
    return { $$typeof: p, render: T };
  }, F.isValidElement = Ne, F.lazy = function(T) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: T },
      _init: k
    };
  }, F.memo = function(T, L) {
    return {
      $$typeof: h,
      type: T,
      compare: L === void 0 ? null : L
    };
  }, F.startTransition = function(T) {
    var L = I.T, G = {};
    I.T = G;
    try {
      var X = T(), W = I.S;
      W !== null && W(G, X), typeof X == "object" && X !== null && typeof X.then == "function" && X.then(ct, pt);
    } catch (nt) {
      pt(nt);
    } finally {
      L !== null && G.types !== null && (L.types = G.types), I.T = L;
    }
  }, F.unstable_useCacheRefresh = function() {
    return I.H.useCacheRefresh();
  }, F.use = function(T) {
    return I.H.use(T);
  }, F.useActionState = function(T, L, G) {
    return I.H.useActionState(T, L, G);
  }, F.useCallback = function(T, L) {
    return I.H.useCallback(T, L);
  }, F.useContext = function(T) {
    return I.H.useContext(T);
  }, F.useDebugValue = function() {
  }, F.useDeferredValue = function(T, L) {
    return I.H.useDeferredValue(T, L);
  }, F.useEffect = function(T, L) {
    return I.H.useEffect(T, L);
  }, F.useEffectEvent = function(T) {
    return I.H.useEffectEvent(T);
  }, F.useId = function() {
    return I.H.useId();
  }, F.useImperativeHandle = function(T, L, G) {
    return I.H.useImperativeHandle(T, L, G);
  }, F.useInsertionEffect = function(T, L) {
    return I.H.useInsertionEffect(T, L);
  }, F.useLayoutEffect = function(T, L) {
    return I.H.useLayoutEffect(T, L);
  }, F.useMemo = function(T, L) {
    return I.H.useMemo(T, L);
  }, F.useOptimistic = function(T, L) {
    return I.H.useOptimistic(T, L);
  }, F.useReducer = function(T, L, G) {
    return I.H.useReducer(T, L, G);
  }, F.useRef = function(T) {
    return I.H.useRef(T);
  }, F.useState = function(T) {
    return I.H.useState(T);
  }, F.useSyncExternalStore = function(T, L, G) {
    return I.H.useSyncExternalStore(
      T,
      L,
      G
    );
  }, F.useTransition = function() {
    return I.H.useTransition();
  }, F.version = "19.2.5", F;
}
var Cm;
function Pc() {
  return Cm || (Cm = 1, Rc.exports = Ip()), Rc.exports;
}
var _c = { exports: {} }, $t = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mm;
function Fp() {
  if (Mm) return $t;
  Mm = 1;
  var i = Pc();
  function l(g) {
    var h = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + g + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u() {
  }
  var r = {
    d: {
      f: u,
      r: function() {
        throw Error(l(522));
      },
      D: u,
      C: u,
      L: u,
      m: u,
      X: u,
      S: u,
      M: u
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function d(g, h, b) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: S == null ? null : "" + S,
      children: g,
      containerInfo: h,
      implementation: b
    };
  }
  var y = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, h) {
    if (g === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return $t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, $t.createPortal = function(g, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(l(299));
    return d(g, h, null, b);
  }, $t.flushSync = function(g) {
    var h = y.T, b = r.p;
    try {
      if (y.T = null, r.p = 2, g) return g();
    } finally {
      y.T = h, r.p = b, r.d.f();
    }
  }, $t.preconnect = function(g, h) {
    typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, r.d.C(g, h));
  }, $t.prefetchDNS = function(g) {
    typeof g == "string" && r.d.D(g);
  }, $t.preinit = function(g, h) {
    if (typeof g == "string" && h && typeof h.as == "string") {
      var b = h.as, S = p(b, h.crossOrigin), A = typeof h.integrity == "string" ? h.integrity : void 0, _ = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      b === "style" ? r.d.S(
        g,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: S,
          integrity: A,
          fetchPriority: _
        }
      ) : b === "script" && r.d.X(g, {
        crossOrigin: S,
        integrity: A,
        fetchPriority: _,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, $t.preinitModule = function(g, h) {
    if (typeof g == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var b = p(
            h.as,
            h.crossOrigin
          );
          r.d.M(g, {
            crossOrigin: b,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && r.d.M(g);
  }, $t.preload = function(g, h) {
    if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var b = h.as, S = p(b, h.crossOrigin);
      r.d.L(g, b, {
        crossOrigin: S,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, $t.preloadModule = function(g, h) {
    if (typeof g == "string")
      if (h) {
        var b = p(h.as, h.crossOrigin);
        r.d.m(g, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: b,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else r.d.m(g);
  }, $t.requestFormReset = function(g) {
    r.d.r(g);
  }, $t.unstable_batchedUpdates = function(g, h) {
    return g(h);
  }, $t.useFormState = function(g, h, b) {
    return y.H.useFormState(g, h, b);
  }, $t.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, $t.version = "19.2.5", $t;
}
var Om;
function Wp() {
  if (Om) return _c.exports;
  Om = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (l) {
        console.error(l);
      }
  }
  return i(), _c.exports = Fp(), _c.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zm;
function Pp() {
  if (zm) return tl;
  zm = 1;
  var i = kp(), l = Pc(), u = Wp();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    var e = t, n = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (n = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? n : null;
  }
  function y(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (d(t) !== t)
      throw Error(r(188));
  }
  function h(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var n = t, a = e; ; ) {
      var s = n.return;
      if (s === null) break;
      var c = s.alternate;
      if (c === null) {
        if (a = s.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (s.child === c.child) {
        for (c = s.child; c; ) {
          if (c === n) return g(s), t;
          if (c === a) return g(s), e;
          c = c.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== a.return) n = s, a = c;
      else {
        for (var f = !1, m = s.child; m; ) {
          if (m === n) {
            f = !0, n = s, a = c;
            break;
          }
          if (m === a) {
            f = !0, a = s, n = c;
            break;
          }
          m = m.sibling;
        }
        if (!f) {
          for (m = c.child; m; ) {
            if (m === n) {
              f = !0, n = c, a = s;
              break;
            }
            if (m === a) {
              f = !0, a = c, n = s;
              break;
            }
            m = m.sibling;
          }
          if (!f) throw Error(r(189));
        }
      }
      if (n.alternate !== a) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? t : e;
  }
  function b(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = b(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var S = Object.assign, A = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), z = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), q = Symbol.for("react.profiler"), $ = Symbol.for("react.consumer"), Z = Symbol.for("react.context"), lt = Symbol.for("react.forward_ref"), ot = Symbol.for("react.suspense"), ct = Symbol.for("react.suspense_list"), I = Symbol.for("react.memo"), qt = Symbol.for("react.lazy"), Bt = Symbol.for("react.activity"), ma = Symbol.for("react.memo_cache_sentinel"), Ne = Symbol.iterator;
  function kt(t) {
    return t === null || typeof t != "object" ? null : (t = Ne && t[Ne] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Qn = Symbol.for("react.client.reference");
  function Qe(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Qn ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case N:
        return "Fragment";
      case q:
        return "Profiler";
      case j:
        return "StrictMode";
      case ot:
        return "Suspense";
      case ct:
        return "SuspenseList";
      case Bt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case z:
          return "Portal";
        case Z:
          return t.displayName || "Context";
        case $:
          return (t._context.displayName || "Context") + ".Consumer";
        case lt:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case I:
          return e = t.displayName || null, e !== null ? e : Qe(t.type) || "Memo";
        case qt:
          e = t._payload, t = t._init;
          try {
            return Qe(t(e));
          } catch {
          }
      }
    return null;
  }
  var Ce = Array.isArray, U = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, pt = [], Et = -1;
  function T(t) {
    return { current: t };
  }
  function L(t) {
    0 > Et || (t.current = pt[Et], pt[Et] = null, Et--);
  }
  function G(t, e) {
    Et++, pt[Et] = t.current, t.current = e;
  }
  var X = T(null), W = T(null), nt = T(null), mt = T(null);
  function Kt(t, e) {
    switch (G(nt, e), G(W, t), G(X, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? $h(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = $h(e), t = Zh(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    L(X), G(X, t);
  }
  function Mt() {
    L(X), L(W), L(nt);
  }
  function si(t) {
    t.memoizedState !== null && G(mt, t);
    var e = X.current, n = Zh(e, t.type);
    e !== n && (G(W, t), G(X, n));
  }
  function pl(t) {
    W.current === t && (L(X), L(W)), mt.current === t && (L(mt), ki._currentValue = k);
  }
  var nu, bo;
  function Gn(t) {
    if (nu === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        nu = e && e[1] || "", bo = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + nu + t + bo;
  }
  var au = !1;
  function iu(t, e) {
    if (!t || au) return "";
    au = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var B = function() {
                throw Error();
              };
              if (Object.defineProperty(B.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(B, []);
                } catch (D) {
                  var O = D;
                }
                Reflect.construct(t, [], B);
              } else {
                try {
                  B.call();
                } catch (D) {
                  O = D;
                }
                t.call(B.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (D) {
                O = D;
              }
              (B = t()) && typeof B.catch == "function" && B.catch(function() {
              });
            }
          } catch (D) {
            if (D && O && typeof D.stack == "string")
              return [D.stack, O.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = a.DetermineComponentFrameRoot(), f = c[0], m = c[1];
      if (f && m) {
        var v = f.split(`
`), C = m.split(`
`);
        for (s = a = 0; a < v.length && !v[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; s < C.length && !C[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (a === v.length || s === C.length)
          for (a = v.length - 1, s = C.length - 1; 1 <= a && 0 <= s && v[a] !== C[s]; )
            s--;
        for (; 1 <= a && 0 <= s; a--, s--)
          if (v[a] !== C[s]) {
            if (a !== 1 || s !== 1)
              do
                if (a--, s--, 0 > s || v[a] !== C[s]) {
                  var x = `
` + v[a].replace(" at new ", " at ");
                  return t.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", t.displayName)), x;
                }
              while (1 <= a && 0 <= s);
            break;
          }
      }
    } finally {
      au = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? Gn(n) : "";
  }
  function Eg(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Gn(t.type);
      case 16:
        return Gn("Lazy");
      case 13:
        return t.child !== e && e !== null ? Gn("Suspense Fallback") : Gn("Suspense");
      case 19:
        return Gn("SuspenseList");
      case 0:
      case 15:
        return iu(t.type, !1);
      case 11:
        return iu(t.type.render, !1);
      case 1:
        return iu(t.type, !0);
      case 31:
        return Gn("Activity");
      default:
        return "";
    }
  }
  function Eo(t) {
    try {
      var e = "", n = null;
      do
        e += Eg(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var lu = Object.prototype.hasOwnProperty, su = i.unstable_scheduleCallback, uu = i.unstable_cancelCallback, Tg = i.unstable_shouldYield, Ag = i.unstable_requestPaint, ie = i.unstable_now, Rg = i.unstable_getCurrentPriorityLevel, To = i.unstable_ImmediatePriority, Ao = i.unstable_UserBlockingPriority, Sl = i.unstable_NormalPriority, _g = i.unstable_LowPriority, Ro = i.unstable_IdlePriority, wg = i.log, Cg = i.unstable_setDisableYieldValue, ui = null, le = null;
  function cn(t) {
    if (typeof wg == "function" && Cg(t), le && typeof le.setStrictMode == "function")
      try {
        le.setStrictMode(ui, t);
      } catch {
      }
  }
  var se = Math.clz32 ? Math.clz32 : zg, Mg = Math.log, Og = Math.LN2;
  function zg(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Mg(t) / Og | 0) | 0;
  }
  var vl = 256, bl = 262144, El = 4194304;
  function Yn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Tl(t, e, n) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var s = 0, c = t.suspendedLanes, f = t.pingedLanes;
    t = t.warmLanes;
    var m = a & 134217727;
    return m !== 0 ? (a = m & ~c, a !== 0 ? s = Yn(a) : (f &= m, f !== 0 ? s = Yn(f) : n || (n = m & ~t, n !== 0 && (s = Yn(n))))) : (m = a & ~c, m !== 0 ? s = Yn(m) : f !== 0 ? s = Yn(f) : n || (n = a & ~t, n !== 0 && (s = Yn(n)))), s === 0 ? 0 : e !== 0 && e !== s && (e & c) === 0 && (c = s & -s, n = e & -e, c >= n || c === 32 && (n & 4194048) !== 0) ? e : s;
  }
  function ri(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Dg(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function _o() {
    var t = El;
    return El <<= 1, (El & 62914560) === 0 && (El = 4194304), t;
  }
  function ru(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function ci(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function xg(t, e, n, a, s, c) {
    var f = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var m = t.entanglements, v = t.expirationTimes, C = t.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var x = 31 - se(n), B = 1 << x;
      m[x] = 0, v[x] = -1;
      var O = C[x];
      if (O !== null)
        for (C[x] = null, x = 0; x < O.length; x++) {
          var D = O[x];
          D !== null && (D.lane &= -536870913);
        }
      n &= ~B;
    }
    a !== 0 && wo(t, a, 0), c !== 0 && s === 0 && t.tag !== 0 && (t.suspendedLanes |= c & ~(f & ~e));
  }
  function wo(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - se(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | n & 261930;
  }
  function Co(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var a = 31 - se(n), s = 1 << a;
      s & e | t[a] & e && (t[a] |= e), n &= ~s;
    }
  }
  function Mo(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : cu(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function cu(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function ou(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Oo() {
    var t = Q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ym(t.type));
  }
  function zo(t, e) {
    var n = Q.p;
    try {
      return Q.p = t, e();
    } finally {
      Q.p = n;
    }
  }
  var on = Math.random().toString(36).slice(2), Qt = "__reactFiber$" + on, It = "__reactProps$" + on, ya = "__reactContainer$" + on, fu = "__reactEvents$" + on, Ng = "__reactListeners$" + on, Ug = "__reactHandles$" + on, Do = "__reactResources$" + on, oi = "__reactMarker$" + on;
  function du(t) {
    delete t[Qt], delete t[It], delete t[fu], delete t[Ng], delete t[Ug];
  }
  function ga(t) {
    var e = t[Qt];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[ya] || n[Qt]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = Ph(t); t !== null; ) {
            if (n = t[Qt]) return n;
            t = Ph(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function pa(t) {
    if (t = t[Qt] || t[ya]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function fi(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Sa(t) {
    var e = t[Do];
    return e || (e = t[Do] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Lt(t) {
    t[oi] = !0;
  }
  var xo = /* @__PURE__ */ new Set(), No = {};
  function Xn(t, e) {
    va(t, e), va(t + "Capture", e);
  }
  function va(t, e) {
    for (No[t] = e, t = 0; t < e.length; t++)
      xo.add(e[t]);
  }
  var Hg = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uo = {}, Ho = {};
  function Bg(t) {
    return lu.call(Ho, t) ? !0 : lu.call(Uo, t) ? !1 : Hg.test(t) ? Ho[t] = !0 : (Uo[t] = !0, !1);
  }
  function Al(t, e, n) {
    if (Bg(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + n);
      }
  }
  function Rl(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + n);
    }
  }
  function Ge(t, e, n, a) {
    if (a === null) t.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, "" + a);
    }
  }
  function ge(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Bo(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Lg(t, e, n) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var s = a.get, c = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(f) {
          n = "" + f, c.call(this, f);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(f) {
          n = "" + f;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function hu(t) {
    if (!t._valueTracker) {
      var e = Bo(t) ? "checked" : "value";
      t._valueTracker = Lg(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Lo(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), a = "";
    return t && (a = Bo(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== n ? (e.setValue(t), !0) : !1;
  }
  function _l(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var jg = /[\n"\\]/g;
  function pe(t) {
    return t.replace(
      jg,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function mu(t, e, n, a, s, c, f, m) {
    t.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.type = f : t.removeAttribute("type"), e != null ? f === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + ge(e)) : t.value !== "" + ge(e) && (t.value = "" + ge(e)) : f !== "submit" && f !== "reset" || t.removeAttribute("value"), e != null ? yu(t, f, ge(e)) : n != null ? yu(t, f, ge(n)) : a != null && t.removeAttribute("value"), s == null && c != null && (t.defaultChecked = !!c), s != null && (t.checked = s && typeof s != "function" && typeof s != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.name = "" + ge(m) : t.removeAttribute("name");
  }
  function jo(t, e, n, a, s, c, f, m) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.type = c), e != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || e != null)) {
        hu(t);
        return;
      }
      n = n != null ? "" + ge(n) : "", e = e != null ? "" + ge(e) : n, m || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? s, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = m ? t.checked : !!a, t.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (t.name = f), hu(t);
  }
  function yu(t, e, n) {
    e === "number" && _l(t.ownerDocument) === t || t.defaultValue === "" + n || (t.defaultValue = "" + n);
  }
  function ba(t, e, n, a) {
    if (t = t.options, e) {
      e = {};
      for (var s = 0; s < n.length; s++)
        e["$" + n[s]] = !0;
      for (n = 0; n < t.length; n++)
        s = e.hasOwnProperty("$" + t[n].value), t[n].selected !== s && (t[n].selected = s), s && a && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + ge(n), e = null, s = 0; s < t.length; s++) {
        if (t[s].value === n) {
          t[s].selected = !0, a && (t[s].defaultSelected = !0);
          return;
        }
        e !== null || t[s].disabled || (e = t[s]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function qo(t, e, n) {
    if (e != null && (e = "" + ge(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + ge(n) : "";
  }
  function Qo(t, e, n, a) {
    if (e == null) {
      if (a != null) {
        if (n != null) throw Error(r(92));
        if (Ce(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), e = n;
    }
    n = ge(e), t.defaultValue = n, a = t.textContent, a === n && a !== "" && a !== null && (t.value = a), hu(t);
  }
  function Ea(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var qg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Go(t, e, n) {
    var a = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, n) : typeof n != "number" || n === 0 || qg.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Yo(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, n != null) {
      for (var a in n)
        !n.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var s in e)
        a = e[s], e.hasOwnProperty(s) && n[s] !== a && Go(t, s, a);
    } else
      for (var c in e)
        e.hasOwnProperty(c) && Go(t, c, e[c]);
  }
  function gu(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Qg = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Gg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function wl(t) {
    return Gg.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Ye() {
  }
  var pu = null;
  function Su(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ta = null, Aa = null;
  function Xo(t) {
    var e = pa(t);
    if (e && (t = e.stateNode)) {
      var n = t[It] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (mu(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + pe(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var a = n[e];
              if (a !== t && a.form === t.form) {
                var s = a[It] || null;
                if (!s) throw Error(r(90));
                mu(
                  a,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              a = n[e], a.form === t.form && Lo(a);
          }
          break t;
        case "textarea":
          qo(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && ba(t, !!n.multiple, e, !1);
      }
    }
  }
  var vu = !1;
  function Vo(t, e, n) {
    if (vu) return t(e, n);
    vu = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (vu = !1, (Ta !== null || Aa !== null) && (hs(), Ta && (e = Ta, t = Aa, Aa = Ta = null, Xo(e), t)))
        for (e = 0; e < t.length; e++) Xo(t[e]);
    }
  }
  function di(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var a = n[It] || null;
    if (a === null) return null;
    n = a[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        r(231, e, typeof n)
      );
    return n;
  }
  var Xe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), bu = !1;
  if (Xe)
    try {
      var hi = {};
      Object.defineProperty(hi, "passive", {
        get: function() {
          bu = !0;
        }
      }), window.addEventListener("test", hi, hi), window.removeEventListener("test", hi, hi);
    } catch {
      bu = !1;
    }
  var fn = null, Eu = null, Cl = null;
  function $o() {
    if (Cl) return Cl;
    var t, e = Eu, n = e.length, a, s = "value" in fn ? fn.value : fn.textContent, c = s.length;
    for (t = 0; t < n && e[t] === s[t]; t++) ;
    var f = n - t;
    for (a = 1; a <= f && e[n - a] === s[c - a]; a++) ;
    return Cl = s.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Ml(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Ol() {
    return !0;
  }
  function Zo() {
    return !1;
  }
  function Ft(t) {
    function e(n, a, s, c, f) {
      this._reactName = n, this._targetInst = s, this.type = a, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var m in t)
        t.hasOwnProperty(m) && (n = t[m], this[m] = n ? n(c) : c[m]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Ol : Zo, this.isPropagationStopped = Zo, this;
    }
    return S(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ol);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ol);
      },
      persist: function() {
      },
      isPersistent: Ol
    }), e;
  }
  var Vn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, zl = Ft(Vn), mi = S({}, Vn, { view: 0, detail: 0 }), Yg = Ft(mi), Tu, Au, yi, Dl = S({}, mi, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: _u,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== yi && (yi && t.type === "mousemove" ? (Tu = t.screenX - yi.screenX, Au = t.screenY - yi.screenY) : Au = Tu = 0, yi = t), Tu);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Au;
    }
  }), Ko = Ft(Dl), Xg = S({}, Dl, { dataTransfer: 0 }), Vg = Ft(Xg), $g = S({}, mi, { relatedTarget: 0 }), Ru = Ft($g), Zg = S({}, Vn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Kg = Ft(Zg), Jg = S({}, Vn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), kg = Ft(Jg), Ig = S({}, Vn, { data: 0 }), Jo = Ft(Ig), Fg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Wg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Pg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function t0(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Pg[t]) ? !!e[t] : !1;
  }
  function _u() {
    return t0;
  }
  var e0 = S({}, mi, {
    key: function(t) {
      if (t.key) {
        var e = Fg[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Ml(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Wg[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: _u,
    charCode: function(t) {
      return t.type === "keypress" ? Ml(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Ml(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), n0 = Ft(e0), a0 = S({}, Dl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), ko = Ft(a0), i0 = S({}, mi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: _u
  }), l0 = Ft(i0), s0 = S({}, Vn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), u0 = Ft(s0), r0 = S({}, Dl, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), c0 = Ft(r0), o0 = S({}, Vn, {
    newState: 0,
    oldState: 0
  }), f0 = Ft(o0), d0 = [9, 13, 27, 32], wu = Xe && "CompositionEvent" in window, gi = null;
  Xe && "documentMode" in document && (gi = document.documentMode);
  var h0 = Xe && "TextEvent" in window && !gi, Io = Xe && (!wu || gi && 8 < gi && 11 >= gi), Fo = " ", Wo = !1;
  function Po(t, e) {
    switch (t) {
      case "keyup":
        return d0.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function tf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ra = !1;
  function m0(t, e) {
    switch (t) {
      case "compositionend":
        return tf(e);
      case "keypress":
        return e.which !== 32 ? null : (Wo = !0, Fo);
      case "textInput":
        return t = e.data, t === Fo && Wo ? null : t;
      default:
        return null;
    }
  }
  function y0(t, e) {
    if (Ra)
      return t === "compositionend" || !wu && Po(t, e) ? (t = $o(), Cl = Eu = fn = null, Ra = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Io && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var g0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function ef(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!g0[t.type] : e === "textarea";
  }
  function nf(t, e, n, a) {
    Ta ? Aa ? Aa.push(a) : Aa = [a] : Ta = a, e = bs(e, "onChange"), 0 < e.length && (n = new zl(
      "onChange",
      "change",
      null,
      n,
      a
    ), t.push({ event: n, listeners: e }));
  }
  var pi = null, Si = null;
  function p0(t) {
    qh(t, 0);
  }
  function xl(t) {
    var e = fi(t);
    if (Lo(e)) return t;
  }
  function af(t, e) {
    if (t === "change") return e;
  }
  var lf = !1;
  if (Xe) {
    var Cu;
    if (Xe) {
      var Mu = "oninput" in document;
      if (!Mu) {
        var sf = document.createElement("div");
        sf.setAttribute("oninput", "return;"), Mu = typeof sf.oninput == "function";
      }
      Cu = Mu;
    } else Cu = !1;
    lf = Cu && (!document.documentMode || 9 < document.documentMode);
  }
  function uf() {
    pi && (pi.detachEvent("onpropertychange", rf), Si = pi = null);
  }
  function rf(t) {
    if (t.propertyName === "value" && xl(Si)) {
      var e = [];
      nf(
        e,
        Si,
        t,
        Su(t)
      ), Vo(p0, e);
    }
  }
  function S0(t, e, n) {
    t === "focusin" ? (uf(), pi = e, Si = n, pi.attachEvent("onpropertychange", rf)) : t === "focusout" && uf();
  }
  function v0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return xl(Si);
  }
  function b0(t, e) {
    if (t === "click") return xl(e);
  }
  function E0(t, e) {
    if (t === "input" || t === "change")
      return xl(e);
  }
  function T0(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var ue = typeof Object.is == "function" ? Object.is : T0;
  function vi(t, e) {
    if (ue(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), a = Object.keys(e);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var s = n[a];
      if (!lu.call(e, s) || !ue(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  function cf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function of(t, e) {
    var n = cf(t);
    t = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (a = t + n.textContent.length, t <= e && a >= e)
          return { node: n, offset: e - t };
        t = a;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = cf(n);
    }
  }
  function ff(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? ff(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function df(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = _l(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = _l(t.document);
    }
    return e;
  }
  function Ou(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var A0 = Xe && "documentMode" in document && 11 >= document.documentMode, _a = null, zu = null, bi = null, Du = !1;
  function hf(t, e, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Du || _a == null || _a !== _l(a) || (a = _a, "selectionStart" in a && Ou(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), bi && vi(bi, a) || (bi = a, a = bs(zu, "onSelect"), 0 < a.length && (e = new zl(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: a }), e.target = _a)));
  }
  function $n(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var wa = {
    animationend: $n("Animation", "AnimationEnd"),
    animationiteration: $n("Animation", "AnimationIteration"),
    animationstart: $n("Animation", "AnimationStart"),
    transitionrun: $n("Transition", "TransitionRun"),
    transitionstart: $n("Transition", "TransitionStart"),
    transitioncancel: $n("Transition", "TransitionCancel"),
    transitionend: $n("Transition", "TransitionEnd")
  }, xu = {}, mf = {};
  Xe && (mf = document.createElement("div").style, "AnimationEvent" in window || (delete wa.animationend.animation, delete wa.animationiteration.animation, delete wa.animationstart.animation), "TransitionEvent" in window || delete wa.transitionend.transition);
  function Zn(t) {
    if (xu[t]) return xu[t];
    if (!wa[t]) return t;
    var e = wa[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in mf)
        return xu[t] = e[n];
    return t;
  }
  var yf = Zn("animationend"), gf = Zn("animationiteration"), pf = Zn("animationstart"), R0 = Zn("transitionrun"), _0 = Zn("transitionstart"), w0 = Zn("transitioncancel"), Sf = Zn("transitionend"), vf = /* @__PURE__ */ new Map(), Nu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Nu.push("scrollEnd");
  function Me(t, e) {
    vf.set(t, e), Xn(e, [t]);
  }
  var Nl = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Se = [], Ca = 0, Uu = 0;
  function Ul() {
    for (var t = Ca, e = Uu = Ca = 0; e < t; ) {
      var n = Se[e];
      Se[e++] = null;
      var a = Se[e];
      Se[e++] = null;
      var s = Se[e];
      Se[e++] = null;
      var c = Se[e];
      if (Se[e++] = null, a !== null && s !== null) {
        var f = a.pending;
        f === null ? s.next = s : (s.next = f.next, f.next = s), a.pending = s;
      }
      c !== 0 && bf(n, s, c);
    }
  }
  function Hl(t, e, n, a) {
    Se[Ca++] = t, Se[Ca++] = e, Se[Ca++] = n, Se[Ca++] = a, Uu |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Hu(t, e, n, a) {
    return Hl(t, e, n, a), Bl(t);
  }
  function Kn(t, e) {
    return Hl(t, null, null, e), Bl(t);
  }
  function bf(t, e, n) {
    t.lanes |= n;
    var a = t.alternate;
    a !== null && (a.lanes |= n);
    for (var s = !1, c = t.return; c !== null; )
      c.childLanes |= n, a = c.alternate, a !== null && (a.childLanes |= n), c.tag === 22 && (t = c.stateNode, t === null || t._visibility & 1 || (s = !0)), t = c, c = c.return;
    return t.tag === 3 ? (c = t.stateNode, s && e !== null && (s = 31 - se(n), t = c.hiddenUpdates, a = t[s], a === null ? t[s] = [e] : a.push(e), e.lane = n | 536870912), c) : null;
  }
  function Bl(t) {
    if (50 < Yi)
      throw Yi = 0, Vr = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ma = {};
  function C0(t, e, n, a) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function re(t, e, n, a) {
    return new C0(t, e, n, a);
  }
  function Bu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ve(t, e) {
    var n = t.alternate;
    return n === null ? (n = re(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 65011712, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function Ef(t, e) {
    t.flags &= 65011714;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Ll(t, e, n, a, s, c) {
    var f = 0;
    if (a = t, typeof t == "function") Bu(t) && (f = 1);
    else if (typeof t == "string")
      f = xp(
        t,
        n,
        X.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Bt:
          return t = re(31, n, e, s), t.elementType = Bt, t.lanes = c, t;
        case N:
          return Jn(n.children, s, c, e);
        case j:
          f = 8, s |= 24;
          break;
        case q:
          return t = re(12, n, e, s | 2), t.elementType = q, t.lanes = c, t;
        case ot:
          return t = re(13, n, e, s), t.elementType = ot, t.lanes = c, t;
        case ct:
          return t = re(19, n, e, s), t.elementType = ct, t.lanes = c, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case Z:
                f = 10;
                break t;
              case $:
                f = 9;
                break t;
              case lt:
                f = 11;
                break t;
              case I:
                f = 14;
                break t;
              case qt:
                f = 16, a = null;
                break t;
            }
          f = 29, n = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = re(f, n, e, s), e.elementType = t, e.type = a, e.lanes = c, e;
  }
  function Jn(t, e, n, a) {
    return t = re(7, t, a, e), t.lanes = n, t;
  }
  function Lu(t, e, n) {
    return t = re(6, t, null, e), t.lanes = n, t;
  }
  function Tf(t) {
    var e = re(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function ju(t, e, n) {
    return e = re(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Af = /* @__PURE__ */ new WeakMap();
  function ve(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Af.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Eo(e)
      }, Af.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Eo(e)
    };
  }
  var Oa = [], za = 0, jl = null, Ei = 0, be = [], Ee = 0, dn = null, Ue = 1, He = "";
  function $e(t, e) {
    Oa[za++] = Ei, Oa[za++] = jl, jl = t, Ei = e;
  }
  function Rf(t, e, n) {
    be[Ee++] = Ue, be[Ee++] = He, be[Ee++] = dn, dn = t;
    var a = Ue;
    t = He;
    var s = 32 - se(a) - 1;
    a &= ~(1 << s), n += 1;
    var c = 32 - se(e) + s;
    if (30 < c) {
      var f = s - s % 5;
      c = (a & (1 << f) - 1).toString(32), a >>= f, s -= f, Ue = 1 << 32 - se(e) + s | n << s | a, He = c + t;
    } else
      Ue = 1 << c | n << s | a, He = t;
  }
  function qu(t) {
    t.return !== null && ($e(t, 1), Rf(t, 1, 0));
  }
  function Qu(t) {
    for (; t === jl; )
      jl = Oa[--za], Oa[za] = null, Ei = Oa[--za], Oa[za] = null;
    for (; t === dn; )
      dn = be[--Ee], be[Ee] = null, He = be[--Ee], be[Ee] = null, Ue = be[--Ee], be[Ee] = null;
  }
  function _f(t, e) {
    be[Ee++] = Ue, be[Ee++] = He, be[Ee++] = dn, Ue = e.id, He = e.overflow, dn = t;
  }
  var Gt = null, At = null, rt = !1, hn = null, Te = !1, Gu = Error(r(519));
  function mn(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ti(ve(e, t)), Gu;
  }
  function wf(t) {
    var e = t.stateNode, n = t.type, a = t.memoizedProps;
    switch (e[Qt] = t, e[It] = a, n) {
      case "dialog":
        it("cancel", e), it("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        it("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Vi.length; n++)
          it(Vi[n], e);
        break;
      case "source":
        it("error", e);
        break;
      case "img":
      case "image":
      case "link":
        it("error", e), it("load", e);
        break;
      case "details":
        it("toggle", e);
        break;
      case "input":
        it("invalid", e), jo(
          e,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        it("invalid", e);
        break;
      case "textarea":
        it("invalid", e), Qo(e, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || a.suppressHydrationWarning === !0 || Xh(e.textContent, n) ? (a.popover != null && (it("beforetoggle", e), it("toggle", e)), a.onScroll != null && it("scroll", e), a.onScrollEnd != null && it("scrollend", e), a.onClick != null && (e.onclick = Ye), e = !0) : e = !1, e || mn(t, !0);
  }
  function Cf(t) {
    for (Gt = t.return; Gt; )
      switch (Gt.tag) {
        case 5:
        case 31:
        case 13:
          Te = !1;
          return;
        case 27:
        case 3:
          Te = !0;
          return;
        default:
          Gt = Gt.return;
      }
  }
  function Da(t) {
    if (t !== Gt) return !1;
    if (!rt) return Cf(t), rt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || lc(t.type, t.memoizedProps)), n = !n), n && At && mn(t), Cf(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      At = Wh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      At = Wh(t);
    } else
      e === 27 ? (e = At, Mn(t.type) ? (t = oc, oc = null, At = t) : At = e) : At = Gt ? Re(t.stateNode.nextSibling) : null;
    return !0;
  }
  function kn() {
    At = Gt = null, rt = !1;
  }
  function Yu() {
    var t = hn;
    return t !== null && (ee === null ? ee = t : ee.push.apply(
      ee,
      t
    ), hn = null), t;
  }
  function Ti(t) {
    hn === null ? hn = [t] : hn.push(t);
  }
  var Xu = T(null), In = null, Ze = null;
  function yn(t, e, n) {
    G(Xu, e._currentValue), e._currentValue = n;
  }
  function Ke(t) {
    t._currentValue = Xu.current, L(Xu);
  }
  function Vu(t, e, n) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function $u(t, e, n, a) {
    var s = t.child;
    for (s !== null && (s.return = t); s !== null; ) {
      var c = s.dependencies;
      if (c !== null) {
        var f = s.child;
        c = c.firstContext;
        t: for (; c !== null; ) {
          var m = c;
          c = s;
          for (var v = 0; v < e.length; v++)
            if (m.context === e[v]) {
              c.lanes |= n, m = c.alternate, m !== null && (m.lanes |= n), Vu(
                c.return,
                n,
                t
              ), a || (f = null);
              break t;
            }
          c = m.next;
        }
      } else if (s.tag === 18) {
        if (f = s.return, f === null) throw Error(r(341));
        f.lanes |= n, c = f.alternate, c !== null && (c.lanes |= n), Vu(f, n, t), f = null;
      } else f = s.child;
      if (f !== null) f.return = s;
      else
        for (f = s; f !== null; ) {
          if (f === t) {
            f = null;
            break;
          }
          if (s = f.sibling, s !== null) {
            s.return = f.return, f = s;
            break;
          }
          f = f.return;
        }
      s = f;
    }
  }
  function xa(t, e, n, a) {
    t = null;
    for (var s = e, c = !1; s !== null; ) {
      if (!c) {
        if ((s.flags & 524288) !== 0) c = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var f = s.alternate;
        if (f === null) throw Error(r(387));
        if (f = f.memoizedProps, f !== null) {
          var m = s.type;
          ue(s.pendingProps.value, f.value) || (t !== null ? t.push(m) : t = [m]);
        }
      } else if (s === mt.current) {
        if (f = s.alternate, f === null) throw Error(r(387));
        f.memoizedState.memoizedState !== s.memoizedState.memoizedState && (t !== null ? t.push(ki) : t = [ki]);
      }
      s = s.return;
    }
    t !== null && $u(
      e,
      t,
      n,
      a
    ), e.flags |= 262144;
  }
  function ql(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ue(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Fn(t) {
    In = t, Ze = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Yt(t) {
    return Mf(In, t);
  }
  function Ql(t, e) {
    return In === null && Fn(t), Mf(t, e);
  }
  function Mf(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, Ze === null) {
      if (t === null) throw Error(r(308));
      Ze = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Ze = Ze.next = e;
    return n;
  }
  var M0 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, O0 = i.unstable_scheduleCallback, z0 = i.unstable_NormalPriority, Dt = {
    $$typeof: Z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Zu() {
    return {
      controller: new M0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ai(t) {
    t.refCount--, t.refCount === 0 && O0(z0, function() {
      t.controller.abort();
    });
  }
  var Ri = null, Ku = 0, Na = 0, Ua = null;
  function D0(t, e) {
    if (Ri === null) {
      var n = Ri = [];
      Ku = 0, Na = Ir(), Ua = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return Ku++, e.then(Of, Of), e;
  }
  function Of() {
    if (--Ku === 0 && Ri !== null) {
      Ua !== null && (Ua.status = "fulfilled");
      var t = Ri;
      Ri = null, Na = 0, Ua = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function x0(t, e) {
    var n = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        n.push(s);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = e;
        for (var s = 0; s < n.length; s++) (0, n[s])(e);
      },
      function(s) {
        for (a.status = "rejected", a.reason = s, s = 0; s < n.length; s++)
          (0, n[s])(void 0);
      }
    ), a;
  }
  var zf = U.S;
  U.S = function(t, e) {
    hh = ie(), typeof e == "object" && e !== null && typeof e.then == "function" && D0(t, e), zf !== null && zf(t, e);
  };
  var Wn = T(null);
  function Ju() {
    var t = Wn.current;
    return t !== null ? t : Tt.pooledCache;
  }
  function Gl(t, e) {
    e === null ? G(Wn, Wn.current) : G(Wn, e.pool);
  }
  function Df() {
    var t = Ju();
    return t === null ? null : { parent: Dt._currentValue, pool: t };
  }
  var Ha = Error(r(460)), ku = Error(r(474)), Yl = Error(r(542)), Xl = { then: function() {
  } };
  function xf(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Nf(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(Ye, Ye), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Hf(t), t;
      default:
        if (typeof e.status == "string") e.then(Ye, Ye);
        else {
          if (t = Tt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(a) {
              if (e.status === "pending") {
                var s = e;
                s.status = "fulfilled", s.value = a;
              }
            },
            function(a) {
              if (e.status === "pending") {
                var s = e;
                s.status = "rejected", s.reason = a;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, Hf(t), t;
        }
        throw ta = e, Ha;
    }
  }
  function Pn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (ta = n, Ha) : n;
    }
  }
  var ta = null;
  function Uf() {
    if (ta === null) throw Error(r(459));
    var t = ta;
    return ta = null, t;
  }
  function Hf(t) {
    if (t === Ha || t === Yl)
      throw Error(r(483));
  }
  var Ba = null, _i = 0;
  function Vl(t) {
    var e = _i;
    return _i += 1, Ba === null && (Ba = []), Nf(Ba, t, e);
  }
  function wi(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function $l(t, e) {
    throw e.$$typeof === A ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Bf(t) {
    function e(R, E) {
      if (t) {
        var w = R.deletions;
        w === null ? (R.deletions = [E], R.flags |= 16) : w.push(E);
      }
    }
    function n(R, E) {
      if (!t) return null;
      for (; E !== null; )
        e(R, E), E = E.sibling;
      return null;
    }
    function a(R) {
      for (var E = /* @__PURE__ */ new Map(); R !== null; )
        R.key !== null ? E.set(R.key, R) : E.set(R.index, R), R = R.sibling;
      return E;
    }
    function s(R, E) {
      return R = Ve(R, E), R.index = 0, R.sibling = null, R;
    }
    function c(R, E, w) {
      return R.index = w, t ? (w = R.alternate, w !== null ? (w = w.index, w < E ? (R.flags |= 67108866, E) : w) : (R.flags |= 67108866, E)) : (R.flags |= 1048576, E);
    }
    function f(R) {
      return t && R.alternate === null && (R.flags |= 67108866), R;
    }
    function m(R, E, w, H) {
      return E === null || E.tag !== 6 ? (E = Lu(w, R.mode, H), E.return = R, E) : (E = s(E, w), E.return = R, E);
    }
    function v(R, E, w, H) {
      var K = w.type;
      return K === N ? x(
        R,
        E,
        w.props.children,
        H,
        w.key
      ) : E !== null && (E.elementType === K || typeof K == "object" && K !== null && K.$$typeof === qt && Pn(K) === E.type) ? (E = s(E, w.props), wi(E, w), E.return = R, E) : (E = Ll(
        w.type,
        w.key,
        w.props,
        null,
        R.mode,
        H
      ), wi(E, w), E.return = R, E);
    }
    function C(R, E, w, H) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== w.containerInfo || E.stateNode.implementation !== w.implementation ? (E = ju(w, R.mode, H), E.return = R, E) : (E = s(E, w.children || []), E.return = R, E);
    }
    function x(R, E, w, H, K) {
      return E === null || E.tag !== 7 ? (E = Jn(
        w,
        R.mode,
        H,
        K
      ), E.return = R, E) : (E = s(E, w), E.return = R, E);
    }
    function B(R, E, w) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = Lu(
          "" + E,
          R.mode,
          w
        ), E.return = R, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case _:
            return w = Ll(
              E.type,
              E.key,
              E.props,
              null,
              R.mode,
              w
            ), wi(w, E), w.return = R, w;
          case z:
            return E = ju(
              E,
              R.mode,
              w
            ), E.return = R, E;
          case qt:
            return E = Pn(E), B(R, E, w);
        }
        if (Ce(E) || kt(E))
          return E = Jn(
            E,
            R.mode,
            w,
            null
          ), E.return = R, E;
        if (typeof E.then == "function")
          return B(R, Vl(E), w);
        if (E.$$typeof === Z)
          return B(
            R,
            Ql(R, E),
            w
          );
        $l(R, E);
      }
      return null;
    }
    function O(R, E, w, H) {
      var K = E !== null ? E.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return K !== null ? null : m(R, E, "" + w, H);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case _:
            return w.key === K ? v(R, E, w, H) : null;
          case z:
            return w.key === K ? C(R, E, w, H) : null;
          case qt:
            return w = Pn(w), O(R, E, w, H);
        }
        if (Ce(w) || kt(w))
          return K !== null ? null : x(R, E, w, H, null);
        if (typeof w.then == "function")
          return O(
            R,
            E,
            Vl(w),
            H
          );
        if (w.$$typeof === Z)
          return O(
            R,
            E,
            Ql(R, w),
            H
          );
        $l(R, w);
      }
      return null;
    }
    function D(R, E, w, H, K) {
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return R = R.get(w) || null, m(E, R, "" + H, K);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case _:
            return R = R.get(
              H.key === null ? w : H.key
            ) || null, v(E, R, H, K);
          case z:
            return R = R.get(
              H.key === null ? w : H.key
            ) || null, C(E, R, H, K);
          case qt:
            return H = Pn(H), D(
              R,
              E,
              w,
              H,
              K
            );
        }
        if (Ce(H) || kt(H))
          return R = R.get(w) || null, x(E, R, H, K, null);
        if (typeof H.then == "function")
          return D(
            R,
            E,
            w,
            Vl(H),
            K
          );
        if (H.$$typeof === Z)
          return D(
            R,
            E,
            w,
            Ql(E, H),
            K
          );
        $l(E, H);
      }
      return null;
    }
    function Y(R, E, w, H) {
      for (var K = null, ft = null, V = E, et = E = 0, ut = null; V !== null && et < w.length; et++) {
        V.index > et ? (ut = V, V = null) : ut = V.sibling;
        var dt = O(
          R,
          V,
          w[et],
          H
        );
        if (dt === null) {
          V === null && (V = ut);
          break;
        }
        t && V && dt.alternate === null && e(R, V), E = c(dt, E, et), ft === null ? K = dt : ft.sibling = dt, ft = dt, V = ut;
      }
      if (et === w.length)
        return n(R, V), rt && $e(R, et), K;
      if (V === null) {
        for (; et < w.length; et++)
          V = B(R, w[et], H), V !== null && (E = c(
            V,
            E,
            et
          ), ft === null ? K = V : ft.sibling = V, ft = V);
        return rt && $e(R, et), K;
      }
      for (V = a(V); et < w.length; et++)
        ut = D(
          V,
          R,
          et,
          w[et],
          H
        ), ut !== null && (t && ut.alternate !== null && V.delete(
          ut.key === null ? et : ut.key
        ), E = c(
          ut,
          E,
          et
        ), ft === null ? K = ut : ft.sibling = ut, ft = ut);
      return t && V.forEach(function(Nn) {
        return e(R, Nn);
      }), rt && $e(R, et), K;
    }
    function J(R, E, w, H) {
      if (w == null) throw Error(r(151));
      for (var K = null, ft = null, V = E, et = E = 0, ut = null, dt = w.next(); V !== null && !dt.done; et++, dt = w.next()) {
        V.index > et ? (ut = V, V = null) : ut = V.sibling;
        var Nn = O(R, V, dt.value, H);
        if (Nn === null) {
          V === null && (V = ut);
          break;
        }
        t && V && Nn.alternate === null && e(R, V), E = c(Nn, E, et), ft === null ? K = Nn : ft.sibling = Nn, ft = Nn, V = ut;
      }
      if (dt.done)
        return n(R, V), rt && $e(R, et), K;
      if (V === null) {
        for (; !dt.done; et++, dt = w.next())
          dt = B(R, dt.value, H), dt !== null && (E = c(dt, E, et), ft === null ? K = dt : ft.sibling = dt, ft = dt);
        return rt && $e(R, et), K;
      }
      for (V = a(V); !dt.done; et++, dt = w.next())
        dt = D(V, R, et, dt.value, H), dt !== null && (t && dt.alternate !== null && V.delete(dt.key === null ? et : dt.key), E = c(dt, E, et), ft === null ? K = dt : ft.sibling = dt, ft = dt);
      return t && V.forEach(function(Xp) {
        return e(R, Xp);
      }), rt && $e(R, et), K;
    }
    function bt(R, E, w, H) {
      if (typeof w == "object" && w !== null && w.type === N && w.key === null && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case _:
            t: {
              for (var K = w.key; E !== null; ) {
                if (E.key === K) {
                  if (K = w.type, K === N) {
                    if (E.tag === 7) {
                      n(
                        R,
                        E.sibling
                      ), H = s(
                        E,
                        w.props.children
                      ), H.return = R, R = H;
                      break t;
                    }
                  } else if (E.elementType === K || typeof K == "object" && K !== null && K.$$typeof === qt && Pn(K) === E.type) {
                    n(
                      R,
                      E.sibling
                    ), H = s(E, w.props), wi(H, w), H.return = R, R = H;
                    break t;
                  }
                  n(R, E);
                  break;
                } else e(R, E);
                E = E.sibling;
              }
              w.type === N ? (H = Jn(
                w.props.children,
                R.mode,
                H,
                w.key
              ), H.return = R, R = H) : (H = Ll(
                w.type,
                w.key,
                w.props,
                null,
                R.mode,
                H
              ), wi(H, w), H.return = R, R = H);
            }
            return f(R);
          case z:
            t: {
              for (K = w.key; E !== null; ) {
                if (E.key === K)
                  if (E.tag === 4 && E.stateNode.containerInfo === w.containerInfo && E.stateNode.implementation === w.implementation) {
                    n(
                      R,
                      E.sibling
                    ), H = s(E, w.children || []), H.return = R, R = H;
                    break t;
                  } else {
                    n(R, E);
                    break;
                  }
                else e(R, E);
                E = E.sibling;
              }
              H = ju(w, R.mode, H), H.return = R, R = H;
            }
            return f(R);
          case qt:
            return w = Pn(w), bt(
              R,
              E,
              w,
              H
            );
        }
        if (Ce(w))
          return Y(
            R,
            E,
            w,
            H
          );
        if (kt(w)) {
          if (K = kt(w), typeof K != "function") throw Error(r(150));
          return w = K.call(w), J(
            R,
            E,
            w,
            H
          );
        }
        if (typeof w.then == "function")
          return bt(
            R,
            E,
            Vl(w),
            H
          );
        if (w.$$typeof === Z)
          return bt(
            R,
            E,
            Ql(R, w),
            H
          );
        $l(R, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint" ? (w = "" + w, E !== null && E.tag === 6 ? (n(R, E.sibling), H = s(E, w), H.return = R, R = H) : (n(R, E), H = Lu(w, R.mode, H), H.return = R, R = H), f(R)) : n(R, E);
    }
    return function(R, E, w, H) {
      try {
        _i = 0;
        var K = bt(
          R,
          E,
          w,
          H
        );
        return Ba = null, K;
      } catch (V) {
        if (V === Ha || V === Yl) throw V;
        var ft = re(29, V, null, R.mode);
        return ft.lanes = H, ft.return = R, ft;
      } finally {
      }
    };
  }
  var ea = Bf(!0), Lf = Bf(!1), gn = !1;
  function Iu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Fu(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function pn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Sn(t, e, n) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ht & 2) !== 0) {
      var s = a.pending;
      return s === null ? e.next = e : (e.next = s.next, s.next = e), a.pending = e, e = Bl(t), bf(t, null, n), e;
    }
    return Hl(t, a, e, n), Bl(t);
  }
  function Ci(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, n |= a, e.lanes = n, Co(t, n);
    }
  }
  function Wu(t, e) {
    var n = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var s = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? s = c = f : c = c.next = f, n = n.next;
        } while (n !== null);
        c === null ? s = c = e : c = c.next = e;
      } else s = c = e;
      n = {
        baseState: a.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: c,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var Pu = !1;
  function Mi() {
    if (Pu) {
      var t = Ua;
      if (t !== null) throw t;
    }
  }
  function Oi(t, e, n, a) {
    Pu = !1;
    var s = t.updateQueue;
    gn = !1;
    var c = s.firstBaseUpdate, f = s.lastBaseUpdate, m = s.shared.pending;
    if (m !== null) {
      s.shared.pending = null;
      var v = m, C = v.next;
      v.next = null, f === null ? c = C : f.next = C, f = v;
      var x = t.alternate;
      x !== null && (x = x.updateQueue, m = x.lastBaseUpdate, m !== f && (m === null ? x.firstBaseUpdate = C : m.next = C, x.lastBaseUpdate = v));
    }
    if (c !== null) {
      var B = s.baseState;
      f = 0, x = C = v = null, m = c;
      do {
        var O = m.lane & -536870913, D = O !== m.lane;
        if (D ? (st & O) === O : (a & O) === O) {
          O !== 0 && O === Na && (Pu = !0), x !== null && (x = x.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          t: {
            var Y = t, J = m;
            O = e;
            var bt = n;
            switch (J.tag) {
              case 1:
                if (Y = J.payload, typeof Y == "function") {
                  B = Y.call(bt, B, O);
                  break t;
                }
                B = Y;
                break t;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = J.payload, O = typeof Y == "function" ? Y.call(bt, B, O) : Y, O == null) break t;
                B = S({}, B, O);
                break t;
              case 2:
                gn = !0;
            }
          }
          O = m.callback, O !== null && (t.flags |= 64, D && (t.flags |= 8192), D = s.callbacks, D === null ? s.callbacks = [O] : D.push(O));
        } else
          D = {
            lane: O,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, x === null ? (C = x = D, v = B) : x = x.next = D, f |= O;
        if (m = m.next, m === null) {
          if (m = s.shared.pending, m === null)
            break;
          D = m, m = D.next, D.next = null, s.lastBaseUpdate = D, s.shared.pending = null;
        }
      } while (!0);
      x === null && (v = B), s.baseState = v, s.firstBaseUpdate = C, s.lastBaseUpdate = x, c === null && (s.shared.lanes = 0), An |= f, t.lanes = f, t.memoizedState = B;
    }
  }
  function jf(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function qf(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        jf(n[t], e);
  }
  var La = T(null), Zl = T(0);
  function Qf(t, e) {
    t = nn, G(Zl, t), G(La, e), nn = t | e.baseLanes;
  }
  function tr() {
    G(Zl, nn), G(La, La.current);
  }
  function er() {
    nn = Zl.current, L(La), L(Zl);
  }
  var ce = T(null), Ae = null;
  function vn(t) {
    var e = t.alternate;
    G(Ot, Ot.current & 1), G(ce, t), Ae === null && (e === null || La.current !== null || e.memoizedState !== null) && (Ae = t);
  }
  function nr(t) {
    G(Ot, Ot.current), G(ce, t), Ae === null && (Ae = t);
  }
  function Gf(t) {
    t.tag === 22 ? (G(Ot, Ot.current), G(ce, t), Ae === null && (Ae = t)) : bn();
  }
  function bn() {
    G(Ot, Ot.current), G(ce, ce.current);
  }
  function oe(t) {
    L(ce), Ae === t && (Ae = null), L(Ot);
  }
  var Ot = T(0);
  function Kl(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || rc(n) || cc(n)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Je = 0, P = null, St = null, xt = null, Jl = !1, ja = !1, na = !1, kl = 0, zi = 0, qa = null, N0 = 0;
  function wt() {
    throw Error(r(321));
  }
  function ar(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!ue(t[n], e[n])) return !1;
    return !0;
  }
  function ir(t, e, n, a, s, c) {
    return Je = c, P = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, U.H = t === null || t.memoizedState === null ? Rd : vr, na = !1, c = n(a, s), na = !1, ja && (c = Xf(
      e,
      n,
      a,
      s
    )), Yf(t), c;
  }
  function Yf(t) {
    U.H = Ni;
    var e = St !== null && St.next !== null;
    if (Je = 0, xt = St = P = null, Jl = !1, zi = 0, qa = null, e) throw Error(r(300));
    t === null || Nt || (t = t.dependencies, t !== null && ql(t) && (Nt = !0));
  }
  function Xf(t, e, n, a) {
    P = t;
    var s = 0;
    do {
      if (ja && (qa = null), zi = 0, ja = !1, 25 <= s) throw Error(r(301));
      if (s += 1, xt = St = null, t.updateQueue != null) {
        var c = t.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      U.H = _d, c = e(n, a);
    } while (ja);
    return c;
  }
  function U0() {
    var t = U.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Di(e) : e, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (P.flags |= 1024), e;
  }
  function lr() {
    var t = kl !== 0;
    return kl = 0, t;
  }
  function sr(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function ur(t) {
    if (Jl) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Jl = !1;
    }
    Je = 0, xt = St = P = null, ja = !1, zi = kl = 0, qa = null;
  }
  function Jt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return xt === null ? P.memoizedState = xt = t : xt = xt.next = t, xt;
  }
  function zt() {
    if (St === null) {
      var t = P.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var e = xt === null ? P.memoizedState : xt.next;
    if (e !== null)
      xt = e, St = t;
    else {
      if (t === null)
        throw P.alternate === null ? Error(r(467)) : Error(r(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, xt === null ? P.memoizedState = xt = t : xt = xt.next = t;
    }
    return xt;
  }
  function Il() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Di(t) {
    var e = zi;
    return zi += 1, qa === null && (qa = []), t = Nf(qa, t, e), e = P, (xt === null ? e.memoizedState : xt.next) === null && (e = e.alternate, U.H = e === null || e.memoizedState === null ? Rd : vr), t;
  }
  function Fl(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Di(t);
      if (t.$$typeof === Z) return Yt(t);
    }
    throw Error(r(438, String(t)));
  }
  function rr(t) {
    var e = null, n = P.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var a = P.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Il(), P.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), a = 0; a < t; a++)
        n[a] = ma;
    return e.index++, n;
  }
  function ke(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Wl(t) {
    var e = zt();
    return cr(e, St, t);
  }
  function cr(t, e, n) {
    var a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var s = t.baseQueue, c = a.pending;
    if (c !== null) {
      if (s !== null) {
        var f = s.next;
        s.next = c.next, c.next = f;
      }
      e.baseQueue = s = c, a.pending = null;
    }
    if (c = t.baseState, s === null) t.memoizedState = c;
    else {
      e = s.next;
      var m = f = null, v = null, C = e, x = !1;
      do {
        var B = C.lane & -536870913;
        if (B !== C.lane ? (st & B) === B : (Je & B) === B) {
          var O = C.revertLane;
          if (O === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null
            }), B === Na && (x = !0);
          else if ((Je & O) === O) {
            C = C.next, O === Na && (x = !0);
            continue;
          } else
            B = {
              lane: 0,
              revertLane: C.revertLane,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null
            }, v === null ? (m = v = B, f = c) : v = v.next = B, P.lanes |= O, An |= O;
          B = C.action, na && n(c, B), c = C.hasEagerState ? C.eagerState : n(c, B);
        } else
          O = {
            lane: B,
            revertLane: C.revertLane,
            gesture: C.gesture,
            action: C.action,
            hasEagerState: C.hasEagerState,
            eagerState: C.eagerState,
            next: null
          }, v === null ? (m = v = O, f = c) : v = v.next = O, P.lanes |= B, An |= B;
        C = C.next;
      } while (C !== null && C !== e);
      if (v === null ? f = c : v.next = m, !ue(c, t.memoizedState) && (Nt = !0, x && (n = Ua, n !== null)))
        throw n;
      t.memoizedState = c, t.baseState = f, t.baseQueue = v, a.lastRenderedState = c;
    }
    return s === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function or(t) {
    var e = zt(), n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = t;
    var a = n.dispatch, s = n.pending, c = e.memoizedState;
    if (s !== null) {
      n.pending = null;
      var f = s = s.next;
      do
        c = t(c, f.action), f = f.next;
      while (f !== s);
      ue(c, e.memoizedState) || (Nt = !0), e.memoizedState = c, e.baseQueue === null && (e.baseState = c), n.lastRenderedState = c;
    }
    return [c, a];
  }
  function Vf(t, e, n) {
    var a = P, s = zt(), c = rt;
    if (c) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = e();
    var f = !ue(
      (St || s).memoizedState,
      n
    );
    if (f && (s.memoizedState = n, Nt = !0), s = s.queue, hr(Kf.bind(null, a, s, t), [
      t
    ]), s.getSnapshot !== e || f || xt !== null && xt.memoizedState.tag & 1) {
      if (a.flags |= 2048, Qa(
        9,
        { destroy: void 0 },
        Zf.bind(
          null,
          a,
          s,
          n,
          e
        ),
        null
      ), Tt === null) throw Error(r(349));
      c || (Je & 127) !== 0 || $f(a, e, n);
    }
    return n;
  }
  function $f(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = P.updateQueue, e === null ? (e = Il(), P.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function Zf(t, e, n, a) {
    e.value = n, e.getSnapshot = a, Jf(e) && kf(t);
  }
  function Kf(t, e, n) {
    return n(function() {
      Jf(e) && kf(t);
    });
  }
  function Jf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !ue(t, n);
    } catch {
      return !0;
    }
  }
  function kf(t) {
    var e = Kn(t, 2);
    e !== null && ne(e, t, 2);
  }
  function fr(t) {
    var e = Jt();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), na) {
        cn(!0);
        try {
          n();
        } finally {
          cn(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ke,
      lastRenderedState: t
    }, e;
  }
  function If(t, e, n, a) {
    return t.baseState = n, cr(
      t,
      St,
      typeof a == "function" ? a : ke
    );
  }
  function H0(t, e, n, a, s) {
    if (es(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var c = {
        payload: s,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          c.listeners.push(f);
        }
      };
      U.T !== null ? n(!0) : c.isTransition = !1, a(c), n = e.pending, n === null ? (c.next = e.pending = c, Ff(e, c)) : (c.next = n.next, e.pending = n.next = c);
    }
  }
  function Ff(t, e) {
    var n = e.action, a = e.payload, s = t.state;
    if (e.isTransition) {
      var c = U.T, f = {};
      U.T = f;
      try {
        var m = n(s, a), v = U.S;
        v !== null && v(f, m), Wf(t, e, m);
      } catch (C) {
        dr(t, e, C);
      } finally {
        c !== null && f.types !== null && (c.types = f.types), U.T = c;
      }
    } else
      try {
        c = n(s, a), Wf(t, e, c);
      } catch (C) {
        dr(t, e, C);
      }
  }
  function Wf(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        Pf(t, e, a);
      },
      function(a) {
        return dr(t, e, a);
      }
    ) : Pf(t, e, n);
  }
  function Pf(t, e, n) {
    e.status = "fulfilled", e.value = n, td(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Ff(t, n)));
  }
  function dr(t, e, n) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = n, td(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function td(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function ed(t, e) {
    return e;
  }
  function nd(t, e) {
    if (rt) {
      var n = Tt.formState;
      if (n !== null) {
        t: {
          var a = P;
          if (rt) {
            if (At) {
              e: {
                for (var s = At, c = Te; s.nodeType !== 8; ) {
                  if (!c) {
                    s = null;
                    break e;
                  }
                  if (s = Re(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break e;
                  }
                }
                c = s.data, s = c === "F!" || c === "F" ? s : null;
              }
              if (s) {
                At = Re(
                  s.nextSibling
                ), a = s.data === "F!";
                break t;
              }
            }
            mn(a);
          }
          a = !1;
        }
        a && (e = n[0]);
      }
    }
    return n = Jt(), n.memoizedState = n.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ed,
      lastRenderedState: e
    }, n.queue = a, n = Ed.bind(
      null,
      P,
      a
    ), a.dispatch = n, a = fr(!1), c = Sr.bind(
      null,
      P,
      !1,
      a.queue
    ), a = Jt(), s = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = s, n = H0.bind(
      null,
      P,
      s,
      c,
      n
    ), s.dispatch = n, a.memoizedState = t, [e, n, !1];
  }
  function ad(t) {
    var e = zt();
    return id(e, St, t);
  }
  function id(t, e, n) {
    if (e = cr(
      t,
      e,
      ed
    )[0], t = Wl(ke)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = Di(e);
      } catch (f) {
        throw f === Ha ? Yl : f;
      }
    else a = e;
    e = zt();
    var s = e.queue, c = s.dispatch;
    return n !== e.memoizedState && (P.flags |= 2048, Qa(
      9,
      { destroy: void 0 },
      B0.bind(null, s, n),
      null
    )), [a, c, t];
  }
  function B0(t, e) {
    t.action = e;
  }
  function ld(t) {
    var e = zt(), n = St;
    if (n !== null)
      return id(e, n, t);
    zt(), e = e.memoizedState, n = zt();
    var a = n.queue.dispatch;
    return n.memoizedState = t, [e, a, !1];
  }
  function Qa(t, e, n, a) {
    return t = { tag: t, create: n, deps: a, inst: e, next: null }, e = P.updateQueue, e === null && (e = Il(), P.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (a = n.next, n.next = t, t.next = a, e.lastEffect = t), t;
  }
  function sd() {
    return zt().memoizedState;
  }
  function Pl(t, e, n, a) {
    var s = Jt();
    P.flags |= t, s.memoizedState = Qa(
      1 | e,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a
    );
  }
  function ts(t, e, n, a) {
    var s = zt();
    a = a === void 0 ? null : a;
    var c = s.memoizedState.inst;
    St !== null && a !== null && ar(a, St.memoizedState.deps) ? s.memoizedState = Qa(e, c, n, a) : (P.flags |= t, s.memoizedState = Qa(
      1 | e,
      c,
      n,
      a
    ));
  }
  function ud(t, e) {
    Pl(8390656, 8, t, e);
  }
  function hr(t, e) {
    ts(2048, 8, t, e);
  }
  function L0(t) {
    P.flags |= 4;
    var e = P.updateQueue;
    if (e === null)
      e = Il(), P.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function rd(t) {
    var e = zt().memoizedState;
    return L0({ ref: e, nextImpl: t }), function() {
      if ((ht & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function cd(t, e) {
    return ts(4, 2, t, e);
  }
  function od(t, e) {
    return ts(4, 4, t, e);
  }
  function fd(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function dd(t, e, n) {
    n = n != null ? n.concat([t]) : null, ts(4, 4, fd.bind(null, e, t), n);
  }
  function mr() {
  }
  function hd(t, e) {
    var n = zt();
    e = e === void 0 ? null : e;
    var a = n.memoizedState;
    return e !== null && ar(e, a[1]) ? a[0] : (n.memoizedState = [t, e], t);
  }
  function md(t, e) {
    var n = zt();
    e = e === void 0 ? null : e;
    var a = n.memoizedState;
    if (e !== null && ar(e, a[1]))
      return a[0];
    if (a = t(), na) {
      cn(!0);
      try {
        t();
      } finally {
        cn(!1);
      }
    }
    return n.memoizedState = [a, e], a;
  }
  function yr(t, e, n) {
    return n === void 0 || (Je & 1073741824) !== 0 && (st & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = yh(), P.lanes |= t, An |= t, n);
  }
  function yd(t, e, n, a) {
    return ue(n, e) ? n : La.current !== null ? (t = yr(t, n, a), ue(t, e) || (Nt = !0), t) : (Je & 42) === 0 || (Je & 1073741824) !== 0 && (st & 261930) === 0 ? (Nt = !0, t.memoizedState = n) : (t = yh(), P.lanes |= t, An |= t, e);
  }
  function gd(t, e, n, a, s) {
    var c = Q.p;
    Q.p = c !== 0 && 8 > c ? c : 8;
    var f = U.T, m = {};
    U.T = m, Sr(t, !1, e, n);
    try {
      var v = s(), C = U.S;
      if (C !== null && C(m, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var x = x0(
          v,
          a
        );
        xi(
          t,
          e,
          x,
          he(t)
        );
      } else
        xi(
          t,
          e,
          a,
          he(t)
        );
    } catch (B) {
      xi(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: B },
        he()
      );
    } finally {
      Q.p = c, f !== null && m.types !== null && (f.types = m.types), U.T = f;
    }
  }
  function j0() {
  }
  function gr(t, e, n, a) {
    if (t.tag !== 5) throw Error(r(476));
    var s = pd(t).queue;
    gd(
      t,
      s,
      e,
      k,
      n === null ? j0 : function() {
        return Sd(t), n(a);
      }
    );
  }
  function pd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: k,
      baseState: k,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ke,
        lastRenderedState: k
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ke,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Sd(t) {
    var e = pd(t);
    e.next === null && (e = t.alternate.memoizedState), xi(
      t,
      e.next.queue,
      {},
      he()
    );
  }
  function pr() {
    return Yt(ki);
  }
  function vd() {
    return zt().memoizedState;
  }
  function bd() {
    return zt().memoizedState;
  }
  function q0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = he();
          t = pn(n);
          var a = Sn(e, t, n);
          a !== null && (ne(a, e, n), Ci(a, e, n)), e = { cache: Zu() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Q0(t, e, n) {
    var a = he();
    n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, es(t) ? Td(e, n) : (n = Hu(t, e, n, a), n !== null && (ne(n, t, a), Ad(n, e, a)));
  }
  function Ed(t, e, n) {
    var a = he();
    xi(t, e, n, a);
  }
  function xi(t, e, n, a) {
    var s = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (es(t)) Td(e, s);
    else {
      var c = t.alternate;
      if (t.lanes === 0 && (c === null || c.lanes === 0) && (c = e.lastRenderedReducer, c !== null))
        try {
          var f = e.lastRenderedState, m = c(f, n);
          if (s.hasEagerState = !0, s.eagerState = m, ue(m, f))
            return Hl(t, e, s, 0), Tt === null && Ul(), !1;
        } catch {
        } finally {
        }
      if (n = Hu(t, e, s, a), n !== null)
        return ne(n, t, a), Ad(n, e, a), !0;
    }
    return !1;
  }
  function Sr(t, e, n, a) {
    if (a = {
      lane: 2,
      revertLane: Ir(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, es(t)) {
      if (e) throw Error(r(479));
    } else
      e = Hu(
        t,
        n,
        a,
        2
      ), e !== null && ne(e, t, 2);
  }
  function es(t) {
    var e = t.alternate;
    return t === P || e !== null && e === P;
  }
  function Td(t, e) {
    ja = Jl = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function Ad(t, e, n) {
    if ((n & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, n |= a, e.lanes = n, Co(t, n);
    }
  }
  var Ni = {
    readContext: Yt,
    use: Fl,
    useCallback: wt,
    useContext: wt,
    useEffect: wt,
    useImperativeHandle: wt,
    useLayoutEffect: wt,
    useInsertionEffect: wt,
    useMemo: wt,
    useReducer: wt,
    useRef: wt,
    useState: wt,
    useDebugValue: wt,
    useDeferredValue: wt,
    useTransition: wt,
    useSyncExternalStore: wt,
    useId: wt,
    useHostTransitionStatus: wt,
    useFormState: wt,
    useActionState: wt,
    useOptimistic: wt,
    useMemoCache: wt,
    useCacheRefresh: wt
  };
  Ni.useEffectEvent = wt;
  var Rd = {
    readContext: Yt,
    use: Fl,
    useCallback: function(t, e) {
      return Jt().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Yt,
    useEffect: ud,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Pl(
        4194308,
        4,
        fd.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Pl(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Pl(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = Jt();
      e = e === void 0 ? null : e;
      var a = t();
      if (na) {
        cn(!0);
        try {
          t();
        } finally {
          cn(!1);
        }
      }
      return n.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, n) {
      var a = Jt();
      if (n !== void 0) {
        var s = n(e);
        if (na) {
          cn(!0);
          try {
            n(e);
          } finally {
            cn(!1);
          }
        }
      } else s = e;
      return a.memoizedState = a.baseState = s, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: s
      }, a.queue = t, t = t.dispatch = Q0.bind(
        null,
        P,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = Jt();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = fr(t);
      var e = t.queue, n = Ed.bind(null, P, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: mr,
    useDeferredValue: function(t, e) {
      var n = Jt();
      return yr(n, t, e);
    },
    useTransition: function() {
      var t = fr(!1);
      return t = gd.bind(
        null,
        P,
        t.queue,
        !0,
        !1
      ), Jt().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var a = P, s = Jt();
      if (rt) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = e(), Tt === null)
          throw Error(r(349));
        (st & 127) !== 0 || $f(a, e, n);
      }
      s.memoizedState = n;
      var c = { value: n, getSnapshot: e };
      return s.queue = c, ud(Kf.bind(null, a, c, t), [
        t
      ]), a.flags |= 2048, Qa(
        9,
        { destroy: void 0 },
        Zf.bind(
          null,
          a,
          c,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = Jt(), e = Tt.identifierPrefix;
      if (rt) {
        var n = He, a = Ue;
        n = (a & ~(1 << 32 - se(a) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = kl++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = N0++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: pr,
    useFormState: nd,
    useActionState: nd,
    useOptimistic: function(t) {
      var e = Jt();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = Sr.bind(
        null,
        P,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: rr,
    useCacheRefresh: function() {
      return Jt().memoizedState = q0.bind(
        null,
        P
      );
    },
    useEffectEvent: function(t) {
      var e = Jt(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((ht & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, vr = {
    readContext: Yt,
    use: Fl,
    useCallback: hd,
    useContext: Yt,
    useEffect: hr,
    useImperativeHandle: dd,
    useInsertionEffect: cd,
    useLayoutEffect: od,
    useMemo: md,
    useReducer: Wl,
    useRef: sd,
    useState: function() {
      return Wl(ke);
    },
    useDebugValue: mr,
    useDeferredValue: function(t, e) {
      var n = zt();
      return yd(
        n,
        St.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Wl(ke)[0], e = zt().memoizedState;
      return [
        typeof t == "boolean" ? t : Di(t),
        e
      ];
    },
    useSyncExternalStore: Vf,
    useId: vd,
    useHostTransitionStatus: pr,
    useFormState: ad,
    useActionState: ad,
    useOptimistic: function(t, e) {
      var n = zt();
      return If(n, St, t, e);
    },
    useMemoCache: rr,
    useCacheRefresh: bd
  };
  vr.useEffectEvent = rd;
  var _d = {
    readContext: Yt,
    use: Fl,
    useCallback: hd,
    useContext: Yt,
    useEffect: hr,
    useImperativeHandle: dd,
    useInsertionEffect: cd,
    useLayoutEffect: od,
    useMemo: md,
    useReducer: or,
    useRef: sd,
    useState: function() {
      return or(ke);
    },
    useDebugValue: mr,
    useDeferredValue: function(t, e) {
      var n = zt();
      return St === null ? yr(n, t, e) : yd(
        n,
        St.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = or(ke)[0], e = zt().memoizedState;
      return [
        typeof t == "boolean" ? t : Di(t),
        e
      ];
    },
    useSyncExternalStore: Vf,
    useId: vd,
    useHostTransitionStatus: pr,
    useFormState: ld,
    useActionState: ld,
    useOptimistic: function(t, e) {
      var n = zt();
      return St !== null ? If(n, St, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: rr,
    useCacheRefresh: bd
  };
  _d.useEffectEvent = rd;
  function br(t, e, n, a) {
    e = t.memoizedState, n = n(a, e), n = n == null ? e : S({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var Er = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var a = he(), s = pn(a);
      s.payload = e, n != null && (s.callback = n), e = Sn(t, s, a), e !== null && (ne(e, t, a), Ci(e, t, a));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var a = he(), s = pn(a);
      s.tag = 1, s.payload = e, n != null && (s.callback = n), e = Sn(t, s, a), e !== null && (ne(e, t, a), Ci(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = he(), a = pn(n);
      a.tag = 2, e != null && (a.callback = e), e = Sn(t, a, n), e !== null && (ne(e, t, n), Ci(e, t, n));
    }
  };
  function wd(t, e, n, a, s, c, f) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, c, f) : e.prototype && e.prototype.isPureReactComponent ? !vi(n, a) || !vi(s, c) : !0;
  }
  function Cd(t, e, n, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, a), e.state !== t && Er.enqueueReplaceState(e, e.state, null);
  }
  function aa(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var a in e)
        a !== "ref" && (n[a] = e[a]);
    }
    if (t = t.defaultProps) {
      n === e && (n = S({}, n));
      for (var s in t)
        n[s] === void 0 && (n[s] = t[s]);
    }
    return n;
  }
  function Md(t) {
    Nl(t);
  }
  function Od(t) {
    console.error(t);
  }
  function zd(t) {
    Nl(t);
  }
  function ns(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Dd(t, e, n) {
    try {
      var a = t.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Tr(t, e, n) {
    return n = pn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      ns(t, e);
    }, n;
  }
  function xd(t) {
    return t = pn(t), t.tag = 3, t;
  }
  function Nd(t, e, n, a) {
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var c = a.value;
      t.payload = function() {
        return s(c);
      }, t.callback = function() {
        Dd(e, n, a);
      };
    }
    var f = n.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (t.callback = function() {
      Dd(e, n, a), typeof s != "function" && (Rn === null ? Rn = /* @__PURE__ */ new Set([this]) : Rn.add(this));
      var m = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function G0(t, e, n, a, s) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = n.alternate, e !== null && xa(
        e,
        n,
        s,
        !0
      ), n = ce.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Ae === null ? ms() : n.alternate === null && Ct === 0 && (Ct = 3), n.flags &= -257, n.flags |= 65536, n.lanes = s, a === Xl ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Kr(t, a, s)), !1;
          case 22:
            return n.flags |= 65536, a === Xl ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), Kr(t, a, s)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return Kr(t, a, s), ms(), !1;
    }
    if (rt)
      return e = ce.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = s, a !== Gu && (t = Error(r(422), { cause: a }), Ti(ve(t, n)))) : (a !== Gu && (e = Error(r(423), {
        cause: a
      }), Ti(
        ve(e, n)
      )), t = t.current.alternate, t.flags |= 65536, s &= -s, t.lanes |= s, a = ve(a, n), s = Tr(
        t.stateNode,
        a,
        s
      ), Wu(t, s), Ct !== 4 && (Ct = 2)), !1;
    var c = Error(r(520), { cause: a });
    if (c = ve(c, n), Gi === null ? Gi = [c] : Gi.push(c), Ct !== 4 && (Ct = 2), e === null) return !0;
    a = ve(a, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = s & -s, n.lanes |= t, t = Tr(n.stateNode, a, t), Wu(n, t), !1;
        case 1:
          if (e = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Rn === null || !Rn.has(c))))
            return n.flags |= 65536, s &= -s, n.lanes |= s, s = xd(s), Nd(
              s,
              t,
              n,
              a
            ), Wu(n, s), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Ar = Error(r(461)), Nt = !1;
  function Xt(t, e, n, a) {
    e.child = t === null ? Lf(e, null, n, a) : ea(
      e,
      t.child,
      n,
      a
    );
  }
  function Ud(t, e, n, a, s) {
    n = n.render;
    var c = e.ref;
    if ("ref" in a) {
      var f = {};
      for (var m in a)
        m !== "ref" && (f[m] = a[m]);
    } else f = a;
    return Fn(e), a = ir(
      t,
      e,
      n,
      f,
      c,
      s
    ), m = lr(), t !== null && !Nt ? (sr(t, e, s), Ie(t, e, s)) : (rt && m && qu(e), e.flags |= 1, Xt(t, e, a, s), e.child);
  }
  function Hd(t, e, n, a, s) {
    if (t === null) {
      var c = n.type;
      return typeof c == "function" && !Bu(c) && c.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = c, Bd(
        t,
        e,
        c,
        a,
        s
      )) : (t = Ll(
        n.type,
        null,
        a,
        e,
        e.mode,
        s
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (c = t.child, !Dr(t, s)) {
      var f = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : vi, n(f, a) && t.ref === e.ref)
        return Ie(t, e, s);
    }
    return e.flags |= 1, t = Ve(c, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Bd(t, e, n, a, s) {
    if (t !== null) {
      var c = t.memoizedProps;
      if (vi(c, a) && t.ref === e.ref)
        if (Nt = !1, e.pendingProps = a = c, Dr(t, s))
          (t.flags & 131072) !== 0 && (Nt = !0);
        else
          return e.lanes = t.lanes, Ie(t, e, s);
    }
    return Rr(
      t,
      e,
      n,
      a,
      s
    );
  }
  function Ld(t, e, n, a) {
    var s = a.children, c = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | n : n, t !== null) {
          for (a = e.child = t.child, s = 0; a !== null; )
            s = s | a.lanes | a.childLanes, a = a.sibling;
          a = s & ~c;
        } else a = 0, e.child = null;
        return jd(
          t,
          e,
          c,
          n,
          a
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Gl(
          e,
          c !== null ? c.cachePool : null
        ), c !== null ? Qf(e, c) : tr(), Gf(e);
      else
        return a = e.lanes = 536870912, jd(
          t,
          e,
          c !== null ? c.baseLanes | n : n,
          n,
          a
        );
    } else
      c !== null ? (Gl(e, c.cachePool), Qf(e, c), bn(), e.memoizedState = null) : (t !== null && Gl(e, null), tr(), bn());
    return Xt(t, e, s, n), e.child;
  }
  function Ui(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function jd(t, e, n, a, s) {
    var c = Ju();
    return c = c === null ? null : { parent: Dt._currentValue, pool: c }, e.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, t !== null && Gl(e, null), tr(), Gf(e), t !== null && xa(t, e, a, !0), e.childLanes = s, null;
  }
  function as(t, e) {
    return e = ls(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function qd(t, e, n) {
    return ea(e, t.child, null, n), t = as(e, e.pendingProps), t.flags |= 2, oe(e), e.memoizedState = null, t;
  }
  function Y0(t, e, n) {
    var a = e.pendingProps, s = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (rt) {
        if (a.mode === "hidden")
          return t = as(e, a), e.lanes = 536870912, Ui(null, t);
        if (nr(e), (t = At) ? (t = Fh(
          t,
          Te
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: dn !== null ? { id: Ue, overflow: He } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Tf(t), n.return = e, e.child = n, Gt = e, At = null)) : t = null, t === null) throw mn(e);
        return e.lanes = 536870912, null;
      }
      return as(e, a);
    }
    var c = t.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if (nr(e), s)
        if (e.flags & 256)
          e.flags &= -257, e = qd(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (Nt || xa(t, e, n, !1), s = (n & t.childLanes) !== 0, Nt || s) {
        if (a = Tt, a !== null && (f = Mo(a, n), f !== 0 && f !== c.retryLane))
          throw c.retryLane = f, Kn(t, f), ne(a, t, f), Ar;
        ms(), e = qd(
          t,
          e,
          n
        );
      } else
        t = c.treeContext, At = Re(f.nextSibling), Gt = e, rt = !0, hn = null, Te = !1, t !== null && _f(e, t), e = as(e, a), e.flags |= 4096;
      return e;
    }
    return t = Ve(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function is(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Rr(t, e, n, a, s) {
    return Fn(e), n = ir(
      t,
      e,
      n,
      a,
      void 0,
      s
    ), a = lr(), t !== null && !Nt ? (sr(t, e, s), Ie(t, e, s)) : (rt && a && qu(e), e.flags |= 1, Xt(t, e, n, s), e.child);
  }
  function Qd(t, e, n, a, s, c) {
    return Fn(e), e.updateQueue = null, n = Xf(
      e,
      a,
      n,
      s
    ), Yf(t), a = lr(), t !== null && !Nt ? (sr(t, e, c), Ie(t, e, c)) : (rt && a && qu(e), e.flags |= 1, Xt(t, e, n, c), e.child);
  }
  function Gd(t, e, n, a, s) {
    if (Fn(e), e.stateNode === null) {
      var c = Ma, f = n.contextType;
      typeof f == "object" && f !== null && (c = Yt(f)), c = new n(a, c), e.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = Er, e.stateNode = c, c._reactInternals = e, c = e.stateNode, c.props = a, c.state = e.memoizedState, c.refs = {}, Iu(e), f = n.contextType, c.context = typeof f == "object" && f !== null ? Yt(f) : Ma, c.state = e.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (br(
        e,
        n,
        f,
        a
      ), c.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (f = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), f !== c.state && Er.enqueueReplaceState(c, c.state, null), Oi(e, a, c, s), Mi(), c.state = e.memoizedState), typeof c.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      c = e.stateNode;
      var m = e.memoizedProps, v = aa(n, m);
      c.props = v;
      var C = c.context, x = n.contextType;
      f = Ma, typeof x == "object" && x !== null && (f = Yt(x));
      var B = n.getDerivedStateFromProps;
      x = typeof B == "function" || typeof c.getSnapshotBeforeUpdate == "function", m = e.pendingProps !== m, x || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (m || C !== f) && Cd(
        e,
        c,
        a,
        f
      ), gn = !1;
      var O = e.memoizedState;
      c.state = O, Oi(e, a, c, s), Mi(), C = e.memoizedState, m || O !== C || gn ? (typeof B == "function" && (br(
        e,
        n,
        B,
        a
      ), C = e.memoizedState), (v = gn || wd(
        e,
        n,
        v,
        a,
        O,
        C,
        f
      )) ? (x || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = C), c.props = a, c.state = C, c.context = f, a = v) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      c = e.stateNode, Fu(t, e), f = e.memoizedProps, x = aa(n, f), c.props = x, B = e.pendingProps, O = c.context, C = n.contextType, v = Ma, typeof C == "object" && C !== null && (v = Yt(C)), m = n.getDerivedStateFromProps, (C = typeof m == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (f !== B || O !== v) && Cd(
        e,
        c,
        a,
        v
      ), gn = !1, O = e.memoizedState, c.state = O, Oi(e, a, c, s), Mi();
      var D = e.memoizedState;
      f !== B || O !== D || gn || t !== null && t.dependencies !== null && ql(t.dependencies) ? (typeof m == "function" && (br(
        e,
        n,
        m,
        a
      ), D = e.memoizedState), (x = gn || wd(
        e,
        n,
        x,
        a,
        O,
        D,
        v
      ) || t !== null && t.dependencies !== null && ql(t.dependencies)) ? (C || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(a, D, v), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        a,
        D,
        v
      )), typeof c.componentDidUpdate == "function" && (e.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || f === t.memoizedProps && O === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && O === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = D), c.props = a, c.state = D, c.context = v, a = x) : (typeof c.componentDidUpdate != "function" || f === t.memoizedProps && O === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && O === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return c = a, is(t, e), a = (e.flags & 128) !== 0, c || a ? (c = e.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : c.render(), e.flags |= 1, t !== null && a ? (e.child = ea(
      e,
      t.child,
      null,
      s
    ), e.child = ea(
      e,
      null,
      n,
      s
    )) : Xt(t, e, n, s), e.memoizedState = c.state, t = e.child) : t = Ie(
      t,
      e,
      s
    ), t;
  }
  function Yd(t, e, n, a) {
    return kn(), e.flags |= 256, Xt(t, e, n, a), e.child;
  }
  var _r = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function wr(t) {
    return { baseLanes: t, cachePool: Df() };
  }
  function Cr(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= de), t;
  }
  function Xd(t, e, n) {
    var a = e.pendingProps, s = !1, c = (e.flags & 128) !== 0, f;
    if ((f = c) || (f = t !== null && t.memoizedState === null ? !1 : (Ot.current & 2) !== 0), f && (s = !0, e.flags &= -129), f = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (rt) {
        if (s ? vn(e) : bn(), (t = At) ? (t = Fh(
          t,
          Te
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: dn !== null ? { id: Ue, overflow: He } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Tf(t), n.return = e, e.child = n, Gt = e, At = null)) : t = null, t === null) throw mn(e);
        return cc(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var m = a.children;
      return a = a.fallback, s ? (bn(), s = e.mode, m = ls(
        { mode: "hidden", children: m },
        s
      ), a = Jn(
        a,
        s,
        n,
        null
      ), m.return = e, a.return = e, m.sibling = a, e.child = m, a = e.child, a.memoizedState = wr(n), a.childLanes = Cr(
        t,
        f,
        n
      ), e.memoizedState = _r, Ui(null, a)) : (vn(e), Mr(e, m));
    }
    var v = t.memoizedState;
    if (v !== null && (m = v.dehydrated, m !== null)) {
      if (c)
        e.flags & 256 ? (vn(e), e.flags &= -257, e = Or(
          t,
          e,
          n
        )) : e.memoizedState !== null ? (bn(), e.child = t.child, e.flags |= 128, e = null) : (bn(), m = a.fallback, s = e.mode, a = ls(
          { mode: "visible", children: a.children },
          s
        ), m = Jn(
          m,
          s,
          n,
          null
        ), m.flags |= 2, a.return = e, m.return = e, a.sibling = m, e.child = a, ea(
          e,
          t.child,
          null,
          n
        ), a = e.child, a.memoizedState = wr(n), a.childLanes = Cr(
          t,
          f,
          n
        ), e.memoizedState = _r, e = Ui(null, a));
      else if (vn(e), cc(m)) {
        if (f = m.nextSibling && m.nextSibling.dataset, f) var C = f.dgst;
        f = C, a = Error(r(419)), a.stack = "", a.digest = f, Ti({ value: a, source: null, stack: null }), e = Or(
          t,
          e,
          n
        );
      } else if (Nt || xa(t, e, n, !1), f = (n & t.childLanes) !== 0, Nt || f) {
        if (f = Tt, f !== null && (a = Mo(f, n), a !== 0 && a !== v.retryLane))
          throw v.retryLane = a, Kn(t, a), ne(f, t, a), Ar;
        rc(m) || ms(), e = Or(
          t,
          e,
          n
        );
      } else
        rc(m) ? (e.flags |= 192, e.child = t.child, e = null) : (t = v.treeContext, At = Re(
          m.nextSibling
        ), Gt = e, rt = !0, hn = null, Te = !1, t !== null && _f(e, t), e = Mr(
          e,
          a.children
        ), e.flags |= 4096);
      return e;
    }
    return s ? (bn(), m = a.fallback, s = e.mode, v = t.child, C = v.sibling, a = Ve(v, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = v.subtreeFlags & 65011712, C !== null ? m = Ve(
      C,
      m
    ) : (m = Jn(
      m,
      s,
      n,
      null
    ), m.flags |= 2), m.return = e, a.return = e, a.sibling = m, e.child = a, Ui(null, a), a = e.child, m = t.child.memoizedState, m === null ? m = wr(n) : (s = m.cachePool, s !== null ? (v = Dt._currentValue, s = s.parent !== v ? { parent: v, pool: v } : s) : s = Df(), m = {
      baseLanes: m.baseLanes | n,
      cachePool: s
    }), a.memoizedState = m, a.childLanes = Cr(
      t,
      f,
      n
    ), e.memoizedState = _r, Ui(t.child, a)) : (vn(e), n = t.child, t = n.sibling, n = Ve(n, {
      mode: "visible",
      children: a.children
    }), n.return = e, n.sibling = null, t !== null && (f = e.deletions, f === null ? (e.deletions = [t], e.flags |= 16) : f.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Mr(t, e) {
    return e = ls(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function ls(t, e) {
    return t = re(22, t, null, e), t.lanes = 0, t;
  }
  function Or(t, e, n) {
    return ea(e, t.child, null, n), t = Mr(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Vd(t, e, n) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), Vu(t.return, e, n);
  }
  function zr(t, e, n, a, s, c) {
    var f = t.memoizedState;
    f === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: s,
      treeForkCount: c
    } : (f.isBackwards = e, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = n, f.tailMode = s, f.treeForkCount = c);
  }
  function $d(t, e, n) {
    var a = e.pendingProps, s = a.revealOrder, c = a.tail;
    a = a.children;
    var f = Ot.current, m = (f & 2) !== 0;
    if (m ? (f = f & 1 | 2, e.flags |= 128) : f &= 1, G(Ot, f), Xt(t, e, a, n), a = rt ? Ei : 0, !m && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Vd(t, n, e);
        else if (t.tag === 19)
          Vd(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (s) {
      case "forwards":
        for (n = e.child, s = null; n !== null; )
          t = n.alternate, t !== null && Kl(t) === null && (s = n), n = n.sibling;
        n = s, n === null ? (s = e.child, e.child = null) : (s = n.sibling, n.sibling = null), zr(
          e,
          !1,
          s,
          n,
          c,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, s = e.child, e.child = null; s !== null; ) {
          if (t = s.alternate, t !== null && Kl(t) === null) {
            e.child = s;
            break;
          }
          t = s.sibling, s.sibling = n, n = s, s = t;
        }
        zr(
          e,
          !0,
          n,
          null,
          c,
          a
        );
        break;
      case "together":
        zr(
          e,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Ie(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), An |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (xa(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, n = Ve(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = Ve(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Dr(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ql(t)));
  }
  function X0(t, e, n) {
    switch (e.tag) {
      case 3:
        Kt(e, e.stateNode.containerInfo), yn(e, Dt, t.memoizedState.cache), kn();
        break;
      case 27:
      case 5:
        si(e);
        break;
      case 4:
        Kt(e, e.stateNode.containerInfo);
        break;
      case 10:
        yn(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, nr(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (vn(e), e.flags |= 128, null) : (n & e.child.childLanes) !== 0 ? Xd(t, e, n) : (vn(e), t = Ie(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        vn(e);
        break;
      case 19:
        var s = (t.flags & 128) !== 0;
        if (a = (n & e.childLanes) !== 0, a || (xa(
          t,
          e,
          n,
          !1
        ), a = (n & e.childLanes) !== 0), s) {
          if (a)
            return $d(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (s = e.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), G(Ot, Ot.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, Ld(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        yn(e, Dt, t.memoizedState.cache);
    }
    return Ie(t, e, n);
  }
  function Zd(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Nt = !0;
      else {
        if (!Dr(t, n) && (e.flags & 128) === 0)
          return Nt = !1, X0(
            t,
            e,
            n
          );
        Nt = (t.flags & 131072) !== 0;
      }
    else
      Nt = !1, rt && (e.flags & 1048576) !== 0 && Rf(e, Ei, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Pn(e.elementType), e.type = t, typeof t == "function")
            Bu(t) ? (a = aa(t, a), e.tag = 1, e = Gd(
              null,
              e,
              t,
              a,
              n
            )) : (e.tag = 0, e = Rr(
              null,
              e,
              t,
              a,
              n
            ));
          else {
            if (t != null) {
              var s = t.$$typeof;
              if (s === lt) {
                e.tag = 11, e = Ud(
                  null,
                  e,
                  t,
                  a,
                  n
                );
                break t;
              } else if (s === I) {
                e.tag = 14, e = Hd(
                  null,
                  e,
                  t,
                  a,
                  n
                );
                break t;
              }
            }
            throw e = Qe(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return Rr(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return a = e.type, s = aa(
          a,
          e.pendingProps
        ), Gd(
          t,
          e,
          a,
          s,
          n
        );
      case 3:
        t: {
          if (Kt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          a = e.pendingProps;
          var c = e.memoizedState;
          s = c.element, Fu(t, e), Oi(e, a, null, n);
          var f = e.memoizedState;
          if (a = f.cache, yn(e, Dt, a), a !== c.cache && $u(
            e,
            [Dt],
            n,
            !0
          ), Mi(), a = f.element, c.isDehydrated)
            if (c = {
              element: a,
              isDehydrated: !1,
              cache: f.cache
            }, e.updateQueue.baseState = c, e.memoizedState = c, e.flags & 256) {
              e = Yd(
                t,
                e,
                a,
                n
              );
              break t;
            } else if (a !== s) {
              s = ve(
                Error(r(424)),
                e
              ), Ti(s), e = Yd(
                t,
                e,
                a,
                n
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (At = Re(t.firstChild), Gt = e, rt = !0, hn = null, Te = !0, n = Lf(
                e,
                null,
                a,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (kn(), a === s) {
              e = Ie(
                t,
                e,
                n
              );
              break t;
            }
            Xt(t, e, a, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return is(t, e), t === null ? (n = am(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : rt || (n = e.type, t = e.pendingProps, a = Es(
          nt.current
        ).createElement(n), a[Qt] = e, a[It] = t, Vt(a, n, t), Lt(a), e.stateNode = a) : e.memoizedState = am(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return si(e), t === null && rt && (a = e.stateNode = tm(
          e.type,
          e.pendingProps,
          nt.current
        ), Gt = e, Te = !0, s = At, Mn(e.type) ? (oc = s, At = Re(a.firstChild)) : At = s), Xt(
          t,
          e,
          e.pendingProps.children,
          n
        ), is(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && rt && ((s = a = At) && (a = vp(
          a,
          e.type,
          e.pendingProps,
          Te
        ), a !== null ? (e.stateNode = a, Gt = e, At = Re(a.firstChild), Te = !1, s = !0) : s = !1), s || mn(e)), si(e), s = e.type, c = e.pendingProps, f = t !== null ? t.memoizedProps : null, a = c.children, lc(s, c) ? a = null : f !== null && lc(s, f) && (e.flags |= 32), e.memoizedState !== null && (s = ir(
          t,
          e,
          U0,
          null,
          null,
          n
        ), ki._currentValue = s), is(t, e), Xt(t, e, a, n), e.child;
      case 6:
        return t === null && rt && ((t = n = At) && (n = bp(
          n,
          e.pendingProps,
          Te
        ), n !== null ? (e.stateNode = n, Gt = e, At = null, t = !0) : t = !1), t || mn(e)), null;
      case 13:
        return Xd(t, e, n);
      case 4:
        return Kt(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = ea(
          e,
          null,
          a,
          n
        ) : Xt(t, e, a, n), e.child;
      case 11:
        return Ud(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return Xt(
          t,
          e,
          e.pendingProps,
          n
        ), e.child;
      case 8:
        return Xt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return Xt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return a = e.pendingProps, yn(e, e.type, a.value), Xt(t, e, a.children, n), e.child;
      case 9:
        return s = e.type._context, a = e.pendingProps.children, Fn(e), s = Yt(s), a = a(s), e.flags |= 1, Xt(t, e, a, n), e.child;
      case 14:
        return Hd(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return Bd(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return $d(t, e, n);
      case 31:
        return Y0(t, e, n);
      case 22:
        return Ld(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return Fn(e), a = Yt(Dt), t === null ? (s = Ju(), s === null && (s = Tt, c = Zu(), s.pooledCache = c, c.refCount++, c !== null && (s.pooledCacheLanes |= n), s = c), e.memoizedState = { parent: a, cache: s }, Iu(e), yn(e, Dt, s)) : ((t.lanes & n) !== 0 && (Fu(t, e), Oi(e, null, null, n), Mi()), s = t.memoizedState, c = e.memoizedState, s.parent !== a ? (s = { parent: a, cache: a }, e.memoizedState = s, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = s), yn(e, Dt, a)) : (a = c.cache, yn(e, Dt, a), a !== s.cache && $u(
          e,
          [Dt],
          n,
          !0
        ))), Xt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Fe(t) {
    t.flags |= 4;
  }
  function xr(t, e, n, a, s) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (s & 335544128) === s)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (vh()) t.flags |= 8192;
        else
          throw ta = Xl, ku;
    } else t.flags &= -16777217;
  }
  function Kd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !rm(e))
      if (vh()) t.flags |= 8192;
      else
        throw ta = Xl, ku;
  }
  function ss(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? _o() : 536870912, t.lanes |= e, Va |= e);
  }
  function Hi(t, e) {
    if (!rt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = t.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function Rt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, a = 0;
    if (e)
      for (var s = t.child; s !== null; )
        n |= s.lanes | s.childLanes, a |= s.subtreeFlags & 65011712, a |= s.flags & 65011712, s.return = t, s = s.sibling;
    else
      for (s = t.child; s !== null; )
        n |= s.lanes | s.childLanes, a |= s.subtreeFlags, a |= s.flags, s.return = t, s = s.sibling;
    return t.subtreeFlags |= a, t.childLanes = n, e;
  }
  function V0(t, e, n) {
    var a = e.pendingProps;
    switch (Qu(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Rt(e), null;
      case 1:
        return Rt(e), null;
      case 3:
        return n = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Ke(Dt), Mt(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Da(e) ? Fe(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Yu())), Rt(e), null;
      case 26:
        var s = e.type, c = e.memoizedState;
        return t === null ? (Fe(e), c !== null ? (Rt(e), Kd(e, c)) : (Rt(e), xr(
          e,
          s,
          null,
          a,
          n
        ))) : c ? c !== t.memoizedState ? (Fe(e), Rt(e), Kd(e, c)) : (Rt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Fe(e), Rt(e), xr(
          e,
          s,
          t,
          a,
          n
        )), null;
      case 27:
        if (pl(e), n = nt.current, s = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Fe(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Rt(e), null;
          }
          t = X.current, Da(e) ? wf(e) : (t = tm(s, a, n), e.stateNode = t, Fe(e));
        }
        return Rt(e), null;
      case 5:
        if (pl(e), s = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Fe(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Rt(e), null;
          }
          if (c = X.current, Da(e))
            wf(e);
          else {
            var f = Es(
              nt.current
            );
            switch (c) {
              case 1:
                c = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                c = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    c = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    c = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    c = f.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof a.is == "string" ? f.createElement("select", {
                      is: a.is
                    }) : f.createElement("select"), a.multiple ? c.multiple = !0 : a.size && (c.size = a.size);
                    break;
                  default:
                    c = typeof a.is == "string" ? f.createElement(s, { is: a.is }) : f.createElement(s);
                }
            }
            c[Qt] = e, c[It] = a;
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                c.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === e) break t;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e)
                  break t;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            e.stateNode = c;
            t: switch (Vt(c, s, a), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && Fe(e);
          }
        }
        return Rt(e), xr(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && Fe(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = nt.current, Da(e)) {
            if (t = e.stateNode, n = e.memoizedProps, a = null, s = Gt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  a = s.memoizedProps;
              }
            t[Qt] = e, t = !!(t.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || Xh(t.nodeValue, n)), t || mn(e, !0);
          } else
            t = Es(t).createTextNode(
              a
            ), t[Qt] = e, e.stateNode = t;
        }
        return Rt(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Da(e), n !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[Qt] = e;
            } else
              kn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Rt(e), t = !1;
          } else
            n = Yu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (oe(e), e) : (oe(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Rt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (s = Da(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!s) throw Error(r(318));
              if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(r(317));
              s[Qt] = e;
            } else
              kn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Rt(e), s = !1;
          } else
            s = Yu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return e.flags & 256 ? (oe(e), e) : (oe(e), null);
        }
        return oe(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = a !== null, t = t !== null && t.memoizedState !== null, n && (a = e.child, s = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (s = a.alternate.memoizedState.cachePool.pool), c = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (c = a.memoizedState.cachePool.pool), c !== s && (a.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), ss(e, e.updateQueue), Rt(e), null);
      case 4:
        return Mt(), t === null && tc(e.stateNode.containerInfo), Rt(e), null;
      case 10:
        return Ke(e.type), Rt(e), null;
      case 19:
        if (L(Ot), a = e.memoizedState, a === null) return Rt(e), null;
        if (s = (e.flags & 128) !== 0, c = a.rendering, c === null)
          if (s) Hi(a, !1);
          else {
            if (Ct !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (c = Kl(t), c !== null) {
                  for (e.flags |= 128, Hi(a, !1), t = c.updateQueue, e.updateQueue = t, ss(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    Ef(n, t), n = n.sibling;
                  return G(
                    Ot,
                    Ot.current & 1 | 2
                  ), rt && $e(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && ie() > fs && (e.flags |= 128, s = !0, Hi(a, !1), e.lanes = 4194304);
          }
        else {
          if (!s)
            if (t = Kl(c), t !== null) {
              if (e.flags |= 128, s = !0, t = t.updateQueue, e.updateQueue = t, ss(e, t), Hi(a, !0), a.tail === null && a.tailMode === "hidden" && !c.alternate && !rt)
                return Rt(e), null;
            } else
              2 * ie() - a.renderingStartTime > fs && n !== 536870912 && (e.flags |= 128, s = !0, Hi(a, !1), e.lanes = 4194304);
          a.isBackwards ? (c.sibling = e.child, e.child = c) : (t = a.last, t !== null ? t.sibling = c : e.child = c, a.last = c);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = ie(), t.sibling = null, n = Ot.current, G(
          Ot,
          s ? n & 1 | 2 : n & 1
        ), rt && $e(e, a.treeForkCount), t) : (Rt(e), null);
      case 22:
      case 23:
        return oe(e), er(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Rt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Rt(e), n = e.updateQueue, n !== null && ss(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== n && (e.flags |= 2048), t !== null && L(Wn), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), Ke(Dt), Rt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function $0(t, e) {
    switch (Qu(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Ke(Dt), Mt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return pl(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (oe(e), e.alternate === null)
            throw Error(r(340));
          kn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (oe(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          kn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return L(Ot), null;
      case 4:
        return Mt(), null;
      case 10:
        return Ke(e.type), null;
      case 22:
      case 23:
        return oe(e), er(), t !== null && L(Wn), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Ke(Dt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jd(t, e) {
    switch (Qu(e), e.tag) {
      case 3:
        Ke(Dt), Mt();
        break;
      case 26:
      case 27:
      case 5:
        pl(e);
        break;
      case 4:
        Mt();
        break;
      case 31:
        e.memoizedState !== null && oe(e);
        break;
      case 13:
        oe(e);
        break;
      case 19:
        L(Ot);
        break;
      case 10:
        Ke(e.type);
        break;
      case 22:
      case 23:
        oe(e), er(), t !== null && L(Wn);
        break;
      case 24:
        Ke(Dt);
    }
  }
  function Bi(t, e) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var s = a.next;
        n = s;
        do {
          if ((n.tag & t) === t) {
            a = void 0;
            var c = n.create, f = n.inst;
            a = c(), f.destroy = a;
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (m) {
      gt(e, e.return, m);
    }
  }
  function En(t, e, n) {
    try {
      var a = e.updateQueue, s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var c = s.next;
        a = c;
        do {
          if ((a.tag & t) === t) {
            var f = a.inst, m = f.destroy;
            if (m !== void 0) {
              f.destroy = void 0, s = e;
              var v = n, C = m;
              try {
                C();
              } catch (x) {
                gt(
                  s,
                  v,
                  x
                );
              }
            }
          }
          a = a.next;
        } while (a !== c);
      }
    } catch (x) {
      gt(e, e.return, x);
    }
  }
  function kd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        qf(e, n);
      } catch (a) {
        gt(t, t.return, a);
      }
    }
  }
  function Id(t, e, n) {
    n.props = aa(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (a) {
      gt(t, e, a);
    }
  }
  function Li(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(a) : n.current = a;
      }
    } catch (s) {
      gt(t, e, s);
    }
  }
  function Be(t, e) {
    var n = t.ref, a = t.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (s) {
          gt(t, e, s);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (s) {
          gt(t, e, s);
        }
      else n.current = null;
  }
  function Fd(t) {
    var e = t.type, n = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break t;
        case "img":
          n.src ? a.src = n.src : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (s) {
      gt(t, t.return, s);
    }
  }
  function Nr(t, e, n) {
    try {
      var a = t.stateNode;
      hp(a, t.type, n, e), a[It] = e;
    } catch (s) {
      gt(t, t.return, s);
    }
  }
  function Wd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Mn(t.type) || t.tag === 4;
  }
  function Ur(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Wd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Mn(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Hr(t, e, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(t, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(t), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Ye));
    else if (a !== 4 && (a === 27 && Mn(t.type) && (n = t.stateNode, e = null), t = t.child, t !== null))
      for (Hr(t, e, n), t = t.sibling; t !== null; )
        Hr(t, e, n), t = t.sibling;
  }
  function us(t, e, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
    else if (a !== 4 && (a === 27 && Mn(t.type) && (n = t.stateNode), t = t.child, t !== null))
      for (us(t, e, n), t = t.sibling; t !== null; )
        us(t, e, n), t = t.sibling;
  }
  function Pd(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var a = t.type, s = e.attributes; s.length; )
        e.removeAttributeNode(s[0]);
      Vt(e, a, n), e[Qt] = t, e[It] = n;
    } catch (c) {
      gt(t, t.return, c);
    }
  }
  var We = !1, Ut = !1, Br = !1, th = typeof WeakSet == "function" ? WeakSet : Set, jt = null;
  function Z0(t, e) {
    if (t = t.containerInfo, ac = Ms, t = df(t), Ou(t)) {
      if ("selectionStart" in t)
        var n = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          n = (n = t.ownerDocument) && n.defaultView || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var s = a.anchorOffset, c = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, c.nodeType;
            } catch {
              n = null;
              break t;
            }
            var f = 0, m = -1, v = -1, C = 0, x = 0, B = t, O = null;
            e: for (; ; ) {
              for (var D; B !== n || s !== 0 && B.nodeType !== 3 || (m = f + s), B !== c || a !== 0 && B.nodeType !== 3 || (v = f + a), B.nodeType === 3 && (f += B.nodeValue.length), (D = B.firstChild) !== null; )
                O = B, B = D;
              for (; ; ) {
                if (B === t) break e;
                if (O === n && ++C === s && (m = f), O === c && ++x === a && (v = f), (D = B.nextSibling) !== null) break;
                B = O, O = B.parentNode;
              }
              B = D;
            }
            n = m === -1 || v === -1 ? null : { start: m, end: v };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ic = { focusedElem: t, selectionRange: n }, Ms = !1, jt = e; jt !== null; )
      if (e = jt, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, jt = t;
      else
        for (; jt !== null; ) {
          switch (e = jt, c = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (n = 0; n < t.length; n++)
                  s = t[n], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && c !== null) {
                t = void 0, n = e, s = c.memoizedProps, c = c.memoizedState, a = n.stateNode;
                try {
                  var Y = aa(
                    n.type,
                    s
                  );
                  t = a.getSnapshotBeforeUpdate(
                    Y,
                    c
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (J) {
                  gt(
                    n,
                    n.return,
                    J
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, n = t.nodeType, n === 9)
                  uc(t);
                else if (n === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      uc(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, jt = t;
            break;
          }
          jt = e.return;
        }
  }
  function eh(t, e, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        tn(t, n), a & 4 && Bi(5, n);
        break;
      case 1:
        if (tn(t, n), a & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (f) {
              gt(n, n.return, f);
            }
          else {
            var s = aa(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                s,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              gt(
                n,
                n.return,
                f
              );
            }
          }
        a & 64 && kd(n), a & 512 && Li(n, n.return);
        break;
      case 3:
        if (tn(t, n), a & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            qf(t, e);
          } catch (f) {
            gt(n, n.return, f);
          }
        }
        break;
      case 27:
        e === null && a & 4 && Pd(n);
      case 26:
      case 5:
        tn(t, n), e === null && a & 4 && Fd(n), a & 512 && Li(n, n.return);
        break;
      case 12:
        tn(t, n);
        break;
      case 31:
        tn(t, n), a & 4 && ih(t, n);
        break;
      case 13:
        tn(t, n), a & 4 && lh(t, n), a & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = ep.bind(
          null,
          n
        ), Ep(t, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || We, !a) {
          e = e !== null && e.memoizedState !== null || Ut, s = We;
          var c = Ut;
          We = a, (Ut = e) && !c ? en(
            t,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : tn(t, n), We = s, Ut = c;
        }
        break;
      case 30:
        break;
      default:
        tn(t, n);
    }
  }
  function nh(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, nh(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && du(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var _t = null, Wt = !1;
  function Pe(t, e, n) {
    for (n = n.child; n !== null; )
      ah(t, e, n), n = n.sibling;
  }
  function ah(t, e, n) {
    if (le && typeof le.onCommitFiberUnmount == "function")
      try {
        le.onCommitFiberUnmount(ui, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Ut || Be(n, e), Pe(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ut || Be(n, e);
        var a = _t, s = Wt;
        Mn(n.type) && (_t = n.stateNode, Wt = !1), Pe(
          t,
          e,
          n
        ), Zi(n.stateNode), _t = a, Wt = s;
        break;
      case 5:
        Ut || Be(n, e);
      case 6:
        if (a = _t, s = Wt, _t = null, Pe(
          t,
          e,
          n
        ), _t = a, Wt = s, _t !== null)
          if (Wt)
            try {
              (_t.nodeType === 9 ? _t.body : _t.nodeName === "HTML" ? _t.ownerDocument.body : _t).removeChild(n.stateNode);
            } catch (c) {
              gt(
                n,
                e,
                c
              );
            }
          else
            try {
              _t.removeChild(n.stateNode);
            } catch (c) {
              gt(
                n,
                e,
                c
              );
            }
        break;
      case 18:
        _t !== null && (Wt ? (t = _t, kh(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), Wa(t)) : kh(_t, n.stateNode));
        break;
      case 4:
        a = _t, s = Wt, _t = n.stateNode.containerInfo, Wt = !0, Pe(
          t,
          e,
          n
        ), _t = a, Wt = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        En(2, n, e), Ut || En(4, n, e), Pe(
          t,
          e,
          n
        );
        break;
      case 1:
        Ut || (Be(n, e), a = n.stateNode, typeof a.componentWillUnmount == "function" && Id(
          n,
          e,
          a
        )), Pe(
          t,
          e,
          n
        );
        break;
      case 21:
        Pe(
          t,
          e,
          n
        );
        break;
      case 22:
        Ut = (a = Ut) || n.memoizedState !== null, Pe(
          t,
          e,
          n
        ), Ut = a;
        break;
      default:
        Pe(
          t,
          e,
          n
        );
    }
  }
  function ih(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Wa(t);
      } catch (n) {
        gt(e, e.return, n);
      }
    }
  }
  function lh(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Wa(t);
      } catch (n) {
        gt(e, e.return, n);
      }
  }
  function K0(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new th()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new th()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function rs(t, e) {
    var n = K0(t);
    e.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var s = np.bind(null, t, a);
        a.then(s, s);
      }
    });
  }
  function Pt(t, e) {
    var n = e.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var s = n[a], c = t, f = e, m = f;
        t: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (Mn(m.type)) {
                _t = m.stateNode, Wt = !1;
                break t;
              }
              break;
            case 5:
              _t = m.stateNode, Wt = !1;
              break t;
            case 3:
            case 4:
              _t = m.stateNode.containerInfo, Wt = !0;
              break t;
          }
          m = m.return;
        }
        if (_t === null) throw Error(r(160));
        ah(c, f, s), _t = null, Wt = !1, c = s.alternate, c !== null && (c.return = null), s.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        sh(e, t), e = e.sibling;
  }
  var Oe = null;
  function sh(t, e) {
    var n = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Pt(e, t), te(t), a & 4 && (En(3, t, t.return), Bi(3, t), En(5, t, t.return));
        break;
      case 1:
        Pt(e, t), te(t), a & 512 && (Ut || n === null || Be(n, n.return)), a & 64 && We && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? a : n.concat(a))));
        break;
      case 26:
        var s = Oe;
        if (Pt(e, t), te(t), a & 512 && (Ut || n === null || Be(n, n.return)), a & 4) {
          var c = n !== null ? n.memoizedState : null;
          if (a = t.memoizedState, n === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, n = t.memoizedProps, s = s.ownerDocument || s;
                  e: switch (a) {
                    case "title":
                      c = s.getElementsByTagName("title")[0], (!c || c[oi] || c[Qt] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = s.createElement(a), s.head.insertBefore(
                        c,
                        s.querySelector("head > title")
                      )), Vt(c, a, n), c[Qt] = t, Lt(c), a = c;
                      break t;
                    case "link":
                      var f = sm(
                        "link",
                        "href",
                        s
                      ).get(a + (n.href || ""));
                      if (f) {
                        for (var m = 0; m < f.length; m++)
                          if (c = f[m], c.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && c.getAttribute("rel") === (n.rel == null ? null : n.rel) && c.getAttribute("title") === (n.title == null ? null : n.title) && c.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            f.splice(m, 1);
                            break e;
                          }
                      }
                      c = s.createElement(a), Vt(c, a, n), s.head.appendChild(c);
                      break;
                    case "meta":
                      if (f = sm(
                        "meta",
                        "content",
                        s
                      ).get(a + (n.content || ""))) {
                        for (m = 0; m < f.length; m++)
                          if (c = f[m], c.getAttribute("content") === (n.content == null ? null : "" + n.content) && c.getAttribute("name") === (n.name == null ? null : n.name) && c.getAttribute("property") === (n.property == null ? null : n.property) && c.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && c.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            f.splice(m, 1);
                            break e;
                          }
                      }
                      c = s.createElement(a), Vt(c, a, n), s.head.appendChild(c);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  c[Qt] = t, Lt(c), a = c;
                }
                t.stateNode = a;
              } else
                um(
                  s,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = lm(
                s,
                a,
                t.memoizedProps
              );
          else
            c !== a ? (c === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : c.count--, a === null ? um(
              s,
              t.type,
              t.stateNode
            ) : lm(
              s,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && Nr(
              t,
              t.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        Pt(e, t), te(t), a & 512 && (Ut || n === null || Be(n, n.return)), n !== null && a & 4 && Nr(
          t,
          t.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (Pt(e, t), te(t), a & 512 && (Ut || n === null || Be(n, n.return)), t.flags & 32) {
          s = t.stateNode;
          try {
            Ea(s, "");
          } catch (Y) {
            gt(t, t.return, Y);
          }
        }
        a & 4 && t.stateNode != null && (s = t.memoizedProps, Nr(
          t,
          s,
          n !== null ? n.memoizedProps : s
        )), a & 1024 && (Br = !0);
        break;
      case 6:
        if (Pt(e, t), te(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          a = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = a;
          } catch (Y) {
            gt(t, t.return, Y);
          }
        }
        break;
      case 3:
        if (Rs = null, s = Oe, Oe = Ts(e.containerInfo), Pt(e, t), Oe = s, te(t), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Wa(e.containerInfo);
          } catch (Y) {
            gt(t, t.return, Y);
          }
        Br && (Br = !1, uh(t));
        break;
      case 4:
        a = Oe, Oe = Ts(
          t.stateNode.containerInfo
        ), Pt(e, t), te(t), Oe = a;
        break;
      case 12:
        Pt(e, t), te(t);
        break;
      case 31:
        Pt(e, t), te(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, rs(t, a)));
        break;
      case 13:
        Pt(e, t), te(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (os = ie()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, rs(t, a)));
        break;
      case 22:
        s = t.memoizedState !== null;
        var v = n !== null && n.memoizedState !== null, C = We, x = Ut;
        if (We = C || s, Ut = x || v, Pt(e, t), Ut = x, We = C, te(t), a & 8192)
          t: for (e = t.stateNode, e._visibility = s ? e._visibility & -2 : e._visibility | 1, s && (n === null || v || We || Ut || ia(t)), n = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                v = n = e;
                try {
                  if (c = v.stateNode, s)
                    f = c.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                  else {
                    m = v.stateNode;
                    var B = v.memoizedProps.style, O = B != null && B.hasOwnProperty("display") ? B.display : null;
                    m.style.display = O == null || typeof O == "boolean" ? "" : ("" + O).trim();
                  }
                } catch (Y) {
                  gt(v, v.return, Y);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                v = e;
                try {
                  v.stateNode.nodeValue = s ? "" : v.memoizedProps;
                } catch (Y) {
                  gt(v, v.return, Y);
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                v = e;
                try {
                  var D = v.stateNode;
                  s ? Ih(D, !0) : Ih(v.stateNode, !1);
                } catch (Y) {
                  gt(v, v.return, Y);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              n === e && (n = null), e = e.return;
            }
            n === e && (n = null), e.sibling.return = e.return, e = e.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, rs(t, n))));
        break;
      case 19:
        Pt(e, t), te(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, rs(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Pt(e, t), te(t);
    }
  }
  function te(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, a = t.return; a !== null; ) {
          if (Wd(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var s = n.stateNode, c = Ur(t);
            us(t, c, s);
            break;
          case 5:
            var f = n.stateNode;
            n.flags & 32 && (Ea(f, ""), n.flags &= -33);
            var m = Ur(t);
            us(t, m, f);
            break;
          case 3:
          case 4:
            var v = n.stateNode.containerInfo, C = Ur(t);
            Hr(
              t,
              C,
              v
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (x) {
        gt(t, t.return, x);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function uh(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        uh(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function tn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        eh(t, e.alternate, e), e = e.sibling;
  }
  function ia(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          En(4, e, e.return), ia(e);
          break;
        case 1:
          Be(e, e.return);
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && Id(
            e,
            e.return,
            n
          ), ia(e);
          break;
        case 27:
          Zi(e.stateNode);
        case 26:
        case 5:
          Be(e, e.return), ia(e);
          break;
        case 22:
          e.memoizedState === null && ia(e);
          break;
        case 30:
          ia(e);
          break;
        default:
          ia(e);
      }
      t = t.sibling;
    }
  }
  function en(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate, s = t, c = e, f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          en(
            s,
            c,
            n
          ), Bi(4, c);
          break;
        case 1:
          if (en(
            s,
            c,
            n
          ), a = c, s = a.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (C) {
              gt(a, a.return, C);
            }
          if (a = c, s = a.updateQueue, s !== null) {
            var m = a.stateNode;
            try {
              var v = s.shared.hiddenCallbacks;
              if (v !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < v.length; s++)
                  jf(v[s], m);
            } catch (C) {
              gt(a, a.return, C);
            }
          }
          n && f & 64 && kd(c), Li(c, c.return);
          break;
        case 27:
          Pd(c);
        case 26:
        case 5:
          en(
            s,
            c,
            n
          ), n && a === null && f & 4 && Fd(c), Li(c, c.return);
          break;
        case 12:
          en(
            s,
            c,
            n
          );
          break;
        case 31:
          en(
            s,
            c,
            n
          ), n && f & 4 && ih(s, c);
          break;
        case 13:
          en(
            s,
            c,
            n
          ), n && f & 4 && lh(s, c);
          break;
        case 22:
          c.memoizedState === null && en(
            s,
            c,
            n
          ), Li(c, c.return);
          break;
        case 30:
          break;
        default:
          en(
            s,
            c,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Lr(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Ai(n));
  }
  function jr(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ai(t));
  }
  function ze(t, e, n, a) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        rh(
          t,
          e,
          n,
          a
        ), e = e.sibling;
  }
  function rh(t, e, n, a) {
    var s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ze(
          t,
          e,
          n,
          a
        ), s & 2048 && Bi(9, e);
        break;
      case 1:
        ze(
          t,
          e,
          n,
          a
        );
        break;
      case 3:
        ze(
          t,
          e,
          n,
          a
        ), s & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ai(t)));
        break;
      case 12:
        if (s & 2048) {
          ze(
            t,
            e,
            n,
            a
          ), t = e.stateNode;
          try {
            var c = e.memoizedProps, f = c.id, m = c.onPostCommit;
            typeof m == "function" && m(
              f,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (v) {
            gt(e, e.return, v);
          }
        } else
          ze(
            t,
            e,
            n,
            a
          );
        break;
      case 31:
        ze(
          t,
          e,
          n,
          a
        );
        break;
      case 13:
        ze(
          t,
          e,
          n,
          a
        );
        break;
      case 23:
        break;
      case 22:
        c = e.stateNode, f = e.alternate, e.memoizedState !== null ? c._visibility & 2 ? ze(
          t,
          e,
          n,
          a
        ) : ji(t, e) : c._visibility & 2 ? ze(
          t,
          e,
          n,
          a
        ) : (c._visibility |= 2, Ga(
          t,
          e,
          n,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Lr(f, e);
        break;
      case 24:
        ze(
          t,
          e,
          n,
          a
        ), s & 2048 && jr(e.alternate, e);
        break;
      default:
        ze(
          t,
          e,
          n,
          a
        );
    }
  }
  function Ga(t, e, n, a, s) {
    for (s = s && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var c = t, f = e, m = n, v = a, C = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Ga(
            c,
            f,
            m,
            v,
            s
          ), Bi(8, f);
          break;
        case 23:
          break;
        case 22:
          var x = f.stateNode;
          f.memoizedState !== null ? x._visibility & 2 ? Ga(
            c,
            f,
            m,
            v,
            s
          ) : ji(
            c,
            f
          ) : (x._visibility |= 2, Ga(
            c,
            f,
            m,
            v,
            s
          )), s && C & 2048 && Lr(
            f.alternate,
            f
          );
          break;
        case 24:
          Ga(
            c,
            f,
            m,
            v,
            s
          ), s && C & 2048 && jr(f.alternate, f);
          break;
        default:
          Ga(
            c,
            f,
            m,
            v,
            s
          );
      }
      e = e.sibling;
    }
  }
  function ji(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, a = e, s = a.flags;
        switch (a.tag) {
          case 22:
            ji(n, a), s & 2048 && Lr(
              a.alternate,
              a
            );
            break;
          case 24:
            ji(n, a), s & 2048 && jr(a.alternate, a);
            break;
          default:
            ji(n, a);
        }
        e = e.sibling;
      }
  }
  var qi = 8192;
  function Ya(t, e, n) {
    if (t.subtreeFlags & qi)
      for (t = t.child; t !== null; )
        ch(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function ch(t, e, n) {
    switch (t.tag) {
      case 26:
        Ya(
          t,
          e,
          n
        ), t.flags & qi && t.memoizedState !== null && Np(
          n,
          Oe,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ya(
          t,
          e,
          n
        );
        break;
      case 3:
      case 4:
        var a = Oe;
        Oe = Ts(t.stateNode.containerInfo), Ya(
          t,
          e,
          n
        ), Oe = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = qi, qi = 16777216, Ya(
          t,
          e,
          n
        ), qi = a) : Ya(
          t,
          e,
          n
        ));
        break;
      default:
        Ya(
          t,
          e,
          n
        );
    }
  }
  function oh(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Qi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          jt = a, dh(
            a,
            t
          );
        }
      oh(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        fh(t), t = t.sibling;
  }
  function fh(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Qi(t), t.flags & 2048 && En(9, t, t.return);
        break;
      case 3:
        Qi(t);
        break;
      case 12:
        Qi(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, cs(t)) : Qi(t);
        break;
      default:
        Qi(t);
    }
  }
  function cs(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          jt = a, dh(
            a,
            t
          );
        }
      oh(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          En(8, e, e.return), cs(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, cs(e));
          break;
        default:
          cs(e);
      }
      t = t.sibling;
    }
  }
  function dh(t, e) {
    for (; jt !== null; ) {
      var n = jt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          En(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ai(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, jt = a;
      else
        t: for (n = t; jt !== null; ) {
          a = jt;
          var s = a.sibling, c = a.return;
          if (nh(a), a === n) {
            jt = null;
            break t;
          }
          if (s !== null) {
            s.return = c, jt = s;
            break t;
          }
          jt = c;
        }
    }
  }
  var J0 = {
    getCacheForType: function(t) {
      var e = Yt(Dt), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return Yt(Dt).controller.signal;
    }
  }, k0 = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Tt = null, at = null, st = 0, yt = 0, fe = null, Tn = !1, Xa = !1, qr = !1, nn = 0, Ct = 0, An = 0, la = 0, Qr = 0, de = 0, Va = 0, Gi = null, ee = null, Gr = !1, os = 0, hh = 0, fs = 1 / 0, ds = null, Rn = null, Ht = 0, _n = null, $a = null, an = 0, Yr = 0, Xr = null, mh = null, Yi = 0, Vr = null;
  function he() {
    return (ht & 2) !== 0 && st !== 0 ? st & -st : U.T !== null ? Ir() : Oo();
  }
  function yh() {
    if (de === 0)
      if ((st & 536870912) === 0 || rt) {
        var t = bl;
        bl <<= 1, (bl & 3932160) === 0 && (bl = 262144), de = t;
      } else de = 536870912;
    return t = ce.current, t !== null && (t.flags |= 32), de;
  }
  function ne(t, e, n) {
    (t === Tt && (yt === 2 || yt === 9) || t.cancelPendingCommit !== null) && (Za(t, 0), wn(
      t,
      st,
      de,
      !1
    )), ci(t, n), ((ht & 2) === 0 || t !== Tt) && (t === Tt && ((ht & 2) === 0 && (la |= n), Ct === 4 && wn(
      t,
      st,
      de,
      !1
    )), Le(t));
  }
  function gh(t, e, n) {
    if ((ht & 6) !== 0) throw Error(r(327));
    var a = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || ri(t, e), s = a ? W0(t, e) : Zr(t, e, !0), c = a;
    do {
      if (s === 0) {
        Xa && !a && wn(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, c && !I0(n)) {
          s = Zr(t, e, !1), c = !1;
          continue;
        }
        if (s === 2) {
          if (c = e, t.errorRecoveryDisabledLanes & c)
            var f = 0;
          else
            f = t.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            e = f;
            t: {
              var m = t;
              s = Gi;
              var v = m.current.memoizedState.isDehydrated;
              if (v && (Za(m, f).flags |= 256), f = Zr(
                m,
                f,
                !1
              ), f !== 2) {
                if (qr && !v) {
                  m.errorRecoveryDisabledLanes |= c, la |= c, s = 4;
                  break t;
                }
                c = ee, ee = s, c !== null && (ee === null ? ee = c : ee.push.apply(
                  ee,
                  c
                ));
              }
              s = f;
            }
            if (c = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Za(t, 0), wn(t, e, 0, !0);
          break;
        }
        t: {
          switch (a = t, c = s, c) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              wn(
                a,
                e,
                de,
                !Tn
              );
              break t;
            case 2:
              ee = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (s = os + 300 - ie(), 10 < s)) {
            if (wn(
              a,
              e,
              de,
              !Tn
            ), Tl(a, 0, !0) !== 0) break t;
            an = e, a.timeoutHandle = Kh(
              ph.bind(
                null,
                a,
                n,
                ee,
                ds,
                Gr,
                e,
                de,
                la,
                Va,
                Tn,
                c,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break t;
          }
          ph(
            a,
            n,
            ee,
            ds,
            Gr,
            e,
            de,
            la,
            Va,
            Tn,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Le(t);
  }
  function ph(t, e, n, a, s, c, f, m, v, C, x, B, O, D) {
    if (t.timeoutHandle = -1, B = e.subtreeFlags, B & 8192 || (B & 16785408) === 16785408) {
      B = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ye
      }, ch(
        e,
        c,
        B
      );
      var Y = (c & 62914560) === c ? os - ie() : (c & 4194048) === c ? hh - ie() : 0;
      if (Y = Up(
        B,
        Y
      ), Y !== null) {
        an = c, t.cancelPendingCommit = Y(
          _h.bind(
            null,
            t,
            e,
            c,
            n,
            a,
            s,
            f,
            m,
            v,
            x,
            B,
            null,
            O,
            D
          )
        ), wn(t, c, f, !C);
        return;
      }
    }
    _h(
      t,
      e,
      c,
      n,
      a,
      s,
      f,
      m,
      v
    );
  }
  function I0(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var a = 0; a < n.length; a++) {
          var s = n[a], c = s.getSnapshot;
          s = s.value;
          try {
            if (!ue(c(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function wn(t, e, n, a) {
    e &= ~Qr, e &= ~la, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var s = e; 0 < s; ) {
      var c = 31 - se(s), f = 1 << c;
      a[c] = -1, s &= ~f;
    }
    n !== 0 && wo(t, n, e);
  }
  function hs() {
    return (ht & 6) === 0 ? (Xi(0), !1) : !0;
  }
  function $r() {
    if (at !== null) {
      if (yt === 0)
        var t = at.return;
      else
        t = at, Ze = In = null, ur(t), Ba = null, _i = 0, t = at;
      for (; t !== null; )
        Jd(t.alternate, t), t = t.return;
      at = null;
    }
  }
  function Za(t, e) {
    var n = t.timeoutHandle;
    n !== -1 && (t.timeoutHandle = -1, gp(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), an = 0, $r(), Tt = t, at = n = Ve(t.current, null), st = e, yt = 0, fe = null, Tn = !1, Xa = ri(t, e), qr = !1, Va = de = Qr = la = An = Ct = 0, ee = Gi = null, Gr = !1, (e & 8) !== 0 && (e |= e & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var s = 31 - se(a), c = 1 << s;
        e |= t[s], a &= ~c;
      }
    return nn = e, Ul(), n;
  }
  function Sh(t, e) {
    P = null, U.H = Ni, e === Ha || e === Yl ? (e = Uf(), yt = 3) : e === ku ? (e = Uf(), yt = 4) : yt = e === Ar ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, fe = e, at === null && (Ct = 1, ns(
      t,
      ve(e, t.current)
    ));
  }
  function vh() {
    var t = ce.current;
    return t === null ? !0 : (st & 4194048) === st ? Ae === null : (st & 62914560) === st || (st & 536870912) !== 0 ? t === Ae : !1;
  }
  function bh() {
    var t = U.H;
    return U.H = Ni, t === null ? Ni : t;
  }
  function Eh() {
    var t = U.A;
    return U.A = J0, t;
  }
  function ms() {
    Ct = 4, Tn || (st & 4194048) !== st && ce.current !== null || (Xa = !0), (An & 134217727) === 0 && (la & 134217727) === 0 || Tt === null || wn(
      Tt,
      st,
      de,
      !1
    );
  }
  function Zr(t, e, n) {
    var a = ht;
    ht |= 2;
    var s = bh(), c = Eh();
    (Tt !== t || st !== e) && (ds = null, Za(t, e)), e = !1;
    var f = Ct;
    t: do
      try {
        if (yt !== 0 && at !== null) {
          var m = at, v = fe;
          switch (yt) {
            case 8:
              $r(), f = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ce.current === null && (e = !0);
              var C = yt;
              if (yt = 0, fe = null, Ka(t, m, v, C), n && Xa) {
                f = 0;
                break t;
              }
              break;
            default:
              C = yt, yt = 0, fe = null, Ka(t, m, v, C);
          }
        }
        F0(), f = Ct;
        break;
      } catch (x) {
        Sh(t, x);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Ze = In = null, ht = a, U.H = s, U.A = c, at === null && (Tt = null, st = 0, Ul()), f;
  }
  function F0() {
    for (; at !== null; ) Th(at);
  }
  function W0(t, e) {
    var n = ht;
    ht |= 2;
    var a = bh(), s = Eh();
    Tt !== t || st !== e ? (ds = null, fs = ie() + 500, Za(t, e)) : Xa = ri(
      t,
      e
    );
    t: do
      try {
        if (yt !== 0 && at !== null) {
          e = at;
          var c = fe;
          e: switch (yt) {
            case 1:
              yt = 0, fe = null, Ka(t, e, c, 1);
              break;
            case 2:
            case 9:
              if (xf(c)) {
                yt = 0, fe = null, Ah(e);
                break;
              }
              e = function() {
                yt !== 2 && yt !== 9 || Tt !== t || (yt = 7), Le(t);
              }, c.then(e, e);
              break t;
            case 3:
              yt = 7;
              break t;
            case 4:
              yt = 5;
              break t;
            case 7:
              xf(c) ? (yt = 0, fe = null, Ah(e)) : (yt = 0, fe = null, Ka(t, e, c, 7));
              break;
            case 5:
              var f = null;
              switch (at.tag) {
                case 26:
                  f = at.memoizedState;
                case 5:
                case 27:
                  var m = at;
                  if (f ? rm(f) : m.stateNode.complete) {
                    yt = 0, fe = null;
                    var v = m.sibling;
                    if (v !== null) at = v;
                    else {
                      var C = m.return;
                      C !== null ? (at = C, ys(C)) : at = null;
                    }
                    break e;
                  }
              }
              yt = 0, fe = null, Ka(t, e, c, 5);
              break;
            case 6:
              yt = 0, fe = null, Ka(t, e, c, 6);
              break;
            case 8:
              $r(), Ct = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        P0();
        break;
      } catch (x) {
        Sh(t, x);
      }
    while (!0);
    return Ze = In = null, U.H = a, U.A = s, ht = n, at !== null ? 0 : (Tt = null, st = 0, Ul(), Ct);
  }
  function P0() {
    for (; at !== null && !Tg(); )
      Th(at);
  }
  function Th(t) {
    var e = Zd(t.alternate, t, nn);
    t.memoizedProps = t.pendingProps, e === null ? ys(t) : at = e;
  }
  function Ah(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Qd(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          st
        );
        break;
      case 11:
        e = Qd(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          st
        );
        break;
      case 5:
        ur(e);
      default:
        Jd(n, e), e = at = Ef(e, nn), e = Zd(n, e, nn);
    }
    t.memoizedProps = t.pendingProps, e === null ? ys(t) : at = e;
  }
  function Ka(t, e, n, a) {
    Ze = In = null, ur(e), Ba = null, _i = 0;
    var s = e.return;
    try {
      if (G0(
        t,
        s,
        e,
        n,
        st
      )) {
        Ct = 1, ns(
          t,
          ve(n, t.current)
        ), at = null;
        return;
      }
    } catch (c) {
      if (s !== null) throw at = s, c;
      Ct = 1, ns(
        t,
        ve(n, t.current)
      ), at = null;
      return;
    }
    e.flags & 32768 ? (rt || a === 1 ? t = !0 : Xa || (st & 536870912) !== 0 ? t = !1 : (Tn = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ce.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Rh(e, t)) : ys(e);
  }
  function ys(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Rh(
          e,
          Tn
        );
        return;
      }
      t = e.return;
      var n = V0(
        e.alternate,
        e,
        nn
      );
      if (n !== null) {
        at = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        at = e;
        return;
      }
      at = e = t;
    } while (e !== null);
    Ct === 0 && (Ct = 5);
  }
  function Rh(t, e) {
    do {
      var n = $0(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, at = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        at = t;
        return;
      }
      at = t = n;
    } while (t !== null);
    Ct = 6, at = null;
  }
  function _h(t, e, n, a, s, c, f, m, v) {
    t.cancelPendingCommit = null;
    do
      gs();
    while (Ht !== 0);
    if ((ht & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (c = e.lanes | e.childLanes, c |= Uu, xg(
        t,
        n,
        c,
        f,
        m,
        v
      ), t === Tt && (at = Tt = null, st = 0), $a = e, _n = t, an = n, Yr = c, Xr = s, mh = a, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, ap(Sl, function() {
        return zh(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
        a = U.T, U.T = null, s = Q.p, Q.p = 2, f = ht, ht |= 4;
        try {
          Z0(t, e, n);
        } finally {
          ht = f, Q.p = s, U.T = a;
        }
      }
      Ht = 1, wh(), Ch(), Mh();
    }
  }
  function wh() {
    if (Ht === 1) {
      Ht = 0;
      var t = _n, e = $a, n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        n = U.T, U.T = null;
        var a = Q.p;
        Q.p = 2;
        var s = ht;
        ht |= 4;
        try {
          sh(e, t);
          var c = ic, f = df(t.containerInfo), m = c.focusedElem, v = c.selectionRange;
          if (f !== m && m && m.ownerDocument && ff(
            m.ownerDocument.documentElement,
            m
          )) {
            if (v !== null && Ou(m)) {
              var C = v.start, x = v.end;
              if (x === void 0 && (x = C), "selectionStart" in m)
                m.selectionStart = C, m.selectionEnd = Math.min(
                  x,
                  m.value.length
                );
              else {
                var B = m.ownerDocument || document, O = B && B.defaultView || window;
                if (O.getSelection) {
                  var D = O.getSelection(), Y = m.textContent.length, J = Math.min(v.start, Y), bt = v.end === void 0 ? J : Math.min(v.end, Y);
                  !D.extend && J > bt && (f = bt, bt = J, J = f);
                  var R = of(
                    m,
                    J
                  ), E = of(
                    m,
                    bt
                  );
                  if (R && E && (D.rangeCount !== 1 || D.anchorNode !== R.node || D.anchorOffset !== R.offset || D.focusNode !== E.node || D.focusOffset !== E.offset)) {
                    var w = B.createRange();
                    w.setStart(R.node, R.offset), D.removeAllRanges(), J > bt ? (D.addRange(w), D.extend(E.node, E.offset)) : (w.setEnd(E.node, E.offset), D.addRange(w));
                  }
                }
              }
            }
            for (B = [], D = m; D = D.parentNode; )
              D.nodeType === 1 && B.push({
                element: D,
                left: D.scrollLeft,
                top: D.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < B.length; m++) {
              var H = B[m];
              H.element.scrollLeft = H.left, H.element.scrollTop = H.top;
            }
          }
          Ms = !!ac, ic = ac = null;
        } finally {
          ht = s, Q.p = a, U.T = n;
        }
      }
      t.current = e, Ht = 2;
    }
  }
  function Ch() {
    if (Ht === 2) {
      Ht = 0;
      var t = _n, e = $a, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = U.T, U.T = null;
        var a = Q.p;
        Q.p = 2;
        var s = ht;
        ht |= 4;
        try {
          eh(t, e.alternate, e);
        } finally {
          ht = s, Q.p = a, U.T = n;
        }
      }
      Ht = 3;
    }
  }
  function Mh() {
    if (Ht === 4 || Ht === 3) {
      Ht = 0, Ag();
      var t = _n, e = $a, n = an, a = mh;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Ht = 5 : (Ht = 0, $a = _n = null, Oh(t, t.pendingLanes));
      var s = t.pendingLanes;
      if (s === 0 && (Rn = null), ou(n), e = e.stateNode, le && typeof le.onCommitFiberRoot == "function")
        try {
          le.onCommitFiberRoot(
            ui,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        e = U.T, s = Q.p, Q.p = 2, U.T = null;
        try {
          for (var c = t.onRecoverableError, f = 0; f < a.length; f++) {
            var m = a[f];
            c(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          U.T = e, Q.p = s;
        }
      }
      (an & 3) !== 0 && gs(), Le(t), s = t.pendingLanes, (n & 261930) !== 0 && (s & 42) !== 0 ? t === Vr ? Yi++ : (Yi = 0, Vr = t) : Yi = 0, Xi(0);
    }
  }
  function Oh(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Ai(e)));
  }
  function gs() {
    return wh(), Ch(), Mh(), zh();
  }
  function zh() {
    if (Ht !== 5) return !1;
    var t = _n, e = Yr;
    Yr = 0;
    var n = ou(an), a = U.T, s = Q.p;
    try {
      Q.p = 32 > n ? 32 : n, U.T = null, n = Xr, Xr = null;
      var c = _n, f = an;
      if (Ht = 0, $a = _n = null, an = 0, (ht & 6) !== 0) throw Error(r(331));
      var m = ht;
      if (ht |= 4, fh(c.current), rh(
        c,
        c.current,
        f,
        n
      ), ht = m, Xi(0, !1), le && typeof le.onPostCommitFiberRoot == "function")
        try {
          le.onPostCommitFiberRoot(ui, c);
        } catch {
        }
      return !0;
    } finally {
      Q.p = s, U.T = a, Oh(t, e);
    }
  }
  function Dh(t, e, n) {
    e = ve(n, e), e = Tr(t.stateNode, e, 2), t = Sn(t, e, 2), t !== null && (ci(t, 2), Le(t));
  }
  function gt(t, e, n) {
    if (t.tag === 3)
      Dh(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Dh(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Rn === null || !Rn.has(a))) {
            t = ve(n, t), n = xd(2), a = Sn(e, n, 2), a !== null && (Nd(
              n,
              a,
              e,
              t
            ), ci(a, 2), Le(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Kr(t, e, n) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new k0();
      var s = /* @__PURE__ */ new Set();
      a.set(e, s);
    } else
      s = a.get(e), s === void 0 && (s = /* @__PURE__ */ new Set(), a.set(e, s));
    s.has(n) || (qr = !0, s.add(n), t = tp.bind(null, t, e, n), e.then(t, t));
  }
  function tp(t, e, n) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, Tt === t && (st & n) === n && (Ct === 4 || Ct === 3 && (st & 62914560) === st && 300 > ie() - os ? (ht & 2) === 0 && Za(t, 0) : Qr |= n, Va === st && (Va = 0)), Le(t);
  }
  function xh(t, e) {
    e === 0 && (e = _o()), t = Kn(t, e), t !== null && (ci(t, e), Le(t));
  }
  function ep(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), xh(t, n);
  }
  function np(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, s = t.memoizedState;
        s !== null && (n = s.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(e), xh(t, n);
  }
  function ap(t, e) {
    return su(t, e);
  }
  var ps = null, Ja = null, Jr = !1, Ss = !1, kr = !1, Cn = 0;
  function Le(t) {
    t !== Ja && t.next === null && (Ja === null ? ps = Ja = t : Ja = Ja.next = t), Ss = !0, Jr || (Jr = !0, lp());
  }
  function Xi(t, e) {
    if (!kr && Ss) {
      kr = !0;
      do
        for (var n = !1, a = ps; a !== null; ) {
          if (t !== 0) {
            var s = a.pendingLanes;
            if (s === 0) var c = 0;
            else {
              var f = a.suspendedLanes, m = a.pingedLanes;
              c = (1 << 31 - se(42 | t) + 1) - 1, c &= s & ~(f & ~m), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, Bh(a, c));
          } else
            c = st, c = Tl(
              a,
              a === Tt ? c : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (c & 3) === 0 || ri(a, c) || (n = !0, Bh(a, c));
          a = a.next;
        }
      while (n);
      kr = !1;
    }
  }
  function ip() {
    Nh();
  }
  function Nh() {
    Ss = Jr = !1;
    var t = 0;
    Cn !== 0 && yp() && (t = Cn);
    for (var e = ie(), n = null, a = ps; a !== null; ) {
      var s = a.next, c = Uh(a, e);
      c === 0 ? (a.next = null, n === null ? ps = s : n.next = s, s === null && (Ja = n)) : (n = a, (t !== 0 || (c & 3) !== 0) && (Ss = !0)), a = s;
    }
    Ht !== 0 && Ht !== 5 || Xi(t), Cn !== 0 && (Cn = 0);
  }
  function Uh(t, e) {
    for (var n = t.suspendedLanes, a = t.pingedLanes, s = t.expirationTimes, c = t.pendingLanes & -62914561; 0 < c; ) {
      var f = 31 - se(c), m = 1 << f, v = s[f];
      v === -1 ? ((m & n) === 0 || (m & a) !== 0) && (s[f] = Dg(m, e)) : v <= e && (t.expiredLanes |= m), c &= ~m;
    }
    if (e = Tt, n = st, n = Tl(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, n === 0 || t === e && (yt === 2 || yt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && uu(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || ri(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (a !== null && uu(a), ou(n)) {
        case 2:
        case 8:
          n = Ao;
          break;
        case 32:
          n = Sl;
          break;
        case 268435456:
          n = Ro;
          break;
        default:
          n = Sl;
      }
      return a = Hh.bind(null, t), n = su(n, a), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return a !== null && a !== null && uu(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Hh(t, e) {
    if (Ht !== 0 && Ht !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (gs() && t.callbackNode !== n)
      return null;
    var a = st;
    return a = Tl(
      t,
      t === Tt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (gh(t, a, e), Uh(t, ie()), t.callbackNode != null && t.callbackNode === n ? Hh.bind(null, t) : null);
  }
  function Bh(t, e) {
    if (gs()) return null;
    gh(t, e, !0);
  }
  function lp() {
    pp(function() {
      (ht & 6) !== 0 ? su(
        To,
        ip
      ) : Nh();
    });
  }
  function Ir() {
    if (Cn === 0) {
      var t = Na;
      t === 0 && (t = vl, vl <<= 1, (vl & 261888) === 0 && (vl = 256)), Cn = t;
    }
    return Cn;
  }
  function Lh(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : wl("" + t);
  }
  function jh(t, e) {
    var n = e.ownerDocument.createElement("input");
    return n.name = e.name, n.value = e.value, t.id && n.setAttribute("form", t.id), e.parentNode.insertBefore(n, e), t = new FormData(t), n.parentNode.removeChild(n), t;
  }
  function sp(t, e, n, a, s) {
    if (e === "submit" && n && n.stateNode === s) {
      var c = Lh(
        (s[It] || null).action
      ), f = a.submitter;
      f && (e = (e = f[It] || null) ? Lh(e.formAction) : f.getAttribute("formAction"), e !== null && (c = e, f = null));
      var m = new zl(
        "action",
        "action",
        null,
        a,
        s
      );
      t.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Cn !== 0) {
                  var v = f ? jh(s, f) : new FormData(s);
                  gr(
                    n,
                    {
                      pending: !0,
                      data: v,
                      method: s.method,
                      action: c
                    },
                    null,
                    v
                  );
                }
              } else
                typeof c == "function" && (m.preventDefault(), v = f ? jh(s, f) : new FormData(s), gr(
                  n,
                  {
                    pending: !0,
                    data: v,
                    method: s.method,
                    action: c
                  },
                  c,
                  v
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var Fr = 0; Fr < Nu.length; Fr++) {
    var Wr = Nu[Fr], up = Wr.toLowerCase(), rp = Wr[0].toUpperCase() + Wr.slice(1);
    Me(
      up,
      "on" + rp
    );
  }
  Me(yf, "onAnimationEnd"), Me(gf, "onAnimationIteration"), Me(pf, "onAnimationStart"), Me("dblclick", "onDoubleClick"), Me("focusin", "onFocus"), Me("focusout", "onBlur"), Me(R0, "onTransitionRun"), Me(_0, "onTransitionStart"), Me(w0, "onTransitionCancel"), Me(Sf, "onTransitionEnd"), va("onMouseEnter", ["mouseout", "mouseover"]), va("onMouseLeave", ["mouseout", "mouseover"]), va("onPointerEnter", ["pointerout", "pointerover"]), va("onPointerLeave", ["pointerout", "pointerover"]), Xn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Xn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Xn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Xn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Xn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Xn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Vi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cp = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vi)
  );
  function qh(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var a = t[n], s = a.event;
      a = a.listeners;
      t: {
        var c = void 0;
        if (e)
          for (var f = a.length - 1; 0 <= f; f--) {
            var m = a[f], v = m.instance, C = m.currentTarget;
            if (m = m.listener, v !== c && s.isPropagationStopped())
              break t;
            c = m, s.currentTarget = C;
            try {
              c(s);
            } catch (x) {
              Nl(x);
            }
            s.currentTarget = null, c = v;
          }
        else
          for (f = 0; f < a.length; f++) {
            if (m = a[f], v = m.instance, C = m.currentTarget, m = m.listener, v !== c && s.isPropagationStopped())
              break t;
            c = m, s.currentTarget = C;
            try {
              c(s);
            } catch (x) {
              Nl(x);
            }
            s.currentTarget = null, c = v;
          }
      }
    }
  }
  function it(t, e) {
    var n = e[fu];
    n === void 0 && (n = e[fu] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    n.has(a) || (Qh(e, t, 2, !1), n.add(a));
  }
  function Pr(t, e, n) {
    var a = 0;
    e && (a |= 4), Qh(
      n,
      t,
      a,
      e
    );
  }
  var vs = "_reactListening" + Math.random().toString(36).slice(2);
  function tc(t) {
    if (!t[vs]) {
      t[vs] = !0, xo.forEach(function(n) {
        n !== "selectionchange" && (cp.has(n) || Pr(n, !1, t), Pr(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[vs] || (e[vs] = !0, Pr("selectionchange", !1, e));
    }
  }
  function Qh(t, e, n, a) {
    switch (ym(e)) {
      case 2:
        var s = Lp;
        break;
      case 8:
        s = jp;
        break;
      default:
        s = yc;
    }
    n = s.bind(
      null,
      e,
      n,
      t
    ), s = void 0, !bu || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (s = !0), a ? s !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: s
    }) : t.addEventListener(e, n, !0) : s !== void 0 ? t.addEventListener(e, n, {
      passive: s
    }) : t.addEventListener(e, n, !1);
  }
  function ec(t, e, n, a, s) {
    var c = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var m = a.stateNode.containerInfo;
          if (m === s) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var v = f.tag;
              if ((v === 3 || v === 4) && f.stateNode.containerInfo === s)
                return;
              f = f.return;
            }
          for (; m !== null; ) {
            if (f = ga(m), f === null) return;
            if (v = f.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              a = c = f;
              continue t;
            }
            m = m.parentNode;
          }
        }
        a = a.return;
      }
    Vo(function() {
      var C = c, x = Su(n), B = [];
      t: {
        var O = vf.get(t);
        if (O !== void 0) {
          var D = zl, Y = t;
          switch (t) {
            case "keypress":
              if (Ml(n) === 0) break t;
            case "keydown":
            case "keyup":
              D = n0;
              break;
            case "focusin":
              Y = "focus", D = Ru;
              break;
            case "focusout":
              Y = "blur", D = Ru;
              break;
            case "beforeblur":
            case "afterblur":
              D = Ru;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              D = Ko;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = Vg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = l0;
              break;
            case yf:
            case gf:
            case pf:
              D = Kg;
              break;
            case Sf:
              D = u0;
              break;
            case "scroll":
            case "scrollend":
              D = Yg;
              break;
            case "wheel":
              D = c0;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = kg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = ko;
              break;
            case "toggle":
            case "beforetoggle":
              D = f0;
          }
          var J = (e & 4) !== 0, bt = !J && (t === "scroll" || t === "scrollend"), R = J ? O !== null ? O + "Capture" : null : O;
          J = [];
          for (var E = C, w; E !== null; ) {
            var H = E;
            if (w = H.stateNode, H = H.tag, H !== 5 && H !== 26 && H !== 27 || w === null || R === null || (H = di(E, R), H != null && J.push(
              $i(E, H, w)
            )), bt) break;
            E = E.return;
          }
          0 < J.length && (O = new D(
            O,
            Y,
            null,
            n,
            x
          ), B.push({ event: O, listeners: J }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", D = t === "mouseout" || t === "pointerout", O && n !== pu && (Y = n.relatedTarget || n.fromElement) && (ga(Y) || Y[ya]))
            break t;
          if ((D || O) && (O = x.window === x ? x : (O = x.ownerDocument) ? O.defaultView || O.parentWindow : window, D ? (Y = n.relatedTarget || n.toElement, D = C, Y = Y ? ga(Y) : null, Y !== null && (bt = d(Y), J = Y.tag, Y !== bt || J !== 5 && J !== 27 && J !== 6) && (Y = null)) : (D = null, Y = C), D !== Y)) {
            if (J = Ko, H = "onMouseLeave", R = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (J = ko, H = "onPointerLeave", R = "onPointerEnter", E = "pointer"), bt = D == null ? O : fi(D), w = Y == null ? O : fi(Y), O = new J(
              H,
              E + "leave",
              D,
              n,
              x
            ), O.target = bt, O.relatedTarget = w, H = null, ga(x) === C && (J = new J(
              R,
              E + "enter",
              Y,
              n,
              x
            ), J.target = w, J.relatedTarget = bt, H = J), bt = H, D && Y)
              e: {
                for (J = op, R = D, E = Y, w = 0, H = R; H; H = J(H))
                  w++;
                H = 0;
                for (var K = E; K; K = J(K))
                  H++;
                for (; 0 < w - H; )
                  R = J(R), w--;
                for (; 0 < H - w; )
                  E = J(E), H--;
                for (; w--; ) {
                  if (R === E || E !== null && R === E.alternate) {
                    J = R;
                    break e;
                  }
                  R = J(R), E = J(E);
                }
                J = null;
              }
            else J = null;
            D !== null && Gh(
              B,
              O,
              D,
              J,
              !1
            ), Y !== null && bt !== null && Gh(
              B,
              bt,
              Y,
              J,
              !0
            );
          }
        }
        t: {
          if (O = C ? fi(C) : window, D = O.nodeName && O.nodeName.toLowerCase(), D === "select" || D === "input" && O.type === "file")
            var ft = af;
          else if (ef(O))
            if (lf)
              ft = E0;
            else {
              ft = v0;
              var V = S0;
            }
          else
            D = O.nodeName, !D || D.toLowerCase() !== "input" || O.type !== "checkbox" && O.type !== "radio" ? C && gu(C.elementType) && (ft = af) : ft = b0;
          if (ft && (ft = ft(t, C))) {
            nf(
              B,
              ft,
              n,
              x
            );
            break t;
          }
          V && V(t, O, C), t === "focusout" && C && O.type === "number" && C.memoizedProps.value != null && yu(O, "number", O.value);
        }
        switch (V = C ? fi(C) : window, t) {
          case "focusin":
            (ef(V) || V.contentEditable === "true") && (_a = V, zu = C, bi = null);
            break;
          case "focusout":
            bi = zu = _a = null;
            break;
          case "mousedown":
            Du = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Du = !1, hf(B, n, x);
            break;
          case "selectionchange":
            if (A0) break;
          case "keydown":
          case "keyup":
            hf(B, n, x);
        }
        var et;
        if (wu)
          t: {
            switch (t) {
              case "compositionstart":
                var ut = "onCompositionStart";
                break t;
              case "compositionend":
                ut = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ut = "onCompositionUpdate";
                break t;
            }
            ut = void 0;
          }
        else
          Ra ? Po(t, n) && (ut = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (ut = "onCompositionStart");
        ut && (Io && n.locale !== "ko" && (Ra || ut !== "onCompositionStart" ? ut === "onCompositionEnd" && Ra && (et = $o()) : (fn = x, Eu = "value" in fn ? fn.value : fn.textContent, Ra = !0)), V = bs(C, ut), 0 < V.length && (ut = new Jo(
          ut,
          t,
          null,
          n,
          x
        ), B.push({ event: ut, listeners: V }), et ? ut.data = et : (et = tf(n), et !== null && (ut.data = et)))), (et = h0 ? m0(t, n) : y0(t, n)) && (ut = bs(C, "onBeforeInput"), 0 < ut.length && (V = new Jo(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          x
        ), B.push({
          event: V,
          listeners: ut
        }), V.data = et)), sp(
          B,
          t,
          C,
          n,
          x
        );
      }
      qh(B, e);
    });
  }
  function $i(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function bs(t, e) {
    for (var n = e + "Capture", a = []; t !== null; ) {
      var s = t, c = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || c === null || (s = di(t, n), s != null && a.unshift(
        $i(t, s, c)
      ), s = di(t, e), s != null && a.push(
        $i(t, s, c)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function op(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Gh(t, e, n, a, s) {
    for (var c = e._reactName, f = []; n !== null && n !== a; ) {
      var m = n, v = m.alternate, C = m.stateNode;
      if (m = m.tag, v !== null && v === a) break;
      m !== 5 && m !== 26 && m !== 27 || C === null || (v = C, s ? (C = di(n, c), C != null && f.unshift(
        $i(n, C, v)
      )) : s || (C = di(n, c), C != null && f.push(
        $i(n, C, v)
      ))), n = n.return;
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var fp = /\r\n?/g, dp = /\u0000|\uFFFD/g;
  function Yh(t) {
    return (typeof t == "string" ? t : "" + t).replace(fp, `
`).replace(dp, "");
  }
  function Xh(t, e) {
    return e = Yh(e), Yh(t) === e;
  }
  function vt(t, e, n, a, s, c) {
    switch (n) {
      case "children":
        typeof a == "string" ? e === "body" || e === "textarea" && a === "" || Ea(t, a) : (typeof a == "number" || typeof a == "bigint") && e !== "body" && Ea(t, "" + a);
        break;
      case "className":
        Rl(t, "class", a);
        break;
      case "tabIndex":
        Rl(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Rl(t, n, a);
        break;
      case "style":
        Yo(t, a, c);
        break;
      case "data":
        if (e !== "object") {
          Rl(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(n);
          break;
        }
        a = wl("" + a), t.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (n === "formAction" ? (e !== "input" && vt(t, e, "name", s.name, s, null), vt(
            t,
            e,
            "formEncType",
            s.formEncType,
            s,
            null
          ), vt(
            t,
            e,
            "formMethod",
            s.formMethod,
            s,
            null
          ), vt(
            t,
            e,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (vt(t, e, "encType", s.encType, s, null), vt(t, e, "method", s.method, s, null), vt(t, e, "target", s.target, s, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(n);
          break;
        }
        a = wl("" + a), t.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (t.onclick = Ye);
        break;
      case "onScroll":
        a != null && it("scroll", t);
        break;
      case "onScrollEnd":
        a != null && it("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (n = a.__html, n != null) {
            if (s.children != null) throw Error(r(60));
            t.innerHTML = n;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = wl("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(n, "" + a) : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(n, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(n, a) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(n, a) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(n) : t.setAttribute(n, a);
        break;
      case "popover":
        it("beforetoggle", t), it("toggle", t), Al(t, "popover", a);
        break;
      case "xlinkActuate":
        Ge(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Ge(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Ge(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Ge(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Ge(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Ge(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Ge(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Ge(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Ge(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Al(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Qg.get(n) || n, Al(t, n, a));
    }
  }
  function nc(t, e, n, a, s, c) {
    switch (n) {
      case "style":
        Yo(t, a, c);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (n = a.__html, n != null) {
            if (s.children != null) throw Error(r(60));
            t.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Ea(t, a) : (typeof a == "number" || typeof a == "bigint") && Ea(t, "" + a);
        break;
      case "onScroll":
        a != null && it("scroll", t);
        break;
      case "onScrollEnd":
        a != null && it("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Ye);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!No.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (s = n.endsWith("Capture"), e = n.slice(2, s ? n.length - 7 : void 0), c = t[It] || null, c = c != null ? c[n] : null, typeof c == "function" && t.removeEventListener(e, c, s), typeof a == "function")) {
              typeof c != "function" && c !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(e, a, s);
              break t;
            }
            n in t ? t[n] = a : a === !0 ? t.setAttribute(n, "") : Al(t, n, a);
          }
    }
  }
  function Vt(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        it("error", t), it("load", t);
        var a = !1, s = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var f = n[c];
            if (f != null)
              switch (c) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  vt(t, e, c, f, n, null);
              }
          }
        s && vt(t, e, "srcSet", n.srcSet, n, null), a && vt(t, e, "src", n.src, n, null);
        return;
      case "input":
        it("invalid", t);
        var m = c = f = s = null, v = null, C = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var x = n[a];
            if (x != null)
              switch (a) {
                case "name":
                  s = x;
                  break;
                case "type":
                  f = x;
                  break;
                case "checked":
                  v = x;
                  break;
                case "defaultChecked":
                  C = x;
                  break;
                case "value":
                  c = x;
                  break;
                case "defaultValue":
                  m = x;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (x != null)
                    throw Error(r(137, e));
                  break;
                default:
                  vt(t, e, a, x, n, null);
              }
          }
        jo(
          t,
          c,
          m,
          v,
          C,
          f,
          s,
          !1
        );
        return;
      case "select":
        it("invalid", t), a = f = c = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (m = n[s], m != null))
            switch (s) {
              case "value":
                c = m;
                break;
              case "defaultValue":
                f = m;
                break;
              case "multiple":
                a = m;
              default:
                vt(t, e, s, m, n, null);
            }
        e = c, n = f, t.multiple = !!a, e != null ? ba(t, !!a, e, !1) : n != null && ba(t, !!a, n, !0);
        return;
      case "textarea":
        it("invalid", t), c = s = a = null;
        for (f in n)
          if (n.hasOwnProperty(f) && (m = n[f], m != null))
            switch (f) {
              case "value":
                a = m;
                break;
              case "defaultValue":
                s = m;
                break;
              case "children":
                c = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(r(91));
                break;
              default:
                vt(t, e, f, m, n, null);
            }
        Qo(t, a, s, c);
        return;
      case "option":
        for (v in n)
          if (n.hasOwnProperty(v) && (a = n[v], a != null))
            switch (v) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                vt(t, e, v, a, n, null);
            }
        return;
      case "dialog":
        it("beforetoggle", t), it("toggle", t), it("cancel", t), it("close", t);
        break;
      case "iframe":
      case "object":
        it("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Vi.length; a++)
          it(Vi[a], t);
        break;
      case "image":
        it("error", t), it("load", t);
        break;
      case "details":
        it("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        it("error", t), it("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (C in n)
          if (n.hasOwnProperty(C) && (a = n[C], a != null))
            switch (C) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                vt(t, e, C, a, n, null);
            }
        return;
      default:
        if (gu(e)) {
          for (x in n)
            n.hasOwnProperty(x) && (a = n[x], a !== void 0 && nc(
              t,
              e,
              x,
              a,
              n,
              void 0
            ));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && (a = n[m], a != null && vt(t, e, m, a, n, null));
  }
  function hp(t, e, n, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, c = null, f = null, m = null, v = null, C = null, x = null;
        for (D in n) {
          var B = n[D];
          if (n.hasOwnProperty(D) && B != null)
            switch (D) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = B;
              default:
                a.hasOwnProperty(D) || vt(t, e, D, null, a, B);
            }
        }
        for (var O in a) {
          var D = a[O];
          if (B = n[O], a.hasOwnProperty(O) && (D != null || B != null))
            switch (O) {
              case "type":
                c = D;
                break;
              case "name":
                s = D;
                break;
              case "checked":
                C = D;
                break;
              case "defaultChecked":
                x = D;
                break;
              case "value":
                f = D;
                break;
              case "defaultValue":
                m = D;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null)
                  throw Error(r(137, e));
                break;
              default:
                D !== B && vt(
                  t,
                  e,
                  O,
                  D,
                  a,
                  B
                );
            }
        }
        mu(
          t,
          f,
          m,
          v,
          C,
          x,
          c,
          s
        );
        return;
      case "select":
        D = f = m = O = null;
        for (c in n)
          if (v = n[c], n.hasOwnProperty(c) && v != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                D = v;
              default:
                a.hasOwnProperty(c) || vt(
                  t,
                  e,
                  c,
                  null,
                  a,
                  v
                );
            }
        for (s in a)
          if (c = a[s], v = n[s], a.hasOwnProperty(s) && (c != null || v != null))
            switch (s) {
              case "value":
                O = c;
                break;
              case "defaultValue":
                m = c;
                break;
              case "multiple":
                f = c;
              default:
                c !== v && vt(
                  t,
                  e,
                  s,
                  c,
                  a,
                  v
                );
            }
        e = m, n = f, a = D, O != null ? ba(t, !!n, O, !1) : !!a != !!n && (e != null ? ba(t, !!n, e, !0) : ba(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        D = O = null;
        for (m in n)
          if (s = n[m], n.hasOwnProperty(m) && s != null && !a.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                vt(t, e, m, null, a, s);
            }
        for (f in a)
          if (s = a[f], c = n[f], a.hasOwnProperty(f) && (s != null || c != null))
            switch (f) {
              case "value":
                O = s;
                break;
              case "defaultValue":
                D = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(r(91));
                break;
              default:
                s !== c && vt(t, e, f, s, a, c);
            }
        qo(t, O, D);
        return;
      case "option":
        for (var Y in n)
          if (O = n[Y], n.hasOwnProperty(Y) && O != null && !a.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                t.selected = !1;
                break;
              default:
                vt(
                  t,
                  e,
                  Y,
                  null,
                  a,
                  O
                );
            }
        for (v in a)
          if (O = a[v], D = n[v], a.hasOwnProperty(v) && O !== D && (O != null || D != null))
            switch (v) {
              case "selected":
                t.selected = O && typeof O != "function" && typeof O != "symbol";
                break;
              default:
                vt(
                  t,
                  e,
                  v,
                  O,
                  a,
                  D
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var J in n)
          O = n[J], n.hasOwnProperty(J) && O != null && !a.hasOwnProperty(J) && vt(t, e, J, null, a, O);
        for (C in a)
          if (O = a[C], D = n[C], a.hasOwnProperty(C) && O !== D && (O != null || D != null))
            switch (C) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(r(137, e));
                break;
              default:
                vt(
                  t,
                  e,
                  C,
                  O,
                  a,
                  D
                );
            }
        return;
      default:
        if (gu(e)) {
          for (var bt in n)
            O = n[bt], n.hasOwnProperty(bt) && O !== void 0 && !a.hasOwnProperty(bt) && nc(
              t,
              e,
              bt,
              void 0,
              a,
              O
            );
          for (x in a)
            O = a[x], D = n[x], !a.hasOwnProperty(x) || O === D || O === void 0 && D === void 0 || nc(
              t,
              e,
              x,
              O,
              a,
              D
            );
          return;
        }
    }
    for (var R in n)
      O = n[R], n.hasOwnProperty(R) && O != null && !a.hasOwnProperty(R) && vt(t, e, R, null, a, O);
    for (B in a)
      O = a[B], D = n[B], !a.hasOwnProperty(B) || O === D || O == null && D == null || vt(t, e, B, O, a, D);
  }
  function Vh(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function mp() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), a = 0; a < n.length; a++) {
        var s = n[a], c = s.transferSize, f = s.initiatorType, m = s.duration;
        if (c && m && Vh(f)) {
          for (f = 0, m = s.responseEnd, a += 1; a < n.length; a++) {
            var v = n[a], C = v.startTime;
            if (C > m) break;
            var x = v.transferSize, B = v.initiatorType;
            x && Vh(B) && (v = v.responseEnd, f += x * (v < m ? 1 : (m - C) / (v - C)));
          }
          if (--a, e += 8 * (c + f) / (s.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var ac = null, ic = null;
  function Es(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function $h(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Zh(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function lc(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var sc = null;
  function yp() {
    var t = window.event;
    return t && t.type === "popstate" ? t === sc ? !1 : (sc = t, !0) : (sc = null, !1);
  }
  var Kh = typeof setTimeout == "function" ? setTimeout : void 0, gp = typeof clearTimeout == "function" ? clearTimeout : void 0, Jh = typeof Promise == "function" ? Promise : void 0, pp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jh < "u" ? function(t) {
    return Jh.resolve(null).then(t).catch(Sp);
  } : Kh;
  function Sp(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Mn(t) {
    return t === "head";
  }
  function kh(t, e) {
    var n = e, a = 0;
    do {
      var s = n.nextSibling;
      if (t.removeChild(n), s && s.nodeType === 8)
        if (n = s.data, n === "/$" || n === "/&") {
          if (a === 0) {
            t.removeChild(s), Wa(e);
            return;
          }
          a--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          a++;
        else if (n === "html")
          Zi(t.ownerDocument.documentElement);
        else if (n === "head") {
          n = t.ownerDocument.head, Zi(n);
          for (var c = n.firstChild; c; ) {
            var f = c.nextSibling, m = c.nodeName;
            c[oi] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = f;
          }
        } else
          n === "body" && Zi(t.ownerDocument.body);
      n = s;
    } while (n);
    Wa(e);
  }
  function Ih(t, e) {
    var n = t;
    t = 0;
    do {
      var a = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), a && a.nodeType === 8)
        if (n = a.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = a;
    } while (n);
  }
  function uc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          uc(n), du(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function vp(t, e, n, a) {
    for (; t.nodeType === 1; ) {
      var s = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[oi])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (c = t.getAttribute("rel"), c === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (c !== s.rel || t.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || t.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || t.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (c = t.getAttribute("src"), (c !== (s.src == null ? null : s.src) || t.getAttribute("type") !== (s.type == null ? null : s.type) || t.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && c && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var c = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && t.getAttribute("name") === c)
          return t;
      } else return t;
      if (t = Re(t.nextSibling), t === null) break;
    }
    return null;
  }
  function bp(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Re(t.nextSibling), t === null)) return null;
    return t;
  }
  function Fh(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Re(t.nextSibling), t === null)) return null;
    return t;
  }
  function rc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function cc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Ep(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var a = function() {
        e(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function Re(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var oc = null;
  function Wh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return Re(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Ph(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else n !== "/$" && n !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function tm(t, e, n) {
    switch (e = Es(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Zi(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    du(t);
  }
  var _e = /* @__PURE__ */ new Map(), em = /* @__PURE__ */ new Set();
  function Ts(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ln = Q.d;
  Q.d = {
    f: Tp,
    r: Ap,
    D: Rp,
    C: _p,
    L: wp,
    m: Cp,
    X: Op,
    S: Mp,
    M: zp
  };
  function Tp() {
    var t = ln.f(), e = hs();
    return t || e;
  }
  function Ap(t) {
    var e = pa(t);
    e !== null && e.tag === 5 && e.type === "form" ? Sd(e) : ln.r(t);
  }
  var ka = typeof document > "u" ? null : document;
  function nm(t, e, n) {
    var a = ka;
    if (a && typeof e == "string" && e) {
      var s = pe(e);
      s = 'link[rel="' + t + '"][href="' + s + '"]', typeof n == "string" && (s += '[crossorigin="' + n + '"]'), em.has(s) || (em.add(s), t = { rel: t, crossOrigin: n, href: e }, a.querySelector(s) === null && (e = a.createElement("link"), Vt(e, "link", t), Lt(e), a.head.appendChild(e)));
    }
  }
  function Rp(t) {
    ln.D(t), nm("dns-prefetch", t, null);
  }
  function _p(t, e) {
    ln.C(t, e), nm("preconnect", t, e);
  }
  function wp(t, e, n) {
    ln.L(t, e, n);
    var a = ka;
    if (a && t && e) {
      var s = 'link[rel="preload"][as="' + pe(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (s += '[imagesrcset="' + pe(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (s += '[imagesizes="' + pe(
        n.imageSizes
      ) + '"]')) : s += '[href="' + pe(t) + '"]';
      var c = s;
      switch (e) {
        case "style":
          c = Ia(t);
          break;
        case "script":
          c = Fa(t);
      }
      _e.has(c) || (t = S(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), _e.set(c, t), a.querySelector(s) !== null || e === "style" && a.querySelector(Ki(c)) || e === "script" && a.querySelector(Ji(c)) || (e = a.createElement("link"), Vt(e, "link", t), Lt(e), a.head.appendChild(e)));
    }
  }
  function Cp(t, e) {
    ln.m(t, e);
    var n = ka;
    if (n && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", s = 'link[rel="modulepreload"][as="' + pe(a) + '"][href="' + pe(t) + '"]', c = s;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Fa(t);
      }
      if (!_e.has(c) && (t = S({ rel: "modulepreload", href: t }, e), _e.set(c, t), n.querySelector(s) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Ji(c)))
              return;
        }
        a = n.createElement("link"), Vt(a, "link", t), Lt(a), n.head.appendChild(a);
      }
    }
  }
  function Mp(t, e, n) {
    ln.S(t, e, n);
    var a = ka;
    if (a && t) {
      var s = Sa(a).hoistableStyles, c = Ia(t);
      e = e || "default";
      var f = s.get(c);
      if (!f) {
        var m = { loading: 0, preload: null };
        if (f = a.querySelector(
          Ki(c)
        ))
          m.loading = 5;
        else {
          t = S(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = _e.get(c)) && fc(t, n);
          var v = f = a.createElement("link");
          Lt(v), Vt(v, "link", t), v._p = new Promise(function(C, x) {
            v.onload = C, v.onerror = x;
          }), v.addEventListener("load", function() {
            m.loading |= 1;
          }), v.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, As(f, e, a);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: m
        }, s.set(c, f);
      }
    }
  }
  function Op(t, e) {
    ln.X(t, e);
    var n = ka;
    if (n && t) {
      var a = Sa(n).hoistableScripts, s = Fa(t), c = a.get(s);
      c || (c = n.querySelector(Ji(s)), c || (t = S({ src: t, async: !0 }, e), (e = _e.get(s)) && dc(t, e), c = n.createElement("script"), Lt(c), Vt(c, "link", t), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(s, c));
    }
  }
  function zp(t, e) {
    ln.M(t, e);
    var n = ka;
    if (n && t) {
      var a = Sa(n).hoistableScripts, s = Fa(t), c = a.get(s);
      c || (c = n.querySelector(Ji(s)), c || (t = S({ src: t, async: !0, type: "module" }, e), (e = _e.get(s)) && dc(t, e), c = n.createElement("script"), Lt(c), Vt(c, "link", t), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(s, c));
    }
  }
  function am(t, e, n, a) {
    var s = (s = nt.current) ? Ts(s) : null;
    if (!s) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (e = Ia(n.href), n = Sa(
          s
        ).hoistableStyles, a = n.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = Ia(n.href);
          var c = Sa(
            s
          ).hoistableStyles, f = c.get(t);
          if (f || (s = s.ownerDocument || s, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(t, f), (c = s.querySelector(
            Ki(t)
          )) && !c._p && (f.instance = c, f.state.loading = 5), _e.has(t) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, _e.set(t, n), c || Dp(
            s,
            t,
            n,
            f.state
          ))), e && a === null)
            throw Error(r(528, ""));
          return f;
        }
        if (e && a !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Fa(n), n = Sa(
          s
        ).hoistableScripts, a = n.get(e), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function Ia(t) {
    return 'href="' + pe(t) + '"';
  }
  function Ki(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function im(t) {
    return S({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Dp(t, e, n, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? a.loading = 1 : (e = t.createElement("link"), a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    }), Vt(e, "link", n), Lt(e), t.head.appendChild(e));
  }
  function Fa(t) {
    return '[src="' + pe(t) + '"]';
  }
  function Ji(t) {
    return "script[async]" + t;
  }
  function lm(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + pe(n.href) + '"]'
          );
          if (a)
            return e.instance = a, Lt(a), a;
          var s = S({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Lt(a), Vt(a, "style", s), As(a, n.precedence, t), e.instance = a;
        case "stylesheet":
          s = Ia(n.href);
          var c = t.querySelector(
            Ki(s)
          );
          if (c)
            return e.state.loading |= 4, e.instance = c, Lt(c), c;
          a = im(n), (s = _e.get(s)) && fc(a, s), c = (t.ownerDocument || t).createElement("link"), Lt(c);
          var f = c;
          return f._p = new Promise(function(m, v) {
            f.onload = m, f.onerror = v;
          }), Vt(c, "link", a), e.state.loading |= 4, As(c, n.precedence, t), e.instance = c;
        case "script":
          return c = Fa(n.src), (s = t.querySelector(
            Ji(c)
          )) ? (e.instance = s, Lt(s), s) : (a = n, (s = _e.get(c)) && (a = S({}, n), dc(a, s)), t = t.ownerDocument || t, s = t.createElement("script"), Lt(s), Vt(s, "link", a), t.head.appendChild(s), e.instance = s);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, As(a, n.precedence, t));
    return e.instance;
  }
  function As(t, e, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = a.length ? a[a.length - 1] : null, c = s, f = 0; f < a.length; f++) {
      var m = a[f];
      if (m.dataset.precedence === e) c = m;
      else if (c !== s) break;
    }
    c ? c.parentNode.insertBefore(t, c.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function fc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function dc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Rs = null;
  function sm(t, e, n) {
    if (Rs === null) {
      var a = /* @__PURE__ */ new Map(), s = Rs = /* @__PURE__ */ new Map();
      s.set(n, a);
    } else
      s = Rs, a = s.get(n), a || (a = /* @__PURE__ */ new Map(), s.set(n, a));
    if (a.has(t)) return a;
    for (a.set(t, null), n = n.getElementsByTagName(t), s = 0; s < n.length; s++) {
      var c = n[s];
      if (!(c[oi] || c[Qt] || t === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = c.getAttribute(e) || "";
        f = t + f;
        var m = a.get(f);
        m ? m.push(c) : a.set(f, [c]);
      }
    }
    return a;
  }
  function um(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function xp(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function rm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Np(t, e, n, a) {
    if (n.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = Ia(a.href), c = e.querySelector(
          Ki(s)
        );
        if (c) {
          e = c._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = _s.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = c, Lt(c);
          return;
        }
        c = e.ownerDocument || e, a = im(a), (s = _e.get(s)) && fc(a, s), c = c.createElement("link"), Lt(c);
        var f = c;
        f._p = new Promise(function(m, v) {
          f.onload = m, f.onerror = v;
        }), Vt(c, "link", a), n.instance = c;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = _s.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var hc = 0;
  function Up(t, e) {
    return t.stylesheets && t.count === 0 && Cs(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (t.stylesheets && Cs(t, t.stylesheets), t.unsuspend) {
          var c = t.unsuspend;
          t.unsuspend = null, c();
        }
      }, 6e4 + e);
      0 < t.imgBytes && hc === 0 && (hc = 62500 * mp());
      var s = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Cs(t, t.stylesheets), t.unsuspend)) {
            var c = t.unsuspend;
            t.unsuspend = null, c();
          }
        },
        (t.imgBytes > hc ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(s);
      };
    } : null;
  }
  function _s() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Cs(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var ws = null;
  function Cs(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, ws = /* @__PURE__ */ new Map(), e.forEach(Hp, t), ws = null, _s.call(t));
  }
  function Hp(t, e) {
    if (!(e.state.loading & 4)) {
      var n = ws.get(t);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), ws.set(t, n);
        for (var s = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < s.length; c++) {
          var f = s[c];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (n.set(f.dataset.precedence, f), a = f);
        }
        a && n.set(null, a);
      }
      s = e.instance, f = s.getAttribute("data-precedence"), c = n.get(f) || a, c === a && n.set(null, s), n.set(f, s), this.count++, a = _s.bind(this), s.addEventListener("load", a), s.addEventListener("error", a), c ? c.parentNode.insertBefore(s, c.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(s, t.firstChild)), e.state.loading |= 4;
    }
  }
  var ki = {
    $$typeof: Z,
    Provider: null,
    Consumer: null,
    _currentValue: k,
    _currentValue2: k,
    _threadCount: 0
  };
  function Bp(t, e, n, a, s, c, f, m, v) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ru(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ru(0), this.hiddenUpdates = ru(null), this.identifierPrefix = a, this.onUncaughtError = s, this.onCaughtError = c, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function cm(t, e, n, a, s, c, f, m, v, C, x, B) {
    return t = new Bp(
      t,
      e,
      n,
      f,
      v,
      C,
      x,
      B,
      m
    ), e = 1, c === !0 && (e |= 24), c = re(3, null, null, e), t.current = c, c.stateNode = t, e = Zu(), e.refCount++, t.pooledCache = e, e.refCount++, c.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: e
    }, Iu(c), t;
  }
  function om(t) {
    return t ? (t = Ma, t) : Ma;
  }
  function fm(t, e, n, a, s, c) {
    s = om(s), a.context === null ? a.context = s : a.pendingContext = s, a = pn(e), a.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (a.callback = c), n = Sn(t, a, e), n !== null && (ne(n, t, e), Ci(n, t, e));
  }
  function dm(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function mc(t, e) {
    dm(t, e), (t = t.alternate) && dm(t, e);
  }
  function hm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Kn(t, 67108864);
      e !== null && ne(e, t, 67108864), mc(t, 67108864);
    }
  }
  function mm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = he();
      e = cu(e);
      var n = Kn(t, e);
      n !== null && ne(n, t, e), mc(t, e);
    }
  }
  var Ms = !0;
  function Lp(t, e, n, a) {
    var s = U.T;
    U.T = null;
    var c = Q.p;
    try {
      Q.p = 2, yc(t, e, n, a);
    } finally {
      Q.p = c, U.T = s;
    }
  }
  function jp(t, e, n, a) {
    var s = U.T;
    U.T = null;
    var c = Q.p;
    try {
      Q.p = 8, yc(t, e, n, a);
    } finally {
      Q.p = c, U.T = s;
    }
  }
  function yc(t, e, n, a) {
    if (Ms) {
      var s = gc(a);
      if (s === null)
        ec(
          t,
          e,
          a,
          Os,
          n
        ), gm(t, a);
      else if (Qp(
        s,
        t,
        e,
        n,
        a
      ))
        a.stopPropagation();
      else if (gm(t, a), e & 4 && -1 < qp.indexOf(t)) {
        for (; s !== null; ) {
          var c = pa(s);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var f = Yn(c.pendingLanes);
                  if (f !== 0) {
                    var m = c;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; f; ) {
                      var v = 1 << 31 - se(f);
                      m.entanglements[1] |= v, f &= ~v;
                    }
                    Le(c), (ht & 6) === 0 && (fs = ie() + 500, Xi(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = Kn(c, 2), m !== null && ne(m, c, 2), hs(), mc(c, 2);
            }
          if (c = gc(a), c === null && ec(
            t,
            e,
            a,
            Os,
            n
          ), c === s) break;
          s = c;
        }
        s !== null && a.stopPropagation();
      } else
        ec(
          t,
          e,
          a,
          null,
          n
        );
    }
  }
  function gc(t) {
    return t = Su(t), pc(t);
  }
  var Os = null;
  function pc(t) {
    if (Os = null, t = ga(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = y(e), t !== null) return t;
          t = null;
        } else if (n === 31) {
          if (t = p(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Os = t, null;
  }
  function ym(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Rg()) {
          case To:
            return 2;
          case Ao:
            return 8;
          case Sl:
          case _g:
            return 32;
          case Ro:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Sc = !1, On = null, zn = null, Dn = null, Ii = /* @__PURE__ */ new Map(), Fi = /* @__PURE__ */ new Map(), xn = [], qp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function gm(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        On = null;
        break;
      case "dragenter":
      case "dragleave":
        zn = null;
        break;
      case "mouseover":
      case "mouseout":
        Dn = null;
        break;
      case "pointerover":
      case "pointerout":
        Ii.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fi.delete(e.pointerId);
    }
  }
  function Wi(t, e, n, a, s, c) {
    return t === null || t.nativeEvent !== c ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: a,
      nativeEvent: c,
      targetContainers: [s]
    }, e !== null && (e = pa(e), e !== null && hm(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, s !== null && e.indexOf(s) === -1 && e.push(s), t);
  }
  function Qp(t, e, n, a, s) {
    switch (e) {
      case "focusin":
        return On = Wi(
          On,
          t,
          e,
          n,
          a,
          s
        ), !0;
      case "dragenter":
        return zn = Wi(
          zn,
          t,
          e,
          n,
          a,
          s
        ), !0;
      case "mouseover":
        return Dn = Wi(
          Dn,
          t,
          e,
          n,
          a,
          s
        ), !0;
      case "pointerover":
        var c = s.pointerId;
        return Ii.set(
          c,
          Wi(
            Ii.get(c) || null,
            t,
            e,
            n,
            a,
            s
          )
        ), !0;
      case "gotpointercapture":
        return c = s.pointerId, Fi.set(
          c,
          Wi(
            Fi.get(c) || null,
            t,
            e,
            n,
            a,
            s
          )
        ), !0;
    }
    return !1;
  }
  function pm(t) {
    var e = ga(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = y(n), e !== null) {
            t.blockedOn = e, zo(t.priority, function() {
              mm(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = p(n), e !== null) {
            t.blockedOn = e, zo(t.priority, function() {
              mm(n);
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function zs(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = gc(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        pu = a, n.target.dispatchEvent(a), pu = null;
      } else
        return e = pa(n), e !== null && hm(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function Sm(t, e, n) {
    zs(t) && n.delete(e);
  }
  function Gp() {
    Sc = !1, On !== null && zs(On) && (On = null), zn !== null && zs(zn) && (zn = null), Dn !== null && zs(Dn) && (Dn = null), Ii.forEach(Sm), Fi.forEach(Sm);
  }
  function Ds(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Sc || (Sc = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      Gp
    )));
  }
  var xs = null;
  function vm(t) {
    xs !== t && (xs = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        xs === t && (xs = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], a = t[e + 1], s = t[e + 2];
          if (typeof a != "function") {
            if (pc(a || n) === null)
              continue;
            break;
          }
          var c = pa(n);
          c !== null && (t.splice(e, 3), e -= 3, gr(
            c,
            {
              pending: !0,
              data: s,
              method: n.method,
              action: a
            },
            a,
            s
          ));
        }
      }
    ));
  }
  function Wa(t) {
    function e(v) {
      return Ds(v, t);
    }
    On !== null && Ds(On, t), zn !== null && Ds(zn, t), Dn !== null && Ds(Dn, t), Ii.forEach(e), Fi.forEach(e);
    for (var n = 0; n < xn.length; n++) {
      var a = xn[n];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < xn.length && (n = xn[0], n.blockedOn === null); )
      pm(n), n.blockedOn === null && xn.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var s = n[a], c = n[a + 1], f = s[It] || null;
        if (typeof c == "function")
          f || vm(n);
        else if (f) {
          var m = null;
          if (c && c.hasAttribute("formAction")) {
            if (s = c, f = c[It] || null)
              m = f.formAction;
            else if (pc(s) !== null) continue;
          } else m = f.action;
          typeof m == "function" ? n[a + 1] = m : (n.splice(a, 3), a -= 3), vm(n);
        }
      }
  }
  function bm() {
    function t(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(f) {
            return s = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      s !== null && (s(), s = null), a || setTimeout(n, 20);
    }
    function n() {
      if (!a && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, s = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), s !== null && (s(), s = null);
      };
    }
  }
  function vc(t) {
    this._internalRoot = t;
  }
  Ns.prototype.render = vc.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var n = e.current, a = he();
    fm(n, a, t, e, null, null);
  }, Ns.prototype.unmount = vc.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      fm(t.current, 2, null, t, null, null), hs(), e[ya] = null;
    }
  };
  function Ns(t) {
    this._internalRoot = t;
  }
  Ns.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Oo();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < xn.length && e !== 0 && e < xn[n].priority; n++) ;
      xn.splice(n, 0, t), n === 0 && pm(t);
    }
  };
  var Em = l.version;
  if (Em !== "19.2.5")
    throw Error(
      r(
        527,
        Em,
        "19.2.5"
      )
    );
  Q.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = h(e), t = t !== null ? b(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Yp = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Us = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Us.isDisabled && Us.supportsFiber)
      try {
        ui = Us.inject(
          Yp
        ), le = Us;
      } catch {
      }
  }
  return tl.createRoot = function(t, e) {
    if (!o(t)) throw Error(r(299));
    var n = !1, a = "", s = Md, c = Od, f = zd;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (s = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError)), e = cm(
      t,
      1,
      !1,
      null,
      null,
      n,
      a,
      null,
      s,
      c,
      f,
      bm
    ), t[ya] = e.current, tc(t), new vc(e);
  }, tl.hydrateRoot = function(t, e, n) {
    if (!o(t)) throw Error(r(299));
    var a = !1, s = "", c = Md, f = Od, m = zd, v = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.formState !== void 0 && (v = n.formState)), e = cm(
      t,
      1,
      !0,
      e,
      n ?? null,
      a,
      s,
      v,
      c,
      f,
      m,
      bm
    ), e.context = om(null), n = e.current, a = he(), a = cu(a), s = pn(a), s.callback = null, Sn(n, s, a), n = a, e.current.lanes = n, ci(e, n), Le(e), t[ya] = e.current, tc(t), new Ns(e);
  }, tl.version = "19.2.5", tl;
}
var Dm;
function tS() {
  if (Dm) return Ec.exports;
  Dm = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (l) {
        console.error(l);
      }
  }
  return i(), Ec.exports = Pp(), Ec.exports;
}
var eS = tS(), Hs = Pc();
const nS = (i) => ({
  setHttpHandler(l) {
    i.httpHandler = l;
  },
  httpHandler() {
    return i.httpHandler;
  },
  updateHttpClientConfig(l, u) {
    var r;
    (r = i.httpHandler) == null || r.updateHttpClientConfig(l, u);
  },
  httpHandlerConfigs() {
    return i.httpHandler.httpHandlerConfigs();
  }
}), aS = (i) => ({
  httpHandler: i.httpHandler()
});
var ol;
(function(i) {
  i.HTTP = "http", i.HTTPS = "https";
})(ol || (ol = {}));
var fl;
(function(i) {
  i.MD5 = "md5", i.CRC32 = "crc32", i.CRC32C = "crc32c", i.SHA1 = "sha1", i.SHA256 = "sha256";
})(fl || (fl = {}));
const Vc = "__smithy_context";
class ye {
  constructor(l) {
    M(this, "method");
    M(this, "protocol");
    M(this, "hostname");
    M(this, "port");
    M(this, "path");
    M(this, "query");
    M(this, "headers");
    M(this, "username");
    M(this, "password");
    M(this, "fragment");
    M(this, "body");
    this.method = l.method || "GET", this.hostname = l.hostname || "localhost", this.port = l.port, this.query = l.query || {}, this.headers = l.headers || {}, this.body = l.body, this.protocol = l.protocol ? l.protocol.slice(-1) !== ":" ? `${l.protocol}:` : l.protocol : "https:", this.path = l.path ? l.path.charAt(0) !== "/" ? `/${l.path}` : l.path : "/", this.username = l.username, this.password = l.password, this.fragment = l.fragment;
  }
  static clone(l) {
    const u = new ye({
      ...l,
      headers: { ...l.headers }
    });
    return u.query && (u.query = iS(u.query)), u;
  }
  static isInstance(l) {
    if (!l)
      return !1;
    const u = l;
    return "method" in u && "protocol" in u && "hostname" in u && "path" in u && typeof u.query == "object" && typeof u.headers == "object";
  }
  clone() {
    return ye.clone(this);
  }
}
function iS(i) {
  return Object.keys(i).reduce((l, u) => {
    const r = i[u];
    return {
      ...l,
      [u]: Array.isArray(r) ? [...r] : r
    };
  }, {});
}
class ei {
  constructor(l) {
    M(this, "statusCode");
    M(this, "reason");
    M(this, "headers");
    M(this, "body");
    this.statusCode = l.statusCode, this.reason = l.reason, this.headers = l.headers || {}, this.body = l.body;
  }
  static isInstance(l) {
    if (!l)
      return !1;
    const u = l;
    return typeof u.statusCode == "number" && typeof u.headers == "object";
  }
}
const lS = (i) => (l) => async (u) => {
  if (!ye.isInstance(u.request))
    return l(u);
  const { request: r } = u, { handlerProtocol: o = "" } = i.requestHandler.metadata || {};
  if (o.indexOf("h2") >= 0 && !r.headers[":authority"])
    delete r.headers.host, r.headers[":authority"] = r.hostname + (r.port ? ":" + r.port : "");
  else if (!r.headers.host) {
    let d = r.hostname;
    r.port != null && (d += `:${r.port}`), r.headers.host = d;
  }
  return l(u);
}, sS = {
  name: "hostHeaderMiddleware",
  step: "build",
  priority: "low",
  tags: ["HOST"],
  override: !0
}, uS = (i) => ({
  applyToStack: (l) => {
    l.add(lS(i), sS);
  }
}), rS = () => (i, l) => async (u) => {
  var r, o;
  try {
    const d = await i(u), { clientName: y, commandName: p, logger: g, dynamoDbDocumentClientOptions: h = {} } = l, { overrideInputFilterSensitiveLog: b, overrideOutputFilterSensitiveLog: S } = h, A = b ?? l.inputFilterSensitiveLog, _ = S ?? l.outputFilterSensitiveLog, { $metadata: z, ...N } = d.output;
    return (r = g == null ? void 0 : g.info) == null || r.call(g, {
      clientName: y,
      commandName: p,
      input: A(u.input),
      output: _(N),
      metadata: z
    }), d;
  } catch (d) {
    const { clientName: y, commandName: p, logger: g, dynamoDbDocumentClientOptions: h = {} } = l, { overrideInputFilterSensitiveLog: b } = h, S = b ?? l.inputFilterSensitiveLog;
    throw (o = g == null ? void 0 : g.error) == null || o.call(g, {
      clientName: y,
      commandName: p,
      input: S(u.input),
      error: d,
      metadata: d.$metadata
    }), d;
  }
}, cS = {
  name: "loggerMiddleware",
  tags: ["LOGGER"],
  step: "initialize",
  override: !0
}, oS = (i) => ({
  applyToStack: (l) => {
    l.add(rS(), cS);
  }
}), fS = {
  step: "build",
  tags: ["RECURSION_DETECTION"],
  name: "recursionDetectionMiddleware",
  override: !0,
  priority: "low"
}, dS = () => (i) => async (l) => i(l), hS = (i) => ({
  applyToStack: (l) => {
    l.add(dS(), fS);
  }
}), ai = (i) => i[Vc] || (i[Vc] = {}), un = (i) => {
  if (typeof i == "function")
    return i;
  const l = Promise.resolve(i);
  return () => l;
}, mS = (i, l) => {
  if (!l || l.length === 0)
    return i;
  const u = [];
  for (const r of l)
    for (const o of i)
      o.schemeId.split("#")[1] === r && u.push(o);
  for (const r of i)
    u.find(({ schemeId: o }) => o === r.schemeId) || u.push(r);
  return u;
};
function yS(i) {
  const l = /* @__PURE__ */ new Map();
  for (const u of i)
    l.set(u.schemeId, u);
  return l;
}
const gS = (i, l) => (u, r) => async (o) => {
  var S;
  const d = i.httpAuthSchemeProvider(await l.httpAuthSchemeParametersProvider(i, r, o.input)), y = i.authSchemePreference ? await i.authSchemePreference() : [], p = mS(d, y), g = yS(i.httpAuthSchemes), h = ai(r), b = [];
  for (const A of p) {
    const _ = g.get(A.schemeId);
    if (!_) {
      b.push(`HttpAuthScheme \`${A.schemeId}\` was not enabled for this service.`);
      continue;
    }
    const z = _.identityProvider(await l.identityProviderConfigProvider(i));
    if (!z) {
      b.push(`HttpAuthScheme \`${A.schemeId}\` did not have an IdentityProvider configured.`);
      continue;
    }
    const { identityProperties: N = {}, signingProperties: j = {} } = ((S = A.propertiesExtractor) == null ? void 0 : S.call(A, i, r)) || {};
    A.identityProperties = Object.assign(A.identityProperties || {}, N), A.signingProperties = Object.assign(A.signingProperties || {}, j), h.selectedHttpAuthScheme = {
      httpAuthOption: A,
      identity: await z(A.identityProperties),
      signer: _.signer
    };
    break;
  }
  if (!h.selectedHttpAuthScheme)
    throw new Error(b.join(`
`));
  return u(o);
}, pS = {
  step: "serialize",
  tags: ["HTTP_AUTH_SCHEME"],
  name: "httpAuthSchemeMiddleware",
  override: !0,
  relation: "before",
  toMiddleware: "endpointV2Middleware"
}, SS = (i, { httpAuthSchemeParametersProvider: l, identityProviderConfigProvider: u }) => ({
  applyToStack: (r) => {
    r.addRelativeTo(gS(i, {
      httpAuthSchemeParametersProvider: l,
      identityProviderConfigProvider: u
    }), pS);
  }
}), vS = (i) => (l) => {
  throw l;
}, bS = (i, l) => {
}, ES = (i) => (l, u) => async (r) => {
  if (!ye.isInstance(r.request))
    return l(r);
  const d = ai(u).selectedHttpAuthScheme;
  if (!d)
    throw new Error("No HttpAuthScheme was selected: unable to sign request");
  const { httpAuthOption: { signingProperties: y = {} }, identity: p, signer: g } = d, h = await l({
    ...r,
    request: await g.sign(r.request, p, y)
  }).catch((g.errorHandler || vS)(y));
  return (g.successHandler || bS)(h.response, y), h;
}, TS = {
  step: "finalizeRequest",
  tags: ["HTTP_SIGNING"],
  name: "httpSigningMiddleware",
  aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
  override: !0,
  relation: "after",
  toMiddleware: "retryMiddleware"
}, AS = (i) => ({
  applyToStack: (l) => {
    l.addRelativeTo(ES(), TS);
  }
}), sl = (i) => {
  if (typeof i == "function")
    return i;
  const l = Promise.resolve(i);
  return () => l;
}, Sy = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", xm = Object.entries(Sy).reduce((i, [l, u]) => (i[u] = Number(l), i), {}), RS = Sy.split(""), ti = 6, ul = 8, _S = 63, ks = (i) => {
  let l = i.length / 4 * 3;
  i.slice(-2) === "==" ? l -= 2 : i.slice(-1) === "=" && l--;
  const u = new ArrayBuffer(l), r = new DataView(u);
  for (let o = 0; o < i.length; o += 4) {
    let d = 0, y = 0;
    for (let h = o, b = o + 3; h <= b; h++)
      if (i[h] !== "=") {
        if (!(i[h] in xm))
          throw new TypeError(`Invalid character ${i[h]} in base64 string.`);
        d |= xm[i[h]] << (b - h) * ti, y += ti;
      } else
        d >>= ti;
    const p = o / 4 * 3;
    d >>= y % ul;
    const g = Math.floor(y / ul);
    for (let h = 0; h < g; h++) {
      const b = (g - h - 1) * ul;
      r.setUint8(p + h, (d & 255 << b) >> b);
    }
  }
  return new Uint8Array(u);
}, fa = (i) => new TextEncoder().encode(i), dl = (i) => typeof i == "string" ? fa(i) : ArrayBuffer.isView(i) ? new Uint8Array(i.buffer, i.byteOffset, i.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(i), Is = (i) => {
  if (typeof i == "string")
    return i;
  if (typeof i != "object" || typeof i.byteOffset != "number" || typeof i.byteLength != "number")
    throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
  return new TextDecoder("utf-8").decode(i);
};
function Vs(i) {
  let l;
  typeof i == "string" ? l = fa(i) : l = i;
  const u = typeof l == "object" && typeof l.length == "number", r = typeof l == "object" && typeof l.byteOffset == "number" && typeof l.byteLength == "number";
  if (!u && !r)
    throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  let o = "";
  for (let d = 0; d < l.length; d += 3) {
    let y = 0, p = 0;
    for (let h = d, b = Math.min(d + 3, l.length); h < b; h++)
      y |= l[h] << (b - h - 1) * ul, p += ul;
    const g = Math.ceil(p / ti);
    y <<= g * ti - p;
    for (let h = 1; h <= g; h++) {
      const b = (g - h) * ti;
      o += RS[(y & _S << b) >> b];
    }
    o += "==".slice(0, 4 - g);
  }
  return o;
}
class ra extends Uint8Array {
  static fromString(l, u = "utf-8") {
    if (typeof l == "string")
      return u === "base64" ? ra.mutate(ks(l)) : ra.mutate(fa(l));
    throw new Error(`Unsupported conversion from ${typeof l} to Uint8ArrayBlobAdapter.`);
  }
  static mutate(l) {
    return Object.setPrototypeOf(l, ra.prototype), l;
  }
  transformToString(l = "utf-8") {
    return l === "base64" ? Vs(this) : Is(this);
  }
}
const ca = (i) => encodeURIComponent(i).replace(/[!'()*]/g, wS), wS = (i) => `%${i.charCodeAt(0).toString(16).toUpperCase()}`;
function CS(i) {
  const l = [];
  for (let u of Object.keys(i).sort()) {
    const r = i[u];
    if (u = ca(u), Array.isArray(r))
      for (let o = 0, d = r.length; o < d; o++)
        l.push(`${u}=${ca(r[o])}`);
    else {
      let o = u;
      (r || typeof r == "string") && (o += `=${ca(r)}`), l.push(o);
    }
  }
  return l.join("&");
}
function Nm(i, l) {
  return new Request(i, l);
}
function MS(i = 0) {
  return new Promise((l, u) => {
    i && setTimeout(() => {
      const r = new Error(`Request did not complete within ${i} ms`);
      r.name = "TimeoutError", u(r);
    }, i);
  });
}
const wc = {
  supported: void 0
};
class to {
  constructor(l) {
    M(this, "config");
    M(this, "configProvider");
    typeof l == "function" ? this.configProvider = l().then((u) => u || {}) : (this.config = l ?? {}, this.configProvider = Promise.resolve(this.config)), wc.supported === void 0 && (wc.supported = typeof Request < "u" && "keepalive" in Nm("https://[::1]"));
  }
  static create(l) {
    return typeof (l == null ? void 0 : l.handle) == "function" ? l : new to(l);
  }
  destroy() {
  }
  async handle(l, { abortSignal: u, requestTimeout: r } = {}) {
    var $;
    this.config || (this.config = await this.configProvider);
    const o = r ?? this.config.requestTimeout, d = this.config.keepAlive === !0, y = this.config.credentials;
    if (u != null && u.aborted) {
      const Z = Um(u);
      return Promise.reject(Z);
    }
    let p = l.path;
    const g = CS(l.query || {});
    g && (p += `?${g}`), l.fragment && (p += `#${l.fragment}`);
    let h = "";
    if (l.username != null || l.password != null) {
      const Z = l.username ?? "", lt = l.password ?? "";
      h = `${Z}:${lt}@`;
    }
    const { port: b, method: S } = l, A = `${l.protocol}//${h}${l.hostname}${b ? `:${b}` : ""}${p}`, _ = S === "GET" || S === "HEAD" ? void 0 : l.body, z = {
      body: _,
      headers: new Headers(l.headers),
      method: S,
      credentials: y
    };
    ($ = this.config) != null && $.cache && (z.cache = this.config.cache), _ && (z.duplex = "half"), typeof AbortController < "u" && (z.signal = u), wc.supported && (z.keepalive = d), typeof this.config.requestInit == "function" && Object.assign(z, this.config.requestInit(l));
    let N = () => {
    };
    const j = Nm(A, z), q = [
      fetch(j).then((Z) => {
        const lt = Z.headers, ot = {};
        for (const I of lt.entries())
          ot[I[0]] = I[1];
        return Z.body != null ? {
          response: new ei({
            headers: ot,
            reason: Z.statusText,
            statusCode: Z.status,
            body: Z.body
          })
        } : Z.blob().then((I) => ({
          response: new ei({
            headers: ot,
            reason: Z.statusText,
            statusCode: Z.status,
            body: I
          })
        }));
      }),
      MS(o)
    ];
    return u && q.push(new Promise((Z, lt) => {
      const ot = () => {
        const ct = Um(u);
        lt(ct);
      };
      if (typeof u.addEventListener == "function") {
        const ct = u;
        ct.addEventListener("abort", ot, { once: !0 }), N = () => ct.removeEventListener("abort", ot);
      } else
        u.onabort = ot;
    })), Promise.race(q).finally(N);
  }
  updateHttpClientConfig(l, u) {
    this.config = void 0, this.configProvider = this.configProvider.then((r) => (r[l] = u, r));
  }
  httpHandlerConfigs() {
    return this.config ?? {};
  }
}
function Um(i) {
  const l = i && typeof i == "object" && "reason" in i ? i.reason : void 0;
  if (l) {
    if (l instanceof Error) {
      const o = new Error("Request aborted");
      return o.name = "AbortError", o.cause = l, o;
    }
    const r = new Error(String(l));
    return r.name = "AbortError", r;
  }
  const u = new Error("Request aborted");
  return u.name = "AbortError", u;
}
const OS = async (i) => {
  var l;
  return typeof Blob == "function" && i instanceof Blob || ((l = i.constructor) == null ? void 0 : l.name) === "Blob" ? Blob.prototype.arrayBuffer !== void 0 ? new Uint8Array(await i.arrayBuffer()) : zS(i) : DS(i);
};
async function zS(i) {
  const l = await xS(i), u = ks(l);
  return new Uint8Array(u);
}
async function DS(i) {
  const l = [], u = i.getReader();
  let r = !1, o = 0;
  for (; !r; ) {
    const { done: p, value: g } = await u.read();
    g && (l.push(g), o += g.length), r = p;
  }
  const d = new Uint8Array(o);
  let y = 0;
  for (const p of l)
    d.set(p, y), y += p.length;
  return d;
}
function xS(i) {
  return new Promise((l, u) => {
    const r = new FileReader();
    r.onloadend = () => {
      if (r.readyState !== 2)
        return u(new Error("Reader aborted too early"));
      const o = r.result ?? "", d = o.indexOf(","), y = d > -1 ? d + 1 : o.length;
      l(o.substring(y));
    }, r.onabort = () => u(new Error("Read aborted")), r.onerror = () => u(r.error), r.readAsDataURL(i);
  });
}
const vy = {}, $c = {};
for (let i = 0; i < 256; i++) {
  let l = i.toString(16).toLowerCase();
  l.length === 1 && (l = `0${l}`), vy[i] = l, $c[l] = i;
}
function NS(i) {
  if (i.length % 2 !== 0)
    throw new Error("Hex encoded strings must have an even number length");
  const l = new Uint8Array(i.length / 2);
  for (let u = 0; u < i.length; u += 2) {
    const r = i.slice(u, u + 2).toLowerCase();
    if (r in $c)
      l[u / 2] = $c[r];
    else
      throw new Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`);
  }
  return l;
}
function oa(i) {
  let l = "";
  for (let u = 0; u < i.byteLength; u++)
    l += vy[i[u]];
  return l;
}
const Zc = async (i = new Uint8Array(), l) => {
  if (i instanceof Uint8Array)
    return ra.mutate(i);
  if (!i)
    return ra.mutate(new Uint8Array());
  const u = l.streamCollector(i);
  return ra.mutate(await u);
}, Qs = (i) => typeof i == "function" ? i() : i, by = (i, l, u, r, o) => ({
  name: l,
  namespace: i,
  traits: u,
  input: r,
  output: o
}), US = (i) => (l, u) => async (r) => {
  var S, A, _, z;
  const { response: o } = await l(r), { operationSchema: d } = ai(u), [, y, p, g, h, b] = d ?? [];
  try {
    const N = await i.protocol.deserializeResponse(by(y, p, g, h, b), {
      ...i,
      ...u
    }, o);
    return {
      response: o,
      output: N
    };
  } catch (N) {
    if (Object.defineProperty(N, "$response", {
      value: o,
      enumerable: !1,
      writable: !1,
      configurable: !1
    }), !("$metadata" in N)) {
      const j = "Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.";
      try {
        N.message += `
  ` + j;
      } catch {
        !u.logger || ((A = (S = u.logger) == null ? void 0 : S.constructor) == null ? void 0 : A.name) === "NoOpLogger" ? console.warn(j) : (z = (_ = u.logger) == null ? void 0 : _.warn) == null || z.call(_, j);
      }
      typeof N.$responseBodyText < "u" && N.$response && (N.$response.body = N.$responseBodyText);
      try {
        if (ei.isInstance(o)) {
          const { headers: q = {} } = o, $ = Object.entries(q);
          N.$metadata = {
            httpStatusCode: o.statusCode,
            requestId: Cc(/^x-[\w-]+-request-?id$/, $),
            extendedRequestId: Cc(/^x-[\w-]+-id-2$/, $),
            cfId: Cc(/^x-[\w-]+-cf-id$/, $)
          };
        }
      } catch {
      }
    }
    throw N;
  }
}, Cc = (i, l) => (l.find(([u]) => u.match(i)) || [void 0, void 0])[1];
function HS(i) {
  const l = {};
  if (i = i.replace(/^\?/, ""), i)
    for (const u of i.split("&")) {
      let [r, o = null] = u.split("=");
      r = decodeURIComponent(r), o && (o = decodeURIComponent(o)), r in l ? Array.isArray(l[r]) ? l[r].push(o) : l[r] = [l[r], o] : l[r] = o;
    }
  return l;
}
const ni = (i) => {
  if (typeof i == "string")
    return ni(new URL(i));
  const { hostname: l, pathname: u, port: r, protocol: o, search: d } = i;
  let y;
  return d && (y = HS(d)), {
    hostname: l,
    port: r ? parseInt(r) : void 0,
    protocol: o,
    path: u,
    query: y
  };
}, BS = (i) => {
  if (typeof i == "object") {
    if ("url" in i) {
      const l = ni(i.url);
      if (i.headers) {
        l.headers = {};
        for (const u in i.headers)
          l.headers[u.toLowerCase()] = i.headers[u].join(", ");
      }
      return l;
    }
    return i;
  }
  return ni(i);
}, LS = (i) => (l, u) => async (r) => {
  const { operationSchema: o } = ai(u), [, d, y, p, g, h] = o ?? [], b = u.endpointV2 ? async () => BS(u.endpointV2) : i.endpoint, S = await i.protocol.serializeRequest(by(d, y, p, g, h), r.input, {
    ...i,
    ...u,
    endpoint: b
  });
  return l({
    ...r,
    request: S
  });
}, jS = {
  name: "deserializerMiddleware",
  step: "deserialize",
  tags: ["DESERIALIZER"],
  override: !0
}, qS = {
  name: "serializerMiddleware",
  step: "serialize",
  tags: ["SERIALIZER"],
  override: !0
};
function QS(i) {
  return {
    applyToStack: (l) => {
      l.add(LS(i), qS), l.add(US(i), jS), i.protocol.setSerdeContext(i);
    }
  };
}
const Mc = [];
function ll(i) {
  if (typeof i == "object")
    return i;
  if (i = i | 0, Mc[i])
    return Mc[i];
  const l = {};
  let u = 0;
  for (const r of [
    "httpLabel",
    "idempotent",
    "idempotencyToken",
    "sensitive",
    "httpPayload",
    "httpResponseCode",
    "httpQueryParams"
  ])
    (i >> u++ & 1) === 1 && (l[r] = 1);
  return Mc[i] = l;
}
const el = {
  it: Symbol.for("@smithy/nor-struct-it"),
  ns: Symbol.for("@smithy/ns")
}, Oc = [], zc = {}, Hn = class Hn {
  constructor(l, u) {
    M(this, "ref");
    M(this, "memberName");
    M(this, "symbol", Hn.symbol);
    M(this, "name");
    M(this, "schema");
    M(this, "_isMemberSchema");
    M(this, "traits");
    M(this, "memberTraits");
    M(this, "normalizedTraits");
    this.ref = l, this.memberName = u;
    const r = [];
    let o = l, d = l;
    for (this._isMemberSchema = !1; Dc(o); )
      r.push(o[1]), o = o[0], d = Qs(o), this._isMemberSchema = !0;
    if (r.length > 0) {
      this.memberTraits = {};
      for (let y = r.length - 1; y >= 0; --y) {
        const p = r[y];
        Object.assign(this.memberTraits, ll(p));
      }
    } else
      this.memberTraits = 0;
    if (d instanceof Hn) {
      const y = this.memberTraits;
      Object.assign(this, d), this.memberTraits = Object.assign({}, y, d.getMemberTraits(), this.getMemberTraits()), this.normalizedTraits = void 0, this.memberName = u ?? d.memberName;
      return;
    }
    if (this.schema = Qs(d), GS(this.schema) ? (this.name = `${this.schema[1]}#${this.schema[2]}`, this.traits = this.schema[3]) : (this.name = this.memberName ?? String(d), this.traits = 0), this._isMemberSchema && !u)
      throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(!0)} missing member name.`);
  }
  static [Symbol.hasInstance](l) {
    const u = this.prototype.isPrototypeOf(l);
    return !u && typeof l == "object" && l !== null ? l.symbol === this.symbol : u;
  }
  static of(l) {
    const u = typeof l == "function" || typeof l == "object" && l !== null;
    if (typeof l == "number") {
      if (Oc[l])
        return Oc[l];
    } else if (typeof l == "string") {
      if (zc[l])
        return zc[l];
    } else if (u && l[el.ns])
      return l[el.ns];
    const r = Qs(l);
    if (r instanceof Hn)
      return r;
    if (Dc(r)) {
      const [d, y] = r;
      if (d instanceof Hn)
        return Object.assign(d.getMergedTraits(), ll(y)), d;
      throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(l, null, 2)}.`);
    }
    const o = new Hn(r);
    return u ? l[el.ns] = o : typeof r == "string" ? zc[r] = o : typeof r == "number" ? Oc[r] = o : o;
  }
  getSchema() {
    const l = this.schema;
    return Array.isArray(l) && l[0] === 0 ? l[4] : l;
  }
  getName(l = !1) {
    const { name: u } = this;
    return !l && u && u.includes("#") ? u.split("#")[1] : u || void 0;
  }
  getMemberName() {
    return this.memberName;
  }
  isMemberSchema() {
    return this._isMemberSchema;
  }
  isListSchema() {
    const l = this.getSchema();
    return typeof l == "number" ? l >= 64 && l < 128 : l[0] === 1;
  }
  isMapSchema() {
    const l = this.getSchema();
    return typeof l == "number" ? l >= 128 && l <= 255 : l[0] === 2;
  }
  isStructSchema() {
    const l = this.getSchema();
    if (typeof l != "object")
      return !1;
    const u = l[0];
    return u === 3 || u === -3 || u === 4;
  }
  isUnionSchema() {
    const l = this.getSchema();
    return typeof l != "object" ? !1 : l[0] === 4;
  }
  isBlobSchema() {
    const l = this.getSchema();
    return l === 21 || l === 42;
  }
  isTimestampSchema() {
    const l = this.getSchema();
    return typeof l == "number" && l >= 4 && l <= 7;
  }
  isUnitSchema() {
    return this.getSchema() === "unit";
  }
  isDocumentSchema() {
    return this.getSchema() === 15;
  }
  isStringSchema() {
    return this.getSchema() === 0;
  }
  isBooleanSchema() {
    return this.getSchema() === 2;
  }
  isNumericSchema() {
    return this.getSchema() === 1;
  }
  isBigIntegerSchema() {
    return this.getSchema() === 17;
  }
  isBigDecimalSchema() {
    return this.getSchema() === 19;
  }
  isStreaming() {
    const { streaming: l } = this.getMergedTraits();
    return !!l || this.getSchema() === 42;
  }
  isIdempotencyToken() {
    return !!this.getMergedTraits().idempotencyToken;
  }
  getMergedTraits() {
    return this.normalizedTraits ?? (this.normalizedTraits = {
      ...this.getOwnTraits(),
      ...this.getMemberTraits()
    });
  }
  getMemberTraits() {
    return ll(this.memberTraits);
  }
  getOwnTraits() {
    return ll(this.traits);
  }
  getKeySchema() {
    const [l, u] = [this.isDocumentSchema(), this.isMapSchema()];
    if (!l && !u)
      throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(!0)}`);
    const r = this.getSchema(), o = l ? 15 : r[4] ?? 0;
    return nl([o, 0], "key");
  }
  getValueSchema() {
    const l = this.getSchema(), [u, r, o] = [this.isDocumentSchema(), this.isMapSchema(), this.isListSchema()], d = typeof l == "number" ? 63 & l : l && typeof l == "object" && (r || o) ? l[3 + l[0]] : u ? 15 : void 0;
    if (d != null)
      return nl([d, 0], r ? "value" : "member");
    throw new Error(`@smithy/core/schema - ${this.getName(!0)} has no value member.`);
  }
  getMemberSchema(l) {
    const u = this.getSchema();
    if (this.isStructSchema() && u[4].includes(l)) {
      const r = u[4].indexOf(l), o = u[5][r];
      return nl(Dc(o) ? o : [o, 0], l);
    }
    if (this.isDocumentSchema())
      return nl([15, 0], l);
    throw new Error(`@smithy/core/schema - ${this.getName(!0)} has no member=${l}.`);
  }
  getMemberSchemas() {
    const l = {};
    try {
      for (const [u, r] of this.structIterator())
        l[u] = r;
    } catch {
    }
    return l;
  }
  getEventStreamMember() {
    if (this.isStructSchema()) {
      for (const [l, u] of this.structIterator())
        if (u.isStreaming() && u.isStructSchema())
          return l;
    }
    return "";
  }
  *structIterator() {
    if (this.isUnitSchema())
      return;
    if (!this.isStructSchema())
      throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
    const l = this.getSchema(), u = l[4].length;
    let r = l[el.it];
    if (r && u === r.length) {
      yield* r;
      return;
    }
    r = Array(u);
    for (let o = 0; o < u; ++o) {
      const d = l[4][o], y = nl([l[5][o], 0], d);
      yield r[o] = [d, y];
    }
    l[el.it] = r;
  }
};
M(Hn, "symbol", Symbol.for("@smithy/nor"));
let ae = Hn;
function nl(i, l) {
  if (i instanceof ae)
    return Object.assign(i, {
      memberName: l,
      _isMemberSchema: !0
    });
  const u = ae;
  return new u(i, l);
}
const Dc = (i) => Array.isArray(i) && i.length === 2, GS = (i) => Array.isArray(i) && i.length >= 5, je = class je {
  constructor(l, u = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map()) {
    M(this, "namespace");
    M(this, "schemas");
    M(this, "exceptions");
    this.namespace = l, this.schemas = u, this.exceptions = r;
  }
  static for(l) {
    return je.registries.has(l) || je.registries.set(l, new je(l)), je.registries.get(l);
  }
  copyFrom(l) {
    const { schemas: u, exceptions: r } = this;
    for (const [o, d] of l.schemas)
      u.has(o) || u.set(o, d);
    for (const [o, d] of l.exceptions)
      r.has(o) || r.set(o, d);
  }
  register(l, u) {
    const r = this.normalizeShapeId(l);
    for (const o of [this, je.for(r.split("#")[0])])
      o.schemas.set(r, u);
  }
  getSchema(l) {
    const u = this.normalizeShapeId(l);
    if (!this.schemas.has(u))
      throw new Error(`@smithy/core/schema - schema not found for ${u}`);
    return this.schemas.get(u);
  }
  registerError(l, u) {
    const r = l, o = r[1];
    for (const d of [this, je.for(o)])
      d.schemas.set(o + "#" + r[2], r), d.exceptions.set(r, u);
  }
  getErrorCtor(l) {
    const u = l;
    return this.exceptions.has(u) ? this.exceptions.get(u) : je.for(u[1]).exceptions.get(u);
  }
  getBaseException() {
    for (const l of this.exceptions.keys())
      if (Array.isArray(l)) {
        const [, u, r] = l, o = u + "#" + r;
        if (o.startsWith("smithy.ts.sdk.synthetic.") && o.endsWith("ServiceException"))
          return l;
      }
  }
  find(l) {
    for (const u of this.schemas.values())
      if (l(u))
        return u;
  }
  clear() {
    this.schemas.clear(), this.exceptions.clear();
  }
  normalizeShapeId(l) {
    return l.includes("#") ? l : this.namespace + "#" + l;
  }
};
M(je, "registries", /* @__PURE__ */ new Map());
let da = je;
const Kc = (i) => {
  if (i != null) {
    if (typeof i == "string") {
      const l = parseFloat(i);
      if (!Number.isNaN(l))
        return String(l) !== String(i) && IS.warn(kS(`Expected number but observed string: ${i}`)), l;
    }
    if (typeof i == "number")
      return i;
    throw new TypeError(`Expected number, got ${typeof i}: ${i}`);
  }
}, YS = Math.ceil(2 ** 127 * (2 - 2 ** -23)), Hm = (i) => {
  const l = Kc(i);
  if (l !== void 0 && !Number.isNaN(l) && l !== 1 / 0 && l !== -1 / 0 && Math.abs(l) > YS)
    throw new TypeError(`Expected 32-bit float, got ${i}`);
  return l;
}, XS = (i) => {
  if (i != null) {
    if (Number.isInteger(i) && !Number.isNaN(i))
      return i;
    throw new TypeError(`Expected integer, got ${typeof i}: ${i}`);
  }
}, Bm = (i) => Ey(i, 16), Lm = (i) => Ey(i, 8), Ey = (i, l) => {
  const u = XS(i);
  if (u !== void 0 && VS(u, l) !== u)
    throw new TypeError(`Expected ${l}-bit integer, got ${i}`);
  return u;
}, VS = (i, l) => {
  switch (l) {
    case 32:
      return Int32Array.of(i)[0];
    case 16:
      return Int16Array.of(i)[0];
    case 8:
      return Int8Array.of(i)[0];
  }
}, $S = (i) => Kc(typeof i == "string" ? Fs(i) : i), ZS = (i) => Hm(typeof i == "string" ? Fs(i) : i), KS = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g, Fs = (i) => {
  const l = i.match(KS);
  if (l === null || l[0].length !== i.length)
    throw new TypeError("Expected real number, got implicit NaN");
  return parseFloat(i);
}, $s = (i) => Bm(typeof i == "string" ? Fs(i) : i), JS = (i) => Lm(typeof i == "string" ? Fs(i) : i), kS = (i) => String(new TypeError(i).stack || i).split(`
`).slice(0, 5).filter((l) => !l.includes("stackTraceWarning")).join(`
`), IS = {
  warn: console.warn
}, FS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], eo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function WS(i) {
  const l = i.getUTCFullYear(), u = i.getUTCMonth(), r = i.getUTCDay(), o = i.getUTCDate(), d = i.getUTCHours(), y = i.getUTCMinutes(), p = i.getUTCSeconds(), g = o < 10 ? `0${o}` : `${o}`, h = d < 10 ? `0${d}` : `${d}`, b = y < 10 ? `0${y}` : `${y}`, S = p < 10 ? `0${p}` : `${p}`;
  return `${FS[r]}, ${g} ${eo[u]} ${l} ${h}:${b}:${S} GMT`;
}
const PS = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/), tv = (i) => {
  if (i == null)
    return;
  if (typeof i != "string")
    throw new TypeError("RFC-3339 date-times must be expressed as strings");
  const l = PS.exec(i);
  if (!l)
    throw new TypeError("Invalid RFC-3339 date-time value");
  const [u, r, o, d, y, p, g, h, b] = l, S = $s(hl(r)), A = jn(o, "month", 1, 12), _ = jn(d, "day", 1, 31), z = Gs(S, A, _, { hours: y, minutes: p, seconds: g, fractionalMilliseconds: h });
  return b.toUpperCase() != "Z" && z.setTime(z.getTime() - dv(b)), z;
}, ev = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/), nv = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/), av = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/), Ty = (i) => {
  if (i == null)
    return;
  if (typeof i != "string")
    throw new TypeError("RFC-7231 date-times must be expressed as strings");
  let l = ev.exec(i);
  if (l) {
    const [u, r, o, d, y, p, g, h] = l;
    return Gs($s(hl(d)), xc(o), jn(r, "day", 1, 31), { hours: y, minutes: p, seconds: g, fractionalMilliseconds: h });
  }
  if (l = nv.exec(i), l) {
    const [u, r, o, d, y, p, g, h] = l;
    return uv(Gs(lv(d), xc(o), jn(r, "day", 1, 31), {
      hours: y,
      minutes: p,
      seconds: g,
      fractionalMilliseconds: h
    }));
  }
  if (l = av.exec(i), l) {
    const [u, r, o, d, y, p, g, h] = l;
    return Gs($s(hl(h)), xc(r), jn(o.trimLeft(), "day", 1, 31), { hours: d, minutes: y, seconds: p, fractionalMilliseconds: g });
  }
  throw new TypeError("Invalid RFC-7231 date-time value");
}, iv = (i) => {
  if (i == null)
    return;
  let l;
  if (typeof i == "number")
    l = i;
  else if (typeof i == "string")
    l = $S(i);
  else if (typeof i == "object" && i.tag === 1)
    l = i.value;
  else
    throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
  if (Number.isNaN(l) || l === 1 / 0 || l === -1 / 0)
    throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
  return new Date(Math.round(l * 1e3));
}, Gs = (i, l, u, r) => {
  const o = l - 1;
  return cv(i, o, u), new Date(Date.UTC(i, o, u, jn(r.hours, "hour", 0, 23), jn(r.minutes, "minute", 0, 59), jn(r.seconds, "seconds", 0, 60), fv(r.fractionalMilliseconds)));
}, lv = (i) => {
  const l = (/* @__PURE__ */ new Date()).getUTCFullYear(), u = Math.floor(l / 100) * 100 + $s(hl(i));
  return u < l ? u + 100 : u;
}, sv = 50 * 365 * 24 * 60 * 60 * 1e3, uv = (i) => i.getTime() - (/* @__PURE__ */ new Date()).getTime() > sv ? new Date(Date.UTC(i.getUTCFullYear() - 100, i.getUTCMonth(), i.getUTCDate(), i.getUTCHours(), i.getUTCMinutes(), i.getUTCSeconds(), i.getUTCMilliseconds())) : i, xc = (i) => {
  const l = eo.indexOf(i);
  if (l < 0)
    throw new TypeError(`Invalid month: ${i}`);
  return l + 1;
}, rv = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], cv = (i, l, u) => {
  let r = rv[l];
  if (l === 1 && ov(i) && (r = 29), u > r)
    throw new TypeError(`Invalid day for ${eo[l]} in ${i}: ${u}`);
}, ov = (i) => i % 4 === 0 && (i % 100 !== 0 || i % 400 === 0), jn = (i, l, u, r) => {
  const o = JS(hl(i));
  if (o < u || o > r)
    throw new TypeError(`${l} must be between ${u} and ${r}, inclusive`);
  return o;
}, fv = (i) => i == null ? 0 : ZS("0." + i) * 1e3, dv = (i) => {
  const l = i[0];
  let u = 1;
  if (l == "+")
    u = 1;
  else if (l == "-")
    u = -1;
  else
    throw new TypeError(`Offset direction, ${l}, must be "+" or "-"`);
  const r = Number(i.substring(1, 3)), o = Number(i.substring(4, 6));
  return u * (r * 60 + o) * 60 * 1e3;
}, hl = (i) => {
  let l = 0;
  for (; l < i.length - 1 && i.charAt(l) === "0"; )
    l++;
  return l === 0 ? i : i.slice(l);
}, jm = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Zt = Array.from({ length: 256 }, (i, l) => l.toString(16).padStart(2, "0")), Ay = () => {
  if (jm)
    return jm();
  const i = new Uint8Array(16);
  return crypto.getRandomValues(i), i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, Zt[i[0]] + Zt[i[1]] + Zt[i[2]] + Zt[i[3]] + "-" + Zt[i[4]] + Zt[i[5]] + "-" + Zt[i[6]] + Zt[i[7]] + "-" + Zt[i[8]] + Zt[i[9]] + "-" + Zt[i[10]] + Zt[i[11]] + Zt[i[12]] + Zt[i[13]] + Zt[i[14]] + Zt[i[15]];
}, Ln = function(l) {
  return Object.assign(new String(l), {
    deserializeJSON() {
      return JSON.parse(String(l));
    },
    toString() {
      return String(l);
    },
    toJSON() {
      return String(l);
    }
  });
};
Ln.from = (i) => i && typeof i == "object" && (i instanceof Ln || "deserializeJSON" in i) ? i : typeof i == "string" || Object.getPrototypeOf(i) === String.prototype ? Ln(String(i)) : Ln(JSON.stringify(i));
Ln.fromObject = Ln.from;
const qm = /^-?\d*(\.\d+)?$/;
class qe {
  constructor(l, u) {
    M(this, "string");
    M(this, "type");
    if (this.string = l, this.type = u, !qm.test(l))
      throw new Error('@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".');
  }
  toString() {
    return this.string;
  }
  static [Symbol.hasInstance](l) {
    if (!l || typeof l != "object")
      return !1;
    const u = l;
    return qe.prototype.isPrototypeOf(l) || u.type === "bigDecimal" && qm.test(u.string);
  }
}
class hv {
  constructor() {
    M(this, "serdeContext");
  }
  setSerdeContext(l) {
    this.serdeContext = l;
  }
}
class mv extends hv {
  constructor(u) {
    super();
    M(this, "options");
    M(this, "compositeErrorRegistry");
    this.options = u, this.compositeErrorRegistry = da.for(u.defaultNamespace);
    for (const r of u.errorTypeRegistries ?? [])
      this.compositeErrorRegistry.copyFrom(r);
  }
  getRequestType() {
    return ye;
  }
  getResponseType() {
    return ei;
  }
  setSerdeContext(u) {
    this.serdeContext = u, this.serializer.setSerdeContext(u), this.deserializer.setSerdeContext(u), this.getPayloadCodec() && this.getPayloadCodec().setSerdeContext(u);
  }
  updateServiceEndpoint(u, r) {
    if ("url" in r) {
      u.protocol = r.url.protocol, u.hostname = r.url.hostname, u.port = r.url.port ? Number(r.url.port) : void 0, u.path = r.url.pathname, u.fragment = r.url.hash || void 0, u.username = r.url.username || void 0, u.password = r.url.password || void 0, u.query || (u.query = {});
      for (const [o, d] of r.url.searchParams.entries())
        u.query[o] = d;
      if (r.headers)
        for (const o in r.headers)
          u.headers[o] = r.headers[o].join(", ");
      return u;
    } else {
      if (u.protocol = r.protocol, u.hostname = r.hostname, u.port = r.port ? Number(r.port) : void 0, u.path = r.path, u.query = {
        ...r.query
      }, r.headers)
        for (const o in r.headers)
          u.headers[o] = r.headers[o];
      return u;
    }
  }
  setHostPrefix(u, r, o) {
    var p, g;
    if ((p = this.serdeContext) != null && p.disableHostPrefix)
      return;
    const d = ae.of(r.input), y = ll(r.traits ?? {});
    if (y.endpoint) {
      let h = (g = y.endpoint) == null ? void 0 : g[0];
      if (typeof h == "string") {
        for (const [b, S] of d.structIterator()) {
          if (!S.getMergedTraits().hostLabel)
            continue;
          const A = o[b];
          if (typeof A != "string")
            throw new Error(`@smithy/core/schema - ${b} in input must be a string as hostLabel.`);
          h = h.replace(`{${b}}`, A);
        }
        u.hostname = h + u.hostname;
      }
    }
  }
  deserializeMetadata(u) {
    return {
      httpStatusCode: u.statusCode,
      requestId: u.headers["x-amzn-requestid"] ?? u.headers["x-amzn-request-id"] ?? u.headers["x-amz-request-id"],
      extendedRequestId: u.headers["x-amz-id-2"],
      cfId: u.headers["x-amz-cf-id"]
    };
  }
  async serializeEventStream({ eventStream: u, requestSchema: r, initialRequest: o }) {
    return (await this.loadEventStreamCapability()).serializeEventStream({
      eventStream: u,
      requestSchema: r,
      initialRequest: o
    });
  }
  async deserializeEventStream({ response: u, responseSchema: r, initialResponseContainer: o }) {
    return (await this.loadEventStreamCapability()).deserializeEventStream({
      response: u,
      responseSchema: r,
      initialResponseContainer: o
    });
  }
  async loadEventStreamCapability() {
    const { EventStreamSerde: u } = await Promise.resolve().then(() => gA);
    return new u({
      marshaller: this.getEventStreamMarshaller(),
      serializer: this.serializer,
      deserializer: this.deserializer,
      serdeContext: this.serdeContext,
      defaultContentType: this.getDefaultContentType()
    });
  }
  getDefaultContentType() {
    throw new Error(`@smithy/core/protocols - ${this.constructor.name} getDefaultContentType() implementation missing.`);
  }
  async deserializeHttpMessage(u, r, o, d, y) {
    return [];
  }
  getEventStreamMarshaller() {
    const u = this.serdeContext;
    if (!u.eventStreamMarshaller)
      throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
    return u.eventStreamMarshaller;
  }
}
class yv extends mv {
  async serializeRequest(l, u, r) {
    const o = this.serializer, d = {}, y = {}, p = await r.endpoint(), g = ae.of(l == null ? void 0 : l.input), h = g.getSchema();
    let b;
    const S = u && typeof u == "object" ? u : {}, A = new ye({
      protocol: "",
      hostname: "",
      port: void 0,
      path: "/",
      fragment: void 0,
      query: d,
      headers: y,
      body: void 0
    });
    if (p && (this.updateServiceEndpoint(A, p), this.setHostPrefix(A, l, S)), S) {
      const _ = g.getEventStreamMember();
      if (_) {
        if (S[_]) {
          const z = {};
          for (const [N, j] of g.structIterator())
            N !== _ && S[N] && (o.write(j, S[N]), z[N] = o.flush());
          b = await this.serializeEventStream({
            eventStream: S[_],
            requestSchema: g,
            initialRequest: z
          });
        }
      } else
        o.write(h, S), b = o.flush();
    }
    return A.headers = Object.assign(A.headers, y), A.query = d, A.body = b, A.method = "POST", A;
  }
  async deserializeResponse(l, u, r) {
    const o = this.deserializer, d = ae.of(l.output), y = {};
    if (r.statusCode >= 300) {
      const g = await Zc(r.body, u);
      throw g.byteLength > 0 && Object.assign(y, await o.read(15, g)), await this.handleError(l, u, r, y, this.deserializeMetadata(r)), new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
    }
    for (const g in r.headers) {
      const h = r.headers[g];
      delete r.headers[g], r.headers[g.toLowerCase()] = h;
    }
    const p = d.getEventStreamMember();
    if (p)
      y[p] = await this.deserializeEventStream({
        response: r,
        responseSchema: d,
        initialResponseContainer: y
      });
    else {
      const g = await Zc(r.body, u);
      g.byteLength > 0 && Object.assign(y, await o.read(d, g));
    }
    return y.$metadata = this.deserializeMetadata(r), y;
  }
}
function Ry(i, l) {
  if (l.timestampFormat.useTrait && i.isTimestampSchema() && (i.getSchema() === 5 || i.getSchema() === 6 || i.getSchema() === 7))
    return i.getSchema();
  const { httpLabel: u, httpPrefixHeaders: r, httpHeader: o, httpQuery: d } = i.getMergedTraits();
  return (l.httpBindings ? typeof r == "string" || o ? 6 : d || u ? 5 : void 0 : void 0) ?? l.timestampFormat.default;
}
function gv(i, l, u) {
  i.__smithy_context ? i.__smithy_context.features || (i.__smithy_context.features = {}) : i.__smithy_context = {
    features: {}
  }, i.__smithy_context.features[l] = u;
}
class pv {
  constructor(l) {
    M(this, "authSchemes", /* @__PURE__ */ new Map());
    for (const u in l) {
      const r = l[u];
      r !== void 0 && this.authSchemes.set(u, r);
    }
  }
  getIdentityProvider(l) {
    return this.authSchemes.get(l);
  }
}
const Sv = (i) => function(u) {
  return _y(u) && u.expiration.getTime() - Date.now() < i;
}, vv = 3e5, bv = Sv(vv), _y = (i) => i.expiration !== void 0, Ev = (i, l, u) => {
  if (i === void 0)
    return;
  const r = typeof i != "function" ? async () => Promise.resolve(i) : i;
  let o, d, y, p = !1;
  const g = async (h) => {
    d || (d = r(h));
    try {
      o = await d, y = !0, p = !1;
    } finally {
      d = void 0;
    }
    return o;
  };
  return l === void 0 ? async (h) => ((!y || h != null && h.forceRefresh) && (o = await g(h)), o) : async (h) => ((!y || h != null && h.forceRefresh) && (o = await g(h)), p ? o : u(o) ? (l(o) && await g(h), o) : (p = !0, o));
}, Tv = void 0;
function Av(i) {
  return i === void 0 ? !0 : typeof i == "string" && i.length <= 50;
}
function Rv(i) {
  const l = sl(i.userAgentAppId ?? Tv), { customUserAgent: u } = i;
  return Object.assign(i, {
    customUserAgent: typeof u == "string" ? [[u]] : u,
    userAgentAppId: async () => {
      var o, d;
      const r = await l();
      if (!Av(r)) {
        const y = ((d = (o = i.logger) == null ? void 0 : o.constructor) == null ? void 0 : d.name) === "NoOpLogger" || !i.logger ? console : i.logger;
        typeof r != "string" ? y == null || y.warn("userAgentAppId must be a string or undefined.") : r.length > 50 && (y == null || y.warn("The provided userAgentAppId exceeds the maximum length of 50 characters."));
      }
      return r;
    }
  });
}
class no {
  constructor(l, u, r, o) {
    M(this, "nodes");
    M(this, "root");
    M(this, "conditions");
    M(this, "results");
    this.nodes = l, this.root = u, this.conditions = r, this.results = o;
  }
  static from(l, u, r, o) {
    return new no(l, u, r, o);
  }
}
class _v {
  constructor({ size: l, params: u }) {
    M(this, "capacity");
    M(this, "data", /* @__PURE__ */ new Map());
    M(this, "parameters", []);
    this.capacity = l ?? 50, u && (this.parameters = u);
  }
  get(l, u) {
    const r = this.hash(l);
    if (r === !1)
      return u();
    if (!this.data.has(r)) {
      if (this.data.size > this.capacity + 10) {
        const o = this.data.keys();
        let d = 0;
        for (; ; ) {
          const { value: y, done: p } = o.next();
          if (this.data.delete(y), p || ++d > 10)
            break;
        }
      }
      this.data.set(r, u());
    }
    return this.data.get(r);
  }
  size() {
    return this.data.size;
  }
  hash(l) {
    let u = "";
    const { parameters: r } = this;
    if (r.length === 0)
      return !1;
    for (const o of r) {
      const d = String(l[o] ?? "");
      if (d.includes("|;"))
        return !1;
      u += d + "|;";
    }
    return u;
  }
}
class xe extends Error {
  constructor(l) {
    super(l), this.name = "EndpointError";
  }
}
const wv = "endpoints";
function Zs(i) {
  return typeof i != "object" || i == null ? i : "ref" in i ? `$${Zs(i.ref)}` : "fn" in i ? `${i.fn}(${(i.argv || []).map(Zs).join(", ")})` : JSON.stringify(i, null, 2);
}
const ao = {}, Cv = (i, l) => i === l;
function Mv(...i) {
  for (const l of i)
    if (l != null)
      return l;
}
const Ov = (i) => {
  const l = i.split("."), u = [];
  for (const r of l) {
    const o = r.indexOf("[");
    if (o !== -1) {
      if (r.indexOf("]") !== r.length - 1)
        throw new xe(`Path: '${i}' does not end with ']'`);
      const d = r.slice(o + 1, -1);
      if (Number.isNaN(parseInt(d)))
        throw new xe(`Invalid array index: '${d}' in path: '${i}'`);
      o !== 0 && u.push(r.slice(0, o)), u.push(d);
    } else
      u.push(r);
  }
  return u;
}, wy = (i, l) => Ov(l).reduce((u, r) => {
  if (typeof u != "object")
    throw new xe(`Index '${r}' in '${l}' not found in '${JSON.stringify(i)}'`);
  if (Array.isArray(u)) {
    const o = parseInt(r);
    return u[o < 0 ? u.length + o : o];
  }
  return u[r];
}, i), zv = (i) => i != null, Dv = new RegExp("^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$"), Ws = (i, l = !1) => {
  if (!l)
    return Dv.test(i);
  const u = i.split(".");
  for (const r of u)
    if (!Ws(r))
      return !1;
  return !0;
};
function xv(i, l, u) {
  return i ? l : u;
}
const Nv = (i) => !i, Uv = new RegExp("^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$"), Cy = (i) => Uv.test(i) || i.startsWith("[") && i.endsWith("]"), Nc = {
  [ol.HTTP]: 80,
  [ol.HTTPS]: 443
}, Hv = (i) => {
  const l = (() => {
    try {
      if (i instanceof URL)
        return i;
      if (typeof i == "object" && "hostname" in i) {
        const { hostname: A, port: _, protocol: z = "", path: N = "", query: j = {} } = i, q = new URL(`${z}//${A}${_ ? `:${_}` : ""}${N}`);
        return q.search = Object.entries(j).map(([$, Z]) => `${$}=${Z}`).join("&"), q;
      }
      return new URL(i);
    } catch {
      return null;
    }
  })();
  if (!l)
    return console.error(`Unable to parse ${JSON.stringify(i)} as a whatwg URL.`), null;
  const u = l.href, { host: r, hostname: o, pathname: d, protocol: y, search: p } = l;
  if (p)
    return null;
  const g = y.slice(0, -1);
  if (!Object.values(ol).includes(g))
    return null;
  const h = Cy(o), b = u.includes(`${r}:${Nc[g]}`) || typeof i == "string" && i.includes(`${r}:${Nc[g]}`), S = `${r}${b ? `:${Nc[g]}` : ""}`;
  return {
    scheme: g,
    authority: S,
    path: d,
    normalizedPath: d.endsWith("/") ? d : `${d}/`,
    isIp: h
  };
};
function Bv(i, l, u) {
  if (u === 1)
    return [i];
  if (i === "")
    return [""];
  const r = i.split(l);
  return u === 0 ? r : r.slice(0, u - 1).concat(r.slice(1).join(l));
}
const Lv = (i, l) => i === l, jv = (i, l, u, r) => i == null || l >= u || i.length < u || /[^\u0000-\u007f]/.test(i) ? null : r ? i.substring(i.length - u, i.length - l) : i.substring(l, u), qv = (i) => encodeURIComponent(i).replace(/[!*'()]/g, (l) => `%${l.charCodeAt(0).toString(16).toUpperCase()}`), Qv = {
  booleanEquals: Cv,
  coalesce: Mv,
  getAttr: wy,
  isSet: zv,
  isValidHostLabel: Ws,
  ite: xv,
  not: Nv,
  parseURL: Hv,
  split: Bv,
  stringEquals: Lv,
  substring: jv,
  uriEncode: qv
}, My = (i, l) => {
  const u = [], { referenceRecord: r, endpointParams: o } = l;
  let d = 0;
  for (; d < i.length; ) {
    const y = i.indexOf("{", d);
    if (y === -1) {
      u.push(i.slice(d));
      break;
    }
    u.push(i.slice(d, y));
    const p = i.indexOf("}", y);
    if (p === -1) {
      u.push(i.slice(y));
      break;
    }
    i[y + 1] === "{" && i[p + 1] === "}" && (u.push(i.slice(y + 1, p)), d = p + 2);
    const g = i.substring(y + 1, p);
    if (g.includes("#")) {
      const [h, b] = g.split("#");
      u.push(wy(r[h] ?? o[h], b));
    } else
      u.push(r[g] ?? o[g]);
    d = p + 1;
  }
  return u.join("");
}, Gv = ({ ref: i }, l) => l.referenceRecord[i] ?? l.endpointParams[i], Ps = (i, l, u) => {
  if (typeof i == "string")
    return My(i, u);
  if (i.fn)
    return zy.callFunction(i, u);
  if (i.ref)
    return Gv(i, u);
  throw new xe(`'${l}': ${String(i)} is not a string, function or reference.`);
}, Oy = ({ fn: i, argv: l }, u) => {
  const r = Array(l.length);
  for (let y = 0; y < r.length; ++y) {
    const p = l[y];
    typeof p == "boolean" || typeof p == "number" ? r[y] = p : r[y] = zy.evaluateExpression(p, "arg", u);
  }
  const o = i.indexOf(".");
  if (o !== -1) {
    const y = ao[i.slice(0, o)], p = y == null ? void 0 : y[i.slice(o + 1)];
    if (typeof p == "function")
      return p(...r);
  }
  const d = Qv[i];
  if (typeof d == "function")
    return d(...r);
  throw new Error(`function ${i} not loaded in endpointFunctions.`);
}, zy = {
  evaluateExpression: Ps,
  callFunction: Oy
}, Yv = (i, l) => {
  var d, y;
  const { assign: u } = i;
  if (u && u in l.referenceRecord)
    throw new xe(`'${u}' is already defined in Reference Record.`);
  const r = Oy(i, l);
  (y = (d = l.logger) == null ? void 0 : d.debug) == null || y.call(d, `${wv} evaluateCondition: ${Zs(i)} = ${Zs(r)}`);
  const o = r === "" ? !0 : !!r;
  return u != null ? { result: o, toAssign: { name: u, value: r } } : { result: o };
}, Xv = (i, l) => Object.entries(i ?? {}).reduce((u, [r, o]) => (u[r] = o.map((d) => {
  const y = Ps(d, "Header value entry", l);
  if (typeof y != "string")
    throw new xe(`Header '${r}' value '${y}' is not a string`);
  return y;
}), u), {}), Dy = (i, l) => Object.entries(i).reduce((u, [r, o]) => (u[r] = Ny.getEndpointProperty(o, l), u), {}), xy = (i, l) => {
  if (Array.isArray(i))
    return i.map((u) => xy(u, l));
  switch (typeof i) {
    case "string":
      return My(i, l);
    case "object":
      if (i === null)
        throw new xe(`Unexpected endpoint property: ${i}`);
      return Ny.getEndpointProperties(i, l);
    case "boolean":
      return i;
    default:
      throw new xe(`Unexpected endpoint property type: ${typeof i}`);
  }
}, Ny = {
  getEndpointProperty: xy,
  getEndpointProperties: Dy
}, Vv = (i, l) => {
  const u = Ps(i, "Endpoint URL", l);
  if (typeof u == "string")
    try {
      return new URL(u);
    } catch (r) {
      throw console.error(`Failed to construct URL with ${u}`, r), r;
    }
  throw new xe(`Endpoint URL must be a string, got ${typeof u}`);
}, Uc = 1e8, $v = (i, l) => {
  const { nodes: u, root: r, results: o, conditions: d } = i;
  let y = r;
  const p = {}, g = {
    referenceRecord: p,
    endpointParams: l.endpointParams,
    logger: l.logger
  };
  for (; y !== 1 && y !== -1 && y < Uc; ) {
    const h = 3 * (Math.abs(y) - 1), [b, S, A] = [u[h], u[h + 1], u[h + 2]], [_, z, N] = d[b], j = Yv({ fn: _, assign: N, argv: z }, g);
    if (j.toAssign) {
      const { name: q, value: $ } = j.toAssign;
      p[q] = $;
    }
    y = y >= 0 === j.result ? S : A;
  }
  if (y >= Uc) {
    const h = o[y - Uc];
    if (h[0] === -1) {
      const [, _] = h;
      throw new xe(Ps(_, "Error", g));
    }
    const [b, S, A] = h;
    return {
      url: Vv(b, g),
      properties: Dy(S, g),
      headers: Xv(A ?? {}, g)
    };
  }
  throw new xe("No matching endpoint.");
}, Uy = (i, l = !1) => {
  if (l) {
    for (const u of i.split("."))
      if (!Uy(u))
        return !1;
    return !0;
  }
  return !(!Ws(i) || i.length < 3 || i.length > 63 || i !== i.toLowerCase() || Cy(i));
}, Qm = ":", Zv = "/", Kv = (i) => {
  const l = i.split(Qm);
  if (l.length < 6)
    return null;
  const [u, r, o, d, y, ...p] = l;
  if (u !== "arn" || r === "" || o === "" || p.join(Qm) === "")
    return null;
  const g = p.map((h) => h.split(Zv)).flat();
  return {
    partition: r,
    service: o,
    region: d,
    accountId: y,
    resourceId: g
  };
}, Jv = [{ id: "aws", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-east-1", name: "aws", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$", regions: { "af-south-1": { description: "Africa (Cape Town)" }, "ap-east-1": { description: "Asia Pacific (Hong Kong)" }, "ap-east-2": { description: "Asia Pacific (Taipei)" }, "ap-northeast-1": { description: "Asia Pacific (Tokyo)" }, "ap-northeast-2": { description: "Asia Pacific (Seoul)" }, "ap-northeast-3": { description: "Asia Pacific (Osaka)" }, "ap-south-1": { description: "Asia Pacific (Mumbai)" }, "ap-south-2": { description: "Asia Pacific (Hyderabad)" }, "ap-southeast-1": { description: "Asia Pacific (Singapore)" }, "ap-southeast-2": { description: "Asia Pacific (Sydney)" }, "ap-southeast-3": { description: "Asia Pacific (Jakarta)" }, "ap-southeast-4": { description: "Asia Pacific (Melbourne)" }, "ap-southeast-5": { description: "Asia Pacific (Malaysia)" }, "ap-southeast-6": { description: "Asia Pacific (New Zealand)" }, "ap-southeast-7": { description: "Asia Pacific (Thailand)" }, "aws-global": { description: "aws global region" }, "ca-central-1": { description: "Canada (Central)" }, "ca-west-1": { description: "Canada West (Calgary)" }, "eu-central-1": { description: "Europe (Frankfurt)" }, "eu-central-2": { description: "Europe (Zurich)" }, "eu-north-1": { description: "Europe (Stockholm)" }, "eu-south-1": { description: "Europe (Milan)" }, "eu-south-2": { description: "Europe (Spain)" }, "eu-west-1": { description: "Europe (Ireland)" }, "eu-west-2": { description: "Europe (London)" }, "eu-west-3": { description: "Europe (Paris)" }, "il-central-1": { description: "Israel (Tel Aviv)" }, "me-central-1": { description: "Middle East (UAE)" }, "me-south-1": { description: "Middle East (Bahrain)" }, "mx-central-1": { description: "Mexico (Central)" }, "sa-east-1": { description: "South America (Sao Paulo)" }, "us-east-1": { description: "US East (N. Virginia)" }, "us-east-2": { description: "US East (Ohio)" }, "us-west-1": { description: "US West (N. California)" }, "us-west-2": { description: "US West (Oregon)" } } }, { id: "aws-cn", outputs: { dnsSuffix: "amazonaws.com.cn", dualStackDnsSuffix: "api.amazonwebservices.com.cn", implicitGlobalRegion: "cn-northwest-1", name: "aws-cn", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^cn\\-\\w+\\-\\d+$", regions: { "aws-cn-global": { description: "aws-cn global region" }, "cn-north-1": { description: "China (Beijing)" }, "cn-northwest-1": { description: "China (Ningxia)" } } }, { id: "aws-eusc", outputs: { dnsSuffix: "amazonaws.eu", dualStackDnsSuffix: "api.amazonwebservices.eu", implicitGlobalRegion: "eusc-de-east-1", name: "aws-eusc", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^eusc\\-(de)\\-\\w+\\-\\d+$", regions: { "eusc-de-east-1": { description: "AWS European Sovereign Cloud (Germany)" } } }, { id: "aws-iso", outputs: { dnsSuffix: "c2s.ic.gov", dualStackDnsSuffix: "api.aws.ic.gov", implicitGlobalRegion: "us-iso-east-1", name: "aws-iso", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-iso\\-\\w+\\-\\d+$", regions: { "aws-iso-global": { description: "aws-iso global region" }, "us-iso-east-1": { description: "US ISO East" }, "us-iso-west-1": { description: "US ISO WEST" } } }, { id: "aws-iso-b", outputs: { dnsSuffix: "sc2s.sgov.gov", dualStackDnsSuffix: "api.aws.scloud", implicitGlobalRegion: "us-isob-east-1", name: "aws-iso-b", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-isob\\-\\w+\\-\\d+$", regions: { "aws-iso-b-global": { description: "aws-iso-b global region" }, "us-isob-east-1": { description: "US ISOB East (Ohio)" }, "us-isob-west-1": { description: "US ISOB West" } } }, { id: "aws-iso-e", outputs: { dnsSuffix: "cloud.adc-e.uk", dualStackDnsSuffix: "api.cloud-aws.adc-e.uk", implicitGlobalRegion: "eu-isoe-west-1", name: "aws-iso-e", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$", regions: { "aws-iso-e-global": { description: "aws-iso-e global region" }, "eu-isoe-west-1": { description: "EU ISOE West" } } }, { id: "aws-iso-f", outputs: { dnsSuffix: "csp.hci.ic.gov", dualStackDnsSuffix: "api.aws.hci.ic.gov", implicitGlobalRegion: "us-isof-south-1", name: "aws-iso-f", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-isof\\-\\w+\\-\\d+$", regions: { "aws-iso-f-global": { description: "aws-iso-f global region" }, "us-isof-east-1": { description: "US ISOF EAST" }, "us-isof-south-1": { description: "US ISOF SOUTH" } } }, { id: "aws-us-gov", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-gov-west-1", name: "aws-us-gov", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-gov\\-\\w+\\-\\d+$", regions: { "aws-us-gov-global": { description: "aws-us-gov global region" }, "us-gov-east-1": { description: "AWS GovCloud (US-East)" }, "us-gov-west-1": { description: "AWS GovCloud (US-West)" } } }], kv = {
  partitions: Jv
};
let Iv = kv;
const Fv = (i) => {
  const { partitions: l } = Iv;
  for (const r of l) {
    const { regions: o, outputs: d } = r;
    for (const [y, p] of Object.entries(o))
      if (y === i)
        return {
          ...d,
          ...p
        };
  }
  for (const r of l) {
    const { regionRegex: o, outputs: d } = r;
    if (new RegExp(o).test(i))
      return {
        ...d
      };
  }
  const u = l.find((r) => r.id === "aws");
  if (!u)
    throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
  return {
    ...u.outputs
  };
}, Hy = {
  isVirtualHostableS3Bucket: Uy,
  parseArn: Kv,
  partition: Fv
};
ao.aws = Hy;
function Wv(i, l, u) {
  return i.$source || (i.$source = {}), i.$source[l] = u, i;
}
function sn(i, l, u) {
  i.__aws_sdk_context ? i.__aws_sdk_context.features || (i.__aws_sdk_context.features = {}) : i.__aws_sdk_context = {
    features: {}
  }, i.__aws_sdk_context.features[l] = u;
}
var qn;
(function(i) {
  i.STANDARD = "standard", i.ADAPTIVE = "adaptive";
})(qn || (qn = {}));
const rl = 3, Pv = qn.STANDARD, t1 = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException",
  "TransactionInProgressException"
], e1 = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"], n1 = [500, 502, 503, 504], a1 = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"], i1 = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND"], l1 = (i) => (i == null ? void 0 : i.$retryable) !== void 0, s1 = (i) => {
  var l;
  return (l = i.$metadata) == null ? void 0 : l.clockSkewCorrected;
}, u1 = (i) => {
  const l = /* @__PURE__ */ new Set([
    "Failed to fetch",
    "NetworkError when attempting to fetch resource",
    "The Internet connection appears to be offline",
    "Load failed",
    "Network request failed"
  ]);
  return i && i instanceof TypeError ? l.has(i.message) : !1;
}, By = (i) => {
  var l, u;
  return ((l = i.$metadata) == null ? void 0 : l.httpStatusCode) === 429 || t1.includes(i.name) || ((u = i.$retryable) == null ? void 0 : u.throttling) == !0;
}, io = (i, l = 0) => {
  var u;
  return l1(i) || s1(i) || e1.includes(i.name) || a1.includes((i == null ? void 0 : i.code) || "") || i1.includes((i == null ? void 0 : i.code) || "") || n1.includes(((u = i.$metadata) == null ? void 0 : u.httpStatusCode) || 0) || u1(i) || c1(i) || i.cause !== void 0 && l <= 10 && io(i.cause, l + 1);
}, r1 = (i) => {
  var l;
  if (((l = i.$metadata) == null ? void 0 : l.httpStatusCode) !== void 0) {
    const u = i.$metadata.httpStatusCode;
    return 500 <= u && u <= 599 && !io(i);
  }
  return !1;
};
function c1(i) {
  return i.code === "ERR_HTTP2_STREAM_ERROR" && i.message.includes("NGHTTP2_REFUSED_STREAM");
}
const Js = class Js {
  constructor(l) {
    M(this, "beta");
    M(this, "minCapacity");
    M(this, "minFillRate");
    M(this, "scaleConstant");
    M(this, "smooth");
    M(this, "enabled", !1);
    M(this, "availableTokens", 0);
    M(this, "lastMaxRate", 0);
    M(this, "measuredTxRate", 0);
    M(this, "requestCount", 0);
    M(this, "fillRate");
    M(this, "lastThrottleTime");
    M(this, "lastTimestamp", 0);
    M(this, "lastTxRateBucket");
    M(this, "maxCapacity");
    M(this, "timeWindow", 0);
    this.beta = (l == null ? void 0 : l.beta) ?? 0.7, this.minCapacity = (l == null ? void 0 : l.minCapacity) ?? 1, this.minFillRate = (l == null ? void 0 : l.minFillRate) ?? 0.5, this.scaleConstant = (l == null ? void 0 : l.scaleConstant) ?? 0.4, this.smooth = (l == null ? void 0 : l.smooth) ?? 0.8, this.lastThrottleTime = this.getCurrentTimeInSeconds(), this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds()), this.fillRate = this.minFillRate, this.maxCapacity = this.minCapacity;
  }
  async getSendToken() {
    return this.acquireTokenBucket(1);
  }
  updateClientSendingRate(l) {
    let u;
    this.updateMeasuredRate();
    const r = l;
    if ((r == null ? void 0 : r.errorType) === "THROTTLING" || By((r == null ? void 0 : r.error) ?? l)) {
      const y = this.enabled ? Math.min(this.measuredTxRate, this.fillRate) : this.measuredTxRate;
      this.lastMaxRate = y, this.calculateTimeWindow(), this.lastThrottleTime = this.getCurrentTimeInSeconds(), u = this.cubicThrottle(y), this.enableTokenBucket();
    } else
      this.calculateTimeWindow(), u = this.cubicSuccess(this.getCurrentTimeInSeconds());
    const d = Math.min(u, 2 * this.measuredTxRate);
    this.updateTokenBucketRate(d);
  }
  getCurrentTimeInSeconds() {
    return Date.now() / 1e3;
  }
  async acquireTokenBucket(l) {
    if (this.enabled) {
      if (this.refillTokenBucket(), l > this.availableTokens) {
        const u = (l - this.availableTokens) / this.fillRate * 1e3;
        await new Promise((r) => Js.setTimeoutFn(r, u));
      }
      this.availableTokens = this.availableTokens - l;
    }
  }
  refillTokenBucket() {
    const l = this.getCurrentTimeInSeconds();
    if (!this.lastTimestamp) {
      this.lastTimestamp = l;
      return;
    }
    const u = (l - this.lastTimestamp) * this.fillRate;
    this.availableTokens = Math.min(this.maxCapacity, this.availableTokens + u), this.lastTimestamp = l;
  }
  calculateTimeWindow() {
    this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
  }
  cubicThrottle(l) {
    return this.getPrecise(l * this.beta);
  }
  cubicSuccess(l) {
    return this.getPrecise(this.scaleConstant * Math.pow(l - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
  }
  enableTokenBucket() {
    this.enabled = !0;
  }
  updateTokenBucketRate(l) {
    this.refillTokenBucket(), this.fillRate = Math.max(l, this.minFillRate), this.maxCapacity = Math.max(l, this.minCapacity), this.availableTokens = Math.min(this.availableTokens, this.maxCapacity);
  }
  updateMeasuredRate() {
    const l = this.getCurrentTimeInSeconds(), u = Math.floor(l * 2) / 2;
    if (this.requestCount++, u > this.lastTxRateBucket) {
      const r = this.requestCount / (u - this.lastTxRateBucket);
      this.measuredTxRate = this.getPrecise(r * this.smooth + this.measuredTxRate * (1 - this.smooth)), this.requestCount = 0, this.lastTxRateBucket = u;
    }
  }
  getPrecise(l) {
    return parseFloat(l.toFixed(8));
  }
};
M(Js, "setTimeoutFn", setTimeout);
let Jc = Js;
const Ly = 20 * 1e3, Gm = 500, o1 = 1, f1 = "amz-sdk-invocation-id", d1 = "amz-sdk-request";
var py;
const Bn = class Bn {
  static delay() {
    return Bn.v2026 ? 50 : 100;
  }
  static throttlingDelay() {
    return Bn.v2026 ? 1e3 : 500;
  }
  static cost() {
    return Bn.v2026 ? 14 : 5;
  }
  static throttlingCost() {
    return Bn.v2026 ? 5 : 10;
  }
  static modifiedCostType() {
    return Bn.v2026 ? "THROTTLING" : "TRANSIENT";
  }
};
M(Bn, "v2026", typeof process < "u" && ((py = process.env) == null ? void 0 : py.SMITHY_NEW_RETRIES_2026) === "true");
let De = Bn;
class h1 {
  constructor() {
    M(this, "x", De.delay());
  }
  computeNextBackoffDelay(l) {
    const o = Math.random() * Math.min(this.x * 2 ** l, Ly);
    return Math.floor(o);
  }
  setDelayBase(l) {
    this.x = l;
  }
}
class Ym {
  constructor(l, u, r, o) {
    M(this, "delay");
    M(this, "count");
    M(this, "cost");
    M(this, "longPoll");
    this.delay = l, this.count = u, this.cost = r, this.longPoll = o;
  }
  getRetryCount() {
    return this.count;
  }
  getRetryDelay() {
    return Math.min(Ly, this.delay);
  }
  getRetryCost() {
    return this.cost;
  }
  isLongPoll() {
    return this.longPoll;
  }
}
class kc {
  constructor(l) {
    M(this, "mode", qn.STANDARD);
    M(this, "capacity", Gm);
    M(this, "retryBackoffStrategy");
    M(this, "maxAttemptsProvider");
    M(this, "baseDelay");
    typeof l == "number" ? this.maxAttemptsProvider = async () => l : typeof l == "function" ? this.maxAttemptsProvider = l : l && typeof l == "object" && (this.maxAttemptsProvider = async () => l.maxAttempts, this.baseDelay = l.baseDelay, this.retryBackoffStrategy = l.backoff), this.maxAttemptsProvider ?? (this.maxAttemptsProvider = async () => rl), this.baseDelay ?? (this.baseDelay = De.delay()), this.retryBackoffStrategy ?? (this.retryBackoffStrategy = new h1());
  }
  async acquireInitialRetryToken(l) {
    return new Ym(De.delay(), 0, void 0, De.v2026 && l.includes(":longpoll"));
  }
  async refreshRetryTokenForRetry(l, u) {
    var d, y;
    const r = await this.getMaxAttempts(), o = this.shouldRetry(l, u, r);
    if (o || (d = l.isLongPoll) != null && d.call(l)) {
      const p = u.errorType;
      this.retryBackoffStrategy.setDelayBase(p === "THROTTLING" ? De.throttlingDelay() : this.baseDelay);
      const g = this.retryBackoffStrategy.computeNextBackoffDelay(l.getRetryCount());
      let h = g;
      if (u.retryAfterHint instanceof Date && (h = Math.max(g, Math.min(u.retryAfterHint.getTime() - Date.now(), g + 5e3))), o) {
        const b = this.getCapacityCost(p);
        return this.capacity -= b, new Ym(h, l.getRetryCount() + 1, b, ((y = l.isLongPoll) == null ? void 0 : y.call(l)) ?? !1);
      } else
        throw Object.assign(new Error("No retry token available"), { $backoff: De.v2026 ? h : 0 });
    }
    throw new Error("No retry token available");
  }
  recordSuccess(l) {
    this.capacity = Math.min(Gm, this.capacity + (l.getRetryCost() ?? o1));
  }
  getCapacity() {
    return this.capacity;
  }
  async getMaxAttempts() {
    try {
      return await this.maxAttemptsProvider();
    } catch {
      return console.warn(`Max attempts provider could not resolve. Using default of ${rl}`), rl;
    }
  }
  shouldRetry(l, u, r) {
    return l.getRetryCount() + 1 < r && this.capacity >= this.getCapacityCost(u.errorType) && this.isRetryableError(u.errorType);
  }
  getCapacityCost(l) {
    return l === De.modifiedCostType() ? De.throttlingCost() : De.cost();
  }
  isRetryableError(l) {
    return l === "THROTTLING" || l === "TRANSIENT";
  }
  async maxAttempts() {
    return this.maxAttemptsProvider();
  }
}
class m1 {
  constructor(l, u) {
    M(this, "mode", qn.ADAPTIVE);
    M(this, "rateLimiter");
    M(this, "standardRetryStrategy");
    const { rateLimiter: r } = u ?? {};
    this.rateLimiter = r ?? new Jc(), this.standardRetryStrategy = u ? new kc({
      maxAttempts: typeof l == "number" ? l : 3,
      ...u
    }) : new kc(l);
  }
  async acquireInitialRetryToken(l) {
    return await this.rateLimiter.getSendToken(), this.standardRetryStrategy.acquireInitialRetryToken(l);
  }
  async refreshRetryTokenForRetry(l, u) {
    return this.rateLimiter.updateClientSendingRate(u), this.standardRetryStrategy.refreshRetryTokenForRetry(l, u);
  }
  recordSuccess(l) {
    this.rateLimiter.updateClientSendingRate({}), this.standardRetryStrategy.recordSuccess(l);
  }
  async maxAttemptsProvider() {
    return this.standardRetryStrategy.maxAttempts();
  }
}
const y1 = /\d{12}\.ddb/;
async function g1(i, l, u) {
  var d, y, p, g, h;
  const r = u.request;
  if (((d = r == null ? void 0 : r.headers) == null ? void 0 : d["smithy-protocol"]) === "rpc-v2-cbor" && sn(i, "PROTOCOL_RPC_V2_CBOR", "M"), typeof l.retryStrategy == "function") {
    const b = await l.retryStrategy();
    if (typeof b.mode == "string")
      switch (b.mode) {
        case qn.ADAPTIVE:
          sn(i, "RETRY_MODE_ADAPTIVE", "F");
          break;
        case qn.STANDARD:
          sn(i, "RETRY_MODE_STANDARD", "E");
          break;
      }
  }
  if (typeof l.accountIdEndpointMode == "function") {
    const b = i.endpointV2;
    switch (String((y = b == null ? void 0 : b.url) == null ? void 0 : y.hostname).match(y1) && sn(i, "ACCOUNT_ID_ENDPOINT", "O"), await ((p = l.accountIdEndpointMode) == null ? void 0 : p.call(l))) {
      case "disabled":
        sn(i, "ACCOUNT_ID_MODE_DISABLED", "Q");
        break;
      case "preferred":
        sn(i, "ACCOUNT_ID_MODE_PREFERRED", "P");
        break;
      case "required":
        sn(i, "ACCOUNT_ID_MODE_REQUIRED", "R");
        break;
    }
  }
  const o = (h = (g = i.__smithy_context) == null ? void 0 : g.selectedHttpAuthScheme) == null ? void 0 : h.identity;
  if (o != null && o.$source) {
    const b = o;
    b.accountId && sn(i, "RESOLVED_ACCOUNT_ID", "T");
    for (const [S, A] of Object.entries(b.$source ?? {}))
      sn(i, S, A);
  }
}
const Xm = "user-agent", Hc = "x-amz-user-agent", Vm = " ", Bc = "/", p1 = /[^!$%&'*+\-.^_`|~\w]/g, S1 = /[^!$%&'*+\-.^_`|~\w#]/g, $m = "-", v1 = 1024;
function b1(i) {
  let l = "";
  for (const u in i) {
    const r = i[u];
    if (l.length + r.length + 1 <= v1) {
      l.length ? l += "," + r : l += r;
      continue;
    }
    break;
  }
  return l;
}
const E1 = (i) => (l, u) => async (r) => {
  var _, z, N, j;
  const { request: o } = r;
  if (!ye.isInstance(o))
    return l(r);
  const { headers: d } = o, y = ((_ = u == null ? void 0 : u.userAgent) == null ? void 0 : _.map(Bs)) || [], p = (await i.defaultUserAgentProvider()).map(Bs);
  await g1(u, i, r);
  const g = u;
  p.push(`m/${b1(Object.assign({}, (z = u.__smithy_context) == null ? void 0 : z.features, (N = g.__aws_sdk_context) == null ? void 0 : N.features))}`);
  const h = ((j = i == null ? void 0 : i.customUserAgent) == null ? void 0 : j.map(Bs)) || [], b = await i.userAgentAppId();
  b && p.push(Bs(["app", `${b}`]));
  const S = [].concat([...p, ...y, ...h]).join(Vm), A = [
    ...p.filter((q) => q.startsWith("aws-sdk-")),
    ...h
  ].join(Vm);
  return i.runtime !== "browser" ? (A && (d[Hc] = d[Hc] ? `${d[Xm]} ${A}` : A), d[Xm] = S) : d[Hc] = S, l({
    ...r,
    request: o
  });
}, Bs = (i) => {
  var y;
  const l = i[0].split(Bc).map((p) => p.replace(p1, $m)).join(Bc), u = (y = i[1]) == null ? void 0 : y.replace(S1, $m), r = l.indexOf(Bc), o = l.substring(0, r);
  let d = l.substring(r + 1);
  return o === "api" && (d = d.toLowerCase()), [o, d, u].filter((p) => p && p.length > 0).reduce((p, g, h) => {
    switch (h) {
      case 0:
        return g;
      case 1:
        return `${p}/${g}`;
      default:
        return `${p}#${g}`;
    }
  }, "");
}, T1 = {
  name: "getUserAgentMiddleware",
  step: "build",
  priority: "low",
  tags: ["SET_USER_AGENT", "USER_AGENT"],
  override: !0
}, A1 = (i) => ({
  applyToStack: (l) => {
    l.add(E1(i), T1);
  }
}), R1 = !1, _1 = !1, Zm = /* @__PURE__ */ new Set(), w1 = (i, l = Ws) => {
  if (!Zm.has(i) && !l(i))
    if (i === "*")
      console.warn('@smithy/config-resolver WARN - Please use the caller region instead of "*". See "sigv4a" in https://github.com/aws/aws-sdk-js-v3/blob/main/supplemental-docs/CLIENTS.md.');
    else
      throw new Error(`Region not accepted: region="${i}" is not a valid hostname component.`);
  else
    Zm.add(i);
}, jy = (i) => typeof i == "string" && (i.startsWith("fips-") || i.endsWith("-fips")), C1 = (i) => jy(i) ? ["fips-aws-global", "aws-fips"].includes(i) ? "us-east-1" : i.replace(/fips-(dkr-|prod-)?|-fips/, "") : i, M1 = (i) => {
  const { region: l, useFipsEndpoint: u } = i;
  if (!l)
    throw new Error("Region is missing");
  return Object.assign(i, {
    region: async () => {
      const r = typeof l == "function" ? await l() : l, o = C1(r);
      return w1(o), o;
    },
    useFipsEndpoint: async () => {
      const r = typeof l == "string" ? l : await l();
      return jy(r) ? !0 : typeof u != "function" ? Promise.resolve(!!u) : u();
    }
  });
}, Km = "content-length";
function O1(i) {
  return (l) => async (u) => {
    const r = u.request;
    if (ye.isInstance(r)) {
      const { body: o, headers: d } = r;
      if (o && Object.keys(d).map((y) => y.toLowerCase()).indexOf(Km) === -1)
        try {
          const y = i(o);
          r.headers = {
            ...r.headers,
            [Km]: String(y)
          };
        } catch {
        }
    }
    return l({
      ...u,
      request: r
    });
  };
}
const z1 = {
  step: "build",
  tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
  name: "contentLengthMiddleware",
  override: !0
}, D1 = (i) => ({
  applyToStack: (l) => {
    l.add(O1(i.bodyLengthChecker), z1);
  }
}), x1 = async (i) => {
  const l = (i == null ? void 0 : i.Bucket) || "";
  if (typeof i.Bucket == "string" && (i.Bucket = l.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"))), L1(l)) {
    if (i.ForcePathStyle === !0)
      throw new Error("Path-style addressing cannot be used with ARN buckets");
  } else (!B1(l) || l.indexOf(".") !== -1 && !String(i.Endpoint).startsWith("http:") || l.toLowerCase() !== l || l.length < 3) && (i.ForcePathStyle = !0);
  return i.DisableMultiRegionAccessPoints && (i.disableMultiRegionAccessPoints = !0, i.DisableMRAP = !0), i;
}, N1 = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/, U1 = /(\d+\.){3}\d+/, H1 = /\.\./, B1 = (i) => N1.test(i) && !U1.test(i) && !H1.test(i), L1 = (i) => {
  const [l, u, r, , , o] = i.split(":"), d = l === "arn" && i.split(":").length >= 6, y = !!(d && u && r && o);
  if (d && !y)
    throw new Error(`Invalid ARN: ${i} was an invalid ARN.`);
  return y;
}, j1 = (i, l, u, r = !1) => {
  const o = async () => {
    let d;
    if (r) {
      const y = u.clientContextParams;
      d = (y == null ? void 0 : y[i]) ?? u[i] ?? u[l];
    } else
      d = u[i] ?? u[l];
    return typeof d == "function" ? d() : d;
  };
  return i === "credentialScope" || l === "CredentialScope" ? async () => {
    const d = typeof u.credentials == "function" ? await u.credentials() : u.credentials;
    return (d == null ? void 0 : d.credentialScope) ?? (d == null ? void 0 : d.CredentialScope);
  } : i === "accountId" || l === "AccountId" ? async () => {
    const d = typeof u.credentials == "function" ? await u.credentials() : u.credentials;
    return (d == null ? void 0 : d.accountId) ?? (d == null ? void 0 : d.AccountId);
  } : i === "endpoint" || l === "endpoint" ? async () => {
    if (u.isCustomEndpoint === !1)
      return;
    const d = await o();
    if (d && typeof d == "object") {
      if ("url" in d)
        return d.url.href;
      if ("hostname" in d) {
        const { protocol: y, hostname: p, port: g, path: h } = d;
        return `${y}//${p}${g ? ":" + g : ""}${h}`;
      }
    }
    return d;
  } : o;
}, qy = async (i) => {
}, Qy = (i) => {
  if (typeof i == "object") {
    if ("url" in i) {
      const l = ni(i.url);
      if (i.headers) {
        l.headers = {};
        for (const [u, r] of Object.entries(i.headers))
          l.headers[u.toLowerCase()] = r.join(", ");
      }
      return l;
    }
    return i;
  }
  return ni(i);
}, q1 = async (i, l, u, r) => {
  if (!u.isCustomEndpoint) {
    let y;
    u.serviceConfiguredEndpoint ? y = await u.serviceConfiguredEndpoint() : y = await qy(u.serviceId), y && (u.endpoint = () => Promise.resolve(Qy(y)), u.isCustomEndpoint = !0);
  }
  const o = await Q1(i, l, u);
  if (typeof u.endpointProvider != "function")
    throw new Error("config.endpointProvider is not set.");
  const d = u.endpointProvider(o, r);
  if (u.isCustomEndpoint && u.endpoint) {
    const y = await u.endpoint();
    if (y != null && y.headers) {
      d.headers ?? (d.headers = {});
      for (const [p, g] of Object.entries(y.headers))
        d.headers[p] = Array.isArray(g) ? g : [g];
    }
  }
  return d;
}, Q1 = async (i, l, u) => {
  var d;
  const r = {}, o = ((d = l == null ? void 0 : l.getEndpointParameterInstructions) == null ? void 0 : d.call(l)) || {};
  for (const [y, p] of Object.entries(o))
    switch (p.type) {
      case "staticContextParams":
        r[y] = p.value;
        break;
      case "contextParams":
        r[y] = i[p.name];
        break;
      case "clientContextParams":
      case "builtInParams":
        r[y] = await j1(p.name, y, u, p.type !== "builtInParams")();
        break;
      case "operationContextParams":
        r[y] = p.get(i);
        break;
      default:
        throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(p));
    }
  return Object.keys(o).length === 0 && Object.assign(r, u), String(u.serviceId).toLowerCase() === "s3" && await x1(r), r;
}, G1 = ({ config: i, instructions: l }) => (u, r) => async (o) => {
  var p, g, h;
  i.isCustomEndpoint && gv(r, "ENDPOINT_OVERRIDE", "N");
  const d = await q1(o.input, {
    getEndpointParameterInstructions() {
      return l;
    }
  }, { ...i }, r);
  r.endpointV2 = d, r.authSchemes = (p = d.properties) == null ? void 0 : p.authSchemes;
  const y = (g = r.authSchemes) == null ? void 0 : g[0];
  if (y) {
    r.signing_region = y.signingRegion, r.signing_service = y.signingName;
    const b = ai(r), S = (h = b == null ? void 0 : b.selectedHttpAuthScheme) == null ? void 0 : h.httpAuthOption;
    S && (S.signingProperties = Object.assign(S.signingProperties || {}, {
      signing_region: y.signingRegion,
      signingRegion: y.signingRegion,
      signing_service: y.signingName,
      signingName: y.signingName,
      signingRegionSet: y.signingRegionSet
    }, y.properties));
  }
  return u({
    ...o
  });
}, Y1 = {
  name: "serializerMiddleware"
}, X1 = {
  step: "serialize",
  tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
  name: "endpointV2Middleware",
  override: !0,
  relation: "before",
  toMiddleware: Y1.name
}, lo = (i, l) => ({
  applyToStack: (u) => {
    u.addRelativeTo(G1({
      config: i,
      instructions: l
    }), X1);
  }
}), V1 = (i) => {
  const l = i.tls ?? !0, { endpoint: u, useDualstackEndpoint: r, useFipsEndpoint: o } = i, d = u != null ? async () => Qy(await un(u)()) : void 0, p = Object.assign(i, {
    endpoint: d,
    tls: l,
    isCustomEndpoint: !!u,
    useDualstackEndpoint: un(r ?? !1),
    useFipsEndpoint: un(o ?? !1)
  });
  let g;
  return p.serviceConfiguredEndpoint = async () => (i.serviceId && !g && (g = qy(i.serviceId)), g), p;
}, $1 = (i) => i instanceof Error ? i : i instanceof Object ? Object.assign(new Error(), i) : typeof i == "string" ? new Error(i) : new Error(`AWS SDK error wrapper for ${i}`), Z1 = (i) => {
  const { retryStrategy: l, retryMode: u } = i, r = un(i.maxAttempts ?? rl);
  let o = l ? Promise.resolve(l) : void 0;
  const d = async () => await un(u)() === qn.ADAPTIVE ? new m1(r) : new kc(r);
  return Object.assign(i, {
    maxAttempts: r,
    retryStrategy: () => o ?? (o = d())
  });
}, sa = (i, l) => {
  const u = [];
  if (i && u.push(i), l)
    for (const r of l)
      u.push(r);
  return u;
}, Un = (i, l) => `${i || "anonymous"}${l && l.length > 0 ? ` (a.k.a. ${l.join(",")})` : ""}`, Ks = () => {
  let i = [], l = [], u = !1;
  const r = /* @__PURE__ */ new Set(), o = (S) => S.sort((A, _) => Jm[_.step] - Jm[A.step] || km[_.priority || "normal"] - km[A.priority || "normal"]), d = (S) => {
    let A = !1;
    const _ = (z) => {
      const N = sa(z.name, z.aliases);
      if (N.includes(S)) {
        A = !0;
        for (const j of N)
          r.delete(j);
        return !1;
      }
      return !0;
    };
    return i = i.filter(_), l = l.filter(_), A;
  }, y = (S) => {
    let A = !1;
    const _ = (z) => {
      if (z.middleware === S) {
        A = !0;
        for (const N of sa(z.name, z.aliases))
          r.delete(N);
        return !1;
      }
      return !0;
    };
    return i = i.filter(_), l = l.filter(_), A;
  }, p = (S) => {
    var A;
    return i.forEach((_) => {
      S.add(_.middleware, { ..._ });
    }), l.forEach((_) => {
      S.addRelativeTo(_.middleware, { ..._ });
    }), (A = S.identifyOnResolve) == null || A.call(S, b.identifyOnResolve()), S;
  }, g = (S) => {
    const A = [];
    return S.before.forEach((_) => {
      _.before.length === 0 && _.after.length === 0 ? A.push(_) : A.push(...g(_));
    }), A.push(S), S.after.reverse().forEach((_) => {
      _.before.length === 0 && _.after.length === 0 ? A.push(_) : A.push(...g(_));
    }), A;
  }, h = (S = !1) => {
    const A = [], _ = [], z = {};
    return i.forEach((j) => {
      const q = {
        ...j,
        before: [],
        after: []
      };
      for (const $ of sa(q.name, q.aliases))
        z[$] = q;
      A.push(q);
    }), l.forEach((j) => {
      const q = {
        ...j,
        before: [],
        after: []
      };
      for (const $ of sa(q.name, q.aliases))
        z[$] = q;
      _.push(q);
    }), _.forEach((j) => {
      if (j.toMiddleware) {
        const q = z[j.toMiddleware];
        if (q === void 0) {
          if (S)
            return;
          throw new Error(`${j.toMiddleware} is not found when adding ${Un(j.name, j.aliases)} middleware ${j.relation} ${j.toMiddleware}`);
        }
        j.relation === "after" && q.after.push(j), j.relation === "before" && q.before.push(j);
      }
    }), o(A).map(g).reduce((j, q) => (j.push(...q), j), []);
  }, b = {
    add: (S, A = {}) => {
      const { name: _, override: z, aliases: N } = A, j = {
        step: "initialize",
        priority: "normal",
        middleware: S,
        ...A
      }, q = sa(_, N);
      if (q.length > 0) {
        if (q.some(($) => r.has($))) {
          if (!z)
            throw new Error(`Duplicate middleware name '${Un(_, N)}'`);
          for (const $ of q) {
            const Z = i.findIndex((ot) => {
              var ct;
              return ot.name === $ || ((ct = ot.aliases) == null ? void 0 : ct.some((I) => I === $));
            });
            if (Z === -1)
              continue;
            const lt = i[Z];
            if (lt.step !== j.step || j.priority !== lt.priority)
              throw new Error(`"${Un(lt.name, lt.aliases)}" middleware with ${lt.priority} priority in ${lt.step} step cannot be overridden by "${Un(_, N)}" middleware with ${j.priority} priority in ${j.step} step.`);
            i.splice(Z, 1);
          }
        }
        for (const $ of q)
          r.add($);
      }
      i.push(j);
    },
    addRelativeTo: (S, A) => {
      const { name: _, override: z, aliases: N } = A, j = {
        middleware: S,
        ...A
      }, q = sa(_, N);
      if (q.length > 0) {
        if (q.some(($) => r.has($))) {
          if (!z)
            throw new Error(`Duplicate middleware name '${Un(_, N)}'`);
          for (const $ of q) {
            const Z = l.findIndex((ot) => {
              var ct;
              return ot.name === $ || ((ct = ot.aliases) == null ? void 0 : ct.some((I) => I === $));
            });
            if (Z === -1)
              continue;
            const lt = l[Z];
            if (lt.toMiddleware !== j.toMiddleware || lt.relation !== j.relation)
              throw new Error(`"${Un(lt.name, lt.aliases)}" middleware ${lt.relation} "${lt.toMiddleware}" middleware cannot be overridden by "${Un(_, N)}" middleware ${j.relation} "${j.toMiddleware}" middleware.`);
            l.splice(Z, 1);
          }
        }
        for (const $ of q)
          r.add($);
      }
      l.push(j);
    },
    clone: () => p(Ks()),
    use: (S) => {
      S.applyToStack(b);
    },
    remove: (S) => typeof S == "string" ? d(S) : y(S),
    removeByTag: (S) => {
      let A = !1;
      const _ = (z) => {
        const { tags: N, name: j, aliases: q } = z;
        if (N && N.includes(S)) {
          const $ = sa(j, q);
          for (const Z of $)
            r.delete(Z);
          return A = !0, !1;
        }
        return !0;
      };
      return i = i.filter(_), l = l.filter(_), A;
    },
    concat: (S) => {
      var _;
      const A = p(Ks());
      return A.use(S), A.identifyOnResolve(u || A.identifyOnResolve() || (((_ = S.identifyOnResolve) == null ? void 0 : _.call(S)) ?? !1)), A;
    },
    applyToStack: p,
    identify: () => h(!0).map((S) => {
      const A = S.step ?? S.relation + " " + S.toMiddleware;
      return Un(S.name, S.aliases) + " - " + A;
    }),
    identifyOnResolve(S) {
      return typeof S == "boolean" && (u = S), u;
    },
    resolve: (S, A) => {
      for (const _ of h().map((z) => z.middleware).reverse())
        S = _(S, A);
      return u && console.log(b.identify()), S;
    }
  };
  return b;
}, Jm = {
  initialize: 5,
  serialize: 4,
  build: 3,
  finalizeRequest: 2,
  deserialize: 1
}, km = {
  high: 3,
  normal: 2,
  low: 1
};
class K1 {
  constructor(l) {
    M(this, "config");
    M(this, "middlewareStack", Ks());
    M(this, "initConfig");
    M(this, "handlers");
    this.config = l;
    const { protocol: u, protocolSettings: r } = l;
    r && typeof u == "function" && (l.protocol = new u(r));
  }
  send(l, u, r) {
    const o = typeof u != "function" ? u : void 0, d = typeof u == "function" ? u : r, y = o === void 0 && this.config.cacheMiddleware === !0;
    let p;
    if (y) {
      this.handlers || (this.handlers = /* @__PURE__ */ new WeakMap());
      const g = this.handlers;
      g.has(l.constructor) ? p = g.get(l.constructor) : (p = l.resolveMiddleware(this.middlewareStack, this.config, o), g.set(l.constructor, p));
    } else
      delete this.handlers, p = l.resolveMiddleware(this.middlewareStack, this.config, o);
    if (d)
      p(l).then((g) => d(null, g.output), (g) => d(g)).catch(() => {
      });
    else
      return p(l).then((g) => g.output);
  }
  destroy() {
    var l, u, r;
    (r = (u = (l = this.config) == null ? void 0 : l.requestHandler) == null ? void 0 : u.destroy) == null || r.call(u), delete this.handlers;
  }
}
const Lc = "***SensitiveInformation***";
function Ic(i, l) {
  if (l == null)
    return l;
  const u = ae.of(i);
  if (u.getMergedTraits().sensitive)
    return Lc;
  if (u.isListSchema()) {
    if (!!u.getValueSchema().getMergedTraits().sensitive)
      return Lc;
  } else if (u.isMapSchema()) {
    if (!!u.getKeySchema().getMergedTraits().sensitive || !!u.getValueSchema().getMergedTraits().sensitive)
      return Lc;
  } else if (u.isStructSchema() && typeof l == "object") {
    const r = l, o = {};
    for (const [d, y] of u.structIterator())
      r[d] != null && (o[d] = Ic(y, r[d]));
    return o;
  }
  return l;
}
class tu {
  constructor() {
    M(this, "middlewareStack", Ks());
    M(this, "schema");
  }
  static classBuilder() {
    return new J1();
  }
  resolveMiddlewareWithContext(l, u, r, { middlewareFn: o, clientName: d, commandName: y, inputFilterSensitiveLog: p, outputFilterSensitiveLog: g, smithyContext: h, additionalContext: b, CommandCtor: S }) {
    for (const q of o.bind(this)(S, l, u, r))
      this.middlewareStack.use(q);
    const A = l.concat(this.middlewareStack), { logger: _ } = u, z = {
      logger: _,
      clientName: d,
      commandName: y,
      inputFilterSensitiveLog: p,
      outputFilterSensitiveLog: g,
      [Vc]: {
        commandInstance: this,
        ...h
      },
      ...b
    }, { requestHandler: N } = u;
    let j = r ?? {};
    return h.eventStream && (j = {
      isEventStream: !0,
      ...j
    }), A.resolve((q) => N.handle(q.request, j), z);
  }
}
class J1 {
  constructor() {
    M(this, "_init", () => {
    });
    M(this, "_ep", {});
    M(this, "_middlewareFn", () => []);
    M(this, "_commandName", "");
    M(this, "_clientName", "");
    M(this, "_additionalContext", {});
    M(this, "_smithyContext", {});
    M(this, "_inputFilterSensitiveLog");
    M(this, "_outputFilterSensitiveLog");
    M(this, "_serializer", null);
    M(this, "_deserializer", null);
    M(this, "_operationSchema");
  }
  init(l) {
    this._init = l;
  }
  ep(l) {
    return this._ep = l, this;
  }
  m(l) {
    return this._middlewareFn = l, this;
  }
  s(l, u, r = {}) {
    return this._smithyContext = {
      service: l,
      operation: u,
      ...r
    }, this;
  }
  c(l = {}) {
    return this._additionalContext = l, this;
  }
  n(l, u) {
    return this._clientName = l, this._commandName = u, this;
  }
  f(l = (r) => r, u = (r) => r) {
    return this._inputFilterSensitiveLog = l, this._outputFilterSensitiveLog = u, this;
  }
  ser(l) {
    return this._serializer = l, this;
  }
  de(l) {
    return this._deserializer = l, this;
  }
  sc(l) {
    return this._operationSchema = l, this._smithyContext.operationSchema = l, this;
  }
  build() {
    const l = this;
    let u;
    return u = class extends tu {
      constructor(...[o]) {
        super();
        M(this, "input");
        M(this, "serialize", l._serializer);
        M(this, "deserialize", l._deserializer);
        this.input = o ?? {}, l._init(this), this.schema = l._operationSchema;
      }
      static getEndpointParameterInstructions() {
        return l._ep;
      }
      resolveMiddleware(o, d, y) {
        const p = l._operationSchema, g = (p == null ? void 0 : p[4]) ?? (p == null ? void 0 : p.input), h = (p == null ? void 0 : p[5]) ?? (p == null ? void 0 : p.output);
        return this.resolveMiddlewareWithContext(o, d, y, {
          CommandCtor: u,
          middlewareFn: l._middlewareFn,
          clientName: l._clientName,
          commandName: l._commandName,
          inputFilterSensitiveLog: l._inputFilterSensitiveLog ?? (p ? Ic.bind(null, g) : (b) => b),
          outputFilterSensitiveLog: l._outputFilterSensitiveLog ?? (p ? Ic.bind(null, h) : (b) => b),
          smithyContext: l._smithyContext,
          additionalContext: l._additionalContext
        });
      }
    };
  }
}
class Pa extends Error {
  constructor(u) {
    super(u.message);
    M(this, "$fault");
    M(this, "$response");
    M(this, "$retryable");
    M(this, "$metadata");
    Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = u.name, this.$fault = u.$fault, this.$metadata = u.$metadata;
  }
  static isInstance(u) {
    if (!u)
      return !1;
    const r = u;
    return Pa.prototype.isPrototypeOf(r) || !!r.$fault && !!r.$metadata && (r.$fault === "client" || r.$fault === "server");
  }
  static [Symbol.hasInstance](u) {
    if (!u)
      return !1;
    const r = u;
    return this === Pa ? Pa.isInstance(u) : Pa.isInstance(u) ? r.name && this.name ? this.prototype.isPrototypeOf(u) || r.name === this.name : this.prototype.isPrototypeOf(u) : !1;
  }
}
const Im = (i, l = {}) => {
  Object.entries(l).filter(([, r]) => r !== void 0).forEach(([r, o]) => {
    (i[r] == null || i[r] === "") && (i[r] = o);
  });
  const u = i.message || i.Message || "UnknownError";
  return i.message = u, delete i.Message, i;
}, k1 = (i) => {
  switch (i) {
    case "standard":
      return {
        retryMode: "standard",
        connectionTimeout: 3100
      };
    case "in-region":
      return {
        retryMode: "standard",
        connectionTimeout: 1100
      };
    case "cross-region":
      return {
        retryMode: "standard",
        connectionTimeout: 3100
      };
    case "mobile":
      return {
        retryMode: "standard",
        connectionTimeout: 3e4
      };
    default:
      return {};
  }
}, Gy = Object.values(fl), I1 = (i) => {
  const l = [];
  for (const u in fl) {
    const r = fl[u];
    i[r] !== void 0 && l.push({
      algorithmId: () => r,
      checksumConstructor: () => i[r]
    });
  }
  for (const [u, r] of Object.entries(i.checksumAlgorithms ?? {}))
    l.push({
      algorithmId: () => u,
      checksumConstructor: () => r
    });
  return {
    addChecksumAlgorithm(u) {
      i.checksumAlgorithms = i.checksumAlgorithms ?? {};
      const r = u.algorithmId(), o = u.checksumConstructor();
      Gy.includes(r) ? i.checksumAlgorithms[r.toUpperCase()] = o : i.checksumAlgorithms[r] = o, l.push(u);
    },
    checksumAlgorithms() {
      return l;
    }
  };
}, F1 = (i) => {
  const l = {};
  return i.checksumAlgorithms().forEach((u) => {
    const r = u.algorithmId();
    Gy.includes(r) && (l[r] = u.checksumConstructor());
  }), l;
}, W1 = (i) => ({
  setRetryStrategy(l) {
    i.retryStrategy = l;
  },
  retryStrategy() {
    return i.retryStrategy;
  }
}), P1 = (i) => {
  const l = {};
  return l.retryStrategy = i.retryStrategy(), l;
}, tb = (i) => Object.assign(I1(i), W1(i)), eb = (i) => Object.assign(F1(i), P1(i));
class Yy {
  trace() {
  }
  debug() {
  }
  info() {
  }
  warn() {
  }
  error() {
  }
}
const nb = (i) => (i == null ? void 0 : i.body) instanceof ReadableStream;
function ab(i, l) {
  var u, r, o, d;
  if (ei.isInstance(i))
    for (const y of Object.keys(i.headers)) {
      const p = y.toLowerCase();
      if (p === "retry-after") {
        const g = i.headers[y];
        let h = NaN;
        if (g.endsWith("GMT"))
          try {
            h = (Ty(g).getTime() - Date.now()) / 1e3;
          } catch (b) {
            (u = l == null ? void 0 : l.trace) == null || u.call(l, "Failed to parse retry-after header"), (r = l == null ? void 0 : l.trace) == null || r.call(l, b);
          }
        else g.match(/ GMT, ((\d+)|(\d+\.\d+))$/) ? h = Number((o = g.match(/ GMT, ([\d.]+)$/)) == null ? void 0 : o[1]) : g.match(/^((\d+)|(\d+\.\d+))$/) ? h = Number(g) : Date.parse(g) >= Date.now() && (h = (Date.parse(g) - Date.now()) / 1e3);
        return isNaN(h) ? void 0 : new Date(Date.now() + h * 1e3);
      } else if (p === "x-amz-retry-after") {
        const g = i.headers[y], h = Number(g);
        if (isNaN(h)) {
          (d = l == null ? void 0 : l.trace) == null || d.call(l, `Failed to parse x-amz-retry-after=${g}`);
          return;
        }
        return new Date(Date.now() + h);
      }
    }
}
const ib = (i) => (l, u) => async (r) => {
  var y;
  let o = await i.retryStrategy();
  const d = await i.maxAttempts();
  if (lb(o)) {
    o = o;
    let p = await o.acquireInitialRetryToken((u.partition_id ?? "") + (u.__retryLongPoll ? ":longpoll" : "")), g = new Error(), h = 0, b = 0;
    const { request: S } = r, A = ye.isInstance(S);
    for (A && (S.headers[f1] = Ay()); ; )
      try {
        A && (S.headers[d1] = `attempt=${h + 1}; max=${d}`);
        const { response: _, output: z } = await l(r);
        return o.recordSuccess(p), z.$metadata.attempts = h + 1, z.$metadata.totalRetryDelay = b, { response: _, output: z };
      } catch (_) {
        const z = sb(_, i.logger);
        if (g = $1(_), A && nb(S))
          throw (y = u.logger instanceof Yy ? console : u.logger) == null || y.warn("An error was encountered in a non-retryable streaming request."), g;
        try {
          p = await o.refreshRetryTokenForRetry(p, z);
        } catch (j) {
          throw typeof j.$backoff == "number" && await Fm(j.$backoff), g.$metadata || (g.$metadata = {}), g.$metadata.attempts = h + 1, g.$metadata.totalRetryDelay = b, g;
        }
        h = p.getRetryCount();
        const N = p.getRetryDelay();
        b += N, await Fm(N);
      }
  } else
    return o = o, o != null && o.mode && (u.userAgent = [...u.userAgent || [], ["cfg/retry-mode", o.mode]]), o.retry(l, r);
}, Fm = (i) => new Promise((l) => setTimeout(l, i)), lb = (i) => typeof i.acquireInitialRetryToken < "u" && typeof i.refreshRetryTokenForRetry < "u" && typeof i.recordSuccess < "u", sb = (i, l) => {
  const u = {
    error: i,
    errorType: ub(i)
  }, r = ab(i.$response, l);
  return r && (u.retryAfterHint = r), u;
}, ub = (i) => By(i) ? "THROTTLING" : io(i) ? "TRANSIENT" : r1(i) ? "SERVER_ERROR" : "CLIENT_ERROR", rb = {
  name: "retryMiddleware",
  tags: ["RETRY"],
  step: "finalizeRequest",
  priority: "high",
  override: !0
}, cb = (i) => ({
  applyToStack: (l) => {
    l.add(ib(i), rb);
  }
}), Wm = (i) => {
  var l, u;
  return ei.isInstance(i) ? ((l = i.headers) == null ? void 0 : l.date) ?? ((u = i.headers) == null ? void 0 : u.Date) : void 0;
}, Xy = (i) => new Date(Date.now() + i), ob = (i, l) => Math.abs(Xy(l).getTime() - i) >= 3e5, Pm = (i, l) => {
  const u = Date.parse(i);
  return ob(u, l) ? u - Date.now() : l;
}, cl = (i, l) => {
  if (!l)
    throw new Error(`Property \`${i}\` is not resolved for AWS SDK SigV4Auth`);
  return l;
}, fb = async (i) => {
  var h, b, S;
  const l = cl("context", i.context), u = cl("config", i.config), r = (S = (b = (h = l.endpointV2) == null ? void 0 : h.properties) == null ? void 0 : b.authSchemes) == null ? void 0 : S[0], d = await cl("signer", u.signer)(r), y = i == null ? void 0 : i.signingRegion, p = i == null ? void 0 : i.signingRegionSet, g = i == null ? void 0 : i.signingName;
  return {
    config: u,
    signer: d,
    signingRegion: y,
    signingRegionSet: p,
    signingName: g
  };
};
class db {
  async sign(l, u, r) {
    var S;
    if (!ye.isInstance(l))
      throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    const o = await fb(r), { config: d, signer: y } = o;
    let { signingRegion: p, signingName: g } = o;
    const h = r.context;
    if (((S = h == null ? void 0 : h.authSchemes) == null ? void 0 : S.length) ?? !1) {
      const [A, _] = h.authSchemes;
      (A == null ? void 0 : A.name) === "sigv4a" && (_ == null ? void 0 : _.name) === "sigv4" && (p = (_ == null ? void 0 : _.signingRegion) ?? p, g = (_ == null ? void 0 : _.signingName) ?? g);
    }
    return await y.sign(l, {
      signingDate: Xy(d.systemClockOffset),
      signingRegion: p,
      signingService: g
    });
  }
  errorHandler(l) {
    return (u) => {
      const r = u.ServerTime ?? Wm(u.$response);
      if (r) {
        const o = cl("config", l.config), d = o.systemClockOffset;
        o.systemClockOffset = Pm(r, o.systemClockOffset), o.systemClockOffset !== d && u.$metadata && (u.$metadata.clockSkewCorrected = !0);
      }
      throw u;
    };
  }
  successHandler(l, u) {
    const r = Wm(l);
    if (r) {
      const o = cl("config", u.config);
      o.systemClockOffset = Pm(r, o.systemClockOffset);
    }
  }
}
const hb = (i, l, u) => {
  let r, o, d, y = !1;
  const p = async () => {
    o || (o = i());
    try {
      r = await o, d = !0, y = !1;
    } finally {
      o = void 0;
    }
    return r;
  };
  return async (g) => ((!d || g != null && g.forceRefresh) && (r = await p()), r);
}, mb = "X-Amz-Algorithm", yb = "X-Amz-Credential", Vy = "X-Amz-Date", gb = "X-Amz-SignedHeaders", pb = "X-Amz-Expires", $y = "X-Amz-Signature", Zy = "X-Amz-Security-Token", Ky = "authorization", Jy = Vy.toLowerCase(), Sb = "date", vb = [Ky, Jy, Sb], bb = $y.toLowerCase(), Fc = "x-amz-content-sha256", Eb = Zy.toLowerCase(), Tb = {
  authorization: !0,
  "cache-control": !0,
  connection: !0,
  expect: !0,
  from: !0,
  "keep-alive": !0,
  "max-forwards": !0,
  pragma: !0,
  referer: !0,
  te: !0,
  trailer: !0,
  "transfer-encoding": !0,
  upgrade: !0,
  "user-agent": !0,
  "x-amzn-trace-id": !0
}, Ab = /^proxy-/, Rb = /^sec-/, jc = "AWS4-HMAC-SHA256", _b = "AWS4-HMAC-SHA256-PAYLOAD", wb = "UNSIGNED-PAYLOAD", Cb = 50, ky = "aws4_request", Mb = 3600 * 24 * 7, Ls = {}, qc = [], Qc = (i, l, u) => `${i}/${l}/${u}/${ky}`, Ob = async (i, l, u, r, o) => {
  const d = await ty(i, l.secretAccessKey, l.accessKeyId), y = `${u}:${r}:${o}:${oa(d)}:${l.sessionToken}`;
  if (y in Ls)
    return Ls[y];
  for (qc.push(y); qc.length > Cb; )
    delete Ls[qc.shift()];
  let p = `AWS4${l.secretAccessKey}`;
  for (const g of [u, r, o, ky])
    p = await ty(i, p, g);
  return Ls[y] = p;
}, ty = (i, l, u) => {
  const r = new i(l);
  return r.update(dl(u)), r.digest();
}, ey = ({ headers: i }, l, u) => {
  const r = {};
  for (const o of Object.keys(i).sort()) {
    if (i[o] == null)
      continue;
    const d = o.toLowerCase();
    (d in Tb || l != null && l.has(d) || Ab.test(d) || Rb.test(d)) && (!u || u && !u.has(d)) || (r[d] = i[o].trim().replace(/\s+/g, " "));
  }
  return r;
}, zb = (i) => typeof ArrayBuffer == "function" && i instanceof ArrayBuffer || Object.prototype.toString.call(i) === "[object ArrayBuffer]", Gc = async ({ headers: i, body: l }, u) => {
  for (const r of Object.keys(i))
    if (r.toLowerCase() === Fc)
      return i[r];
  if (l == null)
    return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  if (typeof l == "string" || ArrayBuffer.isView(l) || zb(l)) {
    const r = new u();
    return r.update(dl(l)), oa(await r.digest());
  }
  return wb;
};
class Db {
  format(l) {
    const u = [];
    for (const d of Object.keys(l)) {
      const y = fa(d);
      u.push(Uint8Array.from([y.byteLength]), y, this.formatHeaderValue(l[d]));
    }
    const r = new Uint8Array(u.reduce((d, y) => d + y.byteLength, 0));
    let o = 0;
    for (const d of u)
      r.set(d, o), o += d.byteLength;
    return r;
  }
  formatHeaderValue(l) {
    switch (l.type) {
      case "boolean":
        return Uint8Array.from([l.value ? 0 : 1]);
      case "byte":
        return Uint8Array.from([2, l.value]);
      case "short":
        const u = new DataView(new ArrayBuffer(3));
        return u.setUint8(0, 3), u.setInt16(1, l.value, !1), new Uint8Array(u.buffer);
      case "integer":
        const r = new DataView(new ArrayBuffer(5));
        return r.setUint8(0, 4), r.setInt32(1, l.value, !1), new Uint8Array(r.buffer);
      case "long":
        const o = new Uint8Array(9);
        return o[0] = 5, o.set(l.value.bytes, 1), o;
      case "binary":
        const d = new DataView(new ArrayBuffer(3 + l.value.byteLength));
        d.setUint8(0, 6), d.setUint16(1, l.value.byteLength, !1);
        const y = new Uint8Array(d.buffer);
        return y.set(l.value, 3), y;
      case "string":
        const p = fa(l.value), g = new DataView(new ArrayBuffer(3 + p.byteLength));
        g.setUint8(0, 7), g.setUint16(1, p.byteLength, !1);
        const h = new Uint8Array(g.buffer);
        return h.set(p, 3), h;
      case "timestamp":
        const b = new Uint8Array(9);
        return b[0] = 8, b.set(so.fromNumber(l.value.valueOf()).bytes, 1), b;
      case "uuid":
        if (!xb.test(l.value))
          throw new Error(`Invalid UUID received: ${l.value}`);
        const S = new Uint8Array(17);
        return S[0] = 9, S.set(NS(l.value.replace(/\-/g, "")), 1), S;
    }
  }
}
var ny;
(function(i) {
  i[i.boolTrue = 0] = "boolTrue", i[i.boolFalse = 1] = "boolFalse", i[i.byte = 2] = "byte", i[i.short = 3] = "short", i[i.integer = 4] = "integer", i[i.long = 5] = "long", i[i.byteArray = 6] = "byteArray", i[i.string = 7] = "string", i[i.timestamp = 8] = "timestamp", i[i.uuid = 9] = "uuid";
})(ny || (ny = {}));
const xb = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
class so {
  constructor(l) {
    M(this, "bytes");
    if (this.bytes = l, l.byteLength !== 8)
      throw new Error("Int64 buffers must be exactly 8 bytes");
  }
  static fromNumber(l) {
    if (l > 9223372036854776e3 || l < -9223372036854776e3)
      throw new Error(`${l} is too large (or, if negative, too small) to represent as an Int64`);
    const u = new Uint8Array(8);
    for (let r = 7, o = Math.abs(Math.round(l)); r > -1 && o > 0; r--, o /= 256)
      u[r] = o;
    return l < 0 && ay(u), new so(u);
  }
  valueOf() {
    const l = this.bytes.slice(0), u = l[0] & 128;
    return u && ay(l), parseInt(oa(l), 16) * (u ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
}
function ay(i) {
  for (let l = 0; l < 8; l++)
    i[l] ^= 255;
  for (let l = 7; l > -1 && (i[l]++, i[l] === 0); l--)
    ;
}
const Nb = (i, l) => {
  i = i.toLowerCase();
  for (const u of Object.keys(l))
    if (i === u.toLowerCase())
      return !0;
  return !1;
}, Ub = (i, l = {}) => {
  var o, d;
  const { headers: u, query: r = {} } = ye.clone(i);
  for (const y of Object.keys(u)) {
    const p = y.toLowerCase();
    (p.slice(0, 6) === "x-amz-" && !((o = l.unhoistableHeaders) != null && o.has(p)) || (d = l.hoistableHeaders) != null && d.has(p)) && (r[y] = u[y], delete u[y]);
  }
  return {
    ...i,
    headers: u,
    query: r
  };
}, iy = (i) => {
  i = ye.clone(i);
  for (const l of Object.keys(i.headers))
    vb.indexOf(l.toLowerCase()) > -1 && delete i.headers[l];
  return i;
}, Hb = ({ query: i = {} }) => {
  const l = [], u = {};
  for (const r of Object.keys(i)) {
    if (r.toLowerCase() === bb)
      continue;
    const o = ca(r);
    l.push(o);
    const d = i[r];
    typeof d == "string" ? u[o] = `${o}=${ca(d)}` : Array.isArray(d) && (u[o] = d.slice(0).reduce((y, p) => y.concat([`${o}=${ca(p)}`]), []).sort().join("&"));
  }
  return l.sort().map((r) => u[r]).filter((r) => r).join("&");
}, Bb = (i) => Lb(i).toISOString().replace(/\.\d{3}Z$/, "Z"), Lb = (i) => typeof i == "number" ? new Date(i * 1e3) : typeof i == "string" ? Number(i) ? new Date(Number(i) * 1e3) : new Date(i) : i;
class jb {
  constructor({ applyChecksum: l, credentials: u, region: r, service: o, sha256: d, uriEscapePath: y = !0 }) {
    M(this, "service");
    M(this, "regionProvider");
    M(this, "credentialProvider");
    M(this, "sha256");
    M(this, "uriEscapePath");
    M(this, "applyChecksum");
    this.service = o, this.sha256 = d, this.uriEscapePath = y, this.applyChecksum = typeof l == "boolean" ? l : !0, this.regionProvider = un(r), this.credentialProvider = un(u);
  }
  createCanonicalRequest(l, u, r) {
    const o = Object.keys(u).sort();
    return `${l.method}
${this.getCanonicalPath(l)}
${Hb(l)}
${o.map((d) => `${d}:${u[d]}`).join(`
`)}

${o.join(";")}
${r}`;
  }
  async createStringToSign(l, u, r, o) {
    const d = new this.sha256();
    d.update(dl(r));
    const y = await d.digest();
    return `${o}
${l}
${u}
${oa(y)}`;
  }
  getCanonicalPath({ path: l }) {
    if (this.uriEscapePath) {
      const u = [];
      for (const d of l.split("/"))
        (d == null ? void 0 : d.length) !== 0 && d !== "." && (d === ".." ? u.pop() : u.push(d));
      const r = `${l != null && l.startsWith("/") ? "/" : ""}${u.join("/")}${u.length > 0 && (l != null && l.endsWith("/")) ? "/" : ""}`;
      return ca(r).replace(/%2F/g, "/");
    }
    return l;
  }
  validateResolvedCredentials(l) {
    if (typeof l != "object" || typeof l.accessKeyId != "string" || typeof l.secretAccessKey != "string")
      throw new Error("Resolved credential object is not valid");
  }
  formatDate(l) {
    const u = Bb(l).replace(/[\-:]/g, "");
    return {
      longDate: u,
      shortDate: u.slice(0, 8)
    };
  }
  getCanonicalHeaderList(l) {
    return Object.keys(l).sort().join(";");
  }
}
class ly extends jb {
  constructor({ applyChecksum: u, credentials: r, region: o, service: d, sha256: y, uriEscapePath: p = !0 }) {
    super({
      applyChecksum: u,
      credentials: r,
      region: o,
      service: d,
      sha256: y,
      uriEscapePath: p
    });
    M(this, "headerFormatter", new Db());
  }
  async presign(u, r = {}) {
    const { signingDate: o = /* @__PURE__ */ new Date(), expiresIn: d = 3600, unsignableHeaders: y, unhoistableHeaders: p, signableHeaders: g, hoistableHeaders: h, signingRegion: b, signingService: S } = r, A = await this.credentialProvider();
    this.validateResolvedCredentials(A);
    const _ = b ?? await this.regionProvider(), { longDate: z, shortDate: N } = this.formatDate(o);
    if (d > Mb)
      return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
    const j = Qc(N, _, S ?? this.service), q = Ub(iy(u), { unhoistableHeaders: p, hoistableHeaders: h });
    A.sessionToken && (q.query[Zy] = A.sessionToken), q.query[mb] = jc, q.query[yb] = `${A.accessKeyId}/${j}`, q.query[Vy] = z, q.query[pb] = d.toString(10);
    const $ = ey(q, y, g);
    return q.query[gb] = this.getCanonicalHeaderList($), q.query[$y] = await this.getSignature(z, j, this.getSigningKey(A, _, N, S), this.createCanonicalRequest(q, $, await Gc(u, this.sha256))), q;
  }
  async sign(u, r) {
    return typeof u == "string" ? this.signString(u, r) : u.headers && u.payload ? this.signEvent(u, r) : u.message ? this.signMessage(u, r) : this.signRequest(u, r);
  }
  async signEvent({ headers: u, payload: r }, { signingDate: o = /* @__PURE__ */ new Date(), priorSignature: d, signingRegion: y, signingService: p, eventStreamCredentials: g }) {
    const h = y ?? await this.regionProvider(), { shortDate: b, longDate: S } = this.formatDate(o), A = Qc(b, h, p ?? this.service), _ = await Gc({ headers: {}, body: r }, this.sha256), z = new this.sha256();
    z.update(u);
    const N = oa(await z.digest()), j = [
      _b,
      S,
      A,
      d,
      N,
      _
    ].join(`
`);
    return this.signString(j, {
      signingDate: o,
      signingRegion: h,
      signingService: p,
      eventStreamCredentials: g
    });
  }
  async signMessage(u, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: o, signingService: d, eventStreamCredentials: y }) {
    return this.signEvent({
      headers: this.headerFormatter.format(u.message.headers),
      payload: u.message.body
    }, {
      signingDate: r,
      signingRegion: o,
      signingService: d,
      priorSignature: u.priorSignature,
      eventStreamCredentials: y
    }).then((g) => ({ message: u.message, signature: g }));
  }
  async signString(u, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: o, signingService: d, eventStreamCredentials: y } = {}) {
    const p = y ?? await this.credentialProvider();
    this.validateResolvedCredentials(p);
    const g = o ?? await this.regionProvider(), { shortDate: h } = this.formatDate(r), b = new this.sha256(await this.getSigningKey(p, g, h, d));
    return b.update(dl(u)), oa(await b.digest());
  }
  async signRequest(u, { signingDate: r = /* @__PURE__ */ new Date(), signableHeaders: o, unsignableHeaders: d, signingRegion: y, signingService: p } = {}) {
    const g = await this.credentialProvider();
    this.validateResolvedCredentials(g);
    const h = y ?? await this.regionProvider(), b = iy(u), { longDate: S, shortDate: A } = this.formatDate(r), _ = Qc(A, h, p ?? this.service);
    b.headers[Jy] = S, g.sessionToken && (b.headers[Eb] = g.sessionToken);
    const z = await Gc(b, this.sha256);
    !Nb(Fc, b.headers) && this.applyChecksum && (b.headers[Fc] = z);
    const N = ey(b, d, o), j = await this.getSignature(S, _, this.getSigningKey(g, h, A, p), this.createCanonicalRequest(b, N, z));
    return b.headers[Ky] = `${jc} Credential=${g.accessKeyId}/${_}, SignedHeaders=${this.getCanonicalHeaderList(N)}, Signature=${j}`, b;
  }
  async getSignature(u, r, o, d) {
    const y = await this.createStringToSign(u, r, d, jc), p = new this.sha256(await o);
    return p.update(dl(y)), oa(await p.digest());
  }
  getSigningKey(u, r, o, d) {
    return Ob(this.sha256, u, o, r, d || this.service);
  }
}
const qb = (i) => {
  let l = i.credentials, u = !!i.credentials, r;
  Object.defineProperty(i, "credentials", {
    set(h) {
      h && h !== l && h !== r && (u = !0), l = h;
      const b = Qb(i, {
        credentials: l,
        credentialDefaultProvider: i.credentialDefaultProvider
      }), S = Gb(i, b);
      if (u && !S.attributed) {
        const A = typeof l == "object" && l !== null;
        r = async (_) => {
          const N = await S(_);
          return A && (!N.$source || Object.keys(N.$source).length === 0) ? Wv(N, "CREDENTIALS_CODE", "e") : N;
        }, r.memoized = S.memoized, r.configBound = S.configBound, r.attributed = !0;
      } else
        r = S;
    },
    get() {
      return r;
    },
    enumerable: !0,
    configurable: !0
  }), i.credentials = l;
  const { signingEscapePath: o = !0, systemClockOffset: d = i.systemClockOffset || 0, sha256: y } = i;
  let p;
  return i.signer ? p = sl(i.signer) : i.regionInfoProvider ? p = () => sl(i.region)().then(async (h) => [
    await i.regionInfoProvider(h, {
      useFipsEndpoint: await i.useFipsEndpoint(),
      useDualstackEndpoint: await i.useDualstackEndpoint()
    }) || {},
    h
  ]).then(([h, b]) => {
    const { signingRegion: S, signingService: A } = h;
    i.signingRegion = i.signingRegion || S || b, i.signingName = i.signingName || A || i.serviceId;
    const _ = {
      ...i,
      credentials: i.credentials,
      region: i.signingRegion,
      service: i.signingName,
      sha256: y,
      uriEscapePath: o
    }, z = i.signerConstructor || ly;
    return new z(_);
  }) : p = async (h) => {
    h = Object.assign({}, {
      name: "sigv4",
      signingName: i.signingName || i.defaultSigningName,
      signingRegion: await sl(i.region)(),
      properties: {}
    }, h);
    const b = h.signingRegion, S = h.signingName;
    i.signingRegion = i.signingRegion || b, i.signingName = i.signingName || S || i.serviceId;
    const A = {
      ...i,
      credentials: i.credentials,
      region: i.signingRegion,
      service: i.signingName,
      sha256: y,
      uriEscapePath: o
    }, _ = i.signerConstructor || ly;
    return new _(A);
  }, Object.assign(i, {
    systemClockOffset: d,
    signingEscapePath: o,
    signer: p
  });
};
function Qb(i, { credentials: l, credentialDefaultProvider: u }) {
  let r;
  return l ? l != null && l.memoized ? r = l : r = Ev(l, bv, _y) : u ? r = sl(u(Object.assign({}, i, {
    parentClientConfig: i
  }))) : r = async () => {
    throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
  }, r.memoized = !0, r;
}
function Gb(i, l) {
  if (l.configBound)
    return l;
  const u = async (r) => l({ ...r, callerClientConfig: i });
  return u.memoized = l.memoized, u.configBound = !0, u;
}
const Yb = async (i, l, u) => ({
  operation: ai(l).operation,
  region: await un(i.region)() || (() => {
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })()
});
function Xb(i) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "athena",
      region: i.region
    },
    propertiesExtractor: (l, u) => ({
      signingProperties: {
        config: l,
        context: u
      }
    })
  };
}
const Vb = (i) => {
  const l = [];
  switch (i.operation) {
    default:
      l.push(Xb(i));
  }
  return l;
}, $b = (i) => {
  const l = qb(i);
  return Object.assign(l, {
    authSchemePreference: un(i.authSchemePreference ?? [])
  });
}, Zb = (i) => Object.assign(i, {
  useDualstackEndpoint: i.useDualstackEndpoint ?? !1,
  useFipsEndpoint: i.useFipsEndpoint ?? !1,
  defaultSigningName: "athena"
}), uo = {
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
}, Kb = "3.1033.0", Jb = {
  version: Kb
}, kb = (i) => new TextEncoder().encode(i);
var Ib = typeof Buffer < "u" && Buffer.from ? function(i) {
  return Buffer.from(i, "utf8");
} : kb;
function ml(i) {
  return i instanceof Uint8Array ? i : typeof i == "string" ? Ib(i) : ArrayBuffer.isView(i) ? new Uint8Array(i.buffer, i.byteOffset, i.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(i);
}
function Wc(i) {
  return typeof i == "string" ? i.length === 0 : i.byteLength === 0;
}
var Iy = { name: "SHA-256" }, sy = {
  name: "HMAC",
  hash: Iy
}, Fb = new Uint8Array([
  227,
  176,
  196,
  66,
  152,
  252,
  28,
  20,
  154,
  251,
  244,
  200,
  153,
  111,
  185,
  36,
  39,
  174,
  65,
  228,
  100,
  155,
  147,
  76,
  164,
  149,
  153,
  27,
  120,
  82,
  184,
  85
]);
const Wb = {};
function Ys() {
  return typeof window < "u" ? window : typeof self < "u" ? self : Wb;
}
var Pb = (
  /** @class */
  (function() {
    function i(l) {
      this.toHash = new Uint8Array(0), this.secret = l, this.reset();
    }
    return i.prototype.update = function(l) {
      if (!Wc(l)) {
        var u = ml(l), r = new Uint8Array(this.toHash.byteLength + u.byteLength);
        r.set(this.toHash, 0), r.set(u, this.toHash.byteLength), this.toHash = r;
      }
    }, i.prototype.digest = function() {
      var l = this;
      return this.key ? this.key.then(function(u) {
        return Ys().crypto.subtle.sign(sy, u, l.toHash).then(function(r) {
          return new Uint8Array(r);
        });
      }) : Wc(this.toHash) ? Promise.resolve(Fb) : Promise.resolve().then(function() {
        return Ys().crypto.subtle.digest(Iy, l.toHash);
      }).then(function(u) {
        return Promise.resolve(new Uint8Array(u));
      });
    }, i.prototype.reset = function() {
      var l = this;
      this.toHash = new Uint8Array(0), this.secret && this.secret !== void 0 && (this.key = new Promise(function(u, r) {
        Ys().crypto.subtle.importKey("raw", ml(l.secret), sy, !1, ["sign"]).then(u, r);
      }), this.key.catch(function() {
      }));
    }, i;
  })()
);
function tE(i, l, u, r) {
  function o(d) {
    return d instanceof u ? d : new u(function(y) {
      y(d);
    });
  }
  return new (u || (u = Promise))(function(d, y) {
    function p(b) {
      try {
        h(r.next(b));
      } catch (S) {
        y(S);
      }
    }
    function g(b) {
      try {
        h(r.throw(b));
      } catch (S) {
        y(S);
      }
    }
    function h(b) {
      b.done ? d(b.value) : o(b.value).then(p, g);
    }
    h((r = r.apply(i, l || [])).next());
  });
}
function eE(i, l) {
  var u = { label: 0, sent: function() {
    if (d[0] & 1) throw d[1];
    return d[1];
  }, trys: [], ops: [] }, r, o, d, y = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return y.next = p(0), y.throw = p(1), y.return = p(2), typeof Symbol == "function" && (y[Symbol.iterator] = function() {
    return this;
  }), y;
  function p(h) {
    return function(b) {
      return g([h, b]);
    };
  }
  function g(h) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; y && (y = 0, h[0] && (u = 0)), u; ) try {
      if (r = 1, o && (d = h[0] & 2 ? o.return : h[0] ? o.throw || ((d = o.return) && d.call(o), 0) : o.next) && !(d = d.call(o, h[1])).done) return d;
      switch (o = 0, d && (h = [h[0] & 2, d.value]), h[0]) {
        case 0:
        case 1:
          d = h;
          break;
        case 4:
          return u.label++, { value: h[1], done: !1 };
        case 5:
          u.label++, o = h[1], h = [0];
          continue;
        case 7:
          h = u.ops.pop(), u.trys.pop();
          continue;
        default:
          if (d = u.trys, !(d = d.length > 0 && d[d.length - 1]) && (h[0] === 6 || h[0] === 2)) {
            u = 0;
            continue;
          }
          if (h[0] === 3 && (!d || h[1] > d[0] && h[1] < d[3])) {
            u.label = h[1];
            break;
          }
          if (h[0] === 6 && u.label < d[1]) {
            u.label = d[1], d = h;
            break;
          }
          if (d && u.label < d[2]) {
            u.label = d[2], u.ops.push(h);
            break;
          }
          d[2] && u.ops.pop(), u.trys.pop();
          continue;
      }
      h = l.call(i, u);
    } catch (b) {
      h = [6, b], o = 0;
    } finally {
      r = d = 0;
    }
    if (h[0] & 5) throw h[1];
    return { value: h[0] ? h[1] : void 0, done: !0 };
  }
}
var we = 64, nE = 32, aE = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), iE = [
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
], lE = Math.pow(2, 53) - 1, Xs = (
  /** @class */
  (function() {
    function i() {
      this.state = Int32Array.from(iE), this.temp = new Int32Array(64), this.buffer = new Uint8Array(64), this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1;
    }
    return i.prototype.update = function(l) {
      if (this.finished)
        throw new Error("Attempted to update an already finished hash.");
      var u = 0, r = l.byteLength;
      if (this.bytesHashed += r, this.bytesHashed * 8 > lE)
        throw new Error("Cannot hash more than 2^53 - 1 bits");
      for (; r > 0; )
        this.buffer[this.bufferLength++] = l[u++], r--, this.bufferLength === we && (this.hashBuffer(), this.bufferLength = 0);
    }, i.prototype.digest = function() {
      if (!this.finished) {
        var l = this.bytesHashed * 8, u = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength), r = this.bufferLength;
        if (u.setUint8(this.bufferLength++, 128), r % we >= we - 8) {
          for (var o = this.bufferLength; o < we; o++)
            u.setUint8(o, 0);
          this.hashBuffer(), this.bufferLength = 0;
        }
        for (var o = this.bufferLength; o < we - 8; o++)
          u.setUint8(o, 0);
        u.setUint32(we - 8, Math.floor(l / 4294967296), !0), u.setUint32(we - 4, l), this.hashBuffer(), this.finished = !0;
      }
      for (var d = new Uint8Array(nE), o = 0; o < 8; o++)
        d[o * 4] = this.state[o] >>> 24 & 255, d[o * 4 + 1] = this.state[o] >>> 16 & 255, d[o * 4 + 2] = this.state[o] >>> 8 & 255, d[o * 4 + 3] = this.state[o] >>> 0 & 255;
      return d;
    }, i.prototype.hashBuffer = function() {
      for (var l = this, u = l.buffer, r = l.state, o = r[0], d = r[1], y = r[2], p = r[3], g = r[4], h = r[5], b = r[6], S = r[7], A = 0; A < we; A++) {
        if (A < 16)
          this.temp[A] = (u[A * 4] & 255) << 24 | (u[A * 4 + 1] & 255) << 16 | (u[A * 4 + 2] & 255) << 8 | u[A * 4 + 3] & 255;
        else {
          var _ = this.temp[A - 2], z = (_ >>> 17 | _ << 15) ^ (_ >>> 19 | _ << 13) ^ _ >>> 10;
          _ = this.temp[A - 15];
          var N = (_ >>> 7 | _ << 25) ^ (_ >>> 18 | _ << 14) ^ _ >>> 3;
          this.temp[A] = (z + this.temp[A - 7] | 0) + (N + this.temp[A - 16] | 0);
        }
        var j = (((g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7)) + (g & h ^ ~g & b) | 0) + (S + (aE[A] + this.temp[A] | 0) | 0) | 0, q = ((o >>> 2 | o << 30) ^ (o >>> 13 | o << 19) ^ (o >>> 22 | o << 10)) + (o & d ^ o & y ^ d & y) | 0;
        S = b, b = h, h = g, g = p + j | 0, p = y, y = d, d = o, o = j + q | 0;
      }
      r[0] += o, r[1] += d, r[2] += y, r[3] += p, r[4] += g, r[5] += h, r[6] += b, r[7] += S;
    }, i;
  })()
), sE = (
  /** @class */
  (function() {
    function i(l) {
      this.secret = l, this.hash = new Xs(), this.reset();
    }
    return i.prototype.update = function(l) {
      if (!(Wc(l) || this.error))
        try {
          this.hash.update(ml(l));
        } catch (u) {
          this.error = u;
        }
    }, i.prototype.digestSync = function() {
      if (this.error)
        throw this.error;
      return this.outer ? (this.outer.finished || this.outer.update(this.hash.digest()), this.outer.digest()) : this.hash.digest();
    }, i.prototype.digest = function() {
      return tE(this, void 0, void 0, function() {
        return eE(this, function(l) {
          return [2, this.digestSync()];
        });
      });
    }, i.prototype.reset = function() {
      if (this.hash = new Xs(), this.secret) {
        this.outer = new Xs();
        var l = uE(this.secret), u = new Uint8Array(we);
        u.set(l);
        for (var r = 0; r < we; r++)
          l[r] ^= 54, u[r] ^= 92;
        this.hash.update(l), this.outer.update(u);
        for (var r = 0; r < l.byteLength; r++)
          l[r] = 0;
      }
    }, i;
  })()
);
function uE(i) {
  var l = ml(i);
  if (l.byteLength > we) {
    var u = new Xs();
    u.update(l), l = u.digest();
  }
  var r = new Uint8Array(we);
  return r.set(l), r;
}
var rE = [
  "decrypt",
  "digest",
  "encrypt",
  "exportKey",
  "generateKey",
  "importKey",
  "sign",
  "verify"
];
function cE(i) {
  if (oE(i) && typeof i.crypto.subtle == "object") {
    var l = i.crypto.subtle;
    return fE(l);
  }
  return !1;
}
function oE(i) {
  if (typeof i == "object" && typeof i.crypto == "object") {
    var l = i.crypto.getRandomValues;
    return typeof l == "function";
  }
  return !1;
}
function fE(i) {
  return i && rE.every(function(l) {
    return typeof i[l] == "function";
  });
}
var dE = (
  /** @class */
  (function() {
    function i(l) {
      cE(Ys()) ? this.hash = new Pb(l) : this.hash = new sE(l);
    }
    return i.prototype.update = function(l, u) {
      this.hash.update(ml(l));
    }, i.prototype.digest = function() {
      return this.hash.digest();
    }, i.prototype.reset = function() {
      this.hash.reset();
    }, i;
  })()
);
const hE = ({ serviceId: i, clientVersion: l }) => async (u) => {
  var _, z, N;
  const r = typeof window < "u" ? window.navigator : void 0, o = (r == null ? void 0 : r.userAgent) ?? "", d = ((_ = r == null ? void 0 : r.userAgentData) == null ? void 0 : _.platform) ?? uy.os(o) ?? "other", y = void 0, p = ((z = r == null ? void 0 : r.userAgentData) == null ? void 0 : z.brands) ?? [], g = p[p.length - 1], h = (g == null ? void 0 : g.brand) ?? uy.browser(o) ?? "unknown", b = (g == null ? void 0 : g.version) ?? "unknown", S = [
    ["aws-sdk-js", l],
    ["ua", "2.1"],
    [`os/${d}`, y],
    ["lang/js"],
    ["md/browser", `${h}_${b}`]
  ];
  i && S.push([`api/${i}`, l]);
  const A = await ((N = u == null ? void 0 : u.userAgentAppId) == null ? void 0 : N.call(u));
  return A && S.push([`app/${A}`]), S;
}, uy = {
  os(i) {
    if (/iPhone|iPad|iPod/.test(i))
      return "iOS";
    if (/Macintosh|Mac OS X/.test(i))
      return "macOS";
    if (/Windows NT/.test(i))
      return "Windows";
    if (/Android/.test(i))
      return "Android";
    if (/Linux/.test(i))
      return "Linux";
  },
  browser(i) {
    if (/EdgiOS|EdgA|Edg\//.test(i))
      return "Microsoft Edge";
    if (/Firefox\//.test(i))
      return "Firefox";
    if (/Chrome\//.test(i))
      return "Chrome";
    if (/Safari\//.test(i))
      return "Safari";
  }
}, mE = (i) => () => Promise.reject(i), ry = typeof TextEncoder == "function" ? new TextEncoder() : null, yE = (i) => {
  if (typeof i == "string") {
    if (ry)
      return ry.encode(i).byteLength;
    let l = i.length;
    for (let u = l - 1; u >= 0; u--) {
      const r = i.charCodeAt(u);
      r > 127 && r <= 2047 ? l++ : r > 2047 && r <= 65535 && (l += 2), r >= 56320 && r <= 57343 && u--;
    }
    return l;
  } else {
    if (typeof i.byteLength == "number")
      return i.byteLength;
    if (typeof i.size == "number")
      return i.size;
  }
  throw new Error(`Body Length computation failed for ${i}`);
}, gE = ["in-region", "cross-region", "mobile", "standard", "legacy"], pE = ({ defaultsMode: i } = {}) => hb(async () => {
  const l = typeof i == "function" ? await i() : i;
  switch (l == null ? void 0 : l.toLowerCase()) {
    case "auto":
      return Promise.resolve(SE() ? "mobile" : "standard");
    case "mobile":
    case "in-region":
    case "cross-region":
    case "standard":
    case "legacy":
      return Promise.resolve(l == null ? void 0 : l.toLocaleLowerCase());
    case void 0:
      return Promise.resolve("legacy");
    default:
      throw new Error(`Invalid parameter for "defaultsMode", expect ${gE.join(", ")}, got ${l}`);
  }
}), SE = () => {
  var l;
  const i = window == null ? void 0 : window.navigator;
  if (i != null && i.connection) {
    const { effectiveType: u, rtt: r, downlink: o } = i == null ? void 0 : i.connection;
    if (typeof u == "string" && u !== "4g" || Number(r) > 100 || Number(o) < 10)
      return !0;
  }
  return ((l = i == null ? void 0 : i.userAgentData) == null ? void 0 : l.mobile) || typeof (i == null ? void 0 : i.maxTouchPoints) == "number" && (i == null ? void 0 : i.maxTouchPoints) > 1;
};
class vE {
  constructor(l = !1) {
    M(this, "queryCompat");
    M(this, "errorRegistry");
    this.queryCompat = l;
  }
  resolveRestContentType(l, u) {
    const r = u.getMemberSchemas(), o = Object.values(r).find((d) => !!d.getMergedTraits().httpPayload);
    if (o) {
      const d = o.getMergedTraits().mediaType;
      return d || (o.isStringSchema() ? "text/plain" : o.isBlobSchema() ? "application/octet-stream" : l);
    } else if (!u.isUnitSchema() && Object.values(r).find((y) => {
      const { httpQuery: p, httpQueryParams: g, httpHeader: h, httpLabel: b, httpPrefixHeaders: S } = y.getMergedTraits();
      return !p && !g && !h && !b && S === void 0;
    }))
      return l;
  }
  async getErrorSchemaOrThrowBaseException(l, u, r, o, d, y) {
    var h, b;
    let p = l;
    l.includes("#") && ([, p] = l.split("#"));
    const g = {
      $metadata: d,
      $fault: r.statusCode < 500 ? "client" : "server"
    };
    if (!this.errorRegistry)
      throw new Error("@aws-sdk/core/protocols - error handler not initialized.");
    try {
      return { errorSchema: (y == null ? void 0 : y(this.errorRegistry, p)) ?? this.errorRegistry.getSchema(l), errorMetadata: g };
    } catch {
      o.message = o.message ?? o.Message ?? "UnknownError";
      const A = this.errorRegistry, _ = A.getBaseException();
      if (_) {
        const j = A.getErrorCtor(_) ?? Error;
        throw this.decorateServiceException(Object.assign(new j({ name: p }), g), o);
      }
      const z = o, N = (z == null ? void 0 : z.message) ?? (z == null ? void 0 : z.Message) ?? ((h = z == null ? void 0 : z.Error) == null ? void 0 : h.Message) ?? ((b = z == null ? void 0 : z.Error) == null ? void 0 : b.message);
      throw this.decorateServiceException(Object.assign(new Error(N), {
        name: p
      }, g), o);
    }
  }
  compose(l, u, r) {
    let o = r;
    u.includes("#") && ([o] = u.split("#"));
    const d = da.for(o), y = da.for("smithy.ts.sdk.synthetic." + r);
    l.copyFrom(d), l.copyFrom(y), this.errorRegistry = l;
  }
  decorateServiceException(l, u = {}) {
    var r, o, d, y;
    if (this.queryCompat) {
      const p = l.Message ?? u.Message, g = Im(l, u);
      p && (g.message = p);
      const h = g.Error ?? {};
      h.Type = (r = g.Error) == null ? void 0 : r.Type, h.Code = (o = g.Error) == null ? void 0 : o.Code, h.Message = ((d = g.Error) == null ? void 0 : d.message) ?? ((y = g.Error) == null ? void 0 : y.Message) ?? p, g.Error = h;
      const b = g.$metadata.requestId;
      return b && (g.RequestId = b), g;
    }
    return Im(l, u);
  }
  setQueryCompatError(l, u) {
    var o;
    const r = (o = u.headers) == null ? void 0 : o["x-amzn-query-error"];
    if (l !== void 0 && r != null) {
      const [d, y] = r.split(";"), p = Object.keys(l), g = {
        Code: d,
        Type: y
      };
      l.Code = d, l.Type = y;
      for (let h = 0; h < p.length; h++) {
        const b = p[h];
        g[b === "message" ? "Message" : b] = l[b];
      }
      delete g.__type, l.Error = g;
    }
  }
  queryCompatOutput(l, u) {
    l.Error && (u.Error = l.Error), l.Type && (u.Type = l.Type), l.Code && (u.Code = l.Code);
  }
  findQueryCompatibleError(l, u) {
    try {
      return l.getSchema(u);
    } catch {
      return l.find((o) => {
        var d;
        return ((d = ae.of(o).getMergedTraits().awsQueryError) == null ? void 0 : d[0]) === u;
      });
    }
  }
}
class ro {
  constructor() {
    M(this, "serdeContext");
  }
  setSerdeContext(l) {
    this.serdeContext = l;
  }
}
class bE {
  constructor(l, u) {
    M(this, "from");
    M(this, "to");
    M(this, "keys");
    this.from = l, this.to = u;
    const r = Object.keys(this.from), o = new Set(r);
    o.delete("__type"), this.keys = o;
  }
  mark(l) {
    this.keys.delete(l);
  }
  hasUnknown() {
    return this.keys.size === 1 && Object.keys(this.to).length === 0;
  }
  writeUnknown() {
    if (this.hasUnknown()) {
      const l = this.keys.values().next().value, u = this.from[l];
      this.to.$unknown = [l, u];
    }
  }
}
function EE(i, l, u) {
  if (u != null && u.source) {
    const r = u.source;
    if (typeof l == "number" && (l > Number.MAX_SAFE_INTEGER || l < Number.MIN_SAFE_INTEGER || r !== String(l)))
      return r.includes(".") ? new qe(r, "bigDecimal") : BigInt(r);
  }
  return l;
}
const TE = (i, l) => Zc(i, l).then((u) => ((l == null ? void 0 : l.utf8Encoder) ?? Is)(u)), AE = (i, l) => TE(i, l).then((u) => {
  if (u.length)
    try {
      return JSON.parse(u);
    } catch (r) {
      throw (r == null ? void 0 : r.name) === "SyntaxError" && Object.defineProperty(r, "$responseBodyText", {
        value: u
      }), r;
    }
  return {};
}), cy = (i, l) => Object.keys(i).find((u) => u.toLowerCase() === l.toLowerCase()), Yc = (i) => {
  let l = i;
  return typeof l == "number" && (l = l.toString()), l.indexOf(",") >= 0 && (l = l.split(",")[0]), l.indexOf(":") >= 0 && (l = l.split(":")[0]), l.indexOf("#") >= 0 && (l = l.split("#")[1]), l;
}, RE = (i, l) => {
  const u = cy(i.headers, "x-amzn-errortype");
  if (u !== void 0)
    return Yc(i.headers[u]);
  if (l && typeof l == "object") {
    const r = cy(l, "code");
    if (r && l[r] !== void 0)
      return Yc(l[r]);
    if (l.__type !== void 0)
      return Yc(l.__type);
  }
};
class _E extends ro {
  constructor(u) {
    super();
    M(this, "settings");
    this.settings = u;
  }
  async read(u, r) {
    return this._read(u, typeof r == "string" ? JSON.parse(r, EE) : await AE(r, this.serdeContext));
  }
  readObject(u, r) {
    return this._read(u, r);
  }
  _read(u, r) {
    const o = r !== null && typeof r == "object", d = ae.of(u);
    if (o) {
      if (d.isStructSchema()) {
        const p = r, g = d.isUnionSchema(), h = {};
        let b;
        const { jsonName: S } = this.settings;
        S && (b = {});
        let A;
        g && (A = new bE(p, h));
        for (const [_, z] of d.structIterator()) {
          let N = _;
          S && (N = z.getMergedTraits().jsonName ?? N, b[N] = _), g && A.mark(N), p[N] != null && (h[_] = this._read(z, p[N]));
        }
        if (g)
          A.writeUnknown();
        else if (typeof p.__type == "string")
          for (const _ in p) {
            const z = p[_], N = S ? b[_] ?? _ : _;
            N in h || (h[N] = z);
          }
        return h;
      }
      if (Array.isArray(r) && d.isListSchema()) {
        const p = d.getValueSchema(), g = [];
        for (const h of r)
          g.push(this._read(p, h));
        return g;
      }
      if (d.isMapSchema()) {
        const p = d.getValueSchema(), g = {};
        for (const h in r)
          g[h] = this._read(p, r[h]);
        return g;
      }
    }
    if (d.isBlobSchema() && typeof r == "string")
      return ks(r);
    const y = d.getMergedTraits().mediaType;
    if (d.isStringSchema() && typeof r == "string" && y)
      return y === "application/json" || y.endsWith("+json") ? Ln.from(r) : r;
    if (d.isTimestampSchema() && r != null)
      switch (Ry(d, this.settings)) {
        case 5:
          return tv(r);
        case 6:
          return Ty(r);
        case 7:
          return iv(r);
        default:
          return console.warn("Missing timestamp format, parsing value with Date constructor:", r), new Date(r);
      }
    if (d.isBigIntegerSchema() && (typeof r == "number" || typeof r == "string"))
      return BigInt(r);
    if (d.isBigDecimalSchema() && r != null) {
      if (r instanceof qe)
        return r;
      const p = r;
      return p.type === "bigDecimal" && "string" in p ? new qe(p.string, p.type) : new qe(String(r), "bigDecimal");
    }
    if (d.isNumericSchema() && typeof r == "string") {
      switch (r) {
        case "Infinity":
          return 1 / 0;
        case "-Infinity":
          return -1 / 0;
        case "NaN":
          return NaN;
      }
      return r;
    }
    if (d.isDocumentSchema())
      if (o) {
        const p = Array.isArray(r) ? [] : {};
        for (const g in r) {
          const h = r[g];
          h instanceof qe ? p[g] = h : p[g] = this._read(d, h);
        }
        return p;
      } else
        return structuredClone(r);
    return r;
  }
}
const oy = "Ν";
class wE {
  constructor() {
    M(this, "values", /* @__PURE__ */ new Map());
    M(this, "counter", 0);
    M(this, "stage", 0);
  }
  createReplacer() {
    if (this.stage === 1)
      throw new Error("@aws-sdk/core/protocols - JsonReplacer already created.");
    if (this.stage === 2)
      throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
    return this.stage = 1, (l, u) => {
      if (u instanceof qe) {
        const r = `${oy + "nv" + this.counter++}_` + u.string;
        return this.values.set(`"${r}"`, u.string), r;
      }
      if (typeof u == "bigint") {
        const r = u.toString(), o = `${oy + "b" + this.counter++}_` + r;
        return this.values.set(`"${o}"`, r), o;
      }
      return u;
    };
  }
  replaceInJson(l) {
    if (this.stage === 0)
      throw new Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
    if (this.stage === 2)
      throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
    if (this.stage = 2, this.counter === 0)
      return l;
    for (const [u, r] of this.values)
      l = l.replace(u, r);
    return l;
  }
}
class CE extends ro {
  constructor(u) {
    super();
    M(this, "settings");
    M(this, "buffer");
    M(this, "useReplacer", !1);
    M(this, "rootSchema");
    this.settings = u;
  }
  write(u, r) {
    this.rootSchema = ae.of(u), this.buffer = this._write(this.rootSchema, r);
  }
  flush() {
    const { rootSchema: u, useReplacer: r } = this;
    if (this.rootSchema = void 0, this.useReplacer = !1, u != null && u.isStructSchema() || u != null && u.isDocumentSchema()) {
      if (!r)
        return JSON.stringify(this.buffer);
      const o = new wE();
      return o.replaceInJson(JSON.stringify(this.buffer, o.createReplacer(), 0));
    }
    return this.buffer;
  }
  writeDiscriminatedDocument(u, r) {
    this.write(u, r), typeof this.buffer == "object" && (this.buffer.__type = ae.of(u).getName(!0));
  }
  _write(u, r, o) {
    var p, g;
    const d = r !== null && typeof r == "object", y = ae.of(u);
    if (d) {
      if (y.isStructSchema()) {
        const h = r, b = {}, { jsonName: S } = this.settings;
        let A;
        S && (A = {});
        let _ = 0;
        for (const [z, N] of y.structIterator()) {
          const j = this._write(N, h[z], y);
          if (j !== void 0) {
            let q = z;
            S && (q = N.getMergedTraits().jsonName ?? z, A[z] = q), b[q] = j, _++;
          }
        }
        if (y.isUnionSchema() && _ === 0) {
          const { $unknown: z } = h;
          if (Array.isArray(z)) {
            const [N, j] = z;
            b[N] = this._write(15, j);
          }
        } else if (typeof h.__type == "string")
          for (const z in h) {
            const N = h[z], j = S ? A[z] ?? z : z;
            j in b || (b[j] = this._write(15, N));
          }
        return b;
      }
      if (Array.isArray(r) && y.isListSchema()) {
        const h = y.getValueSchema(), b = [], S = !!y.getMergedTraits().sparse;
        for (const A of r)
          (S || A != null) && b.push(this._write(h, A));
        return b;
      }
      if (y.isMapSchema()) {
        const h = y.getValueSchema(), b = {}, S = !!y.getMergedTraits().sparse;
        for (const A in r) {
          const _ = r[A];
          (S || _ != null) && (b[A] = this._write(h, _));
        }
        return b;
      }
      if (r instanceof Uint8Array && (y.isBlobSchema() || y.isDocumentSchema()))
        return y === this.rootSchema ? r : (((p = this.serdeContext) == null ? void 0 : p.base64Encoder) ?? Vs)(r);
      if (r instanceof Date && (y.isTimestampSchema() || y.isDocumentSchema()))
        switch (Ry(y, this.settings)) {
          case 5:
            return r.toISOString().replace(".000Z", "Z");
          case 6:
            return WS(r);
          case 7:
            return r.getTime() / 1e3;
          default:
            return console.warn("Missing timestamp format, using epoch seconds", r), r.getTime() / 1e3;
        }
      r instanceof qe && (this.useReplacer = !0);
    }
    if (!(r === null && (o != null && o.isStructSchema()))) {
      if (y.isStringSchema()) {
        if (typeof r > "u" && y.isIdempotencyToken())
          return Ay();
        const h = y.getMergedTraits().mediaType;
        return r != null && h && (h === "application/json" || h.endsWith("+json")) ? Ln.from(r) : r;
      }
      if (typeof r == "number" && y.isNumericSchema())
        return Math.abs(r) === 1 / 0 || isNaN(r) ? String(r) : r;
      if (typeof r == "string" && y.isBlobSchema())
        return y === this.rootSchema ? r : (((g = this.serdeContext) == null ? void 0 : g.base64Encoder) ?? Vs)(r);
      if (typeof r == "bigint" && (this.useReplacer = !0), y.isDocumentSchema())
        if (d) {
          const h = Array.isArray(r) ? [] : {};
          for (const b in r) {
            const S = r[b];
            S instanceof qe ? (this.useReplacer = !0, h[b] = S) : h[b] = this._write(y, S);
          }
          return h;
        } else
          return structuredClone(r);
      return r;
    }
  }
}
class ME extends ro {
  constructor(u) {
    super();
    M(this, "settings");
    this.settings = u;
  }
  createSerializer() {
    const u = new CE(this.settings);
    return u.setSerdeContext(this.serdeContext), u;
  }
  createDeserializer() {
    const u = new _E(this.settings);
    return u.setSerdeContext(this.serdeContext), u;
  }
}
class OE extends yv {
  constructor({ defaultNamespace: u, errorTypeRegistries: r, serviceTarget: o, awsQueryCompatible: d, jsonCodec: y }) {
    super({
      defaultNamespace: u,
      errorTypeRegistries: r
    });
    M(this, "serializer");
    M(this, "deserializer");
    M(this, "serviceTarget");
    M(this, "codec");
    M(this, "mixin");
    M(this, "awsQueryCompatible");
    this.serviceTarget = o, this.codec = y ?? new ME({
      timestampFormat: {
        useTrait: !0,
        default: 7
      },
      jsonName: !1
    }), this.serializer = this.codec.createSerializer(), this.deserializer = this.codec.createDeserializer(), this.awsQueryCompatible = !!d, this.mixin = new vE(this.awsQueryCompatible);
  }
  async serializeRequest(u, r, o) {
    const d = await super.serializeRequest(u, r, o);
    return d.path.endsWith("/") || (d.path += "/"), d.headers["content-type"] = `application/x-amz-json-${this.getJsonRpcVersion()}`, d.headers["x-amz-target"] = `${this.serviceTarget}.${u.name}`, this.awsQueryCompatible && (d.headers["x-amzn-query-mode"] = "true"), (Qs(u.input) === "unit" || !d.body) && (d.body = "{}"), d;
  }
  getPayloadCodec() {
    return this.codec;
  }
  async handleError(u, r, o, d, y) {
    this.awsQueryCompatible && this.mixin.setQueryCompatError(d, o);
    const p = RE(o, d) ?? "Unknown";
    this.mixin.compose(this.compositeErrorRegistry, p, this.options.defaultNamespace);
    const { errorSchema: g, errorMetadata: h } = await this.mixin.getErrorSchemaOrThrowBaseException(p, this.options.defaultNamespace, o, d, y, this.awsQueryCompatible ? this.mixin.findQueryCompatibleError : void 0), b = ae.of(g), S = d.message ?? d.Message ?? "UnknownError", A = this.compositeErrorRegistry.getErrorCtor(g) ?? Error, _ = new A(S), z = {}, N = this.codec.createDeserializer();
    for (const [j, q] of b.structIterator())
      d[j] != null && (z[j] = N.readObject(q, d[j]));
    throw this.awsQueryCompatible && this.mixin.queryCompatOutput(d, z), this.mixin.decorateServiceException(Object.assign(_, h, {
      $fault: b.getMergedTraits().error,
      message: S
    }, z), d);
  }
}
class zE extends OE {
  constructor({ defaultNamespace: l, errorTypeRegistries: u, serviceTarget: r, awsQueryCompatible: o, jsonCodec: d }) {
    super({
      defaultNamespace: l,
      errorTypeRegistries: u,
      serviceTarget: r,
      awsQueryCompatible: o,
      jsonCodec: d
    });
  }
  getShapeId() {
    return "aws.protocols#awsJson1_1";
  }
  getJsonRpcVersion() {
    return "1.1";
  }
  getDefaultContentType() {
    return "application/x-amz-json-1.1";
  }
}
const yl = "ref", ua = -1, js = !0, fy = "isSet", Fy = "PartitionResult", qs = "booleanEquals", dy = "getAttr", hy = { [yl]: "Endpoint" }, my = { [yl]: Fy }, al = {}, yy = [{ [yl]: "Region" }], gy = {
  conditions: [
    [fy, [hy]],
    [fy, yy],
    ["aws.partition", yy, Fy],
    [qs, [{ [yl]: "UseFIPS" }, js]],
    [qs, [{ [yl]: "UseDualStack" }, js]],
    [qs, [{ fn: dy, argv: [my, "supportsDualStack"] }, js]],
    [qs, [{ fn: dy, argv: [my, "supportsFIPS"] }, js]]
  ],
  results: [
    [ua],
    [ua, "Invalid Configuration: FIPS and custom endpoint are not supported"],
    [ua, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
    [hy, al],
    ["https://athena-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", al],
    [ua, "FIPS and DualStack are enabled, but this partition does not support one or both"],
    ["https://athena-fips.{Region}.{PartitionResult#dnsSuffix}", al],
    [ua, "FIPS is enabled but this partition does not support FIPS"],
    ["https://athena.{Region}.{PartitionResult#dualStackDnsSuffix}", al],
    [ua, "DualStack is enabled but this partition does not support DualStack"],
    ["https://athena.{Region}.{PartitionResult#dnsSuffix}", al],
    [ua, "Invalid Configuration: Missing Region"]
  ]
}, DE = 2, me = 1e8, xE = new Int32Array([
  -1,
  1,
  -1,
  0,
  12,
  3,
  1,
  4,
  me + 11,
  2,
  5,
  me + 11,
  3,
  8,
  6,
  4,
  7,
  me + 10,
  5,
  me + 8,
  me + 9,
  4,
  10,
  9,
  6,
  me + 6,
  me + 7,
  5,
  11,
  me + 5,
  6,
  me + 4,
  me + 5,
  3,
  me + 1,
  13,
  4,
  me + 2,
  me + 3
]), NE = no.from(xE, DE, gy.conditions, gy.results), UE = new _v({
  size: 50,
  params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
}), HE = (i, l = {}) => UE.get(i, () => $v(NE, {
  endpointParams: i,
  logger: l.logger
}));
ao.aws = Hy;
class rn extends Pa {
  constructor(l) {
    super(l), Object.setPrototypeOf(this, rn.prototype);
  }
}
class co extends rn {
  constructor(u) {
    super({
      name: "InternalServerException",
      $fault: "server",
      ...u
    });
    M(this, "name", "InternalServerException");
    M(this, "$fault", "server");
    M(this, "Message");
    Object.setPrototypeOf(this, co.prototype), this.Message = u.Message;
  }
}
class oo extends rn {
  constructor(u) {
    super({
      name: "InvalidRequestException",
      $fault: "client",
      ...u
    });
    M(this, "name", "InvalidRequestException");
    M(this, "$fault", "client");
    M(this, "AthenaErrorCode");
    M(this, "Message");
    Object.setPrototypeOf(this, oo.prototype), this.AthenaErrorCode = u.AthenaErrorCode, this.Message = u.Message;
  }
}
class fo extends rn {
  constructor(u) {
    super({
      name: "TooManyRequestsException",
      $fault: "client",
      ...u
    });
    M(this, "name", "TooManyRequestsException");
    M(this, "$fault", "client");
    M(this, "Message");
    M(this, "Reason");
    Object.setPrototypeOf(this, fo.prototype), this.Message = u.Message, this.Reason = u.Reason;
  }
}
class ho extends rn {
  constructor(u) {
    super({
      name: "ResourceNotFoundException",
      $fault: "client",
      ...u
    });
    M(this, "name", "ResourceNotFoundException");
    M(this, "$fault", "client");
    M(this, "Message");
    M(this, "ResourceName");
    Object.setPrototypeOf(this, ho.prototype), this.Message = u.Message, this.ResourceName = u.ResourceName;
  }
}
class mo extends rn {
  constructor(u) {
    super({
      name: "MetadataException",
      $fault: "client",
      ...u
    });
    M(this, "name", "MetadataException");
    M(this, "$fault", "client");
    M(this, "Message");
    Object.setPrototypeOf(this, mo.prototype), this.Message = u.Message;
  }
}
class yo extends rn {
  constructor(u) {
    super({
      name: "SessionAlreadyExistsException",
      $fault: "client",
      ...u
    });
    M(this, "name", "SessionAlreadyExistsException");
    M(this, "$fault", "client");
    M(this, "Message");
    Object.setPrototypeOf(this, yo.prototype), this.Message = u.Message;
  }
}
const Wy = "AclConfiguration", BE = "AdditionalConfigs", Py = "AthenaError", LE = "AthenaErrorCode", jE = "AuthenticationType", qE = "Classification", QE = "CoordinatorDpuSize", GE = "CompletionDateTime", tg = "ColumnInfo", YE = "ColumnInfoList", XE = "ClassificationList", VE = "CatalogName", $E = "ClientRequestToken", ZE = "CaseSensitive", KE = "CreateUserLevelPrefix", JE = "Catalog", kE = "Classifications", IE = "DpuCount", FE = "DefaultExecutorDpuSize", WE = "DataManifestLocation", PE = "DataScannedInBytes", tT = "Database", eT = "Datum", nT = "Data", eg = "Enabled", aT = "ExpectedBucketOwner", iT = "ErrorCategory", go = "EncryptionConfiguration", ng = "EngineConfiguration", lT = "EngineExecutionTimeInMillis", sT = "EffectiveEngineVersion", uT = "ErrorMessage", rT = "EncryptionOption", ag = "ExecutionParameters", cT = "EnableS3AccessGrants", oT = "ErrorType", ig = "EngineVersion", fT = "GetQueryExecution", dT = "GetQueryExecutionInput", hT = "GetQueryExecutionOutput", mT = "GetQueryResults", yT = "GetQueryResultsInput", gT = "GetQueryResultsOutput", pT = "InvalidRequestException", ST = "InternalServerException", lg = "KmsKey", vT = "Label", ii = "Message", bT = "MaxAgeInMinutes", ET = "MaxConcurrentDpus", TT = "MetadataException", sg = "ManagedQueryResultsConfiguration", AT = "ManagedQueryResultsEncryptionConfiguration", RT = "MaxResults", ug = "Name", rg = "NextToken", _T = "Nullable", wT = "OutputLocation", CT = "Properties", MT = "Precision", OT = "Query", po = "QueryExecutionContext", eu = "QueryExecutionId", zT = "QueryExecutionStatistics", DT = "QueryExecutionStatus", cg = "QueryExecution", xT = "QueryPlanningTimeInMillis", NT = "QueryQueueTimeInMillis", og = "QueryResultsS3AccessGrantsConfiguration", UT = "QueryResultType", HT = "QueryString", BT = "Reason", So = "ResultConfiguration", LT = "RowList", jT = "ResourceName", qT = "ResourceNotFoundException", QT = "ReusedPreviousResult", fg = "ResultReuseByAgeConfiguration", vo = "ResultReuseConfiguration", dg = "ResultReuseInformation", hg = "ResultSet", mg = "ResultSetMetadata", GT = "Retryable", YT = "Rows", XT = "Row", VT = "State", $T = "SessionAlreadyExistsException", ZT = "S3AclOption", KT = "StateChangeReason", JT = "SubmissionDateTime", kT = "SelectedEngineVersion", IT = "SchemaName", FT = "SparkProperties", WT = "ServicePreProcessingTimeInMillis", PT = "ServiceProcessingTimeInMillis", t2 = "StartQueryExecution", e2 = "StartQueryExecutionInput", n2 = "StartQueryExecutionOutput", a2 = "StatementType", i2 = "SubstatementType", l2 = "Scale", s2 = "Status", u2 = "Statistics", r2 = "Type", c2 = "TotalExecutionTimeInMillis", o2 = "TooManyRequestsException", f2 = "TableName", d2 = "UpdateCount", h2 = "VarCharValue", yg = "WorkGroup", gl = "client", m2 = "datumList", li = "error", gg = "smithy.ts.sdk.synthetic.com.amazonaws.athena", y2 = "server", tt = "com.amazonaws.athena", pg = da.for(gg);
var g2 = [-3, gg, "AthenaServiceException", 0, [], []];
pg.registerError(g2, rn);
const ha = da.for(tt);
var p2 = [
  -3,
  tt,
  ST,
  { [li]: y2 },
  [ii],
  [0]
];
ha.registerError(p2, co);
var S2 = [
  -3,
  tt,
  pT,
  { [li]: gl },
  [LE, ii],
  [0, 0]
];
ha.registerError(S2, oo);
var v2 = [
  -3,
  tt,
  TT,
  { [li]: gl },
  [ii],
  [0]
];
ha.registerError(v2, mo);
var b2 = [
  -3,
  tt,
  qT,
  { [li]: gl },
  [ii, jT],
  [0, 0]
];
ha.registerError(b2, ho);
var E2 = [
  -3,
  tt,
  $T,
  { [li]: gl },
  [ii],
  [0]
];
ha.registerError(E2, yo);
var T2 = [
  -3,
  tt,
  o2,
  { [li]: gl },
  [ii, BT],
  [0, 0]
];
ha.registerError(T2, fo);
const A2 = [
  pg,
  ha
];
var R2 = [
  3,
  tt,
  Wy,
  0,
  [ZT],
  [0],
  1
], _2 = [
  3,
  tt,
  Py,
  0,
  [iT, oT, GT, uT],
  [1, 1, 2, 0]
], w2 = [
  3,
  tt,
  qE,
  0,
  [ug, CT],
  [0, 128]
], C2 = [
  3,
  tt,
  tg,
  0,
  [ug, r2, VE, IT, f2, vT, MT, l2, _T, ZE],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 2],
  2
], M2 = [
  3,
  tt,
  eT,
  0,
  [h2],
  [0]
], O2 = [
  3,
  tt,
  go,
  0,
  [rT, lg],
  [0, 0],
  1
], z2 = [
  3,
  tt,
  ng,
  0,
  [QE, ET, FE, BE, FT, kE],
  [1, 1, 1, 128, 128, () => k2]
], D2 = [
  3,
  tt,
  ig,
  0,
  [kT, sT],
  [0, 0]
], x2 = [
  3,
  tt,
  dT,
  0,
  [eu],
  [0],
  1
], N2 = [
  3,
  tt,
  hT,
  0,
  [cg],
  [() => j2]
], U2 = [
  3,
  tt,
  yT,
  0,
  [eu, rg, RT, UT],
  [0, 0, 1, 0],
  1
], H2 = [
  3,
  tt,
  gT,
  0,
  [d2, hg, rg],
  [1, () => V2, 0]
], B2 = [
  3,
  tt,
  sg,
  0,
  [eg, go],
  [2, () => L2],
  1
], L2 = [
  3,
  tt,
  AT,
  0,
  [lg],
  [0],
  1
], j2 = [
  3,
  tt,
  cg,
  0,
  [eu, OT, a2, sg, So, vo, po, s2, u2, yg, ig, ag, i2, og],
  [0, 0, 0, () => B2, () => vg, () => bg, () => Sg, () => Q2, () => q2, 0, () => D2, 64, 0, () => G2]
], Sg = [
  3,
  tt,
  po,
  0,
  [tT, JE],
  [0, 0]
], q2 = [
  3,
  tt,
  zT,
  0,
  [lT, PE, WE, c2, NT, WT, xT, PT, dg, IE],
  [1, 1, 0, 1, 1, 1, 1, 1, () => X2, 1]
], Q2 = [
  3,
  tt,
  DT,
  0,
  [VT, KT, JT, GE, Py],
  [0, 0, 4, 4, () => _2]
], G2 = [
  3,
  tt,
  og,
  0,
  [cT, jE, KE],
  [2, 0, 2],
  2
], vg = [
  3,
  tt,
  So,
  0,
  [wT, go, aT, Wy],
  [0, () => O2, 0, () => R2]
], Y2 = [
  3,
  tt,
  fg,
  0,
  [eg, bT],
  [2, 1],
  1
], bg = [
  3,
  tt,
  vo,
  0,
  [fg],
  [() => Y2]
], X2 = [
  3,
  tt,
  dg,
  0,
  [QT],
  [2],
  1
], V2 = [
  3,
  tt,
  hg,
  0,
  [YT, mg],
  [() => W2, () => $2]
], $2 = [
  3,
  tt,
  mg,
  0,
  [tg],
  [() => I2]
], Z2 = [
  3,
  tt,
  XT,
  0,
  [nT],
  [() => F2]
], K2 = [
  3,
  tt,
  e2,
  0,
  [HT, $E, po, So, yg, ag, vo, ng],
  [0, [0, 4], () => Sg, () => vg, 0, 64, () => bg, () => z2],
  1
], J2 = [
  3,
  tt,
  n2,
  0,
  [eu],
  [0]
], k2 = [
  1,
  tt,
  XE,
  0,
  () => w2
], I2 = [
  1,
  tt,
  YE,
  0,
  () => C2
], F2 = [
  1,
  tt,
  m2,
  0,
  () => M2
], W2 = [
  1,
  tt,
  LT,
  0,
  () => Z2
], P2 = [
  9,
  tt,
  fT,
  0,
  () => x2,
  () => N2
], tA = [
  9,
  tt,
  mT,
  0,
  () => U2,
  () => H2
], eA = [
  9,
  tt,
  t2,
  2,
  () => K2,
  () => J2
];
const nA = (i) => ({
  apiVersion: "2017-05-18",
  base64Decoder: (i == null ? void 0 : i.base64Decoder) ?? ks,
  base64Encoder: (i == null ? void 0 : i.base64Encoder) ?? Vs,
  disableHostPrefix: (i == null ? void 0 : i.disableHostPrefix) ?? !1,
  endpointProvider: (i == null ? void 0 : i.endpointProvider) ?? HE,
  extensions: (i == null ? void 0 : i.extensions) ?? [],
  httpAuthSchemeProvider: (i == null ? void 0 : i.httpAuthSchemeProvider) ?? Vb,
  httpAuthSchemes: (i == null ? void 0 : i.httpAuthSchemes) ?? [
    {
      schemeId: "aws.auth#sigv4",
      identityProvider: (l) => l.getIdentityProvider("aws.auth#sigv4"),
      signer: new db()
    }
  ],
  logger: (i == null ? void 0 : i.logger) ?? new Yy(),
  protocol: (i == null ? void 0 : i.protocol) ?? zE,
  protocolSettings: (i == null ? void 0 : i.protocolSettings) ?? {
    defaultNamespace: "com.amazonaws.athena",
    errorTypeRegistries: A2,
    version: "2017-05-18",
    serviceTarget: "AmazonAthena"
  },
  serviceId: (i == null ? void 0 : i.serviceId) ?? "Athena",
  urlParser: (i == null ? void 0 : i.urlParser) ?? ni,
  utf8Decoder: (i == null ? void 0 : i.utf8Decoder) ?? fa,
  utf8Encoder: (i == null ? void 0 : i.utf8Encoder) ?? Is
}), aA = (i) => {
  const l = pE(i), u = () => l().then(k1), r = nA(i);
  return {
    ...r,
    ...i,
    runtime: "browser",
    defaultsMode: l,
    bodyLengthChecker: (i == null ? void 0 : i.bodyLengthChecker) ?? yE,
    credentialDefaultProvider: (i == null ? void 0 : i.credentialDefaultProvider) ?? ((o) => () => Promise.reject(new Error("Credential is missing"))),
    defaultUserAgentProvider: (i == null ? void 0 : i.defaultUserAgentProvider) ?? hE({ serviceId: r.serviceId, clientVersion: Jb.version }),
    maxAttempts: (i == null ? void 0 : i.maxAttempts) ?? rl,
    region: (i == null ? void 0 : i.region) ?? mE("Region is missing"),
    requestHandler: to.create((i == null ? void 0 : i.requestHandler) ?? u),
    retryMode: (i == null ? void 0 : i.retryMode) ?? (async () => (await u()).retryMode || Pv),
    sha256: (i == null ? void 0 : i.sha256) ?? dE,
    streamCollector: (i == null ? void 0 : i.streamCollector) ?? OS,
    useDualstackEndpoint: (i == null ? void 0 : i.useDualstackEndpoint) ?? (() => Promise.resolve(R1)),
    useFipsEndpoint: (i == null ? void 0 : i.useFipsEndpoint) ?? (() => Promise.resolve(_1))
  };
}, iA = (i) => ({
  setRegion(l) {
    i.region = l;
  },
  region() {
    return i.region;
  }
}), lA = (i) => ({
  region: i.region()
}), sA = (i) => {
  const l = i.httpAuthSchemes;
  let u = i.httpAuthSchemeProvider, r = i.credentials;
  return {
    setHttpAuthScheme(o) {
      const d = l.findIndex((y) => y.schemeId === o.schemeId);
      d === -1 ? l.push(o) : l.splice(d, 1, o);
    },
    httpAuthSchemes() {
      return l;
    },
    setHttpAuthSchemeProvider(o) {
      u = o;
    },
    httpAuthSchemeProvider() {
      return u;
    },
    setCredentials(o) {
      r = o;
    },
    credentials() {
      return r;
    }
  };
}, uA = (i) => ({
  httpAuthSchemes: i.httpAuthSchemes(),
  httpAuthSchemeProvider: i.httpAuthSchemeProvider(),
  credentials: i.credentials()
}), rA = (i, l) => {
  const u = Object.assign(iA(i), tb(i), nS(i), sA(i));
  return l.forEach((r) => r.configure(u)), Object.assign(i, lA(u), eb(u), aS(u), uA(u));
};
class cA extends K1 {
  constructor(...[u]) {
    const r = aA(u || {});
    super(r);
    M(this, "config");
    this.initConfig = r;
    const o = Zb(r), d = Rv(o), y = Z1(d), p = M1(y), g = p, h = V1(g), b = $b(h), S = rA(b, (u == null ? void 0 : u.extensions) || []);
    this.config = S, this.middlewareStack.use(QS(this.config)), this.middlewareStack.use(A1(this.config)), this.middlewareStack.use(cb(this.config)), this.middlewareStack.use(D1(this.config)), this.middlewareStack.use(uS(this.config)), this.middlewareStack.use(oS(this.config)), this.middlewareStack.use(hS(this.config)), this.middlewareStack.use(SS(this.config, {
      httpAuthSchemeParametersProvider: Yb,
      identityProviderConfigProvider: async (A) => new pv({
        "aws.auth#sigv4": A.credentials
      })
    })), this.middlewareStack.use(AS(this.config));
  }
  destroy() {
    super.destroy();
  }
}
class oA extends tu.classBuilder().ep(uo).m(function(l, u, r, o) {
  return [lo(r, l.getEndpointParameterInstructions())];
}).s("AmazonAthena", "GetQueryExecution", {}).n("AthenaClient", "GetQueryExecutionCommand").sc(P2).build() {
}
class fA extends tu.classBuilder().ep(uo).m(function(l, u, r, o) {
  return [lo(r, l.getEndpointParameterInstructions())];
}).s("AmazonAthena", "GetQueryResults", {}).n("AthenaClient", "GetQueryResultsCommand").sc(tA).build() {
}
class dA extends tu.classBuilder().ep(uo).m(function(l, u, r, o) {
  return [lo(r, l.getEndpointParameterInstructions())];
}).s("AmazonAthena", "StartQueryExecution", {}).n("AthenaClient", "StartQueryExecutionCommand").sc(eA).build() {
}
const Xc = {
  QUEUED: "QUEUED",
  RUNNING: "RUNNING",
  SUCCEEDED: "SUCCEEDED"
};
async function hA(i, l, u) {
  var g, h, b;
  const o = (await l.send(
    new dA({
      QueryString: u,
      // required: your SQL
      //   QueryExecutionContext: {
      //     Database: "my_database",                 // optional: target DB
      //     Catalog: "AwsDataCatalog",               // optional: data catalog
      //   },
      ResultConfiguration: {
        OutputLocation: `s3://${i.AWSBucket}/athena-results/`
        // where to store results
      }
      //  WorkGroup: "primary",                      // optional: workgroup name
    })
  )).QueryExecutionId;
  console.log("Query started:", o);
  let d;
  do
    await new Promise((A) => setTimeout(A, 1e3)), d = (h = (g = (await l.send(
      new oA({ QueryExecutionId: o })
    )).QueryExecution) == null ? void 0 : g.Status) == null ? void 0 : h.State, console.log("Query state:", d);
  while (d === Xc.RUNNING || d === Xc.QUEUED);
  if (d !== Xc.SUCCEEDED) {
    const S = (
      /* get failure reason */
      "Query failed with state: " + d
    );
    throw new Error(S);
  }
  return ((b = (await l.send(
    new fA({ QueryExecutionId: o })
  )).ResultSet) == null ? void 0 : b.Rows) ?? [];
}
function mA({ sdk: i }) {
  const [l, u] = Hs.useState(i.getProps()), [r, o] = Hs.useState([]), d = new cA({ region: l.AWSRegion || "us-west-1" });
  return Hs.useEffect(() => i.on("propsChanged", u), [i]), Hs.useEffect(() => {
    hA(l, d, "SELECT title FROM topics LIMIT 10").then(o);
  }, []), /* @__PURE__ */ il.jsxs("section", { className: "react-widget-section", children: [
    /* @__PURE__ */ il.jsx("h3", { className: "react-widget-title", children: "Athena Data" }),
    /* @__PURE__ */ il.jsx("ul", { children: r.map((y, p) => {
      var g;
      return /* @__PURE__ */ il.jsx("li", { children: (g = y.Data) == null ? void 0 : g.map((h) => h.VarCharValue).join(", ") }, p);
    }) })
  ] });
}
async function SA(i) {
  await i.whenReady();
  const l = eS.createRoot(i.getContainer());
  l.render(/* @__PURE__ */ il.jsx(mA, { sdk: i })), i.on("destroy", () => l.unmount());
}
class yA {
  constructor({ marshaller: l, serializer: u, deserializer: r, serdeContext: o, defaultContentType: d }) {
    M(this, "marshaller");
    M(this, "serializer");
    M(this, "deserializer");
    M(this, "serdeContext");
    M(this, "defaultContentType");
    this.marshaller = l, this.serializer = u, this.deserializer = r, this.serdeContext = o, this.defaultContentType = d;
  }
  async serializeEventStream({ eventStream: l, requestSchema: u, initialRequest: r }) {
    const o = this.marshaller, d = u.getEventStreamMember(), y = u.getMemberSchema(d), p = this.serializer, g = this.defaultContentType, h = Symbol("initialRequestMarker"), b = {
      async *[Symbol.asyncIterator]() {
        if (r) {
          const S = {
            ":event-type": { type: "string", value: "initial-request" },
            ":message-type": { type: "string", value: "event" },
            ":content-type": { type: "string", value: g }
          };
          p.write(u, r);
          const A = p.flush();
          yield {
            [h]: !0,
            headers: S,
            body: A
          };
        }
        for await (const S of l)
          yield S;
      }
    };
    return o.serialize(b, (S) => {
      if (S[h])
        return {
          headers: S.headers,
          body: S.body
        };
      let A = "";
      for (const $ in S)
        if ($ !== "__type") {
          A = $;
          break;
        }
      const { additionalHeaders: _, body: z, eventType: N, explicitPayloadContentType: j } = this.writeEventBody(A, y, S);
      return {
        headers: {
          ":event-type": { type: "string", value: N },
          ":message-type": { type: "string", value: "event" },
          ":content-type": { type: "string", value: j ?? g },
          ..._
        },
        body: z
      };
    });
  }
  async deserializeEventStream({ response: l, responseSchema: u, initialResponseContainer: r }) {
    var A;
    const o = this.marshaller, d = u.getEventStreamMember(), p = u.getMemberSchema(d).getMemberSchemas(), g = Symbol("initialResponseMarker"), h = o.deserialize(l.body, async (_) => {
      var j, q;
      let z = "";
      for (const $ in _)
        if ($ !== "__type") {
          z = $;
          break;
        }
      const N = _[z].body;
      if (z === "initial-response") {
        const $ = await this.deserializer.read(u, N);
        return delete $[d], {
          [g]: !0,
          ...$
        };
      } else if (z in p) {
        const $ = p[z];
        if ($.isStructSchema()) {
          const Z = {};
          let lt = !1;
          for (const [ot, ct] of $.structIterator()) {
            const { eventHeader: I, eventPayload: qt } = ct.getMergedTraits();
            if (lt = lt || !!(I || qt), qt)
              ct.isBlobSchema() ? Z[ot] = N : ct.isStringSchema() ? Z[ot] = (((j = this.serdeContext) == null ? void 0 : j.utf8Encoder) ?? Is)(N) : ct.isStructSchema() && (Z[ot] = await this.deserializer.read(ct, N));
            else if (I) {
              const Bt = (q = _[z].headers[ot]) == null ? void 0 : q.value;
              Bt != null && (ct.isNumericSchema() ? Bt && typeof Bt == "object" && "bytes" in Bt ? Z[ot] = BigInt(Bt.toString()) : Z[ot] = Number(Bt) : Z[ot] = Bt);
            }
          }
          if (lt)
            return {
              [z]: Z
            };
          if (N.byteLength === 0)
            return {
              [z]: {}
            };
        }
        return {
          [z]: await this.deserializer.read($, N)
        };
      } else
        return {
          $unknown: _
        };
    }), b = h[Symbol.asyncIterator](), S = await b.next();
    if (S.done)
      return h;
    if ((A = S.value) != null && A[g]) {
      if (!u)
        throw new Error("@smithy::core/protocols - initial-response event encountered in event stream but no response schema given.");
      for (const _ in S.value)
        r[_] = S.value[_];
    }
    return {
      async *[Symbol.asyncIterator]() {
        var _;
        for ((_ = S == null ? void 0 : S.value) != null && _[g] || (yield S.value); ; ) {
          const { done: z, value: N } = await b.next();
          if (z)
            break;
          yield N;
        }
      }
    };
  }
  writeEventBody(l, u, r) {
    var A;
    const o = this.serializer;
    let d = l, y = null, p;
    const g = u.getSchema()[4].includes(l), h = {};
    if (g) {
      const _ = u.getMemberSchema(l);
      if (_.isStructSchema()) {
        for (const [z, N] of _.structIterator()) {
          const { eventHeader: j, eventPayload: q } = N.getMergedTraits();
          if (q)
            y = z;
          else if (j) {
            const $ = r[l][z];
            let Z = "binary";
            N.isNumericSchema() ? (-2) ** 31 <= $ && $ <= 2 ** 31 - 1 ? Z = "integer" : Z = "long" : N.isTimestampSchema() ? Z = "timestamp" : N.isStringSchema() ? Z = "string" : N.isBooleanSchema() && (Z = "boolean"), $ != null && (h[z] = {
              type: Z,
              value: $
            }, delete r[l][z]);
          }
        }
        if (y !== null) {
          const z = _.getMemberSchema(y);
          z.isBlobSchema() ? p = "application/octet-stream" : z.isStringSchema() && (p = "text/plain"), o.write(z, r[l][y]);
        } else
          o.write(_, r[l]);
      } else if (_.isUnitSchema())
        o.write(_, {});
      else
        throw new Error("@smithy/core/event-streams - non-struct member not supported in event stream union.");
    } else {
      const [_, z] = r[l];
      d = _, o.write(15, z);
    }
    const b = o.flush() ?? new Uint8Array();
    return {
      body: typeof b == "string" ? (((A = this.serdeContext) == null ? void 0 : A.utf8Decoder) ?? fa)(b) : b,
      eventType: d,
      explicitPayloadContentType: p,
      additionalHeaders: h
    };
  }
}
const gA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventStreamSerde: yA
}, Symbol.toStringTag, { value: "Module" }));
export {
  SA as init
};
