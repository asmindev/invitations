interface Couple {
    name: string;
    parents: string;
    instagram?: string;
    photo: string;
}

interface Props {
    data?: {
        title?: string;
        opening_text?: string;
        groom: Couple;
        bride: Couple;
    };
    invitation?: any;
}

export default function CoupleSection({ data, invitation }: Props) {
    const title = invitation?.couple_title || data?.title || 'The Wedding Of';
    const openingText =
        invitation?.couple_introduction ||
        data?.opening_text ||
        'بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ\n\nAssalamualaikum Warahmatullahi Wabarakatuh\n\nWith the blessing and mercy from Allah SWT, We cordially invite you to the wedding of:';

    const groom = {
        name: invitation?.groom_full_name || data?.groom?.name || 'Marcell Bramantyo',
        parents:
            data?.groom?.parents ||
            (invitation?.groom_father && invitation?.groom_mother
                ? `Putra dari Bapak ${invitation.groom_father} & Ibu ${invitation.groom_mother}`
                : 'Putra dari Bapak Erik Cahyo & Ibu Puspita'),
        instagram: invitation?.groom_instagram || data?.groom?.instagram || '@marcell',
        photo:
            invitation?.groom_photo ||
            data?.groom?.photo ||
            'https://img.katsudoto.id/9zwUwEzMtPWsc2Tp2tIS8-64L9AfAh5hWDRALYzu2BY/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdXBsZS90aHVtYl9sZ18xODU5ODdfMTY5MTEzOTQyOV8xMjAwXzEyMDAuanBlZw.webp',
    };

    const bride = {
        name: invitation?.bride_full_name || data?.bride?.name || 'Lisa Jesslyne Hadid',
        parents:
            data?.bride?.parents ||
            (invitation?.bride_father && invitation?.bride_mother
                ? `Putri dari Bapak ${invitation.bride_father} & Ibu ${invitation.bride_mother}`
                : 'Putri dari Bapak Santoso & Ibu Angeline'),
        instagram: invitation?.bride_instagram || data?.bride?.instagram || '@lisa',
        photo:
            invitation?.bride_photo ||
            data?.bride?.photo ||
            'https://img.katsudoto.id/EOwu2bpvfw_UYlmwF6xFgDpdb9nFdkXonzoziChcXqY/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdXBsZS90aHVtYl9sZ18xODU5ODhfMTY5MTEzOTQ1N18xMjAwXzEyMDAuanBlZw.webp',
    };

    return (
        <section className="couple-wrap">
            <div className="couple">
                {/* Couple Head */}
                <div className="couple-head">
                    <h1 className="couple-title" data-aos="zoom-in" data-aos-duration="1000">
                        {title}
                    </h1>
                    <p className="couple-description" data-aos="fade-up" data-aos-duration="1000" style={{ whiteSpace: 'pre-line' }}>
                        {openingText}
                    </p>
                </div>

                {/* Couple Body */}
                <div className="couple-body show-picture">
                    {/* Groom */}
                    <div className="couple-info groom">
                        <div className="couple-preview-wrap">
                            <div className="couple-preview lightgallery" data-aos="zoom-in" data-aos-duration="1500" data-aos-once="false">
                                <a className="img-wrap" href={groom.photo} target="_blank" rel="noopener noreferrer">
                                    <div className="ornaments-wrapper">
                                        <div className="orn-couple">
                                            <div className="image-wrap" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="800">
                                                <img
                                                    src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-4.png"
                                                    alt="Orn couple"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <img className="img" src={groom.photo} alt={groom.name} />
                                </a>
                            </div>
                        </div>

                        <div className="couple-details">
                            <h2 className="couple-name" data-aos="fade-up" data-aos-duration="1000">
                                {groom.name}
                            </h2>
                            <p className="couple-parents" data-aos="fade-up" data-aos-duration="1000">
                                {groom.parents}
                                <br />
                                <br />
                            </p>
                            {groom.instagram && (
                                <div className="couple-link-wrap" data-aos="fade-up" data-aos-duration="1000">
                                    <a
                                        href={`https://www.instagram.com/${groom.instagram.replace('@', '')}`}
                                        target="_blank"
                                        className="couple-link"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-instagram"></i> {groom.instagram}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="separator-wrap">
                        <div className="separator" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200">
                            <h2 className="couple-separator">&</h2>
                        </div>
                    </div>

                    {/* Bride */}
                    <div className="couple-info bride">
                        <div className="couple-preview-wrap">
                            <div className="couple-preview lightgallery" data-aos="zoom-in" data-aos-duration="1000" data-aos-once="false">
                                <a className="img-wrap" href={bride.photo} target="_blank" rel="noopener noreferrer">
                                    <div className="ornaments-wrapper">
                                        <div className="orn-couple">
                                            <div className="image-wrap" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="800">
                                                <img
                                                    src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-4.png"
                                                    alt="Orn couple"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <img className="img" src={bride.photo} alt={bride.name} />
                                </a>
                            </div>
                        </div>

                        <div className="couple-details">
                            <h2 className="couple-name" data-aos="fade-up" data-aos-duration="1000">
                                {bride.name}
                            </h2>
                            <p className="couple-parents" data-aos="fade-up" data-aos-duration="1000">
                                {bride.parents}
                                <br />
                                <br />
                            </p>
                            {bride.instagram && (
                                <div className="couple-link-wrap" data-aos="fade-up" data-aos-duration="1000">
                                    <a
                                        href={`https://www.instagram.com/${bride.instagram.replace('@', '')}`}
                                        target="_blank"
                                        className="couple-link"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-instagram"></i> {bride.instagram}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Texture */}
            <div className="texture-outer bottom" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="200">
                <div className="couple-leaves"></div>
            </div>
        </section>
    );
}
