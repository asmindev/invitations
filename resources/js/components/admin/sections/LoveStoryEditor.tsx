import axios from 'axios';
import { useState } from 'react';

interface Story {
    title: string;
    caption: string;
    image: string;
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
    const [stories, setStories] = useState<Story[]>(initialData?.stories || [{ title: 'First Date', caption: '', image: '' }]);
    const [saving, setSaving] = useState(false);

    const addStory = () => {
        setStories([...stories, { title: '', caption: '', image: '' }]);
    };

    const removeStory = (index: number) => {
        setStories(stories.filter((_, i) => i !== index));
    };

    const updateStory = (index: number, field: string, value: string) => {
        const updated = [...stories];
        updated[index] = { ...updated[index], [field]: value };
        setStories(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.post(route('admin.invitations.sections.store', invitationId), {
                section_type: 'love_story',
                section_data: { title, stories },
                order: 3,
                is_visible: true,
            });
            alert('Love Story saved successfully!');
        } catch (error) {
            console.error('Error saving love story:', error);
            alert('Error saving love story');
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

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Story Timeline</h3>
                <button type="button" onClick={addStory} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    + Add Story
                </button>
            </div>

            {stories.map((story, index) => (
                <div key={index} className="space-y-4 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                        <h4 className="text-md font-medium text-gray-700">Story {index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => removeStory(index)}
                            className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Story Title</label>
                        <input
                            type="text"
                            value={story.title}
                            onChange={(e) => updateStory(index, 'title', e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            placeholder="e.g., First Date"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Caption</label>
                        <textarea
                            value={story.caption}
                            onChange={(e) => updateStory(index, 'caption', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            placeholder="Story description..."
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            value={story.image}
                            onChange={(e) => updateStory(index, 'image', e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            placeholder="https://..."
                        />
                        {story.image && <img src={story.image} alt={story.title} className="mt-2 h-40 w-full rounded-md object-cover" />}
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
                    {saving ? 'Saving...' : 'Save Love Story'}
                </button>
            </div>
        </div>
    );
}
