import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";

import ContactForm from "./ContactForm";
import PageHero from "../../../components/user/pageHero";
import {
  HoverCard,
  Reveal,
  Stagger,
} from "../../../components/animations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tougharchitects.com";

export const metadata: Metadata = {
  title: "Contact Us — TOUGH Architects",
  description:
    "Get in touch with TOUGH Architects to discuss your residential, commercial, interior, or institutional design project. Based in Surat, Gujarat, India.",
  keywords: [
    "contact architect India",
    "hire architect Surat",
    "architecture firm contact",
    "interior design enquiry",
    "project consultation architect",
    "TOUGH Architects contact",
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact TOUGH Architects",
    description:
      "Start a conversation about your project. Our team replies within 24 hours.",
    url: `${siteUrl}/contact`,
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TOUGH Architects",
    description: "Reach out to discuss your architecture or interior design project.",
  },
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Studio Address",
    lines: ["123 Design District", "Surat, Gujarat 395001"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+91 98765 43210", "+91 97654 32109"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["info@tougharchitects.com"],
  },
  {
    icon: Clock,
    label: "Studio Hours",
    lines: ["Mon–Sat : 10AM–7PM"],
  },
];

const projectTypes = [
  "Private Villas",
  "Housing",
  "Commercial",
  "Hospitality",
  "Healthcare",
  "Industrial",
  "Institutional",
  "Retail",
  "Interior",
  "Corporate",
  "Mixed Use",
  "Cultural",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's Build"
        titleAccent="Something Extraordinary"
        subtitle="Every meaningful building begins with a conversation."
        image="/images/about-office.png"
        imageAlt="TOUGH Architects"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <main>

        {/* CONTACT */}
        <section
          className="section-dark "
          style={{ padding: "var(--section-py) 0" }}
        >
          <div className="container-wide">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

              {/* LEFT */}
              <div className="lg:col-span-2">

                <Reveal>
                  <span className="section-label">
                    Get In Touch
                  </span>

                  <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
                    Start The <span>Conversation</span>
                  </h2>

                  <span className="gold-divider" />

                  <p
                    className="mt-6"
                    style={{
                      fontSize: ".9rem",
                      lineHeight: "1.9",
                    }}
                  >
                    Tell us about your project,
                    ambitions, timeline and goals.
                  </p>
                </Reveal>

                {/* INFO CARDS */}
                <Stagger className="space-y-4 mt-8 sm:mt-10">

                  {contactDetails.map((item) => (
                    <HoverCard key={item.label}>

                      <div className="card-surface p-4 sm:p-5 flex gap-4">

                        <item.icon
                          size={18}
                          style={{
                            color:
                              "var(--color-primary)",
                            flexShrink: 0,
                          }}
                        />

                        <div>
                          <p
                            style={{
                              fontSize: ".65rem",
                              letterSpacing: ".15em",
                              textTransform:
                                "uppercase",
                              color:
                                "var(--color-primary)",
                              marginBottom:
                                ".5rem",
                            }}
                          >
                            {item.label}
                          </p>

                          {item.lines.map((line) => (
                            <p
                              key={line}
                              style={{
                                fontSize: ".82rem",
                                color:
                                  "var(--color-muted)",
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>

                      </div>

                    </HoverCard>
                  ))}

                </Stagger>

                {/* SOCIAL */}
                <Reveal delay={0.3}>
                  <div className="flex gap-3 mt-8 flex-wrap">

                    {[Instagram, Linkedin, Facebook].map(
                      (Icon, i) => (
                        <HoverCard key={i}>
                          <a
                            href="/"
                            className="w-10 h-10 flex items-center justify-center border"
                            style={{
                              borderColor:
                                "rgba(200,169,110,.25)",
                              color:
                                "var(--color-primary)",
                            }}
                          >
                            <Icon size={16} />
                          </a>
                        </HoverCard>
                      )
                    )}

                  </div>
                </Reveal>

                {/* MAP */}
                <Reveal delay={0.4}>
                  <div
                    className="mt-8 sm:mt-10 overflow-hidden w-full"
                    style={{
                      aspectRatio: "1/1",
                      border:
                        "1px solid var(--color-dark4)",
                      minHeight: "280px",
                    }}
                  >

                    <iframe
                      title="Map"
                      src="https://maps.google.com/maps?q=Surat,Gujarat,India&z=14&output=embed"
                      className="w-full h-full"
                    />

                  </div>
                </Reveal>

              </div>

              {/* FORM */}
              <div className="lg:col-span-3">

                <Reveal delay={0.1}>

                  <div
                    className="card-surface p-6 sm:p-8 lg:p-12"
                  >
                    <span className="section-label">
                      Project Enquiry
                    </span>

                    <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
                      Send Us A <span>Message</span>
                    </h2>

                    <span className="gold-divider" />

                    <p
                      className="mt-5 mb-8 sm:mb-10"
                      style={{
                        fontSize: ".85rem",
                      }}
                    >
                      Our team replies within
                      24 hours.
                    </p>

                    <ContactForm />

                  </div>

                </Reveal>

              </div>

            </div>

          </div>
        </section>

        {/* PROJECT TYPES */}
        <section
          className="section-dark2"
          style={{
            padding: "5rem 0",
            borderTop:
              "1px solid var(--color-dark4)",
          }}
        >
          <div className="container-wide">

            <Reveal>
              <div className="text-center mb-10 sm:mb-12">

                <span className="section-label justify-center">
                  Our Expertise
                </span>

                <h2 className="section-heading text-3xl sm:text-4xl">
                  We Design Across
                  <span> Every Sector</span>
                </h2>

                <span className="gold-divider mx-auto" />

              </div>
            </Reveal>

            <Stagger
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-px bg-[var(--color-dark4)]"
            >

              {projectTypes.map((item) => (
                <HoverCard key={item}>

                  <div className="service-card text-center py-6 sm:py-8 px-3 sm:px-4">

                    <p
                      style={{
                        fontSize: ".75rem",
                        fontWeight: 600,
                        letterSpacing: ".08em",
                      }}
                    >
                      {item}
                    </p>

                  </div>

                </HoverCard>
              ))}

            </Stagger>

          </div>
        </section>
      </main>
    </>
  );
}