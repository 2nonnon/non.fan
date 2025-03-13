import { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { renderCanvas } from '../qrcode/utils';

interface LocalAreaProps {
	localRoomId: string;
}

export const queryKey = 'roomId';

export const LocalArea = (props: LocalAreaProps) => {
	const { localRoomId } = props;

	const [href, setHref] = useState('');
	const [qrcode, setQrcode] = useState('');

	const shareLink = localRoomId ? `${href}?${queryKey}=${localRoomId}` : '';

	const isGenerated = !!qrcode;

	useLayoutEffect(() => {
		setHref(window.location.href);
	}, []);

	useEffect(() => {
		if (shareLink) {
			let url = '';

			(async () => {
				const offscreenCanvas = await renderCanvas(shareLink, {
					pixelSize: 100,
					border: 2,
				});

				offscreenCanvas.convertToBlob().then((blob) => {
					url = URL.createObjectURL(blob);
					setQrcode(url);
				});
			})();

			return () => {
				URL.revokeObjectURL(url);
			};
		}

		setQrcode('');
	}, [shareLink]);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-1">
				<div className="flex items-center justify-between">
					<p>本地 ID</p>

					<button
						className="btn btn-sm"
						type="button"
						onClick={() => navigator.clipboard.writeText(localRoomId)}
					>
						复制
					</button>
				</div>
				<p className="bg-base-300 px-3 py-2 text-sm rounded whitespace-nowrap overflow-hidden overflow-ellipsis">
					{isGenerated ? localRoomId : '生成中...'}
				</p>
			</div>

			<div className="flex flex-col gap-1">
				<div className="flex items-center  justify-between">
					<p>分享链接</p>

					<button
						className="btn btn-sm"
						type="button"
						onClick={() => navigator.clipboard.writeText(shareLink)}
					>
						复制
					</button>
				</div>
				<p className="bg-base-300 px-3 py-2 text-sm rounded whitespace-nowrap overflow-hidden overflow-ellipsis">
					{isGenerated ? shareLink : '生成中...'}
				</p>
			</div>

			<div className="flex flex-col gap-1">
				<div className="flex items-center  justify-between">
					<p>分享二维码</p>

					<button
						className="btn btn-sm"
						type="button"
						onClick={async () => {
							const blob = await fetch(qrcode).then((res) => res.blob());
							navigator.clipboard.write([
								new ClipboardItem({
									[blob.type]: blob,
								}),
							]);
						}}
					>
						复制
					</button>
				</div>
				<div>
					<div className="w-44 aspect-square">
						{isGenerated ? (
							<Image
								src={qrcode}
								className="w-full h-full"
								width={100}
								height={100}
								alt="qrcode"
							/>
						) : (
							'生成中...'
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
