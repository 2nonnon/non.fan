import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { createHighlighterCoreSync, createJavaScriptRegexEngine } from 'shiki';
import js from '@shikijs/langs/javascript';
import ts from '@shikijs/langs/typescript';
import jsx from '@shikijs/langs/jsx';
import tsx from '@shikijs/langs/tsx';
import light from '@shikijs/themes/vitesse-light';
import dark from '@shikijs/themes/vitesse-dark';

const highlighter = createHighlighterCoreSync({
	themes: [light, dark],
	langs: [js, jsx, ts, tsx],
	engine: createJavaScriptRegexEngine(),
});

const nextConfig: NextConfig = {
	// Configure `pageExtensions` to include markdown and MDX files
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	// Optionally, add any other Next.js config below
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {
		rehypePlugins: [
			[
				rehypeShikiFromHighlighter,
				highlighter,
				{
					langs: ['ts', 'js', 'jsx', 'tsx'],
					themes: {
						dark: 'vitesse-dark',
						light: 'vitesse-light',
					},
				},
			],
		],
	},
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
