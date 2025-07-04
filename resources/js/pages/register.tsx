import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { BreadcrumbItem, type Webinar } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Award, Calendar, CheckCircle, Clock, Users } from 'lucide-react';

// Assuming a global route function is available from Ziggy
declare function route(name: string, params?: any): string;

interface RegisterProps {
    webinar: Webinar;
    isRegistered: boolean;
}

export default function Register({ webinar, isRegistered }: RegisterProps) {
    const { post, processing } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('user.webinars.register.store', webinar.id));
    };

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
            <div className="container mx-auto max-w-4xl py-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">{webinar.title}</h1>
                        <p className="mb-6 text-lg text-muted-foreground">{webinar.description}</p>

                        <img
                            src={
                                webinar.cover_image_path
                                    ? `/storage/${webinar.cover_image_path}`
                                    : 'https://placehold.co/800x450/e2e8f0/e2e8f0?text=+' // Placeholder
                            }
                            alt={webinar.title}
                            className="aspect-video w-full rounded-xl border object-cover shadow-lg"
                        />

                        {/* --- UPDATED SPEAKER SECTION --- */}
                        {/* This section now dynamically displays speaker info and only renders if a speaker name is provided. */}
                        {webinar.speaker_name && (
                             <div className="my-8 rounded-xl bg-muted p-6">
                                <h2 className="mb-4 text-2xl font-bold">Tentang Pembicara</h2>
                                <div className="flex items-start gap-4">
                                    <img 
                                        src={
                                            webinar.speaker_image_path 
                                                ? `/storage/${webinar.speaker_image_path}`
                                                // Fallback to a UI avatar with the speaker's initials
                                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(webinar.speaker_name)}&background=random&color=fff`
                                        } 
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
                        {/* --- END UPDATED SECTION --- */}

                    </div>

                    <div className="md:col-span-1">
                        <Card className="sticky top-24 shadow-xl">
                            <CardHeader>
                                {webinar.payment_type !== 'free' && webinar.price ? (
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-3xl font-bold text-primary">Rp {webinar.price.toLocaleString('id-ID')}</p>
                                            {webinar.original_price && webinar.original_price > webinar.price && (
                                                <p className="text-lg text-muted-foreground line-through">
                                                    Rp {webinar.original_price.toLocaleString('id-ID')}
                                                </p>
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
                                    <Badge variant="secondary" className="w-full justify-center py-3 text-base">
                                        <CheckCircle className="mr-2 h-5 w-5" />
                                        Anda Sudah Terdaftar
                                    </Badge>
                                ) : (
                                    <form onSubmit={handleSubmit} className="w-full">
                                        <Button type="submit" size="lg" disabled={processing} className="w-full cursor-pointer">
                                            {processing ? 'Memproses...' : 'Daftar Sekarang'}
                                        </Button>
                                    </form>
                                )}
                                <div className="space-y-3 pt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5" />
                                        <span>
                                            {new Date(webinar.start_datetime).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5" />
                                        <span>
                                            Pukul{' '}
                                            {new Date(webinar.start_datetime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5" />
                                        <span>Tempat terbatas untuk pengalaman terbaik</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award className="h-5 w-5" />
                                        <span>Sertifikat digital akan diberikan</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
