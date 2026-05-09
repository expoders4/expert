'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Loader2,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  X,
  Plus,
} from 'lucide-react'

import Link from 'next/link'

import { slugify } from '../../../lib/utils'
import {
  BlogInput,
  blogSchema,
} from '../../../lib/validations'

import { cn } from '../../../utils/cn'
import { toast } from 'sonner'

interface Props {
  blog?: BlogInput & {
    id?: string
    slug?: string
  }

  mode: 'create' | 'edit'
}

export default function BlogForm({
  blog,
  mode,
}: Props) {
  const router = useRouter()

  const [saving, setSaving] =
    useState(false)

  const [
    serverError,
    setServerError,
  ] = useState('')

  const [tagInput, setTagInput] =
    useState('')

  const [tags, setTags] =
    useState<string[]>(
      (blog?.tags as string[]) || []
    )

  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors },
  } = useForm<BlogInput>({
    resolver:
      zodResolver(blogSchema),

    defaultValues: {
      title: blog?.title ?? '',
      slug: blog?.slug ?? '',
      excerpt: blog?.excerpt ?? '',
      content: blog?.content ?? '',
      metaTitle: blog?.metaTitle ?? '',
      metaDescription: blog?.metaDescription ?? '',
      coverImage: blog?.coverImage ?? '',
      authorId: blog?.authorId ?? '',
      published: blog?.published ?? false,
      tags: Array.isArray(blog?.tags) ? blog.tags : [],
    }
  })

  const watchPublished =
    watch('published')

  const watchTitle =
    watch('title')

  const handleTitleBlur =
    () => {
      if (
        mode === 'create' &&
        watchTitle
      ) {
        setValue(
          'slug',
          slugify(watchTitle)
        )
      }
    }

  const addTag = () => {
    const tag = tagInput
      .trim()
      .toLowerCase()

    if (
      tag &&
      !tags.includes(tag)
    ) {
      const newTags = [
        ...tags,
        tag,
      ]

      setTags(newTags)

      setValue(
        'tags',
        newTags
      )
    }

    setTagInput('')
  }

  const removeTag = (
    tag: string
  ) => {
    const newTags =
      tags.filter(
        (item) =>
          item !== tag
      )

    setTags(newTags)

    setValue(
      'tags',
      newTags
    )
  }

  const onSubmit = async (
    data: BlogInput
  ) => {
    setSaving(true)

    setServerError('')
    const loadingToast = toast.loading(
      mode === 'edit' ? 'Updating blog...' : 'Creating blog...'
    )
    try {
      const url =
        mode === 'edit'
          ? `/api/blogs/${blog?.id}`
          : '/api/blogs'

      const method =
        mode === 'edit'
          ? 'PUT'
          : 'POST'

      const res =
        await fetch(url, {
          method,

          headers: {
            'Content-Type':
              'application/json',
          },

          body:
            JSON.stringify({
              ...data,
              tags,
            }),
        })

      const json =
        await res.json()

      if (!json.success) {
        toast.error(json.message || 'Save failed', {
          id: loadingToast,
        })
        setServerError(
          json.message ||
          'Save failed'
        )

        return
      }

      toast.success(
        mode === 'edit'
          ? 'Blog updated successfully'
          : 'Blog created successfully',
        {
          id: loadingToast,
        }
      )

      router.push(
        '/admin/blogs'
      )

      router.refresh()
    } catch {
      toast.error('Network error. Please try again.', {
        id: loadingToast,
      })
      setServerError(
        'Network error.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <h1 className="text-xl font-medium text-stone-900">
            {mode ===
              'create'
              ? 'New Blog Post'
              : 'Edit Blog Post'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setValue(
                'published',
                !watchPublished
              )
            }
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all',

              watchPublished
                ? 'border-green-300 bg-green-50 text-green-700'
                : 'border-stone-200 text-stone-600'
            )}
          >
            {watchPublished ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}

            {watchPublished
              ? 'Published'
              : 'Draft'}
          </button>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}

            <span>{saving
              ? 'Saving...'
              : 'Save Post'}</span>
          </button>
        </div>
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="admin-card p-6 space-y-5">
            <div>
              <label className="admin-label">
                Title *
              </label>

              <input
                {...register(
                  'title'
                )}
                onBlur={
                  handleTitleBlur
                }
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">
                Slug
              </label>

              <input
                {...register(
                  'slug'
                )}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">
                Excerpt
              </label>

              <textarea
                {...register(
                  'excerpt'
                )}
                rows={2}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">
                Content
              </label>

              <textarea
                {...register(
                  'content'
                )}
                rows={14}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-card p-6 space-y-4">
            <div>
              <label className="admin-label">
                Meta Title
              </label>

              <input
                {...register(
                  'metaTitle'
                )}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">
                Meta
                Description
              </label>

              <textarea
                {...register(
                  'metaDescription'
                )}
                rows={2}
                className="admin-input"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="admin-card p-5 space-y-4">
            <div>
              <label className="admin-label">
                Author ID *
              </label>

              <input
                {...register(
                  'authorId'
                )}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">
                Cover Image
              </label>

              <input
                {...register(
                  'coverImage'
                )}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(
                (tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1.5 rounded-full"
                  >
                    {tag}

                    <button
                      type="button"
                      onClick={() =>
                        removeTag(
                          tag
                        )
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )
              )}
            </div>

            <div className="flex gap-2">
              <input
                value={
                  tagInput
                }
                onChange={(
                  e
                ) =>
                  setTagInput(
                    e.target
                      .value
                  )
                }
                className="admin-input flex-1"
              />

              <button
                type="button"
                onClick={
                  addTag
                }
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}