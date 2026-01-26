import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span>Welcome, {user?.firstName}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <nav style={{ marginBottom: '30px', display: 'flex', gap: '15px' }}>
        <Link to="/jobs"><button>Browse Jobs</button></Link>
        {user?.role === 'client' && <Link to="/create-job"><button>Post a Job</button></Link>}
        {user?.role === 'freelancer' && <Link to="/proposals"><button>My Proposals</button></Link>}
        <Link to="/profile"><button>Profile</button></Link>
        <Link to="/messages"><button>Messages</button></Link>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Welcome to NNIT AI Enterprise</h2>
          <p>Your AI-powered freelancing platform.</p>
          <p>Role: <strong>{user?.role}</strong></p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Quick Stats</h3>
          <p>Jobs Available: Loading...</p>
          <p>Active Proposals: Loading...</p>
          <p>Messages: Loading...</p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Recent Activity</h3>
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  );
}
