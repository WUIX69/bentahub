import { redirect } from "next/navigation"

export default function AdminPickupsRedirect() {
  redirect("/shared/pickups")
}
