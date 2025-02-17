'use client';

import { useRef } from 'react';
import { Fsa } from '@/utils/fsa';

function autoCorrelate(
	dataArray: Float32Array,
	sampleRate: number,
): number | null {
	const size = dataArray.length;
	const maxLag = Math.floor(size / 2);
	const autoCorr = Array.from({ length: maxLag }).fill(0) as number[];

	// 计算自动相关函数
	for (let lag = 0; lag < maxLag; lag++) {
		for (let i = 0; i < maxLag; i++) {
			autoCorr[lag] += dataArray[i] * dataArray[i + lag];
		}
	}

	// 找到第一个非零滞后的峰值
	let peakIndex = 0;
	let maxValue = Number.NEGATIVE_INFINITY;
	for (let i = 1; i < maxLag; i++) {
		if (autoCorr[i] > maxValue) {
			maxValue = autoCorr[i];
			peakIndex = i;
		}
	}

	if (peakIndex === 0) return null;

	const period = peakIndex;
	const frequency = sampleRate / period;

	return frequency;
}

async function drawWave(canvas: HTMLCanvasElement) {
	const fileHandle = await Fsa.file();

	const file = await fileHandle.getFile();

	const audioCtx = new window.AudioContext();
	const analyser = audioCtx.createAnalyser();
	analyser.fftSize = 2048;

	const arrayBuffer = await file.arrayBuffer();

	let audioDuration = 0;
	let startTime = 0;

	audioCtx.decodeAudioData(arrayBuffer, (audioBuffer) => {
		const audioSource = audioCtx.createBufferSource();
		audioSource.buffer = audioBuffer;

		startTime = audioCtx.currentTime;
		audioDuration = audioBuffer.duration;

		audioSource.connect(analyser);
		audioSource.connect(audioCtx.destination);
		audioSource.start(startTime);

		draw(canvas);
	});

	const canvasCtx = canvas.getContext('2d')!;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Float32Array(bufferLength);
	const sampleRate = audioCtx.sampleRate;

	function draw(canvas: HTMLCanvasElement) {
		requestAnimationFrame(() => draw(canvas));

		analyser.getFloatTimeDomainData(dataArray);

		const playTime = audioCtx.currentTime - startTime;

		const freq = autoCorrelate(dataArray, sampleRate);
		console.log(freq);
	}
}

function addZero(num: number) {
	return num < 10 ? `0${num}` : `${num}`;
}

function tempAddZero(str: TemplateStringsArray, ...args: number[]) {
	return args.reduce((res, cur, i) => res + addZero(cur) + str[i + 1], str[0]);
}

function formatTime(second: number) {
	const minutes = Math.floor(second / 60);
	const seconds = Math.floor(second % 60);
	return tempAddZero`${minutes}:${seconds}`;
}

export default function Freq() {
	return <div>1</div>;
}
