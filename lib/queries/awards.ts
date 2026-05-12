import prisma from "../prisma";


export async function getAwardBySlug(slug: string) {
  return prisma.award.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      category: {
        include: {
          subCategories: {
            include: {
              projects: {
                include: {
                  gallery: {
                    orderBy: {
                      sortOrder: "asc",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
};
