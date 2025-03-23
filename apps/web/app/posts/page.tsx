import Link from 'next/link';
import { getAllMetadata } from '@/app/posts/utils';

const addZero = (num: number) => (num < 10 ? `0${num}` : num);

export default async function Page() {
	const allMetadata = getAllMetadata();

	return (
		<div className="flex flex-col gap-4 max-w-screen-md w-full mx-auto pt-6">
			<ul className="list bg-base-100 rounded-box">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">文章列表</li>
				{allMetadata.map((data, index) => (
					<li key={data.slug} className="list-row">
						<div className="text-4xl font-thin opacity-30 tabular-nums">
							{addZero(index + 1)}
						</div>
						<Link
							className="list-col-grow flex gap-4 items-center"
							href={`/posts/${data.slug}`}
						>
							<div className="flex-1">
								<div className="mb-0.25">{data.title}</div>
								<div className="text-xs font-semibold opacity-60">
									{data.description}
								</div>
							</div>

							<i className="i-lucide:arrow-right text-2xl"></i>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
