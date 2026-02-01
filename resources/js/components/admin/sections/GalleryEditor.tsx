import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, Trash2, Upload } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

interface GalleryImage {
    path?: string;
    url: string;
    alt: string;
}

interface GalleryData {
    title?: string;
    images: GalleryImage[];
}

interface Props {
    invitationId: number;
    sectionId?: number;
    isVisible?: boolean;
    initialData?: GalleryData;
}

export default function GalleryEditor({ invitationId, sectionId, isVisible = true, initialData }: Props) {
    const { data, setData, post, processing, transform } = useForm({
        title: initialData?.title || 'Portraits of Us',
        images: initialData?.images || [],
        is_visible: isVisible,
    });
    const [newImageAlt, setNewImageAlt] = useState('');
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        transform((data) => ({
            section_type: 'gallery',
            section_data: {
                title: data.title,
                images: data.images.map((img: GalleryImage) => ({
                    path: img.path,
                    url: img.url,
                    alt: img.alt,
                })),
            },
            order: 2,
            is_visible: data.is_visible,
        }));
        post(route('admin.invitations.sections.store', invitationId));
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post(route('admin.invitations.gallery.upload', invitationId), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    setData('images', [
                        ...data.images,
                        {
                            path: response.data.path,
                            url: response.data.url,
                            alt: newImageAlt || `Foto Galeri ${data.images.length + 1}`,
                        },
                    ]);
                }
            }
            setNewImageAlt('');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Gagal mengunggah gambar. Pastikan file adalah gambar dan ukuran tidak melebihi 5MB.');
        } finally {
            setUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const confirmDelete = async () => {
        if (deleteIndex === null) return;

        setDeleting(deleteIndex);
        const image = data.images[deleteIndex];

        // If image has a path (uploaded to our server), delete it
        if (image.path) {
            try {
                const response = await axios.delete(route('admin.invitations.gallery.destroy', invitationId), {
                    data: { path: image.path },
                });

                if (!response.data.success) {
                    toast.error('Gagal menghapus foto dari server.');
                    setDeleting(null);
                    return;
                }
            } catch (error) {
                console.error('Error deleting image:', error);
                toast.error('Gagal menghapus foto dari server.');
                setDeleting(null);
                return;
            }
        }

        const updatedImages = data.images.filter((_, i) => i !== deleteIndex);
        setData('images', updatedImages);
        setDeleting(null);
        setDeleteIndex(null);
        toast.success('Foto berhasil dihapus!');
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Galeri Foto</h3>
                    <p className="text-sm text-gray-600">Kelola foto-foto untuk galeri.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch checked={data.is_visible} onCheckedChange={(checked) => setData('is_visible', checked)} id="gallery-visible" />
                    <Label htmlFor="gallery-visible" className="cursor-pointer">
                        {data.is_visible ? 'Tampilkan' : 'Sembunyikan'}
                    </Label>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Judul Galeri</Label>
                <Input value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Tambah Foto Baru</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Deskripsi Foto (Opsional)</Label>
                            <Input
                                value={newImageAlt}
                                onChange={(e) => setNewImageAlt(e.target.value)}
                                placeholder="Deskripsi foto (untuk alt text)"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                multiple
                                className="hidden"
                                id="gallery-file-input"
                            />
                            <Button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mengunggah...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Pilih Foto
                                    </>
                                )}
                            </Button>
                            <span className="text-sm text-gray-500">Mendukung: JPEG, PNG, GIF, WebP (Maks. 5MB per file)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h3 className="mb-4 text-lg font-semibold">Daftar Foto ({data.images.length})</h3>
                <div className="grid grid-cols-3 gap-4">
                    {data.images.map((image, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg border">
                            <img src={image.url} alt={image.alt} className="h-40 w-full object-cover" />
                            <div className="border-t bg-white p-2">
                                <p className="mb-2 truncate text-sm text-gray-600">{image.alt}</p>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setDeleteIndex(index)}
                                    disabled={deleting === index}
                                    className="w-full"
                                >
                                    {deleting === index ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Menghapus...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="mr-2 h-4 w-4" /> Hapus
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                {data.images.length === 0 && (
                    <div className="rounded-lg border border-dashed py-8 text-center text-gray-500">
                        Belum ada foto yang ditambahkan. Klik "Pilih Foto" untuk mengunggah.
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Galeri'}
                </Button>
            </div>

            <AlertDialog open={deleteIndex !== null} onOpenChange={(open) => !open && setDeleteIndex(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Foto</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </form>
    );
}
