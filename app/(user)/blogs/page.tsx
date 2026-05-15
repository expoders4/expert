import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import PageHero from '../../../components/user/pageHero';
import { Reveal } from '../../../components/animations';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://tougharchitects.com';


export const metadata: Metadata = {
  title: 'Architecture Journal — Insights, Ideas & Stories',
  description:
    'Design insights, architectural stories, sustainability thinking, luxury interiors, and project journeys from TOUGH Architects.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'TOUGH Architects Journal',
    description:
      'Architecture insights, ideas, process and design stories.',
    url: `${siteUrl}/blog`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-blog.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'TOUGH Architects Journal',
  url: `${siteUrl}/blog`,
};

async function getBlogs() {
  return prisma.blog.findMany({
    where: { published: true },
    orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
    include: { author: true },
  });
}

export default async function BlogPage() {
  const blogs = await getBlogs();
 
  const featured = blogs.find((b:any) => b.featured) ?? blogs[0] ?? null;
  const posts = blogs.filter((b:any) => b.id !== featured?.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main>

        {/* HERO */}
        <PageHero
          label="Journal"
          title="Ideas That"
          titleAccent="Shape Architecture"
          subtitle="Stories, insights, process, philosophy, and design thinking from our studio."
          image="/images/banner/blog.png"
          imageAlt="TOUGH Architects Journal"
          breadcrumbs={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'Journal',
            },
          ]}
        />


        {/* FEATURED */}
        {featured && (
          <section
            className="section-dark2"
            style={{
              padding: 'var(--section-py) 0',
            }}
          >
            <div className="container-wide">

              <Reveal>
                <span className="section-label">
                  Featured Story
                </span>
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-10 mt-8 items-center">

                <Reveal>
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: '4/3',
                    }}
                  >
                    <Image
                      src={featured.coverImage ?? '/images/about-office.png'}
                      alt={featured.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Reveal>


                <Reveal delay={0.2}>
                  <div>

                    <p
                      style={{
                        color:
                          'var(--color-primary)',
                        fontSize:
                          '.7rem',
                        letterSpacing:
                          '.15em',
                      }}
                    >
                      {featured.category ?? 'Featured'}
                    </p>

                    <h2
                      className="section-heading mt-4"
                    >
                      {featured.title}
                    </h2>

                    <p
                      className="mt-5"
                      style={{
                        fontSize:
                          '.9rem',
                      }}
                    >
                      {featured.excerpt}
                    </p>

                    <div className="mt-8">
                      <Link
                        href={`/blogs/${featured.slug}`}
                        className="btn-primary"
                      >
                        <span>Read Article</span>
                      </Link>
                    </div>

                  </div>
                </Reveal>

              </div>
            </div>
          </section>
        )}

        {/* ARTICLES */}
        <section
          className="section-dark"
          style={{
            padding: 'var(--section-py) 0',
          }}
        >
          <div className="container-wide">

            <Reveal>
              <div className="text-center mb-14">
                <span className="section-label justify-center">
                  Latest Articles
                </span>

                <h2 className="section-heading">
                  Studio <span>
                    Journal
                  </span>
                </h2>

                <span className="gold-divider mx-auto" />
              </div>
            </Reveal>



            <div
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-px"

            >
              {posts.map((post:any) => (

                <article
                  key={post.slug}
                  style={{
                    background:
                      'var(--color-dark3)',
                    overflow:
                      'hidden',
                  }}
                >

                  <div
                    className="relative"
                    style={{
                      aspectRatio:
                        '4/3',
                    }}
                  >
                    <Image
                      src={post.coverImage ?? '/images/about-office.png'}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>


                  <div className="p-6">

                    <p
                      style={{
                        color:
                          'var(--color-primary)',
                        fontSize:
                          '.7rem',
                        letterSpacing:
                          '.15em',
                      }}
                    >
                      {post.category}
                    </p>

                    <h3
                      className="mt-3"
                      style={{
                        fontFamily:
                          'var(--font-playfair)',
                        fontSize:
                          '1.1rem',
                        color:
                          'white',
                      }}
                    >
                      {post.title}
                    </h3>

                    <div className="mt-6">
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="btn-outline"
                      >
                        <span>Read More</span>
                      </Link>
                    </div>

                  </div>

                </article>
              ))}
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
