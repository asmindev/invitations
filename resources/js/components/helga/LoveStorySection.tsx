import { useState } from 'react';

interface Story {
    title: string;
    caption: string;
    image: string;
}

interface Props {
    data?: {
        title?: string;
        stories: Story[];
    };
}

export default function LoveStorySection({ data }: Props) {
    const stories = data?.stories || [
        {
            title: 'First Date',
            caption: "Daffa and Shakira's love story is nothing but adorable! It is the simple things in life that keeps the sparkles flying.",
            image: 'https://img.katsudoto.id/dat_96IPWtzIGo76E62GxTVTdNu2jJXRr1A9uNa1ins/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L3N0b3J5L3RodW1iX2xnXzE4NTk3N18xNjkxMTM5MTg0XzE2MDBfMTYwMC5qcGVn.webp',
        },
        {
            title: "We're Forever",
            caption:
                'What we are looking forward to the most, besides getting to spend the rest of our lives together, is having everyone that we truly care about together.',
            image: 'https://img.katsudoto.id/JxPjyj-ciaX3jIDpatPtuk00bc7OzgIHoJv62MfYXbw/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L3N0b3J5L3RodW1iX2xnXzE4NTk3OF8xNjkxMTM5MjEzXzE2MDBfMTYwMC5qcGVn.webp',
        },
    ];

    const title = data?.title || 'Our Story';

    // Helper function to get correct image URL
    const getImageUrl = (image: string) => {
        if (!image) return '';
        // If it's already a full URL, use it as is
        if (image.startsWith('http://') || image.startsWith('https://')) {
            return image;
        }
        // Otherwise, it's a storage path, prepend storage URL
        return `/storage/${image}`;
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    };

    const currentStory = stories[currentIndex];

    return (
        <section className="story-wrap">
            <div className="story" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem' }}>
                <h3
                    className="story-title"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    style={{
                        textAlign: 'center',
                        fontSize: '2.5rem',
                        marginBottom: '3rem',
                        fontFamily: 'var(--font-serif)',
                        color: '#3E2723',
                    }}
                >
                    {title}
                </h3>

                <div className="story-container" style={{ position: 'relative' }}>
                    <div className="story-details" data-aos="zoom-in" data-aos-duration="1000" style={{ textAlign: 'center' }}>
                        <div
                            className="story-image"
                            style={{
                                marginBottom: '2rem',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            }}
                        >
                            <img
                                src={getImageUrl(currentStory.image)}
                                alt={currentStory.title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    maxHeight: '500px',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>

                        <h4
                            className="story-subtitle"
                            style={{
                                fontSize: '1.8rem',
                                marginBottom: '1rem',
                                fontFamily: 'var(--font-script)',
                                color: '#D4A5A5',
                            }}
                        >
                            {currentStory.title}
                        </h4>

                        <p
                            className="story-text"
                            style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.8',
                                color: '#666',
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}
                        >
                            {currentStory.caption}
                        </p>
                    </div>

                    {stories.length > 1 && (
                        <div
                            className="story-navigation"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                marginTop: '2.5rem',
                            }}
                        >
                            <button
                                className="story-nav-button prev"
                                onClick={handlePrevious}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: '2px solid #D4A5A5',
                                    background: 'white',
                                    color: '#D4A5A5',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#D4A5A5';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = '#D4A5A5';
                                }}
                            >
                                ‹
                            </button>

                            <div
                                className="story-indicators"
                                style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                }}
                            >
                                {stories.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentIndex(index)}
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            background: index === currentIndex ? '#D4A5A5' : '#E0E0E0',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-block',
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                className="story-nav-button next"
                                onClick={handleNext}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: '2px solid #D4A5A5',
                                    background: 'white',
                                    color: '#D4A5A5',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#D4A5A5';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = '#D4A5A5';
                                }}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
