import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../../../components/user/pageHero";
import { Reveal, Stagger } from "../../../../components/animations";
import Image from "next/image";
import prisma from "../../../../lib/prisma";
import { cache } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tougharchitects.com";

const getCategory = cache(async (slug: string) => {
    const subCategories = await prisma.projectSubCategory.findMany({
        where: {
            category: {
                slug,
            },
        },
        include: {
            category: true,
        },
        orderBy: {
            sortOrder: 'asc',
        },
    });

    // If subcategories exist
    if (subCategories.length > 0) {
        return {
            type: 'subcategory',
            data: subCategories,
        };
    }

    // Otherwise return category
    const category = await prisma.projectCategory.findUnique({
        where: {
            slug,
        },
    });

    return {
        type: 'category' as const,
        data: category ? [category] : [],
    };
});

export async function generateMetadata({ params }: any): Promise<Metadata> {
    // const items = await getCategory(params.categorySlug);
    // const categoryName = items[0]?.category?.name ?? params.categorySlug;
    const result = await getCategory(
        params.categorySlug
    );

    const categoryName =
        result.type === 'subcategory'
            ? result.data[0]?.category?.name
            : result.data[0]?.name;

    return {
        title: `${categoryName} Architecture Projects — TOUGH Architects`,
        description: `Explore TOUGH Architects' ${categoryName} projects — thoughtfully designed spaces across India.`,
        alternates: { canonical: `${siteUrl}/project-category/${params.categorySlug}` },
        openGraph: {
            title: `${categoryName} — TOUGH Architects`,
            description: `${categoryName} architecture and design projects by TOUGH Architects.`,
            url: `${siteUrl}/project-category/${params.categorySlug}`,
            type: "website",
        },
    };
}

export default async function CategoryPage({
    params,
}: any) {
    const categorySlugs = await getCategory(
        params.categorySlug
    );

    const categoryDetails =
        categorySlugs.type === 'subcategory'
            ? categorySlugs.data[0]?.category
            : categorySlugs.data[0];

    const subCategories =
        categorySlugs.type === 'subcategory'
            ? categorySlugs.data
            : [];


    return (
        <>
            <main>
                <PageHero
                    label="Our Work"
                    title={categoryDetails?.name || ''}
                    titleAccent="Sub Categories"
                    subtitle={categoryDetails?.description || ''}
                    image={categoryDetails?.image || ''}
                    imageAlt={`${categoryDetails?.slug} recognitions`}
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: categoryDetails?.name || '' },
                    ]}

                />

                <section
                    className="section-dark"
                    style={{ padding: "var(--section-py) 0" }}
                >
                    <div className="container-wide">
                        <Stagger className="grid md:grid-cols-3 gap-8">

                            {subCategories.map((project: any) => (

                                <Reveal key={project.slug}>
                                    <Link
                                        href={`/project-sub-category/${project.slug}`}
                                        className="group block h-full"
                                    >
                                        <article
                                            className="card-surface overflow-hidden h-full flex flex-col"
                                        >

                                            {/* image */}
                                            <div
                                                className="relative overflow-hidden flex-shrink-0"
                                                style={{ aspectRatio: "16/10" }}
                                            >
                                                <Image
                                                    src={project.image}
                                                    alt={project.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* content */}
                                            <div className="py-5 px-6 flex flex-col flex-1">

                                                <h2
                                                    className="mt-2"
                                                    style={{
                                                        fontFamily: "var(--font-playfair)",
                                                        fontSize: "1.45rem",
                                                        color: "var(--color-white)",
                                                    }}
                                                >
                                                    {project.name}
                                                </h2>

                                                {/* fixed height text */}
                                                <p
                                                    className="mt-4 flex-1 line-clamp-4"
                                                    style={{
                                                        fontSize: ".9rem",
                                                        lineHeight: 1.8,
                                                    }}
                                                >
                                                    {project.description}
                                                </p>

                                                {/* always bottom */}
                                                <div className="mt-6 flex items-center gap-3 text-primary uppercase text-xs tracking-[.2em]">

                                                    Explore

                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        className="group-hover:translate-x-1 transition"
                                                    >
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>

                                                </div>

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