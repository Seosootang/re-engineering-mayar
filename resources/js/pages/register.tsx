// resources/js/Pages/User/Webinar/Register.tsx

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { BreadcrumbItem, type Webinar } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Award, Calendar, CheckCircle, Clock, LoaderCircle, Users } from 'lucide-react';

interface RegisterProps {
    webinar: Webinar;
    isRegistered: boolean;
}

export default function Register({ webinar, isRegistered }: RegisterProps) {
    // Kita tidak butuh 'errors' di sini karena sudah ditangani oleh toast di layout
    const { post, processing } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Cukup panggil post, tanpa opsi tambahan.
        // Inertia akan menangani Inertia::location secara otomatis.
        // Flash message akan ditangani oleh layout.
        post(route('user.webinars.register.store', webinar.id));
    };

    // PERBAIKAN: Mendefinisikan konstanta breadcrumbs yang hilang
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: webinar.title,
            href: '#',
        },
    ];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={`Daftar Webinar: ${webinar.title}`} />
            <div className="container mx-auto max-w-5xl py-10">
                <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-3">
                    {/* Kolom Kiri: Detail Webinar (Lengkap) */}
                    <div className="md:col-span-2">
                        <img
                            src={webinar.cover_image_path ? `/storage/${webinar.cover_image_path}` : 'https://placehold.co/800x450/e2e8f0/e2e8f0?text=+'}
                            alt={webinar.title}
                            className="aspect-video w-full rounded-xl border object-cover shadow-lg"
                        />
                        <h1 className="mb-2 mt-6 text-3xl font-bold tracking-tight md:text-4xl">{webinar.title}</h1>
                        <p className="mb-8 text-lg text-muted-foreground">{webinar.description}</p>
                        
                        {/* Anda bisa menambahkan bagian lain seperti "Materi Pembelajaran" di sini jika ada datanya */}

                        {webinar.speaker_name && (
                            <div className="my-8 rounded-xl bg-muted p-6">
                                <h2 className="mb-4 text-2xl font-bold">Tentang Pembicara</h2>
                                <div className="flex items-start gap-4">
                                    <img 
                                        src={webinar.speaker_image_path ? `/storage/${webinar.speaker_image_path}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(webinar.speaker_name)}&background=random&color=fff`} 
                                        alt={webinar.speaker_name} 
                                        className="h-20 w-20 flex-shrink-0 rounded-full border-2 border-white object-cover shadow-md" 
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold">{webinar.speaker_name}</h3>
                                        {webinar.speaker_description && (
                                            <p className="mt-1 text-sm text-muted-foreground">{webinar.speaker_description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Kolom Kanan: Kartu Pendaftaran */}
                    <div className="md:col-span-1">
                        <Card className="sticky top-24 shadow-xl">
                            <CardHeader>
                                {webinar.payment_type !== 'free' && webinar.price ? (
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-3xl font-bold text-primary">Rp {webinar.price.toLocaleString('id-ID')}</p>
                                            {webinar.original_price && webinar.original_price > webinar.price && (
                                                <p className="text-lg text-muted-foreground line-through">Rp {webinar.original_price.toLocaleString('id-ID')}</p>
                                            )}
                                        </div>
                                        <CardDescription>Investasi satu kali untuk keahlian seumur hidup.</CardDescription>
                                    </div>
                                ) : (
                                    <p className="text-3xl font-bold text-primary">GRATIS</p>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {isRegistered ? (
                                    <Link href={route('user.webinars.registered.show', webinar.id)}>
                                        <Badge variant="secondary" className="w-full cursor-pointer justify-center py-3 text-base hover:bg-gray-200">
                                            <CheckCircle className="mr-2 h-5 w-5" />
                                            Anda Sudah Terdaftar
                                        </Badge>
                                    </Link>
                                ) : (
                                    <form onSubmit={handleSubmit} className="w-full">
                                        <Button type="submit" size="lg" disabled={processing} className="w-full">
                                            {/* UMPAN BALIK VISUAL YANG JELAS */}
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                'Daftar Sekarang'
                                            )}
                                        </Button>
                                    </form>
                                )}
                                <Separator />
                                <div className="space-y-3 pt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-3"><Calendar className="h-5 w-5" /><span>{new Date(webinar.start_datetime).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                                    <div className="flex items-center gap-3"><Clock className="h-5 w-5" /><span>Pukul {new Date(webinar.start_datetime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span></div>
                                    <div className="flex items-center gap-3"><Users className="h-5 w-5" /><span>Tempat terbatas</span></div>
                                    <div className="flex items-center gap-3"><Award className="h-5 w-5" /><span>Sertifikat digital</span></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
