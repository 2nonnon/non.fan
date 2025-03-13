'use client';

import Image from 'next/image';
import Peer, { type DataConnection } from 'peerjs';
import { useState, useEffect, useLayoutEffect } from 'react';
import { renderCanvas } from '../qrcode/utils';

const queryKey = 'roomId';

export default function Page() {
	const [href, setHref] = useState('');
	const [localRoomId, setLocalRoomId] = useState('');
	const [remoteRoomId, setRemoteRoomId] = useState('');
	const [peer, setPeer] = useState<Peer | null>(null);
	const [connection, setConnection] = useState<DataConnection | null>(null);
	const [qrcode, setQrcode] = useState('');

	const shareLink = localRoomId ? `${href}?${queryKey}=${localRoomId}` : '';

	const isGenerated = !!qrcode;

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

	useLayoutEffect(() => {
		setHref(window.location.href);
		const params = new URLSearchParams(window.location.search);
		const roomIdFromUrl = params.get(queryKey);
		if (roomIdFromUrl) {
			setRemoteRoomId(roomIdFromUrl);
		}
	}, []);

	const connect = () => {
		if (peer && remoteRoomId) {
			const connection = peer.connect(remoteRoomId);
			setConnection(connection);
		}
	};

	useEffect(() => {
		try {
			const newPeer = new Peer({ debug: 2 });
			setPeer(newPeer);

			newPeer.on('open', (id) => {
				setLocalRoomId(id);

				// connection.on('data', (data) => {
				// 	console.log('sss', data);
				// });
			});

			newPeer.on('connection', (connection) => {
				console.log('New connection:', connection, connection.dataChannel);

				setConnection(connection);
			});

			newPeer.on('error', (error) => {
				console.error('Peer error:', error);
			});

			return () => {
				newPeer.destroy();
			};
		} catch (error) {
			console.error('Error initializing peer:', error);
		}
	}, []);

	return (
		<div className="w-full max-w-screen-md mx-auto flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<p>目标 ID</p>
				<input
					type="text"
					className="input w-full"
					placeholder="01ec7712-a90c-410c-8ef1-9cd3b6fbccc8"
					value={remoteRoomId}
					onChange={(e) => setRemoteRoomId(e.target.value)}
				/>
				<button
					className="btn btn-primary"
					type="button"
					onClick={() => {
						connect();
					}}
				>
					连接
				</button>
			</div>

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
						<div className="w-48 aspect-square">
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
		</div>
	);
}
