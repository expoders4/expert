import Link from "next/link";
import PageHero from "../../../../components/user/pageHero";
import { Reveal, Stagger } from "../../../../components/animations";
import Image from "next/image";

async function getCategory(
    slug: string
) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/project-categories/${slug}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}

export default async function CategoryPage({
    params,
}: any) {
    const category =
        await getCategory(
            params.categorySlug
        );

    return (
        <>
            <main>
                <PageHero
                    label="Our Work"
                    title={params.categorySlug}
                    titleAccent="Sub Categories"
                    subtitle="Explore our work across sectors, scales, and continents."
                    image="/images/projects-hero.jpg"
                    imageAlt={`${params.categorySlug} recognitions`}
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: params.categorySlug },
                    ]}

                />

                <section
                    className="section-dark"
                    style={{ padding: "var(--section-py) 0" }}
                >
                    <div className="container-wide">
                        <Stagger className="grid md:grid-cols-2 gap-8">

                            {category.map((project: any) => (

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