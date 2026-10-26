import React from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Building2,
  Check,
  Handshake,
  Truck,
  Utensils,
} from "lucide-react"
import PageLayout from "@/components/layout/PageLayout"

const opportunities = [
  {
    slug: "franchise-inquiries",
    title: "Franchise Inquiries",
    shortDescription:
      "Bring Pet Pooja Point to your neighbourhood and build a local food destination.",
    description:
      "Interested in operating a Pet Pooja Point franchise? Tell us about your market, hospitality experience, and the kind of location you have in mind.",
    icon: Building2,
    accent: "amber",
    idealFor: [
      "Experienced food, hospitality, or retail operators",
      "Entrepreneurs with knowledge of their local market",
      "Teams interested in developing a customer-first dining experience",
    ],
    details: [
      {
        title: "Share your market",
        description:
          "Let us know which city or neighbourhood you are interested in and what makes it a good fit.",
      },
      {
        title: "Tell us about your experience",
        description:
          "Include your background in hospitality, operations, or business ownership.",
      },
      {
        title: "Discuss the opportunity",
        description:
          "Our team can review the information and discuss potential next steps with you.",
      },
    ],
  },
  {
    slug: "warehouse-partners",
    title: "Warehouse Partners",
    shortDescription:
      "Support dependable regional storage and fulfilment for food businesses.",
    description:
      "We are interested in connecting with warehouse operators who understand reliable inventory handling, local fulfilment, and food-safe operations.",
    icon: Boxes,
    accent: "blue",
    idealFor: [
      "Regional warehouse and fulfilment operators",
      "Facilities with organised receiving and dispatch processes",
      "Partners experienced in inventory accuracy and safe handling",
    ],
    details: [
      {
        title: "Facility information",
        description:
          "Share the location, approximate capacity, operating hours, and types of goods your facility can handle.",
      },
      {
        title: "Operating standards",
        description:
          "Describe your receiving, storage, stock rotation, and dispatch procedures.",
      },
      {
        title: "Coverage and capabilities",
        description:
          "Tell us the regions you serve and any relevant technology or fulfilment capabilities.",
      },
    ],
  },
  {
    slug: "delivery-partners",
    title: "Delivery Partners",
    shortDescription:
      "Help local restaurants get meals to customers with care and reliability.",
    description:
      "Whether you coordinate a delivery fleet or operate as a local logistics partner, share how you can support safe, dependable last-mile delivery.",
    icon: Truck,
    accent: "emerald",
    idealFor: [
      "Local delivery fleet operators",
      "Last-mile logistics providers",
      "Teams focused on timely, careful customer hand-offs",
    ],
    details: [
      {
        title: "Tell us where you operate",
        description:
          "List the cities and neighbourhoods your delivery team currently covers.",
      },
      {
        title: "Describe your delivery model",
        description:
          "Share your fleet size, operating hours, dispatch approach, and service capabilities.",
      },
      {
        title: "Show us your standards",
        description:
          "Explain how you support safe handling, clear communication, and reliable deliveries.",
      },
    ],
  },
  {
    slug: "brand-collaborations",
    title: "Brand Collaborations",
    shortDescription:
      "Create thoughtful food experiences and campaigns together.",
    description:
      "We welcome collaboration ideas from brands that share our interest in food, hospitality, and memorable local experiences.",
    icon: Handshake,
    accent: "rose",
    idealFor: [
      "Food and beverage brands",
      "Lifestyle and hospitality partners",
      "Creators and organisations with a clear collaboration idea",
    ],
    details: [
      {
        title: "Start with the idea",
        description:
          "Describe the campaign, experience, or product collaboration you have in mind.",
      },
      {
        title: "Tell us who it is for",
        description:
          "Share your intended audience, locations, timing, and what success could look like.",
      },
      {
        title: "Make the connection",
        description:
          "Include your brand background and the best way for a partnership conversation to continue.",
      },
    ],
  },
]

const accentClasses = {
  amber: {
    icon: "bg-amber-100 text-amber-800",
    border: "hover:border-amber-300",
    number: "text-amber-700",
    step: "bg-amber-50 text-amber-800",
  },
  blue: {
    icon: "bg-blue-100 text-blue-800",
    border: "hover:border-blue-300",
    number: "text-blue-700",
    step: "bg-blue-50 text-blue-800",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-800",
    border: "hover:border-emerald-300",
    number: "text-emerald-700",
    step: "bg-emerald-50 text-emerald-800",
  },
  rose: {
    icon: "bg-rose-100 text-rose-800",
    border: "hover:border-rose-300",
    number: "text-rose-700",
    step: "bg-rose-50 text-rose-800",
  },
}

function PartnershipIntro({ detail }) {
  const Icon = detail?.icon || Utensils

  return (
    <header className="border-b border-slate-200 pb-7 sm:pb-9">
      <Link
        to={detail ? "/partner-with-us" : "/"}
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {detail ? "All partnership opportunities" : "Back to home"}
      </Link>

      <div className="flex items-start gap-4">
        <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary">
            {detail ? "LET'S BUILD SOMETHING TOGETHER" : "PARTNER WITH US"}
          </p>
          <h1 className="mt-1 text-2xl font-medium font-poppins tracking-tight text-slate-900 sm:text-4xl">
            {detail ? detail.title : "Good things happen together."}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {detail
              ? detail.description
              : "Whether you are building a food business, connecting local communities, or creating a new brand experience, there may be a place for you here."}
          </p>
        </div>
      </div>
    </header>
  )
}

function PartnerOpportunityCard({ opportunity }) {
  const Icon = opportunity.icon
  const accent = accentClasses[opportunity.accent]

  return (
    <Link
      to={`/partners/${opportunity.slug}`}
      className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${accent.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent.icon}`}>
          <Icon className="h-6 w-6" />
        </span>
        <ArrowRight className="mt-1 h-4 w-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-primary" />
      </div>
      <h2 className="mt-5 text-lg font-medium font-poppins text-slate-900">
        {opportunity.title}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {opportunity.shortDescription}
      </p>
      <span className="mt-5 border-t border-slate-100 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-primary">
        Explore opportunity
      </span>
    </Link>
  )
}

function PartnershipLandingPage() {
  return (
    <PageLayout className="py-8 sm:py-12">
      <PartnershipIntro />

      <section className="mt-8">
        <div className="mb-5">
          <h2 className="text-xl font-medium font-poppins text-slate-900">
            Find your way to partner
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose the opportunity that best fits what you do.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {opportunities.map((opportunity) => (
            <PartnerOpportunityCard
              key={opportunity.slug}
              opportunity={opportunity}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Not sure where to start?
          </p>
          <h2 className="mt-1 text-lg font-medium font-poppins">
            Explore the opportunity that feels right.
          </h2>
        </div>
        <Link
          to="/help-faq"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          Visit Help & FAQ
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </PageLayout>
  )
}

function PartnershipDetailPage({ opportunity }) {
  const Icon = opportunity.icon
  const accent = accentClasses[opportunity.accent]

  return (
    <PageLayout className="py-8 sm:py-12">
      <PartnershipIntro detail={opportunity} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            The opportunity
          </p>
          <h2 className="mt-2 text-xl font-medium font-poppins text-slate-900 capitalize">
            A partnership built around your strengths.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 capitalize">
            {opportunity.description}
          </p>

          <h3 className="mt-7 text-sm font-semibold uppercase tracking-wider text-slate-800">
            This may be a good fit if you are
          </h3>
          <ul className="mt-4 space-y-3">
            {opportunity.idealFor.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600 capitalize">
                <Check className={`mt-1 h-4 w-4 shrink-0 ${accent.number}`} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent.icon}`}>
            <Icon className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-lg font-medium font-poppins text-slate-900">
            Start a conversation
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 capitalize">
            When you reach out, include your location, relevant experience, and
            a short description of the opportunity you have in mind.
          </p>
          <Link
            to="/help-faq"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Contact us through Help
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            What happens next
          </p>
          <h2 className="mt-2 text-xl font-medium font-poppins text-slate-900 capitalize">
            A clear path from introduction to discussion.
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {opportunity.details.map((step, index) => (
            <article key={step.title} className="rounded-xl bg-slate-50 p-4 capitalize">
              <span className={`font-mono text-xs font-semibold ${accent.number}`}>
                STEP 0{index + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              More ways to partner
            </p>
            <h2 className="mt-1 text-lg font-medium font-poppins text-slate-900 capitalize">
              Explore other opportunities
            </h2>
          </div>
          <Link
            to="/partner-with-us"
            className="hidden items-center gap-1 text-xs font-semibold text-primary hover:underline sm:inline-flex"
          >
            All opportunities
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {opportunities
            .filter((item) => item.slug !== opportunity.slug)
            .slice(0, 3)
            .map((item) => (
              <Link
                key={item.slug}
                to={`/partners/${item.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:border-primary hover:text-amber-800"
              >
                {item.title}
                <ArrowRight className="ml-2 inline h-3.5 w-3.5" />
              </Link>
            ))}
        </div>
      </section>
    </PageLayout>
  )
}

export function PartnershipPage() {
  const { partnerType } = useParams()
  const opportunity = opportunities.find((item) => item.slug === partnerType)

  if (!partnerType) return <PartnershipLandingPage />
  if (opportunity) return <PartnershipDetailPage opportunity={opportunity} />

  return (
    <PageLayout className="py-12">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <Handshake className="mx-auto h-10 w-10 text-slate-300" />
        <h1 className="mt-4 text-2xl font-medium font-poppins text-slate-900">
          Opportunity not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          This partnership page is not available.
        </p>
        <Link
          to="/partner-with-us"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          View all opportunities
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PageLayout>
  )
}

export default PartnershipPage
