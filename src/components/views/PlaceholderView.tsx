import './PlaceholderView.css'

export function PlaceholderView() {
  return (
    <div className="placeholder">
      <div className="placeholder__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="12.5" />
          <circle cx="12" cy="15.5" r=".5" fill="currentColor" />
        </svg>
      </div>
      <div className="placeholder__title">Not part of this POC</div>
      <div className="placeholder__text">
        This section isn't built out yet — this pass focuses on the kitchen board, order detail, and payment review flow.
      </div>
    </div>
  )
}
