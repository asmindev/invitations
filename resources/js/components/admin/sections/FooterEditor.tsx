import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    invitationId: number;
    initialData?: {
        closing_text?: string;
        couple_names?: string;
        hashtag?: string;
        credits?: string;
    };
    sectionId?: number;
    isVisible?: boolean;
}

export default function FooterEditor({ invitationId, initialData, isVisible = true }: Props) {
    const { data, setData, put, processing, transform } = useForm({
        closing_text:
            initialData?.closing_text || 'Terima kasih telah menjadi bagian dari hari istimewa kami. Kehadiran Anda sangat berarti bagi kami.',
        couple_names: initialData?.couple_names || '',
        hashtag: initialData?.hashtag || '',
        credits: initialData?.credits || 'Made with ❤️ by Katsudoto',
        is_visible: isVisible,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        transform((data) => ({
            section_data: { closing_text: data.closing_text, couple_names: data.couple_names, hashtag: data.hashtag, credits: data.credits },
            order: 9,
            is_visible: data.is_visible,
        }));
        put(
            route('admin.invitations.sections.update', {
                invitation: invitationId,
                section: 'footer',
            }),
        );
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Bagian Footer</h3>
                    <p className="text-sm text-gray-600">Atur konten footer dan kredit.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch 
                        checked={data.is_visible} 
                        onCheckedChange={(checked) => setData('is_visible', checked)}
                        id="footer-visible"
                    />
                    <Label htmlFor="footer-visible" className="cursor-pointer">
                        {data.is_visible ? 'Tampilkan' : 'Sembunyikan'}
                    </Label>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Kata Penutup</Label>
                    <Textarea
                        value={data.closing_text}
                        onChange={(e) => setData('closing_text', e.target.value)}
                        rows={3}
                        placeholder="Masukkan pesan penutup..."
                    />
                    <p className="text-xs text-muted-foreground">Pesan terima kasih untuk tamu Anda.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Nama Pasangan</Label>
                        <Input
                            value={data.couple_names}
                            onChange={(e) => setData('couple_names', e.target.value)}
                            placeholder="Contoh: Marcell & Lisa"
                        />
                        <p className="text-xs text-muted-foreground">Ditampilkan di footer (default nama undangan jika kosong).</p>
                    </div>

                    <div className="space-y-2">
                        <Label>Hashtag</Label>
                        <Input value={data.hashtag} onChange={(e) => setData('hashtag', e.target.value)} placeholder="#WeddingHashtag" />
                        <p className="text-xs text-muted-foreground">Hashtag pernikahan untuk media sosial.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Kredit</Label>
                    <Input value={data.credits} onChange={(e) => setData('credits', e.target.value)} />
                    <p className="text-xs text-muted-foreground">Teks kredit yang ditampilkan.</p>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Footer'}
                </Button>
            </div>
        </form>
    );
}
