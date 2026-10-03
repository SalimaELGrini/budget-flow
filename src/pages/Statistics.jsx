
import {
  CalendarDays,
  ChartColumn,
  CircleDollarSign,
  Receipt,
  RotateCcw,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react"

import { useState } from "react"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { useBudget } from "../context/useBudget"

function Statistics() {
  const { transactions } = useBudget()

  const [selectedMonth, setSelectedMonth] =
    useState("all")

  const filteredTransactions =
    transactions.filter((transaction) => {
      if (selectedMonth === "all") {
        return true
      }

      return transaction.date?.startsWith(
        selectedMonth
      )
    })

  const income = filteredTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0)

  const expenses = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0)

  const balance = income - expenses

  const expenseTransactions =
    filteredTransactions.filter(
      (transaction) => transaction.type === "expense"
    )

  const expensesByCategory =
    expenseTransactions.reduce(
      (categories, transaction) => {
        const category =
          transaction.category || "Autre"

        categories[category] =
          (categories[category] || 0) +
          transaction.amount

        return categories
      },
      {}
    )

  const categories = Object.entries(
    expensesByCategory
  ).sort((a, b) => b[1] - a[1])

  const chartData = [
    {
      name: "Budget",
      Revenus: income,
      Dépenses: expenses,
    },
  ]

  const categoryChartData = categories.map(
    ([category, amount]) => ({
      category,
      amount,
    })
  )

  const formatAmount = (amount) =>
    `${amount.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} DH`

  const resetPeriod = () => {
    setSelectedMonth("all")
  }

  return (
    <div className="app">
      <div className="page-header statistics-page-header">
        <div>
          <span className="page-eyebrow">
            <ChartColumn size={15} />
            ANALYSE FINANCIÈRE
          </span>

          <h2>Statistiques</h2>

          <p>
            Comprenez vos habitudes financières
            et suivez votre budget.
          </p>
        </div>
      </div>

      <div className="statistics-filter">
        <div className="statistics-filter-heading">
          <CalendarDays size={19} />

          <div>
            <strong>Période d'analyse</strong>

            <p>
              Choisissez le mois à analyser.
            </p>
          </div>
        </div>

        <div className="statistics-filter-row">
          <input
            type="month"
            value={
              selectedMonth === "all"
                ? ""
                : selectedMonth
            }
            onChange={(event) =>
              setSelectedMonth(
                event.target.value || "all"
              )
            }
          />

          <button
            type="button"
            onClick={resetPeriod}
          >
            <RotateCcw size={15} />
            Toutes les périodes
          </button>
        </div>
      </div>

      <div className="statistics-summary">
        <div className="stat-card">
          <div className="stat-card-heading">
            <span>Revenus</span>

            <div className="stat-icon income-stat-icon">
              <TrendingUp size={20} />
            </div>
          </div>

          <strong>{formatAmount(income)}</strong>

          <small>Total des entrées</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-heading">
            <span>Dépenses</span>

            <div className="stat-icon expense-stat-icon">
              <TrendingDown size={20} />
            </div>
          </div>

          <strong>{formatAmount(expenses)}</strong>

          <small>Total des sorties</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-heading">
            <span>Solde</span>

            <div className="stat-icon balance-stat-icon">
              <Wallet size={20} />
            </div>
          </div>

          <strong className={balance >= 0 ? "income" : "expense"}>
            {formatAmount(balance)}
          </strong>

          <small>Revenus moins dépenses</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-heading">
            <span>Transactions</span>

            <div className="stat-icon transaction-stat-icon">
              <Receipt size={20} />
            </div>
          </div>

          <strong>
            {filteredTransactions.length}
          </strong>

          <small>Opérations enregistrées</small>
        </div>
      </div>

      <div className="statistics-card chart-card">
        <div className="chart-heading">
          <div>
            <h2>Revenus vs dépenses</h2>

            <p>
              Comparez les entrées et les sorties
              de votre budget.
            </p>
          </div>

          <div className="chart-heading-icon">
            <ChartColumn size={21} />
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <ChartColumn size={25} />
            </div>

            <strong>Aucune donnée disponible</strong>

            <p>
              Ajoutez des transactions pour afficher
              vos statistiques.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={chartData}
              margin={{
                top: 15,
                right: 15,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  formatAmount(Number(value)),
                  "Montant",
                ]}
              />

              <Legend />

              <Bar
                dataKey="Revenus"
                fill="#16803c"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="Dépenses"
                fill="#c62828"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="statistics-card chart-card">
        <div className="chart-heading">
          <div>
            <h2>Dépenses par catégorie</h2>

            <p>
              Identifiez les catégories qui
              représentent vos principales dépenses.
            </p>
          </div>

          <div className="chart-heading-icon">
            <CircleDollarSign size={21} />
          </div>
        </div>

        {categoryChartData.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <CircleDollarSign size={25} />
            </div>

            <strong>Aucune dépense</strong>

            <p>
              Les catégories apparaîtront après
              l'ajout de dépenses.
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={Math.max(
              260,
              categoryChartData.length * 55
            )}
          >
            <BarChart
              data={categoryChartData}
              layout="vertical"
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
              />

              <XAxis
                type="number"
                tickFormatter={(value) =>
                  `${value} DH`
                }
              />

              <YAxis
                type="category"
                dataKey="category"
                width={100}
              />

              <Tooltip
                formatter={(value) => [
                  formatAmount(Number(value)),
                  "Dépenses",
                ]}
              />

              <Bar
                dataKey="amount"
                name="Dépenses"
                fill="#4f46e5"
                radius={[0, 5, 5, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="statistics-card">
        <div className="chart-heading">
          <div>
            <h2>Détails des dépenses</h2>

            <p>
              Répartition de vos dépenses par catégorie.
            </p>
          </div>
        </div>

        {categories.length === 0 ? (
          <p className="statistics-empty-text">
            Aucune dépense pour cette période.
          </p>
        ) : (
          categories.map(([category, amount]) => {
            const percentage =
              expenses > 0
                ? (amount / expenses) * 100
                : 0

            return (
              <div
                className="category-stat"
                key={category}
              >
                <div className="category-header">
                  <strong>{category}</strong>

                  <span>
                    {formatAmount(amount)}
                  </span>
                </div>

                <div className="category-progress">
                  <div
                    className="category-progress-bar"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <small>
                  {percentage.toFixed(1)}% des dépenses
                </small>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Statistics