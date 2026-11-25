import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'  
import FilterBar from './components/FilterBar'
import SaveComponent from './components/SaveComponent'
import formatCurrency from './utils/currency'

function App() {
  const [budget, setBudget] = useState(() => {
    try {
      const savedBudget = localStorage.getItem('budgetApp_budget')
      const parsed = savedBudget !== null ? parseFloat(savedBudget) : 2500
      return Number.isNaN(parsed) ? 2500 : parsed
    } catch {
      return 2500
    }
  })

  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem('budgetApp_expenses')
      const parsed = savedExpenses !== null ? JSON.parse(savedExpenses) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [isEditing, setIsEditing] = useState(false)
  const [budgetInput, setBudgetInput] = useState(budget.toString())
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [saveCode, setSaveCode] = useState('')
  const [codeMessage, setCodeMessage] = useState('') 

  useEffect(() => {
    try {
      localStorage.setItem('budgetApp_budget', JSON.stringify(budget))
    } catch {
      // Ignore storage write errors in restricted browser modes
    }
  }, [budget])

  useEffect(() => {
    try {
      localStorage.setItem('budgetApp_expenses', JSON.stringify(expenses))
    } catch {
      // Ignore storage write errors in restricted browser modes
    }
  }, [expenses])

  function handleAddExpense(e) {
    e.preventDefault()

    const numericAmount = parseFloat(amount)
    if (!title.trim() || isNaN(numericAmount) || numericAmount <= 0) return

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: numericAmount,
      category: category,
      date: new Date().toISOString().slice(0, 10),
    }

    setExpenses([newExpense, ...expenses])
    setTitle('')
    setAmount('')
  }

  function calculateRemainingBudget() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    return budget - totalExpenses
  }

  function handleDeleteExpense(idToDelete) {
    const updatedExpenses = expenses.filter((expense) => expense.id !== idToDelete)
    setExpenses(updatedExpenses)
  }

  function handleStartEditingBudget() {
    setBudgetInput(String(budget))
    setIsEditing(true)
  }
  
  function handleSaveBudget(e) {
    e.preventDefault()
    const parsed = parseFloat(budgetInput)
    if (isNaN(parsed) || parsed < 0) return

    setBudget(parsed)
    setIsEditing(false)
  }

  function handleReset() {
    const confirmed = window.confirm('Are you sure you want to reset all data?')
    if (!confirmed) return

    setBudget(2500)
    setExpenses([])
    setBudgetInput('2500')
    setSelectedCategory('All')
    setSaveCode('')
    setCodeMessage('')
  }

  const visibleExpenses = 
  selectedCategory === 'All' 
  ? expenses 
  : expenses.filter(expense => expense.category === selectedCategory)

  const totalbyCategory = visibleExpenses.reduce((totals, expense) => {
    const category = expense.category || 'Other'
    totals[category] = (totals[category] || 0) + expense.amount
    return totals
  }, {})  

  const categoryEntries = Object.entries(totalbyCategory)
  
  return (
    <main className="BudgetApp">
      <Header
        budget={budget}
        remainingBudget={calculateRemainingBudget()}
        isEditing={isEditing}
        budgetInput={budgetInput}
        onBudgetInputChange={(e) => setBudgetInput(e.target.value)}
        onStartEditing={handleStartEditingBudget}
        onSaveBudget={handleSaveBudget}
        onCancelEditing={() => setIsEditing(false)}
      />

      <ExpenseForm
        title={title}
        amount={amount}   
        category={category}
        onTitleChange={(e) => setTitle(e.target.value)}
        onAmountChange={(e) => setAmount(e.target.value)}
        onCategoryChange={(e) => setCategory(e.target.value)}
        onAddExpense={handleAddExpense}
      />

      <section className="expenses-section">
        <h2>Expenses ({expenses.length})</h2>

        {categoryEntries.length > 0 && (
          <div className="category-totals">
            <ul>
              {categoryEntries.map(([category, total]) => (
                <li key={category}>
                  {category}: {formatCurrency(total)}
                </li>
              ))}
            </ul>   
          </div>
        )}

        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={(e) => setSelectedCategory(e.target.value)}
        />


        <SaveComponent
          budget={budget}
          expenses={expenses}
          saveCode={saveCode}
          codeMessage={codeMessage}
          onSaveCodeChange={(e) => setSaveCode(e.target.value)}
          onSaveCodeGenerated={(encoded) => setSaveCode(encoded)}
          onCodeMessage={(msg) => setCodeMessage(msg)}
          onLoadData={(loadedBudget, loadedExpenses) => {
            setBudget(loadedBudget)
            setExpenses(loadedExpenses)
            setSelectedCategory('All')
          }}
          onResetAll={handleReset}
        />

        {visibleExpenses.length === 0 && <p>No expenses found for the selected category.</p>}
        <ul>
          {visibleExpenses.map((expense) => (
            <li key={expense.id}>
              {expense.title} ({expense.category || 'Other'} {expense.date || 'N/A'}) :
              {formatCurrency(expense.amount)}
              <button type="button" onClick={() => handleDeleteExpense(expense.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
} 

export default App