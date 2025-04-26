import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Scale, Search, Lightbulb } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            <Scale className="h-6 w-6" />
            <span>Legal AI Assistant</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium">
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  AI-Powered Legal Intelligence
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Research, analyze evidence, and develop winning case strategies with advanced AI assistance.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Legal Tools</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our platform offers three specialized tools to enhance your legal practice.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <Search className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Legal Research</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Search through vast legal databases to find relevant cases, statutes, and precedents.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <Scale className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Evidence Analysis</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Analyze evidence, identify inconsistencies, and highlight key supporting documents.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <Lightbulb className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Case Strategy</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Receive AI-powered recommendations on case strengths, weaknesses, and strategic approaches.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2024 Legal AI Assistant. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
