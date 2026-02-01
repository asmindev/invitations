import { useState } from 'react';

export default function LiveStreamingSection() {
    const videoId = 'jfKfPfyJRdk';
    const [isPlaying, setIsPlaying] = useState(false);

    const handleWatchClick = () => {
        setIsPlaying(true);
    };

    return (
        <section className="live-streaming">
            <div className="streaming-inner">
                <div className="streaming-head">
                    <h2 className="streaming-title" data-aos="zoom-in" data-aos-duration="1200">
                        Live Streaming
                    </h2>
                </div>

                <div className="streaming-body">
                    <div className="streaming-content">
                        <div className="streaming-preview-wrap wide youtube">
                            <div className="streaming-preview" data-aos="zoom-in" data-aos-duration="1500">
                                {!isPlaying ? (
                                    <img
                                        src={`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                                        alt="Streaming's Picture"
                                        className="streaming-img"
                                    />
                                ) : (
                                    <div className="video-container">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                            title="Live Streaming"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                            <div className="streaming-link-wrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                <button type="button" className="streaming-link play-youtube-video" onClick={handleWatchClick}>
                                    Watch Here
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
