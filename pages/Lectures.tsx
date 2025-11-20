import React, { useState, useEffect } from 'react';
import { 
    Card, CardContent, CardHeader, CardTitle, 
    Button, Input, Table, TableBody, TableCell, 
    TableHead, TableHeader, TableRow, Badge, Dialog,
    Label, Select, Textarea
} from '../components/ui';
import { Plus, Search, Calendar, Clock, User, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Lecture } from '../types';

const INITIAL_LECTURES: Lecture[] = [
    {
        id: '1',
        title: 'Jumuah Khutbah: The Rights of Neighbors',
        speaker: 'Sheikh Abdullah',
        date: '2023-10-27',
        time: '12:45',
        category: 'Khutbah',
        description: 'Discussing the importance of being good to neighbors in Islam.',
        status: 'Upcoming'
    },
    {
        id: '2',
        title: 'Tafseer Surah Yasin',
        speaker: 'Imam Ahmed',
        date: '2023-10-25',
        time: '19:30',
        category: 'Tafseer',
        description: 'Continuing the explanation of verses 12-20.',
        status: 'Upcoming'
    },
    {
        id: '3',
        title: 'Weekly Youth Halaqa',
        speaker: 'Br. Omar',
        date: '2023-10-28',
        time: '18:00',
        category: 'Bayan',
        description: 'Open discussion on challenges faced by Muslim youth.',
        status: 'Upcoming'
    },
    {
        id: '4',
        title: 'Fiqh of Purification',
        speaker: 'Sheikh Abdullah',
        date: '2023-10-22',
        time: '19:30',
        category: 'Bayan',
        description: 'Detailed explanation of Wudu and Ghusl.',
        status: 'Completed'
    },
    {
        id: '5',
        title: 'Jumuah Khutbah: Patience and Gratitude',
        speaker: 'Sheikh Abdullah',
        date: '2023-10-20',
        time: '12:45',
        category: 'Khutbah',
        description: 'Balancing Sabr and Shukr in daily life.',
        status: 'Completed'
    }
];

export const Lectures = () => {
    const [lectures, setLectures] = useState<Lecture[]>(INITIAL_LECTURES);
    const [search, setSearch] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Form State
    const [newLecture, setNewLecture] = useState<Partial<Lecture>>({
        category: 'Khutbah',
        status: 'Upcoming',
        date: new Date().toISOString().split('T')[0],
        time: '12:45'
    });

    const filteredLectures = lectures.filter(l => 
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.speaker.toLowerCase().includes(search.toLowerCase()) ||
        l.category.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredLectures.length / itemsPerPage);
    const paginatedLectures = filteredLectures.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleSaveLecture = () => {
        if (!newLecture.title || !newLecture.speaker || !newLecture.date) return;
        
        if (editingId) {
            // Update existing
            setLectures(lectures.map(l => l.id === editingId ? {
                ...l,
                title: newLecture.title!,
                speaker: newLecture.speaker!,
                date: newLecture.date!,
                time: newLecture.time!,
                category: newLecture.category as any,
                description: newLecture.description,
                status: newLecture.status as any
            } : l));
        } else {
            // Create new
            const lecture: Lecture = {
                id: Math.random().toString(36).substr(2, 9),
                title: newLecture.title,
                speaker: newLecture.speaker,
                date: newLecture.date || new Date().toISOString().split('T')[0],
                time: newLecture.time || '12:00',
                category: newLecture.category as any,
                description: newLecture.description,
                status: newLecture.status as any
            };
            setLectures([lecture, ...lectures]);
        }
        
        setIsAddOpen(false);
        setNewLecture({ 
            category: 'Khutbah', 
            status: 'Upcoming',
            date: new Date().toISOString().split('T')[0],
            time: '12:45'
        });
        setEditingId(null);
    };

    const handleEdit = (lecture: Lecture) => {
        setEditingId(lecture.id);
        setNewLecture({ ...lecture });
        setIsAddOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this lecture?')) {
            setLectures(lectures.filter(l => l.id !== id));
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setNewLecture({ 
            category: 'Khutbah', 
            status: 'Upcoming',
            date: new Date().toISOString().split('T')[0],
            time: '12:45'
        });
        setIsAddOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Lectures & Sermons</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage weekly Khutbahs, Tafseers, and Bayans.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" onClick={openAddModal}>
                    <Plus className="mr-2 h-4 w-4" /> Schedule Lecture
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 w-full max-w-md">
                        <Search className="h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="Search topic or speaker..." 
                            className="w-full" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Topic</TableHead>
                                <TableHead>Speaker</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedLectures.length > 0 ? (
                                paginatedLectures.map((l) => (
                                    <TableRow key={l.id}>
                                        <TableCell className="text-slate-900 dark:text-slate-100">
                                            <div className="flex flex-col">
                                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-slate-400" /> {l.date}</span>
                                                <span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3 w-3" /> {l.time}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-slate-900 dark:text-slate-100">{l.title}</div>
                                            {l.description && <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">{l.description}</div>}
                                        </TableCell>
                                        <TableCell className="text-slate-900 dark:text-slate-100">
                                            <span className="flex items-center gap-1"><User className="h-3 w-3 text-slate-400" /> {l.speaker}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{l.category}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={l.status === 'Upcoming' ? 'success' : 'secondary'}>
                                                {l.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                                                    onClick={() => handleEdit(l)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                                                    onClick={() => handleDelete(l.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-slate-500 dark:text-slate-400">
                                        No lectures found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="flex-1 text-sm text-slate-500 dark:text-slate-400">
                            Showing {paginatedLectures.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredLectures.length)} of {filteredLectures.length} entries
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen} title={editingId ? "Edit Lecture" : "Schedule Lecture"}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Topic / Title</Label>
                        <Input 
                            placeholder="e.g. The Virtues of Ramadan" 
                            value={newLecture.title || ''}
                            onChange={e => setNewLecture({...newLecture, title: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Speaker</Label>
                            <Input 
                                placeholder="e.g. Sheikh Abdullah" 
                                value={newLecture.speaker || ''}
                                onChange={e => setNewLecture({...newLecture, speaker: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select 
                                value={newLecture.category} 
                                onChange={e => setNewLecture({...newLecture, category: e.target.value as any})}
                            >
                                <option value="Khutbah">Khutbah</option>
                                <option value="Tafseer">Tafseer</option>
                                <option value="Bayan">Bayan</option>
                                <option value="Event">Event</option>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input 
                                type="date" 
                                value={newLecture.date}
                                onChange={e => setNewLecture({...newLecture, date: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Time</Label>
                            <Input 
                                type="time" 
                                value={newLecture.time}
                                onChange={e => setNewLecture({...newLecture, time: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select 
                            value={newLecture.status} 
                            onChange={e => setNewLecture({...newLecture, status: e.target.value as any})}
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Description (Optional)</Label>
                        <Textarea 
                            placeholder="Brief details about the lecture..." 
                            value={newLecture.description || ''}
                            onChange={e => setNewLecture({...newLecture, description: e.target.value})}
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveLecture} className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                            {editingId ? 'Update Lecture' : 'Schedule'}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
