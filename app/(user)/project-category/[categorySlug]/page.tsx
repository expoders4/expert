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

    console.log(categoryDetails);

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
                        <Stagger className="grid md:grid-cols-2 gap-8">

                            {subCategories.map((project: any) => (

                                <Reveal key={project.slug}>
                                    <Link
                                        href={`/project-sub-category/${project?.slug}`}
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
                                                    alt={project.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105 w-100"
                                                />
                                            </div>

                                            <div className="p-8">

                                                <p className="section-label">
                                                    {project.slug}
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
                                                    {project.name}
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