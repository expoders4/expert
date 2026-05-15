// import type { Metadata } from 'next';
// import Link from 'next/link';

// import PageHero from '../../../components/user/pageHero';
// import { Reveal } from '../../../components/animations';


// const siteUrl =
//   process.env.NEXT_PUBLIC_SITE_URL ||
//   'https://tougharchitects.com';


// export const metadata: Metadata = {
//   title: 'Client Testimonials — Trust Built Through Design',
//   description:
//     'Read what homeowners, developers, hospitality brands, and global partners say about working with TOUGH Architects.',

//   keywords: [
//     'architect client reviews India',
//     'architecture firm testimonials',
//     'TOUGH Architects reviews',
//     'client feedback architecture',
//     'residential architecture reviews',
//     'interior design testimonials',
//   ],

//   alternates: {
//     canonical: `${siteUrl}/testimonials`,
//   },

//   openGraph: {
//     title:
//       'TOUGH Architects Client Testimonials',

//     description:
//       'Real stories from clients across residential, hospitality, commercial and cultural projects.',

//     url: `${siteUrl}/testimonials`,
//     type: 'website',
//   },
// };


// const jsonLd = {
//   '@context': 'https://schema.org',
//   '@type': 'CollectionPage',
//   name: 'TOUGH Architects Testimonials',
//   url: `${siteUrl}/testimonials`,
// };


// const stats = [
//   {
//     number: '520+',
//     label: 'Projects Delivered',
//   },
//   {
//     number: '96%',
//     label: 'Repeat Clients',
//   },
//   {
//     number: '28',
//     label: 'Countries',
//   },
//   {
//     number: '40+',
//     label: 'Years of Practice',
//   },
// ];


// /* ─── Types ──────────────────────────────────────────────── */
// interface Testimonial {
//   id: string;
//   name: string;
//   role: string | null;
//   company: string | null;
//   avatar: string | null;
//   content: string;
//   rating: number;
//   featured: boolean;
//   published: boolean;
//   sortOrder: number;
// }

// /* ─── Data Fetching ──────────────────────────────────────── */
// async function getTestimonials(): Promise<Testimonial[]> {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
//     const res = await fetch(`${baseUrl}/api/testimonials`, {
//       next: { revalidate: 60 },
//     });
//     if (!res.ok) return [];
//     const json = await res.json();
//     return json.success
//       ? (json.data as Testimonial[])
//         .filter((t) => t.published)
//         .sort((a, b) => a.sortOrder - b.sortOrder)
//       : [];
//   } catch {
//     return [];
//   }
// }


// export default async function TestimonialsPage() {
//   const testimonials = await getTestimonials();

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(jsonLd),
//         }}
//       />

//       <main>

//         {/* HERO */}
//         <PageHero
//           label="Client Stories"
//           title="Built On"
//           titleAccent="Trust"
//           subtitle="The most meaningful measure of our work is the relationships it creates."
//           image="/images/about-office.png"
//           imageAlt="TOUGH Architects client meeting"
//           breadcrumbs={[
//             {
//               label: 'Home',
//               href: '/',
//             },
//             {
//               label: 'Testimonials',
//             },
//           ]}
//         />



//         {/* INTRO */}
//         <section
//           className="section-dark2"
//           style={{
//             padding:
//               'var(--section-py) 0',
//           }}
//         >
//           <div className="container-wide text-center max-w-4xl">

//             <Reveal>
//               <span className="section-label justify-center">
//                 Our Clients
//               </span>
//             </Reveal>

//             <Reveal delay={0.15}>
//               <h2 className="section-heading mt-3">
//                 Relationships That
//                 <span>
//                   Endure
//                 </span>
//               </h2>
//             </Reveal>

//             <Reveal delay={0.25}>
//               <p
//                 className="mt-6"
//                 style={{
//                   fontSize:
//                     '.92rem',
//                   lineHeight:
//                     '1.9',
//                 }}
//               >
//                 For over four decades,
//                 our work has been shaped
//                 by collaboration,
//                 trust, and a shared belief
//                 in creating spaces
//                 that matter.
//               </p>
//             </Reveal>

//           </div>
//         </section>



//         {/* TESTIMONIAL GRID */}
//         {testimonials.length > 0 && (
//           <section
//             className="section-dark"
//             style={{
//               padding: 'var(--section-py) 0',
//             }}
//           >
//             <div className="container-wide">

//               <div
//                 className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
//               >
//                 {testimonials.map((item) => (
//                   <article
//                     key={item.id}
//                     className="service-card flex flex-col"
//                     style={{
//                       padding: '2.5rem',
//                     }}
//                   >

//                     <p
//                       style={{
//                         fontSize: '3rem',
//                         color: 'var(--color-primary)',
//                         lineHeight: 1,
//                       }}
//                     >

//                     </p>

//                     <p
//                       style={{
//                         fontSize: '.85rem',
//                         lineHeight: '1.9',
//                       }}
//                     >
//                       {item.content}
//                     </p>

//                     {/* always bottom */}
//                     <div
//                       className="mt-auto pt-8 flex items-center gap-4"
//                     >
//                       <img
//                         src={
//                           item.avatar ||
//                           '/images/default-avatar.png'
//                         }
//                         alt={item.name}
//                         className="w-14 h-14 rounded-full object-cover shrink-0"
//                       />

//                       <div>
//                         <h3
//                           style={{
//                             fontFamily:
//                               'var(--font-playfair)',
//                             color: 'white',
//                             fontSize: '1rem',
//                           }}
//                         >
//                           {item.name}
//                         </h3>

//                         {(item.role ||
//                           item.company) && (
//                             <p
//                               style={{
//                                 color:
//                                   'var(--color-primary)',
//                                 fontSize: '.7rem',
//                                 letterSpacing:
//                                   '.15em',
//                                 marginTop: '.5rem',
//                               }}
//                             >
//                               {[item.role, item.company]
//                                 .filter(Boolean)
//                                 .join(', ')}
//                             </p>
//                           )}
//                       </div>

//                     </div>

//                   </article>
//                 ))}
//               </div>

//             </div>
//           </section>
//         )}

//         {/* STATS */}
//         <section
//           className="section-dark2"
//           style={{
//             padding:
//               '5rem 0',
//           }}
//         >
//           <div className="container-wide">

//             <div
//               className="grid md:grid-cols-4 gap-px"
//             >
//               {stats.map(
//                 (item) => (
//                   <div
//                     key={item.label}
//                     className="text-center p-8"
//                   >

//                     <h3
//                       style={{
//                         fontFamily:
//                           'var(--font-playfair)',
//                         fontSize:
//                           '2.4rem',
//                         color:
//                           'var(--color-primary)',
//                       }}
//                     >
//                       {item.number}
//                     </h3>

//                     <p
//                       className="mt-2"
//                       style={{
//                         fontSize:
//                           '.75rem',
//                         letterSpacing:
//                           '.12em',
//                         textTransform:
//                           'uppercase',
//                       }}
//                     >
//                       {item.label}
//                     </p>

//                   </div>
//                 )
//               )}
//             </div>

//           </div>
//         </section>

//       </main>
//     </>
//   );
// }

// app/(user)/testimonials/[slug]/page.tsx

import type { Metadata } from 'next'
import Image from 'next/image'
import prisma from '../../../lib/prisma'

import PageHero from '../../../components/user/pageHero'
import { JsonLd } from '../../../components/seo/JsonLd'
import {
  Reveal,
  Stagger,
} from '../../../components/animations'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://tougharchitects.com'

export const metadata: Metadata = {
  title:
    'Client Testimonials | TOUGH Architects',

  description:
    'Read what homeowners, developers, and global brands say about working with TOUGH Architects.',

  alternates: {
    canonical:
      `${siteUrl}/testimonials`,
  },
}

async function getTestimonials() {

  return prisma.testimonial.findMany({
    where: {
      published: true,
    },

    orderBy: [
      {
        featured: 'desc',
      },
      {
        sortOrder: 'asc',
      },
      {
        createdAt: 'desc',
      },
    ],
  })
}

export default async function TestimonialsPage() {

  const testimonials =
    await getTestimonials()

  const schema = {
    '@context':
      'https://schema.org',

    '@type':
      'CollectionPage',

    name:
      'Client Testimonials',

    description:
      'Client reviews and experiences with TOUGH Architects.',
  }

  return (
    <>
      <JsonLd data={schema} />

      <main>

        <PageHero
          label="Client Stories"
          title="What Our Clients"
          titleAccent="Say"
          subtitle="Real stories from homeowners, developers, hospitality brands, and visionary partners worldwide."
          image="/images/banner/testimonial.png"
          imageAlt="TOUGH Architects clients"
          breadcrumbs={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label:
                'Testimonials',
            },
          ]}
        />

        <section className="section-dark py-28">

          <div className="container-wide">

            {/* heading */}
            <Reveal>

              <div className="text-center mb-16">

                <span className="section-label justify-center">
                  Trusted Worldwide
                </span>

                <h2 className="section-heading mt-3">

                  Experiences That
                  <span>
                    Matter
                  </span>

                </h2>

                <span className="gold-divider mx-auto" />

                <p className="mt-5 max-w-2xl mx-auto text-sm text-white/70">

                  Every space tells a story.
                  These are the voices of the people
                  who trusted us to shape theirs.

                </p>

              </div>

            </Reveal>

            {/* grid */}
            <Stagger className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {testimonials.map(
                (
                  item
                ) => (

                  <Reveal
                    key={
                      item.id
                    }
                  >

                    <article
                      className="card-surface h-full p-8 flex flex-col group hover:border-primary transition-all duration-500"
                    >

                      {/* stars */}
                      <div className="flex gap-1 mb-6">

                        {Array.from({
                          length:
                            item.rating,
                        }).map(
                          (
                            _,
                            i
                          ) => (

                            <svg
                              key={
                                i
                              }
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="var(--color-primary)"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>

                          )
                        )}

                      </div>

                      {/* quote */}
                      <blockquote
                        className="text-white/80 mb-8 flex-1"
                        style={{
                          fontSize: '.92rem',
                          lineHeight: '1.95',
                        }}
                      >
                        &ldquo;{item.content}&rdquo;
                      </blockquote>

                      <div className="mt-auto">

                        {/* client */}
                        <div className="flex items-center gap-4">

                          <div
                            className="relative w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0"
                            style={{
                              borderColor:
                                'var(--color-primary)',
                            }}
                          >

                            <Image
                              src={
                                item.avatar ||
                                '/images/about-office.png'
                              }
                              alt={item.name}
                              fill
                              className="object-cover"
                            />

                          </div>

                          <div>

                            <h3
                              className="text-white"
                              style={{
                                fontFamily:
                                  'var(--font-playfair)',
                                fontSize: '1rem',
                                fontWeight: 700,
                              }}
                            >
                              {item.name}
                            </h3>

                            <p
                              className="text-primary"
                              style={{
                                fontSize: '.7rem',
                                letterSpacing: '.14em',
                                textTransform: 'uppercase',
                              }}
                            >
                              {item.role}
                            </p>

                            {item.company && (
                              <p
                                className="text-white/50 mt-1"
                                style={{
                                  fontSize: '.7rem',
                                }}
                              >
                                {item.company}
                              </p>
                            )}

                          </div>

                        </div>


                        {/* featured */}
                        {item.featured && (

                          <div className="mt-6">

                            <span
                              className="inline-block px-3 py-1"
                              style={{
                                fontSize: '.65rem',
                                background:
                                  'rgba(200,169,110,.1)',
                                color:
                                  'var(--color-primary)',
                                letterSpacing: '.14em',
                                textTransform: 'uppercase',
                              }}
                            >
                              Featured
                            </span>

                          </div>

                        )}

                      </div>
                    </article>

                  </Reveal>

                )
              )}

            </Stagger>

          </div>

        </section>

      </main>
    </>
  )
}