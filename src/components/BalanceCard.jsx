function BalanceCard({ amount }) {
  const isPositive = amount >= 0

  return (
    <div
      className={
        isPositive
          ? "balance-card positive-card"
          : "balance-card negative-card"
      }
    >
      <span>Solde actuel</span>

      <h2>{amount.toFixed(2)} DH</h2>

      <small>
        {isPositive
          ? "Vous êtes dans le positif"
          : "Vous avez dépassé vos revenus"}
      </small>
    </div>
  )
}

export default BalanceCard