import { redirect } from "next/navigation"

export default function AdminSettingsRedirect() {
  redirect("/shared/settings")
}
