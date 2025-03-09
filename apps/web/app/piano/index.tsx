'use client';

import { useState } from 'react';
import { getFreq, notes, play } from './utils';

const groups = Array.from({ length: 8 }, (_, i) => i);

const keys = Array.from({ length: 12 }, (_, i) => i);

export default function Page() {
	const [startNote, setStartNote] = useState('0');
	const [startGroup, setStartGroup] = useState('3');

	return (
		<div className="w-full">
			<div className="w-full mb-2">
				<input
					type="range"
					className="range [--range-fill:0] w-full"
					value={startNote}
					onChange={(e) => setStartNote(e.target.value)}
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
					max="7"
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
					const realKey = key + +startNote;
					const note = notes[realKey % 12];
					const realGroup = realKey >= 12 ? +startGroup + 1 : +startGroup;
					const freq = getFreq(note, realGroup);

					return (
						<button
							key={key}
							className="btn aspect-square h-auto w-auto relative"
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
		</div>
	);
}
