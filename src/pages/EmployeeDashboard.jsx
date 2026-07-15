import { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import { fetchTickets, createTicket } from '../api/tickets';

export default function EmployeeDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTickets();
      setTickets(data.tickets);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your tickets.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      await createTicket(payload);
      await load();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.errors?.join(' ') || err.response?.data?.message || 'Submission failed.';
      return { success: false, message };
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <div className="page__header">
          <h1>My requests</h1>
          <p>Submit a new issue and track its progress through resolution.</p>
        </div>
        <div className="dashboard-grid">
          <TicketForm onSubmit={handleSubmit} submitting={submitting} />
          <section className="card">
            <h2 className="card__title">Request history</h2>
            <TicketList
              tickets={tickets}
              loading={loading}
              error={error}
              isAdmin={false}
              emptyLabel="You haven't submitted any tickets yet."
            />
          </section>
        </div>
      </main>
    </div>
  );
}
