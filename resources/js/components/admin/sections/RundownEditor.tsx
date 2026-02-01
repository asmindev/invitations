import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Agenda {
    time: string;
    text: string;
}

interface RundownEvent {
    title: string;
    agendas: Agenda[];
}

interface RundownData {
    events: RundownEvent[];
}

interface Props {
    invitationId: number;
    sectionId?: number;
    isVisible?: boolean;
    initialData?: RundownData;
}

export default function RundownEditor({ invitationId, sectionId, isVisible = true, initialData }: Props) {
    const { data, setData, put, processing, transform } = useForm({
        events: initialData?.events || [
            {
                title: 'Resepsi',
                agendas: [{ time: '11:00 AM', text: 'Grand Entrance' }],
            },
        ],
        is_visible: isVisible,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        transform((formData) => ({
            section_data: { events: formData.events },
            order: 1,
            is_visible: formData.is_visible,
        }));
        put(
            route('admin.invitations.sections.update', {
                invitation: invitationId,
                section: 'rundown',
            }),
        );
    };

    const addEvent = () => {
        setData('events', [...data.events, { title: '', agendas: [] }]);
    };

    const removeEvent = (eventIndex: number) => {
        setData(
            'events',
            data.events.filter((_, i) => i !== eventIndex),
        );
    };

    const updateEvent = (eventIndex: number, field: string, value: string) => {
        const updated = [...data.events];
        updated[eventIndex] = { ...updated[eventIndex], [field]: value };
        setData('events', updated);
    };

    const addAgenda = (eventIndex: number) => {
        const updated = [...data.events];
        updated[eventIndex].agendas.push({ time: '', text: '' });
        setData('events', updated);
    };

    const removeAgenda = (eventIndex: number, agendaIndex: number) => {
        const updated = [...data.events];
        updated[eventIndex].agendas = updated[eventIndex].agendas.filter((_, i) => i !== agendaIndex);
        setData('events', updated);
    };

    const updateAgenda = (eventIndex: number, agendaIndex: number, field: string, value: string) => {
        const updated = [...data.events];
        updated[eventIndex].agendas[agendaIndex] = {
            ...updated[eventIndex].agendas[agendaIndex],
            [field]: value,
        };
        setData('events', updated);
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Susunan Acara</h3>
                    <p className="text-sm text-gray-600">Atur jadwal dan detail acara.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Switch checked={data.is_visible} onCheckedChange={(checked) => setData('is_visible', checked)} id="rundown-visible" />
                        <Label htmlFor="rundown-visible" className="cursor-pointer">
                            {data.is_visible ? 'Tampilkan' : 'Sembunyikan'}
                        </Label>
                    </div>
                    <Button onClick={addEvent} className="bg-green-600 hover:bg-green-700">
                        + Tambah Acara
                    </Button>
                </div>
            </div>

            {data.events.map((event, eventIndex) => (
                <Card key={eventIndex}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <div className="flex-1">
                            <Label>Nama Acara</Label>
                            <Input
                                value={event.title}
                                onChange={(e) => updateEvent(eventIndex, 'title', e.target.value)}
                                placeholder="Contoh: Resepsi"
                                className="mt-1"
                            />
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => removeEvent(eventIndex)} title="Hapus Acara" className="mt-6">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">Daftar Agenda</h4>
                                <Button variant="outline" size="sm" onClick={() => addAgenda(eventIndex)}>
                                    + Tambah Agenda
                                </Button>
                            </div>

                            {event.agendas.map((agenda, agendaIndex) => (
                                <div key={agendaIndex} className="flex items-end gap-3">
                                    <div className="w-1/3">
                                        <Label className="text-xs">Waktu</Label>
                                        <Input
                                            value={agenda.time}
                                            onChange={(e) => updateAgenda(eventIndex, agendaIndex, 'time', e.target.value)}
                                            placeholder="11:00"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Label className="text-xs">Kegiatan</Label>
                                        <Input
                                            value={agenda.text}
                                            onChange={(e) => updateAgenda(eventIndex, agendaIndex, 'text', e.target.value)}
                                            placeholder="Kegiatan..."
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeAgenda(eventIndex, agendaIndex)}
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Susunan Acara'}
                </Button>
            </div>
        </form>
    );
}
