// src/components/layout/Footer.jsx - Footer with gray-200 background, centered Container matching upper sections
import React from "react"
import Container from "./Container"
import { Separator } from "@/components/ui/separator"
import { footerColumns } from "@/data/footerLinks"

export function Footer() {
  return (
    <footer className="w-full bg-gray-200 border-t border-gray-300 mt-16 md:mt-24 text-slate-900">
      <Container className="py-12 md:py-16">
        {/* Top Header Row with Logo & Short Bio */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <a
              href="/"
              className="text-2xl font-medium font-poppins tracking-tight text-slate-900 flex items-center select-none"
            >
              <span>Tablefy</span>
              <span className="text-primary text-3xl leading-none">.</span>
            </a>
            <p className="text-xs font-subheader text-slate-600 mt-1 max-w-sm capitalize">
              Discover authentic culinary gems, reserve favourite tables, and satisfy your cravings in your city.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-subheader text-slate-800">
            <span className="inline-block px-3 py-1 rounded-full border border-gray-300 bg-white/70 font-medium shadow-2xs">
              🌐 English (India)
            </span>
          </div>
        </div>

        {/* 4 Navigation Columns from data/footerLinks.js */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-sm font-medium font-poppins text-slate-900 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs font-subheader">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-slate-600 hover:text-primary transition-colors duration-150 inline-block py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <Separator className="bg-gray-300 my-8" />

        {/* Copyright and Legal Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-subheader text-slate-500">
          <p>© {new Date().getFullYear()} Tablefy Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
