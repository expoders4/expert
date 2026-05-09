import { notFound } from "next/navigation";
import PageHero from "../../../../components/user/pageHero";
import Link from "next/link";
import prisma from "../../../../lib/prisma";

async function getProject(slug: string) {
  return prisma.project.findFirst({
    where: { slug, published: true },
    include: {
      subCategory: { include: { category: true } },
      gallery: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export default async function ProjectPage({
  params,
}: any) {

  const project = await getProject(
    params.slug
  );

  if (!project?.gallery) {
    notFound();
  }

  return (
    <>
      <main>
        <PageHero
          label="Our Work"
          title={project.title}
          titleAccent="Project"
          subtitle={project.description ?? ''}
          image={project.coverImage ?? '/images/projects-hero.jpg'}
          imageAlt={`${project.slug} recognitions`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: project.title },
          ]}

        />

        <section
          className="section-dark"
          style={{ padding: "var(--section-py) 0" }}
        >
          <div className="container-wide">
            <div className="flex gap-10">
              <div className=" flex-1">
                <div className="grid gap-4">
                  <div className="grid gap-px"
                    style={{
                      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
                      background: 'var(--color-dark4)',
                    }}>

                    {project?.gallery.map((project: any) => (
                      <Link
                        key={project.id}
                        href={`/project/${project.slug}`}
                        className="group block"
                      >
                        <div className="relative h-[500px] overflow-hidden">

                          {/* Background image */}
                          <div
                            className="
                                        absolute inset-0
                                        bg-cover bg-center
                                        transition-all duration-700
                                        scale-100 group-hover:scale-110
                                      "
                            style={{
                              backgroundImage: `url(${project.image})`,
                            }}
                          />

                          {/* Main luxury overlay */}
                          <div
                            className="
                                        absolute inset-0
                                        opacity-0 group-hover:opacity-100
                                        transition-all duration-700
                                        bg-gradient-to-t
                                        from-black via-black/40 to-transparent
                                        backdrop-blur-[2px]
                                      "
                          />

                          {/* Diagonal sweep */}
                          <div className="absolute top-0 -left-[120%] w-[60%] h-full bg-white/10 skew-x-[-25deg] group-hover:left-[160%] transition-all duration-1000" />

                          {/* Gold border animation */}
                          <div className="absolute inset-6 border border-transparent group-hover:border-[var(--color-primary)] transition-all duration-700" />

                          {/* Content */}
                          <div className="absolute inset-0 z-20 flex items-end p-10" >
                            <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                              {/* Title */}
                              <h3
                                style={{
                                  fontFamily:
                                    "var(--font-playfair)",
                                  fontSize: "1.8rem",
                                  fontWeight: 700,
                                  color:
                                    "var(--color-white)",
                                  marginBottom: ".5rem",
                                }}
                              >
                                {project.title}
                              </h3>

                              {/* description */}
                              <p
                                style={{
                                  fontSize: ".85rem",
                                  color:
                                    "rgba(255,255,255,.75)",
                                }}
                              >
                                {project.description}
                              </p>

                            </div>
                          </div>
                        </div>
                      </Link>
                      // <Reveal key={project.slug}>
                      //   <Link
                      //     href={`/project-category/${project?.slug}`}
                      //     className="group block"
                      //   >
                      //     <article
                      //       className="card-surface overflow-hidden"
                      //     >
                      //       <div
                      //         className="relative overflow-hidden"
                      //         style={{ aspectRatio: "16/10" }}
                      //       >
                      //         <Image
                      //           src={project.image}
                      //           alt={project.name}
                      //           fill
                      //           className="object-cover transition-transform duration-700 group-hover:scale-105 w-100"
                      //         />
                      //       </div>

                      //       <div className="p-8">

                      //         <p className="section-label">
                      //           {project.slug}
                      //         </p>

                      //         <h2
                      //           className="mt-3"
                      //           style={{
                      //             fontFamily:
                      //               "var(--font-playfair)",
                      //             fontSize: "1.6rem",
                      //             color:
                      //               "var(--color-white)",
                      //           }}
                      //         >
                      //           {project.name}
                      //         </h2>

                      //         <p
                      //           className="mt-4"
                      //           style={{
                      //             fontSize: ".9rem",
                      //             lineHeight: 1.8,
                      //           }}
                      //         >
                      //           {project.description}
                      //         </p>

                      //       </div>

                      //     </article>
                      //   </Link>

                      // </Reveal>
                    ))}
                  </div>
                </div>
              </div>
              <aside className="w-[280px] shrink-0 space-y-6 sticky top-20">

                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.6rem",
                      color: "var(--color-white)",
                    }}
                  >
                    {project.title}
                  </h2>

                  <p style={{ opacity: 0.7 }}>
                    {project.shortDescription}
                  </p>
                </div>

                <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                  <p><strong>Location:</strong> {project.location}</p>
                  <p><strong>Year:</strong> {project.year}</p>
                  <p><strong>Client:</strong> {project.clientName}</p>
                  <p><strong>Area:</strong> {project.area}</p>
                  <p><strong>Status:</strong> {project.status}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="section-label">
                    {project.subCategory?.category?.name}
                  </p>
                  <p style={{ opacity: 0.7 }}>
                    {project.subCategory?.name}
                  </p>
                </div>

              </aside>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}