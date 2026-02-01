import axios from 'axios';
import { useState } from 'react';

interface GalleryImage {
    url: string;
    alt: string;
}

interface GalleryData {
    title?: string;
    images: GalleryImage[];
}

interface Props {
    invitationId: number;
    initialData?: GalleryData;
}

export default function GalleryEditor({ invitationId, initialData }: Props) {
    const [title, setTitle] = useState(initialData?.title || 'Portraits of Us');
    const [images, setImages] = useState<GalleryImage[]>(initialData?.images || []);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newImageAlt, setNewImageAlt] = useState('');
    const [saving, setSaving] = useState(false);

    const addImage = () => {
        if (!newImageUrl) return;
        setImages([...images, { url: newImageUrl, alt: newImageAlt || 'Gallery Image' }]);
        setNewImageUrl('');
        setNewImageAlt('');
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.post(route('admin.invitations.sections.store', invitationId), {
                section_type: 'gallery',
                section_data: { title, images },
                order: 2,
                is_visible: true,
            });
            alert('Gallery saved successfully!');
        } catch (error) {
            console.error('Error saving gallery:', error);
            alert('Error saving gallery');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Gallery Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-4 text-lg font-medium">Add New Image</h3>
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Alt Text</label>
                        <input
                            type="text"
                            value={newImageAlt}
                            onChange={(e) => setNewImageAlt(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            placeholder="Photo description"
                        />
                    </div>
                </div>
                <button type="button" onClick={addImage} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Add Image
                </button>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-medium">Gallery Images ({images.length})</h3>
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative rounded-lg border border-gray-200 p-2">
                            <img src={image.url} alt={image.alt} className="mb-2 h-40 w-full rounded-md object-cover" />
                            <p className="mb-2 truncate text-sm text-gray-600">{image.alt}</p>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="w-full rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                {images.length === 0 && <p className="py-8 text-center text-gray-500">No images added yet</p>}
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Gallery'}
                </button>
            </div>
        </div>
    );
}
