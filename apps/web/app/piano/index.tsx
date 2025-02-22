'use client';

import { useState } from 'react';
import { getFreq, names, notes, play } from './calc';
import PianoKey from './piano-key';

const hotkeys1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const hotkeys2 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const hotkeys3 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const hotkeys4 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

const hotkeys = [...hotkeys1, ...hotkeys2, ...hotkeys3, ...hotkeys4];

const startOctaves = Array.from({ length: 5 }).map((_, i) => i + 1);

export default function Page() {
	const [startOctave, setStartOctave] = useState('3');

	return (
		<div className="w-full p-4">
			{/* <div>
        <RadioGroup
          value={startOctave}
          onValueChange={setStartOctave}
          orientation="horizontal"
        >
          {
            startOctaves.map(octave => <Radio key={octave} value={`${octave}`}>{octave}</Radio>)
          }
        </RadioGroup>
      </div> */}
			<div className="flex items-start gap-[1px] overflow-y-hidden overflow-x-auto">
				{hotkeys.map((hotkey, index) => {
					const octave = Math.floor(index / 12) + +startOctave;
					const note = notes[index % 12];
					const name = names[index % 12];
					const freq = getFreq(note, +octave);

					const props = {
						hotkey,
						handler: () => play(freq),
						name,
						note: `${note}${octave}`,
						freq: freq.toFixed(2),
					};

					return (
						<PianoKey
							key={hotkey}
							variant={name ? 'white' : 'black'}
							{...props}
						/>
					);
				})}
			</div>
		</div>
	);
}
