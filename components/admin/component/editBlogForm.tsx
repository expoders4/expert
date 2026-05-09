import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogForm from './blogForm'

export const metadata: Metadata = { title: 'Edit Blog Post' }

interface PageProps { params: { id: string } }

/* Static blog data */
const blogs = [
  {
    id: '1',

    title:
      'Modern Architecture Trends',

    slug:
      'modern-architecture-trends',

    excerpt:
      'Latest architecture trends for 2026.',

    content:
      '<p>Blog content here...</p>',

    author:
      'John Smith',

    coverImage:
      '/uploads/blog-1.jpg',

    tags: [
      'architecture',
      'design',
      'modern',
    ],

    metaTitle:
      'Modern Architecture Trends',

    metaDesc:
      'Explore latest architecture trends.',

    published:
      true,
  },

  {
    id: '2',

    title:
      'Luxury Interior Design',

    slug:
      'luxury-interior-design',

    excerpt:
      'Premium interior design ideas.',

    content:
      '<p>Interior blog content...</p>',

    author:
      'Emma Wilson',

    coverImage:
      '/uploads/blog-2.jpg',

    tags: [
      'interior',
      'luxury',
    ],

    metaTitle:
      null,

    metaDesc:
      null,

    published:
      false,
  },

  {
    id: '3',

    title:
      'Sustainable Building Materials',

    slug:
      'sustainable-building-materials',

    excerpt:
      'Eco-friendly construction materials.',

    content:
      '<p>Sustainability blog...</p>',

    author:
      'Michael Brown',

    coverImage:
      '/uploads/blog-3.jpg',

    tags: [
      'green',
      'construction',
    ],

    metaTitle:
      'Sustainable Materials',

    metaDesc:
      'Best eco materials.',

    published:
      true,
  },
]

export default async function EditBlogPage({ params }: PageProps) {
  const blog = blogs.find(
    item => item.id === params.id
  )


  if (!blog) {
    notFound()
  }


  const serialized = {
    ...blog,

    id:
      blog.id,

    slug:
      blog.slug,

    metaTitle:
      blog.metaTitle ?? undefined,

    metaDesc:
      blog.metaDesc ?? undefined,
  }


  return <BlogForm mode="edit" blog={serialized as any} />
}