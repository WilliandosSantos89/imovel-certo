
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <i className="fas fa-home"></i>
          <span>Imóvel Certo</span>
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-600 hidden sm:block">Olá, {user.email.split('@')[0]}</span>
              <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors">
                Meus Anúncios
              </Link>
              <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-emerald-600 transition-colors">
              <i className="fas fa-sign-in-alt mr-2"></i>
              Login / Cadastrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
