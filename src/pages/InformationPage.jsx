import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Cookie,
  FileText,
  Fingerprint,
  HelpCircle,
  Home,
  LockKeyhole,
  Map,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react"
import PageLayout from "@/components/layout/PageLayout"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const pageInfo = {
  "/privacy-policy": {
    title: "Privacy, made clear.",
    eyebrow: "YOUR DATA, YOUR CHOICES",
    description:
      "A straightforward guide to the information used when you explore, order, and manage your Pet Pooja Point account.",
    icon: Fingerprint,
  },
  "/terms-of-service": {
    title: "Good food. Clear terms.",
    eyebrow: "TERMS OF SERVICE",
    description:
      "The simple ground rules for using Pet Pooja Point, placing an order, and enjoying the service.",
    icon: FileText,
  },
}

const policyContent = {
  "/privacy-policy": {
    updated: "26 October 2026",
    sections: [
      {
        id: "information",
        title: "Information you share",
        summary: "Details you provide to use the service.",
        body: "When you create or use an account, you may provide your name, phone number, email address, delivery addresses, and order details. You can choose what to add to your profile; a delivery address and contact details are needed to fulfil a delivery order.",
        bullets: [
          "Profile and contact details you choose to save.",
          "Restaurant, menu, and order choices needed to handle a purchase.",
          "Messages and information you send to customer support.",
        ],
      },
      {
        id: "use",
        title: "How information is used",
        summary: "Only to run the features you use.",
        body: "We use information to keep your account working, send orders to the selected restaurant, coordinate delivery, show your order history, and respond when you ask for help. We may also use it to maintain and improve the service.",
      },
      {
        id: "sharing",
        title: "When information is shared",
        summary: "Only what is needed to complete a request.",
        body: "Order details and delivery contact information are shared with the restaurant and delivery providers involved in fulfilling your order. Information may also be disclosed when required by law. We do not sell your personal information.",
      },
      {
        id: "storage",
        title: "Storage and security",
        summary: "We work to protect the information we handle.",
        body: "We use appropriate safeguards for information handled by the service and retain it for as long as needed to provide features, resolve issues, and meet applicable obligations. No online service can promise absolute security.",
      },
      {
        id: "choices",
        title: "Your choices",
        summary: "Review and manage your account information.",
        body: "You can review your profile and saved addresses in Account. You may update or remove saved information there. Optional browser preferences can be changed at any time from Cookie Settings.",
        links: [
          { label: "Manage your profile", to: "/profile/details" },
          { label: "Manage saved addresses", to: "/profile/addresses" },
          { label: "Cookie settings", to: "/cookie-settings" },
        ],
      },
      {
        id: "contact",
        title: "Questions about privacy",
        summary: "We are here to help.",
        body: "For a question about this notice or the information associated with your account, visit Help & FAQ and include enough detail for us to understand your request.",
        links: [{ label: "Visit Help & FAQ", to: "/help-faq" }],
      },
    ],
  },
  "/terms-of-service": {
    updated: "26 October 2026",
    sections: [
      {
        id: "using",
        title: "Using Pet Pooja Point",
        summary: "Use the service responsibly.",
        body: "You agree to provide accurate information when creating an account or placing an order, keep your account access secure, and use Pet Pooja Point only for lawful purposes. You are responsible for activity carried out through your account.",
      },
      {
        id: "restaurants",
        title: "Restaurants, menus and prices",
        summary: "Details may change as restaurants update their menus.",
        body: "Restaurant descriptions, menus, prices, offers, opening hours, and delivery estimates are provided for convenience and may change. Availability is confirmed when an order is accepted; displayed estimates are not guaranteed arrival times.",
      },
      {
        id: "orders",
        title: "Placing an order",
        summary: "Check your order before confirming.",
        body: "Before you place an order, review the restaurant, items, delivery address, instructions, payment method, and total. Once accepted, changes or cancellation may not be possible. Contact support promptly if something is wrong.",
        links: [{ label: "View your orders", to: "/profile/orders" }],
      },
      {
        id: "payment",
        title: "Payments, cancellations and refunds",
        summary: "The checkout summary shows the amount due.",
        body: "You authorize the payment method selected at checkout for the displayed total. If an order is cancelled or has a problem, any refund or adjustment depends on the order status and the circumstances. Contact support with your order number for help.",
        links: [{ label: "Get help with an order", to: "/help-faq" }],
      },
      {
        id: "content",
        title: "Reviews and other content",
        summary: "Keep shared content useful and respectful.",
        body: "If the service lets you submit a review or other content, make sure it reflects your experience and does not contain unlawful, abusive, misleading, or private information about another person.",
      },
      {
        id: "changes",
        title: "Changes to these terms",
        summary: "We will update this page when terms change.",
        body: "We may revise these terms as the service evolves. The updated date at the top of this page indicates the latest revision. If you continue using the service after an update, the revised terms apply to future use.",
      },
    ],
  },
}

const securityGuides = [
  {
    number: "01",
    title: "Keep your account yours",
    text: "Use a strong, unique password wherever one is required. Never share a sign-in code, and sign out when using a shared device.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "Pause before you pay",
    text: "Check the restaurant, delivery address, items, and final amount at checkout before confirming an order.",
    icon: ShoppingBag,
  },
  {
    number: "03",
    title: "Use trusted payment steps",
    text: "Only enter payment details in the checkout flow. Support will never need your password, one-time code, or full card details.",
    icon: LockKeyhole,
  },
]

const faqItems = [
  {
    category: "Orders & delivery",
    question: "Where can I see my order status?",
    answer:
      "Open Profile, choose My Orders, then select View details on an order. You will find its status, items, delivery address, payment information, and bill there.",
  },
  {
    category: "Orders & delivery",
    question: "Can I change an order after placing it?",
    answer:
      "Restaurants may start preparing an order as soon as they accept it, so changes are not always possible. Open the order details and contact support as soon as you can.",
  },
  {
    category: "Orders & delivery",
    question: "How do I order the same meal again?",
    answer:
      "Choose Reorder on the order card in My Orders. If your cart already has items, the app asks you to confirm before replacing them.",
  },
  {
    category: "Account & addresses",
    question: "How do I update my profile?",
    answer:
      "Go to Profile Details to review and update the information saved to your account.",
  },
  {
    category: "Account & addresses",
    question: "How do I add or change a delivery address?",
    answer:
      "Open Saved Addresses in your profile. You can add a location, edit an existing address, or set a default.",
  },
  {
    category: "Payments & privacy",
    question: "Where can I check what I was charged?",
    answer:
      "Open an order from My Orders and review the Bill Details section for the item total, fees, tax, discount, and total.",
  },
  {
    category: "Payments & privacy",
    question: "How can I change optional cookie preferences?",
    answer:
      "Visit Cookie Settings from the footer, choose your optional preferences, and save them on this device.",
  },
]

const sitemapGroups = [
  {
    title: "Explore",
    description: "Find a new favourite and see what's on the menu.",
    icon: Home,
    links: [
      { label: "Home", to: "/" },
      { label: "Browse restaurants", to: "/#restaurants-grid" },
      { label: "Food categories", to: "/#food-categories" },
      { label: "Popular cuisines", to: "/#cuisines" },
    ],
  },
  {
    title: "Your account",
    description: "Keep your personal details and deliveries up to date.",
    icon: UserRound,
    links: [
      { label: "Profile details", to: "/profile/details" },
      { label: "My orders", to: "/profile/orders" },
      { label: "Saved addresses", to: "/profile/addresses" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
  {
    title: "Information & help",
    description: "Learn how the service works and get answers.",
    icon: BookOpen,
    links: [
      { label: "Privacy policy", to: "/privacy-policy" },
      { label: "Security & trust", to: "/security-trust" },
      { label: "Terms of service", to: "/terms-of-service" },
      { label: "Cookie settings", to: "/cookie-settings" },
      { label: "Help & FAQ", to: "/help-faq" },
    ],
  },
]

const cookieStorageKey = "pet-pooja-point-cookie-preferences"

function PageIntro({ eyebrow, title, description, icon: Icon }) {
  return (
    <header className="mb-8 border-b border-slate-200 pb-6 sm:pb-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-medium font-poppins tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </header>
  )
}

function PolicyPage({ pathname }) {
  const info = pageInfo[pathname]
  const content = policyContent[pathname]
  const Icon = info.icon

  return (
    <PageLayout className="py-8 sm:py-12">
      <PageIntro {...info} />

      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            On this page
          </p>
          <nav className="mt-3 space-y-1">
            {content.sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition-colors hover:bg-amber-50 hover:text-amber-900"
              >
                <span className="font-mono text-[11px] text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </a>
            ))}
          </nav>
          <div className="mt-5 rounded-xl bg-slate-50 p-3">
            <p className="text-[11px] text-slate-500">Last updated</p>
            <p className="mt-1 text-xs font-medium text-slate-800">
              {content.updated}
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <p className="text-sm leading-6 text-amber-950">
              {info.description}
            </p>
          </div>

          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-8">
            {content.sections.map((section, index) => (
              <section
                id={section.id}
                key={section.id}
                className="scroll-mt-28 py-7 sm:py-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-xs text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-medium font-poppins text-slate-900">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-amber-700">
                      {section.summary}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {section.body}
                    </p>
                    {section.bullets && (
                      <ul className="mt-4 space-y-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2.5 text-sm leading-6 text-slate-600"
                          >
                            <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.links && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {section.links.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-primary hover:text-amber-800"
                          >
                            {link.label}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

function SecurityPage() {
  return (
    <PageLayout className="py-8 sm:py-12">
      <PageIntro
        eyebrow="SAFER EVERY STEP"
        title="Trust is on the menu."
        description="A few practical habits can help keep your account, orders, and payments safer."
        icon={ShieldCheck}
      />

      <section className="grid gap-4 md:grid-cols-3">
        {securityGuides.map((guide) => {
          const Icon = guide.icon
          return (
            <article
              key={guide.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {guide.number}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-medium font-poppins text-slate-900">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{guide.text}</p>
            </article>
          )
        })}
      </section>

      <section className="mt-6 grid gap-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Something not right?
          </p>
          <h2 className="mt-2 text-xl font-medium font-poppins text-emerald-950">
            Take action as soon as you notice.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-900/80">
            If you see an order you did not place or suspect someone has access
            to your account, review your orders and contact support.
          </p>
        </div>
        <Button asChild className="rounded-xl">
          <Link to="/help-faq">
            Get help
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/privacy-policy"
          className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-primary"
        >
          Read our privacy policy
        </Link>
        <Link
          to="/terms-of-service"
          className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-primary"
        >
          View terms of service
        </Link>
      </div>
    </PageLayout>
  )
}

function readCookiePreferences() {
  const stored = window.localStorage.getItem(cookieStorageKey)
  if (!stored) return { analytics: false, personalization: false }

  const parsed = JSON.parse(stored)
  return {
    analytics: parsed.analytics === true,
    personalization: parsed.personalization === true,
  }
}

function CookieSettingsPage() {
  const [preferences, setPreferences] = useState(readCookiePreferences)
  const [saved, setSaved] = useState(false)

  const savePreferences = () => {
    window.localStorage.setItem(cookieStorageKey, JSON.stringify(preferences))
    setSaved(true)
  }

  return (
    <PageLayout className="py-8 sm:py-12">
      <PageIntro
        eyebrow="YOUR BROWSER, YOUR CALL"
        title="Cookie settings."
        description="Choose whether this browser may save optional preferences. Essential storage stays on so the app can work."
        icon={Cookie}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Preference centre
            </p>
            <h2 className="mt-2 text-xl font-medium font-poppins text-slate-900">
              Pick what you are comfortable with
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your choices are saved in this browser. Optional analytics and
              personalization are not currently enabled in this app.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            <CookiePreference
              title="Essential storage"
              description="Keeps core app features working, such as remembering your cart and session."
              enabled
              locked
            />
            <CookiePreference
              title="Analytics"
              description="Your choice for analytics features if they are introduced in the future."
              enabled={preferences.analytics}
              onChange={(enabled) => {
                setPreferences((current) => ({ ...current, analytics: enabled }))
                setSaved(false)
              }}
            />
            <CookiePreference
              title="Personalization"
              description="Your choice for optional saved browsing preferences if they are introduced in the future."
              enabled={preferences.personalization}
              onChange={(enabled) => {
                setPreferences((current) => ({
                  ...current,
                  personalization: enabled,
                }))
                setSaved(false)
              }}
            />
          </div>

          <div className="flex flex-col gap-3 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p role="status" className="min-h-5 text-sm text-emerald-700">
              {saved ? "Preferences saved on this device." : ""}
            </p>
            <Button onClick={savePreferences} className="rounded-xl">
              Save my choices
            </Button>
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-700 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-medium font-poppins text-slate-900">
            Your choice matters
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Turning off an optional preference will not affect essential
            features like your cart.
          </p>
          <Link
            to="/privacy-policy"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-800 hover:text-orange-950"
          >
            Read the privacy policy
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </PageLayout>
  )
}

function CookiePreference({ title, description, enabled, locked = false, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-7">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-medium text-slate-900">{title}</h3>
          {locked ? (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              Always on
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Optional
            </span>
          )}
        </div>
        <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
      <Switch
        checked={enabled}
        disabled={locked}
        onCheckedChange={onChange}
        aria-label={`${title}${locked ? " (always on)" : ""}`}
      />
    </div>
  )
}

function SitemapPage() {
  return (
    <PageLayout className="py-8 sm:py-12">
      <PageIntro
        eyebrow="FIND YOUR WAY"
        title="Everything, in one place."
        description="A quick guide to the places you can go and things you can do on Pet Pooja Point."
        icon={Map}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {sitemapGroups.map((group) => {
          const Icon = group.icon
          return (
            <section
              key={group.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-medium font-poppins text-slate-900">
                {group.title}
              </h2>
              <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">
                {group.description}
              </p>
              <ul className="mt-4 space-y-1 border-t border-slate-100 pt-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group flex items-center justify-between rounded-lg px-2 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                    >
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </PageLayout>
  )
}

function HelpFaqPage() {
  return (
    <PageLayout className="py-8 sm:py-12">
      <PageIntro
        eyebrow="HERE WHEN YOU NEED US"
        title="What can we help with?"
        description="Browse common questions about orders, your account, and payments."
        icon={CircleHelp}
      />

      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 sm:px-7">
          {faqItems.map((item) => (
              <details
                key={item.question}
                className="group border-b border-slate-100 py-5 last:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900 marker:hidden">
                  <span>
                    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-primary">
                      {item.category}
                    </span>
                    {item.question}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 max-w-3xl pr-7 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              </details>
          ))}
        </div>

        <section className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-medium font-poppins">Need help with a specific order?</h2>
            <p className="mt-1 text-xs text-white/65">
              Open your order details to find the status and bill.
            </p>
          </div>
          <Button asChild variant="secondary" className="rounded-xl">
            <Link to="/profile/orders">
              Go to My Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </PageLayout>
  )
}

export function InformationPage() {
  const { pathname } = useLocation()

  if (policyContent[pathname]) return <PolicyPage pathname={pathname} />
  if (pathname === "/security-trust") return <SecurityPage />
  if (pathname === "/cookie-settings") return <CookieSettingsPage />
  if (pathname === "/sitemap") return <SitemapPage />
  if (pathname === "/help-faq") return <HelpFaqPage />

  return (
    <PageLayout className="py-12">
      <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <HelpCircle className="mx-auto h-10 w-10 text-slate-300" />
        <h1 className="mt-4 text-2xl font-medium font-poppins text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          The information page you are looking for is not available.
        </p>
        <Button asChild className="mt-5 rounded-xl">
          <Link to="/">Return home</Link>
        </Button>
      </section>
    </PageLayout>
  )
}

export default InformationPage
