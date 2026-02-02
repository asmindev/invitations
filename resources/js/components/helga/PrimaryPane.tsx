interface Invitation {
    groom_name: string;
    bride_name: string;
    primary_pane_photo?: string;
}

interface Props {
    invitation?: Invitation;
    guest?: any;
}

export default function PrimaryPane({ invitation, guest }: Props) {
    const brideName = invitation?.bride_name || 'Lisa';
    const groomName = invitation?.groom_name || 'Marcell';
    const guestName = guest ? (guest.companion ? `${guest.name} & ${guest.companion}` : guest.name) : 'Chindy & Partner';

    // Use database primary_pane_photo if available, fallback to hardcoded URL
    const defaultPrimaryPanePhoto =
        'https://img.katsudoto.id/MG2M5MGi9YnpANVOpd_5i0nal83E-DYfd4MwfPvXSFY/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdmVyL3RodW1iX2xnXzE4NTk4MF8xNjkxMTM5MjU3XzIwMDBfMjAwMC5qcGVn.webp';
    const primaryPanePhotoUrl = invitation?.primary_pane_photo || defaultPrimaryPanePhoto;

    return (
        <section className="primary-pane">
            <div className="inner">
                {/* Ornaments Wrapper */}
                <div className="ornaments-wrapper">
                    <div className="fall-tree left">
                        <div className="image-wrap" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="800">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-tree.png" alt="" />
                        </div>
                    </div>
                    <div className="fall-tree right">
                        <div className="image-wrap" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="850">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-tree.png" alt="" />
                        </div>
                    </div>
                    <div className="flower-left-1">
                        <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="900">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-11.png" alt="" />
                        </div>
                    </div>
                    <div className="flower-left-2">
                        <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="1000">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-7.png" alt="" />
                        </div>
                    </div>
                    <div className="flower-right-1">
                        <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="900">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-12.png" alt="" />
                        </div>
                    </div>
                    <div className="flower-right-2">
                        <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="1000">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-9.png" alt="" />
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="details">
                    <h1 data-aos="zoom-out" data-aos-duration="1200">
                        {brideName} & {groomName}
                    </h1>
                    <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                        Kepada Yth.
                        <br />
                        <strong>{guestName}</strong>
                    </p>
                </div>

                {/* Highlight/Cover */}
                <div className="highlight" data-aos="zoom-out" data-aos-duration="1000">
                    <div className="preview-container cover-show" id="cover-pane">
                        <div className="picture desktop">
                            <img src={primaryPanePhotoUrl} alt="" className="picture" />
                        </div>
                        <div className="picture mobile">
                            <img src={primaryPanePhotoUrl} alt="" className="picture" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
