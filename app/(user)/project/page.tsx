import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../../components/user/pageHero";
import { Reveal, Stagger } from "../../../components/animations";
import Image from "next/image";
import prisma from "../../../lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tougharchitects.com";

export const metadata: Metadata = {
  title: "Projects — Architecture & Interior Design Portfolio",
  description:
    "Explore TOUGH Architects' portfolio of residential, commercial, hospital, institutional, and interior design projects crafted across India.",
  keywords: [
    "architecture portfolio India",
    "architecture projects Surat",
    "residential architecture",
    "commercial architecture",
    "interior design projects",
    "institutional architecture",
    "hospital design",
    "TOUGH Architects portfolio",
  ],
  alternates: { canonical: `${siteUrl}/project` },
  openGraph: {
    title: "Projects — TOUGH Architects Portfolio",
    description:
      "Award-winning architecture and interior design projects across residential, commercial, hospitality, and cultural sectors.",
    url: `${siteUrl}/project`,
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — TOUGH Architects Portfolio",
    description: "Architecture and interior design projects across India.",
  },
};

async function getCategories() {
  return prisma.projectCategory.findMany({
    include: { subCategories: true },
    orderBy: { sortOrder: "asc" },
  });
}

export default async function ProjectsPage() {
  const categories = await getCategories();
    

return (
    <>
      <main>
        <PageHero
          label="Our Work"
          title="Project"
          titleAccent="Categories"
          subtitle="Explore our work across sectors, scales, and continents."
          image="/images/projects-hero.jpg"
          imageAlt="TOUGH Architects recognitions"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects" },
          ]}

        />

        <section
          className="section-dark"
          style={{ padding: "var(--section-py) 0" }}
        >
          <div className="container-wide">

            <Stagger className="grid md:grid-cols-2 gap-8">

              {categories.map((project: any) => (

                <Reveal key={project.slug}>

                  <Link
                    href={`/project-category/${project.slug}`}
                    className="group block"
                  >
                    <article
                      className="card-surface overflow-hidden"
                    >

                      <div
                        className="relative overflow-hidden"
                        style={{ aspectRatio: "16/10" }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 w-100"
                        />
                      </div>

                      <div className="p-8">

                        <p className="section-label">
                          {project.subtitle}
                        </p>

                        <h2
                          className="mt-3"
                          style={{
                            fontFamily:
                              "var(--font-playfair)",
                            fontSize: "1.6rem",
                            color:
                              "var(--color-white)",
                          }}
                        >
                          {project.title}
                        </h2>

                        <p
                          className="mt-4"
                          style={{
                            fontSize: ".9rem",
                            lineHeight: 1.8,
                          }}
                        >
                          {project.description}
                        </p>

                      </div>

                    </article>
                  </Link>

                </Reveal>
              ))}
            </Stagger>

          </div>
        </section>

      </main>
    </>
  );
}