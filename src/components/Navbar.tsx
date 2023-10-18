import Link from 'next/link'
import React from 'react'
import { Button } from './ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"

interface Props {

}

const Navbar: React.FC<Props> = () => {

    const session = false;

    return (
        <header className="fixed inset-x-0 top-0 z-40 w-full border-b h-14 bg-white/40 backdrop-blur-md border-slate-200">
            <div className="flex items-center justify-between w-full h-full px-4 mx-auto max-w-7xl md:px-6 xl:px-0">
                {/* Logo */}
                <Link href="/">
                    <h1 className="text-2xl font-bold font-heading text-slate-900">
                        Spartans
                    </h1>
                </Link>

                {/* Buttons */}
                {session ? (
                    <div className="flex items-center justify-end space-x-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                ) : (
                    <div className="flex items-center justify-end space-x-4">
                        <Link href="/login">
                            <Button>
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="outline">
                                Register
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
