import React from 'react';
import { CheckCircle2, AlertTriangle, Flame, Clock, Search, RotateCcw, Filter } from 'lucide-react';

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
    onFilterChange: (filters: { search: string; zone: string; severity: string; eventCode: string; timeRange: string }) => void;
    onClearFilters: () => void;
    currentFilters: { search: string; zone: string; severity: string; eventCode: string; timeRange: string };
}

export const StatusDashboard: React.FC<StatusDashboardProps> = ({
    events,
    onFilterChange,
    onClearFilters,
    currentFilters
}) => {
    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case 'NONE':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                        <CheckCircle2 className="w-3 h-3" /> Normal
                    </span>
                );
            case 'MEDIUM':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                        <AlertTriangle className="w-3 h-3" /> Moderado
                    </span>
                );
            case 'HIGH':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900">
                        <AlertTriangle className="w-3 h-3" /> Alto
                    </span>
                );
            case 'CRITICAL':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
                        <Flame className="w-3 h-3" /> Crítico
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {severity}
                    </span>
                );
        }
    };

    const handleChange = (field: string, value: string) => {
        onFilterChange({
            ...currentFilters,
            [field]: value
        });
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all w-full">
            <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>Histórico de Eventos Térmicos</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Logs e telemetria persistidos em tempo real no banco de dados.</p>
                    </div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {events.length} registros encontrados
                    </div>
                </div>

                {/* Barra de Filtros e Pesquisa */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Filter className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Filtros e Busca de Eventos
                        </span>
                        <button
                            onClick={onClearFilters}
                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                            <RotateCcw className="w-3 h-3" /> Limpar Filtros (Padrão 1h)
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        {/* Busca Geral */}
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar (Ativo, Código...)"
                                value={currentFilters.search}
                                onChange={(e) => handleChange('search', e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Filtro por Zona */}
                        <select
                            value={currentFilters.zone}
                            onChange={(e) => handleChange('zone', e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todas as Zonas</option>
                            <option value="ZONA_1">Zona 1 (Alimentação)</option>
                            <option value="ZONA_2">Zona 2 (Compressão)</option>
                            <option value="ZONA_3">Zona 3 (Dosagem)</option>
                            <option value="ZONA_4">Zona 4 (Bico)</option>
                        </select>

                        {/* Filtro por Severidade */}
                        <select
                            value={currentFilters.severity}
                            onChange={(e) => handleChange('severity', e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todas as Severidades</option>
                            <option value="NONE">Normal (NONE)</option>
                            <option value="MEDIUM">Moderado (MEDIUM)</option>
                            <option value="HIGH">Alto (HIGH)</option>
                            <option value="CRITICAL">Crítico (CRITICAL)</option>
                        </select>

                        {/* Filtro por Código de Evento */}
                        <select
                            value={currentFilters.eventCode}
                            onChange={(e) => handleChange('eventCode', e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todos os Códigos</option>
                            <option value="NORMAL">NORMAL</option>
                            <option value="HEATING_LIMIT_EXCEEDED">HEATING_LIMIT_EXCEEDED</option>
                            <option value="NEGATIVE_TEMP_DEVIATION">NEGATIVE_TEMP_DEVIATION</option>
                            <option value="BAND_BREAK_TOTAL_FAILURE">BAND_BREAK_TOTAL_FAILURE</option>
                            <option value="PRODUCTION_LOCKOUT">PRODUCTION_LOCKOUT</option>
                        </select>

                        {/* Filtro por Período de Tempo */}
                        <select
                            value={currentFilters.timeRange}
                            onChange={(e) => handleChange('timeRange', e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="1h">Última 1 Hora (Padrão)</option>
                            <option value="24h">Últimas 24 Horas</option>
                            <option value="7d">Últimos 7 Dias</option>
                            <option value="all">Todo o Histórico</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto scrollbar-thin">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left">
                    <thead className="bg-slate-50 dark:bg-slate-950/50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Ativo / Zona</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Temp. vs Setpoint</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Código do Evento</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Severidade</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Timestamp (Recente primeiro)</th>
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
                                        <p className="text-xs sm:text-sm font-medium">Nenhum evento encontrado com os filtros selecionados.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            events.map((ev) => (
                                <tr key={ev._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{ev.assetId}</div>
                                        <div className="text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold">{ev.zone}</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{ev.value} °C</div>
                                        <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">Target: {ev.setpointC} °C</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                                        <span className="px-2 py-1 text-[10px] sm:text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                                            {ev.eventCode}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                                        {getSeverityBadge(ev.severity)}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
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