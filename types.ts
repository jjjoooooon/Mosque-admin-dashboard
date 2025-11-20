import React from 'react';

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Online' | 'Bank Transfer';
  notes?: string;
}

export interface Video {
  id: string;
  title: string;
  category: 'Khutbah' | 'Tafseer' | 'Bayan' | 'Ramadan' | 'Youth';
  url: string;
  thumbnail: string;
  date: string;
  description?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string; // HTML content
  status: 'Published' | 'Draft';
  date: string;
  category: string;
  imageUrl?: string;
}

export interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}