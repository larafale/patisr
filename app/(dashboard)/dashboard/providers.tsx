
"use client"
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { User } from "@/lib/specs";
import { UserProvider } from "@/lib/user";
import { useTheme, ThemeProvider } from "next-themes";
import { Toaster } from "sonner";



export const DashBoardProviders = ({
    children, user
}: {
    children?: React.ReactNode,
    user: User
}) => {

    return (
        <UserProvider user={user}>
            {children}
        </UserProvider>
    )
}


export const GlobalProviders = ({
    children
}: {
    children?: React.ReactNode
}) => {

    const { theme } = useTheme()

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster richColors className="z-60" theme={theme as any} />
            <TailwindIndicator />
        </ThemeProvider>
    )
}



