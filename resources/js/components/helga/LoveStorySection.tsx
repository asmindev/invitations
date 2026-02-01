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
            <h3 className="story-title">{title}</h3>
            <div className="story-container">
                <div className="story-details">
                    <div className="story-image">
                        <img src={currentStory.image} alt={currentStory.title} />
                    </div>
                    <h4 className="story-subtitle">{currentStory.title}</h4>
                    <p className="story-text">{currentStory.caption}</p>
                </div>

                <div className="story-navigation">
                    <button className="story-nav-button prev" onClick={handlePrevious}>
                        ‹
                    </button>
                    <div className="story-indicators">
                        {stories.map((_, index) => (
                            <span
                                key={index}
                                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                    <button className="story-nav-button next" onClick={handleNext}>
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}
