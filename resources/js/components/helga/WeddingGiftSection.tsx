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
    const [selectedBankIndex, setSelectedBankIndex] = useState(0);
    const [formData, setFormData] = useState({
        select_bank: '0',
        name: '',
        account_name: '',
        message: '',
        amount: '',
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const title = data?.title || 'Wedding Gift';
    const description =
        data?.description ||
        'Your blessing and coming to our wedding are enough for us. However, if you want to give a gift we provide a Digital Envelope to make it easier for you. Thank you!';

    const bankOptions = data?.banks || [];

    const handleCopy = (text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            alert('Account number copied to clipboard!');
        } else {
            // Fallback for some browsers
            alert('Please copy manually: ' + text);
        }
    };

    const handleNext = () => {
        setCurrentSlide(1);
    };

    const handlePrev = () => {
        setCurrentSlide(0);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = parseInt(e.target.value, 10);
        setSelectedBankIndex(index);
        setFormData((prev) => ({ ...prev, select_bank: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Wedding Gift Data:', formData);
        // TODO: Implement backend endpoint for wedding gift submission
        // For now, just show a message
        if (navigator.clipboard && formData.name && formData.amount) {
            alert('Thank you! Please complete the transfer and contact the couple to confirm.');
        } else {
            alert('Please fill in all required fields (Name and Amount).');
        }
    };

    return (
        <section className="wedding-gift-wrap" id="wedding-gift">
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
                        <form onSubmit={handleSubmit} id="weddingGiftFormReact">
                            {/* Slide 1: Details */}
                            <div
                                className={`wedding-gift-details wedding-gift__first-slide wedding-gift-slide ${currentSlide === 0 ? 'active' : ''}`}
                                style={{ display: currentSlide === 0 ? 'block' : 'none' }}
                            >
                                <div className="wedding-gift-slide">
                                    {bankOptions.length > 0 ? (
                                        <>
                                            <div className="wedding-gift-select-bank-wrap">
                                                <select
                                                    name="select_bank"
                                                    id="selectBank"
                                                    className="form-control"
                                                    value={formData.select_bank}
                                                    onChange={handleBankChange}
                                                >
                                                    {bankOptions.map((bank, idx) => (
                                                        <option key={idx} value={idx}>
                                                            {bank.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="wedding-gift-bank-wrap" style={{ display: 'block' }}>
                                                {(() => {
                                                    const selectedBank = bankOptions[selectedBankIndex];
                                                    if (!selectedBank) return <p>Loading bank details...</p>;
                                                    return (
                                                        <div className="bank-item" style={{ display: 'block' }}>
                                                            <div className="bank-detail" style={{ display: 'block' }}>
                                                                <h3 className="bank-name">{selectedBank.name}</h3>
                                                                <div>
                                                                    <small className="bank-account-number-label">Account Number</small>
                                                                    <h4
                                                                        className="bank-account-number"
                                                                        data-copy={selectedBank.account_number}
                                                                        onClick={() => handleCopy(selectedBank.account_number)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    >
                                                                        {selectedBank.account_number} <i className="fas fa-copy"></i>
                                                                    </h4>
                                                                </div>
                                                                <div>
                                                                    <small className="bank-account-name-label">Account Name</small>
                                                                    <h4
                                                                        className="bank-account-name"
                                                                        onClick={() => handleCopy(selectedBank.account_name)}
                                                                        style={{ cursor: 'pointer' }}
                                                                        title="Click to copy"
                                                                    >
                                                                        {selectedBank.account_name}{' '}
                                                                        <i
                                                                            className="fas fa-copy"
                                                                            style={{ fontSize: '0.8em', marginLeft: '4px', opacity: 0.7 }}
                                                                        ></i>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="wedding-gift-bank-wrap">
                                            <p style={{ textAlign: 'center', opacity: 0.7 }}>No bank accounts configured yet.</p>
                                        </div>
                                    )}

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

                            {/* Slide 2: Upload */}
                            <div
                                className={`wedding-gift-picture wedding-gift-slide ${currentSlide === 1 ? 'active' : ''}`}
                                style={{ display: currentSlide === 1 ? 'block' : 'none' }}
                            >
                                <div className="wedding-gift-back-page-wrap">
                                    <button type="button" className="wedding-gift-back-page wedding-gift__prev" onClick={handlePrev}>
                                        <i className="fas fa-chevron-left" style={{ color: '#eae2dc' }}></i>
                                    </button>
                                </div>

                                <div
                                    className="wedding-gift-upload-wrap"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => document.getElementById('weddingGiftPicture')?.click()}
                                >
                                    <div
                                        className={`wgu-description ${!previewImage ? 'show' : 'hide'}`}
                                        style={{ display: !previewImage ? 'block' : 'none' }}
                                    >
                                        <svg
                                            className="wgu-icon"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1.25em"
                                            viewBox="0 0 640 512"
                                            style={{ fill: '#eae2dc' }}
                                        >
                                            <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z" />
                                        </svg>
                                        <p className="wgu-title">Upload proof of transfer</p>
                                        <p className="wgu-caption">Screen Shoot / Photo Slip Transfer</p>
                                    </div>

                                    <div className="wgu-img-wrap" style={{ display: previewImage ? 'block' : 'none' }}>
                                        {previewImage && <img className="wgu-img" src={previewImage} alt="Preview" />}
                                    </div>

                                    <input
                                        type="file"
                                        name="picture"
                                        id="weddingGiftPicture"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
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

                <div className="ornaments-wrapper">
                    <div className="orn-gift-2">
                        <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="1050">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-4.png" alt="orn-gift" />
                        </div>
                    </div>
                    <div className="orn-gift-1">
                        <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="900">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-peacock-1.png" alt="orn-peacock" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
