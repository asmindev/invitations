import CoupleSection from './CoupleSection';
import CoverSection from './CoverSection';
import QuoteSection from './QuoteSection';
import SaveDateSection from './SaveDateSection';
import {
    AgendaSection,
    FooterSection,
    FootnoteSection,
    GallerySection,
    InstagramFilterSection,
    LiveStreamingSection,
    LoveStorySection,
    NotesSection,
    ProtocolSection,
    RsvpSection,
    RundownSection,
    VideoGallerySection,
    WeddingGiftSection,
    WeddingWishSection,
} from './StubSections';
import TopCover from './TopCover';

interface Props {
    guest?: any;
    wishes?: any[];
    invitation?: any;
    sections?: Record<string, any>;
}

export default function SecondaryPane({ guest, wishes, invitation, sections }: Props) {
    return (
        <section className="secondary-pane">
            {/* TOP COVER */}
            <TopCover />

            {/* COVER */}
            <CoverSection />

            {/* Quote */}
            <QuoteSection />

            {/* COUPLE */}
            <CoupleSection />

            {/* SAVE THE DATE */}
            <SaveDateSection />

            {/* AGENDA */}
            <AgendaSection />

            {/* RUNDOWN */}
            <RundownSection data={sections?.rundown} />

            {/* Reservation */}
            <RsvpSection />

            {/* Gallery */}
            <GallerySection data={sections?.gallery} />

            {/* VIDEO GALLERY */}
            <VideoGallerySection />

            {/* Love Story */}
            <LoveStorySection data={sections?.love_story} />

            {/* LIVE STREAMING */}
            <LiveStreamingSection />

            {/* Instagram Filter */}
            <InstagramFilterSection />

            {/* WEDDING GIFT */}
            <WeddingGiftSection data={sections?.wedding_gift} />

            {/* Protocol */}
            <ProtocolSection />

            {/* WEDDING WISH */}
            <WeddingWishSection />

            {/* CATATAN */}
            <NotesSection />

            {/* Footnote */}
            <FootnoteSection />

            {/* FOOTER */}
            <FooterSection />
        </section>
    );
}
