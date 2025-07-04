import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, DollarSign, Plus } from 'lucide-react';

// Definisikan breadcrumbs untuk halaman ini
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seller Dashboard',
        href: '/seller',
    },
];

// Props type untuk data dari backend
interface DashboardProps {
    webinarCount: number;
    upcomingWebinars: number;
    pastWebinars: number;
    freeWebinars: number;
    paidWebinars: number;
    totalIncome?: number;
    totalParticipants?: number;
}

export default function SellerDashboard({
    webinarCount,
    upcomingWebinars,
    pastWebinars,
    freeWebinars,
    paidWebinars,
    totalIncome = 0,
    totalParticipants = 0,
}: DashboardProps) {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Seller Dashboard" />

            <div className="p-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Dashboard Seller</h1>
                    <p className="text-gray-600 dark:text-gray-300">Selamat datang kembali! Berikut ringkasan webinar Anda.</p>
                </div>

                {/* Key Metrics Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Webinars */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Webinars</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{webinarCount}</p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Webinars */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Upcoming Webinars</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingWebinars}</p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    {/* Past Webinars */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Past Webinars</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{pastWebinars}</p>
                            </div>
                            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-700">
                                <Calendar className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Total Pendapatan - Always show */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Pendapatan</p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">Rp {totalIncome.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Webinar Type Distribution */}
                <div className="mb-8 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Webinar Distribution</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                    <span className="text-gray-600 dark:text-gray-300">Free Webinars</span>
                                </div>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">{freeWebinars}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-600 dark:text-gray-300">Paid Webinars</span>
                                </div>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">{paidWebinars}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Quick Overview</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Active Webinars</span>
                                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{upcomingWebinars}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Completed Webinars</span>
                                <span className="text-lg font-semibold text-green-600 dark:text-green-400">{pastWebinars}</span>
                            </div>
                            {totalParticipants > 0 && (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Total Participants</span>
                                    <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                        {totalParticipants.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Add New Webinar */}
                        <a
                            href="/seller/webinar/create"
                            className="group flex items-center justify-center rounded-lg bg-blue-600 p-4 text-white transition-colors duration-200 hover:bg-blue-700"
                        >
                            <Plus className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                            <span className="font-medium">Add New Webinar</span>
                        </a>

                        {/* View My Webinars */}
                        <a
                            href="/seller/webinars"
                            className="group flex items-center justify-center rounded-lg bg-green-600 p-4 text-white transition-colors duration-200 hover:bg-green-700"
                        >
                            <Calendar className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                            <span className="font-medium">My Webinars</span>
                        </a>

                        {/* View Income */}
                        <a
                            href="/seller/income"
                            className="group flex items-center justify-center rounded-lg bg-purple-600 p-4 text-white transition-colors duration-200 hover:bg-purple-700"
                        >
                            <DollarSign className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                            <span className="font-medium">View Income</span>
                        </a>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}