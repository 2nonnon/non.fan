import { useHotkeys } from 'react-hotkeys-hook';
import { useRef, useState } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'flex-grow-0 flex-shrink-0 aspect-[1/4] h-auto p-0 flex-col justify-end focus-visible:ring-0',
	{
		variants: {
			variant: {
				white: 'xl:w-16 lg:w-14 w-12',
				black: 'xl:w-12 xl:-mx-6 lg:w-10 lg:-mx-5 w-8 -mx-4 relative z-10',
			},
		},
		defaultVariants: {
			variant: 'white',
		},
	},
);

interface PianoKeyProps extends VariantProps<typeof buttonVariants> {
	className?: string;
	hotkey: string;
	handler: () => void;
	name: string;
	note: string;
	freq: string;
}

export default function PianoKey({
	hotkey,
	handler,
	note,
	className,
	variant,
	freq,
}: PianoKeyProps) {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [can, setCan] = useState(true);

	function activeAnimation() {
		if (buttonRef.current && can) {
			buttonRef.current.animate(
				[
					{
						background: 'red',
					},
					{
						background: 'red',
					},
				],
				{
					duration: 300,
					easing: 'ease-in',
					iterations: 1,
				},
			);
		}
	}

	useHotkeys(
		hotkey,
		() => {
			setCan(false);
			handler();

			if (buttonRef.current && can) {
				buttonRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center',
				});
			}

			activeAnimation();
		},
		{ preventDefault: true, enabled: can },
		[hotkey],
	);
	useHotkeys(
		hotkey,
		() => {
			setCan(true);
		},
		{ preventDefault: true, keydown: false, keyup: true },
		[hotkey],
	);

	return (
		<button
			ref={buttonRef}
			type="button"
			className={cn(buttonVariants({ variant, className }))}
			onClick={() => {
				handler();
				activeAnimation();
			}}
		>
			<div className="w-full py-4 text-center">
				<div className="w-6 h-6 items-center justify-center">{hotkey}</div>

				<div>{freq}</div>
				<div>{note}</div>
			</div>
		</button>
	);
}
