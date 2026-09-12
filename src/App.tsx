import { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { SimulatorPanel } from './components/SimulatorPanel';
import { StatusDashboard } from './components/StatusDashboard';
import { fetchEventsHistory, deleteThermalEvent, deleteThermalEventsBatch } from './services/api';
import { Loader2, Server, ShieldAlert, Flame, CheckCircle2, AlertTriangle } from 'lucide-react';

interface EventItem {
  _id: string;
  eventId: string;
  assetId: string;
  zone: string;
  value: number;
  setpointC: number;
  eventCode: string;
  severity: string;
  provenance: string;
  createdAt: string;
}

interface AlertConfig {
  title: string;
  code: string;
  severity: string;
  bg: string;
  icon: any;
}

export function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentAlert, setCurrentAlert] = useState<AlertConfig | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    zone: '',
    severity: '',
    eventCode: '',
    timeRange: '1h'
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const playAlertSound = (type: 'MEDIUM' | 'HIGH' | 'CRITICAL') => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'MEDIUM') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'HIGH') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } else if (type === 'CRITICAL') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.setValueAtTime(700, audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(300, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      }
    } catch (e) {
      console.error('Erro ao reproduzir áudio:', e);
    }
  };

  const loadEvents = useCallback(async (currentFilters = filters) => {
    try {
      setLoading(true);
      const data = await fetchEventsHistory(currentFilters);
      setEvents(data);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadEvents(filters);
  }, [filters, loadEvents]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      zone: '',
      severity: '',
      eventCode: '',
      timeRange: '1h'
    });
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteThermalEvent(id);
      loadEvents(filters);
    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível excluir o evento.');
    }
  };

  const handleDeleteBatch = async (ids: string[]) => {
    try {
      await deleteThermalEventsBatch(ids);
      loadEvents(filters);
    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível excluir os eventos selecionados.');
    }
  };

  const handleEventSimulated = (scenarioId: string, _zone: string) => {
    loadEvents(filters);

    if (scenarioId === 'S1') {
      return;
    }

    if (scenarioId === 'S2') {
      playAlertSound('MEDIUM');
      setCurrentAlert({
        title: 'Alerta: Excedeu Limite Térmico',
        code: 'S2_EXCEED_LIMIT',
        severity: 'MODERADO',
        bg: 'bg-amber-50 dark:bg-amber-950/90 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100',
        icon: <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-pulse" />
      });
    } else if (scenarioId === 'S3') {
      playAlertSound('HIGH');
      setCurrentAlert({
        title: 'Alerta: Desvio Negativo de Temperatura',
        code: 'S3_NEGATIVE_DEVIATION',
        severity: 'ALTO',
        bg: 'bg-orange-50 dark:bg-orange-950/90 border-orange-300 dark:border-orange-800 text-orange-900 dark:text-orange-100',
        icon: <ShieldAlert className="w-8 h-8 text-orange-600 dark:text-orange-400 animate-bounce" />
      });
    } else if (scenarioId === 'S4') {
      playAlertSound('CRITICAL');
      setCurrentAlert({
        title: 'Alerta Crítico: Queima de Resistência (Band Break)',
        code: 'S4_BAND_BREAK',
        severity: 'CRÍTICO',
        bg: 'bg-red-50 dark:bg-red-950/90 border-red-300 dark:border-red-800 text-red-900 dark:text-red-100',
        icon: <Flame className="w-8 h-8 text-red-600 dark:text-red-400 animate-pulse" />
      });
    } else if (scenarioId === 'S5') {
      playAlertSound('CRITICAL');
      setCurrentAlert({
        title: 'Alerta Crítico: Bloqueio de Produção (CLP)',
        code: 'S5_INTERLOCK_BLOCK',
        severity: 'CRÍTICO',
        bg: 'bg-purple-50 dark:bg-purple-950/90 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-100',
        icon: <ShieldAlert className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-pulse" />
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-12 relative overflow-x-hidden">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {currentAlert && (
        <div className="fixed inset-0 bg-slate-900/70 dark:bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className={`border-2 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg w-full flex flex-col items-center text-center transition-all transform scale-100 ${currentAlert.bg}`}>
            <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-inner mb-4">
              {currentAlert.icon}
            </div>
            <h2 className="text-xl sm:text-2xl font-black mb-1 uppercase tracking-wider">
              {currentAlert.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold opacity-80 mb-5">
              Status do Evento: <span className="font-mono uppercase underline font-bold">{currentAlert.severity}</span>
            </p>

            <div className="w-full bg-white/60 dark:bg-slate-900/60 p-4 rounded-2xl mb-6 text-left border border-black/5 dark:border-white/10 flex justify-between items-center">
              <div>
                <span className="block text-[10px] uppercase font-bold opacity-60">Código da Ocorrência</span>
                <span className="text-xs sm:text-sm font-mono font-bold">{currentAlert.code}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase font-bold opacity-60">Severidade</span>
                <span className="text-xs sm:text-sm font-bold">{currentAlert.severity}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentAlert(null)}
              className="w-full py-3.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-sm sm:text-base rounded-2xl shadow-xl hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" /> CIÊNCIA / FECHAR ALERTA
            </button>
          </div>
        </div>
      )}

      {loading && events.length === 0 && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-md w-full text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl mb-4 shadow-inner">
              <Server className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
              Conectando ao Servidor...
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              O backend está hospedado em ambiente de nuvem gratuito (Render). Como a instância pode estar em modo de repouso, isso pode levar alguns segundos. Por favor, aguarde.
            </p>
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Despertando servidor e carregando dados...</span>
            </div>
          </div>
        </div>
      )}

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 space-y-6">
        <MetricsOverview events={events} />
        <SimulatorPanel onEventSimulated={handleEventSimulated} />
        <StatusDashboard
          events={events}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          currentFilters={filters}
          onDeleteEvent={handleDeleteEvent}
          onDeleteBatch={handleDeleteBatch}
        />
      </main>
    </div>
  );
}

export default App;