'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Loader2,
  Save,
  ArrowLeft,
  Plus,
  X,
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '../../../utils/cn'
import { slugify } from '../../../lib/utils'
import {
  projectFormSchema,
  type ProjectFormInput,
} from '../../../lib/validations'

interface Props {
  project?: any
  mode: 'create' | 'edit'
}

export default function ProjectForm({ project, mode }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const selectedCategory = categories.find(
    (c) => c.id === selectedCategoryId
  )
  const subCategories: any[] = selectedCategory?.subCategories || []

  useEffect(() => {
    async function load() {
      const [cRes, tRes] = await Promise.all([
        fetch('/api/project-categories'),
        fetch('/api/team'),
      ])
      const cats = await cRes.json()
      const ts = await tRes.json()
      setCategories(Array.isArray(cats) ? cats : [])
      setTeams(Array.isArray(ts) ? ts : [])

      if (project?.subCategory?.categoryId) {
        setSelectedCategoryId(project.subCategory.categoryId)
      } else if (project?.subCategoryId && Array.isArray(cats)) {
        for (const cat of cats) {
          const found = cat.subCategories?.find(
            (s: any) => s.id === project.subCategoryId
          )
          if (found) {
            setSelectedCategoryId(cat.id)
            break
          }
        }
      }
    }
    load()
  }, [])

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project
      ? {
          title: project.title || '',
          slug: project.slug || '',
          subCategoryId: project.subCategoryId || '',
          shortDescription: project.shortDescription || '',
          description: project.description || '',
          location: project.location || '',
          year: project.year ?? undefined,
          clientName: project.clientName || '',
          area: project.area || '',
          thumbnail: project.thumbnail || '',
          coverImage: project.coverImage || '',
          status: project.status || '',
          featured: project.featured ?? false,
          published: project.published ?? true,
          sortOrder: project.sortOrder ?? 0,
          metaTitle: project.metaTitle || '',
          metaDescription: project.metaDescription || '',
          keywords: project.keywords || '',
          gallery: project.gallery || [],
          teamIds:
            project.teamMembers?.map((tm: any) => tm.teamId) || [],
        }
      : {
          title: '',
          slug: '',
          subCategoryId: '',
          shortDescription: '',
          description: '',
          location: '',
          clientName: '',
          area: '',
          thumbnail: '',
          coverImage: '',
          status: '',
          featured: false,
          published: true,
          sortOrder: 0,
          metaTitle: '',
          metaDescription: '',
          keywords: '',
          gallery: [],
          teamIds: [],
        },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'gallery',
  })

  const watchTitle = watch('title')
  const watchPublished = watch('published')
  const watchFeatured = watch('featured')

  const handleTitleBlur = () => {
    if (mode === 'create' && watchTitle) {
      setValue('slug', slugify(watchTitle))
    }
  }

  const onSubmit = async (data: ProjectFormInput) => {
    setSaving(true)
    setServerError('')
    try {
      const url =
        mode === 'edit'
          ? `/api/projects/${project?.id}`
          : '/api/projects'
      const method = mode === 'edit' ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setServerError(json.message || 'Save failed')
        return
      }
      router.push('/admin/projects')
      router.refresh()
    } catch {
      setServerError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-medium text-stone-900">
            {mode === 'create' ? 'New Project' : 'Edit Project'}
          </h1>
          <p className="text-sm text-stone-500">
            {mode === 'create'
              ? 'Add a new project to your portfolio'
              : 'Update project details'}
          </p>
        </div>
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Main column ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Project Details */}
          <div className="admin-card p-6 space-y-5">
            <h2 className="text-sm font-medium text-stone-900 border-b border-stone-100 pb-3">
              Project Details
            </h2>

            <div>
              <label className="admin-label">Title *</label>
              <input
                {...register('title')}
                onBlur={handleTitleBlur}
                className={cn('admin-input', errors.title && 'border-red-300')}
                placeholder="e.g. Serenity Private Villa"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="admin-label">Slug *</label>
              <input
                {...register('slug')}
                className={cn(
                  'admin-input font-mono text-sm',
                  errors.slug && 'border-red-300'
                )}
                placeholder="auto-generated-from-title"
              />
              <p className="text-xs text-stone-400 mt-1">
                URL: /projects/
                <span className="text-brand-600">{watch('slug') || 'slug-here'}</span>
              </p>
              {errors.slug && (
                <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <label className="admin-label">Short Description</label>
              <textarea
                {...register('shortDescription')}
                rows={2}
                className="admin-input resize-none"
                placeholder="Brief summary shown on listing pages..."
              />
            </div>

            <div>
              <label className="admin-label">Full Description</label>
              <textarea
                {...register('description')}
                rows={8}
                className="admin-input resize-y"
                placeholder="Detailed project description..."
              />
            </div>
          </div>

          {/* Gallery */}
          <div className="admin-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-medium text-stone-900">
                Gallery Images
              </h2>
              <button
                type="button"
                onClick={() =>
                  append({ image: '', title: '', sortOrder: fields.length })
                }
                className="flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Image
              </button>
            </div>

            {fields.length === 0 && (
              <p className="text-sm text-stone-400 py-4 text-center">
                No gallery images yet.
              </p>
            )}

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-3">
                  <span className="text-xs text-stone-400 w-5 shrink-0 text-right">
                    {index + 1}
                  </span>
                  <input
                    {...register(`gallery.${index}.image`)}
                    className="admin-input flex-1 text-sm"
                    placeholder="Image URL or /uploads/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1.5 text-stone-400 hover:text-red-500 transition-colors shrink-0"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="admin-card p-6 space-y-5">
            <h2 className="text-sm font-medium text-stone-900 border-b border-stone-100 pb-3">
              SEO Settings
            </h2>

            <div>
              <label className="admin-label">Meta Title</label>
              <input
                {...register('metaTitle')}
                className="admin-input"
                placeholder="SEO title (max 70 chars)"
              />
            </div>

            <div>
              <label className="admin-label">Meta Description</label>
              <textarea
                {...register('metaDescription')}
                rows={3}
                className="admin-input resize-none"
                placeholder="SEO description (max 160 chars)"
              />
            </div>

            <div>
              <label className="admin-label">Keywords</label>
              <input
                {...register('keywords')}
                className="admin-input"
                placeholder="architecture, design, interior"
              />
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">

          {/* Images */}
          <div className="admin-card p-5 space-y-4">
            <h2 className="text-sm font-medium text-stone-900">Images</h2>

            <div>
              <label className="admin-label">Thumbnail URL</label>
              <input
                {...register('thumbnail')}
                className="admin-input text-sm"
                placeholder="/uploads/thumbnail.jpg"
              />
            </div>

            <div>
              <label className="admin-label">Cover Image URL</label>
              <input
                {...register('coverImage')}
                className="admin-input text-sm"
                placeholder="/uploads/cover.jpg"
              />
            </div>
          </div>

          {/* Categorization */}
          <div className="admin-card p-5 space-y-4">
            <h2 className="text-sm font-medium text-stone-900">Categorization</h2>

            <div>
              <label className="admin-label">Category</label>
              <select
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value)
                  setValue('subCategoryId', '')
                }}
                className="admin-input"
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="admin-label">Sub-Category *</label>
              <select
                {...register('subCategoryId')}
                className={cn(
                  'admin-input',
                  errors.subCategoryId && 'border-red-300'
                )}
              >
                <option value="">Select sub-category...</option>
                {subCategories.map((sub: any) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {errors.subCategoryId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subCategoryId.message}
                </p>
              )}
            </div>

            <div>
              <label className="admin-label">Project Status</label>
              <select {...register('status')} className="admin-input">
                <option value="">No status</option>
                <option value="CONCEPT">Concept</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Project Info */}
          <div className="admin-card p-5 space-y-4">
            <h2 className="text-sm font-medium text-stone-900">Project Info</h2>

            <div>
              <label className="admin-label">Client Name</label>
              <input
                {...register('clientName')}
                className="admin-input"
                placeholder="Client name"
              />
            </div>

            <div>
              <label className="admin-label">Location</label>
              <input
                {...register('location')}
                className="admin-input"
                placeholder="City, Country"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="admin-label">Year</label>
                <input
                  {...register('year')}
                  type="number"
                  className="admin-input"
                  placeholder="2025"
                  min="1900"
                  max="2100"
                />
              </div>
              <div>
                <label className="admin-label">Area</label>
                <input
                  {...register('area')}
                  className="admin-input"
                  placeholder="4200 sq ft"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Sort Order</label>
              <input
                {...register('sortOrder')}
                type="number"
                className="admin-input"
                placeholder="0"
              />
            </div>

            <div className="pt-1 space-y-2.5 border-t border-stone-100">
              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={watchPublished}
                  onChange={(e) => setValue('published', e.target.checked)}
                  className="w-4 h-4 accent-brand-600 rounded"
                />
                <span className="text-sm text-stone-700">
                  Published (visible on site)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={watchFeatured}
                  onChange={(e) => setValue('featured', e.target.checked)}
                  className="w-4 h-4 accent-brand-600 rounded"
                />
                <span className="text-sm text-stone-700">Featured project</span>
              </label>
            </div>
          </div>

          {/* Team Members */}
          {teams.length > 0 && (
            <div className="admin-card p-5 space-y-3">
              <h2 className="text-sm font-medium text-stone-900">
                Team Members
              </h2>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {teams.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      {...register('teamIds')}
                      className="w-4 h-4 accent-brand-600 rounded"
                    />
                    <span className="text-sm text-stone-700">{item.name}</span>
                    {item.designation && (
                      <span className="text-xs text-stone-400">
                        — {item.designation}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Project</span>
            </>
          )}
        </button>
        <Link href="/admin/projects" className="btn-outline">
          <span>Cancel</span>
        </Link>
      </div>
    </form>
  )
}
