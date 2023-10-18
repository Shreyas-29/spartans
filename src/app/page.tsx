import { AuthProcess, Contact, Features, Footer, Hero, Navbar } from '@/components';
import React from 'react';

export default function HomePage() {
    return (
        <main className="relative w-full h-full mx-auto max-w-7xl">
            <Navbar />
            <div className="w-full pt-16 mx-auto">
                <Hero />
                <Features />
                <AuthProcess />
                <Contact />
                <Footer />
            </div>
        </main>
    )
}
