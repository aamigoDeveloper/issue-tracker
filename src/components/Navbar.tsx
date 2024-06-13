"use client"

import { cn } from "@/lib/utils"
import { Bug } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const links: {
    label: string
    href: string
  }[] = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ]
  return (
    <header className="p-10 mb-8 border-b shadow-sm">
      <nav className="flex items-center gap-8">
        <Link href={"/"}>
          <Bug size={30} />
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-lg font-semibold hover:text-zinc-800",
              pathname === link.href
                ? "underline hover:text-zinc-800 text-zinc-800"
                : "text-zinc-500"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
