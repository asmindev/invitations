import { useEffect, useMemo, useState } from 'react';

interface Props {
    data?: {
        title?: string;
        date: string;
        time: string;
        image_url?: string;
        mobile_image_url?: string;
    };
    invitation?: any;
}

export default function SaveDateSection({ data, invitation }: Props) {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const title = data?.title || 'Save The Date';

    // Use invitation date/time if available, otherwise fall back to section data
    const dateStr = invitation?.wedding_date || data?.date || '2024-01-28';
    const timeStr = (invitation?.wedding_time || data?.time || '14:00').substring(0, 5);

    const weddingDate = useMemo(() => new Date(`${dateStr}T${timeStr}`), [dateStr, timeStr]);

    // Default images - same as cover section
    const defaultDesktopImage =
        'https://img.katsudoto.id/wvakxi7lF5c6uSUwB3HlYh52iK2pcrQrQIeG9rPMnqs/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdmVyL3RodW1iX2xnXzE4NTk4NV8xNjkxMTM5MzUyXzIwMDBfMjAwMC5qcGVn.webp';
    const defaultMobileImage =
        'https://img.katsudoto.id/7JdQaHLqqEVlWEapBCJq27Q74NGsL_oHUx9F77Mw6Y4/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdmVyL3RodW1iX2xnXzE4NTk4Nl8xNjkxMTM5Mzg1XzIwMDBfMjAwMC5qcGVn.webp';

    // Use custom image if provided, otherwise use default (same as cover)
    const imageUrl = data?.image_url || defaultDesktopImage;
    const mobileImageUrl = data?.mobile_image_url || data?.image_url || defaultMobileImage;

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate.getTime() - now;

            if (distance > 0) {
                setCountdown({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [weddingDate]);

    const getOrdinalSuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

    const month = weddingDate.toLocaleDateString('en-US', { month: 'long' });
    const day = weddingDate.getDate();
    const year = weddingDate.getFullYear();
    const formattedDate = (
        <>
            {month} {day}
            <sup>{getOrdinalSuffix(day)}</sup>, {year}
        </>
    );

    // Generate Google Calendar URL
    const generateCalendarUrl = () => {
        const eventTitle = encodeURIComponent(invitation?.title || 'Wedding Invitation');
        const startDateTime = weddingDate.toISOString().replace(/-|:|\.\d+/g, '');
        const endDate = new Date(weddingDate.getTime() + 6 * 60 * 60 * 1000); // 6 hours duration
        const endDateTime = endDate.toISOString().replace(/-|:|\.\d+/g, '');

        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDateTime}/${endDateTime}`;
    };

    return (
        <section className="save-date-wrap">
            <div className="save-date" data-aos="zoom-out" data-aos-duration="1200">
                <div className="pict-head" data-aos="zoom-in-up" data-aos-duration="1200" data-aos-delay="500">
                    <div className="pict-frame">
                        <div className="preview-container cover-show" id="savedate-main">
                            <div className="picture desktop">
                                <img src={imageUrl} alt={title} />
                            </div>
                            <div className="picture mobile">
                                <img src={mobileImageUrl} alt={title} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="save-date-head">
                    <p className="save-date-title" data-aos="zoom-in" data-aos-duration="1000">
                        {title}
                    </p>
                    <p className="save-date-event" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                        {formattedDate}
                    </p>
                </div>

                <div className="save-date-body">
                    <div className="countdown">
                        <div className="count-item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                            <h2 className="count-num count-day">{countdown.days}</h2>
                            <small className="count-text">Days</small>
                        </div>
                        <div className="count-item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                            <h2 className="count-num count-hour">{countdown.hours}</h2>
                            <small className="count-text">Hours</small>
                        </div>
                        <div className="count-item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="500">
                            <h2 className="count-num count-minute">{countdown.minutes}</h2>
                            <small className="count-text">Minutes</small>
                        </div>
                        <div className="count-item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="700">
                            <h2 className="count-num count-second">{countdown.seconds}</h2>
                            <small className="count-text">Seconds</small>
                        </div>
                    </div>
                </div>

                <div className="add-to-calendar-wrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1100">
                    <a className="add-to-calendar" href={generateCalendarUrl()} target="_blank" rel="nofollow" id="addToCalendar">
                        Add to Calendar
                    </a>
                </div>
            </div>
        </section>
    );
}
