// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../lib/prisma'

// export async function GET() {
//   try {
//     const awards = await prisma.award.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       data: awards,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch awards',
//       },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()

//     const award = await prisma.award.create({
//       data: {
//         title: body.title,
//         slug: body.slug,

//         organization: body.organization || null,
//         description: body.description || null,

//         year: body.year ? Number(body.year) : null,
//         location: body.location || null,

//         image: body.image || null,

//         featured: Boolean(body.featured),
//         published: Boolean(body.published),

//         sortOrder: Number(body.sortOrder || 0),
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       data: award,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create award',
//       },
//       { status: 500 }
//     )
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";



// GET ALL
export async function GET() {
  try {

    const awards =
      await prisma.award.findMany({
        include: {
          category: true,
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
      data: awards,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch awards",
      },
      {
        status: 500,
      }
    );
  }
}



// CREATE
export async function POST(
  req: NextRequest
) {
  try {

    const body =
      await req.json();


    if (
      !body.title ||
      !body.slug
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title and slug are required",
        },
        {
          status: 400,
        }
      );
    }


    const exists =
      await prisma.award.findUnique({
        where: {
          slug: body.slug,
        },
      });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Slug already exists",
        },
        {
          status: 400,
        }
      );
    }


    const award =
      await prisma.award.create({
        data: {
          title:
            body.title,

          slug:
            body.slug,

          categoryId:
            body.categoryId || null,

          organization:
            body.organization || null,

          description:
            body.description || null,

          year:
            body.year
              ? Number(body.year)
              : null,

          location:
            body.location || null,

          image:
            body.image || null,

          featured:
            Boolean(body.featured),

          published:
            Boolean(body.published),

          sortOrder:
            Number(
              body.sortOrder || 0
            ),
        },

        include: {
          category: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: award,
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
          "Failed to create award",
      },
      {
        status: 500,
      }
    );
  }
}