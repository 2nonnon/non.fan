'use client';

import { useEffect, useState } from 'react';
import { renderCanvas } from './utils';
import { Fsa } from '@/utils/fsa';

const defaultContent = 'non.fan';

export default function Page() {
	const [text, setText] = useState<string>();
	const [offscreenCanvas, setOffscreenCanvas] = useState<OffscreenCanvas>();
	const [url, setUrl] = useState<string>();

	useEffect(() => {
		renderCanvas(text || defaultContent, { pixelSize: 100 }).then((canvas) => {
			setOffscreenCanvas(canvas);

			canvas.convertToBlob().then((blob) => {
				const url = URL.createObjectURL(blob);
				setUrl(url);
			});
		});
	}, [text]);

	const download = () => {
		if (Fsa.isSupport()) {
			offscreenCanvas?.convertToBlob().then((blob) => {
				Fsa.write(blob, 'qrcode.png');
			});
		} else {
			if (url) {
				const a = document.createElement('a');
				a.href = url;
				a.download = 'qrcode.png';
				a.click();
			}
		}
	};

	return (
		<div className="w-full flex flex-col gap-4">
			<div>
				<textarea
					className="textarea h-24 w-full"
					placeholder={defaultContent}
					value={text}
					onChange={(e) => setText(e.target.value)}
				></textarea>
			</div>

			<div className="max-w-80 mx-auto flex flex-col gap-4">
				<div className="aspect-square border border-primary-content rounded overflow-hidden">
					{url ? (
						<img src={url} className="w-full h-full" alt="qrcode" />
					) : null}
				</div>

				<button type="button" className="btn btn-primary" onClick={download}>
					下载
				</button>
			</div>
		</div>
	);
}
