import GoalForm from "../components/GoalForm"
import GoalList from "../components/GoalList"

import { useBudget } from "../context/useBudget"

function Goals() {
  const {
    goals,
    addGoal,
    deleteGoal,
    editGoal,
    addMoneyToGoal,
  } = useBudget()

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h2>Objectifs d'épargne</h2>

          <p>
            Définissez vos objectifs et
            suivez votre progression.
          </p>
        </div>
      </div>

      <GoalForm
        onAddGoal={addGoal}
      />

      <GoalList
        goals={goals}
        onDeleteGoal={deleteGoal}
        onEditGoal={editGoal}
        onAddMoney={addMoneyToGoal}
      />
    </div>
  )
}

export default Goals