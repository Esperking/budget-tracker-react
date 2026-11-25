import formatCurrency from '../utils/currency'

function Header({
    budget,
    remainingBudget,
    isEditing,
    budgetInput,
    onBudgetInputChange,
    onStartEditing,
    onSaveBudget,
    onCancelEditing,
}) {
    return (
        <header>
            <h1>Budget App</h1>
            {isEditing ? (
                <form onSubmit={onSaveBudget}>
                    <input
                        type="number"
                        step="any"
                        value={budgetInput}
                        onChange={onBudgetInputChange}
                    />
                    <button type="submit">Save Budget</button>
                    <button type="button" onClick={onCancelEditing}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div>
                    <p>Starting Budget: {formatCurrency(budget)}</p>
                    <button type="button" onClick={onStartEditing}>
                        Edit Budget
                    </button>
                </div>
            )}
            <p>Remaining Budget: {formatCurrency(remainingBudget)}</p>
        </header>
    )
}
               
export default Header