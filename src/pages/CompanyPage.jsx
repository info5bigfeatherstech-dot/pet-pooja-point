import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Download,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  Newspaper,
  ShoppingBag,
  ShieldAlert,
  Utensils,
} from "lucide-react"
import PageLayout from "@/components/layout/PageLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import logo from "@/assets/Pet Pooja Point.png"

const companyPages = {
  "who-we-are": {
    title: "A little more about us.",
    eyebrow: "WHO WE ARE",
    description:
      "Pet Pooja Point brings restaurant discovery, food ordering, and dining experiences together in one place.",
    icon: Utensils,
  },
  "blog-stories": {
    title: "Stories worth sharing.",
    eyebrow: "BLOG & STORIES",
    description:
      "A place for food inspiration, local discoveries, and the people who make memorable meals.",
    icon: Newspaper,
  },
  "work-with-us": {
    title: "Make something people love.",
    eyebrow: "WORK WITH US",
    description:
      "Help make it easier for people to find great food and for restaurants to reach their neighbourhoods.",
    icon: BriefcaseBusiness,
  },
  "investor-relations": {
    title: "Investor Relations",
    eyebrow: "BUILDING FOR THE LONG TERM",
    description:
      "Information for people interested in learning about Pet Pooja Point and its business.",
    icon: Building2,
  },
  "report-fraud": {
    title: "Help us protect the community.",
    eyebrow: "REPORT FRAUD",
    description:
      "Tell us about suspicious activity, a potentially fraudulent listing, or a message pretending to be from Pet Pooja Point.",
    icon: ShieldAlert,
  },
  "press-kit": {
    title: "The Pet Pooja Point press kit.",
    eyebrow: "PRESS & BRAND ASSETS",
    description:
      "Download our logo and find a few simple guidelines for writing about and representing our brand.",
    icon: Megaphone,
  },
  "contact-us": {
    title: "We’re listening.",
    eyebrow: "CONTACT US",
    description:
      "Have a question, an idea, or feedback? Choose a topic and send our team a message.",
    icon: Mail,
  },
}

const values = [
  {
    number: "01",
    title: "Good food brings people together",
    text: "We make it easier to discover the restaurants, meals, and neighbourhood favourites that make a day better.",
  },
  {
    number: "02",
    title: "Local businesses matter",
    text: "Restaurants are at the heart of the experience. Our goal is to help diners find them and connect with them.",
  },
  {
    number: "03",
    title: "Make the details feel easy",
    text: "From choosing a place to reviewing an order, the useful details should be clear and simple to find.",
  },
]

const stories = [
  {
    category: "Food & culture",
    title: "The joy of finding your neighbourhood favourite",
    description:
      "A great local meal does more than fill a table. It gives a neighbourhood a place to meet, celebrate, and return to.",
    readTime: "4 min read",
    number: "01",
    color: "from-orange-100 to-amber-50",
  },
  {
    category: "Behind the menu",
    title: "A closer look at the people behind every plate",
    description:
      "Every memorable menu has a story: the ingredients, the kitchen rituals, and the people who bring it all together.",
    readTime: "5 min read",
    number: "02",
    color: "from-rose-100 to-orange-50",
  },
  {
    category: "Eating well",
    title: "A small guide to choosing your next meal",
    description:
      "A few helpful cues—from cuisine and occasion to the people you’re sharing with—can make choosing dinner feel simple.",
    readTime: "3 min read",
    number: "03",
    color: "from-emerald-100 to-teal-50",
  },
]

const teams = [
  {
    title: "Restaurant partnerships",
    description:
      "Build strong relationships with restaurants and help them make the most of the platform.",
  },
  {
    title: "Customer experience",
    description:
      "Make every interaction thoughtful, clear, and genuinely helpful.",
  },
  {
    title: "Product & engineering",
    description:
      "Create reliable, easy-to-use experiences for diners and restaurant teams.",
  },
  {
    title: "Operations",
    description:
      "Help the many moving parts behind a smooth food and dining experience work together.",
  },
]

const contactTopics = [
  "General question",
  "Order support",
  "Restaurant partnership",
  "Press & media",
  "Careers",
  "Other",
]

function CompanyHeader({ page }) {
  const Icon = page.icon
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
        <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary">
            {page.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-medium font-poppins tracking-tight text-slate-900 sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {page.description}
          </p>
        </div>
      </div>
    </header>
  )
}

function WhoWeArePage() {
  return (
    <>
      <section className="mt-8 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:grid-cols-[1.1fr_0.9fr] sm:items-center sm:p-9">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Made for food lovers
          </p>
          <h2 className="mt-3 text-2xl font-medium font-poppins leading-snug text-slate-900">
            From a craving to a table worth remembering.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Pet Pooja Point is a food discovery and ordering experience designed
            to bring people closer to the restaurants around them. Find a new
            place, explore a menu, order a favourite, or plan a meal out—all in
            one place.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950"
          >
            Explore restaurants
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-amber-50 p-5 sm:col-span-2">
            <Utensils className="h-6 w-6 text-amber-700" />
            <h3 className="mt-4 font-medium text-slate-900">Discover</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Explore restaurants, cuisines, and local dining.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-50 p-5">
            <HeartHandshake className="h-6 w-6 text-rose-700" />
            <h3 className="mt-3 font-medium text-slate-900">Connect</h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Find the places and people behind the food.
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-5">
            <Check className="h-6 w-6 text-emerald-700" />
            <h3 className="mt-3 font-medium text-slate-900">Enjoy</h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Make your next meal easier to plan.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-9">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            What guides us
          </p>
          <h2 className="mt-1 text-xl font-medium font-poppins text-slate-900">
            A few things we believe.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.number}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <span className="font-mono text-xs text-primary">{value.number}</span>
              <h3 className="mt-3 text-base font-medium font-poppins text-slate-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Callout
        title="Good food is better together."
        description="Discover places nearby or find out how to partner with us."
        link="/partner-with-us"
        linkLabel="Explore partnerships"
      />
    </>
  )
}

function BlogStoriesPage() {
  return (
    <section className="mt-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            From our table
          </p>
          <h2 className="mt-1 text-xl font-medium font-poppins text-slate-900">
            Food, people, and places.
          </h2>
        </div>
        <span className="hidden text-xs text-slate-400 sm:inline">
          Notes from the Pet Pooja Point team
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story) => (
          <article
            key={story.number}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className={`relative flex h-40 items-end bg-gradient-to-br ${story.color} p-5`}>
              <span className="font-poppins text-6xl font-semibold leading-none text-slate-900/10">
                {story.number}
              </span>
              <span className="absolute bottom-4 left-5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur">
                {story.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium font-poppins leading-snug text-slate-900">
                {story.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {story.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>{story.readTime}</span>
                <span className="inline-flex items-center gap-1 font-medium text-amber-800">
                  Editorial preview
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        These are editorial previews. More stories will be added here.
      </p>
    </section>
  )
}

function WorkWithUsPage() {
  return (
    <>
      <section className="mt-8 rounded-3xl bg-slate-900 p-6 text-white sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Bring your point of view
        </p>
        <h2 className="mt-2 max-w-2xl text-2xl font-medium font-poppins sm:text-3xl">
          Help shape a better way to discover and enjoy food.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          We’re interested in thoughtful people who enjoy solving real problems
          for diners, restaurants, and local communities.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-medium font-poppins text-slate-900">
          Meet the kinds of teams you could work with
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {teams.map((team) => (
            <article
              key={team.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <BriefcaseBusiness className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-medium text-slate-900">{team.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {team.description}
              </p>
            </article>
          ))}
        </div>
      </section>
      <Callout
        title="Interested in joining us?"
        description="Send a short introduction and tell us which team or kind of work interests you."
        link="/about/contact-us"
        linkLabel="Get in touch"
      />
    </>
  )
}

function InvestorRelationsPage() {
  const topics = [
    {
      number: "01",
      title: "About the business",
      text: "Learn about our focus on restaurant discovery, food ordering, and dining experiences.",
    },
    {
      number: "02",
      title: "Company information",
      text: "Contact our team for general company information and business-related questions.",
    },
    {
      number: "03",
      title: "Media enquiries",
      text: "For interviews, company background, or media materials, visit our Press Kit or contact us.",
    },
  ]

  return (
    <>
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-medium font-poppins text-slate-900">
              Company information
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              Pet Pooja Point is focused on helping people discover restaurants
              and making food and dining experiences easier to explore. For
              company or investor-related questions, please contact us with
              your organisation and the information you are looking for.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {topics.map((topic) => (
          <article
            key={topic.number}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <span className="font-mono text-xs text-blue-700">{topic.number}</span>
            <h3 className="mt-3 font-medium text-slate-900">{topic.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{topic.text}</p>
          </article>
        ))}
      </section>
      <Callout
        title="Have an investor relations enquiry?"
        description="Send us your organisation, contact information, and a brief note about your request."
        link="/about/contact-us"
        linkLabel="Contact our team"
      />
    </>
  )
}

function ReportFraudPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <>
      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <form
          onSubmit={handleSubmit}
          onChange={() => setSubmitted(false)}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
        >
          <div>
            <h2 className="text-lg font-medium font-poppins text-slate-900">
              Tell us what happened
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Include enough detail for the team to understand your concern.
            </p>
          </div>
          <FormField label="What are you reporting?" htmlFor="fraud-type">
            <select
              id="fraud-type"
              name="type"
              required
              defaultValue=""
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>Select a concern</option>
              <option>Suspicious message or impersonation</option>
              <option>Potentially fraudulent restaurant listing</option>
              <option>Unexpected account or order activity</option>
              <option>Other suspected fraud</option>
            </select>
          </FormField>
          <FormField label="Order number or reference (optional)" htmlFor="fraud-reference">
            <Input
              id="fraud-reference"
              name="reference"
              placeholder="For example, your order number"
              className="h-11 rounded-xl"
            />
          </FormField>
          <FormField label="What happened?" htmlFor="fraud-description">
            <Textarea
              id="fraud-description"
              name="description"
              required
              minLength={10}
              placeholder="Describe what you noticed and when it happened."
              className="min-h-32 resize-y rounded-xl"
            />
          </FormField>
          <FormField label="Your email (optional)" htmlFor="fraud-email">
            <Input
              id="fraud-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-11 rounded-xl"
            />
          </FormField>
          <Button type="submit" className="rounded-xl">
            Submit report
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {submitted && (
            <p role="status" className="text-sm text-amber-800">
              This report form is a preview and is not connected to a reporting
              service yet. No report was sent.
            </p>
          )}
        </form>

        <aside className="h-fit rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <ShieldAlert className="h-6 w-6 text-rose-700" />
          <h2 className="mt-4 font-medium font-poppins text-slate-900">
            Keep your account safe
          </h2>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
            <li>Never share a password or one-time sign-in code.</li>
            <li>Do not include full card numbers or bank credentials in this form.</li>
            <li>Keep relevant order numbers or message details for reference.</li>
          </ul>
          <Link
            to="/security-trust"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-800"
          >
            Security tips
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </section>
    </>
  )
}

function PressKitPage() {
  return (
    <>
      <section className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            About the brand
          </p>
          <h2 className="mt-2 text-xl font-medium font-poppins text-slate-900">
            Pet Pooja Point helps people find their next favourite meal.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The platform brings restaurant discovery, food ordering, and dining
            experiences together. This page provides the current logo asset
            and a few helpful brand-use notes.
          </p>
          <h3 className="mt-6 font-medium text-slate-900">A few brand basics</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>Use the supplied logo artwork without stretching or recolouring it.</li>
            <li>Leave clear space around the logo so it remains easy to recognise.</li>
            <li>Use “Pet Pooja Point” when referring to the brand in copy.</li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex h-52 w-full items-center justify-center rounded-xl bg-white p-4">
            <img
              src={logo}
              alt="Pet Pooja Point logo"
              className="h-full w-full object-contain"
            />
          </div>
          <a
            href={logo}
            download="pet-pooja-point-logo.png"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Download logo
          </a>
          <p className="mt-2 text-center text-[11px] text-slate-500">
            PNG image · Please preserve the original artwork.
          </p>
        </div>
      </section>
      <Callout
        title="Need something else for a story?"
        description="For interview requests or additional information, send the press team a note."
        link="/about/contact-us"
        linkLabel="Press & media contact"
      />
    </>
  )
}

function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form
        onSubmit={handleSubmit}
        onChange={() => setSubmitted(false)}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
      >
        <div>
          <h2 className="text-lg font-medium font-poppins text-slate-900">
            Send us a message
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose a topic and tell us how we can help.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Your name" htmlFor="contact-name">
            <Input
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              className="h-11 rounded-xl"
            />
          </FormField>
          <FormField label="Email address" htmlFor="contact-email">
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="h-11 rounded-xl"
            />
          </FormField>
        </div>
        <FormField label="What is this about?" htmlFor="contact-topic">
          <select
            id="contact-topic"
            name="topic"
            required
            defaultValue=""
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>Select a topic</option>
            {contactTopics.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Message" htmlFor="contact-message">
          <Textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            placeholder="Tell us a little more..."
            className="min-h-36 resize-y rounded-xl"
          />
        </FormField>
        <Button type="submit" className="rounded-xl">
          Send message
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        {submitted && (
          <p role="status" className="text-sm text-amber-800">
            This contact form is a preview and is not connected to a messaging
            service yet. Your message was not sent.
          </p>
        )}
      </form>

      <aside className="space-y-4">
        <div className="rounded-2xl bg-amber-50 p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-800 shadow-sm">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-medium font-poppins text-slate-900">
            Need help with an order?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 capitalize">
            Your order details include status, items, delivery address, and bill.
          </p>
          <Link
            to="/profile/orders"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900"
          >
            Go to My Orders
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-medium font-poppins text-slate-900">
            Looking to partner?
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600 capitalize">
            Explore franchise, warehouse, delivery, and brand opportunities.
          </p>
          <Link
            to="/partner-with-us"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700"
          >
            Partner with us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </section>
  )
}

function FormField({ label, htmlFor, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  )
}

function Callout({ title, description, link, linkLabel }) {
  return (
    <section className="mt-8 flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div>
        <h2 className="font-medium font-poppins">{title}</h2>
        <p className="mt-1 text-sm text-white/65">{description}</p>
      </div>
      <Link
        to={link}
        className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:text-amber-300"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function CompanyPage() {
  const { pageKey } = useParams()
  const page = companyPages[pageKey]

  if (!page) {
    return (
      <PageLayout className="py-12">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-medium font-poppins text-slate-900">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            This company information page is not available.
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

  let content
  switch (pageKey) {
    case "who-we-are":
      content = <WhoWeArePage />
      break
    case "blog-stories":
      content = <BlogStoriesPage />
      break
    case "work-with-us":
      content = <WorkWithUsPage />
      break
    case "investor-relations":
      content = <InvestorRelationsPage />
      break
    case "report-fraud":
      content = <ReportFraudPage />
      break
    case "press-kit":
      content = <PressKitPage />
      break
    case "contact-us":
      content = <ContactUsPage />
      break
    default:
      content = null
  }

  return (
    <PageLayout className="py-8 sm:py-12">
      <CompanyHeader page={page} />
      {content}
    </PageLayout>
  )
}

export default CompanyPage
