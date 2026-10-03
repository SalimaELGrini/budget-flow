import {
  CircleDollarSign,
  Target,
  Plus,
} from "lucide-react"

import { useState } from "react"

function GoalForm({ onAddGoal }) {
  const [name, setName] = useState("")
  const [target, setTarget] = useState("")
  const [saved, setSaved] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    const numericTarget = Number(target)
    const numericSaved = Number(saved)

    if (
      !name.trim() ||
      !numericTarget ||
      numericTarget <= 0 ||
      numericSaved < 0 ||
      numericSaved > numericTarget
    ) {
      alert(
        "Veuillez vérifier les informations saisies."
      )

      return
    }

    const goal = {
      id: Date.now(),
      name: name.trim(),
      target: numericTarget,
      saved: numericSaved,
    }

    onAddGoal(goal)

    setName("")
    setTarget("")
    setSaved("")
  }

  return (
    <div className="goal-form">
      <div className="form-title">
        <div className="form-title-icon">
          <Target size={20} />
        </div>

        <div>
          <h2>Nouvel objectif</h2>

          <p>
            Définissez un objectif d'épargne.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <Target size={15} />
          Nom de l'objectif
        </label>

        <input
          type="text"
          placeholder="Ex: Acheter un PC"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <label>
          <CircleDollarSign size={15} />
          Montant objectif
        </label>

        <input
          type="number"
          min="1"
          step="0.01"
          placeholder="Ex: 10000"
          value={target}
          onChange={(event) =>
            setTarget(event.target.value)
          }
        />

        <label>
          <CircleDollarSign size={15} />
          Montant déjà épargné
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Ex: 2500"
          value={saved}
          onChange={(event) =>
            setSaved(event.target.value)
          }
        />

        <button type="submit">
          <Plus size={17} />
          Ajouter l'objectif
        </button>
      </form>
    </div>
  )
}

export default GoalForm