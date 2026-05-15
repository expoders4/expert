// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../../lib/prisma'

// interface Props {
//   params: {
//     id: string
//   }
// }

// export async function GET(
//   req: NextRequest,
//   { params }: Props
// ) {
//   try {
//     const blog =
//       await prisma.blog.findUnique({
//         where: {
//           id: params.id,
//         },

//         include: {
//           author: true,
//         },
//       })

//     if (!blog) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Blog not found',
//         },
//         {
//           status: 404,
//         }
//       )
//     }

//     return NextResponse.json({
//       success: true,
//       data: blog,
//     })
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed',
//       },
//       {
//         status: 500,
//       }
//     )
//   }
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: Props
// ) {
//   try {
//     const body = await req.json()

//     const blog =
//       await prisma.blog.update({
//         where: {
//           id: params.id,
//         },

//         data: {
//           ...body,

//           publishedAt:
//             body.published
//               ? new Date()
//               : null,
//         },
//       })

//     return NextResponse.json({
//       success: true,
//       data: blog,
//     })
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Update failed',
//       },
//       {
//         status: 500,
//       }
//     )
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: Props
// ) {
//   try {
//     await prisma.blog.delete({
//       where: {
//         id: params.id,
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Deleted successfully',
//     })
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Delete failed',
//       },
//       {
//         status: 500,
//       }
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


    const blog =
      await prisma.blog.findUnique({
        where: {
          id,
        },

        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });


    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Blog not found",
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json({
      success: true,
      data: blog,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch blog",
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


    const slugExists =
      await prisma.blog.findFirst({
        where: {
          slug:
            body.slug,

          NOT: {
            id,
          },
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


    const blog =
      await prisma.blog.update({
        where: {
          id,
        },

        data: {
          title:
            body.title,

          slug:
            body.slug,

          excerpt:
            body.excerpt,

          content:
            body.content,

          thumbnail:
            body.thumbnail,

          coverImage:
            body.coverImage,

          category:
            body.category,

          tags:
            body.tags,

          metaTitle:
            body.metaTitle,

          metaDescription:
            body.metaDescription,

          keywords:
            body.keywords,

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
        },
      });


    return NextResponse.json({
      success: true,
      data: blog,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update blog",
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


    await prisma.blog.delete({
      where: {
        id,
      },
    });


    return NextResponse.json({
      success: true,
      message:
        "Blog deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete blog",
      },
      {
        status: 500,
      }
    );
  }
}