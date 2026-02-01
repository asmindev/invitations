import CoupleSection from './CoupleSection';
import CoverSection from './CoverSection';
import QuoteSection from './QuoteSection';
import SaveDateSection from './SaveDateSection';
import {
    AgendaSection,
    FooterSection,
    FootnoteSection,
    GallerySection,
    LoveStorySection,
    NotesSection,
    ProtocolSection,
    RsvpSection,
    RundownSection,
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
            {sections?.quote && <QuoteSection data={sections.quote} />}

            {/* COUPLE */}
            <CoupleSection data={sections?.couple} invitation={invitation} />

            {/* SAVE THE DATE */}
            {sections?.save_date && <SaveDateSection data={sections.save_date} invitation={invitation} />}

            {/* AGENDA */}
            {sections?.agenda && <AgendaSection data={sections.agenda} invitation={invitation} />}

            {/* RUNDOWN */}
            {sections?.rundown && <RundownSection data={sections.rundown} />}

            {/* Reservation */}
            {sections?.rsvp && <RsvpSection data={sections.rsvp} />}

            {/* Gallery */}
            {sections?.gallery && <GallerySection data={sections.gallery} />}

            {/* VIDEO GALLERY */}
            {/* <VideoGallerySection /> */}

            {/* Love Story */}
            {sections?.love_story && <LoveStorySection data={sections.love_story} />}

            {/* LIVE STREAMING */}
            {/* <LiveStreamingSection /> */}

            {/* Instagram Filter */}
            {/* <InstagramFilterSection /> */}

            {/* WEDDING GIFT */}
            {sections?.wedding_gift && <WeddingGiftSection data={sections.wedding_gift} />}

            {/* Protocol */}
            {sections?.protocol && <ProtocolSection data={sections.protocol} />}

            {/* WEDDING WISH */}
            <WeddingWishSection wishes={wishes} />

            {/* CATATAN */}
            <NotesSection />

            {/* Footnote */}
            <FootnoteSection invitation={invitation} />

            {/* FOOTER */}
            {sections?.footer && <FooterSection data={sections.footer} />}
        </section>
    );
}
