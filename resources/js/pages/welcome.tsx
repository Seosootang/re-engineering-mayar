// resources/js/Pages/Welcome.tsx

import { Link, Head } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Button } from '@/components/ui/button';

// PERBAIKAN: Gunakan 'SharedData' sebagai tipe untuk props
export default function Welcome({ auth }: SharedData) {
    return (
        <>
            <Head title="WELCOME | Mayar's Lite" />
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
                {/* Header / Navigasi */}
                <header className="px-4 lg:px-6 h-14 flex items-center shadow-sm">
                    <Link href="/" className="flex items-center justify-center">
                        <svg /* Ganti dengan logo Anda */ xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                        <span className="sr-only">Mayar's Lite</span>
                    </Link>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        {auth.user ? (
                            // 'auth.user.role' mungkin tidak ada di tipe 'User' Anda,
                            // Anda bisa cek langsung di database atau tambahkan ke tipe User jika perlu.
                            // Untuk amannya, kita arahkan ke dashboard umum.
                            <Link href={route('dashboard')}>
                                <Button variant="outline">Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')}>
                                    <Button variant="outline">Masuk</Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button>Daftar Sekarang</Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Konten Utama / Hero Section (tidak ada perubahan di sini) */}
                <main className="flex-1">
                    {/* ... */}
                </main>

                {/* Footer (tidak ada perubahan di sini) */}
                <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                    {/* ... */}
                </footer>
            </div>
        </>
    );
}