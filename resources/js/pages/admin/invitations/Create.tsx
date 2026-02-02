import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
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
        couple_title: '',
        couple_introduction: '',
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
        <AdminLayout>
            <Head title="Create Invitation" />

            <div className="mx-auto max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Wedding Invitation</CardTitle>
                        <CardDescription>Fill in the details to create a new wedding invitation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            {/* Couple Names */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="groom_name">
                                        Groom Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="groom_name"
                                        type="text"
                                        value={data.groom_name}
                                        onChange={(e) => setData('groom_name', e.target.value)}
                                        required
                                    />
                                    {errors.groom_name && <p className="text-sm text-red-500">{errors.groom_name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bride_name">
                                        Bride Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="bride_name"
                                        type="text"
                                        value={data.bride_name}
                                        onChange={(e) => setData('bride_name', e.target.value)}
                                        required
                                    />
                                    {errors.bride_name && <p className="text-sm text-red-500">{errors.bride_name}</p>}
                                </div>
                            </div>

                            {/* Full Names */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="groom_full_name">Groom Full Name</Label>
                                    <Input
                                        id="groom_full_name"
                                        type="text"
                                        value={data.groom_full_name}
                                        onChange={(e) => setData('groom_full_name', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bride_full_name">Bride Full Name</Label>
                                    <Input
                                        id="bride_full_name"
                                        type="text"
                                        value={data.bride_full_name}
                                        onChange={(e) => setData('bride_full_name', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Parents */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Groom's Parents</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="groom_father">Father's Name</Label>
                                            <Input
                                                id="groom_father"
                                                type="text"
                                                placeholder="Father's Name"
                                                value={data.groom_father}
                                                onChange={(e) => setData('groom_father', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="groom_mother">Mother's Name</Label>
                                            <Input
                                                id="groom_mother"
                                                type="text"
                                                placeholder="Mother's Name"
                                                value={data.groom_mother}
                                                onChange={(e) => setData('groom_mother', e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Bride's Parents</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bride_father">Father's Name</Label>
                                            <Input
                                                id="bride_father"
                                                type="text"
                                                placeholder="Father's Name"
                                                value={data.bride_father}
                                                onChange={(e) => setData('bride_father', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bride_mother">Mother's Name</Label>
                                            <Input
                                                id="bride_mother"
                                                type="text"
                                                placeholder="Mother's Name"
                                                value={data.bride_mother}
                                                onChange={(e) => setData('bride_mother', e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Couple Section Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">The Wedding Of Section</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="couple_title">Title</Label>
                                        <Input
                                            id="couple_title"
                                            type="text"
                                            placeholder="The Wedding Of"
                                            value={data.couple_title}
                                            onChange={(e) => setData('couple_title', e.target.value)}
                                        />
                                        <p className="text-xs text-muted-foreground">Judul yang ditampilkan di bagian couple section</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="couple_introduction">Opening Text (Couple Introduction)</Label>
                                        <Textarea
                                            id="couple_introduction"
                                            placeholder="بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ&#10;&#10;Assalamualaikum Warahmatullahi Wabarakatuh..."
                                            value={data.couple_introduction}
                                            onChange={(e) => setData('couple_introduction', e.target.value)}
                                            rows={5}
                                        />
                                        <p className="text-xs text-muted-foreground">Teks pembuka yang ditampilkan sebelum informasi couple</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Wedding Details */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="wedding_date">
                                        Wedding Date <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="wedding_date"
                                        type="date"
                                        value={data.wedding_date}
                                        onChange={(e) => setData('wedding_date', e.target.value)}
                                        required
                                    />
                                    {errors.wedding_date && <p className="text-sm text-red-500">{errors.wedding_date}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="wedding_time">Wedding Time</Label>
                                    <Input
                                        id="wedding_time"
                                        type="time"
                                        value={data.wedding_time}
                                        onChange={(e) => setData('wedding_time', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Slug & Hashtag */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Slug</Label>
                                    <Input
                                        id="slug"
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="e.g., john-jane-wedding"
                                    />
                                    <p className="text-xs text-muted-foreground">Leave empty for auto-generate</p>
                                    {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hashtag">Hashtag</Label>
                                    <Input
                                        id="hashtag"
                                        type="text"
                                        value={data.hashtag}
                                        onChange={(e) => setData('hashtag', e.target.value)}
                                        placeholder="#JohnAndJane2024"
                                    />
                                </div>
                            </div>

                            {/* Texts */}
                            <div className="space-y-2">
                                <Label htmlFor="opening_text">Opening Text</Label>
                                <Textarea
                                    id="opening_text"
                                    value={data.opening_text}
                                    onChange={(e) => setData('opening_text', e.target.value)}
                                    rows={3}
                                    placeholder="Welcome message..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="closing_text">Closing Text</Label>
                                <Textarea
                                    id="closing_text"
                                    value={data.closing_text}
                                    onChange={(e) => setData('closing_text', e.target.value)}
                                    rows={3}
                                    placeholder="Thank you message..."
                                />
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center space-x-2">
                                <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                <Label htmlFor="is_active" className="cursor-pointer">
                                    Active (visible to public)
                                </Label>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Invitation'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
