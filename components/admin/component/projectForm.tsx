// 'use client'

// import { useState, useCallback } from 'react'
// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { projectSchema, type ProjectInput } from '../../../lib/validations'
// import { PROJECT_CATEGORIES, slugify, cn } from '../../../lib/utils'
// import { Upload, Loader2, Save, ArrowLeft, Eye, EyeOff, Star } from 'lucide-react'
// import Link from 'next/link'

// interface Props {
//   project?: ProjectInput & { id?: string; slug?: string }
//   mode:     'create' | 'edit'
// }

// export default function ProjectForm({ project, mode }: Props) {
//   const router = useRouter()
//   const [saving,       setSaving]       = useState(false)
//   const [uploadingImg, setUploadingImg] = useState(false)
//   const [serverError,  setServerError]  = useState('')
//   const [previewUrl,   setPreviewUrl]   = useState(project?.coverImage || '')

//   const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProjectInput>({
//     resolver:      zodResolver(projectSchema),
//     defaultValues: project || { published: false, featured: false, images: [], category: 'ARCHITECTURE' },
//   })

//   const watchCategory = watch('category')
//   const watchTitle    = watch('title')
//   const watchPublished = watch('published')
//   const watchFeatured  = watch('featured')

//   // Auto-generate slug from title (create mode only)
//   const handleTitleBlur = () => {
//     if (mode === 'create' && watchTitle) {
//       setValue('slug', slugify(watchTitle))
//     }
//   }

//   const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     const formData = new FormData()
//     formData.append('file', file)

//     setUploadingImg(true)
//     try {
//       const res  = await fetch('/api/uploads', { method: 'POST', body: formData })
//       const data = await res.json()
//       if (data.success) {
//         setValue('coverImage', data.data.url)
//         setPreviewUrl(data.data.url)
//       }
//     } catch {
//       alert('Image upload failed')
//     } finally {
//       setUploadingImg(false)
//     }
//   }, [setValue])

//   const onSubmit = async (data: ProjectInput) => {
//     setSaving(true)
//     setServerError('')
//     try {
//       const url    = mode === 'edit' ? `/api/projects/${project?.id}` : '/api/projects'
//       const method = mode === 'edit' ? 'PUT' : 'POST'
//       const res    = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify(data),
//       })
//       const json = await res.json()
//       if (!json.success) { setServerError(json.message || 'Save failed'); return }
//       router.push('/admin/projects')
//       router.refresh()
//     } catch {
//       setServerError('Network error. Please try again.')
//     } finally {
//       setSaving(false)
//     }
//   }

//   const subcategories =
//     watchCategory ? PROJECT_CATEGORIES[watchCategory as keyof typeof PROJECT_CATEGORIES]?.subcategories || [] : []

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Link href="/admin/projects" className="p-2 text-stone-400 hover:text-stone-700 transition-colors">
//             <ArrowLeft className="w-5 h-5" />
//           </Link>
//           <div>
//             <h1 className="text-xl font-medium text-stone-900">
//               {mode === 'create' ? 'New Project' : 'Edit Project'}
//             </h1>
//             <p className="text-sm text-stone-500">
//               {mode === 'create' ? 'Add a new project to your portfolio' : 'Update project details'}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => setValue('published', !watchPublished)}
//             className={cn(
//               'flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all',
//               watchPublished ? 'border-green-300 bg-green-50 text-green-700' : 'border-stone-200 text-stone-600 hover:border-stone-300'
//             )}
//           >
//             {watchPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//             {watchPublished ? 'Published' : 'Draft'}
//           </button>
//           <button
//             type="button"
//             onClick={() => setValue('featured', !watchFeatured)}
//             className={cn(
//               'flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all',
//               watchFeatured ? 'border-brand-300 bg-brand-50 text-brand-700' : 'border-stone-200 text-stone-600 hover:border-stone-300'
//             )}
//           >
//             <Star className={cn('w-4 h-4', watchFeatured && 'fill-brand-500')} />
//             {watchFeatured ? 'Featured' : 'Feature?'}
//           </button>
//           <button type="submit" disabled={saving}
//                   className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50">
//             {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//             {saving ? 'Saving...' : 'Save Project'}
//           </button>
//         </div>
//       </div>

//       {serverError && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">
//           {serverError}
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main fields */}
//         <div className="lg:col-span-2 space-y-5">
//           <div className="admin-card p-6 space-y-5">
//             <h2 className="text-sm font-medium text-stone-900 border-b border-stone-100 pb-3">Project Details</h2>

//             <div>
//               <label className="admin-label">Title *</label>
//               <input {...register('title')} onBlur={handleTitleBlur} className={cn('admin-input', errors.title && 'border-red-300')} placeholder="e.g. Serenity Private Bungalow" />
//               {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
//             </div>

//             <div>
//               <label className="admin-label">Slug</label>
//               <input {...register('slug')} className={cn('admin-input font-mono text-sm', errors.slug && 'border-red-300')} placeholder="auto-generated-from-title" />
//               <p className="text-xs text-stone-400 mt-1">URL: /projects/<span className="text-brand-600">{watch('slug') || 'slug-here'}</span></p>
//             </div>

//             <div>
//               <label className="admin-label">Short Description *</label>
//               <textarea {...register('description')} rows={2} className={cn('admin-input resize-none', errors.description && 'border-red-300')} placeholder="Brief description for listings (max 500 chars)" />
//               {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
//             </div>

//             <div>
//               <label className="admin-label">Full Content *</label>
//               <textarea {...register('content')} rows={10} className={cn('admin-input resize-y font-mono text-sm', errors.content && 'border-red-300')}
//                         placeholder="Full project description (HTML supported)..." />
//               {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
//             </div>
//           </div>

//           {/* SEO */}
//           <div className="admin-card p-6 space-y-5">
//             <h2 className="text-sm font-medium text-stone-900 border-b border-stone-100 pb-3">SEO Settings</h2>
//             <div>
//               <label className="admin-label">Meta Title <span className="text-stone-400 font-normal">(max 70 chars)</span></label>
//               <input {...register('metaTitle')} className="admin-input" placeholder="Defaults to project title" />
//             </div>
//             <div>
//               <label className="admin-label">Meta Description <span className="text-stone-400 font-normal">(max 160 chars)</span></label>
//               <textarea {...register('metaDesc')} rows={2} className="admin-input resize-none" placeholder="Defaults to short description" />
//             </div>
//           </div>
//         </div>

//         {/* Sidebar fields */}
//         <div className="space-y-5">
//           {/* Cover image */}
//           <div className="admin-card p-5">
//             <h2 className="text-sm font-medium text-stone-900 mb-4">Cover Image *</h2>
//             {previewUrl ? (
//               <div className="relative aspect-video bg-stone-100 mb-3 overflow-hidden rounded">
//                 <img src={previewUrl} alt="Cover preview" className="w-full h-full object-cover" />
//               </div>
//             ) : (
//               <div className="aspect-video bg-stone-50 border-2 border-dashed border-stone-200 rounded flex items-center justify-center mb-3">
//                 <div className="text-center text-stone-400">
//                   <Upload className="w-8 h-8 mx-auto mb-2" />
//                   <p className="text-xs">Upload image</p>
//                 </div>
//               </div>
//             )}
//             <label className="block">
//               <span className={cn('btn-outline text-xs px-4 py-2 cursor-pointer w-full text-center block', uploadingImg && 'opacity-50 pointer-events-none')}>
//                 {uploadingImg ? 'Uploading...' : 'Choose Image'}
//               </span>
//               <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImg} />
//             </label>
//             <input {...register('coverImage')} className="admin-input text-xs mt-2" placeholder="Or paste image URL" onChange={(e) => setPreviewUrl(e.target.value)} />
//             {errors.coverImage && <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>}
//           </div>

//           {/* Category */}
//           <div className="admin-card p-5 space-y-4">
//             <h2 className="text-sm font-medium text-stone-900">Categorization</h2>
//             <div>
//               <label className="admin-label">Category *</label>
//               <select {...register('category')} className="admin-input" onChange={() => setValue('subcategory', '')}>
//                 <option value="ARCHITECTURE">Architecture</option>
//                 <option value="INTERIOR">Interior</option>
//                 <option value="CULTURAL">Cultural Complex</option>
//               </select>
//             </div>
//             {subcategories.length > 0 && (
//               <div>
//                 <label className="admin-label">Subcategory</label>
//                 <select {...register('subcategory')} className="admin-input">
//                   <option value="">Select subcategory...</option>
//                   {subcategories.map((s: { value: string; label: string }) => (
//                     <option key={s.value} value={s.value}>{s.label}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* Project info */}
//           <div className="admin-card p-5 space-y-4">
//             <h2 className="text-sm font-medium text-stone-900">Project Info</h2>
//             <div>
//               <label className="admin-label">Client</label>
//               <input {...register('client')} className="admin-input" placeholder="Client name" />
//             </div>
//             <div>
//               <label className="admin-label">Location</label>
//               <input {...register('location')} className="admin-input" placeholder="City, State" />
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="admin-label">Year</label>
//                 <input {...register('year', { valueAsNumber: true })} type="number" className="admin-input" placeholder="2024" min="1900" max="2100" />
//               </div>
//               <div>
//                 <label className="admin-label">Area</label>
//                 <input {...register('area')} className="admin-input" placeholder="4200 sq ft" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   )
// }



'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { projectSchema, type ProjectInput } from '../../../lib/validations'
import { slugify, cn } from '../../../lib/utils'

import {
  Upload,
  Loader2,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Star,
} from 'lucide-react'

import Link from 'next/link'

interface Props {
  project?: ProjectInput & {
    id?: string
    slug?: string
  }
  mode: 'create' | 'edit'
}

export default function ProjectForm({
  project,
  mode,
}: Props) {
  const router = useRouter()

  const [saving, setSaving] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [serverError, setServerError] = useState('')
  const [previewUrl, setPreviewUrl] = useState(
    project?.coverImage || ''
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),

    defaultValues:
      project || {
        published: false,
        featured: false,
        gallery: [],
        category: 'RESIDENTIAL',
      },
  })

  const watchTitle = watch('title')
  const watchPublished = watch('published')
  const watchFeatured = watch('featured')

  // Auto slug generate
  const handleTitleBlur = () => {
    if (mode === 'create' && watchTitle) {
      setValue('slug', slugify(watchTitle))
    }
  }

  // Image upload
  const handleImageUpload = useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0]

      if (!file) return

      const formData = new FormData()
      formData.append('file', file)

      setUploadingImg(true)

      try {
        const res = await fetch('/api/uploads', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()

        if (data.success) {
          setValue('coverImage', data.data.url)
          setPreviewUrl(data.data.url)
        }
      } catch {
        alert('Image upload failed')
      } finally {
        setUploadingImg(false)
      }
    },
    [setValue]
  )

  // Submit
  const onSubmit = async (data: ProjectInput) => {
    setSaving(true)
    setServerError('')

    try {
      const url =
        mode === 'edit'
          ? `/api/projects/${project?.id}`
          : '/api/projects'

      const method =
        mode === 'edit' ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setServerError(
          json.message || 'Save failed'
        )
        return
      }

      router.push('/admin/projects')
      router.refresh()
    } catch {
      setServerError(
        'Network error. Please try again.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <h1 className="text-xl font-medium text-stone-900">
              {mode === 'create'
                ? 'New Project'
                : 'Edit Project'}
            </h1>

            <p className="text-sm text-stone-500">
              {mode === 'create'
                ? 'Add a new project to your portfolio'
                : 'Update project details'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Publish */}
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
                : 'border-stone-200 text-stone-600 hover:border-stone-300'
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

          {/* Featured */}
          <button
            type="button"
            onClick={() =>
              setValue(
                'featured',
                !watchFeatured
              )
            }
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all',
              watchFeatured
                ? 'border-brand-300 bg-brand-50 text-brand-700'
                : 'border-stone-200 text-stone-600 hover:border-stone-300'
            )}
          >
            <Star
              className={cn(
                'w-4 h-4',
                watchFeatured &&
                  'fill-brand-500'
              )}
            />

            {watchFeatured
              ? 'Featured'
              : 'Feature?'}
          </button>

          {/* Save */}
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
              : 'Save Project'}</span>
          </button>
        </div>
      </div>

      {/* Error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="admin-card p-6 space-y-5">
            <h2 className="text-sm font-medium text-stone-900 border-b border-stone-100 pb-3">
              Project Details
            </h2>

            {/* Title */}
            <div>
              <label className="admin-label">
                Title *
              </label>

              <input
                {...register('title')}
                onBlur={handleTitleBlur}
                className={cn(
                  'admin-input',
                  errors.title &&
                    'border-red-300'
                )}
                placeholder="e.g. Serenity Private Bungalow"
              />

              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="admin-label">
                Slug
              </label>

              <input
                {...register('slug')}
                className={cn(
                  'admin-input font-mono text-sm',
                  errors.slug &&
                    'border-red-300'
                )}
                placeholder="auto-generated-from-title"
              />

              <p className="text-xs text-stone-400 mt-1">
                URL: /projects/
                <span className="text-brand-600">
                  {watch('slug') ||
                    'slug-here'}
                </span>
              </p>
            </div>

            {/* Short Description */}
            <div>
              <label className="admin-label">
                Short Description
              </label>

              <textarea
                {...register(
                  'shortDescription'
                )}
                rows={3}
                className={cn(
                  'admin-input resize-none',
                  errors.shortDescription &&
                    'border-red-300'
                )}
                placeholder="Short description..."
              />

              {errors.shortDescription && (
                <p className="text-red-500 text-xs mt-1">
                  {
                    errors.shortDescription
                      .message
                  }
                </p>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label className="admin-label">
                Full Description
              </label>

              <textarea
                {...register('description')}
                rows={10}
                className={cn(
                  'admin-input resize-y',
                  errors.description &&
                    'border-red-300'
                )}
                placeholder="Full project description..."
              />

              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {
                    errors.description
                      .message
                  }
                </p>
              )}
            </div>
          </div>

          {/* SEO */}
          <div className="admin-card p-6 space-y-5">
            <h2 className="text-sm font-medium text-stone-900 border-b border-stone-100 pb-3">
              SEO Settings
            </h2>

            <div>
              <label className="admin-label">
                Meta Title
              </label>

              <input
                {...register('metaTitle')}
                className="admin-input"
                placeholder="SEO title"
              />
            </div>

            <div>
              <label className="admin-label">
                Meta Description
              </label>

              <textarea
                {...register(
                  'metaDescription'
                )}
                rows={3}
                className="admin-input resize-none"
                placeholder="SEO description"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Cover Image */}
          <div className="admin-card p-5">
            <h2 className="text-sm font-medium text-stone-900 mb-4">
              Cover Image
            </h2>

            {previewUrl ? (
              <div className="relative aspect-video bg-stone-100 mb-3 overflow-hidden rounded">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-stone-50 border-2 border-dashed border-stone-200 rounded flex items-center justify-center mb-3">
                <div className="text-center text-stone-400">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs">
                    Upload image
                  </p>
                </div>
              </div>
            )}

            <label className="block">
              <span
                className={cn(
                  'btn-outline text-xs px-4 py-2 cursor-pointer w-full text-center block',
                  uploadingImg &&
                    'opacity-50 pointer-events-none'
                )}
              >
                <span>{uploadingImg
                  ? 'Uploading...'
                  : 'Choose Image'}</span>
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploadingImg}
              />
            </label>

            <input
              {...register('coverImage')}
              className="admin-input text-xs mt-2"
              placeholder="Or paste image URL"
              onChange={(e) =>
                setPreviewUrl(
                  e.target.value
                )
              }
            />
          </div>

          {/* Category */}
          <div className="admin-card p-5 space-y-4">
            <h2 className="text-sm font-medium text-stone-900">
              Categorization
            </h2>

            <div>
              <label className="admin-label">
                Category
              </label>

              <select
                {...register('category')}
                className="admin-input"
              >
                <option value="RESIDENTIAL">
                  Residential
                </option>

                <option value="COMMERCIAL">
                  Commercial
                </option>

                <option value="INTERIOR">
                  Interior
                </option>

                <option value="HOSPITALITY">
                  Hospitality
                </option>

                <option value="URBAN">
                  Urban
                </option>

                <option value="LANDSCAPE">
                  Landscape
                </option>
              </select>
            </div>

            <div>
              <label className="admin-label">
                Status
              </label>

              <select
                {...register('status')}
                className="admin-input"
              >
                <option value="">
                  Select status
                </option>

                <option value="CONCEPT">
                  Concept
                </option>

                <option value="ONGOING">
                  Ongoing
                </option>

                <option value="COMPLETED">
                  Completed
                </option>
              </select>
            </div>
          </div>

          {/* Project Info */}
          <div className="admin-card p-5 space-y-4">
            <h2 className="text-sm font-medium text-stone-900">
              Project Info
            </h2>

            <div>
              <label className="admin-label">
                Client
              </label>

              <input
                {...register('clientName')}
                className="admin-input"
                placeholder="Client name"
              />
            </div>

            <div>
              <label className="admin-label">
                Location
              </label>

              <input
                {...register('location')}
                className="admin-input"
                placeholder="City, State"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="admin-label">
                  Year
                </label>

                <input
                  {...register('year', {
                    valueAsNumber: true,
                  })}
                  type="number"
                  className="admin-input"
                  placeholder="2025"
                />
              </div>

              <div>
                <label className="admin-label">
                  Area
                </label>

                <input
                  {...register('area')}
                  className="admin-input"
                  placeholder="4200 sq ft"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}