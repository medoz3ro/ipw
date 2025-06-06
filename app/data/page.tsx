"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2, Plus, ArrowUpDown, Home, Edit, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Rating {
  rate: number
  count: number
}

interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: Rating
}

interface NewProduct {
  title: string
  price: string
  category: string
  description: string
  image: string
  rating: {
    rate: string
    count: string
  }
}

interface EditProduct {
  title: string
  price: string
  category: string
  description: string
  image: string
  rating: {
    rate: string
    count: string
  }
}

export default function DataPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Product>("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  })
  const [editProduct, setEditProduct] = useState<EditProduct>({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  })

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://fakestoreapi.com/products")

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError(`Failed to fetch products: ${err instanceof Error ? err.message : String(err)}`)
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    const allCategories = Array.from(new Set(products.map((p) => p.category)))
    return allCategories
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    if (!products.length) return []

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || product.category === filterCategory
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortField === "rating") {
        const aRating = a.rating.rate
        const bRating = b.rating.rate
        return sortDirection === "asc" ? aRating - bRating : bRating - aRating
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [products, searchTerm, sortField, sortDirection, filterCategory])

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id)
    setEditProduct({
      title: product.title,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      rating: {
        rate: product.rating.rate.toString(),
        count: product.rating.count.toString(),
      },
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateProduct = () => {
    if (
      editingProductId &&
      editProduct.title &&
      editProduct.category &&
      editProduct.description &&
      editProduct.price !== "" &&
      editProduct.rating.rate !== ""
    ) {
      setProducts(
        products.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                title: editProduct.title,
                price: Number(editProduct.price),
                category: editProduct.category,
                description: editProduct.description,
                image: editProduct.image,
                rating: {
                  rate: Number(editProduct.rating.rate),
                  count: Number(editProduct.rating.count),
                },
              }
            : p,
        ),
      )
      setEditingProductId(null)
      setEditProduct({
        title: "",
        price: "",
        category: "",
        description: "",
        image: "",
        rating: {
          rate: "",
          count: "",
        },
      })
      setIsEditDialogOpen(false)
    }
  }

  const handleAddProduct = () => {
    if (
      newProduct.title &&
      newProduct.category &&
      newProduct.description &&
      newProduct.price !== "" &&
      newProduct.rating.rate !== ""
    ) {
      const id = Math.max(...products.map((p) => p.id)) + 1
      setProducts([
        ...products,
        {
          id,
          title: newProduct.title,
          price: Number(newProduct.price),
          category: newProduct.category,
          description: newProduct.description,
          image: newProduct.image || "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Default image
          rating: {
            rate: Number(newProduct.rating.rate),
            count: Number(newProduct.rating.count) || 0,
          },
        },
      ])
      setNewProduct({
        title: "",
        price: "",
        category: "",
        description: "",
        image: "",
        rating: {
          rate: "",
          count: "",
        },
      })
      setIsAddDialogOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-semibold">Učitavanje proizvoda...</h2>
        <p className="text-muted-foreground">Dohvaćamo podatke s API-ja</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Greška pri dohvatu podataka</h2>
          <p>{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Pokušaj ponovno
          </Button>
        </div>
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
        <h1 className="text-3xl font-bold">Prikaz podataka</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtriranje i pretraživanje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Pretraži proizvode</Label>
              <Input
                id="search"
                placeholder="Unesite naziv ili opis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Kategorija</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Odaberite kategoriju" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sve kategorije</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Dodaj proizvod
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dodaj novi proizvod</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="new-title">Naziv *</Label>
                      <Input
                        id="new-title"
                        placeholder="Unesite naziv proizvoda"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-price">Cijena (€) *</Label>
                      <Input
                        id="new-price"
                        type="number"
                        placeholder="Unesite cijenu u eurima"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-category">Kategorija *</Label>
                      <Input
                        id="new-category"
                        placeholder="Unesite kategoriju proizvoda"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-rating">Ocjena (1-5) *</Label>
                      <Input
                        id="new-rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        placeholder="Unesite ocjenu od 1 do 5"
                        value={newProduct.rating.rate}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            rating: { ...newProduct.rating, rate: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-count">Broj ocjena</Label>
                      <Input
                        id="new-count"
                        type="number"
                        placeholder="Unesite broj ocjena"
                        value={newProduct.rating.count}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            rating: { ...newProduct.rating, count: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-image">URL slike</Label>
                      <Input
                        id="new-image"
                        placeholder="Unesite URL slike proizvoda"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-description">Opis *</Label>
                      <Input
                        id="new-description"
                        placeholder="Unesite opis proizvoda"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="w-full">
                      Dodaj proizvod
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uredi proizvod</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Naziv *</Label>
              <Input
                id="edit-title"
                placeholder="Unesite naziv proizvoda"
                value={editProduct.title}
                onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-price">Cijena (€) *</Label>
              <Input
                id="edit-price"
                type="number"
                placeholder="Unesite cijenu u eurima"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Kategorija *</Label>
              <Input
                id="edit-category"
                placeholder="Unesite kategoriju proizvoda"
                value={editProduct.category}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-rating">Ocjena (1-5) *</Label>
              <Input
                id="edit-rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="Unesite ocjenu od 1 do 5"
                value={editProduct.rating.rate}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    rating: { ...editProduct.rating, rate: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-count">Broj ocjena</Label>
              <Input
                id="edit-count"
                type="number"
                placeholder="Unesite broj ocjena"
                value={editProduct.rating.count}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    rating: { ...editProduct.rating, count: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-image">URL slike</Label>
              <Input
                id="edit-image"
                placeholder="Unesite URL slike proizvoda"
                value={editProduct.image}
                onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Opis *</Label>
              <Input
                id="edit-description"
                placeholder="Unesite opis proizvoda"
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              />
            </div>
            <Button onClick={handleUpdateProduct} className="w-full">
              Spremi promjene
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Proizvodi ({filteredAndSortedProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slika</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("title")} className="h-auto p-0 font-semibold">
                      Naziv <ArrowUpDown className="w-4 h-4 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("price")} className="h-auto p-0 font-semibold">
                      Cijena <ArrowUpDown className="w-4 h-4 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("category")} className="h-auto p-0 font-semibold">
                      Kategorija <ArrowUpDown className="w-4 h-4 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("rating")} className="h-auto p-0 font-semibold">
                      Ocjena <ArrowUpDown className="w-4 h-4 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead>Opis</TableHead>
                  <TableHead>Akcije</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-12 h-12 relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-contain rounded"
                          crossOrigin="anonymous"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{product.title}</TableCell>
                    <TableCell>{product.price.toLocaleString()} €</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium">{product.rating.rate}</span>
                        <span className="text-xs text-muted-foreground ml-1">({product.rating.count})</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
