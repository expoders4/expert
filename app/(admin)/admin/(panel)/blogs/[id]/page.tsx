import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import prisma from '../../../../../../lib/prisma'

import BlogForm from '../../../../../../components/admin/component/blogForm'

export const metadata: Metadata = {
  title: 'Edit Blog Post',
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditBlogPage({
  params,
}: PageProps) {
  const blog =
    await prisma.blog.findUnique({
      where: {
        id: params.id,
      },
    })

  if (!blog) {
    notFound()
  }

  const serialized = {
    ...blog,

    id: blog.id,

    title: blog.title,

    slug: blog.slug,

    excerpt:
      blog.excerpt ?? undefined,

    content: blog.content,

    authorId:
      blog.authorId,

    coverImage:
      blog.coverImage ?? undefined,

    tags:
      Array.isArray(blog.tags)
        ? blog.tags
        : [],

    metaTitle:
      blog.metaTitle ?? undefined,

    metaDescription:
      blog.metaDescription ?? undefined,

    published:
      blog.published,
  }

  return (
    <BlogForm
      mode="edit"
      blog={serialized as any}
    />
  )
}