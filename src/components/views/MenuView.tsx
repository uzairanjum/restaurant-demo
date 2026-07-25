import { useDashboard } from '../../context/DashboardContext'
import './MenuView.css'

export function MenuView() {
  const dash = useDashboard()

  return (
    <>
      <h1 className="pageTitle">Menu</h1>
      <p className="pageSubtitle" style={{ marginBottom: 18 }}>
        Items and modifiers the AI agent recognizes from WhatsApp messages.
      </p>

      {dash.menuCategories.map((cat) => (
        <div key={cat.name} className="menuCategory">
          <h2>{cat.name}</h2>
          <div className="menuGrid">
            {cat.items.map((item) => (
              <div key={item.name} className="menuItem">
                <div className="menuItem__head">
                  <div className="menuItem__name">{item.name}</div>
                  <div className="menuItem__price">${item.priceStr}</div>
                </div>
                <div className="menuItem__desc">{item.desc}</div>
                {item.hasOptions && (
                  <div>
                    <div className="menuItem__label">Options</div>
                    <div className="menuItem__tags">
                      {item.options.map((opt) => (
                        <span key={opt} className="menuItem__tag menuItem__tag--neutral">{opt}</span>
                      ))}
                    </div>
                  </div>
                )}
                {item.hasAddons && (
                  <div>
                    <div className="menuItem__label">Add-ons</div>
                    <div className="menuItem__tags">
                      {item.addons.map((ad) => (
                        <span key={ad.label} className="menuItem__tag menuItem__tag--brand">{ad.label}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button type="button" className="menuAddBtn" onClick={() => dash.openAddItem(cat.name)}>
            ＋ Add item to {cat.name}
          </button>
        </div>
      ))}

      {dash.showAddCategoryButton && (
        <button type="button" className="menuAddCategoryBtn" onClick={dash.openCategoryInput}>
          ＋ Add category
        </button>
      )}

      {dash.showCategoryInput && (
        <div className="menuCategoryInput">
          <input
            value={dash.categoryDraft}
            onChange={(e) => dash.onCategoryDraftChange(e.target.value)}
            placeholder="Category name"
          />
          <button type="button" className="btnPrimary" onClick={dash.saveCategory}>Add</button>
          <button type="button" className="btnSecondary" onClick={dash.cancelCategoryInput}>Cancel</button>
        </div>
      )}

      {dash.showItemModal && (
        <div className="menuModalOverlay" onClick={dash.closeItemModal}>
          <div className="menuModal" onClick={(e) => e.stopPropagation()}>
            <header className="menuModal__head">
              <h2>Add item — {dash.itemForm.category}</h2>
              <button type="button" onClick={dash.closeItemModal}>✕</button>
            </header>
            <div className="menuModal__body">
              <div>
                <div className="fieldLabel">Name</div>
                <input value={dash.itemForm.name} onChange={(e) => dash.onItemFormChange('name')(e.target.value)} placeholder="e.g. Bacon Cheeseburger" />
              </div>
              <div>
                <div className="fieldLabel">Price</div>
                <input value={dash.itemForm.price} onChange={(e) => dash.onItemFormChange('price')(e.target.value)} type="number" step="0.5" placeholder="9.50" />
              </div>
              <div>
                <div className="fieldLabel">Description</div>
                <input value={dash.itemForm.desc} onChange={(e) => dash.onItemFormChange('desc')(e.target.value)} placeholder="Short description" />
              </div>
              <div>
                <div className="fieldLabel">Options (comma-separated)</div>
                <input value={dash.itemForm.options} onChange={(e) => dash.onItemFormChange('options')(e.target.value)} placeholder="No onions, No tomato" />
              </div>
              <div>
                <div className="fieldLabel">Add-ons</div>
                {dash.itemFormAddons.map((ad, i) => (
                  <div key={i} className="menuModal__addon">
                    <span>{ad.name} — +${ad.priceStr}</span>
                    <button type="button" onClick={ad.remove}>Remove</button>
                  </div>
                ))}
                <div className="menuModal__addonInput">
                  <input value={dash.itemForm.addonName} onChange={(e) => dash.onItemFormChange('addonName')(e.target.value)} placeholder="Add-on name" />
                  <input value={dash.itemForm.addonPrice} onChange={(e) => dash.onItemFormChange('addonPrice')(e.target.value)} type="number" step="0.5" placeholder="Price" />
                  <button type="button" onClick={dash.addAddonRow}>Add</button>
                </div>
              </div>
            </div>
            <footer className="menuModal__foot">
              <button type="button" className="btnSecondary" onClick={dash.closeItemModal}>Cancel</button>
              <button type="button" className="btnPrimary" onClick={dash.saveItem}>Add item</button>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
