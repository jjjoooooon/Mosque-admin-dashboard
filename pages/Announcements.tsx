import React, { useState, useEffect, useRef } from 'react';
import { 
    Card, CardContent, CardHeader, CardTitle, 
    Button, Input, Table, TableBody, TableCell, 
    TableHead, TableHeader, TableRow, Badge,
    Label, Select, Textarea
} from '../components/ui';
import { Plus, Image as ImageIcon, ArrowLeft, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Announcement } from '../types';

// TinyMCE is loaded globally via CDN in index.html
declare const tinymce: any;

declare global {
  interface Window {
    tinymce: any;
  }
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
    { id: '1', title: 'Eid al-Fitr Prayer Schedule', status: 'Published', date: '2023-04-20', category: 'Events', content: '<p>Prayer will be at 8:00 AM...</p>' },
    { id: '2', title: 'Community BBQ this Weekend', status: 'Draft', date: '2023-05-10', category: 'Social', content: '<p>Join us for burgers...</p>' },
    { id: '3', title: 'Youth Program Registration', status: 'Published', date: '2023-05-15', category: 'Education', content: '<p>Register now...</p>' },
    { id: '4', title: 'New Carpet Fundraiser', status: 'Published', date: '2023-05-20', category: 'Fundraising', content: '<p>Help us replace...</p>' },
    { id: '5', title: 'Weekly Quran Class', status: 'Published', date: '2023-05-25', category: 'Education', content: '<p>Every Tuesday...</p>' },
    { id: '6', title: 'Volunteers Needed', status: 'Draft', date: '2023-06-01', category: 'General', content: '<p>For cleaning...</p>' },
];

export const Announcements = ({ children }: React.PropsWithChildren) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Editor State
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');
    const [status, setStatus] = useState('Draft');

    // Pagination Logic
    const totalPages = Math.ceil(announcements.length / itemsPerPage);
    const paginatedAnnouncements = announcements.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        if (isEditorOpen && editorRef.current && window.tinymce) {
            // Check current theme to apply skin to TinyMCE if needed
            const isDark = document.documentElement.classList.contains('dark');
            
            // Check compatibility
            if (document.compatMode === 'BackCompat') {
                console.warn("TinyMCE requires standards mode. Running in fallback mode.");
                return;
            }

            try {
                window.tinymce.init({
                    target: editorRef.current,
                    height: 400,
                    menubar: false,
                    skin: isDark ? 'oxide-dark' : 'oxide',
                    content_css: isDark ? 'dark' : 'default',
                    plugins: [
                       'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                       'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                       'insertdatetime', 'media', 'table', 'help', 'wordcount'
                     ],
                     toolbar: 'undo redo | blocks | ' +
                       'bold italic forecolor | alignleft aligncenter ' +
                       'alignright alignjustify | bullist numlist outdent indent | ' +
                       'removeformat | help',
                     content_style: 'body { font-family:Inter,sans-serif; font-size:14px }'
                });
            } catch (e) {
                console.error("Failed to initialize TinyMCE:", e);
            }
        }

        return () => {
            if (isEditorOpen && window.tinymce) {
                window.tinymce.remove();
            }
        };
    }, [isEditorOpen]);

    const handleSave = () => {
        // Get content from TinyMCE if initialized, otherwise use textarea value if we could bind it (simple binding not impl here for fallback, assuming TinyMCE works)
        // If using fallback, we would need to bind onChange to state.
        // For simplicity in this fix, we assume TinyMCE works or we accept empty for fallback.
        let content = '';
        if (window.tinymce && window.tinymce.activeEditor) {
             content = window.tinymce.activeEditor.getContent();
        } else if (editorRef.current) {
            content = editorRef.current.value;
        }

        const newAnnouncement: Announcement = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            category,
            status: status as any,
            date: new Date().toISOString().split('T')[0],
            content
        };
        setAnnouncements([newAnnouncement, ...announcements]);
        setIsEditorOpen(false);
        // Reset form
        setTitle('');
    };

    // --- List View ---
    if (!isEditorOpen) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Announcements</h2>
                        <p className="text-slate-500 dark:text-slate-400">Manage website news and community updates.</p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" onClick={() => setIsEditorOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Announcements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedAnnouncements.map((a) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">{a.title}</TableCell>
                                        <TableCell className="text-slate-900 dark:text-slate-100">{a.category}</TableCell>
                                        <TableCell>
                                            <Badge variant={a.status === 'Published' ? 'success' : 'secondary'}>
                                                {a.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-900 dark:text-slate-100">{a.date}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                         {/* Pagination Controls */}
                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="flex-1 text-sm text-slate-500 dark:text-slate-400">
                                Showing {paginatedAnnouncements.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, announcements.length)} of {announcements.length} entries
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
            </div>
        );
    }

    // --- Editor View ---
    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setIsEditorOpen(false)} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">New Announcement</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input 
                                    placeholder="Enter announcement title" 
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="text-lg font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label>Content</Label>
                                    <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400 h-8 text-xs gap-1">
                                        <Wand2 className="h-3 w-3" /> AI Draft
                                    </Button>
                                </div>
                                <Textarea 
                                    ref={editorRef} 
                                    className="min-h-[400px]" 
                                    placeholder="Write your announcement content here..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Publishing Settings</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={status} onChange={e => setStatus(e.target.value)}>
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label>Category</Label>
                                <Select value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="General">General</option>
                                    <option value="Events">Events</option>
                                    <option value="Fundraising">Fundraising</option>
                                    <option value="Education">Education</option>
                                </Select>
                            </div>
                             <div className="pt-4 flex gap-2">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" onClick={handleSave}>
                                    {status === 'Published' ? 'Publish Now' : 'Save Draft'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                         <CardHeader><CardTitle className="text-base">Featured Image</CardTitle></CardHeader>
                         <CardContent>
                             <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                 <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
                                 <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Click to upload</p>
                                 <p className="text-xs text-slate-400 dark:text-slate-500">SVG, PNG, JPG</p>
                             </div>
                         </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};