import PriorityTag from './PriorityTag';
import StatusTag from './StatusTag';

const STATUSES = ['Open', 'In Progress', 'Resolved'];

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TicketRow({ ticket, isAdmin, onStatusChange, updating }) {
  return (
    <div className="ticket-row">
      <div className="ticket-row__main">
        <div className="ticket-row__top">
          <span className="ticket-row__id">#{ticket._id.slice(-6)}</span>
          <PriorityTag priority={ticket.priority} />
          {!isAdmin && <StatusTag status={ticket.status} />}
        </div>
        <h3 className="ticket-row__title">{ticket.title}</h3>
        <p className="ticket-row__description">{ticket.description}</p>
        <div className="ticket-row__meta">
          {isAdmin && <span>Submitted by {ticket.createdByName}</span>}
          <span>{formatDate(ticket.createdAt)}</span>
        </div>
      </div>

      {isAdmin && (
        <div className="ticket-row__control">
          <label className="field field--inline">
            <span className="field__label">Status</span>
            <select
              value={ticket.status}
              disabled={updating}
              onChange={(e) => onStatusChange(ticket._id, e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
