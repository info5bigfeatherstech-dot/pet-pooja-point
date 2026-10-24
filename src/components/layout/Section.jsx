// src/components/layout/Section.jsx - Reusable page section wrapper with Container and SectionHeader
import React from "react"
import { cn } from "@/lib/utils"
import Container from "./Container"
import SectionHeader from "../common/SectionHeader"

export function Section({
  title,
  subtitle,
  action,
  children,
  className = "",
  id,
}) {
  return (
    <section id={id} className={cn("section", className)}>
      <Container>
        {(title || subtitle || action) && (
          <SectionHeader title={title} subtitle={subtitle} action={action} />
        )}
        {children}
      </Container>
    </section>
  )
}

export default Section
