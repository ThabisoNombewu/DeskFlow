import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__mark">DF</span>
        <div>
          <div className="navbar__title">DeskFlow</div>
          <div className="navbar__subtitle">Internal IT Service Desk</div>
        </div>
      </div>
      {user && (
        <div className="navbar__session">
          <div className="navbar__user">
            <span className="navbar__name">{user.displayName}</span>
            <span className={`badge badge--${user.role.toLowerCase()}`}>{user.role}</span>
          </div>
          <button type="button" className="btn btn--ghost" onClick={signOut}>
            Sign out
          </button>
        </div>
      )}
    </header>
  );
}
