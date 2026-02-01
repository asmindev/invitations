interface GalleryImage {
    url: string;
    thumbnail?: string;
    alt?: string;
}

interface Props {
    data?: {
        title?: string;
        images?: GalleryImage[];
    };
}

export default function GallerySection({ data }: Props) {
    const galleryImages: GalleryImage[] = data?.images || [
        {
            url: 'https://img.katsudoto.id/rxascIPicqaV7qEU3h5nzhUCsHvw_a8haNNAB_k78QE/rs:auto:2000:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTg5XzE2OTExMzk1MjZfMTYwMF8xNjAwLmpwZWc.webp',
            thumbnail:
                'https://img.katsudoto.id/vCLU5kOojq8g9rbSWX49l3KLhCvLVA5jt4GAGgyWQjU/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTg5XzE2OTExMzk1MjZfMTYwMF8xNjAwLmpwZWc.webp',
            alt: 'Gallery',
        },
        {
            url: 'https://img.katsudoto.id/N3BFA-9ISZb3IYJg40Q-1olzb1ViNEs2vSVZ5Bz-3io/rs:auto:2000:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkwXzE2OTExMzk1MjdfMTYwMF8xNjAwLmpwZWc.webp',
            thumbnail:
                'https://img.katsudoto.id/oOhZ3mRDIx1SCaJeFQNv3JXo3PZbU9tYX8cBed_NXrA/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkwXzE2OTExMzk1MjdfMTYwMF8xNjAwLmpwZWc.webp',
            alt: 'Gallery',
        },
        {
            url: 'https://img.katsudoto.id/qOCgPn14mGBK5Pa6vl7nbmlUFwRm9Dv8y65VhrqGWg8/rs:auto:2000:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkxXzE2OTExMzk1MjdfMTYwMF8xNjAwLmpwZWc.webp',
            thumbnail:
                'https://img.katsudoto.id/bSJb4eNZzFBvojTZGvPfgtEeWbFUnA0TzP3xBpXm_D4/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkxXzE2OTExMzk1MjdfMTYwMF8xNjAwLmpwZWc.webp',
            alt: 'Gallery',
        },
        {
            url: 'https://img.katsudoto.id/Tc53xxSQjsGiZUh2KLd5V8VqmRccGPo9JJTpVB5gybA/rs:auto:2000:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkyXzE2OTExMzk1MjhfMTYwMF8xNjAwLmpwZWc.webp',
            thumbnail:
                'https://img.katsudoto.id/ruJDoeeXOOSvCJR2dfBF49h3zEgayYgpIXAo0aJmSbU/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkyXzE2OTExMzk1MjhfMTYwMF8xNjAwLmpwZWc.webp',
            alt: 'Gallery',
        },
        {
            url: 'https://img.katsudoto.id/6VrHzAL1TRl8kjidUOohHAz_THKhw-FXu9jK8v54Wco/rs:auto:2000:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkzXzE2OTExMzk1NjhfMTYwMF8xNjAwLmpwZWc.webp',
            thumbnail:
                'https://img.katsudoto.id/hfvvMsmOu-HTcWi8Z4CTHhgRZ1d5lszXRfSvxwBIoXk/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkzXzE2OTExMzk1NjhfMTYwMF8xNjAwLmpwZWc.webp',
            alt: 'Gallery',
        },
        {
            url: 'https://img.katsudoto.id/Du4I4WksqtI0QzGzLIeREHflJVKVuyrpUUufdtn3gBo/rs:auto:2000:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTk0XzE2OTExMzk1NzFfMTYwMF8xNjAwLmpwZw.webp',
            thumbnail:
                'https://img.katsudoto.id/Pj62nw865INU15Qhmemn9OuP7zMPKEMS5ADY-f444o8/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTk0XzE2OTExMzk1NzFfMTYwMF8xNjAwLmpwZw.webp',
            alt: 'Gallery',
        },
        {
            url: 'https://img.katsudoto.id/w4wu7lSga1TnkqUEBZgqx5e5Dl_tzK-quHgAETB5mhY/rs:auto:2000:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTk1XzE2OTExMzk2MzFfMTYwMF8xNjAwLmpwZWc.webp',
            thumbnail:
                'https://img.katsudoto.id/5xfg-uzPkVZONfhXga0WOlQBISmuIhfcheiEDoj2aQ4/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTk1XzE2OTExMzk2MzFfMTYwMF8xNjAwLmpwZWc.webp',
            alt: 'Gallery',
        },
    ];

    const title = data?.title || 'Potraits of Us';

    return (
        <section className="gallery-wrap">
            <div className="ornaments-wrapper">
                <div className="orn-gallery">
                    <div className="image-wrap" data-aos="fade-right" data-aos-duration="1200">
                        <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-13.png" alt="orn-footnote-left-1" />
                    </div>
                </div>
            </div>

            <div className="gallery-inner">
                <div className="gallery-head">
                    <h1 className="gallery-title" data-aos="fade-up" data-aos-duration="1000">
                        {title}
                    </h1>
                </div>

                <div className="gallery-body">
                    {/* Galleries */}
                    <div className="galleries lightgallery">
                        {galleryImages.map((image, index) => (
                            <a
                                key={index}
                                href={image.url}
                                className=""
                                data-aos="fade-up-left"
                                data-aos-duration="1000"
                                data-aos-delay={100 * (index + 1)}
                            >
                                <img src={image.thumbnail || image.url} alt={image.alt || 'Gallery'} className="" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
