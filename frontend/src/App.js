import FocusPage from './domains/pages/FocusPage';

import './App.css';
import { useState } from 'react';
import AuthPage from './domains/pages/AuthPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen">
      {user ? (
        <FocusPage user={user} />
      ) : (
        <AuthPage onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
