import { notFound } from 'next/navigation';
import prisma from '../../../../../../lib/prisma';
import FeatureForm from '../../../../../../components/admin/component/featureForm';

export default async function EditFeaturePage({
  params,
}: {
  params: { id: string }
}) {
  const feature = await prisma.feature.findUnique({
    where: { id: params.id },
  })

  if (!feature) notFound()

  return <FeatureForm mode="edit" feature={feature} />
}