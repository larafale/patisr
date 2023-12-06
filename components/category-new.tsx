"use client"

import React from "react"
import { Plus } from "lucide-react"
import { toast } from 'sonner'
import { Category } from "@/lib/specs"
import { clientError } from "@/lib/utils-client"
import CategoryForm from "@/components/category-form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

type CategoryNewProps = {
    onSubmit: any
}

export default function CategoryNew({ onSubmit: onCreate }: CategoryNewProps) {

    const [isOpen, setOpen] = React.useState(false)
    const onSubmit = async (data: Category) => {
        const { error } = await onCreate(data)
        if (clientError(error)) return
        toast.success("Catégorie ajouté")
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
                <SheetTitle>Nouvelle catégorie</SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <CategoryForm
                onSubmit={onSubmit} />
        </SheetContent>
    </Sheet>
}