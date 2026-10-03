import { useEffect, useState } from "react"

import { BudgetContext } from "./BudgetContext"

export function BudgetProvider({ children }) {
  const [transactions, setTransactions] = useState(
    () => {
      const savedTransactions =
        localStorage.getItem("transactions")

      return savedTransactions
        ? JSON.parse(savedTransactions)
        : []
    }
  )

  const [goals, setGoals] = useState(() => {
    const savedGoals =
      localStorage.getItem("goals")

    return savedGoals
      ? JSON.parse(savedGoals)
      : []
  })

  /* =========================
     LOCAL STORAGE
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    )
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(
      "goals",
      JSON.stringify(goals)
    )
  }, [goals])

  /* =========================
     TRANSACTIONS
  ========================= */

  const addTransaction = (transaction) => {
    setTransactions(
      (currentTransactions) => [
        ...currentTransactions,
        transaction,
      ]
    )
  }

  const deleteTransaction = (id) => {
    setTransactions(
      (currentTransactions) =>
        currentTransactions.filter(
          (transaction) =>
            transaction.id !== id
        )
    )
  }

  const editTransaction = (
    updatedTransaction
  ) => {
    setTransactions(
      (currentTransactions) =>
        currentTransactions.map(
          (currentTransaction) =>
            currentTransaction.id ===
            updatedTransaction.id
              ? updatedTransaction
              : currentTransaction
        )
    )
  }

  /* =========================
     CALCULATIONS
  ========================= */

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  const balance = income - expenses

  /* =========================
     GOALS
  ========================= */

  const addGoal = (goal) => {
    setGoals((currentGoals) => [
      ...currentGoals,
      goal,
    ])
  }

  const deleteGoal = (id) => {
    setGoals((currentGoals) =>
      currentGoals.filter(
        (goal) => goal.id !== id
      )
    )
  }

  const editGoal = (updatedGoal) => {
    setGoals((currentGoals) =>
      currentGoals.map((currentGoal) =>
        currentGoal.id === updatedGoal.id
          ? updatedGoal
          : currentGoal
      )
    )
  }

  const addMoneyToGoal = (id, amount) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) => {
        if (goal.id !== id) {
          return goal
        }

        const newSaved =
          goal.saved + Number(amount)

        return {
          ...goal,
          saved: Math.min(
            newSaved,
            goal.target
          ),
        }
      })
    )
  }

  return (
    <BudgetContext.Provider
      value={{
        transactions,

        addTransaction,
        deleteTransaction,
        editTransaction,

        income,
        expenses,
        balance,

        goals,
        addGoal,
        deleteGoal,
        editGoal,
        addMoneyToGoal,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}