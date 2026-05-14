import prisma from "../prisma";

export async function getFeaturedProjects(
  limit?: number
) {
  return prisma.project.findMany({
    where: {
      published: true,
      featured: true,
    },
    include: {
      subCategory: true,
    },
    orderBy: [
      { createdAt: 'desc' },
    ],
    ...(limit && {
      take: limit,
    }),
  });
}