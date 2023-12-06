"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { userSchema, User } from "@/lib/specs"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Icons } from "@/components/icons"
import { useUser } from "@/lib/user"
import { clientError } from "@/lib/utils-client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type Props = {
  onSubmit: any,
  className?: string
}

export function UserForm({ className, onSubmit, ...props }: Props) {
  const { user, setUser } = useUser()
  const [isLoading, setLoading] = React.useState(false)

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: user,
  })


  async function handleSubmit(data: User) {
    setLoading(true)
    const { data: user, error } = await onSubmit(data)
    if (clientError(error)) return
    toast.success("Paramètres enregistrés")
    setUser(user)
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mon Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input  {...field} className="max-w-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field}  className="max-w-md" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Enregistrer</span>
            </Button>
          </form>
        </Form>
        {/* <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div> */}
      </CardContent>
      {/* <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter> */}
    </Card>
  )
}
