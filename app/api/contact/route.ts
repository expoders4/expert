import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET ALL
export async function GET() {
  try {
    const data = await prisma.inquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

// CREATE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const inquiry = await prisma.inquiry.create({
      data: {
        senderName: body.senderName,
        senderEmail: body.senderEmail,
        phone: body.phone || null,
        projectType: body.projectType || null,
        subject: body.subject,
        message: body.message,
        status: 'UNREAD',
      },
    })

    return NextResponse.json({
      success: true,
      data: inquiry,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}