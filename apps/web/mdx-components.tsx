import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		pre: ({ children, className, ...props }) => {
			return (
				<div className="relative">
					<pre {...props}>{children}</pre>
				</div>
			);
		},
		...components,
	};
}
