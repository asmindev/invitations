import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Story {
    title: string;
    caption: string;
    image: string;
    imageFile?: File | null;
}

interface LoveStoryData {
    title?: string;
    stories: Story[];
}

interface Props {
    invitationId: number;
    initialData?: LoveStoryData;
}

export default function LoveStoryEditor({ invitationId, initialData }: Props) {
    const [title, setTitle] = useState(initialData?.title || 'Our Story');
    const [stories, setStories] = useState<Story[]>(initialData?.stories || [{ title: 'First Date', caption: '', image: '', imageFile: null }]);
    const [saving, setSaving] = useState(false);

    const addStory = () => {
        setStories([...stories, { title: '', caption: '', image: '', imageFile: null }]);
    };

    const removeStory = (index: number) => {
        setStories(stories.filter((_, i) => i !== index));
    };

    const updateStory = (index: number, field: string, value: string) => {
        const updated = [...stories];
        updated[index] = { ...updated[index], [field]: value };
        setStories(updated);
    };

    const handleImageUpload = (index: number, file: File | null) => {
        const updated = [...stories];
        updated[index] = { ...updated[index], imageFile: file };
        setStories(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('section_type', 'love_story');
            formData.append('order', '3');
            formData.append('is_visible', '1');

            // Prepare stories data without imageFile
            const storiesData = stories.map(({ imageFile, ...story }) => story);
            formData.append('section_data[title]', title);

            storiesData.forEach((story, index) => {
                formData.append(`section_data[stories][${index}][title]`, story.title);
                formData.append(`section_data[stories][${index}][caption]`, story.caption);
                formData.append(`section_data[stories][${index}][image]`, story.image);
            });

            // Add file uploads
            stories.forEach((story, index) => {
                if (story.imageFile) {
                    formData.append(`story_images[${index}]`, story.imageFile);
                }
            });

            await axios.post(route('admin.invitations.sections.store', invitationId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Kisah cinta berhasil disimpan!');
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error('Error saving love story:', error);
            toast.error('Gagal menyimpan kisah cinta.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Judul Bagian</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Perjalanan Kisah Cinta</h3>
                <Button onClick={addStory} className="bg-green-600 hover:bg-green-700">
                    + Tambah Cerita
                </Button>
            </div>

            {stories.map((story, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">Cerita {index + 1}</CardTitle>
                        <Button variant="destructive" size="icon" onClick={() => removeStory(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Judul Cerita</Label>
                            <Input
                                value={story.title}
                                onChange={(e) => updateStory(index, 'title', e.target.value)}
                                placeholder="Contoh: Pertemuan Pertama"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Deskripsi Cerita (Caption)</Label>
                            <Textarea
                                value={story.caption}
                                onChange={(e) => updateStory(index, 'caption', e.target.value)}
                                rows={4}
                                placeholder="Ceritakan momen ini..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Gambar Cerita</Label>
                            {story.image && (
                                <div className="mb-2">
                                    <img
                                        src={story.image.startsWith('http') ? story.image : `/storage/${story.image}`}
                                        alt={story.title}
                                        className="h-48 w-full rounded-md border object-cover"
                                    />
                                </div>
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(index, e.target.files ? e.target.files[0] : null)}
                            />
                            <p className="text-xs text-muted-foreground">Format: JPG, PNG. Max: 2MB.</p>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Menyimpan...' : 'Simpan Kisah Cinta'}
                </Button>
            </div>
        </div>
    );
}
