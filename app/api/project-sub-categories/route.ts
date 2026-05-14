import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  const data =
    await prisma.projectSubCategory.findMany({
      orderBy: {
        sortOrder: 'asc',
      },

      select: {
        name: true,
      },
    })

  return NextResponse.json(data)
}