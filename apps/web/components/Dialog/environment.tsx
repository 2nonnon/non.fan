import { useRef } from 'react';
import { cn } from '@/lib/utils';
import type { DialogProps } from './type';
import { sleep } from '@/utils/sleep';

export function DialogEnvironment(props: DialogProps) {
	const {
		title,
		className,
		closable = true,
		content,
		positiveText,
		negativeText,
		onPositiveClick,
		onNegativeClick,
		onClose,
		action,
		destroy,
	} = props;

	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const close = async () => {
		const res = await onClose?.();
		if (typeof res === 'boolean' && !res) return;
		dialogRef.current?.close();
		await sleep();
		destroy();
	};

	return (
		<dialog ref={dialogRef} id={props.id} className="modal">
			<div className={cn('modal-box !p-5', className)}>
				{closable && (
					<button
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
						type="button"
						onClick={close}
					>
						✕
					</button>
				)}

				{title && <h3 className="font-bold text-lg mb-4">{title}</h3>}

				{typeof content === 'function' ? (
					content()
				) : (
					<p className="px-4">{content}</p>
				)}

				{action ? (
					action({ close })
				) : (
					<div className="modal-action !mt-4">
						{negativeText && (
							<button
								className="btn"
								type="button"
								onClick={async (e) => {
									const res = await onNegativeClick?.(e as any);
									if (typeof res === 'boolean' && !res) return;
									close();
								}}
							>
								{negativeText}
							</button>
						)}

						{positiveText && (
							<button
								className="btn btn-primary"
								type="button"
								onClick={async (e) => {
									const res = await onPositiveClick?.(e as any);
									if (typeof res === 'boolean' && !res) return;
									close();
								}}
							>
								{positiveText}
							</button>
						)}
					</div>
				)}
			</div>

			<div className="modal-backdrop">
				<button type="button" onClick={close}>
					close
				</button>
			</div>
		</dialog>
	);
}
