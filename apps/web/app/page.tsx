import Link from 'next/link';
import Layout from '@/components/layout';

export default function Page() {
	const toys = [
		{
			name: '疑似钢琴',
			link: '/piano',
		},
	] as const;

	return (
		<Layout>
			<div className="flex flex-col gap-4 max-w-screen-lg mx-auto">
				<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4">
					{toys.map((item) => (
						<Link
							key={item.link}
							className="grid place-items-center aspect-square bg-base-300 text-base-content rounded-4xl"
							href={item.link}
						>
							<div>
								<h2>{item.name}</h2>
							</div>
						</Link>
					))}
				</div>
			</div>
		</Layout>
	);
}
