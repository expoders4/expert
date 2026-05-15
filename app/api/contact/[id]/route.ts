// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../../lib/prisma'

// // DELETE
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await prisma.inquiry.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Deleted successfully',
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Delete failed' },
//       { status: 500 }
//     )
//   }
// }

// // UPDATE STATUS ONLY
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await req.json()

//     const updated = await prisma.inquiry.update({
//       where: { id: params.id },
//       data: {
//         status: body.status, // UNREAD | READ | REPLIED | ARCHIVED
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       data: updated,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Status update failed' },
//       { status: 500 }
//     )
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

const validStatus = [
  "UNREAD",
  "READ",
  "REPLIED",
  "ARCHIVED",
];



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


    const inquiry =
      await prisma.inquiry.findUnique({
        where: {
          id,
        },
      });


    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Inquiry not found",
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json({
      success: true,
      data: inquiry,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch inquiry",
      },
      {
        status: 500,
      }
    );
  }
}



// PATCH STATUS
export async function PATCH(
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
      !validStatus.includes(
        body.status
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid status",
        },
        {
          status: 400,
        }
      );
    }


    const updated =
      await prisma.inquiry.update({
        where: {
          id,
        },

        data: {
          status:
            body.status,
        },
      });


    return NextResponse.json({
      success: true,
      data: updated,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Status update failed",
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


    await prisma.inquiry.delete({
      where: {
        id,
      },
    });


    return NextResponse.json({
      success: true,
      message:
        "Deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}