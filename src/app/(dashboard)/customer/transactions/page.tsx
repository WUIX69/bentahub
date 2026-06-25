import { redirect } from "next/navigation"

export default function CustomerTransactionsRedirect() {
  redirect("/shared/transactions")
}
