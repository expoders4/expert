import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.inquiry.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Delete failed' },
      { status: 500 }
    )
  }
}

// UPDATE STATUS ONLY
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    const updated = await prisma.inquiry.update({
      where: { id: params.id },
      data: {
        status: body.status, // UNREAD | READ | REPLIED | ARCHIVED
      },
    })

    return NextResponse.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Status update failed' },
      { status: 500 }
    )
  }
}