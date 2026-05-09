import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

interface Props {
  params: {
    id: string
  }
}

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  try {
    const blog =
      await prisma.blog.findUnique({
        where: {
          id: params.id,
        },

        include: {
          author: true,
        },
      })

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blog not found',
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json({
      success: true,
      data: blog,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed',
      },
      {
        status: 500,
      }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Props
) {
  try {
    const body = await req.json()

    const blog =
      await prisma.blog.update({
        where: {
          id: params.id,
        },

        data: {
          ...body,

          publishedAt:
            body.published
              ? new Date()
              : null,
        },
      })

    return NextResponse.json({
      success: true,
      data: blog,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Update failed',
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  try {
    await prisma.blog.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Delete failed',
      },
      {
        status: 500,
      }
    )
  }
}