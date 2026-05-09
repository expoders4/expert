import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            include: {
                author: true,
            },

            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({
            success: true,
            data: blogs,
        })
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch blogs',
            },
            {
                status: 500,
            }
        )
    }
}

export async function POST(
    req: NextRequest
) {
    try {
        const body = await req.json()

        let authorId =
            body.authorId

        if (!authorId) {
            const admin =
                await prisma.admin.findFirst()

            if (!admin) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            'No admin found',
                    },
                    {
                        status: 400,
                    }
                )
            }

            authorId =
                admin.id
        }

        const author =
            await prisma.admin.findUnique({
                where: {
                    id: authorId,
                },
            })

        if (!author) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Invalid author',
                },
                {
                    status: 400,
                }
            )
        }

        const blog =
            await prisma.blog.create({
                data: {
                    title:
                        body.title,

                    slug:
                        body.slug,

                    excerpt:
                        body.excerpt ||
                        null,

                    content:
                        body.content,

                    thumbnail:
                        body.thumbnail ||
                        null,

                    coverImage:
                        body.coverImage ||
                        null,

                    category:
                        body.category ||
                        null,

                    tags:
                        body.tags ||
                        [],

                    metaTitle:
                        body.metaTitle ||
                        null,

                    metaDescription:
                        body.metaDescription ||
                        null,

                    keywords:
                        body.keywords ||
                        null,

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
                            ? 'PUBLISHED'
                            : 'DRAFT',

                    publishedAt:
                        body.published
                            ? new Date()
                            : null,

                    sortOrder:
                        Number(
                            body.sortOrder ||
                            0
                        ),

                    authorId:
                        author.id,
                },
            })

        return NextResponse.json({
            success: true,
            data: blog,
        })
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create blog',
            },
            {
                status: 500,
            }
        )
    }
}