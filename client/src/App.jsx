import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Dashboard from './pages/Dashboard';
import ClientDashboard from './pages/ClientDashboard';
import ReviewPage from './pages/ReviewPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-sans">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/review/:token" element={<ReviewPage />} />
          
          <Route path="/*" element={
            <div className="p-8">
              <nav className="p-4 flex gap-4 border-b border-gray-800 mb-8">
                <Link to="/" className="text-primary hover:text-white">Home</Link>
                <Link to="/register" className="text-primary hover:text-white">Register</Link>
                <Link to="/verify" className="text-primary hover:text-white">Verify</Link>
              </nav>
              <Routes>
                <Route path="/worker/:id" element={<h1 className="text-4xl text-secondary">Worker Profile</h1>} />
                <Route path="/register" element={<h1 className="text-4xl text-white">Register Worker</h1>} />
                <Route path="/verify" element={<h1 className="text-4xl text-primary">Verify Background Check</h1>} />
              </Routes>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
