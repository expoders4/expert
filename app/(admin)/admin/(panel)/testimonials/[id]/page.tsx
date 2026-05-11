import { notFound } from "next/navigation"
import prisma from "../../../../../../lib/prisma"
import TestimonialForm from "../../../../../../components/admin/component/testimonialForm"

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string }
}) {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: params.id },
  })

  if (!testimonial) return notFound()

  const serialized = {
    ...testimonial,
    designation: testimonial.role ?? undefined,
    role: testimonial.role ?? undefined,
    company: testimonial.company ?? undefined,
    avatar: testimonial.avatar ?? undefined,
  }

  return <TestimonialForm mode="edit" testimonial={serialized as any} />
}
