"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Home, CheckCircle } from "lucide-react"
import Link from "next/link"

interface FormData {
  username: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  username?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Username validation - minimum 8 characters
    if (formData.username.length < 8) {
      newErrors.username = "Username mora imati barem 8 znakova"
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = "Unesite ispravan e-mail"
    }

    // Subject validation - not empty
    if (formData.subject.trim() === "") {
      newErrors.subject = "Tema ne smije biti prazna"
    }

    // Message validation - not empty
    if (formData.message.trim() === "") {
      newErrors.message = "Poruka ne smije biti prazna"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Log to console as requested
      console.log("=== KONTAKT FORMA PODACI ===")
      console.log("Username:", formData.username)
      console.log("E-mail:", formData.email)
      console.log("Tema:", formData.subject)
      console.log("Poruka:", formData.message)
      console.log("Vrijeme slanja:", new Date().toISOString())
      console.log("=============================")

      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          username: "",
          email: "",
          subject: "",
          message: "",
        })
        setIsSubmitted(false)
      }, 3000)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Početna
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Kontakt forma</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">Poruka uspješno poslana!</h2>
              <p className="text-gray-600">Vaša poruka je zabilježena u konzoli browsera.</p>
              <p className="text-sm text-gray-500 mt-2">Forma će se resetirati za nekoliko sekundi...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <Home className="w-4 h-4 mr-2" />
            Početna
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Kontakt forma</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Pošaljite nam poruku</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={errors.username ? "border-red-500" : ""}
                placeholder="Unesite username (min. 8 znakova)"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                placeholder="Unesite vaš e-mail"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Tema *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className={errors.subject ? "border-red-500" : ""}
                placeholder="Unesite temu poruke"
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Poruka *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                placeholder="Unesite vašu poruku"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <Alert>
              <AlertDescription>
                Sva polja označena sa * su obavezna. Username mora imati barem 8 znakova, e-mail mora biti ispravan, a
                tema i poruka ne smiju biti prazni.
              </AlertDescription>
            </Alert>

            <Button type="submit" className="w-full">
              Pošalji poruku
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
