import CategorySelect from './CategorySelect';

function ExpenseForm({
    title,
    amount,
    category,
    onTitleChange,
    onAmountChange,
    onCategoryChange,
    onAddExpense,
}){
    return (
        <form onSubmit={onAddExpense}>
            <input
                type="text"
                placeholder="Expense Name"
                value={title}
                onChange={onTitleChange}
            />
            <input
                type="number"
                placeholder="Expense Amount"
                value={amount}
                onChange={onAmountChange}
            />
            <CategorySelect
                value={category}
                onChange={onCategoryChange}
            />
            <button type="submit">Add Expense</button>
        </form>
    )
}

export default ExpenseForm

