import React from 'react';
import { Cpu, Sun, Moon, Smartphone } from 'lucide-react';

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm transition-colors">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-2 sm:p-3 bg-blue-600 rounded-xl sm:rounded-2xl text-white shadow-lg shadow-blue-500/30">
                        <Cpu className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            ROMI Digital Twin
                            <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                Indústria 4.0
                            </span>
                        </h1>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden xs:block">Monitoramento Térmico</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="hidden lg:flex items-center space-x-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-900 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>CLP Ativo (ROMI-SIM-01)</span>
                    </div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-inner"
                        title="Alternar Tema"
                    >
                        {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />}
                    </button>
                </div>
            </div>
        </header>
    );
};