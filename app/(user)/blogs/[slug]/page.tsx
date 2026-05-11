import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Tag, ArrowLeft } from 'lucide-react'
import { JsonLd } from '../../../../components/seo/JsonLd'
import PageHero from '../../../../components/user/pageHero'
import prisma from '../../../../lib/prisma'
import { cache } from 'react'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tougharchitects.com'

type Props = {
  params: {
    slug: string
  }
}

function readTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))
}

const getBlog = cache(async (slug: string) => {
  return prisma.blog.findFirst({
    where: { slug, published: true },
    include: { author: true },
  })
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlog(params.slug)
  if (!blog) return { title: 'Article Not Found' }

  const description = blog.metaDescription ?? blog.excerpt ?? `${blog.title} — TOUGH Architects Journal`

  return {
    title: blog.metaTitle ?? blog.title,
    description,
    keywords: Array.isArray(blog.tags) ? (blog.tags as string[]) : [],
    alternates: { canonical: `${siteUrl}/blogs/${blog.slug}` },
    openGraph: {
      title: blog.title,
      description: blog.excerpt ?? description,
      url: `${siteUrl}/blogs/${blog.slug}`,
      type: 'article',
      publishedTime: blog.publishedAt?.toISOString(),
      authors: [blog.author.name],
      images: blog.coverImage
        ? [{ url: blog.coverImage, width: 1200, height: 630 }]
        : [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt ?? description,
      images: blog.coverImage ? [blog.coverImage] : [`${siteUrl}/og-image.jpg`],
    },
  }
}

async function getRelatedBlogs(currentSlug: string) {
  return prisma.blog.findMany({
    where: { published: true, slug: { not: currentSlug } },
    orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }],
    take: 3,
  })
}

type RelatedBlog = Awaited<ReturnType<typeof getRelatedBlogs>>[number]

export default async function BlogDetailPage({
  params,
}: Props) {

  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  const relatedBlogs = await getRelatedBlogs(params.slug)
  const tags = Array.isArray(blog.tags) ? (blog.tags as string[]) : []

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
          image={blog.coverImage ?? '/images/about-office.png'}
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
                {blog.excerpt && (
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
                      {blog.excerpt}
                    </p>
                  </div>
                )}

                {/* CONTENT */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
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
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-14">

                    <Tag
                      size={15}
                      color="var(--color-primary)"
                    />

                    {tags.map((tag) => (
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
                )}

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
                    {blog.author.name.charAt(0).toUpperCase()}
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
                      {blog.author.name}
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
                {relatedBlogs.length > 0 && (
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

                      {relatedBlogs.map((rb: RelatedBlog) => (
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
                            {readTime(rb.content)} MIN READ
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
                )}

              </aside>

            </div>

          </div>
        </section>
      </main>

    </>
  )
}
