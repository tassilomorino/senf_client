export type RGB = [number, number, number];
export type RGBA = [...RGB, number];
export type HSL = RGB;
export type HSLA = RGBA;

export type ColorPallet = {
	[key: string]: HSL | HSLA;
};

export type ThemeColors = {
	[key: string]: string
}

export const hsla = (h: number, s: number, l: number, a = 1) =>
	`hsla(${h}, ${s}%, ${l}%, ${a})`;

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

export const composite = (
	h: number,
	s: number,
	l: number,
	a: number,
	b: HSL = [0, 0, 100]
) => {
	const overlay = hsl2rgb(h, s, l);
	const background = hsl2rgb(...(b as RGB));
	return rgb2hsl(
		...(overlay.map(
			(value, index) => a * value + (1 - a) * background[index]
		) as RGB)
	) as RGB
};
const pad = (n: number, padding = 3) => String(n).padStart(padding, "0");

/**
 * Generates theme colors based on the given colors and luminance
 * @param colors Object with colors and their HSL values as an array.
 * @example { primary: [46, 100, 71]
 * @param luminance Array of luminance values.
 * @example [100, 75, 50, 25, 15, 10, 5];
 * @param mix HSL values to mix with, defaults to white, set to false to disable and only generate the base color as well as transparency.
 * @example [46, 100, 71]
 * @returns Object with colors and their HSLA values as string.
 * @example { 'primary-100': 'hsla(45, 100%, 98%, 1)', 'primary-100-tra': 'hsla(46, 100%, 71%, 0.05)', ... }
 */


export const generateRaw = (
	colors: ColorPallet,
	luminance: number[],
	mix: HSL | boolean = [0, 0, 100]
) => {
	const themeColors = {};
	Object.entries(colors).forEach(([name, color]) => {
		const [h, s, l] = color
		const bw = !mix || (mix[0] === 0 && mix[1] === 0)
		if (!mix) themeColors[`${name}`] = [h, s, l, 1]
		luminance.forEach((lum, i) => {
			const index = i !== 0 && pad((10 - i) * 100)
			if (mix) themeColors[`${name}${index ? `-${index}` : ""}`] = composite(
				h,
				s,
				l,
				lum / 100,
				mix as HSL
			) as HSL
			if (index && bw) themeColors[`${name}/${index}`] = [h, s, l, lum / 100]
		})
	})
	return themeColors
}
export const generateThemeColors = (colors: ColorPallet, luminance: number[], mix: HSL | boolean = [0, 0, 100]) => {
	const conv = Object.fromEntries(Object.entries(
		generateRaw(colors, luminance, mix)
	).map(e => { e[1] = hsla(...e[1] as HSLA); return e }))
	return conv as ThemeColors
}


export const getRelativeLuminance = (rgb: RGB) =>
	0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];


export const generateStaticColors = (colors: ThemeColors) => console.log(JSON.stringify(colors))

export const logColors = (colors: ThemeColors) => {
	console.log(
		`%cGenerated ${Object.entries(colors).length} colors:`,
		`font-weight: bold`
	);
	Object.entries(colors).forEach(([name, color]) => {
		console.log(
			`%c  `,
			`background: ${color}; color: black; border-radius: 0.25rem;`,
			`${name}: ${color}`
		);
	});
};
