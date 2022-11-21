import { useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthorizedRoute } from './components/AuthorizedRoute';
import { RequireAuth } from './components/RequireAuth';
import { TesteAuth } from './components/TesteAuth';
import { UserContext } from './contexts/userContext';
import { validateToken } from './lib/validation';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/teste-autth"
        element={
          <TesteAuth>
            <AuthorizedRoute />
          </TesteAuth>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
