import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1120px] px-6 py-24 md:px-12">
        <h1 className="font-display text-6xl font-bold tracking-tight md:text-[88px] md:leading-none">
          Muhammad Asad
        </h1>
        <p className="mt-6 text-2xl text-highlight">Full Stack Developer</p>
      </main>
    </>
  );
}