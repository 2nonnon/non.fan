export async function sleep(ms = 0) {
	const { promise, resolve } = Promise.withResolvers<void>();

	setTimeout(resolve, ms);

	return promise;
}
