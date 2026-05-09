// src/app/(admin)/admin/blogs/new/page.tsx
import type { Metadata } from 'next'
import BlogForm from '../../../../../../components/admin/component/blogForm'

export const metadata: Metadata = { title: 'New Blog Post' }

export default function NewBlogPage() {
  return <BlogForm mode="create" />
}