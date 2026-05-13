import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { JsonLd } from '../../../../components/seo/JsonLd'
import PageHero from '../../../../components/user/pageHero'
import prisma from '../../../../lib/prisma'
import BlogDetailContent from '../../../../components/blogDetailContent'

export const dynamic = 'force-dynamic'


type Props = {
  params: {
    slug: string
  }
}

function getReadTime(content: string): number {
  return Math.max(
    1,
    Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)
  )
}

const getBlog = cache(async (slug: string) => {
  return prisma.blog.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      author: true,
    },
  })
})

async function getRelatedBlogs(currentSlug: string) {
  return prisma.blog.findMany({
    where: {
      published: true,
      slug: {
        not: currentSlug,
      },
    },
    orderBy: [
      { featured: 'desc' },
      { sortOrder: 'asc' },
    ],
    take: 3,
  })
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const blog = await getBlog(params.slug)

  if (!blog) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: blog.metaTitle || blog.title,
    description:
      blog.metaDescription ||
      blog.excerpt ||
      blog.title,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`,
    },
  }
}

export default async function BlogDetailPage({
  params,
}: Props) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  const relatedBlogs = await getRelatedBlogs(
    params.slug
  )

  const tags = Array.isArray(blog.tags)
    ? (blog.tags as string[])
    : []

  const readTime = getReadTime(
    blog.content || ''
  )

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
  }

  return (
    <>
      <JsonLd data={articleSchema} />

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
        <BlogDetailContent
          blog={blog}
          tags={tags}
          readTime={readTime}
          relatedBlogs={relatedBlogs}
        />
        
      </main>
    </>
  )
}