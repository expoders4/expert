import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "../../../../lib/prisma";
import PageHero from "../../../../components/user/pageHero";
import { getAwardBySlug } from "../../../../lib/queries/awards";


/* ---------- Metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const award = await getAwardBySlug(params.slug);

  if (!award) {
    return { title: "Award Not Found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const pageUrl = `${siteUrl}/awards/${award.slug}`;

  const title = award.title;
  const description = award.description || "";

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
  };
}

/* ---------- Page ---------- */
export default async function AwardDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const award = await getAwardBySlug(params.slug);

  if (!award) return notFound();

  
    return (
  <main className="section-dark2">

    {/* HERO (UNCHANGED) */}
    <PageHero
      label="Award Recognition"
      title={award.title}
      titleAccent={award.organization || ""}
      subtitle={award.description || ""}
      image={award.image || "/placeholder.jpg"}
      imageAlt={award.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Awards", href: "/awards" },
        { label: award.title },
      ]}
    />

    {/* ===================== */}
    {/* NEW: AWARD META STRIP */}
    {/* ===================== */}
    <section className="py-10 border-b border-gray-800">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-black/40 p-4 rounded-lg animate-fade-up">
            <p className="text-xs text-gray-400">Year</p>
            <p className="text-white font-semibold">{award.year || "—"}</p>
          </div>

          <div className="bg-black/40 p-4 rounded-lg animate-fade-up">
            <p className="text-xs text-gray-400">Location</p>
            <p className="text-white font-semibold">{award.location || "—"}</p>
          </div>

          <div className="bg-black/40 p-4 rounded-lg animate-fade-up">
            <p className="text-xs text-gray-400">Organization</p>
            <p className="text-white font-semibold">{award.organization || "—"}</p>
          </div>

          <div className="bg-black/40 p-4 rounded-lg animate-fade-up">
            <p className="text-xs text-gray-400">Category</p>
            <p className="text-white font-semibold">
              {award.category?.name || "—"}
            </p>
          </div>

        </div>

      </div>
    </section>

    {/* ===================== */}
    {/* AWARD OVERVIEW (ENHANCED) */}
    {/* ===================== */}
    <section className="py-16">
      <div className="container mx-auto px-6">

        <div className="max-w-3xl animate-fade-up">

          <h2 className="text-2xl font-semibold text-white mb-4">
            Recognition Overview
          </h2>

          <p className="text-gray-300 leading-relaxed">
            {award.description}
          </p>

          {/* BADGE STRIP */}
          <div className="flex flex-wrap gap-3 mt-6">

            {award.featured && (
              <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                FEATURED AWARD
              </span>
            )}

            {award.year && (
              <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-full">
                {award.year}
              </span>
            )}

            {award.organization && (
              <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-full">
                {award.organization}
              </span>
            )}

            {award.category?.name && (
              <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-full">
                {award.category.name}
              </span>
            )}

          </div>

        </div>

      </div>
    </section>

    {/* ===================== */}
    {/* CATEGORY STRUCTURE */}
    {/* ===================== */}
    {award.category && (
      <section className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">

          <h2 className="text-2xl font-semibold mb-8 animate-fade-up">
            Category: {award.category.name}
          </h2>

          {award.category.subCategories?.map((sub: any, i: number) => (
            <div
              key={sub.id}
              className="mb-14 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >

              <h3 className="text-xl font-medium mb-6 text-white">
                {sub.name}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                {sub.projects?.map((project: any) => (
                  <div
                    key={project.id}
                    className="bg-black/40 p-5 rounded-xl hover:bg-black/60 transition"
                  >

                    <h4 className="text-lg font-semibold text-white">
                      {project.title}
                    </h4>

                    <p className="text-sm text-gray-400 mb-4">
                      {project.location}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {project.gallery?.map((img: any) => (
                        <div
                          key={img.id}
                          className="relative h-24 overflow-hidden rounded-md"
                        >
                          <Image
                            src={img.image}
                            alt="gallery"
                            fill
                            className="object-cover hover:scale-110 transition duration-500"
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      </section>
    )}

    {/* BACK */}
    <section className="py-12 text-center">
      <Link
        href="/awards"
        className="text-blue-400 hover:text-blue-300 transition"
      >
        ← Back to Awards
      </Link>
    </section>

    

  </main>

  );
}