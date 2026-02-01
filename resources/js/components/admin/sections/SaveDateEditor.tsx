import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, Trash2, Upload } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    invitationId: number;
    sectionId?: number;
    isVisible?: boolean;
    initialData?: {
        title?: string;
        date: string;
        time: string;
        image_path?: string;
        image_url?: string;
        venue: {
            name: string;
            address: string;
            google_maps_url: string;
        };
    };
}

export default function SaveDateEditor({ invitationId, sectionId, isVisible = true, initialData }: Props) {
    const { data, setData, put, processing, transform } = useForm({
        title: initialData?.title || 'Save The Date',
        date: initialData?.date || '',
        time: initialData?.time || '',
        image_path: initialData?.image_path || '',
        image_url: initialData?.image_url || '',
        venue: initialData?.venue || {
            name: '',
            address: '',
            google_maps_url: '',
        },
        is_visible: isVisible,
    });

    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', 'save_date');

        try {
            const response = await axios.post(route('admin.invitations.gallery.upload', invitationId), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setData((prev: any) => ({
                    ...prev,
                    image_path: response.data.path,
                    image_url: response.data.url,
                }));
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Gagal mengunggah gambar. Pastikan file adalah gambar dan ukuran tidak melebihi 5MB.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeImage = () => {
        setData((prev: any) => ({
            ...prev,
            image_path: '',
            image_url: '',
        }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        transform((formData) => ({
            section_data: {
                title: formData.title,
                subtitle: formData.subtitle,
                date: formData.date,
                address: formData.address,
                google_maps_link: formData.google_maps_link,
                image_path: formData.image_path,
                image_url: formData.image_url,
            },
            order: 2,
            is_visible: formData.is_visible,
        }));
        put(
            route('admin.invitations.sections.update', {
                invitation: invitationId,
                section: 'save_date',
            }),
        );
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Bagian Simpan Tanggal</h3>
                    <p className="text-sm text-gray-600">Atur tanggal, waktu, dan lokasi pernikahan.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch checked={data.is_visible} onCheckedChange={(checked) => setData('is_visible', checked)} id="save-date-visible" />
                    <Label htmlFor="save-date-visible" className="cursor-pointer">
                        {data.is_visible ? 'Tampilkan' : 'Sembunyikan'}
                    </Label>
                </div>
            </div>

            <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
                <Label>Foto Save the Date</Label>
                <div className="flex flex-col gap-4">
                    {data.image_url ? (
                        <div className="relative h-48 w-full overflow-hidden rounded-lg border bg-white">
                            <img src={data.image_url} alt="Preview" className="h-full w-full object-contain" />
                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeImage}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {uploading ? (
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            ) : (
                                <>
                                    <Upload className="mb-2 h-8 w-8 text-gray-400" />
                                    <span className="text-sm text-gray-500">Klik untuk unggah foto</span>
                                </>
                            )}
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Judul</Label>
                    <Input value={data.title} onChange={(e) => setData('title', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Tanggal *</Label>
                    <Input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Waktu *</Label>
                    <Input type="time" value={data.time} onChange={(e) => setData('time', e.target.value)} required />
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h4 className="text-md mb-4 font-semibold text-gray-700">Informasi Lokasi</h4>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Nama Lokasi *</Label>
                        <Input
                            value={data.venue.name}
                            onChange={(e) => setData('venue', { ...data.venue, name: e.target.value })}
                            placeholder="Contoh: Grand Ballroom Hotel"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Alamat *</Label>
                        <Textarea
                            value={data.venue.address}
                            onChange={(e) => setData('venue', { ...data.venue, address: e.target.value })}
                            rows={3}
                            placeholder="Alamat lengkap..."
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>URL Google Maps *</Label>
                        <Input
                            type="url"
                            value={data.venue.google_maps_url}
                            onChange={(e) => setData('venue', { ...data.venue, google_maps_url: e.target.value })}
                            placeholder="https://maps.google.com/..."
                            required
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Tips: Buka Google Maps, cari lokasi, dan salin URL-nya.</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="submit" disabled={processing || uploading}>
                    {processing ? 'Menyimpan...' : 'Simpan Tanggal & Lokasi'}
                </Button>
            </div>
        </form>
    );
}
