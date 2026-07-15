const SLUG = {
  Open: 'open',
  'In Progress': 'in-progress',
  Resolved: 'resolved',
};

export default function StatusTag({ status }) {
  return <span className={`tag tag--status-${SLUG[status] || 'open'}`}>{status}</span>;
}
