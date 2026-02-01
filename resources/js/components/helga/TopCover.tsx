import React from 'react';

interface Props {
    invitation?: any;
    guest?: any;
}

export default function TopCover({ invitation, guest }: Props) {
    const handleOpenInvitation = () => {
        // This function will be called when "Open Invitation" is clicked
        // Original: startTheJourney()
        if (typeof window !== 'undefined') {
            // Trigger the start journey function if it exists
            if ((window as any).startTheJourney) {
                (window as any).startTheJourney();
            }
        }
    };

    const coupleNames = invitation ? `${invitation.groom_name} & ${invitation.bride_name}` : 'Marcell & Lisa';
    const guestName = guest ? guest.name : 'Tamu Undangan';

    return (
        <section className="top-cover">
            <div className="inner">
                {/* Ornaments */}
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
                    <div className="flower-left-1">
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

                <div className="wrap-inner">
                    {/* Details */}
                    <div className="details">
                        <div className="logo-wrap" data-aos="zoom-out" data-aos-duration="1200">
                            <h1 className="title-cover" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                                {coupleNames}
                            </h1>
                        </div>
                    </div>

                    {/* Highlight */}
                    <div className="highlight" data-aos="zoom-out" data-aos-duration="1000">
                        <div
                            className="preview-container cover-show"
                            id="cover-opening"
                            style={
                                {
                                    '--bg-top-cover': 'url(https://katsudoto.id/media/template/exclusive/helga/original/bg-top-cover.png)',
                                } as React.CSSProperties
                            }
                        ></div>
                    </div>

                    {/* Bottom Item */}
                    <div className="bottom-item">
                        <p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="1000">
                            Kepada Yth.
                            <br />
                            <strong>{guestName}</strong>
                        </p>

                        <div className="btn-open" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="1200">
                            <button type="button" onClick={handleOpenInvitation} className="link" id="startToExplore">
                                Buka Undangan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
