import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, ShieldAlert, Flame } from 'lucide-react';

interface MetricsOverviewProps {
    events: any[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ events }) => {
    const totalEvents = events.length;
    const normalEvents = events.filter(e => e.severity === 'NONE').length;
    const mediumEvents = events.filter(e => e.severity === 'MEDIUM').length;
    const highEvents = events.filter(e => e.severity === 'HIGH').length;
    const criticalEvents = events.filter(e => e.severity === 'CRITICAL').length;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Leituras Totais</p>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 sm:mt-1">{totalEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Normais</p>
                    <h3 className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 sm:mt-1">{normalEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Moderados</p>
                    <h3 className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5 sm:mt-1">{mediumEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Altos</p>
                    <h3 className="text-xl sm:text-2xl font-black text-orange-600 dark:text-orange-400 mt-0.5 sm:mt-1">{highEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 rounded-xl">
                    <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md col-span-2 lg:col-span-1">
                <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Críticos</p>
                    <h3 className="text-xl sm:text-2xl font-black text-red-600 dark:text-red-400 mt-0.5 sm:mt-1">{criticalEvents}</h3>
                </div>
                <div className="p-2.5 sm:p-3.5 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-xl">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>
        </div>
    );
};