import client from './client';

export async function fetchTickets(params = {}) {
  const { data } = await client.get('/tickets', { params });
  return data;
}

export async function createTicket(payload) {
  const { data } = await client.post('/tickets', payload);
  return data;
}

export async function updateTicketStatus(id, status) {
  const { data } = await client.put(`/tickets/${id}`, { status });
  return data;
}
