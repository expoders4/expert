// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../../lib/prisma'

// interface Params {
//   params: { id: string }
// }

// export async function GET(req: NextRequest, { params }: Params) {
//   try {
//     const award = await prisma.award.findUnique({
//       where: { id: params.id },
//     })

//     if (!award) {
//       return NextResponse.json(
//         { success: false, message: 'Award not found' },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json({
//       success: true,
//       data: award,
//     })
//   } catch {
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch award' },
//       { status: 500 }
//     )
//   }
// }

// export async function PUT(req: NextRequest, { params }: Params) {
//   try {
//     const body = await req.json()

//     const award = await prisma.award.update({
//       where: { id: params.id },
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
//   } catch {
//     return NextResponse.json(
//       { success: false, message: 'Failed to update award' },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(req: NextRequest, { params }: Params) {
//   try {
//     await prisma.award.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Award deleted successfully',
//     })
//   } catch {
//     return NextResponse.json(
//       { success: false, message: 'Failed to delete award' },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";



// GET BY ID
export async function GET(
  req: NextRequest,
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


    const award =
      await prisma.award.findUnique({
        where: {
          id,
        },

        include: {
          category: true,
        },
      });


    if (!award) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Award not found",
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json({
      success: true,
      data: award,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch award",
      },
      {
        status: 500,
      }
    );
  }
}



// UPDATE
export async function PUT(
  req: NextRequest,
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
      await req.json();


    const exists =
      await prisma.award.findFirst({
        where: {
          slug: body.slug,

          NOT: {
            id,
          },
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
      await prisma.award.update({
        where: {
          id,
        },

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


    return NextResponse.json({
      success: true,
      data: award,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update award",
      },
      {
        status: 500,
      }
    );
  }
}



// DELETE
export async function DELETE(
  req: NextRequest,
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


    await prisma.award.delete({
      where: {
        id,
      },
    });


    return NextResponse.json({
      success: true,
      message:
        "Award deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete award",
      },
      {
        status: 500,
      }
    );
  }
}