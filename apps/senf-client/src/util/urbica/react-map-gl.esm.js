/* eslint-disable */
import {
  createContext as t,
  createElement as e,
  PureComponent as o,
  Children as r,
  cloneElement as n,
  createRef as i,
} from "react";
import a from "mapbox-gl";
import { createPortal as s } from "react-dom";
function l(t, e) {
  var o = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e &&
      (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })),
      o.push.apply(o, r);
  }
  return o;
}
function u(t) {
  for (var e = 1; e < arguments.length; e++) {
    var o = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? l(Object(o), !0).forEach(function (e) {
          f(t, e, o[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o))
      : l(Object(o)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e));
        });
  }
  return t;
}
function p(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function c(t, e) {
  for (var o = 0; o < e.length; o++) {
    var r = e[o];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(t, r.key, r);
  }
}
function h(t, e, o) {
  return e && c(t.prototype, e), o && c(t, o), t;
}
function f(t, e, o) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = o),
    t
  );
}
function d(t, e) {
  if ("function" != typeof e && null !== e)
    throw new TypeError("Super expression must either be null or a function");
  (t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    e && y(t, e);
}
function m(t) {
  return (m = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
}
function y(t, e) {
  return (y =
    Object.setPrototypeOf ||
    function (t, e) {
      return (t.__proto__ = e), t;
    })(t, e);
}
function v(t, e) {
  if (null == t) return {};
  var o,
    r,
    n = (function (t, e) {
      if (null == t) return {};
      var o,
        r,
        n = {},
        i = Object.keys(t);
      for (r = 0; r < i.length; r++)
        (o = i[r]), e.indexOf(o) >= 0 || (n[o] = t[o]);
      return n;
    })(t, e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (r = 0; r < i.length; r++)
      (o = i[r]),
        e.indexOf(o) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(t, o) && (n[o] = t[o]));
  }
  return n;
}
function g(t) {
  if (void 0 === t)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return t;
}
function _(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return g(t);
}
function b(t) {
  var e = (function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      );
    } catch (t) {
      return !1;
    }
  })();
  return function () {
    var o,
      r = m(t);
    if (e) {
      var n = m(this).constructor;
      o = Reflect.construct(r, arguments, n);
    } else o = r.apply(this, arguments);
    return _(this, o);
  };
}
function w(t, e) {
  return (
    (function (t) {
      if (Array.isArray(t)) return t;
    })(t) ||
    (function (t, e) {
      var o =
        null == t
          ? null
          : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
            t["@@iterator"];
      if (null == o) return;
      var r,
        n,
        i = [],
        a = !0,
        s = !1;
      try {
        for (
          o = o.call(t);
          !(a = (r = o.next()).done) && (i.push(r.value), !e || i.length !== e);
          a = !0
        );
      } catch (t) {
        (s = !0), (n = t);
      } finally {
        try {
          a || null == o.return || o.return();
        } finally {
          if (s) throw n;
        }
      }
      return i;
    })(t, e) ||
    S(t, e) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    })()
  );
}
function k(t) {
  return (
    (function (t) {
      if (Array.isArray(t)) return x(t);
    })(t) ||
    (function (t) {
      if (
        ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
        null != t["@@iterator"]
      )
        return Array.from(t);
    })(t) ||
    S(t) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    })()
  );
}
function S(t, e) {
  if (t) {
    if ("string" == typeof t) return x(t, e);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    return (
      "Object" === o && t.constructor && (o = t.constructor.name),
      "Map" === o || "Set" === o
        ? Array.from(t)
        : "Arguments" === o ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
        ? x(t, e)
        : void 0
    );
  }
}
function x(t, e) {
  (null == e || e > t.length) && (e = t.length);
  for (var o = 0, r = new Array(e); o < e; o++) r[o] = t[o];
  return r;
}
var L = t(null),
  C = "undefined" != typeof window && void 0 !== window.document ? a : null,
  T = [
    "resize",
    "remove",
    "mousedown",
    "mouseup",
    "mouseover",
    "mousemove",
    "click",
    "dblclick",
    "mouseenter",
    "mouseleave",
    "mouseout",
    "contextmenu",
    "touchstart",
    "touchend",
    "touchmove",
    "touchcancel",
    "movestart",
    "move",
    "moveend",
    "dragstart",
    "drag",
    "dragend",
    "zoomstart",
    "zoom",
    "zoomend",
    "rotatestart",
    "rotate",
    "rotateend",
    "pitchstart",
    "pitch",
    "pitchend",
    "boxzoomstart",
    "boxzoomend",
    "boxzoomcancel",
    "webglcontextlost",
    "webglcontextrestored",
    "load",
    "error",
    "data",
    "styledata",
    "sourcedata",
    "dataloading",
    "styledataloading",
    "sourcedataloading",
  ];
var O = function (t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  j = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
      e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
    if (t.length !== e.length) return !1;
    for (var o = 0; o < t.length; o += 1) if (t[o] !== e[o]) return !1;
    return !0;
  },
  E = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      o = new Set([].concat(k(Object.keys(t)), k(Object.keys(e))));
    return k(o).reduce(function (o, r) {
      var n = t[r];
      return n !== e[r] && o.push([r, n]), o;
    }, []);
  },
  D = function (t, e, o, r) {
    var n = { layers: [e] };
    if (r) {
      var i = [
        [o[0] - r, o[1] - r],
        [o[0] + r, o[1] + r],
      ];
      return t.queryRenderedFeatures(i, n);
    }
    return t.queryRenderedFeatures(o, n);
  },
  P = ["before", "radius", "onClick", "onHover", "onEnter", "onLeave"],
  A = ["id", "before", "onClick"],
  U = [
    ["onClick", "click"],
    ["onHover", "mousemove"],
    ["onEnter", "mouseenter"],
    ["onLeave", "mouseleave"],
  ],
  M = (function (t) {
    d(n, o);
    var r = b(n);
    function n(t) {
      var e;
      return (
        p(this, n),
        f(g((e = r.call(this, t))), "$key", void 0),
        f(g(e), "$value", void 0),
        f(g(e), "_id", void 0),
        f(g(e), "_map", void 0),
        f(g(e), "_onClick", void 0),
        f(g(e), "_onHover", void 0),
        f(g(e), "_onEnter", void 0),
        f(g(e), "_onLeave", void 0),
        f(g(e), "_addLayer", function (t) {
          var o = e._map,
            r = t.before;
          t.radius, t.onClick, t.onHover, t.onEnter, t.onLeave;
          var n = v(t, P);
          r && o.getLayer(r) ? o.addLayer(n, r) : o.addLayer(n),
            e._addEventListeners(t);
        }),
        f(g(e), "_addEventListeners", function (t) {
          U.forEach(function (o) {
            var r = w(o, 2),
              n = r[0],
              i = r[1],
              a = "_".concat(n);
            t[n] && e._map.on(i, e._id, e[a]);
          });
        }),
        f(g(e), "_updateEventListeners", function (t, o) {
          U.forEach(function (r) {
            var n = w(r, 2),
              i = n[0],
              a = n[1],
              s = "_".concat(i);
            !o[i] && t[i] && e._map.off(a, e._id, e[s]),
              o[i] && !t[i] && e._map.on(a, e._id, e[s]);
          });
        }),
        f(g(e), "_removeEventListeners", function (t) {
          U.forEach(function (o) {
            var r = w(o, 2),
              n = r[0],
              i = r[1],
              a = "_".concat(n);
            t[n] && e._map.off(i, e._id, e[a]);
          });
        }),
        f(g(e), "_onClick", function (t) {
          var o = [t.point.x, t.point.y],
            r = D(e._map, e._id, o, e.props.radius);
          e.props.onClick(u(u({}, t), {}, { features: r }));
        }),
        f(g(e), "_onHover", function (t) {
          var o = [t.point.x, t.point.y],
            r = D(e._map, e._id, o, e.props.radius);
          e.props.onHover(u(u({}, t), {}, { features: r }));
        }),
        f(g(e), "_onEnter", function (t) {
          var o = [t.point.x, t.point.y],
            r = D(e._map, e._id, o, e.props.radius);
          e.props.onEnter(u(u({}, t), {}, { features: r }));
        }),
        f(g(e), "_onLeave", function (t) {
          var o = [t.point.x, t.point.y],
            r = D(e._map, e._id, o, e.props.radius);
          e.props.onLeave(u(u({}, t), {}, { features: r }));
        }),
        (e._id = t.id),
        e
      );
    }
    return (
      h(n, [
        {
          key: "componentDidMount",
          value: function () {
            this._addLayer(this.props);
          },
        },
        {
          key: "componentDidUpdate",
          value: function (t) {
            var e = this,
              o = this._map,
              r = this.props,
              n = r.id,
              i = r.before;
            r.onClick;
            var a = v(r, A);
            if (
              n !== t.id ||
              this.props.type !== t.type ||
              ("background" !== t.type &&
                (this.props.source !== t.source ||
                  this.props["source-layer"] !== t["source-layer"]))
            )
              return (
                (this._id = n),
                this._map.removeLayer(t.id),
                void this._addLayer(this.props)
              );
            i !== t.before && i && o.getLayer(i) && o.moveLayer(this._id, i),
              a.paint !== t.paint &&
                E(a.paint, t.paint).forEach(function (t) {
                  var r = w(t, 2),
                    n = r[0],
                    i = r[1];
                  o.setPaintProperty(e._id, n, i);
                }),
              a.layout !== t.layout &&
                E(a.layout, t.layout).forEach(function (t) {
                  var r = w(t, 2),
                    n = r[0],
                    i = r[1];
                  o.setLayoutProperty(e._id, n, i);
                }),
              a.filter !== t.filter &&
                (a.filter
                  ? o.setFilter(this._id, a.filter)
                  : o.setFilter(this._id, void 0)),
              this._updateEventListeners(t, this.props);
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            this._map &&
              this._map.getStyle() &&
              (this._removeEventListeners(this.props),
              this._map.getLayer(this._id) && this._map.removeLayer(this._id));
          },
        },
        {
          key: "render",
          value: function () {
            var t = this;
            return e(L.Consumer, {}, function (e) {
              return e && (t._map = e), null;
            });
          },
        },
      ]),
      n
    );
  })();
f(M, "displayName", "Layer"), f(M, "defaultProps", { radius: 0 });
var I = (function (t) {
  d(n, o);
  var r = b(n);
  function n() {
    var t;
    p(this, n);
    for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
      o[i] = arguments[i];
    return (
      f(g((t = r.call.apply(r, [this].concat(o)))), "_id", void 0),
      f(g(t), "_map", void 0),
      t
    );
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          var t = this.props,
            e = t.layer,
            o = t.before;
          o && this._map.getLayer(o)
            ? this._map.addLayer(e, o)
            : this._map.addLayer(e),
            (this._id = e.id);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._map &&
            this._map.getStyle() &&
            this._map.getLayer(this._id) &&
            this._map.removeLayer(this._id);
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), null;
          });
        },
      },
    ]),
    n
  );
})();
f(I, "displayName", "CustomLayer");
var z = [M, I],
  R = function (t) {
    return z.includes(t.type);
  },
  F = function t(e, o) {
    r.forEach(o, function (o) {
      o &&
        (R(o) && e(o), o.props && o.props.children && t(e, o.props.children));
    });
  },
  B = function (t) {
    var e = [];
    return (
      F(function (t) {
        t.props.before ||
          e.push(
            (function (t) {
              return t.props.id || t.props.layer.id;
            })(t)
          );
      }, t),
      e
    );
  },
  W = (function (t) {
    d(s, o);
    var a = b(s);
    function s(t) {
      var e;
      return (
        p(this, s),
        f(g((e = a.call(this, t))), "_map", void 0),
        f(g(e), "_container", void 0),
        f(g(e), "state", { loaded: !1 }),
        f(g(e), "_onViewportChange", function (t) {
          if (t.originalEvent) {
            var o = e._map,
              r = o.getCenter(),
              n = r.lng,
              i = {
                latitude: r.lat,
                longitude: n,
                zoom: o.getZoom(),
                pitch: o.getPitch(),
                bearing: o.getBearing(),
              };
            e.props.onViewportChange(i);
          }
        }),
        C && (C.accessToken = t.accessToken),
        (e._container = i()),
        e
      );
    }
    return (
      h(s, [
        {
          key: "componentDidMount",
          value: function () {
            var t = this;
            if (C) {
              var e = this._container.current,
                o = new C.Map({
                  container: e,
                  style: this.props.mapStyle,
                  interactive: !!this.props.onViewportChange,
                  center: [this.props.longitude, this.props.latitude],
                  zoom: this.props.zoom,
                  pitch: this.props.pitch,
                  bearing: this.props.bearing,
                  minZoom: this.props.minZoom,
                  maxZoom: this.props.maxZoom,
                  hash: this.props.hash,
                  bearingSnap: this.props.bearingSnap,
                  pitchWithRotate: this.props.pitchWithRotate,
                  attributionControl: this.props.attributionControl,
                  logoPosition: this.props.logoPosition,
                  failIfMajorPerformanceCaveat:
                    this.props.failIfMajorPerformanceCaveat,
                  preserveDrawingBuffer: this.props.preserveDrawingBuffer,
                  antialias: this.props.antialias,
                  refreshExpiredTiles: this.props.refreshExpiredTiles,
                  maxBounds: this.props.maxBounds,
                  bounds: this.props.bounds,
                  scrollZoom: this.props.scrollZoom,
                  boxZoom: this.props.boxZoom,
                  dragRotate: this.props.dragRotate,
                  dragPan: this.props.dragPan,
                  keyboard: this.props.keyboard,
                  doubleClickZoom: this.props.doubleClickZoom,
                  trackResize: this.props.trackResize,
                  renderWorldCopies: this.props.renderWorldCopies,
                  maxTileCacheSize: this.props.maxTileCacheSize,
                  localIdeographFontFamily: this.props.localIdeographFontFamily,
                  transformRequest: this.props.transformRequest,
                  collectResourceTiming: this.props.collectResourceTiming,
                  fadeDuration: this.props.fadeDuration,
                  crossSourceCollisions: this.props.crossSourceCollisions,
                  locale: this.props.locale,
                });
              (this._map = o),
                o.once("load", function () {
                  t.setState({ loaded: !0 }, t.props.onLoad);
                }),
                this.props.onViewportChange &&
                  (o.on("dragend", this._onViewportChange),
                  o.on("zoomend", this._onViewportChange),
                  o.on("rotateend", this._onViewportChange),
                  o.on("pitchend", this._onViewportChange),
                  o.on("boxzoomend", this._onViewportChange)),
                T.forEach(function (e) {
                  var r = "on".concat(O(e)),
                    n = t.props[r];
                  n &&
                    (Array.isArray(n)
                      ? o.on.apply(o, [e].concat(k(n)))
                      : o.on(e, n));
                }),
                this.props.cursorStyle &&
                  (o.getCanvas().style.cursor = this.props.cursorStyle),
                this.props.showTileBoundaries &&
                  (this._map.showTileBoundaries =
                    this.props.showTileBoundaries);
            }
          },
        },
        {
          key: "componentDidUpdate",
          value: function (t) {
            this._updateMapViewport(t, this.props),
              this._updateMapStyle(t, this.props),
              this._updateMapSize(t, this.props),
              this._updateMapEventListeners(t, this.props),
              !t.cursorStyle !== this.props.cursorStyle &&
                (this._map.getCanvas().style.cursor = this.props.cursorStyle),
              t.showTileBoundaries !== this.props.showTileBoundaries &&
                (this._map.showTileBoundaries =
                  !!this.props.showTileBoundaries);
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            this._map && this._map.remove();
          },
        },
        {
          key: "getMap",
          value: function () {
            return this._map;
          },
        },
        {
          key: "_updateMapEventListeners",
          value: function (t, e) {
            var o = this;
            T.forEach(function (r) {
              var n = "on".concat(O(r)),
                i = t[n],
                a = e[n];
              if (
                !((Array.isArray(i) && Array.isArray(a) && j(i, a)) || i === a)
              ) {
                var s, l;
                if (i)
                  if (Array.isArray(i))
                    (s = o._map).off.apply(s, [r].concat(k(i)));
                  else o._map.off(r, i);
                if (a)
                  if (Array.isArray(a))
                    (l = o._map).on.apply(l, [r].concat(k(a)));
                  else o._map.on(r, a);
              }
            });
          },
        },
        {
          key: "_updateMapStyle",
          value: function (t, e) {
            var o = this,
              r = e.mapStyle,
              n = t.mapStyle;
            r !== n &&
              this.setState({ loaded: !1 }, function () {
                o._map.setStyle(r),
                  o._map.once("style.load", function () {
                    return o.setState({ loaded: !0 });
                  });
              });
          },
        },
        {
          key: "_updateMapViewport",
          value: function (t, e) {
            var o = this._map,
              r = o.getCenter();
            if (
              (e.latitude !== t.latitude && e.latitude !== r.lat) ||
              (e.longitude !== t.longitude && e.longitude !== r.lng) ||
              (e.zoom !== t.zoom && e.zoom !== o.getZoom()) ||
              (e.pitch !== t.pitch && e.pitch !== o.getPitch()) ||
              (e.bearing !== t.bearing && e.bearing !== o.getBearing())
            ) {
              var n = {
                  center: [e.longitude, e.latitude],
                  zoom: e.zoom,
                  pitch: e.pitch,
                  bearing: e.bearing,
                },
                i = this.props,
                a = i.viewportChangeMethod,
                s = u(u({}, i.viewportChangeOptions), n);
              switch (a) {
                case "flyTo":
                  o.flyTo(s);
                  break;
                case "jumpTo":
                  o.jumpTo(s);
                  break;
                case "easeTo":
                  o.easeTo(s);
                  break;
                default:
                  throw new Error("Unknown viewport change method");
              }
            }
          },
        },
        {
          key: "_updateMapSize",
          value: function (t, e) {
            ((t.style && t.style.height) !== (e.style && e.style.height) ||
              (t.style && t.style.width) !== (e.style && e.style.width)) &&
              this._map.resize();
          },
        },
        {
          key: "render",
          value: function () {
            var t = this.state.loaded,
              o = this.props,
              i = o.className,
              a = o.style,
              s = this.props.children
                ? (function (t) {
                    var e = B(t);
                    return (
                      e.shift(),
                      (function t(o) {
                        return "function" == typeof o
                          ? o
                          : r.map(o, function (o) {
                              if (!o) return o;
                              if (R(o)) {
                                var r = o.props.before || e.shift();
                                return n(o, { before: r });
                              }
                              return o.props && o.props.children
                                ? n(o, { children: t(o.props.children) })
                                : o;
                            });
                      })(t)
                    );
                  })(this.props.children)
                : null;
            return e(
              L.Provider,
              { value: this._map },
              e("div", { ref: this._container, style: a, className: i }, t && s)
            );
          },
        },
      ]),
      s
    );
  })();
f(W, "displayName", "MapGL"),
  f(W, "defaultProps", {
    children: null,
    className: null,
    style: null,
    mapStyle: "mapbox://styles/mapbox/light-v8",
    accessToken: null,
    bearing: 0,
    pitch: 0,
    minZoom: 0,
    maxZoom: 22,
    maxBounds: null,
    bounds: null,
    hash: !1,
    bearingSnap: 7,
    pitchWithRotate: !0,
    attributionControl: !0,
    logoPosition: "bottom-left",
    failIfMajorPerformanceCaveat: !1,
    preserveDrawingBuffer: !1,
    antialias: !1,
    refreshExpiredTiles: !0,
    boxZoom: !0,
    scrollZoom: !0,
    dragRotate: !0,
    dragPan: !0,
    keyboard: !0,
    doubleClickZoom: !0,
    trackResize: !0,
    renderWorldCopies: !0,
    maxTileCacheSize: null,
    onViewportChange: null,
    onLoad: null,
    localIdeographFontFamily: null,
    transformRequest: null,
    collectResourceTiming: !1,
    fadeDuration: 300,
    crossSourceCollisions: !0,
    locale: null,
    cursorStyle: null,
    viewportChangeMethod: "jumpTo",
    viewportChangeOptions: null,
  });
var N = function (t) {
    switch (t.type) {
      case "vector":
        return u({ type: "vector" }, t);
      case "raster":
        return u({ type: "raster" }, t);
      case "raster-dem":
        return u({ type: "raster-dem" }, t);
      case "geojson":
        return u({ type: "geojson" }, t);
      case "video":
        return u({ type: "video" }, t);
      case "image":
        return u({ type: "image" }, t);
      default:
        throw new Error("Unknown type for '".concat(t.id, "' Source"));
    }
  },
  Z = ["id", "children"],
  V = ["id", "children"],
  $ = ["id", "children"],
  q = (function (t) {
    d(n, o);
    var r = b(n);
    function n() {
      var t;
      p(this, n);
      for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
        o[i] = arguments[i];
      return (
        f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0),
        f(g(t), "state", { loaded: !1 }),
        f(g(t), "_onSourceData", function () {
          t._map.isSourceLoaded(t.props.id) &&
            (t._map.off("sourcedata", t._onSourceData),
            t.setState({ loaded: !0 }));
        }),
        f(g(t), "_updateGeoJSONSource", function (e, o, r) {
          if (r.data !== o.data) {
            var n = t._map.getSource(e);
            void 0 !== n && n.setData(r.data);
          }
        }),
        f(g(t), "_updateImageSource", function (e, o, r) {
          if (r.url !== o.url || r.coordinates !== o.coordinates) {
            var n = t._map.getSource(e);
            void 0 !== n && n.updateImage(r);
          }
        }),
        f(g(t), "_updateTileSource", function (e, o, r) {
          if (r.url !== o.url || !j(r.tiles, o.tiles)) {
            var n = t._map.getSource(e);
            n._tileJSONRequest && n._tileJSONRequest.cancel(),
              (n.url = r.url),
              (n.scheme = r.scheme),
              (n._options = u(u({}, n._options), r));
            var i = t._map.style.sourceCaches[e];
            i && i.clearTiles(), n.load();
          }
        }),
        f(g(t), "_removeSource", function () {
          var e = t.props.id;
          if (t._map.getSource(e)) {
            var o = t._map.getStyle().layers;
            o &&
              o.forEach(function (o) {
                o.source === e && t._map.removeLayer(o.id);
              }),
              t._map.removeSource(e);
          }
        }),
        t
      );
    }
    return (
      h(n, [
        {
          key: "componentDidMount",
          value: function () {
            var t = this.props,
              e = t.id;
            t.children;
            var o = v(t, Z),
              r = N(o);
            this._map.addSource(e, r),
              this._map.on("sourcedata", this._onSourceData);
          },
        },
        {
          key: "componentDidUpdate",
          value: function (t) {
            var e = t.id;
            t.children;
            var o = v(t, V),
              r = N(o),
              n = this.props,
              i = n.id;
            n.children;
            var a = v(n, $),
              s = N(a);
            if (i !== e || s.type !== r.type)
              return this._map.removeSource(e), void this._map.addSource(i, s);
            "geojson" !== s.type || "geojson" !== r.type
              ? "image" !== s.type || "image" !== r.type
                ? "vector" !== s.type || "vector" !== r.type
                  ? "raster" === s.type &&
                    "raster" === r.type &&
                    this._updateTileSource(i, r, s)
                  : this._updateTileSource(i, r, s)
                : this._updateImageSource(i, r, s)
              : this._updateGeoJSONSource(i, r, s);
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            this._map && this._map.getStyle() && this._removeSource();
          },
        },
        {
          key: "render",
          value: function () {
            var t = this,
              o = this.state.loaded,
              r = this.props.children;
            return e(L.Consumer, {}, function (e) {
              return e && (t._map = e), o && r;
            });
          },
        },
      ]),
      n
    );
  })();
f(q, "displayName", "Source");
var H = (function (t) {
  d(n, o);
  var r = b(n);
  function n(t) {
    var e;
    return (
      p(this, n),
      f(g((e = r.call(this, t))), "_map", void 0),
      f(g(e), "_el", void 0),
      f(g(e), "_popup", void 0),
      (e._el = document.createElement("div")),
      e
    );
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          var t = this.props,
            e = t.longitude,
            o = t.latitude,
            r = t.offset,
            n = t.closeButton,
            i = t.closeOnClick,
            a = t.onClose,
            s = t.anchor,
            l = t.className,
            u = t.maxWidth;
          (this._popup = new C.Popup({
            offset: r,
            closeButton: n,
            closeOnClick: i,
            anchor: s,
            className: l,
            maxWidth: u,
          })),
            this._popup.setDOMContent(this._el),
            this._popup.setLngLat([e, o]).addTo(this._map),
            a && this._popup.on("close", a);
        },
      },
      {
        key: "componentDidUpdate",
        value: function (t) {
          (t.latitude !== this.props.latitude ||
            t.longitude !== this.props.longitude) &&
            this._popup.setLngLat([this.props.longitude, this.props.latitude]);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._map && this._map.getStyle() && this._popup.remove();
        },
      },
      {
        key: "getPopup",
        value: function () {
          return this._popup;
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), s(t.props.children, t._el);
          });
        },
      },
    ]),
    n
  );
})();
f(H, "displayName", "Popup"),
  f(H, "defaultProps", {
    closeButton: !0,
    closeOnClick: !0,
    onClose: null,
    anchor: null,
    offset: null,
    className: null,
    maxWidth: "240px",
  });
var G = (function (t) {
  d(n, o);
  var r = b(n);
  function n(t) {
    var e;
    return (
      p(this, n),
      f(g((e = r.call(this, t))), "_map", void 0),
      f(g(e), "_el", void 0),
      f(g(e), "_marker", void 0),
      f(g(e), "_onDragEnd", function () {
        e.props.onDragEnd(e._marker.getLngLat());
      }),
      f(g(e), "_onDragStart", function () {
        e.props.onDragStart(e._marker.getLngLat());
      }),
      f(g(e), "_onDrag", function () {
        e.props.onDrag(e._marker.getLngLat());
      }),
      (e._el = document.createElement("div")),
      e
    );
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          var t = this.props,
            e = t.longitude,
            o = t.latitude,
            r = t.onClick,
            n = t.onDragEnd,
            i = t.onDragStart,
            a = t.onDrag;
          (this._marker = new C.Marker({
            element: this._el,
            anchor: this.props.anchor,
            draggable: this.props.draggable,
            offset: this.props.offset,
            rotation: this.props.rotation,
            pitchAlignment: this.props.pitchAlignment,
            rotationAlignment: this.props.rotationAlignment,
          })),
            this._marker.setLngLat([e, o]).addTo(this._map),
            r && this._el.addEventListener("click", r),
            n && this._marker.on("dragend", this._onDragEnd),
            i && this._marker.on("dragstart", this._onDragStart),
            a && this._marker.on("drag", this._onDrag);
        },
      },
      {
        key: "componentDidUpdate",
        value: function (t) {
          (t.latitude !== this.props.latitude ||
            t.longitude !== this.props.longitude) &&
            this._marker.setLngLat([this.props.longitude, this.props.latitude]);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._map &&
            this._map.getStyle() &&
            (this.props.onClick &&
              this._el.removeEventListener("click", this.props.onClick),
            this._marker.remove());
        },
      },
      {
        key: "getMarker",
        value: function () {
          return this._marker;
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), s(t.props.children, t._el);
          });
        },
      },
    ]),
    n
  );
})();
f(G, "displayName", "Marker"),
  f(G, "defaultProps", {
    anchor: "center",
    offset: null,
    draggable: !1,
    rotation: 0,
    pitchAlignment: "auto",
    rotationAlignment: "auto",
  });
var J = (function (t) {
    d(n, o);
    var r = b(n);
    function n() {
      var t;
      p(this, n);
      for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
        o[i] = arguments[i];
      return f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0), t;
    }
    return (
      h(n, [
        {
          key: "componentDidMount",
          value: function () {
            var t = this._map,
              e = this.props,
              o = e.id,
              r = e.source,
              n = e.sourceLayer,
              i = e.state;
            t.setFeatureState({ id: o, source: r, sourceLayer: n }, i);
          },
        },
        {
          key: "componentDidUpdate",
          value: function (t) {
            var e = this._map,
              o = this.props,
              r = o.id,
              n = o.source,
              i = o.sourceLayer,
              a = o.state;
            (r === t.id &&
              n === t.source &&
              i === t.sourceLayer &&
              a === t.state) ||
              (e.removeFeatureState({
                id: t.id,
                source: t.source,
                sourceLayer: t.sourceLayer,
              }),
              e.setFeatureState({ id: r, source: n, sourceLayer: i }, a));
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            if (this._map && this._map.getStyle()) {
              var t = this.props,
                e = t.id,
                o = t.source,
                r = t.sourceLayer;
              this._map.removeFeatureState({
                id: e,
                source: o,
                sourceLayer: r,
              });
            }
          },
        },
        {
          key: "render",
          value: function () {
            var t = this;
            return e(L.Consumer, {}, function (e) {
              return e && (t._map = e), null;
            });
          },
        },
      ]),
      n
    );
  })(),
  K = (function (t) {
    d(n, o);
    var r = b(n);
    function n(t) {
      var e;
      return (
        p(this, n),
        f(g((e = r.call(this, t))), "_map", void 0),
        f(g(e), "_id", void 0),
        f(g(e), "_loadImage", function (t, o) {
          "string" != typeof t
            ? o(t)
            : e._map.loadImage(t, function (t, e) {
                if (t) throw t;
                o(e);
              });
        }),
        (e._id = t.id),
        e
      );
    }
    return (
      h(n, [
        {
          key: "componentDidMount",
          value: function () {
            var t = this,
              e = this.props,
              o = e.image,
              r = e.pixelRatio,
              n = e.sdf;
            this._loadImage(o, function (e) {
              return t._map.addImage(t._id, e, { pixelRatio: r, sdf: n });
            });
          },
        },
        {
          key: "componentDidUpdate",
          value: function (t) {
            var e = this,
              o = this.props,
              r = o.id,
              n = o.image,
              i = o.pixelRatio,
              a = o.sdf;
            if (r !== t.id || a !== t.sdf || i !== t.pixelRatio)
              return (
                (this._id = r),
                this._map.removeImage(t.id),
                void this._loadImage(n, function (t) {
                  return e._map.addImage(e._id, t, { pixelRatio: i, sdf: a });
                })
              );
            n !== t.image &&
              this._loadImage(n, function (t) {
                return e._map.updateImage(e._id, t);
              });
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            this._map &&
              this._map.getStyle() &&
              this._map.hasImage(this._id) &&
              this._map.removeImage(this._id);
          },
        },
        {
          key: "render",
          value: function () {
            var t = this;
            return e(L.Consumer, {}, function (e) {
              return e && (t._map = e), null;
            });
          },
        },
      ]),
      n
    );
  })();
f(K, "defaultProps", { pixelRatio: 1, sdf: !1 });
var Q = (function (t) {
  d(n, o);
  var r = b(n);
  function n() {
    var t;
    p(this, n);
    for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
      o[i] = arguments[i];
    return (
      f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0),
      f(g(t), "_control", void 0),
      t
    );
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          var t = this._map,
            e = this.props,
            o = e.compact,
            r = e.customAttribution,
            n = e.position,
            i = new C.AttributionControl({ compact: o, customAttribution: r });
          t.addControl(i, n), (this._control = i);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._map &&
            this._map.getStyle() &&
            this._map.removeControl(this._control);
        },
      },
      {
        key: "getControl",
        value: function () {
          return this._control;
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), null;
          });
        },
      },
    ]),
    n
  );
})();
f(Q, "defaultProps", { position: "bottom-right" });
var X = (function (t) {
  d(n, o);
  var r = b(n);
  function n() {
    var t;
    p(this, n);
    for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
      o[i] = arguments[i];
    return (
      f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0),
      f(g(t), "_control", void 0),
      t
    );
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          var t = this._map,
            e = this.props,
            o = e.container,
            r = e.position,
            n = new C.FullscreenControl({ container: o });
          t.addControl(n, r), (this._control = n);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._map &&
            this._map.getStyle() &&
            this._map.removeControl(this._control);
        },
      },
      {
        key: "getControl",
        value: function () {
          return this._control;
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), null;
          });
        },
      },
    ]),
    n
  );
})();
f(X, "defaultProps", { position: "top-right" });
var Y = (function (t) {
  d(n, o);
  var r = b(n);
  function n() {
    var t;
    p(this, n);
    for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
      o[i] = arguments[i];
    return (
      f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0),
      f(g(t), "_control", void 0),
      t
    );
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          var t = this._map,
            e = this.props,
            o = e.positionOptions,
            r = e.fitBoundsOptions,
            n = e.trackUserLocation,
            i = e.showUserLocation,
            a = e.position,
            s = e.onTrackUserLocationEnd,
            l = e.onTrackUserLocationStart,
            u = e.onError,
            p = e.onGeolocate,
            c = new C.GeolocateControl({
              positionOptions: o,
              fitBoundsOptions: r,
              trackUserLocation: n,
              showUserLocation: i,
            });
          s && c.on("trackuserlocationend", s),
            l && c.on("trackuserlocationstart", l),
            u && c.on("error", u),
            p && c.on("geolocate", p),
            t.addControl(c, a),
            (this._control = c);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._map &&
            this._map.getStyle() &&
            this._map.removeControl(this._control);
        },
      },
      {
        key: "getControl",
        value: function () {
          return this._control;
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), null;
          });
        },
      },
    ]),
    n
  );
})();
f(Y, "defaultProps", {
  positionOptions: { enableHighAccuracy: !1, timeout: 6e3 },
  fitBoundsOptions: { maxZoom: 15 },
  trackUserLocation: !1,
  showUserLocation: !0,
});
var tt = (function (t) {
  d(n, o);
  var r = b(n);
  function n() {
    var t;
    p(this, n);
    for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
      o[i] = arguments[i];
    return (
      f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0),
      f(g(t), "_control", void 0),
      t
    );
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          var t = this._map,
            e = this.props,
            o = e.showCompass,
            r = e.showZoom,
            n = e.visualizePitch,
            i = e.position,
            a = new C.NavigationControl({
              showCompass: o,
              showZoom: r,
              visualizePitch: n,
            });
          t.addControl(a, i), (this._control = a);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._map &&
            this._map.getStyle() &&
            this._map.removeControl(this._control);
        },
      },
      {
        key: "getControl",
        value: function () {
          return this._control;
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), null;
          });
        },
      },
    ]),
    n
  );
})();
f(tt, "defaultProps", {
  showCompass: !0,
  showZoom: !0,
  visualizePitch: !1,
  position: "top-right",
});
var et = (function (t) {
  d(n, o);
  var r = b(n);
  function n() {
    var t;
    p(this, n);
    for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
      o[i] = arguments[i];
    return (
      f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0),
      f(g(t), "_control", void 0),
      t
    );
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          var t = this._map,
            e = this.props,
            o = e.maxWidth,
            r = e.unit,
            n = e.position,
            i = new C.ScaleControl({ maxWidth: o, unit: r });
          t.addControl(i, n), (this._control = i);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._map &&
            this._map.getStyle() &&
            this._map.removeControl(this._control);
        },
      },
      {
        key: "getControl",
        value: function () {
          return this._control;
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), null;
          });
        },
      },
    ]),
    n
  );
})();
function ot(t, e) {
  return t((e = { exports: {} }), e.exports), e.exports;
}
f(et, "defaultProps", { position: "bottom-right", unit: "metric" });
var rt = ot(function (t) {
    function e(t) {
      if (((t = Object.assign({}, t)), !(this instanceof e)))
        throw new Error(
          "MapboxLanguage needs to be called with the new keyword"
        );
      (this.setLanguage = this.setLanguage.bind(this)),
        (this._initialStyleUpdate = this._initialStyleUpdate.bind(this)),
        (this._defaultLanguage = t.defaultLanguage),
        (this._isLanguageField = t.languageField || /^\{name/),
        (this._getLanguageField =
          t.getLanguageField ||
          function (t) {
            return "mul" === t ? "{name}" : "{name_" + t + "}";
          }),
        (this._languageSource = t.languageSource || null),
        (this._languageTransform =
          t.languageTransform ||
          function (t, e) {
            return "ar" === e
              ? (function (t) {
                  var e = t.layers.map(function (t) {
                    if (!(t.layout || {})["text-field"]) return t;
                    var e = 0;
                    return Object.assign({}, t, {
                      layout: Object.assign({}, t.layout, {
                        "text-letter-spacing": e,
                      }),
                    });
                  });
                  return Object.assign({}, t, { layers: e });
                })(t)
              : (function (t) {
                  var e = t.layers.map(function (t) {
                    if (!(t.layout || {})["text-field"]) return t;
                    var e = 0;
                    return (
                      "state_label" === t["source-layer"] && (e = 0.15),
                      "marine_label" === t["source-layer"] &&
                        (/-lg/.test(t.id) && (e = 0.25),
                        /-md/.test(t.id) && (e = 0.15),
                        /-sm/.test(t.id) && (e = 0.1)),
                      "place_label" === t["source-layer"] &&
                        (/-suburb/.test(t.id) && (e = 0.15),
                        /-neighbour/.test(t.id) && (e = 0.1),
                        /-islet/.test(t.id) && (e = 0.01)),
                      "airport_label" === t["source-layer"] && (e = 0.01),
                      "rail_station_label" === t["source-layer"] && (e = 0.01),
                      "poi_label" === t["source-layer"] &&
                        /-scalerank/.test(t.id) &&
                        (e = 0.01),
                      "road_label" === t["source-layer"] &&
                        (/-label-/.test(t.id) && (e = 0.01),
                        /-shields/.test(t.id) && (e = 0.05)),
                      Object.assign({}, t, {
                        layout: Object.assign({}, t.layout, {
                          "text-letter-spacing": e,
                        }),
                      })
                    );
                  });
                  return Object.assign({}, t, { layers: e });
                })(t);
          }),
        (this._excludedLayerIds = t.excludedLayerIds || []),
        (this.supportedLanguages = t.supportedLanguages || [
          "ar",
          "en",
          "es",
          "fr",
          "de",
          "ja",
          "ko",
          "mul",
          "pt",
          "ru",
          "zh",
        ]);
    }
    function o(t, e, o) {
      if (
        (function (t, e) {
          return "string" == typeof e && t.test(e);
        })(t, e)
      )
        return o;
      if (
        (function (t, e) {
          return (
            e.stops &&
            e.stops.filter(function (e) {
              return t.test(e[1]);
            }).length > 0
          );
        })(t, e)
      ) {
        var r = e.stops.map(function (e) {
          return t.test(e[1]) ? [e[0], o] : e;
        });
        return Object.assign({}, e, { stops: r });
      }
      return e;
    }
    (e.prototype.setLanguage = function (t, e) {
      if (this.supportedLanguages.indexOf(e) < 0)
        throw new Error("Language " + e + " is not supported");
      var r =
        this._languageSource ||
        (function (t) {
          return Object.keys(t.sources).filter(function (e) {
            var o = t.sources[e];
            return /mapbox-streets-v\d/.test(o.url);
          })[0];
        })(t);
      if (!r) return t;
      var n = this._getLanguageField(e),
        i = this._isLanguageField,
        a = this._excludedLayerIds,
        s = t.layers.map(function (t) {
          return t.source === r
            ? (function (t, e, r, n) {
                return e.layout &&
                  e.layout["text-field"] &&
                  -1 === n.indexOf(e.id)
                  ? Object.assign({}, e, {
                      layout: Object.assign({}, e.layout, {
                        "text-field": o(t, e.layout["text-field"], r),
                      }),
                    })
                  : e;
              })(i, t, n, a)
            : t;
        }),
        l = Object.assign({}, t, { layers: s });
      return this._languageTransform(l, e);
    }),
      (e.prototype._initialStyleUpdate = function () {
        var t = this._map.getStyle(),
          e =
            this._defaultLanguage ||
            (function (t) {
              var e = navigator.languages
                  ? navigator.languages[0]
                  : navigator.language || navigator.userLanguage,
                o = e.split("-"),
                r = e;
              o.length > 1 && (r = o[0]);
              if (t.indexOf(r) > -1) return r;
              return null;
            })(this.supportedLanguages);
        this._map.off("styledata", this._initialStyleUpdate),
          this._map.setStyle(this.setLanguage(t, e));
      }),
      (e.prototype.onAdd = function (t) {
        return (
          (this._map = t),
          this._map.on("styledata", this._initialStyleUpdate),
          (this._container = document.createElement("div")),
          this._container
        );
      }),
      (e.prototype.onRemove = function () {
        this._map.off("styledata", this._initialStyleUpdate),
          (this._map = void 0);
      }),
      (t.exports = e);
  }),
  nt = (function (t) {
    d(n, o);
    var r = b(n);
    function n() {
      var t;
      p(this, n);
      for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
        o[i] = arguments[i];
      return (
        f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0),
        f(g(t), "_control", void 0),
        f(g(t), "_setLanguage", function () {
          var e = t.props.language,
            o = t._map,
            r = t._control;
          e && o.setStyle(r.setLanguage(o.getStyle(), e));
        }),
        t
      );
    }
    return (
      h(n, [
        {
          key: "componentDidMount",
          value: function () {
            var t = this._map,
              e = this.props,
              o = e.supportedLanguages,
              r = e.languageTransform,
              n = e.languageField,
              i = e.getLanguageField,
              a = e.languageSource,
              s = e.defaultLanguage,
              l = new rt({
                supportedLanguages: o,
                languageTransform: r,
                languageField: n,
                getLanguageField: i,
                languageSource: a,
                defaultLanguage: s,
              });
            t.addControl(l), (this._control = l);
          },
        },
        {
          key: "componentDidUpdate",
          value: function (t) {
            t.language !== this.props.language && this._setLanguage();
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            this._map &&
              this._map.getStyle() &&
              this._map.removeControl(this._control);
          },
        },
        {
          key: "getControl",
          value: function () {
            return this._control;
          },
        },
        {
          key: "render",
          value: function () {
            var t = this;
            return e(L.Consumer, {}, function (e) {
              return e && (t._map = e), null;
            });
          },
        },
      ]),
      n
    );
  })();
f(nt, "defaultProps", {});
var it = ot(function (t) {
    var e = [
      {
        id: "traffic-street-link-bg",
        type: "line",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        source: "mapbox://mapbox.mapbox-traffic-v1",
        "source-layer": "traffic",
        minzoom: 15,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          [
            "all",
            ["has", "congestion"],
            ["in", "class", "link", "motorway_link", "service", "street"],
          ],
        ],
        layout: {
          visibility: "visible",
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [14, 2.5],
              [20, 15.5],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(145, 95%, 30%)"],
              ["moderate", "hsl(30, 100%, 42%)"],
              ["heavy", "hsl(355, 100%, 37%)"],
              ["severe", "hsl(355, 70%, 22%)"],
            ],
          },
          "line-offset": {
            base: 1.5,
            stops: [
              [14, 2],
              [20, 18],
            ],
          },
          "line-opacity": {
            base: 1,
            stops: [
              [15, 0],
              [16, 1],
            ],
          },
        },
      },
      {
        id: "traffic-secondary-tertiary-bg",
        type: "line",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        source: "mapbox://mapbox.mapbox-traffic-v1",
        "source-layer": "traffic",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          [
            "all",
            ["has", "congestion"],
            ["in", "class", "secondary", "tertiary"],
          ],
        ],
        layout: {
          visibility: "visible",
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [9, 1.5],
              [18, 11],
              [20, 16.5],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(145, 95%, 30%)"],
              ["moderate", "hsl(30, 100%, 42%)"],
              ["heavy", "hsl(355, 100%, 37%)"],
              ["severe", "hsl(355, 70%, 22%)"],
            ],
          },
          "line-offset": {
            base: 1.5,
            stops: [
              [10, 0.5],
              [15, 5],
              [18, 11],
              [20, 14.5],
            ],
          },
          "line-opacity": {
            base: 1,
            stops: [
              [13, 0],
              [14, 1],
            ],
          },
        },
      },
      {
        id: "traffic-primary-bg",
        type: "line",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        source: "mapbox://mapbox.mapbox-traffic-v1",
        "source-layer": "traffic",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["==", "class", "primary"], ["has", "congestion"]],
        ],
        layout: {
          visibility: "visible",
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [10, 0.75],
              [15, 6],
              [20, 18],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(145, 95%, 30%)"],
              ["moderate", "hsl(30, 100%, 42%)"],
              ["heavy", "hsl(355, 100%, 37%)"],
              ["severe", "hsl(355, 70%, 22%)"],
            ],
          },
          "line-offset": {
            base: 1.2,
            stops: [
              [10, 0],
              [12, 1.5],
              [18, 13],
              [20, 16],
            ],
          },
          "line-opacity": {
            base: 1,
            stops: [
              [11, 0],
              [12, 1],
            ],
          },
        },
      },
      {
        id: "traffic-trunk-bg",
        type: "line",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        source: "mapbox://mapbox.mapbox-traffic-v1",
        "source-layer": "traffic",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["==", "class", "trunk"], ["has", "congestion"]],
        ],
        layout: {
          visibility: "visible",
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [8, 0.5],
              [9, 2.25],
              [18, 13],
              [20, 17.5],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(145, 95%, 30%)"],
              ["moderate", "hsl(30, 100%, 42%)"],
              ["heavy", "hsl(355, 100%, 37%)"],
              ["severe", "hsl(355, 70%, 22%)"],
            ],
          },
          "line-offset": {
            base: 1.5,
            stops: [
              [7, 0],
              [9, 1],
              [18, 13],
              [20, 18],
            ],
          },
          "line-opacity": 1,
        },
      },
      {
        id: "traffic-motorway-bg",
        type: "line",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        source: "mapbox://mapbox.mapbox-traffic-v1",
        "source-layer": "traffic",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["==", "class", "motorway"], ["has", "congestion"]],
        ],
        layout: {
          visibility: "visible",
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [6, 0.5],
              [9, 3],
              [18, 16],
              [20, 20],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(145, 95%, 30%)"],
              ["moderate", "hsl(30, 100%, 42%)"],
              ["heavy", "hsl(355, 100%, 37%)"],
              ["severe", "hsl(355, 70%, 22%)"],
            ],
          },
          "line-opacity": 1,
          "line-offset": {
            base: 1.5,
            stops: [
              [7, 0],
              [9, 1.2],
              [11, 1.2],
              [18, 10],
              [20, 15.5],
            ],
          },
        },
      },
      {
        id: "traffic-primary",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        ref: "traffic-primary-bg",
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [10, 1],
              [15, 4],
              [20, 16],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(142, 55%, 50%)"],
              ["moderate", "hsl(30, 100%, 55%)"],
              ["heavy", "hsl(355, 100%, 50%)"],
              ["severe", "hsl(355, 70%, 35%)"],
            ],
          },
          "line-offset": {
            base: 1.2,
            stops: [
              [10, 0],
              [12, 1.5],
              [18, 13],
              [20, 16],
            ],
          },
          "line-opacity": 1,
        },
      },
      {
        id: "traffic-secondary-tertiary",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        ref: "traffic-secondary-tertiary-bg",
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [9, 0.5],
              [18, 9],
              [20, 14],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(142, 55%, 50%)"],
              ["moderate", "hsl(30, 100%, 55%)"],
              ["heavy", "hsl(355, 100%, 50%)"],
              ["severe", "hsl(355, 70%, 35%)"],
            ],
          },
          "line-offset": {
            base: 1.5,
            stops: [
              [10, 0.5],
              [15, 5],
              [18, 11],
              [20, 14.5],
            ],
          },
          "line-opacity": 1,
        },
      },
      {
        id: "traffic-street-link",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        ref: "traffic-street-link-bg",
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [14, 1.5],
              [20, 13.5],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(142, 55%, 50%)"],
              ["moderate", "hsl(30, 100%, 55%)"],
              ["heavy", "hsl(355, 100%, 50%)"],
              ["severe", "hsl(355, 70%, 35%)"],
            ],
          },
          "line-offset": {
            base: 1.5,
            stops: [
              [14, 2],
              [20, 18],
            ],
          },
          "line-opacity": 1,
        },
      },
      {
        id: "traffic-trunk",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        ref: "traffic-trunk-bg",
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [8, 0.75],
              [18, 11],
              [20, 15],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(142, 55%, 50%)"],
              ["moderate", "hsl(30, 100%, 55%)"],
              ["heavy", "hsl(355, 100%, 50%)"],
              ["severe", "hsl(355, 70%, 35%)"],
            ],
          },
          "line-offset": {
            base: 1.5,
            stops: [
              [7, 0],
              [9, 1],
              [18, 13],
              [20, 18],
            ],
          },
          "line-opacity": 1,
        },
      },
      {
        id: "traffic-motorway",
        metadata: { "mapbox:group": "4053de47c16e55481b10fd748eaa994c" },
        ref: "traffic-motorway-bg",
        paint: {
          "line-width": {
            base: 1.5,
            stops: [
              [6, 0.5],
              [9, 1.5],
              [18, 14],
              [20, 18],
            ],
          },
          "line-color": {
            base: 1,
            type: "categorical",
            property: "congestion",
            stops: [
              ["low", "hsl(142, 55%, 50%)"],
              ["moderate", "hsl(30, 100%, 55%)"],
              ["heavy", "hsl(355, 100%, 50%)"],
              ["severe", "hsl(355, 70%, 35%)"],
            ],
          },
          "line-opacity": 1,
          "line-offset": {
            base: 1.5,
            stops: [
              [7, 0],
              [9, 1.2],
              [11, 1.2],
              [18, 10],
              [20, 15.5],
            ],
          },
        },
      },
    ];
    function o(t) {
      if (!(this instanceof o))
        throw new Error(
          "MapboxTraffic needs to be called with the new keyword"
        );
      (this.options = Object.assign(
        {
          showTraffic: !1,
          showTrafficButton: !0,
          trafficSource: /mapbox-traffic-v\d/,
        },
        t
      )),
        (this.render = this.render.bind(this)),
        (this.toggleTraffic = this.toggleTraffic.bind(this)),
        (this._hideTraffic = this._hideTraffic.bind(this)),
        (this._showTraffic = this._showTraffic.bind(this)),
        (this._hasTraffic = this._hasTraffic.bind(this)),
        (this._toggle = new r({
          show: this.options.showTrafficButton,
          onToggle: this.toggleTraffic.bind(this),
        }));
    }
    function r(t) {
      var e;
      (t = Object.assign({ show: !0, onToggle: function () {} }, t)),
        (this._btn =
          (((e = document.createElement("button")).className =
            "mapboxgl-ctrl-icon mapboxgl-ctrl-traffic"),
          (e.type = "button"),
          (e["aria-label"] = "Inspect"),
          e)),
        (this._btn.onclick = t.onToggle),
        (this.elem = (function (t, e) {
          var o = document.createElement("div");
          return (
            (o.className = "mapboxgl-ctrl mapboxgl-ctrl-group"),
            o.appendChild(t),
            e || (o.style.display = "none"),
            o
          );
        })(this._btn, t.show));
    }
    (o.prototype._hasTraffic = function () {
      var t = this._map.getStyle(),
        e = this.options.trafficSource;
      return (
        Object.keys(t.sources).filter(function (t) {
          return e.test(t);
        }).length > 0
      );
    }),
      (o.prototype.toggleTraffic = function () {
        (this.options.showTraffic = !this.options.showTraffic), this.render();
      }),
      (o.prototype.render = function () {
        if (!this._hasTraffic()) {
          this._map.addSource("mapbox://mapbox.mapbox-traffic-v1", {
            type: "vector",
            url: "mapbox://mapbox.mapbox-traffic-v1",
          });
          var t = this._map.getStyle().layers.filter(function (t) {
              return "road" === t["source-layer"];
            }),
            o = t[t.length - 1].id,
            r = (function (t, e, o) {
              for (var r = 0; r < t.layers.length; r++)
                if (o === t.layers[r].id) {
                  var n = t.layers
                    .slice(0, r)
                    .concat(e)
                    .concat(t.layers.slice(r));
                  return Object.assign({}, t, { layers: n });
                }
              return t;
            })(this._map.getStyle(), e, o);
          this._map.setStyle(r);
        }
        this.options.showTraffic
          ? (this._showTraffic(), this._toggle.setMapIcon())
          : (this._hideTraffic(), this._toggle.setTrafficIcon());
      }),
      (o.prototype._hideTraffic = function () {
        var t = this._map.getStyle(),
          e = this.options.trafficSource;
        t.layers.forEach(function (t) {
          e.test(t.source) &&
            ((t.layout = t.layout || {}), (t.layout.visibility = "none"));
        }),
          this._map.setStyle(t);
      }),
      (o.prototype._showTraffic = function () {
        var t = this._map.getStyle(),
          e = this.options.trafficSource;
        t.layers.forEach(function (t) {
          e.test(t.source) &&
            ((t.layout = t.layout || {}), (t.layout.visibility = "visible"));
        }),
          this._map.setStyle(t);
      }),
      (o.prototype.onAdd = function (t) {
        return (this._map = t), t.on("load", this.render), this._toggle.elem;
      }),
      (o.prototype.onRemove = function () {
        this._map.off("load", this.render);
        var t = this._toggle.elem;
        t.parentNode.removeChild(t), (this._map = void 0);
      }),
      (r.prototype.setTrafficIcon = function () {
        this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-traffic";
      }),
      (r.prototype.setMapIcon = function () {
        this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-map";
      }),
      (t.exports = o);
  }),
  at = (function (t) {
    d(n, o);
    var r = b(n);
    function n() {
      var t;
      p(this, n);
      for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
        o[i] = arguments[i];
      return (
        f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0),
        f(g(t), "_control", void 0),
        f(g(t), "_addControl", function () {
          var e = t.props,
            o = e.showTraffic,
            r = e.showTrafficButton,
            n = e.trafficSource,
            i = new it({
              showTraffic: o,
              showTrafficButton: r,
              trafficSource: n,
            });
          t._map.addControl(i), (t._control = i);
        }),
        t
      );
    }
    return (
      h(n, [
        {
          key: "componentDidMount",
          value: function () {
            this._addControl();
          },
        },
        {
          key: "componentDidUpdate",
          value: function (t) {
            t.showTraffic !== this.props.showTraffic &&
              this._control.toggleTraffic(),
              (t.showTrafficButton !== this.props.showTrafficButton ||
                t.trafficSource !== this.props.trafficSource) &&
                (this._map.removeControl(this._control), this._addControl());
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            this._map &&
              this._map.getStyle() &&
              this._map.removeControl(this._control);
          },
        },
        {
          key: "getControl",
          value: function () {
            return this._control;
          },
        },
        {
          key: "render",
          value: function () {
            var t = this;
            return e(L.Consumer, {}, function (e) {
              return e && (t._map = e), null;
            });
          },
        },
      ]),
      n
    );
  })();
f(at, "defaultProps", {
  showTraffic: !1,
  showTrafficButton: !0,
  trafficSource: /mapbox-traffic-v\d/,
});
var st = (function (t) {
  d(n, o);
  var r = b(n);
  function n() {
    var t;
    p(this, n);
    for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++)
      o[i] = arguments[i];
    return f(g((t = r.call.apply(r, [this].concat(o)))), "_map", void 0), t;
  }
  return (
    h(n, [
      {
        key: "componentDidMount",
        value: function () {
          this._setFilter();
        },
      },
      {
        key: "componentDidUpdate",
        value: function (t) {
          var e = t.filter,
            o = t.validate,
            r = this.props,
            n = r.filter,
            i = r.validate;
          (!j(e, n) || o !== i) && this._setFilter();
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          if (this._map && this._map.getStyle()) {
            var t = this.props.layerId;
            void 0 !== this._map.getLayer(t) && this._map.setFilter(t, void 0);
          }
        },
      },
      {
        key: "_setFilter",
        value: function () {
          var t = this.props,
            e = t.layerId,
            o = t.filter,
            r = t.validate;
          void 0 !== this._map.getLayer(e) &&
            (Array.isArray(o)
              ? this._map.setFilter(e, o, { validate: r })
              : this._map.setFilter(e, void 0));
        },
      },
      {
        key: "render",
        value: function () {
          var t = this;
          return e(L.Consumer, {}, function (e) {
            return e && (t._map = e), null;
          });
        },
      },
    ]),
    n
  );
})();
f(st, "defaultProps", { validate: !0 });
export {
  Q as AttributionControl,
  I as CustomLayer,
  J as FeatureState,
  st as Filter,
  X as FullscreenControl,
  Y as GeolocateControl,
  K as Image,
  nt as LanguageControl,
  M as Layer,
  L as MapContext,
  G as Marker,
  tt as NavigationControl,
  H as Popup,
  et as ScaleControl,
  q as Source,
  at as TrafficControl,
  W as default,
};
//# sourceMappingURL=react-map-gl.esm.js.map
