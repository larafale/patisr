import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserForm } from "@/components/user-form"
import { updateUser } from "@/lib/crud"
import { User } from "@/lib/specs"

export const metadata = {
  title: "Paramètres"
}

export default async function SettingsPage() {

  const onUpdate = async (data: User) => {
    "use server"
    return updateUser(data)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Paramètres"
        text="Gérer vos paramètres"
      />
      <div className="grid gap-10">
        <UserForm onSubmit={onUpdate} />
      </div>
    </DashboardShell>
  )
}
