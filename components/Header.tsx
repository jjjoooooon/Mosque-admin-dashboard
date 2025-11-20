import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Search, User, Sun, Moon, X, Check, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Input, Badge } from './ui';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';
import { clsx } from 'clsx';

export const Header = () => {
    const { settings } = useSettings();
    const { theme, toggleTheme } = useTheme();
    const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, removeNotification } = useNotification();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
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

                 {/* Notification Bell & Dropdown */}
                 <div className="relative" ref={notificationRef}>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                        )}
                    </Button>

                    {/* Dropdown Menu */}
                    {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs px-2 py-0.5 rounded-full font-medium">
                                            {unreadCount} new
                                        </span>
                                    )}
                                </div>
                                {notifications.length > 0 && (
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={markAllAsRead}
                                            title="Mark all as read"
                                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-slate-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20 rounded-md transition-colors"
                                        >
                                            <Check size={16} />
                                        </button>
                                        <button 
                                            onClick={clearAll}
                                            title="Clear all"
                                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                                        <Bell className="h-10 w-10 mx-auto mb-3 opacity-20" />
                                        <p className="text-sm">No new notifications</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {notifications.map((notification) => (
                                            <div 
                                                key={notification.id} 
                                                className={clsx(
                                                    "p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative group",
                                                    !notification.read ? "bg-emerald-50/30 dark:bg-emerald-900/10" : ""
                                                )}
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <div className="flex gap-3">
                                                    <div className={clsx(
                                                        "h-2 w-2 rounded-full mt-2 shrink-0",
                                                        notification.type === 'success' ? 'bg-green-500' :
                                                        notification.type === 'warning' ? 'bg-amber-500' :
                                                        notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                                                    )} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className={clsx("text-sm font-medium truncate pr-6", !notification.read ? "text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-400")}>
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                                                {formatTime(notification.timestamp)}
                                                            </span>
                                                            {notification.link && (
                                                                <Link 
                                                                    to={notification.link} 
                                                                    className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                                                                    onClick={() => setIsNotificationsOpen(false)}
                                                                >
                                                                    View <ExternalLink size={10} />
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); removeNotification(notification.id); }}
                                                        className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {notifications.length > 0 && (
                                <div className="p-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center">
                                    <button 
                                        onClick={markAllAsRead}
                                        className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                                    >
                                        Mark all as read
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                 </div>
                 
                 <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 cursor-pointer">
                    <User size={18} className="text-emerald-700 dark:text-emerald-400" />
                 </div>
             </div>
        </header>
    );
};