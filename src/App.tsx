import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Counter } from './features/counter/Counter';
import SignUp from './pages/Signup';
import Signin from './pages/Signin';
import CoachSignup from './pages/coach/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import CoachDashboard from './pages/coach/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/coach/sign-up" element={<CoachSignup />} />
      <Route element={<ProtectedRoute allowedRoles={['coach']} />}>
        <Route path="/coach/dashboard" element={<CoachDashboard />} />
      </Route>
    </Routes>

  );
}

export default App;

