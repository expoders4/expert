export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

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

    const data =
      await prisma.project.findMany({
        where: {
          subCategory: {
            slug,
          },
        },

        include: {

          subCategory: {
            include: {
              category: true,
            },
          },

          gallery: {
            orderBy: {
              sortOrder:
                "asc",
            },
          },
        },

        orderBy: {
          sortOrder:
            "asc",
        },
      });

    if (
      !data.length
    ) {

      return NextResponse.json(
        {
          message:
            "Projects not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      data
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