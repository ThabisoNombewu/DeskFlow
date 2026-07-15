export default function PriorityTag({ priority }) {
  return <span className={`tag tag--priority-${priority.toLowerCase()}`}>{priority}</span>;
}
