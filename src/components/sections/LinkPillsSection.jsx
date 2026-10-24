// src/components/sections/LinkPillsSection.jsx - Reusable pill tags section for localities and cuisines
import React from "react"
import Container from "../layout/Container"
import SectionHeader from "../common/SectionHeader"
import Chip from "../common/Chip"

export function LinkPillsSection({
  title,
  subtitle,
  items = [],
  onItemClick,
  activeItem,
  className = "",
  id,
}) {
  if (!items || items.length === 0) return null

  return (
    <section id={id} className={`py-8 md:py-12 bg-white ${className}`}>
      <Container>
        {title && (
          <SectionHeader
            title={title}
            subtitle={subtitle}
          />
        )}

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {items.map((item) => {
            const isActive =
              activeItem &&
              activeItem.toLowerCase() === item.name.toLowerCase()

            return (
              <Chip
                key={item.id}
                label={item.name}
                count={item.count}
                active={isActive}
                onClick={() => onItemClick && onItemClick(item)}
              />
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default LinkPillsSection
