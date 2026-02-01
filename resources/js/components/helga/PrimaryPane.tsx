interface Invitation {
    groom_name: string;
    bride_name: string;
}

interface Props {
    invitation?: Invitation;
}

export default function PrimaryPane({ invitation }: Props) {
    const groomName = invitation?.groom_name || 'Marcell';
    const brideName = invitation?.bride_name || 'Lisa';

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
                        {groomName} & {brideName}
                    </h1>
                    <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                        Hai
                        <br />
                        Chindy & Partner
                    </p>
                </div>

                {/* Highlight/Cover */}
                <div className="highlight" data-aos="zoom-out" data-aos-duration="1000">
                    <div className="preview-container cover-show" id="cover-pane"></div>
                </div>
            </div>
        </section>
    );
}
