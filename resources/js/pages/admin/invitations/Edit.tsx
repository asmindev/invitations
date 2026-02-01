import AgendaEditor from '@/components/admin/sections/AgendaEditor';
import FooterEditor from '@/components/admin/sections/FooterEditor';
import GalleryEditor from '@/components/admin/sections/GalleryEditor';
import LoveStoryEditor from '@/components/admin/sections/LoveStoryEditor';
import ProtocolEditor from '@/components/admin/sections/ProtocolEditor';
import QuoteEditor from '@/components/admin/sections/QuoteEditor';
import RundownEditor from '@/components/admin/sections/RundownEditor';
import SaveDateEditor from '@/components/admin/sections/SaveDateEditor';
import WeddingGiftEditor from '@/components/admin/sections/WeddingGiftEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/layouts/admin-layout';
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
    couple_title?: string;
    couple_introduction?: string;
    groom_instagram?: string;
    groom_photo?: string;
    bride_instagram?: string;
    bride_photo?: string;
    cover_photo?: string;
    primary_pane_photo?: string;
    wedding_date: string;
    wedding_time?: string;
    hashtag?: string;
    opening_text?: string;
    closing_text?: string;
    audio_url?: string;
    is_active: boolean;
}

interface Props {
    invitation: Invitation;
    sections: Record<
        string,
        {
            id: number;
            data: any;
            is_visible: boolean;
            order: number;
        }
    >;
}

export default function Edit({ invitation, sections }: Props) {
    const [activeTab, setActiveTab] = useState('basic');

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        slug: invitation.slug || '',
        groom_name: invitation.groom_name || '',
        groom_full_name: invitation.groom_full_name || '',
        groom_father: invitation.groom_father || '',
        groom_mother: invitation.groom_mother || '',
        bride_name: invitation.bride_name || '',
        bride_full_name: invitation.bride_full_name || '',
        bride_father: invitation.bride_father || '',
        bride_mother: invitation.bride_mother || '',
        groom_instagram: invitation.groom_instagram || '',
        groom_photo: null as File | null,
        bride_instagram: invitation.bride_instagram || '',
        bride_photo: null as File | null,
        cover_photo: null as File | null,
        primary_pane_photo: null as File | null,
        couple_title: invitation.couple_title || '',
        couple_introduction: invitation.couple_introduction || '',
        wedding_date: invitation.wedding_date?.toString().substring(0, 10) || '',
        wedding_time: invitation.wedding_time?.substring(0, 5) || '',
        hashtag: invitation.hashtag || '',
        opening_text: invitation.opening_text || '',
        closing_text: invitation.closing_text || '',
        audio_url: invitation.audio_url || '',
        is_active: invitation.is_active,
    });

    const submitBasicInfo: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.invitations.update', invitation.id));
    };

    const tabs = [
        { key: 'basic', label: 'Info Dasar' },

        { key: 'quote', label: 'Kutipan' },
        { key: 'save_date', label: 'Simpan Tanggal' },
        { key: 'agenda', label: "It's The Day" },
        { key: 'rundown', label: 'Susunan Acara' },
        { key: 'gallery', label: 'Galeri' },
        { key: 'love_story', label: 'Kisah Cinta' },
        { key: 'wedding_gift', label: 'Kado Pernikahan' },
        { key: 'protocol', label: 'Protokol' },
        { key: 'footer', label: 'Footer' },
    ];

    return (
        <AdminLayout>
            <Head title={`Edit: ${invitation.groom_name} & ${invitation.bride_name}`} />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Undangan</h1>
                        <p className="text-muted-foreground">
                            {invitation.groom_name} & {invitation.bride_name}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader className="border-b p-0">
                        {/* Custom Tabs (simulating Shadcn Tabs since component is missing) */}
                        <div className="flex items-center overflow-x-auto px-4 pt-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative px-4 py-3 text-sm font-medium transition-colors hover:text-primary ${
                                        activeTab === tab.key ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        {activeTab === 'basic' && (
                            <form onSubmit={submitBasicInfo} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4 rounded-lg border p-4">
                                        <h3 className="font-semibold text-gray-700">Mempelai Pria</h3>
                                        <div className="space-y-2">
                                            <Label>Nama Panggilan *</Label>
                                            <Input value={data.groom_name} onChange={(e) => setData('groom_name', e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nama Lengkap</Label>
                                            <Input value={data.groom_full_name} onChange={(e) => setData('groom_full_name', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nama Ayah</Label>
                                            <Input value={data.groom_father} onChange={(e) => setData('groom_father', e.target.value)} />
                                        </div>
                                        <div className="range-y-2">
                                            <Label>Nama Ibu</Label>
                                            <Input value={data.groom_mother} onChange={(e) => setData('groom_mother', e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Instagram (opsional)</Label>
                                                <Input
                                                    value={data.groom_instagram}
                                                    onChange={(e) => setData('groom_instagram', e.target.value)}
                                                    placeholder="@username"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Foto Mempelai Pria</Label>
                                                {invitation.groom_photo && (
                                                    <div className="mb-2">
                                                        <img
                                                            src={invitation.groom_photo}
                                                            alt="Groom"
                                                            className="h-32 w-32 rounded-lg border object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setData('groom_photo', e.target.files ? e.target.files[0] : null)}
                                                />
                                                <p className="text-xs text-muted-foreground">Format: JPG, PNG. Max: 2MB.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 rounded-lg border p-4">
                                        <h3 className="font-semibold text-gray-700">Mempelai Wanita</h3>
                                        <div className="space-y-2">
                                            <Label>Nama Panggilan *</Label>
                                            <Input value={data.bride_name} onChange={(e) => setData('bride_name', e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nama Lengkap</Label>
                                            <Input value={data.bride_full_name} onChange={(e) => setData('bride_full_name', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nama Ayah</Label>
                                            <Input value={data.bride_father} onChange={(e) => setData('bride_father', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nama Ibu</Label>
                                            <Input value={data.bride_mother} onChange={(e) => setData('bride_mother', e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Instagram (opsional)</Label>
                                                <Input
                                                    value={data.bride_instagram}
                                                    onChange={(e) => setData('bride_instagram', e.target.value)}
                                                    placeholder="@username"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Foto Mempelai Wanita</Label>
                                                {invitation.bride_photo && (
                                                    <div className="mb-2">
                                                        <img
                                                            src={invitation.bride_photo}
                                                            alt="Bride"
                                                            className="h-32 w-32 rounded-lg border object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setData('bride_photo', e.target.files ? e.target.files[0] : null)}
                                                />
                                                <p className="text-xs text-muted-foreground">Format: JPG, PNG. Max: 2MB.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4 rounded-lg border p-4">
                                        <h3 className="font-semibold text-gray-700">Foto Cover (Atas)</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Foto yang muncul di bagian cover atas undangan (desktop & mobile)
                                        </p>
                                        {invitation.cover_photo && (
                                            <div className="mb-2">
                                                <img
                                                    src={invitation.cover_photo}
                                                    alt="Cover Photo"
                                                    className="h-48 w-full rounded-lg border object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <Label>Upload Foto Cover</Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('cover_photo', e.target.files ? e.target.files[0] : null)}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Format: JPG, PNG. Max: 2MB. Foto yang sama akan digunakan untuk desktop dan mobile.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 rounded-lg border p-4">
                                        <h3 className="font-semibold text-gray-700">Foto Primary Pane (Sidebar)</h3>
                                        <p className="text-sm text-muted-foreground">Foto yang muncul di sidebar kiri (desktop & mobile)</p>
                                        {invitation.primary_pane_photo && (
                                            <div className="mb-2">
                                                <img
                                                    src={invitation.primary_pane_photo}
                                                    alt="Primary Pane Photo"
                                                    className="h-48 w-full rounded-lg border object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <Label>Upload Foto Primary Pane</Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('primary_pane_photo', e.target.files ? e.target.files[0] : null)}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Format: JPG, PNG. Max: 2MB. Foto yang sama akan digunakan untuk desktop dan mobile.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Tanggal Pernikahan *</Label>
                                        <Input
                                            type="date"
                                            value={data.wedding_date}
                                            onChange={(e) => setData('wedding_date', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Waktu Pernikahan</Label>
                                        <Input type="time" value={data.wedding_time} onChange={(e) => setData('wedding_time', e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Slug URL</Label>
                                        <Input value={data.slug} onChange={(e) => setData('slug', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tagar</Label>
                                        <Input value={data.hashtag} onChange={(e) => setData('hashtag', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>URL Musik (Audio)</Label>
                                        <Input
                                            value={data.audio_url}
                                            onChange={(e) => setData('audio_url', e.target.value)}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                    <Label>Aktif</Label>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'quote' && (
                            <QuoteEditor
                                invitationId={invitation.id}
                                initialData={sections.quote?.data}
                                sectionId={sections.quote?.id}
                                isVisible={sections.quote?.is_visible}
                            />
                        )}
                        {activeTab === 'save_date' && (
                            <SaveDateEditor
                                invitationId={invitation.id}
                                initialData={sections.save_date?.data}
                                sectionId={sections.save_date?.id}
                                isVisible={sections.save_date?.is_visible}
                            />
                        )}
                        {activeTab === 'agenda' && (
                            <AgendaEditor
                                invitationId={invitation.id}
                                initialData={sections.agenda?.data}
                                sectionId={sections.agenda?.id}
                                isVisible={sections.agenda?.is_visible}
                            />
                        )}
                        {activeTab === 'rundown' && (
                            <RundownEditor
                                invitationId={invitation.id}
                                initialData={sections.rundown?.data}
                                sectionId={sections.rundown?.id}
                                isVisible={sections.rundown?.is_visible}
                            />
                        )}
                        {activeTab === 'gallery' && (
                            <GalleryEditor
                                invitationId={invitation.id}
                                initialData={sections.gallery?.data}
                                sectionId={sections.gallery?.id}
                                isVisible={sections.gallery?.is_visible}
                            />
                        )}
                        {activeTab === 'love_story' && (
                            <LoveStoryEditor
                                invitationId={invitation.id}
                                initialData={sections.love_story?.data}
                                sectionId={sections.love_story?.id}
                                isVisible={sections.love_story?.is_visible}
                            />
                        )}
                        {activeTab === 'wedding_gift' && (
                            <WeddingGiftEditor
                                invitationId={invitation.id}
                                initialData={sections.wedding_gift?.data}
                                sectionId={sections.wedding_gift?.id}
                                isVisible={sections.wedding_gift?.is_visible}
                            />
                        )}
                        {activeTab === 'protocol' && (
                            <ProtocolEditor
                                invitationId={invitation.id}
                                initialData={sections.protocol?.data}
                                sectionId={sections.protocol?.id}
                                isVisible={sections.protocol?.is_visible}
                            />
                        )}
                        {activeTab === 'footer' && (
                            <FooterEditor
                                invitationId={invitation.id}
                                initialData={sections.footer?.data}
                                sectionId={sections.footer?.id}
                                isVisible={sections.footer?.is_visible}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
