import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  const data =
    await prisma.projectSubCategory.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        categoryId: true,
      },
    })

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json();

  const data = await prisma.projectSubCategory.create({
    data: {
      categoryId: body.categoryId,
      name: body.name,
      slug: body.slug,
      description: body.description,
      image: body.image,
      sortOrder: body.sortOrder || 0,
    },
  });

  return NextResponse.json(data);
}