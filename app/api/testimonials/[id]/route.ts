// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../../lib/prisma'

// // GET BY ID
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const testimonial = await prisma.testimonial.findUnique({
//       where: {
//         id: params.id,
//       },
//     })

//     if (!testimonial) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Testimonial not found',
//         },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json({
//       success: true,
//       data: testimonial,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch testimonial',
//       },
//       { status: 500 }
//     )
//   }
// }

// // UPDATE
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await req.json()

//     const testimonial = await prisma.testimonial.update({
//       where: { id: params.id },
//       data: {
//         name: body.name,
//         role: body.designation || body.role || null,
//         company: body.company || null,
//         content: body.content,
//         rating: Number(body.rating || 5),
//         avatar: body.avatar || null,
//         featured: Boolean(body.featured),
//         published: Boolean(body.published),
//         sortOrder: Number(body.sortOrder || 0),
//         status: body.status || 'PENDING',
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       data: testimonial,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to update testimonial',
//       },
//       { status: 500 }
//     )
//   }
// }

// // DELETE
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await prisma.testimonial.delete({
//       where: {
//         id: params.id,
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Testimonial deleted successfully',
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to delete testimonial',
//       },
//       { status: 500 }
//     )
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { slugify } from "../../../../lib/utils";

const validStatus = [
  "PENDING",
  "APPROVED",
  "REJECTED",
];

function normalizeRating(
  value: unknown
) {
  const rating =
    Number(value || 5);

  return Math.min(
    5,
    Math.max(
      1,
      rating
    )
  );
}



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


    const testimonial =
      await prisma.testimonial.findUnique({
        where: {
          id,
        },
      });


    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Testimonial not found",
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json({
      success: true,
      data: testimonial,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch testimonial",
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


    if (
      !body.name ||
      !body.content
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name and content are required",
        },
        {
          status: 400,
        }
      );
    }


    const slug =
      body.slug ||
      slugify(
        body.name
      );


    const exists =
      await prisma.testimonial.findFirst({
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


    const status =
      validStatus.includes(
        body.status
      )
        ? body.status
        : "PENDING";


    const testimonial =
      await prisma.testimonial.update({
        where: {
          id,
        },

        data: {
          name:
            body.name,

          role:
            body.designation ||
            body.role ||
            null,

          company:
            body.company ||
            null,

          content:
            body.content,

          rating:
            normalizeRating(
              body.rating
            ),

          avatar:
            body.avatar ||
            null,

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

          slug,

          status,
        },
      });


    return NextResponse.json({
      success: true,
      data: testimonial,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update testimonial",
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


    await prisma.testimonial.delete({
      where: {
        id,
      },
    });


    return NextResponse.json({
      success: true,
      message:
        "Testimonial deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete testimonial",
      },
      {
        status: 500,
      }
    );
  }
}