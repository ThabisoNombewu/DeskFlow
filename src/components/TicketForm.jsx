import { useState } from 'react';

const INITIAL = { title: '', description: '', priority: 'Medium' };

export default function TicketForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(INITIAL);
  const [fieldErrors, setFieldErrors] = useState({});
  const [banner, setBanner] = useState(null);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const errors = {};
    if (form.title.trim().length < 3) errors.title = 'Title needs at least 3 characters.';
    if (form.description.trim().length < 10) errors.description = 'Description needs at least 10 characters.';
    if (!['Low', 'Medium', 'High'].includes(form.priority)) errors.priority = 'Choose a priority.';
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBanner(null);
    const errors = validate();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    const result = await onSubmit(form);
    if (result?.success) {
      setForm(INITIAL);
      setBanner({ type: 'success', text: 'Ticket submitted.' });
    } else {
      setBanner({ type: 'error', text: result?.message || 'Could not submit ticket.' });
    }
  }

  return (
    <form className="card ticket-form" onSubmit={handleSubmit} noValidate>
      <h2 className="card__title">New request</h2>

      {banner && <div className={`banner banner--${banner.type}`}>{banner.text}</div>}

      <label className="field">
        <span className="field__label">Title</span>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. Monitor flickering on second display"
          aria-invalid={Boolean(fieldErrors.title)}
        />
        {fieldErrors.title && <span className="field__error">{fieldErrors.title}</span>}
      </label>

      <label className="field">
        <span className="field__label">Description</span>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="What's happening? Steps you've already tried are helpful."
          aria-invalid={Boolean(fieldErrors.description)}
        />
        {fieldErrors.description && <span className="field__error">{fieldErrors.description}</span>}
      </label>

      <label className="field">
        <span className="field__label">Priority</span>
        <select value={form.priority} onChange={(e) => update('priority', e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <button type="submit" className="btn btn--primary" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit request'}
      </button>
    </form>
  );
}
