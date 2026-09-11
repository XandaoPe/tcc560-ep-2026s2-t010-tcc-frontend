import { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { SimulatorPanel } from './components/SimulatorPanel';
import { StatusDashboard } from './components/StatusDashboard';
import { fetchEventsHistory } from './services/api';

export function App() {
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loadEvents = useCallback(async () => {
    try {
      const data = await fetchEventsHistory();
      setEvents(data);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-12">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <MetricsOverview events={events} />
        <SimulatorPanel onEventSimulated={loadEvents} />
        <StatusDashboard events={events} />
      </main>
    </div>
  );
}

export default App;