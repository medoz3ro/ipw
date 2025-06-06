"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Palette } from "lucide-react"
import Link from "next/link"
import { useSettings } from "@/components/settings-provider"

const colorSchemes = [
  { value: "default", label: "Zadana", color: "bg-gray-500" },
  { value: "blue", label: "Plava", color: "bg-blue-500" },
  { value: "green", label: "Zelena", color: "bg-green-500" },
  { value: "purple", label: "Ljubičasta", color: "bg-purple-500" },
]

export default function SettingsPage() {
  const { settings, updateSetting } = useSettings()

  return (
    <div className="min-h-screen transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Početna
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Postavke stranice</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Postavke izgleda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Veličina teksta: {settings.textSize}px</Label>
                <Slider
                  value={[settings.textSize]}
                  onValueChange={(value) => updateSetting("textSize", value[0])}
                  min={12}
                  max={24}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">Prilagodite veličinu teksta kroz cijelu aplikaciju</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-scheme">Shema boja</Label>
                <Select
                  value={settings.colorScheme}
                  onValueChange={(value: "blue" | "green" | "purple" | "default") =>
                    updateSetting("colorScheme", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberite shemu boja" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorSchemes.map((scheme) => (
                      <SelectItem key={scheme.value} value={scheme.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${scheme.color}`}></div>
                          {scheme.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Odaberite glavnu boju aplikacije</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Tamni način rada</Label>
                  <p className="text-sm text-muted-foreground">Prebacite na tamnu temu za lakše gledanje</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Animacije</Label>
                  <p className="text-sm text-muted-foreground">Uključite ili isključite animacije u aplikaciji</p>
                </div>
                <Switch
                  id="animations"
                  checked={settings.animations}
                  onCheckedChange={(checked) => updateSetting("animations", checked)}
                />
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Postavke se automatski spremaju</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sve promjene se odmah primjenjuju i trajno spremaju u vašem pregledniku.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Pregled postavki</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="p-4 rounded-lg border-2 border-dashed border-muted bg-muted/50"
                style={{
                  fontSize: `${settings.textSize}px`,
                }}
              >
                <h3 className="font-bold mb-2">Primjer teksta</h3>
                <p className="text-muted-foreground mb-3">
                  Ovo je primjer kako će tekst izgledati s vašim postavkama. Veličina teksta je {settings.textSize}px.
                  {settings.darkMode
                    ? " Trenutno koristite tamni način rada."
                    : " Trenutno koristite svijetli način rada."}
                </p>

                <div className="flex gap-2 mb-3">
                  <Button size="sm">Glavni gumb</Button>
                  <Button variant="outline" size="sm">
                    Sekundarni gumb
                  </Button>
                  <Button variant="destructive" size="sm">
                    Opasnost
                  </Button>
                </div>

                <div className="text-sm">
                  <span className="font-medium">Trenutna shema: </span>
                  <span className="capitalize">
                    {colorSchemes.find((s) => s.value === settings.colorScheme)?.label}
                  </span>
                </div>

                {settings.animations && (
                  <div className="mt-2 animate-pulse text-primary">✨ Animacije su uključene</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
