import { PureComponent, createElement } from "react";
import { MapContext } from "./react-map-gl.esm";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var theme = [
  {
    id: "gl-draw-polygon-fill-inactive",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "fill-color": "#3bb2d0",
      "fill-outline-color": "#3bb2d0",
      "fill-opacity": 0.1,
    },
  },
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": "#fbb03b",
      "fill-outline-color": "#fbb03b",
      "fill-opacity": 0.1,
    },
  },
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    paint: {
      "circle-radius": 3,
      "circle-color": "#fbb03b",
    },
  },
  {
    id: "gl-draw-polygon-stroke-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"],
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2,
    },
  },
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },
  {
    id: "gl-draw-line-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"],
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2,
    },
  },
  {
    id: "gl-draw-line-active",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },
  {
    id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 5,
      "circle-color": "#fff",
    },
  },
  {
    id: "gl-draw-polygon-and-line-vertex-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 3,
      "circle-color": "#fbb03b",
    },
  },
  {
    id: "gl-draw-point-point-stroke-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 5,
      "circle-opacity": 1,
      "circle-color": "#fff",
    },
  },
  {
    id: "gl-draw-point-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 3,
      "circle-color": "#3bb2d0",
    },
  },
  {
    id: "gl-draw-point-stroke-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "active", "true"],
      ["!=", "meta", "midpoint"],
    ],
    paint: {
      "circle-radius": 7,
      "circle-color": "#fff",
    },
  },
  {
    id: "gl-draw-point-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["!=", "meta", "midpoint"],
      ["==", "active", "true"],
    ],
    paint: {
      "circle-radius": 5,
      "circle-color": "#fbb03b",
    },
  },
  {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": "#404040",
      "fill-outline-color": "#404040",
      "fill-opacity": 0.1,
    },
  },
  {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#404040",
      "line-width": 2,
    },
  },
  {
    id: "gl-draw-line-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#404040",
      "line-width": 2,
    },
  },
  {
    id: "gl-draw-point-static",
    type: "circle",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
    paint: {
      "circle-radius": 5,
      "circle-color": "#404040",
    },
  },
];

const modes = MapboxDraw.modes;

class Draw extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_createControl", () => {
      // $FlowFixMe
      const map = this._map; // $FlowFixMe

      this._draw = new MapboxDraw({
        keybindings: this.props.keybindings,
        touchEnabled: this.props.touchEnabled,
        boxSelect: this.props.boxSelect,
        clickBuffer: this.props.clickBuffer,
        touchBuffer: this.props.touchBuffer,
        controls: {
          point: this.props.pointControl,
          line_string: this.props.lineStringControl,
          polygon: this.props.polygonControl,
          trash: this.props.trashControl,
          combine_features: this.props.combineFeaturesControl,
          uncombine_features: this.props.uncombineFeaturesControl,
        },
        displayControlsDefault: this.props.displayControlsDefault,
        styles: this.props.styles,
        modes:
          typeof this.props.modes === "function"
            ? this.props.modes(this.constructor.defaultProps.modes)
            : this.props.modes,
        defaultMode: this.props.mode,
        userProperties: this.props.userProperties,
      });
      map.addControl(this._draw, this.props.position);
      map.on("draw.create", this._onDrawCreate);
      map.on("draw.create", this._onChange);
      map.on("draw.delete", this._onDrawDelete);
      map.on("draw.delete", this._onChange);
      map.on("draw.combine", this._onDrawCombine);
      map.on("draw.combine", this._onChange);
      map.on("draw.uncombine", this._onDrawUncombine);
      map.on("draw.uncombine", this._onChange);
      map.on("draw.update", this._onDrawUpdate);
      map.on("draw.update", this._onChange);
      map.on("draw.selectionchange", this._onDrawSelectionchange);
      map.on("draw.modechange", this._onDrawModechange);
      map.on("draw.render", this._onDrawRender);
      map.on("draw.actionable", this._onDrawActionable);

      if (this.props.data) {
        // $FlowFixMe
        this._draw.add(this.props.data);
      }
    });

    _defineProperty(this, "_removeControl", () => {
      // $FlowFixMe
      const map = this._map;

      if (!map || !map.getStyle()) {
        return;
      }

      map.off("draw.create", this._onDrawCreate);
      map.off("draw.create", this._onChange);
      map.off("draw.delete", this._onDrawDelete);
      map.off("draw.delete", this._onChange);
      map.off("draw.combine", this._onDrawCombine);
      map.off("draw.combine", this._onChange);
      map.off("draw.uncombine", this._onDrawUncombine);
      map.off("draw.uncombine", this._onChange);
      map.off("draw.update", this._onDrawUpdate);
      map.off("draw.update", this._onChange);
      map.off("draw.selectionchange", this._onDrawSelectionchange);
      map.off("draw.modechange", this._onDrawModechange);
      map.off("draw.render", this._onDrawRender);
      map.off("draw.actionable", this._onDrawActionable); // $FlowFixMe

      map.removeControl(this._draw);
    });

    _defineProperty(this, "_onChange", () => {
      const { onChange } = this.props;

      if (onChange) {
        // $FlowFixMe
        const allFeatures = this._draw.getAll();

        onChange(allFeatures);
      }
    });

    _defineProperty(this, "_onDrawCreate", (event) => {
      if (this.props.onDrawCreate) {
        this.props.onDrawCreate(event);
      }
    });

    _defineProperty(this, "_onDrawDelete", (event) => {
      if (this.props.onDrawDelete) {
        this.props.onDrawDelete(event);
      }
    });

    _defineProperty(this, "_onDrawCombine", (event) => {
      if (this.props.onDrawCombine) {
        this.props.onDrawCombine(event);
      }
    });

    _defineProperty(this, "_onDrawUncombine", (event) => {
      if (this.props.onDrawUncombine) {
        this.props.onDrawUncombine(event);
      }
    });

    _defineProperty(this, "_onDrawUpdate", (event) => {
      if (this.props.onDrawUpdate) {
        this.props.onDrawUpdate(event);
      }
    });

    _defineProperty(this, "_onDrawSelectionchange", (event) => {
      if (this.props.onDrawSelectionChange) {
        this.props.onDrawSelectionChange(event);
      }
    });

    _defineProperty(this, "_onDrawModechange", (event) => {
      if (this.props.onDrawModeChange) {
        this.props.onDrawModeChange(event);
      }
    });

    _defineProperty(this, "_onDrawRender", (event) => {
      if (this.props.onDrawRender) {
        this.props.onDrawRender(event);
      }
    });

    _defineProperty(this, "_onDrawActionable", (event) => {
      if (this.props.onDrawActionable) {
        this.props.onDrawActionable(event);
      }
    });
  }

  componentDidMount() {
    this._createControl();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data) {
      // $FlowFixMe
      this._draw.set(this.props.data);
    }

    if (prevProps.position !== this.props.position) {
      this._removeControl();

      this._createControl();
    }

    if (prevProps.mode !== this.props.mode) {
      // $FlowFixMe
      this._draw.changeMode(this.props.mode, this.props.modeOptions);
    }
  }

  componentWillUnmount() {
    this._removeControl();
  }

  getDraw() {
    // $FlowFixMe
    return this._draw;
  }

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        // $FlowFixMe
        this._map = map;
      }

      return null;
    });
  }
}

_defineProperty(Draw, "defaultProps", {
  position: "top-right",
  keybindings: true,
  touchEnabled: true,
  boxSelect: true,
  clickBuffer: 2,
  touchBuffer: 25,
  pointControl: true,
  lineStringControl: true,
  polygonControl: true,
  trashControl: true,
  combineFeaturesControl: true,
  uncombineFeaturesControl: true,
  displayControlsDefault: true,
  styles: theme,
  modes,
  mode: "simple_select",
  modeOptions: {},
  userProperties: false,
  data: null,
  onDrawCreate: null,
  onDrawDelete: null,
  onDrawCombine: null,
  onDrawUncombine: null,
  onDrawUpdate: null,
  onDrawSelectionChange: null,
  onDrawModeChange: null,
  onDrawRender: null,
  onDrawActionable: null,
  onChange: null,
});

export default Draw;
//# sourceMappingURL=react-map-gl-draw.esm.js.map
