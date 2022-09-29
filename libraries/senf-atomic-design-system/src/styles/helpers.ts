export interface ColorNames {
	[key: string]: {
		h: number;
		s: number;
		l: number;
	}
}
export interface ThemeColors { [key: string]: string }

export type RGB = [number, number, number];

export const hsla = (h: number, s: number, l: number, a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

export const hsl2rgb = (hue: number, sat: number, lum: number) => {
	const h = hue;
	const s = sat / 100;
	const l = lum / 100;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number, k = (n + h / 30) % 12) =>
		Math.floor((l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)) * 255);
	return [f(0), f(8), f(4)];
};
export const rgb2hsl = (red: number, green: number, blue: number) => {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;
	const v = Math.max(r, g, b);
	const c = v - Math.min(r, g, b);
	const f = 1 - Math.abs(v + v - c - 1);
	const h =
		c && (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
	return [
		Math.floor(60 * (h < 0 ? h + 6 : h)),
		Math.floor((f ? c / f : 0) * 100),
		Math.floor(((v + v - c) / 2) * 100),
	];
};

export const composite = (h: number, s: number, l: number, a: number, b: number[] = [0, 0, 100]) => {
	const overlay = hsl2rgb(h, s, l)
	const background = hsl2rgb(...b as RGB)
	return hsla(
		...rgb2hsl(
			...overlay.map((value, index) => a * value + (1 - a) * background[index]) as RGB
		) as RGB
	);
}
const pad = (n: number, padding = 3) => String(n).padStart(padding, '0');

export const generateThemeColors = (colors: ColorNames, luminance: number[]) => {
	const themeColors: ThemeColors = {};
	Object.entries(colors).forEach(([name, color]) => {
		const { h, s, l } = color
		luminance.forEach((lum, i) => {
			const index = pad((luminance.length - i) * 100)
			themeColors[`${name}-${index}`] = composite(h, s, l, lum / 100)
			themeColors[`${name}-${index}-tra`] = hsla(h, s, l, lum / 100)
			if (name === 'primary') {
				const { shade } = colors
				themeColors[`${name}-${index}-shade`] = composite(shade.h, shade.s, shade.l, lum / 100, [h, s, l])
			}
		})
	})
	return themeColors
}

export const logColors = (colors: ThemeColors) => {
	Object.entries(colors).forEach(([name, color]) => {
		console.log(`%c${name} ${color}`, `background: ${color}; color: black`)
	})
}