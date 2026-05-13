'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
}

type Props = {
  content: string
}

export default function AnimatedDynamicContent({
  content,
}: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      className="
        blog-content
        text-white/80
        leading-8

        [&>h2]:font-body
        [&>h2]:text-lg
        md:[&>h2]:text-xl
        [&>h2]:font-bold
        [&>h2]:text-primary
        [&>h2]:mt-8
        [&>h2]:mb-4
        [&>h2]:border-l-4
        [&>h2]:pl-5

        [&>p]:leading-9
        [&>p]:text-white/75

        [&>ul]:pl-8
        [&>ul>li]:marker:text-primary
      "
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}