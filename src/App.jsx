import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Rapport from './components/Rapport';
import Adviseur from './components/Adviseur';
import './styles/app.css';

const TABS = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'rapport',   label: '📄 Rapport' },
  { id: 'adviseur',  label: '💬 Adviseur' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
      <Header />

      <nav className="tab-nav">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'rapport'   && <Rapport />}
        {activeTab === 'adviseur'  && <Adviseur />}
      </main>
    </>
  );
}
