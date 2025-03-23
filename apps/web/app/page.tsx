import Link from 'next/link';
import Layout from '@/components/layout';

const apps = [
	{
		title: '疑似钢琴',
		description: '120 键，从 C0 到 B9（科学音高记号法）。',
		link: '/piano',
	},
	{
		title: '二维码生成器',
		description: '简单的二维码生成器，配置项未放出。',
		link: '/qrcode',
	},
	{
		title: '分享',
		description:
			'P2P 文件、文本分享，基于 WebRTC，目前不太好用。You can try 1 try.',
		link: '/share',
	},
	{
		title: '聊天',
		description: '和 Gemini2.0 聊天，不保存历史会话。',
		link: '/chat',
	},
] as const;

const addZero = (num: number) => (num < 10 ? `0${num}` : num);

export default function Page() {
	return (
		<Layout>
			<div className="flex flex-col gap-4 max-w-screen-md w-full mx-auto pt-6">
				<ul className="list bg-base-100 rounded-box">
					<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
						应用列表
					</li>
					{apps.map((app, index) => (
						<li key={app.link} className="list-row">
							<div className="text-4xl font-thin opacity-30 tabular-nums">
								{addZero(index + 1)}
							</div>
							<Link
								className="list-col-grow flex gap-4 items-center"
								href={app.link}
							>
								<div className="flex-1">
									<div className="mb-0.25">{app.title}</div>
									<div className="text-xs font-semibold opacity-60">
										{app.description}
									</div>
								</div>

								<i className="i-lucide:arrow-right text-2xl"></i>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</Layout>
	);
}
