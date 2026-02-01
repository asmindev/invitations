import axios from 'axios';
import { useState } from 'react';

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
    initialData?: RundownData;
}

export default function RundownEditor({ invitationId, initialData }: Props) {
    const [events, setEvents] = useState<RundownEvent[]>(
        initialData?.events || [
            {
                title: 'Resepsi',
                agendas: [{ time: '11:00 AM', text: 'Grand Entrance' }],
            },
        ],
    );
    const [saving, setSaving] = useState(false);

    const addEvent = () => {
        setEvents([...events, { title: '', agendas: [] }]);
    };

    const removeEvent = (eventIndex: number) => {
        setEvents(events.filter((_, i) => i !== eventIndex));
    };

    const updateEvent = (eventIndex: number, field: string, value: string) => {
        const updated = [...events];
        updated[eventIndex] = { ...updated[eventIndex], [field]: value };
        setEvents(updated);
    };

    const addAgenda = (eventIndex: number) => {
        const updated = [...events];
        updated[eventIndex].agendas.push({ time: '', text: '' });
        setEvents(updated);
    };

    const removeAgenda = (eventIndex: number, agendaIndex: number) => {
        const updated = [...events];
        updated[eventIndex].agendas = updated[eventIndex].agendas.filter((_, i) => i !== agendaIndex);
        setEvents(updated);
    };

    const updateAgenda = (eventIndex: number, agendaIndex: number, field: string, value: string) => {
        const updated = [...events];
        updated[eventIndex].agendas[agendaIndex] = {
            ...updated[eventIndex].agendas[agendaIndex],
            [field]: value,
        };
        setEvents(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.post(route('admin.invitations.sections.store', invitationId), {
                section_type: 'rundown',
                section_data: { events },
                order: 1,
                is_visible: true,
            });
            alert('Rundown saved successfully!');
        } catch (error) {
            console.error('Error saving rundown:', error);
            alert('Error saving rundown');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Rundown Events</h3>
                <button type="button" onClick={addEvent} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    + Add Event
                </button>
            </div>

            {events.map((event, eventIndex) => (
                <div key={eventIndex} className="space-y-4 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                        <div className="mr-4 flex-1">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Event Title</label>
                            <input
                                type="text"
                                value={event.title}
                                onChange={(e) => updateEvent(eventIndex, 'title', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                                placeholder="e.g., Resepsi"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeEvent(eventIndex)}
                            className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                        >
                            Remove Event
                        </button>
                    </div>

                    <div className="ml-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-700">Agendas</h4>
                            <button
                                type="button"
                                onClick={() => addAgenda(eventIndex)}
                                className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                            >
                                + Add Agenda
                            </button>
                        </div>

                        {event.agendas.map((agenda, agendaIndex) => (
                            <div key={agendaIndex} className="mb-2 grid grid-cols-3 gap-3">
                                <input
                                    type="text"
                                    value={agenda.time}
                                    onChange={(e) => updateAgenda(eventIndex, agendaIndex, 'time', e.target.value)}
                                    className="rounded-md border border-gray-300 px-3 py-2"
                                    placeholder="11:00 AM"
                                />
                                <input
                                    type="text"
                                    value={agenda.text}
                                    onChange={(e) => updateAgenda(eventIndex, agendaIndex, 'text', e.target.value)}
                                    className="rounded-md border border-gray-300 px-3 py-2"
                                    placeholder="Grand Entrance"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeAgenda(eventIndex, agendaIndex)}
                                    className="rounded-md bg-red-400 px-3 py-2 text-white hover:bg-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Rundown'}
                </button>
            </div>
        </div>
    );
}
