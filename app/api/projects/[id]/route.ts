import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";



// GET BY ID
export async function GET(
  request: NextRequest,
  { params }: {
    params: { id: string };
  }
) {
  try {

    const project =
      await prisma.project.findUnique({
        where: {
          id: params.id,
        },

        include: {
          subCategory: {
            include: {
              category: true,
            },
          },

          gallery: true,
        },
      });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch project",
      },
      { status: 500 }
    );
  }
}





// UPDATE
export async function PUT(
  request: NextRequest,
  { params }: {
    params: { id: string };
  }
) {
  try {

    const body =
      await request.json();


    await prisma.projectGallery.deleteMany({
      where: {
        projectId:
          params.id,
      },
    });


    const project =
      await prisma.project.update({
        where: {
          id: params.id,
        },

        data: {
          title:
            body.title,

          slug:
            body.slug,

          subCategoryId:
            body.subCategoryId,

          shortDescription:
            body.shortDescription,

          description:
            body.description,

          location:
            body.location,

          year:
            body.year,

          clientName:
            body.clientName,

          area:
            body.area,

          thumbnail:
            body.thumbnail,

          coverImage:
            body.coverImage,

          status:
            body.status,

          featured:
            body.featured,

          published:
            body.published,

          metaTitle:
            body.metaTitle,

          metaDescription:
            body.metaDescription,

          keywords:
            body.keywords,

          gallery: {
            create:
              body.gallery || [],
          },
        },

        include: {
          gallery: true,
        },
      });

    return NextResponse.json({
      success: true,
      data: project,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update project",
      },
      { status: 500 }
    );
  }
}





// DELETE
export async function DELETE(
  request: NextRequest,
  { params }: {
    params: { id: string };
  }
) {
  try {

    await prisma.project.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Project deleted successfully",
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete project",
      },
      { status: 500 }
    );
  }
}