import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { BudgetProvider } from "./context/BudgetProvider"

import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Goals from "./pages/Goals"
import Statistics from "./pages/Statistics"

import "./App.css"

function App() {
  return (
    <BudgetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/goals"
              element={<Goals />}
            />

            <Route
              path="/statistics"
              element={<Statistics />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </BudgetProvider>
  )
}

export default App