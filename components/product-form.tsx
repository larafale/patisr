"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icons } from "./icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productSchema, Product, Category } from "@/lib/specs"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

type FormProps = {
    dummy?: Partial<Product>,
    data?: Product,
    categories: Category[],
    onSubmit: (data: Product) => {}
}

export default function ProductForm({ data, categories, onSubmit, dummy }: FormProps) {
    const isNew = !!(!data)
    const [isLoading, setLoading] = React.useState(false)

    const form = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: dummy || data || {
            name: "",
            price: 0,
            categoryId: categories[0]?.id ?? ""
        },
    })

    async function handleSubmit(values: Product) {
        setLoading(true)
        await onSubmit(values)
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prix</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categorie</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat, index) => <SelectItem key={index} value={cat.id ?? ""}>{cat.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>{isNew ? "Créer" : "Enregistrer"}</span>
                </Button>
            </form>
        </Form>
    )
}
