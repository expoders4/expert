import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { slugify } from '../../../lib/utils'

// GET ALL TESTIMONIALS
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: testimonials,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch testimonials',
      },
      { status: 500 }
    )
  }
}

// CREATE TESTIMONIAL
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        role: body.designation || null,
        company: body.company || null,
        content: body.content,
        rating: Number(body.rating || 5),
        avatar: body.avatar || null,
        featured: Boolean(body.featured),
        published: Boolean(body.published),
        sortOrder: Number(body.sortOrder || 0),
        slug: body.slug || slugify(body.name) + '-' + Date.now(),
        status: body.status || 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      data: testimonial,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create testimonial',
      },
      { status: 500 }
    )
  }
}