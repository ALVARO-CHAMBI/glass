import React from 'react';
import { AuthForm } from './components/AuthForm';
import { Home } from './components/Home';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      {user ? <Home /> : <AuthForm />}
    </>
  );
}

export default App;