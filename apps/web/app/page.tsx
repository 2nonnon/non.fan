import ToyList from './toy-list';
import Layout from '@/components/layout';

export default function Home() {
	return (
		<Layout>
			<div className="flex flex-col gap-4 py-6 max-w-screen-lg mx-auto md:px-6">
				<ToyList />
			</div>
		</Layout>
	);
}
