import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";



// GET BY ID
export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const {
      id,
    } = await params;


    const gallery =
      await prisma.projectGallery.findUnique({
        where: {
          id,
        },

        include: {
          project: true,
        },
      });


    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gallery not found",
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json({
      success: true,
      data: gallery,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch gallery",
      },
      {
        status: 500,
      }
    );
  }
}



// UPDATE
export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const {
      id,
    } = await params;

    const body =
      await request.json();


    const gallery =
      await prisma.projectGallery.update({
        where: {
          id,
        },

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


    return NextResponse.json({
      success: true,
      data: gallery,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update gallery",
      },
      {
        status: 500,
      }
    );
  }
}



// DELETE
export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const {
      id,
    } = await params;


    await prisma.projectGallery.delete({
      where: {
        id,
      },
    });


    return NextResponse.json({
      success: true,
      message:
        "Gallery deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete gallery",
      },
      {
        status: 500,
      }
    );
  }
}