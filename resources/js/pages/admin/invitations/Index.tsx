import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Invitation {
    id: number;
    slug: string;
    groom_name: string;
    bride_name: string;
    wedding_date: string;
    is_active: boolean;
    sections_count: number;
    created_at: string;
}

interface PaginatedInvitations {
    data: Invitation[];
    links: any;
    meta: any;
}

interface Props {
    invitations: PaginatedInvitations;
}

export default function Index({ invitations }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus undangan ini?')) {
            router.delete(route('admin.invitations.destroy', id), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <AdminLayout>
            <Head title="Kelola Undangan" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Undangan Digital</h1>
                        <p className="text-muted-foreground">Kelola undangan pernikahan dan kontennya.</p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.invitations.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Undangan
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Undangan</CardTitle>
                        <div className="flex items-center py-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search" placeholder="Cari data..." className="pl-8" value={searchTerm} onChange={handleSearch} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pasangan</TableHead>
                                    <TableHead>Slug (Link)</TableHead>
                                    <TableHead>Tanggal Pernikahan</TableHead>
                                    <TableHead className="text-center">Seksi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invitations.data.length > 0 ? (
                                    invitations.data.map((invitation) => (
                                        <TableRow key={invitation.id}>
                                            <TableCell className="font-medium">
                                                {invitation.groom_name} & {invitation.bride_name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">/{invitation.slug}</TableCell>
                                            <TableCell>
                                                {new Date(invitation.wedding_date).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline">{invitation.sections_count} seksi</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={invitation.is_active ? 'default' : 'destructive'}>
                                                    {invitation.is_active ? 'Aktif' : 'Non-Aktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={route('invitation.show', invitation.slug)} target="_blank" title="Lihat Website">
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={route('admin.invitations.edit', invitation.id)} title="Edit Data">
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" title="Hapus" onClick={() => handleDelete(invitation.id)}>
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            Tidak ada undangan ditemukan.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
