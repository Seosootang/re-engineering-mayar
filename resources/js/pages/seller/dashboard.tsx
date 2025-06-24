// resources/js/Pages/Seller/Dashboard.tsx

import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types'; // Kita asumsikan tipe ini ada di @/types

// Definisikan breadcrumbs untuk halaman ini
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seller Dashboard',
        href: route('seller.dashboard'), // Gunakan route name untuk URL
    },
];

export default function SellerDashboard() {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Seller Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Selamat datang di Dashboard khusus Seller Anda.
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}