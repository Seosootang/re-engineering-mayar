import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Play } from 'lucide-react';

interface Webinar {
    id: number;
    title: string;
    description: string;
    cover_image_path?: string;
    payment_type: 'paid' | 'free' | 'pay_what_you_want';
    price?: number;
    original_price?: number;
    start_datetime: string;
    end_datetime?: string;
    webinar_link: string;
    instructions?: string;
    terms_and_conditions?: string;
    max_participants?: number;
    created_at: string;
}

interface Props {
    webinar: Webinar;
    canRegister: boolean;
}

// Function to get category from title (same as dashboard)
const getCategoryFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('cyber') || lowerTitle.includes('security')) return 'Cybersecurity';
    if (lowerTitle.includes('remote') || lowerTitle.includes('work')) return 'Remote Work';
    if (lowerTitle.includes('seo') || lowerTitle.includes('search')) return 'SEO Marketing';
    if (lowerTitle.includes('marketing') || lowerTitle.includes('digital')) return 'Digital Marketing';
    if (lowerTitle.includes('content')) return 'Content Marketing';
    if (lowerTitle.includes('website') || lowerTitle.includes('web')) return 'Website Security';
    return 'General';
};

// Function to calculate duration
const calculateDuration = (startDateTime: string, endDateTime?: string): string => {
    if (!endDateTime) return '60 minutes'; // Default duration
    
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const diffInMinutes = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
    
    if (diffInMinutes >= 60) {
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        return minutes > 0 ? `${hours} jam ${minutes} menit` : `${hours} jam`;
    }
    
    return `${diffInMinutes} menit`;
};

export default function WebinarDetail({ webinar, canRegister }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Webinar Detail',
            href: '#',
        },
    ];

    const category = getCategoryFromTitle(webinar.title);
    const duration = calculateDuration(webinar.start_datetime, webinar.end_datetime);

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={webinar.title} />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Tombol Kembali */}
                <Link 
                    href="/dashboard"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Beranda
                </Link>

                {/* Video Player */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
                    <div className="aspect-video bg-gradient-to-br from-red-500 to-orange-600 relative">
                        {webinar.cover_image_path && (
                            <img 
                                src={`/storage/${webinar.cover_image_path}`} 
                                alt={webinar.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 left-4">
                            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                                {category}
                            </span>
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                                {duration}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {webinar.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {webinar.description}
                    </p>
                    
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div>
                            <span className="text-sm text-gray-500">Tanggal</span>
                            <p className="font-medium">{new Date(webinar.start_datetime).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long', 
                                year: 'numeric'
                            })}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Durasi</span>
                            <p className="font-medium">{duration}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Jenis</span>
                            <p className="font-medium capitalize">
                                {webinar.payment_type === 'free' ? 'Gratis' : 
                                 webinar.payment_type === 'paid' ? 'Berbayar' : 
                                 'Bayar Sesuai Keinginan'}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Status</span>
                            <p className="font-medium text-green-600">
                                {canRegister ? 'Tersedia' : 'Ditutup'}
                            </p>
                        </div>
                    </div>

                    {/* Price Display */}
                    {webinar.payment_type !== 'free' && webinar.price && (
                        <div className="mb-6">
                            <span className="text-sm text-gray-500">Harga</span>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold text-green-600">
                                    Rp {webinar.price.toLocaleString('id-ID')}
                                </p>
                                {webinar.original_price && webinar.original_price > webinar.price && (
                                    <p className="text-lg text-gray-500 line-through">
                                        Rp {webinar.original_price.toLocaleString('id-ID')}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    {webinar.instructions && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Instruksi</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {webinar.instructions}
                            </p>
                        </div>
                    )}

                    {/* Registration Button */}
                    <button 
                        className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                            canRegister 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}
                        disabled={!canRegister}
                    >
                        {canRegister ? 'Daftar Kan Dirimu Sekarang' : 'Pendaftaran Ditutup'}
                    </button>

                    {/* Terms and Conditions */}
                    {webinar.terms_and_conditions && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Syarat dan Ketentuan</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {webinar.terms_and_conditions}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppHeaderLayout>
    );
}