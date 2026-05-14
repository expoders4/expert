import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "../../../../components/user/pageHero";
import Link from "next/link";
import prisma from "../../../../lib/prisma";
import { cache } from "react";
import ProjectGalleryLightbox from "../../../../components/user/projectGalleryLightbox";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tougharchitects.com";

const getProject = cache(async (slug: string) => {
  return prisma.project.findFirst({
    where: { slug, published: true },
    include: {
      subCategory: { include: { category: true } },
      gallery: { orderBy: { sortOrder: "asc" } },
    },
  });
});

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: "Project Not Found" };

  const description =
    project.description ??
    project.shortDescription ??
    `${project.title} — Architecture project by TOUGH Architects.`;

  return {
    title: project.metaTitle ?? project.title,
    description: project.metaDescription ?? description,
    keywords: [
      project.title,
      project.subCategory?.category?.name ?? "architecture",
      project.subCategory?.name ?? "design",
      project.location ?? "India",
      "TOUGH Architects",
      "architecture project",
    ].filter(Boolean) as string[],
    alternates: { canonical: `${siteUrl}/project/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      url: `${siteUrl}/project/${project.slug}`,
      type: "article",
      images: project.coverImage
        ? [{ url: project.coverImage, width: 1200, height: 630 }]
        : [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.coverImage ? [project.coverImage] : [`${siteUrl}/og-image.jpg`],
    },
  };
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

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

              <div className="flex-1 min-w-0">
                <div className="grid gap-4">
                    <ProjectGalleryLightbox
                      gallery={project.gallery}
                    />
                </div>
              </div>

              <aside className="w-full lg:w-[280px] shrink-0 space-y-6 lg:sticky lg:top-20">

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