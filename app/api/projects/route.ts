// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../lib/prisma";

// // GET ALL
// export async function GET() {
//   try {
//     const projects = await prisma.project.findMany({
//       include: {
//         subCategory: {
//           include: {
//             category: true,
//           },
//         },
//         gallery: true,
//       },
//       orderBy: {
//         sortOrder: "asc",
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       data: projects,
//     });

//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch projects",
//       },
//       { status: 500 }
//     );
//   }
// }

// // CREATE
// export async function POST(
//   request: NextRequest
// ) {
//   try {

//     const body =
//       await request.json();

//     const project =
//       await prisma.project.create({
//         data: {
//           title: body.title,
//           slug: body.slug,

//           subCategoryId:
//             body.subCategoryId,

//           shortDescription:
//             body.shortDescription,

//           description:
//             body.description,

//           location:
//             body.location,

//           year:
//             body.year,

//           clientName:
//             body.clientName,

//           area:
//             body.area,

//           thumbnail:
//             body.thumbnail,

//           coverImage:
//             body.coverImage,

//           status:
//             body.status,

//           featured:
//             body.featured,

//           published:
//             body.published,

//           metaTitle:
//             body.metaTitle,

//           metaDescription:
//             body.metaDescription,

//           keywords:
//             body.keywords,

//           gallery: {
//             create:
//               body.gallery || [],
//           },
//         },

//         include: {
//           gallery: true,
//         },
//       });

//     return NextResponse.json(
//       {
//         success: true,
//         data: project,
//       },
//       { status: 201 }
//     );

//   } catch (error) {

//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           "Failed to create project",
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";


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
        teamMembers: {
          include: {
            team: true,
          },
        },
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
      data: projects,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
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
      !body.title ||
      !body.slug ||
      !body.subCategoryId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields missing",
        },
        {
          status: 400,
        }
      );
    }


    const exists =
      await prisma.project.findUnique({
        where: {
          slug: body.slug,
        },
      });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists",
        },
        {
          status: 400,
        }
      );
    }


    const teamIds: string[] =
      Array.isArray(body.teamIds)
        ? body.teamIds
        : [];

    const project =
      await prisma.project.create({
        data: {
          title: body.title,
          slug: body.slug,

          subCategoryId:
            body.subCategoryId,

          shortDescription:
            body.shortDescription || null,

          description:
            body.description || null,

          location:
            body.location || null,

          year:
            body.year || null,

          clientName:
            body.clientName || null,

          area:
            body.area || null,

          thumbnail:
            body.thumbnail || null,

          coverImage:
            body.coverImage || null,

          status:
            body.status || null,

          featured:
            body.featured ?? false,

          published:
            body.published ?? true,

          sortOrder:
            body.sortOrder ?? 0,

          metaTitle:
            body.metaTitle || null,

          metaDescription:
            body.metaDescription || null,

          keywords:
            body.keywords || null,

          gallery: {
            create:
              body.gallery || [],
          },

          teamMembers: {
            create: teamIds.map(
              (teamId) => ({ teamId })
            ),
          },
        },

        include: {
          gallery: true,
          teamMembers: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: project,
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
          "Failed to create project",
      },
      {
        status: 500,
      }
    );
  }
}