// import type { Metadata } from 'next'
// import { notFound } from 'next/navigation'

// import prisma from '../../../../../../lib/prisma'

// import ProjectForm from '../../../../../../components/admin/component/projectForm'

// export const metadata: Metadata = {
//   title: 'Edit Project',
// }

// interface PageProps {
//   params: {
//     id: string
//   }
// }

// export default async function EditProjectPage({
//   params,
// }: PageProps) {
//   const project =
//     await prisma.project.findUnique({
//       where: {
//         id: params.id,
//       },
//       include: {
//         gallery: true,
//       },
//     })

//   if (!project) {
//     notFound()
//   }

//   const serialized = {
//     ...project,

//     year:
//       project.year ?? undefined,

//     status:
//       project.status ?? undefined,

//     shortDescription:
//       project.shortDescription ??
//       undefined,

//     description:
//       project.description ??
//       undefined,

//     location:
//       project.location ??
//       undefined,

//     clientName:
//       project.clientName ??
//       undefined,

//     area:
//       project.area ?? undefined,

//     thumbnail:
//       project.thumbnail ??
//       undefined,

//     coverImage:
//       project.coverImage ??
//       undefined,

//     gallery:
//       Array.isArray(
//         (project as any).gallery
//       )
//         ? (project as any).gallery
//         : [],

//     metaTitle:
//       project.metaTitle ??
//       undefined,

//     metaDescription:
//       project.metaDescription ??
//       undefined,

//     keywords:
//       project.keywords ??
//       undefined,
//   }

//   return (
//     <ProjectForm
//       mode="edit"
//       project={serialized as any}
//     />
//   )
// }


import type { Metadata } from "next";

import { notFound } from "next/navigation";

import prisma from "../../../../../../lib/prisma";

import ProjectForm from "../../../../../../components/admin/component/projectForm";

export const metadata: Metadata = {
  title: "Edit Project",
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: PageProps) {

  const { id } =
    await params;

  const project =
    await prisma.project.findUnique({

      where: {
        id,
      },

      include: {

        gallery: {
          orderBy: {
            sortOrder: 'asc',
          },
        },

        subCategory: {
          include: {
            category: true,
          },
        },

        teamMembers: {
          include: {
            team: true,
          },
        },
      },
    });

  if (!project) {
    notFound();
  }

  return (
    <ProjectForm
      mode="edit"
      project={
        project as any
      }
    />
  );
}