import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from '../components/ui';
import { Moon, Loader2, Lock, Mail } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors">
      <Card className="w-full max-w-md shadow-xl border-0 dark:border dark:border-slate-800">
        <CardHeader className="space-y-2 text-center flex flex-col items-center pt-8 pb-2">
           {settings.logoUrl ? (
              <div className="h-20 w-20 rounded-xl overflow-hidden mb-2 shadow-sm border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                 <img src={settings.logoUrl} alt="Logo" className="h-full w-full object-contain" />
              </div>
           ) : (
              <div className="h-16 w-16 bg-primary-600 rounded-xl flex items-center justify-center text-white mb-2 shadow-lg shadow-primary-600/30">
                <Moon size={32} />
              </div>
           )}
           <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</CardTitle>
           <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to manage {settings.masjidName}</p>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="email" 
                  type="email" 
                  className="pl-10"
                  placeholder="admin@noormasjid.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" class="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10"
                  placeholder="••••••••" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-md text-center font-medium animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 h-10 text-base dark:bg-primary-600 dark:hover:bg-primary-700" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};