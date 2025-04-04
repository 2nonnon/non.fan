'use client';

import { useState } from 'react';
import {
	type DerivingFn,
	derivingAugmentedTriad,
	derivingDiminishedTriad,
	derivingMajorTriad,
	derivingMinorTriad,
	derivingMajor7th,
	derivingDominant7th,
	derivingMinor7th,
	derivingHalfDiminished7th,
	derivingDiminished7th,
	derivingMinorMajor7th,
	derivingAugmented7th,
	derivingDominant7thSuspended4th,
	getFreq,
	notes,
	play,
} from './utils';

const groups = Array.from({ length: 10 }, (_, i) => i);

const keys = Array.from({ length: 12 }, (_, i) => i);

export default function Page() {
	const [startNumber, setStartNumber] = useState('0');
	const [startGroup, setStartGroup] = useState('4');

	return (
		<div className="w-full max-w-screen-lg mx-auto">
			<div className="w-full mb-2">
				<input
					type="range"
					className="range [--range-fill:0] w-full"
					value={startNumber}
					onChange={(e) => setStartNumber(e.target.value)}
					min="0"
					max="11"
					step="1"
				/>
				<div className="flex justify-between px-2.5 mt-1 text-xs">
					{notes.map((note) => (
						<span key={note}>|</span>
					))}
				</div>
				<div className="flex justify-between px-1.75 mt-1 text-xs">
					{notes.map((note) => (
						<span key={note}>{note}</span>
					))}
				</div>
			</div>

			<div className="w-full mb-4">
				<input
					type="range"
					className="range [--range-fill:0] w-full"
					value={startGroup}
					onChange={(e) => setStartGroup(e.target.value)}
					min="0"
					max="9"
					step="1"
				/>
				<div className="flex justify-between px-2.5 mt-1 text-xs">
					{groups.map((group) => (
						<span key={group}>|</span>
					))}
				</div>
				<div className="flex justify-between px-1.75 mt-1 text-xs">
					{groups.map((group) => (
						<span key={group}>{group}</span>
					))}
				</div>
			</div>

			<div className="w-full grid grid-cols-4 gap-2">
				{keys.map((key) => {
					const realKey = key + +startNumber;
					const note = notes[realKey % 12];
					const realGroup = realKey >= 12 ? +startGroup + 1 : +startGroup;
					const freq = getFreq(realKey, realGroup);

					return (
						<button
							key={key}
							className="btn bg-base-100 aspect-square h-auto w-auto relative"
							type="button"
							onClick={() => play(freq)}
						>
							<span>{note + realGroup}</span>
							<span className="absolute translate-y-full mt-2 opacity-30 text-xs">
								{freq.toFixed(1)} Hz
							</span>
						</button>
					);
				})}
			</div>

			<div className="mt-6 flex flex-col gap-4">
				<div>
					<h3 className="mb-2">三和弦</h3>

					<div className="flex flex-col gap-2">
						<Chord
							name={'大三和弦(CM)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingMajorTriad}
						/>

						<Chord
							name={'小三和弦(Cm)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingMinorTriad}
						/>

						<Chord
							name={'增三和弦(Caug)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingAugmentedTriad}
						/>

						<Chord
							name={'减三和弦(Cmin)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingDiminishedTriad}
						/>
					</div>
				</div>

				<div>
					<h3 className="mb-2">七和弦</h3>

					<div className="flex flex-col gap-2">
						<Chord
							name={'大七和弦(Cmaj7)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingMajor7th}
						/>

						<Chord
							name={'属七和弦(C7)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingDominant7th}
						/>

						<Chord
							name={'小七和弦(Cm7)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingMinor7th}
						/>

						<Chord
							name={'半减七和弦(Cm7b5)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingHalfDiminished7th}
						/>

						<Chord
							name={'减七和弦(Cdim7)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingDiminished7th}
						/>

						<Chord
							name={'小大七和弦(Cm(maj7))'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingMinorMajor7th}
						/>

						<Chord
							name={'增七和弦(C7#5)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingAugmented7th}
						/>

						<Chord
							name={'属七挂四和弦(C7sus4)'}
							number={+startNumber}
							group={+startGroup}
							derivingFn={derivingDominant7thSuspended4th}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

type ChordProps = {
	name: string;
	number: number;
	group: number;
	derivingFn: DerivingFn;
};

function Chord({ name, number, group, derivingFn }: ChordProps) {
	const notes = derivingFn({ number, group });

	return (
		<div className="flex flex-col gap-2">
			<div className="text-sm">{name}</div>

			<div className="grid grid-cols-4 gap-2">
				{notes.map(({ note, group, freq }) => (
					<button
						key={note + group}
						className="btn bg-base-100 aspect-square h-auto w-auto relative"
						type="button"
						onClick={() => play(freq)}
					>
						<span>{note + group}</span>
						<span className="absolute translate-y-full mt-2 opacity-30 text-xs">
							{freq.toFixed(1)} Hz
						</span>
					</button>
				))}
				<button
					className="btn bg-base-100 aspect-square h-auto w-auto relative"
					type="button"
					onClick={() => {
						notes.forEach(({ freq }, i) =>
							setTimeout(() => play(freq), i * 300),
						);
					}}
				>
					<span>Chord</span>
				</button>
			</div>
		</div>
	);
}
