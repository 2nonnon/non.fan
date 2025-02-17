export function RGBToHex(R: number, G: number, B: number) {
	let $R = R.toString(16);
	let $G = G.toString(16);
	let $B = B.toString(16);

	if ($R.length === 1) $R = `0${$R}`;
	if ($G.length === 1) $G = `0${$G}`;
	if ($B.length === 1) $B = `0${$B}`;

	return { R: $R, G: $G, B: $B };
}
