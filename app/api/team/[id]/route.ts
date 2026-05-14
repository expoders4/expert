import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  const team = await prisma.team.findUnique({
    where: {
      id: params.id
    },

    include: {
      projects: {
        include: {
          project: true
        }
      }
    }
  });

  return NextResponse.json(team);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  const body = await req.json();

  const {
    projectIds = [],
    ...rest
  } = body;

  await prisma.projectTeam.deleteMany({
    where: {
      teamId: params.id
    }
  });

  const team = await prisma.team.update({
    where: {
      id: params.id
    },

    data: {
      ...rest,

      projects: {
        create: projectIds.map(
          (projectId: string) => ({
            projectId
          })
        )
      }
    },

    include: {
      projects: {
        include: {
          project: true
        }
      }
    }
  });

  return NextResponse.json(team);
}