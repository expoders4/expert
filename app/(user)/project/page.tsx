import Link from "next/link";
import PageHero from "../../../components/user/pageHero";
import { Reveal, Stagger } from "../../../components/animations";
import Image from "next/image";
import prisma from "../../../lib/prisma";

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