import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { slugify } from '../../../../lib/utils'

// GET BY ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const feature = await prisma.feature.findUnique({
      where: { id: params.id },
    })

    if (!feature) {
      return NextResponse.json(
        { success: false, message: 'Feature not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: feature,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch feature' },
      { status: 500 }
    )
  }
}

// UPDATE FEATURE
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    const feature = await prisma.feature.update({
      where: { id: params.id },
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
      { success: false, message: 'Failed to update feature' },
      { status: 500 }
    )
  }
}

// DELETE FEATURE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.feature.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Feature deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete feature' },
      { status: 500 }
    )
  }
}