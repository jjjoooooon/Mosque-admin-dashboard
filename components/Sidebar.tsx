import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, DollarSign, Video, Megaphone, Settings, LogOut, Moon, BookOpen } from 'lucide-react';
import { cn } from './ui';
import { NavItem } from '../types';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Donations', icon: DollarSign, path: '/donations' },
  { label: 'Videos', icon: Video, path: '/videos' },
  { label: 'Lectures', icon: BookOpen, path: '/lectures' },
  // { label: 'Announcements', icon: Megaphone, path: '/announcements' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const { settings } = useSettings();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col h-screen sticky top-0 transition-colors">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        {settings.logoUrl ? (
          <div className="h-10 w-10 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm shrink-0">
            <img src={settings.logoUrl} alt="Masjid Logo" className="h-full w-full object-contain" />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-600/30 shrink-0">
            <Moon size={20} />
          </div>
        )}
        <div className="overflow-hidden">
          <h1 className="font-bold text-lg text-slate-900 dark:text-slate-50 tracking-tight truncate">{settings.masjidName}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Masjid Admin</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary-50 text-primary-700 shadow-sm dark:bg-primary-900/20 dark:text-primary-400"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={18} className={cn(isActive ? "text-primary-600 dark:text-primary-400" : "text-slate-400 dark:text-slate-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
