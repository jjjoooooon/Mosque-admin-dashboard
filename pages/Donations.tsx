import React, { useState, useEffect } from 'react';
import { 
    Card, CardContent, CardHeader, CardTitle, 
    Button, Input, Table, TableBody, TableCell, 
    TableHead, TableHeader, TableRow, Badge, Dialog,
    Label, Select, Textarea
} from '../components/ui';
import { Plus, Search, Download, Filter, FileDown, Pencil, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Donation } from '../types';
import { useCurrency } from '../context/CurrencyContext';

// Dummy Data
const INITIAL_DONATIONS: Donation[] = [
    { id: '1', donorName: 'Ahmed Ali', amount: 150.00, date: '2023-10-24', method: 'Online', notes: 'General Fund' },
    { id: '2', donorName: 'Fatima Hassan', amount: 500.00, date: '2023-10-23', method: 'Bank Transfer', notes: 'Zakat' },
    { id: '3', donorName: 'Anonymous', amount: 50.00, date: '2023-10-23', method: 'Cash', notes: 'Friday Collection' },
    { id: '4', donorName: 'Yusuf Khan', amount: 1200.00, date: '2023-10-22', method: 'Online', notes: 'Building Construction' },
    { id: '5', donorName: 'Mariam S.', amount: 200.00, date: '2023-10-21', method: 'Online', notes: 'Sadaqah' },
    { id: '6', donorName: 'Omar Farooq', amount: 100.00, date: '2023-10-20', method: 'Cash', notes: 'Jumuah' },
    { id: '7', donorName: 'Zainab B.', amount: 350.00, date: '2023-10-19', method: 'Online', notes: 'Education Fund' },
    { id: '8', donorName: 'Ibrahim K.', amount: 75.00, date: '2023-10-18', method: 'Cash', notes: 'General' },
];

export const Donations = ({ children }: React.PropsWithChildren) => {
    const { formatCurrency, symbol } = useCurrency();
    const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Form State
    const [newDonation, setNewDonation] = useState<Partial<Donation>>({
        method: 'Cash',
        date: new Date().toISOString().split('T')[0]
    });

    const filteredDonations = donations.filter(d => {
        const matchesSearch = d.donorName.toLowerCase().includes(search.toLowerCase()) ||
            d.notes?.toLowerCase().includes(search.toLowerCase());
        
        const matchesStartDate = startDate ? d.date >= startDate : true;
        const matchesEndDate = endDate ? d.date <= endDate : true;

        return matchesSearch && matchesStartDate && matchesEndDate;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
    const paginatedDonations = filteredDonations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, startDate, endDate]);

    const handleSaveDonation = () => {
        if (!newDonation.amount || !newDonation.donorName) return;
        
        if (editingId) {
            // Update existing
            setDonations(donations.map(d => d.id === editingId ? {
                ...d,
                donorName: newDonation.donorName!,
                amount: Number(newDonation.amount),
                date: newDonation.date!,
                method: newDonation.method as any,
                notes: newDonation.notes
            } : d));
        } else {
            // Create new
            const donation: Donation = {
                id: Math.random().toString(36).substr(2, 9),
                donorName: newDonation.donorName,
                amount: Number(newDonation.amount),
                date: newDonation.date || new Date().toISOString().split('T')[0],
                method: newDonation.method as any,
                notes: newDonation.notes
            };
            setDonations([donation, ...donations]);
        }
        
        setIsAddOpen(false);
        setNewDonation({ method: 'Cash', date: new Date().toISOString().split('T')[0] });
        setEditingId(null);
    };

    const handleEdit = (donation: Donation) => {
        setEditingId(donation.id);
        setNewDonation({ ...donation });
        setIsAddOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this donation?')) {
            setDonations(donations.filter(d => d.id !== id));
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setNewDonation({ method: 'Cash', date: new Date().toISOString().split('T')[0] });
        setIsAddOpen(true);
    };

    const exportCSV = () => {
        const headers = ["ID", "Name", "Amount", "Date", "Method", "Notes"];
        const rows = filteredDonations.map(d => [d.id, d.donorName, d.amount, d.date, d.method, d.notes || '']);
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "donations_export.csv");
        document.body.appendChild(link);
        link.click();
    };

    const clearDateFilters = () => {
        setStartDate('');
        setEndDate('');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Donations</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage incoming donations and records.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={exportCSV}><FileDown className="mr-2 h-4 w-4" /> Export CSV</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" onClick={openAddModal}>
                        <Plus className="mr-2 h-4 w-4" /> Add Donation
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input 
                                placeholder="Search donor or notes..." 
                                className="pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">From</span>
                                <Input 
                                    type="date" 
                                    className="w-auto dark:text-slate-100"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">To</span>
                                <Input 
                                    type="date" 
                                    className="w-auto dark:text-slate-100"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            {(startDate || endDate) && (
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={clearDateFilters}
                                    className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                                >
                                    <X className="h-4 w-4 mr-1" /> Clear
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Donor Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Notes</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedDonations.length > 0 ? (
                                paginatedDonations.map((d) => (
                                    <TableRow key={d.id}>
                                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">{d.donorName}</TableCell>
                                        <TableCell className="text-slate-900 dark:text-slate-100">{formatCurrency(d.amount)}</TableCell>
                                        <TableCell className="text-slate-900 dark:text-slate-100">{d.date}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{d.method}</Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-500 dark:text-slate-400">{d.notes}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                                                    onClick={() => handleEdit(d)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                                                    onClick={() => handleDelete(d.id)}
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
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="flex-1 text-sm text-slate-500 dark:text-slate-400">
                            Showing {paginatedDonations.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredDonations.length)} of {filteredDonations.length} entries
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

            {/* Add/Edit Donation Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen} title={editingId ? "Edit Donation" : "Add New Donation"}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Donor Name</Label>
                            <Input 
                                placeholder="e.g. Ahmed Ali" 
                                value={newDonation.donorName || ''}
                                onChange={e => setNewDonation({...newDonation, donorName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Amount ({symbol})</Label>
                            <Input 
                                type="number" 
                                placeholder="0.00" 
                                value={newDonation.amount || ''}
                                onChange={e => setNewDonation({...newDonation, amount: parseFloat(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input 
                                type="date" 
                                value={newDonation.date}
                                onChange={e => setNewDonation({...newDonation, date: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Payment Method</Label>
                            <Select 
                                value={newDonation.method} 
                                onChange={e => setNewDonation({...newDonation, method: e.target.value as any})}
                            >
                                <option value="Cash">Cash</option>
                                <option value="Online">Online</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea 
                            placeholder="Optional notes (e.g. Zakat, Building Fund)" 
                            value={newDonation.notes || ''}
                            onChange={e => setNewDonation({...newDonation, notes: e.target.value})}
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveDonation} className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                            {editingId ? 'Update Donation' : 'Save Donation'}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};