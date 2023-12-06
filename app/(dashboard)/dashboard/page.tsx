import { DashboardHeader } from "@/components/header"
import OrderNew from "@/components/orders"
import { DashboardShell } from "@/components/shell"
import { db, tables } from "@/lib/db"

export const metadata = {
  title: "Commandes",
}

export default async function DashboardPage() {

  const products = await db
    .select()
    .from(tables.products)

  const categories = await db
    .select()
    .from(tables.categories)
    .orderBy(tables.categories.name)

  return (
    <DashboardShell>
      <DashboardHeader heading="Commandes" text="Gerez vos commandes">
      </DashboardHeader>
      <div>
        <OrderNew categories={categories} products={products} />
      </div>
    </DashboardShell>
  )
}
