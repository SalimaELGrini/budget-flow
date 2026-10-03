import {
  Wallet,
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  ChartColumn,
} from "lucide-react"

import { NavLink, Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="logo-icon">
            <Wallet size={23} strokeWidth={2.2} />
          </div>

          <div>
            <h1>BudgetFlow</h1>
            <small>Personal Finance</small>
          </div>
        </div>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <ArrowLeftRight size={17} />
            <span>Transactions</span>
          </NavLink>

          <NavLink
            to="/goals"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <Target size={17} />
            <span>Goals</span>
          </NavLink>

          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <ChartColumn size={17} />
            <span>Statistics</span>
          </NavLink>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout