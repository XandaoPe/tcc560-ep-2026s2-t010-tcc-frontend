import React, { useState } from 'react';
import { triggerSimulation } from '../services/api';
import { Play, ShieldAlert, AlertTriangle, CheckCircle, Zap, Flame, RefreshCw, Touchpad, MousePointerClick, Sliders } from 'lucide-react';

interface SimulatorPanelProps {
    onEventSimulated: (scenarioId: string, zone: string) => void;
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
            onEventSimulated(scenarioType, zone);
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
            desc: 'Temperatura estável no setpoint de 220°C sem desvios.',
            color: 'bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-emerald-500/30',
            border: 'border-emerald-400/30',
            icon: <CheckCircle className="w-4 h-4" />,
            actionText: 'Simular Operação Normal'
        },
        {
            id: 'S2',
            title: 'S2: Excedeu Limite',
            desc: 'Aquecimento moderado acima do patamar industrial ideal.',
            color: 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-amber-500/30',
            border: 'border-amber-400/30',
            icon: <Zap className="w-4 h-4" />,
            actionText: 'Simular Excesso Térmico'
        },
        {
            id: 'S3',
            title: 'S3: Desvio Negativo',
            desc: 'Queda térmica brusca detectada na zona selecionada.',
            color: 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-orange-500/30',
            border: 'border-orange-400/30',
            icon: <AlertTriangle className="w-4 h-4" />,
            actionText: 'Simular Queda de Temp.'
        },
        {
            id: 'S4',
            title: 'S4: Queima (Band Break)',
            desc: 'Falha crítica e total na resistência de aquecimento.',
            color: 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-500/30',
            border: 'border-red-400/30',
            icon: <Flame className="w-4 h-4" />,
            actionText: 'Simular Queima Crítica'
        },
        {
            id: 'S5',
            title: 'S5: Bloqueio Produção',
            desc: 'Interlock de segurança acionado pelo CLP do sistema.',
            color: 'bg-gradient-to-br from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white shadow-purple-500/30',
            border: 'border-purple-400/30',
            icon: <ShieldAlert className="w-4 h-4" />,
            actionText: 'Simular Bloqueio CLP'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-4 sm:mb-6 transition-all w-full">
            <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-3.5 sm:p-4 rounded-xl mb-5 flex items-start sm:items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5 sm:mt-0 shadow-md">
                    <MousePointerClick className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                    <h3 className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wide">Painel Interativo de Simulação Industrial</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Escolha a <strong>Zona Alvo</strong> do canhão da injetora ROMI e <strong>clique em um dos botões coloridos abaixo</strong> para disparar a telemetria em tempo real para o banco de dados.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Simulador de Cenários da Injetora</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Selecione o local e toque no botão de teste desejado:</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto w-full sm:w-auto">
                    <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 ml-1" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Zona Alvo:</span>
                    <select
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                    >
                        <option value="ZONA_1">Zona 1 (Alimentação)</option>
                        <option value="ZONA_2">Zona 2 (Compressão)</option>
                        <option value="ZONA_3">Zona 3 (Dosagem)</option>
                        <option value="ZONA_4">Zona 4 (Bico)</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {scenarios.map((sc) => (
                    <button
                        key={sc.id}
                        disabled={loading}
                        onClick={() => handleSimulate(sc.id)}
                        className={`relative py-3 px-3.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex flex-col justify-between text-left border ${sc.color} ${sc.border} ${activeScenario === sc.id ? 'ring-4 ring-white/60 scale-98 opacity-90' : ''} cursor-pointer group`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner group-hover:scale-105 transition-transform">
                                    {sc.icon}
                                </span>
                                {loading && activeScenario === sc.id ? (
                                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                                ) : (
                                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-black/20 rounded tracking-wider text-white/90">
                                        {sc.id}
                                    </span>
                                )}
                            </div>
                            <h3 className="font-extrabold text-xs sm:text-sm mb-0.5 tracking-tight text-white">{sc.title}</h3>
                            <p className="text-[11px] text-white/90 leading-tight font-normal line-clamp-2">{sc.desc}</p>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[10px] font-extrabold text-white">
                            <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded backdrop-blur-xs">
                                <Touchpad className="w-3 h-3" /> TESTAR
                            </span>
                            <Play className="w-3 h-3 fill-current shrink-0" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};