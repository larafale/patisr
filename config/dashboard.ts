import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Commandes",
      href: "/dashboard",
      icon: "order",
    },
    {
      title: "Clients",
      href: "/dashboard/clients",
      icon: "client",
    },
    {
      title: "Catégories",
      href: "/dashboard/categories",
      icon: "category",
    },
    {
      title: "Produits",
      href: "/dashboard/products",
      icon: "product",
    },
  ],
  sidebarNav: [
    {
      title: "Facturation",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Paramètres",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
