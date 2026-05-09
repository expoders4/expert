import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'


export function cn(
  ...inputs: ClassValue[]
) {
  return twMerge(
    clsx(inputs)
  )
}


export function slugify(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
}


export function formatDate(
  date: Date | string
) {

  const value =
    new Date(date)

  return value.toLocaleDateString(
    'en-US',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  )
}

export const PROJECT_CATEGORIES = {
  ARCHITECTURE: {
    label: 'Architecture',
    subcategories: [
      {
        value: 'RESIDENTIAL',
        label: 'Residential',
      },
      {
        value: 'COMMERCIAL',
        label: 'Commercial',
      },
      {
        value: 'HOSPITALITY',
        label: 'Hospitality',
      },
    ],
  },

  INTERIOR: {
    label: 'Interior',
    subcategories: [
      {
        value: 'HOME_INTERIOR',
        label: 'Home Interior',
      },
      {
        value: 'OFFICE_INTERIOR',
        label: 'Office Interior',
      },
      {
        value: 'RETAIL_INTERIOR',
        label: 'Retail Interior',
      },
    ],
  },

  CULTURAL: {
    label: 'Cultural',
    subcategories: [
      {
        value: 'MUSEUM',
        label: 'Museum',
      },
      {
        value: 'AUDITORIUM',
        label: 'Auditorium',
      },
      {
        value: 'PUBLIC_SPACE',
        label: 'Public Space',
      },
    ],
  },
} as const