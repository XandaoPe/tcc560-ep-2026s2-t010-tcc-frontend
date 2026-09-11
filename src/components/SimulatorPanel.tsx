import React, { useState } from 'react';
import { triggerSimulation } from '../services/api';
import { Play, ShieldAlert, AlertTriangle, CheckCircle, Zap, Flame, RefreshCw } from 'lucide-react';

interface SimulatorPanelProps {
    onEventSimulated: () => void;
}

export const SimulatorPanel: React.FC<SimulatorPanelProps> = ({ onEventSimulated }) => {
    const [loading, setLoading] = useState(false);
    const [zone, setZone] = useState('ZONA_2');
    const [activeScenario, setActiveScenario] = useState<string | null>(null);

    const handleSimulate = async (scenarioType: string) => {
        try {
            setLoading(true);
            setActiveScenario(scenarioType);
            await triggerSimulation(scenarioType, zone);
            onEventSimulated();
        } catch (error) {
            console.error('Erro ao simular evento:', error);
            alert('Erro ao comunicar com o backend.');
        } finally {
            setLoading(false);
            setTimeout(() => setActiveScenario(null), 800);
        }
    };

    const scenarios = [
        {
            id: 'S1',
            title: 'S1: Operação Normal',
            desc: 'Temperatura dentro do setpoint estabilizado (220°C).',
            color: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20',
            icon: <CheckCircle className="w-5 h-5" />
        },
        {
            id: 'S2',
            title: 'S2: Excedeu Limite',
            desc: 'Desvio térmico moderado acima do patamar ideal.',
            color: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20',
            icon: <Zap className="w-5 h-5" />
        },
        {
            id: 'S3',
            title: 'S3: Desvio Negativo',
            desc: 'Queda térmica detectada na zona selecionada.',
            color: 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20',
            icon: <AlertTriangle className="w-5 h-5" />
        },
        {
            id: 'S4',
            title: 'S4: Queima (Band Break)',
            desc: 'Falha crítica na resistência de aquecimento.',
            color: 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20',
            icon: <Flame className="w-5 h-5" />
        },
        {
            id: 'S5',
            title: 'S5: Bloqueio Produção',
            desc: 'Interlock de segurança acionado pelo sistema.',
            color: 'bg-purple-700 hover:bg-purple-800 text-white shadow-purple-500/20',
            icon: <ShieldAlert className="w-5 h-5" />
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Painel Simulador da Injetora ROMI</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Dispare cenários funcionais para testar o comportamento do gêmeo digital.</p>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Zona Alvo:</label>
                    <select
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="ZONA_1">Zona 1 (Alimentação)</option>
                        <option value="ZONA_2">Zona 2 (Compressão)</option>
                        <option value="ZONA_3">Zona 3 (Dosagem)</option>
                        <option value="ZONA_4">Zona 4 (Bico)</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {scenarios.map((sc) => (
                    <button
                        key={sc.id}
                        disabled={loading}
                        onClick={() => handleSimulate(sc.id)}
                        className={`relative p-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 flex flex-col justify-between text-left ${sc.color} ${activeScenario === sc.id ? 'ring-4 ring-white/50 scale-95' : ''}`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                                    {sc.icon}
                                </span>
                                {loading && activeScenario === sc.id && (
                                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                                )}
                            </div>
                            <h3 className="font-bold text-base mb-1">{sc.title}</h3>
                            <p className="text-xs text-white/80 leading-relaxed">{sc.desc}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold">
                            <span>Executar</span>
                            <Play className="w-3.5 h-3.5 fill-current" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};