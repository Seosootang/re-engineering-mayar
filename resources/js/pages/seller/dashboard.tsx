import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { DollarSign, Calendar, Users, TrendingUp, Plus, BarChart3, Wallet } from 'lucide-react';

// Definisikan breadcrumbs untuk halaman ini
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seller Dashboard',
        href: '/seller', // Simplified route
    },
];

// Sample data - nanti bisa diganti dengan data dari backend
const dashboardData = {
    totalRevenue: 125000000, // 125 juta
    thisMonthRevenue: 15750000, // 15.75 juta
    activeWebinars: 8,
    totalParticipants: 2340
};

// Revenue Chart Data (12 bulan terakhir)
const revenueChartData = [
    { month: 'Jan', revenue: 8500000 },
    { month: 'Feb', revenue: 12200000 },
    { month: 'Mar', revenue: 9800000 },
    { month: 'Apr', revenue: 15400000 },
    { month: 'May', revenue: 11700000 },
    { month: 'Jun', revenue: 18900000 },
    { month: 'Jul', revenue: 14300000 },

];

// Top Performing Webinars
const topWebinars = [
    {
        id: 1,
        title: 'Website Security: Combatting Online Threats',
        participants: 892,
        revenue: 44600000,
        category: 'Cybersecurity'
    },
];

// Helper function untuk format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export default function SellerDashboard() {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Seller Dashboard" />
            
            <div className="p-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Dashboard Seller
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Selamat datang kembali! Berikut ringkasan performa webinar Anda.
                    </p>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Revenue */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(dashboardData.totalRevenue)}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    {/* This Month Revenue */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">This Month Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(dashboardData.thisMonthRevenue)}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    {/* Active Webinars */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Webinars</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {dashboardData.activeWebinars}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>

                    {/* Total Participants */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Participants</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {dashboardData.totalParticipants.toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grafik & Data Visual */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Revenue Chart (12 Months)
                        </h2>
                        <div className="h-64">
                            {/* Simple Bar Chart */}
                            <div className="flex items-end justify-between h-48 space-x-2">
                                {revenueChartData.map((data, index) => {
                                    const maxRevenue = Math.max(...revenueChartData.map(d => d.revenue));
                                    const height = (data.revenue / maxRevenue) * 100;
                                    return (
                                        <div key={index} className="flex flex-col items-center flex-1">
                                            <div className="flex flex-col items-center mb-2">
                                                <div 
                                                    className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-500 hover:from-blue-600 hover:to-blue-400"
                                                    style={{ height: `${height}%` }}
                                                    title={`${data.month}: ${formatCurrency(data.revenue)}`}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-600 dark:text-gray-300">{data.month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Top Performing Webinars */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Top Performing Webinars
                        </h2>
                        <div className="space-y-4">
                            {topWebinars.map((webinar, index) => (
                                <div key={webinar.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {webinar.title}
                                            </h3>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="flex items-center">
                                                    <Users className="w-4 h-4 mr-1" />
                                                    {webinar.participants}
                                                </span>
                                                <span className="flex items-center">
                                                    <DollarSign className="w-4 h-4 mr-1" />
                                                    {formatCurrency(webinar.revenue)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {webinar.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Add New Webinar */}
                        <button className="flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 group">
                            <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Add New Webinar</span>
                        </button>

                        {/* View Analytics */}
                        <button className="flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 group">
                            <BarChart3 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">View Analytics</span>
                        </button>

                        {/* Withdraw Commission */}
                        <button className="flex items-center justify-center p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 group">
                            <Wallet className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Withdraw Commission</span>
                        </button>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}