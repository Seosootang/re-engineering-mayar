import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import AppHeaderLayout from '@/layouts/app/app-header-layout'; // Asumsi Anda menggunakan layout ini
import { BreadcrumbItem, type Webinar } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Award, Calendar, CheckCircle, Clock, Users } from 'lucide-react';

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
            href: '/dashboard',
        },
        {
            title: 'Webinar',
            href: '/webinars',
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
                                    : 'https://via.placeholder.com/800x450?text=Webinar+Cover'
                            }
                            alt={webinar.title}
                            className="aspect-video w-full rounded-xl border object-cover shadow-lg"
                        />

                        <div className="my-8 rounded-xl bg-muted p-6">
                            <h2 className="mb-4 text-2xl font-bold">Tentang Pembicara</h2>
                            <div className="flex items-center gap-4">
                                <img src="https://i.pravatar.cc/150?u=speaker" alt="Nama Pembicara" className="h-20 w-20 rounded-full" />
                                <div>
                                    <h3 className="text-lg font-semibold">Nama Pembicara</h3>
                                    <p className="text-sm text-muted-foreground">Jabatan, Perusahaan</p>
                                    <p className="mt-1 text-sm">
                                        Seorang praktisi dengan pengalaman lebih dari 10 tahun di industri. Telah membantu puluhan brand ternama
                                        mencapai target mereka.
                                    </p>
                                </div>
                            </div>
                        </div>
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
                                            {processing ? 'Memproses...' : 'Daftar'}
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
                                        <Users className="h-7 w-7" />
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
