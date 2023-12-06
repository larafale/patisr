import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { db, tables } from "@/lib/db";
import ProductsList from "@/components/product-list"
import ProductNew from "@/components/product-new"
import { Product } from "@/lib/specs"
import { revalidatePath } from "next/cache"
import { createProduct, updateProduct } from "@/lib/crud"

export const metadata = {
    title: "Produits",
}

export const revalidate = 0

export default async function DashboardPage() {

    const products = await db
        .select()
        .from(tables.products)

    const categories = await db
        .select()
        .from(tables.categories)
        .orderBy(tables.categories.name)

    const onCreate = async (data: Product) => {
        "use server"
        const product = await createProduct(data)
        revalidatePath('/dashboard/products')
        return product
    }

    const onUpdate = async (data: Product) => {
        "use server"
        const product = await updateProduct(data)
        return product
    }

    return (
        <DashboardShell>
            <DashboardHeader heading="Produits" text="Gérer les produits">
                <ProductNew categories={categories} onSubmit={onCreate} />
            </DashboardHeader>
            <ProductsList products={products} categories={categories} onSubmit={onUpdate} />
        </DashboardShell>
    )
}
