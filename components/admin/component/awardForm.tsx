'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../../../utils/cn'
import { AwardInput, awardSchema } from '../../../lib/validations'
import { slugify } from '../../../lib/utils'

interface Props {
  award?: AwardInput & { id?: string }
  mode: 'create' | 'edit'
}

export default function AwardForm({ award, mode }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AwardInput>({
    resolver: zodResolver(awardSchema),
    defaultValues: award || { published: false, year: new Date().getFullYear() },
  })

  const watchPublished = watch('published')

  const onSubmit = async (data: AwardInput) => {
    setSaving(true)
    setServerError('')
    try {
      const url = mode === 'edit' ? `/api/awards/${award?.id}` : '/api/awards'
      const method = mode === 'edit' ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const json = await res.json()
      if (!json.success) { setServerError(json.message || 'Save failed'); return }
      router.push('/admin/awards')
      router.refresh()
    } catch { setServerError('Network error.') }
    finally { setSaving(false) }
  }
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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/awards" className="p-2 text-stone-400 hover:text-stone-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-medium text-stone-900">{mode === 'create' ? 'New Award' : 'Edit Award'}</h1>
      </div>

      {serverError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">{serverError}</div>}

      <div className="admin-card p-6 space-y-5">
        <div>
          <label className="admin-label">Award Title *</label>
          <input {...register('title')} className={cn('admin-input', errors.title && 'border-red-300')}
            onBlur={handleTitleBlur} placeholder="Best Residential Design of the Year" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="admin-label">Slug</label>
            <input
              {...register(
                'slug'
              )}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Awarding Organization *</label>
            <input {...register('organization')} className={cn('admin-input', errors.organization && 'border-red-300')} placeholder="Indian Institute of Architects" />
            {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization.message}</p>}
          </div>
          <div>
            <label className="admin-label">Year *</label>
            <input {...register('year', { valueAsNumber: true })} type="number" className={cn('admin-input', errors.year && 'border-red-300')} placeholder="2024" min="1900" max="2100" />
            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
          </div>

          <div>
            <label className="admin-label">Image URL</label>
            <input {...register('image')} className="admin-input" placeholder="/uploads/award.jpg" />
          </div>
        </div>
        <div>
          <label className="admin-label">Description</label>
          <textarea {...register('description')} rows={3} className="admin-input resize-none" placeholder="Brief description of the award..." />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={watchPublished} onChange={(e) => setValue('published', e.target.checked)} className="w-4 h-4 accent-brand-600 rounded" />
          <span className="text-sm text-stone-700">Published (visible on site)</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> <span>Saving...</span></> : <><Save className="w-4 h-4" /> <span>Save Award</span></>}
        </button>
        <Link href="/admin/awards" className="btn-outline"><span>Cancel</span></Link>
      </div>
    </form>
  )
}