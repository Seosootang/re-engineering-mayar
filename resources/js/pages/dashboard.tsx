import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import HeroSection from '@/components/ui/hero-section';
import Pagination from '@/components/ui/pagination';

interface Webinar {
    id: number;
    title: string;
    description: string;
    cover_image_path?: string;
    payment_type: 'paid' | 'free' | 'pay_what_you_want';
    price?: number;
    start_datetime: string;
    created_at: string;
}

interface Props {
    upcomingWebinars: Webinar[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Function to get category from title (simple categorization based on keywords)
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

export default function Dashboard({ upcomingWebinars }: Props) {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            {/* Hero Section */}
            <HeroSection />

            {/* Webinar Grid */}
            <div className="px-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {upcomingWebinars.map((webinar) => (
                        <div key={webinar.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            {/* Thumbnail */}
                            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                                {webinar.cover_image_path && (
                                    <img 
                                        src={`/storage/${webinar.cover_image_path}`} 
                                        alt={webinar.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                                        {getCategoryFromTitle(webinar.title)}
                                    </span>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2">
                                    {webinar.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                    {webinar.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(webinar.start_datetime).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </span>
                                    <Link 
                                        href={`/webinar-detail/${webinar.id}`}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                                    >
                                        SELENGKAPNYA →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show message if no webinars */}
                {upcomingWebinars.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">
                            Tidak ada webinar yang akan datang saat ini.
                        </p>
                    </div>
                )}

                {/* Pagination - only show if there are webinars */}
                {upcomingWebinars.length > 0 && <Pagination/>}
                
            </div>
        </AppHeaderLayout>
    );
}