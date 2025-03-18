import Link from 'next/link';
import Layout from '@/components/layout';

const apps = [
	{
		title: '疑似钢琴',
		description: '疑似钢琴',
		link: '/piano',
	},
	{
		title: '二维码生成器',
		description: '二维码生成器',
		link: '/qrcode',
	},
	{
		title: '分享',
		description: '分享',
		link: '/share',
	},
	{
		title: '聊天',
		description: '聊天',
		link: '/chat',
	},
] as const;

const addZero = (num: number) => (num < 10 ? `0${num}` : num);

export default function Page() {
	return (
		<Layout>
			<div className="flex flex-col gap-4 max-w-screen-md w-full mx-auto">
				<ul className="list bg-base-100 rounded-box border border-primary-content">
					<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
						应用列表
					</li>
					{apps.map((app, index) => (
						<li key={app.link} className="list-row">
							<div className="text-4xl font-thin opacity-30 tabular-nums">
								{addZero(index + 1)}
							</div>
							<Link className="list-col-grow" href={app.link}>
								<div>{app.title}</div>
								<div className="text-xs uppercase font-semibold opacity-60">
									{app.description}
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</Layout>
	);
}
