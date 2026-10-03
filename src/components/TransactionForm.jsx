import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  Tag,
  Plus,
} from "lucide-react"

import { useState } from "react"

function TransactionForm({ onAddTransaction }) {
  const [type, setType] =
    useState("expense")

  const [amount, setAmount] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (
      !numericAmount ||
      numericAmount <= 0 ||
      !category.trim() ||
      !description.trim() ||
      !date
    ) {
      alert(
        "Veuillez remplir correctement tous les champs."
      )

      return
    }

    const transaction = {
      id: Date.now(),
      type,
      amount: numericAmount,
      category: category.trim(),
      description: description.trim(),
      date,
    }

    onAddTransaction(transaction)

    setAmount("")
    setCategory("")
    setDescription("")
    setDate(
      new Date().toISOString().split("T")[0]
    )
  }

  return (
    <div className="transaction-form">
      <div className="form-title">
        <div className="form-title-icon">
          <Plus size={20} />
        </div>

        <div>
          <h2>Ajouter une transaction</h2>

          <p>
            Enregistrez un revenu ou une dépense.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Type</label>

        <select
          value={type}
          onChange={(event) =>
            setType(event.target.value)
          }
        >
          <option value="expense">
            Dépense
          </option>

          <option value="income">
            Revenu
          </option>
        </select>

        <label>
          <CircleDollarSign size={15} />
          Montant
        </label>

        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Ex: 500"
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value)
          }
        />

        <label>
          <Tag size={15} />
          Catégorie
        </label>

        <input
          type="text"
          placeholder="Ex: Transport"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        />

        <label>
          <FileText size={15} />
          Description
        </label>

        <input
          type="text"
          placeholder="Ex: Taxi"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />

        <label>
          <CalendarDays size={15} />
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(event) =>
            setDate(event.target.value)
          }
        />

        <button type="submit">
          <Plus size={17} />
          Ajouter la transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionForm