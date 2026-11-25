function SaveComponent({
  budget,
  expenses,
  saveCode,
  codeMessage,
  onSaveCodeChange,
  onSaveCodeGenerated,
  onCodeMessage,
  onLoadData,
  onResetAll,
}) {
  function handleGenerateCode() {
    try {
      const payload = JSON.stringify({ budget, expenses })
      const encoded = btoa(unescape(encodeURIComponent(payload)))
      onSaveCodeGenerated(encoded)
      onCodeMessage('Save code generated! Copy it to share or back up your data.')
    } catch {
      onCodeMessage('Could not generate save code.')
    }
  }

  function handleLoadCode() {
    try {
      const decoded = decodeURIComponent(escape(atob(saveCode.trim())))
      const parsed = JSON.parse(decoded)

      if (
        typeof parsed.budget !== 'number' ||
        Number.isNaN(parsed.budget) ||
        parsed.budget < 0 ||
        !Array.isArray(parsed.expenses)
      ) {
        onCodeMessage('That save code does not contain valid budget data.')
        return
      }

      onLoadData(parsed.budget, parsed.expenses)
      onCodeMessage('Save code loaded!')
    } catch {
      onCodeMessage('Invalid save code. Please check what you pasted and try again.')
    }
  }

  return (
    <section className="save-section">
      <h2>Save & Load</h2>
      <div>
        <button type="button" onClick={handleGenerateCode}>
          Generate Code
        </button>
        <button type="button" onClick={handleLoadCode}>
          Load Code
        </button>
        <button type="button" onClick={onResetAll}>
          Reset Data
        </button>
      </div>
      <textarea
        rows="3"
        placeholder="Enter your code here"
        value={saveCode}
        onChange={onSaveCodeChange}
      />
      {codeMessage && <p>{codeMessage}</p>}
    </section>
  )
}

export default SaveComponent