'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { slugify } from '../../../lib/utils'
import { z } from 'zod'
import { useState } from 'react'

/* Validation */
const featureSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(5, 'Description is required'),
  published: z.boolean().default(false),
})

type FeatureInput = z.infer<typeof featureSchema>

export default function FeatureForm({
  mode,
  feature,
}: any) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FeatureInput>({
    resolver: zodResolver(featureSchema),
    defaultValues: feature || {
      published: false,
    },
  })

  const watchTitle = watch('title')
  const watchPublished = watch('published')

  /* Auto slug */
  const handleTitleBlur = () => {
    if (mode === 'create' && watchTitle) {
      setValue('slug', slugify(watchTitle))
    }
  }

  /* Submit */
  const onSubmit = async (data: FeatureInput) => {
    setSaving(true)

    const url =
      mode === 'edit'
        ? `/api/feature/${feature.id}`
        : '/api/feature'

    const method = mode === 'edit' ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    router.push('/admin/features')
    router.refresh()

    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/features" className="p-2 text-stone-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div>
            <h1 className="text-xl font-medium text-stone-900">
              {mode === 'create'
                ? 'New Feature'
                : 'Edit Feature'}
            </h1>

            <p className="text-sm text-stone-500">
              {mode === 'create'
                ? 'Add a new feature to your portfolio'
                : 'Update feature details'}
            </p>
          </div>
      </div>

      {/* Form */}
      <div className="admin-card p-6 space-y-4">

        {/* Title */}
        <div>
          <label className="admin-label">Title</label>
          <input
            {...register('title')}
            onBlur={handleTitleBlur}
            className="admin-input"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="admin-label">Slug</label>
          <input {...register('slug')} className="admin-input" />
        </div>

        {/* Category */}
        <div>
          <label className="admin-label">Category</label>
          <input {...register('category')} className="admin-input" />
        </div>

        {/* Description */}
        <div>
          <label className="admin-label">Description</label>
          <textarea {...register('description')} className="admin-input" />
        </div>

        {/* Published */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('published')}
          />
          Published
        </label>

      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={saving}
        className="btn-primary"
      >
        <span>
            {saving
          ? 'Saving...'
          : mode === 'edit'
          ? 'Update Feature'
          : 'Create Feature'}
        </span>
      </button>

    </form>
  )
}