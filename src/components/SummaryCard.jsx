import {
  TrendingDown,
  TrendingUp,
} from "lucide-react"

function SummaryCard({ title, amount }) {
  const isIncome = title === "Revenus"

  return (
    <div
      className={
        isIncome
          ? "card income-card"
          : "card expense-card"
      }
    >
      <div className="summary-card-title">
        <div className="summary-card-icon">
          {isIncome ? (
            <TrendingUp size={18} />
          ) : (
            <TrendingDown size={18} />
          )}
        </div>

        <span>{title}</span>
      </div>

      <h3>
        {amount.toFixed(2)} DH
      </h3>
    </div>
  )
}

export default SummaryCard