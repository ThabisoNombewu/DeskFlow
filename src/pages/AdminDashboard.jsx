import { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import TicketList from '../components/TicketList';
import { fetchTickets, updateTicketStatus } from '../api/tickets';

const STATUS_FILTERS = ['All', 'Open', 'In Progress', 'Resolved'];

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTickets();
      setTickets(data.tickets);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tickets.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleStatusChange(id, status) {
    setUpdatingId(id);
    const previous = tickets;
    setTickets((cur) => cur.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await updateTicketStatus(id, status);
    } catch (err) {
      setTickets(previous);
      setError(err.response?.data?.message || 'Could not update ticket status.');
    } finally {
      setUpdatingId(null);
    }
  }

  const visibleTickets = useMemo(() => {
    if (statusFilter === 'All') return tickets;
    return tickets.filter((t) => t.status === statusFilter);
  }, [tickets, statusFilter]);

  const counts = useMemo(() => {
    return tickets.reduce(
      (acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }),
      {}
    );
  }, [tickets]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <div className="page__header">
          <h1>Company-wide ticket feed</h1>
          <p>Every request across the organization, newest first.</p>
        </div>

        <div className="stat-row">
          <div className="stat-chip">
            <span className="stat-chip__value">{tickets.length}</span>
            <span className="stat-chip__label">Total</span>
          </div>
          <div className="stat-chip">
            <span className="stat-chip__value">{counts.Open || 0}</span>
            <span className="stat-chip__label">Open</span>
          </div>
          <div className="stat-chip">
            <span className="stat-chip__value">{counts['In Progress'] || 0}</span>
            <span className="stat-chip__label">In Progress</span>
          </div>
          <div className="stat-chip">
            <span className="stat-chip__value">{counts.Resolved || 0}</span>
            <span className="stat-chip__label">Resolved</span>
          </div>
        </div>

        <section className="card">
          <div className="card__header-row">
            <h2 className="card__title">All tickets</h2>
            <div className="filter-group" role="tablist" aria-label="Filter by status">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={statusFilter === s}
                  className={`filter-group__option ${statusFilter === s ? 'filter-group__option--active' : ''}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <TicketList
            tickets={visibleTickets}
            loading={loading}
            error={error}
            isAdmin
            onStatusChange={handleStatusChange}
            updatingId={updatingId}
            emptyLabel="No tickets match this filter."
          />
        </section>
      </main>
    </div>
  );
}
