import { useState } from 'react';

interface Comment {
    id: number;
    name: string;
    comment: string;
    date: string;
}

export default function WeddingWishSection() {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [showMore, setShowMore] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            const newComment = {
                id: Date.now(),
                name: 'Guest Name', // This should come from form or props
                comment: comment,
                date: new Date().toLocaleDateString(),
            };
            setComments([newComment, ...comments]);
            setComment('');
        }
    };

    return (
        <section className="wedding-wish-wrap" data-template="">
            <div className="wedding-wish-inner">
                <div className="wedding-wish-head">
                    <h1 className="wedding-wish-title" data-aos="fade-up" data-aos-duration="1200">
                        Wedding Wish
                    </h1>
                </div>

                <div className="wedding-wish-body">
                    <div className="wedding-wish-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group guest-comment-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                                <textarea
                                    className="form-control guest-comment"
                                    name="comment"
                                    rows={1}
                                    placeholder="Give your wish"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>

                            <div className="submit-comment-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
                                <button type="submit" className="submit submit-comment">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="comment-wrap">
                        {comments.map((c) => (
                            <div key={c.id} className="comment-item">
                                <div className="comment-header">
                                    <h4 className="comment-name">{c.name}</h4>
                                    <span className="comment-date">{c.date}</span>
                                </div>
                                <p className="comment-text">{c.comment}</p>
                            </div>
                        ))}
                    </div>

                    <div className="more-comment-wrap" data-aos="fade-up" data-aos-duration="1200">
                        <button type="button" onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Show less' : 'Show more comments'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
