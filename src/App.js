import React from 'react';
import './App.css';
import SubscriptionForm from './Modules/SubscriptionForm';
import Dashboard from './Dashboard/Dashboard'; // Import the ToolsCards component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>Internal Engine</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Default path shows ToolsCards */}
            <Route path="/subscription-management" element={<SubscriptionForm />} /> {/* Specific path for Subscription Management */}
            {/* Add more routes for other tools as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
