import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Hero />
          <Statement />
        </Container>
        <Work />
        <Container>
          <Services />
          <Process />
        </Container>
      </main>
    </>
  );
}