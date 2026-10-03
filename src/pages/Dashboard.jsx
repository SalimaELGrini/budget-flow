
import {
  ArrowRight,
  ChartColumn,
  CircleDollarSign,
  Target,
  Wallet,
} from "lucide-react"

import { Link } from "react-router-dom"

import BalanceCard from "../components/BalanceCard"
import SummaryCard from "../components/SummaryCard"
import TransactionList from "../components/TransactionList"

import { useBudget } from "../context/useBudget"

function Dashboard() {
  const {
    transactions,
    income,
    expenses,
    balance,
    deleteTransaction,
    editTransaction,
  } = useBudget()

  const recentTransactions = [...transactions]
    .reverse()
    .slice(0, 5)

  return (
    <div className="app">
      <div className="dashboard-header">
        <div>
          <h2>Bonjour</h2>

          <p>
            Voici un aperçu de votre budget.
          </p>
        </div>

        <Link
          to="/transactions"
          className="primary-button"
        >
          <Wallet size={17} />
          Ajouter une transaction
        </Link>
      </div>

      <div
        className={
          balance >= 0
            ? "balance-status positive"
            : "balance-status negative"
        }
      >
        <CircleDollarSign size={18} />

        <span>
          {balance >= 0
            ? "Votre solde est positif"
            : "Attention, votre solde est négatif"}
        </span>
      </div>

      <BalanceCard amount={balance} />

      <div className="summary">
        <SummaryCard
          title="Revenus"
          amount={income}
        />

        <SummaryCard
          title="Dépenses"
          amount={expenses}
        />
      </div>

      <div className="quick-actions">
        <h2>Actions rapides</h2>

        <div className="quick-actions-grid">
          <Link to="/transactions">
            <span className="quick-action-icon">
              <Wallet size={25} />
            </span>

            <strong>Transactions</strong>

            <small>
              Gérer vos revenus et dépenses
            </small>

            <ArrowRight
              size={18}
              className="quick-action-arrow"
            />
          </Link>

          <Link to="/goals">
            <span className="quick-action-icon">
              <Target size={25} />
            </span>

            <strong>Objectifs</strong>

            <small>
              Suivre votre épargne
            </small>

            <ArrowRight
              size={18}
              className="quick-action-arrow"
            />
          </Link>

          <Link to="/statistics">
            <span className="quick-action-icon">
              <ChartColumn size={25} />
            </span>

            <strong>Statistiques</strong>

            <small>
              Analyser votre budget
            </small>

            <ArrowRight
              size={18}
              className="quick-action-arrow"
            />
          </Link>
        </div>
      </div>

      <TransactionList
        transactions={recentTransactions}
        onDeleteTransaction={deleteTransaction}
        onEditTransaction={editTransaction}
      />
    </div>
  )
}

export default Dashboard
