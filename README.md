# React Budget App

A modular, client-side personal budget and expense tracker built with **React** and **Vite**. Designed to track starting budgets, categorize spending, calculate live category totals, and export/import portable save states without requiring a backend database.

---

## Features

- **Editable Starting Budget:** Toggle between view and inline edit modes with input validation guard rails (preventing negative or non-numeric entries) and real-time remaining balance calculation.
- **Categorized Expense Tracking:** Log expenses with a title, numeric amount, category tag, and ISO date stamp (`YYYY-MM-DD`).
- **Live Category Filtering & Analytics:** Filter expenses dynamically by category (`All` or any specific category) and view live category-by-category spending totals computed from active state.
- **Automatic Local Persistence:** Syncs budget and expense data automatically to `localStorage` with fallback parsing to handle empty or legacy entries safely.
- **Portable Save Codes (Export / Import):** Inspired by classic video game password save states—serializes budget and expense data into a Base64-encoded JSON string that can be copied, backed up, or shared and loaded into another session with validation checks.
- **Safe Reset Flow:** Confirmation-guarded reset utility that restores the default starting budget (`$2,500.00`) and clears stored expense entries.
- **Consistent Currency Formatting:** Standardized USD formatting (`$1,250.00`) via `Intl.NumberFormat`.

---

## Project Structure

```text
src/
├── components/
│   ├── CategorySelect.jsx   # Single-source-of-truth category dropdown with optional "All" filter mode
│   ├── ExpenseForm.jsx      # Controlled form for adding new categorized expenses
│   ├── FilterBar.jsx        # Category filter controls
│   ├── Header.jsx           # Budget display, inline budget editor, and remaining balance summary
│   └── SaveComponent.jsx    # Base64/JSON save code generator, loader, and data reset controls
├── utils/
│   └── currency.js          # Shared Intl.NumberFormat USD currency helper
├── App.jsx                  # Root state management, localStorage sync, and derived calculations
├── App.css                  # Component and layout styles
└── main.jsx                 # Application entry point