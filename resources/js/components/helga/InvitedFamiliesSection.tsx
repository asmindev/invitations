interface InvitedFamily {
    id: number;
    family_name: string;
    order: number;
}

interface Invitation {
    groom_name?: string;
    groom_father?: string;
    groom_mother?: string;
    bride_name?: string;
    bride_father?: string;
    bride_mother?: string;
}

interface Props {
    families: InvitedFamily[];
    invitation?: Invitation;
}

export default function InvitedFamiliesSection({ families, invitation }: Props) {
    // Split families into 2 columns
    const midpoint = Math.ceil(families.length / 2);
    const leftColumn = families.slice(0, midpoint);
    const rightColumn = families.slice(midpoint);

    return (
        <section className="invited-families-wrap">
            <div className="invited-families">
                <div className="section-head" data-aos="fade-up" data-aos-duration="1000">
                    <h2 className="section-title">Hormat Kami.</h2>
                </div>

                {/* Parents Names Header */}
                <div className="parents-header" data-aos="fade-up" data-aos-duration="1000">
                    <div className="parent-name">
                        <strong>Bpk. {invitation?.bride_father}</strong>
                        <br />
                        <strong>Ibu {invitation?.bride_mother}</strong>
                    </div>
                    <div className="parent-name">
                        <strong>Bpk. {invitation?.groom_father}</strong>
                        <br />
                        <strong>Ibu {invitation?.groom_mother}</strong>
                    </div>
                </div>

                {/* Turut Mengundang Title */}
                <div className="turut-title" data-aos="fade-up" data-aos-duration="1000">
                    <em>Turut Mengundang</em>
                </div>

                {/* Families Grid */}
                {families && families.length > 0 && (
                    <div className="families-grid" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <div className="families-column">
                            {leftColumn.map((family, index) => (
                                <div
                                    key={family.id}
                                    className="family-item"
                                    data-aos="fade-right"
                                    data-aos-duration="800"
                                    data-aos-delay={index * 50}
                                >
                                    <span className="family-name">{family.family_name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="families-column">
                            {rightColumn.map((family, index) => (
                                <div key={family.id} className="family-item" data-aos="fade-left" data-aos-duration="800" data-aos-delay={index * 50}>
                                    <span className="family-name">{family.family_name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .invited-families-wrap {
                    padding: 60px 20px;
                    background: #fff;
                }

                .invited-families {
                    max-width: 900px;
                    margin: 0 auto;
                }

                .section-head {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .section-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.8rem;
                    color: #333;
                    margin: 0;
                    font-weight: 600;
                }

                .parents-header {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 25px;
                    text-align: center;
                }

                .parent-name {
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.9rem;
                    color: #333;
                    line-height: 1.6;
                }

                .parent-name strong {
                    font-weight: 600;
                }

                .turut-title {
                    text-align: center;
                    margin-bottom: 20px;
                    font-family: 'Playfair Display', serif;
                    font-size: 1.1rem;
                    color: #333;
                }

                .families-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    width: 100%;
                }

                .families-column {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .family-item {
                    display: flex;
                    align-items: flex-start;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.85rem;
                    color: #333;
                    line-height: 1.4;
                }

                .family-name {
                    flex: 1;
                }
            `}</style>
        </section>
    );
}
