import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PRESETS = {
  Employee: { username: 't.nombewu@uvu.africa', password: 'employee123' },
  Admin: { username: 'a.mukwevho@uvu.africa', password: 'admin123' },
};

export default function LoginPage() {
  const { user, signIn, error, loading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('Employee');
  const [username, setUsername] = useState(PRESETS.Employee.username);
  const [password, setPassword] = useState(PRESETS.Employee.password);

  if (user) {
    return <Navigate to={user.role === 'Admin' ? '/admin' : '/dashboard'} replace />;
  }

  function selectRole(nextRole) {
    setRole(nextRole);
    setUsername(PRESETS[nextRole].username);
    setPassword(PRESETS[nextRole].password);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await signIn(username, password);
    if (ok) {
      navigate(role === 'Admin' ? '/admin' : '/dashboard');
    }
  }

  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <h1 className="auth-card__title">Sign in to DeskFlow</h1>
        <p className="auth-card__subtitle">Report issues, track resolutions, keep the org running.</p>

        <div className="role-toggle" role="tablist" aria-label="Login as">
          {['Employee', 'Admin'].map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={role === r}
              className={`role-toggle__option ${role === r ? 'role-toggle__option--active' : ''}`}
              onClick={() => selectRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="banner banner--error">{error}</div>}

          <label className="field">
            <span className="field__label">Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? 'Signing in…' : `Continue as ${role}`}
          </button>
        </form>

        <p className="auth-card__hint">Trouble signing in? Contact IT support.</p>
      </div>
    </div>
  );
}
