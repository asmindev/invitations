import { useState } from 'react';

export default function VideoGallerySection() {
    const videoId = '06-XXOTP3Gc';
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    return (
        <section className="video-gallery autoplay-video-section">
            <div className="inner">
                <div className="title" data-aos="zoom-out" data-aos-duration="1000">
                    <h1 data-aos="zoom-out-up" data-aos-duration="1000">
                        Our Footage
                    </h1>
                </div>

                <div className="video-outer">
                    <div className="video">
                        <div className="preview autoplay-video-box" data-aos="zoom-in" data-aos-duration="1000">
                            {!isPlaying ? (
                                <>
                                    <img src={`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`} alt="Video Thumbnail" />
                                    <button className="play-btn" onClick={handlePlayClick}>
                                        <i className="fas fa-play"></i>
                                    </button>
                                </>
                            ) : (
                                <div className="video-container">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
