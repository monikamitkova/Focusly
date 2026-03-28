import FocusPage from './domains/pages/FocusPage';

import './App.css';
import { useEffect, useState } from 'react';
import AuthPage from './domains/pages/AuthPage';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }

    localStorage.removeItem("user");
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen">
      {user ? (
        <FocusPage user={user} setUser={setUser} onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
