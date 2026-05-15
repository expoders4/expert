// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../../lib/prisma'
// import { slugify } from '../../../../lib/utils'

// // GET BY ID
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const feature = await prisma.feature.findUnique({
//       where: { id: params.id },
//     })

//     if (!feature) {
//       return NextResponse.json(
//         { success: false, message: 'Feature not found' },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json({
//       success: true,
//       data: feature,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch feature' },
//       { status: 500 }
//     )
//   }
// }

// // UPDATE FEATURE
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await req.json()

//     const feature = await prisma.feature.update({
//       where: { id: params.id },
//       data: {
//         title: body.title,
//         slug: body.slug || slugify(body.title),

//         description: body.description || null,
//         icon: body.icon || null,
//         image: body.image || null,
//         category: body.category || null,

//         featured: Boolean(body.featured),
//         published: Boolean(body.published),

//         sortOrder: Number(body.sortOrder || 0),
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       data: feature,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Failed to update feature' },
//       { status: 500 }
//     )
//   }
// }

// // DELETE FEATURE
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await prisma.feature.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Feature deleted successfully',
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Failed to delete feature' },
//       { status: 500 }
//     )
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { slugify } from "../../../../lib/utils";



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


    const feature =
      await prisma.feature.findUnique({
        where: {
          id,
        },
      });


    if (!feature) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Feature not found",
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json({
      success: true,
      data: feature,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch feature",
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


    if (!body.title) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title is required",
        },
        {
          status: 400,
        }
      );
    }


    const slug =
      body.slug ||
      slugify(
        body.title
      );


    const exists =
      await prisma.feature.findFirst({
        where: {
          slug,

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


    const feature =
      await prisma.feature.update({
        where: {
          id,
        },

        data: {
          title:
            body.title,

          slug,

          description:
            body.description || null,

          icon:
            body.icon || null,

          image:
            body.image || null,

          category:
            body.category || null,

          featured:
            Boolean(
              body.featured
            ),

          published:
            Boolean(
              body.published
            ),

          sortOrder:
            Number(
              body.sortOrder || 0
            ),
        },
      });


    return NextResponse.json({
      success: true,
      data: feature,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update feature",
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


    await prisma.feature.delete({
      where: {
        id,
      },
    });


    return NextResponse.json({
      success: true,
      message:
        "Feature deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete feature",
      },
      {
        status: 500,
      }
    );
  }
}