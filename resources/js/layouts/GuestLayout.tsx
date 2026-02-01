import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 antialiased selection:bg-amber-100 selection:text-amber-900">
            <div className="mx-auto max-w-md min-h-screen bg-white shadow-2xl overflow-hidden relative">
                {children}
            </div>
        </div>
    );
}
