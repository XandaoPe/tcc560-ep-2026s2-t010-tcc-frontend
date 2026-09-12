import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Flame, Clock, Search, RotateCcw, Filter, Trash2, X } from 'lucide-react';

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
    onDeleteEvent: (id: string) => void;
    onDeleteBatch: (ids: string[]) => void;
}

export const StatusDashboard: React.FC<StatusDashboardProps> = ({
    events,
    onFilterChange,
    onClearFilters,
    currentFilters,
    onDeleteEvent,
    onDeleteBatch
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(events.map(ev => ev._id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBatchDeleteClick = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Deseja realmente excluir os ${selectedIds.length} registros selecionados?`)) {
            onDeleteBatch(selectedIds);
            setSelectedIds([]);
        }
    };

    const handleSingleDeleteClick = (id: string) => {
        if (confirm('Deseja realmente excluir este registro?')) {
            onDeleteEvent(id);
            setSelectedIds(selectedIds.filter(item => item !== id));
        }
    };

    const isAllSelected = events.length > 0 && selectedIds.length === events.length;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all w-full relative pb-20 sm:pb-0">
            <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>Histórico de Eventos Térmicos</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Logs e telemetria persistidos em tempo real no banco de dados.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            {events.length} registros encontrados
                        </div>
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
                            <th className="px-4 py-3.5 w-10 text-center">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                    className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                            </th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Ativo / Zona</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Temp. vs Setpoint</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Código do Evento</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Severidade</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Timestamp</th>
                            <th className="px-4 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <p className="text-xs sm:text-sm font-medium">Nenhum evento encontrado com os filtros selecionados.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            events.map((ev) => {
                                const isSelected = selectedIds.includes(ev._id);
                                return (
                                    <tr key={ev._id} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors ${isSelected ? 'bg-blue-50/60 dark:bg-blue-950/30' : ''}`}>
                                        <td className="px-4 py-3.5 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleSelectOne(ev._id)}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            />
                                        </td>
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
                                        <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => handleSingleDeleteClick(ev._id)}
                                                title="Excluir Registro"
                                                className="p-1.5 bg-slate-100 hover:bg-red-100 dark:bg-slate-800 dark:hover:bg-red-950 text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Barra Flutuante de Ações em Lote (Sempre visível na tela quando houver registros selecionados) */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-slate-800/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-4 animate-fade-in backdrop-blur-md max-w-lg w-[92%] sm:w-auto justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-semibold">
                            <strong className="text-blue-400 font-mono">{selectedIds.length}</strong> {selectedIds.length === 1 ? 'selecionado' : 'selecionados'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedIds([])}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                        >
                            <X className="w-3.5 h-3.5" /> Limpar
                        </button>
                        <button
                            onClick={handleBatchDeleteClick}
                            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" /> Excluir ({selectedIds.length})
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};