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

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  link?: string;
}

export interface Lecture {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  category: 'Khutbah' | 'Tafseer' | 'Bayan' | 'Event';
  description?: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}
