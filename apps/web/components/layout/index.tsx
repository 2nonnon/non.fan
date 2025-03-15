import Header from './header';
import Main from './main';
import Footer from './footer';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-col">
			<Header />

			<Main>{children}</Main>

			<Footer />
		</div>
	);
}
