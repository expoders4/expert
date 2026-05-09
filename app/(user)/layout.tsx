// src/app/(user)/layout.tsx

// import Footer from "../../components/layout/footer";
// import Header from "../../components/layout/header";
export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen pt-[var(--header-height)]">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  )
}