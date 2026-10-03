import { useContext } from "react"
import { BudgetContext } from "./BudgetContext"

export function useBudget() {
  const context = useContext(BudgetContext)

  if (!context) {
    throw new Error(
      "useBudget doit être utilisé à l'intérieur de BudgetProvider"
    )
  }

  return context
}