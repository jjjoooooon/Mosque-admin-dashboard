import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Textarea, Select } from '../components/ui';
import { Save, Globe, Upload, Trash2 } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useSettings, MasjidSettings } from '../context/SettingsContext';

export const Settings = ({ children }: React.PropsWithChildren) => {
    const { currency, setCurrency } = useCurrency();
    const { settings, updateSettings } = useSettings();
    const [formData, setFormData] = useState<MasjidSettings>(settings);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleChange = (field: keyof MasjidSettings, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setIsSaved(false);
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('logoUrl', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateSettings(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h2>
                <p className="text-slate-500 dark:text-slate-400">Manage Masjid details and configuration.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Branding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-6">
                        <div className="h-24 w-24 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800 relative shrink-0">
                            {formData.logoUrl ? (
                                <img src={formData.logoUrl} alt="Logo Preview" className="h-full w-full object-contain" />
                            ) : (
                                <span className="text-xs text-slate-400 text-center p-2">No Logo</span>
                            )}
                        </div>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <Label className="text-base">Dashboard Logo</Label>
                                <p className="text-sm text-slate-500 dark:text-slate-400">This logo will appear in the sidebar. Recommended size: Square (e.g., 200x200px).</p>
                            </div>
                            <div className="flex gap-3">
                                <Label htmlFor="logo-upload" className="cursor-pointer inline-flex">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-200">
                                        <Upload size={16} />
                                        Upload New
                                    </div>
                                    <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                </Label>
                                {formData.logoUrl && (
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 h-auto border border-transparent hover:border-red-100" 
                                        onClick={() => handleChange('logoUrl', '')}
                                    >
                                        <Trash2 size={16} className="mr-2" />
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Masjid Name</Label>
                            <Input 
                                value={formData.masjidName} 
                                onChange={(e) => handleChange('masjidName', e.target.value)}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input 
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Address</Label>
                        <Textarea 
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>System Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Currency</Label>
                            <div className="relative">
                                <Select 
                                    value={currency} 
                                    onChange={(e) => setCurrency(e.target.value as 'USD' | 'LKR')}
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="LKR">Sri Lankan Rupee (LKR)</option>
                                </Select>
                                <Globe className="absolute right-8 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Used globally across the dashboard.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Media & Web</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Facebook URL</Label>
                            <Input 
                                placeholder="https://facebook.com/..." 
                                value={formData.facebookUrl}
                                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label>YouTube Channel</Label>
                            <Input 
                                placeholder="https://youtube.com/..." 
                                value={formData.youtubeUrl}
                                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                            />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Contact Email</Label>
                        <Input 
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button 
                    className={`w-32 transition-all ${isSaved ? 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700'}`} 
                    onClick={handleSave}
                >
                    <Save className="mr-2 h-4 w-4" /> 
                    {isSaved ? 'Saved!' : 'Save'}
                </Button>
            </div>
        </div>
    );
};