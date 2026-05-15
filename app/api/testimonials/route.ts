// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../lib/prisma'
// import { slugify } from '../../../lib/utils'

// // GET ALL TESTIMONIALS
// export async function GET() {
//   try {
//     const testimonials = await prisma.testimonial.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       data: testimonials,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch testimonials',
//       },
//       { status: 500 }
//     )
//   }
// }

// // CREATE TESTIMONIAL
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()

//     const testimonial = await prisma.testimonial.create({
//       data: {
//         name: body.name,
//         role: body.designation || null,
//         company: body.company || null,
//         content: body.content,
//         rating: Number(body.rating || 5),
//         avatar: body.avatar || null,
//         featured: Boolean(body.featured),
//         published: Boolean(body.published),
//         sortOrder: Number(body.sortOrder || 0),
//         slug: body.slug || slugify(body.name) + '-' + Date.now(),
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
//         message: 'Failed to create testimonial',
//       },
//       { status: 500 }
//     )
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { slugify } from "../../../lib/utils";

export const dynamic = "force-dynamic";

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



// GET ALL
export async function GET() {
  try {

    const testimonials =
      await prisma.testimonial.findMany({
        orderBy: [
          {
            featured: "desc",
          },
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
      data: testimonials,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch testimonials",
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
      `${slugify(
        body.name
      )}-${Date.now()}`;


    const exists =
      await prisma.testimonial.findUnique({
        where: {
          slug,
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
      await prisma.testimonial.create({
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


    return NextResponse.json(
      {
        success: true,
        data: testimonial,
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
          "Failed to create testimonial",
      },
      {
        status: 500,
      }
    );
  }
}