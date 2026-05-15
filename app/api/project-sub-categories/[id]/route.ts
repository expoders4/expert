import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await prisma.projectSubCategory.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const data = await prisma.projectSubCategory.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.projectSubCategory.delete({
    where: { id },
  });

  return NextResponse.json({
    message: "Deleted successfully",
  });
}