import { useState } from 'react';

export default function RsvpSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attendance: '',
        guests: 1,
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('RSVP Data:', formData);
        // Handle form submission
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
                        RSVP
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
                            <button type="submit" className="submit-button">
                                Submit RSVP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
