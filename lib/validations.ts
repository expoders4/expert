import { z } from 'zod'

/* Login */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export type LoginInput =
  z.infer<typeof loginSchema>



/* Award */
export const awardSchema = z.object({
  title: z
    .string()
    .min(2, 'Award title is required')
    .max(100, 'Maximum 100 characters'),

  slug: z
    .string()
    .min(2, 'Slug is required'),

  organization: z
    .string()
    .min(2, 'Organization is required')
    .max(100, 'Maximum 100 characters'),

  year: z
    .number({
      required_error: 'Year is required',
    })
    .min(1900, 'Invalid year')
    .max(2100, 'Invalid year'),

  category: z
    .string()
    .optional()
    .or(z.literal('')),

  image: z
    .string()
    .optional()
    .or(z.literal('')),

  location: z
    .string()
    .optional()
    .or(z.literal('')),

  description: z
    .string()
    .max(500, 'Maximum 500 characters')
    .optional()
    .or(z.literal('')),

  published: z
    .boolean()
    .default(false),
})

export type AwardInput =
  z.infer<typeof awardSchema>



export const blogSchema = z.object({
  title: z
    .string()
    .min(2, 'Title is required')
    .max(200, 'Maximum 200 characters'),

  slug: z
    .string()
    .min(2, 'Slug is required'),

  excerpt: z
    .string()
    .optional()
    .or(z.literal('')),

  content: z
    .string()
    .min(20, 'Content is required'),

  thumbnail: z
    .string()
    .optional()
    .or(z.literal('')),

  coverImage: z
    .string()
    .optional()
    .or(z.literal('')),

  category: z
    .string()
    .optional()
    .or(z.literal('')),

  tags: z
    .array(z.string())
    .default([]),

  metaTitle: z
    .string()
    .optional()
    .or(z.literal('')),

  metaDescription: z
    .string()
    .optional()
    .or(z.literal('')),

  keywords: z
    .string()
    .optional()
    .or(z.literal('')),

  featured: z
    .boolean()
    .default(false),

  published: z
    .boolean()
    .default(false),

  authorId: z
    .string()
    .min(1, 'Author is required'),

  sortOrder: z
    .number()
    .optional()
    .default(0),
})

export type BlogInput =
  z.infer<typeof blogSchema>


export const projectSchema1 = z.object({
  title: z
    .string()
    .min(2, 'Project title is required')
    .max(100, 'Maximum 100 characters'),

  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must contain lowercase letters, numbers, and hyphens only'
    ),

  description: z
    .string()
    .min(10, 'Description is required')
    .max(500, 'Maximum 500 characters'),

  content: z
    .string()
    .min(20, 'Content is required'),

  coverImage: z
    .string()
    .min(1, 'Cover image is required'),

  category: z.enum([
    'ARCHITECTURE',
    'INTERIOR',
    'CULTURAL',
  ]),

  subcategory: z
    .string()
    .optional()
    .or(z.literal('')),

  client: z
    .string()
    .optional()
    .or(z.literal('')),

  location: z
    .string()
    .optional()
    .or(z.literal('')),

  area: z
    .string()
    .optional()
    .or(z.literal('')),

  year: z
    .number()
    .min(1900, 'Invalid year')
    .max(2100, 'Invalid year')
    .optional(),

  metaTitle: z
    .string()
    .max(70, 'Maximum 70 characters')
    .optional()
    .or(z.literal('')),

  metaDesc: z
    .string()
    .max(160, 'Maximum 160 characters')
    .optional()
    .or(z.literal('')),

  images: z
    .array(z.string())
    .default([]),

  published: z
    .boolean()
    .default(false),

  featured: z
    .boolean()
    .default(false),
})

export type ProjectInput1 =
  z.infer<typeof projectSchema1>




export const projectSchema = z.object({
  title: z
    .string()
    .min(2, 'Title is required'),

  slug: z
    .string()
    .min(2, 'Slug is required'),

  category: z.enum([
    'RESIDENTIAL',
    'COMMERCIAL',
    'INTERIOR',
    'HOSPITALITY',
    'URBAN',
    'LANDSCAPE',
  ]),

  status: z
    .enum([
      'CONCEPT',
      'ONGOING',
      'COMPLETED',
    ])
    .optional(),

  shortDescription: z
    .string()
    .optional(),

  description: z
    .string()
    .optional(),

  location: z
    .string()
    .optional(),

  year: z
    .number()
    .optional(),

  clientName: z
    .string()
    .optional(),

  area: z
    .string()
    .optional(),

  thumbnail: z
    .string()
    .optional(),

  coverImage: z
    .string()
    .optional(),

  gallery: z
    .array(z.string())
    .optional(),

  metaTitle: z
    .string()
    .optional(),

  metaDescription: z
    .string()
    .optional(),

  keywords: z
    .string()
    .optional(),

  featured: z.boolean(),

  published: z.boolean(),

  sortOrder: z
    .number()
    .optional(),
})

export type ProjectInput = z.infer<
  typeof projectSchema
>


export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  designation: z.string().optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
  content: z.string().min(5, 'Review is required'),
  message: z.string().optional(),
  slug: z.string().optional(),
  status: z.string().optional(),

  rating: z.number().min(1).max(5).default(5),
  sortOrder: z.number().optional(),

  featured: z.boolean().default(false),
  published: z.boolean().default(false),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>




export const contactSchema =
  z.object({

    name: z
      .string()
      .trim()
      .min(
        2,
        'Name is required'
      )
      .max(
        100,
        'Maximum 100 characters'
      ),

    email: z
      .string()
      .trim()
      .min(
        1,
        'Email is required'
      )
      .email(
        'Please enter a valid email address'
      ),

    countryCode: z.string().min(1, "Select country code"),
    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .max(15, "Phone is too long")
      .regex(/^[+\d\s\-()]+$/, "Invalid phone number"),

    subject: z
      .string()
      .min(
        1,
        'Please select project type'
      ),

    message: z
      .string()
      .trim()
      .min(
        10,
        'Message must be at least 10 characters'
      )
      .max(
        1000,
        'Maximum 1000 characters'
      ),

  })

export type ContactInput =
  z.infer<
    typeof contactSchema
  >




export const projectFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Title is required')
    .max(200, 'Maximum 200 characters'),

  slug: z
    .string()
    .min(2, 'Slug is required'),

  subCategoryId: z
    .string()
    .min(1, 'Sub-category is required'),

  shortDescription: z
    .string()
    .optional()
    .or(z.literal('')),

  description: z
    .string()
    .optional()
    .or(z.literal('')),

  location: z
    .string()
    .optional()
    .or(z.literal('')),

  year: z
    .preprocess(
      (val) =>
        val === '' ||
        val === null ||
        val === undefined
          ? undefined
          : Number(val),
      z.number().min(1900).max(2100).optional()
    ),

  clientName: z
    .string()
    .optional()
    .or(z.literal('')),

  area: z
    .string()
    .optional()
    .or(z.literal('')),

  thumbnail: z
    .string()
    .optional()
    .or(z.literal('')),

  coverImage: z
    .string()
    .optional()
    .or(z.literal('')),

  status: z
    .enum(['CONCEPT', 'ONGOING', 'COMPLETED'])
    .optional()
    .or(z.literal('')),

  featured: z
    .boolean()
    .default(false),

  published: z
    .boolean()
    .default(true),

  sortOrder: z
    .preprocess(
      (val) =>
        val === '' || val === null || val === undefined
          ? 0
          : Number(val),
      z.number().default(0)
    ),

  metaTitle: z
    .string()
    .optional()
    .or(z.literal('')),

  metaDescription: z
    .string()
    .optional()
    .or(z.literal('')),

  keywords: z
    .string()
    .optional()
    .or(z.literal('')),

  gallery: z
    .array(
      z.object({
        image: z.string(),
        title: z.string().optional().or(z.literal('')),
        description: z.string().optional().or(z.literal('')),
        sortOrder: z.number().optional(),
      })
    )
    .default([]),

  teamIds: z
    .array(z.string())
    .default([]),
})

export type ProjectFormInput = z.infer<typeof projectFormSchema>


export const featureSchema = z.object({
  title: z
    .string()
    .min(2, 'Title is required')
    .max(200, 'Maximum 200 characters'),

  slug: z
    .string()
    .min(2, 'Slug is required')
    .max(200, 'Maximum 200 characters'),

  category: z
    .string()
    .min(2, 'Category is required')
    .max(100, 'Maximum 100 characters'),

  description: z
    .string()
    .min(5, 'Description is required')
    .max(1000, 'Maximum 1000 characters'),

  published: z
    .boolean()
    .default(false),
})

export type FeatureInput = z.infer<typeof featureSchema>


