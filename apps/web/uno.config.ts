import { defineConfig, presetIcons } from 'unocss';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

export default defineConfig({
	presets: [
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
			collections: {
				cus: FileSystemIconLoader('./public/icons', (svg) =>
					svg.replace(/(fill=")(.+?)(")/, '$1currentColor$3'),
				),
			},
		}),
	],
});
