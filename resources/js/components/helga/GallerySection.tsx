interface GalleryImage {
    url: string;
    alt: string;
}

interface Props {
    data?: {
        title?: string;
        images: GalleryImage[];
    };
}

export default function GallerySection({ data }: Props) {
    const galleryImages = data?.images || [
        {
            src: 'https://img.katsudoto.id/vCLU5kOojq8g9rbSWX49l3KLhCvLVA5jt4GAGgyWQjU/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTg5XzE2OTExMzk1MjZfMTYwMF8xNjAwLmpwZWc.webp',
            alt: 'Portrait 1',
        },
        {
            src: 'https://img.katsudoto.id/oOhZ3mRDIx1SCaJeFQNv3JXo3PZbU9tYX8cBed_NXrA/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkwXzE2OTExMzk1MjdfMTYwMF8xNjAwLmpwZWc.webp',
            alt: 'Portrait 2',
        },
    ];

    const title = data?.title || 'Portraits of Us';

    return (
        <section className="gallery-wrap">
            <h3 className="gallery-title">{title}</h3>
            <div className="col-g-container">
                <div className="col-g-list">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="col-g">
                            <div className="col-g-img">
                                <img src={image.url || image.src} alt={image.alt} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
