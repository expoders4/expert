import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { slugify } from '../../../lib/utils'

// GET ALL FEATURES
export async function GET() {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: features,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch features' },
      { status: 500 }
    )
  }
}

// CREATE FEATURE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const feature = await prisma.feature.create({
      data: {
        title: body.title,
        slug: body.slug || slugify(body.title),

        description: body.description || null,
        icon: body.icon || null,
        image: body.image || null,
        category: body.category || null,

        featured: Boolean(body.featured),
        published: Boolean(body.published),

        sortOrder: Number(body.sortOrder || 0),
      },
    })

    return NextResponse.json({
      success: true,
      data: feature,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create feature' },
      { status: 500 }
    )
  }
}