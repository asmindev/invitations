import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Protocol {
    icon: string;
    title: string;
    description?: string;
}

interface Props {
    invitationId: number;
    initialData?: {
        title?: string;
        description?: string;
        protocols: Protocol[];
    };
}

export default function ProtocolEditor({ invitationId, initialData }: Props) {
    const defaultProtocols = [
        { icon: 'hand-wash', title: 'Cuci Tangan', description: 'Cuci tangan secara teratur' },
        { icon: 'mask', title: 'Pakai Masker', description: 'Wajib memakai masker' },
        { icon: 'temperature', title: 'Cek Suhu', description: 'Cek suhu saat masuk' },
        { icon: 'distance', title: 'Jaga Jarak', description: 'Jaga jarak aman' },
    ];

    const { data, setData, put, processing, transform } = useForm({
        title: initialData?.title || 'Protokol Kesehatan',
        description: initialData?.description || 'Mohon patuhi protokol kesehatan berikut demi kenyamanan bersama.',
        protocols: initialData?.protocols || defaultProtocols,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        transform((data) => ({
            section_data: data,
            order: 8,
            is_visible: true,
        }));
        put(
            route('admin.invitations.sections.update', {
                invitation: invitationId,
                section: 'protocol',
            }),
        );
    };

    const addProtocol = () => {
        setData('protocols', [...data.protocols, { icon: 'mask', title: '', description: '' }]);
    };

    const removeProtocol = (index: number) => {
        setData(
            'protocols',
            data.protocols.filter((_, i) => i !== index),
        );
    };

    const updateProtocol = (index: number, field: keyof Protocol, value: string) => {
        const updated = [...data.protocols];
        updated[index] = { ...updated[index], [field]: value };
        setData('protocols', updated);
    };

    const iconOptions = [
        { value: 'hand-wash', label: '🧼 Cuci Tangan' },
        { value: 'mask', label: '😷 Masker' },
        { value: 'temperature', label: '🌡️ Cek Suhu' },
        { value: 'distance', label: '↔️ Jaga Jarak' },
    ];

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Bagian Protokol Kesehatan</h3>
                <p className="mb-4 text-sm text-gray-600">Atur protokol kesehatan untuk acara Anda.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Judul</Label>
                    <Input value={data.title} onChange={(e) => setData('title', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Deskripsi (opsional)</Label>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows={2}
                        placeholder="Informasi tambahan..."
                    />
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-md font-semibold text-gray-700">Daftar Protokol</h4>
                    <Button type="button" onClick={addProtocol} className="bg-green-600 hover:bg-green-700">
                        + Tambah Protokol
                    </Button>
                </div>

                <div className="space-y-4">
                    {data.protocols.map((protocol, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Protokol #{index + 1}</CardTitle>
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeProtocol(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-3">
                                <div>
                                    <Label className="mb-1 block text-xs">Ikon</Label>
                                    <select
                                        value={protocol.icon}
                                        onChange={(e) => updateProtocol(index, 'icon', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {iconOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-xs">Judul *</Label>
                                    <Input value={protocol.title} onChange={(e) => updateProtocol(index, 'title', e.target.value)} required />
                                </div>
                                <div className="col-span-3 mt-2 space-y-2">
                                    <Label className="text-xs">Deskripsi</Label>
                                    <Input
                                        value={protocol.description || ''}
                                        onChange={(e) => updateProtocol(index, 'description', e.target.value)}
                                        placeholder="Deskripsi singkat..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Protokol'}
                </Button>
            </div>
        </form>
    );
}
