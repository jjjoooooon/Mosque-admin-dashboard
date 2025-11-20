import React from 'react';
import { Bell, Menu, Search, User, Sun, Moon } from 'lucide-react';
import { Button, Input } from './ui';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
    const { settings } = useSettings();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-10 transition-colors">
             <div className="flex items-center gap-4 md:hidden">
                 <Button variant="ghost" size="icon"><Menu size={20} className="text-slate-600 dark:text-slate-400" /></Button>
                 <span className="font-bold text-lg text-emerald-700 dark:text-emerald-500 truncate max-w-[200px]">{settings.masjidName}</span>
             </div>

             <div className="hidden md:flex items-center w-1/3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input placeholder="Search dashboard..." className="pl-10 bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500" />
             </div>

             <div className="flex items-center gap-2 sm:gap-4">
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleTheme}
                    className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                 >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                 </Button>

                 <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                 </Button>
                 
                 <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 cursor-pointer">
                    <User size={18} className="text-emerald-700 dark:text-emerald-400" />
                 </div>
             </div>
        </header>
    );
};