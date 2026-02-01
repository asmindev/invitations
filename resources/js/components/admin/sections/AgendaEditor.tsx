import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Activity {
    icon_type: number;
    title: string;
    time: string;
    venue?: {
        name: string;
        address: string;
        city: string;
        google_maps_url: string;
    };
}

interface DressCode {
    gender: 'men' | 'women';
    type: 'ethnic' | 'formal' | 'casual';
    colors: string[];
}

interface Props {
    invitationId: number;
    sectionId?: number;
    isVisible?: boolean;
    initialData?: {
        title?: string;
        activities: Activity[];
        dress_codes?: DressCode[];
    };
}

export default function AgendaEditor({ invitationId, isVisible = true, initialData }: Props) {
    const { data, setData, put, processing, transform } = useForm({
        title: initialData?.title || "It's The Day",
        activities: initialData?.activities || [
            {
                icon_type: 1,
                title: 'Akad Nikah',
                time: '08:00',
                venue: {
                    name: '',
                    address: '',
                    city: '',
                    google_maps_url: '',
                },
            },
        ],
        dress_codes: initialData?.dress_codes || [],
        is_visible: isVisible,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        transform((formData) => ({
            section_data: {
                title: formData.title,
                activities: formData.activities,
                dress_codes: formData.dress_codes,
            },
            order: 5,
            is_visible: formData.is_visible,
        }));
        put(
            route('admin.invitations.sections.update', {
                invitation: invitationId,
                section: 'agenda',
            }),
        );
    };

    const addActivity = () => {
        setData('activities', [
            ...data.activities,
            {
                icon_type: 1,
                title: '',
                time: '',
                venue: {
                    name: '',
                    address: '',
                    city: '',
                    google_maps_url: '',
                },
            },
        ]);
    };

    const removeActivity = (index: number) => {
        setData(
            'activities',
            data.activities.filter((_, i) => i !== index),
        );
    };

    const updateActivity = (index: number, field: keyof Activity, value: any) => {
        const updated = [...data.activities];
        if (field === 'venue') {
            updated[index] = { ...updated[index], venue: value };
        } else {
            updated[index] = { ...updated[index], [field]: value };
        }
        setData('activities', updated);
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">It's The Day - Agenda Acara</h3>
                    <p className="text-sm text-gray-600">Atur detail aktivitas di hari pernikahan.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch checked={data.is_visible} onCheckedChange={(checked) => setData('is_visible', checked)} id="agenda-visible" />
                    <Label htmlFor="agenda-visible" className="cursor-pointer">
                        {data.is_visible ? 'Tampilkan' : 'Sembunyikan'}
                    </Label>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Judul Bagian</Label>
                <Input value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </div>

            <div className="flex items-center justify-between">
                <h4 className="text-md font-semibold text-gray-700">Aktivitas</h4>
                <Button type="button" onClick={addActivity} className="bg-green-600 hover:bg-green-700">
                    + Tambah Aktivitas
                </Button>
            </div>

            {data.activities.map((activity, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">Aktivitas {index + 1}</CardTitle>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeActivity(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Tipe Icon</Label>
                                <Select
                                    value={activity.icon_type.toString()}
                                    onValueChange={(value) => updateActivity(index, 'icon_type', parseInt(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Icon 1 (Wedding Rings)</SelectItem>
                                        <SelectItem value="2">Icon 2 (Celebration)</SelectItem>
                                        <SelectItem value="3">Icon 3 (Hearts)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Waktu</Label>
                                <Input
                                    type="time"
                                    value={activity.time}
                                    onChange={(e) => updateActivity(index, 'time', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Nama Aktivitas</Label>
                            <Input
                                value={activity.title}
                                onChange={(e) => updateActivity(index, 'title', e.target.value)}
                                placeholder="Contoh: Akad Nikah"
                                required
                            />
                        </div>

                        <div className="rounded-lg border bg-gray-50 p-4">
                            <h5 className="mb-3 text-sm font-semibold text-gray-700">Lokasi (Opsional)</h5>
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Label className="text-xs">Nama Venue</Label>
                                    <Input
                                        value={activity.venue?.name || ''}
                                        onChange={(e) =>
                                            updateActivity(index, 'venue', {
                                                ...activity.venue,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Nama tempat"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label className="text-xs">Kota</Label>
                                        <Input
                                            value={activity.venue?.city || ''}
                                            onChange={(e) =>
                                                updateActivity(index, 'venue', {
                                                    ...activity.venue,
                                                    city: e.target.value,
                                                })
                                            }
                                            placeholder="Nama kota"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">URL Google Maps</Label>
                                        <Input
                                            type="url"
                                            value={activity.venue?.google_maps_url || ''}
                                            onChange={(e) =>
                                                updateActivity(index, 'venue', {
                                                    ...activity.venue,
                                                    google_maps_url: e.target.value,
                                                })
                                            }
                                            placeholder="https://maps.google.com/..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Alamat</Label>
                                    <Textarea
                                        value={activity.venue?.address || ''}
                                        onChange={(e) =>
                                            updateActivity(index, 'venue', {
                                                ...activity.venue,
                                                address: e.target.value,
                                            })
                                        }
                                        rows={2}
                                        placeholder="Alamat lengkap"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Agenda'}
                </Button>
            </div>
        </form>
    );
}
