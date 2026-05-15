import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../../../components/user/pageHero";
import prisma from "../../../../lib/prisma";
import { cache } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tougharchitects.com";


const getSubCategory = cache(async (slug: string) => {
    return prisma.projectSubCategory.findFirst({
        where: {
            slug,
        },
        include: {
            category: true,
            projects: {
                include: {
                    gallery: {
                        orderBy: {
                            sortOrder: 'asc',
                        },
                    },
                },
                orderBy: {
                    sortOrder: 'asc',
                },
            },
        },
    });
});

export async function generateMetadata({ params }: any): Promise<Metadata> {
    const items = await getSubCategory(params.categorySlug);
    
    const subCatName = items?.name ?? params.categorySlug;
    const catName = items?.category?.name ?? "Architecture";

    return {
        title: `${subCatName} — ${catName} Projects | TOUGH Architects`,
        description: `Browse TOUGH Architects' ${subCatName} projects under ${catName} — crafted with purpose and precision.`,
        alternates: { canonical: `${siteUrl}/project-sub-category/${params.categorySlug}` },
        openGraph: {
            title: `${subCatName} — TOUGH Architects`,
            description: `${subCatName} architecture projects by TOUGH Architects.`,
            url: `${siteUrl}/project-sub-category/${params.categorySlug}`,
            type: "website",
        },
    };
}

export default async function SubCategoryPage({
    params,
}: any) {

    const subCategory =
        await getSubCategory(
            params.categorySlug
        );


    return (

        <main>
            <PageHero
                label="Our Work"
                title={subCategory?.name || params.categorySlug}
                titleAccent="Sub Categories"
                subtitle={subCategory?.description || ''}
                image={subCategory?.image || "/images/projects-hero.jpg"}
                imageAlt={`${subCategory?.slug || params.categorySlug} recognitions`}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: subCategory?.slug || params.categorySlug },
                ]}

            />

            <section
                className="section-dark"
                style={{ padding: "var(--section-py) 0" }}
            >
                <div className="container-wide">
                    <div className="grid gap-4">

                        <div
                            className="grid gap-px grid-cols-1 md:grid-cols-2 auto-rows-[320px]"
                            style={{
                                background: 'var(--color-dark4)',
                            }}
                        >
                            {Array.isArray(subCategory?.projects) &&
                                subCategory.projects.map((item: any, i: number) => {
                                    const pattern = [
                                        {
                                            span: 'md:row-span-2',
                                            height: 'h-full',
                                        }, // Tall

                                        {
                                            span: 'md:row-span-1',
                                            height: 'h-full',
                                        }, // Small

                                        {
                                            span: 'md:row-span-1',
                                            height: 'h-[320px]',
                                        }, // Medium
                                    ];

                                    const {
                                        span,
                                        height,
                                    } = pattern[i % 3];
                                    return (
                                        <Link
                                            key={item.id}
                                            href={`/project/${item.slug}`}
                                            className={`group block ${span}`}
                                        >
                                            <div className={`relative ${height} overflow-hidden`}>

                                                {/* Background image */}
                                                <div
                                                    className="
                                                    absolute inset-0
                                                    bg-cover bg-center
                                                    transition-all duration-700
                                                    scale-100 group-hover:scale-110
                                                "
                                                    style={{
                                                        backgroundImage: `url(${item.coverImage})`,
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
                                                <div
                                                    className="
                                                    absolute
                                                    top-0 -left-[120%]
                                                    w-[60%] h-full
                                                    bg-white/10
                                                    skew-x-[-25deg]
                                                    group-hover:left-[160%]
                                                    transition-all
                                                    duration-1000
                                                "
                                                />

                                                {/* Gold border animation */}
                                                <div
                                                    className="
                                                    absolute inset-6
                                                    border border-transparent
                                                    group-hover:border-[var(--color-primary)]
                                                    transition-all duration-700
                                                "
                                                />

                                                {/* Content */}
                                                <div
                                                    className="
                                                    absolute inset-0
                                                    z-20
                                                    flex items-end
                                                    p-10
                                                "
                                                >
                                                    <div
                                                        className="
                                                        translate-y-10
                                                        opacity-0
                                                        group-hover:translate-y-0
                                                        group-hover:opacity-100
                                                        transition-all duration-700
                                                    "
                                                    >
                                                        {/* Meta */}
                                                        <p
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-raleway)",
                                                                fontSize: ".65rem",
                                                                fontWeight: 700,
                                                                letterSpacing: ".25em",
                                                                textTransform: "uppercase",
                                                                color:
                                                                    "var(--color-primary)",
                                                                marginBottom: ".7rem",
                                                            }}
                                                        >
                                                            {item.category} · {item.year}
                                                        </p>

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
                                                            {item.title}
                                                        </h3>

                                                        {/* Location */}
                                                        <p
                                                            style={{
                                                                fontSize: ".85rem",
                                                                color:
                                                                    "rgba(255,255,255,.75)",
                                                            }}
                                                        >
                                                            {item.location}
                                                        </p>

                                                        {/* CTA */}
                                                        <div className="flex items-center gap-3 mt-5">

                                                            <span
                                                                className="
                                                                h-[1px]
                                                                w-0
                                                                group-hover:w-10
                                                                transition-all
                                                                duration-500
                                                                delay-300
                                                            "
                                                                style={{
                                                                    background:
                                                                        "var(--color-primary)",
                                                                }}
                                                            />

                                                            <span
                                                                style={{
                                                                    fontSize: ".7rem",
                                                                    fontWeight: 700,
                                                                    letterSpacing:
                                                                        ".15em",
                                                                    textTransform:
                                                                        "uppercase",
                                                                    color:
                                                                        "var(--color-primary)",
                                                                }}
                                                            >
                                                                View Project
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}