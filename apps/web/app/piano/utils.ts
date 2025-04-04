export const notes = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
] as const;

export const names = [
	'do',
	'',
	're',
	'',
	'mi',
	'fa',
	'',
	'so',
	'',
	'la',
	'',
	'ti',
] as const;

export const a_index = notes.indexOf('A');
export const a_freqs = [
	27.5, 55, 110, 220, 440, 880, 1760, 3520, 7040, 14080, 28160,
];

export function getFreq(number: number, octave: number) {
	return a_freqs[octave] * 2 ** ((number - a_index) / 12);
}

export function play(freq: number) {
	const audioContext = new (
		window.AudioContext || (window as any).webkitAudioContext
	)();

	const harmonicCount = 9;
	const gains = [1, 0.398, 0.2, 0.1, 0.071, 0.04, 0.025, 0.025, 0.025];

	const harmonics = [];
	for (let i = 1; i <= harmonicCount; i++) {
		const harmonicFreq = freq * i;

		if (harmonicFreq > 24000) {
			break;
		}

		const harmonicOscillator = audioContext.createOscillator();

		harmonicOscillator.type = 'sine';

		harmonicOscillator.frequency.setValueAtTime(
			harmonicFreq,
			audioContext.currentTime,
		);

		harmonics.push(harmonicOscillator);
	}

	// 创建增益节点（控制音量）
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0, audioContext.currentTime); // 初始音量为0

	// 创建滤波器节点（改变音色）
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass'; // 使用低通滤波器
	filter.frequency.setValueAtTime(2000, audioContext.currentTime); // 设置滤波器频率为较低值以减弱尖锐感
	filter.Q.setValueAtTime(1, audioContext.currentTime); // 调整滤波器Q值以控制峰值宽度

	// 包络控制
	const attackTime = 0.01; // 攻击时间
	const decayTime = 0.3; // 衰减时间
	const sustainLevel = 0.4; // 持续音量
	const releaseTime = 0.5; // 释放时间

	filter.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// 设置包络
	gainNode.gain.linearRampToValueAtTime(
		0.8,
		audioContext.currentTime + attackTime,
	); // 攻击
	gainNode.gain.linearRampToValueAtTime(
		sustainLevel,
		audioContext.currentTime + attackTime + decayTime,
	); // 衰减到持续音量
	gainNode.gain.linearRampToValueAtTime(
		0,
		audioContext.currentTime + attackTime + decayTime + releaseTime,
	); // 释放音量, + 1 延音

	// 连接节点
	harmonics.forEach((harmonic, i) => {
		const gn = audioContext.createGain();
		gn.gain.value = gains[i];
		harmonic.connect(gn);
		gn.connect(gainNode);

		harmonic.start();
		harmonic.stop(
			audioContext.currentTime + attackTime + decayTime + releaseTime,
		);

		if (i === 0) {
			harmonic.addEventListener('ended', () => {
				audioContext.close();
			});
		}
	});
}

function derivingNote({
	number,
	group,
	semiTone,
}: { number: number; group: number; semiTone: number }) {
	const $number = number + semiTone;
	const $note = notes[$number % 12];
	const $group = $number >= 12 ? +group + 1 : +group;
	const $freq = getFreq($number, $group);

	return { number: $number, note: $note, group: $group, freq: $freq };
}

export type DerivingFn = (args: { number: number; group: number }) => Array<{
	number: number;
	note: string;
	group: number;
	freq: number;
}>;

export const derivingMajorTriad: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 4, 7];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingMinorTriad: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 3, 7];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingAugmentedTriad: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 4, 8];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingDiminishedTriad: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 3, 6];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingMajor7th: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 4, 7, 11];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingDominant7th: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 4, 7, 10];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingMinor7th: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 3, 7, 10];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingHalfDiminished7th: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 3, 6, 10];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingDiminished7th: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 3, 6, 9];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingMinorMajor7th: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 3, 7, 11];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingAugmented7th: DerivingFn = ({ number, group }) => {
	const semiTones = [0, 4, 8, 10];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};

export const derivingDominant7thSuspended4th: DerivingFn = ({
	number,
	group,
}) => {
	const semiTones = [0, 4, 7, 10];
	return semiTones.map((semiTone) => derivingNote({ number, group, semiTone }));
};
