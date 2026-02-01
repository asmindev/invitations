import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        slug: '',
        groom_name: '',
        groom_full_name: '',
        groom_father: '',
        groom_mother: '',
        bride_name: '',
        bride_full_name: '',
        bride_father: '',
        bride_mother: '',
        wedding_date: '',
        wedding_time: '',
        hashtag: '',
        opening_text: '',
        closing_text: '',
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.invitations.store'));
    };

    return (
        <>
            <Head title="Create Invitation" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Create New Wedding Invitation</h2>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Couple Names */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Groom Name *</label>
                                        <input
                                            type="text"
                                            value={data.groom_name}
                                            onChange={(e) => setData('groom_name', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                            required
                                        />
                                        {errors.groom_name && <p className="mt-1 text-sm text-red-500">{errors.groom_name}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Bride Name *</label>
                                        <input
                                            type="text"
                                            value={data.bride_name}
                                            onChange={(e) => setData('bride_name', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                            required
                                        />
                                        {errors.bride_name && <p className="mt-1 text-sm text-red-500">{errors.bride_name}</p>}
                                    </div>
                                </div>

                                {/* Full Names */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Groom Full Name</label>
                                        <input
                                            type="text"
                                            value={data.groom_full_name}
                                            onChange={(e) => setData('groom_full_name', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Bride Full Name</label>
                                        <input
                                            type="text"
                                            value={data.bride_full_name}
                                            onChange={(e) => setData('bride_full_name', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        />
                                    </div>
                                </div>

                                {/* Parents */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <h3 className="font-medium text-gray-700">Groom's Parents</h3>
                                        <input
                                            type="text"
                                            placeholder="Father's Name"
                                            value={data.groom_father}
                                            onChange={(e) => setData('groom_father', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Mother's Name"
                                            value={data.groom_mother}
                                            onChange={(e) => setData('groom_mother', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-medium text-gray-700">Bride's Parents</h3>
                                        <input
                                            type="text"
                                            placeholder="Father's Name"
                                            value={data.bride_father}
                                            onChange={(e) => setData('bride_father', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Mother's Name"
                                            value={data.bride_mother}
                                            onChange={(e) => setData('bride_mother', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        />
                                    </div>
                                </div>

                                {/* Wedding Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Wedding Date *</label>
                                        <input
                                            type="date"
                                            value={data.wedding_date}
                                            onChange={(e) => setData('wedding_date', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                            required
                                        />
                                        {errors.wedding_date && <p className="mt-1 text-sm text-red-500">{errors.wedding_date}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Wedding Time</label>
                                        <input
                                            type="time"
                                            value={data.wedding_time}
                                            onChange={(e) => setData('wedding_time', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        />
                                    </div>
                                </div>

                                {/* Slug & Hashtag */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            URL Slug (leave empty for auto-generate)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                            placeholder="e.g., john-jane-wedding"
                                        />
                                        {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Hashtag</label>
                                        <input
                                            type="text"
                                            value={data.hashtag}
                                            onChange={(e) => setData('hashtag', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                                            placeholder="#JohnAndJane2024"
                                        />
                                    </div>
                                </div>

                                {/* Texts */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Opening Text</label>
                                    <textarea
                                        value={data.opening_text}
                                        onChange={(e) => setData('opening_text', e.target.value)}
                                        rows={3}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        placeholder="Welcome message..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Closing Text</label>
                                    <textarea
                                        value={data.closing_text}
                                        onChange={(e) => setData('closing_text', e.target.value)}
                                        rows={3}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        placeholder="Thank you message..."
                                    />
                                </div>

                                {/* Active Status */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">Active (visible to public)</label>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Invitation'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
