"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icons } from "./icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { categorySchema, Category } from "@/lib/specs"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

type FormProps = {
    dummy?: Partial<Category>,
    data?: Category,
    onSubmit: (data: Category) => {}
}

export default function CategoryForm({ data, onSubmit, dummy }: FormProps) {
    const isNew = !!(!data)
    const [isLoading, setLoading] = React.useState(false)

    const form = useForm<Category>({
        resolver: zodResolver(categorySchema),
        defaultValues: dummy || data || {
            name: "",
        } as Category,
    })

    async function handleSubmit(values: Category) {
        setLoading(true)
        await onSubmit(values as Category)
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
