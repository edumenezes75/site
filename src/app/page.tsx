import Hero from "@/components/Hero";
import Agencies from "@/components/Agencies";
import ProjectIndex from "@/components/ProjectIndex";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";

const BASE = "https://edumenezes.me";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Edu Menezes",
  url: BASE,
  jobTitle: "Motion Director",
  description:
    "Motion designer and director for award-winning campaigns — Adidas, Budweiser, Vivo, Itaú, UNESCO. 8x Cannes Lions.",
  email: "mailto:edumenezes75@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/edumenezesmotion/",
    "https://vimeo.com/edumenezes",
  ],
  knowsAbout: ["Motion Design", "Film Direction", "Editing", "Advertising"],
};

export default function Home() {
  return (
    <main className="bg-bg text-fg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Hero />
      <Agencies />
      <ProjectIndex />
      <Awards />
      <Footer />
    </main>
  );
}
