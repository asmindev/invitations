export default function InstagramFilterSection() {
    const filterImage =
        'https://img.katsudoto.id/Xt4hAa-GG5PxgIcFeBYnveSp4IVV-2jJbgZFDI33AuI/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2ZpbHRlci90aHVtYl9sZ18xODU5NzNfMTYwMF8xNjAwLmpwZWc.webp';
    const filterUrl = 'https://www.instagram.com/ar/933715080836492/';

    return (
        <section className="ig-filter-wrap">
            <div className="ig-filter">
                <div className="ig-filter-head">
                    <h2 className="ig-filter-title" data-aos="fade-up" data-aos-duration="1200">
                        Wedding Filter
                    </h2>

                    <p className="ig-filter-caption" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
                        Capture your moment while attending our wedding by using the Instagram filter below.
                    </p>
                </div>

                <div className="ig-filter-body">
                    <div className="ig-filter-img-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
                        <img className="ig-filter-img" src={filterImage} alt="Instagram Filter Preview" />
                    </div>

                    <div className="ig-filter-link-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
                        <a className="ig-filter-link" href={filterUrl} target="_blank" rel="noopener noreferrer">
                            Use Filter
                        </a>
                    </div>
                </div>

                <div className="ornaments-wrapper">
                    {/* Ornament decorations */}
                    <div className="orn-footnote-bottom-1">
                        <div className="image-wrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="1100">
                            <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-flower-7.png" alt="orn-footnote-left-4" />
                        </div>
                    </div>
                    {/* Add more ornaments as needed */}
                </div>
            </div>
        </section>
    );
}
