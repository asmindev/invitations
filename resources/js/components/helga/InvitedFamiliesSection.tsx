interface InvitedFamily {
    id: number;
    family_name: string;
    order: number;
}

interface Props {
    families: InvitedFamily[];
}

export default function InvitedFamiliesSection({ families }: Props) {
    if (!families || families.length === 0) return null;

    // Split families into 2 columns
    const midpoint = Math.ceil(families.length / 2);
    const leftColumn = families.slice(0, midpoint);
    const rightColumn = families.slice(midpoint);

    return (
        <section className="invited-families-wrap">
            <div className="invited-families">
                <div className="section-head" data-aos="fade-up" data-aos-duration="1000">
                    <h2 className="section-title">Turut Mengundang</h2>
                </div>

                <div className="families-grid" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="families-column">
                        {leftColumn.map((family, index) => (
                            <div key={family.id} className="family-item" data-aos="fade-right" data-aos-duration="800" data-aos-delay={index * 50}>
                                <span className="bullet">•</span>
                                <span className="family-name">{family.family_name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="families-column">
                        {rightColumn.map((family, index) => (
                            <div key={family.id} className="family-item" data-aos="fade-left" data-aos-duration="800" data-aos-delay={index * 50}>
                                <span className="bullet">•</span>
                                <span className="family-name">{family.family_name}</span>
                            </div>
                        ))}
                    </div>
                </div>
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
                    margin-bottom: 40px;
                }

                .section-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    color: #c9a86a;
                    margin: 0;
                    font-weight: 600;
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
                    gap: 8px;
                }

                .family-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.85rem;
                    color: #333;
                    line-height: 1.4;
                }

                .bullet {
                    color: #c9a86a;
                    font-size: 1rem;
                    font-weight: bold;
                    line-height: 1.4;
                    flex-shrink: 0;
                }

                .family-name {
                    flex: 1;
                }
            `}</style>
        </section>
    );
}
