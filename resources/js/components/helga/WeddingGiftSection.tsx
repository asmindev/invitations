import { useState } from 'react';

interface Bank {
    name: string;
    account_number: string;
    account_name: string;
}

interface Props {
    data?: {
        title?: string;
        description?: string;
        banks: Bank[];
    };
}

export default function WeddingGiftSection({ data }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        select_bank: '',
        name: '',
        account_name: '',
        message: '',
        amount: '',
    });

    const title = data?.title || 'Wedding Gift';
    const description =
        data?.description ||
        'Your blessing and coming to our wedding are enough for us. However, if you want to give a gift we provide a Digital Envelope to make it easier for you. Thank you!';

    const bankOptions = data?.banks || [
        {
            name: 'BANK BCA (014)',
            account_number: '8375180797',
            account_name: 'Muhammad Fanny Al farizzy',
        },
    ];

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Account number copied!');
    };

    const handleNext = () => {
        setCurrentSlide(1);
    };

    const handlePrev = () => {
        setCurrentSlide(0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Wedding Gift Data:', formData);
        // Handle form submission
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="wedding-gift-wrap">
            <div className="wedding-gift-inner">
                <div className="wedding-gift-head">
                    <h1 className="wedding-gift-title" data-aos="zoom-in" data-aos-duration="1500">
                        {title}
                    </h1>
                    <p className="wedding-gift-description" data-aos="fade-up" data-aos-duration="1000">
                        {description}
                    </p>
                </div>

                <div className="wedding-gift-body">
                    <div className="wedding-gift-form">
                        <form onSubmit={handleSubmit}>
                            {/* First Slide - Bank Selection */}
                            <div
                                className={`wedding-gift-details wedding-gift__first-slide wedding-gift-slide ${
                                    currentSlide === 0 ? 'active' : 'hidden'
                                }`}
                            >
                                <div className="wedding-gift-slide">
                                    <div className="wedding-gift-bank-wrap">
                                        {bankOptions.map((bank, idx) => (
                                            <div key={idx} className="bank-item">
                                                <div className="bank-detail">
                                                    <h3 className="bank-name">{bank.name}</h3>
                                                    <div>
                                                        <small className="bank-account-number-label">Account Number</small>
                                                        <h4
                                                            className="bank-account-number"
                                                            onClick={() => handleCopy(bank.account_number)}
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            {bank.account_number} <i className="ph ph-copy-simple"></i>
                                                        </h4>
                                                    </div>
                                                    <div>
                                                        <small className="bank-account-name-label">Account Name</small>
                                                        <h4 className="bank-account-name">{bank.account_name}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="wedding-gift-sender-data-wrap">
                                        <label>Fill the form below, please</label>

                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="account_name"
                                                placeholder="Account Owner Name"
                                                value={formData.account_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                rows={1}
                                                className="form-control"
                                                placeholder="Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="amount"
                                                placeholder="Amount"
                                                value={formData.amount}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="wedding-gift-page-wrap">
                                        <button type="button" className="wedding-gift-page wedding-gift__next" onClick={handleNext}>
                                            Next <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Second Slide - Upload Proof */}
                            <div className={`wedding-gift-picture wedding-gift-slide ${currentSlide === 1 ? 'active' : 'hidden'}`}>
                                <div className="wedding-gift-back-page-wrap">
                                    <button type="button" className="wedding-gift-back-page wedding-gift__prev" onClick={handlePrev}>
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                </div>

                                <div className="wedding-gift-upload-wrap">
                                    <div className="wgu-description">
                                        <p className="wgu-title">Upload proof of transfer</p>
                                        <p className="wgu-caption">Screen Shoot / Photo Slip Transfer</p>
                                    </div>
                                </div>

                                <div className="wedding-gift-page-wrap">
                                    <button type="submit" className="wedding-gift-page submit">
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="ornaments-wrapper">
                <div className="orn-gift-1">
                    <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="900">
                        <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-peacock-1.png" alt="orn-footnote-left-5" />
                    </div>
                </div>
            </div>
        </section>
    );
}
