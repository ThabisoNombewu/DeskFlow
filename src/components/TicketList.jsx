import TicketRow from './TicketRow';

export default function TicketList({ tickets, loading, error, isAdmin, onStatusChange, updatingId, emptyLabel }) {
  if (loading) {
    return <div className="state-panel">Loading tickets…</div>;
  }

  if (error) {
    return <div className="state-panel state-panel--error">{error}</div>;
  }

  if (!tickets.length) {
    return <div className="state-panel">{emptyLabel || 'No tickets yet.'}</div>;
  }

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <TicketRow
          key={ticket._id}
          ticket={ticket}
          isAdmin={isAdmin}
          onStatusChange={onStatusChange}
          updating={updatingId === ticket._id}
        />
      ))}
    </div>
  );
}
