import AwardForm from '../../../../../../components/admin/component/awardForm'
import prisma from '../../../../../../lib/prisma'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { id: string }
}

export default async function EditAwardPage({ params }: PageProps) {
  const award = await prisma.award.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!award) {
    notFound()
  }

  const serialized = {
    ...award,
    description: award.description ?? undefined,
    location: award.location ?? undefined,
    image: award.image ?? undefined,
    categoryId: award.categoryId ?? undefined,
  }
  

  return <AwardForm mode="edit" award={serialized as any} />
}