import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GuestLayout from '@/layouts/GuestLayout';
import Hero from '@/components/wedding/Hero';
import Couple from '@/components/wedding/Couple';
import Event from '@/components/wedding/Event';
import Gallery from '@/components/wedding/Gallery';
import RsvpForm from '@/components/wedding/RsvpForm';
import Wishes from '@/components/wedding/Wishes';
import AudioPlayer from '@/components/wedding/AudioPlayer';
import Countdown from '@/components/wedding/Countdown';
import Story from '@/components/wedding/Story';
import Gift from '@/components/wedding/Gift';
import CovidProtocol from '@/components/wedding/CovidProtocol';

interface Props {
    guest?: {
        id: number;
        name: string;
        slug: string;
        pax: number;
    } | null;
    wishes: any[];
}

export default function Welcome({ guest, wishes }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Wedding date - January 28, 2024
    const weddingDate = '2024-01-28';

    const openInvitation = () => {
        setIsOpen(true);
        setIsPlaying(true);
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    // Prevent scrolling when closed
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    return (
        <GuestLayout>
            <Head title="Marcell & Lisa Wedding" />

            <AudioPlayer isPlaying={isPlaying} toggle={() => setIsPlaying(!isPlaying)} />

            {/* Main Content */}
            <main>
                <Hero guestName={guest?.name} onOpen={openInvitation} />

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <Couple />

                            {/* Countdown Section */}
                            <section className="py-20 px-6 bg-rose-50 overflow-hidden">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-12"
                                >
                                    <h2 className="text-4xl font-serif text-neutral-900 mb-4">Save The Date</h2>
                                    <p className="text-neutral-600 text-sm mb-2">Sunday, January 28th 2024</p>
                                </motion.div>
                                <Countdown targetDate={weddingDate} />
                            </section>

                            <Event />
                            <Story />
                            <Gallery />
                            <Gift />
                            <RsvpForm guest={guest} />
                            <Wishes guest={guest} wishes={wishes} />
                            <CovidProtocol />

                            <footer className="py-12 bg-neutral-900 text-center text-neutral-500 text-xs">
                                <p>© 2024 Marcell & Lisa. All Rights Reserved.</p>
                                <p className="mt-2">Created with Love</p>
                            </footer>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </GuestLayout>
    );
}
