import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from '../components/ui';
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setComplete(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors">
      <Card className="w-full max-w-md shadow-xl border-0 dark:border dark:border-slate-800">
        <CardHeader className="text-center flex flex-col items-center pt-8 pb-2">
           <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600 dark:text-slate-400">
             <Lock size={24} />
           </div>
           <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Set New Password</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          {complete ? (
             <div className="text-center space-y-6 animate-in fade-in zoom-in-95">
                <div className="flex justify-center text-green-500 dark:text-green-400">
                  <CheckCircle2 size={56} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg text-slate-900 dark:text-white">Password Reset Complete</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Your password has been successfully updated. You can now sign in with your new password.</p>
                </div>
                <Link to="/login" className="block">
                  <Button className="w-full bg-primary-600 hover:bg-primary-700">Sign In</Button>
                </Link>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
               <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-2">Please create a new password for your account.</p>
               
               <div className="space-y-2">
                 <Label htmlFor="password">New Password</Label>
                 <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    minLength={6}
                 />
               </div>

               <div className="space-y-2">
                 <Label htmlFor="confirmPassword">Confirm Password</Label>
                 <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    required 
                 />
               </div>

               {error && (
                 <p className="text-sm text-red-500 text-center font-medium">{error}</p>
               )}

               <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700" disabled={loading}>
                 {loading ? 'Updating...' : 'Reset Password'}
               </Button>
               
               <Link to="/login" className="flex items-center justify-center text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-medium">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
               </Link>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};