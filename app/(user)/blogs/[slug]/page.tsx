// src/app/blogs/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Tag, ArrowLeft } from 'lucide-react'
import { JsonLd } from '../../../../components/seo/JsonLd'
import PageHero from '../../../../components/user/pageHero'

type Props = {
  params: {
    slug: string
  }
}

const blogs = [
  {
    id: '1',
    slug: 'future-sustainable-luxury',

    title: 'The Future of Sustainable Luxury',

    excerpt:
      'How environmental responsibility is reshaping the language of luxury architecture for the next generation.',

    content: `
      <p>
        Luxury architecture is no longer defined
        solely by scale, exclusivity, or material richness.
        Today, true luxury is measured by longevity,
        sustainability, and environmental intelligence.
      </p>

      <p>
        Passive cooling strategies, high-performance
        building envelopes, solar orientation,
        water harvesting, and locally sourced materials
        are becoming essential foundations
        of contemporary premium design.
      </p>

      <p>
        At TOUGH Architects, sustainability is not
        treated as an addition—it is embedded
        into the architectural DNA of every project.
      </p>
    `,

    coverImage: '/images/blogs/sustainable-luxury.jpg',
    author: 'TOUGH Architects',
    authorImage: '',
    tags: ['sustainability', 'luxury', 'future'],
    publishedAt: new Date('2025-04-10'),
    updatedAt: new Date('2025-04-10'),
    readTime: 5,
  },

  {
    id: '2',
    slug: 'material-honesty',

    title: 'Material Honesty In Contemporary Architecture',

    excerpt:
      'Why timeless architecture begins with authentic materials that age with dignity.',

    content: `
      <p>
        Materials carry memory.
        Stone, timber, concrete, brass,
        and steel evolve over time,
        revealing character rather than decay.
      </p>

      <p>
        Honest architecture embraces the natural
        imperfections of materials, allowing texture,
        patina, and craftsmanship to become
        part of the design narrative.
      </p>

      <p>
        When materials are chosen with integrity,
        buildings develop emotional depth
        and remain relevant across generations.
      </p>
    `,

    coverImage: '/images/blogs/material-honesty.jpg',
    author: 'TOUGH Architects',
    authorImage: '',
    tags: ['materials', 'craftsmanship', 'design'],
    publishedAt: new Date('2025-03-20'),
    updatedAt: new Date('2025-03-20'),
    readTime: 4,
  },

  {
    id: '3',
    slug: 'natural-light',

    title: 'How Natural Light Shapes Human Emotion',

    excerpt:
      'Exploring the emotional and spatial power of daylight in architecture.',

    content: `
      <p>
        Light is one of architecture’s most
        powerful building materials.
        It shapes perception, mood, rhythm,
        and the experience of space.
      </p>

      <p>
        Carefully positioned openings,
        skylights, courtyards, and filtered
        facades allow daylight to become
        an active design element.
      </p>

      <p>
        Great spaces do not simply receive light—
        they choreograph it.
      </p>
    `,

    coverImage: '/images/blogs/natural-light.jpg',
    author: 'TOUGH Architects',
    authorImage: '',
    tags: ['light', 'interiors', 'wellness'],
    publishedAt: new Date('2025-02-15'),
    updatedAt: new Date('2025-02-15'),
    readTime: 6,
  },

  {
    id: '4',
    slug: 'building-for-100-years',

    title: 'Building For One Hundred Years',

    excerpt:
      'Architecture designed not for trends, but for generations.',

    content: `
      <p>
        Timeless architecture is created
        through proportion, restraint,
        craftsmanship, and contextual sensitivity.
      </p>

      <p>
        Buildings designed for longevity
        prioritize flexibility, adaptability,
        structural integrity, and enduring materials.
      </p>

      <p>
        The greatest buildings are not temporary
        statements—they become cultural legacy.
      </p>
    `,

    coverImage: '/images/blogs/100-years.jpg',
    author: 'TOUGH Architects',
    authorImage: '',
    tags: ['legacy', 'timeless', 'process'],
    publishedAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    readTime: 5,
  },

  {
    id: '5',
    slug: 'residential-spaces',

    title: 'Residential Spaces That Breathe',

    excerpt:
      'Designing homes that connect people with nature, light, and calm.',

    content: `
      <p>
        Exceptional homes are not simply
        built for occupation—they are
        designed for emotional wellbeing.
      </p>

      <p>
        Cross ventilation, framed views,
        courtyards, natural materials,
        and layered lighting create homes
        that feel alive and restorative.
      </p>

      <p>
        Residential architecture succeeds
        when it supports both daily ritual
        and lifelong memory.
      </p>
    `,

    coverImage: '/images/projects/residential.jpg',
    author: 'TOUGH Architects',
    authorImage: '',
    tags: ['residential', 'wellbeing', 'living'],
    publishedAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
    readTime: 4,
  },

  {
    id: '6',
    slug: 'beyond-form',

    title: 'Architecture Beyond Form',

    excerpt:
      'When architecture becomes philosophy, memory, and human experience.',

    content: `
      <p>
        Architecture is not only about
        walls, roofs, and geometry.
        It is about how people feel,
        move, connect, and remember.
      </p>

      <p>
        The most meaningful buildings
        create emotional resonance,
        cultural identity, and spatial poetry.
      </p>

      <p>
        Beyond form lies purpose—
        and purpose is what transforms
        construction into architecture.
      </p>
    `,

    coverImage: '/images/blogs/philosophy.jpg',
    author: 'TOUGH Architects',
    authorImage: '',
    tags: ['philosophy', 'emotion', 'design'],
    publishedAt: new Date('2024-11-18'),
    updatedAt: new Date('2024-11-18'),
    readTime: 7,
  },
]


export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}


export default async function BlogDetailPage({
  params,
}: Props) {

  // FIXED HERE ONLY
  const blog = blogs.find(
    (item) => item.slug === params.slug
  )

  if (!blog) {
    notFound()
  }

  const relatedBlogs = blogs
    .filter(
      (item) =>
        item.slug !== params.slug
    )
    .slice(0, 3)


  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
  }


  return (
    <>
      <JsonLd data={articleSchema} />

      {/* Hero */}

      <main>
        <PageHero
          label="Blogs"
          title={blog.title}
          titleAccent="Shape Architecture"
          subtitle={''}
          image={blog.coverImage}
          imageAlt="TOUGH Architects Blogs"
          breadcrumbs={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'Blogs',
            },
          ]}
        />
        <section
          className="section-dark"
          style={{
            padding: "7rem 0",
          }}
        >
          <div className="container-wide">

            <div className="grid lg:grid-cols-[1fr_340px] gap-16">

              {/* ARTICLE */}
              <article className="max-w-4xl">

                {/* Excerpt */}
                <div
                  className="mb-14"
                  style={{
                    borderLeft:
                      "3px solid var(--color-primary)",
                    paddingLeft: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.2rem",
                      lineHeight: "1.9",
                      fontStyle: "italic",
                      color:
                        "var(--color-muted)",
                      fontFamily:
                        "var(--font-playfair)",
                    }}
                  >
                    {blog?.excerpt}
                  </p>
                </div>

                {/* CONTENT */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog?.content,
                  }}
                  style={{
                    fontSize: ".95rem",
                    lineHeight: "2",
                    color:
                      "var(--color-muted)",
                  }}
                  className="space-y-8"
                />

                {/* Divider */}
                <div
                  className="my-14"
                  style={{
                    height: "1px",
                    background:
                      "var(--color-dark4)",
                  }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-14">

                  <Tag
                    size={15}
                    color="var(--color-primary)"
                  />

                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2"
                      style={{
                        fontSize: ".72rem",
                        background:
                          "var(--color-dark3)",
                        textTransform:
                          "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}

                </div>

                {/* Author */}
                <div
                  className="card-surface p-8 flex gap-6 items-center"
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      background:
                        "var(--color-primary)",
                      color:
                        "var(--color-dark)",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      fontFamily:
                        "var(--font-playfair)",
                    }}
                  >
                    T
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily:
                          "var(--font-playfair)",
                        fontSize: "1.5rem",
                        color: "white",
                      }}
                    >
                      TOUGH Architects
                    </h3>

                    <p
                      className="mt-2"
                      style={{
                        fontSize: ".9rem",
                      }}
                    >
                      ArchStudio Design Team
                    </p>
                  </div>
                </div>

                {/* Back */}
                <div className="mt-14">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-3"
                    style={{
                      color:
                        "var(--color-primary)",
                      fontSize: ".9rem",
                    }}
                  >
                    <ArrowLeft size={16} />
                    Back to all posts
                  </Link>
                </div>

              </article>

              {/* SIDEBAR */}
              <aside className="space-y-10">

                {/* Share */}
                <div className="card-surface p-8">

                  <h3
                    style={{
                      fontFamily:
                        "var(--font-playfair)",
                      fontSize: "1.4rem",
                      color: "white",
                    }}
                  >
                    Share
                  </h3>

                  <div className="space-y-3 mt-6">

                    {["Twitter", "LinkedIn", "WhatsApp"]
                      .map((item) => (
                        <button
                          key={item}
                          className="w-full py-3"
                          style={{
                            border:
                              "1px solid var(--color-dark4)",
                          }}
                        >
                          {item}
                        </button>
                      ))}

                  </div>

                </div>


                {/* Related */}
                <div className="card-surface p-8">

                  <h3
                    style={{
                      fontFamily:
                        "var(--font-playfair)",
                      fontSize: "1.4rem",
                      color: "white",
                    }}
                  >
                    Related Posts
                  </h3>

                  <div className="space-y-6 mt-8">

                    {relatedBlogs.map((rb) => (
                      <Link
                        key={rb.id}
                        href={`/blogs/${rb.slug}`}
                        className="block"
                      >
                        <p
                          style={{
                            color:
                              "var(--color-primary)",
                            fontSize: ".7rem",
                            letterSpacing: ".12em",
                          }}
                        >
                          {rb.readTime} MIN READ
                        </p>

                        <h4
                          className="mt-2"
                          style={{
                            color: "white",
                            fontFamily:
                              "var(--font-playfair)",
                            fontSize: "1rem",
                          }}
                        >
                          {rb.title}
                        </h4>
                      </Link>
                    ))}

                  </div>

                </div>

              </aside>

            </div>

          </div>
        </section>
      </main>

    </>
  )
}