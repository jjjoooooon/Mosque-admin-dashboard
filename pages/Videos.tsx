import React, { useState, useEffect } from 'react';
import { 
    Card, CardContent, CardHeader, CardTitle, 
    Button, Input, Table, TableBody, TableCell, 
    TableHead, TableHeader, TableRow, Badge, Dialog,
    Label, Select, Textarea
} from '../components/ui';
import { Plus, Search, Video as VideoIcon, MoreHorizontal, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Video } from '../types';

const INITIAL_VIDEOS: Video[] = [
    { 
        id: '1', 
        title: 'Friday Khutbah: Importance of Patience', 
        category: 'Khutbah', 
        url: 'https://youtube.com/watch?v=...', 
        thumbnail: 'https://picsum.photos/300/200?random=1', 
        date: '2023-10-20' 
    },
    { 
        id: '2', 
        title: 'Tafseer Surah Al-Kahf - Part 4', 
        category: 'Tafseer', 
        url: 'https://youtube.com/watch?v=...', 
        thumbnail: 'https://picsum.photos/300/200?random=2', 
        date: '2023-10-18' 
    },
    { 
        id: '3', 
        title: 'Youth Night: Navigating Modern Challenges', 
        category: 'Youth', 
        url: 'https://youtube.com/watch?v=...', 
        thumbnail: 'https://picsum.photos/300/200?random=3', 
        date: '2023-10-15' 
    },
    { 
        id: '4', 
        title: 'Fiqh of Prayer: Part 1', 
        category: 'Bayan', 
        url: 'https://youtube.com/watch?v=...', 
        thumbnail: 'https://picsum.photos/300/200?random=4', 
        date: '2023-10-12' 
    },
    { 
        id: '5', 
        title: 'Ramadan Prep: Spiritual Goals', 
        category: 'Ramadan', 
        url: 'https://youtube.com/watch?v=...', 
        thumbnail: 'https://picsum.photos/300/200?random=5', 
        date: '2023-10-10' 
    },
    { 
        id: '6', 
        title: 'Community Q&A Session', 
        category: 'Bayan', 
        url: 'https://youtube.com/watch?v=...', 
        thumbnail: 'https://picsum.photos/300/200?random=6', 
        date: '2023-10-08' 
    },
    { 
        id: '7', 
        title: 'Stories of the Prophets: Yusuf (AS)', 
        category: 'Tafseer', 
        url: 'https://youtube.com/watch?v=...', 
        thumbnail: 'https://picsum.photos/300/200?random=7', 
        date: '2023-10-05' 
    },
];

export const Videos = ({ children }: React.PropsWithChildren) => {
    const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [view, setView] = useState<'list' | 'grid'>('list');
    
    // Search & Pagination State
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [newVideo, setNewVideo] = useState<Partial<Video>>({
        category: 'Khutbah'
    });

    const filteredVideos = videos.filter(v => 
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
    const paginatedVideos = filteredVideos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleAddVideo = () => {
        const video: Video = {
            id: Math.random().toString(36).substr(2, 9),
            title: newVideo.title || 'Untitled Video',
            category: newVideo.category as any,
            url: newVideo.url || '',
            thumbnail: `https://picsum.photos/300/200?random=${Math.random()}`, // Simulate generation
            date: new Date().toISOString().split('T')[0],
            description: newVideo.description
        };
        setVideos([video, ...videos]);
        setIsAddOpen(false);
        setNewVideo({ category: 'Khutbah' });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Video Library</h2>
                    <p className="text-slate-500 dark:text-slate-400">Upload and manage sermons and lectures.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" onClick={() => setIsAddOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Video
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                     <div className="flex items-center gap-2 w-full max-w-md">
                        <Search className="h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="Search videos..." 
                            className="w-full" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-md p-1">
                        <button 
                            onClick={() => setView('list')}
                            className={`px-3 py-1 text-sm font-medium rounded-sm transition-all ${view === 'list' ? 'bg-white dark:bg-slate-600 shadow text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            List
                        </button>
                        <button 
                            onClick={() => setView('grid')}
                            className={`px-3 py-1 text-sm font-medium rounded-sm transition-all ${view === 'grid' ? 'bg-white dark:bg-slate-600 shadow text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            Grid
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    {view === 'list' ? (
                         <Table>
                         <TableHeader>
                             <TableRow>
                                 <TableHead className="w-[100px]">Preview</TableHead>
                                 <TableHead>Title</TableHead>
                                 <TableHead>Category</TableHead>
                                 <TableHead>Date</TableHead>
                                 <TableHead className="text-right">Actions</TableHead>
                             </TableRow>
                         </TableHeader>
                         <TableBody>
                             {paginatedVideos.length > 0 ? (
                                 paginatedVideos.map((v) => (
                                     <TableRow key={v.id}>
                                         <TableCell>
                                             <div className="relative h-12 w-20 rounded overflow-hidden bg-slate-200 dark:bg-slate-800">
                                                 <img src={v.thumbnail} alt={v.title} className="object-cover w-full h-full" />
                                             </div>
                                         </TableCell>
                                         <TableCell className="font-medium">{v.title}</TableCell>
                                         <TableCell><Badge variant="outline">{v.category}</Badge></TableCell>
                                         <TableCell>{v.date}</TableCell>
                                         <TableCell className="text-right">
                                             <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                         </TableCell>
                                     </TableRow>
                                 ))
                             ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">No videos found.</TableCell>
                                </TableRow>
                             )}
                         </TableBody>
                     </Table>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedVideos.map((v) => (
                                <div key={v.id} className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative">
                                        <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <PlayCircle className="text-white h-12 w-12 opacity-80" />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className="text-xs">{v.category}</Badge>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">{v.date}</span>
                                        </div>
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{v.title}</h3>
                                    </div>
                                </div>
                            ))}
                            {paginatedVideos.length === 0 && (
                                <div className="col-span-full text-center py-8 text-slate-500">No videos found.</div>
                            )}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between space-x-2 py-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                        <div className="flex-1 text-sm text-slate-500 dark:text-slate-400">
                            Showing {paginatedVideos.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredVideos.length)} of {filteredVideos.length} videos
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

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen} title="Upload Video">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Video Title</Label>
                        <Input 
                            placeholder="e.g. Jumuah Khutbah: Taqwa"
                            value={newVideo.title || ''}
                            onChange={e => setNewVideo({...newVideo, title: e.target.value})}
                        />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select 
                                value={newVideo.category}
                                onChange={e => setNewVideo({...newVideo, category: e.target.value as any})}
                            >
                                <option value="Khutbah">Khutbah</option>
                                <option value="Tafseer">Tafseer</option>
                                <option value="Bayan">Bayan</option>
                                <option value="Ramadan">Ramadan</option>
                                <option value="Youth">Youth</option>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>YouTube URL</Label>
                            <Input 
                                placeholder="https://youtube.com..."
                                value={newVideo.url || ''}
                                onChange={e => setNewVideo({...newVideo, url: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Short Description</Label>
                        <Textarea 
                            placeholder="Key topics covered..."
                            value={newVideo.description || ''}
                            onChange={e => setNewVideo({...newVideo, description: e.target.value})}
                        />
                    </div>
                    <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center bg-slate-50 dark:bg-slate-800">
                         <div className="mx-auto h-12 w-12 text-slate-400 mb-2">
                            <VideoIcon className="h-full w-full" />
                         </div>
                         <p className="text-sm text-slate-500 dark:text-slate-400">Thumbnail will be auto-generated from YouTube</p>
                    </div>
                     <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddVideo} className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">Save Video</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};