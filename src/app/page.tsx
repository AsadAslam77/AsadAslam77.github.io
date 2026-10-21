import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 md:px-12">
        <Hero />
      </main>
    </>
  );
}