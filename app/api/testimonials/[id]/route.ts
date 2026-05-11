import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

// GET BY ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: 'Testimonial not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: testimonial,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch testimonial',
      },
      { status: 500 }
    )
  }
}

// UPDATE
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        name: body.name,
        role: body.designation || body.role || null,
        company: body.company || null,
        content: body.content,
        rating: Number(body.rating || 5),
        avatar: body.avatar || null,
        featured: Boolean(body.featured),
        published: Boolean(body.published),
        sortOrder: Number(body.sortOrder || 0),
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
        message: 'Failed to update testimonial',
      },
      { status: 500 }
    )
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.testimonial.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete testimonial',
      },
      { status: 500 }
    )
  }
}