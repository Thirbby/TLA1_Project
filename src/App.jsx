import { useState } from 'react'
import './App.css'

function App() {
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [error, setError] = useState('')

  function handleAddCategory(event) {
    event.preventDefault()
    const name = categoryName.trim()
    const description = categoryDescription.trim()

    if (!name || !description) {
      setError('Please complete both input fields.')
      return
    }

    setCategories((currentCategories) => [
      ...currentCategories,
      { id: crypto.randomUUID(), name, description },
    ])
    setCategoryName('')
    setCategoryDescription('')
    setError('')
    document.getElementById('txtCatName')?.focus()
  }

  return (
    <main className="ledger-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Ledger home">
          <span className="brand-mark" aria-hidden="true">L</span>
          <span>FIELDNOTES <span className="brand-divider">/</span> FINANCE</span>
        </a>
        <span className="topbar-label">INCOME MANAGEMENT</span>
      </header>

      <div className="ledger-content" id="top">
        <div className="page-heading">
          <div>
            <p className="eyebrow">LEDGER SETUP <span>01</span></p>
            <h1>Income categories</h1>
            <p className="page-intro">Organize the sources that bring your business in.</p>
          </div>
          <div className="category-total" aria-live="polite">
            <span className="total-value">{String(categories.length).padStart(2, '0')}</span>
            <span className="total-label">CATEGORIES</span>
          </div>
        </div>

        <section className="entry-section" aria-labelledby="entry-heading">
          <div className="section-heading">
            <span className="section-index">A</span>
            <h2 id="entry-heading">Register a category</h2>
          </div>
          <form id="categoryForm" onSubmit={handleAddCategory} noValidate>
            <div className="form-fields">
              <div className="field-group">
                <label htmlFor="txtCatName">Category name</label>
                <input
                  id="txtCatName"
                  type="text"
                  placeholder="e.g. Consulting"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                  aria-invalid={Boolean(error && !categoryName.trim())}
                  aria-describedby={error ? 'form-error' : undefined}
                />
              </div>
              <div className="field-group">
                <label htmlFor="txtCatDesc">Description</label>
                <input
                  id="txtCatDesc"
                  type="text"
                  placeholder="What does this income cover?"
                  value={categoryDescription}
                  onChange={(event) => setCategoryDescription(event.target.value)}
                  aria-invalid={Boolean(error && !categoryDescription.trim())}
                  aria-describedby={error ? 'form-error' : undefined}
                />
              </div>
              <button type="submit" id="btnAdd" className="add-button">
                <span aria-hidden="true">+</span> Add category
              </button>
            </div>
            {error && <p className="form-error" id="form-error" role="alert">{error}</p>}
          </form>
        </section>

        <section className="list-section" aria-labelledby="list-heading">
          <div className="list-heading">
            <div className="section-heading">
              <span className="section-index">B</span>
              <h2 id="list-heading">Registered categories</h2>
            </div>
            <span className="list-count">{categories.length} {categories.length === 1 ? 'ENTRY' : 'ENTRIES'}</span>
          </div>
          <div className="table-frame">
            <table>
              <thead>
                <tr>
                  <th scope="col">Category name</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody id="listIncomeCat">
                {categories.length === 0 ? (
                  <tr className="empty-row">
                    <td colSpan="2">
                      <span className="empty-mark" aria-hidden="true">—</span>
                      <span>No categories registered yet</span>
                    </td>
                  </tr>
                ) : categories.map((category, index) => (
                  <tr key={category.id}>
                    <td className="category-cell">
                      <span className="row-number">{String(index + 1).padStart(2, '0')}</span>
                      {category.name}
                    </td>
                    <td className="description-cell">{category.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <footer className="page-footer">
        <span>FIELDNOTES <span className="brand-divider">/</span> FINANCE</span>
        <span>INCOME LEDGER <span className="footer-dot" aria-hidden="true">●</span> ACTIVE</span>
      </footer>
    </main>
  )
}

export default App
