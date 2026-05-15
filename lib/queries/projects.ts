import prisma from "../prisma";

export async function getFeaturedProjects(limit: number = 5) {
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