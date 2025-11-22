import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Counter } from './features/counter/Counter';
import SignUp from './pages/Signup';
import Signin from './pages/Signin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/sign-in" element={<Signin />} />
    </Routes>

  );
}

export default App;

