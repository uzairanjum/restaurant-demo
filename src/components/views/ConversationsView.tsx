import { useState } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { useT } from '../../context/LanguageContext'
import './ConversationsView.css'

export function ConversationsView() {
  const dash = useDashboard()
  const t = useT()
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false)

  return (
    <div
      className={`conversations${mobileThreadOpen ? ' conversations--threadOpen' : ''}`}
    >
      <div className="conversations__list">
        <div className="conversations__listHead">
          <h1>{t('conversations.title')}</h1>
          <p>{t('conversations.subtitle')}</p>
        </div>
        {dash.conversationList.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`conversations__row${c.selected ? ' conversations__row--selected' : ''}`}
            onClick={() => {
              dash.selectConversation(c.id)
              setMobileThreadOpen(true)
            }}
          >
            <span className="conversations__avatar">{c.initials}</span>
            <div className="conversations__preview">
              <div className="conversations__previewTop">
                <span>{c.customer}</span>
                <span>{c.timeLabel}</span>
              </div>
              <div className="conversations__last">{c.lastMessage}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="conversations__panel">
        {dash.activeConversation && (
          <>
            <div className="conversations__panelHead">
              <div className="conversations__panelHeadLeft">
                <button
                  type="button"
                  className="conversations__backBtn"
                  onClick={() => setMobileThreadOpen(false)}
                  aria-label={t('conversations.back')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" /><path d="M11 18l-6-6 6-6" />
                  </svg>
                </button>
                <div>
                  <div className="conversations__panelName">{dash.activeConversation.customer}</div>
                  <div className="conversations__panelMeta">
                    {dash.activeConversation.phone} ·{' '}
                    {t('conversations.orderLabel', { id: dash.activeConversation.id })}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="conversations__openOrder"
                onClick={() => dash.selectOrder(dash.activeConversation!.id)}
              >
                {t('conversations.openOrder')}
              </button>
            </div>
            <div className="conversations__messages">
              {dash.activeConversation.messages.map((m, i) => (
                <div key={i} style={m.rowStyle}>
                  <div style={m.bubbleStyle}>
                    {m.ai && <div className="conversations__ai">{t('conversations.ai')}</div>}
                    <div>{m.text}</div>
                    <div className="conversations__time">{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="conversations__composer">
              <input
                value={dash.conversationDraft}
                onChange={(e) => dash.onConversationDraftChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && dash.sendConversationMessage()}
                placeholder={t('conversations.placeholder')}
              />
              <button type="button" className="btnPrimary" onClick={dash.sendConversationMessage}>
                {t('conversations.send')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
