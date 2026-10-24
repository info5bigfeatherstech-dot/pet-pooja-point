// src/components/layout/PageLayout.jsx - Shared layout component with Navbar, Container, and Footer
import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Container from "./Container"

export function PageLayout({ children, withContainer = true, className = "" }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Navbar />
      <main className="flex-1 pb-16">
        {withContainer ? (
          <Container className={className}>{children}</Container>
        ) : (
          <div className={className}>{children}</div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default PageLayout
