import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import TextAIPage from './pages/tools/TextAIPage';
import CodeAIPage from './pages/tools/CodeAIPage';
import ImageAIPage from './pages/tools/ImageAIPage';
import AudioAIPage from './pages/tools/AudioAIPage';
import VideoAIPage from './pages/tools/VideoAIPage';
import JobsPage from './pages/JobsPage';
import PortfolioPage from './pages/PortfolioPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tools/text" element={<TextAIPage />} />
        <Route path="/tools/code" element={<CodeAIPage />} />
        <Route path="/tools/image" element={<ImageAIPage />} />
        <Route path="/tools/audio" element={<AudioAIPage />} />
        <Route path="/tools/video" element={<VideoAIPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
