import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    data?: {
        title?: string;
        description?: string;
    };
}

export default function RsvpSection({ data }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attendance: '',
        guests: 1,
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const title = data?.title || 'RSVP';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/rsvp', formData, {
            onSuccess: () => {
                setFormData({
                    name: '',
                    email: '',
                    attendance: '',
                    guests: 1,
                    message: '',
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="rsvp-wrap" id="toRsvp">
            <div className="rsvp-inner">
                <div className="rsvp-head">
                    <h1 className="rsvp-title" data-aos="zoom-in" data-aos-duration="1500">
                        {title}
                    </h1>
                </div>

                <div className="rsvp-body">
                    <form onSubmit={handleSubmit} className="rsvp-form">
                        <div className="form-group" data-aos="fade-up" data-aos-duration="1000">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Nama Lengkap"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                            <select name="attendance" className="form-control" value={formData.attendance} onChange={handleChange} required>
                                <option value="">Konfirmasi Kehadiran</option>
                                <option value="attend">Will Attend</option>
                                <option value="not_attend">Unable To Attend</option>
                            </select>
                        </div>

                        <div className="form-group" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                            <input
                                type="number"
                                name="guests"
                                className="form-control"
                                placeholder="Jumlah Tamu"
                                min="1"
                                value={formData.guests}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                            <textarea
                                name="message"
                                className="form-control"
                                rows={3}
                                placeholder="Pesan (opsional)"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="submit-wrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                                {isSubmitting ? 'Mengirim...' : 'Submit RSVP'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
