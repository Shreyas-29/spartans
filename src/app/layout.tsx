import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter, Manrope, Roboto, Nunito, Poppins } from 'next/font/google'

const fontBase = Inter({
    subsets: ['latin'],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-base"
})

const fontHeading = Manrope({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ['latin'],
    variable: "--font-heading"
})

export const metadata: Metadata = {
    title: 'Spartans - Proctor Exam Portal',
    description: 'Spartans is a proctor exam portal for students and teachers to conduct exams online.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen bg-white text-slate-900 !font-base antialiased",
                fontBase.variable,
                // fontBase.className,
                // fontHeading.variable,
            )}>
                <Toaster />
                {children}
            </body>
        </html>
    )
}