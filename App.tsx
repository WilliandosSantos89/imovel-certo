
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PropertyFormPage from './pages/PropertyFormPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PropertyProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen font-sans text-gray-800">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/property/:id" element={<PropertyDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/new-property"
                  element={
                    <ProtectedRoute>
                      <PropertyFormPage />
                    </ProtectedRoute>
                  }
                />
                 <Route
                  path="/edit-property/:id"
                  element={
                    <ProtectedRoute>
                      <PropertyFormPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </PropertyProvider>
    </AuthProvider>
  );
};

export default App;
