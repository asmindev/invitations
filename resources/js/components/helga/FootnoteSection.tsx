interface Props {
    invitation?: {
        groom_name?: string;
        bride_name?: string;
        wedding_date?: string;
        hashtag?: string;
    };
}

export default function FootnoteSection({ invitation }: Props) {
    // Extract names for the couple title
    const groomName = invitation?.groom_name?.split(' ')[0] || 'Marcell';
    const brideName = invitation?.bride_name?.split(' ')[0] || 'Lisa';
    const coupleTitle = `${groomName} & ${brideName}`;

    // Format the wedding date
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'January 28<sup>th</sup>, 2024';
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();

        // Add ordinal suffix
        const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';

        return `${month} ${day}<sup>${suffix}</sup>, ${year}`;
    };

    const dateDisplay = formatDate(invitation?.wedding_date);
    const hashtag = invitation?.hashtag || '#PromDateToLifeMate';

    return (
        <section className="footnote-wrap">
            <div className="ornaments-wrapper">
                <div className="orn-footnote-4">
                    <div className="image-wrap" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="900">
                        <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-16.png" alt="orn-footnote-left-5" />
                    </div>
                </div>
                <div className="orn-footnote-2">
                    <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="950">
                        <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-9.png" alt="orn-footnote-left-2" />
                    </div>
                </div>
                <div className="orn-footnote-1">
                    <div className="image-wrap" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="1000">
                        <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-peacock-2.png" alt="orn-footnote-left-1" />
                    </div>
                </div>
                <div className="orn-footnote-3">
                    <div className="image-wrap" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="1050">
                        <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-ranting.png" alt="orn-footnote-left-3" />
                    </div>
                </div>
            </div>

            <div className="footnote">
                <p className="top-text" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                    Wedding Invitation
                </p>
                <h2 className="footnote-title" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
                    {coupleTitle}
                </h2>
                <p
                    className="date"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay="300"
                    dangerouslySetInnerHTML={{ __html: dateDisplay }}
                />
                <p className="bottom-text" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
                    {hashtag}
                </p>
            </div>
        </section>
    );
}
