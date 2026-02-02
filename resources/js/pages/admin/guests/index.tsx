import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Guest, PageProps, Paginated } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { CheckCircle, Copy, Edit, Link as LinkIcon, Loader2, MessageCircle, Plus, Search, Trash, Users, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props extends PageProps {
    guests: Paginated<Guest>;
    stats: {
        total_guests: number;
        total_rsvps: number;
        attending: number;
        not_attending: number;
        total_pax: number;
        total_wishes: number;
    };
    filters: { search?: string };
}

export default function GuestsIndex({ guests, stats, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [isCreating, setIsCreating] = useState(false);
    const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
    const [linkDialogGuest, setLinkDialogGuest] = useState<Guest | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.guests.index'), { search }, { preserveState: true });
    };

    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Guest Management</h2>}>
            <Head title="Guest Management" />

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_guests}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attending</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
                        <p className="text-xs text-muted-foreground">{stats.total_pax} total pax</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Not Attending</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.not_attending}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Wishes</CardTitle>
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_wishes}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Table Card */}
            <Card>
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle>Guests</CardTitle>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search guests..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full sm:w-[200px] pl-8"
                                />
                            </div>
                        </form>
                        <Dialog open={isCreating} onOpenChange={setIsCreating}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="w-full sm:w-auto">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Guest
                                </Button>
                            </DialogTrigger>
                            <GuestFormDialog onClose={() => setIsCreating(false)} />
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Max Pax</TableHead>
                                <TableHead>RSVP Status</TableHead>
                                <TableHead>Wishes</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {guests.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                        No guests found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                guests.data.map((guest) => (
                                    <TableRow key={guest.id}>
                                        <TableCell className="font-medium">
                                            {guest.name}
                                            {guest.companion && <span className="text-muted-foreground"> & {guest.companion}</span>}
                                        </TableCell>
                                        <TableCell>{guest.phone || '-'}</TableCell>
                                        <TableCell>{guest.pax}</TableCell>
                                        <TableCell>
                                            <RsvpBadge guest={guest} />
                                        </TableCell>
                                        <TableCell>{guest.wishes_count || 0}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" onClick={() => setLinkDialogGuest(guest)} title="Get Link">
                                                    <LinkIcon className="h-4 w-4" />
                                                </Button>

                                                <Dialog open={editingGuest?.id === guest.id} onOpenChange={(open) => !open && setEditingGuest(null)}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" onClick={() => setEditingGuest(guest)} title="Edit">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <GuestFormDialog guest={guest} onClose={() => setEditingGuest(null)} />
                                                </Dialog>

                                                <DeleteButton guest={guest} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <div className="mt-4">
                        <Pagination links={guests.links} />
                    </div>
                </CardContent>
            </Card>

            {/* Link Dialog */}
            <LinkDialog guest={linkDialogGuest} onClose={() => setLinkDialogGuest(null)} />
        </AdminLayout>
    );
}

function RsvpBadge({ guest }: { guest: Guest }) {
    const latestRsvp = guest.rsvps?.[0];
    if (!latestRsvp) {
        return <Badge variant="secondary">No Response</Badge>;
    }
    return latestRsvp.status === 'attending' ? (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Attending ({latestRsvp.pax_confirmed})</Badge>
    ) : (
        <Badge variant="destructive">Not Attending</Badge>
    );
}

function GuestFormDialog({ guest, onClose }: { guest?: Guest; onClose: () => void }) {
    const form = useForm({
        name: guest?.name || '',
        companion: guest?.companion || '',
        phone: guest?.phone || '',
        pax: guest?.pax || 2,
    });

    const isEditing = !!guest;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            form.put(route('admin.guests.update', guest.id), {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            form.post(route('admin.guests.store'), {
                onSuccess: () => {
                    form.reset();
                    onClose();
                },
            });
        }
    };

    return (
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Guest' : 'Add New Guest'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update guest information' : 'Create a new guest with a personalized invitation link'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Guest name" />
                        {form.errors.name && <p className="text-sm text-red-500">{form.errors.name}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="companion">Companion (optional)</Label>
                        <Input
                            id="companion"
                            value={form.data.companion}
                            onChange={(e) => form.setData('companion', e.target.value)}
                            placeholder="e.g., Pasangan, Partner, Ibu, or specific name"
                        />
                        <p className="text-xs text-muted-foreground">
                            Will display as: {form.data.name}
                            {form.data.companion && ` & ${form.data.companion}`}
                        </p>
                        {form.errors.companion && <p className="text-sm text-red-500">{form.errors.companion}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input
                            id="phone"
                            value={form.data.phone}
                            onChange={(e) => form.setData('phone', e.target.value)}
                            placeholder="08xxxxxxxxxx"
                        />
                        {form.errors.phone && <p className="text-sm text-red-500">{form.errors.phone}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="pax">Max Pax</Label>
                        <Input
                            id="pax"
                            type="number"
                            min={1}
                            max={10}
                            value={form.data.pax}
                            onChange={(e) => form.setData('pax', parseInt(e.target.value))}
                        />
                        {form.errors.pax && <p className="text-sm text-red-500">{form.errors.pax}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose} disabled={form.processing}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={form.processing}>
                        {form.processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? 'Save Changes' : 'Create Guest'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}

function DeleteButton({ guest }: { guest: Guest }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!confirm(`Are you sure you want to delete "${guest.name}"?`)) {
            return;
        }

        setIsDeleting(true);
        router.delete(route('admin.guests.destroy', guest.id), {
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isDeleting} title="Delete">
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4 text-red-500" />}
        </Button>
    );
}

function LinkDialog({ guest, onClose }: { guest: Guest | null; onClose: () => void }) {
    if (!guest) return null;

    const link = `${window.location.origin}/${guest.slug}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        toast.success('Link copied to clipboard!');
    };

    return (
        <Dialog open={!!guest} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invitation Link</DialogTitle>
                    <DialogDescription>Share this personalized link with {guest.name}</DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <Input value={link} readOnly className="font-mono text-sm" />
                    <Button size="icon" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button asChild>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            Open Link
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
