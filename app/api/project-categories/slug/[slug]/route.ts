import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      slug: string;
    }>;
  }
) {

  try {

    const {
      slug,
    } = await params;

    const subCategories =
      await prisma.projectSubCategory.findMany({
        where: {
          category: {
            slug,
          },
        },

        include: {
          category: true,
        },

        orderBy: {
          sortOrder:
            "asc",
        },
      });

    return NextResponse.json(
      subCategories
    );

  } catch (error) {

    console.error(
      error
    );

    return NextResponse.json(
      {
        message:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}