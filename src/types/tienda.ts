export type ProductCategory = "combos" | "bebidas" | "individuales" | "salsas" | "dulces" | "helados" | "promociones"

export interface Product {
  id: string
  name: string
  price: number
  category: ProductCategory
  description: string
  imageUrl: string
  stock: number
  isPromotion?: boolean
  promotionPrice?: number
}

