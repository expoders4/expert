import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    const awards = await prisma.award.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: awards,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch awards',
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const award = await prisma.award.create({
      data: {
        title: body.title,
        slug: body.slug,

        organization: body.organization || null,
        description: body.description || null,

        year: body.year ? Number(body.year) : null,
        location: body.location || null,

        image: body.image || null,

        featured: Boolean(body.featured),
        published: Boolean(body.published),

        sortOrder: Number(body.sortOrder || 0),
      },
    })

    return NextResponse.json({
      success: true,
      data: award,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create award',
      },
      { status: 500 }
    )
  }
}