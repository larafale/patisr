"use client"

import React from "react"
import { Plus } from "lucide-react"
import { toast } from 'sonner'
import { Product } from "@/lib/specs"
import { clientError } from "@/lib/utils-client"
import ProductForm from "@/components/product-form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

type ProductNewProps = {
    categories: any,
    onSubmit: any
}

export default function ProductNew({ categories = {}, onSubmit: onCreate }: ProductNewProps) {

    const [isOpen, setOpen] = React.useState(false)
    const onSubmit = async (data: Product) => {
        const { error } = await onCreate(data)
        if (clientError(error)) return
        toast.success("Produit ajouté")
        setOpen(false)
    }

    return <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button onClick={() => setOpen(true)} size="sm">
                <Plus className="h-4 w-4 mr-2" />Nouveau
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Nouveau produit</SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <ProductForm
                categories={categories}
                onSubmit={onSubmit} />
        </SheetContent>
    </Sheet>
}