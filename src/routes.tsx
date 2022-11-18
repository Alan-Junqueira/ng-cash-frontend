import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Router = () => {
  return (
    <Routes>
      {/* <Route> */}
        <Route path="/" element={<Dashboard />} />
      {/* </Route> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
