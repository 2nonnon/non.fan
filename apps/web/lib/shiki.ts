import { createHighlighterCoreSync, createJavaScriptRegexEngine } from 'shiki';
import js from '@shikijs/langs/javascript';
import ts from '@shikijs/langs/typescript';
import jsx from '@shikijs/langs/jsx';
import tsx from '@shikijs/langs/tsx';
import light from '@shikijs/themes/vitesse-light';
import dark from '@shikijs/themes/vitesse-dark';

export const highlighter = createHighlighterCoreSync({
	themes: [light, dark],
	langs: [js, jsx, ts, tsx],
	engine: createJavaScriptRegexEngine(),
});

export const highlighterOptions = {
	langs: ['ts', 'js', 'jsx', 'tsx'],
	themes: {
		light: 'vitesse-light',
		dark: 'vitesse-dark',
	},
};
