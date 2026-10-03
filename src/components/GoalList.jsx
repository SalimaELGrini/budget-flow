import {
  CircleDollarSign,
  Pencil,
  Plus,
  Target,
  Trash2,
  Trophy,
} from "lucide-react"

import { useState } from "react"

function GoalList({
  goals,
  onDeleteGoal,
  onEditGoal,
  onAddMoney,
}) {
  const [editingGoal, setEditingGoal] =
    useState(null)

  const [moneyGoal, setMoneyGoal] =
    useState(null)

  const [editData, setEditData] =
    useState({
      name: "",
      target: "",
    })

  const [moneyAmount, setMoneyAmount] =
    useState("")

  const startEditing = (goal) => {
    setEditingGoal(goal)

    setEditData({
      name: goal.name,
      target: goal.target,
    })
  }

  const handleEditChange = (event) => {
    const { name, value } =
      event.target

    setEditData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()

    const numericTarget =
      Number(editData.target)

    if (
      !editData.name.trim() ||
      !numericTarget ||
      numericTarget <= 0
    ) {
      alert(
        "Veuillez vérifier les informations."
      )

      return
    }

    if (
      numericTarget <
      editingGoal.saved
    ) {
      alert(
        "Le montant objectif ne peut pas être inférieur au montant déjà épargné."
      )

      return
    }

    const updatedGoal = {
      ...editingGoal,
      name: editData.name.trim(),
      target: numericTarget,
    }

    onEditGoal(updatedGoal)

    setEditingGoal(null)
  }

  const startAddingMoney = (goal) => {
    setMoneyGoal(goal)
    setMoneyAmount("")
  }

  const handleMoneySubmit = (event) => {
    event.preventDefault()

    const numericAmount =
      Number(moneyAmount)

    if (
      !numericAmount ||
      numericAmount <= 0
    ) {
      alert(
        "Veuillez entrer un montant valide."
      )

      return
    }

    onAddMoney(
      moneyGoal.id,
      numericAmount
    )

    setMoneyGoal(null)
    setMoneyAmount("")
  }

  return (
    <div className="goal-list">
      <div className="section-heading">
        <div>
          <h2>Mes objectifs</h2>

          <p>
            Suivez votre progression vers vos
            objectifs d'épargne.
          </p>
        </div>

        <Target size={22} />
      </div>

      {goals.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Target size={25} />
          </div>

          <strong>
            Aucun objectif
          </strong>

          <p>
            Créez votre premier objectif
            d'épargne pour commencer.
          </p>
        </div>
      ) : (
        goals.map((goal) => {
          const percentage =
            goal.target > 0
              ? Math.min(
                  (goal.saved /
                    goal.target) *
                    100,
                  100
                )
              : 0

          const remaining =
            Math.max(
              goal.target -
                goal.saved,
              0
            )

          const completed =
            percentage >= 100

          return (
            <div
              className="goal-item"
              key={goal.id}
            >
              <div className="goal-header">
                <div className="goal-title">
                  <div className="goal-icon">
                    <Target size={19} />
                  </div>

                  <div>
                    <strong>
                      {goal.name}
                    </strong>

                    {completed && (
                      <span className="goal-completed">
                        <Trophy size={14} />
                        Objectif atteint
                      </span>
                    )}
                  </div>
                </div>

                <div className="goal-actions">
                  <button
                    type="button"
                    aria-label="Modifier"
                    title="Modifier"
                    onClick={() =>
                      startEditing(goal)
                    }
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    aria-label="Supprimer"
                    title="Supprimer"
                    onClick={() =>
                      onDeleteGoal(
                        goal.id
                      )
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="goal-amounts">
                <span>
                  {goal.saved.toFixed(2)} DH
                </span>

                <span>
                  {goal.target.toFixed(2)} DH
                </span>
              </div>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <div className="goal-footer">
                <span>
                  {percentage.toFixed(0)}%
                </span>

                {!completed && (
                  <span>
                    Reste{" "}
                    {remaining.toFixed(2)} DH
                  </span>
                )}
              </div>

              {!completed && (
                <button
                  className="save-money-button"
                  type="button"
                  onClick={() =>
                    startAddingMoney(
                      goal
                    )
                  }
                >
                  <Plus size={16} />
                  Ajouter de l'épargne
                </button>
              )}
            </div>
          )
        })
      )}

      {editingGoal && (
        <div className="goal-modal">
          <div className="goal-modal-content">
            <div className="modal-heading">
              <div className="modal-icon">
                <Pencil size={18} />
              </div>

              <div>
                <h3>
                  Modifier l'objectif
                </h3>

                <p>
                  Modifiez les informations
                  de votre objectif.
                </p>
              </div>
            </div>

            <form
              onSubmit={
                handleEditSubmit
              }
            >
              <label>
                Nom de l'objectif
              </label>

              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={
                  handleEditChange
                }
              />

              <label>
                Montant objectif
              </label>

              <input
                type="number"
                min="1"
                step="0.01"
                name="target"
                value={editData.target}
                onChange={
                  handleEditChange
                }
              />

              <div className="edit-actions">
                <button type="submit">
                  Enregistrer
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditingGoal(null)
                  }
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {moneyGoal && (
        <div className="goal-modal">
          <div className="goal-modal-content">
            <div className="modal-heading">
              <div className="modal-icon">
                <CircleDollarSign size={18} />
              </div>

              <div>
                <h3>
                  Ajouter de l'épargne
                </h3>

                <p>
                  Objectif :{" "}
                  <strong>
                    {moneyGoal.name}
                  </strong>
                </p>
              </div>
            </div>

            <form
              onSubmit={
                handleMoneySubmit
              }
            >
              <label>
                Montant à ajouter
              </label>

              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Ex: 500"
                value={moneyAmount}
                onChange={(event) =>
                  setMoneyAmount(
                    event.target.value
                  )
                }
              />

              <div className="edit-actions">
                <button type="submit">
                  <Plus size={16} />
                  Ajouter
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMoneyGoal(null)
                  }
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoalList