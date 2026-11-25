import CategorySelect from './CategorySelect';


function FilterBar({selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-bar">
        <label>
          Filter by Category:{' '}
            <CategorySelect
                value={selectedCategory}
                onChange={onCategoryChange}
                includeAll={true}
            />
        </label>
    </div>
  )
}

export default FilterBar;