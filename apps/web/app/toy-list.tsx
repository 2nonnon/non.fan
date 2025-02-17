import Link from 'next/link';

export default function ToyList() {
	const toys = [
		{
			name: '疑似钢琴',
			link: '/music',
		},
	] as const;

	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-stretch gap-6 my-10">
			{toys.map((item) => (
				<Link key={item.link} className="block" href={item.link}>
					<div className="card bg-base-200 text-base-content">
						<div className="card-body">
							<h2 className="card-title">{item.name}</h2>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
