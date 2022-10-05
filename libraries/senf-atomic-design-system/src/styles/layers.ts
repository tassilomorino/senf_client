/** @format */
import { css } from "styled-components";
import theme from "./theme";

type Palette = typeof theme.colors.palette;

type BaseType = "senf" | "primary" | "white" | "transparent" | "invisible" | "signal";
type SignalColor = "alert" | "warning" | "success" | "info";
type BaseColor = "white" | "grey" | "shade";
type Lightness = "light" | "medium" | "dark"
type Size = "small" | "medium" | "large" | "sm" | "md" | "lg"
type InteractionState = "hover" | "active"
export interface BaseLayerProps {
	type?: BaseType;
	color?: BaseColor | SignalColor;
	lightness?: Lightness;
	border?: Lightness;
	size?: Size;
	interactive?: boolean;
	activatable?: boolean;
	textColor?: boolean;
}

const lightnessMap = (state?: InteractionState, lightness: Lightness = "light",) => {
	let i = ["light", "medium", "dark"].indexOf(lightness)
	if (state === "hover") i += 1
	if (state === "active") i += 2
	return [
		"white",
		"grey-100",
		"grey-200",
		"grey-300",
		"grey-400",
	][i]
}

const getColor = ({ type, color, lightness }: BaseLayerProps, colors: Palette, state?: InteractionState) => {
	switch (type) {
		case "senf": case "primary": return colors[
			state === "active" ? "blend-shade-primary-900" : state === "hover" ? "blend-shade-primary-800" : "primary"
		];
		case "transparent": {
			if (color === "white") return colors[`white/${state === "active" ? "800" : state === "hover" ? "700" : "500"}`];
			return colors[`${color}/${state === "active" ? "500" : state === "hover" ? "400" : "300"}`];
		}
		case "white": return colors[lightnessMap(state, lightness)];
		case "invisible": default: return state === "active" ? colors["grey/300"] : state === "hover" ? colors["grey/200"] : "transparent"
	}
}
const getBorder = ({ type, color, border }: BaseLayerProps, colors: Palette, state?: InteractionState) => {
	const lightBorder = border === "light"
	switch (type) {
		case "senf": case "primary": return colors[lightBorder ? "white/500" : "shade/300"];
		case "transparent": return colors[color === "white" ? "white/500" : `${color}/300`];
		case "white": return colors[lightBorder ? "white/800" : "shade/200"];
		case "invisible": default: return state ? colors["grey/300"] : "transparent";
	}
}
const getText = ({ type, color, textColor }: BaseLayerProps, colors: Palette) => {
	if (!textColor) return "inherit"
	switch (type) {
		case "senf": case "primary": return colors.shade;
		case "transparent": return colors[color === "white" ? "text" : `${color}`];
		case "white": case "invisible": default: return colors.text;
	}
}
const getShadow = ({ type, size = "medium" }: BaseLayerProps, colors: Palette) => {
	const color = () => {
		switch (type) {
			case "senf": case "primary": return colors.primary;
			case "white": return colors["grey/400"];
			default: return false;
		}
	}
	if (!color) return ""
	const sizeMap = { small: 1, medium: 2, large: 3 }
	const shadowMap = [7, 15, 3]
	const [y, s, o] = shadowMap.map(e => sizeMap[size] * e)
	return `0px -${y}px ${s}px -${o}px ${colors["white/500"]}, 0px ${y}px ${s}px -${o}px ${color()}`
}

export default ({ interactive = true, activatable = true, ...props }: BaseLayerProps, colors: Palette) => {
	return css`
		--bgColor: ${getColor(props, colors)};
		--color: ${getText(props, colors)};
		--border-color: ${getBorder(props, colors)};
		--border-width: 2px;
		// box-sizing should be in the global styles and applied to all elements with a * selector
		box-sizing: border-box;
		color: var(--color);
		background-color: var(--bgColor);
		border: var(--border-width) solid var(--border-color);
		box-shadow: ${getShadow(props, colors)};
		cursor: pointer;
		transition: all 300ms;

		&:hover {
			--bgColor: ${getColor(props, colors, interactive ? "hover" : undefined)};
			--border-color: ${getBorder(props, colors, interactive ? "hover" : undefined)};
		}
		&:active {
			--bgColor: ${getColor(props, colors, interactive ? "active" : undefined)};
			--border-color: ${getBorder(props, colors, interactive ? "active" : undefined)};
		}
		${activatable ?
			`&:focus {
				--border-color: ${colors.primary};
				--border-width: 3px
			}`
			: null
		}
`
}