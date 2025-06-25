import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Play } from 'lucide-react';

interface Props {
    id?: string;
}

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

// Website Security Webinar data (ID: 6)
const webinar = {
    id: 6,
    title: "Website Security: Combatting Online Gambling Malware & Others",
    description: "Essential cybersecurity practices to protect your website from gambling malware, ransomware, and other emerging online threats.",
    category: "Website Security",
    date: "2023-12-10",
    duration: "60 minutes",
    speaker: "Michael Chen",
    maxSlots: 500,
    registeredSlots: 347,
    get remainingSlots() {
        return this.maxSlots - this.registeredSlots;
    }
};

export default function WebinarDetail({ id }: Props) {
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
                        <div className="absolute top-4 left-4">
                            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                                {webinar.category}
                            </span>
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                                {webinar.duration}
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
                            <p className="font-medium">{new Date(webinar.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long', 
                                year: 'numeric'
                            })}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Durasi</span>
                            <p className="font-medium">{webinar.duration}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Pembicara</span>
                            <p className="font-medium">{webinar.speaker}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Sisa Slot</span>
                            <p className="font-medium text-green-600">
                                {webinar.remainingSlots} / {webinar.maxSlots}
                            </p>
                        </div>
                    </div>

                    {/* Slot Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <span>Slot Terisi: {webinar.registeredSlots}</span>
                            <span>Sisa: {webinar.remainingSlots}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${(webinar.registeredSlots / webinar.maxSlots) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {Math.round((webinar.registeredSlots / webinar.maxSlots) * 100)}% slot terisi
                        </p>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center">
                        Daftar Kan Dirimu Sekarang
                    </button>
                </div>
            </div>
        </AppHeaderLayout>
    );
}