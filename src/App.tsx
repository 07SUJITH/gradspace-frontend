import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import DevInfo from './pages/DevInfo';
import Home from './pages/Home'; // Your main home component
import Login from './pages/Login'; // Your login component
import Signup from './pages/Signup'; // Your signup component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="devinfo" element={<DevInfo />} />
    </Routes>
  );
};

export default App;
