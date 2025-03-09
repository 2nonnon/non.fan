import Link from 'next/link';
import { getAllMetadata } from '@/app/posts/utils';

const addZero = (num: number) => (num < 10 ? `0${num}` : num);

export default async function Page() {
	const allMetadata = getAllMetadata();

	return (
		<div className="flex flex-col gap-4 max-w-screen-md mx-auto">
			<ul className="list bg-base-100 rounded-box border border-primary-content">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">文章列表</li>
				{allMetadata.map((data, index) => (
					<li key={data.slug} className="list-row">
						<div className="text-4xl font-thin opacity-30 tabular-nums">
							{addZero(index + 1)}
						</div>
						<Link className="list-col-grow" href={`/posts/${data.slug}`}>
							<div>{data.title}</div>
							<div className="text-xs uppercase font-semibold opacity-60">
								{data.description}
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
