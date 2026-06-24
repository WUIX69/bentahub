import { redirect } from "next/navigation"

export default function AdminReservationsRedirect() {
  redirect("/shared/reservations")
}
