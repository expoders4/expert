// app/(user)/awards/[slug]/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Trophy,
  Building2,
} from 'lucide-react'

import prisma from '../../../../lib/prisma'
import PageHero from '../../../../components/user/pageHero'
import { JsonLd } from '../../../../components/seo/JsonLd'
import {
  Reveal,
  Stagger,
} from '../../../../components/animations'

type Props = {
  params: {
    slug: string
  }
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://tougharchitects.com'

async function getAward(slug: string) {
  return prisma.award.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      category: true,
    },
  })
}

async function getRelatedAwards(
  currentSlug: string
) {
  return prisma.award.findMany({
    where: {
      published: true,
      slug: {
        not: currentSlug,
      },
    },
    orderBy: [
      {
        featured: 'desc',
      },
      {
        year: 'desc',
      },
    ],
    take: 3,
  })
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const award = await getAward(
    params.slug
  )

  if (!award) {
    return {
      title: 'Award Not Found',
    }
  }

  return {
    title: `${award.title} | Awards`,
    description:
      award.description ||
      award.title,
    alternates: {
      canonical: `${siteUrl}/awards/${award.slug}`,
    },
  }
}

export default async function AwardDetailPage({
  params,
}: Props) {

  const award = await getAward(
    params.slug
  )

  if (!award) {
    notFound()
  }

  const relatedAwards =
    await getRelatedAwards(
      params.slug
    )

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Award',
    name: award.title,
    description:
      award.description,
  }

  return (
    <>
      <JsonLd data={schema} />

      <main>

        <PageHero
          label="Recognition"
          title={award.title}
          titleAccent="Award"
          subtitle={
            award.organization ||
            ''
          }
          image={
            award.image ||
            '/images/about-office.png'
          }
          imageAlt={award.title}
          breadcrumbs={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'Awards',
              href: '/awards',
            },
            {
              label: award.title,
            },
          ]}
        />

        <section className="section-dark py-28">

          <div className="container-wide">

            {/* back */}
            <Reveal>
              <Link
                href="/awards"
                className="inline-flex items-center gap-2 text-white hover:text-primary mb-12"
              >
                <ArrowLeft size={18} />
                Back to Awards
              </Link>
            </Reveal>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-14">

              {/* image */}
              <Reveal className="lg:col-span-5">

                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">

                  <Image
                    src={
                      award.image ||
                      '/images/about-office.png'
                    }
                    alt={award.title}
                    fill
                    className="object-cover"
                  />

                </div>

              </Reveal>

              {/* content */}
              <Reveal className="lg:col-span-7">

                {/* meta */}
                <div className="flex flex-wrap gap-6 mb-8">

                  {award.year && (
                    <div className="flex items-center gap-2 text-primary">
                      <Calendar size={16} />
                      {award.year}
                    </div>
                  )}

                  {award.location && (
                    <div className="flex items-center gap-2 text-primary">
                      <MapPin size={16} />
                      {award.location}
                    </div>
                  )}

                </div>

                <h1 className="text-4xl md:text-5xl text-white mb-8 font-bold">
                  {award.title}
                </h1>

                <div className="space-y-5 text-white/70 leading-8">

                  <p>
                    {award.description}
                  </p>

                  <p>
                    This recognition
                    reflects our
                    commitment to
                    timeless
                    architecture,
                    sustainable
                    innovation,
                    and world-class
                    spatial design.
                  </p>

                </div>

                {/* info cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-12">

                  <div className="card-surface p-6">

                    <Trophy
                      className="text-primary mb-4"
                      size={22}
                    />

                    <p className="text-white/60 text-sm mb-2">
                      Awarded By
                    </p>

                    <p className="text-white font-semibold">
                      {award.organization}
                    </p>

                  </div>

                  <div className="card-surface p-6">

                    <Building2
                      className="text-primary mb-4"
                      size={22}
                    />

                    <p className="text-white/60 text-sm mb-2">
                      Category
                    </p>

                    <p className="text-white font-semibold">
                      {award.category?.name}
                    </p>

                  </div>

                </div>

              </Reveal>

            </div>

            {/* related */}
            {relatedAwards.length >
              0 && (

              <section className="mt-28">

                <Reveal>
                  <h2 className="text-3xl text-white mb-10">
                    More Recognition
                  </h2>
                </Reveal>

                <Stagger className="grid md:grid-cols-3 gap-8">

                  {relatedAwards.map(
                    (item) => (

                      <Link
                        key={item.id}
                        href={`/awards/${item.slug}`}
                        className="group"
                      >

                        <article className="card-surface overflow-hidden h-full">

                          <div className="relative aspect-[4/3] overflow-hidden">

                            <Image
                              src={
                                item.image ||
                                '/images/about-office.png'
                              }
                              alt={
                                item.title
                              }
                              fill
                              className="object-cover group-hover:scale-105 transition duration-700"
                            />

                          </div>

                          <div className="p-6">

                            <p className="text-primary text-sm mb-3">
                              {
                                item.year
                              }
                            </p>

                            <h3 className="text-white text-xl">
                              {
                                item.title
                              }
                            </h3>

                          </div>

                        </article>

                      </Link>

                    )
                  )}

                </Stagger>

              </section>

            )}

          </div>

        </section>

      </main>
    </>
  )
}