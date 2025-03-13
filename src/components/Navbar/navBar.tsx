"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NavBar() {
    const router = useRouter()
    return (
        <div className="navbar bg-black h-auto fixed top-0 z-50 shadow-lg text-white">
            <div className="navbar-start flex items-center">
                <div
                    className="cursor-pointer btn btn-ghost btn-sm"
                    onClick={() => {
                        router.push("/")
                    }}
                >
                    Aethors
                </div>
            </div>
            <div className="navbar-end">
                <Link href="/research" className="nav-link">
                    Research
                </Link>
            </div>
        </div>
    )
}
