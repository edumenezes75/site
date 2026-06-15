import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CaseVideo from "@/components/CaseVideo";
import Reveal from "@/components/Reveal";
import TransitionLink from "@/components/TransitionLink";

const BASE = "https://edumenezes.me";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — Edu Menezes`;
  const description = project.overview;
  const url = `${BASE}/projects/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title, description, url, type: "article", siteName: "Edu Menezes" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// "2:03" -> "PT2M3S" for schema.org duration
function isoDuration(d?: string) {
  if (!d) return undefined;
  const [m, s] = d.split(":").map(Number);
  return `PT${m}M${s}S`;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const isFirst = index === 0;
  const isLast = index === projects.length - 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    url: `${BASE}/projects/${slug}`,
    creator: { "@type": "Person", name: "Edu Menezes", url: BASE },
    ...(project.year && { dateCreated: project.year }),
    ...(project.award && { award: project.award }),
    ...(project.video && {
      video: {
        "@type": "VideoObject",
        name: project.title,
        description: project.overview,
        thumbnailUrl: `${BASE}/videos/posters/${project.video.replace(/\.mp4$/, ".jpg")}`,
        contentUrl: `${BASE}/videos/${project.video}`,
        ...(project.year && { uploadDate: `${project.year}-01-01` }),
        ...(isoDuration(project.duration) && { duration: isoDuration(project.duration) }),
      },
    }),
  };

  return (
    <main className="bg-bg text-fg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative isolate h-screen w-full flex flex-col justify-between overflow-hidden">
        <CaseVideo video={project.video} hue={project.hue} title={project.title} hasFilm={project.hasFilm} />
        <div className="absolute inset-0 -z-10 bg-black/30" />

        <div className="flex items-center justify-between px-6 md:px-12 pt-20 md:pt-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/80">
          <TransitionLink href="/#index" data-cursor="link" data-cursor-label="Index" className="hover:text-gold transition-colors">
            ← Back to Index
          </TransitionLink>
          <span>No. {String(index + 1).padStart(2, "0")} / {projects.length}</span>
        </div>

        <div className="px-6 md:px-12 pb-10">
          <h1 className="font-display text-[13vw] md:text-[8vw] leading-[0.92] max-w-5xl">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/70">
            {project.year && <span>{project.year}</span>}
            {project.year && <span className="text-fg/40">·</span>}
            <span>{project.client}</span>
            <span className="text-fg/55">·</span>
            <span>{project.agency}</span>
            {project.award && <span className="text-gold">{project.award}</span>}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-fg/10 grid md:grid-cols-[160px_1fr] gap-6 md:gap-12">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">The Brief</span>
        </Reveal>
        <Reveal>
          <p className="font-display font-medium text-2xl md:text-4xl leading-tight max-w-3xl">
            {project.brief}
          </p>
        </Reveal>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-fg/10 grid md:grid-cols-[160px_1fr] gap-6 md:gap-12">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">The Idea</span>
        </Reveal>
        <Reveal>
          <p className="font-display font-medium text-2xl md:text-4xl leading-tight max-w-3xl">
            {project.idea}
          </p>
        </Reveal>
      </section>

      <section className="relative isolate h-[60vh] md:h-[80vh] w-full overflow-hidden border-t border-fg/10">
        <CaseVideo video={project.video} hue={project.hue + 20} title={`${project.title} — breakdown`} scrub />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute bottom-6 left-6 md:left-12 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/70">
          Breakdown
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-fg/10 grid md:grid-cols-[160px_1fr] gap-6 md:gap-12">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">The Result</span>
        </Reveal>
        <Reveal>
          <p className="font-display font-medium text-2xl md:text-4xl leading-tight max-w-3xl">
            {project.result}
          </p>
        </Reveal>
      </section>

      {project.credits && project.credits.length > 0 && (
        <section className="px-6 md:px-12 py-16 md:py-24 border-t border-fg/10 grid md:grid-cols-[160px_1fr] gap-6 md:gap-12">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Credits</span>
          </Reveal>
          <Reveal>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 font-mono text-xs md:text-sm text-fg/70 max-w-3xl">
              {project.credits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      <nav className="grid grid-cols-1 md:grid-cols-2 border-t border-fg/10">
        <TransitionLink
          href={`/projects/${prev.slug}`}
          data-cursor="play"
          data-cursor-label={prev.timecode}
          className="group px-6 md:px-12 py-12 md:py-16 border-b md:border-b-0 md:border-r border-fg/10 transition-colors hover:bg-fg/[0.03]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/55">
            {isFirst ? "↺ Wrap to last" : `← Previous · ${index} / ${projects.length}`}
          </span>
          <h3 className="mt-3 font-display text-3xl md:text-5xl transition-transform duration-300 group-hover:-translate-x-2">
            {prev.title}
          </h3>
        </TransitionLink>
        <TransitionLink
          href={`/projects/${next.slug}`}
          data-cursor="play"
          data-cursor-label={next.timecode}
          className="group px-6 md:px-12 py-12 md:py-16 text-right transition-colors hover:bg-fg/[0.03]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/55">
            {isLast ? "Wrap to first ↺" : `Next · ${index + 2} / ${projects.length} →`}
          </span>
          <h3 className="mt-3 font-display text-3xl md:text-5xl transition-transform duration-300 group-hover:translate-x-2">
            {next.title}
          </h3>
        </TransitionLink>
      </nav>
    </main>
  );
}
