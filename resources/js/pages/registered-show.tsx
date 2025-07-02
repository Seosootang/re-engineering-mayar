import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { BreadcrumbItem, type Webinar } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Check, Clipboard, Link as LinkIcon, Video } from 'lucide-react';
import { useState } from 'react';

interface ShowProps {
    webinar: Webinar;
}

export default function RegisteredShow({ webinar }: ShowProps) {
    const [isCopied, setIsCopied] = useState(false);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Riwayat Pembelian', href: route('user.webinars.history.index') },
        { title: webinar.title, href: '#' },
    ];

    const handleCopyLink = () => {
        navigator.clipboard.writeText(webinar.webinar_link).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Webinar: ${webinar.title}`} />
            <div className="container mx-auto max-w-4xl py-10">
                <div className="space-y-6">
                    <Alert className="border-green-500 bg-green-50 text-green-800">
                        <AlertTitle className="font-bold">Pembayaran Berhasil!</AlertTitle>
                        <AlertDescription>Anda telah terdaftar sebagai peserta. Simpan informasi di bawah ini baik-baik.</AlertDescription>
                    </Alert>

                    <div className="mt-6 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src={
                                webinar.cover_image_path
                                    ? `/storage/${webinar.cover_image_path}`
                                    : 'https://via.placeholder.com/800x450?text=Selamat+Datang+di+Webinar'
                            }
                            alt={webinar.title}
                            className="aspect-video w-full border object-cover"
                        />
                    </div>

                    <h1 className="text-4xl font-bold">{webinar.title}</h1>
                    <p className="text-lg text-muted-foreground">{webinar.description}</p>

                    <div className="rounded-xl border-2 border-dashed p-6">
                        <h2 className="mb-4 text-2xl font-bold">Akses Webinar</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="flex items-center gap-2 font-semibold">
                                    <Video size={20} /> Link Webinar
                                </h3>
                                <p className="text-muted-foreground">Gunakan link ini untuk bergabung pada saat acara dimulai.</p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <a
                                        href={webinar.webinar_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-lg font-bold text-primary hover:underline"
                                    >
                                        <LinkIcon size={18} /> Klik untuk Bergabung
                                    </a>

                                    <Button className="cursor-pointer" variant="outline" size="sm" onClick={handleCopyLink}>
                                        {isCopied ? (
                                            <>
                                                <Check className="mr-2 h-4 w-4 text-green-500" />
                                                Tersalin!
                                            </>
                                        ) : (
                                            <>
                                                <Clipboard className="mr-2 h-4 w-4" />
                                                Salin Link
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            {webinar.instructions && (
                                <div className="space-y-2 border-t pt-4">
                                    <h3 className="flex items-center gap-2 font-semibold">
                                        <BookOpen size={20} /> Instruksi Penting
                                    </h3>
                                    <div className="prose max-w-none text-muted-foreground">
                                        <p>{webinar.instructions}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button asChild variant="outline">
                        <Link href={route('user.webinars.history.index')}>Kembali ke Riwayat Pembelian</Link>
                    </Button>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
