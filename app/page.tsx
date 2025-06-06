import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, ImageIcon, Mail, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted transition-colors">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Dobrodošli u našu aplikaciju</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kompletna web aplikacija s prikazom podataka, galerijom slika, kontakt formom i postavkama
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Database className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Prikaz podataka</CardTitle>
              <CardDescription>Pregledajte, sortirajte i filtrirajte podatke o proizvodima</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/data">
                <Button className="w-full">Otvori podatke</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <ImageIcon className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Galerija slika</CardTitle>
              <CardDescription>Pregledajte galeriju s automatskim slideshow-om</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/gallery">
                <Button className="w-full">Otvori galeriju</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Mail className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Kontakt forma</CardTitle>
              <CardDescription>Pošaljite nam poruku putem kontakt forme</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/contact">
                <Button className="w-full">Otvori kontakt</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Settings className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Postavke</CardTitle>
              <CardDescription>Prilagodite izgled i ponašanje aplikacije</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/settings">
                <Button className="w-full">Otvori postavke</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
