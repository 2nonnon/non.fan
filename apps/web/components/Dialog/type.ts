import type { ReactNode } from 'react';

export interface DialogDefineProps {
	title?: string;
	className?: string;
	closable?: boolean;
	maskClosable?: boolean;
	closeOnEsc?: boolean;
	positiveText?: string;
	negativeText?: string;
	onPositiveClick?: (e: MouseEvent) => boolean | Promise<boolean> | any;
	onNegativeClick?: (e: MouseEvent) => boolean | Promise<boolean> | any;
	onClose?: () => boolean | Promise<boolean> | any;
	destroy: () => void;
}

export interface DialogProps extends DialogDefineProps {
	id: string;
	content: (() => ReactNode) | 'string';
	action?: (context: Pick<DialogInstance, 'close'>) => ReactNode;
}

export type DialogOptions = Omit<DialogProps, 'id' | 'destroy'>;

export type DialogInstance = {
	readonly id: string;
	readonly destroy: () => void;
	readonly open: () => Promise<void>;
	readonly close: () => Promise<void>;
} & DialogOptions;

export interface DialogApiInjection {
	create: (options: DialogOptions) => DialogInstance;
}
