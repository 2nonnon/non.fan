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

export function getFreq(note: (typeof notes)[number], octave: number) {
	return a_freqs[octave] * 2 ** ((notes.indexOf(note) - a_index) / 12);
}

export function play(freq: number) {
	const audioContext = new (
		window.AudioContext || (window as any).webkitAudioContext
	)();

	// 创建基本的振荡器节点
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // 使用正弦波作为基础
	oscillator.frequency.setValueAtTime(freq, audioContext.currentTime); // C4频率

	// 创建多个振荡器模拟钢琴的谐波成分
	const harmonics = [];
	for (let i = 2; i <= 5; i++) {
		const harmonicFreq = freq * i;

		if (harmonicFreq > 24000) {
			break;
		}

		const harmonicOscillator = audioContext.createOscillator();
		harmonicOscillator.type = 'sine';
		harmonicOscillator.frequency.setValueAtTime(
			harmonicFreq,
			audioContext.currentTime,
		); // C4频率的倍数
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

	// 连接节点
	oscillator.connect(filter);

	for (const harmonic of harmonics) {
		harmonic.connect(filter);
	}

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

	// 开始振荡器
	oscillator.start();

	for (const harmonic of harmonics) {
		harmonic.start();
	}

	oscillator.stop(
		audioContext.currentTime + attackTime + decayTime + releaseTime,
	); // 停止振荡器, + 1 延音

	for (const harmonic of harmonics) {
		harmonic.stop(
			audioContext.currentTime + attackTime + decayTime + releaseTime,
		); // 停止谐波振荡器, + 1 延音
	}

	oscillator.addEventListener('ended', () => {
		audioContext.close();
	});
}
