import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    invitationId: number;
    sectionId?: number;
    isVisible?: boolean;
    initialData?: {
        text: string;
        reference: string;
    };
}

export default function QuoteEditor({ invitationId, sectionId, isVisible = true, initialData }: Props) {
    const { data, setData, put, processing, errors, transform } = useForm({
        text:
            initialData?.text ||
            'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
        reference: initialData?.reference || "Qur'an 30:21 (Ar-Rum)",
        is_visible: isVisible,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        transform((formData) => ({
            section_data: {
                text: formData.text,
                reference: formData.reference,
            },
            order: 0,
            is_visible: formData.is_visible,
        }));
        put(
            route('admin.invitations.sections.update', {
                invitation: invitationId,
                section: 'quote',
            }),
        );
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Bagian Kutipan</h3>
                    <p className="text-sm text-gray-600">Atur kutipan pembuka untuk undangan Anda.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch checked={data.is_visible} onCheckedChange={(checked) => setData('is_visible', checked)} id="quote-visible" />
                    <Label htmlFor="quote-visible" className="cursor-pointer">
                        {data.is_visible ? 'Tampilkan' : 'Sembunyikan'}
                    </Label>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Teks Kutipan *</Label>
                <Textarea
                    value={data.text}
                    onChange={(e) => setData('text', e.target.value)}
                    rows={4}
                    placeholder="Masukkan teks kutipan..."
                    required
                />
                {errors.text && <p className="mt-1 text-sm text-destructive">{errors.text}</p>}
            </div>

            <div className="space-y-2">
                <Label>Referensi / Sumber *</Label>
                <Input value={data.reference} onChange={(e) => setData('reference', e.target.value)} placeholder="Contoh: Ar-Rum: 21" required />
                {errors.reference && <p className="mt-1 text-sm text-destructive">{errors.reference}</p>}
            </div>

            <div className="flex justify-end gap-3">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Kutipan'}
                </Button>
            </div>
        </form>
    );
}
