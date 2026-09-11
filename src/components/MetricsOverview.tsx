import React from 'react';
import { Activity, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

interface MetricsOverviewProps {
    events: any[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ events }) => {
    const totalEvents = events.length;
    const criticalEvents = events.filter(e => e.severity === 'CRITICAL' || e.severity === 'HIGH').length;
    const normalEvents = events.filter(e => e.severity === 'NONE').length;
    const latestTemp = events.length > 0 ? events[0].value : 220.0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Leituras Totais</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalEvents}</h3>
                </div>
                <div className="p-3.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Activity className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Temperatura Atual</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{latestTemp} °C</h3>
                </div>
                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
                    <Zap className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Operações Normais</p>
                    <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{normalEvents}</h3>
                </div>
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <ShieldCheck className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Alertas / Críticos</p>
                    <h3 className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">{criticalEvents}</h3>
                </div>
                <div className="p-3.5 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-xl">
                    <AlertTriangle className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};