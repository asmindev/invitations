import GalleryEditor from '@/components/admin/sections/GalleryEditor';
import LoveStoryEditor from '@/components/admin/sections/LoveStoryEditor';
import RundownEditor from '@/components/admin/sections/RundownEditor';
import WeddingGiftEditor from '@/components/admin/sections/WeddingGiftEditor';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Invitation {
    id: number;
    slug: string;
    groom_name: string;
    groom_full_name?: string;
    groom_father?: string;
    groom_mother?: string;
    bride_name: string;
    bride_full_name?: string;
    bride_father?: string;
    bride_mother?: string;
    wedding_date: string;
    wedding_time?: string;
    hashtag?: string;
    opening_text?: string;
    closing_text?: string;
    is_active: boolean;
}

interface Props {
    invitation: Invitation;
    sections: Record<string, any>;
}

export default function Edit({ invitation, sections }: Props) {
    const [activeTab, setActiveTab] = useState('basic');

    const { data, setData, put, processing, errors } = useForm({
        slug: invitation.slug || '',
        groom_name: invitation.groom_name || '',
        groom_full_name: invitation.groom_full_name || '',
        groom_father: invitation.groom_father || '',
        groom_mother: invitation.groom_mother || '',
        bride_name: invitation.bride_name || '',
        bride_full_name: invitation.bride_full_name || '',
        bride_father: invitation.bride_father || '',
        bride_mother: invitation.bride_mother || '',
        wedding_date: invitation.wedding_date || '',
        wedding_time: invitation.wedding_time || '',
        hashtag: invitation.hashtag || '',
        opening_text: invitation.opening_text || '',
        closing_text: invitation.closing_text || '',
        is_active: invitation.is_active,
    });

    const submitBasicInfo: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.invitations.update', invitation.id));
    };

    const tabs = [
        { key: 'basic', label: 'Basic Info' },
        { key: 'rundown', label: 'Rundown' },
        { key: 'gallery', label: 'Gallery' },
        { key: 'love_story', label: 'Love Story' },
        { key: 'wedding_gift', label: 'Wedding Gift' },
        { key: 'live_streaming', label: 'Live Streaming' },
        { key: 'instagram_filter', label: 'Instagram Filter' },
        { key: 'protocol', label: 'Protocol' },
    ];

    return (
        <>
            <Head title={`Edit: ${invitation.groom_name} & ${invitation.bride_name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                                Edit: {invitation.groom_name} & {invitation.bride_name}
                            </h2>

                            {/* Tabs */}
                            <div className="mb-6 border-b border-gray-200">
                                <nav className="-mb-px flex space-x-4 overflow-x-auto">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`border-b-2 px-4 py-4 text-sm font-medium whitespace-nowrap ${
                                                activeTab === tab.key
                                                    ? 'border-blue-500 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'basic' && (
                                <form onSubmit={submitBasicInfo} className="space-y-6">
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
                                        </div>
                                    </div>

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

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">URL Slug</label>
                                            <input
                                                type="text"
                                                value={data.slug}
                                                onChange={(e) => setData('slug', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Hashtag</label>
                                            <input
                                                type="text"
                                                value={data.hashtag}
                                                onChange={(e) => setData('hashtag', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <label className="ml-2 text-sm text-gray-700">Active</label>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                        >
                                            {processing ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'rundown' && (
                                <RundownEditor invitationId={invitation.id} initialData={sections.rundown?.[0]?.section_data} />
                            )}

                            {activeTab === 'gallery' && (
                                <GalleryEditor invitationId={invitation.id} initialData={sections.gallery?.[0]?.section_data} />
                            )}

                            {activeTab === 'love_story' && (
                                <LoveStoryEditor invitationId={invitation.id} initialData={sections.love_story?.[0]?.section_data} />
                            )}

                            {activeTab === 'wedding_gift' && (
                                <WeddingGiftEditor invitationId={invitation.id} initialData={sections.wedding_gift?.[0]?.section_data} />
                            )}

                            {activeTab === 'live_streaming' && (
                                <div className="space-y-4">
                                    <p className="text-gray-600">Configure live streaming URL</p>
                                    {/* Simple form for streaming URL */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
