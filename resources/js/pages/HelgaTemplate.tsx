import PrimaryPane from '@/components/helga/PrimaryPane';
import SecondaryPane from '@/components/helga/SecondaryPane';
import { useEffect } from 'react';

interface Invitation {
    slug: string;
    groom_name: string;
    groom_full_name?: string;
    bride_name: string;
    bride_full_name?: string;
    wedding_date: string;
    wedding_time?: string;
    hashtag?: string;
}

interface Props {
    guest?: any;
    wishes?: any[];
    invitation?: Invitation;
    sections?: Record<string, any>;
}

export default function HelgaTemplate({ guest, wishes, invitation, sections }: Props) {
    useEffect(() => {
        // Initialize AOS (Animate On Scroll)
        if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
                duration: 1200,
                once: false,
            });
        }
    }, []);

    return (
        <div className="helga original preset-original" data-template="helga">
            {/* Side to Side Layout */}
            <section className="kat-page__side-to-side">
                {/* Primary Pane - Left Side (Desktop) */}
                <PrimaryPane invitation={invitation} />

                {/* Secondary Pane - Right Side (Desktop) / Main Content (Mobile) */}
                <SecondaryPane guest={guest} wishes={wishes} invitation={invitation} sections={sections} />
            </section>

            {/* Music Player */}
            <section className="music-outer" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                <div className="music-box auto" id="music-box"></div>
            </section>

            {/* Alert Modal */}
            <div className="alert" id="alert">
                <div className="alert-text"></div>
                <div className="alert-close fas fa-times"></div>
            </div>

            {/* Generic Modal */}
            <div id="modal" className="modal modal-center"></div>
        </div>
    );
}
