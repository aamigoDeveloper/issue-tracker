import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <section className="grid place-content-center bg-white px-4">
      <div className="text-center space-y-4">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>

        <Button asChild>
          <Link href={"/"}>Go Back Home</Link>
        </Button>
      </div>
    </section>
  )
}
