import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, ShieldAlert, Flame, Zap } from 'lucide-react';

interface MetricsOverviewProps {
    events: any[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ events }) => {
    const totalEvents = events.length;
    const normalEvents = events.filter(e => e.severity === 'NONE').length;
    const mediumEvents = events.filter(e => e.severity === 'MEDIUM').length;
    const highEvents = events.filter(e => e.severity === 'HIGH').length;
    const criticalEvents = events.filter(e => e.severity === 'CRITICAL').length;
    const latestTemp = events.length > 0 ? events[0].value : 220.0;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3.5 sm:p-5 rounded-2xl shadow-md flex items-center justify-between col-span-2 lg:col-span-2 transition-all hover:shadow-lg border border-blue-500/30 min-w-0">
                <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-100 opacity-90 truncate">Última Temp. Medida</p>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5 sm:mt-1 truncate">{latestTemp} °C</h3>
                </div>
                <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md text-white rounded-xl shadow-inner flex-shrink-0 ml-2">
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between col-span-1 lg:col-span-2 transition-all hover:shadow-md min-w-0">
                <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">Leituras Totais</p>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 sm:mt-1 truncate">{totalEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl flex-shrink-0 ml-2">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between col-span-1 lg:col-span-2 transition-all hover:shadow-md min-w-0">
                <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">Normais</p>
                    <h3 className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 sm:mt-1 truncate">{normalEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex-shrink-0 ml-2">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between col-span-1 lg:col-span-2 transition-all hover:shadow-md min-w-0">
                <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">Moderados</p>
                    <h3 className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5 sm:mt-1 truncate">{mediumEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl flex-shrink-0 ml-2">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between col-span-1 lg:col-span-2 transition-all hover:shadow-md min-w-0">
                <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">Altos</p>
                    <h3 className="text-xl sm:text-2xl font-black text-orange-600 dark:text-orange-400 mt-0.5 sm:mt-1 truncate">{highEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 rounded-xl flex-shrink-0 ml-2">
                    <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between col-span-2 sm:col-span-1 lg:col-span-2 transition-all hover:shadow-md min-w-0">
                <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">Críticos</p>
                    <h3 className="text-xl sm:text-2xl font-black text-red-600 dark:text-red-400 mt-0.5 sm:mt-1 truncate">{criticalEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-xl flex-shrink-0 ml-2">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>
        </div>
    );
};