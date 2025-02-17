'use client';

import Piano from './piano/index';
import Freq from './freq/index';

export default function Page() {
	return (
		<div className="flex w-full flex-col">
			<Piano />
			<Freq />
		</div>
	);
}
