'use client';

import Peer, { type DataConnection } from 'peerjs';
import { useState, useEffect, useLayoutEffect } from 'react';
import { LocalArea, queryKey } from './local-area';
import { FileArea } from './file-area';

export default function Page() {
	const [localRoomId, setLocalRoomId] = useState('');
	const [remoteRoomId, setRemoteRoomId] = useState('');
	const [peer, setPeer] = useState<Peer | null>(null);
	const [connection, setConnection] = useState<DataConnection | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useLayoutEffect(() => {
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
		if (connection) {
			connection.on('open', () => {
				console.log('Connection opened');
				setIsConnected(true);
			});

			connection.on('close', () => {
				console.log('Connection closed');
				setIsConnected(false);
			});
		}
	}, [connection]);

	useEffect(() => {
		try {
			const newPeer = new Peer({ debug: 2 });
			setPeer(newPeer);

			newPeer.on('open', (id) => {
				setLocalRoomId(id);
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
		<div className="flex-1 w-full max-w-screen-md mx-auto relative">
			{isConnected ? (
				<FileArea connection={connection} />
			) : (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<p>目标 ID</p>
						<input
							type="text"
							className="input w-full"
							placeholder="例: 01ec7712-a90c-410c-8ef1-9cd3b6fbccc8"
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

					<LocalArea localRoomId={localRoomId} />
				</div>
			)}
		</div>
	);
}
