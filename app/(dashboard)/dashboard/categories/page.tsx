import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { db, tables } from "@/lib/db";
import CategoryList from "@/components/category-list"
import CategoryNew from "@/components/category-new"
import { Category } from "@/lib/specs"
import { revalidatePath } from "next/cache"
import { createCategory, updateCategory } from "@/lib/crud"

export const metadata = {
    title: "Catégories",
}

export const revalidate = 0

export default async function DashboardPage() {

    const categories = await db
        .select()
        .from(tables.categories)
        .orderBy(tables.categories.name)

    const onCreate = async (data: Category) => {
        "use server"
        const category = await createCategory(data)
        revalidatePath('/dashboard/categories')
        return category
    }

    const onUpdate = async (data: Category) => {
        "use server"
        const category = await updateCategory(data)
        return category
    }

    return (
        <DashboardShell>
            <DashboardHeader heading="Catégories" text="Gérer les catégories">
                <CategoryNew onSubmit={onCreate} />
            </DashboardHeader>
            <CategoryList categories={categories} onSubmit={onUpdate} />
        </DashboardShell>
    )
}
