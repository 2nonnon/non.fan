type Fn<T = any, R = T> = (...arg: T[]) => R;

export function memorized<T = any, R = T>(fn: Fn<T, R>) {
	let cache: R | null = null;

	const memorizedFn = (...args: T[]) => {
		if (cache) return cache;
		cache = fn(...args);
		return cache;
	};

	const clearCache = () => {
		cache = null;
	};

	return [memorizedFn, clearCache] as const;
}
