import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jummah: string;
}

export interface MasjidSettings {
  masjidName: string;
  phone: string;
  address: string;
  email: string;
  facebookUrl: string;
  youtubeUrl: string;
  logoUrl?: string;
  prayerTimes: PrayerTimes;
}

interface SettingsContextType {
  settings: MasjidSettings;
  updateSettings: (newSettings: Partial<MasjidSettings>) => void;
}

const defaultSettings: MasjidSettings = {
  masjidName: 'Jummah Grand Mosque',
  phone: '0671212121',
  address: 'Sainthamaruthu',
  email: 'info@jummahgrandmosque.com',
  facebookUrl: '',
  youtubeUrl: '',
  logoUrl: '',
  prayerTimes: {
    fajr: '05:00 AM',
    dhuhr: '01:15 PM',
    asr: '04:30 PM',
    maghrib: 'Sunset',
    isha: '08:00 PM',
    jummah: '12:45 PM',
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  const [settings, setSettings] = useState<MasjidSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem('masjid_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge to ensure new fields (like prayerTimes) are added if missing in localStorage
        setSettings({ 
            ...defaultSettings, 
            ...parsed,
            prayerTimes: {
                ...defaultSettings.prayerTimes,
                ...(parsed.prayerTimes || {})
            }
        });
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<MasjidSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('masjid_settings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};