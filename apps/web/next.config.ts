import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { highlighter, highlighterOptions } from '@/lib/shiki';

const nextConfig: NextConfig = {
	// Configure `pageExtensions` to include markdown and MDX files
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	// Optionally, add any other Next.js config below
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {
		rehypePlugins: [
			[rehypeShikiFromHighlighter, highlighter, highlighterOptions],
		],
	},
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
