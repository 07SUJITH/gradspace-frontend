import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home'; // Your main home component
import Login from './pages/Login'; // Your login component
import Signup from './pages/Signup'; // Your signup component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
