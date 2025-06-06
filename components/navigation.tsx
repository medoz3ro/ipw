import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Database, ImageIcon, Mail, Settings, Home } from "lucide-react"

export function Navigation() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Moja App</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/data">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <Database className="w-4 h-4 mr-2" />
                Podaci
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <ImageIcon className="w-4 h-4 mr-2" />
                Galerija
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <Mail className="w-4 h-4 mr-2" />
                Kontakt
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <Settings className="w-4 h-4 mr-2" />
                Postavke
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
