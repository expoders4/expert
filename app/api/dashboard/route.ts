import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const [
      totalProjects,
      publishedProjects,
      totalBlogs,
      publishedBlogs,
      totalTestimonials,
      totalAwards,
      publishedAwards,
      totalMessages,
    //   unreadMessages,
      totalPressFeatures,
      publishedPressFeatures,
      recentMessages,
      recentProjects,
    ] = await Promise.all([
      // Projects
      prisma.project.count(),
      prisma.project.count({ where: { published: true } }),

      // Blogs
      prisma.blog.count(),
      prisma.blog.count({ where: { published: true } }),

      // Testimonials
      prisma.testimonial.count({ where: { published: true } }),

      // Awards
      prisma.award.count(),
      prisma.award.count({ where: { published: true } }),

      // Messages
      prisma.inquiry.count(),
    //   prisma.inquiry.count({ where: { read: false } }),

      // Press Features
      prisma.feature.count(),
      prisma.feature.count({ where: { published: true } }),

      // Recent Messages (last 5)
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          senderName: true,
          subject: true,
          createdAt: true,
        },
      }),

      // Recent Projects (last 5)
      prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
          subCategory: {
            select: { name: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        projects: {
          total: totalProjects,
          published: publishedProjects,
        },
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
        },
        testimonials: {
          published: totalTestimonials,
        },
        awards: {
          total: totalAwards,
          published: publishedAwards,
        },
        messages: {
          total: totalMessages,
          unread: 0, //unreadMessages,
        },
        pressFeatures: {
          total: totalPressFeatures,
          published: publishedPressFeatures,
        },
      },
      recentMessages,
      recentProjects,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}