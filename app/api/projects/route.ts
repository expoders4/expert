import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// GET ALL
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        subCategory: {
          include: {
            category: true,
          },
        },
        gallery: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: projects,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
      },
      { status: 500 }
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

    const project =
      await prisma.project.create({
        data: {
          title: body.title,
          slug: body.slug,

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

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create project",
      },
      { status: 500 }
    );
  }
}