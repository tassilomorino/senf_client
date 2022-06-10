var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  CounterButton: () => CounterButton,
  NewTabLink: () => NewTabLink
});
module.exports = __toCommonJS(src_exports);

// src/NewTabLink.tsx
var React = __toESM(require("react"));
var NewTabLink = (_a) => {
  var _b = _a, {
    children,
    href
  } = _b, other = __objRest(_b, [
    "children",
    "href"
  ]);
  return /* @__PURE__ */ React.createElement("a", __spreadValues({
    target: "_blank",
    rel: "noreferrer",
    href
  }, other), children);
};

// src/CounterButton.tsx
var React2 = __toESM(require("react"));
var CounterButton = () => {
  const [count, setCount] = React2.useState(0);
  return /* @__PURE__ */ React2.createElement("div", {
    style: {
      background: `rgba(255,255,255,.05)`,
      borderRadius: `8px`,
      padding: 16
    }
  }, /* @__PURE__ */ React2.createElement("p", null, "This is component is from ", /* @__PURE__ */ React2.createElement("code", null, "ui")), /* @__PURE__ */ React2.createElement("p", null, /* @__PURE__ */ React2.createElement("button", {
    type: "button",
    onClick: () => setCount((c) => c + 1)
  }, "count ", count)));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CounterButton,
  NewTabLink
});
