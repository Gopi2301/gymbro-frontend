import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Counter } from './features/counter/Counter';
import SignUp from './pages/Signup';
import Signin from './pages/Signin';
import CoachSignup from './pages/coach/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import CoachDashboard from './pages/coach/Dashboard';
import SuperAdminDashboard from './pages/superAdmin/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/coach/sign-up" element={<CoachSignup />} />
      <Route element={<ProtectedRoute allowedRoles={['coach','superadmin']} />}>
        <Route path="/coach/dashboard" element={<CoachDashboard />} />
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      </Route>
    </Routes>

  );
}

export default App;

