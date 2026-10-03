import {
  CalendarDays,
  Filter,
  RotateCcw,
  Search,
} from "lucide-react"

import { useState } from "react"

import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"
import { useBudget } from "../context/useBudget"

function Transactions() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
  } = useBudget()

  const [search, setSearch] = useState("")
  const [filterType, setFilterType] =
    useState("all")
  const [filterMonth, setFilterMonth] =
    useState("all")

  const filteredTransactions =
    transactions.filter((transaction) => {
      const searchValue =
        search.toLowerCase().trim()

      const description =
        transaction.description?.toLowerCase() || ""

      const category =
        transaction.category?.toLowerCase() || ""

      const matchesSearch =
        description.includes(searchValue) ||
        category.includes(searchValue)

      const matchesType =
        filterType === "all" ||
        transaction.type === filterType

      const matchesMonth =
        filterMonth === "all" ||
        transaction.date?.startsWith(filterMonth)

      return (
        matchesSearch &&
        matchesType &&
        matchesMonth
      )
    })

  const resetFilters = () => {
    setSearch("")
    setFilterType("all")
    setFilterMonth("all")
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h2>Mes transactions</h2>

          <p>
            Gérez et recherchez vos revenus et
            dépenses.
          </p>
        </div>
      </div>

      <TransactionForm
        onAddTransaction={addTransaction}
      />

      <section className="transaction-filters">
        <div className="filter-input">
          <Search size={17} />

          <input
            type="search"
            placeholder="Rechercher une transaction..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="filter-select">
          <Filter size={17} />

          <select
            value={filterType}
            onChange={(event) =>
              setFilterType(event.target.value)
            }
          >
            <option value="all">
              Tous les types
            </option>

            <option value="income">
              Revenus
            </option>

            <option value="expense">
              Dépenses
            </option>
          </select>
        </div>

        <div className="filter-select">
          <CalendarDays size={17} />

          <input
            type="month"
            value={
              filterMonth === "all"
                ? ""
                : filterMonth
            }
            onChange={(event) =>
              setFilterMonth(
                event.target.value || "all"
              )
            }
          />
        </div>

        <button
          type="button"
          className="reset-filter-button"
          onClick={resetFilters}
        >
          <RotateCcw size={16} />
          Réinitialiser
        </button>
      </section>

      <div className="transaction-results">
        <span>
          {filteredTransactions.length}{" "}
          {filteredTransactions.length <= 1
            ? "transaction trouvée"
            : "transactions trouvées"}
        </span>
      </div>

      <TransactionList
        transactions={filteredTransactions}
        onDeleteTransaction={deleteTransaction}
        onEditTransaction={editTransaction}
      />
    </div>
  )
}

export default Transactions