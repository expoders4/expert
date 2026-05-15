import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";



// GET ALL
export async function GET() {
  try {

    const galleries =
      await prisma.projectGallery.findMany({
        include: {
          project: true,
        },

        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      data: galleries,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch galleries",
      },
      {
        status: 500,
      }
    );
  }
}



// CREATE
export async function POST(
  request: NextRequest
) {
  try {

    const body =
      await request.json();


    if (
      !body.projectId ||
      !body.image
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "projectId and image are required",
        },
        {
          status: 400,
        }
      );
    }


    const gallery =
      await prisma.projectGallery.create({
        data: {
          projectId:
            body.projectId,

          image:
            body.image,

          title:
            body.title,

          description:
            body.description,

          sortOrder:
            body.sortOrder || 0,
        },

        include: {
          project: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: gallery,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create gallery",
      },
      {
        status: 500,
      }
    );
  }
}