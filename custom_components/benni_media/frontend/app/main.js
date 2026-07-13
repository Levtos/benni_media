//#region \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), t = /* @__PURE__ */ e(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, ee || (ee = !0, C());
		else {
			var t = n(l);
			t !== null && oe(x, t.startTime - e);
		}
	}
	var ee = !1, S = -1, te = 5, ne = -1;
	function re() {
		return g ? !0 : !(e.unstable_now() - ne < te);
	}
	function ie() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			ne = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(S), S = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && re());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && oe(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? C() : ee = !1;
			}
		}
	}
	var C;
	if (typeof y == "function") C = function() {
		y(ie);
	};
	else if (typeof MessageChannel < "u") {
		var ae = new MessageChannel(), w = ae.port2;
		ae.port1.onmessage = ie, C = function() {
			w.postMessage(null);
		};
	} else C = function() {
		_(ie, 0);
	};
	function oe(t, n) {
		S = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : te = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(S), S = -1) : h = !0, oe(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, C()))), r;
	}, e.unstable_shouldYield = re, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), n = /* @__PURE__ */ e(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {
			if (x = !1, ne) {
				var t = e.unstable_now();
				C = t;
				var n = !0;
				try {
					a: {
						y = !1, b && (b = !1, S(re), re = -1), v = !0;
						var a = _;
						try {
							b: {
								for (o(t), g = r(p); g !== null && !(g.expirationTime > t && c());) {
									var u = g.callback;
									if (typeof u == "function") {
										g.callback = null, _ = g.priorityLevel;
										var d = u(g.expirationTime <= t);
										if (t = e.unstable_now(), typeof d == "function") {
											g.callback = d, o(t), n = !0;
											break b;
										}
										g === r(p) && i(p), o(t);
									} else i(p);
									g = r(p);
								}
								if (g !== null) n = !0;
								else {
									var f = r(m);
									f !== null && l(s, f.startTime - t), n = !1;
								}
							}
							break a;
						} finally {
							g = null, _ = a, v = !1;
						}
						n = void 0;
					}
				} finally {
					n ? ae() : ne = !1;
				}
			}
		}
		function n(e, t) {
			var n = e.length;
			e.push(t);
			a: for (; 0 < n;) {
				var r = n - 1 >>> 1, i = e[r];
				if (0 < a(i, t)) e[r] = t, e[n] = i, n = r;
				else break a;
			}
		}
		function r(e) {
			return e.length === 0 ? null : e[0];
		}
		function i(e) {
			if (e.length === 0) return null;
			var t = e[0], n = e.pop();
			if (n !== t) {
				e[0] = n;
				a: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
					var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
					if (0 > a(c, n)) l < i && 0 > a(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
					else if (l < i && 0 > a(u, n)) e[r] = u, e[l] = n, r = l;
					else break a;
				}
			}
			return t;
		}
		function a(e, t) {
			var n = e.sortIndex - t.sortIndex;
			return n === 0 ? e.id - t.id : n;
		}
		function o(e) {
			for (var t = r(m); t !== null;) {
				if (t.callback === null) i(m);
				else if (t.startTime <= e) i(m), t.sortIndex = t.expirationTime, n(p, t);
				else break;
				t = r(m);
			}
		}
		function s(e) {
			if (b = !1, o(e), !y) if (r(p) !== null) y = !0, ne || (ne = !0, ae());
			else {
				var t = r(m);
				t !== null && l(s, t.startTime - e);
			}
		}
		function c() {
			return x ? !0 : !(e.unstable_now() - C < ie);
		}
		function l(t, n) {
			re = ee(function() {
				t(e.unstable_now());
			}, n);
		}
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
			var u = performance;
			e.unstable_now = function() {
				return u.now();
			};
		} else {
			var d = Date, f = d.now();
			e.unstable_now = function() {
				return d.now() - f;
			};
		}
		var p = [], m = [], h = 1, g = null, _ = 3, v = !1, y = !1, b = !1, x = !1, ee = typeof setTimeout == "function" ? setTimeout : null, S = typeof clearTimeout == "function" ? clearTimeout : null, te = typeof setImmediate < "u" ? setImmediate : null, ne = !1, re = -1, ie = 5, C = -1;
		if (typeof te == "function") var ae = function() {
			te(t);
		};
		else if (typeof MessageChannel < "u") {
			var w = new MessageChannel(), oe = w.port2;
			w.port1.onmessage = t, ae = function() {
				oe.postMessage(null);
			};
		} else ae = function() {
			ee(t, 0);
		};
		e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
			e.callback = null;
		}, e.unstable_forceFrameRate = function(e) {
			0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ie = 0 < e ? Math.floor(1e3 / e) : 5;
		}, e.unstable_getCurrentPriorityLevel = function() {
			return _;
		}, e.unstable_next = function(e) {
			switch (_) {
				case 1:
				case 2:
				case 3:
					var t = 3;
					break;
				default: t = _;
			}
			var n = _;
			_ = t;
			try {
				return e();
			} finally {
				_ = n;
			}
		}, e.unstable_requestPaint = function() {
			x = !0;
		}, e.unstable_runWithPriority = function(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: break;
				default: e = 3;
			}
			var n = _;
			_ = e;
			try {
				return t();
			} finally {
				_ = n;
			}
		}, e.unstable_scheduleCallback = function(t, i, a) {
			var o = e.unstable_now();
			switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, t) {
				case 1:
					var c = -1;
					break;
				case 2:
					c = 250;
					break;
				case 5:
					c = 1073741823;
					break;
				case 4:
					c = 1e4;
					break;
				default: c = 5e3;
			}
			return c = a + c, t = {
				id: h++,
				callback: i,
				priorityLevel: t,
				startTime: a,
				expirationTime: c,
				sortIndex: -1
			}, a > o ? (t.sortIndex = a, n(m, t), r(p) === null && t === r(m) && (b ? (S(re), re = -1) : b = !0, l(s, a - o))) : (t.sortIndex = c, n(p, t), y || v || (y = !0, ne || (ne = !0, ae()))), t;
		}, e.unstable_shouldYield = c, e.unstable_wrapCallback = function(e) {
			var t = _;
			return function() {
				var n = _;
				_ = t;
				try {
					return e.apply(this, arguments);
				} finally {
					_ = n;
				}
			};
		}, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), r = /* @__PURE__ */ e(((e, r) => {
	process.env.NODE_ENV === "production" ? r.exports = t() : r.exports = n();
})), i = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var ee = Array.isArray;
	function S() {}
	var te = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ne = Object.prototype.hasOwnProperty;
	function re(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ie(e, t) {
		return re(e.type, t, e.props);
	}
	function C(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ae(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var w = /\/+/g;
	function oe(e, t) {
		return typeof e == "object" && e && e.key != null ? ae("" + e.key) : t.toString(36);
	}
	function se(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(S, S) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function T(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, T(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + oe(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(w, "$&/") + "/"), T(o, r, i, "", function(e) {
			return e;
		})) : o != null && (C(o) && (o = ie(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(w, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + oe(a, u), c += T(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + oe(a, u++), c += T(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return T(se(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ce(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return T(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function le(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var E = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, D = {
		map: ce,
		forEach: function(e, t, n) {
			ce(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ce(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ce(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!C(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = D, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return te.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ne.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return re(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ne.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return re(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = C, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: le
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = te.T, n = {};
		te.T = n;
		try {
			var r = e(), i = te.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(S, E);
		} catch (e) {
			E(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), te.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return te.H.useCacheRefresh();
	}, e.use = function(e) {
		return te.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return te.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return te.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return te.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return te.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return te.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return te.H.useEffectEvent(e);
	}, e.useId = function() {
		return te.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return te.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return te.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return te.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return te.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return te.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return te.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return te.H.useRef(e);
	}, e.useState = function(e) {
		return te.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return te.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return te.H.useTransition();
	}, e.version = "19.2.7";
})), a = /* @__PURE__ */ e(((e, t) => {
	process.env.NODE_ENV !== "production" && (function() {
		function n(e, t) {
			Object.defineProperty(a.prototype, e, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
			} });
		}
		function r(e) {
			return typeof e != "object" || !e ? null : (e = be && e[be] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function i(e, t) {
			e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
			var n = e + "." + t;
			xe[n] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, e), xe[n] = !0);
		}
		function a(e, t, n) {
			this.props = e, this.context = t, this.refs = Ce, this.updater = n || Se;
		}
		function o() {}
		function s(e, t, n) {
			this.props = e, this.context = t, this.refs = Ce, this.updater = n || Se;
		}
		function c() {}
		function l(e) {
			return "" + e;
		}
		function u(e) {
			try {
				l(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, r = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", r), l(e);
			}
		}
		function d(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Ee ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case D: return "Fragment";
				case de: return "Profiler";
				case ue: return "StrictMode";
				case he: return "Suspense";
				case ge: return "SuspenseList";
				case ye: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case E: return "Portal";
				case pe: return e.displayName || "Context";
				case fe: return (e._context.displayName || "Context") + ".Consumer";
				case me:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case _e: return t = e.displayName || null, t === null ? d(e.type) || "Memo" : t;
				case ve:
					t = e._payload, e = e._init;
					try {
						return d(e(t));
					} catch {}
			}
			return null;
		}
		function f(e) {
			if (e === D) return "<>";
			if (typeof e == "object" && e && e.$$typeof === ve) return "<...>";
			try {
				var t = d(e);
				return t ? "<" + t + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function p() {
			var e = k.A;
			return e === null ? null : e.getOwner();
		}
		function m() {
			return Error("react-stack-top-frame");
		}
		function h(e) {
			if (De.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function g(e, t) {
			function n() {
				ke || (ke = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function _() {
			var e = d(this.type);
			return je[e] || (je[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function v(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: le,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: _
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function y(e, t) {
			return t = v(e.type, t, e.props, e._owner, e._debugStack, e._debugTask), e._store && (t._store.validated = e._store.validated), t;
		}
		function b(e) {
			x(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === ve && (e._payload.status === "fulfilled" ? x(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function x(e) {
			return typeof e == "object" && !!e && e.$$typeof === le;
		}
		function ee(e) {
			var t = {
				"=": "=0",
				":": "=2"
			};
			return "$" + e.replace(/[=:]/g, function(e) {
				return t[e];
			});
		}
		function S(e, t) {
			return typeof e == "object" && e && e.key != null ? (u(e.key), ee("" + e.key)) : t.toString(36);
		}
		function te(e) {
			switch (e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
				default: switch (typeof e.status == "string" ? e.then(c, c) : (e.status = "pending", e.then(function(t) {
					e.status === "pending" && (e.status = "fulfilled", e.value = t);
				}, function(t) {
					e.status === "pending" && (e.status = "rejected", e.reason = t);
				})), e.status) {
					case "fulfilled": return e.value;
					case "rejected": throw e.reason;
				}
			}
			throw e;
		}
		function ne(e, t, n, i, a) {
			var o = typeof e;
			(o === "undefined" || o === "boolean") && (e = null);
			var s = !1;
			if (e === null) s = !0;
			else switch (o) {
				case "bigint":
				case "string":
				case "number":
					s = !0;
					break;
				case "object": switch (e.$$typeof) {
					case le:
					case E:
						s = !0;
						break;
					case ve: return s = e._init, ne(s(e._payload), t, n, i, a);
				}
			}
			if (s) {
				s = e, a = a(s);
				var c = i === "" ? "." + S(s, 0) : i;
				return Te(a) ? (n = "", c != null && (n = c.replace(Pe, "$&/") + "/"), ne(a, t, n, "", function(e) {
					return e;
				})) : a != null && (x(a) && (a.key != null && (s && s.key === a.key || u(a.key)), n = y(a, n + (a.key == null || s && s.key === a.key ? "" : ("" + a.key).replace(Pe, "$&/") + "/") + c), i !== "" && s != null && x(s) && s.key == null && s._store && !s._store.validated && (n._store.validated = 2), a = n), t.push(a)), 1;
			}
			if (s = 0, c = i === "" ? "." : i + ":", Te(e)) for (var l = 0; l < e.length; l++) i = e[l], o = c + S(i, l), s += ne(i, t, n, o, a);
			else if (l = r(e), typeof l == "function") for (l === e.entries && (A || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), A = !0), e = l.call(e), l = 0; !(i = e.next()).done;) i = i.value, o = c + S(i, l++), s += ne(i, t, n, o, a);
			else if (o === "object") {
				if (typeof e.then == "function") return ne(te(e), t, n, i, a);
				throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
			}
			return s;
		}
		function re(e, t, n) {
			if (e == null) return e;
			var r = [], i = 0;
			return ne(e, r, "", "", function(e) {
				return t.call(n, e, i++);
			}), r;
		}
		function ie(e) {
			if (e._status === -1) {
				var t = e._ioInfo;
				t != null && (t.start = t.end = performance.now()), t = e._result;
				var n = t();
				if (n.then(function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 1, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now()), n.status === void 0 && (n.status = "fulfilled", n.value = t);
					}
				}, function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 2, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now()), n.status === void 0 && (n.status = "rejected", n.reason = t);
					}
				}), t = e._ioInfo, t != null) {
					t.value = n;
					var r = n.displayName;
					typeof r == "string" && (t.name = r);
				}
				e._status === -1 && (e._status = 0, e._result = n);
			}
			if (e._status === 1) return t = e._result, t === void 0 && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", t), "default" in t || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", t), t.default;
			throw e._result;
		}
		function C() {
			var e = k.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		function ae() {
			k.asyncTransitions--;
		}
		function w(e) {
			if (j === null) try {
				var n = ("require" + Math.random()).slice(0, 7);
				j = (t && t[n]).call(t, "timers").setImmediate;
			} catch {
				j = function(e) {
					!1 === Ie && (Ie = !0, typeof MessageChannel > "u" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var t = new MessageChannel();
					t.port1.onmessage = e, t.port2.postMessage(void 0);
				};
			}
			return j(e);
		}
		function oe(e) {
			return 1 < e.length && typeof AggregateError == "function" ? AggregateError(e) : e[0];
		}
		function se(e, t) {
			t !== M - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), M = t;
		}
		function T(e, t, n) {
			var r = k.actQueue;
			if (r !== null) if (r.length !== 0) try {
				ce(r), w(function() {
					return T(e, t, n);
				});
				return;
			} catch (e) {
				k.thrownErrors.push(e);
			}
			else k.actQueue = null;
			0 < k.thrownErrors.length ? (r = oe(k.thrownErrors), k.thrownErrors.length = 0, n(r)) : t(e);
		}
		function ce(e) {
			if (!Le) {
				Le = !0;
				var t = 0;
				try {
					for (; t < e.length; t++) {
						var n = e[t];
						do {
							k.didUsePromise = !1;
							var r = n(!1);
							if (r !== null) {
								if (k.didUsePromise) {
									e[t] = n, e.splice(0, t);
									return;
								}
								n = r;
							} else break;
						} while (1);
					}
					e.length = 0;
				} catch (n) {
					e.splice(0, t + 1), k.thrownErrors.push(n);
				} finally {
					Le = !1;
				}
			}
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var le = Symbol.for("react.transitional.element"), E = Symbol.for("react.portal"), D = Symbol.for("react.fragment"), ue = Symbol.for("react.strict_mode"), de = Symbol.for("react.profiler"), fe = Symbol.for("react.consumer"), pe = Symbol.for("react.context"), me = Symbol.for("react.forward_ref"), he = Symbol.for("react.suspense"), ge = Symbol.for("react.suspense_list"), _e = Symbol.for("react.memo"), ve = Symbol.for("react.lazy"), ye = Symbol.for("react.activity"), be = Symbol.iterator, xe = {}, Se = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(e) {
				i(e, "forceUpdate");
			},
			enqueueReplaceState: function(e) {
				i(e, "replaceState");
			},
			enqueueSetState: function(e) {
				i(e, "setState");
			}
		}, O = Object.assign, Ce = {};
		Object.freeze(Ce), a.prototype.isReactComponent = {}, a.prototype.setState = function(e, t) {
			if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, e, t, "setState");
		}, a.prototype.forceUpdate = function(e) {
			this.updater.enqueueForceUpdate(this, e, "forceUpdate");
		};
		var we = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (ze in we) we.hasOwnProperty(ze) && n(ze, we[ze]);
		o.prototype = a.prototype, we = s.prototype = new o(), we.constructor = s, O(we, a.prototype), we.isPureReactComponent = !0;
		var Te = Array.isArray, Ee = Symbol.for("react.client.reference"), k = {
			H: null,
			A: null,
			T: null,
			S: null,
			actQueue: null,
			asyncTransitions: 0,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, De = Object.prototype.hasOwnProperty, Oe = console.createTask ? console.createTask : function() {
			return null;
		};
		we = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var ke, Ae, je = {}, Me = we.react_stack_bottom_frame.bind(we, m)(), Ne = Oe(f(m)), A = !1, Pe = /\/+/g, Fe = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, Ie = !1, j = null, M = 0, N = !1, Le = !1, Re = typeof queueMicrotask == "function" ? function(e) {
			queueMicrotask(function() {
				return queueMicrotask(e);
			});
		} : w;
		we = Object.freeze({
			__proto__: null,
			c: function(e) {
				return C().useMemoCache(e);
			}
		});
		var ze = {
			map: re,
			forEach: function(e, t, n) {
				re(e, function() {
					t.apply(this, arguments);
				}, n);
			},
			count: function(e) {
				var t = 0;
				return re(e, function() {
					t++;
				}), t;
			},
			toArray: function(e) {
				return re(e, function(e) {
					return e;
				}) || [];
			},
			only: function(e) {
				if (!x(e)) throw Error("React.Children.only expected to receive a single React element child.");
				return e;
			}
		};
		e.Activity = ye, e.Children = ze, e.Component = a, e.Fragment = D, e.Profiler = de, e.PureComponent = s, e.StrictMode = ue, e.Suspense = he, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, e.__COMPILER_RUNTIME = we, e.act = function(e) {
			var t = k.actQueue, n = M;
			M++;
			var r = k.actQueue = t === null ? [] : t, i = !1;
			try {
				var a = e();
			} catch (e) {
				k.thrownErrors.push(e);
			}
			if (0 < k.thrownErrors.length) throw se(t, n), e = oe(k.thrownErrors), k.thrownErrors.length = 0, e;
			if (typeof a == "object" && a && typeof a.then == "function") {
				var o = a;
				return Re(function() {
					i || N || (N = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				}), { then: function(e, a) {
					i = !0, o.then(function(i) {
						if (se(t, n), n === 0) {
							try {
								ce(r), w(function() {
									return T(i, e, a);
								});
							} catch (e) {
								k.thrownErrors.push(e);
							}
							if (0 < k.thrownErrors.length) {
								var o = oe(k.thrownErrors);
								k.thrownErrors.length = 0, a(o);
							}
						} else e(i);
					}, function(e) {
						se(t, n), 0 < k.thrownErrors.length ? (e = oe(k.thrownErrors), k.thrownErrors.length = 0, a(e)) : a(e);
					});
				} };
			}
			var s = a;
			if (se(t, n), n === 0 && (ce(r), r.length !== 0 && Re(function() {
				i || N || (N = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), k.actQueue = null), 0 < k.thrownErrors.length) throw e = oe(k.thrownErrors), k.thrownErrors.length = 0, e;
			return { then: function(e, t) {
				i = !0, n === 0 ? (k.actQueue = r, w(function() {
					return T(s, e, t);
				})) : e(s);
			} };
		}, e.cache = function(e) {
			return function() {
				return e.apply(null, arguments);
			};
		}, e.cacheSignal = function() {
			return null;
		}, e.captureOwnerStack = function() {
			var e = k.getCurrentStack;
			return e === null ? null : e();
		}, e.cloneElement = function(e, t, n) {
			if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
			var r = O({}, e.props), i = e.key, a = e._owner;
			if (t != null) {
				var o;
				a: {
					if (De.call(t, "ref") && (o = Object.getOwnPropertyDescriptor(t, "ref").get) && o.isReactWarning) {
						o = !1;
						break a;
					}
					o = t.ref !== void 0;
				}
				for (s in o && (a = p()), h(t) && (u(t.key), i = "" + t.key), t) !De.call(t, s) || s === "key" || s === "__self" || s === "__source" || s === "ref" && t.ref === void 0 || (r[s] = t[s]);
			}
			var s = arguments.length - 2;
			if (s === 1) r.children = n;
			else if (1 < s) {
				o = Array(s);
				for (var c = 0; c < s; c++) o[c] = arguments[c + 2];
				r.children = o;
			}
			for (r = v(e.type, i, r, a, e._debugStack, e._debugTask), i = 2; i < arguments.length; i++) b(arguments[i]);
			return r;
		}, e.createContext = function(e) {
			return e = {
				$$typeof: pe,
				_currentValue: e,
				_currentValue2: e,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			}, e.Provider = e, e.Consumer = {
				$$typeof: fe,
				_context: e
			}, e._currentRenderer = null, e._currentRenderer2 = null, e;
		}, e.createElement = function(e, t, n) {
			for (var r = 2; r < arguments.length; r++) b(arguments[r]);
			r = {};
			var i = null;
			if (t != null) for (c in Ae || !("__self" in t) || "key" in t || (Ae = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), h(t) && (u(t.key), i = "" + t.key), t) De.call(t, c) && c !== "key" && c !== "__self" && c !== "__source" && (r[c] = t[c]);
			var a = arguments.length - 2;
			if (a === 1) r.children = n;
			else if (1 < a) {
				for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
				Object.freeze && Object.freeze(o), r.children = o;
			}
			if (e && e.defaultProps) for (c in a = e.defaultProps, a) r[c] === void 0 && (r[c] = a[c]);
			i && g(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e);
			var c = 1e4 > k.recentlyCreatedOwnerStacks++;
			return v(e, i, r, p(), c ? Error("react-stack-top-frame") : Me, c ? Oe(f(e)) : Ne);
		}, e.createRef = function() {
			var e = { current: null };
			return Object.seal(e), e;
		}, e.forwardRef = function(e) {
			e != null && e.$$typeof === _e ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e == "function" ? e.length !== 0 && e.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.") : console.error("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e), e != null && e.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var t = {
				$$typeof: me,
				render: e
			}, n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.isValidElement = x, e.lazy = function(e) {
			e = {
				_status: -1,
				_result: e
			};
			var t = {
				$$typeof: ve,
				_payload: e,
				_init: ie
			}, n = {
				name: "lazy",
				start: -1,
				end: -1,
				value: null,
				owner: null,
				debugStack: Error("react-stack-top-frame"),
				debugTask: console.createTask ? console.createTask("lazy()") : null
			};
			return e._ioInfo = n, t._debugInfo = [{ awaited: n }], t;
		}, e.memo = function(e, t) {
			e ?? console.error("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e), t = {
				$$typeof: _e,
				type: e,
				compare: t === void 0 ? null : t
			};
			var n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.startTransition = function(e) {
			var t = k.T, n = {};
			n._updatedFibers = /* @__PURE__ */ new Set(), k.T = n;
			try {
				var r = e(), i = k.S;
				i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && (k.asyncTransitions++, r.then(ae, ae), r.then(c, Fe));
			} catch (e) {
				Fe(e);
			} finally {
				t === null && n._updatedFibers && (e = n._updatedFibers.size, n._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), t !== null && n.types !== null && (t.types !== null && t.types !== n.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), t.types = n.types), k.T = t;
			}
		}, e.unstable_useCacheRefresh = function() {
			return C().useCacheRefresh();
		}, e.use = function(e) {
			return C().use(e);
		}, e.useActionState = function(e, t, n) {
			return C().useActionState(e, t, n);
		}, e.useCallback = function(e, t) {
			return C().useCallback(e, t);
		}, e.useContext = function(e) {
			var t = C();
			return e.$$typeof === fe && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"), t.useContext(e);
		}, e.useDebugValue = function(e, t) {
			return C().useDebugValue(e, t);
		}, e.useDeferredValue = function(e, t) {
			return C().useDeferredValue(e, t);
		}, e.useEffect = function(e, t) {
			return e ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useEffect(e, t);
		}, e.useEffectEvent = function(e) {
			return C().useEffectEvent(e);
		}, e.useId = function() {
			return C().useId();
		}, e.useImperativeHandle = function(e, t, n) {
			return C().useImperativeHandle(e, t, n);
		}, e.useInsertionEffect = function(e, t) {
			return e ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useInsertionEffect(e, t);
		}, e.useLayoutEffect = function(e, t) {
			return e ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useLayoutEffect(e, t);
		}, e.useMemo = function(e, t) {
			return C().useMemo(e, t);
		}, e.useOptimistic = function(e, t) {
			return C().useOptimistic(e, t);
		}, e.useReducer = function(e, t, n) {
			return C().useReducer(e, t, n);
		}, e.useRef = function(e) {
			return C().useRef(e);
		}, e.useState = function(e) {
			return C().useState(e);
		}, e.useSyncExternalStore = function(e, t, n) {
			return C().useSyncExternalStore(e, t, n);
		}, e.useTransition = function() {
			return C().useTransition();
		}, e.version = "19.2.7", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), o = /* @__PURE__ */ e(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = i() : t.exports = a();
})), s = /* @__PURE__ */ e(((e) => {
	var t = o();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function s(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function l(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return s(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = c.T, n = i.p;
		try {
			if (c.T = null, i.p = 2, e) return e();
		} finally {
			c.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = l(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = l(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return c.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return c.H.useHostTransitionStatus();
	}, e.version = "19.2.7";
})), c = /* @__PURE__ */ e(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {}
		function n(e) {
			return "" + e;
		}
		function r(e, t, r) {
			var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			try {
				n(i);
				var a = !1;
			} catch {
				a = !0;
			}
			return a && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object"), n(i)), {
				$$typeof: d,
				key: i == null ? null : "" + i,
				children: e,
				containerInfo: t,
				implementation: r
			};
		}
		function i(e, t) {
			if (e === "font") return "";
			if (typeof t == "string") return t === "use-credentials" ? t : "";
		}
		function a(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : "something with type \"" + typeof e + "\"";
		}
		function s(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : typeof e == "string" ? JSON.stringify(e) : typeof e == "number" ? "`" + e + "`" : "something with type \"" + typeof e + "\"";
		}
		function c() {
			var e = f.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var l = o(), u = {
			d: {
				f: t,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: t,
				C: t,
				L: t,
				m: t,
				X: t,
				S: t,
				M: t
			},
			p: 0,
			findDOMNode: null
		}, d = Symbol.for("react.portal"), f = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, e.createPortal = function(e, t) {
			var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error("Target container is not a DOM element.");
			return r(e, t, null, n);
		}, e.flushSync = function(e) {
			var t = f.T, n = u.p;
			try {
				if (f.T = null, u.p = 2, e) return e();
			} finally {
				f.T = t, u.p = n, u.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		}, e.preconnect = function(e, t) {
			typeof e == "string" && e ? t != null && typeof t != "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", s(t)) : t != null && typeof t.crossOrigin != "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", a(t.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, u.d.C(e, t));
		}, e.prefetchDNS = function(e) {
			if (typeof e != "string" || !e) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e));
			else if (1 < arguments.length) {
				var t = arguments[1];
				typeof t == "object" && t.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", s(t)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", s(t));
			}
			typeof e == "string" && u.d.D(e);
		}, e.preinit = function(e, t) {
			if (typeof e == "string" && e ? typeof t != "object" || !t ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", s(t)) : t.as !== "style" && t.as !== "script" && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", s(t.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && t && typeof t.as == "string") {
				var n = t.as, r = i(n, t.crossOrigin), o = typeof t.integrity == "string" ? t.integrity : void 0, c = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
				n === "style" ? u.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
					crossOrigin: r,
					integrity: o,
					fetchPriority: c
				}) : n === "script" && u.d.X(e, {
					crossOrigin: r,
					integrity: o,
					fetchPriority: c,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		}, e.preinitModule = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && t.as !== "script" && (n += " The `as` option encountered was " + s(t.as) + "."), n) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", n);
			else switch (n = t && typeof t.as == "string" ? t.as : "script", n) {
				case "script": break;
				default: n = s(n), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", n, e);
			}
			typeof e == "string" && (typeof t == "object" && t ? (t.as == null || t.as === "script") && (n = i(t.as, t.crossOrigin), u.d.M(e, {
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			})) : t ?? u.d.M(e));
		}, e.preload = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), typeof t != "object" || !t ? n += " The `options` argument encountered was " + a(t) + "." : typeof t.as == "string" && t.as || (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", n), typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
				n = t.as;
				var r = i(n, t.crossOrigin);
				u.d.L(e, n, {
					crossOrigin: r,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					type: typeof t.type == "string" ? t.type : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
					referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
					imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
					imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
					media: typeof t.media == "string" ? t.media : void 0
				});
			}
		}, e.preloadModule = function(e, t) {
			var n = "";
			typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && typeof t.as != "string" && (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", n), typeof e == "string" && (t ? (n = i(t.as, t.crossOrigin), u.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			})) : u.d.m(e));
		}, e.requestFormReset = function(e) {
			u.d.r(e);
		}, e.unstable_batchedUpdates = function(e, t) {
			return e(t);
		}, e.useFormState = function(e, t, n) {
			return c().useFormState(e, t, n);
		}, e.useFormStatus = function() {
			return c().useHostTransitionStatus();
		}, e.version = "19.2.7", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), l = /* @__PURE__ */ e(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = s()) : t.exports = c();
})), u = /* @__PURE__ */ e(((e) => {
	var t = r(), n = o(), i = l();
	function a(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function s(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function c(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function u(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function d(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function f(e) {
		if (c(e) !== e) throw Error(a(188));
	}
	function p(e) {
		var t = e.alternate;
		if (!t) {
			if (t = c(e), t === null) throw Error(a(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var i = n.return;
			if (i === null) break;
			var o = i.alternate;
			if (o === null) {
				if (r = i.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (i.child === o.child) {
				for (o = i.child; o;) {
					if (o === n) return f(i), e;
					if (o === r) return f(i), t;
					o = o.sibling;
				}
				throw Error(a(188));
			}
			if (n.return !== r.return) n = i, r = o;
			else {
				for (var s = !1, l = i.child; l;) {
					if (l === n) {
						s = !0, n = i, r = o;
						break;
					}
					if (l === r) {
						s = !0, r = i, n = o;
						break;
					}
					l = l.sibling;
				}
				if (!s) {
					for (l = o.child; l;) {
						if (l === n) {
							s = !0, n = o, r = i;
							break;
						}
						if (l === r) {
							s = !0, r = o, n = i;
							break;
						}
						l = l.sibling;
					}
					if (!s) throw Error(a(189));
				}
			}
			if (n.alternate !== r) throw Error(a(190));
		}
		if (n.tag !== 3) throw Error(a(188));
		return n.stateNode.current === n ? e : t;
	}
	function m(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = m(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), S = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), ae = Symbol.for("react.activity"), w = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
	function se(e) {
		return typeof e != "object" || !e ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var T = Symbol.for("react.client.reference");
	function ce(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === T ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ne: return "Suspense";
			case re: return "SuspenseList";
			case ae: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case S: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case te:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ie: return t = e.displayName || null, t === null ? ce(e.type) || "Memo" : t;
			case C:
				t = e._payload, e = e._init;
				try {
					return ce(e(t));
				} catch {}
		}
		return null;
	}
	var le = Array.isArray, E = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ue = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, de = [], fe = -1;
	function pe(e) {
		return { current: e };
	}
	function me(e) {
		0 > fe || (e.current = de[fe], de[fe] = null, fe--);
	}
	function he(e, t) {
		fe++, de[fe] = e.current, e.current = t;
	}
	var ge = pe(null), _e = pe(null), ve = pe(null), ye = pe(null);
	function be(e, t) {
		switch (he(ve, t), he(_e, e), he(ge, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? $d(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = $d(t), e = ef(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		me(ge), he(ge, e);
	}
	function xe() {
		me(ge), me(_e), me(ve);
	}
	function Se(e) {
		e.memoizedState !== null && he(ye, e);
		var t = ge.current, n = ef(t, e.type);
		t !== n && (he(_e, e), he(ge, n));
	}
	function O(e) {
		_e.current === e && (me(ge), me(_e)), ye.current === e && (me(ye), cp._currentValue = ue);
	}
	var Ce, we;
	function Te(e) {
		if (Ce === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Ce = t && t[1] || "", we = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Ce + e + we;
	}
	var Ee = !1;
	function k(e, t) {
		if (!e || Ee) return "";
		Ee = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Ee = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Te(n) : "";
	}
	function De(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Te(e.type);
			case 16: return Te("Lazy");
			case 13: return e.child !== t && t !== null ? Te("Suspense Fallback") : Te("Suspense");
			case 19: return Te("SuspenseList");
			case 0:
			case 15: return k(e.type, !1);
			case 11: return k(e.type.render, !1);
			case 1: return k(e.type, !0);
			case 31: return Te("Activity");
			default: return "";
		}
	}
	function Oe(e) {
		try {
			var t = "", n = null;
			do
				t += De(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var ke = Object.prototype.hasOwnProperty, Ae = t.unstable_scheduleCallback, je = t.unstable_cancelCallback, Me = t.unstable_shouldYield, Ne = t.unstable_requestPaint, A = t.unstable_now, Pe = t.unstable_getCurrentPriorityLevel, Fe = t.unstable_ImmediatePriority, Ie = t.unstable_UserBlockingPriority, j = t.unstable_NormalPriority, M = t.unstable_LowPriority, N = t.unstable_IdlePriority, Le = t.log, Re = t.unstable_setDisableYieldValue, ze = null, Be = null;
	function Ve(e) {
		if (typeof Le == "function" && Re(e), Be && typeof Be.setStrictMode == "function") try {
			Be.setStrictMode(ze, e);
		} catch {}
	}
	var He = Math.clz32 ? Math.clz32 : Ge, Ue = Math.log, We = Math.LN2;
	function Ge(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ue(e) / We | 0) | 0;
	}
	var Ke = 256, qe = 262144, Je = 4194304;
	function Ye(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Xe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ye(n))) : i = Ye(o) : i = Ye(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ye(n))) : i = Ye(o)) : i = Ye(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Ze(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Qe(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
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
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function $e() {
		var e = Je;
		return Je <<= 1, !(Je & 62914560) && (Je = 4194304), e;
	}
	function et(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function tt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function nt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - He(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && rt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function rt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - He(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function it(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - He(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function at(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ot(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ot(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
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
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function st(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ct() {
		var e = D.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : wp(e.type)) : e;
	}
	function lt(e, t) {
		var n = D.p;
		try {
			return D.p = e, t();
		} finally {
			D.p = n;
		}
	}
	var ut = Math.random().toString(36).slice(2), dt = "__reactFiber$" + ut, ft = "__reactProps$" + ut, pt = "__reactContainer$" + ut, mt = "__reactEvents$" + ut, ht = "__reactListeners$" + ut, gt = "__reactHandles$" + ut, _t = "__reactResources$" + ut, vt = "__reactMarker$" + ut;
	function yt(e) {
		delete e[dt], delete e[ft], delete e[mt], delete e[ht], delete e[gt];
	}
	function bt(e) {
		var t = e[dt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[pt] || n[dt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Cf(e); e !== null;) {
					if (n = e[dt]) return n;
					e = Cf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function xt(e) {
		if (e = e[dt] || e[pt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function St(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(a(33));
	}
	function Ct(e) {
		var t = e[_t];
		return t ||= e[_t] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function P(e) {
		e[vt] = !0;
	}
	var wt = /* @__PURE__ */ new Set(), Tt = {};
	function Et(e, t) {
		Dt(e, t), Dt(e + "Capture", t);
	}
	function Dt(e, t) {
		for (Tt[e] = t, e = 0; e < t.length; e++) wt.add(t[e]);
	}
	var Ot = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), kt = {}, At = {};
	function jt(e) {
		return ke.call(At, e) ? !0 : ke.call(kt, e) ? !1 : Ot.test(e) ? At[e] = !0 : (kt[e] = !0, !1);
	}
	function Mt(e, t, n) {
		if (jt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Nt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Pt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Ft(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function It(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Lt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Rt(e) {
		if (!e._valueTracker) {
			var t = It(e) ? "checked" : "value";
			e._valueTracker = Lt(e, t, "" + e[t]);
		}
	}
	function zt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = It(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Bt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Vt = /[\n"\\]/g;
	function Ht(e) {
		return e.replace(Vt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Ut(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ft(t)) : e.value !== "" + Ft(t) && (e.value = "" + Ft(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Gt(e, o, Ft(n)) : Gt(e, o, Ft(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ft(s) : e.removeAttribute("name");
	}
	function Wt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Rt(e);
				return;
			}
			n = n == null ? "" : "" + Ft(n), t = t == null ? n : "" + Ft(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Rt(e);
	}
	function Gt(e, t, n) {
		t === "number" && Bt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Kt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Ft(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function qt(e, t, n) {
		if (t != null && (t = "" + Ft(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Ft(n);
	}
	function Jt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(a(92));
				if (le(r)) {
					if (1 < r.length) throw Error(a(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ft(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Rt(e);
	}
	function Yt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Xt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Zt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Xt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Qt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(a(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var i in t) r = t[i], t.hasOwnProperty(i) && n[i] !== r && Zt(e, i, r);
		} else for (var o in t) t.hasOwnProperty(o) && Zt(e, o, t[o]);
	}
	function $t(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var en = /* @__PURE__ */ new Map([
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
	]), tn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function nn(e) {
		return tn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function rn() {}
	var an = null;
	function on(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var sn = null, cn = null;
	function ln(e) {
		var t = xt(e);
		if (t && (e = t.stateNode)) {
			var n = e[ft] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Ut(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Ht("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var i = r[ft] || null;
								if (!i) throw Error(a(90));
								Ut(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && zt(r);
					}
					break a;
				case "textarea":
					qt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Kt(e, !!n.multiple, t, !1);
			}
		}
	}
	var un = !1;
	function dn(e, t, n) {
		if (un) return e(t, n);
		un = !0;
		try {
			return e(t);
		} finally {
			if (un = !1, (sn !== null || cn !== null) && (Au(), sn && (t = sn, e = cn, cn = sn = null, ln(t), e))) for (t = 0; t < e.length; t++) ln(e[t]);
		}
	}
	function fn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ft] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
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
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(a(231, t, typeof n));
		return n;
	}
	var pn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), mn = !1;
	if (pn) try {
		var hn = {};
		Object.defineProperty(hn, "passive", { get: function() {
			mn = !0;
		} }), window.addEventListener("test", hn, hn), window.removeEventListener("test", hn, hn);
	} catch {
		mn = !1;
	}
	var gn = null, _n = null, vn = null;
	function yn() {
		if (vn) return vn;
		var e, t = _n, n = t.length, r, i = "value" in gn ? gn.value : gn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return vn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function bn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function xn() {
		return !0;
	}
	function Sn() {
		return !1;
	}
	function Cn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? xn : Sn, this.isPropagationStopped = Sn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = xn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = xn);
			},
			persist: function() {},
			isPersistent: xn
		}), t;
	}
	var wn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Tn = Cn(wn), En = h({}, wn, {
		view: 0,
		detail: 0
	}), Dn = Cn(En), On, kn, An, jn = h({}, En, {
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
		getModifierState: Hn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== An && (An && e.type === "mousemove" ? (On = e.screenX - An.screenX, kn = e.screenY - An.screenY) : kn = On = 0, An = e), On);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : kn;
		}
	}), Mn = Cn(jn), Nn = Cn(h({}, jn, { dataTransfer: 0 })), Pn = Cn(h({}, En, { relatedTarget: 0 })), Fn = Cn(h({}, wn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), In = Cn(h({}, wn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Ln = Cn(h({}, wn, { data: 0 })), Rn = {
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
	}, zn = {
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
	}, Bn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Vn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Bn[e]) ? !!t[e] : !1;
	}
	function Hn() {
		return Vn;
	}
	var Un = Cn(h({}, En, {
		key: function(e) {
			if (e.key) {
				var t = Rn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = bn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? zn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Hn,
		charCode: function(e) {
			return e.type === "keypress" ? bn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? bn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Wn = Cn(h({}, jn, {
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
	})), Gn = Cn(h({}, En, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Hn
	})), Kn = Cn(h({}, wn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), qn = Cn(h({}, jn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Jn = Cn(h({}, wn, {
		newState: 0,
		oldState: 0
	})), Yn = [
		9,
		13,
		27,
		32
	], Xn = pn && "CompositionEvent" in window, Zn = null;
	pn && "documentMode" in document && (Zn = document.documentMode);
	var Qn = pn && "TextEvent" in window && !Zn, $n = pn && (!Xn || Zn && 8 < Zn && 11 >= Zn), er = " ", tr = !1;
	function nr(e, t) {
		switch (e) {
			case "keyup": return Yn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function rr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var ir = !1;
	function ar(e, t) {
		switch (e) {
			case "compositionend": return rr(t);
			case "keypress": return t.which === 32 ? (tr = !0, er) : null;
			case "textInput": return e = t.data, e === er && tr ? null : e;
			default: return null;
		}
	}
	function or(e, t) {
		if (ir) return e === "compositionend" || !Xn && nr(e, t) ? (e = yn(), vn = _n = gn = null, ir = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return $n && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var sr = {
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
	function cr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!sr[e.type] : t === "textarea";
	}
	function lr(e, t, n, r) {
		sn ? cn ? cn.push(r) : cn = [r] : sn = r, t = Ld(t, "onChange"), 0 < t.length && (n = new Tn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var ur = null, dr = null;
	function fr(e) {
		Ad(e, 0);
	}
	function pr(e) {
		if (zt(St(e))) return e;
	}
	function mr(e, t) {
		if (e === "change") return t;
	}
	var hr = !1;
	if (pn) {
		var gr;
		if (pn) {
			var _r = "oninput" in document;
			if (!_r) {
				var vr = document.createElement("div");
				vr.setAttribute("oninput", "return;"), _r = typeof vr.oninput == "function";
			}
			gr = _r;
		} else gr = !1;
		hr = gr && (!document.documentMode || 9 < document.documentMode);
	}
	function yr() {
		ur && (ur.detachEvent("onpropertychange", br), dr = ur = null);
	}
	function br(e) {
		if (e.propertyName === "value" && pr(dr)) {
			var t = [];
			lr(t, dr, e, on(e)), dn(fr, t);
		}
	}
	function xr(e, t, n) {
		e === "focusin" ? (yr(), ur = t, dr = n, ur.attachEvent("onpropertychange", br)) : e === "focusout" && yr();
	}
	function Sr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return pr(dr);
	}
	function Cr(e, t) {
		if (e === "click") return pr(t);
	}
	function wr(e, t) {
		if (e === "input" || e === "change") return pr(t);
	}
	function Tr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Er = typeof Object.is == "function" ? Object.is : Tr;
	function Dr(e, t) {
		if (Er(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!ke.call(t, i) || !Er(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Or(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function kr(e, t) {
		var n = Or(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Or(n);
		}
	}
	function Ar(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ar(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function jr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Bt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Bt(e.document);
		}
		return t;
	}
	function Mr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Nr = pn && "documentMode" in document && 11 >= document.documentMode, Pr = null, Fr = null, Ir = null, Lr = !1;
	function Rr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Lr || Pr == null || Pr !== Bt(r) || (r = Pr, "selectionStart" in r && Mr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ir && Dr(Ir, r) || (Ir = r, r = Ld(Fr, "onSelect"), 0 < r.length && (t = new Tn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Pr)));
	}
	function zr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Br = {
		animationend: zr("Animation", "AnimationEnd"),
		animationiteration: zr("Animation", "AnimationIteration"),
		animationstart: zr("Animation", "AnimationStart"),
		transitionrun: zr("Transition", "TransitionRun"),
		transitionstart: zr("Transition", "TransitionStart"),
		transitioncancel: zr("Transition", "TransitionCancel"),
		transitionend: zr("Transition", "TransitionEnd")
	}, Vr = {}, Hr = {};
	pn && (Hr = document.createElement("div").style, "AnimationEvent" in window || (delete Br.animationend.animation, delete Br.animationiteration.animation, delete Br.animationstart.animation), "TransitionEvent" in window || delete Br.transitionend.transition);
	function Ur(e) {
		if (Vr[e]) return Vr[e];
		if (!Br[e]) return e;
		var t = Br[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Hr) return Vr[e] = t[n];
		return e;
	}
	var Wr = Ur("animationend"), Gr = Ur("animationiteration"), Kr = Ur("animationstart"), qr = Ur("transitionrun"), Jr = Ur("transitionstart"), Yr = Ur("transitioncancel"), Xr = Ur("transitionend"), Zr = /* @__PURE__ */ new Map(), Qr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Qr.push("scrollEnd");
	function $r(e, t) {
		Zr.set(e, t), Et(t, [e]);
	}
	var ei = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ti = [], ni = 0, ri = 0;
	function ii() {
		for (var e = ni, t = ri = ni = 0; t < e;) {
			var n = ti[t];
			ti[t++] = null;
			var r = ti[t];
			ti[t++] = null;
			var i = ti[t];
			ti[t++] = null;
			var a = ti[t];
			if (ti[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ci(n, i, a);
		}
	}
	function ai(e, t, n, r) {
		ti[ni++] = e, ti[ni++] = t, ti[ni++] = n, ti[ni++] = r, ri |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function oi(e, t, n, r) {
		return ai(e, t, n, r), li(e);
	}
	function si(e, t) {
		return ai(e, null, null, t), li(e);
	}
	function ci(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - He(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function li(e) {
		if (50 < xu) throw xu = 0, Su = null, Error(a(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ui = {};
	function di(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function fi(e, t, n, r) {
		return new di(e, t, n, r);
	}
	function pi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function mi(e, t) {
		var n = e.alternate;
		return n === null ? (n = fi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function hi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function gi(e, t, n, r, i, o) {
		var s = 0;
		if (r = e, typeof e == "function") pi(e) && (s = 1);
		else if (typeof e == "string") s = $f(e, n, ge.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ae: return e = fi(31, n, t, i), e.elementType = ae, e.lanes = o, e;
			case y: return _i(n.children, i, o, t);
			case b:
				s = 8, i |= 24;
				break;
			case x: return e = fi(12, n, t, i | 2), e.elementType = x, e.lanes = o, e;
			case ne: return e = fi(13, n, t, i), e.elementType = ne, e.lanes = o, e;
			case re: return e = fi(19, n, t, i), e.elementType = re, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case S:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case te:
						s = 11;
						break a;
					case ie:
						s = 14;
						break a;
					case C:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(a(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = fi(s, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function _i(e, t, n, r) {
		return e = fi(7, e, r, t), e.lanes = n, e;
	}
	function vi(e, t, n) {
		return e = fi(6, e, null, t), e.lanes = n, e;
	}
	function yi(e) {
		var t = fi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function bi(e, t, n) {
		return t = fi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var xi = /* @__PURE__ */ new WeakMap();
	function Si(e, t) {
		if (typeof e == "object" && e) {
			var n = xi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Oe(t)
			}, xi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Oe(t)
		};
	}
	var Ci = [], wi = 0, Ti = null, Ei = 0, Di = [], Oi = 0, ki = null, Ai = 1, ji = "";
	function Mi(e, t) {
		Ci[wi++] = Ei, Ci[wi++] = Ti, Ti = e, Ei = t;
	}
	function Ni(e, t, n) {
		Di[Oi++] = Ai, Di[Oi++] = ji, Di[Oi++] = ki, ki = e;
		var r = Ai;
		e = ji;
		var i = 32 - He(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - He(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ai = 1 << 32 - He(t) + i | n << i | r, ji = a + e;
		} else Ai = 1 << a | n << i | r, ji = e;
	}
	function Pi(e) {
		e.return !== null && (Mi(e, 1), Ni(e, 1, 0));
	}
	function Fi(e) {
		for (; e === Ti;) Ti = Ci[--wi], Ci[wi] = null, Ei = Ci[--wi], Ci[wi] = null;
		for (; e === ki;) ki = Di[--Oi], Di[Oi] = null, ji = Di[--Oi], Di[Oi] = null, Ai = Di[--Oi], Di[Oi] = null;
	}
	function Ii(e, t) {
		Di[Oi++] = Ai, Di[Oi++] = ji, Di[Oi++] = ki, Ai = t.id, ji = t.overflow, ki = e;
	}
	var Li = null, Ri = null, F = !1, zi = null, Bi = !1, Vi = Error(a(519));
	function Hi(e) {
		throw Ji(Si(Error(a(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Vi;
	}
	function Ui(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[dt] = e, t[ft] = r, n) {
			case "dialog":
				V("cancel", t), V("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				V("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Od.length; n++) V(Od[n], t);
				break;
			case "source":
				V("error", t);
				break;
			case "img":
			case "image":
			case "link":
				V("error", t), V("load", t);
				break;
			case "details":
				V("toggle", t);
				break;
			case "input":
				V("invalid", t), Wt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				V("invalid", t);
				break;
			case "textarea": V("invalid", t), Jt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Ud(t.textContent, n) ? (r.popover != null && (V("beforetoggle", t), V("toggle", t)), r.onScroll != null && V("scroll", t), r.onScrollEnd != null && V("scrollend", t), r.onClick != null && (t.onclick = rn), t = !0) : t = !1, t || Hi(e, !0);
	}
	function Wi(e) {
		for (Li = e.return; Li;) switch (Li.tag) {
			case 5:
			case 31:
			case 13:
				Bi = !1;
				return;
			case 27:
			case 3:
				Bi = !0;
				return;
			default: Li = Li.return;
		}
	}
	function Gi(e) {
		if (e !== Li) return !1;
		if (!F) return Wi(e), F = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || tf(e.type, e.memoizedProps)), n = !n), n && Ri && Hi(e), Wi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(a(317));
			Ri = Sf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(a(317));
			Ri = Sf(e);
		} else t === 27 ? (t = Ri, uf(e.type) ? (e = xf, xf = null, Ri = e) : Ri = t) : Ri = Li ? bf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ki() {
		Ri = Li = null, F = !1;
	}
	function qi() {
		var e = zi;
		return e !== null && (su === null ? su = e : su.push.apply(su, e), zi = null), e;
	}
	function Ji(e) {
		zi === null ? zi = [e] : zi.push(e);
	}
	var Yi = pe(null), Xi = null, Zi = null;
	function Qi(e, t, n) {
		he(Yi, t._currentValue), t._currentValue = n;
	}
	function $i(e) {
		e._currentValue = Yi.current, me(Yi);
	}
	function ea(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ta(e, t, n, r) {
		var i = e.child;
		for (i !== null && (i.return = e); i !== null;) {
			var o = i.dependencies;
			if (o !== null) {
				var s = i.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = i;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), ea(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (i.tag === 18) {
				if (s = i.return, s === null) throw Error(a(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), ea(s, n, e), s = null;
			} else s = i.child;
			if (s !== null) s.return = i;
			else for (s = i; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (i = s.sibling, i !== null) {
					i.return = s.return, s = i;
					break;
				}
				s = s.return;
			}
			i = s;
		}
	}
	function na(e, t, n, r) {
		e = null;
		for (var i = t, o = !1; i !== null;) {
			if (!o) {
				if (i.flags & 524288) o = !0;
				else if (i.flags & 262144) break;
			}
			if (i.tag === 10) {
				var s = i.alternate;
				if (s === null) throw Error(a(387));
				if (s = s.memoizedProps, s !== null) {
					var c = i.type;
					Er(i.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (i === ye.current) {
				if (s = i.alternate, s === null) throw Error(a(387));
				s.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [cp] : e.push(cp));
			}
			i = i.return;
		}
		e !== null && ta(t, e, n, r), t.flags |= 262144;
	}
	function ra(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Er(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ia(e) {
		Xi = e, Zi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function aa(e) {
		return sa(Xi, e);
	}
	function oa(e, t) {
		return Xi === null && ia(e), sa(e, t);
	}
	function sa(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Zi === null) {
			if (e === null) throw Error(a(308));
			Zi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Zi = Zi.next = t;
		return n;
	}
	var ca = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, la = t.unstable_scheduleCallback, ua = t.unstable_NormalPriority, da = {
		$$typeof: S,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function fa() {
		return {
			controller: new ca(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function pa(e) {
		e.refCount--, e.refCount === 0 && la(ua, function() {
			e.controller.abort();
		});
	}
	var ma = null, I = 0, L = 0, ha = null;
	function ga(e, t) {
		if (ma === null) {
			var n = ma = [];
			I = 0, L = Sd(), ha = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return I++, t.then(_a, _a), t;
	}
	function _a() {
		if (--I === 0 && ma !== null) {
			ha !== null && (ha.status = "fulfilled");
			var e = ma;
			ma = null, L = 0, ha = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function va(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ya = E.S;
	E.S = function(e, t) {
		uu = A(), typeof t == "object" && t && typeof t.then == "function" && ga(e, t), ya !== null && ya(e, t);
	};
	var ba = pe(null);
	function xa() {
		var e = ba.current;
		return e === null ? ql.pooledCache : e;
	}
	function Sa(e, t) {
		t === null ? he(ba, ba.current) : he(ba, t.pool);
	}
	function Ca() {
		var e = xa();
		return e === null ? null : {
			parent: da._currentValue,
			pool: e
		};
	}
	var wa = Error(a(460)), Ta = Error(a(474)), Ea = Error(a(542)), Da = { then: function() {} };
	function Oa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ka(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(rn, rn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Na(e), e;
			default:
				if (typeof t.status == "string") t.then(rn, rn);
				else {
					if (e = ql, e !== null && 100 < e.shellSuspendCounter) throw Error(a(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Na(e), e;
				}
				throw ja = t, wa;
		}
	}
	function Aa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ja = e, wa) : e;
		}
	}
	var ja = null;
	function Ma() {
		if (ja === null) throw Error(a(459));
		var e = ja;
		return ja = null, e;
	}
	function Na(e) {
		if (e === wa || e === Ea) throw Error(a(483));
	}
	var Pa = null, Fa = 0;
	function Ia(e) {
		var t = Fa;
		return Fa += 1, Pa === null && (Pa = []), ka(Pa, e, t);
	}
	function La(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ra(e, t) {
		throw t.$$typeof === g ? Error(a(525)) : (e = Object.prototype.toString.call(t), Error(a(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function za(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function i(e, t) {
			return e = mi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = vi(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var a = n.type;
			return a === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === C && Aa(a) === t.type) ? (t = i(t, n.props), La(t, n), t.return = e, t) : (t = gi(n.type, n.key, n.props, null, e.mode, r), La(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = bi(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, a) {
			return t === null || t.tag !== 7 ? (t = _i(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = vi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = gi(t.type, t.key, t.props, null, e.mode, n), La(n, t), n.return = e, n;
					case v: return t = bi(t, e.mode, n), t.return = e, t;
					case C: return t = Aa(t), f(e, t, n);
				}
				if (le(t) || se(t)) return t = _i(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ia(t), n);
				if (t.$$typeof === S) return f(e, oa(e, t), n);
				Ra(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case C: return n = Aa(n), p(e, t, n, r);
				}
				if (le(n) || se(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ia(n), r);
				if (n.$$typeof === S) return p(e, t, oa(e, n), r);
				Ra(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case C: return r = Aa(r), m(e, t, n, r, i);
				}
				if (le(r) || se(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ia(r), i);
				if (r.$$typeof === S) return m(e, t, n, oa(t, r), i);
				Ra(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), F && Mi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return F && Mi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), F && Mi(i, h), l;
		}
		function g(i, s, c, l) {
			if (c == null) throw Error(a(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(i, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(i, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(i, h), F && Mi(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return F && Mi(i, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), F && Mi(i, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = i(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === C && Aa(l) === r.type) {
										n(e, r.sibling), c = i(r, o.props), La(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = _i(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = gi(o.type, o.key, o.props, null, e.mode, c), La(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = i(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = bi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case C: return o = Aa(o), b(e, r, o, c);
				}
				if (le(o)) return h(e, r, o, c);
				if (se(o)) {
					if (l = se(o), typeof l != "function") throw Error(a(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ia(o), c);
				if (o.$$typeof === S) return b(e, r, oa(e, o), c);
				Ra(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, o), c.return = e, e = c) : (n(e, r), c = vi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Fa = 0;
				var i = b(e, t, n, r);
				return Pa = null, i;
			} catch (t) {
				if (t === wa || t === Ea) throw t;
				var a = fi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ba = za(!0), Va = za(!1), Ha = !1;
	function Ua(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Wa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ga(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ka(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Kl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = li(e), ci(e, null, n), t;
		}
		return ai(e, r, t, n), li(e);
	}
	function qa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, it(e, n);
		}
	}
	function Ja(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ya = !1;
	function Xa() {
		if (Ya) {
			var e = ha;
			if (e !== null) throw e;
		}
	}
	function Za(e, t, n, r) {
		Ya = !1;
		var i = e.updateQueue;
		Ha = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Jl & f) === f : (r & f) === f) {
					f !== 0 && f === L && (Ya = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ha = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), nu |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Qa(e, t) {
		if (typeof e != "function") throw Error(a(191, e));
		e.call(t);
	}
	function $a(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Qa(n[e], t);
	}
	var eo = pe(null), to = pe(0);
	function no(e, t) {
		e = eu, he(to, e), he(eo, t), eu = e | t.baseLanes;
	}
	function ro() {
		he(to, eu), he(eo, eo.current);
	}
	function io() {
		eu = to.current, me(eo), me(to);
	}
	var ao = pe(null), oo = null;
	function so(e) {
		var t = e.alternate;
		he(po, po.current & 1), he(ao, e), oo === null && (t === null || eo.current !== null || t.memoizedState !== null) && (oo = e);
	}
	function co(e) {
		he(po, po.current), he(ao, e), oo === null && (oo = e);
	}
	function lo(e) {
		e.tag === 22 ? (he(po, po.current), he(ao, e), oo === null && (oo = e)) : uo(e);
	}
	function uo() {
		he(po, po.current), he(ao, ao.current);
	}
	function fo(e) {
		me(ao), oo === e && (oo = null), me(po);
	}
	var po = pe(0);
	function mo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || _f(n) || vf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var ho = 0, R = null, go = null, _o = null, vo = !1, yo = !1, bo = !1, xo = 0, So = 0, Co = null, wo = 0;
	function To() {
		throw Error(a(321));
	}
	function Eo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Er(e[n], t[n])) return !1;
		return !0;
	}
	function Do(e, t, n, r, i, a) {
		return ho = a, R = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = e === null || e.memoizedState === null ? Ws : Gs, bo = !1, a = n(r, i), bo = !1, yo && (a = ko(t, n, r, i)), Oo(e), a;
	}
	function Oo(e) {
		E.H = Us;
		var t = go !== null && go.next !== null;
		if (ho = 0, _o = go = R = null, vo = !1, So = 0, Co = null, t) throw Error(a(300));
		e === null || cc || (e = e.dependencies, e !== null && ra(e) && (cc = !0));
	}
	function ko(e, t, n, r) {
		R = e;
		var i = 0;
		do {
			if (yo && (Co = null), So = 0, yo = !1, 25 <= i) throw Error(a(301));
			if (i += 1, _o = go = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			E.H = Ks, o = t(n, r);
		} while (yo);
		return o;
	}
	function Ao() {
		var e = E.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Lo(t) : t, e = e.useState()[0], (go === null ? null : go.memoizedState) !== e && (R.flags |= 1024), t;
	}
	function jo() {
		var e = xo !== 0;
		return xo = 0, e;
	}
	function Mo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function No(e) {
		if (vo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			vo = !1;
		}
		ho = 0, _o = go = R = null, yo = !1, So = xo = 0, Co = null;
	}
	function Po() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return _o === null ? R.memoizedState = _o = e : _o = _o.next = e, _o;
	}
	function Fo() {
		if (go === null) {
			var e = R.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = go.next;
		var t = _o === null ? R.memoizedState : _o.next;
		if (t !== null) _o = t, go = e;
		else {
			if (e === null) throw R.alternate === null ? Error(a(467)) : Error(a(310));
			go = e, e = {
				memoizedState: go.memoizedState,
				baseState: go.baseState,
				baseQueue: go.baseQueue,
				queue: go.queue,
				next: null
			}, _o === null ? R.memoizedState = _o = e : _o = _o.next = e;
		}
		return _o;
	}
	function Io() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Lo(e) {
		var t = So;
		return So += 1, Co === null && (Co = []), e = ka(Co, e, t), t = R, (_o === null ? t.memoizedState : _o.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? Ws : Gs), e;
	}
	function Ro(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Lo(e);
			if (e.$$typeof === S) return aa(e);
		}
		throw Error(a(438, String(e)));
	}
	function zo(e) {
		var t = null, n = R.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = R.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Io(), R.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = w;
		return t.index++, n;
	}
	function Bo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Vo(e) {
		return Ho(Fo(), go, e);
	}
	function Ho(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(a(311));
		r.lastRenderedReducer = n;
		var i = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (i !== null) {
				var s = i.next;
				i.next = o.next, o.next = s;
			}
			t.baseQueue = i = o, r.pending = null;
		}
		if (o = e.baseState, i === null) e.memoizedState = o;
		else {
			t = i.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (ho & f) === f : (Jl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === L && (d = !0);
					else if ((ho & p) === p) {
						u = u.next, p === L && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, R.lanes |= p, nu |= p;
					f = u.action, bo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, R.lanes |= f, nu |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Er(o, e.memoizedState) && (cc = !0, d && (n = ha, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Uo(e) {
		var t = Fo(), n = t.queue;
		if (n === null) throw Error(a(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, o = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var s = i = i.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== i);
			Er(o, t.memoizedState) || (cc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Wo(e, t, n) {
		var r = R, i = Fo(), o = F;
		if (o) {
			if (n === void 0) throw Error(a(407));
			n = n();
		} else n = t();
		var s = !Er((go || i).memoizedState, n);
		if (s && (i.memoizedState = n, cc = !0), i = i.queue, hs(qo.bind(null, r, i, e), [e]), i.getSnapshot !== t || s || _o !== null && _o.memoizedState.tag & 1) {
			if (r.flags |= 2048, us(9, { destroy: void 0 }, Ko.bind(null, r, i, n, t), null), ql === null) throw Error(a(349));
			o || ho & 127 || Go(r, t, n);
		}
		return n;
	}
	function Go(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = R.updateQueue, t === null ? (t = Io(), R.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ko(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Jo(t) && Yo(e);
	}
	function qo(e, t, n) {
		return n(function() {
			Jo(t) && Yo(e);
		});
	}
	function Jo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Er(e, n);
		} catch {
			return !0;
		}
	}
	function Yo(e) {
		var t = si(e, 2);
		t !== null && Tu(t, e, 2);
	}
	function Xo(e) {
		var t = Po();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), bo) {
				Ve(!0);
				try {
					n();
				} finally {
					Ve(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Bo,
			lastRenderedState: e
		}, t;
	}
	function Zo(e, t, n, r) {
		return e.baseState = n, Ho(e, go, typeof r == "function" ? r : Bo);
	}
	function Qo(e, t, n, r, i) {
		if (Bs(e)) throw Error(a(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: i,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			E.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, $o(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function $o(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = E.T, o = {};
			E.T = o;
			try {
				var s = n(i, r), c = E.S;
				c !== null && c(o, s), es(e, t, s);
			} catch (n) {
				ns(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), E.T = a;
			}
		} else try {
			a = n(i, r), es(e, t, a);
		} catch (n) {
			ns(e, t, n);
		}
	}
	function es(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ts(e, t, n);
		}, function(n) {
			return ns(e, t, n);
		}) : ts(e, t, n);
	}
	function ts(e, t, n) {
		t.status = "fulfilled", t.value = n, rs(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, $o(e, n)));
	}
	function ns(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, rs(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function rs(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function is(e, t) {
		return t;
	}
	function as(e, t) {
		if (F) {
			var n = ql.formState;
			if (n !== null) {
				a: {
					var r = R;
					if (F) {
						if (Ri) {
							b: {
								for (var i = Ri, a = Bi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = bf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Ri = bf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Hi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Po(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: is,
			lastRenderedState: t
		}, n.queue = r, n = Ls.bind(null, R, r), r.dispatch = n, r = Xo(!1), a = zs.bind(null, R, !1, r.queue), r = Po(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Qo.bind(null, R, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function os(e) {
		return ss(Fo(), go, e);
	}
	function ss(e, t, n) {
		if (t = Ho(e, t, is)[0], e = Vo(Bo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Lo(t);
		} catch (e) {
			throw e === wa ? Ea : e;
		}
		else r = t;
		t = Fo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (R.flags |= 2048, us(9, { destroy: void 0 }, cs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function cs(e, t) {
		e.action = t;
	}
	function ls(e) {
		var t = Fo(), n = go;
		if (n !== null) return ss(t, n, e);
		Fo(), t = t.memoizedState, n = Fo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function us(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = R.updateQueue, t === null && (t = Io(), R.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ds() {
		return Fo().memoizedState;
	}
	function fs(e, t, n, r) {
		var i = Po();
		R.flags |= e, i.memoizedState = us(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ps(e, t, n, r) {
		var i = Fo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		go !== null && r !== null && Eo(r, go.memoizedState.deps) ? i.memoizedState = us(t, a, n, r) : (R.flags |= e, i.memoizedState = us(1 | t, a, n, r));
	}
	function ms(e, t) {
		fs(8390656, 8, e, t);
	}
	function hs(e, t) {
		ps(2048, 8, e, t);
	}
	function gs(e) {
		R.flags |= 4;
		var t = R.updateQueue;
		if (t === null) t = Io(), R.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function _s(e) {
		var t = Fo().memoizedState;
		return gs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Kl & 2) throw Error(a(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function vs(e, t) {
		return ps(4, 2, e, t);
	}
	function ys(e, t) {
		return ps(4, 4, e, t);
	}
	function bs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function xs(e, t, n) {
		n = n == null ? null : n.concat([e]), ps(4, 4, bs.bind(null, t, e), n);
	}
	function Ss() {}
	function Cs(e, t) {
		var n = Fo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Eo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ws(e, t) {
		var n = Fo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Eo(t, r[1])) return r[0];
		if (r = e(), bo) {
			Ve(!0);
			try {
				e();
			} finally {
				Ve(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Ts(e, t, n) {
		return n === void 0 || ho & 1073741824 && !(Jl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = wu(), R.lanes |= e, nu |= e, n);
	}
	function Es(e, t, n, r) {
		return Er(n, t) ? n : eo.current === null ? !(ho & 42) || ho & 1073741824 && !(Jl & 261930) ? (cc = !0, e.memoizedState = n) : (e = wu(), R.lanes |= e, nu |= e, t) : (e = Ts(e, n, r), Er(e, t) || (cc = !0), e);
	}
	function Ds(e, t, n, r, i) {
		var a = D.p;
		D.p = a !== 0 && 8 > a ? a : 8;
		var o = E.T, s = {};
		E.T = s, zs(e, !1, t, n);
		try {
			var c = i(), l = E.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Rs(e, t, va(c, r), Cu(e)) : Rs(e, t, r, Cu(e));
		} catch (n) {
			Rs(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Cu());
		} finally {
			D.p = a, o !== null && s.types !== null && (o.types = s.types), E.T = o;
		}
	}
	function Os() {}
	function ks(e, t, n, r) {
		if (e.tag !== 5) throw Error(a(476));
		var i = As(e).queue;
		Ds(e, i, t, ue, n === null ? Os : function() {
			return js(e), n(r);
		});
	}
	function As(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ue,
			baseState: ue,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Bo,
				lastRenderedState: ue
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Bo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function js(e) {
		var t = As(e);
		t.next === null && (t = e.alternate.memoizedState), Rs(e, t.next.queue, {}, Cu());
	}
	function Ms() {
		return aa(cp);
	}
	function Ns() {
		return Fo().memoizedState;
	}
	function Ps() {
		return Fo().memoizedState;
	}
	function Fs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Cu();
					e = Ga(n);
					var r = Ka(t, e, n);
					r !== null && (Tu(r, t, n), qa(r, t, n)), t = { cache: fa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Is(e, t, n) {
		var r = Cu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Bs(e) ? Vs(t, n) : (n = oi(e, t, n, r), n !== null && (Tu(n, e, r), Hs(n, t, r)));
	}
	function Ls(e, t, n) {
		Rs(e, t, n, Cu());
	}
	function Rs(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Bs(e)) Vs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Er(s, o)) return ai(e, t, i, 0), ql === null && ii(), !1;
			} catch {}
			if (n = oi(e, t, i, r), n !== null) return Tu(n, e, r), Hs(n, t, r), !0;
		}
		return !1;
	}
	function zs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Sd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Bs(e)) {
			if (t) throw Error(a(479));
		} else t = oi(e, n, r, 2), t !== null && Tu(t, e, 2);
	}
	function Bs(e) {
		var t = e.alternate;
		return e === R || t !== null && t === R;
	}
	function Vs(e, t) {
		yo = vo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Hs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, it(e, n);
		}
	}
	var Us = {
		readContext: aa,
		use: Ro,
		useCallback: To,
		useContext: To,
		useEffect: To,
		useImperativeHandle: To,
		useLayoutEffect: To,
		useInsertionEffect: To,
		useMemo: To,
		useReducer: To,
		useRef: To,
		useState: To,
		useDebugValue: To,
		useDeferredValue: To,
		useTransition: To,
		useSyncExternalStore: To,
		useId: To,
		useHostTransitionStatus: To,
		useFormState: To,
		useActionState: To,
		useOptimistic: To,
		useMemoCache: To,
		useCacheRefresh: To
	};
	Us.useEffectEvent = To;
	var Ws = {
		readContext: aa,
		use: Ro,
		useCallback: function(e, t) {
			return Po().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: aa,
		useEffect: ms,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), fs(4194308, 4, bs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return fs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			fs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Po();
			t = t === void 0 ? null : t;
			var r = e();
			if (bo) {
				Ve(!0);
				try {
					e();
				} finally {
					Ve(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Po();
			if (n !== void 0) {
				var i = n(t);
				if (bo) {
					Ve(!0);
					try {
						n(t);
					} finally {
						Ve(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Is.bind(null, R, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Po();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Xo(e);
			var t = e.queue, n = Ls.bind(null, R, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Ss,
		useDeferredValue: function(e, t) {
			return Ts(Po(), e, t);
		},
		useTransition: function() {
			var e = Xo(!1);
			return e = Ds.bind(null, R, e.queue, !0, !1), Po().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = R, i = Po();
			if (F) {
				if (n === void 0) throw Error(a(407));
				n = n();
			} else {
				if (n = t(), ql === null) throw Error(a(349));
				Jl & 127 || Go(r, t, n);
			}
			i.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return i.queue = o, ms(qo.bind(null, r, o, e), [e]), r.flags |= 2048, us(9, { destroy: void 0 }, Ko.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Po(), t = ql.identifierPrefix;
			if (F) {
				var n = ji, r = Ai;
				n = (r & ~(1 << 32 - He(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = xo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = wo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ms,
		useFormState: as,
		useActionState: as,
		useOptimistic: function(e) {
			var t = Po();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = zs.bind(null, R, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: zo,
		useCacheRefresh: function() {
			return Po().memoizedState = Fs.bind(null, R);
		},
		useEffectEvent: function(e) {
			var t = Po(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Kl & 2) throw Error(a(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Gs = {
		readContext: aa,
		use: Ro,
		useCallback: Cs,
		useContext: aa,
		useEffect: hs,
		useImperativeHandle: xs,
		useInsertionEffect: vs,
		useLayoutEffect: ys,
		useMemo: ws,
		useReducer: Vo,
		useRef: ds,
		useState: function() {
			return Vo(Bo);
		},
		useDebugValue: Ss,
		useDeferredValue: function(e, t) {
			return Es(Fo(), go.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Vo(Bo)[0], t = Fo().memoizedState;
			return [typeof e == "boolean" ? e : Lo(e), t];
		},
		useSyncExternalStore: Wo,
		useId: Ns,
		useHostTransitionStatus: Ms,
		useFormState: os,
		useActionState: os,
		useOptimistic: function(e, t) {
			return Zo(Fo(), go, e, t);
		},
		useMemoCache: zo,
		useCacheRefresh: Ps
	};
	Gs.useEffectEvent = _s;
	var Ks = {
		readContext: aa,
		use: Ro,
		useCallback: Cs,
		useContext: aa,
		useEffect: hs,
		useImperativeHandle: xs,
		useInsertionEffect: vs,
		useLayoutEffect: ys,
		useMemo: ws,
		useReducer: Uo,
		useRef: ds,
		useState: function() {
			return Uo(Bo);
		},
		useDebugValue: Ss,
		useDeferredValue: function(e, t) {
			var n = Fo();
			return go === null ? Ts(n, e, t) : Es(n, go.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Uo(Bo)[0], t = Fo().memoizedState;
			return [typeof e == "boolean" ? e : Lo(e), t];
		},
		useSyncExternalStore: Wo,
		useId: Ns,
		useHostTransitionStatus: Ms,
		useFormState: ls,
		useActionState: ls,
		useOptimistic: function(e, t) {
			var n = Fo();
			return go === null ? (n.baseState = e, [e, n.queue.dispatch]) : Zo(n, go, e, t);
		},
		useMemoCache: zo,
		useCacheRefresh: Ps
	};
	Ks.useEffectEvent = _s;
	function qs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Js = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Cu(), i = Ga(r);
			i.payload = t, n != null && (i.callback = n), t = Ka(e, i, r), t !== null && (Tu(t, e, r), qa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Cu(), i = Ga(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ka(e, i, r), t !== null && (Tu(t, e, r), qa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Cu(), r = Ga(n);
			r.tag = 2, t != null && (r.callback = t), t = Ka(e, r, n), t !== null && (Tu(t, e, n), qa(t, e, n));
		}
	};
	function Ys(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Dr(n, r) || !Dr(i, a) : !0;
	}
	function Xs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Js.enqueueReplaceState(t, t.state, null);
	}
	function Zs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Qs(e) {
		ei(e);
	}
	function $s(e) {
		console.error(e);
	}
	function ec(e) {
		ei(e);
	}
	function tc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function nc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function rc(e, t, n) {
		return n = Ga(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			tc(e, t);
		}, n;
	}
	function ic(e) {
		return e = Ga(e), e.tag = 3, e;
	}
	function ac(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				nc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			nc(t, n, r), typeof i != "function" && (pu === null ? pu = /* @__PURE__ */ new Set([this]) : pu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function oc(e, t, n, r, i) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && na(t, n, i, !0), n = ao.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return oo === null ? Lu() : n.alternate === null && tu === 0 && (tu = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Da ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), nd(e, r, i)), !1;
					case 22: return n.flags |= 65536, r === Da ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), nd(e, r, i)), !1;
				}
				throw Error(a(435, n.tag));
			}
			return nd(e, r, i), Lu(), !1;
		}
		if (F) return t = ao.current, t === null ? (r !== Vi && (t = Error(a(423), { cause: r }), Ji(Si(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Si(r, n), i = rc(e.stateNode, r, i), Ja(e, i), tu !== 4 && (tu = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== Vi && (e = Error(a(422), { cause: r }), Ji(Si(e, n)))), !1;
		var o = Error(a(520), { cause: r });
		if (o = Si(o, n), B === null ? B = [o] : B.push(o), tu !== 4 && (tu = 2), t === null) return !0;
		r = Si(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = rc(n.stateNode, r, e), Ja(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (pu === null || !pu.has(o)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = ic(i), ac(i, e, n, r), Ja(n, i), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var sc = Error(a(461)), cc = !1;
	function lc(e, t, n, r) {
		t.child = e === null ? Va(t, null, n, r) : Ba(t, e.child, n, r);
	}
	function uc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ia(t), r = Do(e, t, n, o, a, i), s = jo(), e !== null && !cc ? (Mo(e, t, i), Pc(e, t, i)) : (F && s && Pi(t), t.flags |= 1, lc(e, t, r, i), t.child);
	}
	function dc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !pi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, fc(e, t, a, r, i)) : (e = gi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Fc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Dr : n, n(o, r) && e.ref === t.ref) return Pc(e, t, i);
		}
		return t.flags |= 1, e = mi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function fc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Dr(a, r) && e.ref === t.ref) if (cc = !1, t.pendingProps = r = a, Fc(e, i)) e.flags & 131072 && (cc = !0);
			else return t.lanes = e.lanes, Pc(e, t, i);
		}
		return bc(e, t, n, r, i);
	}
	function pc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return hc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Sa(t, a === null ? null : a.cachePool), a === null ? ro() : no(t, a), lo(t);
			else return r = t.lanes = 536870912, hc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Sa(t, null), ro(), uo(t)) : (Sa(t, a.cachePool), no(t, a), uo(t), t.memoizedState = null);
		return lc(e, t, i, n), t.child;
	}
	function mc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function hc(e, t, n, r, i) {
		var a = xa();
		return a = a === null ? null : {
			parent: da._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Sa(t, null), ro(), lo(t), e !== null && na(e, t, r, !0), t.childLanes = i, null;
	}
	function gc(e, t) {
		return t = kc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function _c(e, t, n) {
		return Ba(t, e.child, null, n), e = gc(t, t.pendingProps), e.flags |= 2, fo(t), t.memoizedState = null, e;
	}
	function vc(e, t, n) {
		var r = t.pendingProps, i = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (F) {
				if (r.mode === "hidden") return e = gc(t, r), t.lanes = 536870912, mc(null, e);
				if (co(t), (e = Ri) ? (e = gf(e, Bi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ki === null ? null : {
						id: Ai,
						overflow: ji
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = yi(e), n.return = t, t.child = n, Li = t, Ri = null)) : e = null, e === null) throw Hi(t);
				return t.lanes = 536870912, null;
			}
			return gc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (co(t), i) if (t.flags & 256) t.flags &= -257, t = _c(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(a(558));
			else if (cc || na(e, t, n, !1), i = (n & e.childLanes) !== 0, cc || i) {
				if (r = ql, r !== null && (s = at(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, si(e, s), Tu(r, e, s), sc;
				Lu(), t = _c(e, t, n);
			} else e = o.treeContext, Ri = bf(s.nextSibling), Li = t, F = !0, zi = null, Bi = !1, e !== null && Ii(t, e), t = gc(t, r), t.flags |= 4096;
			return t;
		}
		return e = mi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function yc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(a(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function bc(e, t, n, r, i) {
		return ia(t), n = Do(e, t, n, r, void 0, i), r = jo(), e !== null && !cc ? (Mo(e, t, i), Pc(e, t, i)) : (F && r && Pi(t), t.flags |= 1, lc(e, t, n, i), t.child);
	}
	function xc(e, t, n, r, i, a) {
		return ia(t), t.updateQueue = null, n = ko(t, r, n, i), Oo(e), r = jo(), e !== null && !cc ? (Mo(e, t, a), Pc(e, t, a)) : (F && r && Pi(t), t.flags |= 1, lc(e, t, n, a), t.child);
	}
	function Sc(e, t, n, r, i) {
		if (ia(t), t.stateNode === null) {
			var a = ui, o = n.contextType;
			typeof o == "object" && o && (a = aa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Js, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ua(t), o = n.contextType, a.context = typeof o == "object" && o ? aa(o) : ui, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (qs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Js.enqueueReplaceState(a, a.state, null), Za(t, r, a, i), Xa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Zs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ui, typeof u == "object" && u && (o = aa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Xs(t, a, r, o), Ha = !1;
			var f = t.memoizedState;
			a.state = f, Za(t, r, a, i), Xa(), l = t.memoizedState, s || f !== l || Ha ? (typeof d == "function" && (qs(t, n, d, r), l = t.memoizedState), (c = Ha || Ys(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Wa(e, t), o = t.memoizedProps, u = Zs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ui, typeof l == "object" && l && (c = aa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Xs(t, a, r, c), Ha = !1, f = t.memoizedState, a.state = f, Za(t, r, a, i), Xa();
			var p = t.memoizedState;
			o !== d || f !== p || Ha || e !== null && e.dependencies !== null && ra(e.dependencies) ? (typeof s == "function" && (qs(t, n, s, r), p = t.memoizedState), (u = Ha || Ys(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ra(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, yc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ba(t, e.child, null, i), t.child = Ba(t, null, n, i)) : lc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Pc(e, t, i), e;
	}
	function Cc(e, t, n, r) {
		return Ki(), t.flags |= 256, lc(e, t, n, r), t.child;
	}
	var wc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Tc(e) {
		return {
			baseLanes: e,
			cachePool: Ca()
		};
	}
	function Ec(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= au), e;
	}
	function Dc(e, t, n) {
		var r = t.pendingProps, i = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (po.current & 2) != 0), s && (i = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (F) {
				if (i ? so(t) : uo(t), (e = Ri) ? (e = gf(e, Bi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ki === null ? null : {
						id: Ai,
						overflow: ji
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = yi(e), n.return = t, t.child = n, Li = t, Ri = null)) : e = null, e === null) throw Hi(t);
				return vf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, i ? (uo(t), i = t.mode, c = kc({
				mode: "hidden",
				children: c
			}, i), r = _i(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = Tc(n), r.childLanes = Ec(e, s, n), t.memoizedState = wc, mc(null, r)) : (so(t), Oc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (so(t), t.flags &= -257, t = Ac(e, t, n)) : t.memoizedState === null ? (uo(t), c = r.fallback, i = t.mode, r = kc({
				mode: "visible",
				children: r.children
			}, i), c = _i(c, i, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ba(t, e.child, null, n), r = t.child, r.memoizedState = Tc(n), r.childLanes = Ec(e, s, n), t.memoizedState = wc, t = mc(null, r)) : (uo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (so(t), vf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(a(419)), r.stack = "", r.digest = s, Ji({
					value: r,
					source: null,
					stack: null
				}), t = Ac(e, t, n);
			} else if (cc || na(e, t, n, !1), s = (n & e.childLanes) !== 0, cc || s) {
				if (s = ql, s !== null && (r = at(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, si(e, r), Tu(s, e, r), sc;
				_f(c) || Lu(), t = Ac(e, t, n);
			} else _f(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Ri = bf(c.nextSibling), Li = t, F = !0, zi = null, Bi = !1, e !== null && Ii(t, e), t = Oc(t, r.children), t.flags |= 4096);
			return t;
		}
		return i ? (uo(t), c = r.fallback, i = t.mode, l = e.child, u = l.sibling, r = mi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = _i(c, i, n, null), c.flags |= 2) : c = mi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, mc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = Tc(n) : (i = c.cachePool, i === null ? i = Ca() : (l = da._currentValue, i = i.parent === l ? i : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: i
		}), r.memoizedState = c, r.childLanes = Ec(e, s, n), t.memoizedState = wc, mc(e.child, r)) : (so(t), n = e.child, e = n.sibling, n = mi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Oc(e, t) {
		return t = kc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function kc(e, t) {
		return e = fi(22, e, null, t), e.lanes = 0, e;
	}
	function Ac(e, t, n) {
		return Ba(t, e.child, null, n), e = Oc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function jc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ea(e.return, t, n);
	}
	function Mc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Nc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = po.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, he(po, o), lc(e, t, r, n), r = F ? Ei : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && jc(e, n, t);
			else if (e.tag === 19) jc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && mo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Mc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && mo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Mc(t, !0, n, null, a, r);
				break;
			case "together":
				Mc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Pc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), nu |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (na(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(a(153));
		if (t.child !== null) {
			for (e = t.child, n = mi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = mi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Fc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && ra(e))) : !0;
	}
	function Ic(e, t, n) {
		switch (t.tag) {
			case 3:
				be(t, t.stateNode.containerInfo), Qi(t, da, e.memoizedState.cache), Ki();
				break;
			case 27:
			case 5:
				Se(t);
				break;
			case 4:
				be(t, t.stateNode.containerInfo);
				break;
			case 10:
				Qi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, co(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (so(t), e = Pc(e, t, n), e === null ? null : e.sibling) : Dc(e, t, n) : (so(t), t.flags |= 128, null);
				so(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (na(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Nc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), he(po, po.current), r) break;
				return null;
			case 22: return t.lanes = 0, pc(e, t, n, t.pendingProps);
			case 24: Qi(t, da, e.memoizedState.cache);
		}
		return Pc(e, t, n);
	}
	function Lc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) cc = !0;
		else {
			if (!Fc(e, n) && !(t.flags & 128)) return cc = !1, Ic(e, t, n);
			cc = !!(e.flags & 131072);
		}
		else cc = !1, F && t.flags & 1048576 && Ni(t, Ei, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Aa(t.elementType), t.type = e, typeof e == "function") pi(e) ? (r = Zs(e, r), t.tag = 1, t = Sc(null, t, e, r, n)) : (t.tag = 0, t = bc(null, t, e, r, n));
					else {
						if (e != null) {
							var i = e.$$typeof;
							if (i === te) {
								t.tag = 11, t = uc(null, t, e, r, n);
								break a;
							} else if (i === ie) {
								t.tag = 14, t = dc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ce(e) || e, Error(a(306, t, ""));
					}
				}
				return t;
			case 0: return bc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, i = Zs(r, t.pendingProps), Sc(e, t, r, i, n);
			case 3:
				a: {
					if (be(t, t.stateNode.containerInfo), e === null) throw Error(a(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					i = o.element, Wa(e, t), Za(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Qi(t, da, r), r !== o.cache && ta(t, [da], n, !0), Xa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = Cc(e, t, r, n);
						break a;
					} else if (r !== i) {
						i = Si(Error(a(424)), t), Ji(i), t = Cc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ri = bf(e.firstChild), Li = t, F = !0, zi = null, Bi = !0, n = Va(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ki(), r === i) {
							t = Pc(e, t, n);
							break a;
						}
						lc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return yc(e, t), e === null ? (n = Bf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : F || (n = t.type, e = t.pendingProps, r = Qd(ve.current).createElement(n), r[dt] = t, r[ft] = e, Kd(r, n, e), P(r), t.stateNode = r) : t.memoizedState = Bf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Se(t), e === null && F && (r = t.stateNode = wf(t.type, t.pendingProps, ve.current), Li = t, Bi = !0, i = Ri, uf(t.type) ? (xf = i, Ri = bf(r.firstChild)) : Ri = i), lc(e, t, t.pendingProps.children, n), yc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && F && ((i = r = Ri) && (r = mf(r, t.type, t.pendingProps, Bi), r === null ? i = !1 : (t.stateNode = r, Li = t, Ri = bf(r.firstChild), Bi = !1, i = !0)), i || Hi(t)), Se(t), i = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, tf(i, o) ? r = null : s !== null && tf(i, s) && (t.flags |= 32), t.memoizedState !== null && (i = Do(e, t, Ao, null, null, n), cp._currentValue = i), yc(e, t), lc(e, t, r, n), t.child;
			case 6: return e === null && F && ((e = n = Ri) && (n = hf(n, t.pendingProps, Bi), n === null ? e = !1 : (t.stateNode = n, Li = t, Ri = null, e = !0)), e || Hi(t)), null;
			case 13: return Dc(e, t, n);
			case 4: return be(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ba(t, null, r, n) : lc(e, t, r, n), t.child;
			case 11: return uc(e, t, t.type, t.pendingProps, n);
			case 7: return lc(e, t, t.pendingProps, n), t.child;
			case 8: return lc(e, t, t.pendingProps.children, n), t.child;
			case 12: return lc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Qi(t, t.type, r.value), lc(e, t, r.children, n), t.child;
			case 9: return i = t.type._context, r = t.pendingProps.children, ia(t), i = aa(i), r = r(i), t.flags |= 1, lc(e, t, r, n), t.child;
			case 14: return dc(e, t, t.type, t.pendingProps, n);
			case 15: return fc(e, t, t.type, t.pendingProps, n);
			case 19: return Nc(e, t, n);
			case 31: return vc(e, t, n);
			case 22: return pc(e, t, n, t.pendingProps);
			case 24: return ia(t), r = aa(da), e === null ? (i = xa(), i === null && (i = ql, o = fa(), i.pooledCache = o, o.refCount++, o !== null && (i.pooledCacheLanes |= n), i = o), t.memoizedState = {
				parent: r,
				cache: i
			}, Ua(t), Qi(t, da, i)) : ((e.lanes & n) !== 0 && (Wa(e, t), Za(t, null, null, n), Xa()), i = e.memoizedState, o = t.memoizedState, i.parent === r ? (r = o.cache, Qi(t, da, r), r !== i.cache && ta(t, [da], n, !0)) : (i = {
				parent: r,
				cache: r
			}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Qi(t, da, r))), lc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(a(156, t.tag));
	}
	function Rc(e) {
		e.flags |= 4;
	}
	function zc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Pu()) e.flags |= 8192;
			else throw ja = Da, Ta;
		} else e.flags &= -16777217;
	}
	function Bc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !ep(t)) if (Pu()) e.flags |= 8192;
		else throw ja = Da, Ta;
	}
	function Vc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : $e(), e.lanes |= t, ou |= t);
	}
	function Hc(e, t) {
		if (!F) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Uc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Wc(e, t, n) {
		var r = t.pendingProps;
		switch (Fi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Uc(t), null;
			case 1: return Uc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), $i(da), xe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Gi(t) ? Rc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, qi())), Uc(t), null;
			case 26:
				var i = t.type, o = t.memoizedState;
				return e === null ? (Rc(t), o === null ? (Uc(t), zc(t, i, null, r, n)) : (Uc(t), Bc(t, o))) : o ? o === e.memoizedState ? (Uc(t), t.flags &= -16777217) : (Rc(t), Uc(t), Bc(t, o)) : (e = e.memoizedProps, e !== r && Rc(t), Uc(t), zc(t, i, e, r, n)), null;
			case 27:
				if (O(t), n = ve.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Rc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(a(166));
						return Uc(t), null;
					}
					e = ge.current, Gi(t) ? Ui(t, e) : (e = wf(i, r, n), t.stateNode = e, Rc(t));
				}
				return Uc(t), null;
			case 5:
				if (O(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Rc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(a(166));
						return Uc(t), null;
					}
					if (o = ge.current, Gi(t)) Ui(t, o);
					else {
						var s = Qd(ve.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", i);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", i);
								break;
							default: switch (i) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", i);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", i);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(i, { is: r.is }) : s.createElement(i);
							}
						}
						o[dt] = t, o[ft] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Kd(o, i, r), i) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Rc(t);
					}
				}
				return Uc(t), zc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Rc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(a(166));
					if (e = ve.current, Gi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, i = Li, i !== null) switch (i.tag) {
							case 27:
							case 5: r = i.memoizedProps;
						}
						e[dt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Ud(e.nodeValue, n)), e || Hi(t, !0);
					} else e = Qd(e).createTextNode(r), e[dt] = t, t.stateNode = e;
				}
				return Uc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Gi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(a(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(a(557));
							e[dt] = t;
						} else Ki(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Uc(t), e = !1;
					} else n = qi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (fo(t), t) : (fo(t), null);
					if (t.flags & 128) throw Error(a(558));
				}
				return Uc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (i = Gi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!i) throw Error(a(318));
							if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(a(317));
							i[dt] = t;
						} else Ki(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Uc(t), i = !1;
					} else i = qi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
					if (!i) return t.flags & 256 ? (fo(t), t) : (fo(t), null);
				}
				return fo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Vc(t, t.updateQueue), Uc(t), null);
			case 4: return xe(), e === null && Nd(t.stateNode.containerInfo), Uc(t), null;
			case 10: return $i(t.type), Uc(t), null;
			case 19:
				if (me(po), r = t.memoizedState, r === null) return Uc(t), null;
				if (i = (t.flags & 128) != 0, o = r.rendering, o === null) if (i) Hc(r, !1);
				else {
					if (tu !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = mo(e), o !== null) {
							for (t.flags |= 128, Hc(r, !1), e = o.updateQueue, t.updateQueue = e, Vc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) hi(n, e), n = n.sibling;
							return he(po, po.current & 1 | 2), F && Mi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && A() > du && (t.flags |= 128, i = !0, Hc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!i) if (e = mo(o), e !== null) {
						if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Vc(t, e), Hc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !F) return Uc(t), null;
					} else 2 * A() - r.renderingStartTime > du && n !== 536870912 && (t.flags |= 128, i = !0, Hc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Uc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = A(), e.sibling = null, n = po.current, he(po, i ? n & 1 | 2 : n & 1), F && Mi(t, r.treeForkCount), e);
			case 22:
			case 23: return fo(t), io(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Uc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Uc(t), n = t.updateQueue, n !== null && Vc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && me(ba), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), $i(da), Uc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(a(156, t.tag));
	}
	function Gc(e, t) {
		switch (Fi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return $i(da), xe(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return O(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (fo(t), t.alternate === null) throw Error(a(340));
					Ki();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (fo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(a(340));
					Ki();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return me(po), null;
			case 4: return xe(), null;
			case 10: return $i(t.type), null;
			case 22:
			case 23: return fo(t), io(), e !== null && me(ba), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return $i(da), null;
			case 25: return null;
			default: return null;
		}
	}
	function Kc(e, t) {
		switch (Fi(t), t.tag) {
			case 3:
				$i(da), xe();
				break;
			case 26:
			case 27:
			case 5:
				O(t);
				break;
			case 4:
				xe();
				break;
			case 31:
				t.memoizedState !== null && fo(t);
				break;
			case 13:
				fo(t);
				break;
			case 19:
				me(po);
				break;
			case 10:
				$i(t.type);
				break;
			case 22:
			case 23:
				fo(t), io(), e !== null && me(ba);
				break;
			case 24: $i(da);
		}
	}
	function qc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			td(t, t.return, e);
		}
	}
	function Jc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								td(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			td(t, t.return, e);
		}
	}
	function Yc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				$a(t, n);
			} catch (t) {
				td(e, e.return, t);
			}
		}
	}
	function Xc(e, t, n) {
		n.props = Zs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			td(e, t, n);
		}
	}
	function Zc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			td(e, t, n);
		}
	}
	function Qc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			td(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			td(e, t, n);
		}
		else n.current = null;
	}
	function $c(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			td(e, e.return, t);
		}
	}
	function el(e, t, n) {
		try {
			var r = e.stateNode;
			qd(r, e.type, n, t), r[ft] = t;
		} catch (t) {
			td(e, e.return, t);
		}
	}
	function tl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && uf(e.type) || e.tag === 4;
	}
	function nl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || tl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && uf(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function rl(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = rn));
		else if (r !== 4 && (r === 27 && uf(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (rl(e, t, n), e = e.sibling; e !== null;) rl(e, t, n), e = e.sibling;
	}
	function il(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && uf(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (il(e, t, n), e = e.sibling; e !== null;) il(e, t, n), e = e.sibling;
	}
	function al(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Kd(t, r, n), t[dt] = e, t[ft] = n;
		} catch (t) {
			td(e, e.return, t);
		}
	}
	var ol = !1, sl = !1, cl = !1, ll = typeof WeakSet == "function" ? WeakSet : Set, ul = null;
	function dl(e, t) {
		if (e = e.containerInfo, Xd = _p, e = jr(e), Mr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var i = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = s + i), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === i && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Zd = {
			focusedElem: e,
			selectionRange: n
		}, _p = !1, ul = t; ul !== null;) if (t = ul, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, ul = e;
		else for (; ul !== null;) {
			switch (t = ul, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, i = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Zs(n.type, i);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							td(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) pf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								pf(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(a(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, ul = e;
				break;
			}
			ul = t.return;
		}
	}
	function fl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Dl(e, n), r & 4 && qc(5, n);
				break;
			case 1:
				if (Dl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					td(n, n.return, e);
				}
				else {
					var i = Zs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						td(n, n.return, e);
					}
				}
				r & 64 && Yc(n), r & 512 && Zc(n, n.return);
				break;
			case 3:
				if (Dl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						$a(e, t);
					} catch (e) {
						td(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && al(n);
			case 26:
			case 5:
				Dl(e, n), t === null && r & 4 && $c(n), r & 512 && Zc(n, n.return);
				break;
			case 12:
				Dl(e, n);
				break;
			case 31:
				Dl(e, n), r & 4 && vl(e, n);
				break;
			case 13:
				Dl(e, n), r & 4 && yl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = ad.bind(null, n), yf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || ol, !r) {
					t = t !== null && t.memoizedState !== null || sl, i = ol;
					var a = sl;
					ol = r, (sl = t) && !a ? kl(e, n, (n.subtreeFlags & 8772) != 0) : Dl(e, n), ol = i, sl = a;
				}
				break;
			case 30: break;
			default: Dl(e, n);
		}
	}
	function pl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, pl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && yt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var ml = null, hl = !1;
	function gl(e, t, n) {
		for (n = n.child; n !== null;) _l(e, t, n), n = n.sibling;
	}
	function _l(e, t, n) {
		if (Be && typeof Be.onCommitFiberUnmount == "function") try {
			Be.onCommitFiberUnmount(ze, n);
		} catch {}
		switch (n.tag) {
			case 26:
				sl || Qc(n, t), gl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				sl || Qc(n, t);
				var r = ml, i = hl;
				uf(n.type) && (ml = n.stateNode, hl = !1), gl(e, t, n), Tf(n.stateNode), ml = r, hl = i;
				break;
			case 5: sl || Qc(n, t);
			case 6:
				if (r = ml, i = hl, ml = null, gl(e, t, n), ml = r, hl = i, ml !== null) if (hl) try {
					(ml.nodeType === 9 ? ml.body : ml.nodeName === "HTML" ? ml.ownerDocument.body : ml).removeChild(n.stateNode);
				} catch (e) {
					td(n, t, e);
				}
				else try {
					ml.removeChild(n.stateNode);
				} catch (e) {
					td(n, t, e);
				}
				break;
			case 18:
				ml !== null && (hl ? (e = ml, df(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Up(e)) : df(ml, n.stateNode));
				break;
			case 4:
				r = ml, i = hl, ml = n.stateNode.containerInfo, hl = !0, gl(e, t, n), ml = r, hl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Jc(2, n, t), sl || Jc(4, n, t), gl(e, t, n);
				break;
			case 1:
				sl || (Qc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Xc(n, t, r)), gl(e, t, n);
				break;
			case 21:
				gl(e, t, n);
				break;
			case 22:
				sl = (r = sl) || n.memoizedState !== null, gl(e, t, n), sl = r;
				break;
			default: gl(e, t, n);
		}
	}
	function vl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Up(e);
			} catch (e) {
				td(t, t.return, e);
			}
		}
	}
	function yl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Up(e);
		} catch (e) {
			td(t, t.return, e);
		}
	}
	function bl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new ll()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ll()), t;
			default: throw Error(a(435, e.tag));
		}
	}
	function xl(e, t) {
		var n = bl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = od.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Sl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (uf(c.type)) {
							ml = c.stateNode, hl = !1;
							break a;
						}
						break;
					case 5:
						ml = c.stateNode, hl = !1;
						break a;
					case 3:
					case 4:
						ml = c.stateNode.containerInfo, hl = !0;
						break a;
				}
				c = c.return;
			}
			if (ml === null) throw Error(a(160));
			_l(o, s, i), ml = null, hl = !1, o = i.alternate, o !== null && (o.return = null), i.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) wl(t, e), t = t.sibling;
	}
	var Cl = null;
	function wl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				Sl(t, e), Tl(e), r & 4 && (Jc(3, e, e.return), qc(3, e), Jc(5, e, e.return));
				break;
			case 1:
				Sl(t, e), Tl(e), r & 512 && (sl || n === null || Qc(n, n.return)), r & 64 && ol && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var i = Cl;
				if (Sl(t, e), Tl(e), r & 512 && (sl || n === null || Qc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
							b: switch (r) {
								case "title":
									o = i.getElementsByTagName("title")[0], (!o || o[vt] || o[dt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = i.createElement(r), i.head.insertBefore(o, i.querySelector("head > title"))), Kd(o, r, n), o[dt] = e, P(o), r = o;
									break a;
								case "link":
									var s = Zf("link", "href", i).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = i.createElement(r), Kd(o, r, n), i.head.appendChild(o);
									break;
								case "meta":
									if (s = Zf("meta", "content", i).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = i.createElement(r), Kd(o, r, n), i.head.appendChild(o);
									break;
								default: throw Error(a(468, r));
							}
							o[dt] = e, P(o), r = o;
						}
						e.stateNode = r;
					} else Qf(i, e.type, e.stateNode);
					else e.stateNode = Kf(i, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && el(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Qf(i, e.type, e.stateNode) : Kf(i, r, e.memoizedProps));
				}
				break;
			case 27:
				Sl(t, e), Tl(e), r & 512 && (sl || n === null || Qc(n, n.return)), n !== null && r & 4 && el(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (Sl(t, e), Tl(e), r & 512 && (sl || n === null || Qc(n, n.return)), e.flags & 32) {
					i = e.stateNode;
					try {
						Yt(i, "");
					} catch (t) {
						td(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (i = e.memoizedProps, el(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (cl = !0);
				break;
			case 6:
				if (Sl(t, e), Tl(e), r & 4) {
					if (e.stateNode === null) throw Error(a(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						td(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Xf = null, i = Cl, Cl = H(t.containerInfo), Sl(t, e), Cl = i, Tl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Up(t.containerInfo);
				} catch (t) {
					td(e, e.return, t);
				}
				cl && (cl = !1, El(e));
				break;
			case 4:
				r = Cl, Cl = H(e.stateNode.containerInfo), Sl(t, e), Tl(e), Cl = r;
				break;
			case 12:
				Sl(t, e), Tl(e);
				break;
			case 31:
				Sl(t, e), Tl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, xl(e, r)));
				break;
			case 13:
				Sl(t, e), Tl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (lu = A()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, xl(e, r)));
				break;
			case 22:
				i = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = ol, d = sl;
				if (ol = u || i, sl = d || l, Sl(t, e), sl = d, ol = u, Tl(e), r & 8192) a: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || l || ol || sl || Ol(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, i) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								td(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = i ? "" : l.memoizedProps;
							} catch (e) {
								td(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								i ? ff(m, !0) : ff(l.stateNode, !1);
							} catch (e) {
								td(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, xl(e, n))));
				break;
			case 19:
				Sl(t, e), Tl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, xl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: Sl(t, e), Tl(e);
		}
	}
	function Tl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (tl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(a(160));
				switch (n.tag) {
					case 27:
						var i = n.stateNode;
						il(e, nl(e), i);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Yt(o, ""), n.flags &= -33), il(e, nl(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						rl(e, nl(e), s);
						break;
					default: throw Error(a(161));
				}
			} catch (t) {
				td(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function El(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			El(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function Dl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) fl(e, t.alternate, t), t = t.sibling;
	}
	function Ol(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Jc(4, t, t.return), Ol(t);
					break;
				case 1:
					Qc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Xc(t, t.return, n), Ol(t);
					break;
				case 27: Tf(t.stateNode);
				case 26:
				case 5:
					Qc(t, t.return), Ol(t);
					break;
				case 22:
					t.memoizedState === null && Ol(t);
					break;
				case 30:
					Ol(t);
					break;
				default: Ol(t);
			}
			e = e.sibling;
		}
	}
	function kl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					kl(i, a, n), qc(4, a);
					break;
				case 1:
					if (kl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						td(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Qa(c[i], s);
						} catch (e) {
							td(r, r.return, e);
						}
					}
					n && o & 64 && Yc(a), Zc(a, a.return);
					break;
				case 27: al(a);
				case 26:
				case 5:
					kl(i, a, n), n && r === null && o & 4 && $c(a), Zc(a, a.return);
					break;
				case 12:
					kl(i, a, n);
					break;
				case 31:
					kl(i, a, n), n && o & 4 && vl(i, a);
					break;
				case 13:
					kl(i, a, n), n && o & 4 && yl(i, a);
					break;
				case 22:
					a.memoizedState === null && kl(i, a, n), Zc(a, a.return);
					break;
				case 30: break;
				default: kl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Al(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && pa(n));
	}
	function jl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pa(e));
	}
	function Ml(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Nl(e, t, n, r), t = t.sibling;
	}
	function Nl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Ml(e, t, n, r), i & 2048 && qc(9, t);
				break;
			case 1:
				Ml(e, t, n, r);
				break;
			case 3:
				Ml(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pa(e)));
				break;
			case 12:
				if (i & 2048) {
					Ml(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						td(t, t.return, e);
					}
				} else Ml(e, t, n, r);
				break;
			case 31:
				Ml(e, t, n, r);
				break;
			case 13:
				Ml(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Ml(e, t, n, r) : (a._visibility |= 2, Pl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Ml(e, t, n, r) : Fl(e, t), i & 2048 && Al(o, t);
				break;
			case 24:
				Ml(e, t, n, r), i & 2048 && jl(t.alternate, t);
				break;
			default: Ml(e, t, n, r);
		}
	}
	function Pl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Pl(a, o, s, c, i), qc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Pl(a, o, s, c, i)) : u._visibility & 2 ? Pl(a, o, s, c, i) : Fl(a, o), i && l & 2048 && Al(o.alternate, o);
					break;
				case 24:
					Pl(a, o, s, c, i), i && l & 2048 && jl(o.alternate, o);
					break;
				default: Pl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Fl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Fl(n, r), i & 2048 && Al(r.alternate, r);
					break;
				case 24:
					Fl(n, r), i & 2048 && jl(r.alternate, r);
					break;
				default: Fl(n, r);
			}
			t = t.sibling;
		}
	}
	var Il = 8192;
	function Ll(e, t, n) {
		if (e.subtreeFlags & Il) for (e = e.child; e !== null;) Rl(e, t, n), e = e.sibling;
	}
	function Rl(e, t, n) {
		switch (e.tag) {
			case 26:
				Ll(e, t, n), e.flags & Il && e.memoizedState !== null && tp(n, Cl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Ll(e, t, n);
				break;
			case 3:
			case 4:
				var r = Cl;
				Cl = H(e.stateNode.containerInfo), Ll(e, t, n), Cl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Il, Il = 16777216, Ll(e, t, n), Il = r) : Ll(e, t, n));
				break;
			default: Ll(e, t, n);
		}
	}
	function zl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Bl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				ul = r, Ul(r, e);
			}
			zl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Vl(e), e = e.sibling;
	}
	function Vl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Bl(e), e.flags & 2048 && Jc(9, e, e.return);
				break;
			case 3:
				Bl(e);
				break;
			case 12:
				Bl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Hl(e)) : Bl(e);
				break;
			default: Bl(e);
		}
	}
	function Hl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				ul = r, Ul(r, e);
			}
			zl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Jc(8, t, t.return), Hl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Hl(t));
					break;
				default: Hl(t);
			}
			e = e.sibling;
		}
	}
	function Ul(e, t) {
		for (; ul !== null;) {
			var n = ul;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Jc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: pa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, ul = r;
			else a: for (n = e; ul !== null;) {
				r = ul;
				var i = r.sibling, a = r.return;
				if (pl(r), r === n) {
					ul = null;
					break a;
				}
				if (i !== null) {
					i.return = a, ul = i;
					break a;
				}
				ul = a;
			}
		}
	}
	var Wl = {
		getCacheForType: function(e) {
			var t = aa(da), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return aa(da).controller.signal;
		}
	}, Gl = typeof WeakMap == "function" ? WeakMap : Map, Kl = 0, ql = null, z = null, Jl = 0, Yl = 0, Xl = null, Zl = !1, Ql = !1, $l = !1, eu = 0, tu = 0, nu = 0, ru = 0, iu = 0, au = 0, ou = 0, B = null, su = null, cu = !1, lu = 0, uu = 0, du = Infinity, fu = null, pu = null, mu = 0, hu = null, gu = null, _u = 0, vu = 0, yu = null, bu = null, xu = 0, Su = null;
	function Cu() {
		return Kl & 2 && Jl !== 0 ? Jl & -Jl : E.T === null ? ct() : Sd();
	}
	function wu() {
		if (au === 0) if (!(Jl & 536870912) || F) {
			var e = qe;
			qe <<= 1, !(qe & 3932160) && (qe = 262144), au = e;
		} else au = 536870912;
		return e = ao.current, e !== null && (e.flags |= 32), au;
	}
	function Tu(e, t, n) {
		(e === ql && (Yl === 2 || Yl === 9) || e.cancelPendingCommit !== null) && (Mu(e, 0), ku(e, Jl, au, !1)), tt(e, n), (!(Kl & 2) || e !== ql) && (e === ql && (!(Kl & 2) && (ru |= n), tu === 4 && ku(e, Jl, au, !1)), md(e));
	}
	function Eu(e, t, n) {
		if (Kl & 6) throw Error(a(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Ze(e, t), i = r ? Bu(e, t) : Ru(e, t, !0), o = r;
		do {
			if (i === 0) {
				Ql && !r && ku(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !Ou(n)) {
					i = Ru(e, t, !1), o = !1;
					continue;
				}
				if (i === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							i = B;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Mu(c, s).flags |= 256), s = Ru(c, s, !1), s !== 2) {
								if ($l && !l) {
									c.errorRecoveryDisabledLanes |= o, ru |= o, i = 4;
									break a;
								}
								o = su, su = i, o !== null && (su === null ? su = o : su.push.apply(su, o));
							}
							i = s;
						}
						if (o = !1, i !== 2) continue;
					}
				}
				if (i === 1) {
					Mu(e, 0), ku(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = i, o) {
						case 0:
						case 1: throw Error(a(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							ku(r, t, au, !Zl);
							break a;
						case 2:
							su = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(a(329));
					}
					if ((t & 62914560) === t && (i = lu + 300 - A(), 10 < i)) {
						if (ku(r, t, au, !Zl), Xe(r, 0, !0) !== 0) break a;
						_u = t, r.timeoutHandle = af(Du.bind(null, r, n, su, fu, cu, t, au, ru, ou, Zl, o, "Throttled", -0, 0), i);
						break a;
					}
					Du(r, n, su, fu, cu, t, au, ru, ou, Zl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		md(e);
	}
	function Du(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: rn
			}, Rl(t, a, d);
			var m = (a & 62914560) === a ? lu - A() : (a & 4194048) === a ? uu - A() : 0;
			if (m = rp(d, m), m !== null) {
				_u = a, e.cancelPendingCommit = m(qu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), ku(e, a, o, !l);
				return;
			}
		}
		qu(e, t, a, n, r, i, o, s, c);
	}
	function Ou(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Er(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function ku(e, t, n, r) {
		t &= ~iu, t &= ~ru, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - He(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && rt(e, n, t);
	}
	function Au() {
		return Kl & 6 ? !0 : (hd(0, !1), !1);
	}
	function ju() {
		if (z !== null) {
			if (Yl === 0) var e = z.return;
			else e = z, Zi = Xi = null, No(e), Pa = null, Fa = 0, e = z;
			for (; e !== null;) Kc(e.alternate, e), e = e.return;
			z = null;
		}
	}
	function Mu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, of(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), _u = 0, ju(), ql = e, z = n = mi(e.current, null), Jl = t, Yl = 0, Xl = null, Zl = !1, Ql = Ze(e, t), $l = !1, ou = au = iu = ru = nu = tu = 0, su = B = null, cu = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - He(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return eu = t, ii(), n;
	}
	function Nu(e, t) {
		R = null, E.H = Us, t === wa || t === Ea ? (t = Ma(), Yl = 3) : t === Ta ? (t = Ma(), Yl = 4) : Yl = t === sc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Xl = t, z === null && (tu = 1, tc(e, Si(t, e.current)));
	}
	function Pu() {
		var e = ao.current;
		return e === null ? !0 : (Jl & 4194048) === Jl ? oo === null : (Jl & 62914560) === Jl || Jl & 536870912 ? e === oo : !1;
	}
	function Fu() {
		var e = E.H;
		return E.H = Us, e === null ? Us : e;
	}
	function Iu() {
		var e = E.A;
		return E.A = Wl, e;
	}
	function Lu() {
		tu = 4, Zl || (Jl & 4194048) !== Jl && ao.current !== null || (Ql = !0), !(nu & 134217727) && !(ru & 134217727) || ql === null || ku(ql, Jl, au, !1);
	}
	function Ru(e, t, n) {
		var r = Kl;
		Kl |= 2;
		var i = Fu(), a = Iu();
		(ql !== e || Jl !== t) && (fu = null, Mu(e, t)), t = !1;
		var o = tu;
		a: do
			try {
				if (Yl !== 0 && z !== null) {
					var s = z, c = Xl;
					switch (Yl) {
						case 8:
							ju(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							ao.current === null && (t = !0);
							var l = Yl;
							if (Yl = 0, Xl = null, Wu(e, s, c, l), n && Ql) {
								o = 0;
								break a;
							}
							break;
						default: l = Yl, Yl = 0, Xl = null, Wu(e, s, c, l);
					}
				}
				zu(), o = tu;
				break;
			} catch (t) {
				Nu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Zi = Xi = null, Kl = r, E.H = i, E.A = a, z === null && (ql = null, Jl = 0, ii()), o;
	}
	function zu() {
		for (; z !== null;) Hu(z);
	}
	function Bu(e, t) {
		var n = Kl;
		Kl |= 2;
		var r = Fu(), i = Iu();
		ql !== e || Jl !== t ? (fu = null, du = A() + 500, Mu(e, t)) : Ql = Ze(e, t);
		a: do
			try {
				if (Yl !== 0 && z !== null) {
					t = z;
					var o = Xl;
					b: switch (Yl) {
						case 1:
							Yl = 0, Xl = null, Wu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Oa(o)) {
								Yl = 0, Xl = null, Uu(t);
								break;
							}
							t = function() {
								Yl !== 2 && Yl !== 9 || ql !== e || (Yl = 7), md(e);
							}, o.then(t, t);
							break a;
						case 3:
							Yl = 7;
							break a;
						case 4:
							Yl = 5;
							break a;
						case 7:
							Oa(o) ? (Yl = 0, Xl = null, Uu(t)) : (Yl = 0, Xl = null, Wu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (z.tag) {
								case 26: s = z.memoizedState;
								case 5:
								case 27:
									var c = z;
									if (s ? ep(s) : c.stateNode.complete) {
										Yl = 0, Xl = null;
										var l = c.sibling;
										if (l !== null) z = l;
										else {
											var u = c.return;
											u === null ? z = null : (z = u, Gu(u));
										}
										break b;
									}
							}
							Yl = 0, Xl = null, Wu(e, t, o, 5);
							break;
						case 6:
							Yl = 0, Xl = null, Wu(e, t, o, 6);
							break;
						case 8:
							ju(), tu = 6;
							break a;
						default: throw Error(a(462));
					}
				}
				Vu();
				break;
			} catch (t) {
				Nu(e, t);
			}
		while (1);
		return Zi = Xi = null, E.H = r, E.A = i, Kl = n, z === null ? (ql = null, Jl = 0, ii(), tu) : 0;
	}
	function Vu() {
		for (; z !== null && !Me();) Hu(z);
	}
	function Hu(e) {
		var t = Lc(e.alternate, e, eu);
		e.memoizedProps = e.pendingProps, t === null ? Gu(e) : z = t;
	}
	function Uu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = xc(n, t, t.pendingProps, t.type, void 0, Jl);
				break;
			case 11:
				t = xc(n, t, t.pendingProps, t.type.render, t.ref, Jl);
				break;
			case 5: No(t);
			default: Kc(n, t), t = z = hi(t, eu), t = Lc(n, t, eu);
		}
		e.memoizedProps = e.pendingProps, t === null ? Gu(e) : z = t;
	}
	function Wu(e, t, n, r) {
		Zi = Xi = null, No(t), Pa = null, Fa = 0;
		var i = t.return;
		try {
			if (oc(e, i, t, n, Jl)) {
				tu = 1, tc(e, Si(n, e.current)), z = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw z = i, t;
			tu = 1, tc(e, Si(n, e.current)), z = null;
			return;
		}
		t.flags & 32768 ? (F || r === 1 ? e = !0 : Ql || Jl & 536870912 ? e = !1 : (Zl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = ao.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Ku(t, e)) : Gu(t);
	}
	function Gu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Ku(t, Zl);
				return;
			}
			e = t.return;
			var n = Wc(t.alternate, t, eu);
			if (n !== null) {
				z = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				z = t;
				return;
			}
			z = t = e;
		} while (t !== null);
		tu === 0 && (tu = 5);
	}
	function Ku(e, t) {
		do {
			var n = Gc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, z = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				z = e;
				return;
			}
			z = e = n;
		} while (e !== null);
		tu = 6, z = null;
	}
	function qu(e, t, n, r, i, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Qu();
		while (mu !== 0);
		if (Kl & 6) throw Error(a(327));
		if (t !== null) {
			if (t === e.current) throw Error(a(177));
			if (o = t.lanes | t.childLanes, o |= ri, nt(e, n, o, s, c, l), e === ql && (z = ql = null, Jl = 0), gu = t, hu = e, _u = n, vu = o, yu = i, bu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, sd(j, function() {
				return $u(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = E.T, E.T = null, i = D.p, D.p = 2, s = Kl, Kl |= 4;
				try {
					dl(e, t, n);
				} finally {
					Kl = s, D.p = i, E.T = r;
				}
			}
			mu = 1, Ju(), Yu(), Xu();
		}
	}
	function Ju() {
		if (mu === 1) {
			mu = 0;
			var e = hu, t = gu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = Kl;
				Kl |= 4;
				try {
					wl(t, e);
					var a = Zd, o = jr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Ar(s.ownerDocument.documentElement, s)) {
						if (c !== null && Mr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = kr(s, h), v = kr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					_p = !!Xd, Zd = Xd = null;
				} finally {
					Kl = i, D.p = r, E.T = n;
				}
			}
			e.current = t, mu = 2;
		}
	}
	function Yu() {
		if (mu === 2) {
			mu = 0;
			var e = hu, t = gu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = Kl;
				Kl |= 4;
				try {
					fl(e, t.alternate, t);
				} finally {
					Kl = i, D.p = r, E.T = n;
				}
			}
			mu = 3;
		}
	}
	function Xu() {
		if (mu === 4 || mu === 3) {
			mu = 0, Ne();
			var e = hu, t = gu, n = _u, r = bu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? mu = 5 : (mu = 0, gu = hu = null, Zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (pu = null), st(n), t = t.stateNode, Be && typeof Be.onCommitFiberRoot == "function") try {
				Be.onCommitFiberRoot(ze, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = E.T, i = D.p, D.p = 2, E.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					E.T = t, D.p = i;
				}
			}
			_u & 3 && Qu(), md(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === Su ? xu++ : (xu = 0, Su = e) : xu = 0, hd(0, !1);
		}
	}
	function Zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, pa(t)));
	}
	function Qu() {
		return Ju(), Yu(), Xu(), $u();
	}
	function $u() {
		if (mu !== 5) return !1;
		var e = hu, t = vu;
		vu = 0;
		var n = st(_u), r = E.T, i = D.p;
		try {
			D.p = 32 > n ? 32 : n, E.T = null, n = yu, yu = null;
			var o = hu, s = _u;
			if (mu = 0, gu = hu = null, _u = 0, Kl & 6) throw Error(a(331));
			var c = Kl;
			if (Kl |= 4, Vl(o.current), Nl(o, o.current, s, n), Kl = c, hd(0, !1), Be && typeof Be.onPostCommitFiberRoot == "function") try {
				Be.onPostCommitFiberRoot(ze, o);
			} catch {}
			return !0;
		} finally {
			D.p = i, E.T = r, Zu(e, t);
		}
	}
	function ed(e, t, n) {
		t = Si(n, t), t = rc(e.stateNode, t, 2), e = Ka(e, t, 2), e !== null && (tt(e, 2), md(e));
	}
	function td(e, t, n) {
		if (e.tag === 3) ed(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				ed(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (pu === null || !pu.has(r))) {
					e = Si(n, e), n = ic(2), r = Ka(t, n, 2), r !== null && (ac(n, r, t, e), tt(r, 2), md(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function nd(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Gl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || ($l = !0, i.add(n), e = rd.bind(null, e, t, n), t.then(e, e));
	}
	function rd(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, ql === e && (Jl & n) === n && (tu === 4 || tu === 3 && (Jl & 62914560) === Jl && 300 > A() - lu ? !(Kl & 2) && Mu(e, 0) : iu |= n, ou === Jl && (ou = 0)), md(e);
	}
	function id(e, t) {
		t === 0 && (t = $e()), e = si(e, t), e !== null && (tt(e, t), md(e));
	}
	function ad(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), id(e, n);
	}
	function od(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, i = e.memoizedState;
				i !== null && (n = i.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(a(314));
		}
		r !== null && r.delete(t), id(e, n);
	}
	function sd(e, t) {
		return Ae(e, t);
	}
	var cd = null, ld = null, ud = !1, dd = !1, fd = !1, pd = 0;
	function md(e) {
		e !== ld && e.next === null && (ld === null ? cd = ld = e : ld = ld.next = e), dd = !0, ud || (ud = !0, xd());
	}
	function hd(e, t) {
		if (!fd && dd) {
			fd = !0;
			do
				for (var n = !1, r = cd; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - He(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, bd(r, a));
					} else a = Jl, a = Xe(r, r === ql ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Ze(r, a) || (n = !0, bd(r, a));
					r = r.next;
				}
			while (n);
			fd = !1;
		}
	}
	function gd() {
		_d();
	}
	function _d() {
		dd = ud = !1;
		var e = 0;
		pd !== 0 && rf() && (e = pd);
		for (var t = A(), n = null, r = cd; r !== null;) {
			var i = r.next, a = vd(r, t);
			a === 0 ? (r.next = null, n === null ? cd = i : n.next = i, i === null && (ld = n)) : (n = r, (e !== 0 || a & 3) && (dd = !0)), r = i;
		}
		mu !== 0 && mu !== 5 || hd(e, !1), pd !== 0 && (pd = 0);
	}
	function vd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - He(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Qe(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = ql, n = Jl, n = Xe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Yl === 2 || Yl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && je(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Ze(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && je(r), st(n)) {
				case 2:
				case 8:
					n = Ie;
					break;
				case 32:
					n = j;
					break;
				case 268435456:
					n = N;
					break;
				default: n = j;
			}
			return r = yd.bind(null, e), n = Ae(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && je(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function yd(e, t) {
		if (mu !== 0 && mu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Qu() && e.callbackNode !== n) return null;
		var r = Jl;
		return r = Xe(e, e === ql ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Eu(e, r, t), vd(e, A()), e.callbackNode != null && e.callbackNode === n ? yd.bind(null, e) : null);
	}
	function bd(e, t) {
		if (Qu()) return null;
		Eu(e, t, !0);
	}
	function xd() {
		cf(function() {
			Kl & 6 ? Ae(Fe, gd) : _d();
		});
	}
	function Sd() {
		if (pd === 0) {
			var e = L;
			e === 0 && (e = Ke, Ke <<= 1, !(Ke & 261888) && (Ke = 256)), pd = e;
		}
		return pd;
	}
	function Cd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : nn("" + e);
	}
	function wd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function Td(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Cd((i[ft] || null).action), o = r.submitter;
			o && (t = (t = o[ft] || null) ? Cd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Tn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (pd !== 0) {
								var e = o ? wd(i, o) : new FormData(i);
								ks(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? wd(i, o) : new FormData(i), ks(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Ed = 0; Ed < Qr.length; Ed++) {
		var Dd = Qr[Ed];
		$r(Dd.toLowerCase(), "on" + (Dd[0].toUpperCase() + Dd.slice(1)));
	}
	$r(Wr, "onAnimationEnd"), $r(Gr, "onAnimationIteration"), $r(Kr, "onAnimationStart"), $r("dblclick", "onDoubleClick"), $r("focusin", "onFocus"), $r("focusout", "onBlur"), $r(qr, "onTransitionRun"), $r(Jr, "onTransitionStart"), $r(Yr, "onTransitionCancel"), $r(Xr, "onTransitionEnd"), Dt("onMouseEnter", ["mouseout", "mouseover"]), Dt("onMouseLeave", ["mouseout", "mouseover"]), Dt("onPointerEnter", ["pointerout", "pointerover"]), Dt("onPointerLeave", ["pointerout", "pointerover"]), Et("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Et("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Et("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Et("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Et("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Et("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Od = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), kd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Od));
	function Ad(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ei(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ei(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function V(e, t) {
		var n = t[mt];
		n === void 0 && (n = t[mt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Pd(t, e, 2, !1), n.add(r));
	}
	function jd(e, t, n) {
		var r = 0;
		t && (r |= 4), Pd(n, e, r, t);
	}
	var Md = "_reactListening" + Math.random().toString(36).slice(2);
	function Nd(e) {
		if (!e[Md]) {
			e[Md] = !0, wt.forEach(function(t) {
				t !== "selectionchange" && (kd.has(t) || jd(t, !1, e), jd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Md] || (t[Md] = !0, jd("selectionchange", !1, t));
		}
	}
	function Pd(e, t, n, r) {
		switch (wp(t)) {
			case 2:
				var i = vp;
				break;
			case 8:
				i = yp;
				break;
			default: i = bp;
		}
		n = i.bind(null, t, n, e), i = void 0, !mn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Fd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var l = o.tag;
					if ((l === 3 || l === 4) && o.stateNode.containerInfo === i) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = bt(s), o === null) return;
					if (l = o.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		dn(function() {
			var r = a, i = on(n), o = [];
			a: {
				var s = Zr.get(e);
				if (s !== void 0) {
					var l = Tn, u = e;
					switch (e) {
						case "keypress": if (bn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Un;
							break;
						case "focusin":
							u = "focus", l = Pn;
							break;
						case "focusout":
							u = "blur", l = Pn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Pn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Mn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Nn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Gn;
							break;
						case Wr:
						case Gr:
						case Kr:
							l = Fn;
							break;
						case Xr:
							l = Kn;
							break;
						case "scroll":
						case "scrollend":
							l = Dn;
							break;
						case "wheel":
							l = qn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = In;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Wn;
							break;
						case "toggle":
						case "beforetoggle": l = Jn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? s === null ? null : s + "Capture" : s;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = fn(m, p), g != null && d.push(Id(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (s = new l(s, u, null, n, i), o.push({
						event: s,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", s && n !== an && (u = n.relatedTarget || n.fromElement) && (bt(u) || u[pt])) break a;
					if ((l || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? bt(u) : null, u !== null && (f = c(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Mn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Wn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? s : St(l), h = u == null ? s : St(u), s = new d(g, m + "leave", l, n, i), s.target = f, s.relatedTarget = h, g = null, bt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Rd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && zd(o, s, l, d, !1), u !== null && f !== null && zd(o, f, u, d, !0);
					}
				}
				a: {
					if (s = r ? St(r) : window, l = s.nodeName && s.nodeName.toLowerCase(), l === "select" || l === "input" && s.type === "file") var v = mr;
					else if (cr(s)) if (hr) v = wr;
					else {
						v = Sr;
						var y = xr;
					}
					else l = s.nodeName, !l || l.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && $t(r.elementType) && (v = mr) : v = Cr;
					if (v &&= v(e, r)) {
						lr(o, v, n, i);
						break a;
					}
					y && y(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && Gt(s, "number", s.value);
				}
				switch (y = r ? St(r) : window, e) {
					case "focusin":
						(cr(y) || y.contentEditable === "true") && (Pr = y, Fr = r, Ir = null);
						break;
					case "focusout":
						Ir = Fr = Pr = null;
						break;
					case "mousedown":
						Lr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Lr = !1, Rr(o, n, i);
						break;
					case "selectionchange": if (Nr) break;
					case "keydown":
					case "keyup": Rr(o, n, i);
				}
				var b;
				if (Xn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else ir ? nr(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && ($n && n.locale !== "ko" && (ir || x !== "onCompositionStart" ? x === "onCompositionEnd" && ir && (b = yn()) : (gn = i, _n = "value" in gn ? gn.value : gn.textContent, ir = !0)), y = Ld(r, x), 0 < y.length && (x = new Ln(x, e, null, n, i), o.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = rr(n), b !== null && (x.data = b)))), (b = Qn ? ar(e, n) : or(e, n)) && (x = Ld(r, "onBeforeInput"), 0 < x.length && (y = new Ln("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: y,
					listeners: x
				}), y.data = b)), Td(o, e, r, n, i);
			}
			Ad(o, t);
		});
	}
	function Id(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ld(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = fn(e, n), i != null && r.unshift(Id(e, i, a)), i = fn(e, t), i != null && r.push(Id(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Rd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function zd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = fn(n, a), l != null && o.unshift(Id(n, l, c))) : i || (l = fn(n, a), l != null && o.push(Id(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Bd = /\r\n?/g, Vd = /\u0000|\uFFFD/g;
	function Hd(e) {
		return (typeof e == "string" ? e : "" + e).replace(Bd, "\n").replace(Vd, "");
	}
	function Ud(e, t) {
		return t = Hd(t), Hd(e) === t;
	}
	function Wd(e, t, n, r, i, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Yt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Yt(e, "" + r);
				break;
			case "className":
				Nt(e, "class", r);
				break;
			case "tabIndex":
				Nt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Nt(e, n, r);
				break;
			case "style":
				Qt(e, r, o);
				break;
			case "data": if (t !== "object") {
				Nt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = nn("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Wd(e, t, "name", i.name, i, null), Wd(e, t, "formEncType", i.formEncType, i, null), Wd(e, t, "formMethod", i.formMethod, i, null), Wd(e, t, "formTarget", i.formTarget, i, null)) : (Wd(e, t, "encType", i.encType, i, null), Wd(e, t, "method", i.method, i, null), Wd(e, t, "target", i.target, i, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = nn("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = rn);
				break;
			case "onScroll":
				r != null && V("scroll", e);
				break;
			case "onScrollEnd":
				r != null && V("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(a(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(a(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = nn("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
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
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				V("beforetoggle", e), V("toggle", e), Mt(e, "popover", r);
				break;
			case "xlinkActuate":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Mt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = en.get(n) || n, Mt(e, n, r));
		}
	}
	function Gd(e, t, n, r, i, o) {
		switch (n) {
			case "style":
				Qt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(a(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(a(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Yt(e, r) : (typeof r == "number" || typeof r == "bigint") && Yt(e, "" + r);
				break;
			case "onScroll":
				r != null && V("scroll", e);
				break;
			case "onScrollEnd":
				r != null && V("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = rn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Tt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), o = e[ft] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, i), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Mt(e, n, r);
			}
		}
	}
	function Kd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				V("error", e), V("load", e);
				var r = !1, i = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							i = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(a(137, t));
						default: Wd(e, t, o, s, n, null);
					}
				}
				i && Wd(e, t, "srcSet", n.srcSet, n, null), r && Wd(e, t, "src", n.src, n, null);
				return;
			case "input":
				V("invalid", e);
				var c = o = s = i = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							i = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(a(137, t));
							break;
						default: Wd(e, t, r, d, n, null);
					}
				}
				Wt(e, o, c, l, u, s, i, !1);
				return;
			case "select":
				for (i in V("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Wd(e, t, i, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Kt(e, !!r, n, !0) : Kt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in V("invalid", e), o = i = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						i = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(a(91));
						break;
					default: Wd(e, t, s, c, n, null);
				}
				Jt(e, r, i, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Wd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				V("beforetoggle", e), V("toggle", e), V("cancel", e), V("close", e);
				break;
			case "iframe":
			case "object":
				V("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Od.length; r++) V(Od[r], e);
				break;
			case "image":
				V("error", e), V("load", e);
				break;
			case "details":
				V("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": V("error", e), V("load", e);
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
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(a(137, t));
					default: Wd(e, t, u, r, n, null);
				}
				return;
			default: if ($t(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Gd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Wd(e, t, c, r, n, null));
	}
	function qd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var i = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Wd(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							i = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(a(137, t));
							break;
						default: m !== f && Wd(e, t, p, m, r, f);
					}
				}
				Ut(e, s, c, l, u, d, o, i);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Wd(e, t, o, null, r, l);
				}
				for (i in r) if (o = r[i], l = n[i], r.hasOwnProperty(i) && (o != null || l != null)) switch (i) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Wd(e, t, i, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Kt(e, !!n, n ? [] : "", !1) : Kt(e, !!n, t, !0)) : Kt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Wd(e, t, c, null, r, i);
				}
				for (s in r) if (i = r[s], o = n[s], r.hasOwnProperty(s) && (i != null || o != null)) switch (s) {
					case "value":
						p = i;
						break;
					case "defaultValue":
						m = i;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (i != null) throw Error(a(91));
						break;
					default: i !== o && Wd(e, t, s, i, r, o);
				}
				qt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Wd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Wd(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Wd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(a(137, t));
						break;
					default: Wd(e, t, u, p, r, m);
				}
				return;
			default: if ($t(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Gd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Gd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Wd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Wd(e, t, f, p, r, m);
	}
	function Jd(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Yd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Jd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Jd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Xd = null, Zd = null;
	function Qd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function $d(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function ef(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function tf(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var nf = null;
	function rf() {
		var e = window.event;
		return e && e.type === "popstate" ? e === nf ? !1 : (nf = e, !0) : (nf = null, !1);
	}
	var af = typeof setTimeout == "function" ? setTimeout : void 0, of = typeof clearTimeout == "function" ? clearTimeout : void 0, sf = typeof Promise == "function" ? Promise : void 0, cf = typeof queueMicrotask == "function" ? queueMicrotask : sf === void 0 ? af : function(e) {
		return sf.resolve(null).then(e).catch(lf);
	};
	function lf(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function uf(e) {
		return e === "head";
	}
	function df(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Up(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") Tf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, Tf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[vt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && Tf(e.ownerDocument.body);
			n = i;
		} while (n);
		Up(t);
	}
	function ff(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function pf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					pf(n), yt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function mf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[vt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = bf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function hf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = bf(e.nextSibling), e === null)) return null;
		return e;
	}
	function gf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = bf(e.nextSibling), e === null)) return null;
		return e;
	}
	function _f(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function vf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function yf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function bf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var xf = null;
	function Sf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return bf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function Cf(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function wf(e, t, n) {
		switch (t = Qd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(a(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(a(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(a(454));
				return e;
			default: throw Error(a(451));
		}
	}
	function Tf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		yt(e);
	}
	var Ef = /* @__PURE__ */ new Map(), Df = /* @__PURE__ */ new Set();
	function H(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var Of = D.d;
	D.d = {
		f: kf,
		r: Af,
		D: Nf,
		C: Pf,
		L: Ff,
		m: If,
		X: Rf,
		S: Lf,
		M: zf
	};
	function kf() {
		var e = Of.f(), t = Au();
		return e || t;
	}
	function Af(e) {
		var t = xt(e);
		t !== null && t.tag === 5 && t.type === "form" ? js(t) : Of.r(e);
	}
	var jf = typeof document > "u" ? null : document;
	function Mf(e, t, n) {
		var r = jf;
		if (r && typeof t == "string" && t) {
			var i = Ht(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), Df.has(i) || (Df.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Kd(t, "link", e), P(t), r.head.appendChild(t)));
		}
	}
	function Nf(e) {
		Of.D(e), Mf("dns-prefetch", e, null);
	}
	function Pf(e, t) {
		Of.C(e, t), Mf("preconnect", e, t);
	}
	function Ff(e, t, n) {
		Of.L(e, t, n);
		var r = jf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Ht(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Ht(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Ht(n.imageSizes) + "\"]")) : i += "[href=\"" + Ht(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Vf(e);
					break;
				case "script": a = Gf(e);
			}
			Ef.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Ef.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Hf(a)) || t === "script" && r.querySelector(U(a)) || (t = r.createElement("link"), Kd(t, "link", e), P(t), r.head.appendChild(t)));
		}
	}
	function If(e, t) {
		Of.m(e, t);
		var n = jf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Ht(r) + "\"][href=\"" + Ht(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Gf(e);
			}
			if (!Ef.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), Ef.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(U(a))) return;
				}
				r = n.createElement("link"), Kd(r, "link", e), P(r), n.head.appendChild(r);
			}
		}
	}
	function Lf(e, t, n) {
		Of.S(e, t, n);
		var r = jf;
		if (r && e) {
			var i = Ct(r).hoistableStyles, a = Vf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Hf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Ef.get(a)) && Jf(e, n);
					var c = o = r.createElement("link");
					P(c), Kd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, qf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Rf(e, t) {
		Of.X(e, t);
		var n = jf;
		if (n && e) {
			var r = Ct(n).hoistableScripts, i = Gf(e), a = r.get(i);
			a || (a = n.querySelector(U(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = Ef.get(i)) && Yf(e, t), a = n.createElement("script"), P(a), Kd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function zf(e, t) {
		Of.M(e, t);
		var n = jf;
		if (n && e) {
			var r = Ct(n).hoistableScripts, i = Gf(e), a = r.get(i);
			a || (a = n.querySelector(U(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Ef.get(i)) && Yf(e, t), a = n.createElement("script"), P(a), Kd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Bf(e, t, n, r) {
		var i = (i = ve.current) ? H(i) : null;
		if (!i) throw Error(a(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Vf(n.href), n = Ct(i).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Vf(n.href);
					var o = Ct(i).hoistableStyles, s = o.get(e);
					if (s || (i = i.ownerDocument || i, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = i.querySelector(Hf(e))) && !o._p && (s.instance = o, s.state.loading = 5), Ef.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Ef.set(e, n), o || Wf(i, e, n, s.state))), t && r === null) throw Error(a(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(a(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Gf(n), n = Ct(i).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(a(444, e));
		}
	}
	function Vf(e) {
		return "href=\"" + Ht(e) + "\"";
	}
	function Hf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Uf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Wf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Kd(t, "link", n), P(t), e.head.appendChild(t));
	}
	function Gf(e) {
		return "[src=\"" + Ht(e) + "\"]";
	}
	function U(e) {
		return "script[async]" + e;
	}
	function Kf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Ht(n.href) + "\"]");
				if (r) return t.instance = r, P(r), r;
				var i = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), P(r), Kd(r, "style", i), qf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				i = Vf(n.href);
				var o = e.querySelector(Hf(i));
				if (o) return t.state.loading |= 4, t.instance = o, P(o), o;
				r = Uf(n), (i = Ef.get(i)) && Jf(r, i), o = (e.ownerDocument || e).createElement("link"), P(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Kd(o, "link", r), t.state.loading |= 4, qf(o, n.precedence, e), t.instance = o;
			case "script": return o = Gf(n.src), (i = e.querySelector(U(o))) ? (t.instance = i, P(i), i) : (r = n, (i = Ef.get(o)) && (r = h({}, n), Yf(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), P(i), Kd(i, "link", r), e.head.appendChild(i), t.instance = i);
			case "void": return null;
			default: throw Error(a(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, qf(r, n.precedence, e));
		return t.instance;
	}
	function qf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Jf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Yf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Xf = null;
	function Zf(e, t, n) {
		if (Xf === null) {
			var r = /* @__PURE__ */ new Map(), i = Xf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Xf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[vt] || a[dt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Qf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function $f(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function ep(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function tp(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Vf(r.href), a = t.querySelector(Hf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = ip.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, P(a);
					return;
				}
				a = t.ownerDocument || t, r = Uf(r), (i = Ef.get(i)) && Jf(r, i), a = a.createElement("link"), P(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Kd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = ip.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var np = 0;
	function rp(e, t) {
		return e.stylesheets && e.count === 0 && op(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && op(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && np === 0 && (np = 62500 * Yd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && op(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > np ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function ip() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) op(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var ap = null;
	function op(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ap = /* @__PURE__ */ new Map(), t.forEach(sp, e), ap = null, ip.call(e));
	}
	function sp(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ap.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ap.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = ip.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var cp = {
		$$typeof: S,
		Provider: null,
		Consumer: null,
		_currentValue: ue,
		_currentValue2: ue,
		_threadCount: 0
	};
	function lp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = et(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = et(0), this.hiddenUpdates = et(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function up(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new lp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = fi(3, null, null, t), e.current = a, a.stateNode = e, t = fa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ua(a), e;
	}
	function dp(e) {
		return e ? (e = ui, e) : ui;
	}
	function fp(e, t, n, r, i, a) {
		i = dp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ga(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ka(e, r, t), n !== null && (Tu(n, e, t), qa(n, e, t));
	}
	function pp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function mp(e, t) {
		pp(e, t), (e = e.alternate) && pp(e, t);
	}
	function hp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = si(e, 67108864);
			t !== null && Tu(t, e, 67108864), mp(e, 67108864);
		}
	}
	function gp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Cu();
			t = ot(t);
			var n = si(e, t);
			n !== null && Tu(n, e, t), mp(e, t);
		}
	}
	var _p = !0;
	function vp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 2, bp(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function yp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 8, bp(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function bp(e, t, n, r) {
		if (_p) {
			var i = xp(r);
			if (i === null) Fd(e, t, r, Sp, n), Np(e, r);
			else if (Fp(i, e, t, n, r)) r.stopPropagation();
			else if (Np(e, r), t & 4 && -1 < Mp.indexOf(e)) {
				for (; i !== null;) {
					var a = xt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ye(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - He(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									md(a), !(Kl & 6) && (du = A() + 500, hd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = si(a, 2), s !== null && Tu(s, a, 2), Au(), mp(a, 2);
					}
					if (a = xp(r), a === null && Fd(e, t, r, Sp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Fd(e, t, r, null, n);
		}
	}
	function xp(e) {
		return e = on(e), Cp(e);
	}
	var Sp = null;
	function Cp(e) {
		if (Sp = null, e = bt(e), e !== null) {
			var t = c(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = u(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = d(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return Sp = e, null;
	}
	function wp(e) {
		switch (e) {
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
			case "selectstart": return 2;
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
			case "pointerleave": return 8;
			case "message": switch (Pe()) {
				case Fe: return 2;
				case Ie: return 8;
				case j:
				case M: return 32;
				case N: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Tp = !1, Ep = null, Dp = null, Op = null, kp = /* @__PURE__ */ new Map(), Ap = /* @__PURE__ */ new Map(), jp = [], Mp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Np(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Ep = null;
				break;
			case "dragenter":
			case "dragleave":
				Dp = null;
				break;
			case "mouseover":
			case "mouseout":
				Op = null;
				break;
			case "pointerover":
			case "pointerout":
				kp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Ap.delete(t.pointerId);
		}
	}
	function Pp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = xt(t), t !== null && hp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Fp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Ep = Pp(Ep, e, t, n, r, i), !0;
			case "dragenter": return Dp = Pp(Dp, e, t, n, r, i), !0;
			case "mouseover": return Op = Pp(Op, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return kp.set(a, Pp(kp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Ap.set(a, Pp(Ap.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ip(e) {
		var t = bt(e.target);
		if (t !== null) {
			var n = c(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = u(n), t !== null) {
						e.blockedOn = t, lt(e.priority, function() {
							gp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = d(n), t !== null) {
						e.blockedOn = t, lt(e.priority, function() {
							gp(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Lp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = xp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				an = r, n.target.dispatchEvent(r), an = null;
			} else return t = xt(n), t !== null && hp(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Rp(e, t, n) {
		Lp(e) && n.delete(t);
	}
	function zp() {
		Tp = !1, Ep !== null && Lp(Ep) && (Ep = null), Dp !== null && Lp(Dp) && (Dp = null), Op !== null && Lp(Op) && (Op = null), kp.forEach(Rp), Ap.forEach(Rp);
	}
	function Bp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Tp || (Tp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, zp)));
	}
	var Vp = null;
	function Hp(e) {
		Vp !== e && (Vp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Vp === e && (Vp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Cp(r || n) === null) continue;
					break;
				}
				var a = xt(n);
				a !== null && (e.splice(t, 3), t -= 3, ks(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Up(e) {
		function t(t) {
			return Bp(t, e);
		}
		Ep !== null && Bp(Ep, e), Dp !== null && Bp(Dp, e), Op !== null && Bp(Op, e), kp.forEach(t), Ap.forEach(t);
		for (var n = 0; n < jp.length; n++) {
			var r = jp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < jp.length && (n = jp[0], n.blockedOn === null);) Ip(n), n.blockedOn === null && jp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ft] || null;
			if (typeof a == "function") o || Hp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ft] || null) s = o.formAction;
					else if (Cp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Hp(n);
			}
		}
	}
	function Wp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Gp(e) {
		this._internalRoot = e;
	}
	Kp.prototype.render = Gp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(a(409));
		var n = t.current;
		fp(n, Cu(), e, t, null, null);
	}, Kp.prototype.unmount = Gp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			fp(e.current, 2, null, e, null, null), Au(), t[pt] = null;
		}
	};
	function Kp(e) {
		this._internalRoot = e;
	}
	Kp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ct();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < jp.length && t !== 0 && t < jp[n].priority; n++);
			jp.splice(n, 0, e), n === 0 && Ip(e);
		}
	};
	var qp = n.version;
	if (qp !== "19.2.7") throw Error(a(527, qp, "19.2.7"));
	D.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
		return e = p(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e;
	};
	var Jp = {
		bundleType: 0,
		version: "19.2.7",
		rendererPackageName: "react-dom",
		currentDispatcherRef: E,
		reconcilerVersion: "19.2.7"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Yp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Yp.isDisabled && Yp.supportsFiber) try {
			ze = Yp.inject(Jp), Be = Yp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!s(e)) throw Error(a(299));
		var n = !1, r = "", i = Qs, o = $s, c = ec;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (o = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = up(e, 1, !1, null, null, n, r, null, i, o, c, Wp), e[pt] = t.current, Nd(e), new Gp(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!s(e)) throw Error(a(299));
		var r = !1, i = "", o = Qs, c = $s, l = ec, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (o = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = up(e, 1, !0, t, n ?? null, r, i, u, o, c, l, Wp), t.context = dp(null), n = t.current, r = Cu(), r = ot(r), i = Ga(r), i.callback = null, Ka(n, i, r), n = r, t.current.lanes = n, tt(t, n), md(t), e[pt] = t.current, Nd(e), new Kp(t);
	}, e.version = "19.2.7";
})), d = /* @__PURE__ */ e(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = Gf(e) ? e.slice() : H({}, e);
			return o[a] = n(e[a], t, r + 1, i), o;
		}
		function i(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return a(e, t, n, 0);
			}
		}
		function a(e, t, n, r) {
			var i = t[r], o = Gf(e) ? e.slice() : H({}, e);
			return r + 1 === t.length ? (o[n[r]] = o[i], Gf(o) ? o.splice(i, 1) : delete o[i]) : o[i] = a(e[i], t, n, r + 1), o;
		}
		function s(e, t, n) {
			var r = t[n], i = Gf(e) ? e.slice() : H({}, e);
			return n + 1 === t.length ? (Gf(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = s(e[r], t, n + 1), i);
		}
		function c() {
			return !1;
		}
		function u() {
			return null;
		}
		function d() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function f() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function p() {}
		function m() {}
		function h(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function g(e, t, n, r) {
			return new _r(e, t, n, r);
		}
		function _(e, t) {
			e.context === Ng && (Qd(e.current, 2, t, e, null, null), al());
		}
		function v(e, t) {
			if (Pg !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, jl(), gr(e.current, t, n), al();
			}
		}
		function y(e) {
			Pg = e;
		}
		function b(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function x(e) {
			var t = e, n = e;
			if (e.alternate) for (; t.return;) t = t.return;
			else {
				e = t;
				do
					t = e, t.flags & 4098 && (n = t.return), e = t.return;
				while (e);
			}
			return t.tag === 3 ? n : null;
		}
		function ee(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function S(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function te(e) {
			if (x(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function ne(e) {
			var t = e.alternate;
			if (!t) {
				if (t = x(e), t === null) throw Error("Unable to find node on an unmounted component.");
				return t === e ? e : null;
			}
			for (var n = e, r = t;;) {
				var i = n.return;
				if (i === null) break;
				var a = i.alternate;
				if (a === null) {
					if (r = i.return, r !== null) {
						n = r;
						continue;
					}
					break;
				}
				if (i.child === a.child) {
					for (a = i.child; a;) {
						if (a === n) return te(i), e;
						if (a === r) return te(i), t;
						a = a.sibling;
					}
					throw Error("Unable to find node on an unmounted component.");
				}
				if (n.return !== r.return) n = i, r = a;
				else {
					for (var o = !1, s = i.child; s;) {
						if (s === n) {
							o = !0, n = i, r = a;
							break;
						}
						if (s === r) {
							o = !0, r = i, n = a;
							break;
						}
						s = s.sibling;
					}
					if (!o) {
						for (s = a.child; s;) {
							if (s === n) {
								o = !0, n = a, r = i;
								break;
							}
							if (s === r) {
								o = !0, r = a, n = i;
								break;
							}
							s = s.sibling;
						}
						if (!o) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
					}
				}
				if (n.alternate !== r) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
			}
			if (n.tag !== 3) throw Error("Unable to find node on an unmounted component.");
			return n.stateNode.current === n ? e : t;
		}
		function re(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = re(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function ie(e) {
			return typeof e != "object" || !e ? null : (e = Uf && e[Uf] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function C(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Wf ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case jf: return "Fragment";
				case Nf: return "Profiler";
				case Mf: return "StrictMode";
				case Lf: return "Suspense";
				case Rf: return "SuspenseList";
				case Vf: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case Af: return "Portal";
				case Ff: return e.displayName || "Context";
				case Pf: return (e._context.displayName || "Context") + ".Consumer";
				case If:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case zf: return t = e.displayName || null, t === null ? C(e.type) || "Memo" : t;
				case Bf:
					t = e._payload, e = e._init;
					try {
						return C(e(t));
					} catch {}
			}
			return null;
		}
		function ae(e) {
			return typeof e.tag == "number" ? w(e) : typeof e.name == "string" ? e.name : null;
		}
		function w(e) {
			var t = e.type;
			switch (e.tag) {
				case 31: return "Activity";
				case 24: return "Cache";
				case 9: return (t._context.displayName || "Context") + ".Consumer";
				case 10: return t.displayName || "Context";
				case 18: return "DehydratedFragment";
				case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
				case 7: return "Fragment";
				case 26:
				case 27:
				case 5: return t;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return C(t);
				case 8: return t === Mf ? "StrictMode" : "Mode";
				case 22: return "Offscreen";
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 1:
				case 0:
				case 14:
				case 15:
					if (typeof t == "function") return t.displayName || t.name || null;
					if (typeof t == "string") return t;
					break;
				case 29:
					if (t = e._debugInfo, t != null) {
						for (var n = t.length - 1; 0 <= n; n--) if (typeof t[n].name == "string") return t[n].name;
					}
					if (e.return !== null) return w(e.return);
			}
			return null;
		}
		function oe(e) {
			return { current: e };
		}
		function se(e, t) {
			0 > Xf ? console.error("Unexpected pop.") : (t !== Yf[Xf] && console.error("Unexpected Fiber popped."), e.current = Jf[Xf], Jf[Xf] = null, Yf[Xf] = null, Xf--);
		}
		function T(e, t, n) {
			Xf++, Jf[Xf] = e.current, Yf[Xf] = n, e.current = t;
		}
		function ce(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function le(e, t) {
			T($f, t, e), T(Qf, e, e), T(Zf, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? zu(t) : US;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = zu(t), t = Bu(t, n);
				else switch (n) {
					case "svg":
						t = WS;
						break;
					case "math":
						t = GS;
						break;
					default: t = US;
				}
			}
			n = n.toLowerCase(), n = zt(null, n), n = {
				context: t,
				ancestorInfo: n
			}, se(Zf, e), T(Zf, n, e);
		}
		function E(e) {
			se(Zf, e), se(Qf, e), se($f, e);
		}
		function D() {
			return ce(Zf.current);
		}
		function ue(e) {
			e.memoizedState !== null && T(ep, e, e);
			var t = ce(Zf.current), n = e.type, r = Bu(t.context, n);
			n = zt(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (T(Qf, e, e), T(Zf, r, e));
		}
		function de(e) {
			Qf.current === e && (se(Zf, e), se(Qf, e)), ep.current === e && (se(ep, e), bC._currentValue = yC);
		}
		function fe() {}
		function pe() {
			if (tp === 0) {
				np = console.log, rp = console.info, ip = console.warn, ap = console.error, op = console.group, sp = console.groupCollapsed, cp = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: fe,
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
			tp++;
		}
		function me() {
			if (tp--, tp === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: H({}, e, { value: np }),
					info: H({}, e, { value: rp }),
					warn: H({}, e, { value: ip }),
					error: H({}, e, { value: ap }),
					group: H({}, e, { value: op }),
					groupCollapsed: H({}, e, { value: sp }),
					groupEnd: H({}, e, { value: cp })
				});
			}
			0 > tp && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function he(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function ge(e) {
			if (lp === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				lp = t && t[1] || "", up = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + lp + e + up;
		}
		function _e(e, t) {
			if (!e || dp) return "";
			var n = fp.get(e);
			if (n !== void 0) return n;
			dp = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = U.H, U.H = null, pe();
			try {
				var i = { DetermineComponentFrameRoot: function() {
					try {
						if (t) {
							var n = function() {
								throw Error();
							};
							if (Object.defineProperty(n.prototype, "props", { set: function() {
								throw Error();
							} }), typeof Reflect == "object" && Reflect.construct) {
								try {
									Reflect.construct(n, []);
								} catch (e) {
									var r = e;
								}
								Reflect.construct(e, [], n);
							} else {
								try {
									n.call();
								} catch (e) {
									r = e;
								}
								e.call(n.prototype);
							}
						} else {
							try {
								throw Error();
							} catch (e) {
								r = e;
							}
							(n = e()) && typeof n.catch == "function" && n.catch(function() {});
						}
					} catch (e) {
						if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
					}
					return [null, null];
				} };
				i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
				a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var o = i.DetermineComponentFrameRoot(), s = o[0], c = o[1];
				if (s && c) {
					var l = s.split("\n"), u = c.split("\n");
					for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot");) a++;
					for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot");) o++;
					if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o];) o--;
					for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
						if (a !== 1 || o !== 1) do
							if (a--, o--, 0 > o || l[a] !== u[o]) {
								var d = "\n" + l[a].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && fp.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				dp = !1, U.H = r, me(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? ge(l) : "", typeof e == "function" && fp.set(e, l), l;
		}
		function ve(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return ge(e.type);
				case 16: return ge("Lazy");
				case 13: return e.child !== t && t !== null ? ge("Suspense Fallback") : ge("Suspense");
				case 19: return ge("SuspenseList");
				case 0:
				case 15: return _e(e.type, !1);
				case 11: return _e(e.type.render, !1);
				case 1: return _e(e.type, !0);
				case 31: return ge("Activity");
				default: return "";
			}
		}
		function ye(e) {
			try {
				var t = "", n = null;
				do {
					t += ve(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = he(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = ge(s + (c ? " [" + c + "]" : ""));
							}
							t = o + p;
						}
					}
					n = e, e = e.return;
				} while (e);
				return t;
			} catch (e) {
				return "\nError generating stack: " + e.message + "\n" + e.stack;
			}
		}
		function be(e) {
			return (e = e ? e.displayName || e.name : "") ? ge(e) : "";
		}
		function xe() {
			if (pp === null) return null;
			var e = pp._debugOwner;
			return e == null ? null : ae(e);
		}
		function Se() {
			if (pp === null) return "";
			var e = pp;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += ge(e.type);
						break;
					case 13:
						t += ge("Suspense");
						break;
					case 19:
						t += ge("SuspenseList");
						break;
					case 31:
						t += ge("Activity");
						break;
					case 30:
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += be(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += be(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = he(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + he(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function O(e, t, n, r, i, a, o) {
			var s = pp;
			Ce(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				Ce(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function Ce(e) {
			U.getCurrentStack = e === null ? null : Se, mp = !1, pp = e;
		}
		function we(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Te(e) {
			try {
				return Ee(e), !1;
			} catch {
				return !0;
			}
		}
		function Ee(e) {
			return "" + e;
		}
		function k(e, t) {
			if (Te(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, we(e)), Ee(e);
		}
		function De(e, t) {
			if (Te(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, we(e)), Ee(e);
		}
		function Oe(e) {
			if (Te(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", we(e)), Ee(e);
		}
		function ke(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				kp = t.inject(e), Ap = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function Ae(e) {
			if (typeof Dp == "function" && Op(e), Ap && typeof Ap.setStrictMode == "function") try {
				Ap.setStrictMode(kp, e);
			} catch (e) {
				jp || (jp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function je(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Pp(e) / Fp | 0) | 0;
		}
		function Me(e) {
			var t = e & 42;
			if (t !== 0) return t;
			switch (e & -e) {
				case 1: return 1;
				case 2: return 2;
				case 4: return 4;
				case 8: return 8;
				case 16: return 16;
				case 32: return 32;
				case 64: return 64;
				case 128: return 128;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072: return e & 261888;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return e & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return e & 62914560;
				case 67108864: return 67108864;
				case 134217728: return 134217728;
				case 268435456: return 268435456;
				case 536870912: return 536870912;
				case 1073741824: return 0;
				default: return console.error("Should have found matching lanes. This is a bug in React."), e;
			}
		}
		function Ne(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Me(n))) : i = Me(o) : i = Me(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Me(n))) : i = Me(o)) : i = Me(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function A(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function Pe(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64: return t + 250;
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
				case 2097152: return t + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return -1;
				case 67108864:
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824: return -1;
				default: return console.error("Should have found matching lanes. This is a bug in React."), -1;
			}
		}
		function Fe() {
			var e = Rp;
			return Rp <<= 1, !(Rp & 62914560) && (Rp = 4194304), e;
		}
		function Ie(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function j(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function M(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Np(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && N(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function N(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Np(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function Le(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Np(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function Re(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : ze(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function ze(e) {
			switch (e) {
				case 2:
					e = 1;
					break;
				case 8:
					e = 4;
					break;
				case 32:
					e = 16;
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
					e = 128;
					break;
				case 268435456:
					e = 134217728;
					break;
				default: e = 0;
			}
			return e;
		}
		function Be(e, t, n) {
			if (Mp) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Np(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function Ve(e, t) {
			if (Mp) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Np(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function He(e) {
			return e &= -e, zp !== 0 && zp < e ? Bp !== 0 && Bp < e ? e & 134217727 ? Vp : Hp : Bp : zp;
		}
		function Ue() {
			var e = Kf.p;
			return e === 0 ? (e = window.event, e === void 0 ? Vp : uf(e.type)) : e;
		}
		function We(e, t) {
			var n = Kf.p;
			try {
				return Kf.p = e, t();
			} finally {
				Kf.p = n;
			}
		}
		function Ge(e) {
			delete e[Wp], delete e[Gp], delete e[qp], delete e[Jp], delete e[Yp];
		}
		function Ke(e) {
			var t = e[Wp];
			if (t) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[Kp] || n[Wp]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = bd(e); e !== null;) {
						if (n = e[Wp]) return n;
						e = bd(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function qe(e) {
			if (e = e[Wp] || e[Kp]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function Je(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function Ye(e) {
			var t = e[Xp];
			return t ||= e[Xp] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function Xe(e) {
			e[Zp] = !0;
		}
		function Ze(e, t) {
			Qe(e, t), Qe(e + "Capture", t);
		}
		function Qe(e, t) {
			$p[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), $p[e] = t;
			var n = e.toLowerCase();
			for (em[n] = e, e === "onDoubleClick" && (em.ondblclick = e), e = 0; e < t.length; e++) Qp.add(t[e]);
		}
		function $e(e, t) {
			tm[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function et(e) {
			return hp.call(im, e) ? !0 : hp.call(rm, e) ? !1 : nm.test(e) ? im[e] = !0 : (rm[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function tt(e, t, n) {
			if (et(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = e.getAttribute(t), e === "" && !0 === n ? !0 : (k(n, t), e === "" + n ? n : e);
			}
		}
		function nt(e, t, n) {
			if (et(t)) if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				k(n, t), e.setAttribute(t, "" + n);
			}
		}
		function rt(e, t, n) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(t);
						return;
				}
				k(n, t), e.setAttribute(t, "" + n);
			}
		}
		function it(e, t, n, r) {
			if (r === null) e.removeAttribute(n);
			else {
				switch (typeof r) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(n);
						return;
				}
				k(r, n), e.setAttributeNS(t, n, "" + r);
			}
		}
		function at(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Oe(e), e;
				default: return "";
			}
		}
		function ot(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function st(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						Oe(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Oe(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function ct(e) {
			if (!e._valueTracker) {
				var t = ot(e) ? "checked" : "value";
				e._valueTracker = st(e, t, "" + e[t]);
			}
		}
		function lt(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = ot(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
		}
		function ut(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function dt(e) {
			return e.replace(am, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function ft(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || sm || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", xe() || "A component", t.type), sm = !0), t.value === void 0 || t.defaultValue === void 0 || om || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", xe() || "A component", t.type), om = !0);
		}
		function pt(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (k(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + at(t)) : e.value !== "" + at(t) && (e.value = "" + at(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : ht(e, o, at(n)) : ht(e, o, at(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (k(s, "name"), e.name = "" + at(s)) : e.removeAttribute("name");
		}
		function mt(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (k(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					ct(e);
					return;
				}
				n = n == null ? "" : "" + at(n), t = t == null ? n : "" + at(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (k(o, "name"), e.name = o), ct(e);
		}
		function ht(e, t, n) {
			t === "number" && ut(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
		}
		function gt(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? Ef.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || lm || (lm = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || um || (um = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || cm || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), cm = !0);
		}
		function _t() {
			var e = xe();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function vt(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + at(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function yt(e, t) {
			for (e = 0; e < fm.length; e++) {
				var n = fm[e];
				if (t[n] != null) {
					var r = Gf(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, _t()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, _t());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || dm || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), dm = !0);
		}
		function bt(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || pm || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", xe() || "A component"), pm = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function xt(e, t, n) {
			if (t != null && (t = "" + at(t), t !== e.value && (e.value = t), n == null)) {
				e.defaultValue !== t && (e.defaultValue = t);
				return;
			}
			e.defaultValue = n == null ? "" : "" + at(n);
		}
		function St(e, t, n, r) {
			if (t == null) {
				if (r != null) {
					if (n != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (Gf(r)) {
						if (1 < r.length) throw Error("<textarea> can only have at most one child.");
						r = r[0];
					}
					n = r;
				}
				n ??= "", t = n;
			}
			n = at(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), ct(e);
		}
		function Ct(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? Ct(e.children[0], t) : e;
		}
		function P(e) {
			return "  " + "  ".repeat(e);
		}
		function wt(e) {
			return "+ " + "  ".repeat(e);
		}
		function Tt(e) {
			return "- " + "  ".repeat(e);
		}
		function Et(e) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return e.type;
				case 16: return "Lazy";
				case 31: return "Activity";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 0:
				case 15: return e = e.type, e.displayName || e.name || null;
				case 11: return e = e.type.render, e.displayName || e.name || null;
				case 1: return e = e.type, e.displayName || e.name || null;
				default: return null;
			}
		}
		function Dt(e, t) {
			return mm.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function Ot(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return wt(n) + Dt(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), wt(n) + Dt(e, r) + "\n" + Tt(n) + Dt(t, r) + "\n";
			}
			return P(n) + Dt(e, r) + "\n";
		}
		function kt(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function At(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (Gf(e)) return "[...]";
					if (e.$$typeof === kf) return (t = C(e.type)) ? "<" + t + ">" : "<...>";
					var n = kt(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = At(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
								n += n === "" ? "..." : ", ...";
								break;
							}
							n += (n === "" ? "" : ",") + r + ":" + i;
						}
						return "{" + n + "}";
					}
					return n;
				case "function": return (t = e.displayName || e.name) ? "function " + t : "function";
				default: return String(e);
			}
		}
		function jt(e, t) {
			return typeof e != "string" || mm.test(e) ? "{" + At(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function Mt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = jt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function Nt(e, t, n) {
			var r = "", i = H({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = At(e[a], o);
				t.hasOwnProperty(a) ? (o = At(t[a], o), r += wt(n) + a + ": " + s + "\n", r += Tt(n) + a + ": " + o + "\n") : r += wt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = At(i[c], 120 - 2 * n - c.length - 2), r += Tt(n) + c + ": " + e + "\n");
			return r;
		}
		function Pt(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += Mt(e, t, P(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = jt(l, s);
						s = jt(c, s), typeof l == "object" && l && typeof c == "object" && c && kt(l) === "Object" && kt(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += P(r + 1) + o + "={{\n" + Nt(l, c, r + 2) + P(r + 1) + "}}\n" : (i += wt(r + 1) + o + "=" + u + "\n", i += Tt(r + 1) + o + "=" + s + "\n");
					} else i += P(r + 1) + o + "=" + jt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Tt(r + 1) + e + "=" + jt(n[e], t) + "\n";
					}
				}), i = i === "" ? P(r) + "<" + e + ">\n" : P(r) + "<" + e + "\n" + i + P(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += Ot(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + Ot("" + t, null, r + 1) : i + Ot("" + t, void 0, r + 1)), i;
		}
		function Ft(e, t) {
			var n = Et(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Ft(e, t), e = e.sibling;
				return n;
			}
			return P(t) + "<" + n + ">\n";
		}
		function It(e, t) {
			var n = Ct(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return P(t) + "...\n" + It(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += P(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = Ot(i, e.serverProps, t), t++;
			else if (a = Et(e.fiber), a !== null) if (e.serverProps === void 0) {
				r = t;
				var o = 120 - 2 * r - a.length - 2, s = "";
				for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
					var c = jt(i[l], 15);
					if (o -= l.length + c.length + 2, 0 > o) {
						s += " ...";
						break;
					}
					s += " " + l + "=" + c;
				}
				r = P(r) + "<" + a + s + ">\n", t++;
			} else e.serverProps === null ? (r = Mt(a, i, wt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = Pt(a, i, e.serverProps, t), t++);
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += It(o, t), a++) : l += Ft(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += P(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Tt(t) + Dt(a, 120 - 2 * t) + "\n") : l + Mt(a.type, a.props, Tt(t));
			return n + r + l;
		}
		function Lt(e) {
			try {
				return "\n\n" + It(e, 0);
			} catch {
				return "";
			}
		}
		function Rt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : Lt(i).replaceAll(/^[+-]/gm, ">");
		}
		function zt(e, t) {
			var n = H({}, e || ym), r = { tag: t };
			return gm.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), _m.indexOf(t) !== -1 && (n.pTagInButtonScope = null), hm.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function Bt(e, t, n) {
			switch (t) {
				case "select": return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
				case "optgroup": return e === "option" || e === "#text";
				case "option": return e === "#text";
				case "tr": return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
				case "tbody":
				case "thead":
				case "tfoot": return e === "tr" || e === "style" || e === "script" || e === "template";
				case "colgroup": return e === "col" || e === "template";
				case "table": return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
				case "head": return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
				case "html":
					if (n) break;
					return e === "head" || e === "body" || e === "frameset";
				case "frameset": return e === "frame";
				case "#document": if (!n) return e === "html";
			}
			switch (e) {
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
				case "rp":
				case "rt": return vm.indexOf(t) === -1;
				case "caption":
				case "col":
				case "colgroup":
				case "frameset":
				case "frame":
				case "tbody":
				case "td":
				case "tfoot":
				case "th":
				case "thead":
				case "tr": return t == null;
				case "head": return n || t === null;
				case "html": return n && t === "#document" || t === null;
				case "body": return n && (t === "#document" || t === "html") || t === null;
			}
			return !0;
		}
		function Vt(e, t) {
			switch (e) {
				case "address":
				case "article":
				case "aside":
				case "blockquote":
				case "center":
				case "details":
				case "dialog":
				case "dir":
				case "div":
				case "dl":
				case "fieldset":
				case "figcaption":
				case "figure":
				case "footer":
				case "header":
				case "hgroup":
				case "main":
				case "menu":
				case "nav":
				case "ol":
				case "p":
				case "section":
				case "summary":
				case "ul":
				case "pre":
				case "listing":
				case "table":
				case "hr":
				case "xmp":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t.pTagInButtonScope;
				case "form": return t.formTag || t.pTagInButtonScope;
				case "li": return t.listItemTagAutoclosing;
				case "dd":
				case "dt": return t.dlItemTagAutoclosing;
				case "button": return t.buttonTagInScope;
				case "a": return t.aTagInScope;
				case "nobr": return t.nobrTagInScope;
			}
			return null;
		}
		function Ht(e, t) {
			for (; e;) {
				switch (e.tag) {
					case 5:
					case 26:
					case 27: if (e.type === t) return e;
				}
				e = e.return;
			}
			return null;
		}
		function Ut(e, t) {
			t ||= ym;
			var n = t.current;
			if (t = (n = Bt(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : Vt(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, bm[t]) return !1;
			bm[t] = !0;
			var i = (t = pp) ? Ht(t.return, r) : null, a = t !== null && i !== null ? Rt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || O(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function Wt(e, t, n) {
			if (n || Bt("#text", t, !1)) return !0;
			if (n = "#text|" + t, bm[n]) return !1;
			bm[n] = !0;
			var r = (n = pp) ? Ht(n, t) : null;
			return n = n !== null && r !== null ? Rt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function Gt(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function Kt(e) {
			return e.replace(Em, function(e, t) {
				return t.toUpperCase();
			});
		}
		function qt(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? Om.hasOwnProperty(t) && Om[t] || (Om[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, Kt(t.replace(Tm, "ms-")))) : wm.test(t) ? Om.hasOwnProperty(t) && Om[t] || (Om[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !Dm.test(n) || km.hasOwnProperty(n) && km[n] || (km[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(Dm, ""))), typeof n == "number" && (isNaN(n) ? Am || (Am = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || jm || (jm = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Mm.has(t) ? t === "float" ? e.cssFloat = n : (De(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function Jt(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = xm[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = xm[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = xm[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
					for (var l in c = {}, r) if (i = r[l], (a = s[l]) && i !== a && (o = i + "," + a, !c[o])) {
						c[o] = !0, o = console;
						var u = t[i];
						o.error.call(o, "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", u == null || typeof u == "boolean" || u === "" ? "Removing" : "Updating", i, a);
					}
				}
				for (var d in n) !n.hasOwnProperty(d) || t != null && t.hasOwnProperty(d) || (d.indexOf("--") === 0 ? e.setProperty(d, "") : d === "float" ? e.cssFloat = "" : e[d] = "");
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && qt(e, f, l);
			} else for (r in t) t.hasOwnProperty(r) && qt(e, r, t[r]);
		}
		function Yt(e) {
			if (e.indexOf("-") === -1) return !1;
			switch (e) {
				case "annotation-xml":
				case "color-profile":
				case "font-face":
				case "font-face-src":
				case "font-face-uri":
				case "font-face-format":
				case "font-face-name":
				case "missing-glyph": return !1;
				default: return !0;
			}
		}
		function Xt(e) {
			return Fm.get(e) || e;
		}
		function Zt(e, t) {
			if (hp.call(Rm, t) && Rm[t]) return !0;
			if (Bm.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = Lm.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Rm[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), Rm[t] = !0;
			}
			if (zm.test(t)) {
				if (e = t.toLowerCase(), e = Lm.hasOwnProperty(e) ? e : null, e == null) return Rm[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), Rm[t] = !0);
			}
			return !0;
		}
		function Qt(e, t) {
			var n = [], r;
			for (r in t) Zt(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function $t(e, t, n, r) {
			if (hp.call(Hm, t) && Hm[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Hm[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Hm[t] = !0;
				if (Um.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Hm[t] = !0;
			} else if (Um.test(t)) return Wm.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Hm[t] = !0;
			if (Gm.test(t) || Km.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Hm[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Hm[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Hm[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Hm[t] = !0;
			if (Im.hasOwnProperty(i)) {
				if (i = Im[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Hm[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Hm[t] = !0;
			switch (t) {
				case "dangerouslySetInnerHTML":
				case "children":
				case "style":
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": return !0;
				case "innerText":
				case "textContent": return !0;
			}
			switch (typeof n) {
				case "boolean": switch (t) {
					case "autoFocus":
					case "checked":
					case "multiple":
					case "muted":
					case "selected":
					case "contentEditable":
					case "spellCheck":
					case "draggable":
					case "value":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
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
					case "capture":
					case "download":
					case "inert": return !0;
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" ? !0 : (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Hm[t] = !0);
				}
				case "function":
				case "symbol": return Hm[t] = !0, !1;
				case "string": if (n === "false" || n === "true") {
					switch (t) {
						case "checked":
						case "selected":
						case "multiple":
						case "muted":
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
						case "inert": break;
						default: return !0;
					}
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Hm[t] = !0;
				}
			}
			return !0;
		}
		function en(e, t, n) {
			var r = [], i;
			for (i in t) $t(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function tn(e) {
			return qm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function nn() {}
		function rn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function an(e) {
			var t = qe(e);
			if (t && (e = t.stateNode)) {
				var n = e[Gp] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (pt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (k(t, "name"), n = n.querySelectorAll("input[name=\"" + dt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Gp] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									pt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && lt(r);
						}
						break a;
					case "textarea":
						xt(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && vt(e, !!n.multiple, t, !1);
				}
			}
		}
		function on(e, t, n) {
			if (Zm) return e(t, n);
			Zm = !0;
			try {
				return e(t);
			} finally {
				if (Zm = !1, (Ym !== null || Xm !== null) && (al(), Ym && (t = Ym, e = Xm, Xm = Ym = null, an(t), e))) for (t = 0; t < e.length; t++) an(e[t]);
			}
		}
		function sn(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[Gp] || null;
			if (r === null) return null;
			n = r[t];
			a: switch (t) {
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
					(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
					break a;
				default: e = !1;
			}
			if (e) return null;
			if (n && typeof n != "function") throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type.");
			return n;
		}
		function cn() {
			if (rh) return rh;
			var e, t = nh, n = t.length, r, i = "value" in th ? th.value : th.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return rh = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function ln(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function un() {
			return !0;
		}
		function dn() {
			return !1;
		}
		function fn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? un : dn, this.isPropagationStopped = dn, this;
			}
			return H(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = un);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = un);
				},
				persist: function() {},
				isPersistent: un
			}), t;
		}
		function pn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = xh[e]) ? !!t[e] : !1;
		}
		function mn() {
			return pn;
		}
		function hn(e, t) {
			switch (e) {
				case "keyup": return Oh.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== kh;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function gn(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function _n(e, t) {
			switch (e) {
				case "compositionend": return gn(t);
				case "keypress": return t.which === Ph ? (Ih = !0, Fh) : null;
				case "textInput": return e = t.data, e === Fh && Ih ? null : e;
				default: return null;
			}
		}
		function vn(e, t) {
			if (Lh) return e === "compositionend" || !Ah && hn(e, t) ? (e = cn(), rh = nh = th = null, Lh = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return Nh && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function yn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!Rh[e.type] : t === "textarea";
		}
		function bn(e) {
			if (!Qm) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function xn(e, t, n, r) {
			Ym ? Xm ? Xm.push(r) : Xm = [r] : Ym = r, t = fu(t, "onChange"), 0 < t.length && (n = new ah("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function Sn(e) {
			ou(e, 0);
		}
		function Cn(e) {
			if (lt(Je(e))) return e;
		}
		function wn(e, t) {
			if (e === "change") return t;
		}
		function Tn() {
			zh && (zh.detachEvent("onpropertychange", En), Bh = zh = null);
		}
		function En(e) {
			if (e.propertyName === "value" && Cn(Bh)) {
				var t = [];
				xn(t, Bh, e, rn(e)), on(Sn, t);
			}
		}
		function Dn(e, t, n) {
			e === "focusin" ? (Tn(), zh = t, Bh = n, zh.attachEvent("onpropertychange", En)) : e === "focusout" && Tn();
		}
		function On(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return Cn(Bh);
		}
		function kn(e, t) {
			if (e === "click") return Cn(t);
		}
		function An(e, t) {
			if (e === "input" || e === "change") return Cn(t);
		}
		function jn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function Mn(e, t) {
			if (Hh(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!hp.call(t, i) || !Hh(e[i], t[i])) return !1;
			}
			return !0;
		}
		function Nn(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function Pn(e, t) {
			var n = Nn(e);
			e = 0;
			for (var r; n;) {
				if (n.nodeType === 3) {
					if (r = e + n.textContent.length, e <= t && r >= t) return {
						node: n,
						offset: t - e
					};
					e = r;
				}
				a: {
					for (; n;) {
						if (n.nextSibling) {
							n = n.nextSibling;
							break a;
						}
						n = n.parentNode;
					}
					n = void 0;
				}
				n = Nn(n);
			}
		}
		function Fn(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Fn(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function In(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = ut(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = ut(e.document);
			}
			return t;
		}
		function Ln(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function Rn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			qh || Wh == null || Wh !== ut(r) || (r = Wh, "selectionStart" in r && Ln(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), Kh && Mn(Kh, r) || (Kh = r, r = fu(Gh, "onSelect"), 0 < r.length && (t = new ah("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = Wh)));
		}
		function zn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function Bn(e) {
			if (Yh[e]) return Yh[e];
			if (!Jh[e]) return e;
			var t = Jh[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in Xh) return Yh[e] = t[n];
			return e;
		}
		function Vn(e, t) {
			ig.set(e, t), Ze(t, [e]);
		}
		function Hn(e) {
			for (var t = fg, n = 0; n < e.length; n++) {
				var r = e[n];
				if (typeof r == "object" && r) if (Gf(r) && r.length === 2 && typeof r[0] == "string") {
					if (t !== fg && t !== hg) return pg;
					t = hg;
				} else return pg;
				else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== fg && t !== mg) return pg;
					t = mg;
				}
			}
			return t;
		}
		function Un(e, t, n, r) {
			for (var i in e) hp.call(e, i) && i[0] !== "_" && Wn(i, e[i], t, n, r);
		}
		function Wn(e, t, n, r, i) {
			switch (typeof t) {
				case "object": if (t === null) {
					t = "null";
					break;
				} else {
					if (t.$$typeof === kf) {
						var a = C(t.type) || "…", o = t.key;
						t = t.props;
						var s = Object.keys(t), c = s.length;
						if (o == null && c === 0) {
							t = "<" + a + " />";
							break;
						}
						if (3 > r || c === 1 && s[0] === "children" && o == null) {
							t = "<" + a + " … />";
							break;
						}
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && Wn("key", o, n, r + 1, i), e = !1, t) l === "children" ? t.children != null && (!Gf(t.children) || 0 < t.children.length) && (e = !0) : hp.call(t, l) && l[0] !== "_" && Wn(l, t[l], n, r + 1, i);
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), a === "Array") {
						if (l = Hn(t), l === mg || l === fg) {
							t = JSON.stringify(t);
							break;
						} else if (l === hg) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length; e++) a = t[e], Wn(a[0], a[1], n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, Wn(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, Wn(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && Un(t, n, r + 1, i);
					return;
				}
				case "function":
					t = t.name === "" ? "() => {}" : t.name + "() {}";
					break;
				case "string":
					t = t === dg ? "…" : JSON.stringify(t);
					break;
				case "undefined":
					t = "undefined";
					break;
				case "boolean":
					t = t ? "true" : "false";
					break;
				default: t = String(t);
			}
			n.push([i + "\xA0\xA0".repeat(r) + e, t]);
		}
		function Gn(e, t, n, r) {
			var i = !0;
			for (o in e) o in t || (n.push([gg + "\xA0\xA0".repeat(r) + o, "…"]), i = !1);
			for (var a in t) if (a in e) {
				var o = e[a], s = t[a];
				if (o !== s) {
					if (r === 0 && a === "children") i = "\xA0\xA0".repeat(r) + a, n.push([gg + i, "…"], [_g + i, "…"]);
					else {
						if (!(3 <= r)) {
							if (typeof o == "object" && typeof s == "object" && o !== null && s !== null && o.$$typeof === s.$$typeof) if (s.$$typeof === kf) {
								if (o.type === s.type && o.key === s.key) {
									o = C(s.type) || "…", i = "\xA0\xA0".repeat(r) + a, o = "<" + o + " … />", n.push([gg + i, o], [_g + i, o]), i = !1;
									continue;
								}
							} else {
								var c = Object.prototype.toString.call(o), l = Object.prototype.toString.call(s);
								if (c === l && (l === "[object Object]" || l === "[object Array]")) {
									c = [vg + "\xA0\xA0".repeat(r) + a, l === "[object Array]" ? "Array" : ""], n.push(c), l = n.length, Gn(o, s, n, r + 1) ? l === n.length && (c[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
									continue;
								}
							}
							else if (typeof o == "function" && typeof s == "function" && o.name === s.name && o.length === s.length && (c = Function.prototype.toString.call(o), l = Function.prototype.toString.call(s), c === l)) {
								o = s.name === "" ? "() => {}" : s.name + "() {}", n.push([vg + "\xA0\xA0".repeat(r) + a, o + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						Wn(a, o, n, r, gg), Wn(a, s, n, r, _g);
					}
					i = !1;
				}
			} else n.push([_g + "\xA0\xA0".repeat(r) + a, "…"]), i = !1;
			return i;
		}
		function Kn(e) {
			xg = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function qn(e, t, n, r) {
			yg && (wg.start = t, wg.end = n, Cg.color = "warning", Cg.tooltipText = r, Cg.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, wg)) : performance.measure(r, wg));
		}
		function Jn(e, t, n) {
			qn(e, t, n, "Reconnect");
		}
		function Yn(e, t, n, r, i) {
			var a = w(e);
			if (a !== null && yg) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				r = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				s = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Tg], l = Gn(o.memoizedProps, l, c, 0), 1 < c.length && (l && !Sg && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Sg = !0, c[0] = Dg, Cg.color = "warning", Cg.tooltipText = Eg) : (Cg.color = r, Cg.tooltipText = a), Cg.properties = c, wg.start = t, wg.end = n, s == null ? performance.measure("​" + a, wg) : s.run(performance.measure.bind(performance, "​" + a, wg)))) : s == null ? console.timeStamp(a, t, n, bg, void 0, r) : s.run(console.timeStamp.bind(console, a, t, n, bg, void 0, r));
			}
		}
		function Xn(e, t, n, r) {
			if (yg) {
				var i = w(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && Wn("key", e.key, o, 0, ""), e.memoizedProps !== null && Un(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
						start: t,
						end: n,
						detail: { devtools: {
							color: "error",
							track: bg,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, a ? a.run(performance.measure.bind(performance, "​" + i, e)) : performance.measure("​" + i, e);
				}
			}
		}
		function Zn(e, t, n, r, i) {
			if (i !== null) {
				if (yg) {
					var a = w(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && Wn("key", e.key, r, 0, ""), e.memoizedProps !== null && Un(e.memoizedProps, r, 0, ""), t = {
							start: t,
							end: n,
							detail: { devtools: {
								color: "error",
								track: bg,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, (e = e._debugTask) ? e.run(performance.measure.bind(performance, "​" + a, t)) : performance.measure("​" + a, t);
					}
				}
			} else a = w(e), a !== null && yg && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, bg, void 0, i)) : console.timeStamp(a, t, n, bg, void 0, i));
		}
		function Qn(e, t, n, r) {
			if (yg && !(t <= e)) {
				var i = (n & 738197653) === n ? "tertiary-dark" : "primary-dark";
				n = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", r ? r.run(console.timeStamp.bind(console, n, e, t, xg, W, i)) : console.timeStamp(n, e, t, xg, W, i);
			}
		}
		function $n(e, t, n, r) {
			!yg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, xg, W, n)) : console.timeStamp("Prewarm", e, t, xg, W, n));
		}
		function er(e, t, n, r) {
			!yg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, xg, W, n)) : console.timeStamp("Suspended", e, t, xg, W, n));
		}
		function tr(e, t, n, r, i, a) {
			if (yg && !(t <= e)) {
				n = [];
				for (var o = 0; o < r.length; o++) {
					var s = r[o].value;
					n.push(["Recoverable Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "primary-dark",
						track: xg,
						trackGroup: W,
						tooltipText: i ? "Hydration Failed" : "Recovered after Error",
						properties: n
					} }
				}, a ? a.run(performance.measure.bind(performance, "Recovered", e)) : performance.measure("Recovered", e);
			}
		}
		function nr(e, t, n, r) {
			!yg || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, xg, W, "error")) : console.timeStamp("Errored", e, t, xg, W, "error"));
		}
		function rr(e, t, n, r) {
			!yg || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, xg, W, "secondary-light")) : console.timeStamp(n, e, t, xg, W, "secondary-light"));
		}
		function ir(e, t, n, r, i) {
			if (yg && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: xg,
						trackGroup: W,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e);
			}
		}
		function ar(e, t, n) {
			!yg || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, xg, W, "secondary-dark")) : console.timeStamp("Animating", e, t, xg, W, "secondary-dark"));
		}
		function or() {
			for (var e = jg, t = Mg = jg = 0; t < e;) {
				var n = Ag[t];
				Ag[t++] = null;
				var r = Ag[t];
				Ag[t++] = null;
				var i = Ag[t];
				Ag[t++] = null;
				var a = Ag[t];
				if (Ag[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && ur(n, i, a);
			}
		}
		function sr(e, t, n, r) {
			Ag[jg++] = e, Ag[jg++] = t, Ag[jg++] = n, Ag[jg++] = r, Mg |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function cr(e, t, n, r) {
			return sr(e, t, n, r), dr(e);
		}
		function lr(e, t) {
			return sr(e, null, null, t), dr(e);
		}
		function ur(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & Og || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Np(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function dr(e) {
			if (Kx > Gx) throw Zx = Kx = 0, Qx = qx = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Zx > Xx && (Zx = 0, Qx = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && Ul(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && Ul(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function fr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e : t.current;
		}
		function pr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e != null && typeof e.render == "function" && (t = fr(e.render), e.render !== t) ? (t = {
				$$typeof: If,
				render: t
			}, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
		}
		function mr(e, t) {
			if (Pg === null) return !1;
			var n = e.elementType;
			t = t.type;
			var r = !1, i = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (r = !0);
					break;
				case 0:
					(typeof t == "function" || i === Bf) && (r = !0);
					break;
				case 11:
					(i === If || i === Bf) && (r = !0);
					break;
				case 14:
				case 15:
					(i === zf || i === Bf) && (r = !0);
					break;
				default: return !1;
			}
			return !!(r && (e = Pg(n), e !== void 0 && e === Pg(t)));
		}
		function hr(e) {
			Pg !== null && typeof WeakSet == "function" && (Fg === null && (Fg = /* @__PURE__ */ new WeakSet()), Fg.add(e));
		}
		function gr(e, t, n) {
			do {
				var r = e, i = r.alternate, a = r.child, o = r.sibling, s = r.tag;
				r = r.type;
				var c = null;
				switch (s) {
					case 0:
					case 15:
					case 1:
						c = r;
						break;
					case 11: c = r.render;
				}
				if (Pg === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var l = !1;
				if (r = !1, c !== null && (c = Pg(c), c !== void 0 && (n.has(c) ? r = !0 : t.has(c) && (s === 1 ? r = !0 : l = !0))), Fg !== null && (Fg.has(e) || i !== null && Fg.has(i)) && (r = !0), r && (e._debugNeedsRemount = !0), (r || l) && (i = lr(e, 2), i !== null && el(i, e, 2)), a === null || r || gr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function _r(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Bg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function vr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function yr(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = g(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
					n.type = fr(e.type);
					break;
				case 1:
					n.type = fr(e.type);
					break;
				case 11: n.type = pr(e.type);
			}
			return n;
		}
		function br(e, t) {
			e.flags &= 65011714;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function xr(e, t, n, r, i, a) {
			var o = 0, s = e;
			if (typeof e == "function") vr(e) && (o = 1), s = fr(s);
			else if (typeof e == "string") o = D(), o = Hd(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (e) {
				case Vf: return t = g(31, n, t, i), t.elementType = Vf, t.lanes = a, t;
				case jf: return Cr(n.children, i, a, t);
				case Mf:
					o = 8, i |= Lg, i |= Rg;
					break;
				case Nf: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = g(12, e, t, r | K), t.elementType = Nf, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case Lf: return t = g(13, n, t, i), t.elementType = Lf, t.lanes = a, t;
				case Rf: return t = g(19, n, t, i), t.elementType = Rf, t.lanes = a, t;
				default:
					if (typeof e == "object" && e) switch (e.$$typeof) {
						case Ff:
							o = 10;
							break a;
						case Pf:
							o = 9;
							break a;
						case If:
							o = 11, s = pr(s);
							break a;
						case zf:
							o = 14;
							break a;
						case Bf:
							o = 16, s = null;
							break a;
					}
					s = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : Gf(e) ? n = "array" : e !== void 0 && e.$$typeof === kf ? (n = "<" + (C(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (o = r ? ae(r) : null) && (s += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + s)), s = null;
			}
			return t = g(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function Sr(e, t, n) {
			return t = xr(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Cr(e, t, n, r) {
			return e = g(7, e, r, t), e.lanes = n, e;
		}
		function wr(e, t, n) {
			return e = g(6, e, null, t), e.lanes = n, e;
		}
		function Tr(e) {
			var t = g(18, null, null, G);
			return t.stateNode = e, t;
		}
		function Er(e, t, n) {
			return t = g(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Dr(e, t) {
			if (typeof e == "object" && e) {
				var n = Vg.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: ye(t)
				}, Vg.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: ye(t)
			};
		}
		function Or(e, t) {
			Pr(), Hg[Ug++] = Gg, Hg[Ug++] = Wg, Wg = e, Gg = t;
		}
		function kr(e, t, n) {
			Pr(), Kg[qg++] = Yg, Kg[qg++] = Xg, Kg[qg++] = Jg, Jg = e;
			var r = Yg;
			e = Xg;
			var i = 32 - Np(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Np(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Yg = 1 << 32 - Np(t) + i | n << i | r, Xg = a + e;
			} else Yg = 1 << a | n << i | r, Xg = e;
		}
		function Ar(e) {
			Pr(), e.return !== null && (Or(e, 1), kr(e, 1, 0));
		}
		function jr(e) {
			for (; e === Wg;) Wg = Hg[--Ug], Hg[Ug] = null, Gg = Hg[--Ug], Hg[Ug] = null;
			for (; e === Jg;) Jg = Kg[--qg], Kg[qg] = null, Xg = Kg[--qg], Kg[qg] = null, Yg = Kg[--qg], Kg[qg] = null;
		}
		function Mr() {
			return Pr(), Jg === null ? null : {
				id: Yg,
				overflow: Xg
			};
		}
		function Nr(e, t) {
			Pr(), Kg[qg++] = Yg, Kg[qg++] = Xg, Kg[qg++] = Jg, Yg = t.id, Xg = t.overflow, Jg = e;
		}
		function Pr() {
			$g || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Fr(e, t) {
			if (e.return === null) {
				if (t_ === null) t_ = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (t_.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					t_.distanceFromLeaf > t && (t_.distanceFromLeaf = t);
				}
				return t_;
			}
			var n = Fr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function Ir() {
			$g && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function Lr(e, t) {
			e_ || (e = Fr(e, 0), e.serverProps = null, t !== null && (t = _d(t), e.serverTail.push(t)));
		}
		function Rr(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = t_;
			throw r !== null && (t_ = null, n = Lt(r)), Wr(Dr(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), i_;
		}
		function zr(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Wp] = e, t[Gp] = r, hu(n, r), n) {
				case "dialog":
					B("cancel", t), B("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					B("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < fS.length; n++) B(fS[n], t);
					break;
				case "source":
					B("error", t);
					break;
				case "img":
				case "image":
				case "link":
					B("error", t), B("load", t);
					break;
				case "details":
					B("toggle", t);
					break;
				case "input":
					$e("input", r), B("invalid", t), ft(t, r), mt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					gt(t, r);
					break;
				case "select":
					$e("select", r), B("invalid", t), yt(t, r);
					break;
				case "textarea": $e("textarea", r), B("invalid", t), bt(t, r), St(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || xu(t.textContent, n) ? (r.popover != null && (B("beforetoggle", t), B("toggle", t)), r.onScroll != null && B("scroll", t), r.onScrollEnd != null && B("scrollend", t), r.onClick != null && (t.onclick = nn), t = !0) : t = !1, t || Rr(e, !0);
		}
		function Br(e) {
			for (Zg = e.return; Zg;) switch (Zg.tag) {
				case 5:
				case 31:
				case 13:
					r_ = !1;
					return;
				case 27:
				case 3:
					r_ = !0;
					return;
				default: Zg = Zg.return;
			}
		}
		function Vr(e) {
			if (e !== Zg) return !1;
			if (!$g) return Br(e), $g = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Vu(e.type, e.memoizedProps)), n = !n), n && Qg) {
				for (n = Qg; n;) {
					var r = Fr(e, 0), i = _d(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? yd(n) : gd(n.nextSibling);
				}
				Rr(e);
			}
			if (Br(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				Qg = yd(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				Qg = yd(e);
			} else t === 27 ? (t = Qg, Qu(e.type) ? (e = nC, nC = null, Qg = e) : Qg = t) : Qg = Zg ? gd(e.stateNode.nextSibling) : null;
			return !0;
		}
		function Hr() {
			Qg = Zg = null, e_ = $g = !1;
		}
		function Ur() {
			var e = n_;
			return e !== null && (mx === null ? mx = e : mx.push.apply(mx, e), n_ = null), e;
		}
		function Wr(e) {
			n_ === null ? n_ = [e] : n_.push(e);
		}
		function Gr() {
			var e = t_;
			if (e !== null) {
				t_ = null;
				for (var t = Lt(e); 0 < e.children.length;) e = e.children[0];
				O(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function Kr() {
			l_ = c_ = null, u_ = !1;
		}
		function qr(e, t, n) {
			T(a_, t._currentValue, e), t._currentValue = n, T(o_, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== s_ && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = s_;
		}
		function Jr(e, t) {
			e._currentValue = a_.current;
			var n = o_.current;
			se(o_, t), e._currentRenderer = n, se(a_, t);
		}
		function Yr(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function Xr(e, t, n, r) {
			var i = e.child;
			for (i !== null && (i.return = e); i !== null;) {
				var a = i.dependencies;
				if (a !== null) {
					var o = i.child;
					a = a.firstContext;
					a: for (; a !== null;) {
						var s = a;
						a = i;
						for (var c = 0; c < t.length; c++) if (s.context === t[c]) {
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Yr(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Yr(o, n, e), o = null;
				} else o = i.child;
				if (o !== null) o.return = i;
				else for (o = i; o !== null;) {
					if (o === e) {
						o = null;
						break;
					}
					if (i = o.sibling, i !== null) {
						i.return = o.return, o = i;
						break;
					}
					o = o.return;
				}
				i = o;
			}
		}
		function Zr(e, t, n, r) {
			e = null;
			for (var i = t, a = !1; i !== null;) {
				if (!a) {
					if (i.flags & 524288) a = !0;
					else if (i.flags & 262144) break;
				}
				if (i.tag === 10) {
					var o = i.alternate;
					if (o === null) throw Error("Should have a current fiber. This is a bug in React.");
					if (o = o.memoizedProps, o !== null) {
						var s = i.type;
						Hh(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === ep.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [bC] : e.push(bC));
				}
				i = i.return;
			}
			e !== null && Xr(t, e, n, r), t.flags |= 262144;
		}
		function Qr(e) {
			for (e = e.firstContext; e !== null;) {
				if (!Hh(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function $r(e) {
			c_ = e, l_ = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function ei(e) {
			return u_ && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), ni(c_, e);
		}
		function ti(e, t) {
			return c_ === null && $r(e), ni(e, t);
		}
		function ni(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, l_ === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				l_ = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else l_ = l_.next = t;
			return n;
		}
		function ri() {
			return {
				controller: new d_(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function ii(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function ai(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && f_(p_, function() {
				e.controller.abort();
			});
		}
		function oi(e, t, n) {
			e & 127 ? 0 > k_ && (k_ = h_(), A_ = g_(t), M_ = t, n != null && (N_ = w(n)), (Ub & (Pb | Fb)) !== Nb && (D_ = !0, j_ = __), e = Wu(), t = Uu(), e !== I_ || t !== F_ ? I_ = -1.1 : t !== null && (j_ = __), P_ = e, F_ = t) : e & 4194048 && 0 > B_ && (B_ = h_(), H_ = g_(t), U_ = t, n != null && (W_ = w(n)), 0 > z_) && (e = Wu(), t = Uu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function si(e) {
			if (0 > k_) {
				k_ = h_(), A_ = e._debugTask == null ? null : e._debugTask, (Ub & (Pb | Fb)) !== Nb && (j_ = __);
				var t = Wu(), n = Uu();
				t !== I_ || n !== F_ ? I_ = -1.1 : n !== null && (j_ = __), P_ = t, F_ = n;
			}
			0 > B_ && (B_ = h_(), H_ = e._debugTask == null ? null : e._debugTask, 0 > z_) && (e = Wu(), t = Uu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function ci() {
			var e = w_;
			return w_ = 0, e;
		}
		function li(e) {
			var t = w_;
			return w_ = e, t;
		}
		function ui(e) {
			var t = w_;
			return w_ += e, t;
		}
		function di() {
			J = q = -1.1;
		}
		function fi() {
			var e = q;
			return q = -1.1, e;
		}
		function pi(e) {
			0 <= e && (q = e);
		}
		function mi() {
			var e = T_;
			return T_ = -0, e;
		}
		function hi(e) {
			0 <= e && (T_ = e);
		}
		function gi() {
			var e = E_;
			return E_ = null, e;
		}
		function _i() {
			var e = D_;
			return D_ = !1, e;
		}
		function vi(e) {
			C_ = h_(), 0 > e.actualStartTime && (e.actualStartTime = C_);
		}
		function yi(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, e.selfBaseDuration = t, C_ = -1;
			}
		}
		function bi(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, C_ = -1;
			}
		}
		function xi() {
			if (0 <= C_) {
				var e = h_(), t = e - C_;
				C_ = -1, w_ += t, T_ += t, J = e;
			}
		}
		function Si(e) {
			E_ === null && (E_ = []), E_.push(e), S_ === null && (S_ = []), S_.push(e);
		}
		function Ci() {
			C_ = h_(), 0 > q && (q = C_);
		}
		function wi(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Ti(e, t) {
			if (rv === null) {
				var n = rv = [];
				iv = 0, av = tu(), ov = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return iv++, t.then(Ei, Ei), t;
		}
		function Ei() {
			if (--iv === 0 && (-1 < B_ || (z_ = -1.1), rv !== null)) {
				ov !== null && (ov.status = "fulfilled");
				var e = rv;
				rv = null, av = 0, ov = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Di(e, t) {
			var n = [], r = {
				status: "pending",
				value: null,
				reason: null,
				then: function(e) {
					n.push(e);
				}
			};
			return e.then(function() {
				r.status = "fulfilled", r.value = t;
				for (var e = 0; e < n.length; e++) (0, n[e])(t);
			}, function(e) {
				for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
			}), r;
		}
		function Oi() {
			var e = cv.current;
			return e === null ? Wb.pooledCache : e;
		}
		function ki(e, t) {
			t === null ? T(cv, cv.current, e) : T(cv, t.pool, e);
		}
		function Ai() {
			var e = Oi();
			return e === null ? null : {
				parent: m_._currentValue,
				pool: e
			};
		}
		function ji() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function Mi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Ni(e, t, n) {
			U.actQueue !== null && (U.didUsePromise = !0);
			var r = e.thenables;
			if (n = r[n], n === void 0 ? r.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(nn, nn), t = n), t._debugInfo === void 0) {
				e = performance.now(), r = t.displayName;
				var i = {
					name: typeof r == "string" ? r : "Promise",
					start: e,
					end: e,
					value: t
				};
				t._debugInfo = [{ awaited: i }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
					i.end = performance.now();
				}, t.then(e, e));
			}
			switch (t.status) {
				case "fulfilled": return t.value;
				case "rejected": throw e = t.reason, Ii(e), e;
				default:
					if (typeof t.status == "string") t.then(nn, nn);
					else {
						if (e = Wb, e !== null && 100 < e.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
						e = t, e.status = "pending", e.then(function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "fulfilled", n.value = e;
							}
						}, function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "rejected", n.reason = e;
							}
						});
					}
					switch (t.status) {
						case "fulfilled": return t.value;
						case "rejected": throw e = t.reason, Ii(e), e;
					}
					throw Vv = t, Hv = !0, Lv;
			}
		}
		function Pi(e) {
			try {
				return Iv(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Vv = e, Hv = !0, Lv) : e;
			}
		}
		function Fi() {
			if (Vv === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Vv;
			return Vv = null, Hv = !1, e;
		}
		function Ii(e) {
			if (e === Lv || e === zv) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function Li(e) {
			var t = Y;
			return e != null && (Y = t === null ? e : t.concat(e)), t;
		}
		function Ri() {
			var e = Y;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function F(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key") {
					t === null && (t = Sr(e, n.mode, 0), t._debugInfo = Y, t.return = n), O(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function zi(e) {
			var t = Wv;
			return Wv += 1, Uv === null && (Uv = ji()), Ni(Uv, e, t);
		}
		function Bi(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function Vi(e, t) {
			throw t.$$typeof === Of ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function Hi(e, t) {
			var n = Ri();
			n === null ? Vi(e, t) : n.run(Vi.bind(null, e, t));
		}
		function Ui(e, t) {
			var n = w(e) || "Component";
			Jv[n] || (Jv[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function Wi(e, t) {
			var n = Ri();
			n === null ? Ui(e, t) : n.run(Ui.bind(null, e, t));
		}
		function Gi(e, t) {
			var n = w(e) || "Component";
			Yv[n] || (Yv[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function Ki(e, t) {
			var n = Ri();
			n === null ? Gi(e, t) : n.run(Gi.bind(null, e, t));
		}
		function qi(e) {
			function t(t, n) {
				if (e) {
					var r = t.deletions;
					r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
				}
			}
			function n(n, r) {
				if (!e) return null;
				for (; r !== null;) t(n, r), r = r.sibling;
				return null;
			}
			function r(e) {
				for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
				return t;
			}
			function i(e, t) {
				return e = yr(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 67108866), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = wr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === jf ? (t = u(e, t, n.props.children, r, n.key), F(n, t, e), t) : t !== null && (t.elementType === a || mr(t, n) || typeof a == "object" && a && a.$$typeof === Bf && Pi(a) === t.type) ? (t = i(t, n.props), Bi(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Y, t) : (t = Sr(n, e.mode, r), Bi(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Er(n, e.mode, r), t.return = e, t._debugInfo = Y, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Y, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Cr(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = wr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case kf: return n = Sr(t, e.mode, n), Bi(n, t), n.return = e, e = Li(t._debugInfo), n._debugInfo = Y, Y = e, n;
						case Af: return t = Er(t, e.mode, n), t.return = e, t._debugInfo = Y, t;
						case Bf:
							var r = Li(t._debugInfo);
							return t = Pi(t), e = d(e, t, n), Y = r, e;
					}
					if (Gf(t) || ie(t)) return n = Cr(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = Li(t._debugInfo), n._debugInfo = Y, Y = e, n;
					if (typeof t.then == "function") return r = Li(t._debugInfo), e = d(e, zi(t), n), Y = r, e;
					if (t.$$typeof === Ff) return d(e, ti(e, t), n);
					Hi(e, t);
				}
				return typeof t == "function" && Wi(e, t), typeof t == "symbol" && Ki(e, t), null;
			}
			function f(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case kf: return n.key === i ? (i = Li(n._debugInfo), e = c(e, t, n, r), Y = i, e) : null;
						case Af: return n.key === i ? l(e, t, n, r) : null;
						case Bf: return i = Li(n._debugInfo), n = Pi(n), e = f(e, t, n, r), Y = i, e;
					}
					if (Gf(n) || ie(n)) return i === null ? (i = Li(n._debugInfo), e = u(e, t, n, r, null), Y = i, e) : null;
					if (typeof n.then == "function") return i = Li(n._debugInfo), e = f(e, t, zi(n), r), Y = i, e;
					if (n.$$typeof === Ff) return f(e, t, ti(e, n), r);
					Hi(e, n);
				}
				return typeof n == "function" && Wi(e, n), typeof n == "symbol" && Ki(e, n), null;
			}
			function p(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case kf: return n = e.get(r.key === null ? n : r.key) || null, e = Li(r._debugInfo), t = c(t, n, r, i), Y = e, t;
						case Af: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Bf:
							var a = Li(r._debugInfo);
							return r = Pi(r), t = p(e, t, n, r, i), Y = a, t;
					}
					if (Gf(r) || ie(r)) return n = e.get(n) || null, e = Li(r._debugInfo), t = u(t, n, r, i, null), Y = e, t;
					if (typeof r.then == "function") return a = Li(r._debugInfo), t = p(e, t, n, zi(r), i), Y = a, t;
					if (r.$$typeof === Ff) return p(e, t, n, ti(t, r), i);
					Hi(t, r);
				}
				return typeof r == "function" && Wi(t, r), typeof r == "symbol" && Ki(t, r), null;
			}
			function h(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case kf:
					case Af:
						m(e, t, n);
						var i = n.key;
						if (typeof i != "string") break;
						if (r === null) {
							r = /* @__PURE__ */ new Set(), r.add(i);
							break;
						}
						if (!r.has(i)) {
							r.add(i);
							break;
						}
						O(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Bf: n = Pi(n), h(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, m = null, g = o, _ = o = 0, v = null; g !== null && _ < s.length; _++) {
					g.index > _ ? (v = g, g = null) : v = g.sibling;
					var y = f(i, g, s[_], c);
					if (y === null) {
						g === null && (g = v);
						break;
					}
					l = h(i, y, s[_], l), e && g && y.alternate === null && t(i, g), o = a(y, o, _), m === null ? u = y : m.sibling = y, m = y, g = v;
				}
				if (_ === s.length) return n(i, g), $g && Or(i, _), u;
				if (g === null) {
					for (; _ < s.length; _++) g = d(i, s[_], c), g !== null && (l = h(i, g, s[_], l), o = a(g, o, _), m === null ? u = g : m.sibling = g, m = g);
					return $g && Or(i, _), u;
				}
				for (g = r(g); _ < s.length; _++) v = p(g, i, _, s[_], c), v !== null && (l = h(i, v, s[_], l), e && v.alternate !== null && g.delete(v.key === null ? _ : v.key), o = a(v, o, _), m === null ? u = v : m.sibling = v, m = v);
				return e && g.forEach(function(e) {
					return t(i, e);
				}), $g && Or(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, m = o, g = o = 0, _ = null, v = null, y = s.next(); m !== null && !y.done; g++, y = s.next()) {
					m.index > g ? (_ = m, m = null) : _ = m.sibling;
					var b = f(i, m, y.value, c);
					if (b === null) {
						m === null && (m = _);
						break;
					}
					v = h(i, b, y.value, v), e && m && b.alternate === null && t(i, m), o = a(b, o, g), u === null ? l = b : u.sibling = b, u = b, m = _;
				}
				if (y.done) return n(i, m), $g && Or(i, g), l;
				if (m === null) {
					for (; !y.done; g++, y = s.next()) m = d(i, y.value, c), m !== null && (v = h(i, m, y.value, v), o = a(m, o, g), u === null ? l = m : u.sibling = m, u = m);
					return $g && Or(i, g), l;
				}
				for (m = r(m); !y.done; g++, y = s.next()) _ = p(m, i, g, y.value, c), _ !== null && (v = h(i, _, y.value, v), e && _.alternate !== null && m.delete(_.key === null ? g : _.key), o = a(_, o, g), u === null ? l = _ : u.sibling = _, u = _);
				return e && m.forEach(function(e) {
					return t(i, e);
				}), $g && Or(i, g), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === jf && a.key === null && (F(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case kf:
							var c = Li(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === jf) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, F(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || mr(r, a) || typeof l == "object" && l && l.$$typeof === Bf && Pi(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), Bi(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, e = s;
											break a;
										}
										n(e, r);
										break;
									} else t(e, r);
									r = r.sibling;
								}
								a.type === jf ? (s = Cr(a.props.children, e.mode, s, a.key), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, F(a, s, e), e = s) : (s = Sr(a, e.mode, s), Bi(s, a), s.return = e, s._debugInfo = Y, e = s);
							}
							return e = o(e), Y = c, e;
						case Af:
							a: {
								for (c = a, a = c.key; r !== null;) {
									if (r.key === a) if (r.tag === 4 && r.stateNode.containerInfo === c.containerInfo && r.stateNode.implementation === c.implementation) {
										n(e, r.sibling), s = i(r, c.children || []), s.return = e, e = s;
										break a;
									} else {
										n(e, r);
										break;
									}
									else t(e, r);
									r = r.sibling;
								}
								s = Er(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Bf: return c = Li(a._debugInfo), a = Pi(a), e = y(e, r, a, s), Y = c, e;
					}
					if (Gf(a)) return c = Li(a._debugInfo), e = _(e, r, a, s), Y = c, e;
					if (ie(a)) {
						if (c = Li(a._debugInfo), l = ie(a), typeof l != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						var u = l.call(a);
						return u === a ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(u) !== "[object Generator]") && (Kv || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), Kv = !0) : a.entries !== l || Gv || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Gv = !0), e = v(e, r, u, s), Y = c, e;
					}
					if (typeof a.then == "function") return c = Li(a._debugInfo), e = y(e, r, zi(a), s), Y = c, e;
					if (a.$$typeof === Ff) return y(e, r, ti(e, a), s);
					Hi(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = wr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, e = s), o(e)) : (typeof a == "function" && Wi(e, a), typeof a == "symbol" && Ki(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = Y;
				Y = null;
				try {
					Wv = 0;
					var a = y(e, t, n, r);
					return Uv = null, a;
				} catch (t) {
					if (t === Lv || t === zv) throw t;
					var o = g(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = Y;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					Y = i;
				}
			};
		}
		function Ji(e, t) {
			var n = Gf(e);
			return e = !n && typeof ie(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function Yi(e) {
			e.updateQueue = {
				baseState: e.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: {
					pending: null,
					lanes: 0,
					hiddenCallbacks: null
				},
				callbacks: null
			};
		}
		function Xi(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function Zi(e) {
			return {
				lane: e,
				tag: Qv,
				payload: null,
				callback: null,
				next: null
			};
		}
		function Qi(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, iy === r && !ry) {
				var i = w(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), ry = !0;
			}
			return (Ub & Pb) === Nb ? (sr(e, r, t, n), dr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = dr(e), ur(e, null, n), t);
		}
		function $i(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Le(e, n);
			}
		}
		function ea(e, t) {
			var n = e.updateQueue, r = e.alternate;
			if (r !== null && (r = r.updateQueue, n === r)) {
				var i = null, a = null;
				if (n = n.firstBaseUpdate, n !== null) {
					do {
						var o = {
							lane: n.lane,
							tag: n.tag,
							payload: n.payload,
							callback: null,
							next: null
						};
						a === null ? i = a = o : a = a.next = o, n = n.next;
					} while (n !== null);
					a === null ? i = a = t : a = a.next = t;
				} else i = a = t;
				n = {
					baseState: r.baseState,
					firstBaseUpdate: i,
					lastBaseUpdate: a,
					shared: r.shared,
					callbacks: r.callbacks
				}, e.updateQueue = n;
				return;
			}
			e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
		}
		function ta() {
			if (ay) {
				var e = ov;
				if (e !== null) throw e;
			}
		}
		function na(e, t, n, r) {
			ay = !1;
			var i = e.updateQueue;
			ny = !1, iy = i.shared;
			var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
			if (s !== null) {
				i.shared.pending = null;
				var c = s, l = c.next;
				c.next = null, o === null ? a = l : o.next = l, o = c;
				var u = e.alternate;
				u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
			}
			if (a !== null) {
				var d = i.baseState;
				o = 0, u = l = c = null, s = a;
				do {
					var f = s.lane & -536870913, p = f !== s.lane;
					if (p ? ($ & f) === f : (r & f) === f) {
						f !== 0 && f === av && (ay = !0), u !== null && (u = u.next = {
							lane: 0,
							tag: s.tag,
							payload: s.payload,
							callback: null,
							next: null
						});
						a: {
							f = e;
							var m = s, h = t, g = n;
							switch (m.tag) {
								case $v:
									if (m = m.payload, typeof m == "function") {
										u_ = !0;
										var _ = m.call(g, d, h);
										if (f.mode & Lg) {
											Ae(!0);
											try {
												m.call(g, d, h);
											} finally {
												Ae(!1);
											}
										}
										u_ = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case ty: f.flags = f.flags & -65537 | 128;
								case Qv:
									if (_ = m.payload, typeof _ == "function") {
										if (u_ = !0, m = _.call(g, d, h), f.mode & Lg) {
											Ae(!0);
											try {
												_.call(g, d, h);
											} finally {
												Ae(!1);
											}
										}
										u_ = !1;
									} else m = _;
									if (m == null) break a;
									d = H({}, d, m);
									break a;
								case ey: ny = !0;
							}
						}
						f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
					} else p = {
						lane: f,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
					if (s = s.next, s === null) {
						if (s = i.shared.pending, s === null) break;
						p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
					}
				} while (1);
				u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), cx |= o, e.lanes = o, e.memoizedState = d;
			}
			iy = null;
		}
		function ra(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function ia(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) ra(n[e], t);
		}
		function aa(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) ra(n[e], t);
		}
		function oa(e, t) {
			var n = ox;
			T(sy, n, e), T(oy, t, e), ox = n | t.baseLanes;
		}
		function sa(e) {
			T(sy, ox, e), T(oy, oy.current, e);
		}
		function ca(e) {
			ox = sy.current, se(oy, e), se(sy, e);
		}
		function la(e) {
			var t = e.alternate;
			T(fy, fy.current & uy, e), T(cy, e, e), ly === null && (t === null || oy.current !== null || t.memoizedState !== null) && (ly = e);
		}
		function ua(e) {
			T(fy, fy.current, e), T(cy, e, e), ly === null && (ly = e);
		}
		function da(e) {
			e.tag === 22 ? (T(fy, fy.current, e), T(cy, e, e), ly === null && (ly = e)) : fa(e);
		}
		function fa(e) {
			T(fy, fy.current, e), T(cy, cy.current, e);
		}
		function pa(e) {
			se(cy, e), ly === e && (ly = null), se(fy, e);
		}
		function ma(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || pd(n) || md(n))) return t;
				} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
					if (t.flags & 128) return t;
				} else if (t.child !== null) {
					t.child.return = t, t = t.child;
					continue;
				}
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return null;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
			return null;
		}
		function I() {
			var e = Z;
			Py === null ? Py = [e] : Py.push(e);
		}
		function L() {
			var e = Z;
			if (Py !== null && (Fy++, Py[Fy] !== e)) {
				var t = w(X);
				if (!yy.has(t) && (yy.add(t), Py !== null)) {
					for (var n = "", r = 0; r <= Fy; r++) {
						var i = Py[r], a = r === Fy ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function ha(e) {
			e == null || Gf(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function ga() {
			var e = w(X);
			Sy.has(e) || (Sy.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function _a() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function va(e, t) {
			if (Iy) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!Hh(e[n], t[n])) return !1;
			return !0;
		}
		function ya(e, t, n, r, i, a) {
			Cy = a, X = t, Py = e === null ? null : e._debugHookTypes, Fy = -1, Iy = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = w(X), xy.has(a) || (xy.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e !== null && e.memoizedState !== null ? By : Py === null ? Ry : zy, Oy = a = (t.mode & Lg) !== G;
			var o = bv(n, r, i);
			if (Oy = !1, Dy && (o = xa(t, n, r, i)), a) {
				Ae(!0);
				try {
					o = xa(t, n, r, i);
				} finally {
					Ae(!1);
				}
			}
			return ba(e, t), o;
		}
		function ba(e, t) {
			t._debugHookTypes = Py, t.dependencies === null ? jy !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: jy
			}) : t.dependencies._debugThenableState = jy, U.H = Ly;
			var n = wy !== null && wy.next !== null;
			if (Cy = 0, Py = Z = Ty = wy = X = null, Fy = -1, e !== null && (e.flags & 65011712) != (t.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Ey = !1, Ay = 0, jy = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || ob || (e = e.dependencies, e !== null && Qr(e) && (ob = !0)), Hv ? (Hv = !1, e = !0) : e = !1, e && (t = w(t) || "Unknown", by.has(t) || xy.has(t) || (by.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function xa(e, t, n, r) {
			X = e;
			var i = 0;
			do {
				if (Dy && (jy = null), Ay = 0, Dy = !1, i >= Ny) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Iy = !1, Ty = wy = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Fy = -1, U.H = Vy, a = bv(t, n, r);
			} while (Dy);
			return a;
		}
		function Sa() {
			var e = U.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? ka(t) : t, e = e.useState()[0], (wy === null ? null : wy.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function Ca() {
			var e = ky !== 0;
			return ky = 0, e;
		}
		function wa(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Rg) === G ? t.flags & -2053 : t.flags & -402655237, e.lanes &= ~n;
		}
		function Ta(e) {
			if (Ey) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Ey = !1;
			}
			Cy = 0, Py = Ty = wy = X = null, Fy = -1, Z = null, Dy = !1, Ay = ky = 0, jy = null;
		}
		function Ea() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e, Ty;
		}
		function Da() {
			if (wy === null) {
				var e = X.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = wy.next;
			var t = Ty === null ? X.memoizedState : Ty.next;
			if (t !== null) Ty = t, wy = e;
			else {
				if (e === null) throw X.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				wy = e, e = {
					memoizedState: wy.memoizedState,
					baseState: wy.baseState,
					baseQueue: wy.baseQueue,
					queue: wy.queue,
					next: null
				}, Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e;
			}
			return Ty;
		}
		function Oa() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function ka(e) {
			var t = Ay;
			return Ay += 1, jy === null && (jy = ji()), e = Ni(jy, e, t), t = X, (Ty === null ? t.memoizedState : Ty.next) === null && (t = t.alternate, U.H = t !== null && t.memoizedState !== null ? By : Ry), e;
		}
		function Aa(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return ka(e);
				if (e.$$typeof === Ff) return ei(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function ja(e) {
			var t = null, n = X.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = X.alternate;
				r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
					data: r.data.map(function(e) {
						return e.slice();
					}),
					index: 0
				})));
			}
			if (t ??= {
				data: [],
				index: 0
			}, n === null && (n = Oa(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Iy) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Hf;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function Ma(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function Na(e, t, n) {
			var r = Ea();
			if (n !== void 0) {
				var i = n(t);
				if (Oy) {
					Ae(!0);
					try {
						n(t);
					} finally {
						Ae(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Vo.bind(null, X, e), [r.memoizedState, e];
		}
		function Pa(e) {
			return Fa(Da(), wy, e);
		}
		function Fa(e, t, n) {
			var r = e.queue;
			if (r === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			r.lastRenderedReducer = n;
			var i = e.baseQueue, a = r.pending;
			if (a !== null) {
				if (i !== null) {
					var o = i.next;
					i.next = a.next, a.next = o;
				}
				t.baseQueue !== i && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), t.baseQueue = i = a, r.pending = null;
			}
			if (a = e.baseState, i === null) e.memoizedState = a;
			else {
				t = i.next;
				var s = o = null, c = null, l = t, u = !1;
				do {
					var d = l.lane & -536870913;
					if (d === l.lane ? (Cy & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === av && (u = !0);
						else if ((Cy & f) === f) {
							l = l.next, f === av && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, X.lanes |= f, cx |= f;
						d = l.action, Oy && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, X.lanes |= d, cx |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !Hh(a, e.memoizedState) && (ob = !0, u && (n = ov, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function Ia(e) {
			var t = Da(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				Hh(a, t.memoizedState) || (ob = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function La(e, t, n) {
			var r = X, i = Ea();
			if ($g) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				vy || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), vy = !0);
			} else {
				if (a = t(), vy || (n = t(), Hh(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0)), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || za(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, po(Va.bind(null, r, n, e), [e]), r.flags |= 2048, co(my | _y, { destroy: void 0 }, Ba.bind(null, r, n, a, t), null), a;
		}
		function Ra(e, t, n) {
			var r = X, i = Da(), a = $g;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !vy) {
				var o = t();
				Hh(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0);
			}
			if ((o = !Hh((wy || i).memoizedState, n)) && (i.memoizedState = n, ob = !0), i = i.queue, fo(2048, _y, Va.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || Ty !== null && Ty.memoizedState.tag & my) {
				if (r.flags |= 2048, co(my | _y, { destroy: void 0 }, Ba.bind(null, r, i, n, t), null), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || Cy & 127 || za(r, t, n);
			}
			return n;
		}
		function za(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = Oa(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function Ba(e, t, n, r) {
			t.value = n, t.getSnapshot = r, Ha(t) && Ua(e);
		}
		function Va(e, t, n) {
			return n(function() {
				Ha(t) && (oi(2, "updateSyncExternalStore()", e), Ua(e));
			});
		}
		function Ha(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !Hh(e, n);
			} catch {
				return !0;
			}
		}
		function Ua(e) {
			var t = lr(e, 2);
			t !== null && el(t, e, 2);
		}
		function Wa(e) {
			var t = Ea();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), Oy) {
					Ae(!0);
					try {
						n();
					} finally {
						Ae(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ma,
				lastRenderedState: e
			}, t;
		}
		function Ga(e) {
			e = Wa(e);
			var t = e.queue, n = Ho.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function Ka(e) {
			var t = Ea();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Wo.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function qa(e, t) {
			return Ja(Da(), wy, e, t);
		}
		function Ja(e, t, n, r) {
			return e.baseState = n, Fa(e, wy, typeof r == "function" ? r : Ma);
		}
		function Ya(e, t) {
			var n = Da();
			return wy === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ja(n, wy, e, t);
		}
		function Xa(e, t, n, r, i) {
			if (Go(e)) throw Error("Cannot update form state while rendering.");
			if (e = t.action, e !== null) {
				var a = {
					payload: i,
					action: e,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function(e) {
						a.listeners.push(e);
					}
				};
				U.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, Za(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function Za(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = U.T, o = {};
				o._updatedFibers = /* @__PURE__ */ new Set(), U.T = o;
				try {
					var s = n(i, r), c = U.S;
					c !== null && c(o, s), Qa(e, t, s);
				} catch (n) {
					eo(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), U.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), Qa(e, t, o);
			} catch (n) {
				eo(e, t, n);
			}
		}
		function Qa(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (U.asyncTransitions++, n.then(ko, ko), n.then(function(n) {
				$a(e, t, n);
			}, function(n) {
				return eo(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : $a(e, t, n);
		}
		function $a(e, t, n) {
			t.status = "fulfilled", t.value = n, to(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Za(e, n)));
		}
		function eo(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, to(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function to(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function no(e, t) {
			return t;
		}
		function ro(e, t) {
			if ($g) {
				var n = Wb.formState;
				if (n !== null) {
					a: {
						var r = X;
						if ($g) {
							if (Qg) {
								b: {
									for (var i = Qg, a = r_; i.nodeType !== 8;) {
										if (!a) {
											i = null;
											break b;
										}
										if (i = gd(i.nextSibling), i === null) {
											i = null;
											break b;
										}
									}
									a = i.data, i = a === zS || a === BS ? i : null;
								}
								if (i) {
									Qg = gd(i.nextSibling), r = i.data === zS;
									break a;
								}
							}
							Rr(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = Ea(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: no,
				lastRenderedState: t
			}, n.queue = r, n = Ho.bind(null, X, r), r.dispatch = n, r = Wa(!1), a = Wo.bind(null, X, !1, r.queue), r = Ea(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = Xa.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function io(e) {
			return ao(Da(), wy, e);
		}
		function ao(e, t, n) {
			if (t = Fa(e, t, no)[0], e = Pa(Ma)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = ka(t);
			} catch (e) {
				throw e === Lv ? zv : e;
			}
			else r = t;
			t = Da();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, co(my | _y, { destroy: void 0 }, oo.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function oo(e, t) {
			e.action = t;
		}
		function so(e) {
			var t = Da(), n = wy;
			if (n !== null) return ao(t, n, e);
			Da(), t = t.memoizedState, n = Da();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function co(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = Oa(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function lo(e) {
			var t = Ea();
			return e = { current: e }, t.memoizedState = e;
		}
		function uo(e, t, n, r) {
			var i = Ea();
			X.flags |= e, i.memoizedState = co(my | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function fo(e, t, n, r) {
			var i = Da();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			wy !== null && r !== null && va(r, wy.memoizedState.deps) ? i.memoizedState = co(t, a, n, r) : (X.flags |= e, i.memoizedState = co(my | t, a, n, r));
		}
		function po(e, t) {
			(X.mode & Rg) === G ? uo(8390656, _y, e, t) : uo(276826112, _y, e, t);
		}
		function mo(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = Oa(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function ho(e) {
			var t = Ea(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function R(e) {
			var t = Da().memoizedState;
			return mo({
				ref: t,
				nextImpl: e
			}), function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function go(e, t) {
			var n = 4194308;
			return (X.mode & Rg) !== G && (n |= 134217728), uo(n, gy, e, t);
		}
		function _o(e, t) {
			if (typeof t == "function") {
				e = e();
				var n = t(e);
				return function() {
					typeof n == "function" ? n() : t(null);
				};
			}
			if (t != null) return t.hasOwnProperty("current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(t).join(", ") + "}"), e = e(), t.current = e, function() {
				t.current = null;
			};
		}
		function vo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & Rg) !== G && (r |= 134217728), uo(r, gy, _o.bind(null, t, e), n);
		}
		function yo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), fo(4, gy, _o.bind(null, t, e), n);
		}
		function bo(e, t) {
			return Ea().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function xo(e, t) {
			var n = Da();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && va(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function So(e, t) {
			var n = Ea();
			t = t === void 0 ? null : t;
			var r = e();
			if (Oy) {
				Ae(!0);
				try {
					e();
				} finally {
					Ae(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Co(e, t) {
			var n = Da();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && va(t, r[1])) return r[0];
			if (r = e(), Oy) {
				Ae(!0);
				try {
					e();
				} finally {
					Ae(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function wo(e, t) {
			return Do(Ea(), e, t);
		}
		function To(e, t) {
			return Oo(Da(), wy.memoizedState, e, t);
		}
		function Eo(e, t) {
			var n = Da();
			return wy === null ? Do(n, e, t) : Oo(n, wy.memoizedState, e, t);
		}
		function Do(e, t, n) {
			return n === void 0 || Cy & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = $c(), X.lanes |= e, cx |= e, n);
		}
		function Oo(e, t, n, r) {
			return Hh(n, t) ? n : oy.current === null ? !(Cy & 42) || Cy & 1073741824 && !($ & 261930) ? (ob = !0, e.memoizedState = n) : (e = $c(), X.lanes |= e, cx |= e, t) : (e = Do(e, n, r), Hh(e, t) || (ob = !0), e);
		}
		function ko() {
			U.asyncTransitions--;
		}
		function Ao(e, t, n, r, i) {
			var a = Kf.p;
			Kf.p = a !== 0 && a < Bp ? a : Bp;
			var o = U.T, s = {};
			s._updatedFibers = /* @__PURE__ */ new Set(), U.T = s, Wo(e, !1, t, n);
			try {
				var c = i(), l = U.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					U.asyncTransitions++, c.then(ko, ko);
					var u = Di(c, r);
					Uo(e, t, u, Qc(e));
				} else Uo(e, t, r, Qc(e));
			} catch (n) {
				Uo(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, Qc(e));
			} finally {
				Kf.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), U.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function jo(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = Mo(e).queue;
			si(e), Ao(e, i, t, yC, n === null ? p : function() {
				return No(e), n(r);
			});
		}
		function Mo(e) {
			var t = e.memoizedState;
			if (t !== null) return t;
			t = {
				memoizedState: yC,
				baseState: yC,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Ma,
					lastRenderedState: yC
				},
				next: null
			};
			var n = {};
			return t.next = {
				memoizedState: n,
				baseState: n,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Ma,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function No(e) {
			U.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = Mo(e);
			t.next === null && (t = e.alternate.memoizedState), Uo(e, t.next.queue, {}, Qc(e));
		}
		function Po() {
			var e = Wa(!1);
			return e = Ao.bind(null, X, e.queue, !0, !1), Ea().memoizedState = e, [!1, e];
		}
		function Fo() {
			var e = Pa(Ma)[0], t = Da().memoizedState;
			return [typeof e == "boolean" ? e : ka(e), t];
		}
		function Io() {
			var e = Ia(Ma)[0], t = Da().memoizedState;
			return [typeof e == "boolean" ? e : ka(e), t];
		}
		function Lo() {
			return ei(bC);
		}
		function Ro() {
			var e = Ea(), t = Wb.identifierPrefix;
			if ($g) {
				var n = Xg, r = Yg;
				n = (r & ~(1 << 32 - Np(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ky++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = My++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function zo() {
			return Ea().memoizedState = Bo.bind(null, X);
		}
		function Bo(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = Qc(n), i = Zi(r), a = Qi(n, i, r);
						a !== null && (oi(r, "refresh()", e), el(a, n, r), $i(a, n, r)), e = ri(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function Vo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = Qc(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			Go(e) ? Ko(t, i) : (i = cr(e, t, i, r), i !== null && (oi(r, "dispatch()", e), el(i, e, r), qo(i, t, r)));
		}
		function Ho(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = Qc(e), Uo(e, t, n, r) && oi(r, "setState()", e);
		}
		function Uo(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (Go(e)) Ko(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = U.H;
					U.H = Uy;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, Hh(c, s)) return sr(e, t, i, 0), Wb === null && or(), !1;
					} catch {} finally {
						U.H = o;
					}
				}
				if (n = cr(e, t, i, r), n !== null) return el(n, e, r), qo(n, t, r), !0;
			}
			return !1;
		}
		function Wo(e, t, n, r) {
			if (U.T === null && av === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: tu(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, Go(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = cr(e, n, r, 2), t !== null && (oi(2, "setOptimistic()", e), el(t, e, 2));
		}
		function Go(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function Ko(e, t) {
			Dy = Ey = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function qo(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Le(e, n);
			}
		}
		function Jo(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				tb.has(t) || (tb.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function Yo(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Lg) {
				Ae(!0);
				try {
					a = n(r, i);
				} finally {
					Ae(!1);
				}
			}
			a === void 0 && (t = C(t) || "Component", Zy.has(t) || (Zy.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : H({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function Xo(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Lg) {
					Ae(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Ae(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", C(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !Mn(n, r) || !Mn(i, a) : !0;
		}
		function Zo(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = w(e) || "Component", Ky.has(e) || (Ky.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), nb.enqueueReplaceState(t, t.state, null));
		}
		function Qo(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = H({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function $o(e) {
			ug(e), console.warn("%s\n\n%s\n", rb ? "An error occurred in the <" + rb + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function es(e) {
			var t = rb ? "The above error occurred in the <" + rb + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((ib || "Anonymous") + ".");
			if (typeof e == "object" && e && typeof e.environmentName == "string") {
				var r = e.environmentName;
				e = [
					"%o\n\n%s\n\n%s\n",
					e,
					t,
					n
				].slice(0), typeof e[0] == "string" ? e.splice(0, 1, xC + " " + e[0], SC, wC + r + wC, CC) : e.splice(0, 0, xC, SC, wC + r + wC, CC), e.unshift(console), r = TC.apply(console.error, e), r();
			} else console.error("%o\n\n%s\n\n%s\n", e, t, n);
		}
		function ts(e) {
			ug(e);
		}
		function ns(e, t) {
			try {
				rb = t.source ? w(t.source) : null, ib = null;
				var n = t.value;
				if (U.actQueue !== null) U.thrownErrors.push(n);
				else {
					var r = e.onUncaughtError;
					r(n, { componentStack: t.stack });
				}
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function rs(e, t, n) {
			try {
				rb = n.source ? w(n.source) : null, ib = w(t);
				var r = e.onCaughtError;
				r(n.value, {
					componentStack: n.stack,
					errorBoundary: t.tag === 1 ? t.stateNode : null
				});
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function is(e, t, n) {
			return n = Zi(n), n.tag = ty, n.payload = { element: null }, n.callback = function() {
				O(t.source, ns, e, t);
			}, n;
		}
		function as(e) {
			return e = Zi(e), e.tag = ty, e;
		}
		function os(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					hr(n), O(r.source, rs, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				hr(n), O(r.source, rs, t, n, r), typeof i != "function" && (Cx === null ? Cx = /* @__PURE__ */ new Set([this]) : Cx.add(this)), Ov(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", w(n) || "Unknown");
			});
		}
		function ss(e, t, n, r, i) {
			if (n.flags |= 32768, Mp && Wl(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && Zr(t, n, i, !0), $g && (e_ = !0), n = cy.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13: return ly === null ? ml() : n.alternate === null && sx === Ib && (sx = zb), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Bv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Fl(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Bv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Fl(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return Fl(e, r, i), ml(), !1;
			}
			if ($g) return e_ = !0, t = cy.current, t === null ? (r !== i_ && Wr(Dr(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Dr(r, n), i = is(e.stateNode, r, i), ea(e, i), sx !== Bb && (sx = Rb)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== i_ && Wr(Dr(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Dr(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (px === null ? px = [a] : px.push(a), sx !== Bb && (sx = Rb), t === null) return !0;
			r = Dr(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = is(n.stateNode, r, e), ea(n, e), !1;
					case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (Cx === null || !Cx.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = as(i), os(i, e, n, r), ea(n, i), !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function cs(e, t, n, r) {
			t.child = e === null ? Zv(t, null, n, r) : Xv(t, e.child, n, r);
		}
		function ls(e, t, n, r, i) {
			n = n.render;
			var a = t.ref;
			if ("ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return $r(t), r = ya(e, t, n, o, a, i), s = Ca(), e !== null && !ob ? (wa(e, t, i), Ns(e, t, i)) : ($g && s && Ar(t), t.flags |= 1, cs(e, t, r, i), t.child);
		}
		function us(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !vr(a) && a.defaultProps === void 0 && n.compare === null ? (n = fr(a), t.tag = 15, t.type = n, Cs(t, a), ds(e, t, n, r, i)) : (e = xr(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !Ps(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? Mn : n, n(o, r) && e.ref === t.ref) return Ns(e, t, i);
			}
			return t.flags |= 1, e = yr(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function ds(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (Mn(a, r) && e.ref === t.ref && t.type === e.type) if (ob = !1, t.pendingProps = r = a, Ps(e, i)) e.flags & 131072 && (ob = !0);
				else return t.lanes = e.lanes, Ns(e, t, i);
			}
			return ys(e, t, n, r, i);
		}
		function fs(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return ms(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && ki(t, a === null ? null : a.cachePool), a === null ? sa(t) : oa(t, a), da(t);
				else return r = t.lanes = 536870912, ms(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && ki(t, null), sa(t), fa(t)) : (ki(t, a.cachePool), oa(t, a), fa(t), t.memoizedState = null);
			return cs(e, t, i, n), t.child;
		}
		function ps(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function ms(e, t, n, r, i) {
			var a = Oi();
			return a = a === null ? null : {
				parent: m_._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && ki(t, null), sa(t), da(t), e !== null && Zr(e, t, r, !0), t.childLanes = i, null;
		}
		function hs(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = Os({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function gs(e, t, n) {
			return Xv(t, e.child, null, n), e = hs(t, t.pendingProps), e.flags |= 2, pa(t), t.memoizedState = null, e;
		}
		function _s(e, t, n) {
			var r = t.pendingProps, i = (t.flags & 128) != 0;
			if (t.flags &= -129, e === null) {
				if ($g) {
					if (r.mode === "hidden") return e = hs(t, r), t.lanes = 536870912, ps(null, e);
					if (ua(t), (e = Qg) ? (n = fd(e, r_), n = n !== null && n.data === kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Mr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Tr(n), r.return = t, t.child = r, Zg = t, Qg = null)) : n = null, n === null) throw Lr(t, e), Rr(t);
					return t.lanes = 536870912, null;
				}
				return hs(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (ua(t), i) if (t.flags & 256) t.flags &= -257, t = gs(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				else if (Ir(), n & 536870912 && pl(t), ob || Zr(e, t, n, !1), i = (n & e.childLanes) !== 0, ob || i) {
					if (r = Wb, r !== null && (o = Re(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, lr(e, o), el(r, e, o), ab;
					ml(), t = gs(e, t, n);
				} else e = a.treeContext, Qg = gd(o.nextSibling), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Nr(t, e), t = hs(t, r), t.flags |= 4096;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && pl(t), e = yr(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function vs(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function ys(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = C(n) || "Unknown";
				sb[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), sb[a] = !0);
			}
			return t.mode & Lg && lv.recordLegacyContextWarning(t, null), e === null && (Cs(t, t.type), n.contextTypes && (a = C(n) || "Unknown", lb[a] || (lb[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), $r(t), n = ya(e, t, n, r, void 0, i), r = Ca(), e !== null && !ob ? (wa(e, t, i), Ns(e, t, i)) : ($g && r && Ar(t), t.flags |= 1, cs(e, t, n, i), t.child);
		}
		function bs(e, t, n, r, i, a) {
			return $r(t), Fy = -1, Iy = e !== null && e.type !== t.type, t.updateQueue = null, n = xa(t, r, n, i), ba(e, t), r = Ca(), e !== null && !ob ? (wa(e, t, a), Ns(e, t, a)) : ($g && r && Ar(t), t.flags |= 1, cs(e, t, n, a), t.child);
		}
		function xs(e, t, n, r, i) {
			switch (u(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var s = i & -i;
					if (t.lanes |= s, o = Wb, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					s = as(s), os(s, o, t, Dr(a, t)), ea(t, s);
			}
			if ($r(t), t.stateNode === null) {
				if (o = Ng, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== Ff) && !eb.has(n) && (eb.add(n), s = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Pf ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", C(n) || "Component", s)), typeof a == "object" && a && (o = ei(a)), a = new n(r, o), t.mode & Lg) {
					Ae(!0);
					try {
						a = new n(r, o);
					} finally {
						Ae(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = nb, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = Gy, typeof n.getDerivedStateFromProps == "function" && o === null && (o = C(n) || "Component", qy.has(o) || (qy.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var c = s = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? s = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (s = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? c = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (c = "UNSAFE_componentWillUpdate"), o !== null || s !== null || c !== null) {
						a = C(n) || "Component";
						var l = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						Yy.has(a) || (Yy.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, l, o === null ? "" : "\n  " + o, s === null ? "" : "\n  " + s, c === null ? "" : "\n  " + c));
					}
				}
				a = t.stateNode, o = C(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !$y.has(n) && ($y.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !Qy.has(n) && (Qy.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", C(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), s = a.props !== r, a.props !== void 0 && s && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || Jy.has(n) || (Jy.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", C(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (s = a.state) && (typeof s != "object" || Gf(s)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Yi(t), o = n.contextType, a.context = typeof o == "object" && o ? ei(o) : Ng, a.state === r && (o = C(n) || "Component", Xy.has(o) || (Xy.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Lg && lv.recordLegacyContextWarning(t, a), lv.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Yo(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", w(t) || "Component"), nb.enqueueReplaceState(a, a.state, null)), na(t, r, a, i), ta(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				s = Qo(n, d), a.props = s;
				var f = a.context;
				c = n.contextType, o = Ng, typeof c == "object" && c && (o = ei(c)), l = n.getDerivedStateFromProps, c = typeof l == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, c || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && Zo(t, a, r, o), ny = !1;
				var p = t.memoizedState;
				a.state = p, na(t, r, a, i), ta(), f = t.memoizedState, d || p !== f || ny ? (typeof l == "function" && (Yo(t, n, l, r), f = t.memoizedState), (s = ny || Xo(t, n, s, r, p, f, o)) ? (c || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = s) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !1);
			} else {
				a = t.stateNode, Xi(e, t), o = t.memoizedProps, c = Qo(n, o), a.props = c, l = t.pendingProps, p = a.context, f = n.contextType, s = Ng, typeof f == "object" && f && (s = ei(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== l || p !== s) && Zo(t, a, r, s), ny = !1, p = t.memoizedState, a.state = p, na(t, r, a, i), ta();
				var m = t.memoizedState;
				o !== l || p !== m || ny || e !== null && e.dependencies !== null && Qr(e.dependencies) ? (typeof d == "function" && (Yo(t, n, d, r), m = t.memoizedState), (c = ny || Xo(t, n, c, r, p, m, s) || e !== null && e.dependencies !== null && Qr(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, s), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, s)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = s, a = c) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (s = a, vs(e, t), o = (t.flags & 128) != 0, s || o) {
				if (s = t.stateNode, Ce(t), o && typeof n.getDerivedStateFromError != "function") n = null, C_ = -1;
				else if (n = Sv(s), t.mode & Lg) {
					Ae(!0);
					try {
						Sv(s);
					} finally {
						Ae(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = Xv(t, e.child, null, i), t.child = Xv(t, null, n, i)) : cs(e, t, n, i), t.memoizedState = s.state, e = t.child;
			} else e = Ns(e, t, i);
			return i = t.stateNode, a && i.props !== r && (db || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", w(t) || "a component"), db = !0), e;
		}
		function Ss(e, t, n, r) {
			return Hr(), t.flags |= 256, cs(e, t, n, r), t.child;
		}
		function Cs(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = C(t) || "Unknown", ub[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), ub[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = C(t) || "Unknown", cb[t] || (console.error("%s: Function components do not support contextType.", t), cb[t] = !0));
		}
		function ws(e) {
			return {
				baseLanes: e,
				cachePool: Ai()
			};
		}
		function Ts(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= dx), e;
		}
		function Es(e, t, n) {
			var r, i = t.pendingProps;
			c(t) && (t.flags |= 128);
			var a = !1, o = (t.flags & 128) != 0;
			if ((r = o) || (r = e !== null && e.memoizedState === null ? !1 : (fy.current & dy) !== 0), r && (a = !0, t.flags &= -129), r = (t.flags & 32) != 0, t.flags &= -33, e === null) {
				if ($g) {
					if (a ? la(t) : fa(t), (e = Qg) ? (n = fd(e, r_), n = n !== null && n.data !== kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Mr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Tr(n), r.return = t, t.child = r, Zg = t, Qg = null)) : n = null, n === null) throw Lr(t, e), Rr(t);
					return md(n) ? t.lanes = 32 : t.lanes = 536870912, null;
				}
				var s = i.children;
				if (i = i.fallback, a) {
					fa(t);
					var l = t.mode;
					return s = Os({
						mode: "hidden",
						children: s
					}, l), i = Cr(i, l, n, null), s.return = t, i.return = t, s.sibling = i, t.child = s, i = t.child, i.memoizedState = ws(n), i.childLanes = Ts(e, r, n), t.memoizedState = mb, ps(null, i);
				}
				return la(t), Ds(t, s);
			}
			var u = e.memoizedState;
			if (u !== null) {
				var d = u.dehydrated;
				if (d !== null) {
					if (o) t.flags & 256 ? (la(t), t.flags &= -257, t = ks(e, t, n)) : t.memoizedState === null ? (fa(t), s = i.fallback, l = t.mode, i = Os({
						mode: "visible",
						children: i.children
					}, l), s = Cr(s, l, n, null), s.flags |= 2, i.return = t, s.return = t, i.sibling = s, t.child = i, Xv(t, e.child, null, n), i = t.child, i.memoizedState = ws(n), i.childLanes = Ts(e, r, n), t.memoizedState = mb, t = ps(null, i)) : (fa(t), t.child = e.child, t.flags |= 128, t = null);
					else if (la(t), Ir(), n & 536870912 && pl(t), md(d)) {
						if (r = d.nextSibling && d.nextSibling.dataset, r) {
							s = r.dgst;
							var f = r.msg;
							l = r.stck;
							var p = r.cstck;
						}
						a = f, r = s, i = l, d = p, s = a, l = d, s = Error(s || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), s.stack = i || "", s.digest = r, r = l === void 0 ? null : l, i = {
							value: s,
							source: null,
							stack: r
						}, typeof r == "string" && Vg.set(s, i), Wr(i), t = ks(e, t, n);
					} else if (ob || Zr(e, t, n, !1), r = (n & e.childLanes) !== 0, ob || r) {
						if (r = Wb, r !== null && (i = Re(r, n), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, lr(e, i), el(r, e, i), ab;
						pd(d) || ml(), t = ks(e, t, n);
					} else pd(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = u.treeContext, Qg = gd(d.nextSibling), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Nr(t, e), t = Ds(t, i.children), t.flags |= 4096);
					return t;
				}
			}
			return a ? (fa(t), s = i.fallback, l = t.mode, p = e.child, d = p.sibling, i = yr(p, {
				mode: "hidden",
				children: i.children
			}), i.subtreeFlags = p.subtreeFlags & 65011712, d === null ? (s = Cr(s, l, n, null), s.flags |= 2) : s = yr(d, s), s.return = t, i.return = t, i.sibling = s, t.child = i, ps(null, i), i = t.child, s = e.child.memoizedState, s === null ? s = ws(n) : (l = s.cachePool, l === null ? l = Ai() : (p = m_._currentValue, l = l.parent === p ? l : {
				parent: p,
				pool: p
			}), s = {
				baseLanes: s.baseLanes | n,
				cachePool: l
			}), i.memoizedState = s, i.childLanes = Ts(e, r, n), t.memoizedState = mb, ps(e.child, i)) : (u !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && pl(t), la(t), n = e.child, e = n.sibling, n = yr(n, {
				mode: "visible",
				children: i.children
			}), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function Ds(e, t) {
			return t = Os({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function Os(e, t) {
			return e = g(22, e, null, t), e.lanes = 0, e;
		}
		function ks(e, t, n) {
			return Xv(t, e.child, null, n), e = Ds(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function As(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), Yr(e.return, t, n);
		}
		function js(e, t, n, r, i, a) {
			var o = e.memoizedState;
			o === null ? e.memoizedState = {
				isBackwards: t,
				rendering: null,
				renderingStartTime: 0,
				last: r,
				tail: n,
				tailMode: i,
				treeForkCount: a
			} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
		}
		function Ms(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = fy.current;
			if ((r = (s & dy) !== 0) ? (s = s & uy | dy, t.flags |= 128) : s &= uy, T(fy, s, t), s = i ?? "null", i !== "forwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !fb[s]) if (fb[s] = !0, i == null) console.error("The default for the <SuspenseList revealOrder=\"...\"> prop is changing. To be future compatible you must explictly specify either \"independent\" (the current default), \"together\", \"forwards\" or \"legacy_unstable-backwards\".");
			else if (i === "backwards") console.error("The rendering order of <SuspenseList revealOrder=\"backwards\"> is changing. To be future compatible you must specify revealOrder=\"legacy_unstable-backwards\" instead.");
			else if (typeof i == "string") switch (i.toLowerCase()) {
				case "together":
				case "forwards":
				case "backwards":
				case "independent":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. Use lowercase \"%s\" instead.", i, i.toLowerCase());
					break;
				case "forward":
				case "backward":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use \"%ss\" instead.", i, i.toLowerCase());
					break;
				default: console.error("\"%s\" is not a supported revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			}
			else console.error("%s is not a supported value for revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			s = a ?? "null", pb[s] || (a == null ? (i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && (pb[s] = !0, console.error("The default for the <SuspenseList tail=\"...\"> prop is changing. To be future compatible you must explictly specify either \"visible\" (the current default), \"collapsed\" or \"hidden\".")) : a !== "visible" && a !== "collapsed" && a !== "hidden" ? (pb[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (pb[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) if (Gf(o)) {
				for (s = 0; s < o.length; s++) if (!Ji(o[s], s)) break a;
			} else if (s = ie(o), typeof s == "function") {
				if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
					if (!Ji(c.value, l)) break a;
					l++;
				}
			} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			if (cs(e, t, o, n), $g ? (Pr(), o = Gg) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && As(e, n, t);
				else if (e.tag === 19) As(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			switch (i) {
				case "forwards":
					for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ma(e) === null && (i = n), n = n.sibling;
					n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), js(t, !1, i, n, a, o);
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && ma(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					js(t, !0, n, null, a, o);
					break;
				case "together":
					js(t, !1, null, null, void 0, o);
					break;
				default: t.memoizedState = null;
			}
			return t.child;
		}
		function Ns(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), C_ = -1, cx |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
				if (Zr(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = yr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = yr(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function Ps(e, t) {
			return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Qr(e))) : !0;
		}
		function Fs(e, t, n) {
			switch (t.tag) {
				case 3:
					le(t, t.stateNode.containerInfo), qr(t, m_, e.memoizedState.cache), Hr();
					break;
				case 27:
				case 5:
					ue(t);
					break;
				case 4:
					le(t, t.stateNode.containerInfo);
					break;
				case 10:
					qr(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, ua(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (la(t), e = Ns(e, t, n), e === null ? null : e.sibling) : Es(e, t, n) : (la(t), t.flags |= 128, null);
					la(t);
					break;
				case 19:
					var i = (e.flags & 128) != 0;
					if (r = (n & t.childLanes) !== 0, r ||= (Zr(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return Ms(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), T(fy, fy.current, t), r) break;
					return null;
				case 22: return t.lanes = 0, fs(e, t, n, t.pendingProps);
				case 24: qr(t, m_, e.memoizedState.cache);
			}
			return Ns(e, t, n);
		}
		function Is(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = xr(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
				var r = t.return;
				if (r === null) throw Error("Cannot swap the root fiber.");
				if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === r.child) r.child = n;
				else {
					var i = r.child;
					if (i === null) throw Error("Expected parent to have a child.");
					for (; i.sibling !== t;) if (i = i.sibling, i === null) throw Error("Expected to find the previous sibling.");
					i.sibling = n;
				}
				return t = r.deletions, t === null ? (r.deletions = [e], r.flags |= 16) : t.push(e), n.flags |= 2, n;
			}
			if (e !== null) if (e.memoizedProps !== t.pendingProps || t.type !== e.type) ob = !0;
			else {
				if (!Ps(e, n) && !(t.flags & 128)) return ob = !1, Fs(e, t, n);
				ob = !!(e.flags & 131072);
			}
			else ob = !1, (r = $g) && (Pr(), r = (t.flags & 1048576) != 0), r && (r = t.index, Pr(), kr(t, Gg, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Pi(t.elementType), t.type = e, typeof e == "function") vr(e) ? (r = Qo(e, r), t.tag = 1, t.type = e = fr(e), t = xs(null, t, e, r, n)) : (t.tag = 0, Cs(t, e), t.type = e = fr(e), t = ys(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === If) {
								t.tag = 11, t.type = e = pr(e), t = ls(null, t, e, r, n);
								break a;
							} else if (i === zf) {
								t.tag = 14, t = us(null, t, e, r, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Bf && (t = " Did you wrap a component in React.lazy() more than once?"), n = C(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return ys(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = Qo(r, t.pendingProps), xs(e, t, r, i, n);
				case 3:
					a: {
						if (le(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, Xi(e, t), na(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, qr(t, m_, r), r !== a.cache && Xr(t, [m_], n, !0), ta(), r = o.element, a.isDehydrated) if (a = {
							element: r,
							isDehydrated: !1,
							cache: o.cache
						}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							t = Ss(e, t, r, n);
							break a;
						} else if (r !== i) {
							i = Dr(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), Wr(i), t = Ss(e, t, r, n);
							break a;
						} else {
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for (Qg = gd(e.firstChild), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !0, n = Zv(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
						}
						else {
							if (Hr(), r === i) {
								t = Ns(e, t, n);
								break a;
							}
							cs(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return vs(e, t), e === null ? (n = kd(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : $g || (n = t.type, e = t.pendingProps, r = ce($f.current), r = Ru(r).createElement(n), r[Wp] = t, r[Gp] = e, wu(r, n, e), Xe(r), t.stateNode = r) : t.memoizedState = kd(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return ue(t), e === null && $g && (r = ce($f.current), i = D(), r = t.stateNode = wd(t.type, t.pendingProps, r, i, !1), e_ || (i = Pu(r, t.type, t.pendingProps, i), i !== null && (Fr(t, 0).serverProps = i)), Zg = t, r_ = !0, i = Qg, Qu(t.type) ? (nC = i, Qg = gd(r.firstChild)) : Qg = i), cs(e, t, t.pendingProps.children, n), vs(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && $g && (a = D(), r = Ut(t.type, a.ancestorInfo), i = Qg, (o = !i) || (o = ud(i, t.type, t.pendingProps, r_), o === null ? a = !1 : (t.stateNode = o, e_ || (a = Pu(o, t.type, t.pendingProps, a), a !== null && (Fr(t, 0).serverProps = a)), Zg = t, Qg = gd(o.firstChild), r_ = !1, a = !0), o = !a), o && (r && Lr(t, i), Rr(t))), ue(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Vu(i, a) ? r = null : o !== null && Vu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = ya(e, t, Sa, null, null, n), bC._currentValue = i), vs(e, t), cs(e, t, r, n), t.child;
				case 6: return e === null && $g && (n = t.pendingProps, e = D(), r = e.ancestorInfo.current, n = r == null || Wt(n, r.tag, e.ancestorInfo.implicitRootScope), e = Qg, (r = !e) || (r = dd(e, t.pendingProps, r_), r === null ? r = !1 : (t.stateNode = r, Zg = t, Qg = null, r = !0), r = !r), r && (n && Lr(t, e), Rr(t))), null;
				case 13: return Es(e, t, n);
				case 4: return le(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Xv(t, null, r, n) : cs(e, t, r, n), t.child;
				case 11: return ls(e, t, t.type, t.pendingProps, n);
				case 7: return cs(e, t, t.pendingProps, n), t.child;
				case 8: return cs(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, cs(e, t, t.pendingProps.children, n), t.child;
				case 10: return r = t.type, i = t.pendingProps, a = i.value, "value" in i || hb || (hb = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), qr(t, r, a), cs(e, t, i.children, n), t.child;
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), $r(t), i = ei(i), r = bv(r, i, void 0), t.flags |= 1, cs(e, t, r, n), t.child;
				case 14: return us(e, t, t.type, t.pendingProps, n);
				case 15: return ds(e, t, t.type, t.pendingProps, n);
				case 19: return Ms(e, t, n);
				case 31: return _s(e, t, n);
				case 22: return fs(e, t, n, t.pendingProps);
				case 24: return $r(t), r = ei(m_), e === null ? (i = Oi(), i === null && (i = Wb, a = ri(), i.pooledCache = a, ii(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, Yi(t), qr(t, m_, i)) : ((e.lanes & n) !== 0 && (Xi(e, t), na(t, null, null, n), ta()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, qr(t, m_, r), r !== i.cache && Xr(t, [m_], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), qr(t, m_, r))), cs(e, t, t.pendingProps.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Ls(e) {
			e.flags |= 4;
		}
		function Rs(e, t, n, r, i) {
			if ((t = (e.mode & zg) !== G) && (t = !1), t) {
				if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
				else if (ul()) e.flags |= 8192;
				else throw Vv = Bv, Rv;
			} else e.flags &= -16777217;
		}
		function zs(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & sC) !== rC) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Ud(t)) if (ul()) e.flags |= 8192;
			else throw Vv = Bv, Rv;
		}
		function Bs(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Fe(), e.lanes |= t, fx |= t);
		}
		function Vs(e, t) {
			if (!$g) switch (e.tailMode) {
				case "hidden":
					t = e.tail;
					for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
					n === null ? e.tail = null : n.sibling = null;
					break;
				case "collapsed":
					n = e.tail;
					for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
					r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
			}
		}
		function Hs(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) if ((e.mode & K) !== G) {
				for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 65011712, r |= a.flags & 65011712, i += a.treeBaseDuration, a = a.sibling;
				e.treeBaseDuration = i;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
			else if ((e.mode & K) !== G) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function Us(e, t, n) {
			var r = t.pendingProps;
			switch (jr(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return Hs(t), null;
				case 1: return Hs(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Jr(m_, t), E(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Vr(t) ? (Gr(), Ls(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ur())), Hs(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (Ls(t), a === null ? (Hs(t), Rs(t, i, null, r, n)) : (Hs(t), zs(t, a))) : a ? a === e.memoizedState ? (Hs(t), t.flags &= -16777217) : (Ls(t), Hs(t), zs(t, a)) : (e = e.memoizedProps, e !== r && Ls(t), Hs(t), Rs(t, i, e, r, n)), null;
				case 27:
					if (de(t), n = ce($f.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ls(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Hs(t), null;
						}
						e = D(), Vr(t) ? zr(t, e) : (e = wd(i, r, n, e, !0), t.stateNode = e, Ls(t));
					}
					return Hs(t), null;
				case 5:
					if (de(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ls(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Hs(t), null;
						}
						var o = D();
						if (Vr(t)) zr(t, o);
						else {
							switch (a = ce($f.current), Ut(i, o.ancestorInfo), o = o.context, a = Ru(a), o) {
								case WS:
									a = a.createElementNS(Pm, i);
									break;
								case GS:
									a = a.createElementNS(Nm, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Pm, i);
										break;
									case "math":
										a = a.createElementNS(Nm, i);
										break;
									case "script":
										a = a.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || hp.call(JS, i) || (JS[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[Wp] = t, a[Gp] = r;
							a: for (o = t.child; o !== null;) {
								if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
								else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
									o.child.return = o, o = o.child;
									continue;
								}
								if (o === t) break a;
								for (; o.sibling === null;) {
									if (o.return === null || o.return === t) break a;
									o = o.return;
								}
								o.sibling.return = o.return, o = o.sibling;
							}
							t.stateNode = a;
							a: switch (wu(a, i, r), i) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									r = !!r.autoFocus;
									break a;
								case "img":
									r = !0;
									break a;
								default: r = !1;
							}
							r && Ls(t);
						}
					}
					return Hs(t), Rs(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && Ls(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = ce($f.current), n = D(), Vr(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !e_, r = null, a = Zg, a !== null) switch (a.tag) {
								case 3:
									i && (i = vd(e, n, r), i !== null && (Fr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = vd(e, n, r), i !== null && (Fr(t, 0).serverProps = i));
							}
							e[Wp] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || xu(e.nodeValue, n)), e || Rr(t, !0);
						} else i = n.ancestorInfo.current, i != null && Wt(r, i.tag, n.ancestorInfo.implicitRootScope), e = Ru(e).createTextNode(r), e[Wp] = t, t.stateNode = e;
					}
					return Hs(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = Vr(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Wp] = t, Hs(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else Gr(), Hr(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, Hs(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = Ur(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (pa(t), t) : (pa(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return Hs(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = Vr(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Wp] = t, Hs(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else Gr(), Hr(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, Hs(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = Ur(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (pa(t), t) : (pa(t), null);
					}
					return pa(t), t.flags & 128 ? (t.lanes = n, (t.mode & K) !== G && wi(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Bs(t, t.updateQueue), Hs(t), (t.mode & K) !== G && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return E(t), e === null && cu(t.stateNode.containerInfo), Hs(t), null;
				case 10: return Jr(t.type, t), Hs(t), null;
				case 19:
					if (se(fy, t), r = t.memoizedState, r === null) return Hs(t), null;
					if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) Vs(r, !1);
					else {
						if (sx !== Ib || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (a = ma(e), a !== null) {
								for (t.flags |= 128, Vs(r, !1), e = a.updateQueue, t.updateQueue = e, Bs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) br(n, e), n = n.sibling;
								return T(fy, fy.current & uy | dy, t), $g && Or(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && bp() > yx && (t.flags |= 128, i = !0, Vs(r, !1), t.lanes = 4194304);
					}
					else {
						if (!i) if (e = ma(a), e !== null) {
							if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Bs(t, e), Vs(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !$g) return Hs(t), null;
						} else 2 * bp() - r.renderingStartTime > yx && n !== 536870912 && (t.flags |= 128, i = !0, Vs(r, !1), t.lanes = 4194304);
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					return r.tail === null ? (Hs(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = bp(), e.sibling = null, n = fy.current, n = i ? n & uy | dy : n & uy, T(fy, n, t), $g && Or(t, r.treeForkCount), e);
				case 22:
				case 23: return pa(t), ca(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Hs(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Hs(t), n = t.updateQueue, n !== null && Bs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && se(cv, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Jr(m_, t), Hs(t), null;
				case 25: return null;
				case 30: return null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Ws(e, t) {
			switch (jr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && wi(t), t) : null;
				case 3: return Jr(m_, t), E(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return de(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (pa(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Hr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && wi(t), t) : null;
				case 13:
					if (pa(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Hr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && wi(t), t) : null;
				case 19: return se(fy, t), null;
				case 4: return E(t), null;
				case 10: return Jr(t.type, t), null;
				case 22:
				case 23: return pa(t), ca(t), e !== null && se(cv, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && wi(t), t) : null;
				case 24: return Jr(m_, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function Gs(e, t) {
			switch (jr(t), t.tag) {
				case 3:
					Jr(m_, t), E(t);
					break;
				case 26:
				case 27:
				case 5:
					de(t);
					break;
				case 4:
					E(t);
					break;
				case 31:
					t.memoizedState !== null && pa(t);
					break;
				case 13:
					pa(t);
					break;
				case 19:
					se(fy, t);
					break;
				case 10:
					Jr(t.type, t);
					break;
				case 22:
				case 23:
					pa(t), ca(t), e !== null && se(cv, t);
					break;
				case 24: Jr(m_, t);
			}
		}
		function Ks(e) {
			return (e.mode & K) !== G;
		}
		function qs(e, t) {
			Ks(e) ? (Ci(), Ys(t, e), xi()) : Ys(t, e);
		}
		function Js(e, t, n) {
			Ks(e) ? (Ci(), Xs(n, e, t), xi()) : Xs(n, e, t);
		}
		function Ys(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & hy) !== py && ($x = !0), r = O(t, Mv, n), (e & hy) !== py && ($x = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & gy) === 0 ? (n.tag & hy) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, O(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				Pl(t, t.return, e);
			}
		}
		function Xs(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & hy) !== py && ($x = !0), i = t, O(i, Pv, i, n, s), (e & hy) !== py && ($x = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Pl(t, t.return, e);
			}
		}
		function Zs(e, t) {
			Ks(e) ? (Ci(), Ys(t, e), xi()) : Ys(t, e);
		}
		function Qs(e, t, n) {
			Ks(e) ? (Ci(), Xs(n, e, t), xi()) : Xs(n, e, t);
		}
		function $s(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || db || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(e) || "instance"));
				try {
					O(e, aa, t, n);
				} catch (t) {
					Pl(e, e.return, t);
				}
			}
		}
		function ec(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function tc(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || db || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(e) || "instance"));
			try {
				var i = Qo(e.type, n), a = O(e, ec, t, i, r);
				n = gb, a !== void 0 || n.has(e.type) || (n.add(e.type), O(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", w(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Pl(e, e.return, t);
			}
		}
		function nc(e, t, n) {
			n.props = Qo(e.type, e.memoizedProps), n.state = e.memoizedState, Ks(e) ? (Ci(), O(e, Av, e, t, n), xi()) : O(e, Av, e, t, n);
		}
		function rc(e) {
			var t = e.ref;
			if (t !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var n = e.stateNode;
						break;
					case 30:
						n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") if (Ks(e)) try {
					Ci(), e.refCleanup = t(n);
				} finally {
					xi();
				}
				else e.refCleanup = t(n);
				else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", w(e)), t.current = n;
			}
		}
		function ic(e, t) {
			try {
				O(e, rc, e);
			} catch (n) {
				Pl(e, t, n);
			}
		}
		function ac(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) if (typeof r == "function") try {
				if (Ks(e)) try {
					Ci(), O(e, r);
				} finally {
					xi(e);
				}
				else O(e, r);
			} catch (n) {
				Pl(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				if (Ks(e)) try {
					Ci(), O(e, n, null);
				} finally {
					xi(e);
				}
				else O(e, n, null);
			} catch (n) {
				Pl(e, t, n);
			}
			else n.current = null;
		}
		function oc(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function sc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function cc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				O(e, Ku, r, t, n, e);
			} catch (t) {
				Pl(e, e.return, t);
			}
		}
		function lc(e, t, n) {
			try {
				O(e, Ju, e.stateNode, e.type, n, t, e);
			} catch (t) {
				Pl(e, e.return, t);
			}
		}
		function uc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Qu(e.type) || e.tag === 4;
		}
		function dc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || uc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && Qu(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function fc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? (Zu(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t)) : (Zu(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = nn));
			else if (r !== 4 && (r === 27 && Qu(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (fc(e, t, n), e = e.sibling; e !== null;) fc(e, t, n), e = e.sibling;
		}
		function pc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
			else if (r !== 4 && (r === 27 && Qu(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (pc(e, t, n), e = e.sibling; e !== null;) pc(e, t, n), e = e.sibling;
		}
		function mc(e) {
			for (var t, n = e.return; n !== null;) {
				if (uc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, n = dc(e), pc(e, n, t);
					break;
				case 5:
					n = t.stateNode, t.flags & 32 && (Yu(n), t.flags &= -33), t = dc(e), pc(e, t, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, n = dc(e), fc(e, n, t);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function hc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				O(e, Td, e.type, n, t, e);
			} catch (t) {
				Pl(e, e.return, t);
			}
		}
		function gc(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && (t.flags & 256) == 0;
		}
		function _c(e, t) {
			if (e = e.containerInfo, KS = LC, e = In(e), Ln(e)) {
				if ("selectionStart" in e) var n = {
					start: e.selectionStart,
					end: e.selectionEnd
				};
				else a: {
					n = (n = e.ownerDocument) && n.defaultView || window;
					var r = n.getSelection && n.getSelection();
					if (r && r.rangeCount !== 0) {
						n = r.anchorNode;
						var i = r.anchorOffset, a = r.focusNode;
						r = r.focusOffset;
						try {
							n.nodeType, a.nodeType;
						} catch {
							n = null;
							break a;
						}
						var o = 0, s = -1, c = -1, l = 0, u = 0, d = e, f = null;
						b: for (;;) {
							for (var p; d !== n || i !== 0 && d.nodeType !== 3 || (s = o + i), d !== a || r !== 0 && d.nodeType !== 3 || (c = o + r), d.nodeType === 3 && (o += d.nodeValue.length), (p = d.firstChild) !== null;) f = d, d = p;
							for (;;) {
								if (d === e) break b;
								if (f === n && ++l === i && (s = o), f === a && ++u === r && (c = o), (p = d.nextSibling) !== null) break;
								d = f, f = d.parentNode;
							}
							d = p;
						}
						n = s === -1 || c === -1 ? null : {
							start: s,
							end: c
						};
					} else n = null;
				}
				n ||= {
					start: 0,
					end: 0
				};
			} else n = null;
			for (qS = {
				focusedElem: e,
				selectionRange: n
			}, LC = !1, xb = t; xb !== null;) if (t = xb, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, xb = e;
			else for (; xb !== null;) {
				switch (e = t = xb, n = e.alternate, i = e.flags, e.tag) {
					case 0:
						if (i & 4 && (e = e.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
						break;
					case 11:
					case 15: break;
					case 1:
						i & 1024 && n !== null && tc(e, n);
						break;
					case 3:
						if (i & 1024) {
							if (e = e.stateNode.containerInfo, n = e.nodeType, n === 9) ld(e);
							else if (n === 1) switch (e.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									ld(e);
									break;
								default: e.textContent = "";
							}
						}
						break;
					case 5:
					case 26:
					case 27:
					case 6:
					case 4:
					case 17: break;
					default: if (i & 1024) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
				}
				if (e = t.sibling, e !== null) {
					e.return = t.return, xb = e;
					break;
				}
				xb = t.return;
			}
		}
		function vc(e, t, n) {
			var r = fi(), i = mi(), a = gi(), o = _i(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Ac(e, n), s & 4 && qs(n, gy | my);
					break;
				case 1:
					if (Ac(e, n), s & 4) if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(n) || "instance")), Ks(n) ? (Ci(), O(n, wv, n, e), xi()) : O(n, wv, n, e);
					else {
						var c = Qo(n.type, t.memoizedProps);
						t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(n) || "instance")), Ks(n) ? (Ci(), O(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), xi()) : O(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
					}
					s & 64 && $s(n), s & 512 && ic(n, n.return);
					break;
				case 3:
					if (t = ci(), Ac(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							O(n, aa, s, c);
						} catch (e) {
							Pl(n, n.return, e);
						}
					}
					e.effectDuration += li(t);
					break;
				case 27: t === null && s & 4 && hc(n);
				case 26:
				case 5:
					if (Ac(e, n), t === null) {
						if (s & 4) cc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								O(n, qu, c, e, t, n);
							} catch (e) {
								Pl(n, n.return, e);
							}
						}
					}
					s & 512 && ic(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = ci(), Ac(e, n), e = n.stateNode, e.effectDuration += ui(s);
						try {
							O(n, oc, n, t, b_, e.effectDuration);
						} catch (e) {
							Pl(n, n.return, e);
						}
					} else Ac(e, n);
					break;
				case 31:
					Ac(e, n), s & 4 && Sc(e, n);
					break;
				case 13:
					Ac(e, n), s & 4 && Cc(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = Rl.bind(null, n), hd(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || _b, !s) {
						t = t !== null && t.memoizedState !== null || vb, c = _b;
						var l = vb;
						_b = s, (vb = t) && !l ? (Pc(e, n, (n.subtreeFlags & 8772) != 0), (n.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Jn(n, q, J)) : Ac(e, n), _b = c, vb = l;
					}
					break;
				case 30: break;
				default: Ac(e, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && ((D_ || .05 < T_) && Zn(n, q, J, T_, E_), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < J - q && (gc(n.return.alternate, n.return) || qn(n, q, J, "Mount"))), pi(r), hi(i), E_ = a, D_ = o;
		}
		function yc(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, yc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ge(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function bc(e, t, n) {
			for (n = n.child; n !== null;) xc(e, t, n), n = n.sibling;
		}
		function xc(e, t, n) {
			if (Ap && typeof Ap.onCommitFiberUnmount == "function") try {
				Ap.onCommitFiberUnmount(kp, n);
			} catch (e) {
				jp || (jp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = fi(), i = mi(), a = gi(), o = _i();
			switch (n.tag) {
				case 26:
					vb || ac(n, t), bc(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					vb || ac(n, t);
					var s = wb, c = Tb;
					Qu(n.type) && (wb = n.stateNode, Tb = !1), bc(e, t, n), O(n, Ed, n.stateNode), wb = s, Tb = c;
					break;
				case 5: vb || ac(n, t);
				case 6:
					if (s = wb, c = Tb, wb = null, bc(e, t, n), wb = s, Tb = c, wb !== null) if (Tb) try {
						O(n, ed, wb, n.stateNode);
					} catch (e) {
						Pl(n, t, e);
					}
					else try {
						O(n, $u, wb, n.stateNode);
					} catch (e) {
						Pl(n, t, e);
					}
					break;
				case 18:
					wb !== null && (Tb ? (e = wb, td(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), bf(e)) : td(wb, n.stateNode));
					break;
				case 4:
					s = wb, c = Tb, wb = n.stateNode.containerInfo, Tb = !0, bc(e, t, n), wb = s, Tb = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					Xs(hy, n, t), vb || Js(n, t, gy), bc(e, t, n);
					break;
				case 1:
					vb || (ac(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && nc(n, t, s)), bc(e, t, n);
					break;
				case 21:
					bc(e, t, n);
					break;
				case 22:
					vb = (s = vb) || n.memoizedState !== null, bc(e, t, n), vb = s;
					break;
				default: bc(e, t, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(n, q, J, T_, E_), pi(r), hi(i), E_ = a, D_ = o;
		}
		function Sc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					O(t, Sd, e);
				} catch (e) {
					Pl(t, t.return, e);
				}
			}
		}
		function Cc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				O(t, Cd, e);
			} catch (e) {
				Pl(t, t.return, e);
			}
		}
		function wc(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new bb()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new bb()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function Tc(e, t) {
			var n = wc(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), Mp) if (Sb !== null && Cb !== null) Wl(Cb, Sb);
					else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					var r = zl.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function Ec(e, t) {
			var n = t.deletions;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e, a = t, o = n[r], s = fi(), c = a;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 27:
							if (Qu(c.type)) {
								wb = c.stateNode, Tb = !1;
								break a;
							}
							break;
						case 5:
							wb = c.stateNode, Tb = !1;
							break a;
						case 3:
						case 4:
							wb = c.stateNode.containerInfo, Tb = !0;
							break a;
					}
					c = c.return;
				}
				if (wb === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				xc(i, a, o), wb = null, Tb = !1, (o.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(o, q, J, "Unmount"), pi(s), i = o, a = i.alternate, a !== null && (a.return = null), i.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Dc(t, e), t = t.sibling;
		}
		function Dc(e, t) {
			var n = fi(), r = mi(), i = gi(), a = _i(), o = e.alternate, s = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Ec(t, e), Oc(e), s & 4 && (Xs(hy | my, e, e.return), Ys(hy | my, e), Js(e, e.return, gy | my));
					break;
				case 1:
					if (Ec(t, e), Oc(e), s & 512 && (vb || o === null || ac(o, o.return)), s & 64 && _b && (s = e.updateQueue, s !== null && (o = s.callbacks, o !== null))) {
						var c = s.shared.hiddenCallbacks;
						s.shared.hiddenCallbacks = c === null ? o : c.concat(o);
					}
					break;
				case 26:
					if (c = Eb, Ec(t, e), Oc(e), s & 512 && (vb || o === null || ac(o, o.return)), s & 4) {
						var l = o === null ? null : o.memoizedState;
						if (s = e.memoizedState, o === null) if (s === null) if (e.stateNode === null) {
							a: {
								s = e.type, o = e.memoizedProps, c = c.ownerDocument || c;
								b: switch (s) {
									case "title":
										l = c.getElementsByTagName("title")[0], (!l || l[Zp] || l[Wp] || l.namespaceURI === Pm || l.hasAttribute("itemprop")) && (l = c.createElement(s), c.head.insertBefore(l, c.querySelector("head > title"))), wu(l, s, o), l[Wp] = e, Xe(l), s = l;
										break a;
									case "link":
										var u = Bd("link", "href", c).get(s + (o.href || ""));
										if (u) {
											for (var d = 0; d < u.length; d++) if (l = u[d], l.getAttribute("href") === (o.href == null || o.href === "" ? null : o.href) && l.getAttribute("rel") === (o.rel == null ? null : o.rel) && l.getAttribute("title") === (o.title == null ? null : o.title) && l.getAttribute("crossorigin") === (o.crossOrigin == null ? null : o.crossOrigin)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), wu(l, s, o), c.head.appendChild(l);
										break;
									case "meta":
										if (u = Bd("meta", "content", c).get(s + (o.content || ""))) {
											for (d = 0; d < u.length; d++) if (l = u[d], k(o.content, "content"), l.getAttribute("content") === (o.content == null ? null : "" + o.content) && l.getAttribute("name") === (o.name == null ? null : o.name) && l.getAttribute("property") === (o.property == null ? null : o.property) && l.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && l.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), wu(l, s, o), c.head.appendChild(l);
										break;
									default: throw Error("getNodesForType encountered a type it did not expect: \"" + s + "\". This is a bug in React.");
								}
								l[Wp] = e, Xe(l), s = l;
							}
							e.stateNode = s;
						} else Vd(c, e.type, e.stateNode);
						else e.stateNode = Id(c, s, e.memoizedProps);
						else l === s ? s === null && e.stateNode !== null && lc(e, e.memoizedProps, o.memoizedProps) : (l === null ? o.stateNode !== null && (o = o.stateNode, o.parentNode.removeChild(o)) : l.count--, s === null ? Vd(c, e.type, e.stateNode) : Id(c, s, e.memoizedProps));
					}
					break;
				case 27:
					Ec(t, e), Oc(e), s & 512 && (vb || o === null || ac(o, o.return)), o !== null && s & 4 && lc(e, e.memoizedProps, o.memoizedProps);
					break;
				case 5:
					if (Ec(t, e), Oc(e), s & 512 && (vb || o === null || ac(o, o.return)), e.flags & 32) {
						c = e.stateNode;
						try {
							O(e, Yu, c);
						} catch (t) {
							Pl(e, e.return, t);
						}
					}
					s & 4 && e.stateNode != null && (c = e.memoizedProps, lc(e, c, o === null ? c : o.memoizedProps)), s & 1024 && (yb = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (Ec(t, e), Oc(e), s & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						s = e.memoizedProps, o = o === null ? s : o.memoizedProps, c = e.stateNode;
						try {
							O(e, Xu, c, o, s);
						} catch (t) {
							Pl(e, e.return, t);
						}
					}
					break;
				case 3:
					if (c = ci(), fC = null, l = Eb, Eb = Dd(t.containerInfo), Ec(t, e), Eb = l, Oc(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
						O(e, xd, t.containerInfo);
					} catch (t) {
						Pl(e, e.return, t);
					}
					yb && (yb = !1, kc(e)), t.effectDuration += li(c);
					break;
				case 4:
					s = Eb, Eb = Dd(e.stateNode.containerInfo), Ec(t, e), Oc(e), Eb = s;
					break;
				case 12:
					s = ci(), Ec(t, e), Oc(e), e.stateNode.effectDuration += ui(s);
					break;
				case 31:
					Ec(t, e), Oc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Tc(e, s)));
					break;
				case 13:
					Ec(t, e), Oc(e), e.child.flags & 8192 && e.memoizedState !== null != (o !== null && o.memoizedState !== null) && (gx = bp()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Tc(e, s)));
					break;
				case 22:
					c = e.memoizedState !== null;
					var f = o !== null && o.memoizedState !== null, p = _b, m = vb;
					if (_b = p || c, vb = m || f, Ec(t, e), vb = m, _b = p, f && !c && !p && !m && (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Jn(e, q, J), Oc(e), s & 8192) a: for (t = e.stateNode, t._visibility = c ? t._visibility & ~Og : t._visibility | Og, !c || o === null || f || _b || vb || (Mc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(e, q, J, "Disconnect")), o = null, t = e;;) {
						if (t.tag === 5 || t.tag === 26) {
							if (o === null) {
								f = o = t;
								try {
									l = f.stateNode, c ? O(f, id, l) : O(f, sd, f.stateNode, f.memoizedProps);
								} catch (e) {
									Pl(f, f.return, e);
								}
							}
						} else if (t.tag === 6) {
							if (o === null) {
								f = t;
								try {
									u = f.stateNode, c ? O(f, ad, u) : O(f, cd, u, f.memoizedProps);
								} catch (e) {
									Pl(f, f.return, e);
								}
							}
						} else if (t.tag === 18) {
							if (o === null) {
								f = t;
								try {
									d = f.stateNode, c ? O(f, rd, d) : O(f, od, f.stateNode);
								} catch (e) {
									Pl(f, f.return, e);
								}
							}
						} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
							t.child.return = t, t = t.child;
							continue;
						}
						if (t === e) break a;
						for (; t.sibling === null;) {
							if (t.return === null || t.return === e) break a;
							o === t && (o = null), t = t.return;
						}
						o === t && (o = null), t.sibling.return = t.return, t = t.sibling;
					}
					s & 4 && (s = e.updateQueue, s !== null && (o = s.retryQueue, o !== null && (s.retryQueue = null, Tc(e, o))));
					break;
				case 19:
					Ec(t, e), Oc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Tc(e, s)));
					break;
				case 30: break;
				case 21: break;
				default: Ec(t, e), Oc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && ((D_ || .05 < T_) && Zn(e, q, J, T_, E_), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < J - q && (gc(e.return.alternate, e.return) || qn(e, q, J, "Mount"))), pi(n), hi(r), E_ = i, D_ = a;
		}
		function Oc(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					O(e, mc, e);
				} catch (t) {
					Pl(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function kc(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				kc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
			}
		}
		function Ac(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) vc(e, t.alternate, t), t = t.sibling;
		}
		function jc(e) {
			var t = fi(), n = mi(), r = gi(), i = _i();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Js(e, e.return, gy), Mc(e);
					break;
				case 1:
					ac(e, e.return);
					var a = e.stateNode;
					typeof a.componentWillUnmount == "function" && nc(e, e.return, a), Mc(e);
					break;
				case 27: O(e, Ed, e.stateNode);
				case 26:
				case 5:
					ac(e, e.return), Mc(e);
					break;
				case 22:
					e.memoizedState === null && Mc(e);
					break;
				case 30:
					Mc(e);
					break;
				default: Mc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(e, q, J, T_, E_), pi(t), hi(n), E_ = r, D_ = i;
		}
		function Mc(e) {
			for (e = e.child; e !== null;) jc(e), e = e.sibling;
		}
		function Nc(e, t, n, r) {
			var i = fi(), a = mi(), o = gi(), s = _i(), c = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Pc(e, n, r), qs(n, gy);
					break;
				case 1:
					if (Pc(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && O(n, wv, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							O(n, ia, t, e);
						} catch (e) {
							Pl(n, n.return, e);
						}
					}
					r && c & 64 && $s(n), ic(n, n.return);
					break;
				case 27: hc(n);
				case 26:
				case 5:
					Pc(e, n, r), r && t === null && c & 4 && cc(n), ic(n, n.return);
					break;
				case 12:
					if (r && c & 4) {
						c = ci(), Pc(e, n, r), r = n.stateNode, r.effectDuration += ui(c);
						try {
							O(n, oc, n, t, b_, r.effectDuration);
						} catch (e) {
							Pl(n, n.return, e);
						}
					} else Pc(e, n, r);
					break;
				case 31:
					Pc(e, n, r), r && c & 4 && Sc(e, n);
					break;
				case 13:
					Pc(e, n, r), r && c & 4 && Cc(e, n);
					break;
				case 22:
					n.memoizedState === null && Pc(e, n, r), ic(n, n.return);
					break;
				case 30: break;
				default: Pc(e, n, r);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(n, q, J, T_, E_), pi(i), hi(a), E_ = o, D_ = s;
		}
		function Pc(e, t, n) {
			for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) Nc(e, t.alternate, t, n), t = t.sibling;
		}
		function Fc(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && ii(e), n != null && ai(n));
		}
		function Ic(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (ii(t), e != null && ai(e));
		}
		function Lc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) {
				var a = t.sibling;
				Rc(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			}
		}
		function Rc(e, t, n, r, i) {
			var a = fi(), o = mi(), s = gi(), c = _i(), l = Sg, u = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && Yn(t, t.actualStartTime, i, Db, n), Lc(e, t, n, r, i), u & 2048 && Zs(t, _y | my);
					break;
				case 1:
					(t.mode & K) !== G && 0 < t.actualStartTime && (t.flags & 128 ? Xn(t, t.actualStartTime, i, []) : t.flags & 1 && Yn(t, t.actualStartTime, i, Db, n)), Lc(e, t, n, r, i);
					break;
				case 3:
					var d = ci(), f = Db;
					Db = t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) == 0, Lc(e, t, n, r, i), Db = f, u & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (ii(r), n != null && ai(n))), e.passiveEffectDuration += li(d);
					break;
				case 12:
					if (u & 2048) {
						u = ci(), Lc(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += ui(u);
						try {
							O(t, sc, t, t.alternate, b_, e.passiveEffectDuration);
						} catch (e) {
							Pl(t, t.return, e);
						}
					} else Lc(e, t, n, r, i);
					break;
				case 31:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d !== null && f === null ? (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && Xn(t, t.actualStartTime, i, d)) : Db = !0) : Db = !1, Lc(e, t, n, r, i), Db = u;
					break;
				case 13:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d === null || d.dehydrated === null || f !== null && f.dehydrated !== null ? Db = !1 : (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && Xn(t, t.actualStartTime, i, d)) : Db = !0), Lc(e, t, n, r, i), Db = u;
					break;
				case 23: break;
				case 22:
					f = t.stateNode, d = t.alternate, t.memoizedState === null ? f._visibility & kg ? Lc(e, t, n, r, i) : (f._visibility |= kg, zc(e, t, n, r, (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & K) === G || Db || (e = t.actualStartTime, 0 <= e && .05 < i - e && Jn(t, e, i), 0 <= q && 0 <= J && .05 < J - q && Jn(t, q, J))) : f._visibility & kg ? Lc(e, t, n, r, i) : Vc(e, t, n, r, i), u & 2048 && Fc(d, t);
					break;
				case 24:
					Lc(e, t, n, r, i), u & 2048 && Ic(t.alternate, t);
					break;
				default: Lc(e, t, n, r, i);
			}
			(t.mode & K) !== G && ((e = !Db && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && qn(t, n, i, "Mount")), 0 <= q && 0 <= J && ((D_ || .05 < T_) && Zn(t, q, J, T_, E_), e && .05 < J - q && qn(t, q, J, "Mount"))), pi(a), hi(o), E_ = s, D_ = c, Sg = l;
		}
		function zc(e, t, n, r, i, a) {
			for (i &&= (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Bc(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Bc(e, t, n, r, i, a) {
			var o = fi(), s = mi(), c = gi(), l = _i(), u = Sg;
			i && (t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && Yn(t, t.actualStartTime, a, Db, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					zc(e, t, n, r, i, a), Zs(t, _y);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= kg, zc(e, t, n, r, i, a)) : f._visibility & kg ? zc(e, t, n, r, i, a) : Vc(e, t, n, r, a), i && d & 2048 && Fc(t.alternate, t);
					break;
				case 24:
					zc(e, t, n, r, i, a), i && d & 2048 && Ic(t.alternate, t);
					break;
				default: zc(e, t, n, r, i, a);
			}
			(t.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(t, q, J, T_, E_), pi(o), hi(s), E_ = c, D_ = l, Sg = u;
		}
		function Vc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Sg;
				(a.mode & K) !== G && 0 < a.actualStartTime && a.flags & 1 && Yn(a, a.actualStartTime, l, Db, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						Vc(o, a, s, c, l), d & 2048 && Fc(a.alternate, a);
						break;
					case 24:
						Vc(o, a, s, c, l), d & 2048 && Ic(a.alternate, a);
						break;
					default: Vc(o, a, s, c, l);
				}
				Sg = u, a = t;
			}
		}
		function Hc(e, t, n) {
			if (e.subtreeFlags & Ob) for (e = e.child; e !== null;) Uc(e, t, n), e = e.sibling;
		}
		function Uc(e, t, n) {
			switch (e.tag) {
				case 26:
					Hc(e, t, n), e.flags & Ob && e.memoizedState !== null && Wd(n, Eb, e.memoizedState, e.memoizedProps);
					break;
				case 5:
					Hc(e, t, n);
					break;
				case 3:
				case 4:
					var r = Eb;
					Eb = Dd(e.stateNode.containerInfo), Hc(e, t, n), Eb = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ob, Ob = 16777216, Hc(e, t, n), Ob = r) : Hc(e, t, n));
					break;
				default: Hc(e, t, n);
			}
		}
		function Wc(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Gc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = fi();
					xb = r, Yc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(r, q, J, "Unmount"), pi(i);
				}
				Wc(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Kc(e), e = e.sibling;
		}
		function Kc(e) {
			var t = fi(), n = mi(), r = gi(), i = _i();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Gc(e), e.flags & 2048 && Qs(e, e.return, _y | my);
					break;
				case 3:
					var a = ci();
					Gc(e), e.stateNode.passiveEffectDuration += li(a);
					break;
				case 12:
					a = ci(), Gc(e), e.stateNode.passiveEffectDuration += ui(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & kg && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~kg, qc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(e, q, J, "Disconnect")) : Gc(e);
					break;
				default: Gc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(e, q, J, T_, E_), pi(t), hi(n), D_ = i, E_ = r;
		}
		function qc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = fi();
					xb = r, Yc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(r, q, J, "Unmount"), pi(i);
				}
				Wc(e);
			}
			for (e = e.child; e !== null;) Jc(e), e = e.sibling;
		}
		function Jc(e) {
			var t = fi(), n = mi(), r = gi(), i = _i();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Qs(e, e.return, _y), qc(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & kg && (a._visibility &= ~kg, qc(e));
					break;
				default: qc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(e, q, J, T_, E_), pi(t), hi(n), D_ = i, E_ = r;
		}
		function Yc(e, t) {
			for (; xb !== null;) {
				var n = xb, r = n, i = t, a = fi(), o = mi(), s = gi(), c = _i();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						Qs(r, i, _y);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && ii(i));
						break;
					case 24: ai(r.memoizedState.cache);
				}
				if ((r.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(r, q, J, T_, E_), pi(a), hi(o), D_ = c, E_ = s, r = n.child, r !== null) r.return = n, xb = r;
				else a: for (n = e; xb !== null;) {
					if (r = xb, a = r.sibling, o = r.return, yc(r), r === n) {
						xb = null;
						break a;
					}
					if (a !== null) {
						a.return = o, xb = a;
						break a;
					}
					xb = o;
				}
			}
		}
		function Xc() {
			jb.forEach(function(e) {
				return e();
			});
		}
		function Zc() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || U.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function Qc(e) {
			if ((Ub & Pb) !== Nb && $ !== 0) return $ & -$;
			var t = U.T;
			return t === null ? Ue() : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), tu());
		}
		function $c() {
			if (dx === 0) if (!($ & 536870912) || $g) {
				var e = Lp;
				Lp <<= 1, !(Lp & 3932160) && (Lp = 262144), dx = e;
			} else dx = 536870912;
			return e = cy.current, e !== null && (e.flags |= 32), dx;
		}
		function el(e, t, n) {
			if ($x && console.error("useInsertionEffect must not schedule updates."), Jx && (Yx = !0), (e === Wb && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) && (cl(e, 0), il(e, $, dx, !1)), j(e, n), (Ub & Pb) !== Nb && e === Wb) {
				if (mp) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && w(Q) || "Unknown", nS.has(e) || (nS.add(e), t = w(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: tS ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else Mp && Be(e, t, n), Kl(t), e === Wb && ((Ub & Pb) === Nb && (lx |= n), sx === Bb && il(e, $, dx, !1)), ql(e);
		}
		function tl(e, t, n) {
			if ((Ub & (Pb | Fb)) !== Nb) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = bp();
				switch ($_) {
					case Jb:
					case qb:
						var a = ev;
						yg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, bg, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, bg, void 0, "primary-light"));
						break;
					case ex:
						a = ev, yg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, bg, void 0, "primary-light")) : console.timeStamp("Action", a, i, bg, void 0, "primary-light"));
						break;
					default: yg && (r = i - ev, 3 > r || console.timeStamp("Blocked", ev, i, bg, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || A(e, t)) ? _l(e, t) : hl(e, t, !0);
			var o = n;
			do {
				if (a === Ib) {
					ix && !n && il(e, t, 0, !1), t = tx, ev = h_(), $_ = t;
					break;
				} else {
					if (r = bp(), i = e.current.alternate, o && !rl(i)) {
						Kn(t), i = y_, a = r, !yg || a <= i || (Sx ? Sx.run(console.timeStamp.bind(console, "Teared Render", i, a, xg, W, "error")) : console.timeStamp("Teared Render", i, a, xg, W, "error")), sl(t, r), a = hl(e, t, !1), o = !1;
						continue;
					}
					if (a === Rb) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							Kn(t), nr(y_, r, t, Sx), sl(t, r), t = s;
							a: {
								r = e, a = o, o = px;
								var c = r.current.memoizedState.isDehydrated;
								if (c && (cl(r, s).flags |= 256), s = hl(r, s, !1), s !== Rb) {
									if (ax && !c) {
										r.errorRecoveryDisabledLanes |= a, lx |= a, a = Bb;
										break a;
									}
									r = mx, mx = o, r !== null && (mx === null ? mx = r : mx.push.apply(mx, r));
								}
								a = s;
							}
							if (o = !1, a !== Rb) continue;
							r = bp();
						}
					}
					if (a === Lb) {
						Kn(t), nr(y_, r, t, Sx), sl(t, r), cl(e, 0), il(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case Ib:
							case Lb: throw Error("Root did not complete. This is a bug in React.");
							case Bb: if ((t & 4194048) !== t) break;
							case Vb:
								Kn(t), $n(y_, r, t, Sx), sl(t, r), i = t, i & 127 ? L_ = r : i & 4194048 && (J_ = r), il(n, t, dx, !rx);
								break a;
							case Rb:
								mx = null;
								break;
							case zb:
							case Hb: break;
							default: throw Error("Unknown root exit status.");
						}
						if (U.actQueue !== null) Tl(n, i, t, mx, xx, hx, dx, lx, fx, a, null, null, y_, r);
						else {
							if ((t & 62914560) === t && (o = gx + vx - bp(), 10 < o)) {
								if (il(n, t, dx, !rx), Ne(n, 0, !0) !== 0) break a;
								Lx = t, n.timeoutHandle = ZS(nl.bind(null, n, i, mx, xx, hx, t, dx, lx, fx, rx, a, "Throttled", y_, r), o);
								break a;
							}
							nl(n, i, mx, xx, hx, t, dx, lx, fx, rx, a, null, y_, r);
						}
					}
				}
				break;
			} while (1);
			ql(e);
		}
		function nl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.timeoutHandle = $S;
			var m = t.subtreeFlags, h = null;
			if ((m & 8192 || (m & 16785408) == 16785408) && (h = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: nn
			}, Uc(t, a, h), m = (a & 62914560) === a ? gx - bp() : (a & 4194048) === a ? _x - bp() : 0, m = Gd(h, m), m !== null)) {
				Lx = a, e.cancelPendingCommit = m(Tl.bind(null, e, t, a, n, r, i, o, s, c, u, h, h.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < h.count ? 0 < h.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : h.imgCount === 1 ? "Suspended on an Image" : 0 < h.imgCount ? "Suspended on Images" : null, f, p)), il(e, a, o, !l);
				return;
			}
			Tl(e, t, a, n, r, i, o, s, c, u, h, d, f, p);
		}
		function rl(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Hh(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
				if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
				else {
					if (t === e) break;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) return !0;
						t = t.return;
					}
					t.sibling.return = t.return, t = t.sibling;
				}
			}
			return !0;
		}
		function il(e, t, n, r) {
			t &= ~ux, t &= ~lx, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Np(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && N(e, n, t);
		}
		function al() {
			return (Ub & (Pb | Fb)) === Nb ? (z(0, !1), !1) : !0;
		}
		function ol() {
			if (Q !== null) {
				if (tx === Gb) var e = Q.return;
				else e = Q, Kr(), Ta(e), Uv = null, Wv = 0, e = Q;
				for (; e !== null;) Gs(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function sl(e, t) {
			e & 127 && (O_ = t), e & 4194048 && (R_ = t), e & 62914560 && (Y_ = t), e & 2080374784 && (X_ = t);
		}
		function cl(e, t) {
			yg && (console.timeStamp("Blocking Track", .003, .003, "Blocking", W, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", W, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", W, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", W, "primary-light"));
			var n = y_;
			if (y_ = h_(), $ !== 0 && 0 < n) {
				if (Kn($), sx === zb || sx === Bb) $n(n, y_, t, Sx);
				else {
					var r = y_, i = Sx;
					if (yg && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, xg, W, a)) : console.timeStamp(o, n, r, xg, W, a);
					}
				}
				sl($, y_);
			}
			if (n = Sx, Sx = null, t & 127) {
				Sx = A_, i = 0 <= k_ && k_ < O_ ? O_ : k_, r = 0 <= P_ && P_ < O_ ? O_ : P_, a = 0 <= r ? r : 0 <= i ? i : y_, 0 <= L_ ? (Kn(2), er(L_, a, t, n)) : Z_ & 127 && (Kn(2), ar(O_, a, Q_)), n = i;
				var s = r, c = F_, l = 0 < I_, u = j_ === __, d = j_ === v_;
				if (i = y_, r = A_, a = M_, o = N_, yg) {
					if (xg = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, xg, W, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, xg, W, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: xg,
							trackGroup: W,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n));
				}
				k_ = -1.1, j_ = 0, N_ = M_ = null, L_ = -1.1, I_ = P_, P_ = -1.1, O_ = h_();
			}
			if (t & 4194048 && (Sx = H_, i = 0 <= z_ && z_ < R_ ? R_ : z_, n = 0 <= B_ && B_ < R_ ? R_ : B_, r = 0 <= G_ && G_ < R_ ? R_ : G_, a = 0 <= r ? r : 0 <= n ? n : y_, 0 <= J_ ? (Kn(256), er(J_, a, t, Sx)) : Z_ & 4194048 && (Kn(256), ar(R_, a, Q_)), d = r, s = K_, c = 0 < q_, l = V_ === v_, a = y_, r = H_, o = U_, u = W_, yg && (xg = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, xg, W, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, xg, W, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, xg, W, "primary-dark")) : console.timeStamp("Action", i, n, xg, W, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: xg,
					trackGroup: W,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n))), B_ = z_ = -1.1, V_ = 0, J_ = -1.1, q_ = G_, G_ = -1.1, R_ = h_()), t & 62914560 && Z_ & 62914560 && (Kn(4194304), ar(Y_, y_, Q_)), t & 2080374784 && Z_ & 2080374784 && (Kn(268435456), ar(X_, y_, Q_)), n = e.timeoutHandle, n !== $S && (e.timeoutHandle = $S, QS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Lx = 0, ol(), Wb = e, Q = n = yr(e.current, null), $ = t, tx = Gb, nx = null, rx = !1, ix = A(e, t), ax = !1, sx = Ib, fx = dx = ux = lx = cx = 0, mx = px = null, hx = !1, t & 8 && (t |= t & 32), r = e.entangledLanes, r !== 0) for (e = e.entanglements, r &= t; 0 < r;) i = 31 - Np(r), a = 1 << i, t |= e[i], r &= ~a;
			return ox = t, or(), e = cg(), 1e3 < e - og && (U.recentlyCreatedOwnerStacks = 0, og = e), lv.discardPendingWarnings(), n;
		}
		function ll(e, t) {
			X = null, U.H = Ly, U.getCurrentStack = null, mp = !1, pp = null, t === Lv || t === zv ? (t = Fi(), tx = Jb) : t === Rv ? (t = Fi(), tx = Yb) : tx = t === ab ? $b : typeof t == "object" && t && typeof t.then == "function" ? Zb : Kb, nx = t;
			var n = Q;
			n === null ? (sx = Lb, ns(e, Dr(t, e.current))) : n.mode & K && yi(n);
		}
		function ul() {
			var e = cy.current;
			return e === null ? !0 : ($ & 4194048) === $ ? ly === null : ($ & 62914560) === $ || $ & 536870912 ? e === ly : !1;
		}
		function dl() {
			var e = U.H;
			return U.H = Ly, e === null ? Ly : e;
		}
		function fl() {
			var e = U.A;
			return U.A = kb, e;
		}
		function pl(e) {
			Sx === null && (Sx = e._debugTask == null ? null : e._debugTask);
		}
		function ml() {
			sx = Bb, rx || ($ & 4194048) !== $ && cy.current !== null || (ix = !0), !(cx & 134217727) && !(lx & 134217727) || Wb === null || il(Wb, $, dx, !1);
		}
		function hl(e, t, n) {
			var r = Ub;
			Ub |= Pb;
			var i = dl(), a = fl();
			if (Wb !== e || $ !== t) {
				if (Mp) {
					var o = e.memoizedUpdaters;
					0 < o.size && (Wl(e, $), o.clear()), Ve(e, t);
				}
				xx = null, cl(e, t);
			}
			t = !1, o = sx;
			a: do
				try {
					if (tx !== Gb && Q !== null) {
						var s = Q, c = nx;
						switch (tx) {
							case $b:
								ol(), o = Vb;
								break a;
							case Jb:
							case qb:
							case ex:
							case Zb:
								cy.current === null && (t = !0);
								var l = tx;
								if (tx = Gb, nx = null, Sl(e, s, c, l), n && ix) {
									o = Ib;
									break a;
								}
								break;
							default: l = tx, tx = Gb, nx = null, Sl(e, s, c, l);
						}
					}
					gl(), o = sx;
					break;
				} catch (t) {
					ll(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, Kr(), Ub = r, U.H = i, U.A = a, Q === null && (Wb = null, $ = 0, or()), o;
		}
		function gl() {
			for (; Q !== null;) yl(Q);
		}
		function _l(e, t) {
			var n = Ub;
			Ub |= Pb;
			var r = dl(), i = fl();
			if (Wb !== e || $ !== t) {
				if (Mp) {
					var a = e.memoizedUpdaters;
					0 < a.size && (Wl(e, $), a.clear()), Ve(e, t);
				}
				xx = null, yx = bp() + bx, cl(e, t);
			} else ix = A(e, t);
			a: do
				try {
					if (tx !== Gb && Q !== null) b: switch (t = Q, a = nx, tx) {
						case Kb:
							tx = Gb, nx = null, Sl(e, t, a, Kb);
							break;
						case qb:
						case ex:
							if (Mi(a)) {
								tx = Gb, nx = null, bl(t);
								break;
							}
							t = function() {
								tx !== qb && tx !== ex || Wb !== e || (tx = Qb), ql(e);
							}, a.then(t, t);
							break a;
						case Jb:
							tx = Qb;
							break a;
						case Yb:
							tx = Xb;
							break a;
						case Qb:
							Mi(a) ? (tx = Gb, nx = null, bl(t)) : (tx = Gb, nx = null, Sl(e, t, a, Qb));
							break;
						case Xb:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Ud(o) : s.stateNode.complete) {
										tx = Gb, nx = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, Cl(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							tx = Gb, nx = null, Sl(e, t, a, Xb);
							break;
						case Zb:
							tx = Gb, nx = null, Sl(e, t, a, Zb);
							break;
						case $b:
							ol(), sx = Vb;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					U.actQueue === null ? vl() : gl();
					break;
				} catch (t) {
					ll(e, t);
				}
			while (1);
			return Kr(), U.H = r, U.A = i, Ub = n, Q === null ? (Wb = null, $ = 0, or(), sx) : Ib;
		}
		function vl() {
			for (; Q !== null && !vp();) yl(Q);
		}
		function yl(e) {
			var t = e.alternate;
			(e.mode & K) === G ? t = O(e, Is, t, e, ox) : (vi(e), t = O(e, Is, t, e, ox), yi(e)), e.memoizedProps = e.pendingProps, t === null ? Cl(e) : Q = t;
		}
		function bl(e) {
			var t = O(e, xl, e);
			e.memoizedProps = e.pendingProps, t === null ? Cl(e) : Q = t;
		}
		function xl(e) {
			var t = e.alternate, n = (e.mode & K) !== G;
			switch (n && vi(e), e.tag) {
				case 15:
				case 0:
					t = bs(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = bs(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5: Ta(e);
				default: Gs(t, e), e = Q = br(e, ox), t = Is(t, e, ox);
			}
			return n && yi(e), t;
		}
		function Sl(e, t, n, r) {
			Kr(), Ta(t), Uv = null, Wv = 0;
			var i = t.return;
			try {
				if (ss(e, i, t, n, $)) {
					sx = Lb, ns(e, Dr(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				sx = Lb, ns(e, Dr(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? ($g || r === Kb ? e = !0 : ix || $ & 536870912 ? e = !1 : (rx = e = !0, (r === qb || r === ex || r === Jb || r === Zb) && (r = cy.current, r !== null && r.tag === 13 && (r.flags |= 16384))), wl(t, e)) : Cl(t);
		}
		function Cl(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					wl(t, rx);
					return;
				}
				var n = t.alternate;
				if (e = t.return, vi(t), n = O(t, Us, n, t, ox), (t.mode & K) !== G && bi(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			sx === Ib && (sx = Hb);
		}
		function wl(e, t) {
			do {
				var n = Ws(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & K) !== G) {
					bi(e), n = e.actualDuration;
					for (var r = e.child; r !== null;) n += r.actualDuration, r = r.sibling;
					e.actualDuration = n;
				}
				if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
					Q = e;
					return;
				}
				Q = e = n;
			} while (e !== null);
			sx = Vb, Q = null;
		}
		function Tl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.cancelPendingCommit = null;
			do
				jl();
			while (Px !== Ox);
			if (lv.flushLegacyContextWarning(), lv.flushPendingUnsafeLifecycleWarnings(), (Ub & (Pb | Fb)) !== Nb) throw Error("Should not already be working.");
			if (Kn(n), l === Rb ? nr(f, p, n, Sx) : r === null ? Qn(f, p, n, Sx) : tr(f, p, n, r, t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) != 0, Sx), t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				if (a = t.lanes | t.childLanes, a |= Mg, M(e, n, a, o, s, c), e === Wb && (Q = Wb = null, $ = 0), Ix = t, Fx = e, Lx = n, Rx = a, Bx = i, Vx = r, zx = p, Hx = d, Ux = wx, Wx = null, t.actualDuration !== 0 || t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Gl(wp, function() {
					return XS = window.event, Ux === wx && (Ux = Ex), Ml(), null;
				})) : (e.callbackNode = null, e.callbackPriority = 0), S_ = null, b_ = h_(), d !== null && rr(p, b_, d, Sx), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
					r = U.T, U.T = null, i = Kf.p, Kf.p = zp, o = Ub, Ub |= Fb;
					try {
						_c(e, t, n);
					} finally {
						Ub = o, Kf.p = i, U.T = r;
					}
				}
				Px = kx, El(), Dl(), Ol();
			}
		}
		function El() {
			if (Px === kx) {
				Px = Ox;
				var e = Fx, t = Ix, n = Lx, r = (t.flags & 13878) != 0;
				if (t.subtreeFlags & 13878 || r) {
					r = U.T, U.T = null;
					var i = Kf.p;
					Kf.p = zp;
					var a = Ub;
					Ub |= Fb;
					try {
						Sb = n, Cb = e, di(), Dc(t, e), Cb = Sb = null, n = qS;
						var o = In(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Fn(s.ownerDocument.documentElement, s)) {
							if (c !== null && Ln(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = Pn(s, h), v = Pn(s, g);
										if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
											var y = d.createRange();
											y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
										}
									}
								}
							}
							for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
								element: p,
								left: p.scrollLeft,
								top: p.scrollTop
							});
							for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
								var b = d[s];
								b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
							}
						}
						LC = !!KS, qS = KS = null;
					} finally {
						Ub = a, Kf.p = i, U.T = r;
					}
				}
				e.current = t, Px = Ax;
			}
		}
		function Dl() {
			if (Px === Ax) {
				Px = Ox;
				var e = Wx;
				if (e !== null) {
					b_ = h_();
					var t = x_, n = b_;
					!yg || n <= t || (Q_ ? Q_.run(console.timeStamp.bind(console, e, t, n, xg, W, "secondary-light")) : console.timeStamp(e, t, n, xg, W, "secondary-light"));
				}
				e = Fx, t = Ix, n = Lx;
				var r = (t.flags & 8772) != 0;
				if (t.subtreeFlags & 8772 || r) {
					r = U.T, U.T = null;
					var i = Kf.p;
					Kf.p = zp;
					var a = Ub;
					Ub |= Fb;
					try {
						Sb = n, Cb = e, di(), vc(e, t.alternate, t), Cb = Sb = null;
					} finally {
						Ub = a, Kf.p = i, U.T = r;
					}
				}
				e = zx, t = Hx, x_ = h_(), e = t === null ? e : b_, t = x_, n = Ux === Tx, r = Sx, S_ === null ? !yg || t <= e || (r ? r.run(console.timeStamp.bind(console, n ? "Commit Interrupted View Transition" : "Commit", e, t, xg, W, n ? "error" : "secondary-dark")) : console.timeStamp(n ? "Commit Interrupted View Transition" : "Commit", e, t, xg, W, n ? "error" : "secondary-dark")) : ir(e, t, S_, !1, r), Px = jx;
			}
		}
		function Ol() {
			if (Px === Mx || Px === jx) {
				if (Px === Mx) {
					var e = x_;
					x_ = h_();
					var t = x_, n = Ux === Tx;
					!yg || t <= e || (Q_ ? Q_.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, xg, W, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, xg, W, n ? " error" : "secondary-light")), Ux !== Tx && (Ux = Dx);
				}
				Px = Ox, yp(), e = Fx;
				var r = Ix;
				t = Lx, n = Vx;
				var i = r.actualDuration !== 0 || (r.subtreeFlags & 10256) != 0 || (r.flags & 10256) != 0;
				i ? Px = Nx : (Px = Ox, Ix = Fx = null, Al(e, e.pendingLanes), Zx = 0, Qx = null);
				var a = e.pendingLanes;
				if (a === 0 && (Cx = null), i || Hl(e), a = He(t), r = r.stateNode, Ap && typeof Ap.onCommitFiberRoot == "function") try {
					var o = (r.current.flags & 128) == 128;
					switch (a) {
						case zp:
							var s = Sp;
							break;
						case Bp:
							s = Cp;
							break;
						case Vp:
							s = wp;
							break;
						case Hp:
							s = Ep;
							break;
						default: s = wp;
					}
					Ap.onCommitFiberRoot(kp, r, s, o);
				} catch (e) {
					jp || (jp = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (Mp && e.memoizedUpdaters.clear(), Xc(), n !== null) {
					o = U.T, s = Kf.p, Kf.p = zp, U.T = null;
					try {
						var c = e.onRecoverableError;
						for (r = 0; r < n.length; r++) {
							var l = n[r], u = kl(l.stack);
							O(l.source, c, l.value, u);
						}
					} finally {
						U.T = o, Kf.p = s;
					}
				}
				Lx & 3 && jl(), ql(e), a = e.pendingLanes, t & 261930 && a & 42 ? (nv = !0, e === qx ? Kx++ : (Kx = 0, qx = e)) : Kx = 0, i || sl(t, x_), z(0, !1);
			}
		}
		function kl(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function Al(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ai(t)));
		}
		function jl() {
			return El(), Dl(), Ol(), Ml();
		}
		function Ml() {
			if (Px !== Nx) return !1;
			var e = Fx, t = Rx;
			Rx = 0;
			var n = He(Lx), r = Vp === 0 || Vp > n ? Vp : n;
			n = U.T;
			var i = Kf.p;
			try {
				Kf.p = r, U.T = null;
				var a = Bx;
				Bx = null, r = Fx;
				var o = Lx;
				if (Px = Ox, Ix = Fx = null, Lx = 0, (Ub & (Pb | Fb)) !== Nb) throw Error("Cannot flush passive effects while already rendering.");
				Kn(o), Jx = !0, Yx = !1;
				var s = 0;
				if (S_ = null, s = bp(), Ux === Dx) ar(x_, s, Q_);
				else {
					var c = x_, l = s, u = Ux === Ex;
					!yg || l <= c || (Sx ? Sx.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, xg, W, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, xg, W, "secondary-light"));
				}
				c = Ub, Ub |= Fb;
				var d = r.current;
				di(), Kc(d);
				var f = r.current;
				d = zx, di(), Rc(r, f, o, a, d), Hl(r), Ub = c;
				var p = bp();
				if (f = s, d = Sx, S_ === null ? !yg || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, xg, W, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, xg, W, "secondary-dark")) : ir(f, p, S_, !0, d), sl(o, p), z(0, !1), Yx ? r === Qx ? Zx++ : (Zx = 0, Qx = r) : Zx = 0, Yx = Jx = !1, Ap && typeof Ap.onPostCommitFiberRoot == "function") try {
					Ap.onPostCommitFiberRoot(kp, r);
				} catch (e) {
					jp || (jp = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				Kf.p = i, U.T = n, Al(e, t);
			}
		}
		function Nl(e, t, n) {
			t = Dr(n, t), Si(t), t = is(e.stateNode, t, 2), e = Qi(e, t, 2), e !== null && (j(e, 2), ql(e));
		}
		function Pl(e, t, n) {
			if ($x = !1, e.tag === 3) Nl(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Nl(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Cx === null || !Cx.has(r))) {
							e = Dr(n, e), Si(e), n = as(2), r = Qi(t, n, 2), r !== null && (os(n, r, t, e), j(r, 2), ql(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function Fl(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new Mb();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (ax = !0, i.add(n), r = Il.bind(null, e, t, n), Mp && Wl(e, n), t.then(r, r));
		}
		function Il(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > k_ && (O_ = k_ = h_(), A_ = g_("Promise Resolved"), j_ = v_) : n & 4194048 && 0 > B_ && (R_ = B_ = h_(), H_ = g_("Promise Resolved"), V_ = v_), Zc() && U.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), Wb === e && ($ & n) === n && (sx === Bb || sx === zb && ($ & 62914560) === $ && bp() - gx < vx ? (Ub & Pb) === Nb && cl(e, 0) : ux |= n, fx === $ && (fx = 0)), ql(e);
		}
		function Ll(e, t) {
			t === 0 && (t = Fe()), e = lr(e, t), e !== null && (j(e, t), ql(e));
		}
		function Rl(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), Ll(e, n);
		}
		function zl(e, t) {
			var n = 0;
			switch (e.tag) {
				case 31:
				case 13:
					var r = e.stateNode, i = e.memoizedState;
					i !== null && (n = i.retryLane);
					break;
				case 19:
					r = e.stateNode;
					break;
				case 22:
					r = e.stateNode._retryCache;
					break;
				default: throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
			}
			r !== null && r.delete(t), Ll(e, n);
		}
		function Bl(e, t, n) {
			if (t.subtreeFlags & 67117056) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Mf;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 8192 ? O(i, Vl, r, i) : i.subtreeFlags & 67108864 && O(i, Bl, r, i, a)) : i.flags & 67108864 ? a && O(i, Vl, r, i) : Bl(r, i, a), t = t.sibling;
			}
		}
		function Vl(e, t) {
			Ae(!0);
			try {
				jc(t), Jc(t), Nc(e, t.alternate, t, !1), Bc(e, t, 0, null, !1, 0);
			} finally {
				Ae(!1);
			}
		}
		function Hl(e) {
			var t = !0;
			e.current.mode & (Lg | Rg) || (t = !1), Bl(e, e.current, t);
		}
		function Ul(e) {
			if ((Ub & Pb) === Nb) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = w(e) || "ReactComponent", eS !== null) {
						if (eS.has(t)) return;
						eS.add(t);
					} else eS = /* @__PURE__ */ new Set([t]);
					O(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Wl(e, t) {
			Mp && e.memoizedUpdaters.forEach(function(n) {
				Be(e, n, t);
			});
		}
		function Gl(e, t) {
			var n = U.actQueue;
			return n === null ? gp(e, t) : (n.push(t), rS);
		}
		function Kl(e) {
			Zc() && U.actQueue === null && O(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", w(e));
			});
		}
		function ql(e) {
			e !== aS && e.next === null && (aS === null ? iS = aS = e : aS = aS.next = e), cS = !0, U.actQueue === null ? oS || (oS = !0, eu()) : sS || (sS = !0, eu());
		}
		function z(e, t) {
			if (!lS && cS) {
				lS = !0;
				do
					for (var n = !1, r = iS; r !== null;) {
						if (!t) if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Np(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Ql(r, a));
						} else a = $, a = Ne(r, r === Wb ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== $S), !(a & 3) || A(r, a) || (n = !0, Ql(r, a));
						r = r.next;
					}
				while (n);
				lS = !1;
			}
		}
		function Jl() {
			XS = window.event, Yl();
		}
		function Yl() {
			cS = sS = oS = !1;
			var e = 0;
			uS !== 0 && Hu() && (e = uS);
			for (var t = bp(), n = null, r = iS; r !== null;) {
				var i = r.next, a = Xl(r, t);
				a === 0 ? (r.next = null, n === null ? iS = i : n.next = i, i === null && (aS = n)) : (n = r, (e !== 0 || a & 3) && (cS = !0)), r = i;
			}
			Px !== Ox && Px !== Nx || z(e, !1), uS !== 0 && (uS = 0);
		}
		function Xl(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Np(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Pe(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = Wb, n = $, n = Ne(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r = e.callbackNode, n === 0 || e === t && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) return r !== null && $l(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || A(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || U.actQueue !== null && r !== dS) $l(r);
				else return t;
				switch (He(n)) {
					case zp:
					case Bp:
						n = Cp;
						break;
					case Vp:
						n = wp;
						break;
					case Hp:
						n = Ep;
						break;
					default: n = wp;
				}
				return r = Zl.bind(null, e), U.actQueue === null ? n = gp(n, r) : (U.actQueue.push(r), n = dS), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && $l(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function Zl(e, t) {
			if (nv = tv = !1, XS = window.event, Px !== Ox && Px !== Nx) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (Ux === wx && (Ux = Ex), jl() && e.callbackNode !== n) return null;
			var r = $;
			return r = Ne(e, e === Wb ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r === 0 ? null : (tl(e, r, t), Xl(e, bp()), e.callbackNode != null && e.callbackNode === n ? Zl.bind(null, e) : null);
		}
		function Ql(e, t) {
			if (jl()) return null;
			tv = nv, nv = !1, tl(e, t, !0);
		}
		function $l(e) {
			e !== dS && e !== null && _p(e);
		}
		function eu() {
			U.actQueue !== null && U.actQueue.push(function() {
				return Yl(), null;
			}), tC(function() {
				(Ub & (Pb | Fb)) === Nb ? Yl() : gp(Sp, Jl);
			});
		}
		function tu() {
			if (uS === 0) {
				var e = av;
				e === 0 && (e = Ip, Ip <<= 1, !(Ip & 261888) && (Ip = 256)), uS = e;
			}
			return uS;
		}
		function nu(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (k(e, "action"), tn("" + e));
		}
		function ru(e, t) {
			var n = t.ownerDocument.createElement("input");
			return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
		}
		function iu(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = nu((i[Gp] || null).action), o = r.submitter;
				o && (t = (t = o[Gp] || null) ? nu(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new ah("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (uS !== 0) {
									var e = o ? ru(i, o) : new FormData(i), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), jo(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = o ? ru(i, o) : new FormData(i), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), jo(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function au(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				ug(e);
			}
			e.currentTarget = null;
		}
		function ou(e, t) {
			t = (t & 4) != 0;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? au(a, s, l) : O(c, au, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? au(a, s, l) : O(c, au, a, s, l), i = c;
					}
				}
			}
		}
		function B(e, t) {
			pS.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[qp];
			n === void 0 && (n = t[qp] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (lu(t, e, 2, !1), n.add(r));
		}
		function su(e, t, n) {
			pS.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), lu(n, e, r, t);
		}
		function cu(e) {
			if (!e[mS]) {
				e[mS] = !0, Qp.forEach(function(t) {
					t !== "selectionchange" && (pS.has(t) || su(t, !1, e), su(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[mS] || (t[mS] = !0, su("selectionchange", !1, t));
			}
		}
		function lu(e, t, n, r) {
			switch (uf(t)) {
				case zp:
					var i = af;
					break;
				case Bp:
					i = of;
					break;
				default: i = sf;
			}
			n = i.bind(null, t, n, e), i = void 0, !$m || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function uu(e, t, n, r, i) {
			var a = r;
			if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
				if (r === null) return;
				var o = r.tag;
				if (o === 3 || o === 4) {
					var s = r.stateNode.containerInfo;
					if (s === i) break;
					if (o === 4) for (o = r.return; o !== null;) {
						var c = o.tag;
						if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
						o = o.return;
					}
					for (; s !== null;) {
						if (o = Ke(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			on(function() {
				var r = a, i = rn(n), o = [];
				a: {
					var s = ig.get(e);
					if (s !== void 0) {
						var c = ah, l = e;
						switch (e) {
							case "keypress": if (ln(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = Sh;
								break;
							case "focusin":
								l = "focus", c = mh;
								break;
							case "focusout":
								l = "blur", c = mh;
								break;
							case "beforeblur":
							case "afterblur":
								c = mh;
								break;
							case "click": if (n.button === 2) break a;
							case "auxclick":
							case "dblclick":
							case "mousedown":
							case "mousemove":
							case "mouseup":
							case "mouseout":
							case "mouseover":
							case "contextmenu":
								c = fh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = ph;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = wh;
								break;
							case Zh:
							case Qh:
							case $h:
								c = hh;
								break;
							case rg:
								c = Th;
								break;
							case "scroll":
							case "scrollend":
								c = sh;
								break;
							case "wheel":
								c = Eh;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = gh;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = Ch;
								break;
							case "toggle":
							case "beforetoggle": c = Dh;
						}
						var u = (t & 4) != 0, d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = sn(p, f), h != null && u.push(du(p, h, m))), d) break;
							p = p.return;
						}
						0 < u.length && (s = new c(s, l, null, n, i), o.push({
							event: s,
							listeners: u
						}));
					}
				}
				if (!(t & 7)) {
					a: {
						if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Jm && (l = n.relatedTarget || n.fromElement) && (Ke(l) || l[Kp])) break a;
						if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Ke(l) : null, l !== null && (d = x(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
							if (u = fh, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Ch, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : Je(c), m = l == null ? s : Je(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Ke(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
								for (u = pu, f = c, p = l, m = 0, h = f; h; h = u(h)) m++;
								h = 0;
								for (var g = p; g; g = u(g)) h++;
								for (; 0 < m - h;) f = u(f), m--;
								for (; 0 < h - m;) p = u(p), h--;
								for (; m--;) {
									if (f === p || p !== null && f === p.alternate) {
										u = f;
										break b;
									}
									f = u(f), p = u(p);
								}
								u = null;
							}
							else u = null;
							c !== null && mu(o, s, c, u, !1), l !== null && d !== null && mu(o, d, l, u, !0);
						}
					}
					a: {
						if (s = r ? Je(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var _ = wn;
						else if (yn(s)) if (Vh) _ = An;
						else {
							_ = On;
							var v = Dn;
						}
						else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && Yt(r.elementType) && (_ = wn) : _ = kn;
						if (_ &&= _(e, r)) {
							xn(o, _, n, i);
							break a;
						}
						v && v(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && ht(s, "number", s.value);
					}
					switch (v = r ? Je(r) : window, e) {
						case "focusin":
							(yn(v) || v.contentEditable === "true") && (Wh = v, Gh = r, Kh = null);
							break;
						case "focusout":
							Kh = Gh = Wh = null;
							break;
						case "mousedown":
							qh = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							qh = !1, Rn(o, n, i);
							break;
						case "selectionchange": if (Uh) break;
						case "keydown":
						case "keyup": Rn(o, n, i);
					}
					var y;
					if (Ah) b: {
						switch (e) {
							case "compositionstart":
								var b = "onCompositionStart";
								break b;
							case "compositionend":
								b = "onCompositionEnd";
								break b;
							case "compositionupdate":
								b = "onCompositionUpdate";
								break b;
						}
						b = void 0;
					}
					else Lh ? hn(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === kh && (b = "onCompositionStart");
					b && (Nh && n.locale !== "ko" && (Lh || b !== "onCompositionStart" ? b === "onCompositionEnd" && Lh && (y = cn()) : (th = i, nh = "value" in th ? th.value : th.textContent, Lh = !0)), v = fu(r, b), 0 < v.length && (b = new _h(b, e, null, n, i), o.push({
						event: b,
						listeners: v
					}), y ? b.data = y : (y = gn(n), y !== null && (b.data = y)))), (y = Mh ? _n(e, n) : vn(e, n)) && (b = fu(r, "onBeforeInput"), 0 < b.length && (v = new vh("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: v,
						listeners: b
					}), v.data = y)), iu(o, e, r, n, i);
				}
				ou(o, t);
			});
		}
		function du(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function fu(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = sn(e, n), i != null && r.unshift(du(e, i, a)), i = sn(e, t), i != null && r.push(du(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function pu(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function mu(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = sn(n, a), l != null && o.unshift(du(n, l, c))) : i || (l = sn(n, a), l != null && o.push(du(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function hu(e, t) {
			Qt(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Vm || (Vm = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: $p,
				possibleRegistrationNames: em
			};
			Yt(e) || typeof t.is == "string" || en(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function gu(e, t, n, r) {
			t !== n && (n = bu(n), bu(t) !== n && (r[e] = t));
		}
		function _u(e, t, n) {
			t.forEach(function(t) {
				n[Eu(t)] = t === "style" ? Du(e) : e.getAttribute(t);
			});
		}
		function vu(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function yu(e, t) {
			return e = e.namespaceURI === Nm || e.namespaceURI === Pm ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function bu(e) {
			return Te(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", we(e)), Ee(e)), (typeof e == "string" ? e : "" + e).replace(CS, "\n").replace(wS, "");
		}
		function xu(e, t) {
			return t = bu(t), bu(e) === t;
		}
		function Su(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					typeof r == "string" ? (Wt(r, t, !1), t === "body" || t === "textarea" && r === "" || Gt(e, r)) : (typeof r == "number" || typeof r == "bigint") && (Wt("" + r, t, !1), t !== "body" && Gt(e, "" + r));
					break;
				case "className":
					rt(e, "class", r);
					break;
				case "tabIndex":
					rt(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					rt(e, n, r);
					break;
				case "style":
					Jt(e, r, a);
					break;
				case "data": if (t !== "object") {
					rt(e, "data", r);
					break;
				}
				case "src":
				case "href":
					if (r === "" && (t !== "a" || n !== "href")) {
						console.error(n === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", n, n), e.removeAttribute(n);
						break;
					}
					if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					k(r, n), r = tn("" + r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || bS || (bS = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || yS || (yS = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || _S ? t !== "button" || i.type == null || i.type === "submit" || _S ? typeof r == "function" && (i.name == null || vS || (vS = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || bS || (bS = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || yS || (yS = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (_S = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (_S = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					} else typeof a == "function" && (n === "formAction" ? (t !== "input" && Su(e, t, "name", i.name, i, null), Su(e, t, "formEncType", i.formEncType, i, null), Su(e, t, "formMethod", i.formMethod, i, null), Su(e, t, "formTarget", i.formTarget, i, null)) : (Su(e, t, "encType", i.encType, i, null), Su(e, t, "method", i.method, i, null), Su(e, t, "target", i.target, i, null)));
					if (r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					k(r, n), r = tn("" + r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && vu(n, r), e.onclick = nn);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && vu(n, r), B("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && vu(n, r), B("scrollend", e));
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "multiple":
					e.multiple = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "muted":
					e.muted = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": break;
				case "autoFocus": break;
				case "xlinkHref":
					if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
						e.removeAttribute("xlink:href");
						break;
					}
					k(r, n), n = tn("" + r), e.setAttributeNS(TS, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (k(r, n), e.setAttribute(n, "" + r)) : e.removeAttribute(n);
					break;
				case "inert": r !== "" || SS[n] || (SS[n] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", n));
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
					r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
					break;
				case "capture":
				case "download":
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (k(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (k(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (k(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					B("beforetoggle", e), B("toggle", e), nt(e, "popover", r);
					break;
				case "xlinkActuate":
					it(e, TS, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					it(e, TS, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					it(e, TS, "xlink:role", r);
					break;
				case "xlinkShow":
					it(e, TS, "xlink:show", r);
					break;
				case "xlinkTitle":
					it(e, TS, "xlink:title", r);
					break;
				case "xlinkType":
					it(e, TS, "xlink:type", r);
					break;
				case "xmlBase":
					it(e, ES, "xml:base", r);
					break;
				case "xmlLang":
					it(e, ES, "xml:lang", r);
					break;
				case "xmlSpace":
					it(e, ES, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), nt(e, "is", r);
					break;
				case "innerText":
				case "textContent": break;
				case "popoverTarget": xS || typeof r != "object" || !r || (xS = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = Xt(n), nt(e, n, r)) : $p.hasOwnProperty(n) && r != null && typeof r != "function" && vu(n, r);
			}
		}
		function Cu(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					Jt(e, r, a);
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "children":
					typeof r == "string" ? Gt(e, r) : (typeof r == "number" || typeof r == "bigint") && Gt(e, "" + r);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && vu(n, r), B("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && vu(n, r), B("scrollend", e));
					break;
				case "onClick":
					r != null && (typeof r != "function" && vu(n, r), e.onclick = nn);
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": break;
				case "innerText":
				case "textContent": break;
				default: if ($p.hasOwnProperty(n)) r != null && typeof r != "function" && vu(n, r);
				else a: {
					if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[Gp] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
						typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
						break a;
					}
					n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : nt(e, n, r);
				}
			}
		}
		function wu(e, t, n) {
			switch (hu(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					B("error", e), B("load", e);
					var r = !1, i = !1, a;
					for (a in n) if (n.hasOwnProperty(a)) {
						var o = n[a];
						if (o != null) switch (a) {
							case "src":
								r = !0;
								break;
							case "srcSet":
								i = !0;
								break;
							case "children":
							case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							default: Su(e, t, a, o, n, null);
						}
					}
					i && Su(e, t, "srcSet", n.srcSet, n, null), r && Su(e, t, "src", n.src, n, null);
					return;
				case "input":
					$e("input", n), B("invalid", e);
					var s = a = o = i = null, c = null, l = null;
					for (r in n) if (n.hasOwnProperty(r)) {
						var u = n[r];
						if (u != null) switch (r) {
							case "name":
								i = u;
								break;
							case "type":
								o = u;
								break;
							case "checked":
								c = u;
								break;
							case "defaultChecked":
								l = u;
								break;
							case "value":
								a = u;
								break;
							case "defaultValue":
								s = u;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (u != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: Su(e, t, r, u, n, null);
						}
					}
					ft(e, n), mt(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in $e("select", n), B("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: Su(e, t, i, s, n, null);
					}
					yt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && vt(e, !!r, n, !0) : vt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in $e("textarea", n), B("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
						case "value":
							r = s;
							break;
						case "defaultValue":
							i = s;
							break;
						case "children":
							a = s;
							break;
						case "dangerouslySetInnerHTML":
							if (s != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: Su(e, t, o, s, n, null);
					}
					bt(e, n), St(e, r, i, a);
					return;
				case "option":
					for (c in gt(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: Su(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					B("beforetoggle", e), B("toggle", e), B("cancel", e), B("close", e);
					break;
				case "iframe":
				case "object":
					B("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < fS.length; r++) B(fS[r], e);
					break;
				case "image":
					B("error", e), B("load", e);
					break;
				case "details":
					B("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": B("error", e), B("load", e);
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
					for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
						default: Su(e, t, l, r, n, null);
					}
					return;
				default: if (Yt(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && Cu(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && Su(e, t, s, r, n, null));
		}
		function Tu(e, t, n, r) {
			switch (hu(t, r), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var i = null, a = null, o = null, s = null, c = null, l = null, u = null;
					for (p in n) {
						var d = n[p];
						if (n.hasOwnProperty(p) && d != null) switch (p) {
							case "checked": break;
							case "value": break;
							case "defaultValue": c = d;
							default: r.hasOwnProperty(p) || Su(e, t, p, null, r, d);
						}
					}
					for (var f in r) {
						var p = r[f];
						if (d = n[f], r.hasOwnProperty(f) && (p != null || d != null)) switch (f) {
							case "type":
								a = p;
								break;
							case "name":
								i = p;
								break;
							case "checked":
								l = p;
								break;
							case "defaultChecked":
								u = p;
								break;
							case "value":
								o = p;
								break;
							case "defaultValue":
								s = p;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (p != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: p !== d && Su(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || gS || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), gS = !0), !t || r || hS || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), hS = !0), pt(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || Su(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							f = a;
							break;
						case "defaultValue":
							s = a;
							break;
						case "multiple": o = a;
						default: a !== c && Su(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? vt(e, !!t, t ? [] : "", !1) : vt(e, !!t, r, !0)) : vt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: Su(e, t, s, null, r, i);
					}
					for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
						case "value":
							f = i;
							break;
						case "defaultValue":
							p = i;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (i != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: i !== a && Su(e, t, o, i, r, a);
					}
					xt(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: Su(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: Su(e, t, c, f, r, p);
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
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && Su(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: Su(e, t, l, f, r, p);
					}
					return;
				default: if (Yt(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && Cu(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || Cu(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && Su(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || Su(e, t, d, f, r, p);
		}
		function Eu(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function Du(e) {
			var t = {};
			e = e.style;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				t[r] = e.getPropertyValue(r);
			}
			return t;
		}
		function Ou(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (De(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || Mm.has(a) ? (De(o, a), r += i + a.replace(Sm, "-$1").toLowerCase().replace(Cm, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(Sm, "-$1").toLowerCase().replace(Cm, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = bu(r), bu(t) !== r && (n.style = Du(e)));
			}
		}
		function ku(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (k(r, t), e === "" + r) return;
			}
			gu(t, e, r, a);
		}
		function Au(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) {
				switch (typeof r) {
					case "function":
					case "symbol": return;
				}
				if (!r) return;
			} else switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (r) return;
			}
			gu(t, e, r, a);
		}
		function ju(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (k(r, n), e === "" + r) return;
			}
			gu(t, e, r, a);
		}
		function Mu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
				default: if (isNaN(r)) return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (!isNaN(r) && (k(r, t), e === "" + r)) return;
			}
			gu(t, e, r, a);
		}
		function Nu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (k(r, t), n = tn("" + r), e === n) return;
			}
			gu(t, e, r, a);
		}
		function Pu(e, t, n, r) {
			for (var i = {}, a = /* @__PURE__ */ new Set(), o = e.attributes, s = 0; s < o.length; s++) switch (o[s].name.toLowerCase()) {
				case "value": break;
				case "checked": break;
				case "selected": break;
				default: a.add(o[s].name);
			}
			if (Yt(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if ($p.hasOwnProperty(c)) typeof l != "function" && vu(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || gu("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = yu(e, l), gu(c, o, l, i));
								continue;
							case "style":
								a.delete(c), Ou(e, l, i);
								continue;
							case "offsetParent":
							case "offsetTop":
							case "offsetLeft":
							case "offsetWidth":
							case "offsetHeight":
							case "isContentEditable":
							case "outerText":
							case "outerHTML":
								a.delete(c.toLowerCase()), console.error("Assignment to read-only property will result in a no-op: `%s`", c);
								continue;
							case "className":
								a.delete("class"), o = tt(e, "class", l), gu("className", o, l, i);
								continue;
							default: r.context === US && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = tt(e, c, l), gu(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if ($p.hasOwnProperty(l)) typeof c != "function" && vu(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || gu("children", e.textContent, c, i);
						continue;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning":
					case "value":
					case "checked":
					case "selected":
					case "defaultValue":
					case "defaultChecked":
					case "innerHTML":
					case "ref": continue;
					case "dangerouslySetInnerHTML":
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = yu(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						ku(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						ku(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), Ou(e, c, i);
						continue;
					case "multiple":
						a.delete(l), gu(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), gu(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), gu(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), gu(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Nu(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						} else if (o === DS) {
							a.delete(l.toLowerCase()), gu(l, "function", c, i);
							continue;
						}
						Nu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Nu(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						ju(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						ju(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						ju(e, l, l, c, a, i);
						continue;
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
						Au(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "capture":
					case "download":
						a: {
							s = e;
							var u = o = l, d = i;
							if (a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol": break a;
								default: if (!1 === c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol": break;
								case "boolean":
									if (!0 === c && s === "") break a;
									break;
								default: if (k(c, o), s === "" + c) break a;
							}
							gu(o, s, c, d);
						}
						continue;
					case "cols":
					case "rows":
					case "size":
					case "span":
						a: {
							if (s = e, u = o = l, d = i, a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol":
								case "boolean": break a;
								default: if (isNaN(c) || 1 > c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol":
								case "boolean": break;
								default: if (!(isNaN(c) || 1 > c) && (k(c, o), s === "" + c)) break a;
							}
							gu(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Mu(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Mu(e, l, l, c, a, i);
						continue;
					case "xHeight":
						ku(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						ku(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						ku(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						ku(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						ku(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						ku(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						ku(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						ku(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						ku(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						ku(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || SS[l] || (SS[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), Au(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = Xt(l), o = !1, r.context === US && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Im.hasOwnProperty(u) && Im[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, et(d)) if (u.hasAttribute(d)) u = u.getAttribute(d), k(s, d), s = u === "" + s ? s : u;
						else {
							switch (typeof s) {
								case "function":
								case "symbol": break a;
								case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
							}
							s = s === void 0 ? void 0 : null;
						}
						else s = void 0;
						o || gu(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && _u(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Fu(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Iu(e) {
			switch (e) {
				case "css":
				case "script":
				case "font":
				case "img":
				case "image":
				case "input":
				case "link": return !0;
				default: return !1;
			}
		}
		function Lu() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Iu(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Iu(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function Ru(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function zu(e) {
			switch (e) {
				case Pm: return WS;
				case Nm: return GS;
				default: return US;
			}
		}
		function Bu(e, t) {
			if (e === US) switch (t) {
				case "svg": return WS;
				case "math": return GS;
				default: return US;
			}
			return e === WS && t === "foreignObject" ? US : e;
		}
		function Vu(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Hu() {
			var e = window.event;
			return e && e.type === "popstate" ? e === YS ? !1 : (YS = e, !0) : (YS = null, !1);
		}
		function Uu() {
			var e = window.event;
			return e && e !== XS ? e.type : null;
		}
		function Wu() {
			var e = window.event;
			return e && e !== XS ? e.timeStamp : -1.1;
		}
		function Gu(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function Ku(e, t, n) {
			switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && e.focus();
					break;
				case "img": n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
			}
		}
		function qu() {}
		function Ju(e, t, n, r) {
			Tu(e, t, n, r), e[Gp] = r;
		}
		function Yu(e) {
			Gt(e, "");
		}
		function Xu(e, t, n) {
			e.nodeValue = n;
		}
		function Zu(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Gp] || null;
				if (t !== null) {
					var n = qe(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, O(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, O(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function Qu(e) {
			return e === "head";
		}
		function $u(e, t) {
			e.removeChild(t);
		}
		function ed(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function td(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === MS || n === AS) {
					if (r === 0) {
						e.removeChild(i), bf(t);
						return;
					}
					r--;
				} else if (n === jS || n === NS || n === PS || n === FS || n === kS) r++;
				else if (n === IS) Ed(e.ownerDocument.documentElement);
				else if (n === RS) {
					n = e.ownerDocument.head, Ed(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Zp] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === LS && Ed(e.ownerDocument.body);
				n = i;
			} while (n);
			bf(t);
		}
		function nd(e, t) {
			var n = e;
			e = 0;
			do {
				var r = n.nextSibling;
				if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === MS) {
					if (e === 0) break;
					e--;
				} else n !== jS && n !== NS && n !== PS && n !== FS || e++;
				n = r;
			} while (n);
		}
		function rd(e) {
			nd(e, !0);
		}
		function id(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function ad(e) {
			e.nodeValue = "";
		}
		function od(e) {
			nd(e, !1);
		}
		function sd(e, t) {
			t = t[HS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function cd(e, t) {
			e.nodeValue = t;
		}
		function ld(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						ld(n), Ge(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function ud(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) if (t === "input" && e.type === "hidden") {
					k(i.name, "name");
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
				else if (!e[Zp]) switch (t) {
					case "meta":
						if (!e.hasAttribute("itemprop")) break;
						return e;
					case "link":
						if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
						return e;
					case "style":
						if (e.hasAttribute("data-precedence")) break;
						return e;
					case "script":
						if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
						return e;
					default: return e;
				}
				if (e = gd(e.nextSibling), e === null) break;
			}
			return null;
		}
		function dd(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = gd(e.nextSibling), e === null)) return null;
			return e;
		}
		function fd(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = gd(e.nextSibling), e === null)) return null;
			return e;
		}
		function pd(e) {
			return e.data === NS || e.data === PS;
		}
		function md(e) {
			return e.data === FS || e.data === NS && e.ownerDocument.readyState !== VS;
		}
		function hd(e, t) {
			var n = e.ownerDocument;
			if (e.data === PS) e._reactRetry = t;
			else if (e.data !== NS || n.readyState !== VS) t();
			else {
				var r = function() {
					t(), n.removeEventListener("DOMContentLoaded", r);
				};
				n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
			}
		}
		function gd(e) {
			for (; e != null; e = e.nextSibling) {
				var t = e.nodeType;
				if (t === 1 || t === 3) break;
				if (t === 8) {
					if (t = e.data, t === jS || t === FS || t === NS || t === PS || t === kS || t === zS || t === BS) break;
					if (t === MS || t === AS) return null;
				}
			}
			return e;
		}
		function _d(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[Eu(a.name)] = a.name.toLowerCase() === "style" ? Du(e) : a.value;
				}
				return {
					type: t,
					props: n
				};
			}
			return e.nodeType === 8 ? e.data === kS ? {
				type: "Activity",
				props: {}
			} : {
				type: "Suspense",
				props: {}
			} : e.nodeValue;
		}
		function vd(e, t, n) {
			return n === null || !0 !== n[OS] ? (e.nodeValue === t ? e = null : (t = bu(t), e = bu(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function yd(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === MS || n === AS) {
						if (t === 0) return gd(e.nextSibling);
						t--;
					} else n !== jS && n !== FS && n !== NS && n !== PS && n !== kS || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function bd(e) {
			e = e.previousSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === jS || n === FS || n === NS || n === PS || n === kS) {
						if (t === 0) return e;
						t--;
					} else n !== MS && n !== AS || t++;
				}
				e = e.previousSibling;
			}
			return null;
		}
		function xd(e) {
			bf(e);
		}
		function Sd(e) {
			bf(e);
		}
		function Cd(e) {
			bf(e);
		}
		function wd(e, t, n, r, i) {
			switch (i && Ut(e, r.ancestorInfo), t = Ru(n), e) {
				case "html":
					if (e = t.documentElement, !e) throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "head":
					if (e = t.head, !e) throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "body":
					if (e = t.body, !e) throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				default: throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
		}
		function Td(e, t, n, r) {
			if (!n[Kp] && qe(n)) {
				var i = n.tagName.toLowerCase();
				console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.", i, i, i);
			}
			switch (e) {
				case "html":
				case "head":
				case "body": break;
				default: console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
			for (i = n.attributes; i.length;) n.removeAttributeNode(i[0]);
			wu(n, e, t), n[Wp] = r, n[Gp] = t;
		}
		function Ed(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			Ge(e);
		}
		function Dd(e) {
			return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Od(e, t, n) {
			var r = dC;
			if (r && typeof t == "string" && t) {
				var i = dt(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), lC.has(i) || (lC.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), wu(t, "link", e), Xe(t), r.head.appendChild(t)));
			}
		}
		function kd(e, t, n, r) {
			var i = (i = $f.current) ? Dd(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = V(n.href), t = Ye(i).hoistableStyles, r = t.get(n), r || (r = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
						e = V(n.href);
						var a = Ye(i).hoistableStyles, o = a.get(e);
						if (!o && (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: rC,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(jd(e))) && !a._p && (o.instance = a, o.state.loading = iC | sC), !cC.has(e))) {
							var s = {
								rel: "preload",
								as: "style",
								href: n.href,
								crossOrigin: n.crossOrigin,
								integrity: n.integrity,
								media: n.media,
								hrefLang: n.hrefLang,
								referrerPolicy: n.referrerPolicy
							};
							cC.set(e, s), a || Nd(i, e, s, o.state);
						}
						if (t && r === null) throw n = "\n\n  - " + Ad(t) + "\n  + " + Ad(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + Ad(t) + "\n  + " + Ad(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Pd(n), t = Ye(i).hoistableScripts, r = t.get(n), r || (r = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error("getResource encountered a type it did not expect: \"" + e + "\". this is a bug in React.");
			}
		}
		function Ad(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : hp.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : hp.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : hp.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function V(e) {
			return "href=\"" + dt(e) + "\"";
		}
		function jd(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function Md(e) {
			return H({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function Nd(e, t, n, r) {
			e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = iC : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
				return r.loading |= iC;
			}), t.addEventListener("error", function() {
				return r.loading |= aC;
			}), wu(t, "link", n), Xe(t), e.head.appendChild(t));
		}
		function Pd(e) {
			return "[src=\"" + dt(e) + "\"]";
		}
		function Fd(e) {
			return "script[async]" + e;
		}
		function Id(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + dt(n.href) + "\"]");
					if (r) return t.instance = r, Xe(r), r;
					var i = H({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), Xe(r), wu(r, "style", i), Ld(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = V(n.href);
					var a = e.querySelector(jd(i));
					if (a) return t.state.loading |= sC, t.instance = a, Xe(a), a;
					r = Md(n), (i = cC.get(i)) && Rd(r, i), a = (e.ownerDocument || e).createElement("link"), Xe(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), wu(a, "link", r), t.state.loading |= sC, Ld(a, n.precedence, e), t.instance = a;
				case "script": return a = Pd(n.src), (i = e.querySelector(Fd(a))) ? (t.instance = i, Xe(i), i) : (r = n, (i = cC.get(a)) && (r = H({}, n), zd(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), Xe(i), wu(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & sC) === rC && (r = t.instance, t.state.loading |= sC, Ld(r, n.precedence, e));
			return t.instance;
		}
		function Ld(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function Rd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function zd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function Bd(e, t, n) {
			if (fC === null) {
				var r = /* @__PURE__ */ new Map(), i = fC = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = fC, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[Zp] || a[Wp] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Pm) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function Vd(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Hd(e, t, n) {
			var r = !n.ancestorInfo.containerTagInScope;
			if (n.context === WS || t.itemProp != null) return !r || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.", e, e), !1;
			switch (e) {
				case "meta":
				case "title": return !0;
				case "style":
					if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
						r && console.error("Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel=\"stylesheet\" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence=\"default\"` and `href=\"some unique resource identifier\"`.");
						break;
					}
					return !0;
				case "link":
					if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
						if (t.rel === "stylesheet" && typeof t.precedence == "string") {
							e = t.href;
							var i = t.onError, a = t.disabled;
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Fu(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
						}
						r && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag") : (t.onError || t.onLoad) && console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));
						break;
					}
					switch (t.rel) {
						case "stylesheet": return e = t.precedence, t = t.disabled, typeof e != "string" && r && console.error("Cannot render a <link rel=\"stylesheet\" /> outside the main document without knowing its precedence. Consider adding precedence=\"default\" or moving it into the root <head> tag."), typeof e == "string" && t == null;
						default: return !0;
					}
				case "script":
					if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
						r && (e ? t.onLoad || t.onError ? console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async=\"\" or moving it into the root <head> tag."));
						break;
					}
					return !0;
				case "noscript":
				case "template": r && console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.", e);
			}
			return !1;
		}
		function Ud(e) {
			return !(e.type === "stylesheet" && (e.state.loading & oC) === rC);
		}
		function Wd(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & sC) === rC) {
				if (n.instance === null) {
					var i = V(r.href), a = t.querySelector(jd(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Kd.bind(e), t.then(e, e)), n.state.loading |= sC, n.instance = a, Xe(a);
						return;
					}
					a = t.ownerDocument || t, r = Md(r), (i = cC.get(i)) && Rd(r, i), a = a.createElement("link"), Xe(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), wu(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & oC) === rC && (e.count++, n = Kd.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function Gd(e, t) {
			return e.stylesheets && e.count === 0 && qd(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && qd(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, pC + t);
				0 < e.imgBytes && gC === 0 && (gC = 125 * Lu() * hC);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && qd(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > gC ? 50 : mC) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function Kd() {
			if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
				if (this.stylesheets) qd(this, this.stylesheets);
				else if (this.unsuspend) {
					var e = this.unsuspend;
					this.unsuspend = null, e();
				}
			}
		}
		function qd(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, vC = /* @__PURE__ */ new Map(), t.forEach(Jd, e), vC = null, Kd.call(e));
		}
		function Jd(e, t) {
			if (!(t.state.loading & sC)) {
				var n = vC.get(e);
				if (n) var r = n.get(_C);
				else {
					n = /* @__PURE__ */ new Map(), vC.set(e, n);
					for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
						var o = i[a];
						(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
					}
					r && n.set(_C, r);
				}
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(_C, i), n.set(o, i), this.count++, r = Kd.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= sC;
			}
		}
		function Yd(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = $S, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ie(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ie(0), this.hiddenUpdates = Ie(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Xd(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Yd(e, t, n, o, c, l, u, d, s), t = Ig, !0 === a && (t |= Lg | Rg), t |= K, a = g(3, null, null, t), e.current = a, a.stateNode = e, t = ri(), ii(t), e.pooledCache = t, ii(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, Yi(a), e;
		}
		function Zd(e) {
			return e ? (e = Ng, e) : Ng;
		}
		function Qd(e, t, n, r, i, a) {
			if (Ap && typeof Ap.onScheduleFiberRoot == "function") try {
				Ap.onScheduleFiberRoot(kp, r, n);
			} catch (e) {
				jp || (jp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = Zd(i), r.context === null ? r.context = i : r.pendingContext = i, mp && pp !== null && !EC && (EC = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", w(pp) || "Unknown")), r = Zi(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = Qi(e, r, t), n !== null && (oi(t, "root.render()", null), el(n, e, t), $i(n, e, t));
		}
		function $d(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function ef(e, t) {
			$d(e, t), (e = e.alternate) && $d(e, t);
		}
		function tf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = lr(e, 67108864);
				t !== null && el(t, e, 67108864), ef(e, 67108864);
			}
		}
		function nf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = Qc(e);
				t = ze(t);
				var n = lr(e, t);
				n !== null && el(n, e, t), ef(e, t);
			}
		}
		function rf() {
			return pp;
		}
		function af(e, t, n, r) {
			var i = U.T;
			U.T = null;
			var a = Kf.p;
			try {
				Kf.p = zp, sf(e, t, n, r);
			} finally {
				Kf.p = a, U.T = i;
			}
		}
		function of(e, t, n, r) {
			var i = U.T;
			U.T = null;
			var a = Kf.p;
			try {
				Kf.p = Bp, sf(e, t, n, r);
			} finally {
				Kf.p = a, U.T = i;
			}
		}
		function sf(e, t, n, r) {
			if (LC) {
				var i = cf(r);
				if (i === null) uu(e, t, r, RC, n), df(e, r);
				else if (pf(i, e, t, n, r)) r.stopPropagation();
				else if (df(e, r), t & 4 && -1 < KC.indexOf(e)) {
					for (; i !== null;) {
						var a = qe(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Me(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Np(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										ql(a), (Ub & (Pb | Fb)) === Nb && (yx = bp() + bx, z(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = lr(a, 2), s !== null && el(s, a, 2), al(), ef(a, 2);
						}
						if (a = cf(r), a === null && uu(e, t, r, RC, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else uu(e, t, r, null, n);
			}
		}
		function cf(e) {
			return e = rn(e), lf(e);
		}
		function lf(e) {
			if (RC = null, e = Ke(e), e !== null) {
				var t = x(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = ee(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = S(t), e !== null) return e;
						e = null;
					} else if (n === 3) {
						if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
						e = null;
					} else t !== e && (e = null);
				}
			}
			return RC = e, null;
		}
		function uf(e) {
			switch (e) {
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
				case "selectstart": return zp;
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
				case "pointerleave": return Bp;
				case "message": switch (xp()) {
					case Sp: return zp;
					case Cp: return Bp;
					case wp:
					case Tp: return Vp;
					case Ep: return Hp;
					default: return Vp;
				}
				default: return Vp;
			}
		}
		function df(e, t) {
			switch (e) {
				case "focusin":
				case "focusout":
					BC = null;
					break;
				case "dragenter":
				case "dragleave":
					VC = null;
					break;
				case "mouseover":
				case "mouseout":
					HC = null;
					break;
				case "pointerover":
				case "pointerout":
					UC.delete(t.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": WC.delete(t.pointerId);
			}
		}
		function ff(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = qe(t), t !== null && tf(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function pf(e, t, n, r, i) {
			switch (t) {
				case "focusin": return BC = ff(BC, e, t, n, r, i), !0;
				case "dragenter": return VC = ff(VC, e, t, n, r, i), !0;
				case "mouseover": return HC = ff(HC, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return UC.set(a, ff(UC.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, WC.set(a, ff(WC.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function mf(e) {
			var t = Ke(e.target);
			if (t !== null) {
				var n = x(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, We(e.priority, function() {
								nf(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = S(n), t !== null) {
							e.blockedOn = t, We(e.priority, function() {
								nf(n);
							});
							return;
						}
					} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
						e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
						return;
					}
				}
			}
			e.blockedOn = null;
		}
		function hf(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = cf(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					Jm !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Jm = i, n.target.dispatchEvent(r), Jm === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Jm = null;
				} else return t = qe(n), t !== null && tf(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function gf(e, t, n) {
			hf(e) && n.delete(t);
		}
		function _f() {
			zC = !1, BC !== null && hf(BC) && (BC = null), VC !== null && hf(VC) && (VC = null), HC !== null && hf(HC) && (HC = null), UC.forEach(gf), WC.forEach(gf);
		}
		function vf(e, t) {
			e.blockedOn === t && (e.blockedOn = null, zC || (zC = !0, Tf.unstable_scheduleCallback(Tf.unstable_NormalPriority, _f)));
		}
		function yf(e) {
			qC !== e && (qC = e, Tf.unstable_scheduleCallback(Tf.unstable_NormalPriority, function() {
				qC === e && (qC = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (lf(r || n) === null) continue;
						break;
					}
					var a = qe(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), jo(a, n, r, i));
				}
			}));
		}
		function bf(e) {
			function t(t) {
				return vf(t, e);
			}
			BC !== null && vf(BC, e), VC !== null && vf(VC, e), HC !== null && vf(HC, e), UC.forEach(t), WC.forEach(t);
			for (var n = 0; n < GC.length; n++) {
				var r = GC[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < GC.length && (n = GC[0], n.blockedOn === null);) mf(n), n.blockedOn === null && GC.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[Gp] || null;
				if (typeof a == "function") o || yf(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[Gp] || null) s = o.formAction;
						else if (lf(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), yf(n);
				}
			}
		}
		function xf() {
			function e(e) {
				e.canIntercept && e.info === "react-transition" && e.intercept({
					handler: function() {
						return new Promise(function(e) {
							return i = e;
						});
					},
					focusReset: "manual",
					scroll: "manual"
				});
			}
			function t() {
				i !== null && (i(), i = null), r || setTimeout(n, 20);
			}
			function n() {
				if (!r && !navigation.transition) {
					var e = navigation.currentEntry;
					e && e.url != null && navigation.navigate(e.url, {
						state: e.getState(),
						info: "react-transition",
						history: "replace"
					});
				}
			}
			if (typeof navigation == "object") {
				var r = !1, i = null;
				return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
					r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
				};
			}
		}
		function Sf(e) {
			this._internalRoot = e;
		}
		function Cf(e) {
			this._internalRoot = e;
		}
		function wf(e) {
			e[Kp] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var Tf = r(), Ef = o(), Df = l(), H = Object.assign, Of = Symbol.for("react.element"), kf = Symbol.for("react.transitional.element"), Af = Symbol.for("react.portal"), jf = Symbol.for("react.fragment"), Mf = Symbol.for("react.strict_mode"), Nf = Symbol.for("react.profiler"), Pf = Symbol.for("react.consumer"), Ff = Symbol.for("react.context"), If = Symbol.for("react.forward_ref"), Lf = Symbol.for("react.suspense"), Rf = Symbol.for("react.suspense_list"), zf = Symbol.for("react.memo"), Bf = Symbol.for("react.lazy"), Vf = Symbol.for("react.activity"), Hf = Symbol.for("react.memo_cache_sentinel"), Uf = Symbol.iterator, Wf = Symbol.for("react.client.reference"), Gf = Array.isArray, U = Ef.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Kf = Df.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, qf = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Jf = [], Yf = [], Xf = -1, Zf = oe(null), Qf = oe(null), $f = oe(null), ep = oe(null), tp = 0, np, rp, ip, ap, op, sp, cp;
		fe.__reactDisabledLog = !0;
		var lp, up, dp = !1, fp = new (typeof WeakMap == "function" ? WeakMap : Map)(), pp = null, mp = !1, hp = Object.prototype.hasOwnProperty, gp = Tf.unstable_scheduleCallback, _p = Tf.unstable_cancelCallback, vp = Tf.unstable_shouldYield, yp = Tf.unstable_requestPaint, bp = Tf.unstable_now, xp = Tf.unstable_getCurrentPriorityLevel, Sp = Tf.unstable_ImmediatePriority, Cp = Tf.unstable_UserBlockingPriority, wp = Tf.unstable_NormalPriority, Tp = Tf.unstable_LowPriority, Ep = Tf.unstable_IdlePriority, Dp = Tf.log, Op = Tf.unstable_setDisableYieldValue, kp = null, Ap = null, jp = !1, Mp = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Np = Math.clz32 ? Math.clz32 : je, Pp = Math.log, Fp = Math.LN2, Ip = 256, Lp = 262144, Rp = 4194304, zp = 2, Bp = 8, Vp = 32, Hp = 268435456, Up = Math.random().toString(36).slice(2), Wp = "__reactFiber$" + Up, Gp = "__reactProps$" + Up, Kp = "__reactContainer$" + Up, qp = "__reactEvents$" + Up, Jp = "__reactListeners$" + Up, Yp = "__reactHandles$" + Up, Xp = "__reactResources$" + Up, Zp = "__reactMarker$" + Up, Qp = /* @__PURE__ */ new Set(), $p = {}, em = {}, tm = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, nm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), rm = {}, im = {}, am = /[\n"\\]/g, om = !1, sm = !1, cm = !1, lm = !1, um = !1, dm = !1, fm = ["value", "defaultValue"], pm = !1, mm = /["'&<>\n\t]|^\s|\s$/, hm = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), gm = "applet caption html table td th marquee object template foreignObject desc title".split(" "), _m = gm.concat(["button"]), vm = "dd dt li option optgroup p rp rt".split(" "), ym = {
			current: null,
			formTag: null,
			aTagInScope: null,
			buttonTagInScope: null,
			nobrTagInScope: null,
			pTagInButtonScope: null,
			listItemTagAutoclosing: null,
			dlItemTagAutoclosing: null,
			containerTagInScope: null,
			implicitRootScope: !1
		}, bm = {}, xm = {
			animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),
			background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),
			backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
			border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),
			borderBlockEnd: [
				"borderBlockEndColor",
				"borderBlockEndStyle",
				"borderBlockEndWidth"
			],
			borderBlockStart: [
				"borderBlockStartColor",
				"borderBlockStartStyle",
				"borderBlockStartWidth"
			],
			borderBottom: [
				"borderBottomColor",
				"borderBottomStyle",
				"borderBottomWidth"
			],
			borderColor: [
				"borderBottomColor",
				"borderLeftColor",
				"borderRightColor",
				"borderTopColor"
			],
			borderImage: [
				"borderImageOutset",
				"borderImageRepeat",
				"borderImageSlice",
				"borderImageSource",
				"borderImageWidth"
			],
			borderInlineEnd: [
				"borderInlineEndColor",
				"borderInlineEndStyle",
				"borderInlineEndWidth"
			],
			borderInlineStart: [
				"borderInlineStartColor",
				"borderInlineStartStyle",
				"borderInlineStartWidth"
			],
			borderLeft: [
				"borderLeftColor",
				"borderLeftStyle",
				"borderLeftWidth"
			],
			borderRadius: [
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius"
			],
			borderRight: [
				"borderRightColor",
				"borderRightStyle",
				"borderRightWidth"
			],
			borderStyle: [
				"borderBottomStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderTopStyle"
			],
			borderTop: [
				"borderTopColor",
				"borderTopStyle",
				"borderTopWidth"
			],
			borderWidth: [
				"borderBottomWidth",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth"
			],
			columnRule: [
				"columnRuleColor",
				"columnRuleStyle",
				"columnRuleWidth"
			],
			columns: ["columnCount", "columnWidth"],
			flex: [
				"flexBasis",
				"flexGrow",
				"flexShrink"
			],
			flexFlow: ["flexDirection", "flexWrap"],
			font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),
			fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),
			gap: ["columnGap", "rowGap"],
			grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),
			gridArea: [
				"gridColumnEnd",
				"gridColumnStart",
				"gridRowEnd",
				"gridRowStart"
			],
			gridColumn: ["gridColumnEnd", "gridColumnStart"],
			gridColumnGap: ["columnGap"],
			gridGap: ["columnGap", "rowGap"],
			gridRow: ["gridRowEnd", "gridRowStart"],
			gridRowGap: ["rowGap"],
			gridTemplate: [
				"gridTemplateAreas",
				"gridTemplateColumns",
				"gridTemplateRows"
			],
			listStyle: [
				"listStyleImage",
				"listStylePosition",
				"listStyleType"
			],
			margin: [
				"marginBottom",
				"marginLeft",
				"marginRight",
				"marginTop"
			],
			marker: [
				"markerEnd",
				"markerMid",
				"markerStart"
			],
			mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),
			maskPosition: ["maskPositionX", "maskPositionY"],
			outline: [
				"outlineColor",
				"outlineStyle",
				"outlineWidth"
			],
			overflow: ["overflowX", "overflowY"],
			padding: [
				"paddingBottom",
				"paddingLeft",
				"paddingRight",
				"paddingTop"
			],
			placeContent: ["alignContent", "justifyContent"],
			placeItems: ["alignItems", "justifyItems"],
			placeSelf: ["alignSelf", "justifySelf"],
			textDecoration: [
				"textDecorationColor",
				"textDecorationLine",
				"textDecorationStyle"
			],
			textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
			transition: [
				"transitionDelay",
				"transitionDuration",
				"transitionProperty",
				"transitionTimingFunction"
			],
			wordWrap: ["overflowWrap"]
		}, Sm = /([A-Z])/g, Cm = /^ms-/, wm = /^(?:webkit|moz|o)[A-Z]/, Tm = /^-ms-/, Em = /-(.)/g, Dm = /;\s*$/, Om = {}, km = {}, Am = !1, jm = !1, Mm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Nm = "http://www.w3.org/1998/Math/MathML", Pm = "http://www.w3.org/2000/svg", Fm = /* @__PURE__ */ new Map([
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
		]), Im = {
			accept: "accept",
			acceptcharset: "acceptCharset",
			"accept-charset": "acceptCharset",
			accesskey: "accessKey",
			action: "action",
			allowfullscreen: "allowFullScreen",
			alt: "alt",
			as: "as",
			async: "async",
			autocapitalize: "autoCapitalize",
			autocomplete: "autoComplete",
			autocorrect: "autoCorrect",
			autofocus: "autoFocus",
			autoplay: "autoPlay",
			autosave: "autoSave",
			capture: "capture",
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			challenge: "challenge",
			charset: "charSet",
			checked: "checked",
			children: "children",
			cite: "cite",
			class: "className",
			classid: "classID",
			classname: "className",
			cols: "cols",
			colspan: "colSpan",
			content: "content",
			contenteditable: "contentEditable",
			contextmenu: "contextMenu",
			controls: "controls",
			controlslist: "controlsList",
			coords: "coords",
			crossorigin: "crossOrigin",
			dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
			data: "data",
			datetime: "dateTime",
			default: "default",
			defaultchecked: "defaultChecked",
			defaultvalue: "defaultValue",
			defer: "defer",
			dir: "dir",
			disabled: "disabled",
			disablepictureinpicture: "disablePictureInPicture",
			disableremoteplayback: "disableRemotePlayback",
			download: "download",
			draggable: "draggable",
			enctype: "encType",
			enterkeyhint: "enterKeyHint",
			fetchpriority: "fetchPriority",
			for: "htmlFor",
			form: "form",
			formmethod: "formMethod",
			formaction: "formAction",
			formenctype: "formEncType",
			formnovalidate: "formNoValidate",
			formtarget: "formTarget",
			frameborder: "frameBorder",
			headers: "headers",
			height: "height",
			hidden: "hidden",
			high: "high",
			href: "href",
			hreflang: "hrefLang",
			htmlfor: "htmlFor",
			httpequiv: "httpEquiv",
			"http-equiv": "httpEquiv",
			icon: "icon",
			id: "id",
			imagesizes: "imageSizes",
			imagesrcset: "imageSrcSet",
			inert: "inert",
			innerhtml: "innerHTML",
			inputmode: "inputMode",
			integrity: "integrity",
			is: "is",
			itemid: "itemID",
			itemprop: "itemProp",
			itemref: "itemRef",
			itemscope: "itemScope",
			itemtype: "itemType",
			keyparams: "keyParams",
			keytype: "keyType",
			kind: "kind",
			label: "label",
			lang: "lang",
			list: "list",
			loop: "loop",
			low: "low",
			manifest: "manifest",
			marginwidth: "marginWidth",
			marginheight: "marginHeight",
			max: "max",
			maxlength: "maxLength",
			media: "media",
			mediagroup: "mediaGroup",
			method: "method",
			min: "min",
			minlength: "minLength",
			multiple: "multiple",
			muted: "muted",
			name: "name",
			nomodule: "noModule",
			nonce: "nonce",
			novalidate: "noValidate",
			open: "open",
			optimum: "optimum",
			pattern: "pattern",
			placeholder: "placeholder",
			playsinline: "playsInline",
			poster: "poster",
			preload: "preload",
			profile: "profile",
			radiogroup: "radioGroup",
			readonly: "readOnly",
			referrerpolicy: "referrerPolicy",
			rel: "rel",
			required: "required",
			reversed: "reversed",
			role: "role",
			rows: "rows",
			rowspan: "rowSpan",
			sandbox: "sandbox",
			scope: "scope",
			scoped: "scoped",
			scrolling: "scrolling",
			seamless: "seamless",
			selected: "selected",
			shape: "shape",
			size: "size",
			sizes: "sizes",
			span: "span",
			spellcheck: "spellCheck",
			src: "src",
			srcdoc: "srcDoc",
			srclang: "srcLang",
			srcset: "srcSet",
			start: "start",
			step: "step",
			style: "style",
			summary: "summary",
			tabindex: "tabIndex",
			target: "target",
			title: "title",
			type: "type",
			usemap: "useMap",
			value: "value",
			width: "width",
			wmode: "wmode",
			wrap: "wrap",
			about: "about",
			accentheight: "accentHeight",
			"accent-height": "accentHeight",
			accumulate: "accumulate",
			additive: "additive",
			alignmentbaseline: "alignmentBaseline",
			"alignment-baseline": "alignmentBaseline",
			allowreorder: "allowReorder",
			alphabetic: "alphabetic",
			amplitude: "amplitude",
			arabicform: "arabicForm",
			"arabic-form": "arabicForm",
			ascent: "ascent",
			attributename: "attributeName",
			attributetype: "attributeType",
			autoreverse: "autoReverse",
			azimuth: "azimuth",
			basefrequency: "baseFrequency",
			baselineshift: "baselineShift",
			"baseline-shift": "baselineShift",
			baseprofile: "baseProfile",
			bbox: "bbox",
			begin: "begin",
			bias: "bias",
			by: "by",
			calcmode: "calcMode",
			capheight: "capHeight",
			"cap-height": "capHeight",
			clip: "clip",
			clippath: "clipPath",
			"clip-path": "clipPath",
			clippathunits: "clipPathUnits",
			cliprule: "clipRule",
			"clip-rule": "clipRule",
			color: "color",
			colorinterpolation: "colorInterpolation",
			"color-interpolation": "colorInterpolation",
			colorinterpolationfilters: "colorInterpolationFilters",
			"color-interpolation-filters": "colorInterpolationFilters",
			colorprofile: "colorProfile",
			"color-profile": "colorProfile",
			colorrendering: "colorRendering",
			"color-rendering": "colorRendering",
			contentscripttype: "contentScriptType",
			contentstyletype: "contentStyleType",
			cursor: "cursor",
			cx: "cx",
			cy: "cy",
			d: "d",
			datatype: "datatype",
			decelerate: "decelerate",
			descent: "descent",
			diffuseconstant: "diffuseConstant",
			direction: "direction",
			display: "display",
			divisor: "divisor",
			dominantbaseline: "dominantBaseline",
			"dominant-baseline": "dominantBaseline",
			dur: "dur",
			dx: "dx",
			dy: "dy",
			edgemode: "edgeMode",
			elevation: "elevation",
			enablebackground: "enableBackground",
			"enable-background": "enableBackground",
			end: "end",
			exponent: "exponent",
			externalresourcesrequired: "externalResourcesRequired",
			fill: "fill",
			fillopacity: "fillOpacity",
			"fill-opacity": "fillOpacity",
			fillrule: "fillRule",
			"fill-rule": "fillRule",
			filter: "filter",
			filterres: "filterRes",
			filterunits: "filterUnits",
			floodopacity: "floodOpacity",
			"flood-opacity": "floodOpacity",
			floodcolor: "floodColor",
			"flood-color": "floodColor",
			focusable: "focusable",
			fontfamily: "fontFamily",
			"font-family": "fontFamily",
			fontsize: "fontSize",
			"font-size": "fontSize",
			fontsizeadjust: "fontSizeAdjust",
			"font-size-adjust": "fontSizeAdjust",
			fontstretch: "fontStretch",
			"font-stretch": "fontStretch",
			fontstyle: "fontStyle",
			"font-style": "fontStyle",
			fontvariant: "fontVariant",
			"font-variant": "fontVariant",
			fontweight: "fontWeight",
			"font-weight": "fontWeight",
			format: "format",
			from: "from",
			fx: "fx",
			fy: "fy",
			g1: "g1",
			g2: "g2",
			glyphname: "glyphName",
			"glyph-name": "glyphName",
			glyphorientationhorizontal: "glyphOrientationHorizontal",
			"glyph-orientation-horizontal": "glyphOrientationHorizontal",
			glyphorientationvertical: "glyphOrientationVertical",
			"glyph-orientation-vertical": "glyphOrientationVertical",
			glyphref: "glyphRef",
			gradienttransform: "gradientTransform",
			gradientunits: "gradientUnits",
			hanging: "hanging",
			horizadvx: "horizAdvX",
			"horiz-adv-x": "horizAdvX",
			horizoriginx: "horizOriginX",
			"horiz-origin-x": "horizOriginX",
			ideographic: "ideographic",
			imagerendering: "imageRendering",
			"image-rendering": "imageRendering",
			in2: "in2",
			in: "in",
			inlist: "inlist",
			intercept: "intercept",
			k1: "k1",
			k2: "k2",
			k3: "k3",
			k4: "k4",
			k: "k",
			kernelmatrix: "kernelMatrix",
			kernelunitlength: "kernelUnitLength",
			kerning: "kerning",
			keypoints: "keyPoints",
			keysplines: "keySplines",
			keytimes: "keyTimes",
			lengthadjust: "lengthAdjust",
			letterspacing: "letterSpacing",
			"letter-spacing": "letterSpacing",
			lightingcolor: "lightingColor",
			"lighting-color": "lightingColor",
			limitingconeangle: "limitingConeAngle",
			local: "local",
			markerend: "markerEnd",
			"marker-end": "markerEnd",
			markerheight: "markerHeight",
			markermid: "markerMid",
			"marker-mid": "markerMid",
			markerstart: "markerStart",
			"marker-start": "markerStart",
			markerunits: "markerUnits",
			markerwidth: "markerWidth",
			mask: "mask",
			maskcontentunits: "maskContentUnits",
			maskunits: "maskUnits",
			mathematical: "mathematical",
			mode: "mode",
			numoctaves: "numOctaves",
			offset: "offset",
			opacity: "opacity",
			operator: "operator",
			order: "order",
			orient: "orient",
			orientation: "orientation",
			origin: "origin",
			overflow: "overflow",
			overlineposition: "overlinePosition",
			"overline-position": "overlinePosition",
			overlinethickness: "overlineThickness",
			"overline-thickness": "overlineThickness",
			paintorder: "paintOrder",
			"paint-order": "paintOrder",
			panose1: "panose1",
			"panose-1": "panose1",
			pathlength: "pathLength",
			patterncontentunits: "patternContentUnits",
			patterntransform: "patternTransform",
			patternunits: "patternUnits",
			pointerevents: "pointerEvents",
			"pointer-events": "pointerEvents",
			points: "points",
			pointsatx: "pointsAtX",
			pointsaty: "pointsAtY",
			pointsatz: "pointsAtZ",
			popover: "popover",
			popovertarget: "popoverTarget",
			popovertargetaction: "popoverTargetAction",
			prefix: "prefix",
			preservealpha: "preserveAlpha",
			preserveaspectratio: "preserveAspectRatio",
			primitiveunits: "primitiveUnits",
			property: "property",
			r: "r",
			radius: "radius",
			refx: "refX",
			refy: "refY",
			renderingintent: "renderingIntent",
			"rendering-intent": "renderingIntent",
			repeatcount: "repeatCount",
			repeatdur: "repeatDur",
			requiredextensions: "requiredExtensions",
			requiredfeatures: "requiredFeatures",
			resource: "resource",
			restart: "restart",
			result: "result",
			results: "results",
			rotate: "rotate",
			rx: "rx",
			ry: "ry",
			scale: "scale",
			security: "security",
			seed: "seed",
			shaperendering: "shapeRendering",
			"shape-rendering": "shapeRendering",
			slope: "slope",
			spacing: "spacing",
			specularconstant: "specularConstant",
			specularexponent: "specularExponent",
			speed: "speed",
			spreadmethod: "spreadMethod",
			startoffset: "startOffset",
			stddeviation: "stdDeviation",
			stemh: "stemh",
			stemv: "stemv",
			stitchtiles: "stitchTiles",
			stopcolor: "stopColor",
			"stop-color": "stopColor",
			stopopacity: "stopOpacity",
			"stop-opacity": "stopOpacity",
			strikethroughposition: "strikethroughPosition",
			"strikethrough-position": "strikethroughPosition",
			strikethroughthickness: "strikethroughThickness",
			"strikethrough-thickness": "strikethroughThickness",
			string: "string",
			stroke: "stroke",
			strokedasharray: "strokeDasharray",
			"stroke-dasharray": "strokeDasharray",
			strokedashoffset: "strokeDashoffset",
			"stroke-dashoffset": "strokeDashoffset",
			strokelinecap: "strokeLinecap",
			"stroke-linecap": "strokeLinecap",
			strokelinejoin: "strokeLinejoin",
			"stroke-linejoin": "strokeLinejoin",
			strokemiterlimit: "strokeMiterlimit",
			"stroke-miterlimit": "strokeMiterlimit",
			strokewidth: "strokeWidth",
			"stroke-width": "strokeWidth",
			strokeopacity: "strokeOpacity",
			"stroke-opacity": "strokeOpacity",
			suppresscontenteditablewarning: "suppressContentEditableWarning",
			suppresshydrationwarning: "suppressHydrationWarning",
			surfacescale: "surfaceScale",
			systemlanguage: "systemLanguage",
			tablevalues: "tableValues",
			targetx: "targetX",
			targety: "targetY",
			textanchor: "textAnchor",
			"text-anchor": "textAnchor",
			textdecoration: "textDecoration",
			"text-decoration": "textDecoration",
			textlength: "textLength",
			textrendering: "textRendering",
			"text-rendering": "textRendering",
			to: "to",
			transform: "transform",
			transformorigin: "transformOrigin",
			"transform-origin": "transformOrigin",
			typeof: "typeof",
			u1: "u1",
			u2: "u2",
			underlineposition: "underlinePosition",
			"underline-position": "underlinePosition",
			underlinethickness: "underlineThickness",
			"underline-thickness": "underlineThickness",
			unicode: "unicode",
			unicodebidi: "unicodeBidi",
			"unicode-bidi": "unicodeBidi",
			unicoderange: "unicodeRange",
			"unicode-range": "unicodeRange",
			unitsperem: "unitsPerEm",
			"units-per-em": "unitsPerEm",
			unselectable: "unselectable",
			valphabetic: "vAlphabetic",
			"v-alphabetic": "vAlphabetic",
			values: "values",
			vectoreffect: "vectorEffect",
			"vector-effect": "vectorEffect",
			version: "version",
			vertadvy: "vertAdvY",
			"vert-adv-y": "vertAdvY",
			vertoriginx: "vertOriginX",
			"vert-origin-x": "vertOriginX",
			vertoriginy: "vertOriginY",
			"vert-origin-y": "vertOriginY",
			vhanging: "vHanging",
			"v-hanging": "vHanging",
			videographic: "vIdeographic",
			"v-ideographic": "vIdeographic",
			viewbox: "viewBox",
			viewtarget: "viewTarget",
			visibility: "visibility",
			vmathematical: "vMathematical",
			"v-mathematical": "vMathematical",
			vocab: "vocab",
			widths: "widths",
			wordspacing: "wordSpacing",
			"word-spacing": "wordSpacing",
			writingmode: "writingMode",
			"writing-mode": "writingMode",
			x1: "x1",
			x2: "x2",
			x: "x",
			xchannelselector: "xChannelSelector",
			xheight: "xHeight",
			"x-height": "xHeight",
			xlinkactuate: "xlinkActuate",
			"xlink:actuate": "xlinkActuate",
			xlinkarcrole: "xlinkArcrole",
			"xlink:arcrole": "xlinkArcrole",
			xlinkhref: "xlinkHref",
			"xlink:href": "xlinkHref",
			xlinkrole: "xlinkRole",
			"xlink:role": "xlinkRole",
			xlinkshow: "xlinkShow",
			"xlink:show": "xlinkShow",
			xlinktitle: "xlinkTitle",
			"xlink:title": "xlinkTitle",
			xlinktype: "xlinkType",
			"xlink:type": "xlinkType",
			xmlbase: "xmlBase",
			"xml:base": "xmlBase",
			xmllang: "xmlLang",
			"xml:lang": "xmlLang",
			xmlns: "xmlns",
			"xml:space": "xmlSpace",
			xmlnsxlink: "xmlnsXlink",
			"xmlns:xlink": "xmlnsXlink",
			xmlspace: "xmlSpace",
			y1: "y1",
			y2: "y2",
			y: "y",
			ychannelselector: "yChannelSelector",
			z: "z",
			zoomandpan: "zoomAndPan"
		}, Lm = {
			"aria-current": 0,
			"aria-description": 0,
			"aria-details": 0,
			"aria-disabled": 0,
			"aria-hidden": 0,
			"aria-invalid": 0,
			"aria-keyshortcuts": 0,
			"aria-label": 0,
			"aria-roledescription": 0,
			"aria-autocomplete": 0,
			"aria-checked": 0,
			"aria-expanded": 0,
			"aria-haspopup": 0,
			"aria-level": 0,
			"aria-modal": 0,
			"aria-multiline": 0,
			"aria-multiselectable": 0,
			"aria-orientation": 0,
			"aria-placeholder": 0,
			"aria-pressed": 0,
			"aria-readonly": 0,
			"aria-required": 0,
			"aria-selected": 0,
			"aria-sort": 0,
			"aria-valuemax": 0,
			"aria-valuemin": 0,
			"aria-valuenow": 0,
			"aria-valuetext": 0,
			"aria-atomic": 0,
			"aria-busy": 0,
			"aria-live": 0,
			"aria-relevant": 0,
			"aria-dropeffect": 0,
			"aria-grabbed": 0,
			"aria-activedescendant": 0,
			"aria-colcount": 0,
			"aria-colindex": 0,
			"aria-colspan": 0,
			"aria-controls": 0,
			"aria-describedby": 0,
			"aria-errormessage": 0,
			"aria-flowto": 0,
			"aria-labelledby": 0,
			"aria-owns": 0,
			"aria-posinset": 0,
			"aria-rowcount": 0,
			"aria-rowindex": 0,
			"aria-rowspan": 0,
			"aria-setsize": 0,
			"aria-braillelabel": 0,
			"aria-brailleroledescription": 0,
			"aria-colindextext": 0,
			"aria-rowindextext": 0
		}, Rm = {}, zm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Bm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Vm = !1, Hm = {}, Um = /^on./, Wm = /^on[^A-Z]/, Gm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Km = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), qm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, Jm = null, Ym = null, Xm = null, Zm = !1, Qm = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), $m = !1;
		if (Qm) try {
			var eh = {};
			Object.defineProperty(eh, "passive", { get: function() {
				$m = !0;
			} }), window.addEventListener("test", eh, eh), window.removeEventListener("test", eh, eh);
		} catch {
			$m = !1;
		}
		var th = null, nh = null, rh = null, ih = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, ah = fn(ih), oh = H({}, ih, {
			view: 0,
			detail: 0
		}), sh = fn(oh), ch, lh, uh, dh = H({}, oh, {
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
			getModifierState: mn,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== uh && (uh && e.type === "mousemove" ? (ch = e.screenX - uh.screenX, lh = e.screenY - uh.screenY) : lh = ch = 0, uh = e), ch);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : lh;
			}
		}), fh = fn(dh), ph = fn(H({}, dh, { dataTransfer: 0 })), mh = fn(H({}, oh, { relatedTarget: 0 })), hh = fn(H({}, ih, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), gh = fn(H({}, ih, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), _h = fn(H({}, ih, { data: 0 })), vh = _h, yh = {
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
		}, bh = {
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
		}, xh = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, Sh = fn(H({}, oh, {
			key: function(e) {
				if (e.key) {
					var t = yh[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = ln(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? bh[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: mn,
			charCode: function(e) {
				return e.type === "keypress" ? ln(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? ln(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), Ch = fn(H({}, dh, {
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
		})), wh = fn(H({}, oh, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: mn
		})), Th = fn(H({}, ih, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), Eh = fn(H({}, dh, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), Dh = fn(H({}, ih, {
			newState: 0,
			oldState: 0
		})), Oh = [
			9,
			13,
			27,
			32
		], kh = 229, Ah = Qm && "CompositionEvent" in window, jh = null;
		Qm && "documentMode" in document && (jh = document.documentMode);
		var Mh = Qm && "TextEvent" in window && !jh, Nh = Qm && (!Ah || jh && 8 < jh && 11 >= jh), Ph = 32, Fh = String.fromCharCode(Ph), Ih = !1, Lh = !1, Rh = {
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
		}, zh = null, Bh = null, Vh = !1;
		Qm && (Vh = bn("input") && (!document.documentMode || 9 < document.documentMode));
		var Hh = typeof Object.is == "function" ? Object.is : jn, Uh = Qm && "documentMode" in document && 11 >= document.documentMode, Wh = null, Gh = null, Kh = null, qh = !1, Jh = {
			animationend: zn("Animation", "AnimationEnd"),
			animationiteration: zn("Animation", "AnimationIteration"),
			animationstart: zn("Animation", "AnimationStart"),
			transitionrun: zn("Transition", "TransitionRun"),
			transitionstart: zn("Transition", "TransitionStart"),
			transitioncancel: zn("Transition", "TransitionCancel"),
			transitionend: zn("Transition", "TransitionEnd")
		}, Yh = {}, Xh = {};
		Qm && (Xh = document.createElement("div").style, "AnimationEvent" in window || (delete Jh.animationend.animation, delete Jh.animationiteration.animation, delete Jh.animationstart.animation), "TransitionEvent" in window || delete Jh.transitionend.transition);
		var Zh = Bn("animationend"), Qh = Bn("animationiteration"), $h = Bn("animationstart"), eg = Bn("transitionrun"), tg = Bn("transitionstart"), ng = Bn("transitioncancel"), rg = Bn("transitionend"), ig = /* @__PURE__ */ new Map(), ag = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		ag.push("scrollEnd");
		var og = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var sg = performance, cg = function() {
			return sg.now();
		};
		else {
			var lg = Date;
			cg = function() {
				return lg.now();
			};
		}
		var ug = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, dg = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", fg = 0, pg = 1, mg = 2, hg = 3, gg = "–\xA0", _g = "+\xA0", vg = " \xA0", yg = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", bg = "Components ⚛", W = "Scheduler ⚛", xg = "Blocking", Sg = !1, Cg = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: bg
		}, wg = {
			start: -0,
			end: -0,
			detail: { devtools: Cg }
		}, Tg = ["Changed Props", ""], Eg = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", Dg = ["Changed Props", Eg], Og = 1, kg = 2, Ag = [], jg = 0, Mg = 0, Ng = {};
		Object.freeze(Ng);
		var Pg = null, Fg = null, G = 0, Ig = 1, K = 2, Lg = 8, Rg = 16, zg = 32, Bg = !1;
		try {
			Object.preventExtensions({});
		} catch {
			Bg = !0;
		}
		var Vg = /* @__PURE__ */ new WeakMap(), Hg = [], Ug = 0, Wg = null, Gg = 0, Kg = [], qg = 0, Jg = null, Yg = 1, Xg = "", Zg = null, Qg = null, $g = !1, e_ = !1, t_ = null, n_ = null, r_ = !1, i_ = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), a_ = oe(null), o_ = oe(null), s_ = {}, c_ = null, l_ = null, u_ = !1, d_ = typeof AbortController < "u" ? AbortController : function() {
			var e = [], t = this.signal = {
				aborted: !1,
				addEventListener: function(t, n) {
					e.push(n);
				}
			};
			this.abort = function() {
				t.aborted = !0, e.forEach(function(e) {
					return e();
				});
			};
		}, f_ = Tf.unstable_scheduleCallback, p_ = Tf.unstable_NormalPriority, m_ = {
			$$typeof: Ff,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, h_ = Tf.unstable_now, g_ = console.createTask ? console.createTask : function() {
			return null;
		}, __ = 1, v_ = 2, y_ = -0, b_ = -0, x_ = -0, S_ = null, C_ = -1.1, w_ = -0, T_ = -0, q = -1.1, J = -1.1, E_ = null, D_ = !1, O_ = -0, k_ = -1.1, A_ = null, j_ = 0, M_ = null, N_ = null, P_ = -1.1, F_ = null, I_ = -1.1, L_ = -1.1, R_ = -0, z_ = -1.1, B_ = -1.1, V_ = 0, H_ = null, U_ = null, W_ = null, G_ = -1.1, K_ = null, q_ = -1.1, J_ = -1.1, Y_ = -0, X_ = -0, Z_ = 0, Q_ = null, $_ = 0, ev = -1.1, tv = !1, nv = !1, rv = null, iv = 0, av = 0, ov = null, sv = U.S;
		U.S = function(e, t) {
			if (_x = bp(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > z_ && 0 > B_) {
					z_ = h_();
					var n = Wu(), r = Uu();
					(n !== q_ || r !== K_) && (q_ = -1.1), G_ = n, K_ = r;
				}
				Ti(e, t);
			}
			sv !== null && sv(e, t);
		};
		var cv = oe(null), lv = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, uv = [], dv = [], fv = [], pv = [], mv = [], hv = [], gv = /* @__PURE__ */ new Set();
		lv.recordUnsafeLifecycleWarnings = function(e, t) {
			gv.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && uv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillMount == "function" && dv.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && fv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillReceiveProps == "function" && pv.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && mv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillUpdate == "function" && hv.push(e));
		}, lv.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < uv.length && (uv.forEach(function(t) {
				e.add(w(t) || "Component"), gv.add(t.type);
			}), uv = []);
			var t = /* @__PURE__ */ new Set();
			0 < dv.length && (dv.forEach(function(e) {
				t.add(w(e) || "Component"), gv.add(e.type);
			}), dv = []);
			var n = /* @__PURE__ */ new Set();
			0 < fv.length && (fv.forEach(function(e) {
				n.add(w(e) || "Component"), gv.add(e.type);
			}), fv = []);
			var r = /* @__PURE__ */ new Set();
			0 < pv.length && (pv.forEach(function(e) {
				r.add(w(e) || "Component"), gv.add(e.type);
			}), pv = []);
			var i = /* @__PURE__ */ new Set();
			0 < mv.length && (mv.forEach(function(e) {
				i.add(w(e) || "Component"), gv.add(e.type);
			}), mv = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < hv.length && (hv.forEach(function(e) {
				a.add(w(e) || "Component"), gv.add(e.type);
			}), hv = []), 0 < t.size) {
				var o = h(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = h(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = h(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = h(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = h(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = h(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var _v = /* @__PURE__ */ new Map(), vv = /* @__PURE__ */ new Set();
		lv.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & Lg && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !vv.has(e.type) && (r = _v.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], _v.set(n, r)), r.push(e));
		}, lv.flushLegacyContextWarning = function() {
			_v.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(w(e) || "Component"), vv.add(e.type);
					});
					var r = h(n);
					O(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, lv.discardPendingWarnings = function() {
			uv = [], dv = [], fv = [], pv = [], mv = [], hv = [], _v = /* @__PURE__ */ new Map();
		};
		var yv = { react_stack_bottom_frame: function(e, t, n) {
			var r = mp;
			mp = !0;
			try {
				return e(t, n);
			} finally {
				mp = r;
			}
		} }, bv = yv.react_stack_bottom_frame.bind(yv), xv = { react_stack_bottom_frame: function(e) {
			var t = mp;
			mp = !0;
			try {
				return e.render();
			} finally {
				mp = t;
			}
		} }, Sv = xv.react_stack_bottom_frame.bind(xv), Cv = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				Pl(e, e.return, t);
			}
		} }, wv = Cv.react_stack_bottom_frame.bind(Cv), Tv = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				Pl(e, e.return, t);
			}
		} }, Ev = Tv.react_stack_bottom_frame.bind(Tv), Dv = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, Ov = Dv.react_stack_bottom_frame.bind(Dv), kv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				Pl(e, t, n);
			}
		} }, Av = kv.react_stack_bottom_frame.bind(kv), jv = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Mv = jv.react_stack_bottom_frame.bind(jv), Nv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				Pl(e, t, n);
			}
		} }, Pv = Nv.react_stack_bottom_frame.bind(Nv), Fv = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Iv = Fv.react_stack_bottom_frame.bind(Fv), Lv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), Rv = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), zv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Bv = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Vv = null, Hv = !1, Uv = null, Wv = 0, Y = null, Gv, Kv = Gv = !1, qv = {}, Jv = {}, Yv = {};
		m = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = w(e), i = r || "null";
				if (!qv[i]) {
					qv[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = w(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = w(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), O(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var Xv = qi(!0), Zv = qi(!1), Qv = 0, $v = 1, ey = 2, ty = 3, ny = !1, ry = !1, iy = null, ay = !1, oy = oe(null), sy = oe(0), cy = oe(null), ly = null, uy = 1, dy = 2, fy = oe(0), py = 0, my = 1, hy = 2, gy = 4, _y = 8, vy, yy = /* @__PURE__ */ new Set(), by = /* @__PURE__ */ new Set(), xy = /* @__PURE__ */ new Set(), Sy = /* @__PURE__ */ new Set(), Cy = 0, X = null, wy = null, Ty = null, Ey = !1, Dy = !1, Oy = !1, ky = 0, Ay = 0, jy = null, My = 0, Ny = 25, Z = null, Py = null, Fy = -1, Iy = !1, Ly = {
			readContext: ei,
			use: Aa,
			useCallback: _a,
			useContext: _a,
			useEffect: _a,
			useImperativeHandle: _a,
			useLayoutEffect: _a,
			useInsertionEffect: _a,
			useMemo: _a,
			useReducer: _a,
			useRef: _a,
			useState: _a,
			useDebugValue: _a,
			useDeferredValue: _a,
			useTransition: _a,
			useSyncExternalStore: _a,
			useId: _a,
			useHostTransitionStatus: _a,
			useFormState: _a,
			useActionState: _a,
			useOptimistic: _a,
			useMemoCache: _a,
			useCacheRefresh: _a
		};
		Ly.useEffectEvent = _a;
		var Ry = null, zy = null, By = null, Vy = null, Hy = null, Uy = null, Wy = null;
		Ry = {
			readContext: function(e) {
				return ei(e);
			},
			use: Aa,
			useCallback: function(e, t) {
				return Z = "useCallback", I(), ha(t), bo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", I(), ei(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", I(), ha(t), po(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", I(), ha(n), vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", I(), ha(t), uo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", I(), ha(t), go(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", I(), ha(t);
				var n = U.H;
				U.H = Hy;
				try {
					return So(e, t);
				} finally {
					U.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", I();
				var r = U.H;
				U.H = Hy;
				try {
					return Na(e, t, n);
				} finally {
					U.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", I(), lo(e);
			},
			useState: function(e) {
				Z = "useState", I();
				var t = U.H;
				U.H = Hy;
				try {
					return Ga(e);
				} finally {
					U.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", I(), wo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", I(), Po();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", I(), La(e, t, n);
			},
			useId: function() {
				return Z = "useId", I(), Ro();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", I(), ga(), ro(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", I(), ro(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", I(), Ka(e);
			},
			useHostTransitionStatus: Lo,
			useMemoCache: ja,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), zo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", I(), ho(e);
			}
		}, zy = {
			readContext: function(e) {
				return ei(e);
			},
			use: Aa,
			useCallback: function(e, t) {
				return Z = "useCallback", L(), bo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", L(), ei(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", L(), po(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", L(), vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", L(), uo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", L(), go(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", L();
				var n = U.H;
				U.H = Hy;
				try {
					return So(e, t);
				} finally {
					U.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", L();
				var r = U.H;
				U.H = Hy;
				try {
					return Na(e, t, n);
				} finally {
					U.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", L(), lo(e);
			},
			useState: function(e) {
				Z = "useState", L();
				var t = U.H;
				U.H = Hy;
				try {
					return Ga(e);
				} finally {
					U.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", L(), wo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", L(), Po();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", L(), La(e, t, n);
			},
			useId: function() {
				return Z = "useId", L(), Ro();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", L(), ro(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", L(), ga(), ro(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", L(), Ka(e);
			},
			useHostTransitionStatus: Lo,
			useMemoCache: ja,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), zo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", L(), ho(e);
			}
		}, By = {
			readContext: function(e) {
				return ei(e);
			},
			use: Aa,
			useCallback: function(e, t) {
				return Z = "useCallback", L(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", L(), ei(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", L(), fo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", L(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", L(), fo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", L(), fo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", L();
				var n = U.H;
				U.H = Uy;
				try {
					return Co(e, t);
				} finally {
					U.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", L();
				var r = U.H;
				U.H = Uy;
				try {
					return Pa(e, t, n);
				} finally {
					U.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", L(), Da().memoizedState;
			},
			useState: function() {
				Z = "useState", L();
				var e = U.H;
				U.H = Uy;
				try {
					return Pa(Ma);
				} finally {
					U.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", L(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", L(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", L(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", L(), Da().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", L(), ga(), io(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", L(), io(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", L(), qa(e, t);
			},
			useHostTransitionStatus: Lo,
			useMemoCache: ja,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), Da().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", L(), R(e);
			}
		}, Vy = {
			readContext: function(e) {
				return ei(e);
			},
			use: Aa,
			useCallback: function(e, t) {
				return Z = "useCallback", L(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", L(), ei(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", L(), fo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", L(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", L(), fo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", L(), fo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", L();
				var n = U.H;
				U.H = Wy;
				try {
					return Co(e, t);
				} finally {
					U.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", L();
				var r = U.H;
				U.H = Wy;
				try {
					return Ia(e, t, n);
				} finally {
					U.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", L(), Da().memoizedState;
			},
			useState: function() {
				Z = "useState", L();
				var e = U.H;
				U.H = Wy;
				try {
					return Ia(Ma);
				} finally {
					U.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", L(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", L(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", L(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", L(), Da().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", L(), ga(), so(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", L(), so(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", L(), Ya(e, t);
			},
			useHostTransitionStatus: Lo,
			useMemoCache: ja,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), Da().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", L(), R(e);
			}
		}, Hy = {
			readContext: function(e) {
				return f(), ei(e);
			},
			use: function(e) {
				return d(), Aa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", d(), I(), bo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", d(), I(), ei(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", d(), I(), po(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", d(), I(), vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", d(), I(), uo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", d(), I(), go(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", d(), I();
				var n = U.H;
				U.H = Hy;
				try {
					return So(e, t);
				} finally {
					U.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", d(), I();
				var r = U.H;
				U.H = Hy;
				try {
					return Na(e, t, n);
				} finally {
					U.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", d(), I(), lo(e);
			},
			useState: function(e) {
				Z = "useState", d(), I();
				var t = U.H;
				U.H = Hy;
				try {
					return Ga(e);
				} finally {
					U.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", d(), I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", d(), I(), wo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", d(), I(), Po();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", d(), I(), La(e, t, n);
			},
			useId: function() {
				return Z = "useId", d(), I(), Ro();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", d(), I(), ro(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", d(), I(), ro(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", d(), I(), Ka(e);
			},
			useMemoCache: function(e) {
				return d(), ja(e);
			},
			useHostTransitionStatus: Lo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), zo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", d(), I(), ho(e);
			}
		}, Uy = {
			readContext: function(e) {
				return f(), ei(e);
			},
			use: function(e) {
				return d(), Aa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", d(), L(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", d(), L(), ei(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", d(), L(), fo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", d(), L(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", d(), L(), fo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", d(), L(), fo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", d(), L();
				var n = U.H;
				U.H = Uy;
				try {
					return Co(e, t);
				} finally {
					U.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", d(), L();
				var r = U.H;
				U.H = Uy;
				try {
					return Pa(e, t, n);
				} finally {
					U.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", d(), L(), Da().memoizedState;
			},
			useState: function() {
				Z = "useState", d(), L();
				var e = U.H;
				U.H = Uy;
				try {
					return Pa(Ma);
				} finally {
					U.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", d(), L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", d(), L(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", d(), L(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", d(), L(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", d(), L(), Da().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", d(), L(), io(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", d(), L(), io(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", d(), L(), qa(e, t);
			},
			useMemoCache: function(e) {
				return d(), ja(e);
			},
			useHostTransitionStatus: Lo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), Da().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", d(), L(), R(e);
			}
		}, Wy = {
			readContext: function(e) {
				return f(), ei(e);
			},
			use: function(e) {
				return d(), Aa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", d(), L(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", d(), L(), ei(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", d(), L(), fo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", d(), L(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", d(), L(), fo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", d(), L(), fo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", d(), L();
				var n = U.H;
				U.H = Uy;
				try {
					return Co(e, t);
				} finally {
					U.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", d(), L();
				var r = U.H;
				U.H = Uy;
				try {
					return Ia(e, t, n);
				} finally {
					U.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", d(), L(), Da().memoizedState;
			},
			useState: function() {
				Z = "useState", d(), L();
				var e = U.H;
				U.H = Uy;
				try {
					return Ia(Ma);
				} finally {
					U.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", d(), L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", d(), L(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", d(), L(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", d(), L(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", d(), L(), Da().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", d(), L(), so(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", d(), L(), so(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", d(), L(), Ya(e, t);
			},
			useMemoCache: function(e) {
				return d(), ja(e);
			},
			useHostTransitionStatus: Lo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), Da().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", d(), L(), R(e);
			}
		};
		var Gy = {}, Ky = /* @__PURE__ */ new Set(), qy = /* @__PURE__ */ new Set(), Jy = /* @__PURE__ */ new Set(), Yy = /* @__PURE__ */ new Set(), Xy = /* @__PURE__ */ new Set(), Zy = /* @__PURE__ */ new Set(), Qy = /* @__PURE__ */ new Set(), $y = /* @__PURE__ */ new Set(), eb = /* @__PURE__ */ new Set(), tb = /* @__PURE__ */ new Set();
		Object.freeze(Gy);
		var nb = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = Qc(e), i = Zi(r);
				i.payload = t, n != null && (Jo(n), i.callback = n), t = Qi(e, i, r), t !== null && (oi(r, "this.setState()", e), el(t, e, r), $i(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = Qc(e), i = Zi(r);
				i.tag = $v, i.payload = t, n != null && (Jo(n), i.callback = n), t = Qi(e, i, r), t !== null && (oi(r, "this.replaceState()", e), el(t, e, r), $i(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = Qc(e), r = Zi(n);
				r.tag = ey, t != null && (Jo(t), r.callback = t), t = Qi(e, r, n), t !== null && (oi(n, "this.forceUpdate()", e), el(t, e, n), $i(t, e, n));
			}
		}, rb = null, ib = null, ab = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), ob = !1, sb = {}, cb = {}, lb = {}, ub = {}, db = !1, fb = {}, pb = {}, mb = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, hb = !1, gb = null;
		gb = /* @__PURE__ */ new Set();
		var _b = !1, vb = !1, yb = !1, bb = typeof WeakSet == "function" ? WeakSet : Set, xb = null, Sb = null, Cb = null, wb = null, Tb = !1, Eb = null, Db = !1, Ob = 8192, kb = {
			getCacheForType: function(e) {
				var t = ei(m_), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return ei(m_).controller.signal;
			},
			getOwner: function() {
				return pp;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var Ab = Symbol.for;
			Ab("selector.component"), Ab("selector.has_pseudo_class"), Ab("selector.role"), Ab("selector.test_id"), Ab("selector.text");
		}
		var jb = [], Mb = typeof WeakMap == "function" ? WeakMap : Map, Nb = 0, Pb = 2, Fb = 4, Ib = 0, Lb = 1, Rb = 2, zb = 3, Bb = 4, Vb = 6, Hb = 5, Ub = Nb, Wb = null, Q = null, $ = 0, Gb = 0, Kb = 1, qb = 2, Jb = 3, Yb = 4, Xb = 5, Zb = 6, Qb = 7, $b = 8, ex = 9, tx = Gb, nx = null, rx = !1, ix = !1, ax = !1, ox = 0, sx = Ib, cx = 0, lx = 0, ux = 0, dx = 0, fx = 0, px = null, mx = null, hx = !1, gx = 0, _x = 0, vx = 300, yx = Infinity, bx = 500, xx = null, Sx = null, Cx = null, wx = 0, Tx = 1, Ex = 2, Dx = 3, Ox = 0, kx = 1, Ax = 2, jx = 3, Mx = 4, Nx = 5, Px = 0, Fx = null, Ix = null, Lx = 0, Rx = 0, zx = -0, Bx = null, Vx = null, Hx = null, Ux = wx, Wx = null, Gx = 50, Kx = 0, qx = null, Jx = !1, Yx = !1, Xx = 50, Zx = 0, Qx = null, $x = !1, eS = null, tS = !1, nS = /* @__PURE__ */ new Set(), rS = {}, iS = null, aS = null, oS = !1, sS = !1, cS = !1, lS = !1, uS = 0, dS = {};
		(function() {
			for (var e = 0; e < ag.length; e++) {
				var t = ag[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), Vn(n, "on" + t);
			}
			Vn(Zh, "onAnimationEnd"), Vn(Qh, "onAnimationIteration"), Vn($h, "onAnimationStart"), Vn("dblclick", "onDoubleClick"), Vn("focusin", "onFocus"), Vn("focusout", "onBlur"), Vn(eg, "onTransitionRun"), Vn(tg, "onTransitionStart"), Vn(ng, "onTransitionCancel"), Vn(rg, "onTransitionEnd");
		})(), Qe("onMouseEnter", ["mouseout", "mouseover"]), Qe("onMouseLeave", ["mouseout", "mouseover"]), Qe("onPointerEnter", ["pointerout", "pointerover"]), Qe("onPointerLeave", ["pointerout", "pointerover"]), Ze("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ze("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ze("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), Ze("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ze("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ze("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var fS = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), pS = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fS)), mS = "_reactListening" + Math.random().toString(36).slice(2), hS = !1, gS = !1, _S = !1, vS = !1, yS = !1, bS = !1, xS = !1, SS = {}, CS = /\r\n?/g, wS = /\u0000|\uFFFD/g, TS = "http://www.w3.org/1999/xlink", ES = "http://www.w3.org/XML/1998/namespace", DS = "javascript:throw new Error('React form unexpectedly submitted.')", OS = "suppressHydrationWarning", kS = "&", AS = "/&", jS = "$", MS = "/$", NS = "$?", PS = "$~", FS = "$!", IS = "html", LS = "body", RS = "head", zS = "F!", BS = "F", VS = "loading", HS = "style", US = 0, WS = 1, GS = 2, KS = null, qS = null, JS = {
			dialog: !0,
			webview: !0
		}, YS = null, XS = void 0, ZS = typeof setTimeout == "function" ? setTimeout : void 0, QS = typeof clearTimeout == "function" ? clearTimeout : void 0, $S = -1, eC = typeof Promise == "function" ? Promise : void 0, tC = typeof queueMicrotask == "function" ? queueMicrotask : eC === void 0 ? ZS : function(e) {
			return eC.resolve(null).then(e).catch(Gu);
		}, nC = null, rC = 0, iC = 1, aC = 2, oC = 3, sC = 4, cC = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set(), uC = Kf.d;
		Kf.d = {
			f: function() {
				var e = uC.f(), t = al();
				return e || t;
			},
			r: function(e) {
				var t = qe(e);
				t !== null && t.tag === 5 && t.type === "form" ? No(t) : uC.r(e);
			},
			D: function(e) {
				uC.D(e), Od("dns-prefetch", e, null);
			},
			C: function(e, t) {
				uC.C(e, t), Od("preconnect", e, t);
			},
			L: function(e, t, n) {
				uC.L(e, t, n);
				var r = dC;
				if (r && e && t) {
					var i = "link[rel=\"preload\"][as=\"" + dt(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + dt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + dt(n.imageSizes) + "\"]")) : i += "[href=\"" + dt(e) + "\"]";
					var a = i;
					switch (t) {
						case "style":
							a = V(e);
							break;
						case "script": a = Pd(e);
					}
					cC.has(a) || (e = H({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), cC.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jd(a)) || t === "script" && r.querySelector(Fd(a)) || (t = r.createElement("link"), wu(t, "link", e), Xe(t), r.head.appendChild(t)));
				}
			},
			m: function(e, t) {
				uC.m(e, t);
				var n = dC;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + dt(r) + "\"][href=\"" + dt(e) + "\"]", a = i;
					switch (r) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": a = Pd(e);
					}
					if (!cC.has(a) && (e = H({
						rel: "modulepreload",
						href: e
					}, t), cC.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Fd(a))) return;
						}
						r = n.createElement("link"), wu(r, "link", e), Xe(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				uC.X(e, t);
				var n = dC;
				if (n && e) {
					var r = Ye(n).hoistableScripts, i = Pd(e), a = r.get(i);
					a || (a = n.querySelector(Fd(i)), a || (e = H({
						src: e,
						async: !0
					}, t), (t = cC.get(i)) && zd(e, t), a = n.createElement("script"), Xe(a), wu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			},
			S: function(e, t, n) {
				uC.S(e, t, n);
				var r = dC;
				if (r && e) {
					var i = Ye(r).hoistableStyles, a = V(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: rC,
							preload: null
						};
						if (o = r.querySelector(jd(a))) s.loading = iC | sC;
						else {
							e = H({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = cC.get(a)) && Rd(e, n);
							var c = o = r.createElement("link");
							Xe(c), wu(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= iC;
							}), c.addEventListener("error", function() {
								s.loading |= aC;
							}), s.loading |= sC, Ld(o, t, r);
						}
						o = {
							type: "stylesheet",
							instance: o,
							count: 1,
							state: s
						}, i.set(a, o);
					}
				}
			},
			M: function(e, t) {
				uC.M(e, t);
				var n = dC;
				if (n && e) {
					var r = Ye(n).hoistableScripts, i = Pd(e), a = r.get(i);
					a || (a = n.querySelector(Fd(i)), a || (e = H({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = cC.get(i)) && zd(e, t), a = n.createElement("script"), Xe(a), wu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var dC = typeof document > "u" ? null : document, fC = null, pC = 6e4, mC = 800, hC = 500, gC = 0, _C = null, vC = null, yC = qf, bC = {
			$$typeof: Ff,
			Provider: null,
			Consumer: null,
			_currentValue: yC,
			_currentValue2: yC,
			_threadCount: 0
		}, xC = "%c%s%c", SC = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", CC = "", wC = " ", TC = Function.prototype.bind, EC = !1, DC = null, OC = null, kC = null, AC = null, jC = null, MC = null, NC = null, PC = null, FC = null, IC = null;
		DC = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = H({}, e.memoizedProps), i = lr(e, 2), i !== null && el(i, e, 2));
		}, OC = function(e, n, r) {
			n = t(e, n), n !== null && (r = s(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = H({}, e.memoizedProps), r = lr(e, 2), r !== null && el(r, e, 2));
		}, kC = function(e, n, r, a) {
			n = t(e, n), n !== null && (r = i(n.memoizedState, r, a), n.memoizedState = r, n.baseState = r, e.memoizedProps = H({}, e.memoizedProps), r = lr(e, 2), r !== null && el(r, e, 2));
		}, AC = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = lr(e, 2), t !== null && el(t, e, 2);
		}, jC = function(e, t) {
			e.pendingProps = s(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = lr(e, 2), t !== null && el(t, e, 2);
		}, MC = function(e, t, n) {
			e.pendingProps = i(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = lr(e, 2), t !== null && el(t, e, 2);
		}, NC = function(e) {
			var t = lr(e, 2);
			t !== null && el(t, e, 2);
		}, PC = function(e) {
			var t = Fe(), n = lr(e, t);
			n !== null && el(n, e, t);
		}, FC = function(e) {
			u = e;
		}, IC = function(e) {
			c = e;
		};
		var LC = !0, RC = null, zC = !1, BC = null, VC = null, HC = null, UC = /* @__PURE__ */ new Map(), WC = /* @__PURE__ */ new Map(), GC = [], KC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), qC = null;
		if (Cf.prototype.render = Sf.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : b(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			Qd(r, Qc(r), n, t, null, null);
		}, Cf.prototype.unmount = Sf.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(Ub & (Pb | Fb)) !== Nb && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Qd(e.current, 2, null, e, null, null), al(), t[Kp] = null;
			}
		}, Cf.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = Ue();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < GC.length && t !== 0 && t < GC[n].priority; n++);
				GC.splice(n, 0, e), n === 0 && mf(e);
			}
		}, (function() {
			var e = Ef.version;
			if (e !== "19.2.7") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.2.7\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), Kf.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = ne(t), e = e === null ? null : re(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.2.7",
				rendererPackageName: "react-dom",
				currentDispatcherRef: U,
				reconcilerVersion: "19.2.7"
			};
			return e.overrideHookState = DC, e.overrideHookStateDeletePath = OC, e.overrideHookStateRenamePath = kC, e.overrideProps = AC, e.overridePropsDeletePath = jC, e.overridePropsRenamePath = MC, e.scheduleUpdate = NC, e.scheduleRetry = PC, e.setErrorHandler = FC, e.setSuspenseHandler = IC, e.scheduleRefresh = v, e.scheduleRoot = _, e.setRefreshHandler = y, e.getCurrentFiber = rf, ke(e);
		})() && Qm && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var JC = window.location.protocol;
			/^(https?|file):$/.test(JC) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (JC === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			wf(e);
			var n = !1, r = "", i = $o, a = es, o = ts;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === kf && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Xd(e, 1, !1, null, null, n, r, null, i, a, o, xf), e[Kp] = t.current, cu(e), new Sf(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			wf(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = $o, o = es, s = ts, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Xd(e, 1, !0, t, n ?? null, r, i, c, a, o, s, xf), t.context = Zd(null), n = t.current, r = Qc(n), r = ze(r), i = Zi(r), i.callback = null, Qi(n, i, r), oi(r, "hydrateRoot()", null), n = r, t.current.lanes = n, j(t, n), ql(t), e[Kp] = t.current, cu(e), new Cf(t);
		}, e.version = "19.2.7", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), f = /* @__PURE__ */ e(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = u()) : t.exports = d();
})), p = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), m = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), h = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), g = (e) => {
	let t = h(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, _ = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, v = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, y = o(), b = (0, y.createContext)({}), x = () => (0, y.useContext)(b), ee = (0, y.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: m = "" } = x() ?? {}, h = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, y.createElement)("svg", {
		ref: c,
		..._,
		width: t ?? l ?? _.width,
		height: t ?? l ?? _.height,
		stroke: e ?? f,
		strokeWidth: h,
		className: p("lucide", m, i),
		...!a && !v(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, y.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), S = (e, t) => {
	let n = (0, y.forwardRef)(({ className: n, ...r }, i) => (0, y.createElement)(ee, {
		ref: i,
		iconNode: t,
		className: p(`lucide-${m(g(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = g(e), n;
}, te = S("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]), ne = S("apple", [["path", {
	d: "M12 6.528V3a1 1 0 0 1 1-1h0",
	key: "11qiee"
}], ["path", {
	d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
	key: "110c12"
}]]), re = S("audio-lines", [
	["path", {
		d: "M2 10v3",
		key: "1fnikh"
	}],
	["path", {
		d: "M6 6v11",
		key: "11sgs0"
	}],
	["path", {
		d: "M10 3v18",
		key: "yhl04a"
	}],
	["path", {
		d: "M14 8v7",
		key: "3a1oy3"
	}],
	["path", {
		d: "M18 5v13",
		key: "123xd1"
	}],
	["path", {
		d: "M22 10v3",
		key: "154ddg"
	}]
]), ie = S("bell-ring", [
	["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}],
	["path", {
		d: "M22 8c0-2.3-.8-4.3-2-6",
		key: "5bb3ad"
	}],
	["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}],
	["path", {
		d: "M4 2C2.8 3.7 2 5.7 2 8",
		key: "tap9e0"
	}]
]), C = S("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), ae = S("circle-gauge", [
	["path", {
		d: "M15.6 2.7a10 10 0 1 0 5.7 5.7",
		key: "1e0p6d"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}],
	["path", {
		d: "M13.4 10.6 19 5",
		key: "1kr7tw"
	}]
]), w = S("cloud-sun", [
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}],
	["path", {
		d: "M15.947 12.65a4 4 0 0 0-5.925-4.128",
		key: "dpwdj0"
	}],
	["path", {
		d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z",
		key: "s09mg5"
	}]
]), oe = S("gamepad-2", [
	["line", {
		x1: "6",
		x2: "10",
		y1: "11",
		y2: "11",
		key: "1gktln"
	}],
	["line", {
		x1: "8",
		x2: "8",
		y1: "9",
		y2: "13",
		key: "qnk9ow"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "12",
		y2: "12",
		key: "krot7o"
	}],
	["line", {
		x1: "18",
		x2: "18.01",
		y1: "10",
		y2: "10",
		key: "1lcuu1"
	}],
	["path", {
		d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
		key: "mfqc10"
	}]
]), se = S("headphones", [["path", {
	d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
	key: "1xhozi"
}]]), T = S("heart", [["path", {
	d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
	key: "mvr1a0"
}]]), ce = S("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]), le = S("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]), E = S("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]), D = S("lightbulb", [
	["path", {
		d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
		key: "1gvzjb"
	}],
	["path", {
		d: "M9 18h6",
		key: "x1upvd"
	}],
	["path", {
		d: "M10 22h4",
		key: "ceow96"
	}]
]), ue = S("list-music", [
	["path", {
		d: "M16 5H3",
		key: "m91uny"
	}],
	["path", {
		d: "M11 12H3",
		key: "51ecnj"
	}],
	["path", {
		d: "M11 19H3",
		key: "zflm78"
	}],
	["path", {
		d: "M21 16V5",
		key: "yxg4q8"
	}],
	["circle", {
		cx: "18",
		cy: "16",
		r: "3",
		key: "1hluhg"
	}]
]), de = S("lock-keyhole", [
	["circle", {
		cx: "12",
		cy: "16",
		r: "1",
		key: "1au0dj"
	}],
	["rect", {
		x: "3",
		y: "10",
		width: "18",
		height: "12",
		rx: "2",
		key: "6s8ecr"
	}],
	["path", {
		d: "M7 10V7a5 5 0 0 1 10 0v3",
		key: "1pqi11"
	}]
]), fe = S("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]), pe = S("monitor", [
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2",
		key: "48i651"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "21",
		y2: "21",
		key: "1svkeh"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "17",
		y2: "21",
		key: "vw1qmm"
	}]
]), me = S("moon", [["path", {
	d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
	key: "kfwtm"
}]]), he = S("music-2", [["circle", {
	cx: "8",
	cy: "18",
	r: "4",
	key: "1fc0mg"
}], ["path", {
	d: "M12 18V2l7 4",
	key: "g04rme"
}]]), ge = S("pause", [["rect", {
	x: "14",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "kaeet6"
}], ["rect", {
	x: "5",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "1wsw3u"
}]]), _e = S("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]), ve = S("radio", [
	["path", {
		d: "M16.247 7.761a6 6 0 0 1 0 8.478",
		key: "1fwjs5"
	}],
	["path", {
		d: "M19.075 4.933a10 10 0 0 1 0 14.134",
		key: "ehdyv1"
	}],
	["path", {
		d: "M4.925 19.067a10 10 0 0 1 0-14.134",
		key: "1q22gi"
	}],
	["path", {
		d: "M7.753 16.239a6 6 0 0 1 0-8.478",
		key: "r2q7qm"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]
]), ye = S("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]), be = S("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), xe = S("settings-2", [
	["path", {
		d: "M14 17H5",
		key: "gfn3mx"
	}],
	["path", {
		d: "M19 7h-9",
		key: "6i9tg"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "3",
		key: "18b49y"
	}],
	["circle", {
		cx: "7",
		cy: "7",
		r: "3",
		key: "dfmy0x"
	}]
]), Se = S("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), O = S("sliders-horizontal", [
	["path", {
		d: "M10 5H3",
		key: "1qgfaw"
	}],
	["path", {
		d: "M12 19H3",
		key: "yhmn1j"
	}],
	["path", {
		d: "M14 3v4",
		key: "1sua03"
	}],
	["path", {
		d: "M16 17v4",
		key: "1q0r14"
	}],
	["path", {
		d: "M21 12h-9",
		key: "1o4lsq"
	}],
	["path", {
		d: "M21 19h-5",
		key: "1rlt1p"
	}],
	["path", {
		d: "M21 5h-7",
		key: "1oszz2"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M8 12H3",
		key: "a7s4jb"
	}]
]), Ce = S("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]), we = S("speaker", [
	["rect", {
		width: "16",
		height: "20",
		x: "4",
		y: "2",
		rx: "2",
		key: "1nb95v"
	}],
	["path", {
		d: "M12 6h.01",
		key: "1vi96p"
	}],
	["circle", {
		cx: "12",
		cy: "14",
		r: "4",
		key: "1jruaj"
	}],
	["path", {
		d: "M12 14h.01",
		key: "1etili"
	}]
]), Te = S("sun-medium", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["path", {
		d: "M12 3v1",
		key: "1asbbs"
	}],
	["path", {
		d: "M12 20v1",
		key: "1wcdkc"
	}],
	["path", {
		d: "M3 12h1",
		key: "lp3yf2"
	}],
	["path", {
		d: "M20 12h1",
		key: "1vloll"
	}],
	["path", {
		d: "m18.364 5.636-.707.707",
		key: "1hakh0"
	}],
	["path", {
		d: "m6.343 17.657-.707.707",
		key: "18m9nf"
	}],
	["path", {
		d: "m5.636 5.636.707.707",
		key: "1xv1c5"
	}],
	["path", {
		d: "m17.657 17.657.707.707",
		key: "vl76zb"
	}]
]), Ee = S("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), k = S("tv", [["path", {
	d: "m17 2-5 5-5-5",
	key: "16satq"
}], ["rect", {
	width: "20",
	height: "15",
	x: "2",
	y: "7",
	rx: "2",
	key: "1e6viu"
}]]), De = S("volume-2", [
	["path", {
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
		key: "uqj9uw"
	}],
	["path", {
		d: "M16 9a5 5 0 0 1 0 6",
		key: "1q6k2b"
	}],
	["path", {
		d: "M19.364 18.364a9 9 0 0 0 0-12.728",
		key: "ijwkga"
	}]
]), Oe = S("wand-sparkles", [
	["path", {
		d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
		key: "ul74o6"
	}],
	["path", {
		d: "m14 7 3 3",
		key: "1r5n42"
	}],
	["path", {
		d: "M5 6v4",
		key: "ilb8ba"
	}],
	["path", {
		d: "M19 14v4",
		key: "blhpug"
	}],
	["path", {
		d: "M10 2v2",
		key: "7u0qdc"
	}],
	["path", {
		d: "M7 8H3",
		key: "zfb6yr"
	}],
	["path", {
		d: "M21 16h-4",
		key: "1cnmox"
	}],
	["path", {
		d: "M11 3H9",
		key: "1obp7u"
	}]
]), ke = S("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), Ae = f(), je = (e) => e == null || Number.isNaN(Number(e)) ? "—" : `${Math.round(Number(e) * 100)} %`, Me = (e) => e == null ? "—" : `${e > 0 ? "+" : e < 0 ? "−" : ""}${Math.abs(Math.round(e * 100))}`, Ne = (e) => e ? new Intl.DateTimeFormat("de-DE", {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit"
}).format(new Date(e)) : "—", A = (e) => (e || "—").replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase()), Pe = (e) => ({
	playing: "Spielt",
	paused: "Pausiert",
	on: "An",
	off: "Aus",
	idle: "Bereit",
	unavailable: "Nicht verfügbar"
})[e || ""] || A(e), Fe = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), Ie = /* @__PURE__ */ e(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === ae ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case te: return "Suspense";
				case ne: return "SuspenseList";
				case C: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case ee: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case S:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case re: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case ie:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === ie) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = w.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (oe.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				ce || (ce = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return le[e] || (le[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, s, u) {
			var f = n.children;
			if (f !== void 0) if (o) if (se(f)) {
				for (o = 0; o < f.length; o++) p(f[o]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (oe.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", ue[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), ue[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), c(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && l(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, i, a(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === ie && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = o(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), C = Symbol.for("react.activity"), ae = Symbol.for("react.client.reference"), w = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = Object.prototype.hasOwnProperty, se = Array.isArray, T = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var ce, le = {}, E = h.react_stack_bottom_frame.bind(h, s)(), D = T(i(s)), ue = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > w.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : E, r ? T(i(e)) : D);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > w.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : E, r ? T(i(e)) : D);
		};
	})();
})), j = (/* @__PURE__ */ e(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Fe() : t.exports = Ie();
})))(), M = {
	Activity: te,
	AlertTriangle: Ee,
	Apple: ne,
	AudioLines: re,
	BellRing: ie,
	ChevronRight: C,
	CircleGauge: ae,
	CloudSun: w,
	Gamepad2: oe,
	Headphones: se,
	Heart: T,
	House: ce,
	Info: le,
	LayoutDashboard: E,
	Lightbulb: D,
	ListMusic: ue,
	LockKeyhole: de,
	Menu: fe,
	Monitor: pe,
	Moon: me,
	Music2: he,
	Pause: ge,
	Play: _e,
	Radio: ve,
	RefreshCw: ye,
	Search: be,
	Settings2: xe,
	ShieldCheck: Se,
	SlidersHorizontal: O,
	Sparkles: Ce,
	Speaker: we,
	SunMedium: Te,
	Tv: k,
	Volume2: De,
	WandSparkles: Oe,
	X: ke
};
function N({ children: e, className: t = "", title: n, action: r }) {
	return /* @__PURE__ */ (0, j.jsxs)("section", {
		className: `card ${t}`,
		children: [(n || r) && /* @__PURE__ */ (0, j.jsxs)("div", {
			className: "card-head",
			children: [n && /* @__PURE__ */ (0, j.jsx)("h2", { children: n }), r]
		}), e]
	});
}
function Le({ icon: e = le, title: t, text: n, compact: r = !1 }) {
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: `empty ${r ? "compact" : ""}`,
		children: [/* @__PURE__ */ (0, j.jsx)(e, { size: r ? 18 : 28 }), /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("strong", { children: t }), /* @__PURE__ */ (0, j.jsx)("p", { children: n })] })]
	});
}
function Re({ health: e }) {
	return /* @__PURE__ */ (0, j.jsx)("span", {
		className: `status-dot ${e?.healthy ? "good" : e?.available ? "warn" : "bad"}`,
		title: e?.error || (e?.healthy ? "Healthy" : "Nicht verfügbar")
	});
}
var ze = {
	tv: k,
	apple_tv: ne,
	ps5: oe,
	switch: oe,
	pc: pe,
	homepods: we,
	denon: re,
	subwoofer: De
}, Be = {
	tv: "TV",
	apple_tv: "Apple TV",
	ps5: "PlayStation 5",
	switch: "Nintendo Switch",
	pc: "PC",
	homepods: "HomePods",
	denon: "Denon AVR-X1400H",
	subwoofer: "Subwoofer"
};
function Ve({ devices: e = {} }) {
	let t = Object.entries(e).filter(([, e]) => !e.ignored);
	return t.length ? /* @__PURE__ */ (0, j.jsx)("div", {
		className: "device-grid",
		children: t.map(([e, t]) => {
			let n = ze[e] || pe;
			return /* @__PURE__ */ (0, j.jsxs)("div", {
				className: `device-tile ${t.active ? "active" : ""}`,
				children: [/* @__PURE__ */ (0, j.jsx)(n, { size: 22 }), /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: Be[e] || A(e) }), /* @__PURE__ */ (0, j.jsxs)("strong", { children: [Pe(t.state), t.volume == null ? "" : ` · ${je(t.volume)}`] })] })]
			}, e);
		})
	}) : /* @__PURE__ */ (0, j.jsx)(Le, {
		compact: !0,
		title: "Keine Gerätedaten",
		text: "Media State liefert aktuell keine Geräte-Matrix."
	});
}
function He({ src: e, kind: t, title: n }) {
	let r = t === "music" ? he : t === "gaming" ? oe : k;
	return /* @__PURE__ */ (0, j.jsx)("div", {
		className: `artwork ${t}`,
		"aria-label": n ? `Artwork für ${n}` : "Artwork nicht verfügbar",
		children: e ? /* @__PURE__ */ (0, j.jsx)("img", {
			src: e,
			alt: ""
		}) : /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [/* @__PURE__ */ (0, j.jsx)(r, { size: 38 }), /* @__PURE__ */ (0, j.jsx)("span", { children: "Artwork nicht verfügbar" })] })
	});
}
function Ue({ kind: e, eyebrow: t, title: n, subtitle: r, detail: i, device: a, volume: o, artwork: s, active: c = !0, controls: l }) {
	return /* @__PURE__ */ (0, j.jsxs)(N, {
		className: `media-card ${e} ${c ? "active" : ""}`,
		children: [/* @__PURE__ */ (0, j.jsxs)("div", {
			className: "media-card-main",
			children: [/* @__PURE__ */ (0, j.jsx)(He, {
				src: s,
				kind: e,
				title: n
			}), /* @__PURE__ */ (0, j.jsxs)("div", {
				className: "media-copy",
				children: [
					/* @__PURE__ */ (0, j.jsxs)("span", {
						className: "eyebrow",
						children: [e === "music" ? /* @__PURE__ */ (0, j.jsx)(he, {}) : e === "gaming" ? /* @__PURE__ */ (0, j.jsx)(oe, {}) : /* @__PURE__ */ (0, j.jsx)(k, {}), t]
					}),
					/* @__PURE__ */ (0, j.jsx)("h3", { children: n }),
					r && /* @__PURE__ */ (0, j.jsx)("p", { children: r }),
					i && /* @__PURE__ */ (0, j.jsx)("span", {
						className: "session-detail",
						children: i
					})
				]
			})]
		}), (a || o != null || l) && /* @__PURE__ */ (0, j.jsxs)("div", {
			className: "output-row",
			children: [
				/* @__PURE__ */ (0, j.jsx)(we, { size: 19 }),
				/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: a || "Ausgabegerät" }), /* @__PURE__ */ (0, j.jsx)("strong", { children: c ? "Aktiv" : "Bereit" })] }),
				/* @__PURE__ */ (0, j.jsx)("b", { children: je(o) }),
				l
			]
		})]
	});
}
var We = [
	["base", "Basis"],
	["scenario_offset", "Szenario / Grind"],
	["window_offset", "Fenster"],
	["activity_offset", "Activity"],
	["manual_nudge", "Nudge"],
	["track_boost", "Boost"],
	["cap_override", "Cap / Override"]
];
function Ge({ name: e, data: t, accent: n = "cyan" }) {
	if (!t) return /* @__PURE__ */ (0, j.jsx)(N, {
		title: e,
		children: /* @__PURE__ */ (0, j.jsx)(Le, {
			compact: !0,
			title: "Keine Formeldaten",
			text: "Media Policy liefert für dieses Gerät noch keinen Breakdown."
		})
	});
	let r = We.filter(([e]) => t[e] != null).map(([e, n], r) => {
		let i = Number(t[e] || 0);
		return /* @__PURE__ */ (0, j.jsx)("span", {
			className: i < 0 ? "negative" : i > 0 && r ? "positive" : "",
			children: r === 0 ? `${Math.round(i * 100)} % ${n}` : `${Math.abs(Math.round(i * 100))} ${n}`
		}, e);
	});
	return /* @__PURE__ */ (0, j.jsxs)(N, {
		className: `volume-breakdown ${n}`,
		title: e,
		children: [
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "formula-compact",
				children: [r, /* @__PURE__ */ (0, j.jsxs)("strong", { children: ["= ", je(t.result)] })]
			}),
			/* @__PURE__ */ (0, j.jsx)("div", {
				className: "formula-grid",
				children: We.map(([e, n]) => {
					let r = typeof t[e] == "number" ? t[e] : void 0;
					return /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: n }), /* @__PURE__ */ (0, j.jsx)("b", { children: e === "base" ? je(r) : Me(r) })] }, e);
				})
			}),
			/* @__PURE__ */ (0, j.jsx)("div", {
				className: "volume-meter",
				children: /* @__PURE__ */ (0, j.jsx)("i", { style: { width: `${Math.max(0, Math.min(100, Number(t.result || 0) * 100))}%` } })
			})
		]
	});
}
function Ke({ reasons: e = [], activeReasons: t = [], compact: n = !1 }) {
	let r = e.length ? e : t.map((e) => ({
		text: qe(e),
		severity: e.includes("unavailable") ? "warn" : "ok"
	}));
	return /* @__PURE__ */ (0, j.jsx)(N, {
		className: n ? "reason compact" : "reason",
		title: "Warum so?",
		children: r.length ? /* @__PURE__ */ (0, j.jsx)("div", {
			className: "reason-list",
			children: r.slice(0, n ? 5 : 10).map((e, t) => /* @__PURE__ */ (0, j.jsxs)("div", {
				className: `reason-item ${e.severity || "ok"}`,
				children: [e.severity === "warn" ? /* @__PURE__ */ (0, j.jsx)(Ee, { size: 17 }) : t === 0 ? /* @__PURE__ */ (0, j.jsx)(Ce, { size: 17 }) : /* @__PURE__ */ (0, j.jsx)(C, { size: 17 }), /* @__PURE__ */ (0, j.jsx)("span", { children: qe(e.text) })]
			}, `${e.text}-${t}`))
		}) : /* @__PURE__ */ (0, j.jsx)(Le, {
			compact: !0,
			title: "Keine aktiven Gründe",
			text: "Die Decision Engine meldet derzeit keinen Why-Stack."
		})
	});
}
function qe(e) {
	let t = {
		"scenario:gaming": "Benni spielt gerade.",
		grind: "Grind-Modus ist aktiv.",
		"audio:homepods": "Musik läuft über die HomePods.",
		"window:tilted": "Fenster gekippt, Lautstärke reduziert.",
		audio_only_idle: "Musik läuft, ohne ein Bildschirm-Szenario zu aktivieren.",
		"private:manual:switch+pc": "Private Time wurde manuell aktiviert.",
		away_gate: "Niemand ist zuhause; Medien bleiben aus."
	};
	return t[e] ? t[e] : e.replaceAll("_", " ").replaceAll(":", " · ").replace(/\bps5\b/gi, "PlayStation 5").replace(/\bhomepods\b/gi, "HomePods").replace(/^./, (e) => e.toUpperCase());
}
function Je({ children: e, tone: t = "neutral" }) {
	return /* @__PURE__ */ (0, j.jsx)("span", {
		className: `pill ${t}`,
		children: e
	});
}
var Ye = {
	overview: {
		label: "Übersicht",
		sub: "Aktueller Medienstatus und Steuerung",
		icon: E
	},
	music: {
		label: "Musik",
		sub: "Wiedergabe, Radios und Bibliothek",
		icon: he
	},
	gaming: {
		label: "Gaming",
		sub: "Spiel, Modus und Audio-Routing",
		icon: oe
	},
	tv: {
		label: "TV & Streaming",
		sub: "Quelle, Geräte und aktuelle Entscheidung",
		icon: k
	},
	rules: {
		label: "Regeln",
		sub: "Persistierte Volume-Matrix und Sicherheitswerte",
		icon: O
	},
	diagnostics: {
		label: "Diagnose",
		sub: "State, Policy, Apply, Bindings und Raw JSON",
		icon: xe
	}
};
function Xe({ active: e, onClick: t, icon: n, children: r, disabled: i, title: a }) {
	return /* @__PURE__ */ (0, j.jsxs)("button", {
		className: `button ${e ? "active" : ""}`,
		onClick: t,
		disabled: i,
		title: a,
		children: [n && /* @__PURE__ */ (0, j.jsx)(n, { size: 17 }), r]
	});
}
//#endregion
//#region frontend-src/src/AppShell.tsx
var Ze = [
	{
		label: "Klima",
		icon: M.CloudSun
	},
	{
		label: "Medien",
		icon: M.AudioLines,
		active: !0
	},
	{
		label: "Licht",
		icon: M.Lightbulb
	},
	{
		label: "Beschattung",
		icon: M.SunMedium
	},
	{
		label: "Sicherheit",
		icon: M.ShieldCheck
	},
	{
		label: "System",
		icon: M.Settings2
	}
];
function Qe({ page: e, onPage: t, children: n, updatedAt: r, modulesHealth: i = {}, onRefresh: a, refreshing: o }) {
	let [s, c] = (0, y.useState)(!1), l = Ye[e];
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ (0, j.jsxs)("header", {
				className: "topbar",
				children: [
					/* @__PURE__ */ (0, j.jsxs)("div", {
						className: "brand",
						children: [/* @__PURE__ */ (0, j.jsx)("div", {
							className: "brand-mark",
							children: /* @__PURE__ */ (0, j.jsx)(M.House, { size: 17 })
						}), /* @__PURE__ */ (0, j.jsx)("span", { children: "Benni Home" })]
					}),
					/* @__PURE__ */ (0, j.jsx)("nav", {
						className: "module-nav",
						"aria-label": "Module",
						children: Ze.map(({ label: e, icon: t, active: n }) => /* @__PURE__ */ (0, j.jsxs)("button", {
							className: n ? "active" : "",
							disabled: !n,
							title: n ? void 0 : `${e} folgt später`,
							children: [/* @__PURE__ */ (0, j.jsx)(t, { size: 19 }), /* @__PURE__ */ (0, j.jsx)("span", { children: e })]
						}, e))
					}),
					/* @__PURE__ */ (0, j.jsxs)("div", {
						className: "top-status",
						children: [
							/* @__PURE__ */ (0, j.jsx)(M.BellRing, { size: 19 }),
							/* @__PURE__ */ (0, j.jsx)("span", {
								className: "avatar",
								children: "B"
							}),
							/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("b", { children: "Benni" }), /* @__PURE__ */ (0, j.jsx)("small", { children: "zuhause" })] })
						]
					}),
					/* @__PURE__ */ (0, j.jsx)("button", {
						className: "mobile-menu",
						onClick: () => c(!s),
						"aria-label": "Navigation öffnen",
						children: /* @__PURE__ */ (0, j.jsx)(M.Menu, { size: 20 })
					})
				]
			}),
			/* @__PURE__ */ (0, j.jsxs)("aside", {
				className: `sidebar ${s ? "open" : ""}`,
				children: [
					/* @__PURE__ */ (0, j.jsxs)("div", {
						className: "sidebar-title",
						children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Medien" }), /* @__PURE__ */ (0, j.jsx)("button", {
							onClick: () => c(!1),
							children: /* @__PURE__ */ (0, j.jsx)(M.X, { size: 18 })
						})]
					}),
					/* @__PURE__ */ (0, j.jsx)("nav", {
						"aria-label": "Medien",
						children: Object.keys(Ye).map((n) => {
							let r = Ye[n], i = r.icon;
							return /* @__PURE__ */ (0, j.jsxs)("button", {
								className: n === e ? "active" : "",
								onClick: () => {
									t(n), c(!1);
								},
								children: [/* @__PURE__ */ (0, j.jsx)(i, { size: 19 }), /* @__PURE__ */ (0, j.jsx)("span", { children: r.label })]
							}, n);
						})
					}),
					/* @__PURE__ */ (0, j.jsxs)("div", {
						className: "sidebar-health",
						children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Stack-Status" }), [
							"state",
							"policy",
							"apply"
						].map((e) => /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)(Re, { health: i[e] }), e] }, e))]
					})
				]
			}),
			s && /* @__PURE__ */ (0, j.jsx)("button", {
				className: "scrim",
				onClick: () => c(!1),
				"aria-label": "Navigation schließen"
			}),
			/* @__PURE__ */ (0, j.jsxs)("main", { children: [/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "page-header",
				children: [/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("h1", { children: l.label }), /* @__PURE__ */ (0, j.jsx)("p", { children: l.sub })] }), /* @__PURE__ */ (0, j.jsxs)("div", {
					className: "page-meta",
					children: [/* @__PURE__ */ (0, j.jsxs)("span", { children: [
						"Letzte Aktualisierung",
						/* @__PURE__ */ (0, j.jsx)("br", {}),
						/* @__PURE__ */ (0, j.jsx)("b", { children: r ? new Intl.DateTimeFormat("de-DE", {
							dateStyle: "short",
							timeStyle: "medium"
						}).format(new Date(r)) : "—" })
					] }), /* @__PURE__ */ (0, j.jsx)("button", {
						onClick: a,
						disabled: o,
						"aria-label": "Aktualisieren",
						children: /* @__PURE__ */ (0, j.jsx)(M.RefreshCw, {
							className: o ? "spin" : "",
							size: 19
						})
					})]
				})]
			}), /* @__PURE__ */ (0, j.jsx)("div", {
				className: "page-content",
				children: n
			})] }),
			/* @__PURE__ */ (0, j.jsxs)("footer", { children: [
				/* @__PURE__ */ (0, j.jsx)("span", { children: "benni_media · React/Vite Cockpit" }),
				/* @__PURE__ */ (0, j.jsxs)("span", { children: [/* @__PURE__ */ (0, j.jsx)(Re, { health: i.policy }), " Media Stack"] }),
				/* @__PURE__ */ (0, j.jsx)("span", { children: "Umbrella UX" })
			] })
		]
	});
}
//#endregion
//#region frontend-src/src/api.ts
var $e = {
	overview: "benni_media/get_overview",
	state: "benni_media/get_state",
	policy: "benni_media/get_policy",
	apply: "benni_media/get_apply",
	diagnostics: "benni_media/get_diagnostics",
	matrix: "benni_media_policy/get_matrix",
	setMatrix: "benni_media_policy/set_matrix",
	resetMatrix: "benni_media_policy/reset_matrix",
	setScalars: "benni_media_policy/set_scalars",
	action: "benni_media/action"
};
async function et(e) {
	let [t, n, r, i, a, o] = await Promise.allSettled([
		e.callWS({ type: $e.overview }),
		e.callWS({ type: $e.state }),
		e.callWS({ type: $e.policy }),
		e.callWS({ type: $e.apply }),
		e.callWS({ type: $e.diagnostics }),
		e.callWS({ type: $e.matrix })
	]), s = (e) => e.status === "fulfilled" ? e.value : void 0;
	return {
		overview: s(t),
		state: s(n),
		policy: s(r),
		apply: s(i),
		diagnostics: s(a),
		matrix: s(o)
	};
}
async function tt(e, t, n, r = {}) {
	return e.callWS({
		type: $e.action,
		module: t,
		action: n,
		params: r
	});
}
var nt = (e, t) => e.callWS({
	type: $e.setMatrix,
	patch: t
}), rt = (e, t) => e.callWS({
	type: $e.setScalars,
	patch: t
}), it = (e) => e.callWS({ type: $e.resetMatrix });
//#endregion
//#region frontend-src/src/useCockpit.ts
function at(e) {
	let [t, n] = (0, y.useState)({}), [r, i] = (0, y.useState)(!0), [a, o] = (0, y.useState)(null), s = (0, y.useRef)(!0), c = (0, y.useCallback)(async (t = !1) => {
		t || i(!0);
		try {
			let t = await et(e);
			s.current && (n(t), o(null));
		} catch (e) {
			s.current && o(e instanceof Error ? e.message : String(e));
		} finally {
			s.current && !t && i(!1);
		}
	}, [e]);
	return (0, y.useEffect)(() => {
		s.current = !0;
		let e = window.setTimeout(() => void c(), 0), t = window.setInterval(() => void c(!0), 5e3);
		return () => {
			s.current = !1, window.clearTimeout(e), window.clearInterval(t);
		};
	}, [c]), {
		data: t,
		setData: n,
		loading: r,
		error: a,
		refresh: c
	};
}
//#endregion
//#region frontend-src/src/pages/OverviewPage.tsx
function ot({ data: e, hass: t, onChanged: n }) {
	let r = e?.raw?.state || {}, i = e?.raw?.policy || {}, a = e?.raw?.apply || {}, o = e?.devices || r.devices || {}, s = e?.now_playing || r.now_playing, c = r.context === "gaming" || e?.scenario === "gaming" || !!r.gaming_platform, l = o.ps5?.active ? o.ps5 : o.pc?.active ? o.pc : void 0, u = l?.title || "Aktive Gaming-Session", d = async (e, r, i = {}) => {
		await tt(t, e, r, i), n();
	}, f = a.radio?.defaults || [];
	return /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [
		/* @__PURE__ */ (0, j.jsxs)("div", {
			className: "section-heading",
			children: [/* @__PURE__ */ (0, j.jsx)("h2", { children: "Aktive Medien" }), /* @__PURE__ */ (0, j.jsxs)(Je, {
				tone: "green",
				children: [[!!s, c].filter(Boolean).length || 0, " aktiv"]
			})]
		}),
		/* @__PURE__ */ (0, j.jsxs)("div", {
			className: "overview-hero",
			children: [/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "session-grid",
				children: [s ? /* @__PURE__ */ (0, j.jsx)(Ue, {
					kind: "music",
					eyebrow: "Musik",
					title: s.title || "Unbekannter Titel",
					subtitle: s.artist,
					detail: "Musik läuft über die HomePods",
					device: "HomePods",
					volume: s.volume ?? o.homepods?.volume,
					artwork: s.artwork_url,
					controls: /* @__PURE__ */ (0, j.jsx)(Xe, {
						disabled: !0,
						title: "Play/Pause benötigt einen additiven Backend-Contract",
						icon: M.Pause,
						children: "Pause"
					})
				}) : /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
					icon: M.Music2,
					title: "Keine Musik-Session",
					text: "Sobald die HomePods spielen, erscheint die Session hier."
				}) }), c ? /* @__PURE__ */ (0, j.jsx)(Ue, {
					kind: "gaming",
					eyebrow: "Gaming",
					title: u,
					subtitle: A(r.gaming_platform || e?.gaming_platform || e?.gaming_source),
					detail: i.is_grind ? "Grind-Modus aktiv" : A(r.subcontext),
					device: o.denon?.active ? "Denon AVR-X1400H" : "Gaming-Audio",
					volume: i.volume_target_denon ?? e?.targets?.denon_volume,
					artwork: l?.artwork_url
				}) : /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
					icon: M.Gamepad2,
					title: "Keine Gaming-Session",
					text: "PlayStation- oder PC-Gaming wird parallel zur Musik eingeblendet."
				}) })]
			}), /* @__PURE__ */ (0, j.jsx)(Ke, {
				compact: !0,
				reasons: i.reasons,
				activeReasons: e?.active_reasons || r.active_reasons
			})]
		}),
		/* @__PURE__ */ (0, j.jsxs)("div", {
			className: "dashboard-grid volumes",
			children: [/* @__PURE__ */ (0, j.jsx)(Ge, {
				name: "HomePods",
				data: i.volume_formula?.homepods,
				accent: "pink"
			}), /* @__PURE__ */ (0, j.jsx)(Ge, {
				name: "Denon AVR-X1400H",
				data: i.volume_formula?.denon,
				accent: "cyan"
			})]
		}),
		/* @__PURE__ */ (0, j.jsxs)("div", {
			className: "dashboard-grid lower",
			children: [
				/* @__PURE__ */ (0, j.jsxs)(N, {
					className: "quick-control",
					title: "Schnellsteuerung",
					children: [
						/* @__PURE__ */ (0, j.jsxs)("div", {
							className: "button-row",
							children: [
								/* @__PURE__ */ (0, j.jsx)(Xe, {
									icon: M.Volume2,
									onClick: () => void d("policy", "nudge_volume", { delta: -.05 }),
									children: "− 5 %"
								}),
								/* @__PURE__ */ (0, j.jsx)(Xe, {
									icon: M.RefreshCw,
									onClick: () => void d("policy", "reset_nudge"),
									children: "Nudge Reset"
								}),
								/* @__PURE__ */ (0, j.jsx)(Xe, {
									icon: M.Volume2,
									onClick: () => void d("policy", "nudge_volume", { delta: .05 }),
									children: "+ 5 %"
								}),
								/* @__PURE__ */ (0, j.jsx)(Xe, {
									active: e?.audio_owner === "private",
									icon: M.Headphones,
									onClick: () => void d("state", "toggle_private"),
									children: "Private Time"
								}),
								/* @__PURE__ */ (0, j.jsx)(Xe, {
									disabled: !i.nudge?.boost_active,
									icon: M.WandSparkles,
									onClick: () => void d("policy", "reset_boost"),
									children: "Boost Reset"
								})
							]
						}),
						/* @__PURE__ */ (0, j.jsx)("h3", { children: "Radio-Schnellwahl" }),
						/* @__PURE__ */ (0, j.jsxs)("div", {
							className: "radio-row",
							children: [f.map((e) => /* @__PURE__ */ (0, j.jsxs)("button", {
								onClick: () => void d("apply", "play_radio", { media_id: e.uri }),
								children: [/* @__PURE__ */ (0, j.jsx)(M.Radio, { size: 17 }), /* @__PURE__ */ (0, j.jsx)("span", { children: e.name })]
							}, e.uri)), !f.length && /* @__PURE__ */ (0, j.jsx)(Le, {
								compact: !0,
								title: "Keine Radio-Favoriten",
								text: "Media Apply liefert keine Default-Sender."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, j.jsx)(N, {
					title: "Geräte-Status",
					children: /* @__PURE__ */ (0, j.jsx)(Ve, { devices: o })
				}),
				/* @__PURE__ */ (0, j.jsx)(N, {
					title: "Letzte Aktionen",
					children: /* @__PURE__ */ (0, j.jsxs)("div", {
						className: "action-log",
						children: [(a.log || []).slice(0, 6).map((e, t) => /* @__PURE__ */ (0, j.jsxs)("div", { children: [
							/* @__PURE__ */ (0, j.jsx)("time", { children: Ne(e.ts) }),
							/* @__PURE__ */ (0, j.jsx)(M.Activity, { size: 16 }),
							/* @__PURE__ */ (0, j.jsxs)("span", { children: [
								A(e.action),
								e.denon_target == null ? "" : ` · Denon ${je(e.denon_target)}`,
								e.homepods_target == null ? "" : ` · HomePods ${je(e.homepods_target)}`
							] }),
							/* @__PURE__ */ (0, j.jsx)(Je, {
								tone: e.executed ? "green" : "orange",
								children: e.executed ? "live" : "shadow"
							})
						] }, `${e.ts}-${t}`)), !a.log?.length && /* @__PURE__ */ (0, j.jsx)(Le, {
							compact: !0,
							title: "Noch keine Aktionen",
							text: "Apply-Aktionen erscheinen nach dem nächsten relevanten Wechsel."
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, j.jsxs)("div", {
			className: "decision-strip",
			children: [
				/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Szenario" }), /* @__PURE__ */ (0, j.jsx)("strong", { children: e?.overview_audio_scenario_label || e?.audio_scenario_label || A(e?.scenario) })] }),
				/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Modus" }), /* @__PURE__ */ (0, j.jsx)("strong", { children: i.is_grind ? "Grind-Modus" : A(e?.volume_policy) })] }),
				/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Audio-Routing" }), /* @__PURE__ */ (0, j.jsx)("strong", { children: A(e?.audio_owner) })] }),
				/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "HomePods" }), /* @__PURE__ */ (0, j.jsxs)("strong", { children: [
					Pe(o.homepods?.state),
					" · ",
					je(e?.targets?.homepods_volume)
				] })] })
			]
		})
	] });
}
//#endregion
//#region frontend-src/src/pages/MusicPage.tsx
function st({ state: e = {}, policy: t = {}, apply: n = {}, hass: r, onChanged: i }) {
	let [a, o] = (0, y.useState)(""), [s, c] = (0, y.useState)([]), [l, u] = (0, y.useState)(!1), d = e.now_playing, f = async (e) => {
		await tt(r, "apply", "play_radio", { media_id: e }), i();
	}, p = async () => {
		if (a.trim()) {
			u(!0);
			try {
				let e = await tt(r, "apply", "search_radio", { query: a });
				c(e?.result?.results || []);
			} finally {
				u(!1);
			}
		}
	};
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "music-layout",
		children: [/* @__PURE__ */ (0, j.jsxs)("div", {
			className: "music-main",
			children: [
				/* @__PURE__ */ (0, j.jsx)("div", {
					className: "now-playing-wide",
					children: d ? /* @__PURE__ */ (0, j.jsx)(Ue, {
						kind: "music",
						eyebrow: "Aktuelle Wiedergabe",
						title: d.title || "Unbekannter Titel",
						subtitle: d.artist,
						detail: `HomePods · ${je(d.volume ?? e.devices?.homepods?.volume)}`,
						artwork: d.artwork_url,
						device: "HomePods",
						volume: t.volume_target_homepods,
						controls: /* @__PURE__ */ (0, j.jsx)(Xe, {
							disabled: !0,
							icon: M.Pause,
							title: "Play/Pause ist im aktuellen Umbrella-Contract nicht vorhanden",
							children: "Pause"
						})
					}) : /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
						icon: M.Music2,
						title: "Gerade läuft keine Musik",
						text: "Radio oder Music Assistant starten; die Wiedergabe erscheint automatisch."
					}) })
				}),
				/* @__PURE__ */ (0, j.jsx)(N, {
					title: "Radiosender",
					action: /* @__PURE__ */ (0, j.jsx)(Je, {
						tone: "pink",
						children: "Music Assistant"
					}),
					children: /* @__PURE__ */ (0, j.jsx)("div", {
						className: "radio-cards",
						children: (n.radio?.defaults || []).map((e) => /* @__PURE__ */ (0, j.jsxs)("button", {
							onClick: () => void f(e.uri),
							children: [
								/* @__PURE__ */ (0, j.jsx)("span", {
									className: "radio-art",
									children: /* @__PURE__ */ (0, j.jsx)(M.Radio, {})
								}),
								/* @__PURE__ */ (0, j.jsx)("b", { children: e.name }),
								/* @__PURE__ */ (0, j.jsx)("small", { children: "Radio" }),
								/* @__PURE__ */ (0, j.jsx)(M.Play, { size: 17 })
							]
						}, e.uri))
					})
				}),
				/* @__PURE__ */ (0, j.jsxs)(N, {
					title: "Radio suchen",
					children: [/* @__PURE__ */ (0, j.jsxs)("div", {
						className: "search-box",
						children: [
							/* @__PURE__ */ (0, j.jsx)(M.Search, { size: 18 }),
							/* @__PURE__ */ (0, j.jsx)("input", {
								value: a,
								onChange: (e) => o(e.target.value),
								onKeyDown: (e) => e.key === "Enter" && void p(),
								placeholder: "Sender in Music Assistant suchen …"
							}),
							/* @__PURE__ */ (0, j.jsx)("button", {
								onClick: () => void p(),
								disabled: l,
								children: l ? "Suche …" : "Suchen"
							})
						]
					}), s.length > 0 && /* @__PURE__ */ (0, j.jsx)("div", {
						className: "search-results",
						children: s.map((e) => /* @__PURE__ */ (0, j.jsxs)("div", { children: [
							e.image ? /* @__PURE__ */ (0, j.jsx)("img", {
								src: e.image,
								alt: ""
							}) : /* @__PURE__ */ (0, j.jsx)(M.Radio, {}),
							/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("b", { children: e.name }), /* @__PURE__ */ (0, j.jsx)("small", { children: e.favorite ? "Favorit" : "Radio" })] }),
							/* @__PURE__ */ (0, j.jsxs)("button", {
								onClick: () => void f(e.uri),
								children: [/* @__PURE__ */ (0, j.jsx)(M.Play, { size: 17 }), "Abspielen"]
							})
						] }, e.uri))
					})]
				}),
				/* @__PURE__ */ (0, j.jsx)("div", {
					className: "library-grid",
					children: [
						"Zuletzt gespielt",
						"Favoriten",
						"Playlists",
						"Kürzlich hinzugefügt"
					].map((e) => /* @__PURE__ */ (0, j.jsx)(N, {
						title: e,
						children: /* @__PURE__ */ (0, j.jsx)(Le, {
							compact: !0,
							icon: e === "Favoriten" ? M.Heart : M.ListMusic,
							title: "Backend-Daten fehlen",
							text: "Für diesen Music-Assistant-Bereich existiert noch kein Umbrella-Contract."
						})
					}, e))
				})
			]
		}), /* @__PURE__ */ (0, j.jsxs)("aside", {
			className: "music-aside",
			children: [/* @__PURE__ */ (0, j.jsx)(N, {
				title: "Wiedergabegeräte",
				children: /* @__PURE__ */ (0, j.jsx)(Ve, { devices: Object.fromEntries(Object.entries(e.devices || {}).filter(([e]) => ["homepods", "denon"].includes(e))) })
			}), /* @__PURE__ */ (0, j.jsx)(N, {
				title: "Musik-Entscheidung",
				children: /* @__PURE__ */ (0, j.jsxs)("div", {
					className: "key-values",
					children: [
						/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Audio Owner", /* @__PURE__ */ (0, j.jsx)("b", { children: t.audio_owner || "—" })] }),
						/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Ziel HomePods", /* @__PURE__ */ (0, j.jsx)("b", { children: je(t.volume_target_homepods) })] }),
						/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Boost", /* @__PURE__ */ (0, j.jsx)("b", { children: t.track_boost_applied ? "Aktiv" : "Aus" })] }),
						/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Quiet Mode", /* @__PURE__ */ (0, j.jsx)("b", { children: t.quiet_mode ? "Aktiv" : "Aus" })] })
					]
				})
			})]
		})]
	});
}
//#endregion
//#region frontend-src/src/pages/GamingPage.tsx
function ct({ state: e = {}, policy: t = {} }) {
	let n = e.devices?.ps5?.active ? "ps5" : e.devices?.pc?.active ? "pc" : e.gaming_platform || "ps5", r = e.devices?.[n], i = e.classifiers?.[n], a = e.context === "gaming" || !!r?.active, o = r?.title || (a ? "Gaming-Session" : "Kein Spiel aktiv");
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "gaming-page",
		children: [
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "gaming-hero",
				children: [a ? /* @__PURE__ */ (0, j.jsx)(Ue, {
					kind: "gaming",
					eyebrow: "Aktives Spiel",
					title: o,
					subtitle: A(e.gaming_platform || n),
					detail: i?.display_name || A(i?.label || e.subcontext),
					artwork: i?.artwork_url || r?.artwork_url,
					device: e.devices?.denon?.active ? "Denon AVR-X1400H" : "Gaming-Audio",
					volume: t.volume_target_denon
				}) : /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
					icon: M.Gamepad2,
					title: "Kein Spiel aktiv",
					text: "PlayStation- und PC-Titel erscheinen automatisch aus Media State."
				}) }), /* @__PURE__ */ (0, j.jsx)(Ke, {
					reasons: t.reasons,
					activeReasons: e.active_reasons
				})]
			}),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "gaming-kpis",
				children: [
					/* @__PURE__ */ (0, j.jsxs)(N, { children: [
						/* @__PURE__ */ (0, j.jsx)("span", {
							className: "kpi-label",
							children: "Plattform"
						}),
						/* @__PURE__ */ (0, j.jsx)("strong", { children: A(e.gaming_platform || n) }),
						/* @__PURE__ */ (0, j.jsx)(Je, {
							tone: "cyan",
							children: Pe(r?.state)
						})
					] }),
					/* @__PURE__ */ (0, j.jsxs)(N, { children: [
						/* @__PURE__ */ (0, j.jsx)("span", {
							className: "kpi-label",
							children: "Erkannter Modus"
						}),
						/* @__PURE__ */ (0, j.jsx)("strong", { children: t.is_grind ? "Grind-Modus" : A(i?.display_name || i?.label || e.subcontext) }),
						/* @__PURE__ */ (0, j.jsxs)(Je, {
							tone: t.is_grind ? "pink" : "violet",
							children: ["Enum ", i?.enum ?? "—"]
						})
					] }),
					/* @__PURE__ */ (0, j.jsxs)(N, { children: [
						/* @__PURE__ */ (0, j.jsx)("span", {
							className: "kpi-label",
							children: "Audio-Routing"
						}),
						/* @__PURE__ */ (0, j.jsx)("strong", { children: A(t.audio_owner) }),
						/* @__PURE__ */ (0, j.jsx)("small", { children: t.action ? A(t.action) : "Aktuelle Policy-Entscheidung" })
					] }),
					/* @__PURE__ */ (0, j.jsxs)(N, { children: [
						/* @__PURE__ */ (0, j.jsx)("span", {
							className: "kpi-label",
							children: "Subwoofer"
						}),
						/* @__PURE__ */ (0, j.jsx)("strong", { children: t.subwoofer_allowed ? "Erlaubt" : "Gesperrt" }),
						/* @__PURE__ */ (0, j.jsx)(Je, {
							tone: t.subwoofer_allowed ? "green" : "orange",
							children: t.is_grind ? "Grind reduziert" : "Policy"
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "dashboard-grid volumes",
				children: [/* @__PURE__ */ (0, j.jsx)(Ge, {
					name: "HomePods",
					data: t.volume_formula?.homepods,
					accent: "pink"
				}), /* @__PURE__ */ (0, j.jsx)(Ge, {
					name: "Denon AVR-X1400H",
					data: t.volume_formula?.denon,
					accent: "cyan"
				})]
			}),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "dashboard-grid gaming-bottom",
				children: [/* @__PURE__ */ (0, j.jsxs)(N, {
					title: "Title Classifier",
					children: [/* @__PURE__ */ (0, j.jsxs)("div", {
						className: "classifier-panel",
						children: [
							/* @__PURE__ */ (0, j.jsxs)("div", { children: [
								/* @__PURE__ */ (0, j.jsx)(M.WandSparkles, {}),
								/* @__PURE__ */ (0, j.jsx)("span", { children: "Anzeigename" }),
								/* @__PURE__ */ (0, j.jsx)("b", { children: i?.display_name || o })
							] }),
							/* @__PURE__ */ (0, j.jsxs)("div", { children: [
								/* @__PURE__ */ (0, j.jsx)(M.CircleGauge, {}),
								/* @__PURE__ */ (0, j.jsx)("span", { children: "Modus" }),
								/* @__PURE__ */ (0, j.jsx)("b", { children: A(i?.label) })
							] }),
							/* @__PURE__ */ (0, j.jsxs)("div", { children: [
								/* @__PURE__ */ (0, j.jsx)(M.Info, {}),
								/* @__PURE__ */ (0, j.jsx)("span", { children: "Katalog-ID" }),
								/* @__PURE__ */ (0, j.jsx)("b", { children: i?.entry_id || "Noch nicht im Contract" })
							] })
						]
					}), /* @__PURE__ */ (0, j.jsxs)("button", {
						className: "button edit-disabled",
						disabled: !0,
						title: "Editierbar, sobald der Title-Classifier einen stabilen Entry-Identifier und eine Update-Action publiziert",
						children: [/* @__PURE__ */ (0, j.jsx)(M.Settings2, { size: 17 }), "Klassifizierung bearbeiten (vorbereitet)"]
					})]
				}), /* @__PURE__ */ (0, j.jsx)(N, {
					title: "Lautstärken & Geräte",
					children: /* @__PURE__ */ (0, j.jsxs)("div", {
						className: "key-values",
						children: [
							/* @__PURE__ */ (0, j.jsxs)("span", { children: ["HomePods", /* @__PURE__ */ (0, j.jsx)("b", { children: je(t.volume_target_homepods) })] }),
							/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Denon", /* @__PURE__ */ (0, j.jsx)("b", { children: je(t.volume_target_denon) })] }),
							/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Headset", /* @__PURE__ */ (0, j.jsx)("b", { children: e.headset_active ? "Aktiv" : "Nicht aktiv" })] }),
							/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Entertainment", /* @__PURE__ */ (0, j.jsx)("b", { children: e.entertainment_active ? "Aktiv" : "Aus" })] })
						]
					})
				})]
			})
		]
	});
}
//#endregion
//#region frontend-src/src/pages/TvPage.tsx
function lt({ state: e = {}, policy: t = {} }) {
	let n = e.devices?.tv, r = e.devices?.apple_tv, i = !!(n?.active || r?.active || ["tv", "streaming"].includes(e.context || "")), a = r?.app || r?.source || n?.source || e.subcontext, o = r?.title || n?.title || a || (i ? "TV aktiv" : "Kein TV-Inhalt aktiv");
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "tv-page",
		children: [
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "tv-hero",
				children: [i ? /* @__PURE__ */ (0, j.jsx)(Ue, {
					kind: "tv",
					eyebrow: r?.active ? "Streaming" : "TV",
					title: o,
					subtitle: a ? `Quelle · ${a}` : void 0,
					detail: t.audio_scenario_detail || A(e.subcontext),
					artwork: r?.artwork_url || n?.artwork_url,
					device: "Denon AVR-X1400H",
					volume: t.volume_target_denon
				}) : /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
					icon: M.Tv,
					title: "TV und Streaming sind aus",
					text: "Quelle, App und Routing erscheinen, sobald TV oder Apple TV aktiv sind."
				}) }), /* @__PURE__ */ (0, j.jsx)(Ke, {
					reasons: t.reasons,
					activeReasons: e.active_reasons
				})]
			}),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "dashboard-grid tv-status",
				children: [/* @__PURE__ */ (0, j.jsx)(N, {
					title: "Geräte",
					children: /* @__PURE__ */ (0, j.jsx)(Ve, { devices: Object.fromEntries(Object.entries(e.devices || {}).filter(([e]) => [
						"tv",
						"apple_tv",
						"denon"
					].includes(e))) })
				}), /* @__PURE__ */ (0, j.jsx)(N, {
					title: "Aktuelle Entscheidung",
					children: /* @__PURE__ */ (0, j.jsxs)("div", {
						className: "key-values",
						children: [
							/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Szenario", /* @__PURE__ */ (0, j.jsx)("b", { children: t.audio_scenario_label || A(e.context) })] }),
							/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Routing", /* @__PURE__ */ (0, j.jsx)("b", { children: A(t.audio_owner) })] }),
							/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Denon Ziel", /* @__PURE__ */ (0, j.jsx)("b", { children: je(t.volume_target_denon) })] }),
							/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Aktion", /* @__PURE__ */ (0, j.jsx)("b", { children: A(t.action) })] })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, j.jsx)(Ge, {
				name: "Denon Lautstärke-Erklärung",
				data: t.volume_formula?.denon,
				accent: "cyan"
			})
		]
	});
}
//#endregion
//#region frontend-src/src/pages/RulesPage.tsx
var ut = {
	early_morning: "Früher Morgen",
	late_morning: "Später Morgen",
	forenoon: "Vormittag",
	afternoon: "Nachmittag",
	early_evening: "Früher Abend",
	late_evening: "Später Abend",
	early_night: "Frühe Nacht",
	late_night: "Späte Nacht"
}, dt = {
	idle: "Inaktiv",
	free_time: "Freizeit",
	work_home: "Arbeit zuhause",
	work_away: "Arbeit außer Haus",
	household: "Haushalt"
}, ft = [
	"idle",
	"free_time",
	"work_home",
	"work_away",
	"household"
], pt = ["homepods", "denon"], mt = { "auto_blocked:denon_off": "Automatischer Eintritt blockiert: Denon ist ausgeschaltet." };
function ht(e) {
	return e ? mt[e] || e : "Kein aktiver oder blockierter Grund";
}
function gt({ text: e }) {
	return /* @__PURE__ */ (0, j.jsx)("span", {
		className: "rule-help",
		title: e,
		"aria-label": e,
		children: /* @__PURE__ */ (0, j.jsx)(M.Info, { size: 15 })
	});
}
function _t({ value: e, offset: t = !1, overridden: n, disabled: r, onSave: i }) {
	let [a, o] = (0, y.useState)(e == null ? "" : String(Math.round(e * 100)));
	(0, y.useEffect)(() => {
		let t = window.setTimeout(() => o(e == null ? "" : String(Math.round(e * 100))), 0);
		return () => window.clearTimeout(t);
	}, [e]);
	let s = () => {
		!r && i && a !== "" && i(Number(a) / 100);
	};
	return /* @__PURE__ */ (0, j.jsxs)("label", {
		className: `percent-input ${n ? "overridden" : ""} ${r ? "readonly" : ""}`,
		title: t ? "Offset in Prozentpunkten" : "Lautstärke in Prozent",
		children: [/* @__PURE__ */ (0, j.jsx)("input", {
			"aria-label": t ? "Prozentpunkte" : "Prozent",
			type: "number",
			value: a,
			min: -100,
			max: 100,
			disabled: r,
			onChange: (e) => o(e.target.value),
			onBlur: s,
			onKeyDown: (e) => e.key === "Enter" && s()
		}), /* @__PURE__ */ (0, j.jsx)("span", { children: t ? "Pkt." : "%" })]
	});
}
function vt({ value: e, unit: t = "", missing: n }) {
	return e == null ? /* @__PURE__ */ (0, j.jsx)("span", {
		className: "contract-missing",
		title: n || "Dieser Wert fehlt im aktuellen Umbrella-Contract.",
		children: "Contract fehlt"
	}) : /* @__PURE__ */ (0, j.jsxs)("strong", {
		className: "read-value",
		children: [typeof e == "boolean" ? e ? "Ja" : "Nein" : e, t]
	});
}
function yt({ label: e, supported: t = !0, onReset: n }) {
	return /* @__PURE__ */ (0, j.jsxs)("button", {
		className: "button section-reset",
		disabled: !t,
		title: t ? `${e} auf Backend-Defaults zurücksetzen` : "Der Backend-Contract kann diesen Abschnitt noch nicht auf gespeicherte Defaults zurücksetzen.",
		onClick: n,
		children: [/* @__PURE__ */ (0, j.jsx)(M.RefreshCw, { size: 14 }), " Zurücksetzen"]
	});
}
function bt({ index: e, title: t, sub: n, unit: r, help: i, resetSupported: a = !0, onReset: o }) {
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "rule-title",
		children: [
			/* @__PURE__ */ (0, j.jsx)("span", { children: e }),
			/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsxs)("h2", { children: [
				t,
				" ",
				/* @__PURE__ */ (0, j.jsx)(gt, { text: i })
			] }), /* @__PURE__ */ (0, j.jsx)("p", { children: n })] }),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "rule-title-actions",
				children: [r && /* @__PURE__ */ (0, j.jsx)(Je, {
					tone: "violet",
					children: r
				}), /* @__PURE__ */ (0, j.jsx)(yt, {
					label: t,
					supported: a,
					onReset: o
				})]
			}),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "rule-device-head",
				children: [/* @__PURE__ */ (0, j.jsx)("b", { children: "HomePods" }), /* @__PURE__ */ (0, j.jsx)("b", { children: "Denon" })]
			})
		]
	});
}
function xt({ matrix: e, dimension: t, rows: n, labels: r, offset: i, onSave: a }) {
	return /* @__PURE__ */ (0, j.jsx)("div", {
		className: "rule-table",
		children: n.map((n) => /* @__PURE__ */ (0, j.jsxs)("div", {
			className: "rule-row",
			children: [/* @__PURE__ */ (0, j.jsx)("span", { children: r[n] || e.catalog.scenario_labels[n] || A(n) }), pt.map((r) => /* @__PURE__ */ (0, j.jsx)(_t, {
				offset: i,
				value: e[t]?.[r]?.[n] ?? 0,
				overridden: e.override?.[t]?.[r]?.[n] !== void 0,
				onSave: (e) => a(r, n, e)
			}, r))]
		}, n))
	});
}
function St({ matrix: e, apply: t = {}, state: n = {}, hass: r, onMatrix: i }) {
	let [a, o] = (0, y.useState)("matrix"), [s, c] = (0, y.useState)(!1), l = (0, y.useMemo)(() => e?.catalog.scenarios.filter((e) => ![
		"gaming",
		"private",
		"private_time"
	].includes(e)) || [], [e]);
	if (!e) return /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
		icon: M.SlidersHorizontal,
		title: "Regel-Contract nicht verfügbar",
		text: "benni_media_policy/get_matrix konnte nicht geladen werden. Es wird nichts lokal gespeichert."
	}) });
	let u = async (e, t, n, a) => {
		c(!0);
		try {
			i(await nt(r, { [e]: { [t]: { [n]: a } } }));
		} finally {
			c(!1);
		}
	}, d = async (e, t) => {
		c(!0);
		try {
			i(await rt(r, { [e]: t }));
		} finally {
			c(!1);
		}
	}, f = async (e, t, n) => {
		if (!window.confirm(`${e} zurücksetzen? Es werden nur die gespeicherten Overrides dieses Abschnitts gelöscht; andere Regeln bleiben unverändert.`)) return;
		let a = Object.fromEntries(n.map((e) => [e, null]));
		c(!0);
		try {
			i(await nt(r, { [t]: {
				homepods: a,
				denon: a
			} }));
		} finally {
			c(!1);
		}
	}, p = (t) => e.scalars[t], m = n.private_time_active ? n.private_source === "automatic" ? "Automatischer Pfad aktiv" : n.private_source === "manual" ? "Manueller Pfad aktiv" : "Private Time aktiv" : "Kein Pfad aktiv";
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: `rules-page ${s ? "busy" : ""}`,
		children: [
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "rules-tabs",
				children: [
					/* @__PURE__ */ (0, j.jsx)(Xe, {
						active: a === "matrix",
						onClick: () => o("matrix"),
						icon: M.SlidersHorizontal,
						children: "Matrix"
					}),
					/* @__PURE__ */ (0, j.jsx)(Xe, {
						active: a === "gaming",
						onClick: () => o("gaming"),
						icon: M.Gamepad2,
						children: "Gaming-Modi"
					}),
					/* @__PURE__ */ (0, j.jsx)(Xe, {
						active: a === "safety",
						onClick: () => o("safety"),
						icon: M.ShieldCheck,
						children: "Caps & Private Time"
					}),
					/* @__PURE__ */ (0, j.jsx)(Xe, {
						active: a === "delays",
						onClick: () => o("delays"),
						icon: M.Activity,
						children: "Delays, Sleep & Waking"
					}),
					/* @__PURE__ */ (0, j.jsx)("span", {}),
					/* @__PURE__ */ (0, j.jsxs)("button", {
						className: "button danger",
						title: "Löscht ausschließlich Matrix-Overrides für Tagesphasen-Basis, Szenario-Offsets und Activity-Offsets.",
						onClick: async () => {
							window.confirm("Matrixwerte auf Standard zurücksetzen? Betroffen sind ausschließlich Tagesphasen-Basis, Szenario-Offsets einschließlich Gaming Normal und Activity-Offsets. Fensterwerte, Grind-Offsets, Private-Time-Cap, Quiet/Ducking, Boost, Caps sowie Apply-Optionen und Delays bleiben unverändert.") && i(await it(r));
						},
						children: [/* @__PURE__ */ (0, j.jsx)(M.RefreshCw, { size: 17 }), "Matrixwerte auf Standard zurücksetzen"]
					})
				]
			}),
			/* @__PURE__ */ (0, j.jsxs)("p", {
				className: "reset-explainer",
				children: [/* @__PURE__ */ (0, j.jsx)(M.Info, { size: 14 }), " Der globale Reset löscht nur den Policy-Matrix-Store. Skalare und Apply-Optionen besitzen im aktuellen Contract keinen Reset-Endpunkt."]
			}),
			a === "matrix" && /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [
				/* @__PURE__ */ (0, j.jsxs)(N, {
					className: "rule-section",
					children: [/* @__PURE__ */ (0, j.jsx)(bt, {
						index: 1,
						title: "Tagesphasen-Basis",
						sub: "Grundlautstärke je Tagesphase und Gerät",
						unit: "Prozent",
						help: "Baselines sind absolute Lautstärken. Intern speichert die Policy 0,0–1,0; hier werden 0–100 % angezeigt.",
						onReset: () => void f("Tagesphasen-Basis", "base", e.catalog.dayphases)
					}), /* @__PURE__ */ (0, j.jsx)(xt, {
						matrix: e,
						dimension: "base",
						rows: e.catalog.dayphases,
						labels: ut,
						onSave: (e, t, n) => void u("base", e, t, n)
					})]
				}),
				/* @__PURE__ */ (0, j.jsxs)(N, {
					className: "rule-section",
					children: [/* @__PURE__ */ (0, j.jsx)(bt, {
						index: 2,
						title: "Fenster",
						sub: "Geschlossen ohne Abzug; gekippt und offen verwenden denselben Wert",
						unit: "Prozentpunkte",
						help: "Der Öffnungs-Master unterscheidet geschlossen, gekippt und offen. Die Policy wendet für gekippt und offen bewusst denselben gerätespezifischen Offset an.",
						resetSupported: !1
					}), /* @__PURE__ */ (0, j.jsxs)("div", {
						className: "rule-table",
						children: [
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "rule-row",
								children: [/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Geschlossen ", /* @__PURE__ */ (0, j.jsx)(Je, {
									tone: "green",
									children: "fest 0"
								})] }), pt.map((e) => /* @__PURE__ */ (0, j.jsx)(_t, {
									value: 0,
									offset: !0,
									disabled: !0
								}, e))]
							}),
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "rule-row",
								children: [
									/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Gekippt ", /* @__PURE__ */ (0, j.jsx)(Je, {
										tone: "orange",
										children: "additiv"
									})] }),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("opening_offset_homepods"),
										offset: !0,
										onSave: (e) => void d("opening_offset_homepods", e)
									}),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("opening_offset_denon"),
										offset: !0,
										onSave: (e) => void d("opening_offset_denon", e)
									})
								]
							}),
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "rule-row",
								children: [
									/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Offen ", /* @__PURE__ */ (0, j.jsx)(Je, {
										tone: "violet",
										children: "wie gekippt"
									})] }),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("opening_offset_homepods"),
										offset: !0,
										disabled: !0
									}),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("opening_offset_denon"),
										offset: !0,
										disabled: !0
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, j.jsxs)(N, {
					className: "rule-section",
					children: [/* @__PURE__ */ (0, j.jsx)(bt, {
						index: 3,
						title: "Szenario-Offsets",
						sub: "Allgemeine additive Offsets; Gaming und Private Time sind separat modelliert",
						unit: "Prozentpunkte",
						help: "Private Time ist kein normaler Szenario-Offset. Gaming besitzt eigene Modusregeln und wird deshalb im nächsten Reiter dargestellt.",
						onReset: () => void f("Szenario-Offsets", "scenario_off", l)
					}), /* @__PURE__ */ (0, j.jsx)(xt, {
						matrix: e,
						dimension: "scenario_off",
						rows: l,
						labels: {},
						offset: !0,
						onSave: (e, t, n) => void u("scenario_off", e, t, n)
					})]
				}),
				/* @__PURE__ */ (0, j.jsxs)(N, {
					className: "rule-section",
					children: [/* @__PURE__ */ (0, j.jsx)(bt, {
						index: 4,
						title: "Activity-Offsets",
						sub: "Vollständiger Activity-Katalog aus dem Lastenheft",
						unit: "Prozentpunkte",
						help: "Der Backend-Store akzeptiert offene Activity-Keys. Die UX zeigt deshalb auch idle, free_time und household, obwohl der aktuelle Katalog-Endpunkt nur die beiden Work-Werte listet.",
						onReset: () => void f("Activity-Offsets", "activity_off", ft)
					}), /* @__PURE__ */ (0, j.jsx)(xt, {
						matrix: e,
						dimension: "activity_off",
						rows: ft,
						labels: dt,
						offset: !0,
						onSave: (e, t, n) => void u("activity_off", e, t, n)
					})]
				})
			] }),
			a === "gaming" && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: "mode-stack",
				children: [
					/* @__PURE__ */ (0, j.jsxs)(N, {
						className: "rule-section",
						children: [/* @__PURE__ */ (0, j.jsx)(bt, {
							index: 1,
							title: "Gaming Normal",
							sub: "Allgemeiner Gaming-Szenario-Offset je Gerät",
							unit: "Prozentpunkte",
							help: "Diese beiden Matrixzellen bilden den Normal-Modus. Sie werden auch als Grundanteil im Grind-Modus berücksichtigt.",
							onReset: () => void f("Gaming Normal", "scenario_off", ["gaming"])
						}), /* @__PURE__ */ (0, j.jsx)("div", {
							className: "rule-table",
							children: /* @__PURE__ */ (0, j.jsxs)("div", {
								className: "rule-row",
								children: [/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Gaming Normal ", /* @__PURE__ */ (0, j.jsx)(Je, {
									tone: "cyan",
									children: "Classifier 0"
								})] }), pt.map((t) => /* @__PURE__ */ (0, j.jsx)(_t, {
									offset: !0,
									value: e.scenario_off?.[t]?.gaming ?? 0,
									overridden: e.override?.scenario_off?.[t]?.gaming !== void 0,
									onSave: (e) => void u("scenario_off", t, "gaming", e)
								}, t))]
							})
						})]
					}),
					/* @__PURE__ */ (0, j.jsxs)(N, {
						className: "rule-section",
						children: [/* @__PURE__ */ (0, j.jsx)(bt, {
							index: 2,
							title: "Gaming Grind",
							sub: "Zusätzliche Grind-Offsets; HomePods dominant, Denon als Kulisse",
							unit: "Prozentpunkte",
							help: "Berechnung: Gaming-Normal-Offset plus Grind-Offset. Der Subwoofer-Block ist eine feste R16-Regel und kein gewöhnlicher Offset.",
							resetSupported: !1
						}), /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "rule-table",
							children: [/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "rule-row",
								children: [
									/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Zusätzlicher Grind-Offset ", /* @__PURE__ */ (0, j.jsx)(Je, {
										tone: "pink",
										children: "Classifier 1"
									})] }),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										offset: !0,
										value: p("grind_homepods_offset"),
										onSave: (e) => void d("grind_homepods_offset", e)
									}),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										offset: !0,
										value: p("grind_denon_offset"),
										onSave: (e) => void d("grind_denon_offset", e)
									})
								]
							}), /* @__PURE__ */ (0, j.jsxs)("div", {
								className: "rule-row hard-rule",
								children: [/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Subwoofer ", /* @__PURE__ */ (0, j.jsx)(Je, {
									tone: "orange",
									children: "Hard-Override"
								})] }), /* @__PURE__ */ (0, j.jsx)("strong", {
									className: "span-devices",
									children: "Immer gesperrt · nicht editierbar"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, j.jsxs)(N, {
						className: "rule-section",
						children: [/* @__PURE__ */ (0, j.jsx)(bt, {
							index: 3,
							title: "Gaming Headset",
							sub: "Definierter Classifier-Modus: Das Headset trägt den Spielton",
							help: "Der Title Classifier liefert gaming_headset (Enum 2). Die feste Headset-Regel sperrt den Subwoofer; auf dem PC bleibt Raum-Musik erhalten und der Denon aus. Lediglich ein editierbarer Geräte-Offset-Contract ist noch nicht implementiert.",
							resetSupported: !1
						}), /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "fixed-rule-grid",
							children: [
								/* @__PURE__ */ (0, j.jsxs)("div", { children: [
									/* @__PURE__ */ (0, j.jsx)(Je, {
										tone: "cyan",
										children: "Classifier 2"
									}),
									/* @__PURE__ */ (0, j.jsx)("b", { children: "Spielton über Headset" }),
									/* @__PURE__ */ (0, j.jsxs)("span", { children: [
										"Der definierte Modus ist ",
										/* @__PURE__ */ (0, j.jsx)("code", { children: "gaming_headset" }),
										"."
									] })
								] }),
								/* @__PURE__ */ (0, j.jsxs)("div", { children: [
									/* @__PURE__ */ (0, j.jsx)(Je, {
										tone: "orange",
										children: "Hard-Override"
									}),
									/* @__PURE__ */ (0, j.jsx)("b", { children: "Subwoofer gesperrt" }),
									/* @__PURE__ */ (0, j.jsxs)("span", { children: [
										"Gilt, sobald ",
										/* @__PURE__ */ (0, j.jsx)("code", { children: "headset_active" }),
										" gesetzt ist."
									] })
								] }),
								/* @__PURE__ */ (0, j.jsxs)("div", { children: [
									/* @__PURE__ */ (0, j.jsx)(Je, {
										tone: "orange",
										children: "Umsetzungslücke"
									}),
									/* @__PURE__ */ (0, j.jsx)("b", { children: "Kein editierbarer Geräte-Offset" }),
									/* @__PURE__ */ (0, j.jsx)("span", { children: "Das Feld bleibt read-only, bis ein persistenter Backend-Contract existiert." })
								] })
							]
						})]
					})
				]
			}),
			a === "safety" && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: "safety-grid",
				children: [
					/* @__PURE__ */ (0, j.jsxs)(N, {
						className: "private-card",
						title: "Private Time",
						action: /* @__PURE__ */ (0, j.jsx)(yt, {
							label: "Private Time",
							supported: !1
						}),
						children: [
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "private-paths",
								children: [/* @__PURE__ */ (0, j.jsxs)("div", { children: [
									/* @__PURE__ */ (0, j.jsx)(Je, {
										tone: "violet",
										children: "Automatisch"
									}),
									/* @__PURE__ */ (0, j.jsx)("b", { children: "Classifier + PC + Denon" }),
									/* @__PURE__ */ (0, j.jsx)("span", { children: "Alle drei Bedingungen müssen gleichzeitig aktiv sein." })
								] }), /* @__PURE__ */ (0, j.jsxs)("div", { children: [
									/* @__PURE__ */ (0, j.jsx)(Je, {
										tone: "cyan",
										children: "Manuell"
									}),
									/* @__PURE__ */ (0, j.jsx)("b", { children: "Schalter + PC" }),
									/* @__PURE__ */ (0, j.jsx)("span", { children: "Headset-Pfad ohne Denon und ohne Classifier; schaltet Denon nie ein." })
								] })]
							}),
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "hard-rule-banner",
								children: [/* @__PURE__ */ (0, j.jsx)(M.LockKeyhole, { size: 18 }), /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("b", { children: "HomePods bleiben aus" }), /* @__PURE__ */ (0, j.jsx)("span", { children: "Beide Private-Time-Pfade übersteuern die normale Matrix. Private Time startet niemals eine Wake-Sequenz." })] })]
							}),
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "private-values",
								children: [
									/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Denon-Cap" }), /* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("private_denon_cap"),
										onSave: (e) => void d("private_denon_cap", e)
									})] }),
									/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Exit-Delay" }), /* @__PURE__ */ (0, j.jsx)(vt, {
										value: t.private_exit?.delay_s,
										unit: " s",
										missing: "Apply besitzt die Option private_exit_delay_seconds, veröffentlicht den aktuellen Wert aber nicht im Status."
									})] }),
									/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Aktiver Pfad" }), /* @__PURE__ */ (0, j.jsx)("strong", { children: m })] }),
									/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "Diagnose" }), /* @__PURE__ */ (0, j.jsx)("strong", { children: ht(n.private_reason || n.private_blocked_reason) })] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, j.jsxs)(N, {
						title: "Quiet, Boost & Mute",
						action: /* @__PURE__ */ (0, j.jsx)(yt, {
							label: "Quiet, Boost & Mute",
							supported: !1
						}),
						children: [/* @__PURE__ */ (0, j.jsxs)("div", {
							className: "scalar-list detailed",
							children: [/* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Quiet / Ducking ", /* @__PURE__ */ (0, j.jsx)("small", { children: "gemeinsamer Contract für beide Geräte" })] }), /* @__PURE__ */ (0, j.jsx)(_t, {
								value: p("ducked_target"),
								onSave: (e) => void d("ducked_target", e)
							})] }), /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Track Boost ", /* @__PURE__ */ (0, j.jsx)("small", { children: "nur HomePods" })] }), /* @__PURE__ */ (0, j.jsx)(_t, {
								offset: !0,
								value: p("boost_offset"),
								onSave: (e) => void d("boost_offset", e)
							})] })]
						}), /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "rule-notes",
							children: [
								/* @__PURE__ */ (0, j.jsxs)("p", { children: [/* @__PURE__ */ (0, j.jsx)(Je, {
									tone: "orange",
									children: "Hard-Override"
								}), " Quiet setzt aktive Ausgaben direkt auf das Ducking-Ziel und übergeht die Matrix."] }),
								/* @__PURE__ */ (0, j.jsxs)("p", { children: [/* @__PURE__ */ (0, j.jsx)(Je, {
									tone: "violet",
									children: "Boost-Block"
								}), " Blockiert bei Arbeit zuhause, Arbeit außer Haus und Quiet Mode."] }),
								/* @__PURE__ */ (0, j.jsxs)("p", { children: [/* @__PURE__ */ (0, j.jsx)(Je, {
									tone: "orange",
									children: "Hard-Mute"
								}), " HomePods-Classifier Enum 2 setzt die HomePods unabhängig von der Matrix auf 0."] }),
								/* @__PURE__ */ (0, j.jsx)("p", {
									className: "contract-warning",
									children: "Der Contract hat nur einen gemeinsamen Ducking-Wert. Getrennte HomePods-/Denon-Werte fehlen."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, j.jsxs)(N, {
						title: "Caps & Grenzen",
						action: /* @__PURE__ */ (0, j.jsx)(yt, {
							label: "Caps & Grenzen",
							supported: !1
						}),
						children: [
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "device-scalar-head",
								children: [/* @__PURE__ */ (0, j.jsx)("b", { children: "HomePods" }), /* @__PURE__ */ (0, j.jsx)("b", { children: "Denon" })]
							}),
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "paired-values",
								children: [
									/* @__PURE__ */ (0, j.jsx)("span", { children: "Maximalpegel" }),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("homepods_max"),
										onSave: (e) => void d("homepods_max", e)
									}),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("denon_max"),
										onSave: (e) => void d("denon_max", e)
									}),
									/* @__PURE__ */ (0, j.jsx)("span", { children: "Aktiv-Mindestpegel" }),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("active_min"),
										onSave: (e) => void d("active_min", e)
									}),
									/* @__PURE__ */ (0, j.jsx)(_t, {
										value: p("active_min"),
										disabled: !0
									})
								]
							}),
							/* @__PURE__ */ (0, j.jsx)("p", {
								className: "muted-copy",
								children: "Der Mindestpegel ist ein gemeinsamer Policy-Wert. Caps greifen nach additiver Matrix und Nudge; Hard-Overrides bleiben dominant."
							})
						]
					})
				]
			}),
			a === "delays" && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: "delay-grid",
				children: [
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Sleep",
						action: /* @__PURE__ */ (0, j.jsx)(yt, {
							label: "Sleep",
							supported: !1
						}),
						children: /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "key-values rule-values",
							children: [
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["HomePods im Sleep", /* @__PURE__ */ (0, j.jsx)("b", { children: /* @__PURE__ */ (0, j.jsx)(Je, {
									tone: "orange",
									children: "Aus · Hard-Override"
								}) })] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Denon-Sleep-Ziel", /* @__PURE__ */ (0, j.jsx)(vt, { missing: "R25 fordert einen eigenen Denon-Sleep-Zielwert; Policy-Property und Berechnung fehlen." })] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["TV automatisch aus", /* @__PURE__ */ (0, j.jsx)(vt, {
									value: t.sleep_tv?.delay_s,
									unit: " s"
								})] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Warn-Vorlauf", /* @__PURE__ */ (0, j.jsx)(vt, {
									value: t.sleep_tv?.warn_lead_s,
									unit: " s"
								})] })
							]
						})
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Denon-Nachlauf & Private Exit",
						action: /* @__PURE__ */ (0, j.jsx)(yt, {
							label: "Nachlauf & Private Exit",
							supported: !1
						}),
						children: /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "key-values rule-values",
							children: [
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Nachlauf PC", /* @__PURE__ */ (0, j.jsx)(vt, { missing: "Option denon_nachlauf_pc_seconds existiert, wird aber im Apply-Status nicht als konfigurierter Wert veröffentlicht." })] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Nachlauf TV", /* @__PURE__ */ (0, j.jsx)(vt, { missing: "Option denon_nachlauf_tv_seconds existiert, wird aber im Apply-Status nicht als konfigurierter Wert veröffentlicht." })] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Private-Time-Exit", /* @__PURE__ */ (0, j.jsx)(vt, {
									value: t.private_exit?.delay_s,
									unit: " s",
									missing: "Option private_exit_delay_seconds existiert, wird aber im Apply-Status nicht veröffentlicht."
								})] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Timer aktuell aktiv", /* @__PURE__ */ (0, j.jsx)(vt, { value: !!t.nachlauf?.active })] })
							]
						})
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "HomePods-Ramp",
						action: /* @__PURE__ */ (0, j.jsx)(yt, {
							label: "HomePods-Ramp",
							supported: !1
						}),
						children: /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "key-values rule-values",
							children: [
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Ramp-Schritte", /* @__PURE__ */ (0, j.jsx)(vt, { value: t.settings?.ramp_steps })] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Ramp-Intervall", /* @__PURE__ */ (0, j.jsx)(vt, {
									value: t.settings?.ramp_step_delay_s,
									unit: " s"
								})] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Tiny Delta", /* @__PURE__ */ (0, j.jsx)(vt, { value: t.settings?.tiny_delta == null ? null : `${Math.round(Number(t.settings.tiny_delta) * 100)} %` })] }),
								/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Ramp aktuell", /* @__PURE__ */ (0, j.jsx)(vt, { value: !!t.ramp_active })] })
							]
						})
					}),
					/* @__PURE__ */ (0, j.jsxs)(N, {
						className: "waking-card",
						title: "Waking",
						action: /* @__PURE__ */ (0, j.jsx)(yt, {
							label: "Waking",
							supported: !1
						}),
						children: [
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "waking-formula",
								children: [
									/* @__PURE__ */ (0, j.jsx)("span", { children: "Tagesphasen-Basis HomePods" }),
									/* @__PURE__ */ (0, j.jsx)("b", { children: "+" }),
									/* @__PURE__ */ (0, j.jsx)("span", {
										className: "missing-field",
										children: "Waking-Offset: Contract fehlt"
									}),
									/* @__PURE__ */ (0, j.jsx)("b", { children: "=" }),
									/* @__PURE__ */ (0, j.jsx)("span", { children: "Ergebnis auf 0–100 % begrenzen" })
								]
							}),
							/* @__PURE__ */ (0, j.jsxs)("p", { children: [
								"Der neue Offset gilt ausschließlich für HomePods bei ",
								/* @__PURE__ */ (0, j.jsx)("code", { children: "bio_state=waking" }),
								". Denon bleibt unberührt. Die Startlautstärke der Wake-Rampe ist davon getrennt."
							] }),
							/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "key-values rule-values",
								children: [
									/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Benötigte Property", /* @__PURE__ */ (0, j.jsx)("b", { children: /* @__PURE__ */ (0, j.jsx)("code", { children: "waking_homepods_offset" }) })] }),
									/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Wake-Startlautstärke", /* @__PURE__ */ (0, j.jsx)(vt, { value: t.wake?.start_volume == null ? null : `${Math.round(Number(t.wake.start_volume) * 100)} %` })] }),
									/* @__PURE__ */ (0, j.jsxs)("span", { children: ["Wake-Debounce", /* @__PURE__ */ (0, j.jsx)(vt, {
										value: t.wake?.debounce_s,
										unit: " s"
									})] })
								]
							}),
							/* @__PURE__ */ (0, j.jsx)("div", {
								className: "contract-warning",
								children: "Das Eingabefeld bleibt deaktiviert, bis Policy-Persistenz, `get_matrix.scalars`, `set_scalars` und die Berechnung nach der Tagesphasen-Basis vorhanden sind."
							})
						]
					}),
					/* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
						icon: M.LockKeyhole,
						title: "Apply-Werte nur lesbar",
						text: "Apply-Delays, Sleep und Wake sind im Options-Flow konfigurierbar, besitzen aber keine persistente Umbrella-Schreib- oder Reset-API. Fehlende Snapshot-Werte werden nicht durch Defaults vorgetäuscht."
					}) })
				]
			})
		]
	});
}
//#endregion
//#region frontend-src/src/pages/DiagnosticsPage.tsx
function Ct({ data: e }) {
	let [t, n] = (0, y.useState)("state"), r = e.state?.data || {}, i = e.policy?.data || {}, a = e.apply?.data || {}, o = e.diagnostics?.data || {};
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "diagnostics-page",
		children: [
			/* @__PURE__ */ (0, j.jsx)("div", {
				className: "diag-tabs",
				children: [
					["state", "Zustand"],
					["policy", "Entscheidung"],
					["apply", "Apply & Queue"],
					["bindings", "Bindings"],
					["logs", "Logs"],
					["raw", "Raw JSON"]
				].map(([e, r]) => /* @__PURE__ */ (0, j.jsx)(Xe, {
					active: t === e,
					onClick: () => n(e),
					children: r
				}, e))
			}),
			t === "state" && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: "diag-grid",
				children: [
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Zustandserkennung",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: {
							Szenario: r.context || r.media_scenario,
							Subkontext: r.subcontext,
							Gerät: r.device,
							"Gaming-Quelle": r.gaming_source,
							Plattform: r.gaming_platform,
							"Entertainment aktiv": r.entertainment_active,
							"Headset aktiv": r.headset_active
						} })
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Core-State-Kontext",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: r.context_cards || {} })
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Aktive Gründe",
						children: /* @__PURE__ */ (0, j.jsx)(wt, { values: r.active_reasons || [] })
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Classifier",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: Object.fromEntries(Object.entries(r.classifiers || {}).map(([e, t]) => [e, `${t.enum ?? "—"} · ${t.label || "—"}`])) })
					})
				]
			}),
			t === "policy" && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: "diag-grid",
				children: [
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Decision Engine",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: {
							"Audio Owner": i.audio_owner,
							Szenario: i.audio_scenario_label,
							Detail: i.audio_scenario_detail,
							Aktion: i.action,
							"Volume Policy": i.volume_policy,
							HomePods: je(i.volume_target_homepods),
							Denon: je(i.volume_target_denon),
							"Subwoofer erlaubt": i.subwoofer_allowed
						} })
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Why-Stack",
						children: /* @__PURE__ */ (0, j.jsx)("div", {
							className: "diag-list",
							children: (i.reasons || []).map((e, t) => /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)(Je, {
								tone: e.severity === "warn" ? "orange" : "green",
								children: e.severity || "ok"
							}), /* @__PURE__ */ (0, j.jsx)("span", { children: e.text })] }, t))
						})
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Nudge / Boost",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: i.nudge || {} })
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Volume-Formel",
						children: /* @__PURE__ */ (0, j.jsx)("pre", { children: JSON.stringify(i.volume_formula || {}, null, 2) })
					})
				]
			}),
			t === "apply" && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: "diag-grid",
				children: [
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Gate",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: a.gates || {} })
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Queue / Debounce",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: a.debounce || {} })
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Nächster Plan",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: a.plan || {} })
					}),
					/* @__PURE__ */ (0, j.jsx)(N, {
						title: "Nachlauf",
						children: /* @__PURE__ */ (0, j.jsx)(P, { data: a.nachlauf || {} })
					})
				]
			}),
			t === "bindings" && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: "binding-grid",
				children: [Object.entries(o.bindings || {}).map(([e, t]) => /* @__PURE__ */ (0, j.jsx)(N, {
					title: `Bindings · ${A(e)}`,
					children: /* @__PURE__ */ (0, j.jsx)("div", {
						className: "bindings",
						children: t.map((e) => /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsxs)("span", { children: [e.key, /* @__PURE__ */ (0, j.jsx)("small", { children: e.entity_id || "nicht gebunden" })] }), /* @__PURE__ */ (0, j.jsx)(Je, {
							tone: e.status === "bound" ? "green" : e.status === "unavailable" ? "orange" : "neutral",
							children: e.status
						})] }, e.key))
					})
				}, e)), !Object.keys(o.bindings || {}).length && /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
					title: "Keine Binding-Daten",
					text: "Diagnostics liefert derzeit keine Bindings."
				}) })]
			}),
			t === "logs" && /* @__PURE__ */ (0, j.jsx)(N, {
				title: "Apply-Log",
				children: /* @__PURE__ */ (0, j.jsx)("div", {
					className: "action-log technical",
					children: (a.log || []).map((e, t) => /* @__PURE__ */ (0, j.jsxs)("div", { children: [
						/* @__PURE__ */ (0, j.jsx)("time", { children: Ne(e.ts) }),
						/* @__PURE__ */ (0, j.jsx)(M.Activity, { size: 16 }),
						/* @__PURE__ */ (0, j.jsxs)("span", { children: [
							e.action || "—",
							" · HP ",
							je(e.homepods_target),
							" · Denon ",
							je(e.denon_target)
						] }),
						/* @__PURE__ */ (0, j.jsx)(Je, {
							tone: e.executed ? "green" : "orange",
							children: e.executed ? "live" : "shadow"
						})
					] }, t))
				})
			}),
			t === "raw" && /* @__PURE__ */ (0, j.jsx)(N, {
				title: "Raw JSON",
				action: /* @__PURE__ */ (0, j.jsx)("button", {
					className: "button",
					onClick: () => void navigator.clipboard?.writeText(JSON.stringify({
						state: r,
						policy: i,
						apply: a,
						diagnostics: o
					}, null, 2)),
					children: "JSON kopieren"
				}),
				children: /* @__PURE__ */ (0, j.jsx)("pre", {
					className: "raw-json",
					children: JSON.stringify({
						state: r,
						policy: i,
						apply: a,
						diagnostics: o
					}, null, 2)
				})
			})
		]
	});
}
function P({ data: e }) {
	let t = Object.entries(e).filter(([, e]) => e !== void 0);
	return t.length ? /* @__PURE__ */ (0, j.jsx)("div", {
		className: "key-values",
		children: t.map(([e, t]) => /* @__PURE__ */ (0, j.jsxs)("span", { children: [A(e), /* @__PURE__ */ (0, j.jsx)("b", { children: typeof t == "object" ? JSON.stringify(t) : typeof t == "boolean" ? t ? "Ja" : "Nein" : String(t ?? "—") })] }, e))
	}) : /* @__PURE__ */ (0, j.jsx)(Le, {
		compact: !0,
		title: "Keine Daten",
		text: "Dieser Snapshot-Bereich ist leer."
	});
}
function wt({ values: e }) {
	return e.length ? /* @__PURE__ */ (0, j.jsx)("div", {
		className: "diag-list",
		children: e.map((e) => /* @__PURE__ */ (0, j.jsxs)("div", { children: [/* @__PURE__ */ (0, j.jsx)(M.ChevronRight, { size: 16 }), /* @__PURE__ */ (0, j.jsx)("span", { children: e })] }, e))
	}) : /* @__PURE__ */ (0, j.jsx)(Le, {
		compact: !0,
		title: "Keine Einträge",
		text: "Aktuell sind keine Gründe aktiv."
	});
}
//#endregion
//#region frontend-src/src/App.tsx
var Tt = () => {
	let e = window.location.hash.replace("#", "");
	return [
		"overview",
		"music",
		"gaming",
		"tv",
		"rules",
		"diagnostics"
	].includes(e) ? e : "overview";
};
function Et({ hass: e }) {
	let [t, n] = (0, y.useState)(Tt()), { data: r, setData: i, loading: a, error: o, refresh: s } = at(e);
	(0, y.useEffect)(() => {
		let e = () => n(Tt());
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []);
	let c = (e) => {
		window.location.hash = e, n(e);
	}, l = (e) => i((t) => ({
		...t,
		matrix: e
	})), u = r.state?.data || r.overview?.data?.raw?.state, d = r.policy?.data || r.overview?.data?.raw?.policy, f = r.apply?.data || r.overview?.data?.raw?.apply, p;
	return p = a && !r.overview ? /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "loading",
		children: [/* @__PURE__ */ (0, j.jsx)(M.RefreshCw, { className: "spin" }), /* @__PURE__ */ (0, j.jsx)("span", { children: "Media-Cockpit wird geladen …" })]
	}) }) : o && !r.overview ? /* @__PURE__ */ (0, j.jsx)(N, { children: /* @__PURE__ */ (0, j.jsx)(Le, {
		icon: M.AlertTriangle,
		title: "Cockpit nicht erreichbar",
		text: o
	}) }) : t === "overview" ? /* @__PURE__ */ (0, j.jsx)(ot, {
		data: r.overview?.data,
		hass: e,
		onChanged: () => void s(!0)
	}) : t === "music" ? /* @__PURE__ */ (0, j.jsx)(st, {
		state: u,
		policy: d,
		apply: f,
		hass: e,
		onChanged: () => void s(!0)
	}) : t === "gaming" ? /* @__PURE__ */ (0, j.jsx)(ct, {
		state: u,
		policy: d
	}) : t === "tv" ? /* @__PURE__ */ (0, j.jsx)(lt, {
		state: u,
		policy: d
	}) : t === "rules" ? /* @__PURE__ */ (0, j.jsx)(St, {
		matrix: r.matrix,
		apply: f,
		state: u,
		hass: e,
		onMatrix: l
	}) : /* @__PURE__ */ (0, j.jsx)(Ct, { data: r }), /* @__PURE__ */ (0, j.jsx)(Qe, {
		page: t,
		onPage: c,
		updatedAt: r.overview?.updated_at,
		modulesHealth: r.overview?.modules || r.state?.modules,
		onRefresh: () => void s(),
		refreshing: a,
		children: p
	});
}
//#endregion
//#region frontend-src/src/styles.css?inline
var Dt = ":host,#demo{--bg:#0d1018;--bg2:#121722;--panel:#171c29;--panel2:#1d2332;--line:#2b3242;--text:#eef0f8;--muted:#949caf;--violet:#a879ff;--pink:#ff5d9e;--cyan:#5db8ff;--green:#8bd450;--orange:#ffa337;--red:#ff5e6c;color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-size:14px}*{box-sizing:border-box}button,input{font:inherit}button{color:inherit}code{color:var(--cyan)}.app-shell{background:radial-gradient(circle at 45% -10%,#20263a 0,transparent 35%),var(--bg);grid-template-rows:56px minmax(calc(100vh - 92px),1fr) 36px;grid-template-columns:216px minmax(0,1fr);min-height:100vh;display:grid}.topbar{-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);z-index:20;background:#0c1019e6;border-bottom:1px solid #242a38;grid-column:1/-1;grid-template-columns:216px minmax(500px,1fr) auto;align-items:center;display:grid;position:sticky;top:0}.brand{border-right:1px solid #202632;align-items:center;gap:12px;height:100%;padding:0 20px;font-weight:650;display:flex}.brand-mark{color:#fff;background:linear-gradient(145deg,#287bd7,#5ed0ff);border-radius:7px;place-items:center;width:25px;height:25px;display:grid;box-shadow:0 0 22px #287bd744}.module-nav{justify-content:center;gap:8px;height:100%;display:flex}.module-nav button{color:#b0b6c8;cursor:pointer;background:0 0;border:0;justify-content:center;align-items:center;gap:9px;min-width:105px;height:100%;display:flex;position:relative}.module-nav button.active{color:#c69cff}.module-nav button.active:after{content:\"\";background:var(--violet);height:2px;box-shadow:0 0 14px var(--violet);position:absolute;bottom:0;left:15px;right:15px}.module-nav button:disabled{opacity:.7;cursor:not-allowed}.top-status{border-left:1px solid #242a38;align-items:center;gap:10px;height:65%;padding:0 18px;display:flex}.top-status>svg{color:#a8afc1;margin-right:5px}.top-status div:last-child{flex-direction:column;display:flex}.top-status small{color:var(--muted);font-size:10px}.avatar{color:#20242d;background:linear-gradient(135deg,#f3d0b0,#6f8db5);border:2px solid #d9dbe3;border-radius:50%;place-items:center;width:29px;height:29px;font-weight:800;display:grid}.mobile-menu{background:0 0;border:0;display:none}.sidebar{background:linear-gradient(#101520 0%,#0c1018 100%);border-right:1px solid #202632;flex-direction:column;grid-row:2;padding:20px 12px;display:flex}.sidebar-title{color:#81899a;text-transform:uppercase;letter-spacing:.08em;padding:0 9px 10px;font-size:11px}.sidebar-title button{display:none}.sidebar nav{flex-direction:column;gap:5px;display:flex}.sidebar nav button{text-align:left;color:#b9bfd0;cursor:pointer;background:0 0;border:1px solid #0000;border-radius:8px;align-items:center;gap:12px;padding:12px 11px;display:flex}.sidebar nav button.active{color:#d7c0ff;background:linear-gradient(90deg,#29233e,#24283a);border-color:#312c49}.sidebar nav button:hover{background:#1b2130}.sidebar-health{border:1px solid var(--line);color:var(--muted);text-transform:capitalize;background:#151b27;border-radius:9px;grid-template-columns:1fr 1fr;gap:9px;margin-top:auto;padding:12px;font-size:11px;display:grid}.sidebar-health>span{text-transform:uppercase;letter-spacing:.08em;grid-column:1/-1;font-size:10px}.sidebar-health div{align-items:center;gap:6px;display:flex}.status-dot{background:#667;border-radius:50%;width:8px;height:8px;display:inline-block}.status-dot.good{background:var(--green);box-shadow:0 0 8px #8bd45088}.status-dot.warn{background:var(--orange)}.status-dot.bad{background:var(--red)}main{grid-area:2/2;min-width:0;overflow:hidden}.page-header{background:#12172273;border-bottom:1px solid #272d3a;justify-content:space-between;align-items:center;min-height:96px;padding:18px 26px;display:flex}.page-header h1{margin:0 0 4px;font-size:22px}.page-header p{color:var(--muted);margin:0}.page-meta{color:var(--muted);text-align:right;align-items:center;gap:18px;font-size:11px;display:flex}.page-meta b{color:#b8bfce;font-weight:500}.page-meta button{border:1px solid var(--line);cursor:pointer;background:#1c2230;border-radius:8px;place-items:center;width:39px;height:39px;display:grid}.page-content{max-width:1560px;margin:auto;padding:20px 25px 26px}.section-heading{align-items:center;gap:9px;margin-bottom:10px;display:flex}.section-heading h2{margin:0;font-size:16px}footer{color:#7f879a;background:#0e131d;border-top:1px solid #252b38;grid-column:1/-1;justify-content:space-between;align-items:center;padding:0 20px;font-size:11px;display:flex}footer span{align-items:center;gap:7px;display:flex}.card{border:1px solid var(--line);background:linear-gradient(145deg,#1c2230eb,#121722f0);border-radius:10px;min-width:0;padding:15px;box-shadow:inset 0 1px #ffffff05,0 10px 30px #00000014}.card-head{justify-content:space-between;align-items:center;margin-bottom:13px;display:flex}.card h2{margin:0;font-size:15px}.card h3{margin:18px 0 8px;font-size:13px}.pill{color:#bbc1d0;background:#2a3040;border:1px solid #353d50;border-radius:999px;align-items:center;gap:5px;padding:3px 8px;font-size:10px;display:inline-flex}.pill.green{color:var(--green);background:#1b2a1e;border-color:#2c492d}.pill.pink{color:var(--pink);background:#2b1c27;border-color:#503046}.pill.cyan{color:var(--cyan);background:#182936;border-color:#29475d}.pill.orange{color:var(--orange);background:#2c2519;border-color:#504124}.pill.violet{color:#bd96ff;background:#292139;border-color:#43335e}.empty{text-align:left;color:#697184;justify-content:center;align-items:center;gap:13px;min-height:140px;display:flex}.empty svg{color:#596175}.empty strong{color:#aab1c1;margin-bottom:3px;display:block}.empty p{max-width:360px;margin:0;font-size:12px;line-height:1.5}.empty.compact{justify-content:flex-start;min-height:56px}.empty.compact strong{font-size:12px}.empty.compact p{font-size:11px}.overview-hero{grid-template-columns:minmax(0,2fr) minmax(270px,.95fr);gap:12px;display:grid}.session-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.media-card{border-color:#384153;position:relative;overflow:hidden}.media-card.music.active{background:linear-gradient(145deg,#411c309e,#1a1a27f5);border-color:#9a3d68}.media-card.gaming.active{background:linear-gradient(145deg,#1c2e45bf,#171c28f5);border-color:#3f70a0}.media-card.tv.active{background:linear-gradient(145deg,#18373fb3,#161c28f2);border-color:#3d7989}.media-card-main{gap:15px;display:flex}.artwork{color:#81899b;background:linear-gradient(135deg,#252a3a,#151a25);border:1px solid #343c4e;border-radius:9px;flex-direction:column;flex:none;justify-content:center;align-items:center;gap:7px;width:118px;height:126px;font-size:10px;display:flex;overflow:hidden}.artwork.music{color:#f98abd;background:linear-gradient(135deg,#713151,#261b31)}.artwork.gaming{color:#76bdff;background:linear-gradient(135deg,#244f78,#1d273a)}.artwork.tv{color:#77d4e6;background:linear-gradient(135deg,#235763,#192a34)}.artwork img{object-fit:cover;width:100%;height:100%}.media-copy{min-width:0;padding-top:2px}.eyebrow{color:var(--cyan);align-items:center;gap:7px;font-size:12px;font-weight:650;display:flex}.music .eyebrow{color:var(--pink)}.eyebrow svg{width:17px}.media-copy h3{text-overflow:ellipsis;margin:16px 0 8px;font-size:18px;overflow:hidden}.media-copy p{color:#afb6c8;margin:0 0 12px;font-size:14px}.session-detail{color:var(--green);font-size:12px}.output-row{background:#080c1359;border:1px solid #323949;border-radius:8px;align-items:center;gap:10px;margin-top:13px;padding:10px 12px;display:flex}.output-row>div{flex-direction:column;min-width:0;display:flex}.output-row span{color:#aab1c2;font-size:11px}.output-row strong{color:var(--green);font-size:10px;font-weight:500}.output-row>b{white-space:nowrap;margin-left:auto;font-size:22px}.output-row .button{margin-left:6px;padding:6px 8px}.reason-list{flex-direction:column;gap:9px;display:flex}.reason-item{color:#b9bfce;align-items:flex-start;gap:9px;font-size:12px;line-height:1.35;display:flex}.reason-item svg{color:var(--violet);flex:none}.reason-item.warn svg{color:var(--orange)}.reason.compact{padding:16px}.reason.compact .card-head{margin-bottom:17px}.dashboard-grid{gap:12px;margin-top:12px;display:grid}.dashboard-grid.volumes{grid-template-columns:repeat(2,minmax(0,1fr))}.volume-breakdown.pink{--accent:var(--pink)}.volume-breakdown.cyan{--accent:var(--cyan)}.formula-compact{color:#838b9e;flex-wrap:wrap;align-items:center;gap:7px;margin-bottom:13px;font-size:11px;display:flex}.formula-compact span:not(:first-child):before{content:\" + \";color:#666f82}.formula-compact span.negative:before{content:\" − \";color:var(--orange)}.formula-compact span.positive{color:var(--green)}.formula-compact span.negative{color:var(--orange)}.formula-compact strong{color:var(--accent);margin-left:auto;font-size:20px}.formula-grid{grid-template-columns:repeat(7,minmax(56px,1fr));gap:0;display:grid}.formula-grid div{border-left:1px solid #303747;flex-direction:column;gap:4px;padding:0 9px;display:flex}.formula-grid div:first-child{border:0;padding-left:0}.formula-grid span{color:#81899a;font-size:10px}.formula-grid b{font-size:13px}.volume-meter{background:#2b303f;border-radius:4px;height:4px;margin-top:14px}.volume-meter i{background:var(--accent);height:100%;box-shadow:0 0 9px color-mix(in srgb,var(--accent) 55%,transparent);border-radius:4px;display:block}.dashboard-grid.lower{grid-template-columns:minmax(0,1.6fr) minmax(320px,1fr) minmax(290px,.9fr)}.button-row{flex-wrap:wrap;gap:7px;display:flex}.button{cursor:pointer;color:#c4cad8;background:#222938;border:1px solid #343c4e;border-radius:7px;justify-content:center;align-items:center;gap:7px;padding:9px 11px;font-size:12px;display:inline-flex}.button:hover:not(:disabled),.button.active{color:#d5baff;background:#322942;border-color:#6b5293}.button:disabled{opacity:.48;cursor:not-allowed}.button.danger{color:#ff9a83}.radio-row{flex-wrap:wrap;gap:8px;display:flex}.radio-row>button{color:#ff78ab;cursor:pointer;background:#29202c;border:1px solid #3e3344;border-radius:7px;align-items:center;gap:8px;padding:10px 12px;display:flex}.device-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;display:grid}.device-tile{color:#697184;background:#202633;border:1px solid #293141;border-radius:8px;align-items:center;gap:9px;padding:9px;display:flex}.device-tile.active{color:#aab2c4}.device-tile div{flex-direction:column;min-width:0;display:flex}.device-tile span{white-space:nowrap;text-overflow:ellipsis;font-size:10px;overflow:hidden}.device-tile strong{color:#7a8396;font-size:10px;font-weight:500}.device-tile.active strong{color:var(--green)}.action-log{flex-direction:column;gap:8px;display:flex}.action-log>div{color:#a9b0c1;grid-template-columns:58px 16px 1fr auto;align-items:center;gap:7px;font-size:11px;display:grid}.action-log time{color:#687185}.action-log svg{color:var(--violet)}.decision-strip{border:1px solid var(--line);background:#151a25;border-radius:9px;grid-template-columns:repeat(4,1fr);margin-top:12px;display:grid;overflow:hidden}.decision-strip div{border-left:1px solid var(--line);flex-direction:column;gap:3px;padding:11px 15px;display:flex}.decision-strip div:first-child{border:0}.decision-strip span,.kpi-label{color:#777f91;text-transform:uppercase;letter-spacing:.05em;font-size:10px}.decision-strip strong{color:#bdc3d2;font-size:12px}.music-layout{grid-template-columns:minmax(0,1fr) 310px;gap:12px;display:grid}.music-main,.music-aside{flex-direction:column;gap:12px;display:flex}.now-playing-wide .media-card-main{align-items:center}.now-playing-wide .artwork{width:160px;height:160px}.now-playing-wide .media-copy h3{font-size:25px}.radio-cards{grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;display:grid}.radio-cards button{text-align:left;cursor:pointer;background:#241e2a;border:1px solid #373344;border-radius:8px;grid-template-rows:auto auto;grid-template-columns:46px 1fr auto;align-items:center;gap:2px 10px;padding:9px;display:grid}.radio-cards .radio-art{width:46px;height:46px;color:var(--pink);background:linear-gradient(135deg,#7a2f57,#34203c);border-radius:7px;grid-row:1/3;place-items:center;display:grid}.radio-cards b{font-size:12px}.radio-cards small{color:#7e8799}.radio-cards>button>svg{color:var(--pink);grid-area:1/3/3}.search-box{background:#111621;border:1px solid #343c4d;border-radius:8px;align-items:center;gap:10px;padding:5px 6px 5px 12px;display:flex}.search-box input{color:var(--text);background:0 0;border:0;outline:none;flex:1}.search-box button,.search-results button{color:#d6b6ff;cursor:pointer;background:#312540;border:1px solid #4c3a68;border-radius:6px;padding:8px 12px}.search-results{flex-direction:column;gap:7px;margin-top:10px;display:flex}.search-results>div{background:#1b2130;border-radius:7px;align-items:center;gap:10px;padding:7px;display:flex}.search-results img,.search-results>div>svg{object-fit:cover;border-radius:5px;width:38px;height:38px}.search-results div div{flex-direction:column;flex:1;display:flex}.search-results small{color:var(--muted)}.search-results button{align-items:center;gap:6px;display:flex}.library-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.key-values{flex-direction:column;display:flex}.key-values>span{color:#848c9e;border-top:1px solid #2c3342;justify-content:space-between;gap:15px;padding:9px 0;font-size:11px;display:flex}.key-values>span:first-child{border:0}.key-values b{color:#c1c7d5;text-align:right;overflow-wrap:anywhere;font-weight:550}.gaming-hero,.tv-hero{grid-template-columns:minmax(0,1.65fr) minmax(310px,1fr);gap:12px;display:grid}.gaming-kpis{grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:12px;display:grid}.gaming-kpis .card{flex-direction:column;gap:7px;display:flex}.gaming-kpis strong{font-size:16px}.gaming-kpis .pill{align-self:flex-start}.gaming-kpis small{color:var(--muted)}.gaming-bottom,.tv-status{grid-template-columns:repeat(2,minmax(0,1fr))}.classifier-panel{grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:12px;display:grid}.classifier-panel div{background:#1b2130;border-radius:7px;flex-direction:column;gap:5px;padding:10px;display:flex}.classifier-panel svg{color:var(--violet)}.classifier-panel span{color:var(--muted);font-size:10px}.classifier-panel b{font-size:12px}.edit-disabled{width:100%}.tv-page>.volume-breakdown{margin-top:12px}.rules-tabs,.diag-tabs{gap:7px;margin-bottom:12px;display:flex}.rules-tabs>span{flex:1}.rules-page.busy{opacity:.8}.rule-section{margin-bottom:12px;padding:0;overflow:hidden}.rule-title{border-bottom:1px solid var(--line);background:#1b2130;grid-template-columns:36px 1fr 270px;align-items:center;padding:13px 16px;display:grid}.rule-title>span{color:#c9a9ff;background:#33284a;border-radius:50%;place-items:center;width:25px;height:25px;font-size:11px;display:grid}.rule-title h2{margin:0;font-size:14px}.rule-title p{color:var(--muted);margin:3px 0 0;font-size:10px}.rule-device-head{text-align:center;color:#aeb5c5;grid-template-columns:repeat(2,1fr);font-size:11px;display:grid}.rule-device-head b:first-child{color:var(--pink)}.rule-device-head b:last-child{color:var(--cyan)}.rule-row{border-top:1px solid #252c3a;grid-template-columns:minmax(180px,1fr) 135px 135px;align-items:center;min-height:48px;padding:6px 16px;display:grid}.rule-row:first-child{border:0}.rule-row>span{font-size:12px}.percent-input{background:#111620;border:1px solid #353d4e;border-radius:6px;justify-self:center;align-items:center;width:94px;display:flex;overflow:hidden}.percent-input.overridden{box-shadow:inset 2px 0 var(--violet);border-color:#7554a4}.percent-input input{color:#d8dbe4;text-align:right;background:0 0;border:0;outline:none;width:66px;padding:7px}.percent-input span{color:#70798b;padding-right:7px}.scalar-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;display:grid}.scalar-list>div{border-top:1px solid #2d3443;justify-content:space-between;align-items:center;padding:8px 0;display:flex}.scalar-list>div:first-child{border:0}.scalar-list>div>span{font-size:12px}.muted-copy{color:var(--muted);line-height:1.6}.reset-explainer{color:#858da0;align-items:center;gap:7px;margin:-3px 0 12px;font-size:11px;display:flex}.rule-title{grid-template-columns:36px minmax(260px,1fr) auto}.rule-title-actions{justify-content:flex-end;align-items:center;gap:8px;display:flex}.rule-device-head{grid-column:3;min-width:270px;margin-top:8px}.rule-help{vertical-align:middle;color:#798397;cursor:help;display:inline-flex}.section-reset{padding:6px 8px;font-size:10px}.percent-input.readonly{opacity:.65}.percent-input input:disabled{cursor:not-allowed}.rule-row>span{align-items:center;gap:7px;display:flex}.span-devices{text-align:center;color:var(--orange);grid-column:2/4}.hard-rule{background:#261f19}.mode-stack{flex-direction:column;gap:12px;display:flex}.fixed-rule-grid,.private-paths{grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;padding:15px;display:grid}.fixed-rule-grid>div,.private-paths>div{background:#171d29;border:1px solid #303849;border-radius:8px;flex-direction:column;gap:6px;padding:12px;display:flex}.fixed-rule-grid span,.private-paths span{color:var(--muted);font-size:11px;line-height:1.45}.fixed-rule-grid .pill,.private-paths .pill{align-self:flex-start}.safety-grid,.delay-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.private-card{grid-column:1/-1}.private-paths{grid-template-columns:repeat(2,1fr);margin-bottom:12px;padding:0}.hard-rule-banner{color:var(--orange);background:#2b2118;border:1px solid #60452b;border-radius:8px;align-items:center;gap:10px;padding:12px;display:flex}.hard-rule-banner div{flex-direction:column;gap:3px;display:flex}.hard-rule-banner span{color:#baa98f;font-size:11px}.private-values{grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px;display:grid}.private-values>div{background:#171d29;border-radius:7px;flex-direction:column;gap:7px;padding:10px;display:flex}.private-values span,.device-scalar-head{color:var(--muted);font-size:10px}.private-values strong{font-size:12px}.scalar-list.detailed small{color:var(--muted);margin-top:3px;display:block}.rule-notes{border-top:1px solid var(--line);margin-top:12px;padding-top:8px}.rule-notes p{color:#aeb5c5;align-items:center;gap:7px;font-size:11px;display:flex}.contract-warning{background:#2b2418;border:1px solid #634b25;border-radius:7px;padding:9px;font-size:11px;line-height:1.5;color:#e8ad53!important}.device-scalar-head{text-align:center;grid-template-columns:1fr 1fr;margin-left:35%;display:grid}.device-scalar-head b:first-child{color:var(--pink)}.device-scalar-head b:last-child{color:var(--cyan)}.paired-values{grid-template-columns:minmax(130px,1fr) 105px 105px;align-items:center;gap:8px;display:grid}.paired-values>span{font-size:11px}.contract-missing{color:var(--orange);cursor:help;background:#30271b;border-radius:6px;padding:4px 7px;font-size:10px;display:inline-flex}.read-value{color:#c8cedb;font-size:12px}.rule-values>span{align-items:center}.rule-values>span>b,.rule-values>span>.read-value,.rule-values>span>.contract-missing{margin-left:auto}.waking-card{grid-column:1/-1}.waking-formula{text-align:center;background:#151b27;border:1px solid #31394a;border-radius:8px;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:10px;padding:12px;display:grid}.waking-formula b{color:var(--violet)}.waking-formula span{background:#1e2533;border-radius:6px;padding:9px}.waking-formula .missing-field{color:var(--orange);background:#282117;border:1px dashed #765529}.waking-card>p{color:var(--muted);font-size:12px;line-height:1.55}.delay-grid>.card:last-child{grid-column:1/-1}.diagnostics-page pre{color:#9ab8da;background:#0d121b;border:1px solid #282f3d;border-radius:7px;margin:0;padding:12px;font-size:11px;line-height:1.5;overflow:auto}.diag-grid,.binding-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.diag-list{flex-direction:column;gap:8px;display:flex}.diag-list>div{color:#aeb5c4;align-items:center;gap:9px;font-size:12px;display:flex}.bindings>div{border-top:1px solid #2b3241;justify-content:space-between;align-items:center;padding:8px 0;display:flex}.bindings>div:first-child{border:0}.bindings span{flex-direction:column;font-size:12px;display:flex}.bindings small{color:#737c90;margin-top:3px;font-size:10px}.raw-json{max-height:65vh}.technical>div{grid-template-columns:70px 16px 1fr auto}.loading{min-height:280px;color:var(--muted);justify-content:center;align-items:center;gap:12px;display:flex}.spin{animation:1s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}.scrim{display:none}@media (width<=1180px){.module-nav{gap:0}.module-nav button{min-width:88px}.module-nav button span{font-size:12px}.topbar{grid-template-columns:190px 1fr auto}.app-shell{grid-template-columns:190px minmax(0,1fr)}.brand{padding-left:14px}.sidebar{padding-left:9px;padding-right:9px}.overview-hero,.gaming-hero,.tv-hero{grid-template-columns:1fr}.dashboard-grid.lower{grid-template-columns:1fr 1fr}.quick-control{grid-column:1/-1}.formula-grid{grid-template-columns:repeat(4,1fr);row-gap:12px}.music-layout{grid-template-columns:1fr}.music-aside{grid-template-columns:repeat(2,1fr);display:grid}.gaming-kpis{grid-template-columns:repeat(2,1fr)}}@media (width<=900px){.app-shell{min-height:100vh;padding-top:56px;padding-bottom:36px;display:block}.topbar{height:56px;display:flex;position:fixed;top:0;left:0;right:0}.brand{border:0;flex:1}.module-nav,.top-status{display:none}.mobile-menu{place-items:center;margin-right:12px;display:grid}.sidebar{z-index:50;width:245px;transition:transform .2s;position:fixed;top:56px;bottom:0;left:0;transform:translate(-100%)}.sidebar.open{transform:translate(0)}.sidebar-title{justify-content:space-between;align-items:center;display:flex}.sidebar-title button{background:0 0;border:0;display:grid}.scrim{z-index:40;background:#03050aaa;border:0;display:block;position:fixed;inset:56px 0 0}main{display:block}.page-header{padding:15px 18px}.page-content{padding:16px}.page-meta>span{display:none}footer{z-index:20;height:36px;position:fixed;bottom:0;left:0;right:0}footer span:first-child,footer span:last-child{display:none}.session-grid,.dashboard-grid.volumes,.dashboard-grid.lower,.gaming-bottom,.tv-status,.library-grid,.scalar-grid,.diag-grid,.binding-grid,.music-aside{grid-template-columns:1fr}.radio-cards,.device-grid,.decision-strip{grid-template-columns:repeat(2,1fr)}.gaming-kpis{grid-template-columns:1fr 1fr}.classifier-panel{grid-template-columns:1fr}.rule-title{grid-template-columns:35px 1fr}.rule-device-head{display:none}.rule-row{grid-template-columns:minmax(150px,1fr) 100px 100px;padding:6px 10px}.rules-tabs,.diag-tabs{overflow:auto}.rules-tabs .button,.diag-tabs .button{white-space:nowrap}}@media (width<=600px){.session-grid,.gaming-kpis{grid-template-columns:1fr}.media-card-main{align-items:center}.artwork{width:94px;height:104px}.media-copy h3{margin-top:10px;font-size:16px}.formula-grid{grid-template-columns:repeat(2,1fr)}.radio-cards,.decision-strip{grid-template-columns:1fr}.decision-strip div{border-left:0;border-top:1px solid var(--line)}.page-header h1{font-size:19px}.rule-row{grid-template-columns:1fr 82px 82px}.percent-input{width:75px}.percent-input input{width:52px}.now-playing-wide .artwork{width:110px;height:110px}.now-playing-wide .media-copy h3{font-size:19px}}@media (width<=1100px){.safety-grid,.delay-grid{grid-template-columns:1fr}.private-card,.waking-card,.delay-grid>.card:last-child{grid-column:auto}.private-values{grid-template-columns:repeat(2,1fr)}.rules-tabs>span{display:none}.rules-tabs{flex-wrap:wrap}}@media (width<=900px){.rule-title{grid-template-columns:35px 1fr}.rule-title-actions{grid-column:2;justify-content:flex-start;margin-top:8px}.rule-device-head{display:none}.fixed-rule-grid,.waking-formula{grid-template-columns:1fr}.waking-formula b{transform:rotate(90deg)}.private-paths{grid-template-columns:1fr}}@media (width<=600px){.private-values{grid-template-columns:1fr}.paired-values{grid-template-columns:1fr 80px 80px}.rules-tabs .button.danger{width:100%}.reset-explainer{align-items:flex-start}}.rules-page .rule-row{min-height:39px;padding-top:4px;padding-bottom:4px}.rules-page .rule-title{padding-top:9px;padding-bottom:9px}.rules-page .percent-input input{padding-top:5px;padding-bottom:5px}", Ot = class extends HTMLElement {
	root;
	appHost;
	_hass;
	set hass(e) {
		this._hass = e, this.renderApp();
	}
	get hass() {
		return this._hass;
	}
	connectedCallback() {
		if (!this.shadowRoot) {
			let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
			t.textContent = Dt, e.append(t), this.appHost = document.createElement("div"), e.append(this.appHost);
		}
		this.renderApp();
	}
	disconnectedCallback() {
		this.root?.unmount(), this.root = void 0;
	}
	renderApp() {
		let e = this._hass;
		!this.isConnected || !e || !this.appHost || (this.root ||= (0, Ae.createRoot)(this.appHost), this.root.render(/* @__PURE__ */ (0, j.jsx)(Et, { hass: e })));
	}
};
customElements.get("benni-media-app") || customElements.define("benni-media-app", Ot);
//#endregion
