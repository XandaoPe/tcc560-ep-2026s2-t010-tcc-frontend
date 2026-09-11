import React from 'react';
import { CheckCircle2, AlertTriangle, Flame, Clock } from 'lucide-react';

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

interface StatusDashboardProps {
    events: EventItem[];
}

export const StatusDashboard: React.FC<StatusDashboardProps> = ({ events }) => {
    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case 'NONE':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Normal
                    </span>
                );
            case 'MEDIUM':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                        <AlertTriangle className="w-3.5 h-3.5" /> Moderado
                    </span>
                );
            case 'HIGH':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900">
                        <AlertTriangle className="w-3.5 h-3.5" /> Alto
                    </span>
                );
            case 'CRITICAL':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
                        <Flame className="w-3.5 h-3.5" /> Crítico
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {severity}
                    </span>
                );
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Histórico de Eventos Térmicos</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Logs e telemetria persistidos em tempo real.</p>
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3.5 py-2 rounded-xl">
                    {events.length} registros
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-950/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Ativo / Zona</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Temperatura vs Setpoint</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Código do Evento</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Severidade</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm font-medium">Nenhum evento registrado. Utilize os botões do simulador acima.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            events.map((ev) => (
                                <tr key={ev._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">{ev.assetId}</div>
                                        <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{ev.zone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">{ev.value} °C</div>
                                        <div className="text-xs text-slate-400 dark:text-slate-500">Target: {ev.setpointC} °C</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2.5 py-1 text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                                            {ev.eventCode}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getSeverityBadge(ev.severity)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-500 dark:text-slate-400">
                                        {new Date(ev.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};