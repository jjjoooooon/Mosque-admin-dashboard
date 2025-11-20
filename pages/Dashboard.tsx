import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../components/ui';
import { DollarSign, Video, Megaphone, Plus, ArrowUpRight, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useSettings } from '../context/SettingsContext';

const data = [
  { name: 'Mon', total: 1500 },
  { name: 'Tue', total: 2300 },
  { name: 'Wed', total: 3200 },
  { name: 'Thu', total: 4500 },
  { name: 'Fri', total: 8900 },
  { name: 'Sat', total: 5600 },
  { name: 'Sun', total: 4800 },
];

export const Dashboard = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const { formatCurrency } = useCurrency();
  const { settings } = useSettings();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">Overview of {settings.masjidName} activities and donations.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={() => navigate('/donations')} className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" /> Add Donation
            </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations (Today)</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(2340)}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center font-medium">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5%
              </span>
              <span className="ml-1">from yesterday</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(45231.89)}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Videos</CardTitle>
            <Video className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">12 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Members</CardTitle>
            <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,500</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Subscribed to announcements</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Donation Trends</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--tw-colors-slate-200)" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip 
                        cursor={{fill: 'var(--tw-colors-slate-100)', opacity: 0.4}}
                        contentStyle={{ 
                          background: 'var(--tw-bg-white)', 
                          borderColor: 'var(--tw-colors-slate-200)', 
                          borderRadius: '8px',
                          color: 'var(--tw-colors-slate-900)' 
                        }}
                        itemStyle={{ color: '#10b981' }}
                        formatter={(value: number) => [formatCurrency(value), 'Total']}
                        wrapperClassName="dark:!bg-slate-900 dark:!border-slate-800 dark:!text-slate-50 [&_.recharts-tooltip-item]:dark:!text-emerald-400"
                    />
                    <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
             <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate('/videos')}>
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        <Video size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">Upload Sermon</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Add Friday Khutbah video</p>
                    </div>
                </div>
                <Plus size={16} className="text-slate-400" />
             </div>
             <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate('/announcements')}>
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full">
                        <Megaphone size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">New Announcement</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Notify community about events</p>
                    </div>
                </div>
                <Plus size={16} className="text-slate-400" />
             </div>
             <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate('/donations')}>
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                        <DollarSign size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">Record Cash Donation</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Manually add offline donation</p>
                    </div>
                </div>
                <Plus size={16} className="text-slate-400" />
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};