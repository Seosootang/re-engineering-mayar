import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BarChart3, History, HomeIcon, Plus, Settings2, UserCircle, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavGroups: NavGroup[] = [
    {
        title: 'Beranda',
        items: [
            {
                title: 'Home',
                href: '/seller',
                icon: HomeIcon,
            },
        ],
    },
    {
        title: 'Product',
        items: [
            {
                title: 'Create Webinar',
                href: '/seller/webinar/create',
                icon: Plus,
            },
        ],
    },
    {
        title: 'Platform',
        items: [
            {
                title: 'Kelola Peserta',
                href: '/seller/participants',
                icon: Users,
            },
            {
                title: 'History Transaksi',
                href: '/seller/transactions',
                icon: History,
            },
        ],
    },
    {
        title: 'Finansial',
        items: [
            {
                title: 'Lihat Statistik Lengkap',
                href: '/seller/analytics',
                icon: BarChart3,
            },
            {
                title: 'Tarik Komisi',
                href: '/seller/withdraw',
                icon: Wallet,
            },
        ],
    },
    {
        title: 'Akun Saya',
        items: [
            {
                title: 'Akun',
                href: '/seller/account',
                icon: UserCircle,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/seller/settings',
        icon: Settings2,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/seller" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Navigation Groups */}
                {mainNavGroups.map((group) => (
                    <div key={group.title} className="px-2 py-2">
                        <div className="px-2 py-1">
                            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">{group.title}</h3>
                        </div>
                        <div className="space-y-1">
                            {group.items.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                                >
                                    {item.icon && <item.icon className="h-4 w-4" />}
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
