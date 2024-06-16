"use client"

import { cn } from "@/lib/utils"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { Bug, Loader2Icon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./ModeToggle"
import Profile from "./Profile"
import { Button } from "./ui/button"

export default function Navbar() {
  const { user, isLoading } = useKindeBrowserClient()
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
    <header className="p-8 mb-7 border-b dark:border-b-slate-700 shadow-sm">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <Bug size={30} />
          </Link>
          <div className="flex gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-semibold hover:text-zinc-800 dark:text-slate-100 dark:hover:text-slate-300",
                  link.href === "/" && "sm:block hidden",
                  pathname === link.href
                    ? "underline hover:text-zinc-800 text-zinc-800 dark:text-slate-300"
                    : "text-zinc-500  dark:text-slate-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="space-x-2">
            {!user ? (
              <>
                {isLoading ? (
                  <Loader2Icon className="animate-spin h-4 w-4 mr-3" />
                ) : (
                  <>
                    <Button asChild variant={"outline"}>
                      <RegisterLink>Sign up</RegisterLink>
                    </Button>
                    <Button asChild>
                      <LoginLink>Sign in</LoginLink>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Profile user={user} />
            )}
          </div>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
