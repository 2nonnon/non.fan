import Header from "./header";
import Main from "./main";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <Main>{children}</Main>
    </div>
  );
}
