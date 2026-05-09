import {
  NextResponse,
} from "next/server";
import prisma from "../../../../../lib/prisma";


export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      slug: string;
    };
  }
) {

  try {

    const project =
      await prisma.project.findFirst({
        where: {
          slug:
            params.slug,

          published:
            true,
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
      });

    if (
      !project
    ) {

      return NextResponse.json(
        {
          message:
            "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      project
    );

  } catch (
    error
  ) {

    console.error(
      "PROJECT API ERROR:",
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