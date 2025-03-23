import Header from './header';
import Main from './main';
import Footer from './footer';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-dvh flex-col">
			<Header />

			<Main>{children}</Main>

			<Footer />
		</div>
	);
}
