import { cache } from "react";
import prisma from "../prisma";

export const getAboutData = cache(async () => {
  const features = await prisma.feature.findMany({
    where: {
      published: true,
    },
    orderBy: [
      { featured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  const testimonials = await prisma.testimonial.findMany({
    where: {
      published: true,
      status: 'APPROVED',
    },
    orderBy: [
      { featured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  return {
    features,
    testimonials,
  };
});