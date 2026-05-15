// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../lib/prisma'

// export async function GET() {
//     try {
//         const blogs = await prisma.blog.findMany({
//             include: {
//                 author: true,
//             },

//             orderBy: {
//                 createdAt: 'desc',
//             },
//         })

//         return NextResponse.json({
//             success: true,
//             data: blogs,
//         })
//     } catch (error) {
//         return NextResponse.json(
//             {
//                 success: false,
//                 message: 'Failed to fetch blogs',
//             },
//             {
//                 status: 500,
//             }
//         )
//     }
// }

// export async function POST(
//     req: NextRequest
// ) {
//     try {
//         const body = await req.json()

//         let authorId =
//             body.authorId

//         if (!authorId) {
//             const admin =
//                 await prisma.admin.findFirst()

//             if (!admin) {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         message:
//                             'No admin found',
//                     },
//                     {
//                         status: 400,
//                     }
//                 )
//             }

//             authorId =
//                 admin.id
//         }

//         const author =
//             await prisma.admin.findUnique({
//                 where: {
//                     id: authorId,
//                 },
//             })

//         if (!author) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message:
//                         'Invalid author',
//                 },
//                 {
//                     status: 400,
//                 }
//             )
//         }

//         const blog =
//             await prisma.blog.create({
//                 data: {
//                     title:
//                         body.title,

//                     slug:
//                         body.slug,

//                     excerpt:
//                         body.excerpt ||
//                         null,

//                     content:
//                         body.content,

//                     thumbnail:
//                         body.thumbnail ||
//                         null,

//                     coverImage:
//                         body.coverImage ||
//                         null,

//                     category:
//                         body.category ||
//                         null,

//                     tags:
//                         body.tags ||
//                         [],

//                     metaTitle:
//                         body.metaTitle ||
//                         null,

//                     metaDescription:
//                         body.metaDescription ||
//                         null,

//                     keywords:
//                         body.keywords ||
//                         null,

//                     featured:
//                         Boolean(
//                             body.featured
//                         ),

//                     published:
//                         Boolean(
//                             body.published
//                         ),

//                     status:
//                         body.published
//                             ? 'PUBLISHED'
//                             : 'DRAFT',

//                     publishedAt:
//                         body.published
//                             ? new Date()
//                             : null,

//                     sortOrder:
//                         Number(
//                             body.sortOrder ||
//                             0
//                         ),

//                     authorId:
//                         author.id,
//                 },
//             })

//         return NextResponse.json({
//             success: true,
//             data: blog,
//         })
//     } catch (error) {
//         return NextResponse.json(
//             {
//                 success: false,
//                 message: 'Failed to create blog',
//             },
//             {
//                 status: 500,
//             }
//         )
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";



// GET ALL
export async function GET() {
  try {

    const blogs =
      await prisma.blog.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
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
      data: blogs,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch blogs",
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
      !body.slug ||
      !body.content
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Required fields missing",
        },
        {
          status: 400,
        }
      );
    }


    const slugExists =
      await prisma.blog.findUnique({
        where: {
          slug: body.slug,
        },
      });

    if (slugExists) {
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


    let authorId =
      body.authorId;


    if (!authorId) {

      const admin =
        await prisma.admin.findFirst();

      if (!admin) {
        return NextResponse.json(
          {
            success: false,
            message:
              "No admin found",
          },
          {
            status: 400,
          }
        );
      }

      authorId =
        admin.id;
    }


    const blog =
      await prisma.blog.create({
        data: {
          title:
            body.title,

          slug:
            body.slug,

          excerpt:
            body.excerpt || null,

          content:
            body.content,

          thumbnail:
            body.thumbnail || null,

          coverImage:
            body.coverImage || null,

          category:
            body.category || null,

          tags:
            body.tags || [],

          metaTitle:
            body.metaTitle || null,

          metaDescription:
            body.metaDescription || null,

          keywords:
            body.keywords || null,

          featured:
            Boolean(
              body.featured
            ),

          published:
            Boolean(
              body.published
            ),

          status:
            body.published
              ? "PUBLISHED"
              : "DRAFT",

          publishedAt:
            body.published
              ? new Date()
              : null,

          sortOrder:
            Number(
              body.sortOrder || 0
            ),

          authorId,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: blog,
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
          "Failed to create blog",
      },
      {
        status: 500,
      }
    );
  }
}