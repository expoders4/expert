import prisma from "../prisma";

export const getFeaturedProjects = async () => {
  return await prisma.project.findMany({
    where: {
      published: true,
    },
    include: {
      subCategory: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
};