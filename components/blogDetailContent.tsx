'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import AnimatedDynamicContent from './animatedDynamicContent'

type Props = {
  blog: any
  tags: string[]
  readTime: number
  relatedBlogs: any[]
}

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export default function BlogDetailContent({
  blog,
  tags,
  readTime,
  relatedBlogs,
}: Props) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="section-dark py-28"
    >
      <div className="container-wide">

        {/* back */}
        <motion.div
          variants={item}
          className="mb-12"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-white hover:text-primary"
          >
            <ArrowLeft size={18} />
            Back to Journal
          </Link>
        </motion.div>

        {/* article */}
        <article className="max-w-4xl mx-auto">

          {/* meta */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-6 mb-8 text-sm"
          >
            <div className="flex items-center gap-2 text-primary">
              <Calendar size={16} />
              {blog.publishedAt?.toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2 text-primary">
              <Clock size={16} />
              {readTime} min read
            </div>
          </motion.div>

          {/* title */}
          <motion.h1
            variants={item}
            className="text-3xl md:text-4xl font-bold text-primary mb-8"
          >
            {blog.title}
          </motion.h1>

          {/* author */}
          <motion.div
            variants={item}
            className="border-b border-white/10 pb-8 mb-12"
          >
            <p className="text-lg text-white font-semibold">
              {blog.author?.name}
            </p>

            <p className="text-sm text-gray-400">
              Architectural Editorial Team
            </p>
          </motion.div>

          {/* content */}
          <AnimatedDynamicContent content={blog.content} />

          {/* tags */}
          {tags.length > 0 && (
            <motion.div
              variants={item}
              className="flex flex-wrap gap-3 mt-12"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm text-white"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}
        </article>

        {/* related */}
        {relatedBlogs.length > 0 && (
          <motion.section
            variants={item}
            className="mt-24"
          >
            <h2 className="text-3xl text-white mb-8">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug}`}
                  className="border border-white/10 p-6 rounded-xl hover:border-primary"
                >
                  <h3 className="text-white font-semibold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.section>
  )
}