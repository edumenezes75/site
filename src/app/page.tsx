import Hero from "@/components/Hero";
import ProjectIndex from "@/components/ProjectIndex";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-bg text-fg">
      <Hero />
      <ProjectIndex />
      <Awards />
      <Footer />
    </main>
  );
}
