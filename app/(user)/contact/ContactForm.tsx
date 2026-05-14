// 'use client'

// import Link from 'next/link'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Send, Loader2, Check } from 'lucide-react'
// import { z } from 'zod'

// import { contactSchema } from '../../../lib/validations'

// type ContactFormData = z.infer<typeof contactSchema>

// const subjects = [
//   'Residential Architecture',
//   'Commercial Architecture',
//   'Hospital / Healthcare Design',
//   'Industrial Complex',
//   'Institutional Building',
//   'Residential Interior Design',
//   'Corporate Interior Design',
//   'Cultural Complex',
//   'Other',
// ]

// export default function ContactForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitted, setSubmitted] = useState(false)

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ContactFormData>({
//     resolver: zodResolver(contactSchema),
//   })

//   async function onSubmit(data: ContactFormData) {
//     setIsSubmitting(true)

//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })

//       const result = await res.json()

//       if (!res.ok) {
//         throw new Error(result.message)
//       }

//       setSubmitted(true)
//       reset()
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (submitted) {
//     return (
//       <div className="text-center py-16">

//         <div
//           className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
//           style={{
//             border: '1px solid var(--color-primary)',
//           }}
//         >
//           <Check
//             size={32}
//             style={{
//               color: 'var(--color-primary)',
//             }}
//           />
//         </div>

//         <h3
//           style={{
//             fontFamily: 'var(--font-playfair)',
//             fontSize: '2rem',
//             color: 'var(--color-white)',
//           }}
//         >
//           Message Received
//         </h3>

//         <p
//           className="mt-4 max-w-md mx-auto"
//           style={{
//             color: 'var(--color-muted)',
//             lineHeight: 1.8,
//           }}
//         >
//           Thank you for reaching out. Our team will personally review
//           your enquiry and respond within 24 hours.
//         </p>

//         <button
//           onClick={() => setSubmitted(false)}
//           className="mt-8"
//           style={{
//             color: 'var(--color-primary)',
//             fontSize: '.9rem',
//           }}
//         >
//           Send another message
//         </button>

//       </div>
//     )
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       noValidate
//       className="space-y-6"
//     >

//       {/* Row 1 */}

//       <div className="grid md:grid-cols-2 gap-5">

//         <Field
//           label="Full Name"
//           error={errors.name?.message}
//         >
//           <input
//             {...register('name')}
//             placeholder="Enter your full name"
//             className="contact-input"
//           />
//         </Field>

//         <Field
//           label="Email Address"
//           error={errors.email?.message}
//         >
//           <input
//             {...register('email')}
//             placeholder="abc@example.com"
//             className="contact-input"
//           />
//         </Field>

//       </div>


//       {/* Phone */}

//       <Field
//         label="Phone Number"
//         error={errors.phone?.message}
//       >
//         <input
//           {...register('phone')}
//           placeholder="+91 00000 00000"
//           className="contact-input"
//         />
//       </Field>


//       {/* Subject */}

//       <Field
//         label="Project Type"
//         error={errors.subject?.message}
//       >
//         <select
//           id="subject"
//           className={`
//             form-input
//             bg-[var(--color-dark2)]
//             text-white
//             border-[var(--color-dark4)]
//             ${errors.subject ? "border-red-400" : ""}
//           `}
//           {...register("subject")}
//           defaultValue=""
//         >
//           <option
//             value=""
//             disabled
//             className="bg-black text-white"
//           >
//             Select a project type…
//           </option>

//           {subjects.map((s) => (
//             <option
//               key={s}
//               value={s}
//               className="bg-black text-white"
//             >
//               {s}
//             </option>
//           ))}
//         </select>
//       </Field>


//       {/* Message */}

//       <Field
//         label="Your Message"
//         error={errors.message?.message}
//       >
//         <textarea
//           {...register('message')}
//           rows={7}
//           placeholder="Tell us about your project..."
//           className="contact-input resize-none"
//         />
//       </Field>


//       {/* Privacy */}

//       <p
//         style={{
//           fontSize: '.78rem',
//           color: 'var(--color-muted)',
//           lineHeight: 1.7,
//         }}
//       >
//         By submitting this form you agree to our{' '}
//         <Link
//           href="/privacy-policy"
//           style={{
//             color: 'var(--color-primary)',
//           }}
//         >
//           Privacy Policy
//         </Link>
//         .
//       </p>


//       {/* Button */}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="btn-primary w-full inline-flex items-center justify-center gap-3"
//         style={{
//           minHeight: '60px',
//         }}
//       >

//         {isSubmitting ? (
//           <>
//             <Loader2
//               size={18}
//               className="animate-spin"
//             />
//             Sending...
//           </>
//         ) : (
//           <>
//             <span>Send Message</span>
//             <Send size={18} />
//           </>
//         )}

//       </button>

//     </form>
//   )
// }


// type FieldProps = {
//   label: string
//   error?: string
//   children: React.ReactNode
// }

// function Field({
//   label,
//   error,
//   children,
// }: FieldProps) {
//   return (
//     <div>

//       <label
//         className="block mb-3"
//         style={{
//           fontSize: '.75rem',
//           letterSpacing: '.12em',
//           textTransform: 'uppercase',
//           color: 'var(--color-muted)',
//           fontWeight: 700,
//         }}
//       >
//         {label}
//       </label>

//       {children}

//       {error && (
//         <p
//           className="mt-2"
//           style={{
//             color: '#dc2626',
//             fontSize: '.8rem',
//           }}
//         >
//           {error}
//         </p>
//       )}

//     </div>
//   )
// }


'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Send,
  Loader2,
  Check,
} from 'lucide-react'
import { z } from 'zod'

import { contactSchema } from '../../../lib/validations'
import { countries } from '../../../lib/countries'

type ContactFormData =
  z.infer<
    typeof contactSchema
  >

export default function ContactForm() {
  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false)

  const [
    submitted,
    setSubmitted,
  ] = useState(false)

  const [
    projectTypes,
    setProjectTypes,
  ] = useState<string[]>(
    []
  )

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {
      errors,
    },
  } =
    useForm<ContactFormData>(
      {
        resolver:
          zodResolver(
            contactSchema
          ),
        defaultValues: {
          countryCode: "+91",
        },
      }
    )

  useEffect(() => {
    async function loadTypes() {
      try {
        const res = await fetch(
          '/api/project-sub-categories'
        )

        if (!res.ok) {
          throw new Error(
            'Failed to load project types'
          )
        }

        const data = await res.json()

        setProjectTypes(
          data.map(
            (item: any) => item.name
          )
        )

      } catch (error) {
        console.error(error)
      }
    }

    loadTypes()
  }, [])

  async function onSubmit(
    data: ContactFormData
  ) {
    setIsSubmitting(
      true
    )
    const payload = {
      ...data,
      phone: `${data.countryCode}${data.phone}`,
    };
    try {
      const res =
        await fetch(
          '/api/contact',
          {
            method:
              'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        )

      const result =
        await res.json()

      if (
        !res.ok
      ) {
        throw new Error(
          result.message
        )
      }

      setSubmitted(
        true
      )

      reset()


    } catch (
    error
    ) {
      console.error(
        error
      )
    } finally {
      setIsSubmitting(
        false
      )
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">

        <div
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{
            border:
              '1px solid var(--color-primary)',
          }}
        >
          <Check
            size={
              32
            }
            style={{
              color:
                'var(--color-primary)',
            }}
          />
        </div>

        <h3
          style={{
            fontFamily:
              'var(--font-playfair)',

            fontSize:
              '2rem',

            color:
              'var(--color-white)',
          }}
        >
          Message
          Received
        </h3>

        <p
          className="mt-4 max-w-md mx-auto"
          style={{
            color:
              'var(--color-muted)',

            lineHeight:
              1.8,
          }}
        >
          Thank you
          for
          reaching
          out. Our
          team will
          personally
          review your
          enquiry and
          respond
          within 24
          hours.
        </p>

        <button
          onClick={() =>
            setSubmitted(
              false
            )
          }
          className="mt-8"
          style={{
            color:
              'var(--color-primary)',

            fontSize:
              '.9rem',
          }}
        >
          Send
          another
          message
        </button>

      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      noValidate
      className="space-y-6"
    >

      {/* row 1 */}

      <div className="grid md:grid-cols-2 gap-5">

        <Field
          label="Full Name"
          error={
            errors
              .name
              ?.message
          }
        >
          <input
            {...register(
              'name'
            )}
            placeholder="Enter your full name"
            className="contact-input"
          />
        </Field>

        <Field
          label="Email Address"
          error={
            errors
              .email
              ?.message
          }
        >
          <input
            {...register(
              'email'
            )}
            placeholder="abc@example.com"
            className="contact-input"
          />
        </Field>

      </div>


      {/* phone */}

      <Field
        label="Phone Number"
        error={
          errors
            .phone
            ?.message
        }
      >
        <div className="flex gap-2">
          <select
            className="form-input max-w-[101px]"
            {...register("countryCode")}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.dial_code}>
                {c.code} {c.dial_code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            {...register('phone')}
            placeholder="00000 00000"
            className="contact-input"
          />
        </div>
      </Field>


      {/* project type */}

      <Field
        label="Project Type"
        error={
          errors
            .subject
            ?.message
        }
      >
        <select
          {...register(
            'subject'
          )}
          defaultValue=""
          className="contact-input"
        >
          <option
            value=""
            disabled
            className="bg-black text-white"
          >
            Select
            project
            type
          </option>

          {projectTypes.map(
            (
              item
            ) => (
              <option
                key={
                  item
                }
                value={
                  item
                }
                className="bg-black text-white"
              >
                {
                  item
                }
              </option>
            )
          )}
        </select>
      </Field>


      {/* message */}

      <Field
        label="Your Message"
        error={
          errors
            .message
            ?.message
        }
      >
        <textarea
          {...register(
            'message'
          )}
          rows={
            7
          }
          placeholder="Tell us about your project..."
          className="contact-input resize-none"
        />
      </Field>


      {/* privacy */}

      <p
        style={{
          fontSize:
            '.78rem',

          color:
            'var(--color-muted)',

          lineHeight:
            1.7,
        }}
      >
        By
        submitting
        this form
        you agree
        to our{' '}

        <Link
          href="/privacy-policy"
          style={{
            color:
              'var(--color-primary)',
          }}
        >
          Privacy
          Policy
        </Link>

        .
      </p>


      {/* button */}

      <button
        type="submit"
        disabled={
          isSubmitting
        }
        className="btn-primary w-full inline-flex items-center justify-center gap-3"
        style={{
          minHeight:
            '60px',
        }}
      >

        {isSubmitting ? (
          <>
            <Loader2
              size={
                18
              }
              className="animate-spin"
            />

            Sending...
          </>
        ) : (
          <>
            <span>
              Send
              Message
            </span>

            <Send
              size={
                18
              }
            />
          </>
        )}

      </button>

    </form>
  )
}


type FieldProps = {
  label: string
  error?: string
  children: React.ReactNode
}

function Field({
  label,
  error,
  children,
}: FieldProps) {
  return (
    <div>

      <label
        className="block mb-3"
        style={{
          fontSize:
            '.75rem',

          letterSpacing:
            '.12em',

          textTransform:
            'uppercase',

          color:
            'var(--color-muted)',

          fontWeight:
            700,
        }}
      >
        {label}
      </label>

      {children}

      {error && (
        <p
          className="mt-2"
          style={{
            color:
              '#dc2626',

            fontSize:
              '.8rem',
          }}
        >
          {error}
        </p>
      )}

    </div>
  )
}