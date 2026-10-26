// src/App.jsx - Application root with React Router configuration and global modals/toasts
import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"
import RestaurantPage from "./pages/RestaurantPage"
import ProfilePage from "./pages/ProfilePage"
import ProfileDetailsTab from "./pages/ProfileDetailsTab"
import OrdersTab from "./pages/OrdersTab"
import AddressesTab from "./pages/AddressesTab"
import CheckoutPage from "./pages/CheckoutPage"
import OrderSuccessPage from "./pages/OrderSuccessPage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import InformationPage from "./pages/InformationPage"
import PartnershipPage from "./pages/PartnershipPage"
import AuthModal from "./components/auth/AuthModal"
import CustomiseItemModal from "./components/food/CustomiseItemModal"
import CartDrawer from "./components/cart/CartDrawer"
import FloatingCartBar from "./components/cart/FloatingCartBar"
import CartToaster from "./components/cart/CartToaster"
import ScrollToTop from "./components/common/ScrollToTop"
import { Toaster } from "./components/ui/sonner"

export function App() {
  return (
    <BrowserRouter>
      {/* Reset scroll position to top on every route change */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Profile nested tabs with default redirect to /profile/orders */}
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<Navigate to="/profile/orders" replace />} />
          <Route path="details" element={<ProfileDetailsTab />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="addresses" element={<AddressesTab />} />
        </Route>

        {/* Food Delivery Checkout */}
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Order Confirmation */}
        <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />

        {/* Category & Product details */}
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />
        <Route path="/privacy-policy" element={<InformationPage />} />
        <Route path="/security-trust" element={<InformationPage />} />
        <Route path="/terms-of-service" element={<InformationPage />} />
        <Route path="/cookie-settings" element={<InformationPage />} />
        <Route path="/sitemap" element={<InformationPage />} />
        <Route path="/help-faq" element={<InformationPage />} />
        <Route path="/partner-with-us" element={<PartnershipPage />} />
        <Route path="/partners/:partnerType" element={<PartnershipPage />} />

        {/* Wildcard redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Indian Phone Login Modal Popup */}
      <AuthModal />

      {/* Global "Customise as per your taste" Modal Popup */}
      <CustomiseItemModal />

      {/* Global Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Bottom Floating Cart Bar */}
      <FloatingCartBar />

      {/* Animated Toast Notification when items are added to cart */}
      <CartToaster />

      {/* Global Sonner Toasts */}
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
  )
}

export default App
