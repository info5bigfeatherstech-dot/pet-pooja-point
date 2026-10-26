import React, { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Star,
  Users,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Container from "@/components/layout/Container"
import ProductCard from "@/components/cards/ProductCard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getRestaurantById } from "@/api/restaurantApi"
import { products } from "@/data/products"
import { formatPriceForTwo, formatRatingCount } from "@/utils/formatters"

const restaurantTabs = [
  { value: "overview", label: "Overview" },
  { value: "order-online", label: "Order Online" },
  { value: "reviews", label: "Reviews" },
  { value: "photos", label: "Photos" },
  { value: "menu", label: "Menu" },
  { value: "book-table", label: "Book a Table" },
]

const cuisineCategoryAliases = {
  mughlai: "north indian",
  awadhi: "biryani",
  "pure veg": "north indian",
  kebab: "north indian",
  "fast food": "burger",
  burgers: "burger",
  italian: "pasta",
  "healthy food": "salad",
  "street food": "chole bhature",
  snacks: "chole bhature",
  bakery: "cake",
  beverages: "cold coffee",
  "finger food": "burger",
  continental: "pasta",
}

function getRestaurantMenu(restaurant) {
  const categories = new Set(
    restaurant.cuisines.map((cuisine) => {
      const normalizedCuisine = cuisine.toLowerCase()
      return cuisineCategoryAliases[normalizedCuisine] || normalizedCuisine
    })
  )
  const matches = products.filter((product) =>
    categories.has(product.categoryName.toLowerCase())
  )

  return matches.length > 0 ? matches : products.slice(0, 6)
}

function TabSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="mb-5">
        <h2 className="text-xl font-medium font-poppins text-slate-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500 font-subheader capitalize">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export function RestaurantPage() {
  const { restaurantId } = useParams()
  const restaurant = getRestaurantById(restaurantId)
  const [reservation, setReservation] = useState(null)
  const menu = useMemo(
    () => (restaurant ? getRestaurantMenu(restaurant) : []),
    [restaurant]
  )
  const menuCategories = useMemo(
    () => [...new Set(menu.map((product) => product.categoryName))],
    [menu]
  )
  const photos = useMemo(
    () => [restaurant?.image, ...menu.map((product) => product.image)].filter(Boolean),
    [restaurant, menu]
  )

  function handleReservationSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setReservation({
      date: formData.get("date"),
      time: formData.get("time"),
      guests: formData.get("guests"),
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-foreground antialiased">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10">
        <Container>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-subheader text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back To Restaurants
          </Link>

          {!restaurant ? (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center">
              <h1 className="text-2xl font-medium font-poppins text-slate-900">
                Restaurant not found
              </h1>
              <p className="mt-2 text-sm text-slate-600 font-subheader">
                This restaurant may no longer be available.
              </p>
              <Link
                to="/"
                className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Explore restaurants
              </Link>
            </div>
          ) : (
            <>
              <header className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="grid h-52 grid-cols-3 gap-1 overflow-hidden sm:h-72">
                  <img
                    src={restaurant.image}
                    alt={`${restaurant.name} restaurant`}
                    className="col-span-2 h-full w-full object-cover"
                  />
                  {photos.length > 1 ? (
                    <div className="grid min-h-0 grid-rows-2 gap-1">
                      {photos.slice(1, 3).map((photo, index) => (
                        <img
                          key={`${photo}-${index}`}
                          src={photo}
                          alt={`${restaurant.name} food ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-100" />
                  )}
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-medium font-poppins text-slate-900">
                        {restaurant.name}
                      </h1>
                      <p className="mt-1 text-sm text-slate-600 font-subheader">
                        {restaurant.cuisines.join(", ")}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 font-subheader">
                        <MapPin className="h-4 w-4 text-primary" />
                        {restaurant.locality}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-sm font-semibold text-emerald-800">
                        <Star className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                        {restaurant.rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatRatingCount(restaurant.ratingCount)} ratings
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-sm text-slate-600">
                        {formatPriceForTwo(restaurant.priceForTwo)}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`mt-4 text-sm font-medium ${restaurant.isOpen ? "text-emerald-700" : "text-rose-600"}`}
                  >
                    {restaurant.isOpen ? "Open now" : "Currently closed"}
                    {restaurant.deliveryTime && ` · ${restaurant.deliveryTime}`}
                  </p>
                </div>
              </header>

              <Tabs
                key={restaurant.id}
                defaultValue="overview"
                className="mt-5"
              >
                <div className="overflow-x-auto border-b border-slate-300">
                  <TabsList className="flex h-auto min-w-max justify-start gap-2 rounded-none bg-transparent p-0">
                    {restaurantTabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="h-12 rounded-none border-b-2 border-transparent bg-transparent px-4 text-sm font-normal text-slate-600 shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent value="overview">
                  <TabSection
                    title="About this place"
                    description={`A closer look at ${restaurant.name}.`}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <h3 className="font-medium text-slate-900">Cuisines</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {restaurant.cuisines.join(", ")}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <h3 className="font-medium text-slate-900">Location</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {restaurant.locality}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <h3 className="font-medium text-slate-900">Average cost</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {formatPriceForTwo(restaurant.priceForTwo)}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <h3 className="font-medium text-slate-900">Today</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {restaurant.deliveryTime}
                        </p>
                      </div>
                    </div>
                    {restaurant.offer && (
                      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
                        Current offer: {restaurant.offer}
                      </p>
                    )}
                  </TabSection>
                </TabsContent>

                <TabsContent value="order-online">
                  <TabSection
                    title="Order Online"
                    description={`Popular ${restaurant.cuisines.join(" and ")} dishes from ${restaurant.name}.`}
                  >
                    {restaurant.isOpen ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {menu.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={{ ...product, restaurant }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">
                        This restaurant is currently closed. {restaurant.deliveryTime}.
                      </p>
                    )}
                  </TabSection>
                </TabsContent>

                <TabsContent value="reviews">
                  <TabSection
                    title="Ratings & Reviews"
                    description={`Guest ratings for ${restaurant.name}.`}
                  >
                    <div className="flex flex-col gap-5 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center">
                      <div className="text-center sm:min-w-36">
                        <p className="text-4xl font-semibold text-slate-900">
                          {restaurant.rating.toFixed(1)}
                        </p>
                        <div className="mt-1 flex justify-center text-amber-500">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${index < Math.round(restaurant.rating) ? "fill-current" : ""}`}
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatRatingCount(restaurant.ratingCount)} ratings
                        </p>
                      </div>
                      <div className="border-t border-slate-200 pt-4 text-sm text-slate-600 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                        <p className="font-medium text-slate-900">Customer rating</p>
                        <p className="mt-1 capitalize">
                          Ratings reflect diners&apos; overall experience at this restaurant.
                        </p>
                        <p className="mt-2">
                          Popular for {restaurant.cuisines.slice(0, 2).join(" and ")} in{" "}
                          {restaurant.locality}.
                        </p>
                      </div>
                    </div>
                  </TabSection>
                </TabsContent>

                <TabsContent value="photos">
                  <TabSection
                    title="Photos"
                    description={`Food and restaurant photos for ${restaurant.name}.`}
                  >
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {photos.map((photo, index) => (
                        <img
                          key={`${photo}-${index}`}
                          src={photo}
                          alt={`${restaurant.name} photo ${index + 1}`}
                          loading="lazy"
                          className="aspect-square w-full rounded-xl object-cover"
                        />
                      ))}
                    </div>
                  </TabSection>
                </TabsContent>

                <TabsContent value="menu">
                  <TabSection
                    title="Menu"
                    description={`${menu.length} items across ${menuCategories.length} menu categories.`}
                  >
                    <div className="space-y-6">
                      {menuCategories.map((category) => (
                        <section key={category}>
                          <h3 className="mb-3 border-b border-slate-100 pb-2 font-medium text-slate-900">
                            {category}
                          </h3>
                          <div className="divide-y divide-slate-100">
                            {menu
                              .filter((product) => product.categoryName === category)
                              .map((product) => (
                                <div
                                  key={product.id}
                                  className="flex items-center justify-between gap-4 py-3"
                                >
                                  <div>
                                    <p className="font-medium text-slate-800">
                                      {product.name}
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                      {product.description}
                                    </p>
                                  </div>
                                  <span className="shrink-0 text-sm font-semibold text-slate-900">
                                    ₹{product.basePrice}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </TabSection>
                </TabsContent>

                <TabsContent value="book-table">
                  <TabSection
                    title="Book a Table"
                    description={`Choose a date and time to request a table at ${restaurant.name}.`}
                  >
                    {reservation ? (
                      <div
                        role="status"
                        className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900"
                      >
                        <h3 className="font-semibold">Reservation request received</h3>
                        <p className="mt-1">
                          {reservation.guests} guests · {reservation.date} at {reservation.time}
                        </p>
                        <p className="mt-2 text-emerald-800">
                          This is a demo request; the restaurant will confirm your booking.
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleReservationSubmit}
                        className="grid gap-4 sm:grid-cols-2"
                      >
                        <label className="space-y-1.5 text-sm font-medium text-slate-700">
                          Date
                          <span className="relative block">
                            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                              required
                              type="date"
                              name="date"
                              min={new Date().toISOString().slice(0, 10)}
                              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm"
                            />
                          </span>
                        </label>
                        <label className="space-y-1.5 text-sm font-medium text-slate-700">
                          Time
                          <span className="relative block">
                            <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <select
                              required
                              name="time"
                              defaultValue=""
                              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm"
                            >
                              <option value="" disabled>Select a time</option>
                              <option>12:00 PM</option>
                              <option>1:00 PM</option>
                              <option>6:00 PM</option>
                              <option>7:00 PM</option>
                              <option>8:00 PM</option>
                              <option>9:00 PM</option>
                            </select>
                          </span>
                        </label>
                        <label className="space-y-1.5 text-sm font-medium text-slate-700">
                          Guests
                          <span className="relative block">
                            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <select
                              name="guests"
                              defaultValue="2"
                              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                                <option key={count} value={count}>
                                  {count} {count === 1 ? "guest" : "guests"}
                                </option>
                              ))}
                            </select>
                          </span>
                        </label>
                        <div className="flex items-end">
                          <Button type="submit" className="h-11 w-full rounded-xl">
                            Request a table
                          </Button>
                        </div>
                      </form>
                    )}
                  </TabSection>
                </TabsContent>
              </Tabs>
            </>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default RestaurantPage
