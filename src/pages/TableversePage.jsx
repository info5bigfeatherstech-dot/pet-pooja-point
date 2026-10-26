import React from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChefHat,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Utensils,
} from "lucide-react"
import PageLayout from "@/components/layout/PageLayout"

const tableversePages = {
  "pet-pooja-point-pro": {
    eyebrow: "FOR RESTAURANT TEAMS",
    title: "Your restaurant, ready for more.",
    description:
      "Pet Pooja Point Pro is a restaurant-focused concept for presenting your menu, sharing what makes your place special, and reaching more local diners.",
    icon: Store,
    theme: "amber",
    introTitle: "A better way to show up for hungry guests.",
    intro:
      "Give diners the useful details they need to discover your restaurant—from what is on the menu to where you are and when you are open.",
    benefits: [
      {
        icon: Utensils,
        title: "Put your menu in view",
        text: "Help guests discover your dishes, cuisines, and restaurant details.",
      },
      {
        icon: MapPin,
        title: "Be easier to find",
        text: "Show up in local restaurant discovery with your location and specialties.",
      },
      {
        icon: Heart,
        title: "Build guest connections",
        text: "Give new and returning guests a clear place to learn about your restaurant.",
      },
    ],
    steps: [
      ["Tell us about your restaurant", "Share your location, cuisine, and the best way to reach you."],
      ["Prepare your details", "Have your current menu, hours, and restaurant photos ready."],
      ["Start a conversation", "Contact our team to discuss restaurant partnership options."],
    ],
    cta: "Explore restaurant partnerships",
    href: "/partner-with-us",
  },
  "dine-in-pass": {
    eyebrow: "MAKE A MEAL OF IT",
    title: "A reason to go out tonight.",
    description:
      "Pet Pooja Point Dine-in Pass is a concept for discovering dine-in experiences, restaurant offers, and places worth gathering around.",
    icon: Utensils,
    theme: "rose",
    introTitle: "Find the right place for the occasion.",
    intro:
      "From a casual catch-up to a special celebration, explore local dining options and see the details that help you decide where to go.",
    benefits: [
      {
        icon: MapPin,
        title: "Explore nearby tables",
        text: "Browse dining spots by area and the kind of meal you have in mind.",
      },
      {
        icon: Sparkles,
        title: "Discover dining offers",
        text: "Keep an eye out for experiences and offers shared by restaurants.",
      },
      {
        icon: Users,
        title: "Plan to meet",
        text: "Find a place for date night, a family dinner, or a get-together with friends.",
      },
    ],
    steps: [
      ["Choose your occasion", "Think about the cuisine, location, and people joining you."],
      ["Explore restaurants", "Compare restaurant details, menus, and available offers."],
      ["Confirm with the restaurant", "Check the restaurant's current availability before you visit."],
    ],
    cta: "Browse restaurants",
    href: "/#restaurants-grid",
  },
  kitchens: {
    eyebrow: "MADE FOR FOOD BUSINESSES",
    title: "Good food starts behind the scenes.",
    description:
      "Pet Pooja Point Kitchens is a concept for helping food businesses bring their menus and kitchen operations closer to the diners they serve.",
    icon: ChefHat,
    theme: "orange",
    introTitle: "Built around the people who make the food.",
    intro:
      "A food business needs clear menus, dependable operations, and ways for customers to discover what is cooking. This space brings those ideas together.",
    benefits: [
      {
        icon: ChefHat,
        title: "Showcase your dishes",
        text: "Present the food, menu, and cuisine your kitchen is known for.",
      },
      {
        icon: Clock3,
        title: "Keep information clear",
        text: "Help diners understand availability and what to expect from an order.",
      },
      {
        icon: Store,
        title: "Grow your local reach",
        text: "Connect your kitchen with people looking for their next meal.",
      },
    ],
    steps: [
      ["Introduce your kitchen", "Tell us about your concept, menu, and service area."],
      ["Share your capabilities", "Let us know how you prepare, package, and fulfil orders."],
      ["Discuss a fit", "Our partnership team can explore the next steps with you."],
    ],
    cta: "Talk about a partnership",
    href: "/partner-with-us",
  },
  "hygiene-ratings": {
    eyebrow: "MAKE AN INFORMED CHOICE",
    title: "Confidence is part of every order.",
    description:
      "Hygiene Ratings is a concept for making restaurant food-safety information easier to understand while choosing where to eat.",
    icon: ShieldCheck,
    theme: "emerald",
    introTitle: "Clear information helps everyone.",
    intro:
      "Restaurant standards matter. We believe diners should be able to make informed choices, and restaurant teams should have clear ways to share relevant information.",
    benefits: [
      {
        icon: ShieldCheck,
        title: "Know what to look for",
        text: "Understand the hygiene and food-safety details shared by restaurants.",
      },
      {
        icon: Check,
        title: "Use trusted information",
        text: "Look for clear, current details rather than relying on guesswork.",
      },
      {
        icon: Leaf,
        title: "Support good practices",
        text: "Recognise the care and attention that goes into handling food safely.",
      },
    ],
    steps: [
      ["Review restaurant information", "Check the details available on a restaurant's listing."],
      ["Ask when you need clarity", "Contact the restaurant directly about specific dietary or safety concerns."],
      ["Share a concern responsibly", "Use the report page if you find information that appears misleading."],
    ],
    cta: "Report a concern",
    href: "/about/report-fraud",
  },
  "culinary-events": {
    eyebrow: "BRING PEOPLE TO THE TABLE",
    title: "Make room for something delicious.",
    description:
      "Culinary Events is a concept for discovering food-led gatherings, restaurant experiences, and the local people bringing them to life.",
    icon: CalendarDays,
    theme: "blue",
    introTitle: "More than a meal on the calendar.",
    intro:
      "From tasting menus to neighbourhood food festivals, culinary experiences can turn an ordinary evening into a story worth sharing.",
    benefits: [
      {
        icon: CalendarDays,
        title: "Discover what's happening",
        text: "Find food-focused experiences and special restaurant occasions.",
      },
      {
        icon: Users,
        title: "Bring your people",
        text: "Explore ideas for a group dinner, celebration, or a new shared experience.",
      },
      {
        icon: Sparkles,
        title: "Meet local makers",
        text: "Celebrate the chefs, restaurants, and food communities behind each event.",
      },
    ],
    steps: [
      ["Find an experience", "Explore local restaurants and food experiences in your area."],
      ["Check event details", "Confirm timing, availability, and any booking requirements."],
      ["Join the table", "Contact the organiser or restaurant to confirm your plans."],
    ],
    cta: "Explore dining",
    href: "/#restaurants-grid",
  },
}

const themeClasses = {
  amber: {
    icon: "bg-amber-100 text-amber-800",
    accent: "text-amber-800",
    iconSmall: "bg-amber-50 text-amber-800",
  },
  rose: {
    icon: "bg-rose-100 text-rose-800",
    accent: "text-rose-800",
    iconSmall: "bg-rose-50 text-rose-800",
  },
  orange: {
    icon: "bg-orange-100 text-orange-800",
    accent: "text-orange-800",
    iconSmall: "bg-orange-50 text-orange-800",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-800",
    accent: "text-emerald-800",
    iconSmall: "bg-emerald-50 text-emerald-800",
  },
  blue: {
    icon: "bg-blue-100 text-blue-800",
    accent: "text-blue-800",
    iconSmall: "bg-blue-50 text-blue-800",
  },
}

function TableverseHeader({ page }) {
  const Icon = page.icon
  const theme = themeClasses[page.theme]

  return (
    <header className="border-b border-slate-200 pb-7 sm:pb-9">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
      <div className="flex items-start gap-4">
        <span className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${theme.icon}`}>
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className={`text-xs font-semibold tracking-[0.16em] ${theme.accent}`}>
            {page.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-medium font-poppins tracking-tight text-slate-900 sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base capitalize">
            {page.description}
          </p>
        </div>
      </div>
    </header>
  )
}

function TableverseFeaturePage({ page }) {
  const theme = themeClasses[page.theme]

  return (
    <PageLayout className="py-8 sm:py-12">
      <TableverseHeader page={page} />

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-9">
        <p className={`text-xs font-semibold uppercase tracking-widest ${theme.accent}`}>
          The idea
        </p>
        <h2 className="mt-2 text-xl font-medium font-poppins text-slate-900 sm:text-2xl capitalize">
          {page.introTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          {page.intro}
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {page.benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <article
                key={benefit.title}
                className="rounded-2xl bg-slate-50 p-5"
              >
                <span className={`flex h-10 w-10 items-center justify-center capitalize rounded-xl ${theme.iconSmall}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-medium text-slate-900 capitalize">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600 capitalize">
                  {benefit.text}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5">
          <p className={`text-xs font-semibold uppercase tracking-widest ${theme.accent}`}>
            Get started
          </p>
          <h2 className="mt-1 text-xl font-medium font-poppins text-slate-900 capitalize sm:text-2xl">
            A few useful next steps.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {page.steps.map(([title, description], index) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 capitalize transition-colors hover:border-slate-300"
            >
              <span className={`font-mono text-xs font-semibold ${theme.accent}`}>
                STEP 0{index + 1}
              </span>
              <h3 className="mt-3 font-medium text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Explore Pet Pooja Point
          </p>
          <h2 className="mt-1 text-lg font-medium font-poppins">
            Ready for your next step?
          </h2>
          <p className="mt-1 text-sm text-white/65">
            {page.cta}
          </p>
        </div>
        <Link
          to={page.href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
        >
          {page.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </PageLayout>
  )
}

export function TableversePage() {
  const { pageKey } = useParams()
  const page = tableversePages[pageKey]

  if (!page) {
    return (
      <PageLayout className="py-12">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-medium font-poppins text-slate-900">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            This Tableverse page is not available.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </PageLayout>
    )
  }

  return <TableverseFeaturePage page={page} />
}

export default TableversePage
