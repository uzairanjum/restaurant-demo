import { useDashboard } from '../../context/DashboardContext'
import './ConversationsView.css'

export function ConversationsView() {
  const dash = useDashboard()

  return (
    <div className="conversations">
      <div className="conversations__list">
        <div className="conversations__listHead">
          <h1>Conversations</h1>
          <p>WhatsApp threads across all orders</p>
        </div>
        {dash.conversationList.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`conversations__row${c.selected ? ' conversations__row--selected' : ''}`}
            onClick={() => dash.selectConversation(c.id)}
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
              <div>
                <div className="conversations__panelName">{dash.activeConversation.customer}</div>
                <div className="conversations__panelMeta">
                  {dash.activeConversation.phone} · Order #{dash.activeConversation.id}
                </div>
              </div>
              <button
                type="button"
                className="conversations__openOrder"
                onClick={() => dash.selectOrder(dash.activeConversation!.id)}
              >
                Open order
              </button>
            </div>
            <div className="conversations__messages">
              {dash.activeConversation.messages.map((m, i) => (
                <div key={i} style={m.rowStyle}>
                  <div style={m.bubbleStyle}>
                    {m.ai && <div className="conversations__ai">✦ AI parsed</div>}
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
                placeholder="Send a WhatsApp message…"
              />
              <button type="button" className="btnPrimary" onClick={dash.sendConversationMessage}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
