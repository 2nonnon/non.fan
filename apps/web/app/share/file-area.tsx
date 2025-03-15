import type { DataConnection } from 'peerjs';
import { useEffect, useState } from 'react';
import * as Fas from '@/utils/fsa';
import { cn } from '@/lib/utils';

interface FileAreaProps {
	connection: DataConnection | null;
}

interface MessageData {
	type: 'text' | 'file';
	name: string;
	data: any;
	size: number;
	timestamp: number;
}

interface Message {
	type: string;
	data: MessageData;
}

const isMessage = (message: any): message is Message => {
	return (
		typeof message === 'object' &&
		message !== null &&
		'type' in message &&
		'data' in message
	);
};

const Empty = () => {
	return (
		<div className="flex flex-col gap-2 items-center justify-center m-auto opacity-60">
			<div className="i-lucide:inbox text-5xl"></div>
			<div className="text-xs tracking-wide">空空如也</div>
		</div>
	);
};

export const FileArea = (props: FileAreaProps) => {
	const { connection } = props;
	const [remoteData, setRemoteData] = useState<MessageData[]>([]);
	const [localData, setLocalData] = useState<MessageData[]>([]);

	useEffect(() => {
		if (connection) {
			connection.on('data', (data) => {
				console.log('Received data:', data);

				if (!isMessage(data)) {
					return;
				}

				if (data.type === 'transfer') {
					setRemoteData((prev) => [...prev, data.data]);
				}
			});

			return () => {
				connection.off('data');
			};
		}
	}, [connection]);

	return (
		<div className="absolute inset-0 flex flex-col overflow-hidden">
			<div className="flex-1 shrink-0 flex flex-col overflow-hidden bg-base-100 rounded-box">
				<p className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					目标上传列表
				</p>

				{remoteData.length ? (
					<ul className="flex-1 list overflow-y-auto overflow-x-hidden">
						{remoteData.map((data) => (
							<li
								key={data.timestamp}
								className="list-row !flex justify-between items-center gap-4"
							>
								<div className="flex items-center gap-2 overflow-hidden">
									<div
										className={cn(
											'text-xl shrink-0',
											data.type === 'text'
												? 'i-lucide:file-text'
												: 'i-lucide:file',
										)}
									></div>

									<div className="whitespace-nowrap overflow-ellipsis overflow-hidden">
										{data.name}
									</div>
								</div>

								<div className='shrink-0'>
									<button
										className="btn btn-link btn-sm"
										type="button"
										onClick={() => {
											Fas.write(data.data, data.name);
										}}
									>
										下载
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<Empty />
				)}
			</div>

			<div className="divider"></div>

			<div className="flex-1 shrink-0 flex flex-col overflow-hidden bg-base-100 rounded-box">
				<div className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					<div className="flex items-center justify-between">
						<p>本地上传列表</p>

						<div className="flex gap-2">
							<button
								className="btn btn-link btn-sm"
								type="button"
								onClick={async () => {
									const fileHandle = await Fas.file();
									const file = await fileHandle.getFile();
									const messageData: MessageData = {
										type: 'file',
										name: file.name,
										data: await file.arrayBuffer(),
										size: file.size,
										timestamp: Date.now(),
									};

									setLocalData((prev) => [...prev, messageData]);

									if (connection) {
										const message: Message = {
											type: 'transfer',
											data: messageData,
										};

										console.log('Sending message:', messageData);

										connection.send(message);
									}
								}}
							>
								上传文件
							</button>
							<button
								className="btn btn-link btn-sm"
								type="button"
								onClick={() => {
									if (connection) {
										connection.send('hello');
									}
								}}
							>
								发送文本
							</button>
						</div>
					</div>
				</div>

				{localData.length ? (
					<ul className="flex-1 list overflow-y-auto overflow-x-hidden">
						{localData.map((data) => (
							<li
								key={data.timestamp}
								className="list-row !flex justify-between items-center gap-4"
							>
								<div className="flex items-center gap-2 overflow-hidden">
									<div
										className={cn(
											'text-xl shrink-0',
											data.type === 'text'
												? 'i-lucide:file-text'
												: 'i-lucide:file',
										)}
									></div>

									<div className="whitespace-nowrap overflow-ellipsis overflow-hidden">
										{data.name}
									</div>
								</div>

								<div></div>
							</li>
						))}
					</ul>
				) : (
					<Empty />
				)}
			</div>
		</div>
	);
};
