var Vp = Object.defineProperty;
var Zp = (l, i, s) => i in l ? Vp(l, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : l[i] = s;
var O = (l, i, s) => Zp(l, typeof i != "symbol" ? i + "" : i, s);
var vc = { exports: {} }, Pl = {};
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
function $p() {
  if (Tm) return Pl;
  Tm = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function s(r, f, d) {
    var y = null;
    if (d !== void 0 && (y = "" + d), f.key !== void 0 && (y = "" + f.key), "key" in f) {
      d = {};
      for (var p in f)
        p !== "key" && (d[p] = f[p]);
    } else d = f;
    return f = d.ref, {
      $$typeof: l,
      type: r,
      key: y,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return Pl.Fragment = i, Pl.jsx = s, Pl.jsxs = s, Pl;
}
var Am;
function Kp() {
  return Am || (Am = 1, vc.exports = $p()), vc.exports;
}
var li = Kp(), bc = { exports: {} }, ti = {}, Ec = { exports: {} }, Tc = {};
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
  return Rm || (Rm = 1, (function(l) {
    function i(N, Q) {
      var K = N.length;
      N.push(Q);
      t: for (; 0 < K; ) {
        var yt = K - 1 >>> 1, vt = N[yt];
        if (0 < f(vt, Q))
          N[yt] = Q, N[K] = vt, K = yt;
        else break t;
      }
    }
    function s(N) {
      return N.length === 0 ? null : N[0];
    }
    function r(N) {
      if (N.length === 0) return null;
      var Q = N[0], K = N.pop();
      if (K !== Q) {
        N[0] = K;
        t: for (var yt = 0, vt = N.length, T = vt >>> 1; yt < T; ) {
          var B = 2 * (yt + 1) - 1, G = N[B], X = B + 1, W = N[X];
          if (0 > f(G, K))
            X < vt && 0 > f(W, G) ? (N[yt] = W, N[X] = K, yt = X) : (N[yt] = G, N[B] = K, yt = B);
          else if (X < vt && 0 > f(W, K))
            N[yt] = W, N[X] = K, yt = X;
          else break t;
        }
      }
      return Q;
    }
    function f(N, Q) {
      var K = N.sortIndex - Q.sortIndex;
      return K !== 0 ? K : N.id - Q.id;
    }
    if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      l.unstable_now = function() {
        return d.now();
      };
    } else {
      var y = Date, p = y.now();
      l.unstable_now = function() {
        return y.now() - p;
      };
    }
    var g = [], h = [], b = 1, v = null, A = 3, C = !1, x = !1, L = !1, j = !1, q = typeof setTimeout == "function" ? setTimeout : null, I = typeof clearTimeout == "function" ? clearTimeout : null, F = typeof setImmediate < "u" ? setImmediate : null;
    function rt(N) {
      for (var Q = s(h); Q !== null; ) {
        if (Q.callback === null) r(h);
        else if (Q.startTime <= N)
          r(h), Q.sortIndex = Q.expirationTime, i(g, Q);
        else break;
        Q = s(h);
      }
    }
    function Rt(N) {
      if (L = !1, rt(N), !x)
        if (s(g) !== null)
          x = !0, Et || (Et = !0, Jt());
        else {
          var Q = s(h);
          Q !== null && we(Rt, Q.startTime - N);
        }
    }
    var Et = !1, J = -1, Kt = 5, xe = -1;
    function ha() {
      return j ? !0 : !(l.unstable_now() - xe < Kt);
    }
    function Ne() {
      if (j = !1, Et) {
        var N = l.unstable_now();
        xe = N;
        var Q = !0;
        try {
          t: {
            x = !1, L && (L = !1, I(J), J = -1), C = !0;
            var K = A;
            try {
              e: {
                for (rt(N), v = s(g); v !== null && !(v.expirationTime > N && ha()); ) {
                  var yt = v.callback;
                  if (typeof yt == "function") {
                    v.callback = null, A = v.priorityLevel;
                    var vt = yt(
                      v.expirationTime <= N
                    );
                    if (N = l.unstable_now(), typeof vt == "function") {
                      v.callback = vt, rt(N), Q = !0;
                      break e;
                    }
                    v === s(g) && r(g), rt(N);
                  } else r(g);
                  v = s(g);
                }
                if (v !== null) Q = !0;
                else {
                  var T = s(h);
                  T !== null && we(
                    Rt,
                    T.startTime - N
                  ), Q = !1;
                }
              }
              break t;
            } finally {
              v = null, A = K, C = !1;
            }
            Q = void 0;
          }
        } finally {
          Q ? Jt() : Et = !1;
        }
      }
    }
    var Jt;
    if (typeof F == "function")
      Jt = function() {
        F(Ne);
      };
    else if (typeof MessageChannel < "u") {
      var Qn = new MessageChannel(), Qe = Qn.port2;
      Qn.port1.onmessage = Ne, Jt = function() {
        Qe.postMessage(null);
      };
    } else
      Jt = function() {
        q(Ne, 0);
      };
    function we(N, Q) {
      J = q(function() {
        N(l.unstable_now());
      }, Q);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(N) {
      N.callback = null;
    }, l.unstable_forceFrameRate = function(N) {
      0 > N || 125 < N ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Kt = 0 < N ? Math.floor(1e3 / N) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, l.unstable_next = function(N) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = A;
      }
      var K = A;
      A = Q;
      try {
        return N();
      } finally {
        A = K;
      }
    }, l.unstable_requestPaint = function() {
      j = !0;
    }, l.unstable_runWithPriority = function(N, Q) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var K = A;
      A = N;
      try {
        return Q();
      } finally {
        A = K;
      }
    }, l.unstable_scheduleCallback = function(N, Q, K) {
      var yt = l.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? yt + K : yt) : K = yt, N) {
        case 1:
          var vt = -1;
          break;
        case 2:
          vt = 250;
          break;
        case 5:
          vt = 1073741823;
          break;
        case 4:
          vt = 1e4;
          break;
        default:
          vt = 5e3;
      }
      return vt = K + vt, N = {
        id: b++,
        callback: Q,
        priorityLevel: N,
        startTime: K,
        expirationTime: vt,
        sortIndex: -1
      }, K > yt ? (N.sortIndex = K, i(h, N), s(g) === null && N === s(h) && (L ? (I(J), J = -1) : L = !0, we(Rt, K - yt))) : (N.sortIndex = vt, i(g, N), x || C || (x = !0, Et || (Et = !0, Jt()))), N;
    }, l.unstable_shouldYield = ha, l.unstable_wrapCallback = function(N) {
      var Q = A;
      return function() {
        var K = A;
        A = Q;
        try {
          return N.apply(this, arguments);
        } finally {
          A = K;
        }
      };
    };
  })(Tc)), Tc;
}
var _m;
function kp() {
  return _m || (_m = 1, Ec.exports = Jp()), Ec.exports;
}
var Ac = { exports: {} }, k = {};
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
  if (wm) return k;
  wm = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), y = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), A = Symbol.iterator;
  function C(T) {
    return T === null || typeof T != "object" ? null : (T = A && T[A] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var x = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, L = Object.assign, j = {};
  function q(T, B, G) {
    this.props = T, this.context = B, this.refs = j, this.updater = G || x;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(T, B) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, B, "setState");
  }, q.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function I() {
  }
  I.prototype = q.prototype;
  function F(T, B, G) {
    this.props = T, this.context = B, this.refs = j, this.updater = G || x;
  }
  var rt = F.prototype = new I();
  rt.constructor = F, L(rt, q.prototype), rt.isPureReactComponent = !0;
  var Rt = Array.isArray;
  function Et() {
  }
  var J = { H: null, A: null, T: null, S: null }, Kt = Object.prototype.hasOwnProperty;
  function xe(T, B, G) {
    var X = G.ref;
    return {
      $$typeof: l,
      type: T,
      key: B,
      ref: X !== void 0 ? X : null,
      props: G
    };
  }
  function ha(T, B) {
    return xe(T.type, B, T.props);
  }
  function Ne(T) {
    return typeof T == "object" && T !== null && T.$$typeof === l;
  }
  function Jt(T) {
    var B = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(G) {
      return B[G];
    });
  }
  var Qn = /\/+/g;
  function Qe(T, B) {
    return typeof T == "object" && T !== null && T.key != null ? Jt("" + T.key) : B.toString(36);
  }
  function we(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(Et, Et) : (T.status = "pending", T.then(
          function(B) {
            T.status === "pending" && (T.status = "fulfilled", T.value = B);
          },
          function(B) {
            T.status === "pending" && (T.status = "rejected", T.reason = B);
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
  function N(T, B, G, X, W) {
    var nt = typeof T;
    (nt === "undefined" || nt === "boolean") && (T = null);
    var dt = !1;
    if (T === null) dt = !0;
    else
      switch (nt) {
        case "bigint":
        case "string":
        case "number":
          dt = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case l:
            case i:
              dt = !0;
              break;
            case b:
              return dt = T._init, N(
                dt(T._payload),
                B,
                G,
                X,
                W
              );
          }
      }
    if (dt)
      return W = W(T), dt = X === "" ? "." + Qe(T, 0) : X, Rt(W) ? (G = "", dt != null && (G = dt.replace(Qn, "$&/") + "/"), N(W, B, G, "", function(ul) {
        return ul;
      })) : W != null && (Ne(W) && (W = ha(
        W,
        G + (W.key == null || T && T.key === W.key ? "" : ("" + W.key).replace(
          Qn,
          "$&/"
        ) + "/") + dt
      )), B.push(W)), 1;
    dt = 0;
    var Zt = X === "" ? "." : X + ":";
    if (Rt(T))
      for (var Mt = 0; Mt < T.length; Mt++)
        X = T[Mt], nt = Zt + Qe(X, Mt), dt += N(
          X,
          B,
          G,
          nt,
          W
        );
    else if (Mt = C(T), typeof Mt == "function")
      for (T = Mt.call(T), Mt = 0; !(X = T.next()).done; )
        X = X.value, nt = Zt + Qe(X, Mt++), dt += N(
          X,
          B,
          G,
          nt,
          W
        );
    else if (nt === "object") {
      if (typeof T.then == "function")
        return N(
          we(T),
          B,
          G,
          X,
          W
        );
      throw B = String(T), Error(
        "Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return dt;
  }
  function Q(T, B, G) {
    if (T == null) return T;
    var X = [], W = 0;
    return N(T, X, "", "", function(nt) {
      return B.call(G, nt, W++);
    }), X;
  }
  function K(T) {
    if (T._status === -1) {
      var B = T._result;
      B = B(), B.then(
        function(G) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = G);
        },
        function(G) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = G);
        }
      ), T._status === -1 && (T._status = 0, T._result = B);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var yt = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var B = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(B)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  }, vt = {
    map: Q,
    forEach: function(T, B, G) {
      Q(
        T,
        function() {
          B.apply(this, arguments);
        },
        G
      );
    },
    count: function(T) {
      var B = 0;
      return Q(T, function() {
        B++;
      }), B;
    },
    toArray: function(T) {
      return Q(T, function(B) {
        return B;
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
  return k.Activity = v, k.Children = vt, k.Component = q, k.Fragment = s, k.Profiler = f, k.PureComponent = F, k.StrictMode = r, k.Suspense = g, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J, k.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return J.H.useMemoCache(T);
    }
  }, k.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, k.cacheSignal = function() {
    return null;
  }, k.cloneElement = function(T, B, G) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var X = L({}, T.props), W = T.key;
    if (B != null)
      for (nt in B.key !== void 0 && (W = "" + B.key), B)
        !Kt.call(B, nt) || nt === "key" || nt === "__self" || nt === "__source" || nt === "ref" && B.ref === void 0 || (X[nt] = B[nt]);
    var nt = arguments.length - 2;
    if (nt === 1) X.children = G;
    else if (1 < nt) {
      for (var dt = Array(nt), Zt = 0; Zt < nt; Zt++)
        dt[Zt] = arguments[Zt + 2];
      X.children = dt;
    }
    return xe(T.type, W, X);
  }, k.createContext = function(T) {
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
  }, k.createElement = function(T, B, G) {
    var X, W = {}, nt = null;
    if (B != null)
      for (X in B.key !== void 0 && (nt = "" + B.key), B)
        Kt.call(B, X) && X !== "key" && X !== "__self" && X !== "__source" && (W[X] = B[X]);
    var dt = arguments.length - 2;
    if (dt === 1) W.children = G;
    else if (1 < dt) {
      for (var Zt = Array(dt), Mt = 0; Mt < dt; Mt++)
        Zt[Mt] = arguments[Mt + 2];
      W.children = Zt;
    }
    if (T && T.defaultProps)
      for (X in dt = T.defaultProps, dt)
        W[X] === void 0 && (W[X] = dt[X]);
    return xe(T, nt, W);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(T) {
    return { $$typeof: p, render: T };
  }, k.isValidElement = Ne, k.lazy = function(T) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: T },
      _init: K
    };
  }, k.memo = function(T, B) {
    return {
      $$typeof: h,
      type: T,
      compare: B === void 0 ? null : B
    };
  }, k.startTransition = function(T) {
    var B = J.T, G = {};
    J.T = G;
    try {
      var X = T(), W = J.S;
      W !== null && W(G, X), typeof X == "object" && X !== null && typeof X.then == "function" && X.then(Et, yt);
    } catch (nt) {
      yt(nt);
    } finally {
      B !== null && G.types !== null && (B.types = G.types), J.T = B;
    }
  }, k.unstable_useCacheRefresh = function() {
    return J.H.useCacheRefresh();
  }, k.use = function(T) {
    return J.H.use(T);
  }, k.useActionState = function(T, B, G) {
    return J.H.useActionState(T, B, G);
  }, k.useCallback = function(T, B) {
    return J.H.useCallback(T, B);
  }, k.useContext = function(T) {
    return J.H.useContext(T);
  }, k.useDebugValue = function() {
  }, k.useDeferredValue = function(T, B) {
    return J.H.useDeferredValue(T, B);
  }, k.useEffect = function(T, B) {
    return J.H.useEffect(T, B);
  }, k.useEffectEvent = function(T) {
    return J.H.useEffectEvent(T);
  }, k.useId = function() {
    return J.H.useId();
  }, k.useImperativeHandle = function(T, B, G) {
    return J.H.useImperativeHandle(T, B, G);
  }, k.useInsertionEffect = function(T, B) {
    return J.H.useInsertionEffect(T, B);
  }, k.useLayoutEffect = function(T, B) {
    return J.H.useLayoutEffect(T, B);
  }, k.useMemo = function(T, B) {
    return J.H.useMemo(T, B);
  }, k.useOptimistic = function(T, B) {
    return J.H.useOptimistic(T, B);
  }, k.useReducer = function(T, B, G) {
    return J.H.useReducer(T, B, G);
  }, k.useRef = function(T) {
    return J.H.useRef(T);
  }, k.useState = function(T) {
    return J.H.useState(T);
  }, k.useSyncExternalStore = function(T, B, G) {
    return J.H.useSyncExternalStore(
      T,
      B,
      G
    );
  }, k.useTransition = function() {
    return J.H.useTransition();
  }, k.version = "19.2.5", k;
}
var Cm;
function Wc() {
  return Cm || (Cm = 1, Ac.exports = Ip()), Ac.exports;
}
var Rc = { exports: {} }, Xt = {};
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
  if (Mm) return Xt;
  Mm = 1;
  var l = Wc();
  function i(g) {
    var h = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + g + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var r = {
    d: {
      f: s,
      r: function() {
        throw Error(i(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal");
  function d(g, h, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: h,
      implementation: b
    };
  }
  var y = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, h) {
    if (g === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return Xt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Xt.createPortal = function(g, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(i(299));
    return d(g, h, null, b);
  }, Xt.flushSync = function(g) {
    var h = y.T, b = r.p;
    try {
      if (y.T = null, r.p = 2, g) return g();
    } finally {
      y.T = h, r.p = b, r.d.f();
    }
  }, Xt.preconnect = function(g, h) {
    typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, r.d.C(g, h));
  }, Xt.prefetchDNS = function(g) {
    typeof g == "string" && r.d.D(g);
  }, Xt.preinit = function(g, h) {
    if (typeof g == "string" && h && typeof h.as == "string") {
      var b = h.as, v = p(b, h.crossOrigin), A = typeof h.integrity == "string" ? h.integrity : void 0, C = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      b === "style" ? r.d.S(
        g,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: v,
          integrity: A,
          fetchPriority: C
        }
      ) : b === "script" && r.d.X(g, {
        crossOrigin: v,
        integrity: A,
        fetchPriority: C,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Xt.preinitModule = function(g, h) {
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
  }, Xt.preload = function(g, h) {
    if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var b = h.as, v = p(b, h.crossOrigin);
      r.d.L(g, b, {
        crossOrigin: v,
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
  }, Xt.preloadModule = function(g, h) {
    if (typeof g == "string")
      if (h) {
        var b = p(h.as, h.crossOrigin);
        r.d.m(g, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: b,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else r.d.m(g);
  }, Xt.requestFormReset = function(g) {
    r.d.r(g);
  }, Xt.unstable_batchedUpdates = function(g, h) {
    return g(h);
  }, Xt.useFormState = function(g, h, b) {
    return y.H.useFormState(g, h, b);
  }, Xt.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, Xt.version = "19.2.5", Xt;
}
var Om;
function Wp() {
  if (Om) return Rc.exports;
  Om = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return l(), Rc.exports = Fp(), Rc.exports;
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
var Dm;
function Pp() {
  if (Dm) return ti;
  Dm = 1;
  var l = kp(), i = Wc(), s = Wp();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(t) {
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
      var u = n.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (a = u.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === n) return g(u), t;
          if (c === a) return g(u), e;
          c = c.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== a.return) n = u, a = c;
      else {
        for (var o = !1, m = u.child; m; ) {
          if (m === n) {
            o = !0, n = u, a = c;
            break;
          }
          if (m === a) {
            o = !0, a = u, n = c;
            break;
          }
          m = m.sibling;
        }
        if (!o) {
          for (m = c.child; m; ) {
            if (m === n) {
              o = !0, n = c, a = u;
              break;
            }
            if (m === a) {
              o = !0, a = c, n = u;
              break;
            }
            m = m.sibling;
          }
          if (!o) throw Error(r(189));
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
  var v = Object.assign, A = Symbol.for("react.element"), C = Symbol.for("react.transitional.element"), x = Symbol.for("react.portal"), L = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), q = Symbol.for("react.profiler"), I = Symbol.for("react.consumer"), F = Symbol.for("react.context"), rt = Symbol.for("react.forward_ref"), Rt = Symbol.for("react.suspense"), Et = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), Kt = Symbol.for("react.lazy"), xe = Symbol.for("react.activity"), ha = Symbol.for("react.memo_cache_sentinel"), Ne = Symbol.iterator;
  function Jt(t) {
    return t === null || typeof t != "object" ? null : (t = Ne && t[Ne] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Qn = Symbol.for("react.client.reference");
  function Qe(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Qn ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case L:
        return "Fragment";
      case q:
        return "Profiler";
      case j:
        return "StrictMode";
      case Rt:
        return "Suspense";
      case Et:
        return "SuspenseList";
      case xe:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case x:
          return "Portal";
        case F:
          return t.displayName || "Context";
        case I:
          return (t._context.displayName || "Context") + ".Consumer";
        case rt:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case J:
          return e = t.displayName || null, e !== null ? e : Qe(t.type) || "Memo";
        case Kt:
          e = t._payload, t = t._init;
          try {
            return Qe(t(e));
          } catch {
          }
      }
    return null;
  }
  var we = Array.isArray, N = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, yt = [], vt = -1;
  function T(t) {
    return { current: t };
  }
  function B(t) {
    0 > vt || (t.current = yt[vt], yt[vt] = null, vt--);
  }
  function G(t, e) {
    vt++, yt[vt] = t.current, t.current = e;
  }
  var X = T(null), W = T(null), nt = T(null), dt = T(null);
  function Zt(t, e) {
    switch (G(nt, e), G(W, t), G(X, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Zh(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Zh(e), t = $h(e, t);
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
    B(X), G(X, t);
  }
  function Mt() {
    B(X), B(W), B(nt);
  }
  function ul(t) {
    t.memoizedState !== null && G(dt, t);
    var e = X.current, n = $h(e, t.type);
    e !== n && (G(W, t), G(X, n));
  }
  function pi(t) {
    W.current === t && (B(X), B(W)), dt.current === t && (B(dt), kl._currentValue = K);
  }
  var es, bo;
  function Gn(t) {
    if (es === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        es = e && e[1] || "", bo = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + es + t + bo;
  }
  var ns = !1;
  function as(t, e) {
    if (!t || ns) return "";
    ns = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var H = function() {
                throw Error();
              };
              if (Object.defineProperty(H.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(H, []);
                } catch (D) {
                  var M = D;
                }
                Reflect.construct(t, [], H);
              } else {
                try {
                  H.call();
                } catch (D) {
                  M = D;
                }
                t.call(H.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (D) {
                M = D;
              }
              (H = t()) && typeof H.catch == "function" && H.catch(function() {
              });
            }
          } catch (D) {
            if (D && M && typeof D.stack == "string")
              return [D.stack, M.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = a.DetermineComponentFrameRoot(), o = c[0], m = c[1];
      if (o && m) {
        var S = o.split(`
`), w = m.split(`
`);
        for (u = a = 0; a < S.length && !S[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < w.length && !w[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === S.length || u === w.length)
          for (a = S.length - 1, u = w.length - 1; 1 <= a && 0 <= u && S[a] !== w[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (S[a] !== w[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || S[a] !== w[u]) {
                  var z = `
` + S[a].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ns = !1, Error.prepareStackTrace = n;
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
        return as(t.type, !1);
      case 11:
        return as(t.type.render, !1);
      case 1:
        return as(t.type, !0);
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
  var ls = Object.prototype.hasOwnProperty, is = l.unstable_scheduleCallback, us = l.unstable_cancelCallback, Tg = l.unstable_shouldYield, Ag = l.unstable_requestPaint, ae = l.unstable_now, Rg = l.unstable_getCurrentPriorityLevel, To = l.unstable_ImmediatePriority, Ao = l.unstable_UserBlockingPriority, Si = l.unstable_NormalPriority, _g = l.unstable_LowPriority, Ro = l.unstable_IdlePriority, wg = l.log, Cg = l.unstable_setDisableYieldValue, sl = null, le = null;
  function cn(t) {
    if (typeof wg == "function" && Cg(t), le && typeof le.setStrictMode == "function")
      try {
        le.setStrictMode(sl, t);
      } catch {
      }
  }
  var ie = Math.clz32 ? Math.clz32 : Dg, Mg = Math.log, Og = Math.LN2;
  function Dg(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Mg(t) / Og | 0) | 0;
  }
  var vi = 256, bi = 262144, Ei = 4194304;
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
  function Ti(t, e, n) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0, c = t.suspendedLanes, o = t.pingedLanes;
    t = t.warmLanes;
    var m = a & 134217727;
    return m !== 0 ? (a = m & ~c, a !== 0 ? u = Yn(a) : (o &= m, o !== 0 ? u = Yn(o) : n || (n = m & ~t, n !== 0 && (u = Yn(n))))) : (m = a & ~c, m !== 0 ? u = Yn(m) : o !== 0 ? u = Yn(o) : n || (n = a & ~t, n !== 0 && (u = Yn(n)))), u === 0 ? 0 : e !== 0 && e !== u && (e & c) === 0 && (c = u & -u, n = e & -e, c >= n || c === 32 && (n & 4194048) !== 0) ? e : u;
  }
  function rl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function zg(t, e) {
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
    var t = Ei;
    return Ei <<= 1, (Ei & 62914560) === 0 && (Ei = 4194304), t;
  }
  function ss(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function cl(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function xg(t, e, n, a, u, c) {
    var o = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var m = t.entanglements, S = t.expirationTimes, w = t.hiddenUpdates;
    for (n = o & ~n; 0 < n; ) {
      var z = 31 - ie(n), H = 1 << z;
      m[z] = 0, S[z] = -1;
      var M = w[z];
      if (M !== null)
        for (w[z] = null, z = 0; z < M.length; z++) {
          var D = M[z];
          D !== null && (D.lane &= -536870913);
        }
      n &= ~H;
    }
    a !== 0 && wo(t, a, 0), c !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= c & ~(o & ~e));
  }
  function wo(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - ie(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | n & 261930;
  }
  function Co(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var a = 31 - ie(n), u = 1 << a;
      u & e | t[a] & e && (t[a] |= e), n &= ~u;
    }
  }
  function Mo(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : rs(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function rs(t) {
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
  function cs(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Oo() {
    var t = Q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ym(t.type));
  }
  function Do(t, e) {
    var n = Q.p;
    try {
      return Q.p = t, e();
    } finally {
      Q.p = n;
    }
  }
  var on = Math.random().toString(36).slice(2), jt = "__reactFiber$" + on, kt = "__reactProps$" + on, ma = "__reactContainer$" + on, os = "__reactEvents$" + on, Ng = "__reactListeners$" + on, Ug = "__reactHandles$" + on, zo = "__reactResources$" + on, ol = "__reactMarker$" + on;
  function fs(t) {
    delete t[jt], delete t[kt], delete t[os], delete t[Ng], delete t[Ug];
  }
  function ya(t) {
    var e = t[jt];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[ma] || n[jt]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = Ph(t); t !== null; ) {
            if (n = t[jt]) return n;
            t = Ph(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function ga(t) {
    if (t = t[jt] || t[ma]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function fl(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function pa(t) {
    var e = t[zo];
    return e || (e = t[zo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Bt(t) {
    t[ol] = !0;
  }
  var xo = /* @__PURE__ */ new Set(), No = {};
  function Xn(t, e) {
    Sa(t, e), Sa(t + "Capture", e);
  }
  function Sa(t, e) {
    for (No[t] = e, t = 0; t < e.length; t++)
      xo.add(e[t]);
  }
  var Hg = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uo = {}, Ho = {};
  function Bg(t) {
    return ls.call(Ho, t) ? !0 : ls.call(Uo, t) ? !1 : Hg.test(t) ? Ho[t] = !0 : (Uo[t] = !0, !1);
  }
  function Ai(t, e, n) {
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
  function Ri(t, e, n) {
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
  function ye(t) {
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
      var u = a.get, c = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(o) {
          n = "" + o, c.call(this, o);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(o) {
          n = "" + o;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function ds(t) {
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
  function _i(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var jg = /[\n"\\]/g;
  function ge(t) {
    return t.replace(
      jg,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function hs(t, e, n, a, u, c, o, m) {
    t.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? t.type = o : t.removeAttribute("type"), e != null ? o === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + ye(e)) : t.value !== "" + ye(e) && (t.value = "" + ye(e)) : o !== "submit" && o !== "reset" || t.removeAttribute("value"), e != null ? ms(t, o, ye(e)) : n != null ? ms(t, o, ye(n)) : a != null && t.removeAttribute("value"), u == null && c != null && (t.defaultChecked = !!c), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.name = "" + ye(m) : t.removeAttribute("name");
  }
  function jo(t, e, n, a, u, c, o, m) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.type = c), e != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || e != null)) {
        ds(t);
        return;
      }
      n = n != null ? "" + ye(n) : "", e = e != null ? "" + ye(e) : n, m || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = m ? t.checked : !!a, t.defaultChecked = !!a, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (t.name = o), ds(t);
  }
  function ms(t, e, n) {
    e === "number" && _i(t.ownerDocument) === t || t.defaultValue === "" + n || (t.defaultValue = "" + n);
  }
  function va(t, e, n, a) {
    if (t = t.options, e) {
      e = {};
      for (var u = 0; u < n.length; u++)
        e["$" + n[u]] = !0;
      for (n = 0; n < t.length; n++)
        u = e.hasOwnProperty("$" + t[n].value), t[n].selected !== u && (t[n].selected = u), u && a && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + ye(n), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === n) {
          t[u].selected = !0, a && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function qo(t, e, n) {
    if (e != null && (e = "" + ye(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + ye(n) : "";
  }
  function Qo(t, e, n, a) {
    if (e == null) {
      if (a != null) {
        if (n != null) throw Error(r(92));
        if (we(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), e = n;
    }
    n = ye(e), t.defaultValue = n, a = t.textContent, a === n && a !== "" && a !== null && (t.value = a), ds(t);
  }
  function ba(t, e) {
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
      for (var u in e)
        a = e[u], e.hasOwnProperty(u) && n[u] !== a && Go(t, u, a);
    } else
      for (var c in e)
        e.hasOwnProperty(c) && Go(t, c, e[c]);
  }
  function ys(t) {
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
  function wi(t) {
    return Gg.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Ye() {
  }
  var gs = null;
  function ps(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ea = null, Ta = null;
  function Xo(t) {
    var e = ga(t);
    if (e && (t = e.stateNode)) {
      var n = t[kt] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (hs(
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
              'input[name="' + ge(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var a = n[e];
              if (a !== t && a.form === t.form) {
                var u = a[kt] || null;
                if (!u) throw Error(r(90));
                hs(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
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
          e = n.value, e != null && va(t, !!n.multiple, e, !1);
      }
    }
  }
  var Ss = !1;
  function Vo(t, e, n) {
    if (Ss) return t(e, n);
    Ss = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (Ss = !1, (Ea !== null || Ta !== null) && (hu(), Ea && (e = Ea, t = Ta, Ta = Ea = null, Xo(e), t)))
        for (e = 0; e < t.length; e++) Xo(t[e]);
    }
  }
  function dl(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var a = n[kt] || null;
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
  var Xe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), vs = !1;
  if (Xe)
    try {
      var hl = {};
      Object.defineProperty(hl, "passive", {
        get: function() {
          vs = !0;
        }
      }), window.addEventListener("test", hl, hl), window.removeEventListener("test", hl, hl);
    } catch {
      vs = !1;
    }
  var fn = null, bs = null, Ci = null;
  function Zo() {
    if (Ci) return Ci;
    var t, e = bs, n = e.length, a, u = "value" in fn ? fn.value : fn.textContent, c = u.length;
    for (t = 0; t < n && e[t] === u[t]; t++) ;
    var o = n - t;
    for (a = 1; a <= o && e[n - a] === u[c - a]; a++) ;
    return Ci = u.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Mi(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Oi() {
    return !0;
  }
  function $o() {
    return !1;
  }
  function It(t) {
    function e(n, a, u, c, o) {
      this._reactName = n, this._targetInst = u, this.type = a, this.nativeEvent = c, this.target = o, this.currentTarget = null;
      for (var m in t)
        t.hasOwnProperty(m) && (n = t[m], this[m] = n ? n(c) : c[m]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Oi : $o, this.isPropagationStopped = $o, this;
    }
    return v(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Oi);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Oi);
      },
      persist: function() {
      },
      isPersistent: Oi
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
  }, Di = It(Vn), ml = v({}, Vn, { view: 0, detail: 0 }), Yg = It(ml), Es, Ts, yl, zi = v({}, ml, {
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
    getModifierState: Rs,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== yl && (yl && t.type === "mousemove" ? (Es = t.screenX - yl.screenX, Ts = t.screenY - yl.screenY) : Ts = Es = 0, yl = t), Es);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Ts;
    }
  }), Ko = It(zi), Xg = v({}, zi, { dataTransfer: 0 }), Vg = It(Xg), Zg = v({}, ml, { relatedTarget: 0 }), As = It(Zg), $g = v({}, Vn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Kg = It($g), Jg = v({}, Vn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), kg = It(Jg), Ig = v({}, Vn, { data: 0 }), Jo = It(Ig), Fg = {
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
  function Rs() {
    return t0;
  }
  var e0 = v({}, ml, {
    key: function(t) {
      if (t.key) {
        var e = Fg[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Mi(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Wg[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Rs,
    charCode: function(t) {
      return t.type === "keypress" ? Mi(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Mi(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), n0 = It(e0), a0 = v({}, zi, {
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
  }), ko = It(a0), l0 = v({}, ml, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Rs
  }), i0 = It(l0), u0 = v({}, Vn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), s0 = It(u0), r0 = v({}, zi, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), c0 = It(r0), o0 = v({}, Vn, {
    newState: 0,
    oldState: 0
  }), f0 = It(o0), d0 = [9, 13, 27, 32], _s = Xe && "CompositionEvent" in window, gl = null;
  Xe && "documentMode" in document && (gl = document.documentMode);
  var h0 = Xe && "TextEvent" in window && !gl, Io = Xe && (!_s || gl && 8 < gl && 11 >= gl), Fo = " ", Wo = !1;
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
  var Aa = !1;
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
    if (Aa)
      return t === "compositionend" || !_s && Po(t, e) ? (t = Zo(), Ci = bs = fn = null, Aa = !1, t) : null;
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
    Ea ? Ta ? Ta.push(a) : Ta = [a] : Ea = a, e = bu(e, "onChange"), 0 < e.length && (n = new Di(
      "onChange",
      "change",
      null,
      n,
      a
    ), t.push({ event: n, listeners: e }));
  }
  var pl = null, Sl = null;
  function p0(t) {
    qh(t, 0);
  }
  function xi(t) {
    var e = fl(t);
    if (Lo(e)) return t;
  }
  function af(t, e) {
    if (t === "change") return e;
  }
  var lf = !1;
  if (Xe) {
    var ws;
    if (Xe) {
      var Cs = "oninput" in document;
      if (!Cs) {
        var uf = document.createElement("div");
        uf.setAttribute("oninput", "return;"), Cs = typeof uf.oninput == "function";
      }
      ws = Cs;
    } else ws = !1;
    lf = ws && (!document.documentMode || 9 < document.documentMode);
  }
  function sf() {
    pl && (pl.detachEvent("onpropertychange", rf), Sl = pl = null);
  }
  function rf(t) {
    if (t.propertyName === "value" && xi(Sl)) {
      var e = [];
      nf(
        e,
        Sl,
        t,
        ps(t)
      ), Vo(p0, e);
    }
  }
  function S0(t, e, n) {
    t === "focusin" ? (sf(), pl = e, Sl = n, pl.attachEvent("onpropertychange", rf)) : t === "focusout" && sf();
  }
  function v0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return xi(Sl);
  }
  function b0(t, e) {
    if (t === "click") return xi(e);
  }
  function E0(t, e) {
    if (t === "input" || t === "change")
      return xi(e);
  }
  function T0(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var ue = typeof Object.is == "function" ? Object.is : T0;
  function vl(t, e) {
    if (ue(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), a = Object.keys(e);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var u = n[a];
      if (!ls.call(e, u) || !ue(t[u], e[u]))
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
    for (var e = _i(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = _i(t.document);
    }
    return e;
  }
  function Ms(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var A0 = Xe && "documentMode" in document && 11 >= document.documentMode, Ra = null, Os = null, bl = null, Ds = !1;
  function hf(t, e, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ds || Ra == null || Ra !== _i(a) || (a = Ra, "selectionStart" in a && Ms(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), bl && vl(bl, a) || (bl = a, a = bu(Os, "onSelect"), 0 < a.length && (e = new Di(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: a }), e.target = Ra)));
  }
  function Zn(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var _a = {
    animationend: Zn("Animation", "AnimationEnd"),
    animationiteration: Zn("Animation", "AnimationIteration"),
    animationstart: Zn("Animation", "AnimationStart"),
    transitionrun: Zn("Transition", "TransitionRun"),
    transitionstart: Zn("Transition", "TransitionStart"),
    transitioncancel: Zn("Transition", "TransitionCancel"),
    transitionend: Zn("Transition", "TransitionEnd")
  }, zs = {}, mf = {};
  Xe && (mf = document.createElement("div").style, "AnimationEvent" in window || (delete _a.animationend.animation, delete _a.animationiteration.animation, delete _a.animationstart.animation), "TransitionEvent" in window || delete _a.transitionend.transition);
  function $n(t) {
    if (zs[t]) return zs[t];
    if (!_a[t]) return t;
    var e = _a[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in mf)
        return zs[t] = e[n];
    return t;
  }
  var yf = $n("animationend"), gf = $n("animationiteration"), pf = $n("animationstart"), R0 = $n("transitionrun"), _0 = $n("transitionstart"), w0 = $n("transitioncancel"), Sf = $n("transitionend"), vf = /* @__PURE__ */ new Map(), xs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  xs.push("scrollEnd");
  function Ce(t, e) {
    vf.set(t, e), Xn(e, [t]);
  }
  var Ni = typeof reportError == "function" ? reportError : function(t) {
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
  }, pe = [], wa = 0, Ns = 0;
  function Ui() {
    for (var t = wa, e = Ns = wa = 0; e < t; ) {
      var n = pe[e];
      pe[e++] = null;
      var a = pe[e];
      pe[e++] = null;
      var u = pe[e];
      pe[e++] = null;
      var c = pe[e];
      if (pe[e++] = null, a !== null && u !== null) {
        var o = a.pending;
        o === null ? u.next = u : (u.next = o.next, o.next = u), a.pending = u;
      }
      c !== 0 && bf(n, u, c);
    }
  }
  function Hi(t, e, n, a) {
    pe[wa++] = t, pe[wa++] = e, pe[wa++] = n, pe[wa++] = a, Ns |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Us(t, e, n, a) {
    return Hi(t, e, n, a), Bi(t);
  }
  function Kn(t, e) {
    return Hi(t, null, null, e), Bi(t);
  }
  function bf(t, e, n) {
    t.lanes |= n;
    var a = t.alternate;
    a !== null && (a.lanes |= n);
    for (var u = !1, c = t.return; c !== null; )
      c.childLanes |= n, a = c.alternate, a !== null && (a.childLanes |= n), c.tag === 22 && (t = c.stateNode, t === null || t._visibility & 1 || (u = !0)), t = c, c = c.return;
    return t.tag === 3 ? (c = t.stateNode, u && e !== null && (u = 31 - ie(n), t = c.hiddenUpdates, a = t[u], a === null ? t[u] = [e] : a.push(e), e.lane = n | 536870912), c) : null;
  }
  function Bi(t) {
    if (50 < Yl)
      throw Yl = 0, Xr = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ca = {};
  function C0(t, e, n, a) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function se(t, e, n, a) {
    return new C0(t, e, n, a);
  }
  function Hs(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ve(t, e) {
    var n = t.alternate;
    return n === null ? (n = se(
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
  function Li(t, e, n, a, u, c) {
    var o = 0;
    if (a = t, typeof t == "function") Hs(t) && (o = 1);
    else if (typeof t == "string")
      o = xp(
        t,
        n,
        X.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case xe:
          return t = se(31, n, e, u), t.elementType = xe, t.lanes = c, t;
        case L:
          return Jn(n.children, u, c, e);
        case j:
          o = 8, u |= 24;
          break;
        case q:
          return t = se(12, n, e, u | 2), t.elementType = q, t.lanes = c, t;
        case Rt:
          return t = se(13, n, e, u), t.elementType = Rt, t.lanes = c, t;
        case Et:
          return t = se(19, n, e, u), t.elementType = Et, t.lanes = c, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case F:
                o = 10;
                break t;
              case I:
                o = 9;
                break t;
              case rt:
                o = 11;
                break t;
              case J:
                o = 14;
                break t;
              case Kt:
                o = 16, a = null;
                break t;
            }
          o = 29, n = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = se(o, n, e, u), e.elementType = t, e.type = a, e.lanes = c, e;
  }
  function Jn(t, e, n, a) {
    return t = se(7, t, a, e), t.lanes = n, t;
  }
  function Bs(t, e, n) {
    return t = se(6, t, null, e), t.lanes = n, t;
  }
  function Tf(t) {
    var e = se(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Ls(t, e, n) {
    return e = se(
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
  function Se(t, e) {
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
  var Ma = [], Oa = 0, ji = null, El = 0, ve = [], be = 0, dn = null, Ue = 1, He = "";
  function Ze(t, e) {
    Ma[Oa++] = El, Ma[Oa++] = ji, ji = t, El = e;
  }
  function Rf(t, e, n) {
    ve[be++] = Ue, ve[be++] = He, ve[be++] = dn, dn = t;
    var a = Ue;
    t = He;
    var u = 32 - ie(a) - 1;
    a &= ~(1 << u), n += 1;
    var c = 32 - ie(e) + u;
    if (30 < c) {
      var o = u - u % 5;
      c = (a & (1 << o) - 1).toString(32), a >>= o, u -= o, Ue = 1 << 32 - ie(e) + u | n << u | a, He = c + t;
    } else
      Ue = 1 << c | n << u | a, He = t;
  }
  function js(t) {
    t.return !== null && (Ze(t, 1), Rf(t, 1, 0));
  }
  function qs(t) {
    for (; t === ji; )
      ji = Ma[--Oa], Ma[Oa] = null, El = Ma[--Oa], Ma[Oa] = null;
    for (; t === dn; )
      dn = ve[--be], ve[be] = null, He = ve[--be], ve[be] = null, Ue = ve[--be], ve[be] = null;
  }
  function _f(t, e) {
    ve[be++] = Ue, ve[be++] = He, ve[be++] = dn, Ue = e.id, He = e.overflow, dn = t;
  }
  var qt = null, Tt = null, st = !1, hn = null, Ee = !1, Qs = Error(r(519));
  function mn(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Tl(Se(e, t)), Qs;
  }
  function wf(t) {
    var e = t.stateNode, n = t.type, a = t.memoizedProps;
    switch (e[jt] = t, e[kt] = a, n) {
      case "dialog":
        lt("cancel", e), lt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        lt("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Vl.length; n++)
          lt(Vl[n], e);
        break;
      case "source":
        lt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        lt("error", e), lt("load", e);
        break;
      case "details":
        lt("toggle", e);
        break;
      case "input":
        lt("invalid", e), jo(
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
        lt("invalid", e);
        break;
      case "textarea":
        lt("invalid", e), Qo(e, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || a.suppressHydrationWarning === !0 || Xh(e.textContent, n) ? (a.popover != null && (lt("beforetoggle", e), lt("toggle", e)), a.onScroll != null && lt("scroll", e), a.onScrollEnd != null && lt("scrollend", e), a.onClick != null && (e.onclick = Ye), e = !0) : e = !1, e || mn(t, !0);
  }
  function Cf(t) {
    for (qt = t.return; qt; )
      switch (qt.tag) {
        case 5:
        case 31:
        case 13:
          Ee = !1;
          return;
        case 27:
        case 3:
          Ee = !0;
          return;
        default:
          qt = qt.return;
      }
  }
  function Da(t) {
    if (t !== qt) return !1;
    if (!st) return Cf(t), st = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || lc(t.type, t.memoizedProps)), n = !n), n && Tt && mn(t), Cf(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Tt = Wh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Tt = Wh(t);
    } else
      e === 27 ? (e = Tt, Mn(t.type) ? (t = cc, cc = null, Tt = t) : Tt = e) : Tt = qt ? Ae(t.stateNode.nextSibling) : null;
    return !0;
  }
  function kn() {
    Tt = qt = null, st = !1;
  }
  function Gs() {
    var t = hn;
    return t !== null && (te === null ? te = t : te.push.apply(
      te,
      t
    ), hn = null), t;
  }
  function Tl(t) {
    hn === null ? hn = [t] : hn.push(t);
  }
  var Ys = T(null), In = null, $e = null;
  function yn(t, e, n) {
    G(Ys, e._currentValue), e._currentValue = n;
  }
  function Ke(t) {
    t._currentValue = Ys.current, B(Ys);
  }
  function Xs(t, e, n) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function Vs(t, e, n, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var o = u.child;
        c = c.firstContext;
        t: for (; c !== null; ) {
          var m = c;
          c = u;
          for (var S = 0; S < e.length; S++)
            if (m.context === e[S]) {
              c.lanes |= n, m = c.alternate, m !== null && (m.lanes |= n), Xs(
                c.return,
                n,
                t
              ), a || (o = null);
              break t;
            }
          c = m.next;
        }
      } else if (u.tag === 18) {
        if (o = u.return, o === null) throw Error(r(341));
        o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Xs(o, n, t), o = null;
      } else o = u.child;
      if (o !== null) o.return = u;
      else
        for (o = u; o !== null; ) {
          if (o === t) {
            o = null;
            break;
          }
          if (u = o.sibling, u !== null) {
            u.return = o.return, o = u;
            break;
          }
          o = o.return;
        }
      u = o;
    }
  }
  function za(t, e, n, a) {
    t = null;
    for (var u = e, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var o = u.alternate;
        if (o === null) throw Error(r(387));
        if (o = o.memoizedProps, o !== null) {
          var m = u.type;
          ue(u.pendingProps.value, o.value) || (t !== null ? t.push(m) : t = [m]);
        }
      } else if (u === dt.current) {
        if (o = u.alternate, o === null) throw Error(r(387));
        o.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(kl) : t = [kl]);
      }
      u = u.return;
    }
    t !== null && Vs(
      e,
      t,
      n,
      a
    ), e.flags |= 262144;
  }
  function qi(t) {
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
    In = t, $e = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Qt(t) {
    return Mf(In, t);
  }
  function Qi(t, e) {
    return In === null && Fn(t), Mf(t, e);
  }
  function Mf(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, $e === null) {
      if (t === null) throw Error(r(308));
      $e = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else $e = $e.next = e;
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
  }, O0 = l.unstable_scheduleCallback, D0 = l.unstable_NormalPriority, zt = {
    $$typeof: F,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Zs() {
    return {
      controller: new M0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Al(t) {
    t.refCount--, t.refCount === 0 && O0(D0, function() {
      t.controller.abort();
    });
  }
  var Rl = null, $s = 0, xa = 0, Na = null;
  function z0(t, e) {
    if (Rl === null) {
      var n = Rl = [];
      $s = 0, xa = kr(), Na = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return $s++, e.then(Of, Of), e;
  }
  function Of() {
    if (--$s === 0 && Rl !== null) {
      Na !== null && (Na.status = "fulfilled");
      var t = Rl;
      Rl = null, xa = 0, Na = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function x0(t, e) {
    var n = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        n.push(u);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = e;
        for (var u = 0; u < n.length; u++) (0, n[u])(e);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < n.length; u++)
          (0, n[u])(void 0);
      }
    ), a;
  }
  var Df = N.S;
  N.S = function(t, e) {
    hh = ae(), typeof e == "object" && e !== null && typeof e.then == "function" && z0(t, e), Df !== null && Df(t, e);
  };
  var Wn = T(null);
  function Ks() {
    var t = Wn.current;
    return t !== null ? t : bt.pooledCache;
  }
  function Gi(t, e) {
    e === null ? G(Wn, Wn.current) : G(Wn, e.pool);
  }
  function zf() {
    var t = Ks();
    return t === null ? null : { parent: zt._currentValue, pool: t };
  }
  var Ua = Error(r(460)), Js = Error(r(474)), Yi = Error(r(542)), Xi = { then: function() {
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
          if (t = bt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(a) {
              if (e.status === "pending") {
                var u = e;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (e.status === "pending") {
                var u = e;
                u.status = "rejected", u.reason = a;
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
        throw ta = e, Ua;
    }
  }
  function Pn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (ta = n, Ua) : n;
    }
  }
  var ta = null;
  function Uf() {
    if (ta === null) throw Error(r(459));
    var t = ta;
    return ta = null, t;
  }
  function Hf(t) {
    if (t === Ua || t === Yi)
      throw Error(r(483));
  }
  var Ha = null, _l = 0;
  function Vi(t) {
    var e = _l;
    return _l += 1, Ha === null && (Ha = []), Nf(Ha, t, e);
  }
  function wl(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Zi(t, e) {
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
        var _ = R.deletions;
        _ === null ? (R.deletions = [E], R.flags |= 16) : _.push(E);
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
    function u(R, E) {
      return R = Ve(R, E), R.index = 0, R.sibling = null, R;
    }
    function c(R, E, _) {
      return R.index = _, t ? (_ = R.alternate, _ !== null ? (_ = _.index, _ < E ? (R.flags |= 67108866, E) : _) : (R.flags |= 67108866, E)) : (R.flags |= 1048576, E);
    }
    function o(R) {
      return t && R.alternate === null && (R.flags |= 67108866), R;
    }
    function m(R, E, _, U) {
      return E === null || E.tag !== 6 ? (E = Bs(_, R.mode, U), E.return = R, E) : (E = u(E, _), E.return = R, E);
    }
    function S(R, E, _, U) {
      var Z = _.type;
      return Z === L ? z(
        R,
        E,
        _.props.children,
        U,
        _.key
      ) : E !== null && (E.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === Kt && Pn(Z) === E.type) ? (E = u(E, _.props), wl(E, _), E.return = R, E) : (E = Li(
        _.type,
        _.key,
        _.props,
        null,
        R.mode,
        U
      ), wl(E, _), E.return = R, E);
    }
    function w(R, E, _, U) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== _.containerInfo || E.stateNode.implementation !== _.implementation ? (E = Ls(_, R.mode, U), E.return = R, E) : (E = u(E, _.children || []), E.return = R, E);
    }
    function z(R, E, _, U, Z) {
      return E === null || E.tag !== 7 ? (E = Jn(
        _,
        R.mode,
        U,
        Z
      ), E.return = R, E) : (E = u(E, _), E.return = R, E);
    }
    function H(R, E, _) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = Bs(
          "" + E,
          R.mode,
          _
        ), E.return = R, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case C:
            return _ = Li(
              E.type,
              E.key,
              E.props,
              null,
              R.mode,
              _
            ), wl(_, E), _.return = R, _;
          case x:
            return E = Ls(
              E,
              R.mode,
              _
            ), E.return = R, E;
          case Kt:
            return E = Pn(E), H(R, E, _);
        }
        if (we(E) || Jt(E))
          return E = Jn(
            E,
            R.mode,
            _,
            null
          ), E.return = R, E;
        if (typeof E.then == "function")
          return H(R, Vi(E), _);
        if (E.$$typeof === F)
          return H(
            R,
            Qi(R, E),
            _
          );
        Zi(R, E);
      }
      return null;
    }
    function M(R, E, _, U) {
      var Z = E !== null ? E.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return Z !== null ? null : m(R, E, "" + _, U);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case C:
            return _.key === Z ? S(R, E, _, U) : null;
          case x:
            return _.key === Z ? w(R, E, _, U) : null;
          case Kt:
            return _ = Pn(_), M(R, E, _, U);
        }
        if (we(_) || Jt(_))
          return Z !== null ? null : z(R, E, _, U, null);
        if (typeof _.then == "function")
          return M(
            R,
            E,
            Vi(_),
            U
          );
        if (_.$$typeof === F)
          return M(
            R,
            E,
            Qi(R, _),
            U
          );
        Zi(R, _);
      }
      return null;
    }
    function D(R, E, _, U, Z) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return R = R.get(_) || null, m(E, R, "" + U, Z);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case C:
            return R = R.get(
              U.key === null ? _ : U.key
            ) || null, S(E, R, U, Z);
          case x:
            return R = R.get(
              U.key === null ? _ : U.key
            ) || null, w(E, R, U, Z);
          case Kt:
            return U = Pn(U), D(
              R,
              E,
              _,
              U,
              Z
            );
        }
        if (we(U) || Jt(U))
          return R = R.get(_) || null, z(E, R, U, Z, null);
        if (typeof U.then == "function")
          return D(
            R,
            E,
            _,
            Vi(U),
            Z
          );
        if (U.$$typeof === F)
          return D(
            R,
            E,
            _,
            Qi(E, U),
            Z
          );
        Zi(E, U);
      }
      return null;
    }
    function Y(R, E, _, U) {
      for (var Z = null, ct = null, V = E, et = E = 0, ut = null; V !== null && et < _.length; et++) {
        V.index > et ? (ut = V, V = null) : ut = V.sibling;
        var ot = M(
          R,
          V,
          _[et],
          U
        );
        if (ot === null) {
          V === null && (V = ut);
          break;
        }
        t && V && ot.alternate === null && e(R, V), E = c(ot, E, et), ct === null ? Z = ot : ct.sibling = ot, ct = ot, V = ut;
      }
      if (et === _.length)
        return n(R, V), st && Ze(R, et), Z;
      if (V === null) {
        for (; et < _.length; et++)
          V = H(R, _[et], U), V !== null && (E = c(
            V,
            E,
            et
          ), ct === null ? Z = V : ct.sibling = V, ct = V);
        return st && Ze(R, et), Z;
      }
      for (V = a(V); et < _.length; et++)
        ut = D(
          V,
          R,
          et,
          _[et],
          U
        ), ut !== null && (t && ut.alternate !== null && V.delete(
          ut.key === null ? et : ut.key
        ), E = c(
          ut,
          E,
          et
        ), ct === null ? Z = ut : ct.sibling = ut, ct = ut);
      return t && V.forEach(function(Nn) {
        return e(R, Nn);
      }), st && Ze(R, et), Z;
    }
    function $(R, E, _, U) {
      if (_ == null) throw Error(r(151));
      for (var Z = null, ct = null, V = E, et = E = 0, ut = null, ot = _.next(); V !== null && !ot.done; et++, ot = _.next()) {
        V.index > et ? (ut = V, V = null) : ut = V.sibling;
        var Nn = M(R, V, ot.value, U);
        if (Nn === null) {
          V === null && (V = ut);
          break;
        }
        t && V && Nn.alternate === null && e(R, V), E = c(Nn, E, et), ct === null ? Z = Nn : ct.sibling = Nn, ct = Nn, V = ut;
      }
      if (ot.done)
        return n(R, V), st && Ze(R, et), Z;
      if (V === null) {
        for (; !ot.done; et++, ot = _.next())
          ot = H(R, ot.value, U), ot !== null && (E = c(ot, E, et), ct === null ? Z = ot : ct.sibling = ot, ct = ot);
        return st && Ze(R, et), Z;
      }
      for (V = a(V); !ot.done; et++, ot = _.next())
        ot = D(V, R, et, ot.value, U), ot !== null && (t && ot.alternate !== null && V.delete(ot.key === null ? et : ot.key), E = c(ot, E, et), ct === null ? Z = ot : ct.sibling = ot, ct = ot);
      return t && V.forEach(function(Xp) {
        return e(R, Xp);
      }), st && Ze(R, et), Z;
    }
    function St(R, E, _, U) {
      if (typeof _ == "object" && _ !== null && _.type === L && _.key === null && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case C:
            t: {
              for (var Z = _.key; E !== null; ) {
                if (E.key === Z) {
                  if (Z = _.type, Z === L) {
                    if (E.tag === 7) {
                      n(
                        R,
                        E.sibling
                      ), U = u(
                        E,
                        _.props.children
                      ), U.return = R, R = U;
                      break t;
                    }
                  } else if (E.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === Kt && Pn(Z) === E.type) {
                    n(
                      R,
                      E.sibling
                    ), U = u(E, _.props), wl(U, _), U.return = R, R = U;
                    break t;
                  }
                  n(R, E);
                  break;
                } else e(R, E);
                E = E.sibling;
              }
              _.type === L ? (U = Jn(
                _.props.children,
                R.mode,
                U,
                _.key
              ), U.return = R, R = U) : (U = Li(
                _.type,
                _.key,
                _.props,
                null,
                R.mode,
                U
              ), wl(U, _), U.return = R, R = U);
            }
            return o(R);
          case x:
            t: {
              for (Z = _.key; E !== null; ) {
                if (E.key === Z)
                  if (E.tag === 4 && E.stateNode.containerInfo === _.containerInfo && E.stateNode.implementation === _.implementation) {
                    n(
                      R,
                      E.sibling
                    ), U = u(E, _.children || []), U.return = R, R = U;
                    break t;
                  } else {
                    n(R, E);
                    break;
                  }
                else e(R, E);
                E = E.sibling;
              }
              U = Ls(_, R.mode, U), U.return = R, R = U;
            }
            return o(R);
          case Kt:
            return _ = Pn(_), St(
              R,
              E,
              _,
              U
            );
        }
        if (we(_))
          return Y(
            R,
            E,
            _,
            U
          );
        if (Jt(_)) {
          if (Z = Jt(_), typeof Z != "function") throw Error(r(150));
          return _ = Z.call(_), $(
            R,
            E,
            _,
            U
          );
        }
        if (typeof _.then == "function")
          return St(
            R,
            E,
            Vi(_),
            U
          );
        if (_.$$typeof === F)
          return St(
            R,
            E,
            Qi(R, _),
            U
          );
        Zi(R, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint" ? (_ = "" + _, E !== null && E.tag === 6 ? (n(R, E.sibling), U = u(E, _), U.return = R, R = U) : (n(R, E), U = Bs(_, R.mode, U), U.return = R, R = U), o(R)) : n(R, E);
    }
    return function(R, E, _, U) {
      try {
        _l = 0;
        var Z = St(
          R,
          E,
          _,
          U
        );
        return Ha = null, Z;
      } catch (V) {
        if (V === Ua || V === Yi) throw V;
        var ct = se(29, V, null, R.mode);
        return ct.lanes = U, ct.return = R, ct;
      } finally {
      }
    };
  }
  var ea = Bf(!0), Lf = Bf(!1), gn = !1;
  function ks(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Is(t, e) {
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
    if (a = a.shared, (ft & 2) !== 0) {
      var u = a.pending;
      return u === null ? e.next = e : (e.next = u.next, u.next = e), a.pending = e, e = Bi(t), bf(t, null, n), e;
    }
    return Hi(t, a, e, n), Bi(t);
  }
  function Cl(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, n |= a, e.lanes = n, Co(t, n);
    }
  }
  function Fs(t, e) {
    var n = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var u = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var o = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? u = c = o : c = c.next = o, n = n.next;
        } while (n !== null);
        c === null ? u = c = e : c = c.next = e;
      } else u = c = e;
      n = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var Ws = !1;
  function Ml() {
    if (Ws) {
      var t = Na;
      if (t !== null) throw t;
    }
  }
  function Ol(t, e, n, a) {
    Ws = !1;
    var u = t.updateQueue;
    gn = !1;
    var c = u.firstBaseUpdate, o = u.lastBaseUpdate, m = u.shared.pending;
    if (m !== null) {
      u.shared.pending = null;
      var S = m, w = S.next;
      S.next = null, o === null ? c = w : o.next = w, o = S;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, m = z.lastBaseUpdate, m !== o && (m === null ? z.firstBaseUpdate = w : m.next = w, z.lastBaseUpdate = S));
    }
    if (c !== null) {
      var H = u.baseState;
      o = 0, z = w = S = null, m = c;
      do {
        var M = m.lane & -536870913, D = M !== m.lane;
        if (D ? (it & M) === M : (a & M) === M) {
          M !== 0 && M === xa && (Ws = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          t: {
            var Y = t, $ = m;
            M = e;
            var St = n;
            switch ($.tag) {
              case 1:
                if (Y = $.payload, typeof Y == "function") {
                  H = Y.call(St, H, M);
                  break t;
                }
                H = Y;
                break t;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = $.payload, M = typeof Y == "function" ? Y.call(St, H, M) : Y, M == null) break t;
                H = v({}, H, M);
                break t;
              case 2:
                gn = !0;
            }
          }
          M = m.callback, M !== null && (t.flags |= 64, D && (t.flags |= 8192), D = u.callbacks, D === null ? u.callbacks = [M] : D.push(M));
        } else
          D = {
            lane: M,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, z === null ? (w = z = D, S = H) : z = z.next = D, o |= M;
        if (m = m.next, m === null) {
          if (m = u.shared.pending, m === null)
            break;
          D = m, m = D.next, D.next = null, u.lastBaseUpdate = D, u.shared.pending = null;
        }
      } while (!0);
      z === null && (S = H), u.baseState = S, u.firstBaseUpdate = w, u.lastBaseUpdate = z, c === null && (u.shared.lanes = 0), An |= o, t.lanes = o, t.memoizedState = H;
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
  var Ba = T(null), $i = T(0);
  function Qf(t, e) {
    t = nn, G($i, t), G(Ba, e), nn = t | e.baseLanes;
  }
  function Ps() {
    G($i, nn), G(Ba, Ba.current);
  }
  function tr() {
    nn = $i.current, B(Ba), B($i);
  }
  var re = T(null), Te = null;
  function vn(t) {
    var e = t.alternate;
    G(Ot, Ot.current & 1), G(re, t), Te === null && (e === null || Ba.current !== null || e.memoizedState !== null) && (Te = t);
  }
  function er(t) {
    G(Ot, Ot.current), G(re, t), Te === null && (Te = t);
  }
  function Gf(t) {
    t.tag === 22 ? (G(Ot, Ot.current), G(re, t), Te === null && (Te = t)) : bn();
  }
  function bn() {
    G(Ot, Ot.current), G(re, re.current);
  }
  function ce(t) {
    B(re), Te === t && (Te = null), B(Ot);
  }
  var Ot = T(0);
  function Ki(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || sc(n) || rc(n)))
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
  var Je = 0, P = null, gt = null, xt = null, Ji = !1, La = !1, na = !1, ki = 0, Dl = 0, ja = null, N0 = 0;
  function wt() {
    throw Error(r(321));
  }
  function nr(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!ue(t[n], e[n])) return !1;
    return !0;
  }
  function ar(t, e, n, a, u, c) {
    return Je = c, P = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, N.H = t === null || t.memoizedState === null ? Rd : Sr, na = !1, c = n(a, u), na = !1, La && (c = Xf(
      e,
      n,
      a,
      u
    )), Yf(t), c;
  }
  function Yf(t) {
    N.H = Nl;
    var e = gt !== null && gt.next !== null;
    if (Je = 0, xt = gt = P = null, Ji = !1, Dl = 0, ja = null, e) throw Error(r(300));
    t === null || Nt || (t = t.dependencies, t !== null && qi(t) && (Nt = !0));
  }
  function Xf(t, e, n, a) {
    P = t;
    var u = 0;
    do {
      if (La && (ja = null), Dl = 0, La = !1, 25 <= u) throw Error(r(301));
      if (u += 1, xt = gt = null, t.updateQueue != null) {
        var c = t.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      N.H = _d, c = e(n, a);
    } while (La);
    return c;
  }
  function U0() {
    var t = N.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? zl(e) : e, t = t.useState()[0], (gt !== null ? gt.memoizedState : null) !== t && (P.flags |= 1024), e;
  }
  function lr() {
    var t = ki !== 0;
    return ki = 0, t;
  }
  function ir(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function ur(t) {
    if (Ji) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Ji = !1;
    }
    Je = 0, xt = gt = P = null, La = !1, Dl = ki = 0, ja = null;
  }
  function $t() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return xt === null ? P.memoizedState = xt = t : xt = xt.next = t, xt;
  }
  function Dt() {
    if (gt === null) {
      var t = P.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = gt.next;
    var e = xt === null ? P.memoizedState : xt.next;
    if (e !== null)
      xt = e, gt = t;
    else {
      if (t === null)
        throw P.alternate === null ? Error(r(467)) : Error(r(310));
      gt = t, t = {
        memoizedState: gt.memoizedState,
        baseState: gt.baseState,
        baseQueue: gt.baseQueue,
        queue: gt.queue,
        next: null
      }, xt === null ? P.memoizedState = xt = t : xt = xt.next = t;
    }
    return xt;
  }
  function Ii() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function zl(t) {
    var e = Dl;
    return Dl += 1, ja === null && (ja = []), t = Nf(ja, t, e), e = P, (xt === null ? e.memoizedState : xt.next) === null && (e = e.alternate, N.H = e === null || e.memoizedState === null ? Rd : Sr), t;
  }
  function Fi(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return zl(t);
      if (t.$$typeof === F) return Qt(t);
    }
    throw Error(r(438, String(t)));
  }
  function sr(t) {
    var e = null, n = P.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var a = P.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Ii(), P.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), a = 0; a < t; a++)
        n[a] = ha;
    return e.index++, n;
  }
  function ke(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Wi(t) {
    var e = Dt();
    return rr(e, gt, t);
  }
  function rr(t, e, n) {
    var a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var u = t.baseQueue, c = a.pending;
    if (c !== null) {
      if (u !== null) {
        var o = u.next;
        u.next = c.next, c.next = o;
      }
      e.baseQueue = u = c, a.pending = null;
    }
    if (c = t.baseState, u === null) t.memoizedState = c;
    else {
      e = u.next;
      var m = o = null, S = null, w = e, z = !1;
      do {
        var H = w.lane & -536870913;
        if (H !== w.lane ? (it & H) === H : (Je & H) === H) {
          var M = w.revertLane;
          if (M === 0)
            S !== null && (S = S.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: w.action,
              hasEagerState: w.hasEagerState,
              eagerState: w.eagerState,
              next: null
            }), H === xa && (z = !0);
          else if ((Je & M) === M) {
            w = w.next, M === xa && (z = !0);
            continue;
          } else
            H = {
              lane: 0,
              revertLane: w.revertLane,
              gesture: null,
              action: w.action,
              hasEagerState: w.hasEagerState,
              eagerState: w.eagerState,
              next: null
            }, S === null ? (m = S = H, o = c) : S = S.next = H, P.lanes |= M, An |= M;
          H = w.action, na && n(c, H), c = w.hasEagerState ? w.eagerState : n(c, H);
        } else
          M = {
            lane: H,
            revertLane: w.revertLane,
            gesture: w.gesture,
            action: w.action,
            hasEagerState: w.hasEagerState,
            eagerState: w.eagerState,
            next: null
          }, S === null ? (m = S = M, o = c) : S = S.next = M, P.lanes |= H, An |= H;
        w = w.next;
      } while (w !== null && w !== e);
      if (S === null ? o = c : S.next = m, !ue(c, t.memoizedState) && (Nt = !0, z && (n = Na, n !== null)))
        throw n;
      t.memoizedState = c, t.baseState = o, t.baseQueue = S, a.lastRenderedState = c;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function cr(t) {
    var e = Dt(), n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = t;
    var a = n.dispatch, u = n.pending, c = e.memoizedState;
    if (u !== null) {
      n.pending = null;
      var o = u = u.next;
      do
        c = t(c, o.action), o = o.next;
      while (o !== u);
      ue(c, e.memoizedState) || (Nt = !0), e.memoizedState = c, e.baseQueue === null && (e.baseState = c), n.lastRenderedState = c;
    }
    return [c, a];
  }
  function Vf(t, e, n) {
    var a = P, u = Dt(), c = st;
    if (c) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = e();
    var o = !ue(
      (gt || u).memoizedState,
      n
    );
    if (o && (u.memoizedState = n, Nt = !0), u = u.queue, dr(Kf.bind(null, a, u, t), [
      t
    ]), u.getSnapshot !== e || o || xt !== null && xt.memoizedState.tag & 1) {
      if (a.flags |= 2048, qa(
        9,
        { destroy: void 0 },
        $f.bind(
          null,
          a,
          u,
          n,
          e
        ),
        null
      ), bt === null) throw Error(r(349));
      c || (Je & 127) !== 0 || Zf(a, e, n);
    }
    return n;
  }
  function Zf(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = P.updateQueue, e === null ? (e = Ii(), P.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function $f(t, e, n, a) {
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
    e !== null && ee(e, t, 2);
  }
  function or(t) {
    var e = $t();
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
    return t.baseState = n, rr(
      t,
      gt,
      typeof a == "function" ? a : ke
    );
  }
  function H0(t, e, n, a, u) {
    if (eu(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var c = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(o) {
          c.listeners.push(o);
        }
      };
      N.T !== null ? n(!0) : c.isTransition = !1, a(c), n = e.pending, n === null ? (c.next = e.pending = c, Ff(e, c)) : (c.next = n.next, e.pending = n.next = c);
    }
  }
  function Ff(t, e) {
    var n = e.action, a = e.payload, u = t.state;
    if (e.isTransition) {
      var c = N.T, o = {};
      N.T = o;
      try {
        var m = n(u, a), S = N.S;
        S !== null && S(o, m), Wf(t, e, m);
      } catch (w) {
        fr(t, e, w);
      } finally {
        c !== null && o.types !== null && (c.types = o.types), N.T = c;
      }
    } else
      try {
        c = n(u, a), Wf(t, e, c);
      } catch (w) {
        fr(t, e, w);
      }
  }
  function Wf(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        Pf(t, e, a);
      },
      function(a) {
        return fr(t, e, a);
      }
    ) : Pf(t, e, n);
  }
  function Pf(t, e, n) {
    e.status = "fulfilled", e.value = n, td(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Ff(t, n)));
  }
  function fr(t, e, n) {
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
    if (st) {
      var n = bt.formState;
      if (n !== null) {
        t: {
          var a = P;
          if (st) {
            if (Tt) {
              e: {
                for (var u = Tt, c = Ee; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break e;
                  }
                  if (u = Ae(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                c = u.data, u = c === "F!" || c === "F" ? u : null;
              }
              if (u) {
                Tt = Ae(
                  u.nextSibling
                ), a = u.data === "F!";
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
    return n = $t(), n.memoizedState = n.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ed,
      lastRenderedState: e
    }, n.queue = a, n = Ed.bind(
      null,
      P,
      a
    ), a.dispatch = n, a = or(!1), c = pr.bind(
      null,
      P,
      !1,
      a.queue
    ), a = $t(), u = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, n = H0.bind(
      null,
      P,
      u,
      c,
      n
    ), u.dispatch = n, a.memoizedState = t, [e, n, !1];
  }
  function ad(t) {
    var e = Dt();
    return ld(e, gt, t);
  }
  function ld(t, e, n) {
    if (e = rr(
      t,
      e,
      ed
    )[0], t = Wi(ke)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = zl(e);
      } catch (o) {
        throw o === Ua ? Yi : o;
      }
    else a = e;
    e = Dt();
    var u = e.queue, c = u.dispatch;
    return n !== e.memoizedState && (P.flags |= 2048, qa(
      9,
      { destroy: void 0 },
      B0.bind(null, u, n),
      null
    )), [a, c, t];
  }
  function B0(t, e) {
    t.action = e;
  }
  function id(t) {
    var e = Dt(), n = gt;
    if (n !== null)
      return ld(e, n, t);
    Dt(), e = e.memoizedState, n = Dt();
    var a = n.queue.dispatch;
    return n.memoizedState = t, [e, a, !1];
  }
  function qa(t, e, n, a) {
    return t = { tag: t, create: n, deps: a, inst: e, next: null }, e = P.updateQueue, e === null && (e = Ii(), P.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (a = n.next, n.next = t, t.next = a, e.lastEffect = t), t;
  }
  function ud() {
    return Dt().memoizedState;
  }
  function Pi(t, e, n, a) {
    var u = $t();
    P.flags |= t, u.memoizedState = qa(
      1 | e,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a
    );
  }
  function tu(t, e, n, a) {
    var u = Dt();
    a = a === void 0 ? null : a;
    var c = u.memoizedState.inst;
    gt !== null && a !== null && nr(a, gt.memoizedState.deps) ? u.memoizedState = qa(e, c, n, a) : (P.flags |= t, u.memoizedState = qa(
      1 | e,
      c,
      n,
      a
    ));
  }
  function sd(t, e) {
    Pi(8390656, 8, t, e);
  }
  function dr(t, e) {
    tu(2048, 8, t, e);
  }
  function L0(t) {
    P.flags |= 4;
    var e = P.updateQueue;
    if (e === null)
      e = Ii(), P.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function rd(t) {
    var e = Dt().memoizedState;
    return L0({ ref: e, nextImpl: t }), function() {
      if ((ft & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function cd(t, e) {
    return tu(4, 2, t, e);
  }
  function od(t, e) {
    return tu(4, 4, t, e);
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
    n = n != null ? n.concat([t]) : null, tu(4, 4, fd.bind(null, e, t), n);
  }
  function hr() {
  }
  function hd(t, e) {
    var n = Dt();
    e = e === void 0 ? null : e;
    var a = n.memoizedState;
    return e !== null && nr(e, a[1]) ? a[0] : (n.memoizedState = [t, e], t);
  }
  function md(t, e) {
    var n = Dt();
    e = e === void 0 ? null : e;
    var a = n.memoizedState;
    if (e !== null && nr(e, a[1]))
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
  function mr(t, e, n) {
    return n === void 0 || (Je & 1073741824) !== 0 && (it & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = yh(), P.lanes |= t, An |= t, n);
  }
  function yd(t, e, n, a) {
    return ue(n, e) ? n : Ba.current !== null ? (t = mr(t, n, a), ue(t, e) || (Nt = !0), t) : (Je & 42) === 0 || (Je & 1073741824) !== 0 && (it & 261930) === 0 ? (Nt = !0, t.memoizedState = n) : (t = yh(), P.lanes |= t, An |= t, e);
  }
  function gd(t, e, n, a, u) {
    var c = Q.p;
    Q.p = c !== 0 && 8 > c ? c : 8;
    var o = N.T, m = {};
    N.T = m, pr(t, !1, e, n);
    try {
      var S = u(), w = N.S;
      if (w !== null && w(m, S), S !== null && typeof S == "object" && typeof S.then == "function") {
        var z = x0(
          S,
          a
        );
        xl(
          t,
          e,
          z,
          de(t)
        );
      } else
        xl(
          t,
          e,
          a,
          de(t)
        );
    } catch (H) {
      xl(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: H },
        de()
      );
    } finally {
      Q.p = c, o !== null && m.types !== null && (o.types = m.types), N.T = o;
    }
  }
  function j0() {
  }
  function yr(t, e, n, a) {
    if (t.tag !== 5) throw Error(r(476));
    var u = pd(t).queue;
    gd(
      t,
      u,
      e,
      K,
      n === null ? j0 : function() {
        return Sd(t), n(a);
      }
    );
  }
  function pd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: K,
      baseState: K,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ke,
        lastRenderedState: K
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
    e.next === null && (e = t.alternate.memoizedState), xl(
      t,
      e.next.queue,
      {},
      de()
    );
  }
  function gr() {
    return Qt(kl);
  }
  function vd() {
    return Dt().memoizedState;
  }
  function bd() {
    return Dt().memoizedState;
  }
  function q0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = de();
          t = pn(n);
          var a = Sn(e, t, n);
          a !== null && (ee(a, e, n), Cl(a, e, n)), e = { cache: Zs() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Q0(t, e, n) {
    var a = de();
    n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, eu(t) ? Td(e, n) : (n = Us(t, e, n, a), n !== null && (ee(n, t, a), Ad(n, e, a)));
  }
  function Ed(t, e, n) {
    var a = de();
    xl(t, e, n, a);
  }
  function xl(t, e, n, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (eu(t)) Td(e, u);
    else {
      var c = t.alternate;
      if (t.lanes === 0 && (c === null || c.lanes === 0) && (c = e.lastRenderedReducer, c !== null))
        try {
          var o = e.lastRenderedState, m = c(o, n);
          if (u.hasEagerState = !0, u.eagerState = m, ue(m, o))
            return Hi(t, e, u, 0), bt === null && Ui(), !1;
        } catch {
        } finally {
        }
      if (n = Us(t, e, u, a), n !== null)
        return ee(n, t, a), Ad(n, e, a), !0;
    }
    return !1;
  }
  function pr(t, e, n, a) {
    if (a = {
      lane: 2,
      revertLane: kr(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, eu(t)) {
      if (e) throw Error(r(479));
    } else
      e = Us(
        t,
        n,
        a,
        2
      ), e !== null && ee(e, t, 2);
  }
  function eu(t) {
    var e = t.alternate;
    return t === P || e !== null && e === P;
  }
  function Td(t, e) {
    La = Ji = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function Ad(t, e, n) {
    if ((n & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, n |= a, e.lanes = n, Co(t, n);
    }
  }
  var Nl = {
    readContext: Qt,
    use: Fi,
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
  Nl.useEffectEvent = wt;
  var Rd = {
    readContext: Qt,
    use: Fi,
    useCallback: function(t, e) {
      return $t().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Qt,
    useEffect: sd,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Pi(
        4194308,
        4,
        fd.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Pi(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Pi(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = $t();
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
      var a = $t();
      if (n !== void 0) {
        var u = n(e);
        if (na) {
          cn(!0);
          try {
            n(e);
          } finally {
            cn(!1);
          }
        }
      } else u = e;
      return a.memoizedState = a.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, a.queue = t, t = t.dispatch = Q0.bind(
        null,
        P,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = $t();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = or(t);
      var e = t.queue, n = Ed.bind(null, P, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: hr,
    useDeferredValue: function(t, e) {
      var n = $t();
      return mr(n, t, e);
    },
    useTransition: function() {
      var t = or(!1);
      return t = gd.bind(
        null,
        P,
        t.queue,
        !0,
        !1
      ), $t().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var a = P, u = $t();
      if (st) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = e(), bt === null)
          throw Error(r(349));
        (it & 127) !== 0 || Zf(a, e, n);
      }
      u.memoizedState = n;
      var c = { value: n, getSnapshot: e };
      return u.queue = c, sd(Kf.bind(null, a, c, t), [
        t
      ]), a.flags |= 2048, qa(
        9,
        { destroy: void 0 },
        $f.bind(
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
      var t = $t(), e = bt.identifierPrefix;
      if (st) {
        var n = He, a = Ue;
        n = (a & ~(1 << 32 - ie(a) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = ki++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = N0++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: gr,
    useFormState: nd,
    useActionState: nd,
    useOptimistic: function(t) {
      var e = $t();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = pr.bind(
        null,
        P,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: sr,
    useCacheRefresh: function() {
      return $t().memoizedState = q0.bind(
        null,
        P
      );
    },
    useEffectEvent: function(t) {
      var e = $t(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((ft & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Sr = {
    readContext: Qt,
    use: Fi,
    useCallback: hd,
    useContext: Qt,
    useEffect: dr,
    useImperativeHandle: dd,
    useInsertionEffect: cd,
    useLayoutEffect: od,
    useMemo: md,
    useReducer: Wi,
    useRef: ud,
    useState: function() {
      return Wi(ke);
    },
    useDebugValue: hr,
    useDeferredValue: function(t, e) {
      var n = Dt();
      return yd(
        n,
        gt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Wi(ke)[0], e = Dt().memoizedState;
      return [
        typeof t == "boolean" ? t : zl(t),
        e
      ];
    },
    useSyncExternalStore: Vf,
    useId: vd,
    useHostTransitionStatus: gr,
    useFormState: ad,
    useActionState: ad,
    useOptimistic: function(t, e) {
      var n = Dt();
      return If(n, gt, t, e);
    },
    useMemoCache: sr,
    useCacheRefresh: bd
  };
  Sr.useEffectEvent = rd;
  var _d = {
    readContext: Qt,
    use: Fi,
    useCallback: hd,
    useContext: Qt,
    useEffect: dr,
    useImperativeHandle: dd,
    useInsertionEffect: cd,
    useLayoutEffect: od,
    useMemo: md,
    useReducer: cr,
    useRef: ud,
    useState: function() {
      return cr(ke);
    },
    useDebugValue: hr,
    useDeferredValue: function(t, e) {
      var n = Dt();
      return gt === null ? mr(n, t, e) : yd(
        n,
        gt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = cr(ke)[0], e = Dt().memoizedState;
      return [
        typeof t == "boolean" ? t : zl(t),
        e
      ];
    },
    useSyncExternalStore: Vf,
    useId: vd,
    useHostTransitionStatus: gr,
    useFormState: id,
    useActionState: id,
    useOptimistic: function(t, e) {
      var n = Dt();
      return gt !== null ? If(n, gt, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: sr,
    useCacheRefresh: bd
  };
  _d.useEffectEvent = rd;
  function vr(t, e, n, a) {
    e = t.memoizedState, n = n(a, e), n = n == null ? e : v({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var br = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var a = de(), u = pn(a);
      u.payload = e, n != null && (u.callback = n), e = Sn(t, u, a), e !== null && (ee(e, t, a), Cl(e, t, a));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var a = de(), u = pn(a);
      u.tag = 1, u.payload = e, n != null && (u.callback = n), e = Sn(t, u, a), e !== null && (ee(e, t, a), Cl(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = de(), a = pn(n);
      a.tag = 2, e != null && (a.callback = e), e = Sn(t, a, n), e !== null && (ee(e, t, n), Cl(e, t, n));
    }
  };
  function wd(t, e, n, a, u, c, o) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, c, o) : e.prototype && e.prototype.isPureReactComponent ? !vl(n, a) || !vl(u, c) : !0;
  }
  function Cd(t, e, n, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, a), e.state !== t && br.enqueueReplaceState(e, e.state, null);
  }
  function aa(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var a in e)
        a !== "ref" && (n[a] = e[a]);
    }
    if (t = t.defaultProps) {
      n === e && (n = v({}, n));
      for (var u in t)
        n[u] === void 0 && (n[u] = t[u]);
    }
    return n;
  }
  function Md(t) {
    Ni(t);
  }
  function Od(t) {
    console.error(t);
  }
  function Dd(t) {
    Ni(t);
  }
  function nu(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function zd(t, e, n) {
    try {
      var a = t.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Er(t, e, n) {
    return n = pn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      nu(t, e);
    }, n;
  }
  function xd(t) {
    return t = pn(t), t.tag = 3, t;
  }
  function Nd(t, e, n, a) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = a.value;
      t.payload = function() {
        return u(c);
      }, t.callback = function() {
        zd(e, n, a);
      };
    }
    var o = n.stateNode;
    o !== null && typeof o.componentDidCatch == "function" && (t.callback = function() {
      zd(e, n, a), typeof u != "function" && (Rn === null ? Rn = /* @__PURE__ */ new Set([this]) : Rn.add(this));
      var m = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function G0(t, e, n, a, u) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = n.alternate, e !== null && za(
        e,
        n,
        u,
        !0
      ), n = re.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Te === null ? mu() : n.alternate === null && Ct === 0 && (Ct = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, a === Xi ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), $r(t, a, u)), !1;
          case 22:
            return n.flags |= 65536, a === Xi ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), $r(t, a, u)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return $r(t, a, u), mu(), !1;
    }
    if (st)
      return e = re.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = u, a !== Qs && (t = Error(r(422), { cause: a }), Tl(Se(t, n)))) : (a !== Qs && (e = Error(r(423), {
        cause: a
      }), Tl(
        Se(e, n)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = Se(a, n), u = Er(
        t.stateNode,
        a,
        u
      ), Fs(t, u), Ct !== 4 && (Ct = 2)), !1;
    var c = Error(r(520), { cause: a });
    if (c = Se(c, n), Gl === null ? Gl = [c] : Gl.push(c), Ct !== 4 && (Ct = 2), e === null) return !0;
    a = Se(a, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = u & -u, n.lanes |= t, t = Er(n.stateNode, a, t), Fs(n, t), !1;
        case 1:
          if (e = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Rn === null || !Rn.has(c))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = xd(u), Nd(
              u,
              t,
              n,
              a
            ), Fs(n, u), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Tr = Error(r(461)), Nt = !1;
  function Gt(t, e, n, a) {
    e.child = t === null ? Lf(e, null, n, a) : ea(
      e,
      t.child,
      n,
      a
    );
  }
  function Ud(t, e, n, a, u) {
    n = n.render;
    var c = e.ref;
    if ("ref" in a) {
      var o = {};
      for (var m in a)
        m !== "ref" && (o[m] = a[m]);
    } else o = a;
    return Fn(e), a = ar(
      t,
      e,
      n,
      o,
      c,
      u
    ), m = lr(), t !== null && !Nt ? (ir(t, e, u), Ie(t, e, u)) : (st && m && js(e), e.flags |= 1, Gt(t, e, a, u), e.child);
  }
  function Hd(t, e, n, a, u) {
    if (t === null) {
      var c = n.type;
      return typeof c == "function" && !Hs(c) && c.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = c, Bd(
        t,
        e,
        c,
        a,
        u
      )) : (t = Li(
        n.type,
        null,
        a,
        e,
        e.mode,
        u
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (c = t.child, !Dr(t, u)) {
      var o = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : vl, n(o, a) && t.ref === e.ref)
        return Ie(t, e, u);
    }
    return e.flags |= 1, t = Ve(c, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Bd(t, e, n, a, u) {
    if (t !== null) {
      var c = t.memoizedProps;
      if (vl(c, a) && t.ref === e.ref)
        if (Nt = !1, e.pendingProps = a = c, Dr(t, u))
          (t.flags & 131072) !== 0 && (Nt = !0);
        else
          return e.lanes = t.lanes, Ie(t, e, u);
    }
    return Ar(
      t,
      e,
      n,
      a,
      u
    );
  }
  function Ld(t, e, n, a) {
    var u = a.children, c = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | n : n, t !== null) {
          for (a = e.child = t.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~c;
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
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Gi(
          e,
          c !== null ? c.cachePool : null
        ), c !== null ? Qf(e, c) : Ps(), Gf(e);
      else
        return a = e.lanes = 536870912, jd(
          t,
          e,
          c !== null ? c.baseLanes | n : n,
          n,
          a
        );
    } else
      c !== null ? (Gi(e, c.cachePool), Qf(e, c), bn(), e.memoizedState = null) : (t !== null && Gi(e, null), Ps(), bn());
    return Gt(t, e, u, n), e.child;
  }
  function Ul(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function jd(t, e, n, a, u) {
    var c = Ks();
    return c = c === null ? null : { parent: zt._currentValue, pool: c }, e.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, t !== null && Gi(e, null), Ps(), Gf(e), t !== null && za(t, e, a, !0), e.childLanes = u, null;
  }
  function au(t, e) {
    return e = iu(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function qd(t, e, n) {
    return ea(e, t.child, null, n), t = au(e, e.pendingProps), t.flags |= 2, ce(e), e.memoizedState = null, t;
  }
  function Y0(t, e, n) {
    var a = e.pendingProps, u = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (st) {
        if (a.mode === "hidden")
          return t = au(e, a), e.lanes = 536870912, Ul(null, t);
        if (er(e), (t = Tt) ? (t = Fh(
          t,
          Ee
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: dn !== null ? { id: Ue, overflow: He } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Tf(t), n.return = e, e.child = n, qt = e, Tt = null)) : t = null, t === null) throw mn(e);
        return e.lanes = 536870912, null;
      }
      return au(e, a);
    }
    var c = t.memoizedState;
    if (c !== null) {
      var o = c.dehydrated;
      if (er(e), u)
        if (e.flags & 256)
          e.flags &= -257, e = qd(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (Nt || za(t, e, n, !1), u = (n & t.childLanes) !== 0, Nt || u) {
        if (a = bt, a !== null && (o = Mo(a, n), o !== 0 && o !== c.retryLane))
          throw c.retryLane = o, Kn(t, o), ee(a, t, o), Tr;
        mu(), e = qd(
          t,
          e,
          n
        );
      } else
        t = c.treeContext, Tt = Ae(o.nextSibling), qt = e, st = !0, hn = null, Ee = !1, t !== null && _f(e, t), e = au(e, a), e.flags |= 4096;
      return e;
    }
    return t = Ve(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function lu(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Ar(t, e, n, a, u) {
    return Fn(e), n = ar(
      t,
      e,
      n,
      a,
      void 0,
      u
    ), a = lr(), t !== null && !Nt ? (ir(t, e, u), Ie(t, e, u)) : (st && a && js(e), e.flags |= 1, Gt(t, e, n, u), e.child);
  }
  function Qd(t, e, n, a, u, c) {
    return Fn(e), e.updateQueue = null, n = Xf(
      e,
      a,
      n,
      u
    ), Yf(t), a = lr(), t !== null && !Nt ? (ir(t, e, c), Ie(t, e, c)) : (st && a && js(e), e.flags |= 1, Gt(t, e, n, c), e.child);
  }
  function Gd(t, e, n, a, u) {
    if (Fn(e), e.stateNode === null) {
      var c = Ca, o = n.contextType;
      typeof o == "object" && o !== null && (c = Qt(o)), c = new n(a, c), e.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = br, e.stateNode = c, c._reactInternals = e, c = e.stateNode, c.props = a, c.state = e.memoizedState, c.refs = {}, ks(e), o = n.contextType, c.context = typeof o == "object" && o !== null ? Qt(o) : Ca, c.state = e.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (vr(
        e,
        n,
        o,
        a
      ), c.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (o = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), o !== c.state && br.enqueueReplaceState(c, c.state, null), Ol(e, a, c, u), Ml(), c.state = e.memoizedState), typeof c.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      c = e.stateNode;
      var m = e.memoizedProps, S = aa(n, m);
      c.props = S;
      var w = c.context, z = n.contextType;
      o = Ca, typeof z == "object" && z !== null && (o = Qt(z));
      var H = n.getDerivedStateFromProps;
      z = typeof H == "function" || typeof c.getSnapshotBeforeUpdate == "function", m = e.pendingProps !== m, z || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (m || w !== o) && Cd(
        e,
        c,
        a,
        o
      ), gn = !1;
      var M = e.memoizedState;
      c.state = M, Ol(e, a, c, u), Ml(), w = e.memoizedState, m || M !== w || gn ? (typeof H == "function" && (vr(
        e,
        n,
        H,
        a
      ), w = e.memoizedState), (S = gn || wd(
        e,
        n,
        S,
        a,
        M,
        w,
        o
      )) ? (z || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = w), c.props = a, c.state = w, c.context = o, a = S) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      c = e.stateNode, Is(t, e), o = e.memoizedProps, z = aa(n, o), c.props = z, H = e.pendingProps, M = c.context, w = n.contextType, S = Ca, typeof w == "object" && w !== null && (S = Qt(w)), m = n.getDerivedStateFromProps, (w = typeof m == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (o !== H || M !== S) && Cd(
        e,
        c,
        a,
        S
      ), gn = !1, M = e.memoizedState, c.state = M, Ol(e, a, c, u), Ml();
      var D = e.memoizedState;
      o !== H || M !== D || gn || t !== null && t.dependencies !== null && qi(t.dependencies) ? (typeof m == "function" && (vr(
        e,
        n,
        m,
        a
      ), D = e.memoizedState), (z = gn || wd(
        e,
        n,
        z,
        a,
        M,
        D,
        S
      ) || t !== null && t.dependencies !== null && qi(t.dependencies)) ? (w || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(a, D, S), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        a,
        D,
        S
      )), typeof c.componentDidUpdate == "function" && (e.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || o === t.memoizedProps && M === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || o === t.memoizedProps && M === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = D), c.props = a, c.state = D, c.context = S, a = z) : (typeof c.componentDidUpdate != "function" || o === t.memoizedProps && M === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || o === t.memoizedProps && M === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return c = a, lu(t, e), a = (e.flags & 128) !== 0, c || a ? (c = e.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : c.render(), e.flags |= 1, t !== null && a ? (e.child = ea(
      e,
      t.child,
      null,
      u
    ), e.child = ea(
      e,
      null,
      n,
      u
    )) : Gt(t, e, n, u), e.memoizedState = c.state, t = e.child) : t = Ie(
      t,
      e,
      u
    ), t;
  }
  function Yd(t, e, n, a) {
    return kn(), e.flags |= 256, Gt(t, e, n, a), e.child;
  }
  var Rr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function _r(t) {
    return { baseLanes: t, cachePool: zf() };
  }
  function wr(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= fe), t;
  }
  function Xd(t, e, n) {
    var a = e.pendingProps, u = !1, c = (e.flags & 128) !== 0, o;
    if ((o = c) || (o = t !== null && t.memoizedState === null ? !1 : (Ot.current & 2) !== 0), o && (u = !0, e.flags &= -129), o = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (st) {
        if (u ? vn(e) : bn(), (t = Tt) ? (t = Fh(
          t,
          Ee
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: dn !== null ? { id: Ue, overflow: He } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Tf(t), n.return = e, e.child = n, qt = e, Tt = null)) : t = null, t === null) throw mn(e);
        return rc(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var m = a.children;
      return a = a.fallback, u ? (bn(), u = e.mode, m = iu(
        { mode: "hidden", children: m },
        u
      ), a = Jn(
        a,
        u,
        n,
        null
      ), m.return = e, a.return = e, m.sibling = a, e.child = m, a = e.child, a.memoizedState = _r(n), a.childLanes = wr(
        t,
        o,
        n
      ), e.memoizedState = Rr, Ul(null, a)) : (vn(e), Cr(e, m));
    }
    var S = t.memoizedState;
    if (S !== null && (m = S.dehydrated, m !== null)) {
      if (c)
        e.flags & 256 ? (vn(e), e.flags &= -257, e = Mr(
          t,
          e,
          n
        )) : e.memoizedState !== null ? (bn(), e.child = t.child, e.flags |= 128, e = null) : (bn(), m = a.fallback, u = e.mode, a = iu(
          { mode: "visible", children: a.children },
          u
        ), m = Jn(
          m,
          u,
          n,
          null
        ), m.flags |= 2, a.return = e, m.return = e, a.sibling = m, e.child = a, ea(
          e,
          t.child,
          null,
          n
        ), a = e.child, a.memoizedState = _r(n), a.childLanes = wr(
          t,
          o,
          n
        ), e.memoizedState = Rr, e = Ul(null, a));
      else if (vn(e), rc(m)) {
        if (o = m.nextSibling && m.nextSibling.dataset, o) var w = o.dgst;
        o = w, a = Error(r(419)), a.stack = "", a.digest = o, Tl({ value: a, source: null, stack: null }), e = Mr(
          t,
          e,
          n
        );
      } else if (Nt || za(t, e, n, !1), o = (n & t.childLanes) !== 0, Nt || o) {
        if (o = bt, o !== null && (a = Mo(o, n), a !== 0 && a !== S.retryLane))
          throw S.retryLane = a, Kn(t, a), ee(o, t, a), Tr;
        sc(m) || mu(), e = Mr(
          t,
          e,
          n
        );
      } else
        sc(m) ? (e.flags |= 192, e.child = t.child, e = null) : (t = S.treeContext, Tt = Ae(
          m.nextSibling
        ), qt = e, st = !0, hn = null, Ee = !1, t !== null && _f(e, t), e = Cr(
          e,
          a.children
        ), e.flags |= 4096);
      return e;
    }
    return u ? (bn(), m = a.fallback, u = e.mode, S = t.child, w = S.sibling, a = Ve(S, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = S.subtreeFlags & 65011712, w !== null ? m = Ve(
      w,
      m
    ) : (m = Jn(
      m,
      u,
      n,
      null
    ), m.flags |= 2), m.return = e, a.return = e, a.sibling = m, e.child = a, Ul(null, a), a = e.child, m = t.child.memoizedState, m === null ? m = _r(n) : (u = m.cachePool, u !== null ? (S = zt._currentValue, u = u.parent !== S ? { parent: S, pool: S } : u) : u = zf(), m = {
      baseLanes: m.baseLanes | n,
      cachePool: u
    }), a.memoizedState = m, a.childLanes = wr(
      t,
      o,
      n
    ), e.memoizedState = Rr, Ul(t.child, a)) : (vn(e), n = t.child, t = n.sibling, n = Ve(n, {
      mode: "visible",
      children: a.children
    }), n.return = e, n.sibling = null, t !== null && (o = e.deletions, o === null ? (e.deletions = [t], e.flags |= 16) : o.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Cr(t, e) {
    return e = iu(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function iu(t, e) {
    return t = se(22, t, null, e), t.lanes = 0, t;
  }
  function Mr(t, e, n) {
    return ea(e, t.child, null, n), t = Cr(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Vd(t, e, n) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), Xs(t.return, e, n);
  }
  function Or(t, e, n, a, u, c) {
    var o = t.memoizedState;
    o === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: u,
      treeForkCount: c
    } : (o.isBackwards = e, o.rendering = null, o.renderingStartTime = 0, o.last = a, o.tail = n, o.tailMode = u, o.treeForkCount = c);
  }
  function Zd(t, e, n) {
    var a = e.pendingProps, u = a.revealOrder, c = a.tail;
    a = a.children;
    var o = Ot.current, m = (o & 2) !== 0;
    if (m ? (o = o & 1 | 2, e.flags |= 128) : o &= 1, G(Ot, o), Gt(t, e, a, n), a = st ? El : 0, !m && t !== null && (t.flags & 128) !== 0)
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
    switch (u) {
      case "forwards":
        for (n = e.child, u = null; n !== null; )
          t = n.alternate, t !== null && Ki(t) === null && (u = n), n = n.sibling;
        n = u, n === null ? (u = e.child, e.child = null) : (u = n.sibling, n.sibling = null), Or(
          e,
          !1,
          u,
          n,
          c,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, u = e.child, e.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Ki(t) === null) {
            e.child = u;
            break;
          }
          t = u.sibling, u.sibling = n, n = u, u = t;
        }
        Or(
          e,
          !0,
          n,
          null,
          c,
          a
        );
        break;
      case "together":
        Or(
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
        if (za(
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
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && qi(t)));
  }
  function X0(t, e, n) {
    switch (e.tag) {
      case 3:
        Zt(e, e.stateNode.containerInfo), yn(e, zt, t.memoizedState.cache), kn();
        break;
      case 27:
      case 5:
        ul(e);
        break;
      case 4:
        Zt(e, e.stateNode.containerInfo);
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
          return e.flags |= 128, er(e), null;
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
        var u = (t.flags & 128) !== 0;
        if (a = (n & e.childLanes) !== 0, a || (za(
          t,
          e,
          n,
          !1
        ), a = (n & e.childLanes) !== 0), u) {
          if (a)
            return Zd(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (u = e.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), G(Ot, Ot.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, Ld(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        yn(e, zt, t.memoizedState.cache);
    }
    return Ie(t, e, n);
  }
  function $d(t, e, n) {
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
      Nt = !1, st && (e.flags & 1048576) !== 0 && Rf(e, El, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Pn(e.elementType), e.type = t, typeof t == "function")
            Hs(t) ? (a = aa(t, a), e.tag = 1, e = Gd(
              null,
              e,
              t,
              a,
              n
            )) : (e.tag = 0, e = Ar(
              null,
              e,
              t,
              a,
              n
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === rt) {
                e.tag = 11, e = Ud(
                  null,
                  e,
                  t,
                  a,
                  n
                );
                break t;
              } else if (u === J) {
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
        return Ar(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return a = e.type, u = aa(
          a,
          e.pendingProps
        ), Gd(
          t,
          e,
          a,
          u,
          n
        );
      case 3:
        t: {
          if (Zt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          a = e.pendingProps;
          var c = e.memoizedState;
          u = c.element, Is(t, e), Ol(e, a, null, n);
          var o = e.memoizedState;
          if (a = o.cache, yn(e, zt, a), a !== c.cache && Vs(
            e,
            [zt],
            n,
            !0
          ), Ml(), a = o.element, c.isDehydrated)
            if (c = {
              element: a,
              isDehydrated: !1,
              cache: o.cache
            }, e.updateQueue.baseState = c, e.memoizedState = c, e.flags & 256) {
              e = Yd(
                t,
                e,
                a,
                n
              );
              break t;
            } else if (a !== u) {
              u = Se(
                Error(r(424)),
                e
              ), Tl(u), e = Yd(
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
              for (Tt = Ae(t.firstChild), qt = e, st = !0, hn = null, Ee = !0, n = Lf(
                e,
                null,
                a,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (kn(), a === u) {
              e = Ie(
                t,
                e,
                n
              );
              break t;
            }
            Gt(t, e, a, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return lu(t, e), t === null ? (n = am(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : st || (n = e.type, t = e.pendingProps, a = Eu(
          nt.current
        ).createElement(n), a[jt] = e, a[kt] = t, Yt(a, n, t), Bt(a), e.stateNode = a) : e.memoizedState = am(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ul(e), t === null && st && (a = e.stateNode = tm(
          e.type,
          e.pendingProps,
          nt.current
        ), qt = e, Ee = !0, u = Tt, Mn(e.type) ? (cc = u, Tt = Ae(a.firstChild)) : Tt = u), Gt(
          t,
          e,
          e.pendingProps.children,
          n
        ), lu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && st && ((u = a = Tt) && (a = vp(
          a,
          e.type,
          e.pendingProps,
          Ee
        ), a !== null ? (e.stateNode = a, qt = e, Tt = Ae(a.firstChild), Ee = !1, u = !0) : u = !1), u || mn(e)), ul(e), u = e.type, c = e.pendingProps, o = t !== null ? t.memoizedProps : null, a = c.children, lc(u, c) ? a = null : o !== null && lc(u, o) && (e.flags |= 32), e.memoizedState !== null && (u = ar(
          t,
          e,
          U0,
          null,
          null,
          n
        ), kl._currentValue = u), lu(t, e), Gt(t, e, a, n), e.child;
      case 6:
        return t === null && st && ((t = n = Tt) && (n = bp(
          n,
          e.pendingProps,
          Ee
        ), n !== null ? (e.stateNode = n, qt = e, Tt = null, t = !0) : t = !1), t || mn(e)), null;
      case 13:
        return Xd(t, e, n);
      case 4:
        return Zt(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = ea(
          e,
          null,
          a,
          n
        ) : Gt(t, e, a, n), e.child;
      case 11:
        return Ud(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return Gt(
          t,
          e,
          e.pendingProps,
          n
        ), e.child;
      case 8:
        return Gt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return Gt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return a = e.pendingProps, yn(e, e.type, a.value), Gt(t, e, a.children, n), e.child;
      case 9:
        return u = e.type._context, a = e.pendingProps.children, Fn(e), u = Qt(u), a = a(u), e.flags |= 1, Gt(t, e, a, n), e.child;
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
        return Zd(t, e, n);
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
        return Fn(e), a = Qt(zt), t === null ? (u = Ks(), u === null && (u = bt, c = Zs(), u.pooledCache = c, c.refCount++, c !== null && (u.pooledCacheLanes |= n), u = c), e.memoizedState = { parent: a, cache: u }, ks(e), yn(e, zt, u)) : ((t.lanes & n) !== 0 && (Is(t, e), Ol(e, null, null, n), Ml()), u = t.memoizedState, c = e.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, e.memoizedState = u, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u), yn(e, zt, a)) : (a = c.cache, yn(e, zt, a), a !== u.cache && Vs(
          e,
          [zt],
          n,
          !0
        ))), Gt(
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
  function zr(t, e, n, a, u) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (vh()) t.flags |= 8192;
        else
          throw ta = Xi, Js;
    } else t.flags &= -16777217;
  }
  function Kd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !rm(e))
      if (vh()) t.flags |= 8192;
      else
        throw ta = Xi, Js;
  }
  function uu(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? _o() : 536870912, t.lanes |= e, Xa |= e);
  }
  function Hl(t, e) {
    if (!st)
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
  function At(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, a = 0;
    if (e)
      for (var u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= a, t.childLanes = n, e;
  }
  function V0(t, e, n) {
    var a = e.pendingProps;
    switch (qs(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return At(e), null;
      case 1:
        return At(e), null;
      case 3:
        return n = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Ke(zt), Mt(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Da(e) ? Fe(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Gs())), At(e), null;
      case 26:
        var u = e.type, c = e.memoizedState;
        return t === null ? (Fe(e), c !== null ? (At(e), Kd(e, c)) : (At(e), zr(
          e,
          u,
          null,
          a,
          n
        ))) : c ? c !== t.memoizedState ? (Fe(e), At(e), Kd(e, c)) : (At(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Fe(e), At(e), zr(
          e,
          u,
          t,
          a,
          n
        )), null;
      case 27:
        if (pi(e), n = nt.current, u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Fe(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(r(166));
            return At(e), null;
          }
          t = X.current, Da(e) ? wf(e) : (t = tm(u, a, n), e.stateNode = t, Fe(e));
        }
        return At(e), null;
      case 5:
        if (pi(e), u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Fe(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(r(166));
            return At(e), null;
          }
          if (c = X.current, Da(e))
            wf(e);
          else {
            var o = Eu(
              nt.current
            );
            switch (c) {
              case 1:
                c = o.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                c = o.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    c = o.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    c = o.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    c = o.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof a.is == "string" ? o.createElement("select", {
                      is: a.is
                    }) : o.createElement("select"), a.multiple ? c.multiple = !0 : a.size && (c.size = a.size);
                    break;
                  default:
                    c = typeof a.is == "string" ? o.createElement(u, { is: a.is }) : o.createElement(u);
                }
            }
            c[jt] = e, c[kt] = a;
            t: for (o = e.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6)
                c.appendChild(o.stateNode);
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                o.child.return = o, o = o.child;
                continue;
              }
              if (o === e) break t;
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === e)
                  break t;
                o = o.return;
              }
              o.sibling.return = o.return, o = o.sibling;
            }
            e.stateNode = c;
            t: switch (Yt(c, u, a), u) {
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
        return At(e), zr(
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
            if (t = e.stateNode, n = e.memoizedProps, a = null, u = qt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[jt] = e, t = !!(t.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || Xh(t.nodeValue, n)), t || mn(e, !0);
          } else
            t = Eu(t).createTextNode(
              a
            ), t[jt] = e, e.stateNode = t;
        }
        return At(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Da(e), n !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[jt] = e;
            } else
              kn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            At(e), t = !1;
          } else
            n = Gs(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (ce(e), e) : (ce(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return At(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Da(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(r(318));
              if (u = e.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[jt] = e;
            } else
              kn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            At(e), u = !1;
          } else
            u = Gs(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return e.flags & 256 ? (ce(e), e) : (ce(e), null);
        }
        return ce(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = a !== null, t = t !== null && t.memoizedState !== null, n && (a = e.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), c = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (c = a.memoizedState.cachePool.pool), c !== u && (a.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), uu(e, e.updateQueue), At(e), null);
      case 4:
        return Mt(), t === null && Pr(e.stateNode.containerInfo), At(e), null;
      case 10:
        return Ke(e.type), At(e), null;
      case 19:
        if (B(Ot), a = e.memoizedState, a === null) return At(e), null;
        if (u = (e.flags & 128) !== 0, c = a.rendering, c === null)
          if (u) Hl(a, !1);
          else {
            if (Ct !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (c = Ki(t), c !== null) {
                  for (e.flags |= 128, Hl(a, !1), t = c.updateQueue, e.updateQueue = t, uu(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    Ef(n, t), n = n.sibling;
                  return G(
                    Ot,
                    Ot.current & 1 | 2
                  ), st && Ze(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && ae() > fu && (e.flags |= 128, u = !0, Hl(a, !1), e.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Ki(c), t !== null) {
              if (e.flags |= 128, u = !0, t = t.updateQueue, e.updateQueue = t, uu(e, t), Hl(a, !0), a.tail === null && a.tailMode === "hidden" && !c.alternate && !st)
                return At(e), null;
            } else
              2 * ae() - a.renderingStartTime > fu && n !== 536870912 && (e.flags |= 128, u = !0, Hl(a, !1), e.lanes = 4194304);
          a.isBackwards ? (c.sibling = e.child, e.child = c) : (t = a.last, t !== null ? t.sibling = c : e.child = c, a.last = c);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = ae(), t.sibling = null, n = Ot.current, G(
          Ot,
          u ? n & 1 | 2 : n & 1
        ), st && Ze(e, a.treeForkCount), t) : (At(e), null);
      case 22:
      case 23:
        return ce(e), tr(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (At(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : At(e), n = e.updateQueue, n !== null && uu(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== n && (e.flags |= 2048), t !== null && B(Wn), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), Ke(zt), At(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function Z0(t, e) {
    switch (qs(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Ke(zt), Mt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return pi(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (ce(e), e.alternate === null)
            throw Error(r(340));
          kn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (ce(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          kn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return B(Ot), null;
      case 4:
        return Mt(), null;
      case 10:
        return Ke(e.type), null;
      case 22:
      case 23:
        return ce(e), tr(), t !== null && B(Wn), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Ke(zt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jd(t, e) {
    switch (qs(e), e.tag) {
      case 3:
        Ke(zt), Mt();
        break;
      case 26:
      case 27:
      case 5:
        pi(e);
        break;
      case 4:
        Mt();
        break;
      case 31:
        e.memoizedState !== null && ce(e);
        break;
      case 13:
        ce(e);
        break;
      case 19:
        B(Ot);
        break;
      case 10:
        Ke(e.type);
        break;
      case 22:
      case 23:
        ce(e), tr(), t !== null && B(Wn);
        break;
      case 24:
        Ke(zt);
    }
  }
  function Bl(t, e) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            a = void 0;
            var c = n.create, o = n.inst;
            a = c(), o.destroy = a;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (m) {
      mt(e, e.return, m);
    }
  }
  function En(t, e, n) {
    try {
      var a = e.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        a = c;
        do {
          if ((a.tag & t) === t) {
            var o = a.inst, m = o.destroy;
            if (m !== void 0) {
              o.destroy = void 0, u = e;
              var S = n, w = m;
              try {
                w();
              } catch (z) {
                mt(
                  u,
                  S,
                  z
                );
              }
            }
          }
          a = a.next;
        } while (a !== c);
      }
    } catch (z) {
      mt(e, e.return, z);
    }
  }
  function kd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        qf(e, n);
      } catch (a) {
        mt(t, t.return, a);
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
      mt(t, e, a);
    }
  }
  function Ll(t, e) {
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
    } catch (u) {
      mt(t, e, u);
    }
  }
  function Be(t, e) {
    var n = t.ref, a = t.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          mt(t, e, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          mt(t, e, u);
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
    } catch (u) {
      mt(t, t.return, u);
    }
  }
  function xr(t, e, n) {
    try {
      var a = t.stateNode;
      hp(a, t.type, n, e), a[kt] = e;
    } catch (u) {
      mt(t, t.return, u);
    }
  }
  function Wd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Mn(t.type) || t.tag === 4;
  }
  function Nr(t) {
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
  function Ur(t, e, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(t, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(t), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Ye));
    else if (a !== 4 && (a === 27 && Mn(t.type) && (n = t.stateNode, e = null), t = t.child, t !== null))
      for (Ur(t, e, n), t = t.sibling; t !== null; )
        Ur(t, e, n), t = t.sibling;
  }
  function su(t, e, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
    else if (a !== 4 && (a === 27 && Mn(t.type) && (n = t.stateNode), t = t.child, t !== null))
      for (su(t, e, n), t = t.sibling; t !== null; )
        su(t, e, n), t = t.sibling;
  }
  function Pd(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var a = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      Yt(e, a, n), e[jt] = t, e[kt] = n;
    } catch (c) {
      mt(t, t.return, c);
    }
  }
  var We = !1, Ut = !1, Hr = !1, th = typeof WeakSet == "function" ? WeakSet : Set, Lt = null;
  function $0(t, e) {
    if (t = t.containerInfo, nc = Mu, t = df(t), Ms(t)) {
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
            var u = a.anchorOffset, c = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, c.nodeType;
            } catch {
              n = null;
              break t;
            }
            var o = 0, m = -1, S = -1, w = 0, z = 0, H = t, M = null;
            e: for (; ; ) {
              for (var D; H !== n || u !== 0 && H.nodeType !== 3 || (m = o + u), H !== c || a !== 0 && H.nodeType !== 3 || (S = o + a), H.nodeType === 3 && (o += H.nodeValue.length), (D = H.firstChild) !== null; )
                M = H, H = D;
              for (; ; ) {
                if (H === t) break e;
                if (M === n && ++w === u && (m = o), M === c && ++z === a && (S = o), (D = H.nextSibling) !== null) break;
                H = M, M = H.parentNode;
              }
              H = D;
            }
            n = m === -1 || S === -1 ? null : { start: m, end: S };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ac = { focusedElem: t, selectionRange: n }, Mu = !1, Lt = e; Lt !== null; )
      if (e = Lt, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, Lt = t;
      else
        for (; Lt !== null; ) {
          switch (e = Lt, c = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (n = 0; n < t.length; n++)
                  u = t[n], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && c !== null) {
                t = void 0, n = e, u = c.memoizedProps, c = c.memoizedState, a = n.stateNode;
                try {
                  var Y = aa(
                    n.type,
                    u
                  );
                  t = a.getSnapshotBeforeUpdate(
                    Y,
                    c
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch ($) {
                  mt(
                    n,
                    n.return,
                    $
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
            t.return = e.return, Lt = t;
            break;
          }
          Lt = e.return;
        }
  }
  function eh(t, e, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        tn(t, n), a & 4 && Bl(5, n);
        break;
      case 1:
        if (tn(t, n), a & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (o) {
              mt(n, n.return, o);
            }
          else {
            var u = aa(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (o) {
              mt(
                n,
                n.return,
                o
              );
            }
          }
        a & 64 && kd(n), a & 512 && Ll(n, n.return);
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
          } catch (o) {
            mt(n, n.return, o);
          }
        }
        break;
      case 27:
        e === null && a & 4 && Pd(n);
      case 26:
      case 5:
        tn(t, n), e === null && a & 4 && Fd(n), a & 512 && Ll(n, n.return);
        break;
      case 12:
        tn(t, n);
        break;
      case 31:
        tn(t, n), a & 4 && lh(t, n);
        break;
      case 13:
        tn(t, n), a & 4 && ih(t, n), a & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = ep.bind(
          null,
          n
        ), Ep(t, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || We, !a) {
          e = e !== null && e.memoizedState !== null || Ut, u = We;
          var c = Ut;
          We = a, (Ut = e) && !c ? en(
            t,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : tn(t, n), We = u, Ut = c;
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
    e !== null && (t.alternate = null, nh(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && fs(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var _t = null, Ft = !1;
  function Pe(t, e, n) {
    for (n = n.child; n !== null; )
      ah(t, e, n), n = n.sibling;
  }
  function ah(t, e, n) {
    if (le && typeof le.onCommitFiberUnmount == "function")
      try {
        le.onCommitFiberUnmount(sl, n);
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
        var a = _t, u = Ft;
        Mn(n.type) && (_t = n.stateNode, Ft = !1), Pe(
          t,
          e,
          n
        ), $l(n.stateNode), _t = a, Ft = u;
        break;
      case 5:
        Ut || Be(n, e);
      case 6:
        if (a = _t, u = Ft, _t = null, Pe(
          t,
          e,
          n
        ), _t = a, Ft = u, _t !== null)
          if (Ft)
            try {
              (_t.nodeType === 9 ? _t.body : _t.nodeName === "HTML" ? _t.ownerDocument.body : _t).removeChild(n.stateNode);
            } catch (c) {
              mt(
                n,
                e,
                c
              );
            }
          else
            try {
              _t.removeChild(n.stateNode);
            } catch (c) {
              mt(
                n,
                e,
                c
              );
            }
        break;
      case 18:
        _t !== null && (Ft ? (t = _t, kh(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), Fa(t)) : kh(_t, n.stateNode));
        break;
      case 4:
        a = _t, u = Ft, _t = n.stateNode.containerInfo, Ft = !0, Pe(
          t,
          e,
          n
        ), _t = a, Ft = u;
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
  function lh(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Fa(t);
      } catch (n) {
        mt(e, e.return, n);
      }
    }
  }
  function ih(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Fa(t);
      } catch (n) {
        mt(e, e.return, n);
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
  function ru(t, e) {
    var n = K0(t);
    e.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var u = np.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function Wt(t, e) {
    var n = e.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var u = n[a], c = t, o = e, m = o;
        t: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (Mn(m.type)) {
                _t = m.stateNode, Ft = !1;
                break t;
              }
              break;
            case 5:
              _t = m.stateNode, Ft = !1;
              break t;
            case 3:
            case 4:
              _t = m.stateNode.containerInfo, Ft = !0;
              break t;
          }
          m = m.return;
        }
        if (_t === null) throw Error(r(160));
        ah(c, o, u), _t = null, Ft = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        uh(e, t), e = e.sibling;
  }
  var Me = null;
  function uh(t, e) {
    var n = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Wt(e, t), Pt(t), a & 4 && (En(3, t, t.return), Bl(3, t), En(5, t, t.return));
        break;
      case 1:
        Wt(e, t), Pt(t), a & 512 && (Ut || n === null || Be(n, n.return)), a & 64 && We && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? a : n.concat(a))));
        break;
      case 26:
        var u = Me;
        if (Wt(e, t), Pt(t), a & 512 && (Ut || n === null || Be(n, n.return)), a & 4) {
          var c = n !== null ? n.memoizedState : null;
          if (a = t.memoizedState, n === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, n = t.memoizedProps, u = u.ownerDocument || u;
                  e: switch (a) {
                    case "title":
                      c = u.getElementsByTagName("title")[0], (!c || c[ol] || c[jt] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = u.createElement(a), u.head.insertBefore(
                        c,
                        u.querySelector("head > title")
                      )), Yt(c, a, n), c[jt] = t, Bt(c), a = c;
                      break t;
                    case "link":
                      var o = um(
                        "link",
                        "href",
                        u
                      ).get(a + (n.href || ""));
                      if (o) {
                        for (var m = 0; m < o.length; m++)
                          if (c = o[m], c.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && c.getAttribute("rel") === (n.rel == null ? null : n.rel) && c.getAttribute("title") === (n.title == null ? null : n.title) && c.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            o.splice(m, 1);
                            break e;
                          }
                      }
                      c = u.createElement(a), Yt(c, a, n), u.head.appendChild(c);
                      break;
                    case "meta":
                      if (o = um(
                        "meta",
                        "content",
                        u
                      ).get(a + (n.content || ""))) {
                        for (m = 0; m < o.length; m++)
                          if (c = o[m], c.getAttribute("content") === (n.content == null ? null : "" + n.content) && c.getAttribute("name") === (n.name == null ? null : n.name) && c.getAttribute("property") === (n.property == null ? null : n.property) && c.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && c.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            o.splice(m, 1);
                            break e;
                          }
                      }
                      c = u.createElement(a), Yt(c, a, n), u.head.appendChild(c);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  c[jt] = t, Bt(c), a = c;
                }
                t.stateNode = a;
              } else
                sm(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = im(
                u,
                a,
                t.memoizedProps
              );
          else
            c !== a ? (c === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : c.count--, a === null ? sm(
              u,
              t.type,
              t.stateNode
            ) : im(
              u,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && xr(
              t,
              t.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        Wt(e, t), Pt(t), a & 512 && (Ut || n === null || Be(n, n.return)), n !== null && a & 4 && xr(
          t,
          t.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (Wt(e, t), Pt(t), a & 512 && (Ut || n === null || Be(n, n.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            ba(u, "");
          } catch (Y) {
            mt(t, t.return, Y);
          }
        }
        a & 4 && t.stateNode != null && (u = t.memoizedProps, xr(
          t,
          u,
          n !== null ? n.memoizedProps : u
        )), a & 1024 && (Hr = !0);
        break;
      case 6:
        if (Wt(e, t), Pt(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          a = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = a;
          } catch (Y) {
            mt(t, t.return, Y);
          }
        }
        break;
      case 3:
        if (Ru = null, u = Me, Me = Tu(e.containerInfo), Wt(e, t), Me = u, Pt(t), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Fa(e.containerInfo);
          } catch (Y) {
            mt(t, t.return, Y);
          }
        Hr && (Hr = !1, sh(t));
        break;
      case 4:
        a = Me, Me = Tu(
          t.stateNode.containerInfo
        ), Wt(e, t), Pt(t), Me = a;
        break;
      case 12:
        Wt(e, t), Pt(t);
        break;
      case 31:
        Wt(e, t), Pt(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, ru(t, a)));
        break;
      case 13:
        Wt(e, t), Pt(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (ou = ae()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, ru(t, a)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var S = n !== null && n.memoizedState !== null, w = We, z = Ut;
        if (We = w || u, Ut = z || S, Wt(e, t), Ut = z, We = w, Pt(t), a & 8192)
          t: for (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, u && (n === null || S || We || Ut || la(t)), n = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                S = n = e;
                try {
                  if (c = S.stateNode, u)
                    o = c.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                  else {
                    m = S.stateNode;
                    var H = S.memoizedProps.style, M = H != null && H.hasOwnProperty("display") ? H.display : null;
                    m.style.display = M == null || typeof M == "boolean" ? "" : ("" + M).trim();
                  }
                } catch (Y) {
                  mt(S, S.return, Y);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                S = e;
                try {
                  S.stateNode.nodeValue = u ? "" : S.memoizedProps;
                } catch (Y) {
                  mt(S, S.return, Y);
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                S = e;
                try {
                  var D = S.stateNode;
                  u ? Ih(D, !0) : Ih(S.stateNode, !1);
                } catch (Y) {
                  mt(S, S.return, Y);
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
        a & 4 && (a = t.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, ru(t, n))));
        break;
      case 19:
        Wt(e, t), Pt(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, ru(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Wt(e, t), Pt(t);
    }
  }
  function Pt(t) {
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
            var u = n.stateNode, c = Nr(t);
            su(t, c, u);
            break;
          case 5:
            var o = n.stateNode;
            n.flags & 32 && (ba(o, ""), n.flags &= -33);
            var m = Nr(t);
            su(t, m, o);
            break;
          case 3:
          case 4:
            var S = n.stateNode.containerInfo, w = Nr(t);
            Ur(
              t,
              w,
              S
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (z) {
        mt(t, t.return, z);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function sh(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        sh(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function tn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        eh(t, e.alternate, e), e = e.sibling;
  }
  function la(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          En(4, e, e.return), la(e);
          break;
        case 1:
          Be(e, e.return);
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && Id(
            e,
            e.return,
            n
          ), la(e);
          break;
        case 27:
          $l(e.stateNode);
        case 26:
        case 5:
          Be(e, e.return), la(e);
          break;
        case 22:
          e.memoizedState === null && la(e);
          break;
        case 30:
          la(e);
          break;
        default:
          la(e);
      }
      t = t.sibling;
    }
  }
  function en(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate, u = t, c = e, o = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          en(
            u,
            c,
            n
          ), Bl(4, c);
          break;
        case 1:
          if (en(
            u,
            c,
            n
          ), a = c, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (w) {
              mt(a, a.return, w);
            }
          if (a = c, u = a.updateQueue, u !== null) {
            var m = a.stateNode;
            try {
              var S = u.shared.hiddenCallbacks;
              if (S !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < S.length; u++)
                  jf(S[u], m);
            } catch (w) {
              mt(a, a.return, w);
            }
          }
          n && o & 64 && kd(c), Ll(c, c.return);
          break;
        case 27:
          Pd(c);
        case 26:
        case 5:
          en(
            u,
            c,
            n
          ), n && a === null && o & 4 && Fd(c), Ll(c, c.return);
          break;
        case 12:
          en(
            u,
            c,
            n
          );
          break;
        case 31:
          en(
            u,
            c,
            n
          ), n && o & 4 && lh(u, c);
          break;
        case 13:
          en(
            u,
            c,
            n
          ), n && o & 4 && ih(u, c);
          break;
        case 22:
          c.memoizedState === null && en(
            u,
            c,
            n
          ), Ll(c, c.return);
          break;
        case 30:
          break;
        default:
          en(
            u,
            c,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Br(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Al(n));
  }
  function Lr(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Al(t));
  }
  function Oe(t, e, n, a) {
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
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Oe(
          t,
          e,
          n,
          a
        ), u & 2048 && Bl(9, e);
        break;
      case 1:
        Oe(
          t,
          e,
          n,
          a
        );
        break;
      case 3:
        Oe(
          t,
          e,
          n,
          a
        ), u & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Al(t)));
        break;
      case 12:
        if (u & 2048) {
          Oe(
            t,
            e,
            n,
            a
          ), t = e.stateNode;
          try {
            var c = e.memoizedProps, o = c.id, m = c.onPostCommit;
            typeof m == "function" && m(
              o,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (S) {
            mt(e, e.return, S);
          }
        } else
          Oe(
            t,
            e,
            n,
            a
          );
        break;
      case 31:
        Oe(
          t,
          e,
          n,
          a
        );
        break;
      case 13:
        Oe(
          t,
          e,
          n,
          a
        );
        break;
      case 23:
        break;
      case 22:
        c = e.stateNode, o = e.alternate, e.memoizedState !== null ? c._visibility & 2 ? Oe(
          t,
          e,
          n,
          a
        ) : jl(t, e) : c._visibility & 2 ? Oe(
          t,
          e,
          n,
          a
        ) : (c._visibility |= 2, Qa(
          t,
          e,
          n,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Br(o, e);
        break;
      case 24:
        Oe(
          t,
          e,
          n,
          a
        ), u & 2048 && Lr(e.alternate, e);
        break;
      default:
        Oe(
          t,
          e,
          n,
          a
        );
    }
  }
  function Qa(t, e, n, a, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var c = t, o = e, m = n, S = a, w = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          Qa(
            c,
            o,
            m,
            S,
            u
          ), Bl(8, o);
          break;
        case 23:
          break;
        case 22:
          var z = o.stateNode;
          o.memoizedState !== null ? z._visibility & 2 ? Qa(
            c,
            o,
            m,
            S,
            u
          ) : jl(
            c,
            o
          ) : (z._visibility |= 2, Qa(
            c,
            o,
            m,
            S,
            u
          )), u && w & 2048 && Br(
            o.alternate,
            o
          );
          break;
        case 24:
          Qa(
            c,
            o,
            m,
            S,
            u
          ), u && w & 2048 && Lr(o.alternate, o);
          break;
        default:
          Qa(
            c,
            o,
            m,
            S,
            u
          );
      }
      e = e.sibling;
    }
  }
  function jl(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, a = e, u = a.flags;
        switch (a.tag) {
          case 22:
            jl(n, a), u & 2048 && Br(
              a.alternate,
              a
            );
            break;
          case 24:
            jl(n, a), u & 2048 && Lr(a.alternate, a);
            break;
          default:
            jl(n, a);
        }
        e = e.sibling;
      }
  }
  var ql = 8192;
  function Ga(t, e, n) {
    if (t.subtreeFlags & ql)
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
        Ga(
          t,
          e,
          n
        ), t.flags & ql && t.memoizedState !== null && Np(
          n,
          Me,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ga(
          t,
          e,
          n
        );
        break;
      case 3:
      case 4:
        var a = Me;
        Me = Tu(t.stateNode.containerInfo), Ga(
          t,
          e,
          n
        ), Me = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = ql, ql = 16777216, Ga(
          t,
          e,
          n
        ), ql = a) : Ga(
          t,
          e,
          n
        ));
        break;
      default:
        Ga(
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
  function Ql(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          Lt = a, dh(
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
        Ql(t), t.flags & 2048 && En(9, t, t.return);
        break;
      case 3:
        Ql(t);
        break;
      case 12:
        Ql(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, cu(t)) : Ql(t);
        break;
      default:
        Ql(t);
    }
  }
  function cu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          Lt = a, dh(
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
          En(8, e, e.return), cu(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, cu(e));
          break;
        default:
          cu(e);
      }
      t = t.sibling;
    }
  }
  function dh(t, e) {
    for (; Lt !== null; ) {
      var n = Lt;
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
          Al(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, Lt = a;
      else
        t: for (n = t; Lt !== null; ) {
          a = Lt;
          var u = a.sibling, c = a.return;
          if (nh(a), a === n) {
            Lt = null;
            break t;
          }
          if (u !== null) {
            u.return = c, Lt = u;
            break t;
          }
          Lt = c;
        }
    }
  }
  var J0 = {
    getCacheForType: function(t) {
      var e = Qt(zt), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return Qt(zt).controller.signal;
    }
  }, k0 = typeof WeakMap == "function" ? WeakMap : Map, ft = 0, bt = null, at = null, it = 0, ht = 0, oe = null, Tn = !1, Ya = !1, jr = !1, nn = 0, Ct = 0, An = 0, ia = 0, qr = 0, fe = 0, Xa = 0, Gl = null, te = null, Qr = !1, ou = 0, hh = 0, fu = 1 / 0, du = null, Rn = null, Ht = 0, _n = null, Va = null, an = 0, Gr = 0, Yr = null, mh = null, Yl = 0, Xr = null;
  function de() {
    return (ft & 2) !== 0 && it !== 0 ? it & -it : N.T !== null ? kr() : Oo();
  }
  function yh() {
    if (fe === 0)
      if ((it & 536870912) === 0 || st) {
        var t = bi;
        bi <<= 1, (bi & 3932160) === 0 && (bi = 262144), fe = t;
      } else fe = 536870912;
    return t = re.current, t !== null && (t.flags |= 32), fe;
  }
  function ee(t, e, n) {
    (t === bt && (ht === 2 || ht === 9) || t.cancelPendingCommit !== null) && (Za(t, 0), wn(
      t,
      it,
      fe,
      !1
    )), cl(t, n), ((ft & 2) === 0 || t !== bt) && (t === bt && ((ft & 2) === 0 && (ia |= n), Ct === 4 && wn(
      t,
      it,
      fe,
      !1
    )), Le(t));
  }
  function gh(t, e, n) {
    if ((ft & 6) !== 0) throw Error(r(327));
    var a = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || rl(t, e), u = a ? W0(t, e) : Zr(t, e, !0), c = a;
    do {
      if (u === 0) {
        Ya && !a && wn(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, c && !I0(n)) {
          u = Zr(t, e, !1), c = !1;
          continue;
        }
        if (u === 2) {
          if (c = e, t.errorRecoveryDisabledLanes & c)
            var o = 0;
          else
            o = t.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
          if (o !== 0) {
            e = o;
            t: {
              var m = t;
              u = Gl;
              var S = m.current.memoizedState.isDehydrated;
              if (S && (Za(m, o).flags |= 256), o = Zr(
                m,
                o,
                !1
              ), o !== 2) {
                if (jr && !S) {
                  m.errorRecoveryDisabledLanes |= c, ia |= c, u = 4;
                  break t;
                }
                c = te, te = u, c !== null && (te === null ? te = c : te.push.apply(
                  te,
                  c
                ));
              }
              u = o;
            }
            if (c = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Za(t, 0), wn(t, e, 0, !0);
          break;
        }
        t: {
          switch (a = t, c = u, c) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              wn(
                a,
                e,
                fe,
                !Tn
              );
              break t;
            case 2:
              te = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (u = ou + 300 - ae(), 10 < u)) {
            if (wn(
              a,
              e,
              fe,
              !Tn
            ), Ti(a, 0, !0) !== 0) break t;
            an = e, a.timeoutHandle = Kh(
              ph.bind(
                null,
                a,
                n,
                te,
                du,
                Qr,
                e,
                fe,
                ia,
                Xa,
                Tn,
                c,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          ph(
            a,
            n,
            te,
            du,
            Qr,
            e,
            fe,
            ia,
            Xa,
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
  function ph(t, e, n, a, u, c, o, m, S, w, z, H, M, D) {
    if (t.timeoutHandle = -1, H = e.subtreeFlags, H & 8192 || (H & 16785408) === 16785408) {
      H = {
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
        H
      );
      var Y = (c & 62914560) === c ? ou - ae() : (c & 4194048) === c ? hh - ae() : 0;
      if (Y = Up(
        H,
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
            u,
            o,
            m,
            S,
            z,
            H,
            null,
            M,
            D
          )
        ), wn(t, c, o, !w);
        return;
      }
    }
    _h(
      t,
      e,
      c,
      n,
      a,
      u,
      o,
      m,
      S
    );
  }
  function I0(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var a = 0; a < n.length; a++) {
          var u = n[a], c = u.getSnapshot;
          u = u.value;
          try {
            if (!ue(c(), u)) return !1;
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
    e &= ~qr, e &= ~ia, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var u = e; 0 < u; ) {
      var c = 31 - ie(u), o = 1 << c;
      a[c] = -1, u &= ~o;
    }
    n !== 0 && wo(t, n, e);
  }
  function hu() {
    return (ft & 6) === 0 ? (Xl(0), !1) : !0;
  }
  function Vr() {
    if (at !== null) {
      if (ht === 0)
        var t = at.return;
      else
        t = at, $e = In = null, ur(t), Ha = null, _l = 0, t = at;
      for (; t !== null; )
        Jd(t.alternate, t), t = t.return;
      at = null;
    }
  }
  function Za(t, e) {
    var n = t.timeoutHandle;
    n !== -1 && (t.timeoutHandle = -1, gp(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), an = 0, Vr(), bt = t, at = n = Ve(t.current, null), it = e, ht = 0, oe = null, Tn = !1, Ya = rl(t, e), jr = !1, Xa = fe = qr = ia = An = Ct = 0, te = Gl = null, Qr = !1, (e & 8) !== 0 && (e |= e & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var u = 31 - ie(a), c = 1 << u;
        e |= t[u], a &= ~c;
      }
    return nn = e, Ui(), n;
  }
  function Sh(t, e) {
    P = null, N.H = Nl, e === Ua || e === Yi ? (e = Uf(), ht = 3) : e === Js ? (e = Uf(), ht = 4) : ht = e === Tr ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, oe = e, at === null && (Ct = 1, nu(
      t,
      Se(e, t.current)
    ));
  }
  function vh() {
    var t = re.current;
    return t === null ? !0 : (it & 4194048) === it ? Te === null : (it & 62914560) === it || (it & 536870912) !== 0 ? t === Te : !1;
  }
  function bh() {
    var t = N.H;
    return N.H = Nl, t === null ? Nl : t;
  }
  function Eh() {
    var t = N.A;
    return N.A = J0, t;
  }
  function mu() {
    Ct = 4, Tn || (it & 4194048) !== it && re.current !== null || (Ya = !0), (An & 134217727) === 0 && (ia & 134217727) === 0 || bt === null || wn(
      bt,
      it,
      fe,
      !1
    );
  }
  function Zr(t, e, n) {
    var a = ft;
    ft |= 2;
    var u = bh(), c = Eh();
    (bt !== t || it !== e) && (du = null, Za(t, e)), e = !1;
    var o = Ct;
    t: do
      try {
        if (ht !== 0 && at !== null) {
          var m = at, S = oe;
          switch (ht) {
            case 8:
              Vr(), o = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              re.current === null && (e = !0);
              var w = ht;
              if (ht = 0, oe = null, $a(t, m, S, w), n && Ya) {
                o = 0;
                break t;
              }
              break;
            default:
              w = ht, ht = 0, oe = null, $a(t, m, S, w);
          }
        }
        F0(), o = Ct;
        break;
      } catch (z) {
        Sh(t, z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, $e = In = null, ft = a, N.H = u, N.A = c, at === null && (bt = null, it = 0, Ui()), o;
  }
  function F0() {
    for (; at !== null; ) Th(at);
  }
  function W0(t, e) {
    var n = ft;
    ft |= 2;
    var a = bh(), u = Eh();
    bt !== t || it !== e ? (du = null, fu = ae() + 500, Za(t, e)) : Ya = rl(
      t,
      e
    );
    t: do
      try {
        if (ht !== 0 && at !== null) {
          e = at;
          var c = oe;
          e: switch (ht) {
            case 1:
              ht = 0, oe = null, $a(t, e, c, 1);
              break;
            case 2:
            case 9:
              if (xf(c)) {
                ht = 0, oe = null, Ah(e);
                break;
              }
              e = function() {
                ht !== 2 && ht !== 9 || bt !== t || (ht = 7), Le(t);
              }, c.then(e, e);
              break t;
            case 3:
              ht = 7;
              break t;
            case 4:
              ht = 5;
              break t;
            case 7:
              xf(c) ? (ht = 0, oe = null, Ah(e)) : (ht = 0, oe = null, $a(t, e, c, 7));
              break;
            case 5:
              var o = null;
              switch (at.tag) {
                case 26:
                  o = at.memoizedState;
                case 5:
                case 27:
                  var m = at;
                  if (o ? rm(o) : m.stateNode.complete) {
                    ht = 0, oe = null;
                    var S = m.sibling;
                    if (S !== null) at = S;
                    else {
                      var w = m.return;
                      w !== null ? (at = w, yu(w)) : at = null;
                    }
                    break e;
                  }
              }
              ht = 0, oe = null, $a(t, e, c, 5);
              break;
            case 6:
              ht = 0, oe = null, $a(t, e, c, 6);
              break;
            case 8:
              Vr(), Ct = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        P0();
        break;
      } catch (z) {
        Sh(t, z);
      }
    while (!0);
    return $e = In = null, N.H = a, N.A = u, ft = n, at !== null ? 0 : (bt = null, it = 0, Ui(), Ct);
  }
  function P0() {
    for (; at !== null && !Tg(); )
      Th(at);
  }
  function Th(t) {
    var e = $d(t.alternate, t, nn);
    t.memoizedProps = t.pendingProps, e === null ? yu(t) : at = e;
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
          it
        );
        break;
      case 11:
        e = Qd(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          it
        );
        break;
      case 5:
        ur(e);
      default:
        Jd(n, e), e = at = Ef(e, nn), e = $d(n, e, nn);
    }
    t.memoizedProps = t.pendingProps, e === null ? yu(t) : at = e;
  }
  function $a(t, e, n, a) {
    $e = In = null, ur(e), Ha = null, _l = 0;
    var u = e.return;
    try {
      if (G0(
        t,
        u,
        e,
        n,
        it
      )) {
        Ct = 1, nu(
          t,
          Se(n, t.current)
        ), at = null;
        return;
      }
    } catch (c) {
      if (u !== null) throw at = u, c;
      Ct = 1, nu(
        t,
        Se(n, t.current)
      ), at = null;
      return;
    }
    e.flags & 32768 ? (st || a === 1 ? t = !0 : Ya || (it & 536870912) !== 0 ? t = !1 : (Tn = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = re.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Rh(e, t)) : yu(e);
  }
  function yu(t) {
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
      var n = Z0(t.alternate, t);
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
  function _h(t, e, n, a, u, c, o, m, S) {
    t.cancelPendingCommit = null;
    do
      gu();
    while (Ht !== 0);
    if ((ft & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (c = e.lanes | e.childLanes, c |= Ns, xg(
        t,
        n,
        c,
        o,
        m,
        S
      ), t === bt && (at = bt = null, it = 0), Va = e, _n = t, an = n, Gr = c, Yr = u, mh = a, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, ap(Si, function() {
        return Dh(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
        a = N.T, N.T = null, u = Q.p, Q.p = 2, o = ft, ft |= 4;
        try {
          $0(t, e, n);
        } finally {
          ft = o, Q.p = u, N.T = a;
        }
      }
      Ht = 1, wh(), Ch(), Mh();
    }
  }
  function wh() {
    if (Ht === 1) {
      Ht = 0;
      var t = _n, e = Va, n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        n = N.T, N.T = null;
        var a = Q.p;
        Q.p = 2;
        var u = ft;
        ft |= 4;
        try {
          uh(e, t);
          var c = ac, o = df(t.containerInfo), m = c.focusedElem, S = c.selectionRange;
          if (o !== m && m && m.ownerDocument && ff(
            m.ownerDocument.documentElement,
            m
          )) {
            if (S !== null && Ms(m)) {
              var w = S.start, z = S.end;
              if (z === void 0 && (z = w), "selectionStart" in m)
                m.selectionStart = w, m.selectionEnd = Math.min(
                  z,
                  m.value.length
                );
              else {
                var H = m.ownerDocument || document, M = H && H.defaultView || window;
                if (M.getSelection) {
                  var D = M.getSelection(), Y = m.textContent.length, $ = Math.min(S.start, Y), St = S.end === void 0 ? $ : Math.min(S.end, Y);
                  !D.extend && $ > St && (o = St, St = $, $ = o);
                  var R = of(
                    m,
                    $
                  ), E = of(
                    m,
                    St
                  );
                  if (R && E && (D.rangeCount !== 1 || D.anchorNode !== R.node || D.anchorOffset !== R.offset || D.focusNode !== E.node || D.focusOffset !== E.offset)) {
                    var _ = H.createRange();
                    _.setStart(R.node, R.offset), D.removeAllRanges(), $ > St ? (D.addRange(_), D.extend(E.node, E.offset)) : (_.setEnd(E.node, E.offset), D.addRange(_));
                  }
                }
              }
            }
            for (H = [], D = m; D = D.parentNode; )
              D.nodeType === 1 && H.push({
                element: D,
                left: D.scrollLeft,
                top: D.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < H.length; m++) {
              var U = H[m];
              U.element.scrollLeft = U.left, U.element.scrollTop = U.top;
            }
          }
          Mu = !!nc, ac = nc = null;
        } finally {
          ft = u, Q.p = a, N.T = n;
        }
      }
      t.current = e, Ht = 2;
    }
  }
  function Ch() {
    if (Ht === 2) {
      Ht = 0;
      var t = _n, e = Va, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = N.T, N.T = null;
        var a = Q.p;
        Q.p = 2;
        var u = ft;
        ft |= 4;
        try {
          eh(t, e.alternate, e);
        } finally {
          ft = u, Q.p = a, N.T = n;
        }
      }
      Ht = 3;
    }
  }
  function Mh() {
    if (Ht === 4 || Ht === 3) {
      Ht = 0, Ag();
      var t = _n, e = Va, n = an, a = mh;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Ht = 5 : (Ht = 0, Va = _n = null, Oh(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (Rn = null), cs(n), e = e.stateNode, le && typeof le.onCommitFiberRoot == "function")
        try {
          le.onCommitFiberRoot(
            sl,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        e = N.T, u = Q.p, Q.p = 2, N.T = null;
        try {
          for (var c = t.onRecoverableError, o = 0; o < a.length; o++) {
            var m = a[o];
            c(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          N.T = e, Q.p = u;
        }
      }
      (an & 3) !== 0 && gu(), Le(t), u = t.pendingLanes, (n & 261930) !== 0 && (u & 42) !== 0 ? t === Xr ? Yl++ : (Yl = 0, Xr = t) : Yl = 0, Xl(0);
    }
  }
  function Oh(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Al(e)));
  }
  function gu() {
    return wh(), Ch(), Mh(), Dh();
  }
  function Dh() {
    if (Ht !== 5) return !1;
    var t = _n, e = Gr;
    Gr = 0;
    var n = cs(an), a = N.T, u = Q.p;
    try {
      Q.p = 32 > n ? 32 : n, N.T = null, n = Yr, Yr = null;
      var c = _n, o = an;
      if (Ht = 0, Va = _n = null, an = 0, (ft & 6) !== 0) throw Error(r(331));
      var m = ft;
      if (ft |= 4, fh(c.current), rh(
        c,
        c.current,
        o,
        n
      ), ft = m, Xl(0, !1), le && typeof le.onPostCommitFiberRoot == "function")
        try {
          le.onPostCommitFiberRoot(sl, c);
        } catch {
        }
      return !0;
    } finally {
      Q.p = u, N.T = a, Oh(t, e);
    }
  }
  function zh(t, e, n) {
    e = Se(n, e), e = Er(t.stateNode, e, 2), t = Sn(t, e, 2), t !== null && (cl(t, 2), Le(t));
  }
  function mt(t, e, n) {
    if (t.tag === 3)
      zh(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          zh(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Rn === null || !Rn.has(a))) {
            t = Se(n, t), n = xd(2), a = Sn(e, n, 2), a !== null && (Nd(
              n,
              a,
              e,
              t
            ), cl(a, 2), Le(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function $r(t, e, n) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new k0();
      var u = /* @__PURE__ */ new Set();
      a.set(e, u);
    } else
      u = a.get(e), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(e, u));
    u.has(n) || (jr = !0, u.add(n), t = tp.bind(null, t, e, n), e.then(t, t));
  }
  function tp(t, e, n) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, bt === t && (it & n) === n && (Ct === 4 || Ct === 3 && (it & 62914560) === it && 300 > ae() - ou ? (ft & 2) === 0 && Za(t, 0) : qr |= n, Xa === it && (Xa = 0)), Le(t);
  }
  function xh(t, e) {
    e === 0 && (e = _o()), t = Kn(t, e), t !== null && (cl(t, e), Le(t));
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
        var a = t.stateNode, u = t.memoizedState;
        u !== null && (n = u.retryLane);
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
    return is(t, e);
  }
  var pu = null, Ka = null, Kr = !1, Su = !1, Jr = !1, Cn = 0;
  function Le(t) {
    t !== Ka && t.next === null && (Ka === null ? pu = Ka = t : Ka = Ka.next = t), Su = !0, Kr || (Kr = !0, ip());
  }
  function Xl(t, e) {
    if (!Jr && Su) {
      Jr = !0;
      do
        for (var n = !1, a = pu; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var o = a.suspendedLanes, m = a.pingedLanes;
              c = (1 << 31 - ie(42 | t) + 1) - 1, c &= u & ~(o & ~m), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, Bh(a, c));
          } else
            c = it, c = Ti(
              a,
              a === bt ? c : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (c & 3) === 0 || rl(a, c) || (n = !0, Bh(a, c));
          a = a.next;
        }
      while (n);
      Jr = !1;
    }
  }
  function lp() {
    Nh();
  }
  function Nh() {
    Su = Kr = !1;
    var t = 0;
    Cn !== 0 && yp() && (t = Cn);
    for (var e = ae(), n = null, a = pu; a !== null; ) {
      var u = a.next, c = Uh(a, e);
      c === 0 ? (a.next = null, n === null ? pu = u : n.next = u, u === null && (Ka = n)) : (n = a, (t !== 0 || (c & 3) !== 0) && (Su = !0)), a = u;
    }
    Ht !== 0 && Ht !== 5 || Xl(t), Cn !== 0 && (Cn = 0);
  }
  function Uh(t, e) {
    for (var n = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, c = t.pendingLanes & -62914561; 0 < c; ) {
      var o = 31 - ie(c), m = 1 << o, S = u[o];
      S === -1 ? ((m & n) === 0 || (m & a) !== 0) && (u[o] = zg(m, e)) : S <= e && (t.expiredLanes |= m), c &= ~m;
    }
    if (e = bt, n = it, n = Ti(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, n === 0 || t === e && (ht === 2 || ht === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && us(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || rl(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (a !== null && us(a), cs(n)) {
        case 2:
        case 8:
          n = Ao;
          break;
        case 32:
          n = Si;
          break;
        case 268435456:
          n = Ro;
          break;
        default:
          n = Si;
      }
      return a = Hh.bind(null, t), n = is(n, a), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return a !== null && a !== null && us(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Hh(t, e) {
    if (Ht !== 0 && Ht !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (gu() && t.callbackNode !== n)
      return null;
    var a = it;
    return a = Ti(
      t,
      t === bt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (gh(t, a, e), Uh(t, ae()), t.callbackNode != null && t.callbackNode === n ? Hh.bind(null, t) : null);
  }
  function Bh(t, e) {
    if (gu()) return null;
    gh(t, e, !0);
  }
  function ip() {
    pp(function() {
      (ft & 6) !== 0 ? is(
        To,
        lp
      ) : Nh();
    });
  }
  function kr() {
    if (Cn === 0) {
      var t = xa;
      t === 0 && (t = vi, vi <<= 1, (vi & 261888) === 0 && (vi = 256)), Cn = t;
    }
    return Cn;
  }
  function Lh(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : wi("" + t);
  }
  function jh(t, e) {
    var n = e.ownerDocument.createElement("input");
    return n.name = e.name, n.value = e.value, t.id && n.setAttribute("form", t.id), e.parentNode.insertBefore(n, e), t = new FormData(t), n.parentNode.removeChild(n), t;
  }
  function up(t, e, n, a, u) {
    if (e === "submit" && n && n.stateNode === u) {
      var c = Lh(
        (u[kt] || null).action
      ), o = a.submitter;
      o && (e = (e = o[kt] || null) ? Lh(e.formAction) : o.getAttribute("formAction"), e !== null && (c = e, o = null));
      var m = new Di(
        "action",
        "action",
        null,
        a,
        u
      );
      t.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Cn !== 0) {
                  var S = o ? jh(u, o) : new FormData(u);
                  yr(
                    n,
                    {
                      pending: !0,
                      data: S,
                      method: u.method,
                      action: c
                    },
                    null,
                    S
                  );
                }
              } else
                typeof c == "function" && (m.preventDefault(), S = o ? jh(u, o) : new FormData(u), yr(
                  n,
                  {
                    pending: !0,
                    data: S,
                    method: u.method,
                    action: c
                  },
                  c,
                  S
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Ir = 0; Ir < xs.length; Ir++) {
    var Fr = xs[Ir], sp = Fr.toLowerCase(), rp = Fr[0].toUpperCase() + Fr.slice(1);
    Ce(
      sp,
      "on" + rp
    );
  }
  Ce(yf, "onAnimationEnd"), Ce(gf, "onAnimationIteration"), Ce(pf, "onAnimationStart"), Ce("dblclick", "onDoubleClick"), Ce("focusin", "onFocus"), Ce("focusout", "onBlur"), Ce(R0, "onTransitionRun"), Ce(_0, "onTransitionStart"), Ce(w0, "onTransitionCancel"), Ce(Sf, "onTransitionEnd"), Sa("onMouseEnter", ["mouseout", "mouseover"]), Sa("onMouseLeave", ["mouseout", "mouseover"]), Sa("onPointerEnter", ["pointerout", "pointerover"]), Sa("onPointerLeave", ["pointerout", "pointerover"]), Xn(
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
  var Vl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cp = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vl)
  );
  function qh(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var a = t[n], u = a.event;
      a = a.listeners;
      t: {
        var c = void 0;
        if (e)
          for (var o = a.length - 1; 0 <= o; o--) {
            var m = a[o], S = m.instance, w = m.currentTarget;
            if (m = m.listener, S !== c && u.isPropagationStopped())
              break t;
            c = m, u.currentTarget = w;
            try {
              c(u);
            } catch (z) {
              Ni(z);
            }
            u.currentTarget = null, c = S;
          }
        else
          for (o = 0; o < a.length; o++) {
            if (m = a[o], S = m.instance, w = m.currentTarget, m = m.listener, S !== c && u.isPropagationStopped())
              break t;
            c = m, u.currentTarget = w;
            try {
              c(u);
            } catch (z) {
              Ni(z);
            }
            u.currentTarget = null, c = S;
          }
      }
    }
  }
  function lt(t, e) {
    var n = e[os];
    n === void 0 && (n = e[os] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    n.has(a) || (Qh(e, t, 2, !1), n.add(a));
  }
  function Wr(t, e, n) {
    var a = 0;
    e && (a |= 4), Qh(
      n,
      t,
      a,
      e
    );
  }
  var vu = "_reactListening" + Math.random().toString(36).slice(2);
  function Pr(t) {
    if (!t[vu]) {
      t[vu] = !0, xo.forEach(function(n) {
        n !== "selectionchange" && (cp.has(n) || Wr(n, !1, t), Wr(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[vu] || (e[vu] = !0, Wr("selectionchange", !1, e));
    }
  }
  function Qh(t, e, n, a) {
    switch (ym(e)) {
      case 2:
        var u = Lp;
        break;
      case 8:
        u = jp;
        break;
      default:
        u = mc;
    }
    n = u.bind(
      null,
      e,
      n,
      t
    ), u = void 0, !vs || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: u
    }) : t.addEventListener(e, n, !0) : u !== void 0 ? t.addEventListener(e, n, {
      passive: u
    }) : t.addEventListener(e, n, !1);
  }
  function tc(t, e, n, a, u) {
    var c = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var o = a.tag;
        if (o === 3 || o === 4) {
          var m = a.stateNode.containerInfo;
          if (m === u) break;
          if (o === 4)
            for (o = a.return; o !== null; ) {
              var S = o.tag;
              if ((S === 3 || S === 4) && o.stateNode.containerInfo === u)
                return;
              o = o.return;
            }
          for (; m !== null; ) {
            if (o = ya(m), o === null) return;
            if (S = o.tag, S === 5 || S === 6 || S === 26 || S === 27) {
              a = c = o;
              continue t;
            }
            m = m.parentNode;
          }
        }
        a = a.return;
      }
    Vo(function() {
      var w = c, z = ps(n), H = [];
      t: {
        var M = vf.get(t);
        if (M !== void 0) {
          var D = Di, Y = t;
          switch (t) {
            case "keypress":
              if (Mi(n) === 0) break t;
            case "keydown":
            case "keyup":
              D = n0;
              break;
            case "focusin":
              Y = "focus", D = As;
              break;
            case "focusout":
              Y = "blur", D = As;
              break;
            case "beforeblur":
            case "afterblur":
              D = As;
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
              D = i0;
              break;
            case yf:
            case gf:
            case pf:
              D = Kg;
              break;
            case Sf:
              D = s0;
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
          var $ = (e & 4) !== 0, St = !$ && (t === "scroll" || t === "scrollend"), R = $ ? M !== null ? M + "Capture" : null : M;
          $ = [];
          for (var E = w, _; E !== null; ) {
            var U = E;
            if (_ = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || _ === null || R === null || (U = dl(E, R), U != null && $.push(
              Zl(E, U, _)
            )), St) break;
            E = E.return;
          }
          0 < $.length && (M = new D(
            M,
            Y,
            null,
            n,
            z
          ), H.push({ event: M, listeners: $ }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (M = t === "mouseover" || t === "pointerover", D = t === "mouseout" || t === "pointerout", M && n !== gs && (Y = n.relatedTarget || n.fromElement) && (ya(Y) || Y[ma]))
            break t;
          if ((D || M) && (M = z.window === z ? z : (M = z.ownerDocument) ? M.defaultView || M.parentWindow : window, D ? (Y = n.relatedTarget || n.toElement, D = w, Y = Y ? ya(Y) : null, Y !== null && (St = d(Y), $ = Y.tag, Y !== St || $ !== 5 && $ !== 27 && $ !== 6) && (Y = null)) : (D = null, Y = w), D !== Y)) {
            if ($ = Ko, U = "onMouseLeave", R = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && ($ = ko, U = "onPointerLeave", R = "onPointerEnter", E = "pointer"), St = D == null ? M : fl(D), _ = Y == null ? M : fl(Y), M = new $(
              U,
              E + "leave",
              D,
              n,
              z
            ), M.target = St, M.relatedTarget = _, U = null, ya(z) === w && ($ = new $(
              R,
              E + "enter",
              Y,
              n,
              z
            ), $.target = _, $.relatedTarget = St, U = $), St = U, D && Y)
              e: {
                for ($ = op, R = D, E = Y, _ = 0, U = R; U; U = $(U))
                  _++;
                U = 0;
                for (var Z = E; Z; Z = $(Z))
                  U++;
                for (; 0 < _ - U; )
                  R = $(R), _--;
                for (; 0 < U - _; )
                  E = $(E), U--;
                for (; _--; ) {
                  if (R === E || E !== null && R === E.alternate) {
                    $ = R;
                    break e;
                  }
                  R = $(R), E = $(E);
                }
                $ = null;
              }
            else $ = null;
            D !== null && Gh(
              H,
              M,
              D,
              $,
              !1
            ), Y !== null && St !== null && Gh(
              H,
              St,
              Y,
              $,
              !0
            );
          }
        }
        t: {
          if (M = w ? fl(w) : window, D = M.nodeName && M.nodeName.toLowerCase(), D === "select" || D === "input" && M.type === "file")
            var ct = af;
          else if (ef(M))
            if (lf)
              ct = E0;
            else {
              ct = v0;
              var V = S0;
            }
          else
            D = M.nodeName, !D || D.toLowerCase() !== "input" || M.type !== "checkbox" && M.type !== "radio" ? w && ys(w.elementType) && (ct = af) : ct = b0;
          if (ct && (ct = ct(t, w))) {
            nf(
              H,
              ct,
              n,
              z
            );
            break t;
          }
          V && V(t, M, w), t === "focusout" && w && M.type === "number" && w.memoizedProps.value != null && ms(M, "number", M.value);
        }
        switch (V = w ? fl(w) : window, t) {
          case "focusin":
            (ef(V) || V.contentEditable === "true") && (Ra = V, Os = w, bl = null);
            break;
          case "focusout":
            bl = Os = Ra = null;
            break;
          case "mousedown":
            Ds = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ds = !1, hf(H, n, z);
            break;
          case "selectionchange":
            if (A0) break;
          case "keydown":
          case "keyup":
            hf(H, n, z);
        }
        var et;
        if (_s)
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
          Aa ? Po(t, n) && (ut = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (ut = "onCompositionStart");
        ut && (Io && n.locale !== "ko" && (Aa || ut !== "onCompositionStart" ? ut === "onCompositionEnd" && Aa && (et = Zo()) : (fn = z, bs = "value" in fn ? fn.value : fn.textContent, Aa = !0)), V = bu(w, ut), 0 < V.length && (ut = new Jo(
          ut,
          t,
          null,
          n,
          z
        ), H.push({ event: ut, listeners: V }), et ? ut.data = et : (et = tf(n), et !== null && (ut.data = et)))), (et = h0 ? m0(t, n) : y0(t, n)) && (ut = bu(w, "onBeforeInput"), 0 < ut.length && (V = new Jo(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          z
        ), H.push({
          event: V,
          listeners: ut
        }), V.data = et)), up(
          H,
          t,
          w,
          n,
          z
        );
      }
      qh(H, e);
    });
  }
  function Zl(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function bu(t, e) {
    for (var n = e + "Capture", a = []; t !== null; ) {
      var u = t, c = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || c === null || (u = dl(t, n), u != null && a.unshift(
        Zl(t, u, c)
      ), u = dl(t, e), u != null && a.push(
        Zl(t, u, c)
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
  function Gh(t, e, n, a, u) {
    for (var c = e._reactName, o = []; n !== null && n !== a; ) {
      var m = n, S = m.alternate, w = m.stateNode;
      if (m = m.tag, S !== null && S === a) break;
      m !== 5 && m !== 26 && m !== 27 || w === null || (S = w, u ? (w = dl(n, c), w != null && o.unshift(
        Zl(n, w, S)
      )) : u || (w = dl(n, c), w != null && o.push(
        Zl(n, w, S)
      ))), n = n.return;
    }
    o.length !== 0 && t.push({ event: e, listeners: o });
  }
  var fp = /\r\n?/g, dp = /\u0000|\uFFFD/g;
  function Yh(t) {
    return (typeof t == "string" ? t : "" + t).replace(fp, `
`).replace(dp, "");
  }
  function Xh(t, e) {
    return e = Yh(e), Yh(t) === e;
  }
  function pt(t, e, n, a, u, c) {
    switch (n) {
      case "children":
        typeof a == "string" ? e === "body" || e === "textarea" && a === "" || ba(t, a) : (typeof a == "number" || typeof a == "bigint") && e !== "body" && ba(t, "" + a);
        break;
      case "className":
        Ri(t, "class", a);
        break;
      case "tabIndex":
        Ri(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ri(t, n, a);
        break;
      case "style":
        Yo(t, a, c);
        break;
      case "data":
        if (e !== "object") {
          Ri(t, "data", a);
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
        a = wi("" + a), t.setAttribute(n, a);
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
          typeof c == "function" && (n === "formAction" ? (e !== "input" && pt(t, e, "name", u.name, u, null), pt(
            t,
            e,
            "formEncType",
            u.formEncType,
            u,
            null
          ), pt(
            t,
            e,
            "formMethod",
            u.formMethod,
            u,
            null
          ), pt(
            t,
            e,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (pt(t, e, "encType", u.encType, u, null), pt(t, e, "method", u.method, u, null), pt(t, e, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(n);
          break;
        }
        a = wi("" + a), t.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (t.onclick = Ye);
        break;
      case "onScroll":
        a != null && lt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && lt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (n = a.__html, n != null) {
            if (u.children != null) throw Error(r(60));
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
        n = wi("" + a), t.setAttributeNS(
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
        lt("beforetoggle", t), lt("toggle", t), Ai(t, "popover", a);
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
        Ai(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Qg.get(n) || n, Ai(t, n, a));
    }
  }
  function ec(t, e, n, a, u, c) {
    switch (n) {
      case "style":
        Yo(t, a, c);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (n = a.__html, n != null) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? ba(t, a) : (typeof a == "number" || typeof a == "bigint") && ba(t, "" + a);
        break;
      case "onScroll":
        a != null && lt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && lt("scrollend", t);
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
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), e = n.slice(2, u ? n.length - 7 : void 0), c = t[kt] || null, c = c != null ? c[n] : null, typeof c == "function" && t.removeEventListener(e, c, u), typeof a == "function")) {
              typeof c != "function" && c !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(e, a, u);
              break t;
            }
            n in t ? t[n] = a : a === !0 ? t.setAttribute(n, "") : Ai(t, n, a);
          }
    }
  }
  function Yt(t, e, n) {
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
        lt("error", t), lt("load", t);
        var a = !1, u = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var o = n[c];
            if (o != null)
              switch (c) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  pt(t, e, c, o, n, null);
              }
          }
        u && pt(t, e, "srcSet", n.srcSet, n, null), a && pt(t, e, "src", n.src, n, null);
        return;
      case "input":
        lt("invalid", t);
        var m = c = o = u = null, S = null, w = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var z = n[a];
            if (z != null)
              switch (a) {
                case "name":
                  u = z;
                  break;
                case "type":
                  o = z;
                  break;
                case "checked":
                  S = z;
                  break;
                case "defaultChecked":
                  w = z;
                  break;
                case "value":
                  c = z;
                  break;
                case "defaultValue":
                  m = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(r(137, e));
                  break;
                default:
                  pt(t, e, a, z, n, null);
              }
          }
        jo(
          t,
          c,
          m,
          S,
          w,
          o,
          u,
          !1
        );
        return;
      case "select":
        lt("invalid", t), a = o = c = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (m = n[u], m != null))
            switch (u) {
              case "value":
                c = m;
                break;
              case "defaultValue":
                o = m;
                break;
              case "multiple":
                a = m;
              default:
                pt(t, e, u, m, n, null);
            }
        e = c, n = o, t.multiple = !!a, e != null ? va(t, !!a, e, !1) : n != null && va(t, !!a, n, !0);
        return;
      case "textarea":
        lt("invalid", t), c = u = a = null;
        for (o in n)
          if (n.hasOwnProperty(o) && (m = n[o], m != null))
            switch (o) {
              case "value":
                a = m;
                break;
              case "defaultValue":
                u = m;
                break;
              case "children":
                c = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(r(91));
                break;
              default:
                pt(t, e, o, m, n, null);
            }
        Qo(t, a, u, c);
        return;
      case "option":
        for (S in n)
          if (n.hasOwnProperty(S) && (a = n[S], a != null))
            switch (S) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                pt(t, e, S, a, n, null);
            }
        return;
      case "dialog":
        lt("beforetoggle", t), lt("toggle", t), lt("cancel", t), lt("close", t);
        break;
      case "iframe":
      case "object":
        lt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Vl.length; a++)
          lt(Vl[a], t);
        break;
      case "image":
        lt("error", t), lt("load", t);
        break;
      case "details":
        lt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        lt("error", t), lt("load", t);
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
        for (w in n)
          if (n.hasOwnProperty(w) && (a = n[w], a != null))
            switch (w) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                pt(t, e, w, a, n, null);
            }
        return;
      default:
        if (ys(e)) {
          for (z in n)
            n.hasOwnProperty(z) && (a = n[z], a !== void 0 && ec(
              t,
              e,
              z,
              a,
              n,
              void 0
            ));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && (a = n[m], a != null && pt(t, e, m, a, n, null));
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
        var u = null, c = null, o = null, m = null, S = null, w = null, z = null;
        for (D in n) {
          var H = n[D];
          if (n.hasOwnProperty(D) && H != null)
            switch (D) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = H;
              default:
                a.hasOwnProperty(D) || pt(t, e, D, null, a, H);
            }
        }
        for (var M in a) {
          var D = a[M];
          if (H = n[M], a.hasOwnProperty(M) && (D != null || H != null))
            switch (M) {
              case "type":
                c = D;
                break;
              case "name":
                u = D;
                break;
              case "checked":
                w = D;
                break;
              case "defaultChecked":
                z = D;
                break;
              case "value":
                o = D;
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
                D !== H && pt(
                  t,
                  e,
                  M,
                  D,
                  a,
                  H
                );
            }
        }
        hs(
          t,
          o,
          m,
          S,
          w,
          z,
          c,
          u
        );
        return;
      case "select":
        D = o = m = M = null;
        for (c in n)
          if (S = n[c], n.hasOwnProperty(c) && S != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                D = S;
              default:
                a.hasOwnProperty(c) || pt(
                  t,
                  e,
                  c,
                  null,
                  a,
                  S
                );
            }
        for (u in a)
          if (c = a[u], S = n[u], a.hasOwnProperty(u) && (c != null || S != null))
            switch (u) {
              case "value":
                M = c;
                break;
              case "defaultValue":
                m = c;
                break;
              case "multiple":
                o = c;
              default:
                c !== S && pt(
                  t,
                  e,
                  u,
                  c,
                  a,
                  S
                );
            }
        e = m, n = o, a = D, M != null ? va(t, !!n, M, !1) : !!a != !!n && (e != null ? va(t, !!n, e, !0) : va(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        D = M = null;
        for (m in n)
          if (u = n[m], n.hasOwnProperty(m) && u != null && !a.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                pt(t, e, m, null, a, u);
            }
        for (o in a)
          if (u = a[o], c = n[o], a.hasOwnProperty(o) && (u != null || c != null))
            switch (o) {
              case "value":
                M = u;
                break;
              case "defaultValue":
                D = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== c && pt(t, e, o, u, a, c);
            }
        qo(t, M, D);
        return;
      case "option":
        for (var Y in n)
          if (M = n[Y], n.hasOwnProperty(Y) && M != null && !a.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                t.selected = !1;
                break;
              default:
                pt(
                  t,
                  e,
                  Y,
                  null,
                  a,
                  M
                );
            }
        for (S in a)
          if (M = a[S], D = n[S], a.hasOwnProperty(S) && M !== D && (M != null || D != null))
            switch (S) {
              case "selected":
                t.selected = M && typeof M != "function" && typeof M != "symbol";
                break;
              default:
                pt(
                  t,
                  e,
                  S,
                  M,
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
        for (var $ in n)
          M = n[$], n.hasOwnProperty($) && M != null && !a.hasOwnProperty($) && pt(t, e, $, null, a, M);
        for (w in a)
          if (M = a[w], D = n[w], a.hasOwnProperty(w) && M !== D && (M != null || D != null))
            switch (w) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null)
                  throw Error(r(137, e));
                break;
              default:
                pt(
                  t,
                  e,
                  w,
                  M,
                  a,
                  D
                );
            }
        return;
      default:
        if (ys(e)) {
          for (var St in n)
            M = n[St], n.hasOwnProperty(St) && M !== void 0 && !a.hasOwnProperty(St) && ec(
              t,
              e,
              St,
              void 0,
              a,
              M
            );
          for (z in a)
            M = a[z], D = n[z], !a.hasOwnProperty(z) || M === D || M === void 0 && D === void 0 || ec(
              t,
              e,
              z,
              M,
              a,
              D
            );
          return;
        }
    }
    for (var R in n)
      M = n[R], n.hasOwnProperty(R) && M != null && !a.hasOwnProperty(R) && pt(t, e, R, null, a, M);
    for (H in a)
      M = a[H], D = n[H], !a.hasOwnProperty(H) || M === D || M == null && D == null || pt(t, e, H, M, a, D);
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
        var u = n[a], c = u.transferSize, o = u.initiatorType, m = u.duration;
        if (c && m && Vh(o)) {
          for (o = 0, m = u.responseEnd, a += 1; a < n.length; a++) {
            var S = n[a], w = S.startTime;
            if (w > m) break;
            var z = S.transferSize, H = S.initiatorType;
            z && Vh(H) && (S = S.responseEnd, o += z * (S < m ? 1 : (m - w) / (S - w)));
          }
          if (--a, e += 8 * (c + o) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var nc = null, ac = null;
  function Eu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Zh(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function $h(t, e) {
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
  var ic = null;
  function yp() {
    var t = window.event;
    return t && t.type === "popstate" ? t === ic ? !1 : (ic = t, !0) : (ic = null, !1);
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
      var u = n.nextSibling;
      if (t.removeChild(n), u && u.nodeType === 8)
        if (n = u.data, n === "/$" || n === "/&") {
          if (a === 0) {
            t.removeChild(u), Fa(e);
            return;
          }
          a--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          a++;
        else if (n === "html")
          $l(t.ownerDocument.documentElement);
        else if (n === "head") {
          n = t.ownerDocument.head, $l(n);
          for (var c = n.firstChild; c; ) {
            var o = c.nextSibling, m = c.nodeName;
            c[ol] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = o;
          }
        } else
          n === "body" && $l(t.ownerDocument.body);
      n = u;
    } while (n);
    Fa(e);
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
          uc(n), fs(n);
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
      var u = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[ol])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (c = t.getAttribute("rel"), c === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (c !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (c = t.getAttribute("src"), (c !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && c && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var c = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === c)
          return t;
      } else return t;
      if (t = Ae(t.nextSibling), t === null) break;
    }
    return null;
  }
  function bp(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Ae(t.nextSibling), t === null)) return null;
    return t;
  }
  function Fh(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ae(t.nextSibling), t === null)) return null;
    return t;
  }
  function sc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function rc(t) {
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
  function Ae(t) {
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
  var cc = null;
  function Wh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return Ae(t.nextSibling);
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
    switch (e = Eu(n), t) {
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
  function $l(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    fs(t);
  }
  var Re = /* @__PURE__ */ new Map(), em = /* @__PURE__ */ new Set();
  function Tu(t) {
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
    M: Dp
  };
  function Tp() {
    var t = ln.f(), e = hu();
    return t || e;
  }
  function Ap(t) {
    var e = ga(t);
    e !== null && e.tag === 5 && e.type === "form" ? Sd(e) : ln.r(t);
  }
  var Ja = typeof document > "u" ? null : document;
  function nm(t, e, n) {
    var a = Ja;
    if (a && typeof e == "string" && e) {
      var u = ge(e);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), em.has(u) || (em.add(u), t = { rel: t, crossOrigin: n, href: e }, a.querySelector(u) === null && (e = a.createElement("link"), Yt(e, "link", t), Bt(e), a.head.appendChild(e)));
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
    var a = Ja;
    if (a && t && e) {
      var u = 'link[rel="preload"][as="' + ge(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + ge(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + ge(
        n.imageSizes
      ) + '"]')) : u += '[href="' + ge(t) + '"]';
      var c = u;
      switch (e) {
        case "style":
          c = ka(t);
          break;
        case "script":
          c = Ia(t);
      }
      Re.has(c) || (t = v(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), Re.set(c, t), a.querySelector(u) !== null || e === "style" && a.querySelector(Kl(c)) || e === "script" && a.querySelector(Jl(c)) || (e = a.createElement("link"), Yt(e, "link", t), Bt(e), a.head.appendChild(e)));
    }
  }
  function Cp(t, e) {
    ln.m(t, e);
    var n = Ja;
    if (n && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", u = 'link[rel="modulepreload"][as="' + ge(a) + '"][href="' + ge(t) + '"]', c = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Ia(t);
      }
      if (!Re.has(c) && (t = v({ rel: "modulepreload", href: t }, e), Re.set(c, t), n.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Jl(c)))
              return;
        }
        a = n.createElement("link"), Yt(a, "link", t), Bt(a), n.head.appendChild(a);
      }
    }
  }
  function Mp(t, e, n) {
    ln.S(t, e, n);
    var a = Ja;
    if (a && t) {
      var u = pa(a).hoistableStyles, c = ka(t);
      e = e || "default";
      var o = u.get(c);
      if (!o) {
        var m = { loading: 0, preload: null };
        if (o = a.querySelector(
          Kl(c)
        ))
          m.loading = 5;
        else {
          t = v(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = Re.get(c)) && oc(t, n);
          var S = o = a.createElement("link");
          Bt(S), Yt(S, "link", t), S._p = new Promise(function(w, z) {
            S.onload = w, S.onerror = z;
          }), S.addEventListener("load", function() {
            m.loading |= 1;
          }), S.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, Au(o, e, a);
        }
        o = {
          type: "stylesheet",
          instance: o,
          count: 1,
          state: m
        }, u.set(c, o);
      }
    }
  }
  function Op(t, e) {
    ln.X(t, e);
    var n = Ja;
    if (n && t) {
      var a = pa(n).hoistableScripts, u = Ia(t), c = a.get(u);
      c || (c = n.querySelector(Jl(u)), c || (t = v({ src: t, async: !0 }, e), (e = Re.get(u)) && fc(t, e), c = n.createElement("script"), Bt(c), Yt(c, "link", t), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(u, c));
    }
  }
  function Dp(t, e) {
    ln.M(t, e);
    var n = Ja;
    if (n && t) {
      var a = pa(n).hoistableScripts, u = Ia(t), c = a.get(u);
      c || (c = n.querySelector(Jl(u)), c || (t = v({ src: t, async: !0, type: "module" }, e), (e = Re.get(u)) && fc(t, e), c = n.createElement("script"), Bt(c), Yt(c, "link", t), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(u, c));
    }
  }
  function am(t, e, n, a) {
    var u = (u = nt.current) ? Tu(u) : null;
    if (!u) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (e = ka(n.href), n = pa(
          u
        ).hoistableStyles, a = n.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = ka(n.href);
          var c = pa(
            u
          ).hoistableStyles, o = c.get(t);
          if (o || (u = u.ownerDocument || u, o = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(t, o), (c = u.querySelector(
            Kl(t)
          )) && !c._p && (o.instance = c, o.state.loading = 5), Re.has(t) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Re.set(t, n), c || zp(
            u,
            t,
            n,
            o.state
          ))), e && a === null)
            throw Error(r(528, ""));
          return o;
        }
        if (e && a !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Ia(n), n = pa(
          u
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
  function ka(t) {
    return 'href="' + ge(t) + '"';
  }
  function Kl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function lm(t) {
    return v({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function zp(t, e, n, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? a.loading = 1 : (e = t.createElement("link"), a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    }), Yt(e, "link", n), Bt(e), t.head.appendChild(e));
  }
  function Ia(t) {
    return '[src="' + ge(t) + '"]';
  }
  function Jl(t) {
    return "script[async]" + t;
  }
  function im(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + ge(n.href) + '"]'
          );
          if (a)
            return e.instance = a, Bt(a), a;
          var u = v({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Bt(a), Yt(a, "style", u), Au(a, n.precedence, t), e.instance = a;
        case "stylesheet":
          u = ka(n.href);
          var c = t.querySelector(
            Kl(u)
          );
          if (c)
            return e.state.loading |= 4, e.instance = c, Bt(c), c;
          a = lm(n), (u = Re.get(u)) && oc(a, u), c = (t.ownerDocument || t).createElement("link"), Bt(c);
          var o = c;
          return o._p = new Promise(function(m, S) {
            o.onload = m, o.onerror = S;
          }), Yt(c, "link", a), e.state.loading |= 4, Au(c, n.precedence, t), e.instance = c;
        case "script":
          return c = Ia(n.src), (u = t.querySelector(
            Jl(c)
          )) ? (e.instance = u, Bt(u), u) : (a = n, (u = Re.get(c)) && (a = v({}, n), fc(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), Bt(u), Yt(u, "link", a), t.head.appendChild(u), e.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, Au(a, n.precedence, t));
    return e.instance;
  }
  function Au(t, e, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, c = u, o = 0; o < a.length; o++) {
      var m = a[o];
      if (m.dataset.precedence === e) c = m;
      else if (c !== u) break;
    }
    c ? c.parentNode.insertBefore(t, c.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function oc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function fc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Ru = null;
  function um(t, e, n) {
    if (Ru === null) {
      var a = /* @__PURE__ */ new Map(), u = Ru = /* @__PURE__ */ new Map();
      u.set(n, a);
    } else
      u = Ru, a = u.get(n), a || (a = /* @__PURE__ */ new Map(), u.set(n, a));
    if (a.has(t)) return a;
    for (a.set(t, null), n = n.getElementsByTagName(t), u = 0; u < n.length; u++) {
      var c = n[u];
      if (!(c[ol] || c[jt] || t === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var o = c.getAttribute(e) || "";
        o = t + o;
        var m = a.get(o);
        m ? m.push(c) : a.set(o, [c]);
      }
    }
    return a;
  }
  function sm(t, e, n) {
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
        var u = ka(a.href), c = e.querySelector(
          Kl(u)
        );
        if (c) {
          e = c._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = _u.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = c, Bt(c);
          return;
        }
        c = e.ownerDocument || e, a = lm(a), (u = Re.get(u)) && oc(a, u), c = c.createElement("link"), Bt(c);
        var o = c;
        o._p = new Promise(function(m, S) {
          o.onload = m, o.onerror = S;
        }), Yt(c, "link", a), n.instance = c;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = _u.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var dc = 0;
  function Up(t, e) {
    return t.stylesheets && t.count === 0 && Cu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (t.stylesheets && Cu(t, t.stylesheets), t.unsuspend) {
          var c = t.unsuspend;
          t.unsuspend = null, c();
        }
      }, 6e4 + e);
      0 < t.imgBytes && dc === 0 && (dc = 62500 * mp());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Cu(t, t.stylesheets), t.unsuspend)) {
            var c = t.unsuspend;
            t.unsuspend = null, c();
          }
        },
        (t.imgBytes > dc ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function _u() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Cu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var wu = null;
  function Cu(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, wu = /* @__PURE__ */ new Map(), e.forEach(Hp, t), wu = null, _u.call(t));
  }
  function Hp(t, e) {
    if (!(e.state.loading & 4)) {
      var n = wu.get(t);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), wu.set(t, n);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < u.length; c++) {
          var o = u[c];
          (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), a = o);
        }
        a && n.set(null, a);
      }
      u = e.instance, o = u.getAttribute("data-precedence"), c = n.get(o) || a, c === a && n.set(null, u), n.set(o, u), this.count++, a = _u.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), c ? c.parentNode.insertBefore(u, c.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), e.state.loading |= 4;
    }
  }
  var kl = {
    $$typeof: F,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0
  };
  function Bp(t, e, n, a, u, c, o, m, S) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ss(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ss(0), this.hiddenUpdates = ss(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = c, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = S, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function cm(t, e, n, a, u, c, o, m, S, w, z, H) {
    return t = new Bp(
      t,
      e,
      n,
      o,
      S,
      w,
      z,
      H,
      m
    ), e = 1, c === !0 && (e |= 24), c = se(3, null, null, e), t.current = c, c.stateNode = t, e = Zs(), e.refCount++, t.pooledCache = e, e.refCount++, c.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: e
    }, ks(c), t;
  }
  function om(t) {
    return t ? (t = Ca, t) : Ca;
  }
  function fm(t, e, n, a, u, c) {
    u = om(u), a.context === null ? a.context = u : a.pendingContext = u, a = pn(e), a.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (a.callback = c), n = Sn(t, a, e), n !== null && (ee(n, t, e), Cl(n, t, e));
  }
  function dm(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function hc(t, e) {
    dm(t, e), (t = t.alternate) && dm(t, e);
  }
  function hm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Kn(t, 67108864);
      e !== null && ee(e, t, 67108864), hc(t, 67108864);
    }
  }
  function mm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = de();
      e = rs(e);
      var n = Kn(t, e);
      n !== null && ee(n, t, e), hc(t, e);
    }
  }
  var Mu = !0;
  function Lp(t, e, n, a) {
    var u = N.T;
    N.T = null;
    var c = Q.p;
    try {
      Q.p = 2, mc(t, e, n, a);
    } finally {
      Q.p = c, N.T = u;
    }
  }
  function jp(t, e, n, a) {
    var u = N.T;
    N.T = null;
    var c = Q.p;
    try {
      Q.p = 8, mc(t, e, n, a);
    } finally {
      Q.p = c, N.T = u;
    }
  }
  function mc(t, e, n, a) {
    if (Mu) {
      var u = yc(a);
      if (u === null)
        tc(
          t,
          e,
          a,
          Ou,
          n
        ), gm(t, a);
      else if (Qp(
        u,
        t,
        e,
        n,
        a
      ))
        a.stopPropagation();
      else if (gm(t, a), e & 4 && -1 < qp.indexOf(t)) {
        for (; u !== null; ) {
          var c = ga(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var o = Yn(c.pendingLanes);
                  if (o !== 0) {
                    var m = c;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; o; ) {
                      var S = 1 << 31 - ie(o);
                      m.entanglements[1] |= S, o &= ~S;
                    }
                    Le(c), (ft & 6) === 0 && (fu = ae() + 500, Xl(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = Kn(c, 2), m !== null && ee(m, c, 2), hu(), hc(c, 2);
            }
          if (c = yc(a), c === null && tc(
            t,
            e,
            a,
            Ou,
            n
          ), c === u) break;
          u = c;
        }
        u !== null && a.stopPropagation();
      } else
        tc(
          t,
          e,
          a,
          null,
          n
        );
    }
  }
  function yc(t) {
    return t = ps(t), gc(t);
  }
  var Ou = null;
  function gc(t) {
    if (Ou = null, t = ya(t), t !== null) {
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
    return Ou = t, null;
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
          case Si:
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
  var pc = !1, On = null, Dn = null, zn = null, Il = /* @__PURE__ */ new Map(), Fl = /* @__PURE__ */ new Map(), xn = [], qp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
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
        Dn = null;
        break;
      case "mouseover":
      case "mouseout":
        zn = null;
        break;
      case "pointerover":
      case "pointerout":
        Il.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fl.delete(e.pointerId);
    }
  }
  function Wl(t, e, n, a, u, c) {
    return t === null || t.nativeEvent !== c ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: a,
      nativeEvent: c,
      targetContainers: [u]
    }, e !== null && (e = ga(e), e !== null && hm(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, u !== null && e.indexOf(u) === -1 && e.push(u), t);
  }
  function Qp(t, e, n, a, u) {
    switch (e) {
      case "focusin":
        return On = Wl(
          On,
          t,
          e,
          n,
          a,
          u
        ), !0;
      case "dragenter":
        return Dn = Wl(
          Dn,
          t,
          e,
          n,
          a,
          u
        ), !0;
      case "mouseover":
        return zn = Wl(
          zn,
          t,
          e,
          n,
          a,
          u
        ), !0;
      case "pointerover":
        var c = u.pointerId;
        return Il.set(
          c,
          Wl(
            Il.get(c) || null,
            t,
            e,
            n,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return c = u.pointerId, Fl.set(
          c,
          Wl(
            Fl.get(c) || null,
            t,
            e,
            n,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function pm(t) {
    var e = ya(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = y(n), e !== null) {
            t.blockedOn = e, Do(t.priority, function() {
              mm(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = p(n), e !== null) {
            t.blockedOn = e, Do(t.priority, function() {
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
  function Du(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = yc(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        gs = a, n.target.dispatchEvent(a), gs = null;
      } else
        return e = ga(n), e !== null && hm(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function Sm(t, e, n) {
    Du(t) && n.delete(e);
  }
  function Gp() {
    pc = !1, On !== null && Du(On) && (On = null), Dn !== null && Du(Dn) && (Dn = null), zn !== null && Du(zn) && (zn = null), Il.forEach(Sm), Fl.forEach(Sm);
  }
  function zu(t, e) {
    t.blockedOn === e && (t.blockedOn = null, pc || (pc = !0, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      Gp
    )));
  }
  var xu = null;
  function vm(t) {
    xu !== t && (xu = t, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      function() {
        xu === t && (xu = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], a = t[e + 1], u = t[e + 2];
          if (typeof a != "function") {
            if (gc(a || n) === null)
              continue;
            break;
          }
          var c = ga(n);
          c !== null && (t.splice(e, 3), e -= 3, yr(
            c,
            {
              pending: !0,
              data: u,
              method: n.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function Fa(t) {
    function e(S) {
      return zu(S, t);
    }
    On !== null && zu(On, t), Dn !== null && zu(Dn, t), zn !== null && zu(zn, t), Il.forEach(e), Fl.forEach(e);
    for (var n = 0; n < xn.length; n++) {
      var a = xn[n];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < xn.length && (n = xn[0], n.blockedOn === null); )
      pm(n), n.blockedOn === null && xn.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var u = n[a], c = n[a + 1], o = u[kt] || null;
        if (typeof c == "function")
          o || vm(n);
        else if (o) {
          var m = null;
          if (c && c.hasAttribute("formAction")) {
            if (u = c, o = c[kt] || null)
              m = o.formAction;
            else if (gc(u) !== null) continue;
          } else m = o.action;
          typeof m == "function" ? n[a + 1] = m : (n.splice(a, 3), a -= 3), vm(n);
        }
      }
  }
  function bm() {
    function t(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(o) {
            return u = o;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      u !== null && (u(), u = null), a || setTimeout(n, 20);
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
      var a = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), u !== null && (u(), u = null);
      };
    }
  }
  function Sc(t) {
    this._internalRoot = t;
  }
  Nu.prototype.render = Sc.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var n = e.current, a = de();
    fm(n, a, t, e, null, null);
  }, Nu.prototype.unmount = Sc.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      fm(t.current, 2, null, t, null, null), hu(), e[ma] = null;
    }
  };
  function Nu(t) {
    this._internalRoot = t;
  }
  Nu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Oo();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < xn.length && e !== 0 && e < xn[n].priority; n++) ;
      xn.splice(n, 0, t), n === 0 && pm(t);
    }
  };
  var Em = i.version;
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
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Uu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Uu.isDisabled && Uu.supportsFiber)
      try {
        sl = Uu.inject(
          Yp
        ), le = Uu;
      } catch {
      }
  }
  return ti.createRoot = function(t, e) {
    if (!f(t)) throw Error(r(299));
    var n = !1, a = "", u = Md, c = Od, o = Dd;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (o = e.onRecoverableError)), e = cm(
      t,
      1,
      !1,
      null,
      null,
      n,
      a,
      null,
      u,
      c,
      o,
      bm
    ), t[ma] = e.current, Pr(t), new Sc(e);
  }, ti.hydrateRoot = function(t, e, n) {
    if (!f(t)) throw Error(r(299));
    var a = !1, u = "", c = Md, o = Od, m = Dd, S = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.formState !== void 0 && (S = n.formState)), e = cm(
      t,
      1,
      !0,
      e,
      n ?? null,
      a,
      u,
      S,
      c,
      o,
      m,
      bm
    ), e.context = om(null), n = e.current, a = de(), a = rs(a), u = pn(a), u.callback = null, Sn(n, u, a), n = a, e.current.lanes = n, cl(e, n), Le(e), t[ma] = e.current, Pr(t), new Nu(e);
  }, ti.version = "19.2.5", ti;
}
var zm;
function tS() {
  if (zm) return bc.exports;
  zm = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return l(), bc.exports = Pp(), bc.exports;
}
var eS = tS(), Hu = Wc();
const nS = (l) => ({
  setHttpHandler(i) {
    l.httpHandler = i;
  },
  httpHandler() {
    return l.httpHandler;
  },
  updateHttpClientConfig(i, s) {
    var r;
    (r = l.httpHandler) == null || r.updateHttpClientConfig(i, s);
  },
  httpHandlerConfigs() {
    return l.httpHandler.httpHandlerConfigs();
  }
}), aS = (l) => ({
  httpHandler: l.httpHandler()
});
var oi;
(function(l) {
  l.HTTP = "http", l.HTTPS = "https";
})(oi || (oi = {}));
var fi;
(function(l) {
  l.MD5 = "md5", l.CRC32 = "crc32", l.CRC32C = "crc32c", l.SHA1 = "sha1", l.SHA256 = "sha256";
})(fi || (fi = {}));
const Xc = "__smithy_context";
class me {
  constructor(i) {
    O(this, "method");
    O(this, "protocol");
    O(this, "hostname");
    O(this, "port");
    O(this, "path");
    O(this, "query");
    O(this, "headers");
    O(this, "username");
    O(this, "password");
    O(this, "fragment");
    O(this, "body");
    this.method = i.method || "GET", this.hostname = i.hostname || "localhost", this.port = i.port, this.query = i.query || {}, this.headers = i.headers || {}, this.body = i.body, this.protocol = i.protocol ? i.protocol.slice(-1) !== ":" ? `${i.protocol}:` : i.protocol : "https:", this.path = i.path ? i.path.charAt(0) !== "/" ? `/${i.path}` : i.path : "/", this.username = i.username, this.password = i.password, this.fragment = i.fragment;
  }
  static clone(i) {
    const s = new me({
      ...i,
      headers: { ...i.headers }
    });
    return s.query && (s.query = lS(s.query)), s;
  }
  static isInstance(i) {
    if (!i)
      return !1;
    const s = i;
    return "method" in s && "protocol" in s && "hostname" in s && "path" in s && typeof s.query == "object" && typeof s.headers == "object";
  }
  clone() {
    return me.clone(this);
  }
}
function lS(l) {
  return Object.keys(l).reduce((i, s) => {
    const r = l[s];
    return {
      ...i,
      [s]: Array.isArray(r) ? [...r] : r
    };
  }, {});
}
class tl {
  constructor(i) {
    O(this, "statusCode");
    O(this, "reason");
    O(this, "headers");
    O(this, "body");
    this.statusCode = i.statusCode, this.reason = i.reason, this.headers = i.headers || {}, this.body = i.body;
  }
  static isInstance(i) {
    if (!i)
      return !1;
    const s = i;
    return typeof s.statusCode == "number" && typeof s.headers == "object";
  }
}
const iS = (l) => (i) => async (s) => {
  if (!me.isInstance(s.request))
    return i(s);
  const { request: r } = s, { handlerProtocol: f = "" } = l.requestHandler.metadata || {};
  if (f.indexOf("h2") >= 0 && !r.headers[":authority"])
    delete r.headers.host, r.headers[":authority"] = r.hostname + (r.port ? ":" + r.port : "");
  else if (!r.headers.host) {
    let d = r.hostname;
    r.port != null && (d += `:${r.port}`), r.headers.host = d;
  }
  return i(s);
}, uS = {
  name: "hostHeaderMiddleware",
  step: "build",
  priority: "low",
  tags: ["HOST"],
  override: !0
}, sS = (l) => ({
  applyToStack: (i) => {
    i.add(iS(l), uS);
  }
}), rS = () => (l, i) => async (s) => {
  var r, f;
  try {
    const d = await l(s), { clientName: y, commandName: p, logger: g, dynamoDbDocumentClientOptions: h = {} } = i, { overrideInputFilterSensitiveLog: b, overrideOutputFilterSensitiveLog: v } = h, A = b ?? i.inputFilterSensitiveLog, C = v ?? i.outputFilterSensitiveLog, { $metadata: x, ...L } = d.output;
    return (r = g == null ? void 0 : g.info) == null || r.call(g, {
      clientName: y,
      commandName: p,
      input: A(s.input),
      output: C(L),
      metadata: x
    }), d;
  } catch (d) {
    const { clientName: y, commandName: p, logger: g, dynamoDbDocumentClientOptions: h = {} } = i, { overrideInputFilterSensitiveLog: b } = h, v = b ?? i.inputFilterSensitiveLog;
    throw (f = g == null ? void 0 : g.error) == null || f.call(g, {
      clientName: y,
      commandName: p,
      input: v(s.input),
      error: d,
      metadata: d.$metadata
    }), d;
  }
}, cS = {
  name: "loggerMiddleware",
  tags: ["LOGGER"],
  step: "initialize",
  override: !0
}, oS = (l) => ({
  applyToStack: (i) => {
    i.add(rS(), cS);
  }
}), fS = {
  step: "build",
  tags: ["RECURSION_DETECTION"],
  name: "recursionDetectionMiddleware",
  override: !0,
  priority: "low"
}, dS = () => (l) => async (i) => l(i), hS = (l) => ({
  applyToStack: (i) => {
    i.add(dS(), fS);
  }
}), al = (l) => l[Xc] || (l[Xc] = {}), sn = (l) => {
  if (typeof l == "function")
    return l;
  const i = Promise.resolve(l);
  return () => i;
}, mS = (l, i) => {
  if (!i || i.length === 0)
    return l;
  const s = [];
  for (const r of i)
    for (const f of l)
      f.schemeId.split("#")[1] === r && s.push(f);
  for (const r of l)
    s.find(({ schemeId: f }) => f === r.schemeId) || s.push(r);
  return s;
};
function yS(l) {
  const i = /* @__PURE__ */ new Map();
  for (const s of l)
    i.set(s.schemeId, s);
  return i;
}
const gS = (l, i) => (s, r) => async (f) => {
  var v;
  const d = l.httpAuthSchemeProvider(await i.httpAuthSchemeParametersProvider(l, r, f.input)), y = l.authSchemePreference ? await l.authSchemePreference() : [], p = mS(d, y), g = yS(l.httpAuthSchemes), h = al(r), b = [];
  for (const A of p) {
    const C = g.get(A.schemeId);
    if (!C) {
      b.push(`HttpAuthScheme \`${A.schemeId}\` was not enabled for this service.`);
      continue;
    }
    const x = C.identityProvider(await i.identityProviderConfigProvider(l));
    if (!x) {
      b.push(`HttpAuthScheme \`${A.schemeId}\` did not have an IdentityProvider configured.`);
      continue;
    }
    const { identityProperties: L = {}, signingProperties: j = {} } = ((v = A.propertiesExtractor) == null ? void 0 : v.call(A, l, r)) || {};
    A.identityProperties = Object.assign(A.identityProperties || {}, L), A.signingProperties = Object.assign(A.signingProperties || {}, j), h.selectedHttpAuthScheme = {
      httpAuthOption: A,
      identity: await x(A.identityProperties),
      signer: C.signer
    };
    break;
  }
  if (!h.selectedHttpAuthScheme)
    throw new Error(b.join(`
`));
  return s(f);
}, pS = {
  step: "serialize",
  tags: ["HTTP_AUTH_SCHEME"],
  name: "httpAuthSchemeMiddleware",
  override: !0,
  relation: "before",
  toMiddleware: "endpointV2Middleware"
}, SS = (l, { httpAuthSchemeParametersProvider: i, identityProviderConfigProvider: s }) => ({
  applyToStack: (r) => {
    r.addRelativeTo(gS(l, {
      httpAuthSchemeParametersProvider: i,
      identityProviderConfigProvider: s
    }), pS);
  }
}), vS = (l) => (i) => {
  throw i;
}, bS = (l, i) => {
}, ES = (l) => (i, s) => async (r) => {
  if (!me.isInstance(r.request))
    return i(r);
  const d = al(s).selectedHttpAuthScheme;
  if (!d)
    throw new Error("No HttpAuthScheme was selected: unable to sign request");
  const { httpAuthOption: { signingProperties: y = {} }, identity: p, signer: g } = d, h = await i({
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
}, AS = (l) => ({
  applyToStack: (i) => {
    i.addRelativeTo(ES(), TS);
  }
}), ui = (l) => {
  if (typeof l == "function")
    return l;
  const i = Promise.resolve(l);
  return () => i;
}, Sy = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", xm = Object.entries(Sy).reduce((l, [i, s]) => (l[s] = Number(i), l), {}), RS = Sy.split(""), Pa = 6, si = 8, _S = 63, ku = (l) => {
  let i = l.length / 4 * 3;
  l.slice(-2) === "==" ? i -= 2 : l.slice(-1) === "=" && i--;
  const s = new ArrayBuffer(i), r = new DataView(s);
  for (let f = 0; f < l.length; f += 4) {
    let d = 0, y = 0;
    for (let h = f, b = f + 3; h <= b; h++)
      if (l[h] !== "=") {
        if (!(l[h] in xm))
          throw new TypeError(`Invalid character ${l[h]} in base64 string.`);
        d |= xm[l[h]] << (b - h) * Pa, y += Pa;
      } else
        d >>= Pa;
    const p = f / 4 * 3;
    d >>= y % si;
    const g = Math.floor(y / si);
    for (let h = 0; h < g; h++) {
      const b = (g - h - 1) * si;
      r.setUint8(p + h, (d & 255 << b) >> b);
    }
  }
  return new Uint8Array(s);
}, el = (l) => new TextEncoder().encode(l), di = (l) => typeof l == "string" ? el(l) : ArrayBuffer.isView(l) ? new Uint8Array(l.buffer, l.byteOffset, l.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(l), Pc = (l) => {
  if (typeof l == "string")
    return l;
  if (typeof l != "object" || typeof l.byteOffset != "number" || typeof l.byteLength != "number")
    throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
  return new TextDecoder("utf-8").decode(l);
};
function Vu(l) {
  let i;
  typeof l == "string" ? i = el(l) : i = l;
  const s = typeof i == "object" && typeof i.length == "number", r = typeof i == "object" && typeof i.byteOffset == "number" && typeof i.byteLength == "number";
  if (!s && !r)
    throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  let f = "";
  for (let d = 0; d < i.length; d += 3) {
    let y = 0, p = 0;
    for (let h = d, b = Math.min(d + 3, i.length); h < b; h++)
      y |= i[h] << (b - h - 1) * si, p += si;
    const g = Math.ceil(p / Pa);
    y <<= g * Pa - p;
    for (let h = 1; h <= g; h++) {
      const b = (g - h) * Pa;
      f += RS[(y & _S << b) >> b];
    }
    f += "==".slice(0, 4 - g);
  }
  return f;
}
class ra extends Uint8Array {
  static fromString(i, s = "utf-8") {
    if (typeof i == "string")
      return s === "base64" ? ra.mutate(ku(i)) : ra.mutate(el(i));
    throw new Error(`Unsupported conversion from ${typeof i} to Uint8ArrayBlobAdapter.`);
  }
  static mutate(i) {
    return Object.setPrototypeOf(i, ra.prototype), i;
  }
  transformToString(i = "utf-8") {
    return i === "base64" ? Vu(this) : Pc(this);
  }
}
const ca = (l) => encodeURIComponent(l).replace(/[!'()*]/g, wS), wS = (l) => `%${l.charCodeAt(0).toString(16).toUpperCase()}`;
function CS(l) {
  const i = [];
  for (let s of Object.keys(l).sort()) {
    const r = l[s];
    if (s = ca(s), Array.isArray(r))
      for (let f = 0, d = r.length; f < d; f++)
        i.push(`${s}=${ca(r[f])}`);
    else {
      let f = s;
      (r || typeof r == "string") && (f += `=${ca(r)}`), i.push(f);
    }
  }
  return i.join("&");
}
function Nm(l, i) {
  return new Request(l, i);
}
function MS(l = 0) {
  return new Promise((i, s) => {
    l && setTimeout(() => {
      const r = new Error(`Request did not complete within ${l} ms`);
      r.name = "TimeoutError", s(r);
    }, l);
  });
}
const _c = {
  supported: void 0
};
class to {
  constructor(i) {
    O(this, "config");
    O(this, "configProvider");
    typeof i == "function" ? this.configProvider = i().then((s) => s || {}) : (this.config = i ?? {}, this.configProvider = Promise.resolve(this.config)), _c.supported === void 0 && (_c.supported = typeof Request < "u" && "keepalive" in Nm("https://[::1]"));
  }
  static create(i) {
    return typeof (i == null ? void 0 : i.handle) == "function" ? i : new to(i);
  }
  destroy() {
  }
  async handle(i, { abortSignal: s, requestTimeout: r } = {}) {
    var I;
    this.config || (this.config = await this.configProvider);
    const f = r ?? this.config.requestTimeout, d = this.config.keepAlive === !0, y = this.config.credentials;
    if (s != null && s.aborted) {
      const F = Um(s);
      return Promise.reject(F);
    }
    let p = i.path;
    const g = CS(i.query || {});
    g && (p += `?${g}`), i.fragment && (p += `#${i.fragment}`);
    let h = "";
    if (i.username != null || i.password != null) {
      const F = i.username ?? "", rt = i.password ?? "";
      h = `${F}:${rt}@`;
    }
    const { port: b, method: v } = i, A = `${i.protocol}//${h}${i.hostname}${b ? `:${b}` : ""}${p}`, C = v === "GET" || v === "HEAD" ? void 0 : i.body, x = {
      body: C,
      headers: new Headers(i.headers),
      method: v,
      credentials: y
    };
    (I = this.config) != null && I.cache && (x.cache = this.config.cache), C && (x.duplex = "half"), typeof AbortController < "u" && (x.signal = s), _c.supported && (x.keepalive = d), typeof this.config.requestInit == "function" && Object.assign(x, this.config.requestInit(i));
    let L = () => {
    };
    const j = Nm(A, x), q = [
      fetch(j).then((F) => {
        const rt = F.headers, Rt = {};
        for (const J of rt.entries())
          Rt[J[0]] = J[1];
        return F.body != null ? {
          response: new tl({
            headers: Rt,
            reason: F.statusText,
            statusCode: F.status,
            body: F.body
          })
        } : F.blob().then((J) => ({
          response: new tl({
            headers: Rt,
            reason: F.statusText,
            statusCode: F.status,
            body: J
          })
        }));
      }),
      MS(f)
    ];
    return s && q.push(new Promise((F, rt) => {
      const Rt = () => {
        const Et = Um(s);
        rt(Et);
      };
      if (typeof s.addEventListener == "function") {
        const Et = s;
        Et.addEventListener("abort", Rt, { once: !0 }), L = () => Et.removeEventListener("abort", Rt);
      } else
        s.onabort = Rt;
    })), Promise.race(q).finally(L);
  }
  updateHttpClientConfig(i, s) {
    this.config = void 0, this.configProvider = this.configProvider.then((r) => (r[i] = s, r));
  }
  httpHandlerConfigs() {
    return this.config ?? {};
  }
}
function Um(l) {
  const i = l && typeof l == "object" && "reason" in l ? l.reason : void 0;
  if (i) {
    if (i instanceof Error) {
      const f = new Error("Request aborted");
      return f.name = "AbortError", f.cause = i, f;
    }
    const r = new Error(String(i));
    return r.name = "AbortError", r;
  }
  const s = new Error("Request aborted");
  return s.name = "AbortError", s;
}
const OS = async (l) => {
  var i;
  return typeof Blob == "function" && l instanceof Blob || ((i = l.constructor) == null ? void 0 : i.name) === "Blob" ? Blob.prototype.arrayBuffer !== void 0 ? new Uint8Array(await l.arrayBuffer()) : DS(l) : zS(l);
};
async function DS(l) {
  const i = await xS(l), s = ku(i);
  return new Uint8Array(s);
}
async function zS(l) {
  const i = [], s = l.getReader();
  let r = !1, f = 0;
  for (; !r; ) {
    const { done: p, value: g } = await s.read();
    g && (i.push(g), f += g.length), r = p;
  }
  const d = new Uint8Array(f);
  let y = 0;
  for (const p of i)
    d.set(p, y), y += p.length;
  return d;
}
function xS(l) {
  return new Promise((i, s) => {
    const r = new FileReader();
    r.onloadend = () => {
      if (r.readyState !== 2)
        return s(new Error("Reader aborted too early"));
      const f = r.result ?? "", d = f.indexOf(","), y = d > -1 ? d + 1 : f.length;
      i(f.substring(y));
    }, r.onabort = () => s(new Error("Read aborted")), r.onerror = () => s(r.error), r.readAsDataURL(l);
  });
}
const vy = {}, Vc = {};
for (let l = 0; l < 256; l++) {
  let i = l.toString(16).toLowerCase();
  i.length === 1 && (i = `0${i}`), vy[l] = i, Vc[i] = l;
}
function NS(l) {
  if (l.length % 2 !== 0)
    throw new Error("Hex encoded strings must have an even number length");
  const i = new Uint8Array(l.length / 2);
  for (let s = 0; s < l.length; s += 2) {
    const r = l.slice(s, s + 2).toLowerCase();
    if (r in Vc)
      i[s / 2] = Vc[r];
    else
      throw new Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`);
  }
  return i;
}
function oa(l) {
  let i = "";
  for (let s = 0; s < l.byteLength; s++)
    i += vy[l[s]];
  return i;
}
const Zc = async (l = new Uint8Array(), i) => {
  if (l instanceof Uint8Array)
    return ra.mutate(l);
  if (!l)
    return ra.mutate(new Uint8Array());
  const s = i.streamCollector(l);
  return ra.mutate(await s);
}, Qu = (l) => typeof l == "function" ? l() : l, by = (l, i, s, r, f) => ({
  name: i,
  namespace: l,
  traits: s,
  input: r,
  output: f
}), US = (l) => (i, s) => async (r) => {
  var v, A, C, x;
  const { response: f } = await i(r), { operationSchema: d } = al(s), [, y, p, g, h, b] = d ?? [];
  try {
    const L = await l.protocol.deserializeResponse(by(y, p, g, h, b), {
      ...l,
      ...s
    }, f);
    return {
      response: f,
      output: L
    };
  } catch (L) {
    if (Object.defineProperty(L, "$response", {
      value: f,
      enumerable: !1,
      writable: !1,
      configurable: !1
    }), !("$metadata" in L)) {
      const j = "Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.";
      try {
        L.message += `
  ` + j;
      } catch {
        !s.logger || ((A = (v = s.logger) == null ? void 0 : v.constructor) == null ? void 0 : A.name) === "NoOpLogger" ? console.warn(j) : (x = (C = s.logger) == null ? void 0 : C.warn) == null || x.call(C, j);
      }
      typeof L.$responseBodyText < "u" && L.$response && (L.$response.body = L.$responseBodyText);
      try {
        if (tl.isInstance(f)) {
          const { headers: q = {} } = f, I = Object.entries(q);
          L.$metadata = {
            httpStatusCode: f.statusCode,
            requestId: wc(/^x-[\w-]+-request-?id$/, I),
            extendedRequestId: wc(/^x-[\w-]+-id-2$/, I),
            cfId: wc(/^x-[\w-]+-cf-id$/, I)
          };
        }
      } catch {
      }
    }
    throw L;
  }
}, wc = (l, i) => (i.find(([s]) => s.match(l)) || [void 0, void 0])[1];
function HS(l) {
  const i = {};
  if (l = l.replace(/^\?/, ""), l)
    for (const s of l.split("&")) {
      let [r, f = null] = s.split("=");
      r = decodeURIComponent(r), f && (f = decodeURIComponent(f)), r in i ? Array.isArray(i[r]) ? i[r].push(f) : i[r] = [i[r], f] : i[r] = f;
    }
  return i;
}
const nl = (l) => {
  if (typeof l == "string")
    return nl(new URL(l));
  const { hostname: i, pathname: s, port: r, protocol: f, search: d } = l;
  let y;
  return d && (y = HS(d)), {
    hostname: i,
    port: r ? parseInt(r) : void 0,
    protocol: f,
    path: s,
    query: y
  };
}, BS = (l) => {
  if (typeof l == "object") {
    if ("url" in l) {
      const i = nl(l.url);
      if (l.headers) {
        i.headers = {};
        for (const s in l.headers)
          i.headers[s.toLowerCase()] = l.headers[s].join(", ");
      }
      return i;
    }
    return l;
  }
  return nl(l);
}, LS = (l) => (i, s) => async (r) => {
  const { operationSchema: f } = al(s), [, d, y, p, g, h] = f ?? [], b = s.endpointV2 ? async () => BS(s.endpointV2) : l.endpoint, v = await l.protocol.serializeRequest(by(d, y, p, g, h), r.input, {
    ...l,
    ...s,
    endpoint: b
  });
  return i({
    ...r,
    request: v
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
function QS(l) {
  return {
    applyToStack: (i) => {
      i.add(LS(l), qS), i.add(US(l), jS), l.protocol.setSerdeContext(l);
    }
  };
}
const Cc = [];
function ii(l) {
  if (typeof l == "object")
    return l;
  if (l = l | 0, Cc[l])
    return Cc[l];
  const i = {};
  let s = 0;
  for (const r of [
    "httpLabel",
    "idempotent",
    "idempotencyToken",
    "sensitive",
    "httpPayload",
    "httpResponseCode",
    "httpQueryParams"
  ])
    (l >> s++ & 1) === 1 && (i[r] = 1);
  return Cc[l] = i;
}
const ei = {
  it: Symbol.for("@smithy/nor-struct-it"),
  ns: Symbol.for("@smithy/ns")
}, Mc = [], Oc = {}, Hn = class Hn {
  constructor(i, s) {
    O(this, "ref");
    O(this, "memberName");
    O(this, "symbol", Hn.symbol);
    O(this, "name");
    O(this, "schema");
    O(this, "_isMemberSchema");
    O(this, "traits");
    O(this, "memberTraits");
    O(this, "normalizedTraits");
    this.ref = i, this.memberName = s;
    const r = [];
    let f = i, d = i;
    for (this._isMemberSchema = !1; Dc(f); )
      r.push(f[1]), f = f[0], d = Qu(f), this._isMemberSchema = !0;
    if (r.length > 0) {
      this.memberTraits = {};
      for (let y = r.length - 1; y >= 0; --y) {
        const p = r[y];
        Object.assign(this.memberTraits, ii(p));
      }
    } else
      this.memberTraits = 0;
    if (d instanceof Hn) {
      const y = this.memberTraits;
      Object.assign(this, d), this.memberTraits = Object.assign({}, y, d.getMemberTraits(), this.getMemberTraits()), this.normalizedTraits = void 0, this.memberName = s ?? d.memberName;
      return;
    }
    if (this.schema = Qu(d), GS(this.schema) ? (this.name = `${this.schema[1]}#${this.schema[2]}`, this.traits = this.schema[3]) : (this.name = this.memberName ?? String(d), this.traits = 0), this._isMemberSchema && !s)
      throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(!0)} missing member name.`);
  }
  static [Symbol.hasInstance](i) {
    const s = this.prototype.isPrototypeOf(i);
    return !s && typeof i == "object" && i !== null ? i.symbol === this.symbol : s;
  }
  static of(i) {
    const s = typeof i == "function" || typeof i == "object" && i !== null;
    if (typeof i == "number") {
      if (Mc[i])
        return Mc[i];
    } else if (typeof i == "string") {
      if (Oc[i])
        return Oc[i];
    } else if (s && i[ei.ns])
      return i[ei.ns];
    const r = Qu(i);
    if (r instanceof Hn)
      return r;
    if (Dc(r)) {
      const [d, y] = r;
      if (d instanceof Hn)
        return Object.assign(d.getMergedTraits(), ii(y)), d;
      throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(i, null, 2)}.`);
    }
    const f = new Hn(r);
    return s ? i[ei.ns] = f : typeof r == "string" ? Oc[r] = f : typeof r == "number" ? Mc[r] = f : f;
  }
  getSchema() {
    const i = this.schema;
    return Array.isArray(i) && i[0] === 0 ? i[4] : i;
  }
  getName(i = !1) {
    const { name: s } = this;
    return !i && s && s.includes("#") ? s.split("#")[1] : s || void 0;
  }
  getMemberName() {
    return this.memberName;
  }
  isMemberSchema() {
    return this._isMemberSchema;
  }
  isListSchema() {
    const i = this.getSchema();
    return typeof i == "number" ? i >= 64 && i < 128 : i[0] === 1;
  }
  isMapSchema() {
    const i = this.getSchema();
    return typeof i == "number" ? i >= 128 && i <= 255 : i[0] === 2;
  }
  isStructSchema() {
    const i = this.getSchema();
    if (typeof i != "object")
      return !1;
    const s = i[0];
    return s === 3 || s === -3 || s === 4;
  }
  isUnionSchema() {
    const i = this.getSchema();
    return typeof i != "object" ? !1 : i[0] === 4;
  }
  isBlobSchema() {
    const i = this.getSchema();
    return i === 21 || i === 42;
  }
  isTimestampSchema() {
    const i = this.getSchema();
    return typeof i == "number" && i >= 4 && i <= 7;
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
    const { streaming: i } = this.getMergedTraits();
    return !!i || this.getSchema() === 42;
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
    return ii(this.memberTraits);
  }
  getOwnTraits() {
    return ii(this.traits);
  }
  getKeySchema() {
    const [i, s] = [this.isDocumentSchema(), this.isMapSchema()];
    if (!i && !s)
      throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(!0)}`);
    const r = this.getSchema(), f = i ? 15 : r[4] ?? 0;
    return ni([f, 0], "key");
  }
  getValueSchema() {
    const i = this.getSchema(), [s, r, f] = [this.isDocumentSchema(), this.isMapSchema(), this.isListSchema()], d = typeof i == "number" ? 63 & i : i && typeof i == "object" && (r || f) ? i[3 + i[0]] : s ? 15 : void 0;
    if (d != null)
      return ni([d, 0], r ? "value" : "member");
    throw new Error(`@smithy/core/schema - ${this.getName(!0)} has no value member.`);
  }
  getMemberSchema(i) {
    const s = this.getSchema();
    if (this.isStructSchema() && s[4].includes(i)) {
      const r = s[4].indexOf(i), f = s[5][r];
      return ni(Dc(f) ? f : [f, 0], i);
    }
    if (this.isDocumentSchema())
      return ni([15, 0], i);
    throw new Error(`@smithy/core/schema - ${this.getName(!0)} has no member=${i}.`);
  }
  getMemberSchemas() {
    const i = {};
    try {
      for (const [s, r] of this.structIterator())
        i[s] = r;
    } catch {
    }
    return i;
  }
  getEventStreamMember() {
    if (this.isStructSchema()) {
      for (const [i, s] of this.structIterator())
        if (s.isStreaming() && s.isStructSchema())
          return i;
    }
    return "";
  }
  *structIterator() {
    if (this.isUnitSchema())
      return;
    if (!this.isStructSchema())
      throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
    const i = this.getSchema(), s = i[4].length;
    let r = i[ei.it];
    if (r && s === r.length) {
      yield* r;
      return;
    }
    r = Array(s);
    for (let f = 0; f < s; ++f) {
      const d = i[4][f], y = ni([i[5][f], 0], d);
      yield r[f] = [d, y];
    }
    i[ei.it] = r;
  }
};
O(Hn, "symbol", Symbol.for("@smithy/nor"));
let ne = Hn;
function ni(l, i) {
  if (l instanceof ne)
    return Object.assign(l, {
      memberName: i,
      _isMemberSchema: !0
    });
  const s = ne;
  return new s(l, i);
}
const Dc = (l) => Array.isArray(l) && l.length === 2, GS = (l) => Array.isArray(l) && l.length >= 5, je = class je {
  constructor(i, s = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map()) {
    O(this, "namespace");
    O(this, "schemas");
    O(this, "exceptions");
    this.namespace = i, this.schemas = s, this.exceptions = r;
  }
  static for(i) {
    return je.registries.has(i) || je.registries.set(i, new je(i)), je.registries.get(i);
  }
  copyFrom(i) {
    const { schemas: s, exceptions: r } = this;
    for (const [f, d] of i.schemas)
      s.has(f) || s.set(f, d);
    for (const [f, d] of i.exceptions)
      r.has(f) || r.set(f, d);
  }
  register(i, s) {
    const r = this.normalizeShapeId(i);
    for (const f of [this, je.for(r.split("#")[0])])
      f.schemas.set(r, s);
  }
  getSchema(i) {
    const s = this.normalizeShapeId(i);
    if (!this.schemas.has(s))
      throw new Error(`@smithy/core/schema - schema not found for ${s}`);
    return this.schemas.get(s);
  }
  registerError(i, s) {
    const r = i, f = r[1];
    for (const d of [this, je.for(f)])
      d.schemas.set(f + "#" + r[2], r), d.exceptions.set(r, s);
  }
  getErrorCtor(i) {
    const s = i;
    return this.exceptions.has(s) ? this.exceptions.get(s) : je.for(s[1]).exceptions.get(s);
  }
  getBaseException() {
    for (const i of this.exceptions.keys())
      if (Array.isArray(i)) {
        const [, s, r] = i, f = s + "#" + r;
        if (f.startsWith("smithy.ts.sdk.synthetic.") && f.endsWith("ServiceException"))
          return i;
      }
  }
  find(i) {
    for (const s of this.schemas.values())
      if (i(s))
        return s;
  }
  clear() {
    this.schemas.clear(), this.exceptions.clear();
  }
  normalizeShapeId(i) {
    return i.includes("#") ? i : this.namespace + "#" + i;
  }
};
O(je, "registries", /* @__PURE__ */ new Map());
let fa = je;
const $c = (l) => {
  if (l != null) {
    if (typeof l == "string") {
      const i = parseFloat(l);
      if (!Number.isNaN(i))
        return String(i) !== String(l) && IS.warn(kS(`Expected number but observed string: ${l}`)), i;
    }
    if (typeof l == "number")
      return l;
    throw new TypeError(`Expected number, got ${typeof l}: ${l}`);
  }
}, YS = Math.ceil(2 ** 127 * (2 - 2 ** -23)), Hm = (l) => {
  const i = $c(l);
  if (i !== void 0 && !Number.isNaN(i) && i !== 1 / 0 && i !== -1 / 0 && Math.abs(i) > YS)
    throw new TypeError(`Expected 32-bit float, got ${l}`);
  return i;
}, XS = (l) => {
  if (l != null) {
    if (Number.isInteger(l) && !Number.isNaN(l))
      return l;
    throw new TypeError(`Expected integer, got ${typeof l}: ${l}`);
  }
}, Bm = (l) => Ey(l, 16), Lm = (l) => Ey(l, 8), Ey = (l, i) => {
  const s = XS(l);
  if (s !== void 0 && VS(s, i) !== s)
    throw new TypeError(`Expected ${i}-bit integer, got ${l}`);
  return s;
}, VS = (l, i) => {
  switch (i) {
    case 32:
      return Int32Array.of(l)[0];
    case 16:
      return Int16Array.of(l)[0];
    case 8:
      return Int8Array.of(l)[0];
  }
}, ZS = (l) => $c(typeof l == "string" ? Iu(l) : l), $S = (l) => Hm(typeof l == "string" ? Iu(l) : l), KS = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g, Iu = (l) => {
  const i = l.match(KS);
  if (i === null || i[0].length !== l.length)
    throw new TypeError("Expected real number, got implicit NaN");
  return parseFloat(l);
}, Zu = (l) => Bm(typeof l == "string" ? Iu(l) : l), JS = (l) => Lm(typeof l == "string" ? Iu(l) : l), kS = (l) => String(new TypeError(l).stack || l).split(`
`).slice(0, 5).filter((i) => !i.includes("stackTraceWarning")).join(`
`), IS = {
  warn: console.warn
}, FS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], eo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function WS(l) {
  const i = l.getUTCFullYear(), s = l.getUTCMonth(), r = l.getUTCDay(), f = l.getUTCDate(), d = l.getUTCHours(), y = l.getUTCMinutes(), p = l.getUTCSeconds(), g = f < 10 ? `0${f}` : `${f}`, h = d < 10 ? `0${d}` : `${d}`, b = y < 10 ? `0${y}` : `${y}`, v = p < 10 ? `0${p}` : `${p}`;
  return `${FS[r]}, ${g} ${eo[s]} ${i} ${h}:${b}:${v} GMT`;
}
const PS = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/), tv = (l) => {
  if (l == null)
    return;
  if (typeof l != "string")
    throw new TypeError("RFC-3339 date-times must be expressed as strings");
  const i = PS.exec(l);
  if (!i)
    throw new TypeError("Invalid RFC-3339 date-time value");
  const [s, r, f, d, y, p, g, h, b] = i, v = Zu(hi(r)), A = jn(f, "month", 1, 12), C = jn(d, "day", 1, 31), x = Gu(v, A, C, { hours: y, minutes: p, seconds: g, fractionalMilliseconds: h });
  return b.toUpperCase() != "Z" && x.setTime(x.getTime() - dv(b)), x;
}, ev = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/), nv = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/), av = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/), Ty = (l) => {
  if (l == null)
    return;
  if (typeof l != "string")
    throw new TypeError("RFC-7231 date-times must be expressed as strings");
  let i = ev.exec(l);
  if (i) {
    const [s, r, f, d, y, p, g, h] = i;
    return Gu(Zu(hi(d)), zc(f), jn(r, "day", 1, 31), { hours: y, minutes: p, seconds: g, fractionalMilliseconds: h });
  }
  if (i = nv.exec(l), i) {
    const [s, r, f, d, y, p, g, h] = i;
    return sv(Gu(iv(d), zc(f), jn(r, "day", 1, 31), {
      hours: y,
      minutes: p,
      seconds: g,
      fractionalMilliseconds: h
    }));
  }
  if (i = av.exec(l), i) {
    const [s, r, f, d, y, p, g, h] = i;
    return Gu(Zu(hi(h)), zc(r), jn(f.trimLeft(), "day", 1, 31), { hours: d, minutes: y, seconds: p, fractionalMilliseconds: g });
  }
  throw new TypeError("Invalid RFC-7231 date-time value");
}, lv = (l) => {
  if (l == null)
    return;
  let i;
  if (typeof l == "number")
    i = l;
  else if (typeof l == "string")
    i = ZS(l);
  else if (typeof l == "object" && l.tag === 1)
    i = l.value;
  else
    throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
  if (Number.isNaN(i) || i === 1 / 0 || i === -1 / 0)
    throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
  return new Date(Math.round(i * 1e3));
}, Gu = (l, i, s, r) => {
  const f = i - 1;
  return cv(l, f, s), new Date(Date.UTC(l, f, s, jn(r.hours, "hour", 0, 23), jn(r.minutes, "minute", 0, 59), jn(r.seconds, "seconds", 0, 60), fv(r.fractionalMilliseconds)));
}, iv = (l) => {
  const i = (/* @__PURE__ */ new Date()).getUTCFullYear(), s = Math.floor(i / 100) * 100 + Zu(hi(l));
  return s < i ? s + 100 : s;
}, uv = 50 * 365 * 24 * 60 * 60 * 1e3, sv = (l) => l.getTime() - (/* @__PURE__ */ new Date()).getTime() > uv ? new Date(Date.UTC(l.getUTCFullYear() - 100, l.getUTCMonth(), l.getUTCDate(), l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds())) : l, zc = (l) => {
  const i = eo.indexOf(l);
  if (i < 0)
    throw new TypeError(`Invalid month: ${l}`);
  return i + 1;
}, rv = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], cv = (l, i, s) => {
  let r = rv[i];
  if (i === 1 && ov(l) && (r = 29), s > r)
    throw new TypeError(`Invalid day for ${eo[i]} in ${l}: ${s}`);
}, ov = (l) => l % 4 === 0 && (l % 100 !== 0 || l % 400 === 0), jn = (l, i, s, r) => {
  const f = JS(hi(l));
  if (f < s || f > r)
    throw new TypeError(`${i} must be between ${s} and ${r}, inclusive`);
  return f;
}, fv = (l) => l == null ? 0 : $S("0." + l) * 1e3, dv = (l) => {
  const i = l[0];
  let s = 1;
  if (i == "+")
    s = 1;
  else if (i == "-")
    s = -1;
  else
    throw new TypeError(`Offset direction, ${i}, must be "+" or "-"`);
  const r = Number(l.substring(1, 3)), f = Number(l.substring(4, 6));
  return s * (r * 60 + f) * 60 * 1e3;
}, hi = (l) => {
  let i = 0;
  for (; i < l.length - 1 && l.charAt(i) === "0"; )
    i++;
  return i === 0 ? l : l.slice(i);
}, jm = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Vt = Array.from({ length: 256 }, (l, i) => i.toString(16).padStart(2, "0")), Ay = () => {
  if (jm)
    return jm();
  const l = new Uint8Array(16);
  return crypto.getRandomValues(l), l[6] = l[6] & 15 | 64, l[8] = l[8] & 63 | 128, Vt[l[0]] + Vt[l[1]] + Vt[l[2]] + Vt[l[3]] + "-" + Vt[l[4]] + Vt[l[5]] + "-" + Vt[l[6]] + Vt[l[7]] + "-" + Vt[l[8]] + Vt[l[9]] + "-" + Vt[l[10]] + Vt[l[11]] + Vt[l[12]] + Vt[l[13]] + Vt[l[14]] + Vt[l[15]];
}, Ln = function(i) {
  return Object.assign(new String(i), {
    deserializeJSON() {
      return JSON.parse(String(i));
    },
    toString() {
      return String(i);
    },
    toJSON() {
      return String(i);
    }
  });
};
Ln.from = (l) => l && typeof l == "object" && (l instanceof Ln || "deserializeJSON" in l) ? l : typeof l == "string" || Object.getPrototypeOf(l) === String.prototype ? Ln(String(l)) : Ln(JSON.stringify(l));
Ln.fromObject = Ln.from;
const qm = /^-?\d*(\.\d+)?$/;
class qe {
  constructor(i, s) {
    O(this, "string");
    O(this, "type");
    if (this.string = i, this.type = s, !qm.test(i))
      throw new Error('@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".');
  }
  toString() {
    return this.string;
  }
  static [Symbol.hasInstance](i) {
    if (!i || typeof i != "object")
      return !1;
    const s = i;
    return qe.prototype.isPrototypeOf(i) || s.type === "bigDecimal" && qm.test(s.string);
  }
}
class hv {
  constructor() {
    O(this, "serdeContext");
  }
  setSerdeContext(i) {
    this.serdeContext = i;
  }
}
class mv extends hv {
  constructor(s) {
    super();
    O(this, "options");
    O(this, "compositeErrorRegistry");
    this.options = s, this.compositeErrorRegistry = fa.for(s.defaultNamespace);
    for (const r of s.errorTypeRegistries ?? [])
      this.compositeErrorRegistry.copyFrom(r);
  }
  getRequestType() {
    return me;
  }
  getResponseType() {
    return tl;
  }
  setSerdeContext(s) {
    this.serdeContext = s, this.serializer.setSerdeContext(s), this.deserializer.setSerdeContext(s), this.getPayloadCodec() && this.getPayloadCodec().setSerdeContext(s);
  }
  updateServiceEndpoint(s, r) {
    if ("url" in r) {
      s.protocol = r.url.protocol, s.hostname = r.url.hostname, s.port = r.url.port ? Number(r.url.port) : void 0, s.path = r.url.pathname, s.fragment = r.url.hash || void 0, s.username = r.url.username || void 0, s.password = r.url.password || void 0, s.query || (s.query = {});
      for (const [f, d] of r.url.searchParams.entries())
        s.query[f] = d;
      if (r.headers)
        for (const f in r.headers)
          s.headers[f] = r.headers[f].join(", ");
      return s;
    } else {
      if (s.protocol = r.protocol, s.hostname = r.hostname, s.port = r.port ? Number(r.port) : void 0, s.path = r.path, s.query = {
        ...r.query
      }, r.headers)
        for (const f in r.headers)
          s.headers[f] = r.headers[f];
      return s;
    }
  }
  setHostPrefix(s, r, f) {
    var p, g;
    if ((p = this.serdeContext) != null && p.disableHostPrefix)
      return;
    const d = ne.of(r.input), y = ii(r.traits ?? {});
    if (y.endpoint) {
      let h = (g = y.endpoint) == null ? void 0 : g[0];
      if (typeof h == "string") {
        for (const [b, v] of d.structIterator()) {
          if (!v.getMergedTraits().hostLabel)
            continue;
          const A = f[b];
          if (typeof A != "string")
            throw new Error(`@smithy/core/schema - ${b} in input must be a string as hostLabel.`);
          h = h.replace(`{${b}}`, A);
        }
        s.hostname = h + s.hostname;
      }
    }
  }
  deserializeMetadata(s) {
    return {
      httpStatusCode: s.statusCode,
      requestId: s.headers["x-amzn-requestid"] ?? s.headers["x-amzn-request-id"] ?? s.headers["x-amz-request-id"],
      extendedRequestId: s.headers["x-amz-id-2"],
      cfId: s.headers["x-amz-cf-id"]
    };
  }
  async serializeEventStream({ eventStream: s, requestSchema: r, initialRequest: f }) {
    return (await this.loadEventStreamCapability()).serializeEventStream({
      eventStream: s,
      requestSchema: r,
      initialRequest: f
    });
  }
  async deserializeEventStream({ response: s, responseSchema: r, initialResponseContainer: f }) {
    return (await this.loadEventStreamCapability()).deserializeEventStream({
      response: s,
      responseSchema: r,
      initialResponseContainer: f
    });
  }
  async loadEventStreamCapability() {
    const { EventStreamSerde: s } = await import("./index-DexBSEIQ.js");
    return new s({
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
  async deserializeHttpMessage(s, r, f, d, y) {
    return [];
  }
  getEventStreamMarshaller() {
    const s = this.serdeContext;
    if (!s.eventStreamMarshaller)
      throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
    return s.eventStreamMarshaller;
  }
}
class yv extends mv {
  async serializeRequest(i, s, r) {
    const f = this.serializer, d = {}, y = {}, p = await r.endpoint(), g = ne.of(i == null ? void 0 : i.input), h = g.getSchema();
    let b;
    const v = s && typeof s == "object" ? s : {}, A = new me({
      protocol: "",
      hostname: "",
      port: void 0,
      path: "/",
      fragment: void 0,
      query: d,
      headers: y,
      body: void 0
    });
    if (p && (this.updateServiceEndpoint(A, p), this.setHostPrefix(A, i, v)), v) {
      const C = g.getEventStreamMember();
      if (C) {
        if (v[C]) {
          const x = {};
          for (const [L, j] of g.structIterator())
            L !== C && v[L] && (f.write(j, v[L]), x[L] = f.flush());
          b = await this.serializeEventStream({
            eventStream: v[C],
            requestSchema: g,
            initialRequest: x
          });
        }
      } else
        f.write(h, v), b = f.flush();
    }
    return A.headers = Object.assign(A.headers, y), A.query = d, A.body = b, A.method = "POST", A;
  }
  async deserializeResponse(i, s, r) {
    const f = this.deserializer, d = ne.of(i.output), y = {};
    if (r.statusCode >= 300) {
      const g = await Zc(r.body, s);
      throw g.byteLength > 0 && Object.assign(y, await f.read(15, g)), await this.handleError(i, s, r, y, this.deserializeMetadata(r)), new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
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
      const g = await Zc(r.body, s);
      g.byteLength > 0 && Object.assign(y, await f.read(d, g));
    }
    return y.$metadata = this.deserializeMetadata(r), y;
  }
}
function Ry(l, i) {
  if (i.timestampFormat.useTrait && l.isTimestampSchema() && (l.getSchema() === 5 || l.getSchema() === 6 || l.getSchema() === 7))
    return l.getSchema();
  const { httpLabel: s, httpPrefixHeaders: r, httpHeader: f, httpQuery: d } = l.getMergedTraits();
  return (i.httpBindings ? typeof r == "string" || f ? 6 : d || s ? 5 : void 0 : void 0) ?? i.timestampFormat.default;
}
function gv(l, i, s) {
  l.__smithy_context ? l.__smithy_context.features || (l.__smithy_context.features = {}) : l.__smithy_context = {
    features: {}
  }, l.__smithy_context.features[i] = s;
}
class pv {
  constructor(i) {
    O(this, "authSchemes", /* @__PURE__ */ new Map());
    for (const s in i) {
      const r = i[s];
      r !== void 0 && this.authSchemes.set(s, r);
    }
  }
  getIdentityProvider(i) {
    return this.authSchemes.get(i);
  }
}
const Sv = (l) => function(s) {
  return _y(s) && s.expiration.getTime() - Date.now() < l;
}, vv = 3e5, bv = Sv(vv), _y = (l) => l.expiration !== void 0, Ev = (l, i, s) => {
  if (l === void 0)
    return;
  const r = typeof l != "function" ? async () => Promise.resolve(l) : l;
  let f, d, y, p = !1;
  const g = async (h) => {
    d || (d = r(h));
    try {
      f = await d, y = !0, p = !1;
    } finally {
      d = void 0;
    }
    return f;
  };
  return i === void 0 ? async (h) => ((!y || h != null && h.forceRefresh) && (f = await g(h)), f) : async (h) => ((!y || h != null && h.forceRefresh) && (f = await g(h)), p ? f : s(f) ? (i(f) && await g(h), f) : (p = !0, f));
}, Tv = void 0;
function Av(l) {
  return l === void 0 ? !0 : typeof l == "string" && l.length <= 50;
}
function Rv(l) {
  const i = ui(l.userAgentAppId ?? Tv), { customUserAgent: s } = l;
  return Object.assign(l, {
    customUserAgent: typeof s == "string" ? [[s]] : s,
    userAgentAppId: async () => {
      var f, d;
      const r = await i();
      if (!Av(r)) {
        const y = ((d = (f = l.logger) == null ? void 0 : f.constructor) == null ? void 0 : d.name) === "NoOpLogger" || !l.logger ? console : l.logger;
        typeof r != "string" ? y == null || y.warn("userAgentAppId must be a string or undefined.") : r.length > 50 && (y == null || y.warn("The provided userAgentAppId exceeds the maximum length of 50 characters."));
      }
      return r;
    }
  });
}
class no {
  constructor(i, s, r, f) {
    O(this, "nodes");
    O(this, "root");
    O(this, "conditions");
    O(this, "results");
    this.nodes = i, this.root = s, this.conditions = r, this.results = f;
  }
  static from(i, s, r, f) {
    return new no(i, s, r, f);
  }
}
class _v {
  constructor({ size: i, params: s }) {
    O(this, "capacity");
    O(this, "data", /* @__PURE__ */ new Map());
    O(this, "parameters", []);
    this.capacity = i ?? 50, s && (this.parameters = s);
  }
  get(i, s) {
    const r = this.hash(i);
    if (r === !1)
      return s();
    if (!this.data.has(r)) {
      if (this.data.size > this.capacity + 10) {
        const f = this.data.keys();
        let d = 0;
        for (; ; ) {
          const { value: y, done: p } = f.next();
          if (this.data.delete(y), p || ++d > 10)
            break;
        }
      }
      this.data.set(r, s());
    }
    return this.data.get(r);
  }
  size() {
    return this.data.size;
  }
  hash(i) {
    let s = "";
    const { parameters: r } = this;
    if (r.length === 0)
      return !1;
    for (const f of r) {
      const d = String(i[f] ?? "");
      if (d.includes("|;"))
        return !1;
      s += d + "|;";
    }
    return s;
  }
}
class ze extends Error {
  constructor(i) {
    super(i), this.name = "EndpointError";
  }
}
const wv = "endpoints";
function $u(l) {
  return typeof l != "object" || l == null ? l : "ref" in l ? `$${$u(l.ref)}` : "fn" in l ? `${l.fn}(${(l.argv || []).map($u).join(", ")})` : JSON.stringify(l, null, 2);
}
const ao = {}, Cv = (l, i) => l === i;
function Mv(...l) {
  for (const i of l)
    if (i != null)
      return i;
}
const Ov = (l) => {
  const i = l.split("."), s = [];
  for (const r of i) {
    const f = r.indexOf("[");
    if (f !== -1) {
      if (r.indexOf("]") !== r.length - 1)
        throw new ze(`Path: '${l}' does not end with ']'`);
      const d = r.slice(f + 1, -1);
      if (Number.isNaN(parseInt(d)))
        throw new ze(`Invalid array index: '${d}' in path: '${l}'`);
      f !== 0 && s.push(r.slice(0, f)), s.push(d);
    } else
      s.push(r);
  }
  return s;
}, wy = (l, i) => Ov(i).reduce((s, r) => {
  if (typeof s != "object")
    throw new ze(`Index '${r}' in '${i}' not found in '${JSON.stringify(l)}'`);
  if (Array.isArray(s)) {
    const f = parseInt(r);
    return s[f < 0 ? s.length + f : f];
  }
  return s[r];
}, l), Dv = (l) => l != null, zv = new RegExp("^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$"), Fu = (l, i = !1) => {
  if (!i)
    return zv.test(l);
  const s = l.split(".");
  for (const r of s)
    if (!Fu(r))
      return !1;
  return !0;
};
function xv(l, i, s) {
  return l ? i : s;
}
const Nv = (l) => !l, Uv = new RegExp("^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$"), Cy = (l) => Uv.test(l) || l.startsWith("[") && l.endsWith("]"), xc = {
  [oi.HTTP]: 80,
  [oi.HTTPS]: 443
}, Hv = (l) => {
  const i = (() => {
    try {
      if (l instanceof URL)
        return l;
      if (typeof l == "object" && "hostname" in l) {
        const { hostname: A, port: C, protocol: x = "", path: L = "", query: j = {} } = l, q = new URL(`${x}//${A}${C ? `:${C}` : ""}${L}`);
        return q.search = Object.entries(j).map(([I, F]) => `${I}=${F}`).join("&"), q;
      }
      return new URL(l);
    } catch {
      return null;
    }
  })();
  if (!i)
    return console.error(`Unable to parse ${JSON.stringify(l)} as a whatwg URL.`), null;
  const s = i.href, { host: r, hostname: f, pathname: d, protocol: y, search: p } = i;
  if (p)
    return null;
  const g = y.slice(0, -1);
  if (!Object.values(oi).includes(g))
    return null;
  const h = Cy(f), b = s.includes(`${r}:${xc[g]}`) || typeof l == "string" && l.includes(`${r}:${xc[g]}`), v = `${r}${b ? `:${xc[g]}` : ""}`;
  return {
    scheme: g,
    authority: v,
    path: d,
    normalizedPath: d.endsWith("/") ? d : `${d}/`,
    isIp: h
  };
};
function Bv(l, i, s) {
  if (s === 1)
    return [l];
  if (l === "")
    return [""];
  const r = l.split(i);
  return s === 0 ? r : r.slice(0, s - 1).concat(r.slice(1).join(i));
}
const Lv = (l, i) => l === i, jv = (l, i, s, r) => l == null || i >= s || l.length < s || /[^\u0000-\u007f]/.test(l) ? null : r ? l.substring(l.length - s, l.length - i) : l.substring(i, s), qv = (l) => encodeURIComponent(l).replace(/[!*'()]/g, (i) => `%${i.charCodeAt(0).toString(16).toUpperCase()}`), Qv = {
  booleanEquals: Cv,
  coalesce: Mv,
  getAttr: wy,
  isSet: Dv,
  isValidHostLabel: Fu,
  ite: xv,
  not: Nv,
  parseURL: Hv,
  split: Bv,
  stringEquals: Lv,
  substring: jv,
  uriEncode: qv
}, My = (l, i) => {
  const s = [], { referenceRecord: r, endpointParams: f } = i;
  let d = 0;
  for (; d < l.length; ) {
    const y = l.indexOf("{", d);
    if (y === -1) {
      s.push(l.slice(d));
      break;
    }
    s.push(l.slice(d, y));
    const p = l.indexOf("}", y);
    if (p === -1) {
      s.push(l.slice(y));
      break;
    }
    l[y + 1] === "{" && l[p + 1] === "}" && (s.push(l.slice(y + 1, p)), d = p + 2);
    const g = l.substring(y + 1, p);
    if (g.includes("#")) {
      const [h, b] = g.split("#");
      s.push(wy(r[h] ?? f[h], b));
    } else
      s.push(r[g] ?? f[g]);
    d = p + 1;
  }
  return s.join("");
}, Gv = ({ ref: l }, i) => i.referenceRecord[l] ?? i.endpointParams[l], Wu = (l, i, s) => {
  if (typeof l == "string")
    return My(l, s);
  if (l.fn)
    return Dy.callFunction(l, s);
  if (l.ref)
    return Gv(l, s);
  throw new ze(`'${i}': ${String(l)} is not a string, function or reference.`);
}, Oy = ({ fn: l, argv: i }, s) => {
  const r = Array(i.length);
  for (let y = 0; y < r.length; ++y) {
    const p = i[y];
    typeof p == "boolean" || typeof p == "number" ? r[y] = p : r[y] = Dy.evaluateExpression(p, "arg", s);
  }
  const f = l.indexOf(".");
  if (f !== -1) {
    const y = ao[l.slice(0, f)], p = y == null ? void 0 : y[l.slice(f + 1)];
    if (typeof p == "function")
      return p(...r);
  }
  const d = Qv[l];
  if (typeof d == "function")
    return d(...r);
  throw new Error(`function ${l} not loaded in endpointFunctions.`);
}, Dy = {
  evaluateExpression: Wu,
  callFunction: Oy
}, Yv = (l, i) => {
  var d, y;
  const { assign: s } = l;
  if (s && s in i.referenceRecord)
    throw new ze(`'${s}' is already defined in Reference Record.`);
  const r = Oy(l, i);
  (y = (d = i.logger) == null ? void 0 : d.debug) == null || y.call(d, `${wv} evaluateCondition: ${$u(l)} = ${$u(r)}`);
  const f = r === "" ? !0 : !!r;
  return s != null ? { result: f, toAssign: { name: s, value: r } } : { result: f };
}, Xv = (l, i) => Object.entries(l ?? {}).reduce((s, [r, f]) => (s[r] = f.map((d) => {
  const y = Wu(d, "Header value entry", i);
  if (typeof y != "string")
    throw new ze(`Header '${r}' value '${y}' is not a string`);
  return y;
}), s), {}), zy = (l, i) => Object.entries(l).reduce((s, [r, f]) => (s[r] = Ny.getEndpointProperty(f, i), s), {}), xy = (l, i) => {
  if (Array.isArray(l))
    return l.map((s) => xy(s, i));
  switch (typeof l) {
    case "string":
      return My(l, i);
    case "object":
      if (l === null)
        throw new ze(`Unexpected endpoint property: ${l}`);
      return Ny.getEndpointProperties(l, i);
    case "boolean":
      return l;
    default:
      throw new ze(`Unexpected endpoint property type: ${typeof l}`);
  }
}, Ny = {
  getEndpointProperty: xy,
  getEndpointProperties: zy
}, Vv = (l, i) => {
  const s = Wu(l, "Endpoint URL", i);
  if (typeof s == "string")
    try {
      return new URL(s);
    } catch (r) {
      throw console.error(`Failed to construct URL with ${s}`, r), r;
    }
  throw new ze(`Endpoint URL must be a string, got ${typeof s}`);
}, Nc = 1e8, Zv = (l, i) => {
  const { nodes: s, root: r, results: f, conditions: d } = l;
  let y = r;
  const p = {}, g = {
    referenceRecord: p,
    endpointParams: i.endpointParams,
    logger: i.logger
  };
  for (; y !== 1 && y !== -1 && y < Nc; ) {
    const h = 3 * (Math.abs(y) - 1), [b, v, A] = [s[h], s[h + 1], s[h + 2]], [C, x, L] = d[b], j = Yv({ fn: C, assign: L, argv: x }, g);
    if (j.toAssign) {
      const { name: q, value: I } = j.toAssign;
      p[q] = I;
    }
    y = y >= 0 === j.result ? v : A;
  }
  if (y >= Nc) {
    const h = f[y - Nc];
    if (h[0] === -1) {
      const [, C] = h;
      throw new ze(Wu(C, "Error", g));
    }
    const [b, v, A] = h;
    return {
      url: Vv(b, g),
      properties: zy(v, g),
      headers: Xv(A ?? {}, g)
    };
  }
  throw new ze("No matching endpoint.");
}, Uy = (l, i = !1) => {
  if (i) {
    for (const s of l.split("."))
      if (!Uy(s))
        return !1;
    return !0;
  }
  return !(!Fu(l) || l.length < 3 || l.length > 63 || l !== l.toLowerCase() || Cy(l));
}, Qm = ":", $v = "/", Kv = (l) => {
  const i = l.split(Qm);
  if (i.length < 6)
    return null;
  const [s, r, f, d, y, ...p] = i;
  if (s !== "arn" || r === "" || f === "" || p.join(Qm) === "")
    return null;
  const g = p.map((h) => h.split($v)).flat();
  return {
    partition: r,
    service: f,
    region: d,
    accountId: y,
    resourceId: g
  };
}, Jv = [{ id: "aws", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-east-1", name: "aws", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$", regions: { "af-south-1": { description: "Africa (Cape Town)" }, "ap-east-1": { description: "Asia Pacific (Hong Kong)" }, "ap-east-2": { description: "Asia Pacific (Taipei)" }, "ap-northeast-1": { description: "Asia Pacific (Tokyo)" }, "ap-northeast-2": { description: "Asia Pacific (Seoul)" }, "ap-northeast-3": { description: "Asia Pacific (Osaka)" }, "ap-south-1": { description: "Asia Pacific (Mumbai)" }, "ap-south-2": { description: "Asia Pacific (Hyderabad)" }, "ap-southeast-1": { description: "Asia Pacific (Singapore)" }, "ap-southeast-2": { description: "Asia Pacific (Sydney)" }, "ap-southeast-3": { description: "Asia Pacific (Jakarta)" }, "ap-southeast-4": { description: "Asia Pacific (Melbourne)" }, "ap-southeast-5": { description: "Asia Pacific (Malaysia)" }, "ap-southeast-6": { description: "Asia Pacific (New Zealand)" }, "ap-southeast-7": { description: "Asia Pacific (Thailand)" }, "aws-global": { description: "aws global region" }, "ca-central-1": { description: "Canada (Central)" }, "ca-west-1": { description: "Canada West (Calgary)" }, "eu-central-1": { description: "Europe (Frankfurt)" }, "eu-central-2": { description: "Europe (Zurich)" }, "eu-north-1": { description: "Europe (Stockholm)" }, "eu-south-1": { description: "Europe (Milan)" }, "eu-south-2": { description: "Europe (Spain)" }, "eu-west-1": { description: "Europe (Ireland)" }, "eu-west-2": { description: "Europe (London)" }, "eu-west-3": { description: "Europe (Paris)" }, "il-central-1": { description: "Israel (Tel Aviv)" }, "me-central-1": { description: "Middle East (UAE)" }, "me-south-1": { description: "Middle East (Bahrain)" }, "mx-central-1": { description: "Mexico (Central)" }, "sa-east-1": { description: "South America (Sao Paulo)" }, "us-east-1": { description: "US East (N. Virginia)" }, "us-east-2": { description: "US East (Ohio)" }, "us-west-1": { description: "US West (N. California)" }, "us-west-2": { description: "US West (Oregon)" } } }, { id: "aws-cn", outputs: { dnsSuffix: "amazonaws.com.cn", dualStackDnsSuffix: "api.amazonwebservices.com.cn", implicitGlobalRegion: "cn-northwest-1", name: "aws-cn", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^cn\\-\\w+\\-\\d+$", regions: { "aws-cn-global": { description: "aws-cn global region" }, "cn-north-1": { description: "China (Beijing)" }, "cn-northwest-1": { description: "China (Ningxia)" } } }, { id: "aws-eusc", outputs: { dnsSuffix: "amazonaws.eu", dualStackDnsSuffix: "api.amazonwebservices.eu", implicitGlobalRegion: "eusc-de-east-1", name: "aws-eusc", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^eusc\\-(de)\\-\\w+\\-\\d+$", regions: { "eusc-de-east-1": { description: "AWS European Sovereign Cloud (Germany)" } } }, { id: "aws-iso", outputs: { dnsSuffix: "c2s.ic.gov", dualStackDnsSuffix: "api.aws.ic.gov", implicitGlobalRegion: "us-iso-east-1", name: "aws-iso", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-iso\\-\\w+\\-\\d+$", regions: { "aws-iso-global": { description: "aws-iso global region" }, "us-iso-east-1": { description: "US ISO East" }, "us-iso-west-1": { description: "US ISO WEST" } } }, { id: "aws-iso-b", outputs: { dnsSuffix: "sc2s.sgov.gov", dualStackDnsSuffix: "api.aws.scloud", implicitGlobalRegion: "us-isob-east-1", name: "aws-iso-b", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-isob\\-\\w+\\-\\d+$", regions: { "aws-iso-b-global": { description: "aws-iso-b global region" }, "us-isob-east-1": { description: "US ISOB East (Ohio)" }, "us-isob-west-1": { description: "US ISOB West" } } }, { id: "aws-iso-e", outputs: { dnsSuffix: "cloud.adc-e.uk", dualStackDnsSuffix: "api.cloud-aws.adc-e.uk", implicitGlobalRegion: "eu-isoe-west-1", name: "aws-iso-e", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$", regions: { "aws-iso-e-global": { description: "aws-iso-e global region" }, "eu-isoe-west-1": { description: "EU ISOE West" } } }, { id: "aws-iso-f", outputs: { dnsSuffix: "csp.hci.ic.gov", dualStackDnsSuffix: "api.aws.hci.ic.gov", implicitGlobalRegion: "us-isof-south-1", name: "aws-iso-f", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-isof\\-\\w+\\-\\d+$", regions: { "aws-iso-f-global": { description: "aws-iso-f global region" }, "us-isof-east-1": { description: "US ISOF EAST" }, "us-isof-south-1": { description: "US ISOF SOUTH" } } }, { id: "aws-us-gov", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-gov-west-1", name: "aws-us-gov", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-gov\\-\\w+\\-\\d+$", regions: { "aws-us-gov-global": { description: "aws-us-gov global region" }, "us-gov-east-1": { description: "AWS GovCloud (US-East)" }, "us-gov-west-1": { description: "AWS GovCloud (US-West)" } } }], kv = {
  partitions: Jv
};
let Iv = kv;
const Fv = (l) => {
  const { partitions: i } = Iv;
  for (const r of i) {
    const { regions: f, outputs: d } = r;
    for (const [y, p] of Object.entries(f))
      if (y === l)
        return {
          ...d,
          ...p
        };
  }
  for (const r of i) {
    const { regionRegex: f, outputs: d } = r;
    if (new RegExp(f).test(l))
      return {
        ...d
      };
  }
  const s = i.find((r) => r.id === "aws");
  if (!s)
    throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
  return {
    ...s.outputs
  };
}, Hy = {
  isVirtualHostableS3Bucket: Uy,
  parseArn: Kv,
  partition: Fv
};
ao.aws = Hy;
function Wv(l, i, s) {
  return l.$source || (l.$source = {}), l.$source[i] = s, l;
}
function un(l, i, s) {
  l.__aws_sdk_context ? l.__aws_sdk_context.features || (l.__aws_sdk_context.features = {}) : l.__aws_sdk_context = {
    features: {}
  }, l.__aws_sdk_context.features[i] = s;
}
var qn;
(function(l) {
  l.STANDARD = "standard", l.ADAPTIVE = "adaptive";
})(qn || (qn = {}));
const ri = 3, Pv = qn.STANDARD, t1 = [
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
], e1 = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"], n1 = [500, 502, 503, 504], a1 = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"], l1 = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND"], i1 = (l) => (l == null ? void 0 : l.$retryable) !== void 0, u1 = (l) => {
  var i;
  return (i = l.$metadata) == null ? void 0 : i.clockSkewCorrected;
}, s1 = (l) => {
  const i = /* @__PURE__ */ new Set([
    "Failed to fetch",
    "NetworkError when attempting to fetch resource",
    "The Internet connection appears to be offline",
    "Load failed",
    "Network request failed"
  ]);
  return l && l instanceof TypeError ? i.has(l.message) : !1;
}, By = (l) => {
  var i, s;
  return ((i = l.$metadata) == null ? void 0 : i.httpStatusCode) === 429 || t1.includes(l.name) || ((s = l.$retryable) == null ? void 0 : s.throttling) == !0;
}, lo = (l, i = 0) => {
  var s;
  return i1(l) || u1(l) || e1.includes(l.name) || a1.includes((l == null ? void 0 : l.code) || "") || l1.includes((l == null ? void 0 : l.code) || "") || n1.includes(((s = l.$metadata) == null ? void 0 : s.httpStatusCode) || 0) || s1(l) || c1(l) || l.cause !== void 0 && i <= 10 && lo(l.cause, i + 1);
}, r1 = (l) => {
  var i;
  if (((i = l.$metadata) == null ? void 0 : i.httpStatusCode) !== void 0) {
    const s = l.$metadata.httpStatusCode;
    return 500 <= s && s <= 599 && !lo(l);
  }
  return !1;
};
function c1(l) {
  return l.code === "ERR_HTTP2_STREAM_ERROR" && l.message.includes("NGHTTP2_REFUSED_STREAM");
}
const Ju = class Ju {
  constructor(i) {
    O(this, "beta");
    O(this, "minCapacity");
    O(this, "minFillRate");
    O(this, "scaleConstant");
    O(this, "smooth");
    O(this, "enabled", !1);
    O(this, "availableTokens", 0);
    O(this, "lastMaxRate", 0);
    O(this, "measuredTxRate", 0);
    O(this, "requestCount", 0);
    O(this, "fillRate");
    O(this, "lastThrottleTime");
    O(this, "lastTimestamp", 0);
    O(this, "lastTxRateBucket");
    O(this, "maxCapacity");
    O(this, "timeWindow", 0);
    this.beta = (i == null ? void 0 : i.beta) ?? 0.7, this.minCapacity = (i == null ? void 0 : i.minCapacity) ?? 1, this.minFillRate = (i == null ? void 0 : i.minFillRate) ?? 0.5, this.scaleConstant = (i == null ? void 0 : i.scaleConstant) ?? 0.4, this.smooth = (i == null ? void 0 : i.smooth) ?? 0.8, this.lastThrottleTime = this.getCurrentTimeInSeconds(), this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds()), this.fillRate = this.minFillRate, this.maxCapacity = this.minCapacity;
  }
  async getSendToken() {
    return this.acquireTokenBucket(1);
  }
  updateClientSendingRate(i) {
    let s;
    this.updateMeasuredRate();
    const r = i;
    if ((r == null ? void 0 : r.errorType) === "THROTTLING" || By((r == null ? void 0 : r.error) ?? i)) {
      const y = this.enabled ? Math.min(this.measuredTxRate, this.fillRate) : this.measuredTxRate;
      this.lastMaxRate = y, this.calculateTimeWindow(), this.lastThrottleTime = this.getCurrentTimeInSeconds(), s = this.cubicThrottle(y), this.enableTokenBucket();
    } else
      this.calculateTimeWindow(), s = this.cubicSuccess(this.getCurrentTimeInSeconds());
    const d = Math.min(s, 2 * this.measuredTxRate);
    this.updateTokenBucketRate(d);
  }
  getCurrentTimeInSeconds() {
    return Date.now() / 1e3;
  }
  async acquireTokenBucket(i) {
    if (this.enabled) {
      if (this.refillTokenBucket(), i > this.availableTokens) {
        const s = (i - this.availableTokens) / this.fillRate * 1e3;
        await new Promise((r) => Ju.setTimeoutFn(r, s));
      }
      this.availableTokens = this.availableTokens - i;
    }
  }
  refillTokenBucket() {
    const i = this.getCurrentTimeInSeconds();
    if (!this.lastTimestamp) {
      this.lastTimestamp = i;
      return;
    }
    const s = (i - this.lastTimestamp) * this.fillRate;
    this.availableTokens = Math.min(this.maxCapacity, this.availableTokens + s), this.lastTimestamp = i;
  }
  calculateTimeWindow() {
    this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
  }
  cubicThrottle(i) {
    return this.getPrecise(i * this.beta);
  }
  cubicSuccess(i) {
    return this.getPrecise(this.scaleConstant * Math.pow(i - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
  }
  enableTokenBucket() {
    this.enabled = !0;
  }
  updateTokenBucketRate(i) {
    this.refillTokenBucket(), this.fillRate = Math.max(i, this.minFillRate), this.maxCapacity = Math.max(i, this.minCapacity), this.availableTokens = Math.min(this.availableTokens, this.maxCapacity);
  }
  updateMeasuredRate() {
    const i = this.getCurrentTimeInSeconds(), s = Math.floor(i * 2) / 2;
    if (this.requestCount++, s > this.lastTxRateBucket) {
      const r = this.requestCount / (s - this.lastTxRateBucket);
      this.measuredTxRate = this.getPrecise(r * this.smooth + this.measuredTxRate * (1 - this.smooth)), this.requestCount = 0, this.lastTxRateBucket = s;
    }
  }
  getPrecise(i) {
    return parseFloat(i.toFixed(8));
  }
};
O(Ju, "setTimeoutFn", setTimeout);
let Kc = Ju;
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
O(Bn, "v2026", typeof process < "u" && ((py = process.env) == null ? void 0 : py.SMITHY_NEW_RETRIES_2026) === "true");
let De = Bn;
class h1 {
  constructor() {
    O(this, "x", De.delay());
  }
  computeNextBackoffDelay(i) {
    const f = Math.random() * Math.min(this.x * 2 ** i, Ly);
    return Math.floor(f);
  }
  setDelayBase(i) {
    this.x = i;
  }
}
class Ym {
  constructor(i, s, r, f) {
    O(this, "delay");
    O(this, "count");
    O(this, "cost");
    O(this, "longPoll");
    this.delay = i, this.count = s, this.cost = r, this.longPoll = f;
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
class Jc {
  constructor(i) {
    O(this, "mode", qn.STANDARD);
    O(this, "capacity", Gm);
    O(this, "retryBackoffStrategy");
    O(this, "maxAttemptsProvider");
    O(this, "baseDelay");
    typeof i == "number" ? this.maxAttemptsProvider = async () => i : typeof i == "function" ? this.maxAttemptsProvider = i : i && typeof i == "object" && (this.maxAttemptsProvider = async () => i.maxAttempts, this.baseDelay = i.baseDelay, this.retryBackoffStrategy = i.backoff), this.maxAttemptsProvider ?? (this.maxAttemptsProvider = async () => ri), this.baseDelay ?? (this.baseDelay = De.delay()), this.retryBackoffStrategy ?? (this.retryBackoffStrategy = new h1());
  }
  async acquireInitialRetryToken(i) {
    return new Ym(De.delay(), 0, void 0, De.v2026 && i.includes(":longpoll"));
  }
  async refreshRetryTokenForRetry(i, s) {
    var d, y;
    const r = await this.getMaxAttempts(), f = this.shouldRetry(i, s, r);
    if (f || (d = i.isLongPoll) != null && d.call(i)) {
      const p = s.errorType;
      this.retryBackoffStrategy.setDelayBase(p === "THROTTLING" ? De.throttlingDelay() : this.baseDelay);
      const g = this.retryBackoffStrategy.computeNextBackoffDelay(i.getRetryCount());
      let h = g;
      if (s.retryAfterHint instanceof Date && (h = Math.max(g, Math.min(s.retryAfterHint.getTime() - Date.now(), g + 5e3))), f) {
        const b = this.getCapacityCost(p);
        return this.capacity -= b, new Ym(h, i.getRetryCount() + 1, b, ((y = i.isLongPoll) == null ? void 0 : y.call(i)) ?? !1);
      } else
        throw Object.assign(new Error("No retry token available"), { $backoff: De.v2026 ? h : 0 });
    }
    throw new Error("No retry token available");
  }
  recordSuccess(i) {
    this.capacity = Math.min(Gm, this.capacity + (i.getRetryCost() ?? o1));
  }
  getCapacity() {
    return this.capacity;
  }
  async getMaxAttempts() {
    try {
      return await this.maxAttemptsProvider();
    } catch {
      return console.warn(`Max attempts provider could not resolve. Using default of ${ri}`), ri;
    }
  }
  shouldRetry(i, s, r) {
    return i.getRetryCount() + 1 < r && this.capacity >= this.getCapacityCost(s.errorType) && this.isRetryableError(s.errorType);
  }
  getCapacityCost(i) {
    return i === De.modifiedCostType() ? De.throttlingCost() : De.cost();
  }
  isRetryableError(i) {
    return i === "THROTTLING" || i === "TRANSIENT";
  }
  async maxAttempts() {
    return this.maxAttemptsProvider();
  }
}
class m1 {
  constructor(i, s) {
    O(this, "mode", qn.ADAPTIVE);
    O(this, "rateLimiter");
    O(this, "standardRetryStrategy");
    const { rateLimiter: r } = s ?? {};
    this.rateLimiter = r ?? new Kc(), this.standardRetryStrategy = s ? new Jc({
      maxAttempts: typeof i == "number" ? i : 3,
      ...s
    }) : new Jc(i);
  }
  async acquireInitialRetryToken(i) {
    return await this.rateLimiter.getSendToken(), this.standardRetryStrategy.acquireInitialRetryToken(i);
  }
  async refreshRetryTokenForRetry(i, s) {
    return this.rateLimiter.updateClientSendingRate(s), this.standardRetryStrategy.refreshRetryTokenForRetry(i, s);
  }
  recordSuccess(i) {
    this.rateLimiter.updateClientSendingRate({}), this.standardRetryStrategy.recordSuccess(i);
  }
  async maxAttemptsProvider() {
    return this.standardRetryStrategy.maxAttempts();
  }
}
const y1 = /\d{12}\.ddb/;
async function g1(l, i, s) {
  var d, y, p, g, h;
  const r = s.request;
  if (((d = r == null ? void 0 : r.headers) == null ? void 0 : d["smithy-protocol"]) === "rpc-v2-cbor" && un(l, "PROTOCOL_RPC_V2_CBOR", "M"), typeof i.retryStrategy == "function") {
    const b = await i.retryStrategy();
    if (typeof b.mode == "string")
      switch (b.mode) {
        case qn.ADAPTIVE:
          un(l, "RETRY_MODE_ADAPTIVE", "F");
          break;
        case qn.STANDARD:
          un(l, "RETRY_MODE_STANDARD", "E");
          break;
      }
  }
  if (typeof i.accountIdEndpointMode == "function") {
    const b = l.endpointV2;
    switch (String((y = b == null ? void 0 : b.url) == null ? void 0 : y.hostname).match(y1) && un(l, "ACCOUNT_ID_ENDPOINT", "O"), await ((p = i.accountIdEndpointMode) == null ? void 0 : p.call(i))) {
      case "disabled":
        un(l, "ACCOUNT_ID_MODE_DISABLED", "Q");
        break;
      case "preferred":
        un(l, "ACCOUNT_ID_MODE_PREFERRED", "P");
        break;
      case "required":
        un(l, "ACCOUNT_ID_MODE_REQUIRED", "R");
        break;
    }
  }
  const f = (h = (g = l.__smithy_context) == null ? void 0 : g.selectedHttpAuthScheme) == null ? void 0 : h.identity;
  if (f != null && f.$source) {
    const b = f;
    b.accountId && un(l, "RESOLVED_ACCOUNT_ID", "T");
    for (const [v, A] of Object.entries(b.$source ?? {}))
      un(l, v, A);
  }
}
const Xm = "user-agent", Uc = "x-amz-user-agent", Vm = " ", Hc = "/", p1 = /[^!$%&'*+\-.^_`|~\w]/g, S1 = /[^!$%&'*+\-.^_`|~\w#]/g, Zm = "-", v1 = 1024;
function b1(l) {
  let i = "";
  for (const s in l) {
    const r = l[s];
    if (i.length + r.length + 1 <= v1) {
      i.length ? i += "," + r : i += r;
      continue;
    }
    break;
  }
  return i;
}
const E1 = (l) => (i, s) => async (r) => {
  var C, x, L, j;
  const { request: f } = r;
  if (!me.isInstance(f))
    return i(r);
  const { headers: d } = f, y = ((C = s == null ? void 0 : s.userAgent) == null ? void 0 : C.map(Bu)) || [], p = (await l.defaultUserAgentProvider()).map(Bu);
  await g1(s, l, r);
  const g = s;
  p.push(`m/${b1(Object.assign({}, (x = s.__smithy_context) == null ? void 0 : x.features, (L = g.__aws_sdk_context) == null ? void 0 : L.features))}`);
  const h = ((j = l == null ? void 0 : l.customUserAgent) == null ? void 0 : j.map(Bu)) || [], b = await l.userAgentAppId();
  b && p.push(Bu(["app", `${b}`]));
  const v = [].concat([...p, ...y, ...h]).join(Vm), A = [
    ...p.filter((q) => q.startsWith("aws-sdk-")),
    ...h
  ].join(Vm);
  return l.runtime !== "browser" ? (A && (d[Uc] = d[Uc] ? `${d[Xm]} ${A}` : A), d[Xm] = v) : d[Uc] = v, i({
    ...r,
    request: f
  });
}, Bu = (l) => {
  var y;
  const i = l[0].split(Hc).map((p) => p.replace(p1, Zm)).join(Hc), s = (y = l[1]) == null ? void 0 : y.replace(S1, Zm), r = i.indexOf(Hc), f = i.substring(0, r);
  let d = i.substring(r + 1);
  return f === "api" && (d = d.toLowerCase()), [f, d, s].filter((p) => p && p.length > 0).reduce((p, g, h) => {
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
}, A1 = (l) => ({
  applyToStack: (i) => {
    i.add(E1(l), T1);
  }
}), R1 = !1, _1 = !1, $m = /* @__PURE__ */ new Set(), w1 = (l, i = Fu) => {
  if (!$m.has(l) && !i(l))
    if (l === "*")
      console.warn('@smithy/config-resolver WARN - Please use the caller region instead of "*". See "sigv4a" in https://github.com/aws/aws-sdk-js-v3/blob/main/supplemental-docs/CLIENTS.md.');
    else
      throw new Error(`Region not accepted: region="${l}" is not a valid hostname component.`);
  else
    $m.add(l);
}, jy = (l) => typeof l == "string" && (l.startsWith("fips-") || l.endsWith("-fips")), C1 = (l) => jy(l) ? ["fips-aws-global", "aws-fips"].includes(l) ? "us-east-1" : l.replace(/fips-(dkr-|prod-)?|-fips/, "") : l, M1 = (l) => {
  const { region: i, useFipsEndpoint: s } = l;
  if (!i)
    throw new Error("Region is missing");
  return Object.assign(l, {
    region: async () => {
      const r = typeof i == "function" ? await i() : i, f = C1(r);
      return w1(f), f;
    },
    useFipsEndpoint: async () => {
      const r = typeof i == "string" ? i : await i();
      return jy(r) ? !0 : typeof s != "function" ? Promise.resolve(!!s) : s();
    }
  });
}, Km = "content-length";
function O1(l) {
  return (i) => async (s) => {
    const r = s.request;
    if (me.isInstance(r)) {
      const { body: f, headers: d } = r;
      if (f && Object.keys(d).map((y) => y.toLowerCase()).indexOf(Km) === -1)
        try {
          const y = l(f);
          r.headers = {
            ...r.headers,
            [Km]: String(y)
          };
        } catch {
        }
    }
    return i({
      ...s,
      request: r
    });
  };
}
const D1 = {
  step: "build",
  tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
  name: "contentLengthMiddleware",
  override: !0
}, z1 = (l) => ({
  applyToStack: (i) => {
    i.add(O1(l.bodyLengthChecker), D1);
  }
}), x1 = async (l) => {
  const i = (l == null ? void 0 : l.Bucket) || "";
  if (typeof l.Bucket == "string" && (l.Bucket = i.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"))), L1(i)) {
    if (l.ForcePathStyle === !0)
      throw new Error("Path-style addressing cannot be used with ARN buckets");
  } else (!B1(i) || i.indexOf(".") !== -1 && !String(l.Endpoint).startsWith("http:") || i.toLowerCase() !== i || i.length < 3) && (l.ForcePathStyle = !0);
  return l.DisableMultiRegionAccessPoints && (l.disableMultiRegionAccessPoints = !0, l.DisableMRAP = !0), l;
}, N1 = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/, U1 = /(\d+\.){3}\d+/, H1 = /\.\./, B1 = (l) => N1.test(l) && !U1.test(l) && !H1.test(l), L1 = (l) => {
  const [i, s, r, , , f] = l.split(":"), d = i === "arn" && l.split(":").length >= 6, y = !!(d && s && r && f);
  if (d && !y)
    throw new Error(`Invalid ARN: ${l} was an invalid ARN.`);
  return y;
}, j1 = (l, i, s, r = !1) => {
  const f = async () => {
    let d;
    if (r) {
      const y = s.clientContextParams;
      d = (y == null ? void 0 : y[l]) ?? s[l] ?? s[i];
    } else
      d = s[l] ?? s[i];
    return typeof d == "function" ? d() : d;
  };
  return l === "credentialScope" || i === "CredentialScope" ? async () => {
    const d = typeof s.credentials == "function" ? await s.credentials() : s.credentials;
    return (d == null ? void 0 : d.credentialScope) ?? (d == null ? void 0 : d.CredentialScope);
  } : l === "accountId" || i === "AccountId" ? async () => {
    const d = typeof s.credentials == "function" ? await s.credentials() : s.credentials;
    return (d == null ? void 0 : d.accountId) ?? (d == null ? void 0 : d.AccountId);
  } : l === "endpoint" || i === "endpoint" ? async () => {
    if (s.isCustomEndpoint === !1)
      return;
    const d = await f();
    if (d && typeof d == "object") {
      if ("url" in d)
        return d.url.href;
      if ("hostname" in d) {
        const { protocol: y, hostname: p, port: g, path: h } = d;
        return `${y}//${p}${g ? ":" + g : ""}${h}`;
      }
    }
    return d;
  } : f;
}, qy = async (l) => {
}, Qy = (l) => {
  if (typeof l == "object") {
    if ("url" in l) {
      const i = nl(l.url);
      if (l.headers) {
        i.headers = {};
        for (const [s, r] of Object.entries(l.headers))
          i.headers[s.toLowerCase()] = r.join(", ");
      }
      return i;
    }
    return l;
  }
  return nl(l);
}, q1 = async (l, i, s, r) => {
  if (!s.isCustomEndpoint) {
    let y;
    s.serviceConfiguredEndpoint ? y = await s.serviceConfiguredEndpoint() : y = await qy(s.serviceId), y && (s.endpoint = () => Promise.resolve(Qy(y)), s.isCustomEndpoint = !0);
  }
  const f = await Q1(l, i, s);
  if (typeof s.endpointProvider != "function")
    throw new Error("config.endpointProvider is not set.");
  const d = s.endpointProvider(f, r);
  if (s.isCustomEndpoint && s.endpoint) {
    const y = await s.endpoint();
    if (y != null && y.headers) {
      d.headers ?? (d.headers = {});
      for (const [p, g] of Object.entries(y.headers))
        d.headers[p] = Array.isArray(g) ? g : [g];
    }
  }
  return d;
}, Q1 = async (l, i, s) => {
  var d;
  const r = {}, f = ((d = i == null ? void 0 : i.getEndpointParameterInstructions) == null ? void 0 : d.call(i)) || {};
  for (const [y, p] of Object.entries(f))
    switch (p.type) {
      case "staticContextParams":
        r[y] = p.value;
        break;
      case "contextParams":
        r[y] = l[p.name];
        break;
      case "clientContextParams":
      case "builtInParams":
        r[y] = await j1(p.name, y, s, p.type !== "builtInParams")();
        break;
      case "operationContextParams":
        r[y] = p.get(l);
        break;
      default:
        throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(p));
    }
  return Object.keys(f).length === 0 && Object.assign(r, s), String(s.serviceId).toLowerCase() === "s3" && await x1(r), r;
}, G1 = ({ config: l, instructions: i }) => (s, r) => async (f) => {
  var p, g, h;
  l.isCustomEndpoint && gv(r, "ENDPOINT_OVERRIDE", "N");
  const d = await q1(f.input, {
    getEndpointParameterInstructions() {
      return i;
    }
  }, { ...l }, r);
  r.endpointV2 = d, r.authSchemes = (p = d.properties) == null ? void 0 : p.authSchemes;
  const y = (g = r.authSchemes) == null ? void 0 : g[0];
  if (y) {
    r.signing_region = y.signingRegion, r.signing_service = y.signingName;
    const b = al(r), v = (h = b == null ? void 0 : b.selectedHttpAuthScheme) == null ? void 0 : h.httpAuthOption;
    v && (v.signingProperties = Object.assign(v.signingProperties || {}, {
      signing_region: y.signingRegion,
      signingRegion: y.signingRegion,
      signing_service: y.signingName,
      signingName: y.signingName,
      signingRegionSet: y.signingRegionSet
    }, y.properties));
  }
  return s({
    ...f
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
}, io = (l, i) => ({
  applyToStack: (s) => {
    s.addRelativeTo(G1({
      config: l,
      instructions: i
    }), X1);
  }
}), V1 = (l) => {
  const i = l.tls ?? !0, { endpoint: s, useDualstackEndpoint: r, useFipsEndpoint: f } = l, d = s != null ? async () => Qy(await sn(s)()) : void 0, p = Object.assign(l, {
    endpoint: d,
    tls: i,
    isCustomEndpoint: !!s,
    useDualstackEndpoint: sn(r ?? !1),
    useFipsEndpoint: sn(f ?? !1)
  });
  let g;
  return p.serviceConfiguredEndpoint = async () => (l.serviceId && !g && (g = qy(l.serviceId)), g), p;
}, Z1 = (l) => l instanceof Error ? l : l instanceof Object ? Object.assign(new Error(), l) : typeof l == "string" ? new Error(l) : new Error(`AWS SDK error wrapper for ${l}`), $1 = (l) => {
  const { retryStrategy: i, retryMode: s } = l, r = sn(l.maxAttempts ?? ri);
  let f = i ? Promise.resolve(i) : void 0;
  const d = async () => await sn(s)() === qn.ADAPTIVE ? new m1(r) : new Jc(r);
  return Object.assign(l, {
    maxAttempts: r,
    retryStrategy: () => f ?? (f = d())
  });
}, ua = (l, i) => {
  const s = [];
  if (l && s.push(l), i)
    for (const r of i)
      s.push(r);
  return s;
}, Un = (l, i) => `${l || "anonymous"}${i && i.length > 0 ? ` (a.k.a. ${i.join(",")})` : ""}`, Ku = () => {
  let l = [], i = [], s = !1;
  const r = /* @__PURE__ */ new Set(), f = (v) => v.sort((A, C) => Jm[C.step] - Jm[A.step] || km[C.priority || "normal"] - km[A.priority || "normal"]), d = (v) => {
    let A = !1;
    const C = (x) => {
      const L = ua(x.name, x.aliases);
      if (L.includes(v)) {
        A = !0;
        for (const j of L)
          r.delete(j);
        return !1;
      }
      return !0;
    };
    return l = l.filter(C), i = i.filter(C), A;
  }, y = (v) => {
    let A = !1;
    const C = (x) => {
      if (x.middleware === v) {
        A = !0;
        for (const L of ua(x.name, x.aliases))
          r.delete(L);
        return !1;
      }
      return !0;
    };
    return l = l.filter(C), i = i.filter(C), A;
  }, p = (v) => {
    var A;
    return l.forEach((C) => {
      v.add(C.middleware, { ...C });
    }), i.forEach((C) => {
      v.addRelativeTo(C.middleware, { ...C });
    }), (A = v.identifyOnResolve) == null || A.call(v, b.identifyOnResolve()), v;
  }, g = (v) => {
    const A = [];
    return v.before.forEach((C) => {
      C.before.length === 0 && C.after.length === 0 ? A.push(C) : A.push(...g(C));
    }), A.push(v), v.after.reverse().forEach((C) => {
      C.before.length === 0 && C.after.length === 0 ? A.push(C) : A.push(...g(C));
    }), A;
  }, h = (v = !1) => {
    const A = [], C = [], x = {};
    return l.forEach((j) => {
      const q = {
        ...j,
        before: [],
        after: []
      };
      for (const I of ua(q.name, q.aliases))
        x[I] = q;
      A.push(q);
    }), i.forEach((j) => {
      const q = {
        ...j,
        before: [],
        after: []
      };
      for (const I of ua(q.name, q.aliases))
        x[I] = q;
      C.push(q);
    }), C.forEach((j) => {
      if (j.toMiddleware) {
        const q = x[j.toMiddleware];
        if (q === void 0) {
          if (v)
            return;
          throw new Error(`${j.toMiddleware} is not found when adding ${Un(j.name, j.aliases)} middleware ${j.relation} ${j.toMiddleware}`);
        }
        j.relation === "after" && q.after.push(j), j.relation === "before" && q.before.push(j);
      }
    }), f(A).map(g).reduce((j, q) => (j.push(...q), j), []);
  }, b = {
    add: (v, A = {}) => {
      const { name: C, override: x, aliases: L } = A, j = {
        step: "initialize",
        priority: "normal",
        middleware: v,
        ...A
      }, q = ua(C, L);
      if (q.length > 0) {
        if (q.some((I) => r.has(I))) {
          if (!x)
            throw new Error(`Duplicate middleware name '${Un(C, L)}'`);
          for (const I of q) {
            const F = l.findIndex((Rt) => {
              var Et;
              return Rt.name === I || ((Et = Rt.aliases) == null ? void 0 : Et.some((J) => J === I));
            });
            if (F === -1)
              continue;
            const rt = l[F];
            if (rt.step !== j.step || j.priority !== rt.priority)
              throw new Error(`"${Un(rt.name, rt.aliases)}" middleware with ${rt.priority} priority in ${rt.step} step cannot be overridden by "${Un(C, L)}" middleware with ${j.priority} priority in ${j.step} step.`);
            l.splice(F, 1);
          }
        }
        for (const I of q)
          r.add(I);
      }
      l.push(j);
    },
    addRelativeTo: (v, A) => {
      const { name: C, override: x, aliases: L } = A, j = {
        middleware: v,
        ...A
      }, q = ua(C, L);
      if (q.length > 0) {
        if (q.some((I) => r.has(I))) {
          if (!x)
            throw new Error(`Duplicate middleware name '${Un(C, L)}'`);
          for (const I of q) {
            const F = i.findIndex((Rt) => {
              var Et;
              return Rt.name === I || ((Et = Rt.aliases) == null ? void 0 : Et.some((J) => J === I));
            });
            if (F === -1)
              continue;
            const rt = i[F];
            if (rt.toMiddleware !== j.toMiddleware || rt.relation !== j.relation)
              throw new Error(`"${Un(rt.name, rt.aliases)}" middleware ${rt.relation} "${rt.toMiddleware}" middleware cannot be overridden by "${Un(C, L)}" middleware ${j.relation} "${j.toMiddleware}" middleware.`);
            i.splice(F, 1);
          }
        }
        for (const I of q)
          r.add(I);
      }
      i.push(j);
    },
    clone: () => p(Ku()),
    use: (v) => {
      v.applyToStack(b);
    },
    remove: (v) => typeof v == "string" ? d(v) : y(v),
    removeByTag: (v) => {
      let A = !1;
      const C = (x) => {
        const { tags: L, name: j, aliases: q } = x;
        if (L && L.includes(v)) {
          const I = ua(j, q);
          for (const F of I)
            r.delete(F);
          return A = !0, !1;
        }
        return !0;
      };
      return l = l.filter(C), i = i.filter(C), A;
    },
    concat: (v) => {
      var C;
      const A = p(Ku());
      return A.use(v), A.identifyOnResolve(s || A.identifyOnResolve() || (((C = v.identifyOnResolve) == null ? void 0 : C.call(v)) ?? !1)), A;
    },
    applyToStack: p,
    identify: () => h(!0).map((v) => {
      const A = v.step ?? v.relation + " " + v.toMiddleware;
      return Un(v.name, v.aliases) + " - " + A;
    }),
    identifyOnResolve(v) {
      return typeof v == "boolean" && (s = v), s;
    },
    resolve: (v, A) => {
      for (const C of h().map((x) => x.middleware).reverse())
        v = C(v, A);
      return s && console.log(b.identify()), v;
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
  constructor(i) {
    O(this, "config");
    O(this, "middlewareStack", Ku());
    O(this, "initConfig");
    O(this, "handlers");
    this.config = i;
    const { protocol: s, protocolSettings: r } = i;
    r && typeof s == "function" && (i.protocol = new s(r));
  }
  send(i, s, r) {
    const f = typeof s != "function" ? s : void 0, d = typeof s == "function" ? s : r, y = f === void 0 && this.config.cacheMiddleware === !0;
    let p;
    if (y) {
      this.handlers || (this.handlers = /* @__PURE__ */ new WeakMap());
      const g = this.handlers;
      g.has(i.constructor) ? p = g.get(i.constructor) : (p = i.resolveMiddleware(this.middlewareStack, this.config, f), g.set(i.constructor, p));
    } else
      delete this.handlers, p = i.resolveMiddleware(this.middlewareStack, this.config, f);
    if (d)
      p(i).then((g) => d(null, g.output), (g) => d(g)).catch(() => {
      });
    else
      return p(i).then((g) => g.output);
  }
  destroy() {
    var i, s, r;
    (r = (s = (i = this.config) == null ? void 0 : i.requestHandler) == null ? void 0 : s.destroy) == null || r.call(s), delete this.handlers;
  }
}
const Bc = "***SensitiveInformation***";
function kc(l, i) {
  if (i == null)
    return i;
  const s = ne.of(l);
  if (s.getMergedTraits().sensitive)
    return Bc;
  if (s.isListSchema()) {
    if (!!s.getValueSchema().getMergedTraits().sensitive)
      return Bc;
  } else if (s.isMapSchema()) {
    if (!!s.getKeySchema().getMergedTraits().sensitive || !!s.getValueSchema().getMergedTraits().sensitive)
      return Bc;
  } else if (s.isStructSchema() && typeof i == "object") {
    const r = i, f = {};
    for (const [d, y] of s.structIterator())
      r[d] != null && (f[d] = kc(y, r[d]));
    return f;
  }
  return i;
}
class Pu {
  constructor() {
    O(this, "middlewareStack", Ku());
    O(this, "schema");
  }
  static classBuilder() {
    return new J1();
  }
  resolveMiddlewareWithContext(i, s, r, { middlewareFn: f, clientName: d, commandName: y, inputFilterSensitiveLog: p, outputFilterSensitiveLog: g, smithyContext: h, additionalContext: b, CommandCtor: v }) {
    for (const q of f.bind(this)(v, i, s, r))
      this.middlewareStack.use(q);
    const A = i.concat(this.middlewareStack), { logger: C } = s, x = {
      logger: C,
      clientName: d,
      commandName: y,
      inputFilterSensitiveLog: p,
      outputFilterSensitiveLog: g,
      [Xc]: {
        commandInstance: this,
        ...h
      },
      ...b
    }, { requestHandler: L } = s;
    let j = r ?? {};
    return h.eventStream && (j = {
      isEventStream: !0,
      ...j
    }), A.resolve((q) => L.handle(q.request, j), x);
  }
}
class J1 {
  constructor() {
    O(this, "_init", () => {
    });
    O(this, "_ep", {});
    O(this, "_middlewareFn", () => []);
    O(this, "_commandName", "");
    O(this, "_clientName", "");
    O(this, "_additionalContext", {});
    O(this, "_smithyContext", {});
    O(this, "_inputFilterSensitiveLog");
    O(this, "_outputFilterSensitiveLog");
    O(this, "_serializer", null);
    O(this, "_deserializer", null);
    O(this, "_operationSchema");
  }
  init(i) {
    this._init = i;
  }
  ep(i) {
    return this._ep = i, this;
  }
  m(i) {
    return this._middlewareFn = i, this;
  }
  s(i, s, r = {}) {
    return this._smithyContext = {
      service: i,
      operation: s,
      ...r
    }, this;
  }
  c(i = {}) {
    return this._additionalContext = i, this;
  }
  n(i, s) {
    return this._clientName = i, this._commandName = s, this;
  }
  f(i = (r) => r, s = (r) => r) {
    return this._inputFilterSensitiveLog = i, this._outputFilterSensitiveLog = s, this;
  }
  ser(i) {
    return this._serializer = i, this;
  }
  de(i) {
    return this._deserializer = i, this;
  }
  sc(i) {
    return this._operationSchema = i, this._smithyContext.operationSchema = i, this;
  }
  build() {
    const i = this;
    let s;
    return s = class extends Pu {
      constructor(...[f]) {
        super();
        O(this, "input");
        O(this, "serialize", i._serializer);
        O(this, "deserialize", i._deserializer);
        this.input = f ?? {}, i._init(this), this.schema = i._operationSchema;
      }
      static getEndpointParameterInstructions() {
        return i._ep;
      }
      resolveMiddleware(f, d, y) {
        const p = i._operationSchema, g = (p == null ? void 0 : p[4]) ?? (p == null ? void 0 : p.input), h = (p == null ? void 0 : p[5]) ?? (p == null ? void 0 : p.output);
        return this.resolveMiddlewareWithContext(f, d, y, {
          CommandCtor: s,
          middlewareFn: i._middlewareFn,
          clientName: i._clientName,
          commandName: i._commandName,
          inputFilterSensitiveLog: i._inputFilterSensitiveLog ?? (p ? kc.bind(null, g) : (b) => b),
          outputFilterSensitiveLog: i._outputFilterSensitiveLog ?? (p ? kc.bind(null, h) : (b) => b),
          smithyContext: i._smithyContext,
          additionalContext: i._additionalContext
        });
      }
    };
  }
}
class Wa extends Error {
  constructor(s) {
    super(s.message);
    O(this, "$fault");
    O(this, "$response");
    O(this, "$retryable");
    O(this, "$metadata");
    Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = s.name, this.$fault = s.$fault, this.$metadata = s.$metadata;
  }
  static isInstance(s) {
    if (!s)
      return !1;
    const r = s;
    return Wa.prototype.isPrototypeOf(r) || !!r.$fault && !!r.$metadata && (r.$fault === "client" || r.$fault === "server");
  }
  static [Symbol.hasInstance](s) {
    if (!s)
      return !1;
    const r = s;
    return this === Wa ? Wa.isInstance(s) : Wa.isInstance(s) ? r.name && this.name ? this.prototype.isPrototypeOf(s) || r.name === this.name : this.prototype.isPrototypeOf(s) : !1;
  }
}
const Im = (l, i = {}) => {
  Object.entries(i).filter(([, r]) => r !== void 0).forEach(([r, f]) => {
    (l[r] == null || l[r] === "") && (l[r] = f);
  });
  const s = l.message || l.Message || "UnknownError";
  return l.message = s, delete l.Message, l;
}, k1 = (l) => {
  switch (l) {
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
}, Gy = Object.values(fi), I1 = (l) => {
  const i = [];
  for (const s in fi) {
    const r = fi[s];
    l[r] !== void 0 && i.push({
      algorithmId: () => r,
      checksumConstructor: () => l[r]
    });
  }
  for (const [s, r] of Object.entries(l.checksumAlgorithms ?? {}))
    i.push({
      algorithmId: () => s,
      checksumConstructor: () => r
    });
  return {
    addChecksumAlgorithm(s) {
      l.checksumAlgorithms = l.checksumAlgorithms ?? {};
      const r = s.algorithmId(), f = s.checksumConstructor();
      Gy.includes(r) ? l.checksumAlgorithms[r.toUpperCase()] = f : l.checksumAlgorithms[r] = f, i.push(s);
    },
    checksumAlgorithms() {
      return i;
    }
  };
}, F1 = (l) => {
  const i = {};
  return l.checksumAlgorithms().forEach((s) => {
    const r = s.algorithmId();
    Gy.includes(r) && (i[r] = s.checksumConstructor());
  }), i;
}, W1 = (l) => ({
  setRetryStrategy(i) {
    l.retryStrategy = i;
  },
  retryStrategy() {
    return l.retryStrategy;
  }
}), P1 = (l) => {
  const i = {};
  return i.retryStrategy = l.retryStrategy(), i;
}, tb = (l) => Object.assign(I1(l), W1(l)), eb = (l) => Object.assign(F1(l), P1(l));
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
const nb = (l) => (l == null ? void 0 : l.body) instanceof ReadableStream;
function ab(l, i) {
  var s, r, f, d;
  if (tl.isInstance(l))
    for (const y of Object.keys(l.headers)) {
      const p = y.toLowerCase();
      if (p === "retry-after") {
        const g = l.headers[y];
        let h = NaN;
        if (g.endsWith("GMT"))
          try {
            h = (Ty(g).getTime() - Date.now()) / 1e3;
          } catch (b) {
            (s = i == null ? void 0 : i.trace) == null || s.call(i, "Failed to parse retry-after header"), (r = i == null ? void 0 : i.trace) == null || r.call(i, b);
          }
        else g.match(/ GMT, ((\d+)|(\d+\.\d+))$/) ? h = Number((f = g.match(/ GMT, ([\d.]+)$/)) == null ? void 0 : f[1]) : g.match(/^((\d+)|(\d+\.\d+))$/) ? h = Number(g) : Date.parse(g) >= Date.now() && (h = (Date.parse(g) - Date.now()) / 1e3);
        return isNaN(h) ? void 0 : new Date(Date.now() + h * 1e3);
      } else if (p === "x-amz-retry-after") {
        const g = l.headers[y], h = Number(g);
        if (isNaN(h)) {
          (d = i == null ? void 0 : i.trace) == null || d.call(i, `Failed to parse x-amz-retry-after=${g}`);
          return;
        }
        return new Date(Date.now() + h);
      }
    }
}
const lb = (l) => (i, s) => async (r) => {
  var y;
  let f = await l.retryStrategy();
  const d = await l.maxAttempts();
  if (ib(f)) {
    f = f;
    let p = await f.acquireInitialRetryToken((s.partition_id ?? "") + (s.__retryLongPoll ? ":longpoll" : "")), g = new Error(), h = 0, b = 0;
    const { request: v } = r, A = me.isInstance(v);
    for (A && (v.headers[f1] = Ay()); ; )
      try {
        A && (v.headers[d1] = `attempt=${h + 1}; max=${d}`);
        const { response: C, output: x } = await i(r);
        return f.recordSuccess(p), x.$metadata.attempts = h + 1, x.$metadata.totalRetryDelay = b, { response: C, output: x };
      } catch (C) {
        const x = ub(C, l.logger);
        if (g = Z1(C), A && nb(v))
          throw (y = s.logger instanceof Yy ? console : s.logger) == null || y.warn("An error was encountered in a non-retryable streaming request."), g;
        try {
          p = await f.refreshRetryTokenForRetry(p, x);
        } catch (j) {
          throw typeof j.$backoff == "number" && await Fm(j.$backoff), g.$metadata || (g.$metadata = {}), g.$metadata.attempts = h + 1, g.$metadata.totalRetryDelay = b, g;
        }
        h = p.getRetryCount();
        const L = p.getRetryDelay();
        b += L, await Fm(L);
      }
  } else
    return f = f, f != null && f.mode && (s.userAgent = [...s.userAgent || [], ["cfg/retry-mode", f.mode]]), f.retry(i, r);
}, Fm = (l) => new Promise((i) => setTimeout(i, l)), ib = (l) => typeof l.acquireInitialRetryToken < "u" && typeof l.refreshRetryTokenForRetry < "u" && typeof l.recordSuccess < "u", ub = (l, i) => {
  const s = {
    error: l,
    errorType: sb(l)
  }, r = ab(l.$response, i);
  return r && (s.retryAfterHint = r), s;
}, sb = (l) => By(l) ? "THROTTLING" : lo(l) ? "TRANSIENT" : r1(l) ? "SERVER_ERROR" : "CLIENT_ERROR", rb = {
  name: "retryMiddleware",
  tags: ["RETRY"],
  step: "finalizeRequest",
  priority: "high",
  override: !0
}, cb = (l) => ({
  applyToStack: (i) => {
    i.add(lb(l), rb);
  }
}), Wm = (l) => {
  var i, s;
  return tl.isInstance(l) ? ((i = l.headers) == null ? void 0 : i.date) ?? ((s = l.headers) == null ? void 0 : s.Date) : void 0;
}, Xy = (l) => new Date(Date.now() + l), ob = (l, i) => Math.abs(Xy(i).getTime() - l) >= 3e5, Pm = (l, i) => {
  const s = Date.parse(l);
  return ob(s, i) ? s - Date.now() : i;
}, ci = (l, i) => {
  if (!i)
    throw new Error(`Property \`${l}\` is not resolved for AWS SDK SigV4Auth`);
  return i;
}, fb = async (l) => {
  var h, b, v;
  const i = ci("context", l.context), s = ci("config", l.config), r = (v = (b = (h = i.endpointV2) == null ? void 0 : h.properties) == null ? void 0 : b.authSchemes) == null ? void 0 : v[0], d = await ci("signer", s.signer)(r), y = l == null ? void 0 : l.signingRegion, p = l == null ? void 0 : l.signingRegionSet, g = l == null ? void 0 : l.signingName;
  return {
    config: s,
    signer: d,
    signingRegion: y,
    signingRegionSet: p,
    signingName: g
  };
};
class db {
  async sign(i, s, r) {
    var v;
    if (!me.isInstance(i))
      throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    const f = await fb(r), { config: d, signer: y } = f;
    let { signingRegion: p, signingName: g } = f;
    const h = r.context;
    if (((v = h == null ? void 0 : h.authSchemes) == null ? void 0 : v.length) ?? !1) {
      const [A, C] = h.authSchemes;
      (A == null ? void 0 : A.name) === "sigv4a" && (C == null ? void 0 : C.name) === "sigv4" && (p = (C == null ? void 0 : C.signingRegion) ?? p, g = (C == null ? void 0 : C.signingName) ?? g);
    }
    return await y.sign(i, {
      signingDate: Xy(d.systemClockOffset),
      signingRegion: p,
      signingService: g
    });
  }
  errorHandler(i) {
    return (s) => {
      const r = s.ServerTime ?? Wm(s.$response);
      if (r) {
        const f = ci("config", i.config), d = f.systemClockOffset;
        f.systemClockOffset = Pm(r, f.systemClockOffset), f.systemClockOffset !== d && s.$metadata && (s.$metadata.clockSkewCorrected = !0);
      }
      throw s;
    };
  }
  successHandler(i, s) {
    const r = Wm(i);
    if (r) {
      const f = ci("config", s.config);
      f.systemClockOffset = Pm(r, f.systemClockOffset);
    }
  }
}
const hb = (l, i, s) => {
  let r, f, d, y = !1;
  const p = async () => {
    f || (f = l());
    try {
      r = await f, d = !0, y = !1;
    } finally {
      f = void 0;
    }
    return r;
  };
  return async (g) => ((!d || g != null && g.forceRefresh) && (r = await p()), r);
}, mb = "X-Amz-Algorithm", yb = "X-Amz-Credential", Vy = "X-Amz-Date", gb = "X-Amz-SignedHeaders", pb = "X-Amz-Expires", Zy = "X-Amz-Signature", $y = "X-Amz-Security-Token", Ky = "authorization", Jy = Vy.toLowerCase(), Sb = "date", vb = [Ky, Jy, Sb], bb = Zy.toLowerCase(), Ic = "x-amz-content-sha256", Eb = $y.toLowerCase(), Tb = {
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
}, Ab = /^proxy-/, Rb = /^sec-/, Lc = "AWS4-HMAC-SHA256", _b = "AWS4-HMAC-SHA256-PAYLOAD", wb = "UNSIGNED-PAYLOAD", Cb = 50, ky = "aws4_request", Mb = 3600 * 24 * 7, Lu = {}, jc = [], qc = (l, i, s) => `${l}/${i}/${s}/${ky}`, Ob = async (l, i, s, r, f) => {
  const d = await ty(l, i.secretAccessKey, i.accessKeyId), y = `${s}:${r}:${f}:${oa(d)}:${i.sessionToken}`;
  if (y in Lu)
    return Lu[y];
  for (jc.push(y); jc.length > Cb; )
    delete Lu[jc.shift()];
  let p = `AWS4${i.secretAccessKey}`;
  for (const g of [s, r, f, ky])
    p = await ty(l, p, g);
  return Lu[y] = p;
}, ty = (l, i, s) => {
  const r = new l(i);
  return r.update(di(s)), r.digest();
}, ey = ({ headers: l }, i, s) => {
  const r = {};
  for (const f of Object.keys(l).sort()) {
    if (l[f] == null)
      continue;
    const d = f.toLowerCase();
    (d in Tb || i != null && i.has(d) || Ab.test(d) || Rb.test(d)) && (!s || s && !s.has(d)) || (r[d] = l[f].trim().replace(/\s+/g, " "));
  }
  return r;
}, Db = (l) => typeof ArrayBuffer == "function" && l instanceof ArrayBuffer || Object.prototype.toString.call(l) === "[object ArrayBuffer]", Qc = async ({ headers: l, body: i }, s) => {
  for (const r of Object.keys(l))
    if (r.toLowerCase() === Ic)
      return l[r];
  if (i == null)
    return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  if (typeof i == "string" || ArrayBuffer.isView(i) || Db(i)) {
    const r = new s();
    return r.update(di(i)), oa(await r.digest());
  }
  return wb;
};
class zb {
  format(i) {
    const s = [];
    for (const d of Object.keys(i)) {
      const y = el(d);
      s.push(Uint8Array.from([y.byteLength]), y, this.formatHeaderValue(i[d]));
    }
    const r = new Uint8Array(s.reduce((d, y) => d + y.byteLength, 0));
    let f = 0;
    for (const d of s)
      r.set(d, f), f += d.byteLength;
    return r;
  }
  formatHeaderValue(i) {
    switch (i.type) {
      case "boolean":
        return Uint8Array.from([i.value ? 0 : 1]);
      case "byte":
        return Uint8Array.from([2, i.value]);
      case "short":
        const s = new DataView(new ArrayBuffer(3));
        return s.setUint8(0, 3), s.setInt16(1, i.value, !1), new Uint8Array(s.buffer);
      case "integer":
        const r = new DataView(new ArrayBuffer(5));
        return r.setUint8(0, 4), r.setInt32(1, i.value, !1), new Uint8Array(r.buffer);
      case "long":
        const f = new Uint8Array(9);
        return f[0] = 5, f.set(i.value.bytes, 1), f;
      case "binary":
        const d = new DataView(new ArrayBuffer(3 + i.value.byteLength));
        d.setUint8(0, 6), d.setUint16(1, i.value.byteLength, !1);
        const y = new Uint8Array(d.buffer);
        return y.set(i.value, 3), y;
      case "string":
        const p = el(i.value), g = new DataView(new ArrayBuffer(3 + p.byteLength));
        g.setUint8(0, 7), g.setUint16(1, p.byteLength, !1);
        const h = new Uint8Array(g.buffer);
        return h.set(p, 3), h;
      case "timestamp":
        const b = new Uint8Array(9);
        return b[0] = 8, b.set(uo.fromNumber(i.value.valueOf()).bytes, 1), b;
      case "uuid":
        if (!xb.test(i.value))
          throw new Error(`Invalid UUID received: ${i.value}`);
        const v = new Uint8Array(17);
        return v[0] = 9, v.set(NS(i.value.replace(/\-/g, "")), 1), v;
    }
  }
}
var ny;
(function(l) {
  l[l.boolTrue = 0] = "boolTrue", l[l.boolFalse = 1] = "boolFalse", l[l.byte = 2] = "byte", l[l.short = 3] = "short", l[l.integer = 4] = "integer", l[l.long = 5] = "long", l[l.byteArray = 6] = "byteArray", l[l.string = 7] = "string", l[l.timestamp = 8] = "timestamp", l[l.uuid = 9] = "uuid";
})(ny || (ny = {}));
const xb = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
class uo {
  constructor(i) {
    O(this, "bytes");
    if (this.bytes = i, i.byteLength !== 8)
      throw new Error("Int64 buffers must be exactly 8 bytes");
  }
  static fromNumber(i) {
    if (i > 9223372036854776e3 || i < -9223372036854776e3)
      throw new Error(`${i} is too large (or, if negative, too small) to represent as an Int64`);
    const s = new Uint8Array(8);
    for (let r = 7, f = Math.abs(Math.round(i)); r > -1 && f > 0; r--, f /= 256)
      s[r] = f;
    return i < 0 && ay(s), new uo(s);
  }
  valueOf() {
    const i = this.bytes.slice(0), s = i[0] & 128;
    return s && ay(i), parseInt(oa(i), 16) * (s ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
}
function ay(l) {
  for (let i = 0; i < 8; i++)
    l[i] ^= 255;
  for (let i = 7; i > -1 && (l[i]++, l[i] === 0); i--)
    ;
}
const Nb = (l, i) => {
  l = l.toLowerCase();
  for (const s of Object.keys(i))
    if (l === s.toLowerCase())
      return !0;
  return !1;
}, Ub = (l, i = {}) => {
  var f, d;
  const { headers: s, query: r = {} } = me.clone(l);
  for (const y of Object.keys(s)) {
    const p = y.toLowerCase();
    (p.slice(0, 6) === "x-amz-" && !((f = i.unhoistableHeaders) != null && f.has(p)) || (d = i.hoistableHeaders) != null && d.has(p)) && (r[y] = s[y], delete s[y]);
  }
  return {
    ...l,
    headers: s,
    query: r
  };
}, ly = (l) => {
  l = me.clone(l);
  for (const i of Object.keys(l.headers))
    vb.indexOf(i.toLowerCase()) > -1 && delete l.headers[i];
  return l;
}, Hb = ({ query: l = {} }) => {
  const i = [], s = {};
  for (const r of Object.keys(l)) {
    if (r.toLowerCase() === bb)
      continue;
    const f = ca(r);
    i.push(f);
    const d = l[r];
    typeof d == "string" ? s[f] = `${f}=${ca(d)}` : Array.isArray(d) && (s[f] = d.slice(0).reduce((y, p) => y.concat([`${f}=${ca(p)}`]), []).sort().join("&"));
  }
  return i.sort().map((r) => s[r]).filter((r) => r).join("&");
}, Bb = (l) => Lb(l).toISOString().replace(/\.\d{3}Z$/, "Z"), Lb = (l) => typeof l == "number" ? new Date(l * 1e3) : typeof l == "string" ? Number(l) ? new Date(Number(l) * 1e3) : new Date(l) : l;
class jb {
  constructor({ applyChecksum: i, credentials: s, region: r, service: f, sha256: d, uriEscapePath: y = !0 }) {
    O(this, "service");
    O(this, "regionProvider");
    O(this, "credentialProvider");
    O(this, "sha256");
    O(this, "uriEscapePath");
    O(this, "applyChecksum");
    this.service = f, this.sha256 = d, this.uriEscapePath = y, this.applyChecksum = typeof i == "boolean" ? i : !0, this.regionProvider = sn(r), this.credentialProvider = sn(s);
  }
  createCanonicalRequest(i, s, r) {
    const f = Object.keys(s).sort();
    return `${i.method}
${this.getCanonicalPath(i)}
${Hb(i)}
${f.map((d) => `${d}:${s[d]}`).join(`
`)}

${f.join(";")}
${r}`;
  }
  async createStringToSign(i, s, r, f) {
    const d = new this.sha256();
    d.update(di(r));
    const y = await d.digest();
    return `${f}
${i}
${s}
${oa(y)}`;
  }
  getCanonicalPath({ path: i }) {
    if (this.uriEscapePath) {
      const s = [];
      for (const d of i.split("/"))
        (d == null ? void 0 : d.length) !== 0 && d !== "." && (d === ".." ? s.pop() : s.push(d));
      const r = `${i != null && i.startsWith("/") ? "/" : ""}${s.join("/")}${s.length > 0 && (i != null && i.endsWith("/")) ? "/" : ""}`;
      return ca(r).replace(/%2F/g, "/");
    }
    return i;
  }
  validateResolvedCredentials(i) {
    if (typeof i != "object" || typeof i.accessKeyId != "string" || typeof i.secretAccessKey != "string")
      throw new Error("Resolved credential object is not valid");
  }
  formatDate(i) {
    const s = Bb(i).replace(/[\-:]/g, "");
    return {
      longDate: s,
      shortDate: s.slice(0, 8)
    };
  }
  getCanonicalHeaderList(i) {
    return Object.keys(i).sort().join(";");
  }
}
class iy extends jb {
  constructor({ applyChecksum: s, credentials: r, region: f, service: d, sha256: y, uriEscapePath: p = !0 }) {
    super({
      applyChecksum: s,
      credentials: r,
      region: f,
      service: d,
      sha256: y,
      uriEscapePath: p
    });
    O(this, "headerFormatter", new zb());
  }
  async presign(s, r = {}) {
    const { signingDate: f = /* @__PURE__ */ new Date(), expiresIn: d = 3600, unsignableHeaders: y, unhoistableHeaders: p, signableHeaders: g, hoistableHeaders: h, signingRegion: b, signingService: v } = r, A = await this.credentialProvider();
    this.validateResolvedCredentials(A);
    const C = b ?? await this.regionProvider(), { longDate: x, shortDate: L } = this.formatDate(f);
    if (d > Mb)
      return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
    const j = qc(L, C, v ?? this.service), q = Ub(ly(s), { unhoistableHeaders: p, hoistableHeaders: h });
    A.sessionToken && (q.query[$y] = A.sessionToken), q.query[mb] = Lc, q.query[yb] = `${A.accessKeyId}/${j}`, q.query[Vy] = x, q.query[pb] = d.toString(10);
    const I = ey(q, y, g);
    return q.query[gb] = this.getCanonicalHeaderList(I), q.query[Zy] = await this.getSignature(x, j, this.getSigningKey(A, C, L, v), this.createCanonicalRequest(q, I, await Qc(s, this.sha256))), q;
  }
  async sign(s, r) {
    return typeof s == "string" ? this.signString(s, r) : s.headers && s.payload ? this.signEvent(s, r) : s.message ? this.signMessage(s, r) : this.signRequest(s, r);
  }
  async signEvent({ headers: s, payload: r }, { signingDate: f = /* @__PURE__ */ new Date(), priorSignature: d, signingRegion: y, signingService: p, eventStreamCredentials: g }) {
    const h = y ?? await this.regionProvider(), { shortDate: b, longDate: v } = this.formatDate(f), A = qc(b, h, p ?? this.service), C = await Qc({ headers: {}, body: r }, this.sha256), x = new this.sha256();
    x.update(s);
    const L = oa(await x.digest()), j = [
      _b,
      v,
      A,
      d,
      L,
      C
    ].join(`
`);
    return this.signString(j, {
      signingDate: f,
      signingRegion: h,
      signingService: p,
      eventStreamCredentials: g
    });
  }
  async signMessage(s, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: f, signingService: d, eventStreamCredentials: y }) {
    return this.signEvent({
      headers: this.headerFormatter.format(s.message.headers),
      payload: s.message.body
    }, {
      signingDate: r,
      signingRegion: f,
      signingService: d,
      priorSignature: s.priorSignature,
      eventStreamCredentials: y
    }).then((g) => ({ message: s.message, signature: g }));
  }
  async signString(s, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: f, signingService: d, eventStreamCredentials: y } = {}) {
    const p = y ?? await this.credentialProvider();
    this.validateResolvedCredentials(p);
    const g = f ?? await this.regionProvider(), { shortDate: h } = this.formatDate(r), b = new this.sha256(await this.getSigningKey(p, g, h, d));
    return b.update(di(s)), oa(await b.digest());
  }
  async signRequest(s, { signingDate: r = /* @__PURE__ */ new Date(), signableHeaders: f, unsignableHeaders: d, signingRegion: y, signingService: p } = {}) {
    const g = await this.credentialProvider();
    this.validateResolvedCredentials(g);
    const h = y ?? await this.regionProvider(), b = ly(s), { longDate: v, shortDate: A } = this.formatDate(r), C = qc(A, h, p ?? this.service);
    b.headers[Jy] = v, g.sessionToken && (b.headers[Eb] = g.sessionToken);
    const x = await Qc(b, this.sha256);
    !Nb(Ic, b.headers) && this.applyChecksum && (b.headers[Ic] = x);
    const L = ey(b, d, f), j = await this.getSignature(v, C, this.getSigningKey(g, h, A, p), this.createCanonicalRequest(b, L, x));
    return b.headers[Ky] = `${Lc} Credential=${g.accessKeyId}/${C}, SignedHeaders=${this.getCanonicalHeaderList(L)}, Signature=${j}`, b;
  }
  async getSignature(s, r, f, d) {
    const y = await this.createStringToSign(s, r, d, Lc), p = new this.sha256(await f);
    return p.update(di(y)), oa(await p.digest());
  }
  getSigningKey(s, r, f, d) {
    return Ob(this.sha256, s, f, r, d || this.service);
  }
}
const qb = (l) => {
  let i = l.credentials, s = !!l.credentials, r;
  Object.defineProperty(l, "credentials", {
    set(h) {
      h && h !== i && h !== r && (s = !0), i = h;
      const b = Qb(l, {
        credentials: i,
        credentialDefaultProvider: l.credentialDefaultProvider
      }), v = Gb(l, b);
      if (s && !v.attributed) {
        const A = typeof i == "object" && i !== null;
        r = async (C) => {
          const L = await v(C);
          return A && (!L.$source || Object.keys(L.$source).length === 0) ? Wv(L, "CREDENTIALS_CODE", "e") : L;
        }, r.memoized = v.memoized, r.configBound = v.configBound, r.attributed = !0;
      } else
        r = v;
    },
    get() {
      return r;
    },
    enumerable: !0,
    configurable: !0
  }), l.credentials = i;
  const { signingEscapePath: f = !0, systemClockOffset: d = l.systemClockOffset || 0, sha256: y } = l;
  let p;
  return l.signer ? p = ui(l.signer) : l.regionInfoProvider ? p = () => ui(l.region)().then(async (h) => [
    await l.regionInfoProvider(h, {
      useFipsEndpoint: await l.useFipsEndpoint(),
      useDualstackEndpoint: await l.useDualstackEndpoint()
    }) || {},
    h
  ]).then(([h, b]) => {
    const { signingRegion: v, signingService: A } = h;
    l.signingRegion = l.signingRegion || v || b, l.signingName = l.signingName || A || l.serviceId;
    const C = {
      ...l,
      credentials: l.credentials,
      region: l.signingRegion,
      service: l.signingName,
      sha256: y,
      uriEscapePath: f
    }, x = l.signerConstructor || iy;
    return new x(C);
  }) : p = async (h) => {
    h = Object.assign({}, {
      name: "sigv4",
      signingName: l.signingName || l.defaultSigningName,
      signingRegion: await ui(l.region)(),
      properties: {}
    }, h);
    const b = h.signingRegion, v = h.signingName;
    l.signingRegion = l.signingRegion || b, l.signingName = l.signingName || v || l.serviceId;
    const A = {
      ...l,
      credentials: l.credentials,
      region: l.signingRegion,
      service: l.signingName,
      sha256: y,
      uriEscapePath: f
    }, C = l.signerConstructor || iy;
    return new C(A);
  }, Object.assign(l, {
    systemClockOffset: d,
    signingEscapePath: f,
    signer: p
  });
};
function Qb(l, { credentials: i, credentialDefaultProvider: s }) {
  let r;
  return i ? i != null && i.memoized ? r = i : r = Ev(i, bv, _y) : s ? r = ui(s(Object.assign({}, l, {
    parentClientConfig: l
  }))) : r = async () => {
    throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
  }, r.memoized = !0, r;
}
function Gb(l, i) {
  if (i.configBound)
    return i;
  const s = async (r) => i({ ...r, callerClientConfig: l });
  return s.memoized = i.memoized, s.configBound = !0, s;
}
const Yb = async (l, i, s) => ({
  operation: al(i).operation,
  region: await sn(l.region)() || (() => {
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })()
});
function Xb(l) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "athena",
      region: l.region
    },
    propertiesExtractor: (i, s) => ({
      signingProperties: {
        config: i,
        context: s
      }
    })
  };
}
const Vb = (l) => {
  const i = [];
  switch (l.operation) {
    default:
      i.push(Xb(l));
  }
  return i;
}, Zb = (l) => {
  const i = qb(l);
  return Object.assign(i, {
    authSchemePreference: sn(l.authSchemePreference ?? [])
  });
}, $b = (l) => Object.assign(l, {
  useDualstackEndpoint: l.useDualstackEndpoint ?? !1,
  useFipsEndpoint: l.useFipsEndpoint ?? !1,
  defaultSigningName: "athena"
}), so = {
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
}, Kb = "3.1033.0", Jb = {
  version: Kb
}, kb = (l) => new TextEncoder().encode(l);
var Ib = typeof Buffer < "u" && Buffer.from ? function(l) {
  return Buffer.from(l, "utf8");
} : kb;
function mi(l) {
  return l instanceof Uint8Array ? l : typeof l == "string" ? Ib(l) : ArrayBuffer.isView(l) ? new Uint8Array(l.buffer, l.byteOffset, l.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(l);
}
function Fc(l) {
  return typeof l == "string" ? l.length === 0 : l.byteLength === 0;
}
var Iy = { name: "SHA-256" }, uy = {
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
function Yu() {
  return typeof window < "u" ? window : typeof self < "u" ? self : Wb;
}
var Pb = (
  /** @class */
  (function() {
    function l(i) {
      this.toHash = new Uint8Array(0), this.secret = i, this.reset();
    }
    return l.prototype.update = function(i) {
      if (!Fc(i)) {
        var s = mi(i), r = new Uint8Array(this.toHash.byteLength + s.byteLength);
        r.set(this.toHash, 0), r.set(s, this.toHash.byteLength), this.toHash = r;
      }
    }, l.prototype.digest = function() {
      var i = this;
      return this.key ? this.key.then(function(s) {
        return Yu().crypto.subtle.sign(uy, s, i.toHash).then(function(r) {
          return new Uint8Array(r);
        });
      }) : Fc(this.toHash) ? Promise.resolve(Fb) : Promise.resolve().then(function() {
        return Yu().crypto.subtle.digest(Iy, i.toHash);
      }).then(function(s) {
        return Promise.resolve(new Uint8Array(s));
      });
    }, l.prototype.reset = function() {
      var i = this;
      this.toHash = new Uint8Array(0), this.secret && this.secret !== void 0 && (this.key = new Promise(function(s, r) {
        Yu().crypto.subtle.importKey("raw", mi(i.secret), uy, !1, ["sign"]).then(s, r);
      }), this.key.catch(function() {
      }));
    }, l;
  })()
);
function tE(l, i, s, r) {
  function f(d) {
    return d instanceof s ? d : new s(function(y) {
      y(d);
    });
  }
  return new (s || (s = Promise))(function(d, y) {
    function p(b) {
      try {
        h(r.next(b));
      } catch (v) {
        y(v);
      }
    }
    function g(b) {
      try {
        h(r.throw(b));
      } catch (v) {
        y(v);
      }
    }
    function h(b) {
      b.done ? d(b.value) : f(b.value).then(p, g);
    }
    h((r = r.apply(l, i || [])).next());
  });
}
function eE(l, i) {
  var s = { label: 0, sent: function() {
    if (d[0] & 1) throw d[1];
    return d[1];
  }, trys: [], ops: [] }, r, f, d, y = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
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
    for (; y && (y = 0, h[0] && (s = 0)), s; ) try {
      if (r = 1, f && (d = h[0] & 2 ? f.return : h[0] ? f.throw || ((d = f.return) && d.call(f), 0) : f.next) && !(d = d.call(f, h[1])).done) return d;
      switch (f = 0, d && (h = [h[0] & 2, d.value]), h[0]) {
        case 0:
        case 1:
          d = h;
          break;
        case 4:
          return s.label++, { value: h[1], done: !1 };
        case 5:
          s.label++, f = h[1], h = [0];
          continue;
        case 7:
          h = s.ops.pop(), s.trys.pop();
          continue;
        default:
          if (d = s.trys, !(d = d.length > 0 && d[d.length - 1]) && (h[0] === 6 || h[0] === 2)) {
            s = 0;
            continue;
          }
          if (h[0] === 3 && (!d || h[1] > d[0] && h[1] < d[3])) {
            s.label = h[1];
            break;
          }
          if (h[0] === 6 && s.label < d[1]) {
            s.label = d[1], d = h;
            break;
          }
          if (d && s.label < d[2]) {
            s.label = d[2], s.ops.push(h);
            break;
          }
          d[2] && s.ops.pop(), s.trys.pop();
          continue;
      }
      h = i.call(l, s);
    } catch (b) {
      h = [6, b], f = 0;
    } finally {
      r = d = 0;
    }
    if (h[0] & 5) throw h[1];
    return { value: h[0] ? h[1] : void 0, done: !0 };
  }
}
var _e = 64, nE = 32, aE = new Uint32Array([
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
]), lE = [
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
], iE = Math.pow(2, 53) - 1, Xu = (
  /** @class */
  (function() {
    function l() {
      this.state = Int32Array.from(lE), this.temp = new Int32Array(64), this.buffer = new Uint8Array(64), this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1;
    }
    return l.prototype.update = function(i) {
      if (this.finished)
        throw new Error("Attempted to update an already finished hash.");
      var s = 0, r = i.byteLength;
      if (this.bytesHashed += r, this.bytesHashed * 8 > iE)
        throw new Error("Cannot hash more than 2^53 - 1 bits");
      for (; r > 0; )
        this.buffer[this.bufferLength++] = i[s++], r--, this.bufferLength === _e && (this.hashBuffer(), this.bufferLength = 0);
    }, l.prototype.digest = function() {
      if (!this.finished) {
        var i = this.bytesHashed * 8, s = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength), r = this.bufferLength;
        if (s.setUint8(this.bufferLength++, 128), r % _e >= _e - 8) {
          for (var f = this.bufferLength; f < _e; f++)
            s.setUint8(f, 0);
          this.hashBuffer(), this.bufferLength = 0;
        }
        for (var f = this.bufferLength; f < _e - 8; f++)
          s.setUint8(f, 0);
        s.setUint32(_e - 8, Math.floor(i / 4294967296), !0), s.setUint32(_e - 4, i), this.hashBuffer(), this.finished = !0;
      }
      for (var d = new Uint8Array(nE), f = 0; f < 8; f++)
        d[f * 4] = this.state[f] >>> 24 & 255, d[f * 4 + 1] = this.state[f] >>> 16 & 255, d[f * 4 + 2] = this.state[f] >>> 8 & 255, d[f * 4 + 3] = this.state[f] >>> 0 & 255;
      return d;
    }, l.prototype.hashBuffer = function() {
      for (var i = this, s = i.buffer, r = i.state, f = r[0], d = r[1], y = r[2], p = r[3], g = r[4], h = r[5], b = r[6], v = r[7], A = 0; A < _e; A++) {
        if (A < 16)
          this.temp[A] = (s[A * 4] & 255) << 24 | (s[A * 4 + 1] & 255) << 16 | (s[A * 4 + 2] & 255) << 8 | s[A * 4 + 3] & 255;
        else {
          var C = this.temp[A - 2], x = (C >>> 17 | C << 15) ^ (C >>> 19 | C << 13) ^ C >>> 10;
          C = this.temp[A - 15];
          var L = (C >>> 7 | C << 25) ^ (C >>> 18 | C << 14) ^ C >>> 3;
          this.temp[A] = (x + this.temp[A - 7] | 0) + (L + this.temp[A - 16] | 0);
        }
        var j = (((g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7)) + (g & h ^ ~g & b) | 0) + (v + (aE[A] + this.temp[A] | 0) | 0) | 0, q = ((f >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10)) + (f & d ^ f & y ^ d & y) | 0;
        v = b, b = h, h = g, g = p + j | 0, p = y, y = d, d = f, f = j + q | 0;
      }
      r[0] += f, r[1] += d, r[2] += y, r[3] += p, r[4] += g, r[5] += h, r[6] += b, r[7] += v;
    }, l;
  })()
), uE = (
  /** @class */
  (function() {
    function l(i) {
      this.secret = i, this.hash = new Xu(), this.reset();
    }
    return l.prototype.update = function(i) {
      if (!(Fc(i) || this.error))
        try {
          this.hash.update(mi(i));
        } catch (s) {
          this.error = s;
        }
    }, l.prototype.digestSync = function() {
      if (this.error)
        throw this.error;
      return this.outer ? (this.outer.finished || this.outer.update(this.hash.digest()), this.outer.digest()) : this.hash.digest();
    }, l.prototype.digest = function() {
      return tE(this, void 0, void 0, function() {
        return eE(this, function(i) {
          return [2, this.digestSync()];
        });
      });
    }, l.prototype.reset = function() {
      if (this.hash = new Xu(), this.secret) {
        this.outer = new Xu();
        var i = sE(this.secret), s = new Uint8Array(_e);
        s.set(i);
        for (var r = 0; r < _e; r++)
          i[r] ^= 54, s[r] ^= 92;
        this.hash.update(i), this.outer.update(s);
        for (var r = 0; r < i.byteLength; r++)
          i[r] = 0;
      }
    }, l;
  })()
);
function sE(l) {
  var i = mi(l);
  if (i.byteLength > _e) {
    var s = new Xu();
    s.update(i), i = s.digest();
  }
  var r = new Uint8Array(_e);
  return r.set(i), r;
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
function cE(l) {
  if (oE(l) && typeof l.crypto.subtle == "object") {
    var i = l.crypto.subtle;
    return fE(i);
  }
  return !1;
}
function oE(l) {
  if (typeof l == "object" && typeof l.crypto == "object") {
    var i = l.crypto.getRandomValues;
    return typeof i == "function";
  }
  return !1;
}
function fE(l) {
  return l && rE.every(function(i) {
    return typeof l[i] == "function";
  });
}
var dE = (
  /** @class */
  (function() {
    function l(i) {
      cE(Yu()) ? this.hash = new Pb(i) : this.hash = new uE(i);
    }
    return l.prototype.update = function(i, s) {
      this.hash.update(mi(i));
    }, l.prototype.digest = function() {
      return this.hash.digest();
    }, l.prototype.reset = function() {
      this.hash.reset();
    }, l;
  })()
);
const hE = ({ serviceId: l, clientVersion: i }) => async (s) => {
  var C, x, L;
  const r = typeof window < "u" ? window.navigator : void 0, f = (r == null ? void 0 : r.userAgent) ?? "", d = ((C = r == null ? void 0 : r.userAgentData) == null ? void 0 : C.platform) ?? sy.os(f) ?? "other", y = void 0, p = ((x = r == null ? void 0 : r.userAgentData) == null ? void 0 : x.brands) ?? [], g = p[p.length - 1], h = (g == null ? void 0 : g.brand) ?? sy.browser(f) ?? "unknown", b = (g == null ? void 0 : g.version) ?? "unknown", v = [
    ["aws-sdk-js", i],
    ["ua", "2.1"],
    [`os/${d}`, y],
    ["lang/js"],
    ["md/browser", `${h}_${b}`]
  ];
  l && v.push([`api/${l}`, i]);
  const A = await ((L = s == null ? void 0 : s.userAgentAppId) == null ? void 0 : L.call(s));
  return A && v.push([`app/${A}`]), v;
}, sy = {
  os(l) {
    if (/iPhone|iPad|iPod/.test(l))
      return "iOS";
    if (/Macintosh|Mac OS X/.test(l))
      return "macOS";
    if (/Windows NT/.test(l))
      return "Windows";
    if (/Android/.test(l))
      return "Android";
    if (/Linux/.test(l))
      return "Linux";
  },
  browser(l) {
    if (/EdgiOS|EdgA|Edg\//.test(l))
      return "Microsoft Edge";
    if (/Firefox\//.test(l))
      return "Firefox";
    if (/Chrome\//.test(l))
      return "Chrome";
    if (/Safari\//.test(l))
      return "Safari";
  }
}, mE = (l) => () => Promise.reject(l), ry = typeof TextEncoder == "function" ? new TextEncoder() : null, yE = (l) => {
  if (typeof l == "string") {
    if (ry)
      return ry.encode(l).byteLength;
    let i = l.length;
    for (let s = i - 1; s >= 0; s--) {
      const r = l.charCodeAt(s);
      r > 127 && r <= 2047 ? i++ : r > 2047 && r <= 65535 && (i += 2), r >= 56320 && r <= 57343 && s--;
    }
    return i;
  } else {
    if (typeof l.byteLength == "number")
      return l.byteLength;
    if (typeof l.size == "number")
      return l.size;
  }
  throw new Error(`Body Length computation failed for ${l}`);
}, gE = ["in-region", "cross-region", "mobile", "standard", "legacy"], pE = ({ defaultsMode: l } = {}) => hb(async () => {
  const i = typeof l == "function" ? await l() : l;
  switch (i == null ? void 0 : i.toLowerCase()) {
    case "auto":
      return Promise.resolve(SE() ? "mobile" : "standard");
    case "mobile":
    case "in-region":
    case "cross-region":
    case "standard":
    case "legacy":
      return Promise.resolve(i == null ? void 0 : i.toLocaleLowerCase());
    case void 0:
      return Promise.resolve("legacy");
    default:
      throw new Error(`Invalid parameter for "defaultsMode", expect ${gE.join(", ")}, got ${i}`);
  }
}), SE = () => {
  var i;
  const l = window == null ? void 0 : window.navigator;
  if (l != null && l.connection) {
    const { effectiveType: s, rtt: r, downlink: f } = l == null ? void 0 : l.connection;
    if (typeof s == "string" && s !== "4g" || Number(r) > 100 || Number(f) < 10)
      return !0;
  }
  return ((i = l == null ? void 0 : l.userAgentData) == null ? void 0 : i.mobile) || typeof (l == null ? void 0 : l.maxTouchPoints) == "number" && (l == null ? void 0 : l.maxTouchPoints) > 1;
};
class vE {
  constructor(i = !1) {
    O(this, "queryCompat");
    O(this, "errorRegistry");
    this.queryCompat = i;
  }
  resolveRestContentType(i, s) {
    const r = s.getMemberSchemas(), f = Object.values(r).find((d) => !!d.getMergedTraits().httpPayload);
    if (f) {
      const d = f.getMergedTraits().mediaType;
      return d || (f.isStringSchema() ? "text/plain" : f.isBlobSchema() ? "application/octet-stream" : i);
    } else if (!s.isUnitSchema() && Object.values(r).find((y) => {
      const { httpQuery: p, httpQueryParams: g, httpHeader: h, httpLabel: b, httpPrefixHeaders: v } = y.getMergedTraits();
      return !p && !g && !h && !b && v === void 0;
    }))
      return i;
  }
  async getErrorSchemaOrThrowBaseException(i, s, r, f, d, y) {
    var h, b;
    let p = i;
    i.includes("#") && ([, p] = i.split("#"));
    const g = {
      $metadata: d,
      $fault: r.statusCode < 500 ? "client" : "server"
    };
    if (!this.errorRegistry)
      throw new Error("@aws-sdk/core/protocols - error handler not initialized.");
    try {
      return { errorSchema: (y == null ? void 0 : y(this.errorRegistry, p)) ?? this.errorRegistry.getSchema(i), errorMetadata: g };
    } catch {
      f.message = f.message ?? f.Message ?? "UnknownError";
      const A = this.errorRegistry, C = A.getBaseException();
      if (C) {
        const j = A.getErrorCtor(C) ?? Error;
        throw this.decorateServiceException(Object.assign(new j({ name: p }), g), f);
      }
      const x = f, L = (x == null ? void 0 : x.message) ?? (x == null ? void 0 : x.Message) ?? ((h = x == null ? void 0 : x.Error) == null ? void 0 : h.Message) ?? ((b = x == null ? void 0 : x.Error) == null ? void 0 : b.message);
      throw this.decorateServiceException(Object.assign(new Error(L), {
        name: p
      }, g), f);
    }
  }
  compose(i, s, r) {
    let f = r;
    s.includes("#") && ([f] = s.split("#"));
    const d = fa.for(f), y = fa.for("smithy.ts.sdk.synthetic." + r);
    i.copyFrom(d), i.copyFrom(y), this.errorRegistry = i;
  }
  decorateServiceException(i, s = {}) {
    var r, f, d, y;
    if (this.queryCompat) {
      const p = i.Message ?? s.Message, g = Im(i, s);
      p && (g.message = p);
      const h = g.Error ?? {};
      h.Type = (r = g.Error) == null ? void 0 : r.Type, h.Code = (f = g.Error) == null ? void 0 : f.Code, h.Message = ((d = g.Error) == null ? void 0 : d.message) ?? ((y = g.Error) == null ? void 0 : y.Message) ?? p, g.Error = h;
      const b = g.$metadata.requestId;
      return b && (g.RequestId = b), g;
    }
    return Im(i, s);
  }
  setQueryCompatError(i, s) {
    var f;
    const r = (f = s.headers) == null ? void 0 : f["x-amzn-query-error"];
    if (i !== void 0 && r != null) {
      const [d, y] = r.split(";"), p = Object.keys(i), g = {
        Code: d,
        Type: y
      };
      i.Code = d, i.Type = y;
      for (let h = 0; h < p.length; h++) {
        const b = p[h];
        g[b === "message" ? "Message" : b] = i[b];
      }
      delete g.__type, i.Error = g;
    }
  }
  queryCompatOutput(i, s) {
    i.Error && (s.Error = i.Error), i.Type && (s.Type = i.Type), i.Code && (s.Code = i.Code);
  }
  findQueryCompatibleError(i, s) {
    try {
      return i.getSchema(s);
    } catch {
      return i.find((f) => {
        var d;
        return ((d = ne.of(f).getMergedTraits().awsQueryError) == null ? void 0 : d[0]) === s;
      });
    }
  }
}
class ro {
  constructor() {
    O(this, "serdeContext");
  }
  setSerdeContext(i) {
    this.serdeContext = i;
  }
}
class bE {
  constructor(i, s) {
    O(this, "from");
    O(this, "to");
    O(this, "keys");
    this.from = i, this.to = s;
    const r = Object.keys(this.from), f = new Set(r);
    f.delete("__type"), this.keys = f;
  }
  mark(i) {
    this.keys.delete(i);
  }
  hasUnknown() {
    return this.keys.size === 1 && Object.keys(this.to).length === 0;
  }
  writeUnknown() {
    if (this.hasUnknown()) {
      const i = this.keys.values().next().value, s = this.from[i];
      this.to.$unknown = [i, s];
    }
  }
}
function EE(l, i, s) {
  if (s != null && s.source) {
    const r = s.source;
    if (typeof i == "number" && (i > Number.MAX_SAFE_INTEGER || i < Number.MIN_SAFE_INTEGER || r !== String(i)))
      return r.includes(".") ? new qe(r, "bigDecimal") : BigInt(r);
  }
  return i;
}
const TE = (l, i) => Zc(l, i).then((s) => ((i == null ? void 0 : i.utf8Encoder) ?? Pc)(s)), AE = (l, i) => TE(l, i).then((s) => {
  if (s.length)
    try {
      return JSON.parse(s);
    } catch (r) {
      throw (r == null ? void 0 : r.name) === "SyntaxError" && Object.defineProperty(r, "$responseBodyText", {
        value: s
      }), r;
    }
  return {};
}), cy = (l, i) => Object.keys(l).find((s) => s.toLowerCase() === i.toLowerCase()), Gc = (l) => {
  let i = l;
  return typeof i == "number" && (i = i.toString()), i.indexOf(",") >= 0 && (i = i.split(",")[0]), i.indexOf(":") >= 0 && (i = i.split(":")[0]), i.indexOf("#") >= 0 && (i = i.split("#")[1]), i;
}, RE = (l, i) => {
  const s = cy(l.headers, "x-amzn-errortype");
  if (s !== void 0)
    return Gc(l.headers[s]);
  if (i && typeof i == "object") {
    const r = cy(i, "code");
    if (r && i[r] !== void 0)
      return Gc(i[r]);
    if (i.__type !== void 0)
      return Gc(i.__type);
  }
};
class _E extends ro {
  constructor(s) {
    super();
    O(this, "settings");
    this.settings = s;
  }
  async read(s, r) {
    return this._read(s, typeof r == "string" ? JSON.parse(r, EE) : await AE(r, this.serdeContext));
  }
  readObject(s, r) {
    return this._read(s, r);
  }
  _read(s, r) {
    const f = r !== null && typeof r == "object", d = ne.of(s);
    if (f) {
      if (d.isStructSchema()) {
        const p = r, g = d.isUnionSchema(), h = {};
        let b;
        const { jsonName: v } = this.settings;
        v && (b = {});
        let A;
        g && (A = new bE(p, h));
        for (const [C, x] of d.structIterator()) {
          let L = C;
          v && (L = x.getMergedTraits().jsonName ?? L, b[L] = C), g && A.mark(L), p[L] != null && (h[C] = this._read(x, p[L]));
        }
        if (g)
          A.writeUnknown();
        else if (typeof p.__type == "string")
          for (const C in p) {
            const x = p[C], L = v ? b[C] ?? C : C;
            L in h || (h[L] = x);
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
      return ku(r);
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
          return lv(r);
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
      if (f) {
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
    O(this, "values", /* @__PURE__ */ new Map());
    O(this, "counter", 0);
    O(this, "stage", 0);
  }
  createReplacer() {
    if (this.stage === 1)
      throw new Error("@aws-sdk/core/protocols - JsonReplacer already created.");
    if (this.stage === 2)
      throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
    return this.stage = 1, (i, s) => {
      if (s instanceof qe) {
        const r = `${oy + "nv" + this.counter++}_` + s.string;
        return this.values.set(`"${r}"`, s.string), r;
      }
      if (typeof s == "bigint") {
        const r = s.toString(), f = `${oy + "b" + this.counter++}_` + r;
        return this.values.set(`"${f}"`, r), f;
      }
      return s;
    };
  }
  replaceInJson(i) {
    if (this.stage === 0)
      throw new Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
    if (this.stage === 2)
      throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
    if (this.stage = 2, this.counter === 0)
      return i;
    for (const [s, r] of this.values)
      i = i.replace(s, r);
    return i;
  }
}
class CE extends ro {
  constructor(s) {
    super();
    O(this, "settings");
    O(this, "buffer");
    O(this, "useReplacer", !1);
    O(this, "rootSchema");
    this.settings = s;
  }
  write(s, r) {
    this.rootSchema = ne.of(s), this.buffer = this._write(this.rootSchema, r);
  }
  flush() {
    const { rootSchema: s, useReplacer: r } = this;
    if (this.rootSchema = void 0, this.useReplacer = !1, s != null && s.isStructSchema() || s != null && s.isDocumentSchema()) {
      if (!r)
        return JSON.stringify(this.buffer);
      const f = new wE();
      return f.replaceInJson(JSON.stringify(this.buffer, f.createReplacer(), 0));
    }
    return this.buffer;
  }
  writeDiscriminatedDocument(s, r) {
    this.write(s, r), typeof this.buffer == "object" && (this.buffer.__type = ne.of(s).getName(!0));
  }
  _write(s, r, f) {
    var p, g;
    const d = r !== null && typeof r == "object", y = ne.of(s);
    if (d) {
      if (y.isStructSchema()) {
        const h = r, b = {}, { jsonName: v } = this.settings;
        let A;
        v && (A = {});
        let C = 0;
        for (const [x, L] of y.structIterator()) {
          const j = this._write(L, h[x], y);
          if (j !== void 0) {
            let q = x;
            v && (q = L.getMergedTraits().jsonName ?? x, A[x] = q), b[q] = j, C++;
          }
        }
        if (y.isUnionSchema() && C === 0) {
          const { $unknown: x } = h;
          if (Array.isArray(x)) {
            const [L, j] = x;
            b[L] = this._write(15, j);
          }
        } else if (typeof h.__type == "string")
          for (const x in h) {
            const L = h[x], j = v ? A[x] ?? x : x;
            j in b || (b[j] = this._write(15, L));
          }
        return b;
      }
      if (Array.isArray(r) && y.isListSchema()) {
        const h = y.getValueSchema(), b = [], v = !!y.getMergedTraits().sparse;
        for (const A of r)
          (v || A != null) && b.push(this._write(h, A));
        return b;
      }
      if (y.isMapSchema()) {
        const h = y.getValueSchema(), b = {}, v = !!y.getMergedTraits().sparse;
        for (const A in r) {
          const C = r[A];
          (v || C != null) && (b[A] = this._write(h, C));
        }
        return b;
      }
      if (r instanceof Uint8Array && (y.isBlobSchema() || y.isDocumentSchema()))
        return y === this.rootSchema ? r : (((p = this.serdeContext) == null ? void 0 : p.base64Encoder) ?? Vu)(r);
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
    if (!(r === null && (f != null && f.isStructSchema()))) {
      if (y.isStringSchema()) {
        if (typeof r > "u" && y.isIdempotencyToken())
          return Ay();
        const h = y.getMergedTraits().mediaType;
        return r != null && h && (h === "application/json" || h.endsWith("+json")) ? Ln.from(r) : r;
      }
      if (typeof r == "number" && y.isNumericSchema())
        return Math.abs(r) === 1 / 0 || isNaN(r) ? String(r) : r;
      if (typeof r == "string" && y.isBlobSchema())
        return y === this.rootSchema ? r : (((g = this.serdeContext) == null ? void 0 : g.base64Encoder) ?? Vu)(r);
      if (typeof r == "bigint" && (this.useReplacer = !0), y.isDocumentSchema())
        if (d) {
          const h = Array.isArray(r) ? [] : {};
          for (const b in r) {
            const v = r[b];
            v instanceof qe ? (this.useReplacer = !0, h[b] = v) : h[b] = this._write(y, v);
          }
          return h;
        } else
          return structuredClone(r);
      return r;
    }
  }
}
class ME extends ro {
  constructor(s) {
    super();
    O(this, "settings");
    this.settings = s;
  }
  createSerializer() {
    const s = new CE(this.settings);
    return s.setSerdeContext(this.serdeContext), s;
  }
  createDeserializer() {
    const s = new _E(this.settings);
    return s.setSerdeContext(this.serdeContext), s;
  }
}
class OE extends yv {
  constructor({ defaultNamespace: s, errorTypeRegistries: r, serviceTarget: f, awsQueryCompatible: d, jsonCodec: y }) {
    super({
      defaultNamespace: s,
      errorTypeRegistries: r
    });
    O(this, "serializer");
    O(this, "deserializer");
    O(this, "serviceTarget");
    O(this, "codec");
    O(this, "mixin");
    O(this, "awsQueryCompatible");
    this.serviceTarget = f, this.codec = y ?? new ME({
      timestampFormat: {
        useTrait: !0,
        default: 7
      },
      jsonName: !1
    }), this.serializer = this.codec.createSerializer(), this.deserializer = this.codec.createDeserializer(), this.awsQueryCompatible = !!d, this.mixin = new vE(this.awsQueryCompatible);
  }
  async serializeRequest(s, r, f) {
    const d = await super.serializeRequest(s, r, f);
    return d.path.endsWith("/") || (d.path += "/"), d.headers["content-type"] = `application/x-amz-json-${this.getJsonRpcVersion()}`, d.headers["x-amz-target"] = `${this.serviceTarget}.${s.name}`, this.awsQueryCompatible && (d.headers["x-amzn-query-mode"] = "true"), (Qu(s.input) === "unit" || !d.body) && (d.body = "{}"), d;
  }
  getPayloadCodec() {
    return this.codec;
  }
  async handleError(s, r, f, d, y) {
    this.awsQueryCompatible && this.mixin.setQueryCompatError(d, f);
    const p = RE(f, d) ?? "Unknown";
    this.mixin.compose(this.compositeErrorRegistry, p, this.options.defaultNamespace);
    const { errorSchema: g, errorMetadata: h } = await this.mixin.getErrorSchemaOrThrowBaseException(p, this.options.defaultNamespace, f, d, y, this.awsQueryCompatible ? this.mixin.findQueryCompatibleError : void 0), b = ne.of(g), v = d.message ?? d.Message ?? "UnknownError", A = this.compositeErrorRegistry.getErrorCtor(g) ?? Error, C = new A(v), x = {}, L = this.codec.createDeserializer();
    for (const [j, q] of b.structIterator())
      d[j] != null && (x[j] = L.readObject(q, d[j]));
    throw this.awsQueryCompatible && this.mixin.queryCompatOutput(d, x), this.mixin.decorateServiceException(Object.assign(C, h, {
      $fault: b.getMergedTraits().error,
      message: v
    }, x), d);
  }
}
class DE extends OE {
  constructor({ defaultNamespace: i, errorTypeRegistries: s, serviceTarget: r, awsQueryCompatible: f, jsonCodec: d }) {
    super({
      defaultNamespace: i,
      errorTypeRegistries: s,
      serviceTarget: r,
      awsQueryCompatible: f,
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
const yi = "ref", sa = -1, ju = !0, fy = "isSet", Fy = "PartitionResult", qu = "booleanEquals", dy = "getAttr", hy = { [yi]: "Endpoint" }, my = { [yi]: Fy }, ai = {}, yy = [{ [yi]: "Region" }], gy = {
  conditions: [
    [fy, [hy]],
    [fy, yy],
    ["aws.partition", yy, Fy],
    [qu, [{ [yi]: "UseFIPS" }, ju]],
    [qu, [{ [yi]: "UseDualStack" }, ju]],
    [qu, [{ fn: dy, argv: [my, "supportsDualStack"] }, ju]],
    [qu, [{ fn: dy, argv: [my, "supportsFIPS"] }, ju]]
  ],
  results: [
    [sa],
    [sa, "Invalid Configuration: FIPS and custom endpoint are not supported"],
    [sa, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
    [hy, ai],
    ["https://athena-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", ai],
    [sa, "FIPS and DualStack are enabled, but this partition does not support one or both"],
    ["https://athena-fips.{Region}.{PartitionResult#dnsSuffix}", ai],
    [sa, "FIPS is enabled but this partition does not support FIPS"],
    ["https://athena.{Region}.{PartitionResult#dualStackDnsSuffix}", ai],
    [sa, "DualStack is enabled but this partition does not support DualStack"],
    ["https://athena.{Region}.{PartitionResult#dnsSuffix}", ai],
    [sa, "Invalid Configuration: Missing Region"]
  ]
}, zE = 2, he = 1e8, xE = new Int32Array([
  -1,
  1,
  -1,
  0,
  12,
  3,
  1,
  4,
  he + 11,
  2,
  5,
  he + 11,
  3,
  8,
  6,
  4,
  7,
  he + 10,
  5,
  he + 8,
  he + 9,
  4,
  10,
  9,
  6,
  he + 6,
  he + 7,
  5,
  11,
  he + 5,
  6,
  he + 4,
  he + 5,
  3,
  he + 1,
  13,
  4,
  he + 2,
  he + 3
]), NE = no.from(xE, zE, gy.conditions, gy.results), UE = new _v({
  size: 50,
  params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
}), HE = (l, i = {}) => UE.get(l, () => Zv(NE, {
  endpointParams: l,
  logger: i.logger
}));
ao.aws = Hy;
class rn extends Wa {
  constructor(i) {
    super(i), Object.setPrototypeOf(this, rn.prototype);
  }
}
class co extends rn {
  constructor(s) {
    super({
      name: "InternalServerException",
      $fault: "server",
      ...s
    });
    O(this, "name", "InternalServerException");
    O(this, "$fault", "server");
    O(this, "Message");
    Object.setPrototypeOf(this, co.prototype), this.Message = s.Message;
  }
}
class oo extends rn {
  constructor(s) {
    super({
      name: "InvalidRequestException",
      $fault: "client",
      ...s
    });
    O(this, "name", "InvalidRequestException");
    O(this, "$fault", "client");
    O(this, "AthenaErrorCode");
    O(this, "Message");
    Object.setPrototypeOf(this, oo.prototype), this.AthenaErrorCode = s.AthenaErrorCode, this.Message = s.Message;
  }
}
class fo extends rn {
  constructor(s) {
    super({
      name: "TooManyRequestsException",
      $fault: "client",
      ...s
    });
    O(this, "name", "TooManyRequestsException");
    O(this, "$fault", "client");
    O(this, "Message");
    O(this, "Reason");
    Object.setPrototypeOf(this, fo.prototype), this.Message = s.Message, this.Reason = s.Reason;
  }
}
class ho extends rn {
  constructor(s) {
    super({
      name: "ResourceNotFoundException",
      $fault: "client",
      ...s
    });
    O(this, "name", "ResourceNotFoundException");
    O(this, "$fault", "client");
    O(this, "Message");
    O(this, "ResourceName");
    Object.setPrototypeOf(this, ho.prototype), this.Message = s.Message, this.ResourceName = s.ResourceName;
  }
}
class mo extends rn {
  constructor(s) {
    super({
      name: "MetadataException",
      $fault: "client",
      ...s
    });
    O(this, "name", "MetadataException");
    O(this, "$fault", "client");
    O(this, "Message");
    Object.setPrototypeOf(this, mo.prototype), this.Message = s.Message;
  }
}
class yo extends rn {
  constructor(s) {
    super({
      name: "SessionAlreadyExistsException",
      $fault: "client",
      ...s
    });
    O(this, "name", "SessionAlreadyExistsException");
    O(this, "$fault", "client");
    O(this, "Message");
    Object.setPrototypeOf(this, yo.prototype), this.Message = s.Message;
  }
}
const Wy = "AclConfiguration", BE = "AdditionalConfigs", Py = "AthenaError", LE = "AthenaErrorCode", jE = "AuthenticationType", qE = "Classification", QE = "CoordinatorDpuSize", GE = "CompletionDateTime", tg = "ColumnInfo", YE = "ColumnInfoList", XE = "ClassificationList", VE = "CatalogName", ZE = "ClientRequestToken", $E = "CaseSensitive", KE = "CreateUserLevelPrefix", JE = "Catalog", kE = "Classifications", IE = "DpuCount", FE = "DefaultExecutorDpuSize", WE = "DataManifestLocation", PE = "DataScannedInBytes", tT = "Database", eT = "Datum", nT = "Data", eg = "Enabled", aT = "ExpectedBucketOwner", lT = "ErrorCategory", go = "EncryptionConfiguration", ng = "EngineConfiguration", iT = "EngineExecutionTimeInMillis", uT = "EffectiveEngineVersion", sT = "ErrorMessage", rT = "EncryptionOption", ag = "ExecutionParameters", cT = "EnableS3AccessGrants", oT = "ErrorType", lg = "EngineVersion", fT = "GetQueryExecution", dT = "GetQueryExecutionInput", hT = "GetQueryExecutionOutput", mT = "GetQueryResults", yT = "GetQueryResultsInput", gT = "GetQueryResultsOutput", pT = "InvalidRequestException", ST = "InternalServerException", ig = "KmsKey", vT = "Label", ll = "Message", bT = "MaxAgeInMinutes", ET = "MaxConcurrentDpus", TT = "MetadataException", ug = "ManagedQueryResultsConfiguration", AT = "ManagedQueryResultsEncryptionConfiguration", RT = "MaxResults", sg = "Name", rg = "NextToken", _T = "Nullable", wT = "OutputLocation", CT = "Properties", MT = "Precision", OT = "Query", po = "QueryExecutionContext", ts = "QueryExecutionId", DT = "QueryExecutionStatistics", zT = "QueryExecutionStatus", cg = "QueryExecution", xT = "QueryPlanningTimeInMillis", NT = "QueryQueueTimeInMillis", og = "QueryResultsS3AccessGrantsConfiguration", UT = "QueryResultType", HT = "QueryString", BT = "Reason", So = "ResultConfiguration", LT = "RowList", jT = "ResourceName", qT = "ResourceNotFoundException", QT = "ReusedPreviousResult", fg = "ResultReuseByAgeConfiguration", vo = "ResultReuseConfiguration", dg = "ResultReuseInformation", hg = "ResultSet", mg = "ResultSetMetadata", GT = "Retryable", YT = "Rows", XT = "Row", VT = "State", ZT = "SessionAlreadyExistsException", $T = "S3AclOption", KT = "StateChangeReason", JT = "SubmissionDateTime", kT = "SelectedEngineVersion", IT = "SchemaName", FT = "SparkProperties", WT = "ServicePreProcessingTimeInMillis", PT = "ServiceProcessingTimeInMillis", t2 = "StartQueryExecution", e2 = "StartQueryExecutionInput", n2 = "StartQueryExecutionOutput", a2 = "StatementType", l2 = "SubstatementType", i2 = "Scale", u2 = "Status", s2 = "Statistics", r2 = "Type", c2 = "TotalExecutionTimeInMillis", o2 = "TooManyRequestsException", f2 = "TableName", d2 = "UpdateCount", h2 = "VarCharValue", yg = "WorkGroup", gi = "client", m2 = "datumList", il = "error", gg = "smithy.ts.sdk.synthetic.com.amazonaws.athena", y2 = "server", tt = "com.amazonaws.athena", pg = fa.for(gg);
var g2 = [-3, gg, "AthenaServiceException", 0, [], []];
pg.registerError(g2, rn);
const da = fa.for(tt);
var p2 = [
  -3,
  tt,
  ST,
  { [il]: y2 },
  [ll],
  [0]
];
da.registerError(p2, co);
var S2 = [
  -3,
  tt,
  pT,
  { [il]: gi },
  [LE, ll],
  [0, 0]
];
da.registerError(S2, oo);
var v2 = [
  -3,
  tt,
  TT,
  { [il]: gi },
  [ll],
  [0]
];
da.registerError(v2, mo);
var b2 = [
  -3,
  tt,
  qT,
  { [il]: gi },
  [ll, jT],
  [0, 0]
];
da.registerError(b2, ho);
var E2 = [
  -3,
  tt,
  ZT,
  { [il]: gi },
  [ll],
  [0]
];
da.registerError(E2, yo);
var T2 = [
  -3,
  tt,
  o2,
  { [il]: gi },
  [ll, BT],
  [0, 0]
];
da.registerError(T2, fo);
const A2 = [
  pg,
  da
];
var R2 = [
  3,
  tt,
  Wy,
  0,
  [$T],
  [0],
  1
], _2 = [
  3,
  tt,
  Py,
  0,
  [lT, oT, GT, sT],
  [1, 1, 2, 0]
], w2 = [
  3,
  tt,
  qE,
  0,
  [sg, CT],
  [0, 128]
], C2 = [
  3,
  tt,
  tg,
  0,
  [sg, r2, VE, IT, f2, vT, MT, i2, _T, $E],
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
  [rT, ig],
  [0, 0],
  1
], D2 = [
  3,
  tt,
  ng,
  0,
  [QE, ET, FE, BE, FT, kE],
  [1, 1, 1, 128, 128, () => k2]
], z2 = [
  3,
  tt,
  lg,
  0,
  [kT, uT],
  [0, 0]
], x2 = [
  3,
  tt,
  dT,
  0,
  [ts],
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
  [ts, rg, RT, UT],
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
  ug,
  0,
  [eg, go],
  [2, () => L2],
  1
], L2 = [
  3,
  tt,
  AT,
  0,
  [ig],
  [0],
  1
], j2 = [
  3,
  tt,
  cg,
  0,
  [ts, OT, a2, ug, So, vo, po, u2, s2, yg, lg, ag, l2, og],
  [0, 0, 0, () => B2, () => vg, () => bg, () => Sg, () => Q2, () => q2, 0, () => z2, 64, 0, () => G2]
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
  DT,
  0,
  [iT, PE, WE, c2, NT, WT, xT, PT, dg, IE],
  [1, 1, 0, 1, 1, 1, 1, 1, () => X2, 1]
], Q2 = [
  3,
  tt,
  zT,
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
  [() => W2, () => Z2]
], Z2 = [
  3,
  tt,
  mg,
  0,
  [tg],
  [() => I2]
], $2 = [
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
  [HT, ZE, po, So, yg, ag, vo, ng],
  [0, [0, 4], () => Sg, () => vg, 0, 64, () => bg, () => D2],
  1
], J2 = [
  3,
  tt,
  n2,
  0,
  [ts],
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
  () => $2
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
const nA = (l) => ({
  apiVersion: "2017-05-18",
  base64Decoder: (l == null ? void 0 : l.base64Decoder) ?? ku,
  base64Encoder: (l == null ? void 0 : l.base64Encoder) ?? Vu,
  disableHostPrefix: (l == null ? void 0 : l.disableHostPrefix) ?? !1,
  endpointProvider: (l == null ? void 0 : l.endpointProvider) ?? HE,
  extensions: (l == null ? void 0 : l.extensions) ?? [],
  httpAuthSchemeProvider: (l == null ? void 0 : l.httpAuthSchemeProvider) ?? Vb,
  httpAuthSchemes: (l == null ? void 0 : l.httpAuthSchemes) ?? [
    {
      schemeId: "aws.auth#sigv4",
      identityProvider: (i) => i.getIdentityProvider("aws.auth#sigv4"),
      signer: new db()
    }
  ],
  logger: (l == null ? void 0 : l.logger) ?? new Yy(),
  protocol: (l == null ? void 0 : l.protocol) ?? DE,
  protocolSettings: (l == null ? void 0 : l.protocolSettings) ?? {
    defaultNamespace: "com.amazonaws.athena",
    errorTypeRegistries: A2,
    version: "2017-05-18",
    serviceTarget: "AmazonAthena"
  },
  serviceId: (l == null ? void 0 : l.serviceId) ?? "Athena",
  urlParser: (l == null ? void 0 : l.urlParser) ?? nl,
  utf8Decoder: (l == null ? void 0 : l.utf8Decoder) ?? el,
  utf8Encoder: (l == null ? void 0 : l.utf8Encoder) ?? Pc
}), aA = (l) => {
  const i = pE(l), s = () => i().then(k1), r = nA(l);
  return {
    ...r,
    ...l,
    runtime: "browser",
    defaultsMode: i,
    bodyLengthChecker: (l == null ? void 0 : l.bodyLengthChecker) ?? yE,
    credentialDefaultProvider: (l == null ? void 0 : l.credentialDefaultProvider) ?? ((f) => () => Promise.reject(new Error("Credential is missing"))),
    defaultUserAgentProvider: (l == null ? void 0 : l.defaultUserAgentProvider) ?? hE({ serviceId: r.serviceId, clientVersion: Jb.version }),
    maxAttempts: (l == null ? void 0 : l.maxAttempts) ?? ri,
    region: (l == null ? void 0 : l.region) ?? mE("Region is missing"),
    requestHandler: to.create((l == null ? void 0 : l.requestHandler) ?? s),
    retryMode: (l == null ? void 0 : l.retryMode) ?? (async () => (await s()).retryMode || Pv),
    sha256: (l == null ? void 0 : l.sha256) ?? dE,
    streamCollector: (l == null ? void 0 : l.streamCollector) ?? OS,
    useDualstackEndpoint: (l == null ? void 0 : l.useDualstackEndpoint) ?? (() => Promise.resolve(R1)),
    useFipsEndpoint: (l == null ? void 0 : l.useFipsEndpoint) ?? (() => Promise.resolve(_1))
  };
}, lA = (l) => ({
  setRegion(i) {
    l.region = i;
  },
  region() {
    return l.region;
  }
}), iA = (l) => ({
  region: l.region()
}), uA = (l) => {
  const i = l.httpAuthSchemes;
  let s = l.httpAuthSchemeProvider, r = l.credentials;
  return {
    setHttpAuthScheme(f) {
      const d = i.findIndex((y) => y.schemeId === f.schemeId);
      d === -1 ? i.push(f) : i.splice(d, 1, f);
    },
    httpAuthSchemes() {
      return i;
    },
    setHttpAuthSchemeProvider(f) {
      s = f;
    },
    httpAuthSchemeProvider() {
      return s;
    },
    setCredentials(f) {
      r = f;
    },
    credentials() {
      return r;
    }
  };
}, sA = (l) => ({
  httpAuthSchemes: l.httpAuthSchemes(),
  httpAuthSchemeProvider: l.httpAuthSchemeProvider(),
  credentials: l.credentials()
}), rA = (l, i) => {
  const s = Object.assign(lA(l), tb(l), nS(l), uA(l));
  return i.forEach((r) => r.configure(s)), Object.assign(l, iA(s), eb(s), aS(s), sA(s));
};
class cA extends K1 {
  constructor(...[s]) {
    const r = aA(s || {});
    super(r);
    O(this, "config");
    this.initConfig = r;
    const f = $b(r), d = Rv(f), y = $1(d), p = M1(y), g = p, h = V1(g), b = Zb(h), v = rA(b, (s == null ? void 0 : s.extensions) || []);
    this.config = v, this.middlewareStack.use(QS(this.config)), this.middlewareStack.use(A1(this.config)), this.middlewareStack.use(cb(this.config)), this.middlewareStack.use(z1(this.config)), this.middlewareStack.use(sS(this.config)), this.middlewareStack.use(oS(this.config)), this.middlewareStack.use(hS(this.config)), this.middlewareStack.use(SS(this.config, {
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
class oA extends Pu.classBuilder().ep(so).m(function(i, s, r, f) {
  return [io(r, i.getEndpointParameterInstructions())];
}).s("AmazonAthena", "GetQueryExecution", {}).n("AthenaClient", "GetQueryExecutionCommand").sc(P2).build() {
}
class fA extends Pu.classBuilder().ep(so).m(function(i, s, r, f) {
  return [io(r, i.getEndpointParameterInstructions())];
}).s("AmazonAthena", "GetQueryResults", {}).n("AthenaClient", "GetQueryResultsCommand").sc(tA).build() {
}
class dA extends Pu.classBuilder().ep(so).m(function(i, s, r, f) {
  return [io(r, i.getEndpointParameterInstructions())];
}).s("AmazonAthena", "StartQueryExecution", {}).n("AthenaClient", "StartQueryExecutionCommand").sc(eA).build() {
}
const Yc = {
  QUEUED: "QUEUED",
  RUNNING: "RUNNING",
  SUCCEEDED: "SUCCEEDED"
};
async function hA(l, i, s) {
  var g, h, b;
  const f = (await i.send(
    new dA({
      QueryString: s,
      // required: your SQL
      //   QueryExecutionContext: {
      //     Database: "my_database",                 // optional: target DB
      //     Catalog: "AwsDataCatalog",               // optional: data catalog
      //   },
      ResultConfiguration: {
        OutputLocation: `s3://${l.AWSBucket}/athena-results/`
        // where to store results
      }
      //  WorkGroup: "primary",                      // optional: workgroup name
    })
  )).QueryExecutionId;
  console.log("Query started:", f);
  let d;
  do
    await new Promise((A) => setTimeout(A, 1e3)), d = (h = (g = (await i.send(
      new oA({ QueryExecutionId: f })
    )).QueryExecution) == null ? void 0 : g.Status) == null ? void 0 : h.State, console.log("Query state:", d);
  while (d === Yc.RUNNING || d === Yc.QUEUED);
  if (d !== Yc.SUCCEEDED) {
    const v = (
      /* get failure reason */
      "Query failed with state: " + d
    );
    throw new Error(v);
  }
  return ((b = (await i.send(
    new fA({ QueryExecutionId: f })
  )).ResultSet) == null ? void 0 : b.Rows) ?? [];
}
function mA({ sdk: l }) {
  const [i, s] = Hu.useState(l.getProps()), [r, f] = Hu.useState([]), d = new cA({ region: i.AWSRegion || "us-west-1" });
  return Hu.useEffect(() => l.on("propsChanged", s), [l]), Hu.useEffect(() => {
    hA(i, d, "SELECT title FROM topics LIMIT 10").then(f);
  }, []), /* @__PURE__ */ li.jsxs("section", { className: "react-widget-section", children: [
    /* @__PURE__ */ li.jsx("h3", { className: "react-widget-title", children: "Athena Data" }),
    /* @__PURE__ */ li.jsx("ul", { children: r.map((y, p) => {
      var g;
      return /* @__PURE__ */ li.jsx("li", { children: (g = y.Data) == null ? void 0 : g.map((h) => h.VarCharValue).join(", ") }, p);
    }) })
  ] });
}
async function gA(l) {
  await l.whenReady();
  const i = eS.createRoot(l.getContainer());
  i.render(/* @__PURE__ */ li.jsx(mA, { sdk: l })), l.on("destroy", () => i.unmount());
}
export {
  el as f,
  gA as i,
  Pc as t
};
