#  BudgetFlow

> Application web de gestion de budget personnel développée avec React.js.

##  Présentation

BudgetFlow est une application permettant de gérer facilement ses revenus, ses dépenses et ses objectifs d'épargne.

Le projet a été réalisé avec **React.js** afin de mettre en pratique les concepts fondamentaux et avancés de React : composants, hooks, Context API, React Router, gestion d'état, LocalStorage et visualisation de données.

##  Fonctionnalités

###  Dashboard

* Visualisation du solde actuel
* Total des revenus
* Total des dépenses
* Aperçu des dernières transactions
* Actions rapides

###  Transactions

* Ajouter une transaction
* Modifier une transaction
* Supprimer une transaction
* Ajouter une date
* Rechercher une transaction
* Filtrer par type
* Filtrer par mois

###  Objectifs d'épargne

* Créer un objectif
* Modifier un objectif
* Supprimer un objectif
* Ajouter de l'argent à un objectif
* Voir la progression en pourcentage
* Calcul automatique du montant restant
* Détection automatique lorsque l'objectif est atteint

###  Statistiques

* Revenus totaux
* Dépenses totales
* Solde
* Nombre de transactions
* Filtrage par mois
* Dépenses par catégorie
* Graphiques avec Recharts

###  Persistance des données

Les données sont sauvegardées dans le **LocalStorage** du navigateur afin de conserver les transactions et les objectifs après actualisation de la page.

##  Technologies utilisées

* React.js
* JavaScript
* React Router
* Context API
* React Hooks
* Recharts
* HTML5
* CSS3
* Vite
* LocalStorage
* Git & GitHub

##  Architecture

```text
src/
├── components/
│   ├── BalanceCard.jsx
│   ├── SummaryCard.jsx
│   ├── TransactionForm.jsx
│   ├── TransactionList.jsx
│   ├── GoalForm.jsx
│   ├── GoalList.jsx
│   └── Layout.jsx
│
├── context/
│   ├── BudgetContext.js
│   ├── BudgetProvider.jsx
│   └── useBudget.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Goals.jsx
│   └── Statistics.jsx
│
├── App.jsx
├── App.css
└── index.css
```

##  Installation

Cloner le projet :

```bash
git clone https://github.com/SalimaELGrini/budget-flow.git
```

Entrer dans le projet :

```bash
cd budget-flow
```

Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

Créer le build de production :

```bash
npm run build
```

##  Objectif du projet

Ce projet a été développé dans le cadre de mon apprentissage de **React.js** et de la création d'un portfolio professionnel.

Il m'a permis de pratiquer notamment :

* la création de composants réutilisables ;
* `useState` et `useEffect` ;
* la gestion d'état globale avec Context API ;
* la création d'un custom hook ;
* React Router ;
* la persistance des données avec LocalStorage ;
* les opérations CRUD ;
* les filtres et recherches ;
* la manipulation et transformation de données ;
* la création de graphiques ;
* le responsive design.

##  Auteur

**Salma El Grini**

Développeuse Full Stack — PHP / Laravel / React

* GitHub: SalimaELGrini
* LinkedIn: Salima El Grini
