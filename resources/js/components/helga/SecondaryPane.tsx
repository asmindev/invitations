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
            <TopCover invitation={invitation} guest={guest} />

            {/* COVER */}
            <CoverSection invitation={invitation} />

            {/* Quote */}
            <QuoteSection data={sections?.quote} />

            {/* COUPLE */}
            <CoupleSection data={sections?.couple} invitation={invitation} />

            {/* SAVE THE DATE */}
            <SaveDateSection data={sections?.save_date} invitation={invitation} />

            {/* AGENDA */}
            <AgendaSection data={sections?.agenda} invitation={invitation} />

            {/* RUNDOWN */}
            <RundownSection data={sections?.rundown} />

            {/* Reservation */}
            <RsvpSection data={sections?.rsvp} />

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
            <ProtocolSection data={sections?.protocol} />

            {/* WEDDING WISH */}
            <WeddingWishSection wishes={wishes} />

            {/* CATATAN */}
            <NotesSection />

            {/* Footnote */}
            <FootnoteSection invitation={invitation} />

            {/* FOOTER */}
            <FooterSection data={sections?.footer} />
        </section>
    );
}
