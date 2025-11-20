import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from '../components/ui';
import { ArrowLeft, Mail, CheckCircle2, KeyRound } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors">
      <Card className="w-full max-w-md shadow-xl border-0 dark:border dark:border-slate-800">
        <CardHeader className="text-center flex flex-col items-center pt-8 pb-2">
           <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600 dark:text-slate-400">
             <KeyRound size={24} />
           </div>
           <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          {submitted ? (
            <div className="text-center space-y-6 animate-in fade-in zoom-in-95">
               <div className="flex justify-center text-green-500 dark:text-green-400">
                 <CheckCircle2 size={56} />
               </div>
               <div className="space-y-2">
                 <h3 className="font-medium text-lg text-slate-900 dark:text-white">Check your email</h3>
                 <p className="text-slate-500 dark:text-slate-400 text-sm">We have sent a password reset link to <strong>{email}</strong>.</p>
               </div>
               <Link to="/login" className="block">
                 <Button variant="outline" className="w-full">Back to Login</Button>
               </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
               <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
               <div className="space-y-2">
                 <Label htmlFor="email">Email Address</Label>
                 <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        className="pl-10" 
                        id="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                    />
                 </div>
               </div>
               <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700" disabled={loading}>
                 {loading ? 'Sending...' : 'Send Reset Link'}
               </Button>
               <Link to="/login" className="flex items-center justify-center text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-medium">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
               </Link>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};