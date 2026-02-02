import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface InvitedFamily {
    id: number;
    family_name: string;
    order: number;
}

interface Props {
    invitationId: number;
    families?: InvitedFamily[];
}

export default function InvitedFamiliesEditor({ invitationId, families = [] }: Props) {
    const [localFamilies, setLocalFamilies] = useState<InvitedFamily[]>(families);
    const [newFamily, setNewFamily] = useState('');

    const { post, delete: destroy, processing } = useForm();

    const handleAdd: FormEventHandler = (e) => {
        e.preventDefault();
        if (!newFamily.trim()) {
            toast.error('Nama keluarga tidak boleh kosong');
            return;
        }

        post(route('admin.invited-families.store'), {
            data: {
                invitation_id: invitationId,
                family_name: newFamily,
                order: localFamilies.length,
            },
            onSuccess: () => {
                toast.success('Keluarga berhasil ditambahkan');
                setNewFamily('');
                window.location.reload();
            },
            onError: () => {
                toast.error('Gagal menambahkan keluarga');
            },
        });
    };

    const handleDelete = (familyId: number) => {
        if (!confirm('Yakin ingin menghapus keluarga ini?')) return;

        destroy(route('admin.invited-families.destroy', familyId), {
            onSuccess: () => {
                toast.success('Keluarga berhasil dihapus');
                setLocalFamilies(localFamilies.filter((f) => f.id !== familyId));
            },
            onError: () => {
                toast.error('Gagal menghapus keluarga');
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Turut Mengundang</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Daftar keluarga yang turut diundang. Akan ditampilkan dalam 2 kolom di bawah section "It's The Day"
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add New Family Form */}
                <form onSubmit={handleAdd} className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            value={newFamily}
                            onChange={(e) => setNewFamily(e.target.value)}
                            placeholder="Contoh: Keluarga Bapak Ahmad"
                            disabled={processing}
                        />
                    </div>
                    <Button type="submit" disabled={processing}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </form>

                {/* Families List */}
                {localFamilies.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                        <p>Belum ada keluarga yang ditambahkan</p>
                        <p className="text-sm">Tambahkan keluarga menggunakan form di atas</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label>Daftar Keluarga ({localFamilies.length})</Label>
                        <div className="space-y-2">
                            {localFamilies.map((family) => (
                                <div key={family.id} className="flex items-center gap-2 rounded-lg border bg-card p-3 hover:bg-accent/50">
                                    <GripVertical className="h-5 w-5 cursor-move text-muted-foreground" />
                                    <div className="flex-1">
                                        <p className="font-medium">{family.family_name}</p>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => handleDelete(family.id)} disabled={processing}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">💡 Tip: Drag untuk mengubah urutan (fitur drag-drop akan segera hadir)</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
