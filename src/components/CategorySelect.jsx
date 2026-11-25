const CATEGORIES = [
    "Food",
    "Transportation",
    "Entertainment",
    "Health",
    "Housing",
    "Personal Care",
    "Gifts",
    "Subscriptions",
    "Emergency Fund",
    "Retirement Fund",
    "Education",
    "Legal",
    "Insurance",
    "Other"
]

function CategorySelect({value, onChange, includeAll = false}) {
  return (
    <select value={value} onChange={onChange}>
      {includeAll && <option value="All">All</option>}
      {CATEGORIES.map((categoryName) => (
        <option key={categoryName} value={categoryName}>
            {categoryName}
        </option>
      ))}
    </select>
  )
}

export default CategorySelect;