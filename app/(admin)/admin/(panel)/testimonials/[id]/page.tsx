import { notFound } from "next/navigation"
import prisma from "../../../../../../lib/prisma"

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string }
}) {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: params.id },
  })

  if (!testimonial) return notFound()

  return (
    <></>
  )
}