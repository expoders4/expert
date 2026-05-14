import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { slugify } from "../../../lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      designation,
      bio,
      image,
      email,
      phone,
      linkedin,
      twitter,
      projectIds = []
    } = body;

    const team = await prisma.team.create({
      data: {
        name,
        slug: slugify(name),
        designation,
        bio,
        image,
        email,
        phone,
        linkedin,
        twitter,

        projects: {
          create: projectIds.map((projectId: string) => ({
            projectId
          }))
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const teams = await prisma.team.findMany({
    orderBy: {
      sortOrder: "asc"
    },

    include: {
      projects: {
        include: {
          project: true
        }
      }
    }
  });

  return NextResponse.json(teams);
}