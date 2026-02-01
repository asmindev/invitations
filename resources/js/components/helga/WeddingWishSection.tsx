import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Wish {
    id: number;
    name: string;
    message: string;
    created_at: string;
}

interface Props {
    wishes?: Wish[];
}

export default function WeddingWishSection({ wishes = [] }: Props) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const displayedWishes = showMore ? wishes : wishes.slice(0, 5);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !message.trim()) {
            toast.error('Nama dan ucapan harus diisi!');
            return;
        }

        setSubmitting(true);

        router.post(
            route('wishes.store'),
            {
                name: name.trim(),
                message: message.trim(),
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Ucapan berhasil dikirim!');
                    setName('');
                    setMessage('');
                    // Force reload to get fresh wishes data
                    router.reload({ only: ['wishes'] });
                },
                onError: (errors) => {
                    const errorMessage = Object.values(errors).flat().join(', ');
                    toast.error(errorMessage || 'Gagal mengirim ucapan.');
                },
                onFinish: () => {
                    setSubmitting(false);
                },
            },
        );
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
                        <form onSubmit={handleSubmit} id="weddingWishFormReact">
                            <div className="form-group guest-comment-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                                <input
                                    type="text"
                                    className="form-control guest-name"
                                    name="name"
                                    placeholder="Nama Anda"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group guest-comment-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                                <textarea
                                    className="form-control guest-comment"
                                    name="message"
                                    rows={3}
                                    placeholder="Kirimkan ucapan Anda"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="submit-comment-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
                                <button type="submit" className="submit submit-comment" disabled={submitting}>
                                    {submitting ? 'Mengirim...' : 'Kirim'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="comment-wrap" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
                        {displayedWishes.map((wish) => (
                            <div key={wish.id} className="comment-item" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
                                <div className="comment-header">
                                    <h4 className="comment-name" style={{ fontSize: '16px', fontWeight: '600' }}>
                                        {wish.name}
                                    </h4>
                                    <span className="comment-date" style={{ fontSize: '12px', opacity: 0.7 }}>
                                        {new Date(wish.created_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <p className="comment-text" style={{ fontSize: '14px', marginTop: '8px' }}>
                                    {wish.message}
                                </p>
                            </div>
                        ))}

                        {wishes.length === 0 && (
                            <div className="comment-item">
                                <p className="comment-text text-center" style={{ opacity: 0.6 }}>
                                    Belum ada ucapan. Jadilah yang pertama!
                                </p>
                            </div>
                        )}
                    </div>

                    {wishes.length > 5 && (
                        <div className="more-comment-wrap">
                            <button type="button" onClick={() => setShowMore(!showMore)} className="btn-show-more">
                                {showMore ? 'Tampilkan lebih sedikit' : `Lihat ${wishes.length - 5} ucapan lainnya`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
