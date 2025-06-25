import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import HeroSection from '@/components/ui/hero-section';
import Pagination from '@/components/ui/pagination';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Sample webinar data - replace with real data from your backend
const webinars = [
    {
        id: 1,
        title: "Big Threats, Small Budget: The Reality of SME Cyber Risks",
        description: "Cyber attacks against small and medium-sized enterprises (SMEs) are growing both in frequency and sophistication, with some organizations being ill-equipped to handle them.",
        thumbnail: "/images/webinar1.jpg",
        category: "Cybersecurity",
        date: "2024-01-15",
        status: "available"
    },
    {
        id: 2,
        title: "Remote Work-IT Skills & Train Kate Mass Digest",
        description: "Navigating technology trends when remote work meets security challenges in today's hybrid work environment. Learn essential strategies for digital transformation.",
        thumbnail: "/images/webinar2.jpg",
        category: "Remote Work",
        date: "2024-01-10",
        status: "available"
    },
    {
        id: 3,
        title: "Social Media SEO Knowhows: Discover SEO secrets that every expert knows!",
        description: "Unlock the power of social media SEO and learn advanced techniques to boost your online visibility and engagement across multiple platforms.",
        thumbnail: "/images/webinar3.jpg",
        category: "SEO Marketing",
        date: "2024-01-05",
        status: "available"
    },
    {
        id: 4,
        title: "How to Create a Digital Marketing Strategy From Scratch",
        description: "A comprehensive guide to building effective digital marketing strategies from the ground up, covering all essential channels and tactics.",
        thumbnail: "/images/webinar4.jpg",
        category: "Digital Marketing",
        date: "2023-12-20",
        status: "available"
    },
    {
        id: 5,
        title: "The Role of Content Marketing in Building Customer Trust",
        description: "Discover how strategic content marketing can help establish trust, build relationships, and drive long-term customer loyalty for your business.",
        thumbnail: "/images/webinar5.jpg",
        category: "Content Marketing",
        date: "2023-12-15",
        status: "available"
    },
    {
        id: 6,
        title: "Website Security: Combatting Online Gambling Malware & Others",
        description: "Essential cybersecurity practices to protect your website from gambling malware, ransomware, and other emerging online threats.",
        thumbnail: "/images/webinar6.jpg",
        category: "Website Security",
        date: "2023-12-10",
        status: "available"
    }
];

export default function Dashboard() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            {/* Hero Section */}
            <HeroSection />

            {/* Webinar Grid */}
            <div className="px-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {webinars.map((webinar) => (
                        <div key={webinar.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            {/* Thumbnail */}
                            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                                        {webinar.category}
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
                                        {new Date(webinar.date).toLocaleDateString('en-US', { 
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

                {/* Pagination */}
                <Pagination/>
                
            </div>
        </AppHeaderLayout>
    );
}
