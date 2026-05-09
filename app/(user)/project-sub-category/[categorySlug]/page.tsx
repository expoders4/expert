import Link from "next/link";
import PageHero from "../../../../components/user/pageHero";

async function getSubCategory(
    slug: string
) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/project-sub-categories/${slug}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}

export default async function SubCategoryPage({
    params,
}: any) {
    
    const category =
        await getSubCategory(
            params.categorySlug
        );

    return (

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
                    <div
                        className="grid gap-px"
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
                            background: "var(--color-dark4)",
                        }}
                    >
                        {Array.isArray(category) &&
                            category.map((item: any) => {
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/project/${item.slug}`}
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
            </section>
        </main>
    );
}