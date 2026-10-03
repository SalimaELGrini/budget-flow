
import {
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react"

import { useState } from "react"

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const [editingTransaction, setEditingTransaction] =
    useState(null)

  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  })

  const startEditing = (transaction) => {
    setEditingTransaction(transaction)

    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      date:
        transaction.date ||
        new Date().toISOString().split("T")[0],
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const amount = Number(formData.amount)

    if (
      !amount ||
      amount <= 0 ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.date
    ) {
      alert(
        "Veuillez remplir correctement tous les champs."
      )
      return
    }

    const updatedTransaction = {
      ...editingTransaction,
      type: formData.type,
      amount,
      category: formData.category.trim(),
      description: formData.description.trim(),
      date: formData.date,
    }

    onEditTransaction(updatedTransaction)
    setEditingTransaction(null)
  }

  const formatDate = (date) => {
    if (!date) {
      return "Date inconnue"
    }

    return new Date(date + "T12:00:00").toLocaleDateString(
      "fr-FR"
    )
  }

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <CalendarDays size={25} />
          </div>

          <strong>Aucune transaction</strong>

          <p>
            Ajoutez votre première transaction pour
            commencer à suivre votre budget.
          </p>
        </div>
      ) : (
        transactions.map((transaction) => (
          <div
            className="transaction-item"
            key={transaction.id}
          >
            <div className="transaction-info">
              <strong>{transaction.description}</strong>

              <span>{transaction.category}</span>

              <span>
                {transaction.type === "income"
                  ? "Revenu"
                  : "Dépense"}
              </span>

              <small className="transaction-date">
                <CalendarDays size={13} />
                {formatDate(transaction.date)}
              </small>
            </div>

            <div className="transaction-actions">
              <strong
                className={
                  transaction.type === "income"
                    ? "income"
                    : "expense"
                }
              >
                {transaction.type === "income" ? "+" : "-"}
                {Number(transaction.amount).toFixed(2)} DH
              </strong>

              <button
                type="button"
                className="icon-button edit-button"
                aria-label="Modifier la transaction"
                title="Modifier"
                onClick={() => startEditing(transaction)}
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                className="icon-button delete-button"
                aria-label="Supprimer la transaction"
                title="Supprimer"
                onClick={() =>
                  onDeleteTransaction(transaction.id)
                }
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}

      {editingTransaction && (
        <div className="edit-form">
          <h3>Modifier la transaction</h3>

          <form onSubmit={handleSubmit}>
            <label>Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="expense">Dépense</option>
              <option value="income">Revenu</option>
            </select>

            <label>Montant</label>

            <input
              type="number"
              min="0.01"
              step="0.01"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <label>Catégorie</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <label>Description</label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <div className="edit-actions">
              <button type="submit">
                Enregistrer
              </button>

              <button
                type="button"
                onClick={() => setEditingTransaction(null)}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default TransactionList
