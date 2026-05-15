export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {

  const data =
    await prisma.projectCategory.findMany({
      include: {
        subCategories: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

  return NextResponse.json(
    data
  );
}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await prisma.projectCategory.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        image: body.image,
        sortOrder: body.sortOrder || 0,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}