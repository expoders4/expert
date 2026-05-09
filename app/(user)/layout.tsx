import dynamic from "next/dynamic";
import Footer from "../../components/layout/footer";

const Header = dynamic(
  () => import("../../components/layout/header"),
  {
    ssr: false,
  }
);

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-[var(--header-height)]">
        {children}
      </main>

      <Footer />
    </>
  );
}