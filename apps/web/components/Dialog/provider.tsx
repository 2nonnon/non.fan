'use client';

import { createContext, useContext } from 'react';
import { createId } from '@/utils/createId';
import { useState } from 'react';
import type { DialogInstance, DialogOptions } from './type';
import { DialogEnvironment } from './environment';
import { sleep } from '@/utils/sleep';

interface DialogProviderProps {
	children: React.ReactNode;
}

const DialogContext = createContext<
	((options: DialogOptions) => DialogInstance) | null
>(null);

export function DialogProvider({ children }: DialogProviderProps) {
	const [dialogList, setDialogList] = useState<Array<DialogInstance>>([]);

	const create = (options: DialogOptions): DialogInstance => {
		const id = createId();

		function destroy() {
			const index = dialogList.findIndex((item) => item.id === id);
			setDialogList(dialogList.toSpliced(index, 1));
		}

		async function open() {
			await sleep();
			const dialog = document.getElementById(id) as HTMLDialogElement | null;
			dialog?.showModal();
		}

		const drawerInstance = { id, destroy, open, ...options } as DialogInstance;

		setDialogList([...dialogList, drawerInstance]);

		return drawerInstance;
	};

	return (
		<DialogContext value={create}>
			{children}
			{dialogList.map((item) => (
				<DialogEnvironment key={item.id} {...item} />
			))}
		</DialogContext>
	);
}

export function useDialog() {
	return useContext(DialogContext)!;
}
