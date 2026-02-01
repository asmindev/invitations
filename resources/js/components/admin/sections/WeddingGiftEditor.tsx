import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Bank {
    name: string;
    account_number: string;
    account_name: string;
}

interface WeddingGiftData {
    title?: string;
    description?: string;
    banks: Bank[];
}

interface Props {
    invitationId: number;
    initialData?: WeddingGiftData;
    sectionId?: number;
    isVisible?: boolean;
}

export default function WeddingGiftEditor({ invitationId, initialData, isVisible = true }: Props) {
    const { data, setData, put, processing, transform } = useForm({
        title: initialData?.title || 'Wedding Gift',
        description: initialData?.description || 'Your blessing and coming to our wedding are enough for us...',
        banks: initialData?.banks || [{ name: 'BANK BCA (014)', account_number: '', account_name: '' }],
        is_visible: isVisible,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        transform((data) => ({
            section_data: { title: data.title, description: data.description, banks: data.banks },
            order: 4,
            is_visible: data.is_visible,
        }));
        put(
            route('admin.invitations.sections.update', {
                invitation: invitationId,
                section: 'wedding_gift',
            }),
        );
    };

    const addBank = () => {
        setData('banks', [...data.banks, { name: '', account_number: '', account_name: '' }]);
    };

    const removeBank = (index: number) => {
        setData(
            'banks',
            data.banks.filter((_, i) => i !== index),
        );
    };

    const updateBank = (index: number, field: string, value: string) => {
        const updated = [...data.banks];
        updated[index] = { ...updated[index], [field]: value };
        setData('banks', updated);
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Hadiah Pernikahan</h3>
                    <p className="text-sm text-gray-600">Atur informasi hadiah dan rekening.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch 
                        checked={data.is_visible} 
                        onCheckedChange={(checked) => setData('is_visible', checked)}
                        id="wedding-gift-visible"
                    />
                    <Label htmlFor="wedding-gift-visible" className="cursor-pointer">
                        {data.is_visible ? 'Tampilkan' : 'Sembunyikan'}
                    </Label>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Judul Bagian</Label>
                <Input value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </div>

            <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} />
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Rekening Bank / E-Wallet</h3>
                <Button onClick={addBank} className="bg-green-600 hover:bg-green-700">
                    + Tambah Rekening
                </Button>
            </div>

            {data.banks.map((bank, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">Rekening {index + 1}</CardTitle>
                        <Button variant="destructive" size="icon" onClick={() => removeBank(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nama Bank</Label>
                            <Input
                                value={bank.name}
                                onChange={(e) => updateBank(index, 'name', e.target.value)}
                                placeholder="Contoh: BCA, Mandiri, DANA"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nomor Rekening</Label>
                                <Input
                                    value={bank.account_number}
                                    onChange={(e) => updateBank(index, 'account_number', e.target.value)}
                                    placeholder="1234567890"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Atas Nama</Label>
                                <Input
                                    value={bank.account_name}
                                    onChange={(e) => updateBank(index, 'account_name', e.target.value)}
                                    placeholder="Nama Pemilik Rekening"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Data Gift'}
                </Button>
            </div>
        </form>
    );
}
