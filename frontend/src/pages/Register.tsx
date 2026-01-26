import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'freelancer' as 'client' | 'freelancer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      const { user, token } = response.data;
      setAuth(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {error && <div style={{ color: 'red', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>{error}</div>}
        
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={6}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="role">I am a:</label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'client' | 'freelancer' })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
