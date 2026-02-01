export default function CoverSection() {
    return (
        <section className="cover">
            <div className="inner">
                <div className="head"></div>

                {/* Body */}
                <div className="body highlight" data-aos="zoom-in-up" data-aos-duration="1200" data-aos-delay="500">
                    <div className="orn-cover-frame">
                        {/* Cover Frame */}
                        <div className="cover-frame" id="coverFrame">
                            <div className="cover-picture cover-show" id="cover-main">
                                <div className="picture desktop">
                                    <img
                                        src="https://img.katsudoto.id/wvakxi7lF5c6uSUwB3HlYh52iK2pcrQrQIeG9rPMnqs/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdmVyL3RodW1iX2xnXzE4NTk4NV8xNjkxMTM5MzUyXzIwMDBfMjAwMC5qcGVn.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="picture mobile">
                                    <img
                                        src="https://img.katsudoto.id/7JdQaHLqqEVlWEapBCJq27Q74NGsL_oHUx9F77Mw6Y4/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdmVyL3RodW1iX2xnXzE4NTk4Nl8xNjkxMTM5Mzg1XzIwMDBfMjAwMC5qcGVn.webp"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Frame Image */}
                        <div className="image-wrap">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/frame.png" alt="Cover Frame" />
                        </div>

                        {/* Flower Ornaments */}
                        {[
                            { className: 'flower-frame-1', delay: '800', img: 'orn-flower-4.png' },
                            { className: 'flower-frame-2', delay: '850', img: 'orn-flower-19.png' },
                            { className: 'flower-frame-5', delay: '900', img: 'orn-flower-4.png' },
                            { className: 'flower-frame-6', delay: '900', img: 'orn-flower-18.png' },
                            { className: 'flower-frame-3', delay: '1000', img: 'orn-flower-20.png' },
                            { className: 'flower-frame-4', delay: '1000', img: 'orn-flower-21.png' },
                        ].map((flower, index) => (
                            <div key={index} className={flower.className}>
                                <div className="image-wrap" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay={flower.delay}>
                                    <img src={`https://katsudoto.id/media/template/exclusive/helga/original/${flower.img}`} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="foot">
                    <p className="top-text" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="150">
                        Wedding Invitation
                    </p>
                    <h1 className="prime-title" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
                        Marcell & Lisa
                    </h1>
                    <p className="bottom-text" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                        #PromDateToLifeMate
                    </p>
                </div>
            </div>
        </section>
    );
}
