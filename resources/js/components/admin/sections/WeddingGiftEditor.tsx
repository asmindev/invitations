import axios from 'axios';
import { useState } from 'react';

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
}

export default function WeddingGiftEditor({ invitationId, initialData }: Props) {
    const [title, setTitle] = useState(initialData?.title || 'Wedding Gift');
    const [description, setDescription] = useState(initialData?.description || 'Your blessing and coming to our wedding are enough for us...');
    const [banks, setBanks] = useState<Bank[]>(initialData?.banks || [{ name: 'BANK BCA (014)', account_number: '', account_name: '' }]);
    const [saving, setSaving] = useState(false);

    const addBank = () => {
        setBanks([...banks, { name: '', account_number: '', account_name: '' }]);
    };

    const removeBank = (index: number) => {
        setBanks(banks.filter((_, i) => i !== index));
    };

    const updateBank = (index: number, field: string, value: string) => {
        const updated = [...banks];
        updated[index] = { ...updated[index], [field]: value };
        setBanks(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.post(route('admin.invitations.sections.store', invitationId), {
                section_type: 'wedding_gift',
                section_data: { title, description, banks },
                order: 4,
                is_visible: true,
            });
            alert('Wedding Gift saved successfully!');
        } catch (error) {
            console.error('Error saving wedding gift:', error);
            alert('Error saving wedding gift');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Section Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Bank Accounts</h3>
                <button type="button" onClick={addBank} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    + Add Bank Account
                </button>
            </div>

            {banks.map((bank, index) => (
                <div key={index} className="space-y-4 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                        <h4 className="text-md font-medium text-gray-700">Bank {index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => removeBank(index)}
                            className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Bank Name</label>
                        <input
                            type="text"
                            value={bank.name}
                            onChange={(e) => updateBank(index, 'name', e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            placeholder="e.g., BANK BCA (014)"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Account Number</label>
                            <input
                                type="text"
                                value={bank.account_number}
                                onChange={(e) => updateBank(index, 'account_number', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                                placeholder="1234567890"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Account Name</label>
                            <input
                                type="text"
                                value={bank.account_name}
                                onChange={(e) => updateBank(index, 'account_name', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                                placeholder="John Doe"
                            />
                        </div>
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
                    {saving ? 'Saving...' : 'Save Wedding Gift'}
                </button>
            </div>
        </div>
    );
}
